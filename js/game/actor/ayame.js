class Ayame extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .15;

    moveSpeed = 2.5;

    phaseBuffer = 0;

    chantLevel = 0;

    angle = null;

    healthBar = 0;

    rasetsu = null;
    asura = null;

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
        if (this.phase === 'charge') return;
        if (!this.invicibility) {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
            game.playSound('damage');
            
            if (!this.health) {
                this.isUpsideDown = false;
                this.vel = new Vector2(this.dir ? -2 : 2, -2.5);

                if (other instanceof Arrow && other.reflected) {
                    game.saveData.setItem('nuinui-save-achievement-14', true);
                }
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
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        if (this.vel.x) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
            this.vel.x *= .8;
            if (Math.abs(this.vel.x) < .75) {
                this.vel.x = 0;
            }
        }

        if (this.phaseBuffer >= (this.health < this.maxHealth * .5 ? 10 : 30)) {
            if (random() > (!this.lastMove ? 1 : this.lastMove === 'move' ? .1 : .5)) {
                if (game.scene.actors.some(a => a instanceof Arrow) && !game.scene.actors.some(a => a instanceof ATField)) {
                    this.phase = 'shield';
                    this.setAnimation('idle');
                } else if (this.pos.distance(flare.pos) < 16 * 8) {
                    this.phase = 'attack';
                    this.setAnimation('focus');
                // } else {
                //     this.phase = 'attack';
                }
            } else {
                this.maxMoveCount = this.health < this.maxHealth * .25 ? 6 : (this.health < this.maxHealth * .75 ? 4 : 2);
                this.moveCount = this.maxMoveCount;
                this.phase = 'focus';
                this.setAnimation('focus');
            }
        }
    }

    focusPhase = game => {
        // const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        this.angle = (Math.PI * .5 + Math.PI * .25 * (this.dir ? -1 : 1)) * (this.isUpsideDown ? 1 : -1);
        if (this.vel.x) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
            this.vel.x *= .8;
            if (Math.abs(this.vel.x) < .75) {
                this.vel.x = 0;
            }
        }

        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this));
        if (this.phaseBuffer >= (this.moveCount < this.maxMoveCount ? (this.isUpsideDown ? 12 : 20) : 60)) {

            this.moveCount--;
            this.lastMove = this.phase;
            this.phase = 'move';
            this.vel = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(12);
            game.playSound('jump2');
        }
    }

    movePhase = game => {
        game.scene.particles.smoke_spirit(CollisionBox.center(this), new Vector2(0, 0), 0);
        if (this.isGrounded || this.isCeilling) {
            this.lastMove = this.phase;
            this.setAnimation('crouch');
            this.phase = this.moveCount ? 'focus' : 'idle';
        }
    }
    
    attackPhase = game => {
        if (this.phaseBuffer === 30) {
            this.rasetsu = new Sword(CollisionBox.center(this).plus(new Vector2(-12, -12)), this, 'rasetsu');
            game.scene.actors.push(this.rasetsu);
            this.asura = new Sword(CollisionBox.center(this).plus(new Vector2(-12, -12)), this, 'asura');
            game.scene.actors.push(this.asura);
        }

        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;

            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            if (this.pos.distance(flare.pos) < 16 * 5) {
                this.phase = 'throw';
                this.setAnimation('crouch');
            } else {
                this.phase = 'charge';
                this.setAnimation('charge');
                this.vel = new Vector2(12 * (this.dir ? 1 : -1), 0);
                game.playSound('slash');
            }
        }
    }

    throwPhase = game => {
        if (this.phaseBuffer === 110) {
            game.scene.actors = game.scene.actors.filter(a => !(a instanceof Sword));
            this.rasetsu = null;
            this.asura = null;

            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
        }
    }
    
    chargePhase = game => {
        if (this.vel.x) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
            this.vel.x *= (this.health < this.maxHealth * .5 ? .97 : .95);
        }

        if (Math.abs(this.vel.x) < .75) {

            game.scene.actors = game.scene.actors.filter(a => !(a instanceof Sword));
            this.rasetsu = null;
            this.asura = null;

            this.vel.x = 0;
            this.lastMove = this.phase;
            this.setAnimation('crouch');
            this.phase = 'idle';
        }
    }
    
    shieldPhase = game => {
        if (this.phaseBuffer === 30) {
            game.scene.actors.push(new ATField(new Vector2(this.pos.x + (this.dir ? this.size.x : -24), this.pos.y - 16), this.dir));
        }

        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.phase = 'idle';
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

        if (this.phase === 'defeated') this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            if (this.health) this.dir = !this.dir;
            this.vel.x = 0;
        }

        this.isGrounded = false;
        this.isCeilling = false;
        const updatedYCollisionBox = { pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size };
        if (CollisionBox.intersectingCollisionBoxes(updatedYCollisionBox, game.scene.currentSection.collisions).length) {
            this.isGrounded = CollisionBox.intersectingCollisionBoxes(updatedYCollisionBox, game.scene.currentSection.collisions).some(c => c.other.pos.y > this.pos.y);
            this.isCeilling = CollisionBox.intersectingCollisionBoxes(updatedYCollisionBox, game.scene.currentSection.collisions).some(c => c.other.pos.y < this.pos.y);
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            if (this.health) this.vel.y = 0;
        }

        this.isUpsideDown = this.isCeilling ? true : this.isGrounded ? false : this.isUpsideDown;

        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (flare.playerControl && !this.isUpsideDown && this.health && ['idle', 'focus', 'attack'].includes(this.phase)) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.health < this.maxHealth * .5 && random() > .9) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_spirit(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 16 - 8)), new Vector2(0, -2), 1);
            }
        }
        if (this.phase === 'charge') {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_spirit(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 16 - 8)), new Vector2(-this.vel.x, 0), 0);
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
        if (this.invicibility % 2 || this.phase === 'move' || (this.phase === 'charge' && this.frameCount % 2)) return;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        if (this.isUpsideDown) {
            cx.translate(0, this.size.y / 2);
            cx.scale(1, -1);
            cx.translate(0, -this.size.y / 2);
        }
        const offset = new Vector2(16, 16);
        const xSize = 48;
        const spd = this.animation === 'chant' ? 16 : 1;
        const frame = this.animation === 'chant' ? 4 : 1;

        // swords
        if (!this.asura && !this.rasetsu) cx.drawImage(game.assets.images['sp_ayame_swords'], 0, 0, 48, 32, -17, -2, 48, 32);

        // back
        if (this.phase !== 'charge') cx.drawImage(game.assets.images['sp_ayame_back'], 0, 0, 32, 20, -8, 11, 32, 20);

        // animation
        if (this.phase === 'charge') {
            cx.drawImage(game.assets.images[`sp_ayame_${this.animation}`],
                (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 96, 48,
                -offset.x - 48, -offset.y, 96, 48);
        } else {
            cx.drawImage(game.assets.images[`sp_ayame_${this.animation}`],
                (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 48, 48,
                -offset.x, -offset.y, 48, 48);
        }
        cx.restore();

        // focus
        // if (this.angle !== null) {
        //     const p1 = CollisionBox.center(this);
        //     const p2 = p1.plus(new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(16));
        //     const p3 = p1.plus(new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(32));
        //     cx.strokeStyle = '#0ff';
        //     cx.beginPath();
        //     cx.moveTo(p2.x, p2.y);
        //     cx.lineTo(p3.x, p3.y);
        //     cx.stroke();
        // }
    }
}

class Sword extends Actor {
    size = new Vector2(24, 24);
    vel = new Vector2(0, 0);

    constructor(pos, ayame, type) {
        super(pos);
        this.ayame = ayame;
        this.type = type;
        this.randomAngle = Math.floor(random() * 360);
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }
    
    takeHit = (game, other) => {
        this.shakeBuffer = 15;
        game.playSound('no_damage');
    }

    update = game => {
        this.throwPhase = this.ayame.phase === 'throw';
        if (this.throwPhase) {
            this.pos.x += Math.cos((this.frameCount / 256) * (180 / Math.PI)) * (this.type === 'asura' ? 1 : -1) * 8;
        } else {
            this.pos.x += Math.cos((this.frameCount / 512) * (180 / Math.PI)) * (this.type === 'asura' ? 1 : -1);
        }

        this.pos = this.pos.plus(this.ayame.vel);

        if (this.type !== 'asura' && random() > .75) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_spirit(CollisionBox.center(this).plus(new Vector2(random() * 8 - 4, random() * 8 - 4)), new Vector2(-this.vel.x, 0), 0);
            }
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.ayame.phase === 'charge') return;
        if (this.throwPhase && this.frameCount % 2) return;
        cx.save();
        cx.translate(Math.round(this.pos.x + this.size.x / 2), Math.round(this.pos.y + this.size.y / 2));
        if (this.type === 'asura') cx.scale(-1, 1);
        cx.rotate((this.randomAngle + this.frameCount * (this.throwPhase ? 30 : 15)) * Math.PI / 180);
        cx.drawImage(game.assets.images[`sp_ayame_${this.type}`], 0, 0, 38, 38, -19, -19, 38, 38);
        cx.restore();
    }
}