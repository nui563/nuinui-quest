class Nousabot extends Actor {
    size = new Vector2(24, 24);
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
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            
            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
            game.score += 100;
            this.dropHeart(game, .7);
        } else {
            game.score += 20;
            game.playSound('damage');
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        // if (this.vel.y) this.vel.y += this.gravity;
        this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI)) / 2;
        this.vel.y = Math.sin((this.frameCount / 2048) * (180 / Math.PI)) / 2;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        for (let i = 0; i < 2; i++) {
            const dist = .5;
            const a = Math.cos(Math.random() * 2 * Math.PI);
            const b = Math.sin(Math.random() * 2 * Math.PI);
            game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(-this.vel.x + a * dist, -this.vel.y + b * dist), 0);
        }

        // Attack
        if ([63, 95, 127].includes(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);
            if (p1.distance(p2) < 192 && p1.y - 32 < p2.y) {
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
                game.scene.actors.push(new Bullet(p1, vel, this));
                if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
            }
        }

        if (this.health < this.maxHealth / 2) {
            if (Math.random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        this.frameCount++;
        if (this.scrollFilter && this.pos.x >= 41 * 16) this.toFilter = true;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_nousabot'], 0, game.currentStage === 4 ? 48 : game.currentStage === 2 ? 24 : 0, 24, 24, 0, 0, 24, 24);
        cx.restore();
    }
}

class Robot extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);

    maxHealth = 6;

    moveSpeed = 4;

    phase = 'idle';
    phaseBuffer = 0;

    aggro = false;

    constructor(pos, sleep) {
        super();
        this.pos = new Vector2(pos.x * 16, pos.y * 16 - 32);
        this.health = this.maxHealth;
        this.sleep = sleep;
        this.phase = sleep ? 'sleep' : 'idle';
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        if (game.currentStage !== 3) this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
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
                    this.moveDir = Math.random() > .5 ? 1 : -1;
                }
            }
        }
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 10) && CollisionBox.intersects(this, game.scene.view)) {
            game.scene.actors.push(new Bullet(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -16), this.pos.y + 18), new Vector2(3 * (this.dir ? 1 : -1), 0), this));
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
        }
        if (this.phaseBuffer === 39) this.phase = 'idle';
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

    sleepPhase = game => {

    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        this[`${this.phase}Phase`](game);

        const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

        if (!this.scrollSpeed && CollisionBox.intersectingCollisionBoxes(newCollisionBox, game.scene.currentSection.collisions).length) {
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

        if (!this.sleep) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.spirit) {
            game.scene.particles.smoke_spirit(this.pos.plus(new Vector2(this.size.x / 2, 0)), new Vector2(0, -1), 0);
        } else if (this.sleep && Math.random() > .9) {
            game.scene.particles.smoke_spirit(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8)), new Vector2(0, -.25), 1);
        }

        if (this.health < this.maxHealth / 2) {
            if (Math.random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.waterOffset) cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 4) * (180 / Math.PI))));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        const offset = new Vector2(12, 12);
        if (this.waterOffset)cx.drawImage(game.assets.images['sp_pirate_jetski'], -10, -8);
        else cx.drawImage(game.assets.images['sp_robot'], this.sleep ? 144 : this.vel.x === 0 ? 0 : this.dir === this.vel.x < 0 ? 48 : 96, game.currentStage === 3 ? 96 : game.currentStage === 2 ? 48 : 0, 48, 48, -offset.x, -offset.y, 48, 48);
        cx.restore();
    }
}
class Nousakumo extends Actor {
    size = new Vector2(20, 22);
    vel = new Vector2(0, 0);

    maxHealth = 2;
    gravity = .15;

    moveSpeed = .5;

    phase = 'idle';
    phaseBuffer = 0;

    aggro = true;
    wait = false;

    constructor(pos) {
        super();
        this.pos = new Vector2(pos.x * 16, pos.y * 16 - 22);
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
        if (this.phaseBuffer >= 47 && Math.random() > .98 && !this.wait) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(this);
            const p2 = CollisionBox.center(flare);

            if (p1.distance(p2) < 16 * 10) this.aggro = true;

            if (this.aggro) {
                if (Math.abs(p1.y - p2.y) < flare.size.y && false) {
                    this.phase = 'attack';
                } else {
                    this.phase = 'move';
                    // if (CollisionBox.intersects(this, game.scene.view)) game.playSound("jump");
                    this.moveDir = Math.random() > .5 ? 1 : -1;
                    this.vel.y = -3;
                }
            }
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
            this.vel.x = 0;
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
        
        if (this.health < this.maxHealth / 2) {
            if (Math.random() > .9) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, -2), 1);
        }

        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

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
        const offset = new Vector2(6, 10);
        cx.drawImage(game.assets.images['sp_nousakumo'],
            this.isGrounded ? 0 : 32, game.currentStage === 4 ? 64 : game.currentStage === 2 ? 32 : 0, 32, 32,
            -offset.x, -offset.y, 32, 32);
        cx.restore();
    }
}

class VaporBlock extends Actor {
    size = new Vector2(16, 16);
    vel = new Vector2(0, 0);

    constructor(pos, vapor, cycle) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.vapor = vapor;
        this.cycle = cycle;
        this.vaporBuffer = !vapor ? cycle : 0;
        this.cycleBuffer = vapor ? cycle : 0;
        this.vaporCollisionBox = {pos:new Vector2(this.pos.x, this.pos.y - 4 * 16), size: new Vector2(16, 4 * 16)}
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.playSound('hit');
        this.vapor = false;
        this.vaporBuffer = 180;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (!flare.invicibility && this.vapor && CollisionBox.intersects(this.vaporCollisionBox, flare)) {
            flare.takeHit(game, this.vaporCollisionBox);
            flare.vel.x = 8 * Math.sign(flare.vel.x);
        }

        if (this.vapor) {
            game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(0, -12)), new Vector2(0, -4), 1);
        }

        if (this.cycleBuffer) {
            this.cycleBuffer--;
            if (!this.cycleBuffer) {
                this.vapor = false;
                this.vaporBuffer = this.cycle;
            }
        }

        if (this.vaporBuffer) {
            this.vaporBuffer--;
            if (!this.vaporBuffer) {
                this.vapor = true;
                if (CollisionBox.intersects(this, game.scene.view)) game.playSound('no_damage');
                if (this.cycle) this.cycleBuffer = this.cycle;
            }
        }

        // this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.vapor) cx.translate(Math.floor(Math.random() * 2) - 1, Math.floor(Math.random() * 2) - 1);
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_vapor_block'], this.vapor || (this.vaporBuffer < 60 && !(this.vaporBuffer % 4)) ? 16 : 0, 0, 16, 16, 0, 0, 16, 16);
        cx.restore();
    }
}