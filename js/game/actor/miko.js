class Miko extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .15;

    moveSpeed = 1.5;

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
            this.health--;
            game.scene.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.playSound('damage');
            
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
        if (this.phaseBuffer >= 31) {
            if (Math.random() > (!this.lastMove ? 1 : this.lastMove === 'move' ? .1 : (!game.scene.miniBossCleared ? .5 : .3))) {
                if (!game.scene.miniBossCleared) {
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
                    if (Math.random() > .6) {
                        this.phase = 'chant';
                        this.setAnimation('chant');
                    } else {
                        this.phase = 'kick';
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
            game.playSound("miko_kick");
        }
        else if (this.phaseBuffer && this.isGrounded) {
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
            this.vel.x = 0;
        }
    }

    sniperPhase = game => {
        if (!(this.phaseBuffer % 20)) {
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 14), new Vector2(2 * (this.dir ? 1 : -1), 0), this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 19) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    chantPhase = game => {
        if (!(this.phaseBuffer % 8)) {
            if (this.phaseBuffer > 16 && this.phaseBuffer < 56) {
                for (let i = 40; i < 16 * 20; i+=36) {
                    if (Math.random() > .75) game.scene.actors.push(new Bullet(new Vector2(CollisionBox.center(this).x + i + Math.floor(Math.random() * 8 - 4), 24 * 16), new Vector2(0, 2 + Math.random()), this));
                    if (Math.random() > .75) game.scene.actors.push(new Bullet(new Vector2(CollisionBox.center(this).x - i + Math.floor(Math.random() * 8 - 4), 24 * 16), new Vector2(0, 2 + Math.random()), this));
                }
            }
            game.playSound("miko_chant");
        }
        if (this.phaseBuffer === 64) {
            this.chantLevel++;
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), 0);
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