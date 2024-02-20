class EvilFlare extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    phaseBuffer = 0;

    damage = 1;
    
    healthBar = 0;

    attackCount = 0;

    gunSide = false;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        if (this.phase === 'defeated') return false;
        return CollisionBox.intersects(this, collisionBox);
    }

    takeHit = (game, other) => {
        if (this.invicibility) return;
        
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        game.playSound('damage');
        
        if (!this.health) {
            this.setAnimation('hit');
            this.vel = new Vector2(this.dir ? -2 : 2, -3);
            this.phase = 'defeated';
        } else {
            this.invicibility = 30;
        }
    }
    
    defeatedPhase = game => {}

    backPhase = game => {}

    attackPhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles['charge_fire_3'](CollisionBox.center(this));

        if (!(this.phaseBuffer % 8)) {
            if (this.phaseBuffer > 4) {
                game.scene.actors.push(new Bullet(new Vector2(CollisionBox.center(this).x + this.phaseBuffer * 4, 24 * 16), new Vector2(0, 3), this));
                game.scene.actors.push(new Bullet(new Vector2(CollisionBox.center(this).x - this.phaseBuffer * 4, 24 * 16), new Vector2(0, 3), this));
            }
            game.playSound("miko_chant");
        }
        if (this.phaseBuffer === 64) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    attack2Phase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles['charge_fire_4'](CollisionBox.center(this));

        if (this.phaseBuffer > 39 && !(this.phaseBuffer % 20)) {
            this.setAnimation('gun');
            const bufferVal = Math.ceil((this.phaseBuffer-40) / 20) + .5;
            const vel = new Vector2(bufferVal * (this.dir ? 1 : -1), -2 * (3 - bufferVal));
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(10 * (this.dir ? 1 : -1), 8)), vel, this));
            game.playSound('bow_shoot');
            this.gunSide = !this.gunSide;
        }
        if (this.phaseBuffer === 99) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    dashPhase = game => {
        if (this.vel.x) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
        }

        if (Math.abs(this.vel.x) < .75) {
            this.vel.x = 0;
            this.lastPhase = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
        }
    }
    
    jumpPhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 16 - 8).round()), 0);
        if (this.phaseBuffer > 3 && this.pos.y >= 32 * 16) {
            this.pos.y = 32 * 16;
            this.vel = new Vector2(0, 0);
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.setAnimation('idle');
        }
        if (this.vel.y > 0) this.setAnimation('fall');
    }
    
    shieldPhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles['charge'](CollisionBox.center(this));
        if (this.phaseBuffer === 30) {
            for (let i = 0; i < 4; i++) {
                game.scene.actors.push(new IceShield(CollisionBox.center(this), Math.PI / 2 * i, this));
            }
            game.playSound('no_damage');
        }
        if (this.phaseBuffer === 60) {
            this.lastPhase = this.phase;
            this.phase = 'idle';
        }
    }
    
    rocketPhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles['charge_fire_2'](CollisionBox.center(this));

        if (this.phaseBuffer > 29 && !(this.phaseBuffer % 30)) {
            this.setAnimation('gun');
            game.scene.actors.push(new Rocket(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -8), this.pos.y + 16), new Vector2(1 * (this.dir ? 1 : -1), 0), this));
            // if (random() > .5) game.playSound('peko');
            game.playSound("gun");
            this.gunSide = !this.gunSide;
        }
        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    gunPhase = game => {
        if (this.phaseBuffer > 15 && !(this.phaseBuffer % 12)) {
            this.setAnimation('gun');
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 14), new Vector2(2 * (this.dir ? 1 : -1), 0), this));
            game.playSound("gun");
            this.gunSide = !this.gunSide;
        }
        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    idlePhase = game => {
        if (this.phaseBuffer >= 45) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);

            if (this.attackCount < 2 || this.lastPhase === 'jump' || this.lastPhase === 'dash') {
                if (random() < .125 && !game.scene.actors.find(a => a instanceof IceShield && a.originActor === this)) {
                    this.setAnimation('chant');
                    this.phase = 'shield';
                } else {
                    switch (Math.floor(random() * 4)) {
                        case 0:
                            this.setAnimation('chant');
                            this.phase = 'attack';
                            break;
                        case 1:
                            this.phase = 'attack2';
                            break;
                        case 2:
                            this.setAnimation('chant');
                            this.phase = 'rocket';
                            break;
                        case 3:
                            this.phase = 'gun';
                            break;
                        default:
                            break;
                    }
                    this.attackCount++;
                }
            } else {
                this.attackCount = 0;
                if (flare.pos.distance(this.pos) > 128 || flare.pos.y !== this.pos.y) {
                    this.phase = 'dash';
                    this.setAnimation('slide');
                    game.playSound('dash');
                    this.vel = new Vector2(7 * (this.dir ? 1 : -1), 0);
                } else {
                    this.phase = 'jump';
                    this.setAnimation('jump');
                    game.playSound("jump");
                    this.vel = new Vector2(2 * (this.dir ? 1 : -1), -4);
                }
            }
        }
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (this.phase) this[`${this.phase}Phase`](game);

        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (['jump', 'defeated'].includes(this.phase)) this.vel.y += .125;
        if (!['jump'].includes(this.phase)) this.vel.x *= .95;
        if (Math.abs(this.vel.x) < .01) this.vel.x = 0;
        this.pos = this.pos.plus(this.vel);
        this.pos.y = Math.round((this.pos.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x) * 100) / 100;

        if (this.pos.x < 23 * 16) {
            this.pos.x = 23 * 16;
            if (this.phase === 'jump') {
                this.vel.x *= -1;
                this.dir = !this.dir;
            }else this.vel.x = 0;
        }
        if (this.pos.x > 36 * 16) {
            this.pos.x = 36 * 16;
            if (this.phase === 'jump') {
                this.vel.x *= -1;
                this.dir = !this.dir;
            }else this.vel.x = 0;
        }
        if (this.pos.y > 32 * 16) {
            this.pos.y = 32 * 16;
            this.vel.y = 0;
            if (this.phase === 'defeated' && this.animation !== 'back') this.setAnimation('idle');
        }

        if (['idle', 'rocket'].includes(this.phase) && this.animation !== 'gun') this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;

        if (this.health) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 20 - 10)), new Vector2(random() - .5, random() * -2), 0);
            }
        }

        if (this === game.scene.boss) {
            if (this.healthBar < this.health) {
                this.healthBar += 1;
                if (!(this.frameCount % 4)) game.playSound('pew2');
            } else {
                const amt = .05;
                this.healthBar = (1 - amt) * this.healthBar + amt * this.health;
                if (Math.abs(this.health - this.healthBar) < amt) this.healthBar = this.health;
            }
        }

        if (this.animation === 'gun' && Math.floor(this.animationFrame * .25) > 2) this.setAnimation('idle');

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (!(this.invicibility % 2)) {
            cx.save();
            cx.translate(Math.round(this.pos.x) + this.size.x / 2, Math.round(this.pos.y));
            if (!this.dir) cx.scale(-1, 1);
            
            if (!['back'].includes(this.animation)) {
                cx.save();
                cx.translate(-this.size.x / 2, 0);
                const velX = this.vel.x;
                const side = Math.round(velX) || ['gun', 'fall', 'jump'].includes(this.animation);
                const spd = Math.round(16 / (1 + Math.abs(velX)));
                const fallOffset = (this.vel.y > .125 ? -2 : 0);
                cx.drawImage(game.assets.images['sp_ponytail'],
                    (Math.floor(this.animationFrame / spd) % 3) * 24, side ? 24 : 0, 24, 24,
                    -14, 2 + (this.vel.y ? -4 : 0) + fallOffset + (this.animation === 'slide' ? 8 : 0), 24, 24);
                
                cx.drawImage(game.assets.images['sp_ribbon'],
                    (Math.floor(this.animationFrame / spd * 1.5) % 3) * 16, side ? 16 : 0, 16, 16,
                    side ? (['run', 'run_attack'].includes(this.animation) ? -14 : -9) : -8, (side ? 16 : 18) + fallOffset * 2, 16, 16);
                
                cx.save();
                cx.translate(this.size.x / 2, 0);
                cx.scale(-1, 1);
                cx.drawImage(game.assets.images['sp_ribbon'],
                    (Math.floor(this.animationFrame / spd * 1.5) % 3) * 16, side ? 16 : 0, 16, 16,
                    side ? (['run', 'run_attack'].includes(this.animation) ? -12 : -9) : -8, (side ? 16 : 18) + fallOffset, 16, 16);
                cx.restore();
                cx.restore();
            }
            
            const img = this.animation;
            if (img === 'gun') {
                const offset = Math.floor(this.animationFrame * .25);
                cx.drawImage(game.assets.images[`sp_flare_${img}`], 40 * offset, this.gunSide ? 40 : 0, 40, 40, -16, -6, 40, 40);
            } else {
                if (img === 'slide') cx.translate(0, 11);
                cx.drawImage(game.assets.images[`sp_flare_${img}`], -16, -6);
            }
            cx.restore();
        }
    }
}