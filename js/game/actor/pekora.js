class Pekora extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = false;

    gravity = .15;

    moveSpeed = 2;

    phaseBuffer = 0;

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

    fleePhase = game => {
        this.setAnimation(!this.isGrounded? 'jump' : 'idle');
        if (this.pos.y === 16 * 22 - this.size.y) {
            game.playSound('land');
            game.scene.particles.land(this);
            this.vel = new Vector2(-3, -2);
        }
    }

    defeatedPhase = game => {
        //velloss
        this.setAnimation(!this.isGrounded? 'hit' : 'idle');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    idlePhase = game => {
        if (this.phaseBuffer >= 31) {
            if (Math.random() < (!this.lastMove ? 0 : this.lastMove === 'move' ? .8 : .2)) {
                if (game.scene.name === 'casino' || Math.random() > .75) {
                    this.phase = 'rocket';
                    this.setAnimation('rocket');
                    // game.playSound("charge");
                } else if (this.health < this.maxHealth / 2 && Math.random() > .5) {
                    this.phase = 'attack3';
                    this.setAnimation('think');
                    game.playSound("charge");
                } else {
                    if (Math.random() > .75) {
                        this.phase = 'attack2';
                        this.setAnimation('laugh');
                        // game.playSound('peko');
                    }
                    else {
                        this.phase = 'attack';
                        this.setAnimation('laugh');
                        // game.playSound('peko');
                    }
                }
            } else {
                this.phase = 'move';
                game.playSound("jump");
                const flare = game.scene.actors.find(actor => actor instanceof Flare);
                if (this.pos.distance(flare.pos) > 16 * 12) this.moveDir = flare.pos.x > this.pos.x ? 1 : -1;
                else this.moveDir = Math.random() > .5 ? 1 : -1;
                this.vel.y = -4;
            }
        }
    }

    rocketPhase = game => {
        if (!this.phaseBuffer) {
            game.scene.actors.push(new Rocket(new Vector2(this.pos.x + (this.dir ? this.size.x + 8 : -8), this.pos.y + 16), new Vector2(1 * (this.dir ? 1 : -1), 0), this));
            game.playSound("pew");
            if (Math.random() > .5) game.playSound('peko');
        }
        if (this.phaseBuffer === 39) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 20)) {

            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(flare);
            const p2 = CollisionBox.center(this);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-2);
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), vel, this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 59) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    attack2Phase = game => {
        if (!(this.phaseBuffer % 9)) {
            const angle = (this.phaseBuffer / 72) * Math.PI * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-2);
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), vel, this));
            game.playSound("pew");
        }
        if (this.phaseBuffer === 72) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.setAnimation('idle');
        }
    }
    
    attack3Phase = game => {
        if (!(this.phaseBuffer % 64)) {
            for (let i = 0; i <= 5; i++) {
                const angle = (i / 5) * Math.PI * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
                const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-1);
                game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(8, 8)), vel, this));
            }
            game.playSound("pew");
        }
        if (!(this.phaseBuffer % 4)) game.scene.particles.charge(CollisionBox.center(this));
        if (this.phaseBuffer === 64) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.setAnimation('idle');
        }
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), 0);
        this.vel.x = this.moveDir * this.moveSpeed;
        if (this.phaseBuffer > 3 && this.isGrounded) {
            this.lastMove = this.phase;
            this.phase = 'idle';
            this.vel = new Vector2(0, 0);
        }
        this.setAnimation(this.vel.y ? 'jump' : 'idle');
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (this.phase) this[`${this.phase}Phase`](game);

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
            this.vel.y = 0;
        }

        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (flare.playerControl && this.health) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
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
        const offset = new Vector2(16, 10);
        const xSize = 48;
        const spd = this.animation === 'laugh' ? 8 : 1;
        const frame = this.animation === 'laugh' ? 2 : 1;
        cx.drawImage(game.assets.images[`sp_pekora_${this.animation}`],
            (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 48, 48,
            -offset.x, -offset.y, 48, 48);
        cx.restore();
    }
}