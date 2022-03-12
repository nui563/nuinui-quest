class Flare extends Actor {
    vel = new Vector2(0, 0);
    runSpeed = .35;
    jumpSpeed = 5;
    velLoss = new Vector2(0.8, 1);
    gravity = .2;
    dir = true;

    playerControl = false;

    isGrounded = true;

    hasBow = false;

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
        }
    }

    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        const keys = this.playerControl ? game.keys : game.cpuKeys;
        const movement = keys.left === keys.right ? 0 : this.runSpeed * (keys.right ? 1 : -1);

        // if (this.isSleeping && Object.values(keys).some(key => key)) this.isSleeping = false;

        const wasGrounded = this.isGrounded;
        this.isGrounded = game.scene.currentSection.collisions.find(collision => 
            CollisionBox.collidesWithInAxis({pos:{x:this.pos.x,y:this.pos.y+this.size.y},size:{x:this.size.x,y:0}}, collision, 'y') &&
            CollisionBox.intersectsInAxis(this, collision, 'x'));

        // Jump
        this.isJumping = false;
        if (this.jumpBuffer && !keys.jump) this.jumpBuffer = false; 
        if (this.isGrounded && keys.jump && !this.jumpBuffer && !this.vel.y) {
            this.vel.y = -this.jumpSpeed;
            this.jumpBuffer = true;
            this.isJumping = true;
        }

        // Land
        if (!wasGrounded && this.isGrounded) {
            game.playSound('land');
            game.scene.particles.land(this);
        }

        // Direction
        this.dir = keys.left === keys.right ? this.dir : keys.right;

        // Velocity
        this.vel = this.vel.mult(this.velLoss);
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

        if (this.isGrounded && movement && this.vel.x && !this.vel.y) {
            if (movement !== this.lastMovement) game.scene.particles.run(this);
            else if (this.animationFrame % 16 === 15) {
                game.playSound('step');
                game.scene.particles.step(this);
            }
        }
        if (this.isJumping && this.vel.y) game.scene.particles.jump(this);

        if (DEBUGMODE) console.log(this.pos.x, this.pos.y);

        if (this.attackBuffer && !keys.attack) this.attackBuffer = false;
        if (this.attackCooldown) this.attackCooldown--;
        const isAttacking = this.hasBow && keys.attack && !this.attackBuffer && !this.attackCooldown;
        if (isAttacking) {
            game.scene.actors.push(new Arrow(this.pos.plus(new Vector2(0, 10)), new Vector2(20, 7), new Vector2(5 * (this.dir ? 1 : -1), 0), this));
            game.playSound("bow_shoot");
            this.attackBuffer = true;
            this.attackCooldown = 12;
        }

        let newAnimation;
        if (!this.attackCooldown) {
            if (this.isGrounded) newAnimation = Math.abs(this.vel.x) < this.runSpeed ? 'idle' : 'run';
            else newAnimation = this.vel.y < 0 ? 'jump' : 'fall';
        } else if (isAttacking) newAnimation = 'bow';

        if (newAnimation && !this.animationLocked && newAnimation !== this.animation) this.setAnimation(newAnimation);
        else this.animationFrame++;

        this.lastMovement = movement;

        this.frameCount++;
    }

    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    playAnimation = (game, cx) => {
        const {offset, size, speed, frames} = this.animations[this.animation];
        cx.drawImage(game.assets.images[`sp_flare_${this.animation}`], (Math.floor(this.animationFrame * speed) % frames) * size.x, 0, size.x, size.y,
            offset.x, offset.y, size.x, size.y);
    }

    draw = (game, cx) => {
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

        if (DEBUGMODE) this.displayCollisionBox(game);
    }
}