class Aqua extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = false;

    gravity = .2;

    moveSpeed = .25;
    aggroSpeed = 1.5;

    phaseBuffer = 0;
    playerAggro = 0;

    damage = 1;

    constructor(pos, maxHealth) {
        super(pos);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this.playerAggro && !this.vel.x && collisionBox instanceof Flare ? this.aggroZone : this, collisionBox);
        return this.phase && !['flee', 'defeated'].includes(this.phase) ? collision : null;
    }

    takeHit = (game, other) => {
        if (!this.invicibility) {
            // this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.playSound('no_damage');
            
            if (!this.health) {
                this.vel = new Vector2(this.dir ? -2 : 2, -2.5);
                game.score += 100;
            } else {
                this.invicibility = 8;
            }

            if (other.type === 'sword' && this.phase !== 'defeated') {
                
                if (this.playerAggro) {
                    this.playerAggro = 0;
                    game.stopBGM();
                    game.playBGM('sneak');
                }
                this.phase = 'defeated';
                game.playSound('death');
                game.scene.bossKillEffect = 60;
                game.scene.isFocus = 0;
                this.vel.y = -4;
                const flare = game.scene.actors.find(actor => actor instanceof Flare);
                localStorage.setItem('nuinui-save-achievement-10', true);
                game.updateAchievements();
                if (!flare.chargeTypeList.includes('dual')) game.scene.actors.push(new KiritoPickup(this.pos.value(), new Vector2(20, 20)));
            }
        }

        if (this.phase !== 'defeated') {
            if (!this.playerAggro) {
                game.stopBGM();
                game.playBGM('dummy_th000');
            }
            this.playerAggro = 480;
        }
        
    }

    defeatedPhase = game => {
        //velloss
        this.setAnimation('hit');
        this.vel = this.vel.mult(new Vector2(0.9, 1));
    }

    attackPhase = game => {
        if (!(this.phaseBuffer % 20)) {
            this.setAnimation('laugh');

            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const dist = CollisionBox.center(this).distance(CollisionBox.center(flare));
            const bufferVal = Math.ceil(this.phaseBuffer / 20) + 1;
            const vel = new Vector2(bufferVal * Math.ceil(dist / 256) * (this.dir ? 1 : -1), -2 * (3 - bufferVal));
            game.scene.actors.push(new Bullet(this.pos.plus(new Vector2(10 * (this.dir ? 1 : -1), 8)), vel, this));
            game.playSound('bow_shoot');
        }
        if (this.phaseBuffer === 59) {
            this.setAnimation('idle');
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    movePhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        const dist = CollisionBox.center(this).distance(CollisionBox.center(flare));
        if (this.isGrounded && dist < 64 && this.playerAggro) {
            this.vel.x = 0;
            if (this.animation !== 'attack') this.setAnimation('attack');
            if (!(this.phaseBuffer % 20)) game.playSound('slash');
        } else {
            this.vel.x = (this.playerAggro ? this.aggroSpeed : this.moveSpeed) * (this.dir ? 1 : -1);
            if (this.animation !== 'walk') this.setAnimation('walk');
            if (this.phaseBuffer % 32 === 31) {
                if (dist < 256) game.playSound('step');
            }
        }

    }

    detectFlare = game => {
        const ptInRect = (pt, rect) => pt.x > rect.pos.x - rect.size.x / 2 && pt.x < rect.pos.x + rect.size.x / 2 && pt.y > rect.pos.y - rect.size.y / 2 && pt.y < rect.pos.y + rect.size.y / 2;
        
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        this.aggroZone = {
            pos: this.pos.plus(new Vector2(this.dir ? this.size.x : -4 * 16, 0)),
            size: { x: 4 * 16, y: this.size.y }
        }
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);

        this.detectFlare(game);
        if (CollisionBox.intersects(this, flare) || CollisionBox.intersects(this.aggroZone, flare)) {
            if (!this.playerAggro) {
                game.stopBGM();
                game.playBGM('dummy_th000');
            }
            this.playerAggro = 480;
        }

        this.currentSection = game.scene.sections.find(section => CollisionBox.center(this).inBox(section));

        if (this.isWaiting && this.currentSection === game.scene.currentSection) this.isWaiting = false;

        if (this.phase && !this.isWaiting) this[`${this.phase}Phase`](game);

        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        if (this.vel.y < -4) {
            this.vel.y = -4;
            this.vel.x /= 2;
        }
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        if (this.phase !== 'defeated') {
            const newCollisionBox = { pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }

            if (CollisionBox.intersectingCollisionBoxes(newCollisionBox, this.currentSection.collisions).length) {
                this.pos.x = Math.round(this.pos.x);
                while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, this.currentSection.collisions).length) {
                    this.pos.x = this.pos.x + Math.sign(this.vel.x);
                }
                
                if (this.isGrounded) {
                    this.dir = !this.dir;
                    if (this.playerAggro) {
                        game.stopBGM();
                        game.playBGM('sneak');
                    }
                    this.playerAggro = 0;
                }
                this.vel.x = 0;
            }
    
            this.isGrounded = false;
            if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, this.currentSection.collisions).length) {
                this.isGrounded = CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, this.currentSection.collisions).some(c => c.other.pos.y > this.pos.y);
                this.pos.y = Math.round(this.pos.y);
                while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, this.currentSection.collisions).length) {
                    this.pos.y = this.pos.y + Math.sign(this.vel.y);
                }
                if (this.health) this.vel.y = 0;
            }
        }

        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (this.playerAggro && this.pos.y === flare.pos.y) this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.invicibility) this.invicibility--;
        if (this.playerAggro) {
            this.playerAggro--;
            if (!this.playerAggro) {
                game.stopBGM();
                game.playBGM('sneak');
            }
        }
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
        
        const asset = this.phase === 'defeated' ? 'hit' : (!this.isGrounded ? 'jump' : this.animation) + (this.playerAggro && this.animation !== 'attack' ? '_aggro' : '');
        const offset = new Vector2(['sleep', 'walk', 'jump', 'walk_aggro', 'jump_aggro', 'hit'].includes(asset) ? 26 : asset === 'attack' ? 64 : 12, asset === 'attack' ? 36 : 11);
        const spd = ['sleep', 'walk'].includes(asset) ? 16 : ['walk_aggro'].includes(asset) ? 8 : asset === 'attack' ? 4 : 1;
        const frame = ['sleep', 'walk', 'walk_aggro'].includes(asset) ? 4 : asset === 'attack' ? 9 : 1;
        const xSize = asset === 'attack' ? 160 : ['sleep', 'walk', 'jump', 'walk_aggro', 'hit'].includes(asset) ? 64 : ['jump_aggro'].includes(asset) ? 80 : 48;

        const xOffset = (Math.floor(this.animationFrame / spd) % frame) * xSize;
        cx.drawImage(game.assets.images[`sp_aqua_${asset}`],
            xOffset, 0, xSize, asset === 'attack' ? 96 : 48,
            -offset.x, -offset.y, xSize, asset === 'attack' ? 96 : 48);
        cx.restore();
    }
}