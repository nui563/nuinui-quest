class Ayame extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    gravity = .15;

    moveSpeed = 2.5;

    phaseBuffer = 0;

    chantLevel = 0;

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

    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    idlePhase = game => {
        // const flare = game.scene.actors.find(actor => actor instanceof Flare);
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

    attackPhase = game => {
        if (this.phaseBuffer > 29 && !(this.phaseBuffer % 6)) {
            const i = Math.floor((this.phaseBuffer - 30) / 6);
            const angle = i * (Math.PI / 8) * (this.dir ? 1 : -1) + (!this.dir ? Math.PI : 0);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-3);
            const iceSpike = new Bullet(CollisionBox.center(this).plus(new Vector2(vel.x * 10, vel.y * 10 - 8)), vel, this);
            iceSpike.angle = angle;
            game.scene.actors.push(iceSpike);
        }

        if (this.phaseBuffer === 89) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    shieldPhase = game => {
        if (this.phaseBuffer === 30) {
            for (let i = 0; i < 4; i++) {
                game.scene.actors.push(new IceShield(CollisionBox.center(this), Math.PI / 2 * i, this));
            }
        }
        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    windPhase = game => {
        if (this.phaseBuffer === 30) {
            game.scene.iceWind = 120;
            game.scene.iceWindDir = Math.random() > .5;
            // game.playSound("miko_chant");
        }
        if (this.phaseBuffer === 60) {
            this.lastMove = this.phase;
            this.setAnimation('idle');
            this.phase = 'idle';
        }
    }

    movePhase = game => {
        if (!(this.phaseBuffer % 4)) game.scene.particles.shine_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8).round()), 0);
        
        this.vel.x = this.moveDir * this.moveSpeed * (this.moveAttack ? .5 : 1);
        if (this.moveAttack) {
            if (Math.abs(this.vel.y) < 1) this.vel = new Vector2(this.vel.x * .5, this.vel.y - this.gravity * .9 * (1 - Math.abs(this.vel.y)));

            [20, 35, 50].forEach((frame, i) => {
                if (this.phaseBuffer === frame) {
                    const flare = game.scene.actors.find(actor => actor instanceof Flare);
                    const p1 = CollisionBox.center(flare);
                    const p2 = CollisionBox.center(this).plus(new Vector2(16 * (i === 0 ? 1 : i === 1 ? -1 : 0), i === 2 ? -16 : 0));
                    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                    const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-3);
                    const iceSpike = new Bullet(p2, vel, this);
                    iceSpike.angle = angle;
                    game.scene.actors.push(iceSpike);
                }
            })
        }

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

        if (flare.playerControl && this.health && this.animation === 'idle') this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

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
        const spd = this.animation === 'chant' ? 16 : 1;
        const frame = this.animation === 'chant' ? 4 : 1;
        cx.drawImage(game.assets.images[`sp_ayame_${this.animation}`],
            (Math.floor(this.animationFrame / spd) % frame) * xSize, 0, 48, 48,
            -offset.x, -offset.y, 48, 48);
        cx.restore();
    }
}