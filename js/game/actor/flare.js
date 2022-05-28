class Flare extends Actor {
    vel = new Vector2(0, 0);
    runSpeed = .35;
    jumpSpeed = 2.4;
    slidePower = 4;
    velLoss = new Vector2(0.8, 1);
    gravity = .3;
    dir = true;

    focusCooldownTime = 6 * 60;
    focusCooldown = 0;
    focusTime = 6 * 60;

    playerControl = false;

    isGrounded = true;

    jumpInput = false;
    jumpPower = 0;

    hasBow = false;
    item = false;

    maxHealth = 16;

    // Flare animations
    animations = {
        idle: {
            offset: new Vector2(-8, -6),
            size: new Vector2(32, 40),
            speed: 1,
            frames: 1
        },
        look: {
            offset: new Vector2(-8, -6),
            size: new Vector2(32, 40),
            speed: 1,
            frames: 1
        },
        sleep: {
            offset: new Vector2(-8, 3),
            size: new Vector2(40, 32),
            speed: .04,
            frames: 4
        },
        wakeup: {
            offset: new Vector2(-8, 3),
            size: new Vector2(40, 32),
            speed: .1,
            frames: 4
        },
        run: {
            offset: new Vector2(-30, -18),
            size: new Vector2(64, 64),
            speed: .3,
            frames: 10
        },
        jump: {
            offset: new Vector2(-10, -6),
            size: new Vector2(32, 40),
            speed: 1,
            frames: 1
        },
        fall: {
            offset: new Vector2(-10, -6),
            size: new Vector2(32, 40),
            speed: 1,
            frames: 1
        },
        wink: {
            offset: new Vector2(-5, -6),
            size: new Vector2(32, 40),
            speed: .1,
            frames: 4
        },
        bow: {
            offset: new Vector2(-9, -6),
            size: new Vector2(32, 40),
            speed: .25,
            frames: 3
        },
        bow_jump: {
            offset: new Vector2(-9, -6),
            size: new Vector2(32, 40),
            speed: .25,
            frames: 3
        },
        bow_fall: {
            offset: new Vector2(-9, -6),
            size: new Vector2(32, 40),
            speed: .25,
            frames: 3
        },
        slide: {
            offset: new Vector2(0, -11),
            size: new Vector2(32, 32),
            speed: 1,
            frames: 1
        }
    }

    constructor(pos, size) {
        super(pos, size);

        this.health = this.maxHealth;
    }

    update = game => {
        const keys = this.playerControl ? game.keys : game.cpuKeys;
        const movement = this.isSliding || keys.left === keys.right ? 0 : this.runSpeed * (keys.right ? 1 : -1);

        // if (this.isSleeping && Object.values(keys).some(key => key)) this.isSleeping = false;
        const wasGrounded = this.isGrounded;
        this.isGrounded = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        
        let ceilObstacle = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        
        if (!this.isSliding && !this.slideBuffer && this.isGrounded && keys.jump && keys.down) {
            this.vel.x = this.slidePower * (this.dir ? 1 : -1);
            this.isSliding = true;
            this.slideBuffer = true;
            this.pos.y += 16;
            this.size.y = 16;
            game.scene.particles.run(this);
            game.playSound('dash');
        } else {
            if ((!this.isSliding && !keys.jump) || (this.isSliding && this.slideBuffer && !keys.jump)) {
                this.slideBuffer = false;
            }
            if (this.isSliding && (!this.isGrounded || Math.abs(this.vel.x) < 1.73)) {
                if (this.isGrounded && ceilObstacle) {
                    this.vel.x += 1 * (this.dir ? 1 : -1);
                } else {
                    this.isSliding = false;
                    this.size.y = 32;
                    if (!this.isGrounded !== !ceilObstacle) this.pos.y -= 16;
                    else {
                        this.pos.y = this.pos.round(16).y;
                        while (CollisionBox.intersectingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
                            this.pos.y--;
                        }
                    }
                }
            }
        }
        
        this.isGrounded = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        ceilObstacle = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));

        // Jump
        this.isJumping = false;
        if (this.jumpBuffer && !keys.jump) this.jumpBuffer = false;
        if (this.isGrounded && keys.jump && !this.jumpBuffer && !this.vel.y && !this.slideBuffer && !ceilObstacle && !(keys.down && this.slideBuffer)) {
            this.jumpPower = this.jumpSpeed;
            this.jumpBuffer = true;
            this.isJumping = true;
            this.jumpInput = true;
            if (this.isSliding) {
                this.isSliding = false;
                this.pos.y -= 16;
                this.size.y = 32;
            }
        }

        if (this.jumpInput && keys.jump) {
            this.vel.y -= this.jumpPower;
            this.jumpPower /= 1.5;
        }
        else {
            this.jumpInput = false;
        }

        // Land (landbuffer for event teleportation)
        if (!wasGrounded && this.isGrounded) {
            if (this.landBuffer) {
                this.landBuffer = false;
            } else {
                game.playSound('land');
                game.scene.particles.land(this);
            }
        }

        // Direction
        this.dir = this.isSliding || keys.left === keys.right ? this.dir : keys.right;

        // Velocity
        this.vel = this.vel.mult(this.isSliding ? new Vector2(0.96, 1) : this.velLoss);
        if (this.vel.x < .05 && this.vel.x > -0.05) this.vel.x = 0;
        this.vel.x = Math.round((this.vel.x + movement) * 100) / 100;
        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            if (this.isSliding) {
                this.isSliding = false;
                this.pos.y -= 16;
                this.size.y = 32;
            }
            this.vel.x = 0;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            this.vel.y = 0;
        }
        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;

        if (this.isGrounded && !this.isSliding && movement && this.vel.x && !this.vel.y) {
            if (movement !== this.lastMovement) game.scene.particles.run(this);
            else if (this.animationFrame % 16 === 15) {
                game.playSound('step');
                game.scene.particles.step(this);
            }
        }
        if (this.isJumping && this.vel.y) game.scene.particles.jump(this);

        if (this.attackBuffer && !keys.attack) this.attackBuffer = false;
        if (this.attackCooldown) this.attackCooldown--;
        const isAttacking = this.hasBow && keys.attack && !this.attackBuffer && !this.attackCooldown && !this.invicibility && !this.isSliding;
        if (isAttacking) {
            game.scene.actors.push(new Arrow(this.pos.plus(new Vector2(0, 8)), new Vector2(20, 7), new Vector2(5 * (this.dir ? 1 : -1), 0), this));
            game.playSound("bow_shoot");
            this.attackBuffer = true;
            this.attackCooldown = 12;
        }

        //hit
        const actorCollisions = game.scene.actors.filter(actor => [Robot, Nousabot, Nousakumo, Pekora, PekoMiniBoss, Mikobell, Casinochip, Miko, Scythe].some(e => actor instanceof e) && actor.checkHit(game, this));
        if (actorCollisions.length) actorCollisions.forEach(collision => this.takeHit(game, collision));

        let newAnimation;
        if (!this.attackCooldown) {
            if (this.isGrounded) {
                if (this.isSliding) newAnimation = 'slide';
                else newAnimation = Math.abs(this.vel.x) < this.runSpeed ? 'idle' : 'run';
            }
            else newAnimation = this.vel.y <= .6 ? 'jump' : 'fall';
        } else if (isAttacking) {
            if (!this.isGrounded) newAnimation = this.vel.y > 0 ? 'bow_fall' : 'bow_jump';
            else newAnimation = 'bow';
        }

        if (newAnimation && !this.animationLocked && newAnimation !== this.animation) this.setAnimation(newAnimation);
        else this.animationFrame++;

        if (this.vel.y > 0) this.jumpPower = 0;

        this.lastMovement = movement;
        if (this.invicibility) this.invicibility--;
        if (this.focusCooldown && !game.scene.isFocus) this.focusCooldown--;

        this.frameCount++;
    }

    takeHit = (game, other) => {
        if (!this.invicibility) {
            game.playSound('damage');
            const damage = 1;
            this.health = Math.max(0, this.health - damage);
            this.invicibility = 30;
            game.scene.shakeBuffer = 8;
            if (other instanceof Scythe) {
                game.scene.particles.ray(other.checkHit(game, this).pos);
                game.scene.particles.impact(other.checkHit(game, this).pos);
            } else {
                game.scene.particles.ray(this.checkHit(game, other).pos);
                game.scene.particles.impact(this.checkHit(game, other).pos);
            }
            this.vel.x += (this.dir ? -1 : 1) * 4;
            if (this.vel.y > -2) this.vel.y -= 2;
        }

        if (!this.health) {
            game.stopBGM();
            game.scene.nextScene = new StageSelect(game, null, game.currentStage);
        }
    }

    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    playAnimation = (game, cx) => {
        const {offset, size, speed, frames} = this.animations[this.animation];

        if (!['sleep', 'wakeup'].includes(this.animation)) {
            const velX = this.vel.x;
            const side = Math.round(velX) || ['bow', 'bow_fall', 'bow_jump'].includes(this.animation);
            const spd = Math.round(16 / (1 + Math.abs(velX)));
            const fallOffset = (this.vel.y > this.gravity ? -2 : 0);
            cx.drawImage(game.assets.images['sp_ponytail'],
                (Math.floor(this.animationFrame / spd) % 3) * 24, side ? 24 : 0, 24, 24,
                side ? -18 + (this.isSliding ? 4 : 0) : -14, 2 + fallOffset, 24, 24);
            
            cx.drawImage(game.assets.images['sp_ribbon'],
                (Math.floor(this.animationFrame / spd * 1.5) % 3) * 16, side ? 16 : 0, 16, 16,
                side ? (this.animation === 'run' ? -14 : -9) : -8, (side ? 16 : 18) + fallOffset * 2, 16, 16);
            
            if (this.animation !== 'run') {
                cx.save();
                cx.translate(this.size.x / 2, 0);
                cx.scale(-1, 1);
                cx.drawImage(game.assets.images['sp_ribbon'],
                    (Math.floor(this.animationFrame / spd * 1.5) % 3) * 16, side ? 16 : 0, 16, 16,
                    side ? (this.animation === 'run' ? -12 : -9) : -8, (side ? 16 : 18) + fallOffset, 16, 16);
                cx.restore();
            }
        }

        cx.drawImage(game.assets.images[`sp_flare_${this.animation}`], (Math.floor(this.animationFrame * speed) % frames) * size.x, 0, size.x, size.y,
            offset.x, offset.y, size.x, size.y);
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
        this.playAnimation(game, cx);
        // else if (this.isGrounded) {
        //     if (Math.abs(this.vel.x) < this.runSpeed) {
        //         cx.drawImage(game.assets.images['player_idle'], 0, 0, 32, 40, -8, -6, 32, 40);
        //     } else {
        //         if (!(this.frameCount % 16)) game.playSound('step');
        //         cx.drawImage(game.assets.images['player_run'], Math.floor(this.frameCount * .3) % 10 * 64, 0, 64, 64, -30, -18, 64, 64);
        //     }
        // } else {
        //     cx.drawImage(game.assets.images['player_jump'], this.vel.y < 0 ? 0 : 32, 0, 32, 40, -10, -6, 32, 40);
        // }

        cx.restore();
    }
}