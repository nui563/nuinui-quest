class Card extends Actor {
    size = new Vector2(32, 32);
    vel = new Vector2(0, 0);

    maxHealth = 4;

    constructor(pos, polka, id) {
        super(pos);
        this.health = this.maxHealth;
        this.polka = polka;
        this.id = id;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return this.isDisabled ? null : collision;
    }

    takeHit = (game, other) => {
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.score += 100;
            game.playSound('explosion');
            this.isDisabled = 180;
        } else {
            game.playSound('damage');
            game.score += 20;
        }
    }

    update = game => {
        if (this.isDisabled) {
            this.isDisabled--;
            if (!this.isDisabled) this.health = this.maxHealth;
        } else {
            if (this.attack && !(this.frameCount % 10)) {
                const bullet = new Bullet(CollisionBox.center(this), new Vector2(Math.random() - .5, 4), this);
                game.scene.actors.push(bullet);
                game.playSound('pew');
            }
        }
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        if (this.isDisabled) cx.filter = `contrast(2) brightness(.5)`;
        cx.translate(Math.round(this.pos.x) + 16, Math.round(this.pos.y) + 16 + Math.floor(Math.sin(this.frameCount * 4 * (Math.PI / 180) + this.id * Math.PI / 2) * 4));
        if (this.polka.attackType !== 2 && this.polka.phase !== 'prepare') cx.rotate(Math.floor(-this.frameCount) * (Math.PI / 180));
        const yPos = this.attack || this === this.polka.cardHide ? 64 + 64 * this.id : 0;
        cx.drawImage(game.assets.images['sp_card'], yPos, this.polka.attackType === 1 && this.polka.phase !== 'prepare' ? 64 : 0, 64, 64, -32, -32, 64, 64);
        cx.restore();
    }
}

class Polka extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .15;

    moveSpeed = 2.5;

    phaseBuffer = 0;

    healthBar = 0;

    cardCounter = 0;

    attackType = 0;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;

        this.cards = [];
        for (let i = 0; i < 4; i++) {
            this.cards.push(new Card(CollisionBox.center(this).plus(new Vector2(-16, -24)), this, i));
            
        }
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        if (this.phase === 'hide' || this.phase === 'prepare') return null;
        return !['flee', 'defeated'].includes(this.phase) ? collision : null;
    }

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
                game.score += 5000;
            } else {
                game.score += 100;
                this.invicibility = 30;
            }
        }
    }

    defeatedPhase = game => {
        //velloss
        this.cards = [];
        this.setAnimation('charge');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    idlePhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (this.phaseBuffer >= 31) {
            if (this.attackType === 0 && Math.random() > (this.cardAttack ? .3 : .7)) {
                this.cards.forEach(card => card.attack = !card.attack);
                this.cardAttack = !this.cardAttack;
                this.setAnimation('attack');
                this.phase = 'attack';
                game.playSound('no_damage');
            } else if (this.lastMove === 'hide' || (!this.cardAttack && this.lastMove !== 'prepare' && Math.random() > .2)) {
                this.attackType++;
                if (this.attackType > 2) this.attackType = 0;
                this.setAnimation('attack');
                this.phase = 'prepare';
                game.playSound('no_damage');
            } else {
                this.phase = 'charge';
                this.setAnimation('charge');
                game.playSound('charge');
            }
        }
    }

    attackPhase = game => {
        if (this.phaseBuffer === 50) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    preparePhase = game => {
        if (this.phaseBuffer === 25) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = this.attackType === 2 ? 'hide' : 'idle';
            if (this.phase === 'hide') {
                this.cardHide = this.cards[Math.floor(Math.random() * this.cards.length)];
                this.vel = new Vector2(0, 0);
            }
        }
    }

    hidePhase = game => {
        this.pos = new Vector2(this.cardHide.pos.x + 8, this.cardHide.pos.y);
        if (this.phaseBuffer === (this.cardCounter ? 25 : 50)) {
            if (this.cardCounter < 5) {
                this.cardHide = this.cards[(this.cardHide.id + (Math.random() > .5 ? 1 : 3)) % this.cards.length];
                this.setAnimation('attack');
                this.lastMove = this.phase;
                this.phase = 'fly';
                this.cardCounter++;
                const p1 = CollisionBox.center(this);
                const p2 = CollisionBox.center(this.cardHide);
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                this.vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(8);
                game.playSound('slash');
            } else {
                this.vel = new Vector2(0, 0);
                this.cardHide = null;
                this.cardCounter = 0;
                this.setAnimation('idle');
                this.lastMove = this.phase;
                this.phase = 'idle';
            }
        }
    }

    flyPhase = game => {
        // const target = new Vector2(this.cardHide.pos.x + 8, this.cardHide.pos.y);
        // this.pos = this.pos.lerp(target, .2);
        // this.pos = this.pos.plus(new Vector2(this.pos.x / target.x, this.pos.y / target.y));
        if (CollisionBox.center(this).distance(CollisionBox.center(this.cardHide)) <= 8) {
            this.lastMove = this.phase;
            this.phase = 'hide';
        }
    }

    chargePhase = game => {
        const dirVal = (this.dir ? 1 : -1);
        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this).plus(new Vector2(16 * -dirVal, 0)));

        if (this.phaseBuffer === 30) {
            this.setAnimation('release');
            this.phase = 'release';
            this.bounceCount = 0;
            game.playSound('jump');
            this.shakeBuffer = 8;
            const bullet = new Bullet(this.pos.plus(new Vector2(24 * dirVal, 8)), new Vector2(2 * dirVal, 0), this);
            const rng = Math.random();
            if (rng < .2) bullet.petal = true;
            if (rng > .8) bullet.iceSpike = true;
            if (bullet.iceSpike) bullet.angle = this.dir ? Math.PI : 0;
            game.scene.actors.push(bullet);
        }
    }

    releasePhase = game => {
        if (this.isGrounded) {
            if (this.bounceCount < 3) {
                this.vel.y = -2 / (1 + 1 * this.bounceCount);
                this.vel.x = 2 * (this.dir ? 1 : -1) / (1 + 1 * this.bounceCount)
                if (this.bounceCount === 1) game.scene.particles.land(this, 0);
                this.bounceCount++;
            } else {
                this.setAnimation('idle');
                this.lastMove = this.phase;
                this.phase = 'idle';
                this.vel.x = 0;
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

        if (this.pos.x < (6 * 20 + 13) * 16) {
            this.dir = !this.dir;
            this.vel.x = 1;
        }
        if (this.pos.x > (6 * 20 + 26) * 16) {
            this.dir = !this.dir;
            this.vel.x = -1;
        }

        if (this.phase !== 'c') {
            if (this.phase !== 'fly') this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
            this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

            if (this.phase !== 'defeated') {
    
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
            }

            this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
            this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;
        }
        
        if (flare.playerControl && this.health && this.phase !== 'release' && this.phase !== 'attack' && this.phase !== 'fly') this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
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

        this.cards.forEach((card, i) => {
            if (this.phase === 'prepare') {
                card.pos = card.pos.lerp(CollisionBox.center(this).plus(new Vector2(-16, -16)), .2);
            } else {
                switch (this.attackType) {
                    case 0:
                        card.pos = card.pos.lerp(new Vector2((133 + 4 * i) * 16, 37 * 16), .1);
                        break;
                    case 1:
                        const angle = Math.floor(this.frameCount * 2) * (Math.PI / 180) + i * Math.PI / this.cards.length * 2;
                        const distance = 32;
                        card.pos = card.pos.lerp(CollisionBox.center(this).plus(new Vector2(-16 + Math.cos(angle) * distance, -24 + Math.sin(angle) * distance)), .1);
                        break;
                    case 2:
                        card.pos = card.pos.lerp(new Vector2((133 + (i % 2 ? 12 : 0)) * 16, (38 + (i > 1 ? 5 : 0)) * 16), .1);
                        break;
                    default:
                        break;
                }
            }
        });

        if (this.phase === 'fly') game.scene.particles.smoke_spirit(CollisionBox.center(this), new Vector2(0, 0), 0);
        
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
        if (this.invicibility % 2 || this.phase === 'hide') return;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }

        if (this.phase === 'fly') {
            cx.translate(this.size.x / 2, this.size.y / 2);
            cx.drawImage(game.assets.images['sp_wand'], (Math.floor(this.animationFrame / 4) % 2) * 32, 0, 32, 32, -16, -16, 32, 32);
        } else {
            cx.drawImage(game.assets.images[`sp_polka_${this.animation}`],
                (Math.floor(this.animationFrame / 1) % 1) * 48, 0, 64, 48,
                -16, -16, 64, 48);
        }

        if (this.phase === 'charge') {
            cx.globalAlpha = .75;
            cx.drawImage(game.assets.images['sp_wand'], (Math.floor(this.animationFrame / 4) % 2) * 32, 0, 32, 32, -24, 0, 32, 32);
        }
        cx.restore();
    }
}