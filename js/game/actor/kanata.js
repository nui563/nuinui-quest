class Kanata extends Actor {
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
                this.evil = false;
            } else {
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

    divePhase = game => {
        
        if (!this.phaseBuffer) this.diveCount = 0;

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (this.pos.y < -8 * 16 && !this.diveBuffer) {
            this.setAnimation('dash');
            const rand = random() < .5 ? 1 : -1;
            this.pos = flare.pos.plus(new Vector2(10 * 16 * rand, 10 * 16).times(-1));
            this.vel = new Vector2(3.5 * rand, 3.5);
            this.dir = rand > 0;
            game.playSound('slash');
        }

        if (this.pos.y > 12 * 16) {

            this.vel = new Vector2(0, 0);
            this.pos.y = -8 * 16 - 1;
            this.diveCount++;
            this.diveBuffer = 60;

            if (this.diveCount > 2) {
                this.lastMove = this.phase;
                this.phase = 'lerp';
            }
        }

        if (this.diveBuffer) this.diveBuffer--;
        if (this.phaseBuffer % 2) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 0);
    }

    lerpPhase = game => {
        if (!this.phaseBuffer) {
            this.targetSide = this.pos.x < 8.5 * 20 * 16;
            this.targetX = (8 * 20 + (this.targetSide ? 16 : 3)) * 16;
            this.targetY = Math.floor(1 + random() * 4) * 16;
        }

        this.setAnimation('idle');
        this.pos.x = this.pos.x * (1 - .05) + this.targetX * .05;
        this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (this.pos.distance(new Vector2(this.targetX, this.targetY)) < 1) {
            this.targetX = null;
            this.targetY = null;
            this.vel = new Vector2(0, 0);
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    attackPhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (!this.phaseBuffer) {
            this.setAnimation('hand');
            this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        }

        this.targetY = flare.pos.y - 16;
        this.targetX = flare.pos.x + flare.size.x * .5 + ((this.dir ? -1 : 1) * 96);
        this.pos.x = this.pos.x * (1 - .05) + this.targetX * .05;
        this.pos.y = this.pos.y * (1 - .05) + this.targetY * .05;

        if (this.phaseBuffer < 360) {
            if (!(this.phaseBuffer % 8)) game.playSound('wind');
            flare.vel = flare.vel.plus(new Vector2(.25 * (this.dir ? 1 : -1), -.05));
            this.tornado = true;
            game.scene.particles.charge(CollisionBox.center(this).plus(new Vector2(24 * (this.dir ? 1 : -1), 8)));
            game.scene.actors.filter(a => a instanceof Arrow && !a.kanataBuffer && Math.abs(this.pos.x - a.pos.x) < 48 && Math.sign(a.vel.x) !== Math.sign(this.dir ? 1 : -1)).forEach(a => a.kanataBuffer = 1);
        }else if (this.phaseBuffer === 360) {
            this.setAnimation('idle');
            this.tornado = false;
        }

        if (this.phaseBuffer >= 480) {
            this.lastMove = this.phase;
            this.phase = 'lerp';

            this.attackBuffer = false;
            this.targetX = null;
            this.targetY = null;
            this.vel.y = 0;
        } else if (this.phaseBuffer && !(this.phaseBuffer % 120)) {
            game.scene.shakeBuffer = 15;
            this.pos.x += 32 * (this.dir ? -1 : 1);
            flare.vel.x += 8 * (this.dir ? 1 : -1);
            flare.vel.y = -4;
        }
    }

    movePhase = game => {
        const target = (8 * 20 + (this.targetSide ? 16 : 3)) * 16;
        const dist = Math.abs(this.pos.x - target);
        if (dist < 48) this.vel.x *= .95;
        this.dir = dist > 16 ? this.targetSide : !this.targetSide;

        if (this.targetY && this.vel.y > -4) {
            this.vel.y -= .09525;
        }

        if (dist < 1) {
            if (!this.intro) {
                this.lastMove = this.phase;
                this.phase = 'idle';
            }

            this.targetY = null;
            this.pos.x = target;
            this.vel.x = 0;
            this.vel.y = 0;
        }

        if (this.phaseBuffer % 2) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 0);
        this.setAnimation(this.vel.y > 2 ? 'dash' : 'idle');
    }
    
    idlePhase = game => {
        if (this.phaseBuffer > (this.evil ? 24 : 32)) {
            if (['move'].includes(this.lastMove)) {
                switch (this.attackCount) {
                    case 0:
                        this.phase = 'dive';
                        this.vel.y = -2;
                        break;
                    case 1:
                        this.phase = 'attack';
                        break;
                    default:
                        break;
                }
                this.attackCount++;
                if (this.attackCount < 0) this.attackCount = 1;
                if (this.attackCount > 1) this.attackCount = 0;
            } else {
                this.phase = 'move';
                this.targetSide = this.pos.x < 8.5 * 20 * 16;
                this.vel.x = 3 * (this.targetSide ? 1 : -1);
                this.vel.y = 4;
                this.targetY = Math.floor(1 + random() * 4) * 16;
                game.playSound('throw');
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
        if (game.scene.underwater && !(this.frameCount % 32)) game.scene.particles.bubble(this.pos.plus(new Vector2(random() * 6 - 3 + (this.dir ? this.size.x : 0), 8)), new Vector2(0, -.5 - random() * .5), 1);

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
        const center = CollisionBox.center(this).round();
        
        if (this.tornado) {
            cx.save();
            cx.translate(center.x, center.y);
            if (this.dir) cx.scale(-1, 1);
            cx.rotate(Math.PI * .5);
            for (let y = 0; y < 6; y++) {
                cx.drawImage(game.assets.images[`sp_gura_tornado`], (Math.floor(this.phaseBuffer * .25) % 4) * 24, 0, 24, 32, 32 * Math.sin(this.phaseBuffer * .5) - 12, y * 32, 24, 32);
            }
            cx.restore();
        }

        if (!(this.invicibility % 2)) {
            cx.save();
            cx.translate(center.x, center.y);

            const angle = 15 * Math.sin(Math.floor(this.frameCount / 8)) * (Math.PI / 180);
            for (let i = 0; i < 2; i++) {
                cx.save();
                cx.translate(-4 * (this.dir ? 1 : -1), 0);
                if (i) cx.scale(-1, 1);
                cx.translate(-4, 0);
                cx.rotate(angle);
                cx.drawImage(game.assets.images['sp_kanata_wing'], 0, 0, 20, 12, -20, -6, 20, 12);
                cx.restore();
            }
            
            if (!this.dir) cx.scale(-1, 1);
            cx.translate(0, Math.round(Math.max(0, 2 - Math.abs(this.vel.x)) * Math.sin(Math.floor(this.frameCount * .125))));
            cx.drawImage(game.assets.images[`sp_kanata_${this.animation}`], 0, 0, 48, 48, -24, -24, 48, 48);
            cx.drawImage(game.assets.images[`sp_kanata_halo`], 0, 0, 16, 16, 4, -16 - Math.sin(Math.floor(8 + this.frameCount * .125)), 16, 16);
            cx.restore();
        }
        
        if (this.tornado) {
            cx.save();
            cx.translate(center.x, center.y);
            if (this.dir) cx.scale(-1, 1);
            cx.rotate(Math.PI * .5);
            for (let y = 0; y < 6; y++) {
                cx.drawImage(game.assets.images[`sp_gura_tornado`], (Math.floor(this.phaseBuffer * .25) % 4) * 24, 0, 24, 32, -32 * Math.sin(this.phaseBuffer * .5) - 12, y * 32, 24, 32);
            }
            cx.restore();
        }
    }
}