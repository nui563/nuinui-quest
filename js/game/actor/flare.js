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

    hasBow = true;
    item = false;

    chargeShot = true;
    chargeShotBuffer = 0;
    chargeTypeBuffer = false;
    chargeTypeBufferAnim = 0;
    chargeTypeList = [];
    chargeTypeData = {
        fire: {
            xVel: 5,
            particle: 'charge_fire'
        },
        rocket: {
            xVel: 2,
            particle: 'charge_fire_2'
        },
        petal: {
            xVel: 3,
            particle: 'charge_fire_3'
        },
        sword: {
            xVel: 2.5,
            particle: 'charge_fire_4'
        }
    }

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
        run_attack: {
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
        gun: {
            offset: new Vector2(-9, -6),
            size: new Vector2(40, 40),
            speed: .25,
            frames: 3
        },
        gun_jump: {
            offset: new Vector2(-9, -6),
            size: new Vector2(40, 40),
            speed: .25,
            frames: 3
        },
        gun_fall: {
            offset: new Vector2(-9, -6),
            size: new Vector2(40, 40),
            speed: .25,
            frames: 3
        },
        slide: {
            offset: new Vector2(0, -11),
            size: new Vector2(32, 32),
            speed: 1,
            frames: 1
        },
        jetski: {
            offset: new Vector2(-8, -8),
            size: new Vector2(32, 40),
            speed: 1,
            frames: 1
        }
    }

    constructor(pos, size) {
        super(pos, size);

        this.health = this.maxHealth;
        this.chargeType = 0;

        const elems = Array.from(document.getElementsByClassName('item-selected'));
        if (elems.length) this.weapon = elems[0].id === 'save-item-1' ? 'bow' : 'gun';
        else if (localStorage.getItem('nuinui-save-item-gun')) this.weapon = 'gun';
        else if (localStorage.getItem('nuinui-save-item-bow')) this.weapon = 'bow';
        else this.hasBow = false;
        this.updateSkills();
        if (localStorage.getItem('nuinui-save-item-clock')) this.item = true;
    }

    updateSkills = () => {
        this.chargeTypeList = [];
        ['fire', 'rocket', 'petal', 'sword', 'dual', 'shield'].forEach(item => {
            if (localStorage.getItem(`nuinui-save-item-${item}`)) this.chargeTypeList.push(item);
        });
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
        
        if (!this.jetski && !this.isSliding && !this.slideBuffer && this.isGrounded && keys.jump && keys.down) {
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
            if (game.scene.achievement3) game.scene.achievement3 = false;
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
            } else if (!this.jetski) {
                game.playSound('land');
                game.scene.particles.land(this);
            }
        }

        // Direction
        this.dir = this.jetski || this.isSliding || keys.left === keys.right ? this.dir : keys.right;

        // Velocity
        let iceVel = game.scene.iceWind ? .25 * (game.scene.iceWindDir ? 1 : -1) : 0;
        this.vel = this.vel.mult(this.isSliding ? new Vector2(0.96, 1) : this.velLoss);
        if (this.vel.x < .05 && this.vel.x > -0.05) this.vel.x = 0;
        this.vel.x = Math.round((this.vel.x + movement + iceVel) * 100) / 100;
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

        if (this.isGrounded && !this.isSliding && !this.jetski && movement && this.vel.x && !this.vel.y) {
            if (movement !== this.lastMovement) game.scene.particles.run(this);
            else if (this.animationFrame % 16 === 15) {
                game.playSound('step');
                game.scene.particles.step(this);
            }
        }
        if (this.isJumping && this.vel.y && !this.jetski) game.scene.particles.jump(this);

        // Charge type
        if (!this.jetski && keys.up && !this.chargeTypeBuffer) {
            this.chargeType = (this.chargeType + 1) % this.chargeTypeList.length;
            this.chargeTypeBuffer = true;
            this.chargeTypeBufferAnim = 60;
        }
        if (!keys.up && this.chargeTypeBuffer) this.chargeTypeBuffer = false;
        if (this.chargeTypeBufferAnim) this.chargeTypeBufferAnim--;

        // Charge shot
        let keyChargeAttack = false;
        if (this.chargeShot && !this.jetski) {
            if (keys.attack) this.chargeShotBuffer++;

            if (this.chargeShotBuffer > 30) {
                if (!(this.frameCount % 4)) game.scene.particles[this.chargeTypeData[this.chargeTypeList[this.chargeType]].particle](CollisionBox.center(this));
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
        const isAttacking = this.hasBow && keyAttack && (this.jetski || !this.attackBuffer) && !this.attackCooldown && !this.invicibility && !this.isSliding;
        if (isAttacking) {
            if (keyChargeAttack && this.chargeTypeList[this.chargeType] === 'petal') {
                for (let i = 0; i < 4; i++) {
                    const angle = (Math.PI / 8) * i - (1.5 * Math.PI / 8);
                    const vel = new Vector2(Math.cos(angle) * (this.dir ? 1 : -1), Math.sin(angle)).times(this.chargeTypeData[this.chargeTypeList[this.chargeType]].xVel)
                    game.scene.actors.push(new Arrow(
                        this.pos.plus(new Vector2(0, 8)),
                        new Vector2(8, 8),
                        vel,
                        'petal',
                        this
                    ));
                }
            } else {
                const xVel = !keyChargeAttack ? 5 : this.chargeTypeData[this.chargeTypeList[this.chargeType]].xVel;
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
                } else {
                    if(this.weapon !== 'bow') this.gunshotBuffer = !this.gunshotBuffer;
                    const arrow = new Arrow(
                        this.pos.plus(new Vector2(this.weapon === 'gun' ? 8 * (this.dir ? 1 : -1) : 0, this.weapon === 'gun' && this.gunshotBuffer ? 12 : 8)),
                        new Vector2(20, 7),
                        new Vector2(xVel * (this.dir ? 1 : -1) * (this.weapon === 'gun' ? 1.1 : 1), 0),
                        keyChargeAttack ? this.chargeTypeList[this.chargeType] : null,
                        this
                    );
                    if (this.weapon === 'gun' && !arrow.type) arrow.damage = .75;
                    game.scene.actors.push(arrow);
                }
            }
            game.playSound(this.jetski ? "pew" : this.weapon === 'bow' ? "bow_shoot" : 'gun');
            this.attackBuffer = true;
            this.attackCooldown = keyChargeAttack ? 36 : this.jetski ? 9 : this.weapon === 'gun' ? 9 : 12;
            this.attackCooldownAnim = 12;
            this.animationFrameGun = 0;
        }

        if (this.jetski && this.isGrounded && !(this.frameCount % 6) && game.currentStage === 2) game.scene.particles.water_trail(this);
        if (this.jetski && game.currentStage === 2) game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x, this.size.y - 8)), new Vector2(4, 0), 0);

        //hit
        const actorCollisions = game.scene.actors.filter(actor => [Robot, Nousabot, Nousakumo, Pekora, PekoMiniBoss, Mikobell, Casinochip, Miko, Scythe, Dokuro, Cannon, Pirate, Neko, Rock, Marine, Aqua, Fubuki]
            .some(e => actor instanceof e) && actor.checkHit(game, this));
        if (actorCollisions.length) actorCollisions.forEach(collision => this.takeHit(game, collision));

        let newAnimation;
        if (!this.attackCooldownAnim || this.isSliding) {
            if (this.isGrounded) {
                if (this.isSliding) newAnimation = 'slide';
                else newAnimation = keys.left !== keys.right ? 'run' : 'idle';
            }
            else newAnimation = this.vel.y <= .6 ? 'jump' : 'fall';
        } else if (isAttacking) {
            if (!this.isGrounded) newAnimation = this.vel.y > 0 ? `${this.weapon}_fall` : `${this.weapon}_jump`;
            else newAnimation = this.vel.x === 0 || this.weapon === 'bow' ? this.weapon : `run_attack`;
        }
        if (this.jetski) newAnimation = 'jetski';

        if (this.animation === 'run_attack') this.animationFrameGun++;
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
            if (game.scene.achievement2) game.scene.achievement2 = false;
            if (game.scene.achievement5) game.scene.achievement5 = false;

            game.playSound('damage');
            const damage = other.damage ? other.damage : 1;
            this.health = Math.max(0, this.health - damage);
            this.invicibility = 45;
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

        if (!this.health) {
            game.stopBGM();
            game.scene.nextScene = new StageSelect(game, null, game.currentStage);
            game.score = 0;
            game.scoreDisplay = 0;
        }
    }

    setAnimation = animation => {
        if (!(animation === 'run_attack' && this.animation === 'run') &&
            !(animation === 'run' && this.animation === 'run_attack')) this.animationFrame = 0;
        this.animation = animation;
        this.runAttackBuffer = (this.animation === 'run' && this.runAttackBuffer) || this.animation === 'run_attack';
    }

    playAnimation = (game, cx) => {
        const {offset, size, speed, frames} = this.animations[this.animation];

        if (!['sleep', 'wakeup'].includes(this.animation)) {
            const velX = this.vel.x;
            const side = Math.round(velX) || [this.weapon, `${this.weapon}_fall`, `${this.weapon}_jump`].includes(this.animation);
            const spd = Math.round(16 / (1 + Math.abs(velX)));
            const fallOffset = (this.vel.y > this.gravity ? -2 : 0);
            cx.drawImage(game.assets.images['sp_ponytail'],
                (Math.floor(this.animationFrame / spd) % 3) * 24, side ? 24 : 0, 24, 24,
                this.jetski ? -14 : side ? -18 + (this.isSliding ? 4 : 0) : -14, 2 + fallOffset, 24, 24);
            
            cx.drawImage(game.assets.images['sp_ribbon'],
                (Math.floor(this.animationFrame / spd * 1.5) % 3) * 16, side ? 16 : 0, 16, 16,
                side ? (['run', 'run_attack'].includes(this.animation) ? -14 : -9) : -8, (side ? 16 : 18) + fallOffset * 2, 16, 16);
            
            if (!['run', 'run_attack'].includes(this.animation)) {
                cx.save();
                cx.translate(this.size.x / 2, 0);
                cx.scale(-1, 1);
                cx.drawImage(game.assets.images['sp_ribbon'],
                    (Math.floor(this.animationFrame / spd * 1.5) % 3) * 16, side ? 16 : 0, 16, 16,
                    side ? (['run', 'run_attack'].includes(this.animation) ? -12 : -9) : -8, (side ? 16 : 18) + fallOffset, 16, 16);
                cx.restore();
            }
        }

        const gunOffset = ['gun', 'gun_fall', 'gun_jump'].includes(this.animation) && this.gunshotBuffer ? 40 : 0;

        const animFrame = Math.floor(this.animationFrame * speed) % frames;
        if ((this.animation === 'run_attack' && this.animationFrameGun < 12) || this.runAttackBuffer) {
            const gunSize = this.animations['gun'].size;
            const gunOffset2 = this.animations['gun'].offset.plus(new Vector2(
                [0, 1, 2, 6, 7].includes(animFrame) ? 1 : [3, 4, 8].includes(animFrame) > 3 ? 0 : 1,
                [0, 1, 2, 6, 7].includes(animFrame) ? 1 : [3, 4, 8].includes(animFrame) > 3 ? 0 : -1));
            cx.drawImage(game.assets.images[`sp_flare_gun_arms_back`],
                (Math.floor(this.animationFrameGun * this.animations['gun'].speed) % this.animations['gun'].frames) * gunSize.x, this.gunshotBuffer || (this.animation === 'run' && this.runAttackBuffer) ? 40 : 0, gunSize.x, gunSize.y,
                gunOffset2.x, gunOffset2.y, gunSize.x, gunSize.y);
        }

        const anim = this.animation === 'run' && this.runAttackBuffer ? 'run_attack' : this.animation;
        cx.drawImage(game.assets.images[`sp_flare_${anim}`], animFrame * size.x, gunOffset, size.x, size.y,
            offset.x, offset.y, size.x, size.y);
        
        if ((this.animation === 'run_attack' && this.animationFrameGun < 12) || this.runAttackBuffer) {
            const gunSize = this.animations['gun'].size;
            const gunOffset2 = this.animations['gun'].offset.plus(new Vector2(
                [0, 1, 2, 6, 7].includes(animFrame) ? -1 : [3, 4, 8].includes(animFrame) > 3 ? 0 : -1,
                [0, 1, 2, 6, 7].includes(animFrame) ? -1 : [3, 4, 8].includes(animFrame) > 3 ? 0 : 1));
            cx.drawImage(game.assets.images[`sp_flare_gun_arms`],
                (Math.floor(this.animationFrameGun * this.animations['gun'].speed) % this.animations['gun'].frames) * gunSize.x, !this.gunshotBuffer || (this.animation === 'run' && this.runAttackBuffer) ? 0 : 40, gunSize.x, gunSize.y,
                gunOffset2.x, gunOffset2.y, gunSize.x, gunSize.y);
        }
    }

    draw = (game, cx) => {
        if (this.invicibility % 2) return;
        cx.save();
        if (this.chargeShotBuffer > 60 && Math.floor(this.frameCount / 4) % 2) cx.filter = 'brightness(2)';
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        if (this.isGrounded && this.jetski) {
            cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 4) * (180 / Math.PI))));
        }
        this.playAnimation(game, cx);
        if (this.jetski && this.attackBuffer) {
            cx.drawImage(game.assets.images['vfx_rapid_fire'], 24 * (Math.floor(this.frameCount / 2) % 2), 0, 24, 24, 24, 12, 24, 24);
        }
        cx.restore();
    }
}