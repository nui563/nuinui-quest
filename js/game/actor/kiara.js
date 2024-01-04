import { Actor, Arrow, Bullet } from './actor.js';
import { Noel } from './noel.js';
import { Vector2, CollisionBox } from '../../lib/gameEngine.js';
import { Flare } from './flare.js';

class Kiara extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .25;

    moveSpeed = .5;

    phaseBuffer = 0;

    damage = 1;
    
    healthBar = 0;

    reflect = true;

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
        
        if (!this.health) {
            this.blackScreen = false;
            game.scene.blackout = false;
            this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
            game.score += 5000;
        } else {
            game.score += 100;
            this.invicibility = 30;
        }
    }
    
    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
        this.fire = false;
    }

    firePhase = game => {
        if (!this.phaseBuffer) {
            this.setAnimation('charge');
            game.playSound("charge");
            this.reflect = false;
        }

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;

        if (!(this.phaseBuffer % 4)) game.scene.particles.charge_fire(CollisionBox.center(this));

        if (this.phaseBuffer > 60) {
            if (!this.fire) this.fire = this.health < this.maxHealth * .5 ? 48 : 32;
            else if (this.phaseBuffer % 2) this.fire++;
            
            if (!(this.phaseBuffer % 8)) game.playSound('wind');
        }

        if (this.phaseBuffer > 180) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.fire = 0;
        }
    }

    dashPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (!this.phaseBuffer) {
            this.shieldDash = Math.random() > .5;
            this.setAnimation(this.shieldDash ? 'idle' : 'charge');
            game.playSound("charge");
            this.reflect = false;
            this.dashCount = 0;
        }

        if (this.phaseBuffer === 60) {
            if (this.shieldDash) {
                this.setAnimation('dash');
            } else {
                this.setAnimation('dash2');
            }
            this.vel = new Vector2(12 * (this.dir ? 1 : -1), 0);
            game.playSound('slash');
        }

        if (this.phaseBuffer > 60) {
            if (this.phaseBuffer % 2) game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x * .5, this.size.y)), new Vector2(0, 0), 1);
            
            if (this.shieldDash) {
                if (this.phaseBuffer % 2) game.scene.particles.sparkle_fire(CollisionBox.center(this).plus(new Vector2(this.size.x * (this.dir ? 1 : -1), 0)), new Vector2(0, -1));
                if (!(this.phaseBuffer % 2)) game.scene.particles.sparkle_fire(CollisionBox.center(this).plus(new Vector2(this.size.x * (this.dir ? 1 : -1), 0)), new Vector2(0, 1));
                
                if (CollisionBox.intersects(this, flare)) {
                    flare.vel.x += this.vel.x * 2;
                    flare.vel.y = -1;
                }
            } else {
                if (this.vel.x) this.vel.x *= .97;
            }

            if (Math.abs(this.vel.x) < .75) {
                if (this.shieldDash && this.dashCount < (this.health < this.maxHealth * .5 ? 2 : 0)) {
                    this.phaseBuffer = 1;
                    this.dashCount++;
                } else {
                    this.vel.x = 0;
                    this.lastMove = this.phase;
                    this.setAnimation('idle');
                    this.phase = 'idle';
                }
            }
        } else {
            this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
            if (!(this.phaseBuffer % 4)) game.scene.particles.charge_fire(CollisionBox.center(this));
        }
    }

    jumpPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (!(this.phaseBuffer % 4)) game.scene.particles.sparkle_fire(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), new Vector2(0, 0));
        
        if (!this.phaseBuffer) {
            this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
            game.playSound("jump");
            this.setAnimation('jump');
            this.moveSpeed = 4 + Math.random();
            this.vel.y = -7;
            this.reflect = false;
        }

        this.vel.x = (this.dir ? 1 : -1) * this.moveSpeed;

        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.setAnimation('idle');
            this.vel = new Vector2(0, 0);
            this.moveSpeed = .5;
            this.reflect = true;
        }

    }

    movePhase = game => {

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        this.vel.x = this.moveSpeed * (1 + 1 - this.health / this.maxHealth) * (this.dir ? 1 : -1);

        if (!this.phaseBuffer) {
            this.setAnimation('walk');
            this.reflect = true;
        }

        const dist = Math.abs(this.pos.x - flare.pos.x);
        if (dist < 4 * 16 || dist > 11 * 16) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    idlePhase = game => {
        if (!this.phaseBuffer) {
            this.setAnimation('idle');
            this.vel = new Vector2(0, 0);
            this.reflect = true;
        }

        if (this.phaseBuffer > 30) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const dist = Math.abs(this.pos.x - flare.pos.x);

            if (this.health < this.maxHealth * .5 && !this.blazeMode) {
                this.blazeMode = true;
                this.phase = 'fire';
            } else if (dist > 4 * 16 && Math.random() < .5) this.phase = 'jump';
            else {
                if (dist > 11 * 16 || Math.random() < .5) this.phase = 'dash';
                else if (dist < 4 * 16) this.phase = 'fire';
                else this.phase = 'move';
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

        if (this.phase !== 'syringe') this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.vel.x = 0;

            if (this.animation === 'jump') this.dir = !this.dir;
            if (this.animation === 'dash') {
                game.scene.shakeBuffer = 15;
                game.playSound('explosion');
                for (let i = 0; i < 8; i++) {
                    const angle = -Math.PI * .5 + (Math.PI * .125) * i;
                    const vel = new Vector2(Math.cos(angle) * (this.dir ? -1 : 1), Math.sin(angle)).times(2);
                    game.scene.actors.push(new Bullet(
                        CollisionBox.center(this),
                        vel,
                        this
                    ));
                }
            }
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

        if (flare.playerControl && this.health && ['idle', 'walk'].includes(this.animation)) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.reflect) {
            const actorCollisions = game.scene.actors.filter(actor => actor instanceof Arrow && actor.checkHit(game, this) && !actor.reflected);
            if (actorCollisions.length) {
                this.shakeBuffer = 4;
                game.playSound("no_damage");
                if (!(flare instanceof Noel)) {
                    actorCollisions.forEach(a => {
                        a.reflected = true;
                        a.vel = a.vel.times(-1);
                    });
                }
            }
        }

        const dist = Math.abs(this.pos.x - flare.pos.x);
        if (this.fire && dist < this.fire) flare.takeHit(game, flare);

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

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        const center = CollisionBox.center(this).round();
        
        if (this.fire) {
            cx.save();
            cx.translate(center.x, 24 * 16);
            for (let y = 0; y < 6; y++) {
                cx.drawImage(game.assets.images[`sp_kiara_fire`], (Math.floor(this.phaseBuffer * .25) % 4) * 24, 0, 24, 32, this.fire * Math.sin(this.phaseBuffer * .5) - 12, y * 32, 24, 32);
            }
            cx.restore();
        }

        if (!(this.invicibility % 2)) {
            cx.save();
            cx.translate(center.x, center.y);
            if (!this.dir) cx.scale(-1, 1);
            const xOffset = ['walk'].includes(this.animation) ? Math.floor(this.animationFrame / 16) % 4 : 0;
            
            cx.drawImage(game.assets.images[`sp_kiara_${this.animation}`], xOffset * 64, 0, 64, 64, -36, -36 + 1, 64, 64);
            cx.restore();
        }
        
        if (this.fire) {
            cx.save();
            cx.translate(center.x, 24 * 16);
            for (let y = 0; y < 6; y++) {
                cx.drawImage(game.assets.images[`sp_kiara_fire`], (Math.floor(this.phaseBuffer * .25) % 4) * 24, 0, 24, 32, -this.fire * Math.sin(this.phaseBuffer * .5) - 12, y * 32, 24, 32);
            }
            cx.restore();
        }
    }
}

export { Kiara };
