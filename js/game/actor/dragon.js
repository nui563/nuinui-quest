class Dragon extends Actor {
    size = new Vector2(64, 48);
    phaseBuffer = 0;
    healthBar = 0;
    hands = [];

    screamBuffer = 0;

    attackCycle = 0;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        
        this.targetPos = pos;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return !['intro', 'defeated'].includes(this.phase) ? collision : null;
    }

    takeHit = (game, other) => {
        if (!this.health) return;
        if (!this.invicibility) {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
            game.playSound('hit');
            
            if (!this.health) {
                game.score += 5000;
            } else {
                game.score += 100;
                this.invicibility = 30;
            }
        }
    }

    introPhase = game => {
        if (this.targetPos.y > (60 + 13.5) * 16) {
            this.targetPos.y -= .5;
            game.scene.shakeBuffer = 2;
        } else {
            for (let i = 0; i < 2; i++) {
                const dir = i % 2;
                const hand = new DragonHand(this.pos.plus(new Vector2(20 + 64 * (dir ? 1 : -1), 10 * 16)), this, dir, this.pos.plus(new Vector2(20 + 96 * (dir ? 1 : -1), 4 * 16)));
                game.scene.actors.push(hand);
                this.hands.push(hand);
            }
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    deathPhase = game => {

    }

    endPhase = game => {
        this.shakeBuffer = 2;
        if (!this.phaseBuffer) {
            this.targetPos.x = 28 * 16;
            this.hands.forEach(hand => {
                hand.targetPos.y = hand.targetPosOrigin.y - 12 * 16;
                hand.targetPos.x = hand.targetPosOrigin.x - 80 * (hand.dir ? 1 : -1);
            });
        }
    }

    idlePhase = game => {
        if (this.phaseBuffer === 119) {
            this.lastMove = this.phase;
            if (!this.health) this.phase = 'end';
            else {
                switch (this.attackCycle) {
                    case 0:
                        this.phase = 'attack';
                        break;
                    case 1:
                        this.phase = 'prepareHand';
                        break;
                    case 2:
                        this.phase = 'charge';
                        break;
                    default:
                        break;
                }
                this.attackCycle = (this.attackCycle + 1) % 3;
            }
        }
    }
    
    chargePhase = game => {
        this.shakeBuffer = 2;
        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(this.pos.plus(new Vector2(this.size.x * .5, 64)));
        game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x * .5, 64)), new Vector2(Math.random() * 8 - 4, -1), 1);
        if (!(this.phaseBuffer % 60)) game.playSound('charge2');

        if (!this.phaseBuffer) {
            this.hands.forEach(hand => {
                hand.targetPos.y = hand.targetPosOrigin.y;
                hand.targetPos.x = hand.targetPosOrigin.x + 32 * (hand.dir ? 1 : -1);
            });
        }

        if (this.phaseBuffer < 150) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            this.targetPos.x = Math.max(163 * 16, Math.min(173 * 16, this.targetPos.lerp(CollisionBox.center(flare), .1).x));
        }

        if (!this.health) {
            this.unit = null;
            this.targetUnit = null;
            this.lastMove = this.phase;
            this.phase = 'end';
        }

        if (this.phaseBuffer === 179) {
            this.targetPos.y -= 16;
            this.lastMove = this.phase;
            this.phase = 'laser';
        }
    }

    laserPhase = game => {
        for (let i = 0; i < 3; i++) {
            game.scene.particles.smoke_white(new Vector2(this.pos.x + Math.random() * this.size.x, (12 * 6 + 10) * 16), new Vector2(Math.random() - .5, -Math.random() * 2), 1);
        }

        if (!(this.phaseBuffer % 6)) game.playSound('laser');

        if (this.phaseBuffer > 119) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            this.targetPos.x = Math.max(163 * 16, Math.min(173 * 16, this.targetPos.x + .5 * (CollisionBox.center(flare).x > CollisionBox.center(this).x ? 1 : -1)));
        }

        game.scene.actors.push(new Projectile(new Vector2(this.pos.x, this.pos.y + 64), new Vector2(64, 96), new Vector2(0, 0), this));

        if (!this.health) {
            this.unit = null;
            this.targetUnit = null;
            this.lastMove = this.phase;
            this.phase = 'end';
        }

        if (this.phaseBuffer > 239) {
            this.hands.forEach(hand => hand.targetPos = hand.targetPosOrigin);
            if (this.unit) {
                this.unit.weakBuffer = 60 * 5;
                this.unit.chargeCooldown = 60;
                this.unit.chargeBuffer = 0;
                this.unit.demonHand = false;
                this.unit = null;
            }
            this.targetPos.x = 168 * 16;
            this.targetPos.y += 16;
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    prepareHandPhase = game => {
        if (!this.phaseBuffer) {
            this.hands.forEach(hand => {
                hand.targetPos = hand.targetPosOrigin.plus(new Vector2(16 * (hand.dir ? 1 : -1), -64));
            });
        }

        if (this.phaseBuffer === 60) {
            const units = game.scene.actors.filter(actor => actor instanceof Flare);
            if (units.length) {
                this.targetUnit = units[Math.floor(Math.random() * units.length)];
                this.hands.forEach(hand => hand.targetPos = CollisionBox.center(this.targetUnit).plus(new Vector2(-12 + 8 * (hand.dir ? 1 : -1), -24)));
            }
        }
        
        if (!this.health) {
            this.unit = null;
            this.targetUnit = null;
            this.lastMove = this.phase;
            this.hands.forEach(hand => hand.targetPos = hand.targetPosOrigin);
            this.phase = 'end';
        }

        if (this.phaseBuffer > 119) {
            this.targetUnit = null;
            this.lastMove = this.phase;
            if (!this.unit) {
                this.hands.forEach(hand => hand.targetPos = hand.targetPosOrigin);
                this.phase = 'idle';
            } else {
                this.phase = 'hand';
            }
        }
    }

    handPhase = game => {
        if (this.phaseBuffer > 119 || !this.unit || !this.health) {
            this.hands.forEach(hand => hand.targetPos = hand.targetPosOrigin);
            this.lastMove = this.phase;
            this.phase = this.health ? 'idle' : 'end';
        }
    }

    attackPhase = game => {
        this.shakeBuffer = 2;
        if (!(this.phaseBuffer % 20)) {
            const i = Math.floor(this.phaseBuffer * .05);
            const angle = i * (Math.PI * .25);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-3);
            const iceSpike = new Bullet(CollisionBox.center(this).plus(vel.times(16).plus(new Vector2(-8, -8))), vel, this);
            iceSpike.angle = angle;
            game.scene.actors.push(iceSpike);
            game.playSound("step");
        }

        if (!this.health) {
            this.unit = null;
            this.targetUnit = null;
            this.lastMove = this.phase;
            this.hands.forEach(hand => hand.targetPos = hand.targetPosOrigin);
            this.phase = 'end';
        }

        if (this.phaseBuffer === 160) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    update = game => {
        if (this.phase) this[`${this.phase}Phase`](game);
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.targetPos) {
            this.targetPos = this.targetPos.plus(new Vector2(0, .1 * Math.sin(this.frameCount * (Math.PI / 180))));
            this.pos = this.pos.lerp(this.targetPos, .1);
        }

        if (this.targetUnit && this.hands.every(hand => CollisionBox.intersects(hand, this.targetUnit))) {
            this.unit = this.targetUnit;
            this.unit.demonHand = true;
            this.targetUnit = null;
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
        
        if (this.screamBuffer && this.health) {
            if (!(this.frameCount % 20)) game.playSound('explosion');
            this.screamBuffer--;
        }

        if (this.invicibility) this.invicibility--;
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));

        for (let i = 0; i < 3; i++) {
            cx.save();
            cx.translate(this.size.x * .5, 0);
            cx.drawImage(game.assets.images['sp_demon_spine'], i * 24, 24, 24, 24,
                -12, this.size.y + 12 + i * 24 + 2 * Math.sin(2 * ((this.frameCount + i * 120) % 360) * (Math.PI / 180)), 24, 24);

            // cx.drawImage(game.assets.images['sp_demon_ribcage'], i * 40, 0, 40, 40,
            //     -(this.phase === 'laser' ? 64 : 56) + 4 * i, this.size.y + i * 20 + 2 * Math.cos(2 * ((this.frameCount + i * 120) % 360) * (Math.PI / 180)), 40, 40);
            
            // cx.scale(-1, 1);
            // cx.drawImage(game.assets.images['sp_demon_ribcage'], i * 40, 0, 40, 40,
            //     -(this.phase === 'laser' ? 64 : 56) + 4 * i, this.size.y + i * 20 + 2 * Math.cos(2 * ((this.frameCount + i * 120) % 360) * (Math.PI / 180)), 40, 40);
            
            cx.restore();
        }

        cx.save();
        if (this.invicibility > 22) cx.filter = `contrast(0) brightness(2)`;
        const xPos = ['charge', 'attack', 'death'].includes(this.phase) || this.screamBuffer ? 96 : ['laser', 'end'].includes(this.phase) ? (1 + Math.floor(this.frameCount * .5) % 4) * 96 : 0;
        cx.translate(20, 28);
        if (this.shakeBuffer) cx.rotate(Math.PI / 16 * Math.sin(this.frameCount / 32));
        cx.drawImage(game.assets.images['sp_demon_head'], xPos, 96, 96, 96, -48, -48, 96, 96);
        cx.restore();

        if (this.phase === 'laser') {
            cx.drawImage(game.assets.images['sp_demon_laser'], (Math.floor(this.frameCount * .25) % 4) * 64, 192 + 96, 64, 96, 0, 64, 64, 96);
            cx.drawImage(game.assets.images['sp_demon_laser'], (Math.floor(this.frameCount * .25) % 6) * 64, 192, 64, 96, 0, 64, 64, 96);
        }

        cx.restore();


    }
}


class DragonHand extends Actor {
    size = new Vector2(24, 48);

    amount = .05;

    constructor(pos, demon, dir, targetPos) {
        super(pos);
        this.dir = dir;
        this.demon = demon;
        this.targetPos = targetPos;
        this.targetPosOrigin = targetPos;
    }

    checkHit = (game, collisionBox) => {
        if (collisionBox.originActor instanceof Demon) return;
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }
    
    takeHit = (game, other) => {
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, 0);
        if (!this.demon.targetUnit) this.pos.x += this.size.x * (this.dir ? 1 : -1);
        game.playSound('hit');
    }

    update = game => {
        if (this.targetPos) {
            this.targetPos = this.targetPos.plus(new Vector2(0, .1 * Math.sin(this.frameCount * (Math.PI / 180))));

            this.pos = this.pos.lerp(this.targetPos, this.amount);
        }
        
        if (this.demon.phase === 'end') this.shakeBuffer = 2;

        for (let i = 0; i < 2; i++) {
            game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8 + 16 * (this.dir ? 1 : -1), Math.random() * 32 - 16)), new Vector2(Math.random() - .5 + .5 * (this.dir ? 1 : -1), Math.random() * -2), 0);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));

        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }

        cx.drawImage(game.assets.images['sp_demon_hand'], this.demon.targetUnit || this.demon.unit || this.demon.phase === 'end' ? 64 : 0, 64, 64, 64, -8 - 16, -8, 64, 64);

        cx.restore();
    }
}