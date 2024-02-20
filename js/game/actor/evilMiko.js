class EvilMiko extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    phaseBuffer = 0;
    
    posTarget = null;
    posTargets = [
        new Vector2(29.5 * 16, 40 * 16),
        new Vector2(39.5 * 16, 40 * 16),
        new Vector2(49.5 * 16, 40 * 16)
    ];

    damage = 1;
    
    healthBar = 0;

    crystalDist = 32;
    crystalSpeed = .01;

    dragonBreath = 0;

    blocks = [];

    attackCount = 0;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        this.dragonHeadpos = this.pos.plus(new Vector2(this.size.x / 2, -150));
        this.crystalPos1 = this.pos.plus(new Vector2(this.size.x / 2, -150));
        this.crystalPos2 = this.pos.plus(new Vector2(this.size.x / 2, -150));
        this.bucketPos = this.pos.plus(new Vector2(this.size.x / 2, -150));
    }
    
    checkHit = (game, collisionBox) => CollisionBox.intersects(this, collisionBox);

    takeHit = (game, other) => {
        if (this.dragonBreath) return;
        if (this.invicibility) return;
        
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        game.playSound('damage');
        
        if (!this.health) {
            this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
        } else {
            this.dragonBreath = this.health < this.maxHealth * .25 ? 180 : random() > .5 ? 60 : 0;
            this.invicibility = 30;
        }
    }
    
    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit2');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }
    
    waitPhase = game => {
        if (!this.posTarget) this.posTarget = this.posTargets[1];
    }

    sitPhase = game => {}

    attackPhase = game => {
        if (!this.phaseBuffer) game.playSound('charge');
        if (this.phaseBuffer < 180) {
            if (!(this.frameCount % 4)) [this.crystalPos1, this.crystalPos2].forEach(p => game.scene.particles.charge(p));
        } else if (!(this.phaseBuffer % 5) && (this.phaseBuffer % 60 >= 30 || this.health < this.maxHealth * .5)) {
            [this.crystalPos1, this.crystalPos2].forEach((p, i) => {
                const angle = -Math.PI * .5 + (this.phaseBuffer - 180) * (Math.PI / 180) * (i ? -1 : 1);
                for (let j = 0; j < 4; j++) {
                    const angle2 = angle + j * Math.PI * .5;
                    const vel = new Vector2(Math.cos(angle2), Math.sin(angle2)).times(-2);
                    const bullet = new Bullet(p, vel, this);
                    bullet.angle = angle2;
                    game.scene.actors.push(bullet);
                }
            });

            game.playSound('pew');
        }

        this.crystalDist = 128;
        this.crystalSpeed = 0;

        if (this.phaseBuffer === 300) {
            this.lastMove = this.phase;
            this.setAnimation('evil');
            this.phase = 'idle';
            this.crystalDist = 32;
            this.crystalSpeed = .01;
        }
    }

    attack2Phase = game => {
        const blockCount = 24;
        if (!this.phaseBuffer) {
            for (let i = 0; i < blockCount; i++) {
                const block = new Block(CollisionBox.center(this), this, i);
                this.blocks.push(block);
                game.scene.actors.push(block);
            }
        }

        for (let i = 0; i < blockCount; i++) {
            const block = this.blocks.find(block => block.index === i);
            if (block && this.phaseBuffer > i * 10) {
                const angle = (Math.PI * 2) * (1 / blockCount) * i + this.phaseBuffer * 2 * (Math.PI / 180);
                const dist = this.phaseBuffer < blockCount * 10 ? 64 : 64 + (this.phaseBuffer - blockCount * 10) ** 1.25;
                block.pos = block.pos.lerp(CollisionBox.center(this).plus(new Vector2(-block.size.x / 2 + Math.cos(angle) * dist, -block.size.y / 2 + Math.sin(angle) * dist)), .05);
            }
        }

        if (this.phaseBuffer === blockCount * 10) game.playSound('noise');

        if (!this.blocks.length) {
            this.lastMove = this.phase;
            this.setAnimation('evil');
            this.phase = 'idle';
        }
    }

    attack3Phase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        this.bucketPos = this.bucketPos.lerp(new Vector2(flare.pos.x + flare.size.x * .5, 37 * 16), .05);

        if (this.phaseBuffer > 120 && !(this.phaseBuffer % 2)) {
            const bullet = new Bullet(this.bucketPos.plus(new Vector2(random() * 24 - 12, 8)), new Vector2(0, 2), this, true);
            game.scene.actors.push(bullet);
        }
        
        if (this.phaseBuffer >= 240) {
            this.lastMove = this.phase;
            this.setAnimation('evil');
            this.phase = 'idle';
        }
    }

    movePhase = game => {
        if (!this.phaseBuffer) {
            this.posTarget = !this.posTarget ? this.posTargets[1] : this.posTargets[Math.floor(random() * this.posTargets.length)];
        }
        if (this.pos.round().x === this.posTarget.round().x) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    idlePhase = game => {
        if (this.phaseBuffer >= 31) {
            if (random() > (this.lastMove === 'move' ? .1 : .5)) {
                switch (this.attackCount % 3) {
                    case 0:
                        this.phase = 'attack2';
                        break;
                    case 1:
                        this.phase = 'attack3';
                        break;
                    case 2:
                        this.setAnimation('charge');
                        this.phase = 'attack';
                        break;
                    default:
                        break;
                }
                this.attackCount++;
            } else {
                this.phase = 'move';
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

        if (this.phase === 'defeated') {
            this.vel.y += .125;
            this.pos.y += this.vel.y;
        } else if (this.phase === 'sit') {
        } else {
            this.pos = this.pos.lerp(this.posTarget.plus(new Vector2(0, Math.sin((this.frameCount / 1000) * (180 / Math.PI))  * 4)), this.health < this.maxHealth * .5 ? .1 : .05);
        }
        this.pos.y = Math.round((this.pos.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x) * 100) / 100;

        if (!['sit', 'wait'].includes(this.phase) || (this.phase === 'wait' && this.phaseBuffer > 60)) {
            const dragonHeadposTarget = this.pos.plus(new Vector2(this.size.x / 2, Math.cos((this.frameCount / 1000) * (180 / Math.PI))  * 4));
            this.dragonHeadpos = this.dragonHeadpos.lerp(dragonHeadposTarget, this.phase === 'wait' ? .05 : .1);
            const crystalPos1Target = this.pos.plus(new Vector2(this.size.x / 2 + (this.crystalSpeed ? Math.sin(this.frameCount * this.crystalSpeed) * this.crystalDist : this.crystalDist), 0));
            this.crystalPos1 = this.crystalPos1.lerp(crystalPos1Target, .1);
            const crystalPos2Target = this.pos.plus(new Vector2(this.size.x / 2 - (this.crystalSpeed ? Math.sin(this.frameCount * this.crystalSpeed) * this.crystalDist : this.crystalDist), 0));
            this.crystalPos2 = this.crystalPos2.lerp(crystalPos2Target, .1);
        }

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (!['sit'].includes(this.phase) && this.health) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 20 - 10)), new Vector2(random() - .5, random() * -2), 0);
            }
        }

        if (!['sit', 'wait'].includes(this.phase) && this.health) {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_pink(this.dragonHeadpos.plus(new Vector2(random() * 16 - 8, random() * 64 - 32)), new Vector2(random() - .5, random() * -4), 0);
            }
        }

        if (this.dragonBreath && this.health) {
            game.scene.actors.filter(a => a instanceof Arrow && !a.kanataBuffer && Math.abs(this.pos.x - a.pos.x) < 48 && Math.sign(a.vel.x) !== Math.sign(this.dir ? 1 : -1)).forEach(a => a.kanataBuffer = 1);
            
            if (!(this.frameCount % 20)) game.playSound('explosion');

            const pos = this.dragonHeadpos.plus(new Vector2(0, -16));
            const angle = random() * Math.PI * 2;
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-8 * (this.health < this.maxHealth * .5 ? 2 : 1));
            game.scene.particles.shine_vel_white(pos, vel, 0);

            const dist = CollisionBox.center(this).distance(CollisionBox.center(flare)) * (this.health < this.maxHealth * .25 ? .5 : 1);
            flare.vel.x += (1/dist) * 50 * (CollisionBox.center(this).x < CollisionBox.center(flare).x ? 1 : -1);
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
        if (this.dragonBreath) this.dragonBreath--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        
        if (this.phase === 'attack3') {
            cx.save();
            cx.translate(Math.round(this.bucketPos.x), Math.round(this.bucketPos.y));
            cx.drawImage(game.assets.images['sp_bucket'], this.phaseBuffer > 120 ? 32 : 0, 0, 32, 32, -16, -16, 32, 32);
            cx.restore();
        }

        if (!['sit'].includes(this.phase) && this.health) {
            cx.save();
            cx.translate(Math.round(this.dragonHeadpos.x), Math.round(this.dragonHeadpos.y));
            if (this.dragonBreath) cx.translate(Math.floor(random() * 6) - 3, 0);
            cx.drawImage(game.assets.images[`sp_dragon`], this.dragonBreath ? 32 : 0, 0, 32, 64, -16, -64, 32, 64);
            cx.restore();

            cx.save();
            cx.translate(Math.round(this.crystalPos1.x), Math.round(this.crystalPos1.y));
            cx.rotate(this.frameCount / 50 * Math.PI);
            cx.drawImage(game.assets.images['sp_crystal'], -8, -8);
            cx.rotate(-this.frameCount / 25 * Math.PI);
            cx.drawImage(game.assets.images['sp_crystal'], -8, -8);
            cx.restore();
        }

        if (!(this.invicibility % 2)) {
            cx.save();
            cx.translate(Math.round(this.pos.x) + this.size.x / 2, Math.round(this.pos.y));
            if (!['sit'].includes(this.phase) && this.health) {
                for (let i = 0; i < 2; i++) {
                    cx.save();
                    cx.translate(0, 16);
                    if (i) cx.scale(-1, 1);
                    cx.rotate(Math.PI * .25 + Math.sin((this.frameCount*  2) * (Math.PI / 180))  * Math.PI * .125);
                    cx.drawImage(game.assets.images[`sp_wing`], 0, -32);
                    cx.restore();
                }
            }
            if (!this.dir) cx.scale(-1, 1);
            const img = this.animation;
            cx.drawImage(game.assets.images[`sp_miko_${img}`], -20, -4);
            cx.restore();
        }
        
        if (!['sit'].includes(this.phase) && this.health) {
            cx.save();
            cx.translate(Math.round(this.crystalPos2.x), Math.round(this.crystalPos2.y));
            cx.rotate(-this.frameCount / 50 * Math.PI);
            cx.drawImage(game.assets.images['sp_crystal'], -8, -8);
            cx.rotate(this.frameCount / 25 * Math.PI);
            cx.drawImage(game.assets.images['sp_crystal'], -8, -8);
            cx.restore();
        }
    }
}