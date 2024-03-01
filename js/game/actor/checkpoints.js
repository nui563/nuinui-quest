class Checkpoint extends Actor {
    size = new Vector2(16, 24);

    canHelp = false;

    constructor(data) {
        super();
        Object.entries(data).forEach(([key, value]) => this[key] = value);
        this.pos = new Vector2(this.pos.x, this.pos.y).times(16);
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            if (game.checkpoint !== this) {
                this.setCheckpoint(game);
            } else if (!this.canHelp) {
                if (game.deathCount > 2 && !flare.helpHealth) this.canHelp = true;
            } if (this.canHelp) {
                game.scene.customDraw.push(game => {
                    if (this.canHelp) {
                        game.ctx2.save();
                        game.ctx2.filter = 'invert(1)';
                        game.ctx2.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                        game.ctx2.translate(Math.round(flare.pos.x), Math.round(flare.pos.y - 24));
                        game.ctx2.drawImage(game.assets.images['ui_text_bubble'], 32, 0, 32, 32, -16, -16, 32, 32);
                        game.ctx2.drawImage(game.assets.images['ui_help'], 0, 0, 32, 8, -16, -8, 32, 8);
                        game.ctx2.drawImage(game.assets.images['ui_arrow_down'], 0, 0, 16, 16, 6, -(Math.floor(this.frameCount / 32) % 2), 16, 16);
                        game.ctx2.restore();
                    }
                });
                if (game.keys.down) {
                    flare.health = flare.maxHealth;
                    flare.helpHealth = flare.maxHealth;
                    game.playSound('question');
                    game.scene.particles.explosion(this.pos);
                    game.scene.shakeBuffer = 15;
                    game.scene.actors = game.scene.actors.filter(actor => actor !== this);
                }
            }
        }
        if (this.canHelp && !(this.frameCount % 4)) game.scene.particles.shine_white(CollisionBox.center(this), 1);
        if (this.buffer) this.buffer--;
        this.frameCount++;
    }

    setCheckpoint = game => {
        if (this.buffer) return;
        this.buffer = 30;

        game.deathCount = 0;
        game.checkpoint = this;
        game.saveData.setItem('nuinui-save-current-stage', game.currentStage);
        game.saveData.setItem('nuinui-save-current-mode', game.mode);
        game.saveData.save('auto');
        game.playSound('start');
        game.scene.particles.explosion(this.pos);
        game.scene.shakeBuffer = 15;
        // const flare = game.scene.actors.find(actor => actor instanceof Flare);
        // flare.health = flare.maxHealth;
    }

    checkHit = (game, collisionBox) => {
        if (collisionBox instanceof Comet) return null;
        if (collisionBox.type === 'mace') return null;
        if (collisionBox.type === 'dual') return null;
        if (collisionBox instanceof Arrow && collisionBox.type === 'sword') return null;
        return CollisionBox.intersects(this, collisionBox);
    }

    takeHit = (game, other) => {

        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (game.checkpoint !== this) this.setCheckpoint(game);
        else game.playSound('no_damage');
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_checkpoint'], 0, 0);
        if (game.checkpoint === this) cx.drawImage(game.assets.images[this.canHelp ? 'sp_elfriend_help' : 'sp_elfriend_idle'], 0, 0, 24, 24, -8, -14, 24, 24);
        cx.restore();
    }

    respawn = (game, scene) => {
        scene.currentSection = scene.sections[this.section];
        const flare = new (game.mode === 'noel' ? Noel : Flare)(game, this.pos.plus(new Vector2(0, -8)), new Vector2(16, 32), game.mode);
        flare.setAnimation('idle');
        flare.playerControl = true;
        flare.dir = this.dir;

        scene.actors.push(flare);
        scene.enableHUD = true;
        scene.view.target = flare;
        if (this.sceneData) Object.entries(this.sceneData).forEach(([key, value]) => scene[key] = value);

        if (this.bgm) game.playBGM(this.bgm);
    }
}