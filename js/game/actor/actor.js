class Actor {
    frameCount = 0;

    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    update = game => this.frameCount++;

    draw = (game, cx) => {
        if (DEBUGMODE) this.displayCollisionBox(game);
    }

    checkHit = (game, collisionBox) => {
        return CollisionBox.intersects(this, collisionBox);
    }

    takeHit = game => {}

    displayAnimation = (cx, animation, asset) => {
        cx.save();
        cx.translate(this.pos.x, this.pos.y);
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(asset,
            Math.floor(this.frameCount * animation.speed) % animation.frames * animation.size.x, 0, animation.size.x, animation.size.y,
            animation.offset.x, animation.offset.y, animation.size.x, animation.size.y
        );
        cx.restore();
    }

    displayCollisionBox = game => {
        const cx = game.ctx3;
        const pos = this.pos.round();
        cx.save();
        cx.fillStyle = "#00f8";
        cx.fillRect(pos.x, pos.y, this.size.x, 1);
        cx.fillRect(pos.x, pos.y, 1, this.size.y);
        cx.fillRect(pos.x + this.size.x - 1, pos.y, 1, this.size.y);
        cx.fillRect(pos.x, pos.y + this.size.y - 1, this.size.x, 1);
        cx.fillStyle = "#00f4";
        cx.fillRect(pos.x, pos.y, this.size.x, this.size.y);
        cx.restore();
    }
}

class Elfriend extends Actor {
    size = new Vector2(24, 16);

    randomFlight = Math.floor(Math.random() * 360);

    constructor(pos, dir) {
        super(pos);
        this.dir = dir;
    }

    update = game => {

        // this.pos.x += Math.sin(this.frameCount * 2 / 180 * Math.PI) / 4;
        this.pos.y += Math.cos(((this.randomFlight + this.frameCount * 2) % 360) / 180 * Math.PI) / 4;

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
        cx.drawImage(game.assets.images['sp_elfriend_idle'], Math.floor((this.randomFlight % 2 + this.frameCount) * .2) % 2 * 24, 0, 24, 24, 0, 0, 24, 24);
        cx.restore();
    }
}

class Nousabot extends Actor {
    size = new Vector2(24, 24);
    vel = new Vector2(0, 0);

    maxHealth = 3;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        this.health--;
        game.scene.shakeBuffer = 15;
        this.hitBuffer = 20;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.explosion(CollisionBox.center(this));
            game.playSound("rumble");
        } else {
            game.playSound('damage');
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        // if (this.vel.y) this.vel.y += this.gravity;
        this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI)) / 4;
        this.vel.y = Math.sin((this.frameCount / 2048) * (180 / Math.PI)) / 4;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        for (let i = 0; i < 2; i++) {
            const dist = .5;
            const a = Math.cos(Math.random() * 2 * Math.PI);
            const b = Math.sin(Math.random() * 2 * Math.PI);
            game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(-this.vel.x + a * dist, -this.vel.y + b * dist), 0);
        }

        // Attack
        if ([87, 107, 127].includes(this.frameCount % 128)) {
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);
            if (p1.distance(p2) < 192 && p1.y - 32 < p2.y) {
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
                game.scene.actors.push(new Bullet(p1, new Vector2(8, 8), vel, this));
                game.playSound("pew");
            }
        }

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
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
        cx.drawImage(game.assets.images['sp_nousabot'], 0, 0, 24, 24, 0, 0, 24, 24);
        cx.restore();
    }
}

// class SavePoint extends Actor {
//     size = new Vector2(32, 48);
//     isSaving = false;
//     constructor(pos) {
//         super(pos);
//     }

//     update = game => {
//         const flare = game.scene.actors.find(actor => actor instanceof Flare);
//         const collision = flare && CollisionBox.intersects(this, flare);

//         if (collision) {
//             if (!this.isSaving) {
//                 this.isSaving = true;
//             }
//         } else if (this.isSaving) this.isSaving = false;
//     }

//     draw = (game, cx) => {
//         cx.save();
//         cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
//         cx.drawImage(game.assets.images['sp_vending_machine'], 0, 0, 32, 48, 0, 0, 32, 48);
//         cx.restore();
//     }
// }

class Projectile extends Actor {
    constructor(pos, size, vel, originActor) {
        super(pos, size);
        this.vel = vel;
        this.originActor = originActor;
    }
    
    update = game => {
        this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => ![this, this.originActor].includes(actor) && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            collision = true;
        }
        else if (CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
            game.playSound('no_damage');
            game.scene.particles.sparkle_white(CollisionBox.center(this));
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }

        this.frameCount++;
    }
}

class Arrow extends Projectile {
    constructor(pos, size, vel, originActor) {
        super(pos, size, vel, originActor);
    }
    
    update = game => {
        this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => !(actor instanceof Projectile) && ![this.originActor].includes(actor) && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            collision = true;
        }
        else if (CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
            game.playSound('no_damage');
            game.scene.particles.sparkle_white(CollisionBox.center(this));
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.vel.x < 0) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_arrow'], 0, 0, 20, 10, 0, 0, 20, 10);
        cx.restore();
    }
}

class Bullet extends Projectile {
    constructor(pos, size, vel, originActor) {
        super(pos, size, vel, originActor);
    }

    update = game => {
        this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => actor instanceof Flare && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            collision = true;
        }
        else if (CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
            game.playSound('no_damage');
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            game.scene.shakeBuffer = 4;
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['vfx_smoke_white'], 0, 0, 8, 8, 0, 0, 8, 8);
        cx.restore();
    }
}