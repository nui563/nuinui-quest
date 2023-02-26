class Comet extends Actor {
    size = new Vector2(16, 16);
    damage = 1;

    constructor(pos, vel) {
        super(pos);
        this.vel = vel;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 0);
        if (!(this.frameCount % 4)) game.scene.particles.sparkle_fire_2(CollisionBox.center(this), null, 1);

        this.pos = this.pos.plus(this.vel);
        
        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => !(actor instanceof Comet) && !(actor instanceof Suisei) && actor.checkHit(game, this));
        if (actorCollisions.length) {
            if (actorCollisions.length === 1 && actorCollisions[0] instanceof Axe) {
                this.vel.x = (2 + Math.random() * 4) * (CollisionBox.center(this).x < CollisionBox.center(actorCollisions[0]).x ? -1 : 1);
            } else {
                collision = true;
                actorCollisions.forEach(collision => {
                    collision.takeHit(game, this);
                });
                game.scene.particles.explosion(CollisionBox.center(this));
                this.shakeBuffer = 4;
                game.playSound("explosion");
            }
        }
        else if (CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length && this.pos.y > flare.pos.y) {
            collision = true;
            game.scene.particles.explosion(CollisionBox.center(this));
            this.shakeBuffer = 4;
            game.playSound("explosion");
        }
        else if (!CollisionBox.intersects(this, game.scene.view) && this.pos.y > flare.pos.y) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }

        this.frameCount++;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_comet'], 0, 0);
        cx.restore();
    }
}

class Axe extends Actor {
    size = new Vector2(64, 32);
    vel = new Vector2(0, 0);
    damage = 1;

    gravity = .15;
    isGravity = true;
    isGrounded = false;
    isRotation = false;

    angle = null;

    constructor(pos) {
        super(pos);
    }

    takeHit = (game, other) => {
        this.shakeBuffer = 2;
        game.playSound('no_damage');
        game.scene.particles.sparkle_white(CollisionBox.center(other));
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (this.waitFrame) {
            this.waitFrame--;
            return;
        }
        if (this.isGravity && !this.isGrounded && !this.gravityBuffer) this.vel.y += this.gravity;
        this.pos = this.pos.plus(this.vel);
        
        if (!this.isGrounded && this.pos.y >= (4 * 12 + 10) * 16 - this.size.y) {
            game.scene.particles.run(this, true);
            game.scene.particles.run(this, false);
            game.scene.shakeBuffer = 4;
            game.playSound('rumble');
            this.isGrounded = true;
            this.size = new Vector2(64, 32);
            this.pos.y = (4 * 12 + 10) * 16 - this.size.y;
            this.vel.y = 0;
        }

        if (this.pos.x < ((6 * 20 + 2) * 16)) {
            this.pos.x = (6 * 20 + 2) * 16;
            this.vel = new Vector2(0, 0);
            game.scene.shakeBuffer = 4;
            game.playSound('rumble');
            this.gravityBuffer = 30;
        }

        if (this.pos.x > (6 * 20 + 14) * 16) {
            this.pos.x = (6 * 20 + 14) * 16;
            this.vel = new Vector2(0, 0);
            game.scene.shakeBuffer = 4;
            game.playSound('rumble');
            this.gravityBuffer = 30;
        }

        if (!this.gravityBuffer && this.isGrounded && !['intro', 'charge'].includes(this.suisei.phase)) {
            this.pos.x += .25 * (CollisionBox.center(this).x < CollisionBox.center(this.suisei).x ? 1 : -1);
            if (!(this.frameCount % 2)) game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 4 + Math.random() * this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 1);
        }

        if (this.gravityBuffer) {
            this.gravityBuffer--;
            if (!this.gravityBuffer) {
                this.angle = -Math.PI / 2;
                this.size = new Vector2(64, 32);
                this.isGravity = true;
            }
        }
        this.frameCount++;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x) + this.size.x / 2 + (this.size.x === 32 ? 8 : 0), Math.round(this.pos.y) + (this.size.y === 32 ? 8 : 32));
        if (this.waitFrame && Math.floor(this.waitFrame / 8) % 2) cx.filter = `contrast(0) brightness(2)`;
        if (!this.dir) {
            cx.scale(-1, 1);
        }
        if (this.angle !== null) {
            cx.rotate(this.angle + Math.PI / 2);
        }
        else if (this.isRotation) {
            if (this.suisei.phaseBuffer > 240 && !(Math.floor(this.frameCount / 8) % 2)) cx.filter = `contrast(0) brightness(2)`;
            const speed = Math.min(this.suisei.phaseBuffer / 8, 60);
            cx.rotate((this.suisei.phaseBuffer * speed) % 360 * (Math.PI / 180));
        }
        cx.drawImage(game.assets.images['sp_axe'], 0, 0, 64, 64, -32, -32, 64, 64);
        cx.restore();
        
        if (!this.isRotation && this.suisei.phase !== 'intro') {
            const p1 = this.pos.plus(new Vector2(this.size.x / 2, this.size.y / (this.size.y === 64 ? 2 : 4)));
            const p2 = CollisionBox.center(this.suisei);
            const diff = p1.plus(p2.times(-1));
            for (let i = 1; i < 4; i++) {
                cx.save();
                cx.translate(p1.x + Math.abs(diff.x * (i / 4)) * (p1.x > p2.x ? -1 : 1), p1.y + Math.abs(diff.y * (i / 4)) * (p1.y > p2.y ? -1 : 1));
                cx.drawImage(game.assets.images['sp_axe_chain'], 0, 0, 16, 16, -8, -8, 16, 16);
                cx.restore();
            }
        }
    }
}

class Pendulum extends Actor {
    size = new Vector2(64, 32);
    vel = new Vector2(0, 0);
    damage = 2;

    gravity = .1;
    isGravity = false;
    isReady = true;

    constructor(pos, fallFrame = null, offset = 0) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.yOrigin = this.pos.y;
        this.fallFrame = fallFrame;
        this.offset = offset;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        const xDist = Math.abs(CollisionBox.center(flare).x - CollisionBox.center(this).x);

        if (this.isReady && xDist < 48 && this.pos.y < flare.pos.y && this.fallFrame === null) this.shakeBuffer = 2;

        if (!this.isGravity && this.isReady && ((this.fallFrame !== null && !((this.frameCount - this.offset) % this.fallFrame)) || (this.fallFrame === null && xDist < 40 && this.pos.y < flare.pos.y))) {
            this.isGravity = true;
            this.isReady = false;
        }

        if (this.isGravity) this.vel.y += this.gravity;
        this.pos = this.pos.plus(this.vel);

        if (this.isGravity && game.scene.currentSection.collisions.find(collision => CollisionBox.intersects(this, collision))) {
            this.vel.y = 0;
            this.isGravity = false;
            game.scene.shakeBuffer = 4;
            game.playSound('explosion');
            this.gravityBuffer = 30;
        }

        if (!this.isReady && !this.isGravity && !this.gravityBuffer) {
            if (this.pos.y !== this.yOrigin) this.pos.y = Math.max(this.yOrigin, this.pos.y - (this.fallFrame === null ? .5 : 2));
            else this.isReady = true;
        }

        if (this.gravityBuffer) this.gravityBuffer--;
        this.frameCount++;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    draw = (game, cx) => {
        const asset = this.fallFrame === null ? 'sp_axe2' : 'sp_axe3';
        cx.save();
        cx.translate(Math.round(this.pos.x) + this.size.x / 2, Math.round(this.yOrigin));
        const diff = Math.abs(Math.round(this.pos.y) - this.yOrigin) / 5;
        for (let i = 0; i < 5; i++) {
            cx.drawImage(game.assets.images[`${asset}_chain`], 0, 0, 16, 16, -8, -8 + i * diff, 16, 16);
        }
        cx.restore();
        cx.save();
        cx.translate(Math.round(this.pos.x) + this.size.x / 2, Math.round(this.pos.y));
        cx.drawImage(game.assets.images[asset], 0, 0, 64, 64, -32, -24, 64, 64);
        cx.restore();
    }
}

class Block extends Actor {
    size = new Vector2(8, 8);
    damage = 1;

    skin = Math.floor(Math.random() * 4);
    angle = Math.random() * Math.PI * 2;
    dir = Math.random() > .5;
    speed = Math.random() * 3;

    constructor(pos, miko, index) {
        super(pos);
        this.miko = miko;
        this.index = index;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => actor instanceof Flare && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
        }
        
        if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            this.miko.blocks = this.miko.blocks.filter(a => a !== this);
        }

        game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(Math.random() * 8 - 4, Math.random() * 8 - 4)), new Vector2(Math.random() - .5, Math.random() * -1), 0);

        this.frameCount++;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }
    
    takeHit = (game, other) => {
        if (this.frameCount < this.index * 10) return;
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        game.playSound('damage');
        game.score += 20;
        game.scene.actors = game.scene.actors.filter(a => a !== this);
        this.miko.blocks = this.miko.blocks.filter(a => a !== this);
    }

    draw = (game, cx) => {
        if (this.frameCount < this.index * 10) return;
        cx.save();
        cx.translate(Math.round(this.pos.x + this.size.x / 2), Math.round(this.pos.y + this.size.y / 2));
        if (!this.dir) cx.scale(-1, 1);
        cx.rotate((Math.sin(this.frameCount * (Math.PI / 180)) + this.angle) * this.speed * (this.dir ? 1 : -1));
        cx.drawImage(game.assets.images['sp_block'], 24 * this.skin, 0, 24, 24, -12, - 12, 24, 24);
        cx.restore();
    }
}