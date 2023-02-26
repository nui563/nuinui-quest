class Marine extends Actor {
    size = new Vector2(16, 40);
    vel = new Vector2(0, 0);
    dir = false;

    gravity = .15;

    moveSpeed = 3.5;

    phaseBuffer = 0;

    healthBar = 0;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return !['flee', 'defeated'].includes(this.phase) ? collision : null;
    }

    takeHit = (game, other) => {
        if (!this.invicibility) {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.playSound('damage');
            
            if (!this.health) {
                this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
                game.score += 5000;
            } else {
                game.score += 100;
                this.invicibility = 8;
            }
        }
    }

    introPhase = game => {
        if (this.animation !== 'intro') this.setAnimation(!this.isGrounded? 'jump' : 'intro');
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.vel = new Vector2(0, 0);
        }
    }

    // defeatedPhase = game => {
    //     //velloss
    //     this.setAnimation(!this.isGrounded? 'hit' : 'idle');
    //     this.vel = this.vel.mult(new Vector2(0.9, 1));
    // }

    idlePhase = game => {
        if (this.phaseBuffer >= 31) {
            if (this.isGrounded && Math.random() > (!this.lastMove ? 0 : this.lastMove === 'move' ? .8 : .4)) {
                // Move action
                this.phase = 'move';
                game.playSound("jump");
                this.moveDir = this.pos.x < 30 * 16 ? 1 : -1;
                this.vel.y = -4;
            } else {
                if (this.health < this.maxHealth / 2 && Math.random() > .5 && false) {
                    this.phase = 'attack';
                    // this.setAnimation('think');
                    // game.playSound("charge");
                } else {
                    if (Math.random() > .5) {
                        this.phase = 'dash';
                        game.playSound("miko_kick");
                        this.moveDir = this.pos.x < 30 * 16 ? 1 : -1;
                        this.dir = this.moveDir > 0;
                        this.vel.y = -2;
                        // this.setAnimation('laugh');
                        // game.playSound('peko');
                    }
                    else {
                        this.phase = 'attack';
                        // game.playSound('peko');
                    }
                }
            }
        }
    }

    // rocketPhase = game => {
    //     if (!this.phaseBuffer) {
    //         game.scene.actors.push(new Rocket(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -8), this.pos.y + 16), new Vector2(1 * (this.dir ? 1 : -1), 0), this));
    //         game.playSound("pew");
    //         if (Math.random() > .5) game.playSound('peko');
    //     }
    //     if (this.phaseBuffer === 39) {
    //         this.lastMove = this.phase;
    //         this.phase = 'idle';
    //     }
    // }

    attackPhase = game => {
        if (!(this.phaseBuffer % 20)) {
            this.setAnimation('laugh');

            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const dist = CollisionBox.center(this).distance(CollisionBox.center(flare));
            const bufferVal = Math.ceil(this.phaseBuffer / 20) + 1;
            const vel = new Vector2(bufferVal * Math.ceil(dist / 256) * (this.dir ? 1 : -1), -2 * (3 - bufferVal));
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(10 * (this.dir ? 1 : -1), 8)), vel, this));
            game.playSound('bow_shoot');
        }
        if (this.phaseBuffer === 59) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    // attack2Phase = game => {
    //     if (!(this.phaseBuffer % 9)) {
    //         const angle = (this.phaseBuffer / 72) * Math.PI * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
    //         const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-2);
    //         game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), vel, this));
    //         game.playSound("pew");
    //     }
    //     if (this.phaseBuffer === 72) {
    //         this.lastMove = this.phase;
    //         this.phase = 'idle';
    //         this.setAnimation('idle');
    //     }
    // }
    
    // attack3Phase = game => {
    //     if (!(this.phaseBuffer % 64)) {
    //         for (let i = 0; i <= 5; i++) {
    //             const angle = (i / 5) * Math.PI * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
    //             const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-1);
    //             game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), vel, this));
    //         }
    //         game.playSound("pew");
    //     }
    //     if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this));
    //     if (this.phaseBuffer === 64) {
    //         this.lastMove = this.phase;
    //         this.phase = 'idle';
    //         this.setAnimation('idle');
    //     }
    // }

    dashPhase = game => {
        game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), 0);
        this.vel.x = this.moveDir * this.moveSpeed * 2.125;
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
        this.setAnimation(this.vel.y ? 'dash' : 'intro');
    }

    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), 0);
        this.vel.x = this.moveDir * this.moveSpeed;
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
        if (this.phaseBuffer === 26 && Math.random() > .9 && !game.scene.actors.some(a => a instanceof Dokuro)) {
            game.scene.actors.push(new Dokuro(new Vector2(29.5, 5.5)));
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

        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        this.isGrounded = false;
        if (this.health && this.pos.y + this.vel.y > 6 * 16) {
            this.isGrounded = true;
            this.pos.y = 6 * 16;
            this.vel = new Vector2(0, 0);
        }

        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (this.health && !['dash'].includes(this.phase)) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this === game.scene.boss) {
            if (this.healthBar < this.health) {
                this.healthBar++;
                if (!(this.frameCount % 4)) game.playSound('pew2');
            } else {
                const amt = .05;
                this.healthBar = (1 - amt) * this.healthBar + amt * this.health;
                if (Math.abs(this.health - this.healthBar) < amt) this.healthBar = this.health;
            }
        }

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.invicibility % 2) return;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y + Math.cos(Math.floor(this.frameCount / 16) * (180 / Math.PI))));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        const offset = new Vector2(12, 4);
        const spd = ['laugh', 'intro'].includes(this.animation) ? 8 : 1;
        const frame = ['laugh', 'intro'].includes(this.animation) ? 2 : 1;
        const xSize = ['laugh', 'intro'].includes(this.animation) ? 48 : 40;
        const xOffset = (Math.floor(this.animationFrame / spd) % frame) * xSize;
        cx.drawImage(game.assets.images[`sp_marine_${this.animation}`],
            this.vel.y > 0 && this.animation === 'jump' ? 40 : xOffset, 0, xSize, 48,
            -offset.x, -offset.y, xSize, 48);
        cx.restore();
    }
}