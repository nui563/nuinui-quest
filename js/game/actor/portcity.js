class Dokuro extends Actor {
    size = new Vector2(16, 16);
    vel = new Vector2(0, 0);

    maxHealth = 3;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
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
            this.dropHeart(game, .7);
            game.score += 100;
        } else {
            game.score += 20;
            game.playSound('damage');
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        // if (this.vel.y) this.vel.y += this.gravity;
        this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI));
        this.vel.y = Math.sin((this.frameCount / 2048) * (180 / Math.PI)) / 4;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        for (let i = 0; i < 2; i++) {
            const dist = .5;
            const a = Math.cos(random() * 2 * Math.PI);
            const b = Math.sin(random() * 2 * Math.PI);
            game.scene.particles.smoke_black(CollisionBox.center(this), new Vector2(-this.vel.x + a * dist, -this.vel.y + b * dist), 0);
        }

        // Attack
        const attackArray = game.scene.bossStarted ? [127] : [63, 127];
        if (attackArray.includes(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {
            const pos = CollisionBox.center(this).plus(new Vector2(0, -8));
            game.scene.actors.push(new Bullet(pos, new Vector2(-3, -2), this));
            game.scene.actors.push(new Bullet(pos, new Vector2(-1, -2), this));
            game.scene.actors.push(new Bullet(pos, new Vector2(1, -2), this));
            game.scene.actors.push(new Bullet(pos, new Vector2(3, -2), this));
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
        }

        if (this.health <= this.maxHealth / 2) {
            if (random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
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
        cx.drawImage(game.assets.images['sp_dokuro'], (Math.floor(this.frameCount / 16) % 6) * 16, 0, 16, 16, 0, 0, 16, 16);
        cx.restore();
    }
}

class Cannon extends Actor {
    size = new Vector2(16, 24);
    vel = new Vector2(0, 0);
    angle = 0;
    angleIndex = 0;
    angleOrder = 1;

    maxHealth = 3;

    constructor(pos, dir) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.dir = dir;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
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
            this.dropHeart(game, .7);
            game.score += 100;
        } else {
            game.score += 20;
            game.playSound('damage');
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        // Attack
        if ([0, 32, 64, 96].includes(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {

            const vel = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(-2);
            if (this.dir) vel.x *= -1;

            const pos = CollisionBox.center(this).plus(new Vector2(vel.x * 4, vel.y * 4 - 4));
            const bullet = new Bullet(pos, vel, this);
            if (game.currentStage === 3) {
                bullet.pos = bullet.pos.plus(new Vector2(vel.x * 8 * (this.dir ? 0.5 : 1.75), vel.y * 8));
                bullet.angle = this.angle * (this.dir ? -1 : 1) + (this.dir ? Math.PI : 0);
                bullet.size = new Vector2(16, 16);
                bullet.iceSpike = true;
            }
            game.scene.actors.push(bullet);
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");

            this.angle += (Math.PI / 7) * this.angleOrder;
            this.angleIndex += this.angleOrder;
            if (this.angleIndex === 3 || !this.angleIndex) {
                this.angleOrder *= -1;
            }
        }

        if (this.health <= this.maxHealth / 2) {
            if (random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        // this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.waterOffset) cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 16) * (180 / Math.PI))));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_cannon'], 48 * this.angleIndex + (Math.floor(this.frameCount / 16) % 2) * 24, game.currentStage === 4 ? 64 : game.currentStage === 3 ? 32 : 0, 24, 32, 0, -8, 24, 32);
        cx.restore();
    }
}

class Pirate extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);

    maxHealth = 6;

    moveSpeed = 4;

    phase = 'idle';
    phaseBuffer = 0;

    moveDir = 1;
    aggro = false;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x * 16, pos.y * 16 - 32);
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        if (this.spinCollision) {
            const collision = CollisionBox.intersects(this.spinCollision, collisionBox);
            return collision;
        }
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (this.spinCollision) {
            game.playSound("no_damage");
            game.scene.particles.sparkle_white(CollisionBox.center(this.checkHit(game, other)));
            return;
        }
        
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
            this.dropHeart(game, .3);
            game.score += 200;
        } else {
            game.score += 50;
            game.playSound('damage');
        }
    }

    idlePhase = game => {
        if (this.phaseBuffer >= 63) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);

            if (p1.distance(p2) < 16 * 10) this.aggro = true;

            if (this.aggro) {
                if (Math.abs(p1.y - p2.y) < flare.size.y) {
                    this.phase = 'attack';
                } else {
                    this.phase = 'move';
                    if (CollisionBox.intersects(this, game.scene.view)) game.playSound("boss_move");
                    this.moveDir = random() > .5 ? 1 : -1;
                }
            }
        }
    }

    attackPhase = game => {
        if (!this.phaseBuffer) {
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound("boss_move");
        }
        game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
        const x = this.phaseBuffer / 128;
        this.vel.x = (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)) * this.moveDir * this.moveSpeed / 2;
        
        if (this.phaseBuffer === 127) {
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
    }

    movePhase = game => {
        game.scene.particles.smoke_white(new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y), new Vector2(0, 0), 0);
        const x = this.phaseBuffer / 40;
        this.vel.x = (x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2) * this.moveDir * this.moveSpeed;
        if (this.phaseBuffer === 40) {
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        this[`${this.phase}Phase`](game);

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.moveDir *= -1;
            this.vel.x = 0;
        }

        const isGrounded = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(newCollisionBox, collision, 'x'));

        if (!CollisionBox.includedIn(newCollisionBox, game.scene.currentSection) || !isGrounded) {
            this.vel.x = 0;
            this.moveDir *= -1;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        this.pos.y += this.vel.y;

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.health < this.maxHealth / 2) {
            if (random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        if (this.phase === 'attack') {
            this.spinCollision = {
                pos: this.pos.plus(new Vector2(-24, 8)),
                size: new Vector2(64, 24)
            }
        } else this.spinCollision = null;

        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        this.frameCount++;
    }

    draw = (game, cx) => {
        const skinOffset = game.currentStage === 4;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.waterOffset) cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 16) * (180 / Math.PI))));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        if (this.phase === 'attack') {
            cx.drawImage(game.assets.images['sp_pirate_spin'], (Math.floor(this.frameCount / 4) % 3) * 64, skinOffset ? 40 : 0, 64, 40, -24, -6, 64, 40);
        } else {
            const offset = new Vector2(12, 12);
            cx.drawImage(game.assets.images['sp_pirate'], this.vel.x === 0 ? 0 : this.dir === this.vel.x < 0 ? 48 : 96, skinOffset ? 48 :0, 48, 48, -offset.x, -offset.y, 48, 48);
        }
        cx.restore();
    }
}

class Neko extends Actor {
    size = new Vector2(24, 32);
    vel = new Vector2(0, 0);

    maxHealth = 2;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (other instanceof Arrow && other.type === 'fire') {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        } else {
            game.scene.particles.digit(this.checkHit(game, other).pos, 0);
        }
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.shakeBuffer = 4;
            this.dropHeart(game, .7);
            game.playSound('damage');
            game.score += 50;
        } else {
            game.score += 10;
            game.playSound('damage');
        }
    }

    update = game => {
        if (!game.scene.blackout) {
            this.toFilter = true;
            return;
        }
        if (game.scene.miniBossCleared) game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        const p1 = CollisionBox.center(flare);
        const p2 = CollisionBox.center(this);
        this.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const vel = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(-1);
        
        this.pos = this.pos.plus(vel.times(.125));
        
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (game.scene.miniBossCleared || !game.scene.blackout) return;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.globalAlpha = .75;
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        for (let i = 0; i < 40; i++) {
            cx.globalAlpha = random();
            cx.drawImage(game.assets.images['sp_neko'], 0, i, 32, 1, Math.cos(((this.frameCount + i) / 360) * (180 / Math.PI)) * 2 - 4, i - 4, 32, 1);
        }
        cx.restore();
    }
}

class Rock extends Actor {
    size = new Vector2(48, 32);
    vel = new Vector2(0, 0);
    damage = 1;

    constructor(pos, dir) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.dir = dir;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        if (game.scene.achievement11 && collisionBox instanceof Flare && collision) game.scene.achievement11 = false;
        return collision;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_rock'], 0, 0);
        cx.restore();
    }
}