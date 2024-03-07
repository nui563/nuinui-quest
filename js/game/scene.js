class Scene {
    frameCount = 0;
    sectionFrame = 0;
    startTransition = 30;

    view = {
        pos: null,
        size: null,
        target: null
    }
    
    particles = new ParticleManager();

    actors = [];

    customDraw = [];

    events = [];
    event = null;

    enableHUD = false;
    warning = false;

    shakeBuffer = 0;

    constructor(game, data) {
        this.name = data.name;
        this.sectionEvents = EVENTS[this.name];

        this.sections = [];
        data.sections.forEach(({pos, size, actors}) => {
            this.sections.push({
                pos: new Vector2(pos.x * 16, pos.y * 16),
                size: new Vector2(size.x * 16, size.y * 16),
                events: this.sectionEvents[`${pos.x / 20}_${pos.y / 12}`] || [],
                actors: actors,
                collisions: []
            });
        });

        this.background = {...data.layers.background}
        this.foreground = {...data.layers.foreground}

        Object.keys(data.layers.collisions).forEach(key => {
            const [x, y] = key.split("_");
            const collision = { pos: { x: x * 16, y: y * 16 }, size: { x: 16, y: 16 }};
            const section = this.sections.find(section => CollisionBox.includedIn(collision, section));
            if (section) section.collisions.push(collision);
        });

        // DEBUG
        if (game.checkpoint) game.checkpoint.respawn(game, this);
        else {
            this.currentSection = this.sections[0];
            this.currentSection.events.forEach(event => this.events.push(new GameEvent(event.timeline, event.isPersistent)));
        }

        this.view.size = new Vector2(game.width, game.height);
        this.setViewPos();
    }

    setViewPos = () => {
        let pos;
        if (!this.view.target) {
            pos = this.currentSection.pos;
        } else {
            const center = new Vector2(this.view.target.pos.x + this.view.target.size.x / 2, this.view.target.pos.y + (this.view.target.size.y === 32 ? 16 : 0));
            pos = new Vector2(
                Math.max(this.currentSection.pos.x, Math.min(this.currentSection.pos.x + this.currentSection.size.x - this.view.size.x, center.x - this.view.size.x / 2)),
                Math.max(this.currentSection.pos.y, Math.min(this.currentSection.pos.y + this.currentSection.size.y - this.view.size.y, center.y - this.view.size.y / 2))
            ).round();
            // pos = center.plus(new Vector2(-this.view.size.x / 2, -this.view.size.y / 2)).round();
        }
        
        if (this.lockedViewPos) {
            pos.x = .7 * this.view.pos.x + .3 * this.lockedViewPos.x;
            if (Math.abs(pos.x - this.lockedViewPos.x) < .3) pos.x = this.lockedViewPos.x;
            pos.y = .7 * this.view.pos.y + .3 * this.lockedViewPos.y;
            if (Math.abs(pos.y - this.lockedViewPos.y) < .3) pos.y = this.lockedViewPos.y;
        }

        if (this.view.pos && this.newSectionBuffer) {
            const newView = this.view.pos.lerp(pos, .3);
            if (!newView.round().equals(pos)) {
                this.view.pos = newView;
            } else this.newSectionBuffer = false;
        } else if (!this.view.pos) this.view.pos = pos;
        else {
            this.view.pos = this.view.pos.lerp(pos, .2);
            this.view.pos.x = pos.x;
        }
        
        
        // this.view.pos = pos;
    }

    updateSection = game => {
        const center = CollisionBox.center(this.view.target);
        if (!center.inBox(this.currentSection)) {
            const newSection = this.sections.find(section => center.inBox(section));
            if (newSection) {
                this.currentSection = newSection;
                this.newSectionBuffer = true;
                this.sectionFrame = 0;
                this.events = this.events.filter(event => event.isPersistent);
                if (this.currentSection.events) {
                    this.currentSection.events.filter(event => event.condition(game)).forEach(event => this.events.push(new GameEvent(event.timeline, event.isPersistent)));
                }
                const persistentActors = [];
                this.events.forEach(e => {
                    if (e.actors) persistentActors.push(...e.actors);
                });
                this.actors.forEach(a => {
                    if (a.isPersistent) persistentActors.push(a);
                });
                this.actors = this.actors.filter(actor => persistentActors.includes(actor));
                this.currentSection.actors.forEach(event => {
                    this.actors.push(eval("new " + event.className + "(...event.data)"));
                });
                
                if (this.actors.some(a => a instanceof Checkpoint) && game.checkpoint && game.checkpoint.pos) {
                    this.actors.filter(a => a instanceof Checkpoint).forEach(checkpoint => {
                        if (checkpoint.pos.equals(game.checkpoint.pos)) game.checkpoint = checkpoint;
                    });
                }
            }
        }
    }

    update = game => {
        this.customDraw = [];

        // Execute event if possible
        if (this.events.length) {
            this.events.forEach(event => {
                event.update(game);
                if (event.end) this.events = this.events.filter(e => e !== event);
            })
        }
        
        const flare = this.actors.find(actor => actor instanceof Flare);
        if(flare && flare.item && game.keys.c && flare.playerControl && !this.isFocus && !this.isAmeFocus && !flare.focusCooldown && !this.bossKillEffect && !flare.jetski && !flare.moto) {
            this.isFocus = flare.focusTime;
            flare.focusCooldown = flare.focusCooldownTime;
            game.playSound("focus");
        }

        // Update actors
        this.actors = this.actors.filter(a => !a.toFilter);
        if (this.isFocus && this.frameCount % 3) this.actors.filter(actor => actor instanceof Flare || actor instanceof Ayame || actor instanceof Ame || actor instanceof Arrow).forEach(actor => actor.update(game));
        else if (this.isAmeFocus && this.frameCount % 3) this.actors.filter(actor => actor instanceof Ame || actor instanceof Bullet).forEach(actor => actor.update(game));
        else if (!this.bossKillEffect || this.frameCount % 2) this.actors.forEach(actor => actor.update(game));

        // Update section
        this.updateSection(game);

        // Update viewport
        this.setViewPos();
        if (!this.lastViewPos || !this.view.pos.equals(this.lastViewPos)) {
            this.lastViewPos = this.view.pos;
        }

        this.particles.update();

        this.drawHUD = true;

        if (this.thunder) this.thunder--;
        if (this.shakeBuffer) this.shakeBuffer--;
        if (this.bossKillEffect) this.bossKillEffect--;
        if (this.iceWind) this.iceWind--;
        if (this.isFocus) this.isFocus--;
        if (this.isAmeFocus) this.isAmeFocus--;
        if (this.startTransition) this.startTransition--;
        this.sectionFrame++;
        this.frameCount++;

        if (this.nextScene) game.scene = this.nextScene;
    }

    drawTiles = (game, ctx, tiles) => {
        const pos = this.view.pos.times(1 / 16).floor();
        for (let y = pos.y - (!this.towerScroll ? 0 : 1); y < pos.y + 1 + this.view.size.y / 16; y++) {
            for (let x = pos.x; x < pos.x + 1 + this.view.size.x / 16; x++) {
                let tile = tiles[`${x}_${y}`];
                if (tile !== undefined) {
                    tile = parseInt(tile, 16);
                    if (tile > 63) tile += 8 * (Math.floor(this.frameCount / (tile === 69 ? 12 : tile > 69 && this.name === 'forest' ? 24 : 6)) % 3);
                    const towerScrollOffset = (!this.towerScroll || (tiles !== this.background && x > 22 && x < 37)) ? 0 : Math.floor(this.frameCount / this.towerScroll) % 16;
                    ctx.drawImage(game.assets.images[`ts_${this.name}${game.altColor ? '_alt' : ''}`], (tile % 8) * 16, Math.floor(tile / 8) * 16, 16, 16, x * 16, y * 16 + towerScrollOffset, 16, 16);
                }
            }
        }
    }

    drawCollisions = (game, ctx) => {
        ctx.fillStyle = '#0000ff7f';
        this.collisions.forEach(({pos, size}) => {
            ctx.fillRect(pos.x, pos.y, size.x, size.y);
        });
    }

    drawBackground = (game, cx) => {
        const img = `bg_${this.name}${game.altColor ? '_alt' : ''}`;
        cx.drawImage(game.assets.images[img], 0, 0, game.width, game.height, 0, 0, game.width, game.height);
        if (this.travelEvent) {
            for (let i = 0; i < game.height; i++) {
                cx.drawImage(game.assets.images[img], 0, i, game.width, 1, Math.round(4 * Math.sin((this.frameCount + i) * 4 * (Math.PI / 180))), i, game.width, 1);
            }
        }
        if (this.skyTransistion && !game.finished) {
            cx.save();
            cx.globalAlpha = this.skyTransistion;
            for (let i = 0; i < game.height; i++) {
                const offset = Math.round(2 * (1 + Math.sin((this.frameCount + i) * 4 * (Math.PI / 180))));
                cx.drawImage(game.assets.images[`${img}2`], 0, i, game.width, 1, -offset, i, game.width + offset * 2, 1);
            }
            cx.restore();
        }
        if (this.name === 'heaven') {
            cx.drawImage(game.assets.images[`${img}2`], 0, Math.round(1 + Math.sin(this.frameCount * 2 * (Math.PI / 180))), game.width, game.height, 0, 0, game.width, game.height);
        }
        if (this.towaOffset > 0) {
            cx.fillStyle = '#000';
            cx.fillRect(0, 0, game.width, Math.round(this.towaOffset));
            cx.fillRect(0, game.height, game.width, -Math.round(this.towaOffset));
        }
    }

    displayHUD = (game, cx) => {
        if (game.timer) {
            const time = (new Date().getTime() - game.timer.getTime()) / 1000;
            let minutes = ((time / 60) % 60) | 0;
            let seconds = (time % 60) | 0;
            minutes = ('00' + minutes).slice(-2);
            seconds = ('00' + seconds).slice(-2);

            if (time < 3600) {
                cx.drawImage(game.assets.images['ui_timer'], game.width - 39, 2);
            } else {
                cx.drawImage(game.assets.images['ui_timer_wide'], game.width - 57, 2);
                let hours = (time / 3600) | 0;
                hours = ('00' + hours).slice(-2);
                hours.split('').forEach((digit, i) => {
                    cx.drawImage(game.assets.images['ui_digit'], 5 * parseInt(digit), 0, 5, 5, game.width - 53 + 6 * i, 5, 5, 5);
                });
            }
            minutes.split('').forEach((digit, i) => {
                cx.drawImage(game.assets.images['ui_digit'], 5 * parseInt(digit), 0, 5, 5, game.width - 35 + 6 * i, 5, 5, 5);
            });
            seconds.split('').forEach((digit, i) => {
                cx.drawImage(game.assets.images['ui_digit'], 5 * parseInt(digit), 0, 5, 5, game.width - 17 + 6 * i, 5, 5, 5);
            });
        }

        const flare = this.actors.find(actor => actor instanceof Flare);
        if (flare) {
            cx.save();
            if (game.mode !== 'cursed') {
                const maxHealthWidth = 64;
                flare.healthBar = flare.healthBar ? (1 - .1) * flare.healthBar + .1 * flare.health : flare.health;
                const healthWidth = Math.ceil(flare.healthBar * maxHealthWidth / flare.maxHealth);
                cx.fillStyle = '#000';
                cx.fillRect(9, 16, 6, maxHealthWidth);
                cx.fillStyle = '#3F3FBF';
                cx.fillRect(11, 16, 3, maxHealthWidth);
                cx.fillStyle = flare instanceof Noel ? '#FFBF3F' : '#FF3F3F';
                cx.fillRect(9, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
                cx.fillStyle = flare instanceof Noel ? '#FFFFBF' : '#FF9F7F';
                cx.fillRect(11, 16 + maxHealthWidth - healthWidth, 3, healthWidth);
                if (flare.helpHealth) {
                    const helpHealthWidth = Math.ceil(flare.helpHealth * maxHealthWidth / flare.maxHealth);
                    cx.fillStyle = '#7FBFFF';
                    cx.fillRect(9, 16 + maxHealthWidth - helpHealthWidth, 6, helpHealthWidth);
                    cx.fillStyle = '#BFFFFF';
                    cx.fillRect(11, 16 + maxHealthWidth - helpHealthWidth, 3, helpHealthWidth);
                }
                cx.drawImage(game.assets.images['ui_healthbar'], 4, 0);
                cx.drawImage(game.assets.images['ui_boss_icon'], flare instanceof Noel ? 80 : 0, 0, 8, 8, 8, 6, 8, 8);
            }

            if (flare.hasBow || flare.jetski || flare.moto) cx.drawImage(game.assets.images['ui_slot'], 0, game.height - 24);

            if (flare.hasBow && !flare.jetski && !flare.moto) {
                cx.drawImage(game.assets.images['sp_bow_pickup'], flare.weapon === 'bow' ? 0 : 20, 0, 20, 20, 2, game.height - 22, 20, 20);
                if (flare.chargeShot) {
                    const chargeOffset = flare.chargeTypeData[flare.chargeTypeList[flare.chargeType]].offset;
                    cx.drawImage(game.assets.images['ui_charge_type'], chargeOffset * 12, 0, 12, 12, 12, game.height - 12, 12, 12);
                }
            }

            if (flare.item && !flare.jetski && !flare.moto) {
                cx.drawImage(game.assets.images['ui_slot'], 24, game.height - 24);
                if (this.isAmeFocus || (flare.focusCooldown && !this.isFocus)) {
                    cx.globalAlpha = .5;
                    cx.drawImage(game.assets.images['sp_clock'], 26, game.height - 22);
                    cx.globalAlpha = 1;
                    cx.fillStyle = "#f00";
                    cx.fillRect(28, game.height - 13, Math.ceil(flare.focusCooldown * 16 / flare.focusCooldownTime), 2);
                } else cx.drawImage(game.assets.images['sp_clock'], 26, game.height - 22);
            }

            if (flare.doubleJump) {
                cx.save();
                cx.drawImage(game.assets.images['ui_slot'], 48, game.height - 24);
                if (flare.doubleJumpBuffer) cx.filter = 'brightness(.25)';
                cx.drawImage(game.assets.images['sp_jump'], 50, game.height - 22);
                cx.restore();
            }

            if (flare.chargeTypeBufferAnim && !flare.jetski && !flare.moto) {
                cx.translate(-this.view.pos.x, -this.view.pos.y);
                const chargeOffset = flare.chargeTypeData[flare.chargeTypeList[flare.chargeType]].offset;
                cx.drawImage(game.assets.images['ui_charge_type'], chargeOffset * 12, 0, 12, 12, Math.round(flare.pos.x + flare.size.x / 2) - 6, Math.round(flare.pos.y) - 20, 12, 12);
            }

            if (flare.jetski || flare.moto) {
                cx.drawImage(game.assets.images['sp_jetski_item'], 2, game.height - 22);
            }
            cx.restore();
        }

        if (this.boss) {
            const maxHealthWidth = 128;
            cx.save();
            cx.translate(game.width / 2, game.height - 16);
            cx.fillStyle = '#000';
            cx.fillRect(-maxHealthWidth / 2, 5, maxHealthWidth, 6);
            cx.fillStyle = '#3F3FBF';
            cx.fillRect(-maxHealthWidth / 2, 6, maxHealthWidth, 3);
            cx.fillStyle = '#FF003F';
            cx.fillRect(-maxHealthWidth / 2, 5, Math.ceil(this.boss.healthBar * maxHealthWidth / this.boss.maxHealth), 6);
            cx.fillStyle = '#FF7FBF';
            cx.fillRect(-maxHealthWidth / 2, 6, Math.ceil(this.boss.healthBar * maxHealthWidth / this.boss.maxHealth), 3);
            cx.drawImage(game.assets.images['ui_healthbar_vertical'], -80, 0);
            cx.drawImage(game.assets.images['ui_boss_icon'], this.boss.icon * 8, 0, 8, 8, -76, 4, 8, 8);
            if (this.bossText) {
                cx.fillStyle = '#000';
                cx.fillRect(-64, -4, this.bossText.width + 1, 7);
                this.bossText.draw(game, cx, new Vector2(-64, -4));
            }
            cx.restore();
        }
    }

    displayWarning = (game, cx) => {
        for (let i = 0; i < 6; i++) {
            const speed = game.frameCount * 2;
            cx.drawImage(game.assets.images['ui_warning'], 96 * (i-1) + speed % 96, 64);
            cx.drawImage(game.assets.images['ui_warning'], 96 * i - speed % 96, game.height - 64 - 16);
        }
    }
    
    draw = game => {
        for (let i = 0; i < 3; i++) {
            const cx = game[`ctx${i}`];
            cx.save();
            if (game.screenShake && this.shakeBuffer && i!==3) {
                cx.translate(Math.floor(random() * 6) - 3, 0);
                // if (KEYMODE === 'gamepad' && game.inputManager.gamepad !== null) {
                //     const gamepad = navigator.getGamepads()[game.inputManager.gamepad];
                //     if (this.shakeBuffer === 1 && gamepad.vibrationActuator && gamepad.vibrationActuator.type === "dual-rumble") {
                //         gamepad.vibrationActuator.playEffect('dual-rumble', {
                //             startDelay: 0,
                //             duration: 100,
                //             weakMagnitude: 1.0,
                //             strongMagnitude: 1.0,
                //         });
                //     }
                // }
            }
            const viewPos = this.view.pos.times(-1).round();
            switch (i) {
                case 0:
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.boss instanceof Towa) {
                        let yScale = 1;
                        if (this.boss.mirrorAnim) {
                            yScale = (this.boss.mirrorAnim / 10 - 1) * (this.boss.mirror ? 1 : -1);
                            game.scene.particles.shine_white(this.view.pos.plus(new Vector2(random() * game.width, random() * game.height).round()), 1);
                            cx.fillStyle = '#000';
                            cx.globalAlpha = this.boss.mirrorAnim / 20;
                            cx.fillRect(0, 0, game.width, game.height);
                        } else if (this.boss.mirror) {
                            // cx.filter = 'grayscale(.5)';
                            yScale = -1;
                        }
                        if (yScale !== 1) {
                            cx.translate(0, game.height * .5);
                            cx.scale(1, yScale);
                            cx.translate(0, -game.height * .5);
                        }
                    }

                    if (this.bossKillEffect) {
                        cx.fillStyle = "#fff";
                        cx.fillRect(0, 0, game.width, game.height);
                        break;
                    }
                    this.drawBackground(game, cx);
                    cx.translate(viewPos.x, viewPos.y);
                    if (this.skyTransistion && !game.finished) cx.drawImage(game.assets.images['sp_moon'], 30 * 16 - 64, 8 * 16);
                    this.drawTiles(game, cx, this.background);
                    break;
                case 1:
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.boss instanceof Towa) {
                        let yScale = 1;
                        if (this.boss.mirrorAnim) {
                            yScale = (this.boss.mirrorAnim / 10 - 1) * (this.boss.mirror ? 1 : -1);
                            game.scene.particles.shine_white(this.view.pos.plus(new Vector2(random() * game.width, random() * game.height).round()), 1);
                            cx.fillStyle = '#000';
                            cx.globalAlpha = this.boss.mirrorAnim / 20;
                            cx.fillRect(0, 0, game.width, game.height);
                        } else if (this.boss.mirror) {
                            // cx.filter = 'grayscale(.5)';
                            yScale = -1;
                        }
                        if (yScale !== 1) {
                            cx.translate(0, game.height * .5);
                            cx.scale(1, yScale);
                            cx.translate(0, -game.height * .5);
                        }
                    }
                    
                    if (this.thunder && !(Math.floor(this.frameCount * .5) % 2)) {
                        cx.fillStyle = "#fff";
                        cx.fillRect(0, 0, game.width, game.height);
                        cx.filter = 'brightness(0%)';
                    }
                    // if (this.boss instanceof Ame && this.boss.resetRoom) {
                    //     cx.translate(game.width * .5, game.height * .5);
                    //     cx.rotate(Math.PI * .25 * (this.boss.phaseBuffer / (4 * 60)));
                    //     cx.translate(-game.width * .5, -game.height * .5);
                    // }

                    if (this.isAmeFocus) {
                        cx.save();
                        if (this.isAmeFocus < 10) cx.globalAlpha = this.isAmeFocus / 10;
                        cx.save();
                        cx.filter = 'hue-rotate(90deg)';
                        for (let i = 0; i < game.height; i++) {
                            cx.drawImage(game.assets.images['ui_focus'], 0, i, 336, 1, Math.cos(((this.frameCount + i) / game.height / 4) * (180 / Math.PI)) * 4 - 8, i, 336, 1);
                        }
                        cx.restore();
                        const flare = this.actors.find(actor => actor instanceof Flare);
                        if (this.isFocus > flare.focusTime - 30) game.scene.particles.shine_white(this.view.pos.plus(new Vector2(random() * game.width, random() * game.height).round()), 1);
                        if (this.isFocus > flare.focusTime - 10) {
                            cx.fillStyle = '#fff';
                            cx.globalAlpha = (this.isFocus - flare.focusTime - 10) / 10;
                            cx.fillRect(0, 0, game.width, game.height);
                        }
                        cx.restore();
                    }

                    if (this.isFocus) {
                        if (this.isFocus < 10) cx.globalAlpha = this.isFocus / 10;
                        for (let i = 0; i < game.height; i++) {
                            cx.drawImage(game.assets.images['ui_focus'], 0, i, 336, 1, Math.cos(((this.frameCount + i) / game.height / 4) * (180 / Math.PI)) * 4 - 8, i, 336, 1);
                        }
                        const flare = this.actors.find(actor => actor instanceof Flare);
                        if (this.isFocus > flare.focusTime - 30) game.scene.particles.shine_white(this.view.pos.plus(new Vector2(random() * game.width, random() * game.height).round()), 1);
                        if (this.isFocus > flare.focusTime - 10) {
                            cx.fillStyle = '#fff';
                            cx.globalAlpha = (this.isFocus - flare.focusTime - 10) / 10;
                            cx.fillRect(0, 0, game.width, game.height);
                        }
                        cx.globalAlpha = 1;
                    }

                    if (this.warning) this.displayWarning(game, cx);
                    
                    cx.translate(viewPos.x, viewPos.y);

                    this.particles.draw(cx, game.assets, 0);

                    this.actors.forEach(actor => {
                        cx.save();
                        if (actor.shakeBuffer) {
                            actor.shakeBuffer--;
                            cx.translate(Math.floor(random() * 8) - 4, 0);
                        }
                        actor.draw(game, cx);
                        cx.restore();
                    });
                    if (SHOW_HITBOX) this.actors.forEach(a => a.displayCollisionBox(game, cx));
                    
                    this.particles.draw(cx, game.assets, 1);
                    
                    if (this.bossKillEffect) break;

                    this.drawTiles(game, cx, this.foreground);

                    if (SHOW_HITBOX) this.currentSection.collisions.forEach(a => {
                        cx.save();
                        cx.translate(Math.round(a.pos.x), Math.round(a.pos.y));
                        cx.fillStyle = "#00f8";
                        cx.fillRect(0, 0, a.size.x, 1);
                        cx.fillRect(0, 0, 1, a.size.y);
                        cx.fillRect(a.size.x - 1, 0, 1, a.size.y);
                        cx.fillRect(0, a.size.y - 1, a.size.x, 1);
                        cx.fillStyle = "#00f4";
                        cx.fillRect(0, 0, a.size.x, a.size.y);
                        cx.restore();
                    });

                    break;
                case 2:
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.bossKillEffect) break;

                    if (this.blackout) {
                        cx.save();
                        cx.fillStyle = '#000000BF';
                        cx.fillRect(0, 0, game.width, game.height);
                        cx.globalCompositeOperation = "destination-out";

                        const largeLight = this.actors.filter(a => a instanceof Flare || a instanceof Calli || a instanceof EvilNoel || a instanceof Aqua || (a instanceof Torche && a.active));
                        largeLight.forEach(a => {
                            cx.save();
                            const pos = CollisionBox.center(a).round();
                            cx.translate(pos.x - this.view.pos.x, pos.y - this.view.pos.y);
                            if (Math.floor(this.frameCount / 16) % 2) {
                                cx.scale(-1, 1);
                            }
                            cx.drawImage(game.assets.images['ui_shadow_mask'], -64, -64);
                            cx.restore();
                        });

                        const smallLight = this.actors.filter(a => (a instanceof Arrow && a.type === 'fire') || (a instanceof Bullet && a.originActor instanceof Calli));
                        smallLight.forEach(a => {
                            cx.save();
                            const pos = CollisionBox.center(a).round();
                            cx.translate(pos.x - this.view.pos.x, pos.y - this.view.pos.y);
                            if (Math.floor(this.frameCount / 16) % 2) {
                                cx.scale(-1, 1);
                            }
                            cx.drawImage(game.assets.images['ui_shadow_mask_small'], -32, -32);
                            cx.restore();
                        });
                        cx.restore();
                    }
                    if (this.iceWind) {
                        cx.save();
                        if (!this.iceWindDir) {
                            cx.translate(game.width, 0);
                            cx.scale(-1, 1);
                        }
                        cx.drawImage(game.assets.images['sp_ice_wind'], 16 - Math.floor(this.frameCount / 2) % 16, 16 - Math.floor(this.frameCount / 2) % 16, 320, 192, 0, 0, 320, 192);
                        cx.restore();
                    }
                    if (this.rain) {
                        cx.save();
                        // if (!this.iceWindDir) {
                        //     cx.translate(game.width, 0);
                        //     cx.scale(-1, 1);
                        // }
                        cx.drawImage(game.assets.images['sp_rain'], 16 - Math.floor(this.frameCount / 2) % 16, 32 - Math.floor(this.frameCount * 2) % 32, 320, 192, 0, 0, 320, 192);
                        cx.restore();
                    }
                    
                    if (this.sun === true) {
                        cx.save();
                        cx.globalAlpha = .75 + Math.sin(this.frameCount * .02) * .25;
                        cx.globalCompositeOperation = 'lighter';
                        cx.drawImage(game.assets.images['bg_sun'], 0, 0, game.width, game.height, 0, 0, game.width, game.height);
                        cx.restore();
                    }
                    
                    if (this.enableHUD) this.displayHUD(game, cx);
                    if (this.isFocus) {
                        cx.save();
                        const viewPos = this.view.pos.times(-1).round();
                        cx.translate(viewPos.x, viewPos.y);
                        const flare = this.actors.find(actor => actor instanceof Flare);
                        // if (this.isFocus > flare.focusTime - 10) {
                        const focusWidth = 32;
                        const focusPos = new Vector2(flare.pos.x + flare.size.x / 2 - focusWidth / 2, flare.pos.y - 16).round();
                        cx.fillStyle = "#fff";
                        cx.fillRect(focusPos.x, focusPos.y, focusWidth, 4);
                        cx.fillStyle = "#f0f";
                        cx.fillRect(focusPos.x, focusPos.y, Math.ceil(this.isFocus * focusWidth / flare.focusTime), 4);
                        cx.restore();
                    }
                    if (this.blackout && game.currentStage === 2) {
                        const count = this.actors.filter(a => a instanceof Torche && a.active).length;
                        for (let y = 0; y < 8; y++) {
                            cx.drawImage(game.assets.images['vfx_smoke_white'], 0, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                            cx.drawImage(game.assets.images['vfx_smoke_black'], 8, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                            if (y < count) cx.drawImage(game.assets.images['vfx_smoke_white'], 16, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                        }
                    }
                    if (this.travelEvent) {
                        const event = this.events.find(a => a.travelCount !== undefined);
                        if (event) {
                            for (let y = 0; y < event.enemies.length; y++) {
                                cx.drawImage(game.assets.images['vfx_smoke_white'], 0, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                                cx.drawImage(game.assets.images['vfx_smoke_black'], 8, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                                if (y < event.travelCount) cx.drawImage(game.assets.images['vfx_smoke_white'], 16, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                            }
                        }
                    }
                    if (this.startTransition) {
                        cx.fillStyle = '#000';
                        cx.globalAlpha = 1 - (30 - this.startTransition) / 30;
                        cx.fillRect(0, 0, game.width, game.height);
                    }
                    
                    this.particles.draw(cx, game.assets, 2);
                    break;
            }
            cx.restore();
        }

        this.customDraw.forEach(custom => custom(game));
    }
}