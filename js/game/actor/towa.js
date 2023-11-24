class Towa extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .15;

    moveSpeed = 2.5;

    phaseBuffer = 0;

    angle = null;

    healthBar = 0;

    invicibility = 0;

    bibiVal = null;
    bibiActors = [];

    mirrorBuffer = 0;

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
        if (this.bibiPhaseBuffer === 2) {
            this.invicibility = 0;
            this.bibiPhaseBuffer = false;
            this.bibiVal = null
            this.bibiFrame = 0;
            this.bibiActors = [];
            game.scene.actors = game.scene.actors.filter(a => !a.bibiPhaseBuffer);
            
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
            this.phaseBuffer = 0;
        }
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
                if (this.pos.y === 8 * 16) this.pos.y--;
                game.score += 5000;
            } else {
                game.score += 100;
                this.invicibility = 30;
            }
        }
    }

    defeatedPhase = game => {
        //velloss
        if (this.pos.y < 8 * 16) {
            this.setAnimation('hit');
            this.isUpsideDown = false;
            this.vel = this.vel.mult(new Vector2(0.9, 1));
        } else if (this.animation !== 'ko') {
            this.vel.x = 0;
            this.vel.y = 0;
            this.pos.y = 8 * 16;
            this.setAnimation('ko');
            this.shakeBuffer = 8;
        }
    }

    idleCount = 0;
    idlePhase = game => {
        if (this.vel.x) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
            this.vel.x *= .8;
            if (Math.abs(this.vel.x) < .75) {
                this.vel.x = 0;
            }
        }

        if (this.frameCount > 180 && this.phaseBuffer >= (this.health < this.maxHealth * .5 ? 30 : 40)) {
            if (Math.random() > (!this.lastMove ? 1 : this.lastMove === 'move' ? .1 : .5)) {
                if (this.health < this.maxHealth * .75 && ((!this.mirror && Math.random() < .35) || (this.mirror && this.mirrorBuffer > 5 * 60))) {
                    this.setAnimation('charge');
                    this.phase = 'mirror';
                    this.mirrorBuffer = 0;
                } else if (Math.random() < .5 && !this.isUpsideDown && this.lastMove !== 'bibi') {
                    this.phase = 'bibi';
                    this.setAnimation('idle');
                } else {
                    this.phase = 'sniper';
                    this.setAnimation('sniper');
                }
            } else {
                this.maxMoveCount = (this.health < this.maxHealth * .75 ? 5 : 3);
                this.moveCount = this.maxMoveCount;
                this.phase = 'focus';
                this.setAnimation('charge');
            }
        }
    }

    mirrorPhase = game => {
        
        if (this.phaseBuffer < 60) {
            for (let i = 0; i < Math.floor(this.phaseBuffer / 5); i++) {
                game.scene.particles['charge_black_smoke'](CollisionBox.center(this), 0);
            }
            this.shakeBuffer = 15;
            if (!this.phaseBuffer) game.playSound('charge');
        }

        if (this.phaseBuffer === 60) {
            this.mirrorBuffer = 0;
            this.mirrorAnim = 20;
            this.mirror = !this.mirror;
            game.playSound("focus");

            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
            this.phaseBuffer = 0;
        }
    }

    bibiPhase = game => {
        if (this.invicibility < 3) this.invicibility = 10;

        if (!this.bibiActors.length) {
            this.vel = new Vector2(0, 0);
            this.pos = this.pos.lerp(new Vector2(9.5 * 16, this.pos.y), .05);
            
            if (Math.abs(this.pos.x - 9.5 * 16) < 1) {
                this.bibiVal = Math.floor(Math.random() * 4);
                this.bibiFrame = 0;
                this.bibiActors = [];
                for (let i = 0; i < 4; i++) {
                    if (i === this.bibiVal) {
                        this.bibiActors.push(this);
                        this.bibiPhaseBuffer = true;
                    } else {
                        const bibi = new Bibi(this.pos.plus(new Vector2(0, 16)), 4);
                        bibi.bibiPhaseBuffer = true;
                        this.bibiActors.push(bibi);
                        game.scene.actors.push(bibi);
                    }
                }
            }
        } else if (this.bibiActors.length) {
            this.bibiActors.forEach((actor, i) => {
                if (actor.bibiPhaseBuffer) {
                    actor.pos = actor.pos.lerp(new Vector2((2 + i * 5) * 16, actor.pos.y), .05);
                    if (Math.abs(actor.pos.x - (2 + i * 5) * 16) < 1) actor.bibiPhaseBuffer = 2;
                }
            });
            this.bibiFrame++;

            if (this.bibiFrame > 4 * 60) {
                this.invicibility = 0;
                this.bibiPhaseBuffer = false;
                this.bibiVal = null
                this.bibiFrame = 0;
                this.bibiActors = [];
                game.scene.actors.filter(a => a.bibiPhaseBuffer).forEach(a => a.bibiPhaseBuffer = false);
                
                this.lastMove = this.phase;
                this.setAnimation('idle');
                this.phase = 'idle';
                this.phaseBuffer = 0;

            }
        }
    }

    focusPhase = game => {

        if (!this.velAngle) {
            this.angle = (Math.PI * .5 + Math.PI * (Math.random() < .5 ? .375 : .125) * (this.dir ? -1 : 1)) * (this.isUpsideDown ? 1 : -1);
            this.velAngle = new Vector2(Math.cos(this.angle), Math.sin(this.angle));
            this.velAngleAnim = Math.PI + (Math.PI * .5 * (this.isUpsideDown ? -1 : 1));
        }

        this.velAngleAnim = angleLerp(this.velAngleAnim, this.angle, .1);
        game.scene.particles.smoke_pink(CollisionBox.center(this), new Vector2(Math.cos(this.velAngleAnim), Math.sin(this.velAngleAnim)).times(3), 0);


        if (this.vel.x) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
            this.vel.x *= .8;
            if (Math.abs(this.vel.x) < .75) {
                this.vel.x = 0;
            }
        }

        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this));
        if (this.phaseBuffer >= (this.moveCount < this.maxMoveCount ? (this.isUpsideDown ? 20 : 30) : 60)) {

            this.moveCount--;
            this.lastMove = this.phase;
            this.phase = 'move';
            this.vel = this.velAngle.times(this.health < this.maxHealth * .25 ? 12 : 8);
            this.velAngle = null;
            game.playSound('miko_kick');
        }
    }

    movePhase = game => {
        game.scene.particles.smoke_black(CollisionBox.center(this), new Vector2(0, 0), 0);
        if (this.isGrounded || this.isCeilling) {
            this.lastMove = this.phase;
            this.setAnimation('crouch');
            this.phase = this.moveCount ? 'focus' : 'idle';
            this.phaseBuffer = 0;
        }
    }

    sniperPhase = game => {
        if (this.phaseBuffer > 15 && !(this.phaseBuffer % (this.isUpsideDown ? 10 : 20))) {
            const bullet = new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 12), new Vector2(3 * (this.dir ? 1 : -1), 0), this);
            game.scene.actors.push(bullet);
            if (this.isUpsideDown) {
                bullet.gravTowa = true;
                bullet.vel.x = Math.round(this.phaseBuffer / 15) * (this.dir ? 1 : -1);
            }
            game.playSound("pew");
            this.shakeBuffer = 8;
        }
        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
            this.phaseBuffer = 0;
        }
    }

    introPhase = game => {
    }

    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (this.phase) this[`${this.phase}Phase`](game);
        // if (this.phase !== 'chant' && this.health > this.maxHealth / 2) this.chantPhase(game);

        if (this.phase === 'defeated' && this.pos.y < 8 * 16) {
            this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
            if (this.pos.y + this.vel.y > 8 * 16) game.playSound('explosion');
        }
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            if (this.health) this.dir = !this.dir;
            this.vel.x *= -1;
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

        if (this.health) this.isUpsideDown = this.isCeilling ? true : this.isGrounded ? false : this.isUpsideDown;

        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (flare.playerControl && this.health && ['idle', 'focus', 'sniper', 'bibi'].includes(this.phase)) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.health && this.health < this.maxHealth * .5 && Math.random() > .9) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_black(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8)), new Vector2(Math.random() - .5, Math.random() * -2), 0);
            }
        }
        
        if (this.bibiPhaseBuffer) {
            for (let i = 0; i < 4; i++) {
                game.scene.particles.smoke_black(CollisionBox.center(this).plus(new Vector2(Math.random() * 32 - 16, 8 + Math.random() * 16 - 8)), new Vector2(Math.random() - .5, Math.random() * -3), 1);
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

        if (this.mirror) this.mirrorBuffer++;
        if (this.mirrorAnim) this.mirrorAnim--;

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.invicibility % 2 || this.phase === 'move' || (this.phase === 'charge' && this.frameCount % 2)) return;
        cx.save();

        const center = CollisionBox.center(this).round();
        cx.translate(center.x, center.y);
        if (!this.dir) cx.scale(-1, 1);
        if (this.isUpsideDown) cx.scale(1, -1);

        const xSize = 48;
        const spd = 1;
        const frame = 1;

        if (this.phase === 'intro') {
            const brightnessVal = game.scene.towaOffset ? 1 - game.scene.towaOffset / (game.height * .5) : 1;
            cx.filter = `brightness(${brightnessVal})`;
        }
        if (this.bibiPhaseBuffer) cx.filter = 'brightness(0)';

        const hairOffset = new Vector2(this.animation === 'crouch' ? -1 : this.animation === 'sniper' ? -5 : 0, (this.animation === 'charge' || this.animation === 'hit') ? 4 : this.animation === 'crouch' ? 9 : 0);
        if (this.animation !== 'ko') cx.drawImage(game.assets.images[`sp_towa_hair`], 0, 0, 48, 48, -24 + hairOffset.x, -31 + hairOffset.y, 48, 48);

        // animation
        cx.drawImage(game.assets.images[`sp_towa_${this.animation}`],
            (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 48, 48,
            -24, -31, 48, 48);
        cx.restore();
    }
}

class Bibi extends Actor {
    size = new Vector2(16, 16);
    vel = new Vector2(0, 0);

    healthBar = 0;
    gravity = .1;

    moveSpeed = 2;

    phase = 'idle';
    phaseBuffer = 0;

    aggro = true;
    wait = false;

    invicibility = 0;

    constructor(pos, health) {
        super();
        this.pos = pos;
        this.maxHealth = health;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (this.bibiPhaseBuffer === 2) this.bibiPhaseBuffer = false;
        if (this.invicibility) return;
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            
            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
            this.dropHeart(game, .9);
            game.score += 50;
        } else {
            game.score += 10;
            game.playSound('damage');
            this.invicibility = 12;
        }
    }
    
    movePhase = game => {
        this.vel.x = this.moveDir * this.moveSpeed;
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound('land');
            
            this.vel = new Vector2(0, 0);
            game.scene.particles.land(this);
        }
        this.setAnimation(!this.isGrounded ? 'jump' : 'idle');
    }

    idlePhase = game => {
        if (!this.bibiPhaseBuffer && this.frameCount > 120 && this.phaseBuffer >= 47 && Math.random() > .98 && !this.wait) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);

            this.moveSpeed = p1.distance(p2) / 64 + Math.random() * 1.5;

            this.phase = 'move';
            this.moveDir = p1.distance(p2) > 16 * 4 ? (this.dir ? 1 : -1) : Math.random() > .5 ? 1 : -1;
            this.vel.y = -3;
            game.playSound('jump');

            game.scene.actors.push(new BibiFire(this.pos.value()));
        }
    }

    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 4)) {
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 22), new Vector2(4 * (this.dir ? 1 : -1), 0), this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 31) this.phase = 'idle';
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        this[`${this.phase}Phase`](game);
        
        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));


        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.vel.x *= -1;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        this.isGrounded = false;
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.isGrounded = CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).some(c => c.other.pos.y > this.pos.y);
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            this.vel.y = 0;
        }
        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;

        if (!CollisionBox.includedIn(this, game.scene.currentSection)) {
            this.vel.x = 0;
            this.moveDir *= -1;
        }
        
        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (!this.bibiPhaseBuffer) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(Math.random() * 12 - 6, Math.random() * 16 - 8)), new Vector2(Math.random() - .5, Math.random() * -2), 0);
            }
        } else {
            if (this.invicibility < 3) this.invicibility = 10;
            for (let i = 0; i < 4; i++) {
                game.scene.particles.smoke_black(CollisionBox.center(this).plus(new Vector2(Math.random() * 32 - 16, Math.random() * 16 - 8)), new Vector2(Math.random() - .5, Math.random() * -3), 1);
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
        if (this.bibiPhaseBuffer) cx.filter = 'brightness(0)';
        cx.drawImage(game.assets.images['sp_bibi'], this.isGrounded ? Math.floor(this.frameCount / 16) % 2 * 24 : 24, 0, 24, 16, -6, 0, 24, 16);
        cx.restore();
    }
}

class BibiFire extends Actor {
    size = new Vector2(16, 16);
    vel = new Vector2(0, 0);

    constructor(pos) {
        super(pos);
    }
    
    checkHit = (game, collisionBox) => {
        if (collisionBox instanceof Arrow) return null;
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }
    
    takeHit = (game, other) => {
    }

    update = game => {
        for (let i = 0; i < 2; i++) {
            game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(Math.random() * 12 - 6, 8 + Math.random() * 16 - 8)), new Vector2(Math.random() - .5, Math.random() * -2), 0);
        }

        if (this.frameCount > 8 * 60) {
            game.scene.actors = game.scene.actors.filter(a => a !== this);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
    }
}