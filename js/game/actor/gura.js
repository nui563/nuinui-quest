class Gura extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    phaseBuffer = 0;

    damage = 2;

    healthBar = 0;

    attackCount = 0;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => CollisionBox.intersects(this, collisionBox);

    takeHit = (game, other) => {
        if (!this.invicibility) {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
            game.playSound('damage');
            
            if (!this.health) {
                this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
                game.score += 5000;
                this.evil = false;
            } else {
                game.score += 100;
                this.invicibility = 30;
            }
        }
    }
    
    defeatedPhase = game => {
        //velloss
        this.evil = false;
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    attackPhase = game => {
        
        if (!this.phaseBuffer) {
            this.setAnimation('down');
            this.targetSide = this.pos.x < 10 * 16;
            this.vel.x = 2 * (this.targetSide ? 1 : -1);
            this.targetY = 13 * 16;
        }

        const target = (this.targetSide ? 16 : 3) * 16;
        const dist = Math.abs(this.pos.x - target);

        if (this.targetY) this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (this.phaseBuffer && !(this.phaseBuffer % (this.evil ? 10 : 20))) {
            this.pos.y -= 8;
            const bullet = new Bullet(CollisionBox.center(this).plus(new Vector2(16 * (this.dir ? 1 : -1), 32)), new Vector2(0, 3), this);
            bullet.trident = true;
            game.scene.actors.push(bullet);
            game.playSound('bow_shoot');
        }

        if (dist < 1) {
            this.lastMove = this.phase;
            this.phase = 'idle';

            this.targetY = null;
            this.pos.x = target;
            this.vel.x = 0;
        }

        if (this.phaseBuffer % 2) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 0);
    }

    attack2Phase = game => {
        if (!this.phaseBuffer) {
            this.setAnimation('up');
            this.targetX = 9.5 * 16;
            this.targetY = 15 * 16;
        }
        
        if (this.targetX) this.pos.x = this.pos.x * (1 - .05) + this.targetX * .05;
        if (this.targetY) this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (this.phaseBuffer > 30) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            flare.vel.x += (this.evil ? .75 : .5) * (flare.pos.x < 9.5 * 16 ? 1 : -1);

            if (!(this.phaseBuffer % 8)) game.playSound('wind');
        }

        if (this.phaseBuffer === 5 * 60) {
            this.lastMove = this.phase;
            this.phase = 'attack3';

            this.pos.x = this.targetX;
            this.pos.y = this.targetY;
            this.targetX = null;
            this.targetY = null;
        }
    }
    
    attack3Phase = game => {
        if (!this.phaseBuffer) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            this.targetX = this.lastMove === 'attack2' ? 9.5 * 16 : flare.pos.x;
            this.targetY = 13 * 16;
            this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        }

        if (!this.attackBuffer) this.setAnimation(Math.abs(this.pos.x - this.targetX) > 16 ? 'move' : 'idle');

        this.pos.x = this.pos.x * (1 - .05) + this.targetX * .05;
        this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (this.attackBuffer && Math.abs(this.pos.x - this.targetX) < 1 && this.pos.y >= 20 * 16) {
            game.scene.shakeBuffer = 15;
            game.playSound('explosion');
            game.scene.particles.land(this, 1);
            
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';

            this.attackBuffer = false;
            this.targetX = null;
            this.targetY = null;
            this.vel.y = 0;
        }
        else if (Math.abs(this.pos.x - this.targetX) < 1) {
            this.setAnimation('down');
            this.targetY = 20 * 16;
            this.vel.y = 4;
            this.attackBuffer = true;
        }
    }

    attack4Phase = game => {
        const target = (this.targetSide ? 16 : 3) * 16;
        const dist = Math.abs(this.pos.x - target);
        if (dist < 48) this.vel.x *= .95;
        this.dir = dist > 16 ? this.targetSide : !this.targetSide;

        if (this.targetY) this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (dist < 1) {
            if (!this.intro) {
                this.lastMove = this.phase;
                this.phase = 'idle';
            }

            this.targetY = null;
            this.pos.x = target;
            this.vel.x = 0;
        }

        if (!(this.phaseBuffer % 20)) {
            const bullet = new Bullet(CollisionBox.center(this), new Vector2(0, .5), this);
            bullet.guraIce = true;
            game.scene.actors.push(bullet);
            game.playSound('wind');
        }

        if (this.phaseBuffer % 2) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 0);
        this.setAnimation(Math.abs(this.vel.x) > 2 ? 'move' : 'idle');
    }

    movePhase = game => {
        const target = (this.targetSide ? 16 : 3) * 16;
        const dist = Math.abs(this.pos.x - target);
        if (dist < 48) this.vel.x *= .95;
        this.dir = dist > 16 ? this.targetSide : !this.targetSide;

        if (this.targetY) this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (dist < 1) {
            if (!this.intro) {
                this.lastMove = this.phase;
                this.phase = 'idle';
            }

            this.targetY = null;
            this.pos.x = target;
            this.vel.x = 0;
        }

        if (this.phaseBuffer % 2) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 0);
        this.setAnimation(Math.abs(this.vel.x) > 2 ? 'move' : 'idle');
    }
    
    idlePhase = game => {
        if (this.phaseBuffer > (this.evil ? 24 : 32)) {
            if (['move'].includes(this.lastMove)) {
                switch (this.attackCount) {
                    case 0:
                        this.phase = 'attack';
                        break;
                    case 1:
                        this.phase = 'attack2';
                        break;
                    case 2:
                        this.phase = 'attack4';
                        this.targetSide = this.pos.x < 10 * 16;
                        this.vel.x = 3 * (this.targetSide ? 1 : -1);
                        this.targetY = Math.floor(13 + Math.random() * 2) * 16;
                        break;
                    case 3:
                        this.phase = 'attack3';
                        break;
                    default:
                        break;
                }
                if (this.attackCount < 3 || Math.random() > .5) this.attackCount += Math.random() < .5 ? 1 : -1;
                if (this.attackCount < 0) this.attackCount = 3;
                if (this.attackCount > 3) this.attackCount = 0;
            } else {
                this.phase = this.attackCount > 0 && Math.random() < .2 ? 'attack4' : 'move';
                this.targetSide = this.pos.x < 10 * 16;
                this.vel.x = 3 * (this.targetSide ? 1 : -1);
                this.targetY = Math.floor(13 + Math.random() * 4) * 16;
            }
        }
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        if (this.phase) this[`${this.phase}Phase`](game);

        if (this.phase === 'defeated') {
            this.vel.y += .1;
        }
        
        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;
        if (game.scene.underwater && !(this.frameCount % 32)) game.scene.particles.bubble(this.pos.plus(new Vector2(Math.random() * 6 - 3 + (this.dir ? this.size.x : 0), 8)), new Vector2(0, -.5 - Math.random() * .5), 1);

        if (this === game.scene.boss) {
            if (this.healthBar < this.health) {
                this.healthBar += .5;
                if (!(this.frameCount % 4)) game.playSound('pew2');
            } else {
                const amt = .1;
                this.healthBar = (1 - amt) * this.healthBar + amt * this.health;
                if (Math.abs(this.health - this.healthBar) < amt) this.healthBar = this.health;
            }
        }

        if (this.health && !this.evil && this.health < this.maxHealth * .5) this.evil = true;

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.animation === 'up' && this.phaseBuffer > 30) {
            cx.save();
            cx.translate(10 * 16, 12 * 16);
            for (let y = 0; y < 6; y++) {
                cx.drawImage(game.assets.images[`sp_gura_tornado`], (Math.floor(this.phaseBuffer * .25) % 4) * 24, 0, 24, 32, (this.evil ? 48 : 32) * Math.sin(this.phaseBuffer * .5) - 12, y * 32, 24, 32);
            }
            cx.restore();
        }

        if (!(this.invicibility % 2)) {
            cx.save();
            const center = CollisionBox.center(this).round();
            cx.translate(center.x, center.y);
            if (!this.dir) cx.scale(-1, 1);
            cx.translate(0, Math.round(Math.max(0, 2 - Math.abs(this.vel.x)) * Math.sin(Math.floor(this.frameCount * .125))));
            cx.drawImage(game.assets.images[`sp_gura_tail`], 32 * (Math.floor(this.phaseBuffer * (1 + Math.abs(this.vel.x * .25)) / 8) % 6), 0, 32, 32, -32, -16 + 2 * Math.cos(Math.floor(this.frameCount * .125)), 32, 32);
            if (['move', 'down'].includes(this.animation)) {
                cx.save();
                if (this.animation === 'down') {
                    cx.rotate(Math.PI * .5);
                    cx.translate(0, -14);
                }
                cx.drawImage(game.assets.images[`sp_gura_trident`], this.evil ? 72 : 0, 48, 72, 16, -32, -4, 72, 16);
                cx.restore();
            } else if (this.animation === 'up') {
                cx.drawImage(game.assets.images[`sp_gura_trident`], this.evil ? 72 : 0, 64 + 32 * (Math.floor(this.phaseBuffer * .25) % 2), 72, 32, -36, -36, 72, 32);
            } else {
                cx.drawImage(game.assets.images[`sp_gura_trident`], this.evil ? 72 : 0, 0, 72, 48, -24, -20, 72, 48);
            }
            cx.drawImage(game.assets.images[`sp_gura_${this.animation}`], this.evil ? 48 : 0, 0, 48, 48, -24, -24, 48, 48);
            cx.restore();
        }
        
        if (this.animation === 'up' && this.phaseBuffer > 30) {
            cx.save();
            cx.translate(10 * 16, 12 * 16);
            for (let y = 0; y < 6; y++) {
                cx.drawImage(game.assets.images[`sp_gura_tornado`], (Math.floor(this.phaseBuffer * .25) % 4) * 24, 0, 24, 32, -(this.evil ? 48 : 32) * Math.sin(this.phaseBuffer * .5) - 12, y * 32, 24, 32);
            }
            cx.restore();
        }
    }
}