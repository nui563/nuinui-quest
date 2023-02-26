class Suisei extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = false;

    gravity = .15;

    moveSpeed = 2.5;

    phaseBuffer = 0;

    chantLevel = 0;

    healthBar = 0;

    constructor(pos, maxHealth, axe) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        this.axe = axe;
        this.axe.suisei = this;
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
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (this.axe.isGrounded && CollisionBox.center(this).distance(CollisionBox.center(this.axe)) < 8) {
            this.phase = 'charge';
        } else {
            if (this.phaseBuffer > 60 && this.axe.isGrounded && !(this.phaseBuffer % 15)) {
                const p1 = new Vector2(6.25 * 20 * 16 + Math.floor(Math.random() * 10) * 16, 4 * 12 * 16 - 32);
                const vel = new Vector2(0, 3);
                game.scene.actors.push(new Comet(p1, vel));
            }
        }
        // if (this.phaseBuffer >= 31) {
        //     if (this.pos.distance(flare.pos) < 16 * 12 && Math.random() > (!this.lastMove ? 1 : this.lastMove === 'move' ? .1 : (!game.scene.miniBossCleared ? .5 : .3))) {
        //         if (!game.scene.actors.find(a => a instanceof IceShield && a.originActor === this)) {
        //             this.phase = 'shield';
        //             this.setAnimation('charge');
        //         } else if (this.pos.distance(flare.pos) < 16 * 8) {
        //             this.phase = 'wind';
        //             this.setAnimation('charge');
        //         } else {
        //             this.phase = 'attack';
        //         }
        //     } else {
        //         this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        //         this.phase = 'move';
        //         game.playSound("jump");
        //         if (this.pos.distance(flare.pos) > 16 * 12) this.moveDir = flare.pos.x > this.pos.x ? 1 : -1;
        //         else this.moveDir = Math.random() > .5 ? 1 : -1;
        //         this.moveAttack = Math.random() > .25;
        //         this.vel.y = this.moveAttack ? -5 : -4;
        //     }
        // }
    }

    chargePhase = game => {
        if (!this.phaseBuffer) {
            this.setAnimation('axe');
            this.axe.pos = this.pos.plus(new Vector2(-24, -48));
            this.axe.isGrounded = false;
            this.axe.isRotation = true;
            this.axe.isGravity = false;
            this.axe.size = new Vector2(64, 64);
            this.axe.angle = null;
        }
        this.axe.shakeBuffer = 4;
        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this.axe));
        if (!(this.phaseBuffer % 60)) game.playSound("charge");

        if (this.phaseBuffer === 300) {
            if (this.health < this.maxHealth / 2 && Math.random() < .5 || this.health < this.maxHealth / 4) this.phase = 'rain';
            else {
                this.axe.isRotation = false;
                this.phase = 'idle';
    
                const flare = game.scene.actors.find(actor => actor instanceof Flare);
                const p1 = new Vector2(flare.pos.x + flare.size.x / 2, flare.pos.y);
                const p2 = CollisionBox.center(this.axe);
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-6);
                this.axe.vel = vel;
                this.axe.angle = -angle + Math.PI;
                this.axe.waitFrame = 25;
                game.playSound('no_damage');
                this.setAnimation('idle');
            }
        }
    }

    rainPhase = game => {
        if (!(this.phaseBuffer % 10)) {
            game.scene.actors.push(new Comet(new Vector2((6 * 20 + 8) * 16 + Math.floor(Math.random() * 4) * 16, 4 * 12 * 16 - 32), new Vector2(0, 4)));
        }
        this.axe.shakeBuffer = 4;
        if (this.phaseBuffer === 300) {
            this.axe.isRotation = false;
            this.phase = 'idle';

            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = new Vector2(flare.pos.x + flare.size.x / 2, flare.pos.y);
            const p2 = CollisionBox.center(this.axe);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-6);
            this.axe.vel = vel;
            this.axe.waitFrame = 50;
            this.axe.angle = -angle + Math.PI;
            this.setAnimation('idle');
        }
    }

    introPhase = game => {
        if (!this.phaseBuffer) {
            this.setAnimation('stand');
        }

        if (this.pos.y >= (4 * 12 + 6) * 16) {
            if (this.phaseBuffer < 150) {
                this.pos.y = (4 * 12 + 6) * 16;
                this.vel.y = 0;
            } else if (this.phaseBuffer === 150) {
                this.vel.y = -2;
                game.playSound('jump');
            } else if (this.isGrounded && this.phaseBuffer > 200) {
                this.phase = 'charge';
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

        if (flare.playerControl && this.health && this.phase !== 'idle') this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

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
        const spd = this.animation === 'axe' ? 4 : 1;
        const frame = this.animation === 'axe' ? 2 : 1;
        cx.drawImage(game.assets.images[`sp_suisei_${this.animation}`],
            (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, xSize, 48,
            -offset.x, -offset.y, xSize, 48);
        cx.restore();
    }
}