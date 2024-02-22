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
        if (this.frameCount === 180) this.toFilter = true;
    }

    draw = (game, cx) => {
        if (this.frameCount > 60 && !(this.frameCount % (this.frameCount < 120 ? 8 : 2))) return;
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

class Spirit extends Actor {
    size = new Vector2(16, 16);
    vel = new Vector2(0, 0);

    maxHealth = 2;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.health = this.maxHealth;
        this.skin = random() > .5;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.playSound('noise');
            this.dropHeart(game, .7);

            if (this.robot) {
                this.robot.spirit = null;
                this.robot.sleep = true;
                this.robot.phase = 'sleep';
                this.robot.vel = new Vector2(0, 0);
            }
        } else {
            game.playSound('damage');
        }
    }

    update = game => {
        // if (this.vel.y) this.vel.y += this.gravity;

        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        
        if (this.robot) {
            this.pos = this.pos.lerp(this.robot.pos.plus(new Vector2(0, -16)), .075);
        } else if (CollisionBox.intersects(this, game.scene.view) && game.scene.actors.some(a => a instanceof Robot)) {
            this.vel = CollisionBox.center(this).lerp(CollisionBox.center(flare), .005).plus(CollisionBox.center(this).times(-1));
            this.pos = this.pos.plus(this.vel);
        } else {
            this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI)) / 2;
            this.vel.y = Math.sin((this.frameCount / 4096) * (180 / Math.PI)) / 2;
            this.pos = this.pos.plus(this.vel);
        }

        if (!this.robot && CollisionBox.center(flare).distance(CollisionBox.center(this)) < 192) {
            const robot = game.scene.actors.find(a => a instanceof Robot && a.sleep && CollisionBox.center(this).distance(CollisionBox.center(a)) < 64);
            if (robot) {
                this.robot = robot;
                this.robot.spirit = this;
                this.robot.sleep = false;
                this.robot.phase = 'idle';
                game.playSound('noise');
            }
        }

        for (let i = 0; i < 2; i++) {
            const dist = .5;
            const a = Math.cos(random() * 2 * Math.PI);
            const b = Math.sin(random() * 2 * Math.PI);
            game.scene.particles.smoke_spirit(CollisionBox.center(this), new Vector2(-this.vel.x + a * dist, -this.vel.y + b * dist), 0);
        }

        // Attack
        if (!this.robot && [63].includes(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {
            for (let i = 0; i < 8; i++) {
                const angle = i * (Math.PI / 4) + (this.skin ? 0 : Math.PI / 8);
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
                game.scene.actors.push(new Bullet(CollisionBox.center(this), vel, this));
                if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
            }
        }
        
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
        cx.drawImage(game.assets.images['sp_spirit'], this.skin ? 0 : 16, 0, 16, 16, 0, 0, 16, 16);
        cx.restore();
    }
}

class Fubuzilla extends Actor {
    size = new Vector2(96, 48);
    vel = new Vector2(0, 0);

    phaseBuffer = 0;
    phase = 'newBody';
    lastPhase = 'newBody';

    moveSpeed = 2;

    maxHealth = 32;
    // maxHealth = 1;

    wiggleSize = 16;

    bodyCount = 8;
    bodyParts = [];

    healthBar = 0;

    constructor(pos) {
        super(pos);
        this.health = this.maxHealth;
    }

    deathPhase = game => {
        
        if (this.laserTarget) this.laserTarget = null;

        if (this.phaseBuffer && !(this.phaseBuffer % 30)) {
            game.scene.shakeBuffer = 4;
            game.playSound("rumble");
            [this, ...this.bodyParts].forEach(a => {
                game.scene.particles.explosion(a.pos.plus(new Vector2(random(), random()).mult(a.size)));
            })
        }

        if (this.phaseBuffer >= 180) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this && !(actor instanceof FubuzillaBody));
        }
    }

    attackPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this).plus(new Vector2(Math.cos((((this.frameCount) / 2000) * (180 / Math.PI))) * this.wiggleSize, 16)));
        
        if (this.laserTarget) this.laserTarget = this.laserTarget.lerp(CollisionBox.center(flare), 0.05);

        if (this.phaseBuffer >= 180) {
            this.phase = 'release';
            game.playSound("cling");
        } else if (!(this.phaseBuffer % 60)) game.playSound("charge");
    }

    releasePhase = game => {
        this.laserTarget = this.laserTarget.lerp(CollisionBox.center(game.scene.actors.find(actor => actor instanceof Flare)), .005);

        if (this.phaseBuffer > 12 && !(this.phaseBuffer % 6) && this.laserTarget) {
            const p1 = this.laserTarget;
            const p2 = CollisionBox.center(this).plus(new Vector2(Math.cos((((this.frameCount) / 2000) * (180 / Math.PI))) * this.wiggleSize, 16));
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-4);
            
            const bullet = new Bullet(p2, vel, this);
            bullet.angle = angle * (this.dir ? -1 : 1) + (this.dir ? Math.PI : 0);
            bullet.size = new Vector2(16, 16);
            bullet.iceSpike = true;
            game.scene.actors.push(bullet);

            game.playSound("step");
        }

        if (this.phaseBuffer >= 60 * 3) {
            this.phase = 'idle';
            this.laserTarget = null;
        }
    }

    newBodyPhase = game => {
        const bodySize = this.bodyParts.length;
        if (bodySize !== this.bodyCount) {
            for (let i = 0; i < this.bodyCount - bodySize; i++) {
                const bodyPart = new FubuzillaBody(new Vector2(this.pos.x, this.pos.y + this.size.y + bodySize * 16 + i * 16), Math.floor(.5 + random() * 2.5), this);
                this.bodyParts.push(bodyPart);
                game.scene.actors.push(bodyPart);
            }
        }
        if (this.pos.y > (67-this.bodyCount) * 16) {
            [this, ...this.bodyParts].forEach(a => a.shakeBuffer = 15);
            this.pos.y--;
            this.bodyParts.forEach(a => a.pos.y--);
        } else {
            this.phase = 'idle';
            if (game.scene.warning) game.scene.warning = false;
        }
        
        if (!(this.phaseBuffer % 48)) game.playSound('rumble');
    }
    
    movePhase = game => {
        const x = this.phaseBuffer / 60;
        this.vel.x = (x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2) * this.moveDir * this.moveSpeed;
        if (this.phaseBuffer === 60) {
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
    }

    idlePhase = game => {
        if (this.phaseBuffer >= 63) {
            if (random() > .125 && (!this.bodyParts.length || this.bodyParts.length < this.bodyCount)) this.phase = 'newBody';
            else if (random() > .5) {
                if (random() > .75 && !game.scene.actors.some(a => a instanceof Spirit)) {
                    game.scene.actors.push(new Spirit(CollisionBox.center(this).times(1/16)));
                } else {
                    this.phase = 'attack';
                    this.laserTarget = CollisionBox.center(this).plus(new Vector2(0, 16));
                }
            } else {
                this.phase = 'move';
                const flare = game.scene.actors.find(actor => actor instanceof Flare);
                this.moveDir = (CollisionBox.center(this).x < CollisionBox.center(flare).x ? 1 : -1);
            }
        }
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (this.phase === 'newBody') return;
        if (!this.invicibility) {
            this.invicibility = 30;
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        }
        
        if (!this.health && this.phase !== 'death') {
            game.scene.actors = game.scene.actors.filter(a => ![Bullet, Spirit, Robot].some(b => a instanceof b));
            this.phase = 'death';
            game.playSound('cling');
        } else {
            game.playSound('damage');
        }
    }
    
    updateBody = (game, deadBody) => {
        game.scene.actors.filter(a => (a instanceof FubuzillaBody || a === this) && a.pos.y < deadBody.pos.y).forEach(a => a.pos.y += 16);
        this.bodyParts = this.bodyParts.filter(a => a !== deadBody);
    }

    update = game => {
        
        if (this.phase) this[`${this.phase}Phase`](game);
        
        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }
        if (newCollisionBox.pos.x < 39 * 16 || newCollisionBox.pos.x + newCollisionBox.size.x > 52 * 16) {
            this.pos.x = Math.round(this.pos.x);
            this.moveDir *= -1;
            this.vel.x = 0;
        }
        // const angle = (this.frameCount / 1000) * (180 / Math.PI);

        // this.vel.x = Math.cos(angle) * 2;

        const parts = [this, ...this.bodyParts];

        this.pos.x += this.vel.x;
        // this.pos.x += Math.cos((((this.frameCount) / 2000) * (180 / Math.PI))) * 4;
        this.bodyParts.forEach((a, i) => a.pos.x = this.pos.x + Math.cos((((this.frameCount+i*200) / 2000) * (180 / Math.PI))) * this.wiggleSize);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersectingCollisionBoxes(flare, parts.filter(a => a.type !== 2)).length) {
            flare.pos.x += 4 * (CollisionBox.center(this).x < CollisionBox.center(flare).x ? 1 : -1);
            flare.vel.x = 0;
        }

        if (parts.filter(a => a.type !== 2).find(collision => CollisionBox.collidesWithInAxis({pos:{x:flare.pos.x,y:flare.pos.y+flare.size.y},size:{x:flare.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(flare, collision, 'x'))) {
            flare.pos.x += this.vel.x;
        }

        if (this.bodyCount === 8 && this.health < this.maxHealth * .6) {
            this.bodyCount = 14;
            this.wiggleSize = 24;
        }
        if (this.bodyCount === 14 && this.health < this.maxHealth * .3) {
            this.bodyCount = 19;
            this.wiggleSize = 32;
        }

        parts.forEach(a => {
            if (a.health < a.maxHealth * .5 && random() > .9) game.scene.particles.smoke_white(a.pos.plus(new Vector2(random(), random()).mult(a.size)), new Vector2(0, -2), 1);
        });
        
        if (this === game.scene.boss) {
            if (this.healthBar < this.health) {
                this.healthBar += .5;
                if (!(this.frameCount % 4)) game.playSound('pew2');
            } else {
                const amt = .05;
                this.healthBar = (1 - amt) * this.healthBar + amt * this.health;
                if (Math.abs(this.health - this.healthBar) < amt) this.healthBar = this.health;
            }
        }

        if (this.invicibility) this.invicibility--;
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.invicibility % 2) return;
        cx.save();
        cx.translate(Math.round(this.pos.x + Math.cos((((this.frameCount) / 2000) * (180 / Math.PI))) * this.wiggleSize), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_fubuzilla'], 0, 0, 112, 60, -8, -12, 112, 60);
        cx.restore();
        
        if (this.laserTarget) {
            cx.drawImage(game.assets.images['sp_laser_target'], this.phase === 'attack' ? 0 : (Math.floor(this.frameCount / 2) % 2) * 24, 0, 24, 24, this.laserTarget.x - 12, this.laserTarget.y - 12, 24, 24);
        }
    }
}

class FubuzillaBody extends Actor {
    size = new Vector2(96, 16);
    vel = new Vector2(0, 0);

    maxHealth = 3;

    constructor(pos, type, fubuzilla) {
        super(pos);
        this.health = this.maxHealth;
        this.type = type;
        this.fubuzilla = fubuzilla;
    }
    
    checkHit = (game, collisionBox) => {
        if (collisionBox.type === 'dual') return null;
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (this.fubuzilla.phase === 'newBody') return;
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);

            for (let i = 0; i < 2; i++) {
                game.scene.particles.explosion(this.pos.plus(new Vector2(random(), random()).mult(this.size)));
            }

            game.scene.shakeBuffer = 4;
            game.playSound("rumble");

            this.fubuzilla.updateBody(game, this);
        } else {
            game.playSound('damage');
        }
    }

    update = game => {
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
        const typeOffset = 60 + this.type * 16;
        cx.drawImage(game.assets.images['sp_fubuzilla'], 0, typeOffset, 112, 16, -8, 0, 112, 16);
        cx.restore();
    }
}

class Miteiru extends Actor {
    size = new Vector2(48, 48);
    vel = new Vector2(0, 0);

    maxHealth = 6;

    constructor(pos, dir) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.health = this.maxHealth;
        this.dir = dir;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            this.dropHeart(game, .7);

            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
        } else {
            game.playSound('damage');
        }
    }

    update = game => {
        
        if (this.chip && !this.chip.health) this.chip = null;

        if ((!this.chip || !CollisionBox.intersects(this.chip, game.scene.view)) && this.frameCount && !(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {
            this.chip = new Casinochip(this.pos.plus(new Vector2(0, 48)).times(1/16), this.dir ? 1 : -1);
            game.scene.actors.push(this.chip);
            game.playSound("pew");
        }

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
        cx.drawImage(game.assets.images['sp_miteiru'], 0, 0);
        cx.restore();
    }
}


class Oni extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);

    maxHealth = 32;

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
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            this.dropHeart(game, .7);

            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
        } else {
            game.playSound('damage');
        }
    }

    update = game => {
        // if (this.vel.y) this.vel.y += this.gravity;

        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI)) / 2;
        this.vel.y = Math.sin((this.frameCount / 2048) * (180 / Math.PI)) / 2;

        this.pos = this.pos.lerp(new Vector2(flare.pos.x + 96 * (game.currentStage === 4 ? -1 : 1), this.pos.y), .05);
        this.pos = this.pos.plus(this.vel);

        this.dir = CollisionBox.center(this).x > CollisionBox.center(flare).x;

        // Attack
        if ([127].includes(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);
            if (p1.distance(p2) < 192 && p1.y - 32 < p2.y) {
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
                game.scene.actors.push(new Bullet(p1, vel, this));
                if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
                this.thunder = 8;
            }
        }
        if (this.thunder) this.thunder--;
        
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
        cx.drawImage(game.assets.images['sp_oni'], this.thunder ? 80 :  (!(Math.floor(this.frameCount / 16) % 2) ? 0 : 40), 0, 40, 42, -14, -4, 40, 42);
        cx.restore();
    }
}