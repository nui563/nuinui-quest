class Noel extends Flare {
    maxHealth = 16;

    lastPoses = [];
    slidePower = 5;

    item = false;
    doubleJump = false;
    hasBow = false;

    noelAttack = 0;

    constructor(pos, size) {
        super(pos, size);

        this.health = this.maxHealth;
    }

    update = game => {
        const keys = this.playerControl ? game.keys : game.cpuKeys;
        const movement = this.isSliding || (this.attackCooldown && this.isGrounded) || this.slideJump || keys.left === keys.right ? 0 : this.runSpeed * (keys.right ? 1 : -1);

        this.wasSliding = false;
        // DEBUG
        // if (keys.up) this.pos = new Vector2(115 * 16, 56 * 16);
        // if (keys.up) this.pos = new Vector2(45 * 16, 44 * 16);

        const sceneCollistions = [...game.scene.currentSection.collisions];
        if (game.scene.actors.find(a => a instanceof FubuzillaBody && a.type !== 2 )) sceneCollistions.push(...game.scene.actors.filter(a => a instanceof FubuzillaBody && a.type !== 2 ));

        if (this.frameCount > 1 && this.playerControl && CollisionBox.intersectingCollisionBoxes(this, sceneCollistions.filter(a => !(a instanceof FubuzillaBody))).length) this.die(game);

        // if (this.isSleeping && Object.values(keys).some(key => key)) this.isSleeping = false;
        const wasGrounded = this.isGrounded;
        this.isGrounded = sceneCollistions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        
        let ceilObstacle = sceneCollistions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        
        if (!this.jetski && !this.isSliding && !this.slideBuffer && this.isGrounded && keys.jump && keys.down) {
            this.vel.x = this.slidePower * (this.dir ? 1 : -1);
            this.isSliding = true;
            this.slideBuffer = true;
            this.pos.y += 16;
            this.size.y = 16;
            game.scene.particles.run(this, this.dir);
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
                        while (CollisionBox.intersectingCollisionBoxes(this, sceneCollistions).length) {
                            this.pos.y--;
                        }
                    }
                }
            }
        }
        
        this.isGrounded = sceneCollistions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        ceilObstacle = sceneCollistions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));

        if (this.slideJump && this.isGrounded) this.slideJump = false;

        // Jump
        this.isJumping = false;
        if (this.jumpBuffer && !keys.jump) this.jumpBuffer = false;
        if (((this.isGrounded && !this.vel.y) || (this.doubleJump && !this.doubleJumpBuffer)) && keys.jump && !this.jumpBuffer && !this.slideBuffer && !ceilObstacle && !(keys.down && this.slideBuffer)) {
            if (!this.isGrounded) this.doubleJumpBuffer = true;
            this.jumpPower = (this.isGrounded ? this.jumpSpeed : 2);
            this.jumpBuffer = true;
            this.isJumping = true;
            this.jumpInput = true;
            if (this.isSliding) {
                this.wasSliding = true;
                this.isSliding = false;
                this.slideJump = true;
                this.vel.x = (this.slidePower) * (this.dir ? 1 : -1);
                this.pos.y -= 16;
                this.size.y = 32;
            }
        }

        if (this.jumpInput && keys.jump) {
            if (this.doubleJumpBuffer) {
                this.vel.y = -this.jumpPower * 2;
                this.jumpInput = false;
            }
            this.vel.y -= this.jumpPower;
            this.jumpPower /=  1.5;
        }
        else {
            this.jumpInput = false;
        }

        // Land (landbuffer for event teleportation)
        if (!wasGrounded && this.isGrounded) {
            if (this.landBuffer) {
                this.landBuffer = false;
            } else if (!this.jetski) {
                game.playSound('land');
                game.scene.particles.land(this, 0);
            }
            this.doubleJumpBuffer = false;
        }

        if (this.isSliding && keys.left !== keys.right) this.vel.x = Math.abs(this.vel.x) * (keys.right ? 1 : -1);

        // Direction
        const lastDir = this.dir;
        this.dir = this.attackCooldown || this.jetski || keys.left === keys.right ? this.dir : keys.right;
        if (lastDir !== this.dir && this.slideJump) this.slideJump = false;

        // Velocity
        let iceVel = game.scene.iceWind ? .25 * (game.scene.iceWindDir ? 1 : -1) : 0;
        if (!(this.slideJump)) this.vel = this.vel.mult(this.isSliding ? new Vector2(0.96, 1) : this.velLoss);
        if (this.vel.x < .05 && this.vel.x > -0.05) this.vel.x = 0;
        this.vel.x = Math.round((this.vel.x + movement + iceVel) * 100) / 100;
        this.vel.y = Math.round((this.vel.y + this.gravity * (this.slideJump ? 1.25 : 1)) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, sceneCollistions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, sceneCollistions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            if (this.isSliding) {
                this.wasSliding = true;
                this.isSliding = false;
                this.pos.y -= 16;
                this.size.y = 32;
            }
            this.vel.x = 0;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, sceneCollistions).length) {
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, sceneCollistions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            this.vel.y = 0;
        }
        this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;

        if (this.isGrounded && !this.attackCooldown && !this.isSliding && !this.jetski && movement && this.vel.x && !this.vel.y) {
            if (movement !== this.lastMovement) game.scene.particles.run(this, this.dir);
            else if (this.animationFrame % 16 === 15) {
                game.playSound('step');
                game.scene.particles.step(this);
            }
        }
        if (this.isJumping && this.vel.y && !this.jetski) game.scene.particles.jump(this);

        // Charge attack
        let keyChargeAttack = false;
        if (this.chargeShot && !this.jetski) {
            if (keys.attack) this.chargeShotBuffer++;

            if (this.chargeShotBuffer > 30) {
                if (!(this.frameCount % 4)) game.scene.particles['charge'](CollisionBox.center(this));
            }
            if (this.chargeShotBuffer > 60) {
                if (!keys.attack) {
                    keyChargeAttack = true;
                }
            }

            if (!keys.attack && this.chargeShotBuffer) this.chargeShotBuffer = 0;
        }

        // Shot
        const keyAttack = keys.attack || keyChargeAttack;
        if (this.attackBuffer && !keys.attack) this.attackBuffer = false;
        if (this.attackCooldown) this.attackCooldown--;
        if (this.attackCooldownAnim) this.attackCooldownAnim--;
        const isAttacking = keyAttack && !this.attackBuffer && !this.attackCooldown && !this.isSliding;
        if (isAttacking) {
            const xVel = 5;
            if (this.jetski) {
                game.scene.actors.push(new Arrow(
                    this.pos.plus(new Vector2(-16, 22)),
                    new Vector2(20, 7),
                    new Vector2(xVel * (this.dir ? 1 : -1), Math.cos(this.frameCount * 2) * .5),
                    'bullet',
                    this
                ));
                game.scene.actors.push(new Arrow(
                    this.pos.plus(new Vector2(-16, 22)),
                    new Vector2(20, 7),
                    new Vector2(xVel * (this.dir ? 1 : -1), -Math.cos(this.frameCount * 2) * .5),
                    'bullet',
                    this
                ));
                game.scene.actors.push(new Arrow(
                    this.pos.plus(new Vector2(-16, 22)),
                    new Vector2(20, 7),
                    new Vector2(xVel * (this.dir ? 1 : -1), Math.cos(this.frameCount * 2) * .25),
                    'bullet',
                    this
                ));
                game.scene.actors.push(new Arrow(
                    this.pos.plus(new Vector2(-16, 22)),
                    new Vector2(20, 7),
                    new Vector2(xVel * (this.dir ? 1 : -1), -Math.cos(this.frameCount * 2) * .25),
                    'bullet',
                    this
                ));
                game.playSound('pew');
                this.attackCooldown = 9;
                this.attackCooldownAnim = 12;
            } else {
                this.noelAttack = !this.noelAttack ? 32 : 0;
                this.noelAttackAnim = this.noelAttack;
                if (this.isGrounded && Math.abs(this.vel.x) < 4) {
                    this.vel.x = 4 * (keys.left === keys.right ? 0 : keys.right && this.dir ? 1 : keys.left && !this.dir ? -1 : 0);
                }
                const mace = new Arrow(
                    CollisionBox.center(this).plus(new Vector2(this.dir ? 0 : -56, -16)),
                    new Vector2(56, 32),
                    new Vector2(0, 0),
                    'mace',
                    this
                );
                mace.damage = keyChargeAttack ? 4 : 2;
                mace.isPersistent = true;
                game.scene.actors.push(mace);
    
                game.playSound('bow_shoot');
                game.scene.particles.mace(CollisionBox.center(this).plus(new Vector2(16 * (this.dir ? 1 : -1), 0)), this.dir, this.noelAttack !== 0);
                this.attackCooldown = keyChargeAttack ? 12 : 24;
                this.attackCooldownAnim = 24;
            }
            this.attackBuffer = true;
            this.animationFrameGun = 0;
        }

        if (this.jetski && this.isGrounded && !(this.frameCount % 6) && game.currentStage === 2) game.scene.particles.water_trail(this);
        if (this.jetski && game.currentStage === 2) game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x, this.size.y - 8)), new Vector2(4, 0), 0);

        //hit
        const actorCollisions = game.scene.actors.filter(actor => [
            Robot, Nousabot, Nousakumo, Pekora, PekoMiniBoss, Mikobell, Casinochip, Miko, Scythe,
            Dokuro, Cannon, Pirate, Neko, Rock, Marine, Aqua, Fubuki, Fubuzilla, Miteiru, Oni, Ayame, Sword, Spirit, EvilNoel, Axe, Suisei, Polka, Pendulum, EvilMiko, EvilFlare]
            .some(e => actor instanceof e) && actor.checkHit(game, this));
        if (actorCollisions.length) actorCollisions.forEach(collision => this.takeHit(game, collision));

        let newAnimation;
        if (!this.attackCooldownAnim || this.isSliding) {
            if (this.isGrounded) {
                if (this.isSliding || this.wasSliding) newAnimation = 'slide';
                else newAnimation = keys.left !== keys.right ? 'run' : 'idle';
            }
            else newAnimation = this.vel.y <= .6 ? 'jump' : 'fall';
        } else if (isAttacking) newAnimation = this.isGrounded ? 'attack' : 'aerial';

        if (this.jetski) newAnimation = 'jetski';

        if (newAnimation && !this.animationLocked && newAnimation !== this.animation) this.setAnimation(newAnimation);
        else this.animationFrame++;

        if (this.vel.y > 0) this.jumpPower = 0;

        this.lastMovement = movement;
        if (this.noelAttack) this.noelAttack--;
        if (this.invicibility) this.invicibility--;
        if (this.focusCooldown && !game.scene.isFocus) this.focusCooldown--;

        if (!(this.frameCount % 3)) {
            if (this.animation === 'slide' || (this.slideJump)) this.lastPoses.push({ frameCount: this.frameCount, animationFrame: this.animationFrame, animation: this.animation, pos: this.pos.value(), size: this.size.value(), dir: this.dir });
        }
        this.lastPoses = this.lastPoses.filter(lastPos => this.frameCount - lastPos.frameCount < 12);

        this.frameCount++;
    }

    die = game => {
        game.stopBGM();
        game.scene.nextScene = new StageSelect(game, null, game.currentStage);
        game.score = 0;
        game.scoreDisplay = 0;
    }

    takeHit = (game, other) => {
        if (this.isSliding || (other instanceof Robot && other.sleep) || (other instanceof EvilNoel && other.isTrueEnd)) return;
        
        if (!this.invicibility) {
            if (other.originActor instanceof Cannon && game.currentStage === 4) game.playSound('question');
            else game.playSound('damage');
            const damage = other.damage ? other.damage : 1;
            if (!(other.originActor instanceof Cannon && game.currentStage === 4)) {
                this.health = Math.max(0, this.health - damage);
                this.invicibility = 45;
            }
            this.chargeShotBuffer = 0;
            game.scene.shakeBuffer = 8;
            if (other instanceof Scythe || other instanceof Pirate || (other instanceof Aqua && other.playerAggro && !other.vel.x)) {
                game.scene.particles.ray(other.checkHit(game, this).pos);
                game.scene.particles.impact(other.checkHit(game, this).pos);
            } else {
                game.scene.particles.ray(this.checkHit(game, other).pos);
                game.scene.particles.impact(this.checkHit(game, other).pos);
            }
            this.vel.x += (this.dir ? -1 : 1) * 4;
            if (this.vel.y > -2) this.vel.y -= 2;
        }

        if (!this.health) this.die(game);
    }

    setAnimation = animation => {
        this.animationFrame = 0;
        this.lastAnimation = this.animation;
        this.animation = animation;
    }

    playAnimation = (game, cx, data) => {
        const {offset, size, speed, frames} = this.animations[data.animation];
        const anim = data.animation === 'run' && this.runAttackBuffer ? 'run_attack' : data.animation;
        const animFrame = Math.floor(data.animationFrame * speed) % frames;
        if (!game.assets.images[`sp_noel_${anim}`]) return;
        cx.drawImage(game.assets.images[`sp_noel_${anim}`], (animFrame + ((anim === 'attack' || anim === 'aerial') && this.noelAttackAnim ? 1 : 0)) * size.x, 0, size.x, size.y,
            offset.x, offset.y, size.x, size.y);
    }

    draw = (game, cx) => {
        [...this.lastPoses, this].forEach((noelData, i) => {
            const isNoel = noelData === this;
            if (!isNoel || !(this.invicibility % 2)) {
                cx.save();
                if (!isNoel) cx.globalAlpha = (i+1) / 2;
                if (isNoel && this.chargeShotBuffer > 60 && Math.floor(this.frameCount / 4) % 2) cx.filter = 'brightness(2)';
                cx.translate(Math.round(noelData.pos.x), Math.round(noelData.pos.y));
                if (!noelData.dir) {
                    cx.translate(noelData.size.x / 2, 0);
                    cx.scale(-1, 1);
                    cx.translate(-noelData.size.x / 2, 0);
                }
                this.playAnimation(game, cx, noelData);
                cx.restore();
            }
        });
    }
}