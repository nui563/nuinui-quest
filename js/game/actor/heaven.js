class Fairy extends Actor {
    size = new Vector2(16, 16);
    vel = new Vector2(0, 0);

    maxHealth = 5;

    constructor(pos, type) {
        super();
        this.pos = new Vector2(pos.x, pos.y).times(16);
        this.health = this.maxHealth;
        this.type = type;
        this.randomBuffer = random();
    }
    
    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }

    takeHit = (game, other) => {
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            this.dropHeart(game, .7);
            game.playSound('hit');
        } else {
            game.playSound('damage');
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        // if (this.vel.y) this.vel.y += this.gravity;
        // this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI)) / 2;
        // this.vel.y = Math.sin((this.frameCount / 2048) * (180 / Math.PI)) / 2;

        if (!this.moveBuffer && CollisionBox.intersects(this, game.scene.view)) {
            this.moveBuffer = 120;
            
            if ((random() < .5 || this.frameCount < 120) && CollisionBox.intersects(this, game.scene.view)) {
                const rand = random() < .5;
                for (let i = 0; i < 8; i++) {
                    const angle = i * (Math.PI / 4) + (rand ? 0 : Math.PI / 8);
                    const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
                    game.scene.actors.push(new Bullet(CollisionBox.center(this), vel, this));
                }
                if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
            } else {
                const p1 = CollisionBox.center(this);
                const p2 = CollisionBox.center(flare);
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + random() * .5 - .25;
                this.vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
                game.playSound('wind');
            }
        } else {
            this.vel = this.vel.times(.975);
            if (!(this.frameCount % 15)) game.scene.particles.sparkle_white(CollisionBox.center(this), new Vector2(0, 0), 0);
        }
        
        // for (let i = 0; i < 2; i++) {
        //     const dist = .5;
        //     const a = Math.cos(random() * 2 * Math.PI);
        //     const b = Math.sin(random() * 2 * Math.PI);
        // }

        // Collisions
        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + this.vel.x, this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.x = Math.round(this.pos.x);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x + Math.sign(this.vel.x), this.pos.y), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.x = this.pos.x + Math.sign(this.vel.x);
            }
            this.vel.x = 0;
        }
        this.pos.x = Math.round((this.pos.x + this.vel.x) * 100) / 100;

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

        // Attack
        // if ([63, 95, 127].includes(this.frameCount % 128) && CollisionBox.intersects(this, game.scene.view)) {
        //     const p1 = CollisionBox.center(this);
        //     const p2 = CollisionBox.center(flare);
        //     if (p1.distance(p2) < 192 && p1.y - 32 < p2.y) {
        //         const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + random() * 0.125 - 0.0625;
        //         const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(2);
        //         game.scene.actors.push(new Bullet(p1, vel, this));
        //         if (CollisionBox.intersects(this, game.scene.view)) game.playSound("pew");
        //     }
        // }

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        this.frameCount++;
        if (this.moveBuffer) this.moveBuffer--;
        if (this.scrollFilter && this.pos.x >= 41 * 16) this.toFilter = true;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x + this.size.x * .5), Math.round(this.pos.y + this.size.y * .5 + 2 * Math.sin(Math.floor(this.frameCount * .125))));
        cx.save();

        cx.rotate(Math.round(this.vel.x * 2) * .125);

        const angle = 15 * Math.sin(Math.floor(this.frameCount / 8) + this.randomBuffer * 4) * (Math.PI / 180);
        for (let i = 0; i < 2; i++) {
            cx.save();
            if (i) cx.scale(-1, 1);
            cx.translate(-4, 0);
            cx.rotate(angle);
            cx.drawImage(game.assets.images['sp_fairy'], 32, this.type ? 32 : 0, 20, 11, -16, -6, 20, 11);
            cx.restore();
        }

        if (!this.dir) cx.scale(-1, 1);
        
        if (this.type) {
            cx.save();
            cx.rotate(-.25 + Math.sin(this.frameCount * .05) * .25);
            cx.drawImage(game.assets.images['sp_fairy'], 32, 32 + 11, 15, 15, -22, 0, 15, 15);
            cx.restore();
        }
        cx.drawImage(game.assets.images['sp_fairy'], 0, this.type ? 32 : 0, 32, 32, -16, -16, 32, 32);
        cx.restore();
        if (!this.dir) cx.scale(-1, 1);
        if (!this.type) {
            cx.drawImage(game.assets.images['sp_fairy'], 32, 11, 15, 15, 0, -20 + 2 * Math.sin(this.frameCount * .05), 15, 15);
        }
        cx.restore();
    }
}