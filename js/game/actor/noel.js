class Noel extends Flare {
    maxHealth = 16;

    lastPoses = [];
    slidePower = 5;

    item = false;
    doubleJump = false;
    hasBow = false;

    noelAttack = 0;

    canWallJump = false;

    constructor(game, pos, size) {
        super(game, pos, size);

        this.health = this.maxHealth;
        if (game.saveData.getItem('nuinui-save-item-boots')) this.canWallJump = true;
    }

    update = game => {
        const keys = this.playerControl ? game.keys : game.cpuKeys;
        const movement = this.moto || this.isSliding || (this.attackCooldown && this.isGrounded) || this.slideJump || keys.left === keys.right ? 0 : this.runSpeed * (keys.right ? 1 : -1);

        this.wasSliding = false;
        // DEBUG
        // if (keys.up) this.pos = new Vector2(115 * 16, 56 * 16);
        // if (keys.up) this.pos = new Vector2(45 * 16, 44 * 16);

        const sceneCollistions = [...game.scene.currentSection.collisions];
        if (game.scene.actors.find(a => a instanceof FubuzillaBody && a.type !== 2 )) sceneCollistions.push(...game.scene.actors.filter(a => a instanceof FubuzillaBody && a.type !== 2 ));

        if (this.frameCount > 1 && this.playerControl && CollisionBox.intersectingCollisionBoxes(this, sceneCollistions.filter(a => !a.tmp && !(a instanceof FubuzillaBody))).length) this.die(game);
        else if (CollisionBox.intersectingCollisionBoxes(this, sceneCollistions.filter(a => a.tmp)).length) {
            const bloc = sceneCollistions.filter(a => a.tmp).find(a => CollisionBox.intersects(this, a));
            if (bloc.bwall) {
                this.pos.x--;
            } else this.pos.y = bloc.pos.y + 8 > this.pos.y + this.size.y * .5 ? bloc.pos.y - this.size.y : bloc.pos.y + 16;
        }

        // if (this.isSleeping && Object.values(keys).some(key => key)) this.isSleeping = false;
        const wasGrounded = this.isGrounded;
        this.isGrounded = sceneCollistions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        
        let ceilObstacle = sceneCollistions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));
        
        if (!this.jetski && !this.moto && !this.isSliding && !this.slideBuffer && this.isGrounded && keys.a && keys.down) {
            this.vel.x = this.slidePower * (this.dir ? 1 : -1);
            this.isSliding = true;
            this.slideBuffer = true;
            this.pos.y += 16;
            this.size.y = 16;
            game.scene.particles.run(this, this.dir);
            game.playSound('dash');
        } else {
            if ((!this.isSliding && !keys.a) || (this.isSliding && this.slideBuffer && !keys.a)) {
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

        if (this.slideJump && (this.isGrounded || !this.vel.x)) this.slideJump = false;

        let wallJump = null;
        if (this.canWallJump && !this.isGrounded && this.vel.y > 1) {
            const wallJumpCollision = {pos:{x:this.pos.x, y:this.pos.y + this.size.y * .5}, size:{x:this.size.x, y:this.size.y * .5}};
            wallJump = sceneCollistions.find(c => CollisionBox.collidesWithInAxis(wallJumpCollision, c, 'x') && CollisionBox.intersectsInAxis(wallJumpCollision, c, 'y'));
            if (wallJump && wallJump.size.y !== 16) wallJump = null;
            if (wallJump && this.vel.y > 2) {
                this.vel.y -= .5;
                game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x * (this.dir ? 1 : 0), this.size.y)), new Vector2(0, 0), 0);
            }
        }

        // Jump
        this.isJumping = false;
        if (this.jumpBuffer && !keys.a) this.jumpBuffer = false;
        if (((this.isGrounded && !this.vel.y) || (this.doubleJump && !this.doubleJumpBuffer) || wallJump) && keys.a && !this.jumpBuffer && !this.slideBuffer && !ceilObstacle && !(keys.down && this.slideBuffer)) {
            if (!this.isGrounded) this.doubleJumpBuffer = true;
            this.jumpPower = (this.isGrounded ? this.jumpSpeed : 2);
            this.jumpBuffer = true;
            this.isJumping = true;
            this.jumpInput = true;
            if (game.scene.achievement3) game.scene.achievement3 = false;
            if (this.isSliding) {
                this.wasSliding = true;
                this.isSliding = false;
                this.slideJump = true;
                this.vel.x = (this.slidePower) * (this.dir ? 1 : -1);
                this.pos.y -= 16;
                this.size.y = 32;
            }
            if (wallJump) {
                game.playSound('land');
                this.vel.x = (this.dir ? -1 : 1) * 4;
                this.dir = !this.dir;
                game.scene.particles.ray(CollisionBox.center(wallJump));
                game.scene.particles.impact(CollisionBox.center(wallJump));
            }
        }

        if (this.jumpInput && keys.a) {
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

        if ((this.isSliding || this.slideJump) && keys.left !== keys.right) this.vel.x = Math.abs(this.vel.x) * (keys.right ? 1 : -1);

        // Direction
        const lastDir = this.dir;
        this.dir = this.attackCooldown || this.jetski || this.moto || keys.left === keys.right ? this.dir : keys.right;
        if (lastDir !== this.dir && this.slideJump) this.vel.x *= .5;

        // Velocity
        let iceVel = game.scene.iceWind ? .25 * (game.scene.iceWindDir ? 1 : -1) : 0;
        if (!(this.slideJump)) this.vel = this.vel.mult(this.isSliding ? new Vector2(0.96, 1) : this.velLoss);
        if (this.vel.x < .05 && this.vel.x > -0.05) this.vel.x = 0;
        this.vel.x = Math.round((this.vel.x + movement + iceVel) * 100) / 100;
        this.vel.y = Math.min(6, Math.round((this.vel.y + this.gravity * (this.slideJump ? 1.25 : 1)) * 100) / 100);
        if (game.scene.underwater && this.vel.y > 2) this.vel.y = 2;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, sceneCollistions).length) {
            this.pos.x = Math.round(this.pos.x);
            let i = 0;
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, sceneCollistions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
                if (i > 10) {
                    this.pos.x++;
                    break;
                }
                else i++;
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
            if (keys.b) this.chargeShotBuffer++;

            if (this.chargeShotBuffer > 30) {
                if (!(this.frameCount % 4)) game.scene.particles['charge'](CollisionBox.center(this));
            }
            if (this.chargeShotBuffer > 60) {
                if (!keys.b) {
                    keyChargeAttack = true;
                }
            }

            if (!keys.b && this.chargeShotBuffer) this.chargeShotBuffer = 0;
        }

        // Shot
        const keyAttack = keys.b || keyChargeAttack;
        if (this.attackBuffer && !keys.b) this.attackBuffer = false;
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
                mace.damage = keyChargeAttack ? 5 : 2;
                // mace.damage = 64;
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
        if (this.moto) game.scene.particles.smoke_white(this.pos.plus(new Vector2(0, this.size.y - 8)), new Vector2(-4, 0), 0);

        //hit
        const actorCollisions = game.scene.actors.filter(actor => [
            Robot, Nousabot, Nousakumo, Pekora, PekoMiniBoss, Mikobell, Casinochip, Miko, Scythe,
            Dokuro, Cannon, Pirate, Neko, Rock, Marine, Aqua, Fubuki, Fubuzilla, Miteiru, Oni, Ayame,
            Sword, Spirit, EvilNoel, Axe, Suisei, Polka, Pendulum, EvilMiko, EvilFlare, Gura, Calli, CalliScythe, Ina, Tentacle, Ame, Kiara, Fairy, Kanata, DragonHand, Bibi, BibiFire, Towa]
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
        if (this.moto) newAnimation = 'moto';

        if (newAnimation && !this.animationLocked && newAnimation !== this.animation) this.setAnimation(newAnimation);
        else this.animationFrame++;

        if (this.vel.y > 0) this.jumpPower = 0;

        if (game.scene.underwater && !(this.frameCount % 32)) game.scene.particles.bubble(this.pos.plus(new Vector2(Math.random() * 6 - 3 + (this.dir ? this.size.x : 0), 8)), new Vector2(0, -.5 - Math.random() * .5), 1);

        this.lastMovement = movement;
        if (this.noelAttack) this.noelAttack--;
        if (this.invicibility) this.invicibility--;
        if (this.focusCooldown && !game.scene.isFocus) this.focusCooldown--;

        if (!(this.frameCount % 3)) {
            if (this.animation === 'slide' || (this.slideJump)) this.lastPoses.push({ frameCount: this.frameCount, animationFrame: this.animationFrame, animation: this.animation, pos: this.pos.value(), size: this.size.value(), dir: this.dir });
        }
        this.lastPoses = this.lastPoses.filter(lastPos => this.frameCount - lastPos.frameCount < 12);

        this.openMenu(game);
        this.frameCount++;
    }

    takeHit = (game, other) => {
        if (this.isSliding || (other instanceof Robot && other.sleep) || (other instanceof EvilNoel && other.isTrueEnd)) return;
        
        if (!this.playerControl) return;

        if (this.moto) {
            const event = game.scene.events.find(e => e.speed);
            event.speed = Math.max(2.5, event.speed - .05);
        }

        if (!this.invicibility) {
            if (game.scene.achievement1) game.scene.achievement1 = false;
            if (game.scene.achievement25) game.scene.achievement25 = false;
            if (game.scene.achievement5 && other instanceof Scythe) game.scene.achievement5 = false;

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
                if (this.isGrounded && this.jetski) {
                    cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 4) * (180 / Math.PI))));
                }
                if (this.moto) {
                    cx.translate(0, Math.floor(this.frameCount / 4) % 2);
                    if (!this.isGrounded) cx.rotate(this.vel.y * .05);
                }
                this.playAnimation(game, cx, noelData);
                cx.restore();
            }
        });
    }
}