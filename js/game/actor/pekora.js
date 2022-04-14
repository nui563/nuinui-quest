class Pekora extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = false;

    gravity = .2;
    maxHealth = 32;
    // maxHealth = 2;

    moveSpeed = 2.75;

    phaseBuffer = 0;

    aggro = false;

    constructor(pos) {
        super(pos);
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (!this.invicibility) {
            this.health--;
            game.scene.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.playSound('damage');
            
            if (!this.health) {
                // game.scene.actors = game.scene.actors.filter(actor => actor !== this);
                // game.scene.particles.explosion(CollisionBox.center(this));
                // game.playSound("fanfare");
                // game.scene.cleared = true;
                game.scene.actors = game.scene.actors.filter(a => !(a instanceof Bullet));
                this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
            } else {
                this.invicibility = 30;
            }
        }
    }

    fleePhase = game => {
        this.setAnimation(!this.isGrounded? 'jump' : 'idle');
        if (this.pos.y === 16 * 22 - this.size.y) {
            game.playSound('land');
            game.scene.particles.land(this);
            this.vel = new Vector2(-3, -2);
        }
    }

    defeatedPhase = game => {
        //velloss
        this.setAnimation(!this.isGrounded? 'hit' : 'idle');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    idlePhase = game => {
        if (this.phaseBuffer >= 31) {
            if (Math.random() < (!this.lastMove ? 0 : this.lastMove === 'move' ? .8 : .2)) {
                if (this.health < this.maxHealth / 2 && Math.random() > .5) {
                    this.phase = 'attack3';
                    this.setAnimation('think');
                    game.playSound("charge");
                } else {
                    if (Math.random() > .75) {
                        this.phase = 'attack2';
                        this.setAnimation('laugh');
                        game.playSound('peko');
                    }
                    else {
                        this.phase = 'attack';
                        this.setAnimation('laugh');
                        game.playSound('peko');
                    }
                }
            } else {
                this.phase = 'move';
                game.playSound("jump");
                this.moveDir = Math.random() > .5 ? 1 : -1;
                this.vel.y = -4;
            }
        }
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 20)) {

            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(flare);
            const p2 = CollisionBox.center(this);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-2);
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), new Vector2(8, 8), vel, this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 59) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    attack2Phase = game => {
        if (!(this.phaseBuffer % 12)) {
            const angle = (this.phaseBuffer / 63) * Math.PI * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-2);
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), new Vector2(8, 8), vel, this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 64) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.setAnimation('idle');
        }
    }
    
    attack3Phase = game => {
        if (!(this.phaseBuffer % 64)) {
            for (let i = 0; i <= 5; i++) {
                const angle = (i / 5) * Math.PI * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-1);
                game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), new Vector2(8, 8), vel, this));
            }
            game.playSound("pew");
        }
        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this));
        if (this.phaseBuffer === 64) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.setAnimation('idle');
        }
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), 0);
        this.vel.x = this.moveDir * this.moveSpeed;
        if (this.phaseBuffer > 3 && this.pos.y >= 20 * 16) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
        this.setAnimation(this.vel.y ? 'jump' : 'idle');
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (this.phase) this[`${this.phase}Phase`](game);

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.moveDir *= -1;
            this.vel.x = 0;
        }

        this.isGrounded = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(newCollisionBox, collision, 'x'));

        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (!this.isGrounded) this.vel.y += this.gravity;
        this.pos.y += this.vel.y;
        
        if (this.pos.y > 20 * 16) this.pos.y = 20 * 16;

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

        if (flare.playerControl && this.health) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.invicibility % 2) return;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        const offset = new Vector2(16, 10);
        const xSize = 48;
        const spd = this.animation === 'laugh' ? 8 : 1;
        const frame = this.animation === 'laugh' ? 2 : 1;
        cx.drawImage(game.assets.images[`sp_pekora_${this.animation}`],
            (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 48, 48,
            -offset.x, -offset.y, 48, 48);
        cx.restore();
    }
}