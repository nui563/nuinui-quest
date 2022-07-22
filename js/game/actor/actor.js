class Actor {
    frameCount = 0;

    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    update = game => this.frameCount++;

    draw = (game, cx) => {
        if (DEBUGMODE) this.displayCollisionBox(game);
    }

    checkHit = (game, collisionBox) => {
        return CollisionBox.intersects(this, collisionBox);
    }

    takeHit = game => {}
    
    dropHeart = (game, rate) => {
        if (Math.random() > rate && !(game.currentStage === 2 && game.scene.bossStarted && game.scene.actors.find(a => a instanceof Heart))) {
            game.scene.actors.push(new Heart(CollisionBox.center(this).plus(new Vector2(-4, -4))));
        }
    }

    displayAnimation = (cx, animation, asset) => {
        cx.save();
        cx.translate(this.pos.x, this.pos.y);
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(asset,
            Math.floor(this.frameCount * animation.speed) % animation.frames * animation.size.x, 0, animation.size.x, animation.size.y,
            animation.offset.x, animation.offset.y, animation.size.x, animation.size.y
        );
        cx.restore();
    }

    displayCollisionBox = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.fillStyle = "#00f8";
        cx.fillRect(0, 0, this.size.x, 1);
        cx.fillRect(0, 0, 1, this.size.y);
        cx.fillRect(this.size.x - 1, 0, 1, this.size.y);
        cx.fillRect(0, this.size.y - 1, this.size.x, 1);
        cx.fillStyle = "#00f4";
        cx.fillRect(0, 0, this.size.x, this.size.y);
        cx.restore();
    }
}

class Elfriend extends Actor {
    size = new Vector2(24, 16);

    randomFlight = Math.floor(Math.random() * 360);

    constructor(pos, dir) {
        super(pos);
        this.dir = dir;
    }

    update = game => {

        // this.pos.x += Math.sin(this.frameCount * 2 / 180 * Math.PI) / 4;
        this.pos.y += Math.cos(((this.randomFlight + this.frameCount * 2) % 360) / 180 * Math.PI) / 4;
        this.dir = game.scene.actors.find(a => a instanceof Flare).pos.x > this.pos.x;
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_elfriend_idle'], Math.floor((this.randomFlight % 2 + this.frameCount) * .2) % 2 * 24, 0, 24, 24, 0, 0, 24, 24);
        cx.restore();
    }
}

class Projectile extends Actor {
    damage = 1;

    constructor(pos, size, vel, originActor) {
        super(pos, size);
        this.vel = vel;
        this.originActor = originActor;
    }
    
    update = game => {
        this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => ![this, this.originActor].includes(actor) && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            collision = true;
        }
        else if (CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
            if (CollisionBox.intersects(this, game.scene.view)) game.playSound('no_damage');
            game.scene.particles.sparkle_white(CollisionBox.center(this));
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }

        this.frameCount++;
    }
}

class Arrow extends Projectile {
    constructor(pos, size, vel, type, originActor) {
        super(pos, size, vel, originActor);
        this.type = type;
        if (this.type === 'sword') {
            this.size.y = 20;
            this.vel.y = -6;
        }
        if (this.type === 'petal') this.dir = Math.random() > .5;
        if (this.type === 'rocket') this.order = Math.random() > .5 ? 1 : -1;
        this.damage = ['rocket', 'sword'].includes(this.type) ? 3 : ['fire'].includes(this.type) ? 2 : 1;
        if (this.type === 'bullet') {
            this.size = new Vector2(4, 4);
            this.damage = .5;
        }
    }
    
    update = game => {
        if (this.type === 'sword') this.vel.y += .2;
        this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => (!(actor instanceof Projectile) || ((this.type === 'fire' && actor instanceof Bullet && actor.originActor instanceof Fubuki) ||actor instanceof Rocket || (actor instanceof IceShield && actor.originActor !== this.originActor))) && !(actor instanceof Torche) && !(actor instanceof Heart) && !(actor instanceof ATField) && !(actor instanceof Scythe) && (![this.originActor].includes(actor) || this.reflected) && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            collision = true;
            if (this.type === 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
        }
        else if (this.type !== 'bullet' && CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
            if (this.type === 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            } else {
                game.playSound('no_damage');
                game.scene.particles.sparkle_white(CollisionBox.center(this));
            }
        }
        else if (!CollisionBox.intersects(this, game.scene.view) && !(this.type === 'sword' && this.pos.y < game.scene.view.pos.y)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }
        if (!['petal', 'bullet', 'sword'].includes(this.type)) this.vel.y = 0;

        if (this.type === 'fire' && this.frameCount % 2) game.scene.particles.sparkle_fire(CollisionBox.center(this));
        else if (this.type === 'sword' && !(this.frameCount % 4)) game.scene.particles.sparkle_fire_4(CollisionBox.center(this));
        else if (this.type === 'petal' && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_3(CollisionBox.center(this));
        else if (this.type === 'rocket') {
            if (Math.random() > .5) this.vel.y += this.order;
            else if (Math.random() > .5) this.vel.y -= this.order;
            if (!(this.frameCount % 60)) this.order = -this.order;
            game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(this.vel.x > 0 ? -4 : 4, 0)), new Vector2(0, 0), 0);
        }
        
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.vel.x < 0) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        if (this.type === 'sword') {
            cx.translate(10, 10);
            cx.rotate(Math.floor(this.frameCount * 16 / 45) * 45 * (Math.PI / 180) * (this.dir ? 1 : -1));
            cx.drawImage(game.assets.images['sp_marine_sword'], -16, -16);
        }
        else if (this.type === 'petal') {
            cx.translate(4.5, 4.5);
            cx.rotate((this.frameCount * 8) * (Math.PI / 180) * (this.dir ? 1 : -1));
            cx.drawImage(game.assets.images['sp_petal'], -4.5, -4.5);
        }
        else if (this.type === 'bullet') {
            cx.drawImage(game.assets.images['sp_bullet'], Math.floor(this.frameCount / 4) % 2 ? 0 : 8, 0, 8, 8, -2, -2, 8, 8);
        }
        else if (this.type === 'rocket') {
            cx.drawImage(game.assets.images['sp_peko_rocket'], 4, -4);
        } else {
            cx.drawImage(game.assets.images['sp_arrow'], this.type === 'fire' ? 20 : 0, 0, 20, 10, 0, 0, 20, 10);
        }
        cx.restore();
    }
}

class Bullet extends Projectile {

    constructor(pos, vel, originActor) {
        super(pos, new Vector2(4, 4), vel, originActor);
        if (originActor instanceof Fubuki) {
            this.size = new Vector2(16, 16);
            this.iceSpike = true;
            this.health = 1;
        }
        else if (originActor instanceof Miko && vel.y !== 0) {
            this.petal = true;
            this.dir = Math.random() > .5;
        }
        else if (this.originActor instanceof Marine) {
            this.size = new Vector2(20, 20);
            this.dir = Math.random() > .5;
            // this.damage = 2;
        }
    }
    
    takeHit = (game, other) => {
        if (!(this.originActor instanceof Fubuki)) return;
        if (other instanceof Arrow && other.type === 'fire') this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.shakeBuffer = 4;
            this.dropHeart(game, .7);
            game.playSound('damage');
            game.score += 50;
        } else {
            game.score += 10;
            game.playSound('damage');
        }
    }

    update = game => {
        if ([Dokuro, Marine].some(a => this.originActor instanceof a)) this.vel.y += .1;
        if (!this.iceSpike || this.frameCount > 60) this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => actor instanceof Flare && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            collision = true;
        }
        else if (!(this.originActor instanceof Marine) && CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
            // game.playSound('no_damage');
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }
        
        if (this.petal && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_3(CollisionBox.center(this));
        if (this.originActor instanceof Marine && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_4(CollisionBox.center(this));
        if (this.iceSpike && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_2(CollisionBox.center(this), 0);

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.iceSpike) {
            cx.translate(8, 8);
            cx.rotate(this.angle + Math.PI * .75);
            cx.drawImage(game.assets.images['sp_ice_spike'], -12, -12);
        }
        else if (this.originActor instanceof Marine) {
            cx.translate(10, 10);
            cx.rotate(Math.floor(this.frameCount * 16 / 45) * 45 * (Math.PI / 180) * (this.dir ? 1 : -1));
            cx.drawImage(game.assets.images['sp_marine_sword'], -16, -16);
        }
        else if (this.petal) {
            cx.translate(3, 3);
            cx.rotate((this.frameCount * 8) * (Math.PI / 180) * (this.dir ? 1 : -1));
            cx.drawImage(game.assets.images['sp_petal'], 0, 0, 9, 9, -3, -3, 9, 9);
        } else cx.drawImage(game.assets.images['sp_bullet'], Math.floor(this.frameCount / 4) % 2 ? 0 : 8, 0, 8, 8, -2, -2, 8, 8);
        cx.restore();
    }
}

class IceShield extends Projectile {

    constructor(pos, rotationOffset, originActor) {
        super(pos, new Vector2(12, 12), new Vector2(0, 0), originActor);
        this.rotationOffset = rotationOffset;
    }

    takeHit = (game, other) => {
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);

        game.playSound("no_damage");
        game.scene.actors = game.scene.actors.filter(a => a !== this);
        game.score += 100;
    }

    update = game => {
        if (!this.iceSpike || this.frameCount > 60) this.pos = this.pos.plus(this.vel);

        this.pos = CollisionBox.center(this.originActor).plus(new Vector2(Math.cos(this.frameCount / 16 + this.rotationOffset) * 24 - this.size.x / 2, Math.sin(this.frameCount / 16 + this.rotationOffset) * 24 - this.size.y / 2));

        let collision = false;
        const enemyCollisions = game.scene.actors.filter(actor => (actor instanceof Flare || actor instanceof Arrow) && actor.checkHit(game, this));
        const playerCollisions = game.scene.actors.filter(actor => (!(actor instanceof Projectile) || actor instanceof Rocket) && !(actor instanceof Torche) && !(actor instanceof Heart) && !(actor instanceof Scythe) && ![this.originActor].includes(actor) && actor.checkHit(game, this));
        const actorCollisions = this.originActor instanceof Flare ? playerCollisions : enemyCollisions;
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            collision = true;
        }

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.playSound('no_damage');
        }
        
        if (!(this.frameCount % 8)) game.scene.particles.sparkle_fire_2(CollisionBox.center(this), 0);

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_ice_shield'], -3, -3);
        cx.restore();
    }
}

class Rocket extends Projectile {

    constructor(pos, vel, originActor) {
        super(pos, new Vector2(8, 8), vel, originActor);
    }

    health = 2;
    damage = 2;

    takeHit = (game, other) => {
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);

        if (this.health) {
            this.shakeBuffer = 15;
            game.playSound('hit');
            game.score += 10;
        } else {
            if (other.type !== 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
            game.scene.actors = game.scene.actors.filter(a => a !== this);
            this.dropHeart(game, .7);
            game.score += 100;
        }
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        const p1 = CollisionBox.center(flare);
        const p2 = CollisionBox.center(this);
        this.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
        const vel = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(-1);
        if (Math.random() > .5) vel.y -= .5;

        this.pos = this.pos.plus(vel);
        game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(this.vel.x > 0 ? -4 : 4, 0)), new Vector2(0, 0), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => actor instanceof Flare && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            collision = true;
        }
        else if (CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            collision = true;
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            if (!actorCollisions.some(a => a instanceof Arrow && a.type === 'rocket')) {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
            this.dropHeart(game, .9);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x + 4), Math.round(this.pos.y + 4));
        cx.rotate(this.angle - Math.PI)
        cx.drawImage(game.assets.images['sp_peko_rocket'], -8, -8);
        cx.restore();
    }
}

class Aircon extends Actor {

    constructor(pos, dir) {
        super(new Vector2(pos.x * 16, pos.y * 16), new Vector2(32, 4 * 16));
        this.dir = dir === undefined ? 0 : dir;
    }

    checkHit = (game, collisionBox) => {
        return false;
    }

    update = game => {
        if (Math.random() > .75) {
            game.scene.particles.shine_vel_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, 16)), new Vector2(this.dir, -3), 1);
        }
        const actors = game.scene.actors.filter(actor => ![this].includes(actor) && actor.checkHit(game, this));
        actors.forEach(actor => {
            if ((actor instanceof Arrow && ['petal', 'bullet'].includes(actor.type)) || actor instanceof Bullet || (actor instanceof Aqua && !actor.playerAggro)) return;
            if (this.dir) actor.vel.x = Math.min(8, Math.max(-8, actor.vel.x + 6 * this.dir));
            actor.vel.y = Math.max(-8, this.dir ? actor.vel.y - 1 : actor.vel.y - 1.5);
        });
        this.frameCount++;
    }
    
    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_aircon'], 0, this.size.y - 16);
        cx.restore();
    }
}

class Torche extends Actor {
    size = new Vector2(16, 24);
    active = false;

    constructor(pos) {
        super(new Vector2(pos.x * 16, pos.y * 16));
    }

    update = game => {
        const actorCollisions = game.scene.actors.filter(actor => actor instanceof Arrow && actor.type === 'fire' && actor.checkHit(game, this));
        if (!this.active && actorCollisions.length) {
            game.scene.shakeBuffer = 4;
            game.playSound("noise");
            this.active = true;
            game.score += 10;
        }
        if (this.active && !(this.frameCount % 4)) game.scene.particles.sparkle_fire(CollisionBox.center(this), new Vector2(0, -.5));
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (!this.dir) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        cx.drawImage(game.assets.images['sp_elfriend_idle'], Math.floor((this.randomFlight % 2 + this.frameCount) * .2) % 2 * 24, 0, 24, 24, 0, 0, 24, 24);
        cx.restore();
    }
}