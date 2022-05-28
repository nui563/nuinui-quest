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
    
    dropHeart = (game, rate) => {
        if (Math.random() > rate) {
            game.scene.actors.push(new Heart(CollisionBox.center(this).plus(new Vector2(-4, -4))));
        }
    }

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

    displayCollisionBox = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.fillStyle = "#00f8";
        cx.fillRect(0, 0, this.size.x, 1);
        cx.fillRect(0, 0, 1, this.size.y);
        cx.fillRect(this.size.x - 1, 0, 1, this.size.y);
        cx.fillRect(0, this.size.y - 1, this.size.x, 1);
        cx.fillStyle = "#00f4";
        cx.fillRect(0, 0, this.size.x, this.size.y);
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
        this.dir = game.scene.actors.find(a => a instanceof Flare).pos.x > this.pos.x;
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
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound('no_damage');
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
        const actorCollisions = game.scene.actors.filter(actor => (!(actor instanceof Projectile) || actor instanceof Rocket) && ![this.originActor].includes(actor) && actor.checkHit(game, this));
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
        else if (!CollisionBox.intersects(this, game.scene.view)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }
        this.vel.y = 0;

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

    constructor(pos, vel, originActor) {
        super(pos, new Vector2(4, 4), vel, originActor);
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
        cx.drawImage(game.assets.images['sp_bullet'], Math.floor(this.frameCount / 4) % 2 ? 0 : 8, 0, 8, 8, -2, -2, 8, 8);
        cx.restore();
    }
}

class Rocket extends Projectile {

    constructor(pos, vel, originActor) {
        super(pos, new Vector2(8, 8), vel, originActor);
    }

    health = 2;

    takeHit = (game, other) => {
        this.health--;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);

        if (this.health) {
            this.shakeBuffer = 15;
            game.playSound('hit');
        } else {
            game.scene.actors = game.scene.actors.filter(a => a !== this);
            game.scene.particles.explosion(CollisionBox.center(this));
            game.scene.shakeBuffer = 4;
            game.playSound("rumble");
            this.dropHeart(game, .9);
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        const p1 = CollisionBox.center(flare);
        const p2 = CollisionBox.center(this);
        this.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
        const vel = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(-1);
        if (Math.random() > .5) vel.y -= .5;

        this.pos = this.pos.plus(vel);
        game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(this.vel.x > 0 ? -4 : 4, 0)), new Vector2(0, 0), 0);

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
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.explosion(CollisionBox.center(this));
            game.scene.shakeBuffer = 4;
            game.playSound("rumble");
            this.dropHeart(game, .9);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x + 4), Math.round(this.pos.y + 4));
        cx.rotate(this.angle - Math.PI)
        cx.drawImage(game.assets.images['sp_peko_rocket'], -8, -8);
        cx.restore();
    }
}

class Aircon extends Actor {

    constructor(pos) {
        super(new Vector2(pos.x * 16, pos.y * 16), new Vector2(32, 4 * 16));
    }

    checkHit = (game, collisionBox) => {
        return false;
    }

    update = game => {
        if (Math.random() > .75) game.scene.particles.shine_vel_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, 16)), new Vector2(0, -3), 1);
        const actors = game.scene.actors.filter(actor => ![this].includes(actor) && actor.checkHit(game, this));
        actors.forEach(actor => actor.vel.y = Math.max(-8, actor.vel.y - 1.5));
        this.frameCount++;
    }
    
    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_aircon'], 0, this.size.y - 16);
        cx.restore();
    }
}