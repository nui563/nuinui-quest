class Miko extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    healthBar = 0;

    gravity = .15;

    moveSpeed = 2.5;

    phaseBuffer = 0;

    chantLevel = 0;

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

            
            if (game.scene.achievement7 && other.type) game.scene.achievement7 = false;

            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
            game.playSound('damage');
            
            if (this.skullBoss) this.skullBoss.takeHit(game, other);

            if (!this.health) {
                this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
                game.canvas1.style.filter = 'none';
                game.canvas2.style.filter = 'none';
            } else {
                this.invicibility = 30;
            }
        }
    }

    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    idlePhase = game => {
        if (this.skullBoss && !this.invicibility) this.invicibility = 4;
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (this.phaseBuffer >= (!this.skullBoss ? 31 : 63)) {
            if (this.pos.distance(flare.pos) < 16 * 12 && random() > (!this.lastMove ? 1 : this.lastMove === 'move' ? .1 : (this.skullBoss ? .5 : .3))) {
                if (this.skullBoss) {
                    this.phase = 'sniper';
                    this.setAnimation('sniper');
                    // game.playSound("charge");
                } else {
                    if (this.health <= this.maxHealth / 2 && !this.nightMode) {
                        game.playSound('noise');
                        game.scene.shakeBuffer = 8;
                        game.canvas1.style.filter = 'brightness(0%)';
                        game.canvas2.style.filter = 'brightness(0%)';
                        this.nightMode = true;
                    }
                    if (random() > (this.lastMove === 'chant' ? .8 : .6)) {
                        this.phase = 'chant';
                        this.setAnimation('chant');
                    } else {
                        this.phase = 'kick';
                    }
                }
            } else {
                this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
                if (random() > .6 && this.lastMove !== 'sniper') {
                    this.phase = 'sniper';
                    this.setAnimation('sniper');
                } else {
                    this.phase = 'move';
                    game.playSound("jump");
                    if (this.pos.distance(flare.pos) > 16 * 12) this.moveDir = flare.pos.x > this.pos.x ? 1 : -1;
                    else this.moveDir = random() > .5 ? 1 : -1;
                    this.vel.y = -4;
                }
            }
        }
    }

    kickPhase = game => {
        if (!this.phaseBuffer) {
            this.vel = new Vector2(0, -5);
            this.setAnimation('jump');
            game.playSound("jump");
        }
        else if (this.phaseBuffer && !this.vel.x && this.vel.y >= 0 && this.animation === 'jump') {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            this.dir = this.pos.x < flare.pos.x;
            this.vel.x = 4 * (this.dir ? 1 : -1);
            this.vel.y = 2;
            this.setAnimation('kick');
            game.playSound("jump2");
        }
        else if (this.phaseBuffer && this.isGrounded) {
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
            this.vel.x = 0;
            game.playSound('land');
            game.scene.particles.land(this);
        }
    }

    sniperPhase = game => {
        if (this.phaseBuffer > 15 && !(this.phaseBuffer % 20)) {
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 12), new Vector2(2 * (this.dir ? 1 : -1), 0), this));
            game.playSound("pew");
            this.shakeBuffer = 8;
        }
        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
        }
    }
    
    chantPhase = game => {
        if (!(this.phaseBuffer % 8)) {
            if (this.phaseBuffer > 4) {
                game.scene.actors.push(new Bullet(new Vector2(CollisionBox.center(this).x + this.phaseBuffer * 4, 24 * 16), new Vector2(0, 3), this));
                game.scene.actors.push(new Bullet(new Vector2(CollisionBox.center(this).x - this.phaseBuffer * 4, 24 * 16), new Vector2(0, 3), this));
            }
            game.playSound("pew2");
        }
        if (this.phaseBuffer === 64) {
            this.chantLevel++;
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    movePhase = game => {
        if (this.skullBoss && !this.invicibility) this.invicibility = 4;
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 16 - 8).round()), 0);
        this.vel.x = this.moveDir * this.moveSpeed;
        if (this.phaseBuffer > 3 && this.isGrounded) {
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
        // if (this.phase !== 'chant' && this.health > this.maxHealth / 2) this.chantPhase(game);

        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.moveDir *= -1;
            this.vel.x = 0;
        }

        this.isGrounded = false;
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.isGrounded = CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).some(c => c.other.pos.y > this.pos.y);
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            if (this.health) this.vel.y = 0;
        }

        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (flare.playerControl && this.health && this.animation === 'idle') this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.skullBoss) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_spirit(CollisionBox.center(this).plus(new Vector2(random() * 32 - 16, random() * 20 - 10)), new Vector2(random() * 2 - 1, random() * -1), 0);
            }
        }

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

        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;

        // if (!(this.frameCount % 8) && this.health && this.health < this.maxHealth / 2 && !this.mikofast) {
        //     this.mikofast = true;
        //     this.update(game);
        //     this.mikofast = false;
        // }
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
        const offset = new Vector2(16, 16);
        const xSize = 48;
        const spd = this.animation === 'chant' ? 16 : 1;
        const frame = this.animation === 'chant' ? 4 : 1;
        cx.drawImage(game.assets.images[`sp_miko_${this.animation}`],
            (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 48, 48,
            -offset.x, -offset.y, 48, 48);
        cx.restore();
    }
}