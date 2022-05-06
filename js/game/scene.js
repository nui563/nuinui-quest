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

        this.currentSection = this.sections[0];
        // this.currentSection = this.sections[9];
        this.currentSection.events.forEach(event => this.events.push(new GameEvent(event.timeline, event.isPersistent)));

        // DEBUG
        // if (game.currentStage === 1) {
        //     const flare = new Flare(new Vector2(275 * 16, 31 * 16), new Vector2(16, 32)); // start
        //     // const flare = new Flare(new Vector2(146 * 16, 4 * 16), new Vector2(16, 32)); // miniboss
        //     flare.setAnimation('idle');
        //     flare.playerControl = true;
        //     this.view.target = flare;
        //     flare.hasBow = true;
        //     flare.hasKintsuba = true;
        //     flare.dir = true;
        //     this.enableHUD = true;
        //     this.actors.push(flare);
        // }
        // -----

        this.view.size = new Vector2(game.width, game.height);
        this.setViewPos();
        
        game.resetCanvas();
    }

    setViewPos = () => {
        let pos;
        if (!this.view.target) {
            pos = this.currentSection.pos;
        } else {
            const center = CollisionBox.center(this.view.target);
            pos = new Vector2(
                Math.max(this.currentSection.pos.x, Math.min(this.currentSection.pos.x + this.currentSection.size.x - this.view.size.x, center.x - this.view.size.x / 2)),
                Math.max(this.currentSection.pos.y, Math.min(this.currentSection.pos.y + this.currentSection.size.y - this.view.size.y, center.y - this.view.size.y / 2))
            ).round();
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
                this.actors = this.actors.filter(actor => actor instanceof Flare);
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

        const bossClass = (this.name === 'forest' ? Pekora : Miko);
        const boss = this.actors.find(actor => actor instanceof bossClass);
        this.bossKillEffect = boss && !boss.health && !this.bossCleared;

        
        const flare = this.actors.find(actor => actor instanceof Flare);
        if(flare && flare.hasKintsuba && game.keys.item && flare.playerControl && !this.isFocus && !flare.focusCooldown && !this.bossKillEffect) {
            this.isFocus = flare.focusTime;
            flare.focusCooldown = flare.focusCooldownTime;
            game.playSound("focus");
        }

        // Update actors
        if (this.isFocus && this.frameCount % 4) this.actors.filter(actor => actor instanceof Flare || actor instanceof Arrow).forEach(actor => actor.update(game));
        else if (!this.bossKillEffect || this.frameCount % 2) this.actors.forEach(actor => actor.update(game));

        // Update section
        this.updateSection(game);

        // Update viewport
        this.setViewPos();
        if (!this.lastViewPos || !this.view.pos.equals(this.lastViewPos)) {
            this.lastViewPos = this.view.pos;
            this.drawView = true;
        } else this.drawView = this.drawView;

        this.drawHUD = true;

        if (this.shakeBuffer) this.shakeBuffer--;

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
        const flare = this.actors.find(actor => actor instanceof Flare);
        if (flare) {
            const maxHealthWidth = 64;
            flare.healthBar = flare.healthBar ? (1 - .1) * flare.healthBar + .1 * flare.health : flare.health;
            const healthWidth = flare.healthBar * maxHealthWidth / flare.maxHealth;
            cx.fillStyle = '#000';
            cx.fillRect(9, 16, 6, maxHealthWidth);
            cx.fillStyle = '#f06';
            cx.fillRect(9, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar'], 4, 0);

            cx.drawImage(game.assets.images['ui_slot'], 0, game.height - 32);

            if (flare.hasBow) {
                cx.drawImage(game.assets.images['sp_bow_pickup'], 2, game.height - 22);
            }

            if (flare.hasKintsuba) {
                cx.drawImage(game.assets.images['ui_slot2'], 24, game.height - 32);
                if (flare.focusCooldown && !this.isFocus) {
                    cx.globalAlpha = .5;
                    cx.drawImage(game.assets.images['sp_clock'], 26, game.height - 22);
                    cx.globalAlpha = 1;
                    cx.fillStyle = "#f00";
                    cx.fillRect(28, game.height - 13, Math.ceil(flare.focusCooldown * 16 / flare.focusCooldownTime), 2);
                } else cx.drawImage(game.assets.images['sp_clock'], 26, game.height - 22);
            }
        }

        const pekora = this.actors.find(a => a instanceof Pekora);
        if (pekora) {
            const maxHealthWidth = 64;
            pekora.healthBar = pekora.healthBar ? (1 - .1) * pekora.healthBar + .1 * pekora.health : pekora.health;
            const healthWidth = pekora.healthBar * maxHealthWidth / pekora.maxHealth;
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
            const healthWidth = miko.healthBar * maxHealthWidth / miko.maxHealth;
            cx.fillStyle = '#000';
            cx.fillRect((pekora ? 44 : 24) + 5, 16, 6, maxHealthWidth);
            cx.fillStyle = '#FC78FC';
            cx.fillRect((pekora ? 44 : 24) + 5, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar_miko'], pekora ? 44 : 24, 0);
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
                this.drawView = true;
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

                    this.actors.forEach(actor => actor.draw(game, cx));
                    if (DEBUGMODE) this.actors.forEach(a => a.displayCollisionBox(game, cx));
                    
                    this.particles.update(cx, game.assets, 1);
                    break;
                case 2:
                    // if (this.drawView) {
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.bossKillEffect) break;
                    cx.translate(-this.view.pos.x, -this.view.pos.y);
                    this.drawTiles(game, cx, this.foreground);
                    // }
                    break;
                case 3:
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.bossKillEffect) break;
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

        if (this.drawView) this.drawView = false;
        // if (DEBUGMODE) this.drawCollisions(game, game.ctx3);
    }
}