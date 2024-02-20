class Ame extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .15;

    moveSpeed = 3;

    phaseBuffer = 0;

    damage = 1;
    
    healthBar = 0;

    attackCount = 0;
    
    focusTime = 6 * 60;

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
        } else {
            this.invicibility = 30;
        }
    }
    
    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    clockPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (!this.phaseBuffer) {
            this.resetRoom = !(flare instanceof Noel) && this.health < this.maxHealth * .5;
            this.setAnimation(this.resetRoom ? 'laugh' : 'item');
            this.shakeBuffer = 15;
            game.playSound('charge');
        }
        
        for (let i = 0; i < Math.floor(this.phaseBuffer / 5); i++) {
            game.scene.particles[this.resetRoom ? 'charge_time' : 'charge_slow'](CollisionBox.center(this), 0);
        }
        
        game.scene.actors.filter(a => a instanceof Arrow && !a.kanataBuffer && Math.abs(this.pos.x - a.pos.x) < 32 && Math.sign(a.vel.x) !== Math.sign(this.dir ? 1 : -1)).forEach(a => a.kanataBuffer = 1);
        
        if (this.phaseBuffer === (this.resetRoom ? 4 : 2) * 60) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';

            if (game.scene.isFocus) {
                game.scene.isFocus = 0;
                game.playSound("question");
            } else {
                game.playSound("focus");
                if (this.resetRoom) {
                    flare.pos = new Vector2(85 * 16, 20 * 16);
                    flare.vel = new Vector2(0, 0);
                    flare.dir = true;
                    game.stopBGM();
                    game.scene.currentSection = {pos:new Vector2(0, 0), size:new Vector2(0, 0)};
                    game.scene.updateSection(game);
                    game.scene.ameReset = true;
                    game.scene.boss = null;
                } else game.scene.isAmeFocus = this.focusTime;
            }
            this.resetRoom = false;
        }
    }

    gunPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        this.dir = this.pos.x < flare.pos.x;
        if (this.phaseBuffer === 96) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
        else if (!((this.phaseBuffer + 12) % 24)) {
            this.setAnimation('gun2');
        }
        else if (!(this.phaseBuffer % 24)) {
            this.setAnimation('gun');
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 16 : -16), this.pos.y + 8), new Vector2(4 * (this.dir ? 1 : -1), 0), this));
            game.playSound("gun");
            this.shakeBuffer = 8;
        }
    }

    poundPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (!this.phaseBuffer) this.setAnimation('idle');

        if (this.phaseBuffer === 30) {
            this.vel = new Vector2(0, -5);
            this.setAnimation('jump');
            game.playSound("jump");
        }
        else if (this.phaseBuffer > 30 && this.vel.y >= 0 && this.animation === 'jump') {
            this.vel.y = 2;
            this.vel.x = 0;
            this.setAnimation('pound');
            game.playSound("miko_kick");
        }
        else if (this.phaseBuffer > 30 && this.isGrounded) {
            game.scene.shakeBuffer = 15;
            this.vel.x = 0;
            this.lastMove = this.phase;
            if (this.poundCount < 2) {
                this.poundCount++;
                this.lastPhase = null;
            } else {
                this.phase = 'idle';
            }
            game.playSound('explosion');
            game.scene.particles.land(this, 1);
        }
        else if (this.animation === 'jump'){
            if (Math.abs(this.pos.x - flare.pos.x) > 2) this.dir = this.pos.x < flare.pos.x;
            this.vel.x = this.dir ? 2 : -2;
        }
    }

    syringePhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;

        if (this.phaseBuffer && !(this.phaseBuffer % 20)) {
            const p1 = CollisionBox.center(flare);
            const p2 = CollisionBox.center(this);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + random() * 0.125 - 0.0625;
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-3);
            const bullet = new Bullet(this.pos.plus(new Vector2(8, 16)), vel, this);
            bullet.syringe = true;
            bullet.angle = angle;
            bullet.damage = 2;
            game.scene.actors.push(bullet);
            game.playSound("pew");
        }
        if (this.phaseBuffer > 60) {
            this.lastMove = this.phase;
            this.phase = 'move';
            this.moveDir = this.dir ? 1 : -1;
            this.moveSpeed = 2 + 2 * random();
            this.vel.y = -1 - random();
        }
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 16 - 8).round()), 0);
        
        this.vel.x = this.moveDir * this.moveSpeed;

        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }

        this.setAnimation(this.vel.y ? 'jump' : 'idle');

        if (!this.isGrounded && this.wall) {
            this.lastMove = this.phase;
            this.phase = 'syringe';
            this.vel = new Vector2(0, 0);
            this.setAnimation('charge');
            this.phaseBuffer = 0;
        }
    }
    
    idlePhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (this.phaseBuffer >= 48) {
            if (this.lastMove === 'move' && random() < .75) {
                switch (this.attackCount) {
                    case 0:
                        this.phase = game.scene.isFocus ? 'pound' : 'clock';
                        break;
                    case 1:
                        this.phase = 'gun';
                        break;
                    case 2:
                        this.phase = 'pound';
                        this.poundCount = 0;
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
                this.moveSpeed = 2 + random();
                this.vel.y = -4 - random();
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

        this.wall = false;
        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.moveDir *= -1;
            this.wall = true;
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

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.invicibility % 2) return;
        
        cx.save();
        const center = CollisionBox.center(this).round();
        cx.translate(center.x, center.y);
        if (!this.dir) cx.scale(-1, 1);
        const xOffset = ['gun'].includes(this.animation) ? Math.floor(this.animationFrame * .25) % 3 : ((['charge'].includes(this.animation) && this.phaseBuffer > 20) || this.animation === 'laugh') ? Math.floor(this.animationFrame * (this.animation === 'laugh' ? .2 : .1)) % 2 : 0;
        
        cx.drawImage(game.assets.images[`sp_ame_${this.animation}`], xOffset * 48, 0, 48, 48, -24, -32 + 1, 48, 48);

        if (['item', 'laugh'].includes(this.animation)) cx.drawImage(game.assets.images['sp_clock'], 0, 0, 20, 20, -16, -40 + Math.floor(2 * Math.sin(this.frameCount * .125)), 20, 20);
        cx.restore();
    }
}