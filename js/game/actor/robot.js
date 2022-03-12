class Robot extends Actor {
    vel = new Vector2(0, 0);
    runSpeed = .6;
    jumpSpeed = 4;
    velLoss = new Vector2(0.75, 1);
    gravity = .15;
    dir = true;

    isGrounded;

    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {

        const keys = {};
        const movement = keys.left === keys.right ? 0 : this.runSpeed * (keys.right ? 1 : -1);

        this.isGrounded = CollisionBox.collidingCollisionBoxes(this, [game.scene.platform]).length;
        // Jump
        if (this.isGrounded && keys.jump) {
            this.vel.y = -this.jumpSpeed;
        }

        // Direction
        this.dir = keys.left === keys.right ? this.dir : keys.right;

        // Velocity
        this.vel = this.vel.mult(this.velLoss);
        this.vel.x += movement;
        this.vel.y += this.gravity;
        this.vel = new Vector2(Math.abs(this.vel.x) < 0.01 ? 0 : this.vel.x, Math.abs(this.vel.y) < 0.01 ? 0 : this.vel.y);
        
        // Position correction
        const newPos = this.pos.plus(this.vel);
        const obstacles = CollisionBox.intersectingCollisionBoxes({ pos:newPos, size:this.size }, [game.scene.platform]);
        obstacles.forEach(obstacle => {
            const xCollision = CollisionBox.intersects({ pos:this.pos.plus(new Vector2(this.vel.x, 0)), size:this.size }, obstacle);
            const yCollision = CollisionBox.intersects({ pos:this.pos.plus(new Vector2(0, this.vel.y)), size:this.size }, obstacle);
            if (xCollision) {
                newPos.x += (this.vel.x > 0 ? -(newPos.x + this.size.x - obstacle.pos.x) : obstacle.pos.x + obstacle.size.x - newPos.x) % obstacle.size.x;
                this.vel.x = 0;
            }
            if (yCollision) {
                newPos.y += (this.vel.y > 0 ? -(newPos.y + this.size.y - obstacle.pos.y) : obstacle.pos.y + obstacle.size.y - newPos.y) % obstacle.size.y;
                if (this.pos.y < obstacle.pos.y && this.vel.y > this.gravity) this.land = true;
                this.vel.y = 0;
            }
        });
        this.pos = newPos;

        this.frameCount++;
    }

    draw = game => {
        const cx = game.ctx1;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        // cx.drawImage(asset,
        //     Math.floor(this.frameCount * animation.speed) % animation.frames * animation.size.x, 0, animation.size.x, animation.size.y,
        //     animation.offset.x, animation.offset.y, animation.size.x, animation.size.y
        // );

        if (this.isGrounded) {
            if (Math.abs(this.vel.x) < this.runSpeed) {
                game.ctx1.drawImage(game.assets.images['robot_idle'], 0, 0, 48, 48, -13, -8, 48, 48);
            } else {
                // game.ctx1.drawImage(game.assets.images['player_run'], Math.floor(this.frameCount * .3) % 10 * 64, 0, 64, 64, -30, -20, 64, 64);
            }
        } else {
            // game.ctx1.drawImage(game.assets.images['player_jump'], this.vel.y < 0 ? 0 : 24, 0, 24, 40, -8, -8, 24, 40);
        }

        cx.restore();

        if (DEBUGMODE) this.displayCollisionBox(game);
    }
}