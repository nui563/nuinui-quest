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

class Robot extends Actor {
    size = new Vector2(16, 38);
    vel = new Vector2(0, 0);

    maxHealth = 8;

    moveSpeed = 4;

    phase = 'idle';
    phaseBuffer = 0;

    aggro = false;

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

    idlePhase = game => {
        if (this.phaseBuffer >= 63) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);

            if (p1.distance(p2) < 16 * 10) this.aggro = true;

            if (this.aggro) {
                if (Math.abs(p1.y - p2.y) < flare.size.y) {
                    this.phase = 'attack';
                } else {
                    this.phase = 'move';
                    game.playSound("boss_move");
                    this.moveDir = Math.random() > .5 ? 1 : -1;
                }
            }
        }
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 4)) {
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 22), new Vector2(8, 8), new Vector2(4 * (this.dir ? 1 : -1), 0), this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 31) this.phase = 'idle';
    }

    movePhase = game => {
        game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
        const x = this.phaseBuffer / 40;
        this.vel.x = (x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2) * this.moveDir * this.moveSpeed;
        if (this.phaseBuffer === 40) {
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        this[`${this.phase}Phase`](game);

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.moveDir *= -1;
            this.vel.x = 0;
        }

        const isGrounded = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(newCollisionBox, collision, 'x'));

        if (!CollisionBox.includedIn(newCollisionBox, game.scene.currentSection) || !isGrounded) {
            this.vel.x = 0;
            this.moveDir *= -1;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        this.pos.y += this.vel.y;
        
        // for (let i = 0; i < 2; i++) {
        //     const dist = .5;
        //     const a = Math.cos(Math.random() * 2 * Math.PI);
        //     const b = Math.sin(Math.random() * 2 * Math.PI);
        //     game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(-this.vel.x + a * dist, -this.vel.y + b * dist), 0);
        // }

        // Attack
        // if ([87, 107, 127].includes(this.frameCount % 128)) {
        //     const p1 = CollisionBox.center(this);
        //     const p2 = CollisionBox.center(flare);
        //     if (p1.distance(p2) < 192 && p1.y - 32 < p2.y) {
        //         const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
        //         const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
        //         game.scene.actors.push(new Bullet(p1, new Vector2(8, 8), vel, this));
        //         game.playSound("pew");
        //     }
        // }

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
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
        const offset = new Vector2(12, 6);
        cx.drawImage(game.assets.images['sp_robot'], this.vel.x === 0 ? 0 : this.dir === this.vel.x < 0 ? 48 : 96, 0, 48, 48, -offset.x, -offset.y, 48, 48);
        cx.restore();
    }
}