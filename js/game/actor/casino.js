class Mikobell extends Actor {
    size = new Vector2(20, 38);
    vel = new Vector2(0, 0);

    maxHealth = 4;
    gravity = .15;

    moveSpeed = 1;

    phase = 'idle';
    phaseBuffer = 0;

    aggro = true;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x * 16, pos.y * 16 - 38);
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
            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
            this.dropHeart(game, .6);
            game.score += 200;
        } else {
            game.score += 50;
            game.playSound('damage');
        }
    }
    
    movePhase = game => {
        this.vel.x = this.moveDir * this.moveSpeed;
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
            
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound('land');
            game.scene.particles.land(this);
        }
        this.setAnimation(!this.isGrounded ? 'jump' : 'idle');
    }

    idlePhase = game => {
        if (this.phaseBuffer >= 31 && Math.random() > .98) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);

            if (p1.distance(p2) < 16 * 10) this.aggro = true;

            if (this.aggro) {
                if (Math.abs(p1.y - p2.y) < flare.size.y && false) {
                    this.phase = 'attack';
                } else {
                    this.phase = 'move';
                    if (CollisionBox.intersects(this, game.scene.view)) game.playSound("jump");
                    this.moveDir = Math.random() > .5 ? 1 : -1;
                    this.vel.y = -4;
                }
            }
        }
    }

    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 4)) {
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 22), new Vector2(4 * (this.dir ? 1 : -1), 0), this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 31) this.phase = 'idle';
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        this[`${this.phase}Phase`](game);
        
        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));


        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.vel.x = 0;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        this.isGrounded = false;
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.isGrounded = CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).some(c => c.other.pos.y > this.pos.y);
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            this.vel.y = 0;
        }
        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;

        if (!CollisionBox.includedIn(this, game.scene.currentSection)) {
            this.vel.x = 0;
            this.moveDir *= -1;
        }
        
        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.health < this.maxHealth / 2) {
            if (Math.random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

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
        const offset = new Vector2(6, 10);
        cx.drawImage(game.assets.images['sp_mikobell'], this.isGrounded ? 0 : 32, 0, 32, 48, -offset.x, -offset.y, 32, 48);
        cx.restore();
    }
}

class Casinochip extends Actor {
    size = new Vector2(32, 32);
    vel = new Vector2(0, 0);

    maxHealth = 4;
    gravity = .2;
    moveSpeed = 1.75;

    aggro = false;

    constructor(pos, moveDir) {
        super();
        this.color = Math.random() < .5;
        this.pos = new Vector2(pos.x * 16, pos.y * 16 - 32);
        this.moveDir = moveDir;
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
            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
            this.dropHeart(game, .7);
            game.score += 100;
        } else {
            game.score += 20;
            game.playSound('damage');
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (!this.aggro) {
            this.aggro = CollisionBox.includedIn(this, game.scene.view);
        } else this.vel.x = this.moveDir * this.moveSpeed;
        
        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));


        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.vel.x = 0;
            this.moveDir *= -1;
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound("question");
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        this.isGrounded = false;
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.isGrounded = CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).some(c => c.other.pos.y > this.pos.y);
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            this.vel.y = 0;
        }
        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;

        if (!CollisionBox.includedIn(this, game.scene.currentSection)) {
            this.vel.x = 0;
            this.moveDir *= -1;
        }

        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_casino_chip'], Math.floor(this.frameCount / 6) % 2 ? 0 : 32, game.currentStage === 3 ? 64 : this.color ? 0 : 32, 32, 32, 0, 0, 32, 32);
        cx.restore();
    }
}

class Scythe extends Actor {
    size = new Vector2(0, 0);

    angle = 0;

    constructor(pos, speed, offset) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.speed = speed;
        this.offset = offset * (Math.PI/180);

        this.collisions = [];
        for (let i = 0; i < 4; i++) {
            this.collisions.push({
                pos: new Vector2(this.pos.x + i * 16, this.pos.y),
                size: new Vector2(12, 12)
            })
        }
    }
    
    checkHit = (game, collisionBox) => {
        const collisions = CollisionBox.intersectingCollisionBoxes(collisionBox, this.collisions);
        return collisions.length ? CollisionBox.intersects(collisions[0].other, collisionBox) : false;
    }

    update = game => {
        this.angle = this.offset + ((this.frameCount * this.speed) * (Math.PI/180)) % (2 * Math.PI);

        this.collisions.forEach((collision, i) => {
            const a = this.angle;
            collision.pos = this.pos.plus(new Vector2(Math.cos(a), Math.sin(a)).times(16*(i+1))).plus(new Vector2(-6, -6));
        });
        
        for (let i = 0; i < 2; i++) {
            const dist = .5;
            const a = Math.cos(Math.random() * 2 * Math.PI);
            const b = Math.sin(Math.random() * 2 * Math.PI);
            // game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(-this.vel.x + a * dist, -this.vel.y + b * dist), 0);
        }
        
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.rotate(this.angle);
        cx.drawImage(game.assets.images['sp_scythe'], 0, 0, 80, 32, 0, -8, 80, 32);
        cx.restore();
    }
}

class CasinoBoss extends Actor {
    size = new Vector2(0, 0);
    vel = new Vector2(0, 0);

    maxHealth = 24;
    healthBar = 0;

    actors = [];

    constructor() {
        super();
        this.pos = new Vector2(20 * 8.5 * 16 + 8, -4 * 16);
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        
        if (!this.invicibility) {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            this.invicibility = 30;
        }

        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }
    }

    update = game => {

        this.actors.forEach(a => {
            if (!a.health) {
                a.phase = 'defeated';
                for (let i = 0; i < 64; i++) game.scene.particles.smoke_white(CollisionBox.center(a).plus(new Vector2(Math.round(Math.random() * 48 - 24), Math.round(Math.random() * 48 - 24))), new Vector2(0, 0), 1);
                game.scene.actors = game.scene.actors.filter(b => b !== a);
                this.actors = this.actors.filter(b => b !== a);
            }
        });

        // if (this === game.scene.boss && this.frameCount > 200 && this.actors.length < 2) {
        //     const className = game.scene.actors.find(a => a instanceof Miko) ? Pekora : Miko;
        //     const boss = new (className)(new Vector2(179.5 * 16 + Math.floor(Math.random() * 256 - 128), 16), 1);
        //     boss.setAnimation('jump');
        //     boss.skullBoss = this;
        //     boss.lastPhase = 'move';
        //     boss.phase = 'move';
        //     boss.phaseBuffer = 0;
        //     this.actors.push(boss);
        //     game.scene.actors.push(boss);
        // }

        const ytarget = 0;
        const amt = .1;
        if (this.pos.y !== ytarget) this.pos.y = (1 - amt) * this.pos.y + amt * ytarget;
        if (Math.abs(ytarget - this.pos.y) < amt) this.pos.y = ytarget;

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
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.floor(this.pos.x), Math.floor(this.pos.y));
        cx.globalAlpha = .75;
        if (this.invicibility % 2) cx.globalAlpha = .5;
        for (let i = 0; i < 128; i++) {
            cx.drawImage(game.assets.images['sp_skulls'], 0, i, 320, 1,
                Math.cos(((game.scene.frameCount + i) / game.height / 4) * (180 / Math.PI)) * 4 - 8,
                i + Math.cos((game.scene.frameCount / game.height / 4) * (180 / Math.PI)) * 2 - 2,
                320, 1);
        }
        cx.restore();
    }
}