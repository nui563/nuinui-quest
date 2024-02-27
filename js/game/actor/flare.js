class Flare extends Actor {
    vel = new Vector2(0, 0);
    runSpeed = .35;
    jumpSpeed = 2.4;
    slidePower = 4;
    velLoss = new Vector2(0.8, 1);
    gravity = .3;
    dir = true;

    isPersistent = true;

    focusCooldownTime = 6 * 60;
    focusCooldown = 0;
    focusTime = 6 * 60;

    playerControl = false;

    isGrounded = true;

    jumpInput = false;
    jumpPower = 0;

    hasBow = false;
    item = false;
    doubleJump = false;
    canWallJump = false;

    chargeShot = true;
    chargeShotBuffer = 0;
    chargeTypeBuffer = false;
    chargeTypeBufferAnim = 0;
    chargeTypeList = [];
    chargeTypeData = {
        fire: {
            xVel: 5,
            particle: 'charge_fire',
            offset: 0
        },
        rocket: {
            xVel: 2,
            particle: 'charge_fire_2',
            offset: 1
        },
        petal: {
            xVel: 3,
            particle: 'charge_fire_3',
            offset: 2
        },
        sword: {
            xVel: 2.5,
            particle: 'charge_fire_4',
            offset: 3
        },
        shield: {
            particle: 'charge',
            offset: 4
        },
        dual: {
            particle: 'charge',
            offset: 5
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
        sit: {
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
        attack: {
            offset: new Vector2(-42, -5),
            size: new Vector2(64, 40),
            speed: 1,
            frames: 1
        },
        aerial: {
            offset: new Vector2(-42, -5),
            size: new Vector2(64, 40),
            speed: 1,
            frames: 1
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
        },
        moto: {
            offset: new Vector2(-16, -16),
            size: new Vector2(48, 48),
            speed: 1,
            frames: 1
        },
        hit: {
            offset: new Vector2(-10, -6),
            size: new Vector2(32, 40),
            speed: 1,
            frames: 1
        },
        back: {
            offset: new Vector2(-24, -6),
            size: new Vector2(44, 40),
            speed: 1,
            frames: 1
        }
    }

    constructor(game, pos, size) {
        super(pos, size);

        this.health = this.maxHealth;
        this.chargeType = 0;

        if (game.mode !== 'cursed' && game.saveData.getItem('nuinui-save-item-gun')) this.weapon = 'gun';
        if (game.mode === 'cursed' && game.saveData.getItem('nuinui-save-item-bow')) this.weapon = 'bow';
        if (this.weapon) this.hasBow = true;

        this.chargeTypeList = [];
        ['fire', 'rocket', 'petal', 'sword', 'shield', 'dual'].forEach(item => {
            if (game.saveData.getItem(`nuinui-save-item-${item}`)) this.chargeTypeList.push(item);
        });

        if (game.saveData.getItem('nuinui-save-item-clock')) this.item = true;
        if (game.saveData.getItem('nuinui-save-item-jump')) this.doubleJump = true;
        if (game.saveData.getItem('nuinui-save-item-boots')) this.canWallJump = true;
    }

    openMenu = game => {
        if (this.playerControl && game.keys.start) {
            game.playSound('select');
            game.menu = new Item(game);
        }
    }

    update = game => {
        const keys = this.playerControl ? game.keys : game.cpuKeys;
        const movement = this.moto || this.isSliding || keys.left === keys.right ? 0 : this.runSpeed * (keys.right ? 1 : -1);

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
        
        if (!this.moto && !this.jetski && !this.isSliding && !this.slideBuffer && this.isGrounded && ((keys.a && keys.down) || keys.d)) {
            this.vel.x = this.slidePower * (this.dir ? 1 : -1);
            this.isSliding = true;
            this.slideBuffer = true;
            this.pos.y += 16;
            this.size.y = 16;
            game.scene.particles.run(this, this.dir);
            game.playSound('dash');
        } else {
            if ((!this.isSliding && !keys.a && !keys.d) || (this.isSliding && this.slideBuffer && !keys.a && !keys.d)) {
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
        if (this.jumpBuffer && !keys.a && !keys.d) this.jumpBuffer = false;
        if (((this.isGrounded && !this.vel.y) || (this.doubleJump && !this.doubleJumpBuffer) || (wallJump)) && (keys.a || keys.d) && !this.jumpBuffer && !this.slideBuffer && !ceilObstacle && !(keys.down && this.slideBuffer)) {
            if (!this.isGrounded) this.doubleJumpBuffer = true;
            this.jumpPower = this.isGrounded ? this.jumpSpeed : 2;
            this.jumpBuffer = true;
            this.isJumping = true;
            this.jumpInput = true;
            if (game.scene.achievement3) game.scene.achievement3 = false;
            if (this.isSliding) {
                this.isSliding = false;
                this.vel.x += this.jumpSpeed * 2 * (this.dir ? 1 : -1);
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

        if (this.jumpInput && (keys.a || keys.d)) {
            if (this.doubleJumpBuffer) {
                this.vel.y = -this.jumpPower * 2;
                this.jumpInput = false;
            }
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
            } else if (!this.moto && !this.jetski) {
                game.playSound('land');
                game.scene.particles.land(this, 0);
            }
            this.doubleJumpBuffer = false;
        }

        if (this.isSliding && keys.left !== keys.right) this.vel.x = Math.abs(this.vel.x) * (keys.right ? 1 : -1);

        // Direction
        this.dir = this.jetski || this.moto || keys.left === keys.right ? this.dir : keys.right;

        // Velocity
        let iceVel = game.scene.iceWind ? .25 * (game.scene.iceWindDir ? 1 : -1) : 0;
        this.vel = this.vel.mult(this.isSliding ? new Vector2(0.96, 1) : this.velLoss);
        if (this.vel.x < .05 && this.vel.x > -0.05) this.vel.x = 0;
        this.vel.x = Math.round((this.vel.x + movement + iceVel) * 100) / 100;
        this.vel.y = Math.min(6, Math.round((this.vel.y + this.gravity) * 100) / 100);
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

        if (this.isGrounded && !this.isSliding && !this.jetski && !this.moto && movement && this.vel.x && !this.vel.y) {
            if (movement !== this.lastMovement) game.scene.particles.run(this, this.dir);
            else if (this.animationFrame % 16 === 15) {
                game.playSound('step');
                game.scene.particles.step(this);
            }
        }
        if (this.isJumping && this.vel.y && !this.jetski && !wallJump) game.scene.particles.jump(this);

        // Charge type
        if (!this.moto && !this.jetski && (keys.l !== keys.r) && !this.chargeTypeBuffer) {
            this.chargeType += keys.l ? -1 : 1;
            if (this.chargeType < 0) this.chargeType = this.chargeTypeList.length - 1;
            if (this.chargeType === this.chargeTypeList.length) this.chargeType = 0;
            this.chargeTypeBuffer = true;
            this.chargeTypeBufferAnim = 60;
        }
        if (!keys.l && !keys.r && this.chargeTypeBuffer) this.chargeTypeBuffer = false;
        if (this.chargeTypeBufferAnim) this.chargeTypeBufferAnim--;

        // Charge shot
        let keyChargeAttack = false;
        if (this.chargeShot && !this.moto && !this.jetski) {
            if (keys.b) this.chargeShotBuffer++;

            if (this.chargeShotBuffer > 30) {
                if (!(this.frameCount % 4)) game.scene.particles[this.chargeTypeData[this.chargeTypeList[this.chargeType]].particle](CollisionBox.center(this));
            }
            if (this.chargeShotBuffer > 45) {
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
        const isAttacking = this.hasBow && keyAttack && (this.jetski || !this.attackBuffer) && !this.attackCooldown && !this.isSliding;
        if (isAttacking) {
            if (keyChargeAttack && this.chargeTypeList[this.chargeType] === 'dual') {
                const dual = new Arrow(
                    this.pos,
                    new Vector2(64, 32),
                    new Vector2(0, 0),
                    'dual',
                    this
                );
                dual.isPersistent = true;
                dual.dir = this.dir;
                game.scene.actors.push(dual);
            } else if (keyChargeAttack && this.chargeTypeList[this.chargeType] === 'shield') {
                game.scene.actors = game.scene.actors.filter(a => !(a instanceof IceShield && a.originActor === this));
                const shieldCount = 6;
                for (let i = 0; i < shieldCount; i++) {
                    game.scene.actors.push(new IceShield(CollisionBox.center(this), (Math.PI * 2 / shieldCount) * i, this));
                }
            }
            else if (keyChargeAttack && this.chargeTypeList[this.chargeType] === 'petal') {
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
                    const motoVel = this.jetski ? 1 : this.vel.x * .5;
                    game.scene.actors.push(new Arrow(
                        this.pos.plus(new Vector2(this.moto ? this.size.x : -16, 22)),
                        new Vector2(20, 7),
                        new Vector2(xVel * motoVel * (this.dir ? 1 : -1), Math.cos(this.frameCount * 2) * .5),
                        'bullet',
                        this
                    ));
                    game.scene.actors.push(new Arrow(
                        this.pos.plus(new Vector2(this.moto ? this.size.x : -16, 22)),
                        new Vector2(20, 7),
                        new Vector2(xVel * motoVel * (this.dir ? 1 : -1), -Math.cos(this.frameCount * 2) * .5),
                        'bullet',
                        this
                    ));
                } else if (this.moto) {
                    const bullet = new Arrow(
                        this.pos.plus(new Vector2(this.moto ? this.size.x : -16, 16)),
                        new Vector2(20, 7),
                        new Vector2(0, 0),
                        'rocket',
                        this
                    );
                    bullet.vel.x = this.vel.x + 2;
                    game.scene.actors.push(bullet);
                } else {
                    if(this.weapon !== 'bow') this.gunshotBuffer = !this.gunshotBuffer;
                    const arrow = new Arrow(
                        this.pos.plus(new Vector2(this.weapon === 'gun' ? 8 * (this.dir ? 1 : -1) : 0, this.weapon === 'gun' && this.gunshotBuffer ? 12 : 8)),
                        new Vector2(20, 7),
                        new Vector2(xVel * (this.dir ? 1 : -1) * (this.weapon === 'gun' ? 1.1 : 1), 0),
                        keyChargeAttack ? this.chargeTypeList[this.chargeType] : null,
                        this
                    );
                    game.scene.actors.push(arrow);
                }
            }
            if (this.chargeTypeList[this.chargeType] !== 'dual' || !keyChargeAttack) game.playSound(this.jetski || this.moto ? "pew" : this.weapon === 'bow' ? "throw" : 'gun');
            this.attackBuffer = true;
            this.attackCooldown = keyChargeAttack ? 36 : this.jetski ? 9 : this.weapon === 'gun' ? 9 : 12;
            this.attackCooldownAnim = 12;
            this.animationFrameGun = 0;
        }

        if (this.jetski && this.isGrounded && !(this.frameCount % 6) && game.currentStage === 2) game.scene.particles.water_trail(this);
        if (this.jetski && game.currentStage === 2) game.scene.particles.smoke_white(this.pos.plus(new Vector2(this.size.x, this.size.y - 8)), new Vector2(4, 0), 0);
        if (this.moto) game.scene.particles.smoke_white(this.pos.plus(new Vector2(0, this.size.y - 8)), new Vector2(-4, 0), 0);

        //hit
        const actorCollisions = game.scene.actors.filter(actor => [
            Robot, Nousabot, Nousakumo, Pekora, PekoMiniBoss, Mikobell, Casinochip, Miko, Scythe,
            Dokuro, Cannon, Pirate, Neko, Rock, Marine, Aqua, Fubuki, Fubuzilla, Miteiru, Oni, Ayame,
            Sword, Spirit, EvilNoel, Axe, Suisei, Polka, Pendulum, EvilMiko, Gura, Calli, CalliScythe, Ina, Tentacle, Ame, Kiara, Fairy, Kanata, DragonHand, Bibi, BibiFire, Towa]
            .some(e => actor instanceof e) && actor.checkHit(game, this));
        if (actorCollisions.length) actorCollisions.forEach(collision => this.takeHit(game, collision));

        if (this.deathTransitionPhase) {
            if (!game.scene.bossKillEffect) this.deathTransition(game);
        }
        
        if (this.isEvil || this.weapon === 'bow') {
            if (game.currentStage === 3 && random() > .95) this.shakeBuffer = 2;
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(random() * 16 - 8, random() * 32 - 16)), new Vector2(random() - .5, random() * -2), 0);
            }
        }

        if (game.scene.underwater && !(this.frameCount % 32)) game.scene.particles.bubble(this.pos.plus(new Vector2(random() * 6 - 3 + (this.dir ? this.size.x : 0), 8)), new Vector2(0, -.5 - random() * .5), 1);

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
        if (this.moto) newAnimation = 'moto';

        if (this.animation === 'run_attack') this.animationFrameGun++;
        if (newAnimation && !this.animationLocked && newAnimation !== this.animation) this.setAnimation(newAnimation);
        else this.animationFrame++;

        if (this.vel.y > 0) this.jumpPower = 0;

        this.lastMovement = movement;
        if (this.invicibility) this.invicibility--;
        if (this.focusCooldown && !game.scene.isFocus) this.focusCooldown--;

        this.openMenu(game);
        this.frameCount++;
    }

    die = game => {
        game.canvas1.style.filter = 'none';
        game.canvas2.style.filter = 'none';
        game.stopBGM();
        game.scene.nextScene = new Scene(game, game.data.game.stages[game.currentStage]);
    }

    takeHit = (game, other) => {
        if (this.isSliding || (other instanceof Robot && other.sleep) || (other instanceof EvilNoel && other.isTrueEnd)) return;
        
        if (!this.playerControl || other.invicibility) return;
        
        if (this.moto) {
            const event = game.scene.events.find(e => e.speed);
            event.speed = Math.max(2.5, event.speed - .05);
        }

        if (!this.invicibility && !this.deathTransitionPhase) {
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

        if ((!this.health || game.mode === 'cursed') && !this.deathTransitionPhase) {
            if (game.scene.actors.find(a => a instanceof EvilNoel)) {
                this.deathTransitionPhase = true;
                this.invicibility = 0;
                this.playerControl = false;
                this.setAnimation('hit');
                this.animationLocked = true;
                game.playSound('cling');
                game.scene.bossKillEffect = 60;
                game.scene.isFocus = 0;
                game.scene.blackout = false;
                this.vel.y = -6;
                game.stopBGM();
            }
            else this.die(game);
        }
    }

    deathTransition = game => {
        game.saveData.setItem('nuinui-save-stage-5', true);
        game.menu = new StageSelect(game, true);

        game.checkpoint = null;

        const noelTimer = new Date().getTime() - game.scene.noelTime;
        if (noelTimer >= 60000) {
            game.saveData.setItem('nuinui-save-achievement-15', true);
        }

        const time = new Date().getTime() - game.timer.getTime();
        if (time <= 420000) {
            game.saveData.setItem('nuinui-save-achievement-16', true);
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

        if (!['sleep', 'wakeup', 'back'].includes(this.animation)) {
            const velX = this.animation === 'run' && !this.vel.x ? 2 : this.vel.x;
            const side = Math.round(velX) || [this.weapon, `${this.weapon}_fall`, `${this.weapon}_jump`, 'moto'].includes(this.animation);
            const spd = Math.round(16 / (1 + Math.abs(velX)));
            const fallOffset = (this.vel.y > this.gravity ? -2 : 0);
            cx.drawImage(game.assets.images['sp_ponytail'],
                (Math.floor(this.animationFrame / spd) % 3) * 24, side ? 24 : 0, 24, 24,
                this.jetski || this.moto ? -14 : side ? -18 + (this.isSliding ? 4 : 0) : -14, 2 + fallOffset, 24, 24);
            
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

        if (this.animation === 'back') cx.translate(16, 0);

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
        if (this.chargeShotBuffer > 45 && Math.floor(this.frameCount / 4) % 2) cx.filter = 'brightness(2)';
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        if (this.isGrounded && this.jetski) {
            cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 4) * (180 / Math.PI))));
        }
        if (this.moto) {
            cx.translate(0, Math.floor(this.frameCount / 4) % 2);
            if (!this.isGrounded) cx.rotate(this.vel.y * .05);
        }
        this.playAnimation(game, cx);
        if ((this.jetski || (this.moto && this.attackCooldown)) && this.attackBuffer) {
            cx.drawImage(game.assets.images['vfx_rapid_fire'], 24 * (Math.floor(this.frameCount / 2) % 2), 0, 24, 24, 24, 12, 24, 24);
        }
        cx.restore();
    }
}