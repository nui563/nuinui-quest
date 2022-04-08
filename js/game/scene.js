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

    sectionEvents = FOREST_EVENTS;
    events = [];
    event = null;

    enableHUD = false;

    shakeBuffer = 0;

    constructor(game, data) {
        
        this.sections = [];
        data.sections.forEach(({pos, size, actors}) => {
            this.sections.push({
                pos: new Vector2(pos.x * 16, pos.y * 16),
                size: new Vector2(size.x * 16, size.y * 16),
                events: this.sectionEvents[`${pos.x / 20}_${pos.y / 12}`],
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
        // this.currentSection = this.sections[5];
        this.currentSection.events.forEach(event => this.events.push(new GameEvent(event.timeline, event.isPersistent)));

        // DEBUG
        // const flare = new Flare(new Vector2(142 * 16, 16 * 16), new Vector2(16, 32));
        // flare.setAnimation('idle');
        // flare.playerControl = true;
        // this.view.target = flare;
        // flare.hasBow = true;
        // flare.dir = false;
        // this.enableHUD = true;
        // this.actors.push(flare);
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

        // Update actors
        this.actors.forEach(actor => actor.update(game));

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
                    if (tile > 63) tile += 8 * (Math.floor(this.frameCount / (tile === 69 ? 12 : tile > 69 ? 24 : 6)) % 3);
                    ctx.drawImage(game.assets.images['ts_forest'], (tile % 8) * 16, Math.floor(tile / 8) * 16, 16, 16, x * 16, y * 16, 16, 16);
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
        const img = this.sakugaEffect ? 'bg_forest_sakuga' : 'bg_forest';
        cx.drawImage(game.assets.images[img], this.sakugaEffect ? game.width * (Math.floor(this.frameCount / 4) % 2) : 0, 0, game.width, game.height, 0, 0, game.width, game.height);
    }

    displayHUD = (game, cx) => {
        const flare = this.actors.find(actor => actor instanceof Flare);
        if (flare) {
            const maxHealthWidth = 64;
            const healthWidth = flare.health * maxHealthWidth / flare.maxHealth;
            cx.fillStyle = '#000';
            cx.fillRect(9, 16, 6, maxHealthWidth);
            cx.fillStyle = '#f06';
            cx.fillRect(9, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar'], 4, 0);

            cx.drawImage(game.assets.images['ui_slot'], 0, game.height - 32);

            if (flare.hasBow) {
                cx.drawImage(game.assets.images['sp_bow_pickup'], 2, game.height - 22);
            }
        }

        const pekora = this.actors.find(a => a instanceof Pekora);
        if (pekora) {
            const maxHealthWidth = 64;
            const healthWidth = pekora.health * maxHealthWidth / pekora.maxHealth;
            cx.fillStyle = '#000';
            cx.fillRect(29, 16, 6, maxHealthWidth);
            cx.fillStyle = '#8FAFFF';
            cx.fillRect(29, 16 + maxHealthWidth - healthWidth, 6, healthWidth);
            cx.drawImage(game.assets.images['ui_healthbar_pekora'], 24, 0);
        }

        if (this.cleared) {
            cx.drawImage(game.assets.images['ui_level_cleared'], 0, game.height / 2 - 7);
        }
    }
    
    draw = game => {
        for (let i = 0; i < 4; i++) {
            const cx = game[`ctx${i}`];
            cx.save();
            if (this.shakeBuffer) {
                this.drawView = true;
                cx.translate(Math.floor(Math.random() * 8) - 4, 0);
            }
            switch (i) {
                case 0:
                    // if (this.drawView) {
                        cx.clearRect(0, 0, game.width, game.height);
                        this.drawBackground(game, cx);
                        cx.translate(-this.view.pos.x, -this.view.pos.y);
                        this.drawTiles(game, cx, this.background);
                    // }
                    break;
                case 1:
                    cx.clearRect(0, 0, game.width, game.height);
                    cx.translate(-this.view.pos.x, -this.view.pos.y);
                    
                    this.particles.update(cx, game.assets, 0);

                    this.actors.forEach(actor => actor.draw(game, cx));
                    if (DEBUGMODE) this.actors.forEach(a => a.displayCollisionBox(game, cx));
                    
                    this.particles.update(cx, game.assets, 1);
                    break;
                case 2:
                    // if (this.drawView) {
                        cx.clearRect(0, 0, game.width, game.height);
                        cx.translate(-this.view.pos.x, -this.view.pos.y);
                        this.drawTiles(game, cx, this.foreground);
                    // }
                    break;
                case 3:
                    cx.clearRect(0, 0, game.width, game.height);
                    if (this.enableHUD) this.displayHUD(game, cx);
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