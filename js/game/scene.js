class Scene {
    frameCount = 0;
    sectionFrame = 0;

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

        this.background = data.layers.background;
        this.foreground = data.layers.foreground;

        Object.keys(data.layers.collisions).forEach(key => {
            const [x, y] = key.split("_");
            const collision = { pos: { x: x * 16, y: y * 16 }, size: { x: 16, y: 16 }};
            const section = this.sections.find(section => CollisionBox.includedIn(collision, section));
            if (section) section.collisions.push(collision);
        });

        // DEBUG
        const urlParams = new URLSearchParams(window.location.search);
        const checkpoints = [[CHECKPOINT_STAGE_1_0, CHECKPOINT_STAGE_1_1, CHECKPOINT_STAGE_1_2], [CHECKPOINT_STAGE_2_0, CHECKPOINT_STAGE_2_1], [CHECKPOINT_STAGE_3_0, CHECKPOINT_STAGE_3_1]];
        if (urlParams.has('checkpoint')) game.checkpoint = checkpoints[game.currentStage][parseInt(urlParams.get('checkpoint')) - 1];
        
        if (game.checkpoint) game.checkpoint(game, this);
        else {
            this.currentSection = this.sections[0];
            this.currentSection.events.forEach(event => this.events.push(new GameEvent(event.timeline, event.isPersistent)));
        }

        this.view.size = new Vector2(game.width, game.height);
        this.setViewPos();
        
        game.resetCanvas();
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
        }
        
        if (this.lockedViewPos) {
            if (this.lockedViewPos.x) pos.x = this.lockedViewPos.x;
            if (this.lockedViewPos.y) pos.y = this.lockedViewPos.y;
        }
        // this.view.pos = this.view.pos ? this.view.pos.lerp(pos, .1) : pos;
        this.view.pos = pos;
    }

    updateSection = game => {
        const center = CollisionBox.center(this.view.target);
        if (!center.inBox(this.currentSection)) {
            const newSection = this.sections.find(section => center.inBox(section));
            if (newSection) {
                this.currentSection = newSection;
                this.sectionFrame = 0;
                this.events = this.events.filter(event => event.isPersistent);
                if (this.currentSection.events) {
                    this.currentSection.events.filter(event => event.condition(game)).forEach(event => this.events.push(new GameEvent(event.timeline, event.isPersistent)));
                }
                const persistentActors = [];
                this.events.forEach(e => {
                    if (e.actors) persistentActors.push(...e.actors);
                });
                this.actors = this.actors.filter(actor => actor instanceof Flare || persistentActors.includes(actor));
                this.currentSection.actors.forEach(event => {
                    this.actors.push(eval("new " + event.className + "(...event.data)"));
                });
            }
        }
    }

    update = game => {
        // Execute event if possible
        if (this.events.length) {
            this.events.forEach(event => {
                event.update(game);
                if (event.end) this.events = this.events.filter(e => e !== event);
            })
        }

        const bossClass = (this.name === 'forest' ? Pekora : game.currentStage === 2 ? Marine : Miko);
        const boss = this.actors.find(actor => actor instanceof bossClass);
        this.bossKillEffect = boss && !boss.health && !this.bossCleared;

        
        const flare = this.actors.find(actor => actor instanceof Flare);
        if(flare && flare.item && game.keys.item && flare.playerControl && !this.isFocus && !flare.focusCooldown && !this.bossKillEffect && !flare.jetski) {
            this.isFocus = flare.focusTime;
            flare.focusCooldown = flare.focusCooldownTime;
            game.playSound("focus");
            // if (game.bgm) {
            //     game.bgm.source.playbackRate = .5;
            // }
        }

        // Update actors
        this.actors = this.actors.filter(a => !a.toFilter);
        if (this.isFocus && this.frameCount % 4) this.actors.filter(actor => actor instanceof Flare || actor instanceof Arrow).forEach(actor => actor.update(game));
        else if (!this.bossKillEffect || this.frameCount % 2) this.actors.forEach(actor => actor.update(game));

        // Update section
        this.updateSection(game);

        // Update viewport
        this.setViewPos();
        if (!this.lastViewPos || !this.view.pos.equals(this.lastViewPos)) {
            this.lastViewPos = this.view.pos;
        }

        this.drawHUD = true;

        if (this.shakeBuffer) this.shakeBuffer--;

        if (this.iceWind) this.iceWind--;
        if (this.isFocus) this.isFocus--;
        this.sectionFrame++;
        this.frameCount++;

        if (this.nextScene) game.scene = this.nextScene;
    }

    drawTiles = (game, ctx, tiles) => {
        const pos = this.view.pos.times(1 / 16).floor();
        for (let y = pos.y; y < pos.y + 1 + this.view.size.y / 16; y++) {
            for (let x = pos.x; x < pos.x + 1 + this.view.size.x / 16; x++) {
                let tile = parseInt(tiles[`${x}_${y}`], 16);
                if (tile) {
                    if (tile > 63) tile += 8 * (Math.floor(this.frameCount / (tile === 69 ? 12 : tile > 69 && this.name === 'forest' ? 24 : 6)) % 3);
                    ctx.drawImage(game.assets.images[`ts_${this.name}`], (tile % 8) * 16, Math.floor(tile / 8) * 16, 16, 16, x * 16, y * 16, 16, 16);
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
        const img = `bg_${this.name}`;
        cx.drawImage(game.assets.images[img], 0, 0, game.width, game.height, 0, 0, game.width, game.height);
    }

    displayHUD = (game, cx) => {

        cx.drawImage(game.assets.images['ui_score'], game.width - 57, 2);
        game.scoreDisplay = game.scoreDisplay ? (1 - .1) * game.scoreDisplay + .1 * game.score : game.score;
        const digits = Array.from(String(Math.ceil(game.scoreDisplay)), num => Number(num));
        while (digits.length < 8) digits.unshift(0);
        digits.forEach((digit, i) => {
            cx.drawImage(game.assets.images['ui_digit'], 5 * digit, 0, 5, 5, game.width - 53 + 6 * i, 5, 5, 5);
        });

        if (game.timer) {
            cx.drawImage(game.assets.images['ui_timer'], game.width - 39, 15);

            const time = (new Date().getTime() - game.timer.getTime()) / 1000;
            let minutes = parseInt(time / 60, 10);
            let seconds = parseInt(time % 60, 10);
            minutes = (minutes < 10 ? "0" + minutes : minutes).toString();
            seconds = (seconds < 10 ? "0" + seconds : seconds).toString();

            minutes.split('').forEach((digit, i) => {
                cx.drawImage(game.assets.images['ui_digit'], 5 * parseInt(digit), 0, 5, 5, game.width - 35 + 6 * i, 18, 5, 5);
            });
            seconds.split('').forEach((digit, i) => {
                cx.drawImage(game.assets.images['ui_digit'], 5 * parseInt(digit), 0, 5, 5, game.width - 17 + 6 * i, 18, 5, 5);
            });
        }

        const flare = this.actors.find(actor => actor instanceof Flare);
        if (flare) {
            const maxHealthWidth = 64;
            flare.healthBar = flare.healthBar ? (1 - .1) * flare.healthBar + .1 * flare.health : flare.health;
            const healthWidth = Math.ceil(flare.healthBar * maxHealthWidth / flare.maxHealth);
            cx.fillStyle = '#000';
            cx.fillRect(9, 16, 6, maxHealthWidth);
            cx.fillStyle = '#f06';
            cx.fillRect(9, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar'], 4, 0);

            cx.drawImage(game.assets.images['ui_slot'], 0, game.height - 32);

            if (flare.hasBow && !flare.jetski) {
                cx.drawImage(game.assets.images['sp_bow_pickup'], 2, game.height - 22);
                if (flare.chargeShot) {
                    cx.drawImage(game.assets.images['ui_charge_type'], flare.chargeType * 12, 0, 12, 12, 12, game.height - 12, 12, 12);
                }
            }

            if (flare.item && !flare.jetski) {
                cx.drawImage(game.assets.images['ui_slot2'], 24, game.height - 32);
                if (flare.focusCooldown && !this.isFocus) {
                    cx.globalAlpha = .5;
                    cx.drawImage(game.assets.images['sp_clock'], 26, game.height - 22);
                    cx.globalAlpha = 1;
                    cx.fillStyle = "#f00";
                    cx.fillRect(28, game.height - 13, Math.ceil(flare.focusCooldown * 16 / flare.focusCooldownTime), 2);
                } else cx.drawImage(game.assets.images['sp_clock'], 26, game.height - 22);
            }

            if (flare.chargeTypeBufferAnim && !flare.jetski) {
                cx.translate(-this.view.pos.x, -this.view.pos.y);
                cx.drawImage(game.assets.images['ui_charge_type'], flare.chargeType * 12, 0, 12, 12, Math.round(flare.pos.x + flare.size.x / 2) - 6, Math.round(flare.pos.y) - 20, 12, 12);
            }

            if (flare.jetski) {
                cx.drawImage(game.assets.images['sp_jetski_item'], 2, game.height - 22);
            }
        }

        const pekora = this.actors.find(a => a instanceof Pekora);
        if (pekora) {
            const maxHealthWidth = 64;
            pekora.healthBar = pekora.healthBar ? (1 - .1) * pekora.healthBar + .1 * pekora.health : pekora.health;
            const healthWidth = Math.ceil(pekora.healthBar * maxHealthWidth / pekora.maxHealth);
            cx.fillStyle = '#000';
            cx.fillRect(29, 16, 6, maxHealthWidth);
            cx.fillStyle = '#8FAFFF';
            cx.fillRect(29, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar_pekora'], 24, 0);
        }
        
        const miko = this.actors.find(a => a instanceof Miko);
        if (miko) {
            const maxHealthWidth = 64;
            miko.healthBar = miko.healthBar ? (1 - .1) * miko.healthBar + .1 * miko.health : miko.health;
            const healthWidth = Math.ceil(miko.healthBar * maxHealthWidth / miko.maxHealth);
            cx.fillStyle = '#000';
            cx.fillRect((pekora ? 44 : 24) + 5, 16, 6, maxHealthWidth);
            cx.fillStyle = '#FC78FC';
            cx.fillRect((pekora ? 44 : 24) + 5, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar_miko'], pekora ? 44 : 24, 0);
        }
        
        const marine = this.actors.find(a => a instanceof Marine);
        if (marine) {
            const maxHealthWidth = 64;
            marine.healthBar = marine.healthBar ? (1 - .1) * marine.healthBar + .1 * marine.health : marine.health;
            const healthWidth = Math.ceil(marine.healthBar * maxHealthWidth / marine.maxHealth);
            cx.fillStyle = '#000';
            cx.fillRect(29, 16, 6, maxHealthWidth);
            cx.fillStyle = '#FCB800';
            cx.fillRect(29, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar_marine'], 24, 0);
        }

        const fubuki = this.actors.find(a => a instanceof Fubuki);
        if (fubuki) {
            const maxHealthWidth = 64;
            fubuki.healthBar = fubuki.healthBar ? (1 - .1) * fubuki.healthBar + .1 * fubuki.health : fubuki.health;
            const healthWidth = Math.ceil(fubuki.healthBar * maxHealthWidth / fubuki.maxHealth);
            cx.fillStyle = '#000';
            cx.fillRect(29, 16, 6, maxHealthWidth);
            cx.fillStyle = '#8FAFFF';
            cx.fillRect(29, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar_fubuki'], 24, 0);
        }
    }

    displayWarning = (game, cx) => {
        // cx.fillStyle = "#0008";
        // cx.fillRect(0, 32, game.width, 11);
        for (let i = 0; i < 6; i++) {
            const speed = game.frameCount * 2;
            cx.drawImage(game.assets.images['ui_warning'], 64 * (i-1) + speed % 64, 64);
            cx.drawImage(game.assets.images['ui_warning'], 64 * i - speed % 64, game.height - 64 - 12);
        }
    }
    
    draw = game => {
        for (let i = 0; i < 4; i++) {
            const cx = game[`ctx${i}`];
            cx.save();
            if (SCREENSHAKE && this.shakeBuffer) {
                cx.translate(Math.floor(Math.random() * 8) - 4, 0);
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
            switch (i) {
                case 0:
                    // if (this.drawView) {
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.bossKillEffect) {
                        cx.fillStyle = "#fff";
                        cx.fillRect(0, 0, game.width, game.height);
                        break;
                    }
                    this.drawBackground(game, cx);
                    cx.translate(-this.view.pos.x, -this.view.pos.y);
                    this.drawTiles(game, cx, this.background);
                    // }
                    break;
                case 1:
                    cx.clearRect(0, 0, game.width, game.height);

                    if (this.isFocus) {
                        if (this.isFocus < 10) cx.globalAlpha = this.isFocus / 10;
                        for (let i = 0; i < game.height; i++) {
                            cx.drawImage(game.assets.images['ui_focus'], 0, i, 336, 1, Math.cos(((this.frameCount + i) / game.height / 4) * (180 / Math.PI)) * 4 - 8, i, 336, 1);
                        }
                        const flare = this.actors.find(actor => actor instanceof Flare);
                        if (this.isFocus > flare.focusTime - 30) game.scene.particles.shine_white(this.view.pos.plus(new Vector2(Math.random() * game.width, Math.random() * game.height).round()), 1);
                        if (this.isFocus > flare.focusTime - 10) {
                            cx.fillStyle = '#fff';
                            cx.globalAlpha = (this.isFocus - flare.focusTime - 10) / 10;
                            cx.fillRect(0, 0, game.width, game.height);
                        }
                        cx.globalAlpha = 1;
                    }

                    cx.translate(-this.view.pos.x, -this.view.pos.y);

                    this.particles.update(cx, game.assets, 0);

                    this.actors.forEach(actor => {
                        cx.save();
                        if (actor.shakeBuffer) {
                            actor.shakeBuffer--;
                            cx.translate(Math.floor(Math.random() * 8) - 4, 0);
                        }
                        actor.draw(game, cx);
                        cx.restore();
                    });
                    if (DEBUGMODE) this.actors.forEach(a => a.displayCollisionBox(game, cx));
                    
                    this.particles.update(cx, game.assets, 1);
                    break;
                case 2:
                    // if (this.drawView) {
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.bossKillEffect) break;
                    if (this.iceWind) {
                        cx.save();
                        if (!this.iceWindDir) {
                            cx.translate(game.width, 0);
                            cx.scale(-1, 1);
                        }
                        cx.drawImage(game.assets.images['sp_ice_wind'], 16 - this.frameCount % 16, 16 - this.frameCount % 16, 320, 192, 0, 0, 320, 192);
                        cx.restore();
                    }
                    cx.translate(-this.view.pos.x, -this.view.pos.y);
                    this.drawTiles(game, cx, this.foreground);
                    if (DEBUGMODE) this.currentSection.collisions.forEach(a => {
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
                    // }
                    break;
                case 3:
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.bossKillEffect) break;

                    if (game.currentStage === 2 && this.blackout && !this.miniBossCleared) {
                        cx.save();
                        cx.fillStyle = '#000c';
                        cx.fillRect(0, 0, game.width, game.height);
                        cx.globalCompositeOperation = "destination-out";

                        const largeLight = this.actors.filter(a => a instanceof Flare || a instanceof Aqua || (a instanceof Torche && a.active));
                        largeLight.forEach(a => {
                            cx.save();
                            const pos = CollisionBox.center(a).round();
                            cx.translate(pos.x - this.view.pos.x, pos.y - this.view.pos.y);
                            if (Math.floor(this.frameCount / 16) % 2) {
                                cx.scale(-1, 1);
                            }
                            cx.drawImage(game.assets.images['ui_shadow_mask'], -64, -64);
                            cx.restore();
                        })

                        const smallLight = this.actors.filter(a => a instanceof Arrow && a.type === 'fire');
                        smallLight.forEach(a => {
                            cx.save();
                            const pos = CollisionBox.center(a).round();
                            cx.translate(pos.x - this.view.pos.x, pos.y - this.view.pos.y);
                            if (Math.floor(this.frameCount / 16) % 2) {
                                cx.scale(-1, 1);
                            }
                            cx.drawImage(game.assets.images['ui_shadow_mask_small'], -32, -32);
                            cx.restore();
                        })
                        cx.restore();
                    }

                    if (game.demoCleared) {
                        cx.drawImage(game.assets.images['ui_level_thanks'], game.width / 2 - 64, 0);
                    }
                    if (this.enableHUD) this.displayHUD(game, cx);
                    if (this.warning) this.displayWarning(game, cx);
                    if (this.isFocus) {
                        cx.save();
                        cx.translate(-this.view.pos.x, -this.view.pos.y);
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
                    if (game.currentStage === 2 && this.blackout && !this.miniBossCleared) {
                        const count = this.actors.filter(a => a instanceof Torche && a.active).length;
                        for (let y = 0; y < 8; y++) {
                            cx.drawImage(game.assets.images['vfx_smoke_white'], 0, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                            cx.drawImage(game.assets.images['vfx_smoke_black'], 8, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                            if (y < count) cx.drawImage(game.assets.images['vfx_smoke_white'], 16, 0, 8, 8, 22, 4 + y * 10, 8, 8);
                        }
                    }
                    if (this.frameCount < 30) {
                        cx.fillStyle = '#000';
                        cx.globalAlpha = 1 - this.frameCount / 30;
                        cx.fillRect(0, 0, game.width, game.height);
                    }
                    break;
            }
            cx.restore();
        }

        this.customDraw.forEach(custom => custom(game));
        this.customDraw = [];
    }
}