class ATField extends Actor {

    constructor(pos, dir) {
        super(pos, new Vector2(24, 48));
        this.dir = dir;
    }

    update = game => {
        const actorCollisions = game.scene.actors.filter(actor => (actor instanceof Flare || actor instanceof Arrow) && actor.checkHit(game, this) && !actor.reflected);
        if (actorCollisions.length && actorCollisions.some(a => a instanceof Arrow)) {
            this.shakeBuffer = 4;
            game.playSound("no_damage");
        }
        actorCollisions.forEach(a => {
            if (a instanceof Arrow) {
                a.reflected = true;
                a.vel.x = -a.vel.x;
            } else {
                a.vel.x = (a.animation !== 'idle' ? Math.abs(a.vel.x) : 1) * (this.dir ? 1 : -1);
            }
        });
        // if (this.active && !(this.frameCount % 4)) game.scene.particles.sparkle_fire(CollisionBox.center(this), new Vector2(0, -.5));
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_atfield'], Math.floor((this.frameCount) * .2) % 3 * 24, 0, 24, 48, 0, 0, 24, 48);
        cx.restore();
    }
}