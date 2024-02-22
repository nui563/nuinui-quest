class Calli extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .25;

    moveSpeed = 3;

    phaseBuffer = 0;

    damage = 1;
    
    healthBar = 0;

    attackCount = 0;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => CollisionBox.intersects(this, collisionBox);

    takeHit = (game, other) => {
        if (this.invicibility) return;

        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        game.playSound('damage');
        
        if (this.skullBoss) this.skullBoss.takeHit(game, other);

        if (!this.health) {
            this.blackScreen = false;
            game.scene.blackout = false;
            this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
        } else {
            this.invicibility = 30;
        }
    }
    
    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
        this.scythe.rotate = false;
    }

    attackPhase = game => {
        const targetPos = new Vector2(29.5 * 16, 16 * 16);
        if (this.pos.distance(targetPos) > 1) this.pos = this.pos.lerp(targetPos, .05);
        else this.pos = targetPos;

        if (this.phaseBuffer < 180) {
            for (let i = 0; i < Math.floor(this.phaseBuffer / 5); i++) {
                game.scene.particles['charge_black_smoke'](CollisionBox.center(this), 0);
            }
            if (!(this.phaseBuffer % 60)) game.playSound('charge2');
        }

        game.scene.customDraw.push(game => {
            const cx = game.ctx0;
            cx.save();
            cx.fillStyle = '#000';
            cx.globalAlpha = Math.min(1, this.phaseBuffer / 180);
            cx.fillRect(0, 0, game.width, game.height);
            cx.restore();
        });

        if (this.phaseBuffer === 180) {
            this.blackScreen = 60;
            this.blackScreenBuffer = true;
            this.lastMove = this.phase;
            this.phase = 'move';
            if(this.scythe.follow) this.scythe.rotate = true;
            this.vel.y = -2;
        }
    }

    attack2Phase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (!this.phaseBuffer) {
            this.scythe.rotate = true;
            game.playSound("charge");
        }

        if (this.phaseBuffer === 60) {
            if (random() < .5) {
                this.lastMove = this.phase;
                this.phase = 'attack4';
            } else {
                this.setAnimation(this.skullBoss ? 'hide' : 'point');
                this.scythe.follow = false;
                game.playSound('slash');
            }
        }

        if (this.phaseBuffer > 60) {
            const progress = (this.phaseBuffer - 60) / 120;
            this.scythe.pos.x = this.pos.x - 24 + (this.dir ? 1 : -1) * 192 * (4 * (progress - progress ** 2));

            if (progress > 1) {
                this.lastMove = this.phase;
                this.phase = 'move';
                this.vel = new Vector2(0, 0);
                this.scythe.follow = true;
            }
        } else {
            this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        }
    }

    attack4Phase = game => {
        this.scythe.shakeBuffer = 2;

        if (!this.phaseBuffer) game.playSound("charge");

        if (this.phaseBuffer === 60) {
            this.setAnimation(this.skullBoss ? 'hide' : 'dash');
            this.vel = new Vector2(12 * (this.dir ? 1 : -1), 0);
            game.playSound('slash');
        }

        if (this.phaseBuffer > 60) {
            if (this.phaseBuffer % 2) game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x * .5, this.size.y)), new Vector2(0, 0), 1);
            if (this.vel.x) this.vel.x *= .97;
            
            
            if (this.skullBoss) {
                for (let i = 0; i < 8; i++) {
                    game.scene.particles.smoke_black(CollisionBox.center(this).plus(new Vector2(random() * 8 - 4, random() * 16 - 8).round()), new Vector2(0, 0), 1);
                }
            }

            if (Math.abs(this.vel.x) < .75) {
                this.vel.x = 0;
                this.lastMove = this.phase;
                this.scythe.rotate = false;
                this.setAnimation(this.skullBoss ? 'hide' : 'idle');
                this.phase = 'idle';
            }
        }
    }

    attack3Phase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;

        if(this.scythe.follow) this.scythe.rotate = true;

        const targetPos = new Vector2(this.pos.x, 16 * 16);
        if (this.pos.distance(targetPos) > 1) this.pos = this.pos.lerp(targetPos, .05);
        else this.pos = targetPos;

        if (this.phaseBuffer >= 60 && !(this.phaseBuffer % 30)) {
            const p1 = CollisionBox.center(flare);
            const p2 = CollisionBox.center(this);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-1);
            game.scene.actors.push(new Bullet(p2, vel, this));
            game.playSound('throw');
        }
        
        if (this.phaseBuffer >= 240) {
            this.lastMove = this.phase;
            this.phase = 'move';
            this.vel.y = -2;
        }
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 16 - 8).round()), 0);
        
        this.vel.x = this.moveDir * this.moveSpeed;

        this.setAnimation(this.vel.y ? (this.skullBoss ? 'jump2' : 'jump') : (this.skullBoss ? 'hide' : 'idle'));
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            if (this.attackBuffer) {
                this.attackBuffer = false;
                this.phase = 'attack2';
                this.setAnimation(this.skullBoss ? 'hide' : 'back');
            } else this.phase = 'idle';
            this.vel = new Vector2(0, 0);
            if(this.scythe.follow) this.scythe.rotate = false;
        }
    }

    move2Phase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (this.phaseBuffer < 60) {
            for (let i = 0; i < Math.floor(this.phaseBuffer / 2); i++) {
                game.scene.particles.smoke_black(CollisionBox.center(this).plus(new Vector2(random() * 64 - 32, random() * 64 - 32).round()), new Vector2(0, 0), 1);
            }
        }

        if (this.phaseBuffer === 60) {
            this.pos.x = flare.pos.x;
            this.pos.y = 8 * 16;
            this.vel.y = -4;
            this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
            this.moveDir = 0;

            this.lastMove = this.phase;
            if (random() > .25) this.blackScreenBuffer = false;
            if (random() > .5) this.attackBuffer = true;

            this.phase = 'move';

            this.scythe.rotate = true;
            this.scythe.follow = true;
        }
    }
    
    idlePhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (this.phaseBuffer >= (this.skullBoss ? 63 : 31)) {
            if (this.skullBoss && random() < .75) {
                this.phase = 'attack2';
                this.setAnimation('hide');
            }
            else if (!this.skullBoss && this.lastMove === 'move' && random() < .75) {
                switch (this.attackCount) {
                    case 0:
                        this.phase = 'attack2';
                        this.setAnimation(this.skullBoss ? 'hide' : 'back');
                        break;
                    case 1:
                        this.phase = 'attack3';
                        this.setAnimation(this.skullBoss ? 'hide' : 'charge');
                        break;
                    case 2:
                        if (this.blackScreen) this.phase = 'move2';
                        else {
                            this.phase = 'attack';
                            this.setAnimation(this.skullBoss ? 'hide' : 'charge');
                        }
                        break;
                    default:
                        break;
                }
                this.attackCount++;
                if (this.attackCount > 2) this.attackCount = 0;
            } else {
                this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
                this.phase = 'move';
                game.playSound("jump");
                this.moveDir = this.dir ? 1 : -1;
                this.vel.y = -8;
                this.scythe.rotate = true;
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

        if (!['attack', 'attack3'].includes(this.phase)) this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
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

        if (this.blackScreen) {
            if (this.blackScreen >= 60) game.scene.blackout = true;
            game.scene.customDraw.push(game => {
                const cx = game.ctx0;
                cx.save();
                cx.fillStyle = '#000';
                cx.globalAlpha = this.blackScreen > 60 ? 1 : this.blackScreen / 60;
                cx.fillRect(0, 0, game.width, game.height);
                cx.restore();
            });
            if (!this.blackScreenBuffer) this.blackScreen--;
            if (!this.blackScreen) game.scene.blackout = false;
        }

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.invicibility % 2) return;
        if (this.skullBoss && !this.vel.y && Math.abs(this.vel.x) > 2) return;
        cx.save();
        const center = CollisionBox.center(this).round();
        cx.translate(center.x, center.y);
        if (!this.dir) cx.scale(-1, 1);
        if (this.animation === 'jump' || this.animation === 'jump2') cx.rotate(Math.floor(this.frameCount * .5) * Math.PI * .25);
        const xOffset = ['point', 'charge', 'back'].includes(this.animation) ? Math.floor(this.frameCount * (this.animation === 'back' ? .25 : .125)) % 2 : 0;
        if (this.animation === 'charge') cx.translate(0, 2 * Math.sin(this.frameCount * .125));
        cx.drawImage(game.assets.images[`sp_calli_${this.animation}`], xOffset * 48, 0, 48, 48, -24, -32 + 1, 48, 48);
        cx.restore();
    }
}

class CalliScythe extends Actor {
    size = new Vector2(64, 64);
    vel = new Vector2(0, 0);

    angle = 0;
    rotate = true;

    intro = true;

    constructor(pos, calli) {
        super(pos);
        this.calli = calli;
        this.dir = calli.dir;
    }
    
    checkHit = (game, collisionBox) => {
        if (!this.rotate) return false;
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }
    
    takeHit = (game, other) => {
        this.shakeBuffer = 15;
        game.playSound('no_damage');
    }

    update = game => {
        if (this.pos.y < this.calli.pos.y - 16) this.vel.y += .1;
        else this.vel.y = 0;

        // if (this.throwPhase) {
        //     this.pos.x += Math.cos((this.frameCount / 256) * (180 / Math.PI)) * (this.type === 'asura' ? 1 : -1) * 8;
        // } else {
        //     this.pos.x += Math.cos((this.frameCount / 512) * (180 / Math.PI)) * (this.type === 'asura' ? 1 : -1);
        // }

        if (this.rotate) {
            if (!(this.frameCount % 2)) this.angle += Math.PI * (this.calli.phase === 'attack4' ? .5 : .25);

            const center = CollisionBox.center(this).round();
            const calliCenter = CollisionBox.center(this.calli).plus(new Vector2(8, 0)).round();
            if (this.intro && center.distance(calliCenter) < 8) {
                this.rotate = false;
                this.follow = true;
            }
        }

        this.pos = this.pos.plus(this.vel);
        
        if (this.follow) {
            this.dir = this.calli.dir;
            this.vel = new Vector2(0, 0);
            if (this.rotate && ['jump', 'charge'].includes(this.calli.animation)) this.pos = this.calli.pos.plus(this.calli.size.times(.5).plus(this.size.times(-.5))).round();
            else this.pos = CollisionBox.center(this.calli).plus(new Vector2(-this.size.x * .5 + 8 * (this.dir ? -1 : 1), -this.size.y * .5)).round();
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        const center = CollisionBox.center(this).round();
        cx.translate(center.x, center.y);
        if (!this.dir) cx.scale(-1, 1);
        if (this.rotate) cx.rotate(this.angle);
        if (this.calli.animation === 'charge') cx.translate(0, Math.floor(2 * Math.cos(this.calli.frameCount * .125)));
        if (this.calli.phase === 'attack4' && Math.floor(this.frameCount * .25) % 2) cx.filter = `contrast(0) brightness(2)`;
        cx.drawImage(game.assets.images[`sp_calli_scythe`], 0, this.rotate ? 128 : this.intro ? 0 : 64, 64, 64, -32, -32, 64, 64);
        cx.restore();
    }
}