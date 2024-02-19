class Ina extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    phaseBuffer = 0;

    damage = 2;

    healthBar = 0;

    attackCount = 0;
    
    posTarget = null;

    scrollSpeed = 1;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        
        this.bucketPos = this.pos.plus(new Vector2(this.size.x * .5, -150));
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

            this.posTarget = new Vector2(this.pos.x, 21.5 * 16);

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
    
    attack3Phase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);


        if (this.phaseBuffer > 120) {
            if (this.phaseBuffer > 240) {
                this.bucketPos = this.bucketPos.lerp(this.pos, .05);
            } else if (!(this.phaseBuffer % 2)) {
                const bullet = new Bullet(this.bucketPos.plus(new Vector2(Math.sin(this.phaseBuffer * .5) * 8, 8)), new Vector2(0, 3), this, true);
                game.scene.actors.push(bullet);
                if (!(this.phaseBuffer % 8)) game.playSound('pew2');
            }
        } else {
            this.bucketPos = this.bucketPos.lerp(new Vector2(flare.pos.x + flare.size.x * .5, 13 * 16), .05);
        }
        
        if (this.phaseBuffer >= 270) {
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
        }
    }
    
    idlePhase = game => {
        if (!(this.frameCount % (this.health > this.maxHealth * .5 ? 120 : 90))) {
            if (random() > .5) this.posTarget = new Vector2(this.pos.x, Math.round((18 + random() * 3) * 16));

            if (random() < .5) {
                const tentacle = game.scene.actors.find(a => a instanceof Tentacle && !a.attack && !a.isDisabled && !a.posTarget);
                if (tentacle) {
                    tentacle.posBuffer = tentacle.pos.value();
                    tentacle.attack = true;
                    tentacle.attackFrame = 0;
                }
            } else if (random() < .5) {
                this.phase = 'attack3';
                this.bucketPos = this.pos;
            }
        }
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    deleteBridge = (game, xPos, mute) => {
        const scene = game.scene;

        scene.currentSection.collisions = scene.currentSection.collisions.filter(a => !(a.pos.x === xPos * 16 && a.pos.y === 22 * 16));
        if (!mute) game.playSound('explosion');

        if (scene.foreground[`${xPos}_21`]) {
            delete scene.foreground[`${xPos}_21`];
            delete scene.foreground[`${xPos}_22`];
            game.scene.particles.explosion(new Vector2(xPos + .5, 22).times(16), 0);
        }
        if (scene.foreground[`${xPos + 1}_22`] === '29') {
            scene.foreground[`${xPos + 1}_22`] = '20';
        }
        if (scene.foreground[`${xPos - 1}_22`] === '29') {
            scene.foreground[`${xPos - 1}_22`] = '28';
        }
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

        if (this.posTarget) {
            this.pos = this.pos.lerp(this.posTarget, .1);
            if (this.pos.distance(this.posTarget) < 1) {
                this.pos = this.posTarget;
                this.posTarget = null;
            }
        }

        if (this.health && this.health < this.maxHealth * .75 && !(this.frameCount % (10 * 60))) {
            this.scrollSpeed = this.scrollSpeed === 1 ? (random() > .5 ? 2 : 0) : 1;
            game.scene.shakeBuffer = 15;
            game.playSound('charge2');
            game.scene.thunder = 60;
        }

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
        
        if (this.phase === 'attack3') {
            cx.save();
            cx.translate(Math.round(this.bucketPos.x), Math.round(this.bucketPos.y));
            if (this.phaseBuffer > 120 && this.phaseBuffer < 240) cx.translate(Math.round(random() * 2 - 1), Math.round(Math.round(random() * 2 - 1)));
            cx.drawImage(game.assets.images['sp_ina_book'], this.phaseBuffer > 120 && this.phaseBuffer < 240 ? 32 : 0, 0, 32, 32, -16, -16, 32, 32);
            cx.restore();
        }

        if (!(this.invicibility % 2)) {
            cx.save();
            const center = CollisionBox.center(this).round();
            cx.translate(center.x, center.y);
            if (!this.dir) cx.scale(-1, 1);
            cx.translate(Math.round(4 * Math.cos(Math.floor(this.frameCount / 16))), Math.round(Math.max(0, 2 - Math.abs(this.vel.x)) * Math.sin(Math.floor(this.frameCount * .125))));
            const xOffset = ['idle'].includes(this.animation) ? Math.floor(this.frameCount / 16) % 3 : 0;
            cx.drawImage(game.assets.images[`sp_ina_halo`], 0, 0, 20, 20, -16, -28 - 2 * Math.cos(Math.floor(this.frameCount * .125)), 20, 20);
            cx.drawImage(game.assets.images[`sp_ina_${this.animation}`], xOffset * 48, 0, 48, 48, -24, -24, 48, 48);
            cx.restore();
        }
    }
}

class Tentacle extends Actor {
    size = new Vector2(16, 48);
    vel = new Vector2(0, 0);

    damage = 2;

    maxHealth = 4;

    constructor(pos) {
        super(pos);
        this.health = this.maxHealth;
        this.randomOffset = random() * 2 - 1;
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
        
        const ina = game.scene.actors.find(a => a instanceof Ina && a.health);
        if (ina && game.mode === 'noel') {
            ina.takeHit(game, ina);
        }

        if (!this.health) {
            game.score += 100;
            game.playSound('explosion');
            this.isDisabled = 5 * 60;
            this.posTarget = this.pos.plus(new Vector2(0, 32));
        } else {
            game.playSound('damage');
            game.score += 20;
        }
    }

    update = game => {

        if (this.isDisabled) {
            this.isDisabled--;
            if (!this.isDisabled) {
                this.health = this.maxHealth;
                this.posTarget = this.pos.plus(new Vector2(0, -32));
            }
        } else if (this.attack) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);

            if (this.attackFrame < 120) {
                this.posTarget = new Vector2(flare.pos.x, 22.5 * 16);
            } else if (this.attackFrame === 150) {
                this.posTarget = new Vector2(this.pos.x, this.pos.y - 32);
                const x = Math.floor(this.pos.x / 16);
                for (let i = x; i < x + 2; i++) {
                    const ina = game.scene.actors.find(actor => actor instanceof Ina);
                    ina.deleteBridge(game, i);
                    game.scene.shakeBuffer = 15;
                }
            } else if (this.attackFrame === 180) {
                this.posTarget = new Vector2(this.pos.x, this.pos.y + 64);
            } else if (this.attackFrame > 240) {
                this.attack = false;
                this.posTarget = this.posBuffer;
                this.posBuffer = null;
            }

            this.attackFrame++;
        }
        
        if (this.posTarget) {
            this.pos = this.pos.lerp(this.posTarget, .1);
            if (this.pos.distance(this.posTarget) < 1) {
                this.pos = this.posTarget;
                this.posTarget = null;
                game.scene.particles.water_trail(this, 0);
            }
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        if (this.isDisabled) cx.filter = `contrast(2) brightness(.5)`;
        if (this.attack && this.attackFrame > 120 && this.attackFrame < 150 && Math.floor(this.frameCount * .5) % 2) cx.filter = `contrast(0) brightness(2)`;
        const center = CollisionBox.center(this).round();
        cx.translate(center.x + (1 + this.randomOffset) * 4 * Math.cos(Math.floor(this.frameCount * .125 + this.randomOffset)),
            center.y + (1 + this.randomOffset) * 4 * Math.sin(Math.floor(this.frameCount * .125 + this.randomOffset)));
        const xOffset = Math.floor(this.frameCount * .125 + this.randomOffset) % 3;
        cx.drawImage(game.assets.images['sp_ina_tentacle'], this.isDisabled ? 320 : 64 * xOffset, 0, 64, 64, -20, -32, 64, 64);
        cx.restore();
    }
}