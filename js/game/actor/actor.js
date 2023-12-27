import { Vector2, CollisionBox, angleLerp } from '../../lib/gameEngine.js';
import { Flare } from './flare.js';
import { Heart } from './drop.js';
import { ATField } from './yamato.js';
import { Demon, ShirakenHelper } from './demon.js';
import { Fubuzilla, Miteiru, Oni, Spirit } from './yamato.js';
import { Robot, Nousabot, Nousakumo } from './falls.js';
import { Pekora } from './pekora.js';
import { PekoMiniBoss } from './pekoMiniBoss.js';
import { Mikobell, Casinochip, Scythe } from './casino.js';
import { Miko } from './miko.js';
import { Dokuro, Cannon, Pirate, Neko, Rock } from './portcity.js';
import { Marine } from './marine.js';
import { Aqua } from './aqua.js';
import { Fubuki } from './fubuki.js';
import { Ayame, Sword } from './ayame.js';
import { EvilNoel } from './evilNoel.js';
import { Axe, Pendulum } from './westa.js';
import { Suisei } from './suisei.js';
import { Card, Polka } from './polka.js';
import { EvilMiko } from './evilMiko.js';
import { Gura } from './gura.js';
import { Calli, CalliScythe } from './calli.js';
import { Ina, Tentacle } from './ina.js';
import { Ame } from './ame.js';
import { Kiara } from './kiara.js';
import { Fairy } from './heaven.js';
import { Kanata } from './kanata.js';
import { Dragon, DragonHand } from './dragon.js';
import { Bibi, BibiFire, Towa } from './towa.js';
import { EvilFlare } from './evilFlare.js';
import { Noel } from './noel.js';

class Actor {
    frameCount = 0;

    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    update = game => this.frameCount++;

    draw(game, cx) {
        if (globalThis.DEBUGMODE) this.displayCollisionBox(game, cx);
    }

    checkHit(game, collisionBox) {
        return CollisionBox.intersects(this, collisionBox);
    }

    takeHit = game => {}
    
    dropHeart(game, rate) {
        if (Math.random() > rate && !(game.currentStage === 2 && game.scene.bossStarted && game.scene.actors.find(a => a instanceof Heart))) {
            game.scene.actors.push(new Heart(CollisionBox.center(this).plus(new Vector2(-4, -4))));
        }
    }

    displayAnimation(cx, animation, asset) {
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

    displayCollisionBox(game, cx) {
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
    
    update(game) {
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
        if (this.type === 'petal') {
            this.dir = Math.random() > .5;
            this.angle = Math.atan2(this.vel.y, this.vel.x);
        }
        if (this.type === 'rocket') this.order = Math.random() > .5 ? 1 : -1;
        if (this.type !== 'mace') this.damage = ['dual'].includes(this.type) ? 2 : ['rocket'].includes(this.type) ? 5 : ['sword'].includes(this.type) ? 4 : ['fire'].includes(this.type) ? 3 : 1;
        if (this.type === 'mace2') this.damage = 48;
        if (this.type === 'bullet') {
            this.size = new Vector2(4, 4);
        }
        // this.damage = 64;
    }
    
    update = game => {
        if (this.type === 'dual') {
            if (!(this.frameCount % 20)) game.playSound('slash');
            this.dir = this.originActor.dir;
            this.pos = CollisionBox.center(this.originActor).plus(new Vector2(this.dir ? 0 : -this.size.x, -16));
        }
        if (this.kanataBuffer) {
            this.vel.x *= .5;
            this.vel.y = this.kanataBuffer * .2;
            this.kanataBuffer++;
        }
        if (this.type === 'sword' || this.type === 'mace2') this.vel.y += .2;
        this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        let collision = false;
        const actorCollisions = game.scene.actors.filter(actor => (!(actor instanceof Projectile) || ((this.type === 'fire' && actor instanceof Bullet && actor.iceSpike) ||actor instanceof Rocket || actor.orb || (actor instanceof IceShield && actor.originActor !== this.originActor))) && !(actor instanceof Torche) && !(actor instanceof Heart) && !(actor instanceof ATField) && (!(actor instanceof Kiara) || !actor.reflect) && !(actor instanceof ShirakenHelper) && !(actor instanceof Scythe) && (![this.originActor].includes(actor) || this.reflected) && actor.checkHit(game, this));
        if (actorCollisions.length) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            if (this.type !== 'dual') collision = true;
            if (this.type === 'rocket') {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.scene.shakeBuffer = 4;
                game.playSound("rumble");
            }
        }
        else if (!['bullet', 'sword', 'dual', 'mace'].includes(this.type) && CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
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
        else if (!CollisionBox.intersects(this, game.scene.view) && !(['sword', 'dual'].includes(this.type) && this.pos.y < game.scene.view.pos.y)) collision = true;

        if (this.type === 'dual' && this.frameCount > 9 * 4) collision = true;
        if (this.type === 'mace') collision = true;
        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }
        if (!['petal', 'bullet', 'sword', 'mace2'].includes(this.type)) this.vel.y = 0;

        if (this.type === 'petal') {
            const enemyPool = game.scene.actors.filter(actor => [
                Robot, Nousabot, Nousakumo, Pekora, Mikobell, Casinochip, Miko,
                Dokuro, Cannon, Pirate, Neko, Marine, Aqua, Fubuki, Fubuzilla, Miteiru, Oni, Ayame, Spirit, EvilNoel, Suisei, Polka, EvilMiko, Gura, Calli, Ina, Ame, Kiara, Fairy, Kanata, Dragon, DragonHand, Bibi, Towa]
                .some(e => actor instanceof e));
            
            if (enemyPool.length) {
                const p1 = CollisionBox.center(this);
                const closestEnemy = enemyPool.reduce((a, b) => p1.distance(CollisionBox.center(b)) < p1.distance(CollisionBox.center(a)) ? b : a);
                const p2 = CollisionBox.center(closestEnemy);
                if (p1.distance(p2) < 128) {
                    this.angle = angleLerp(this.angle, Math.atan2(p2.y - p1.y, p2.x - p1.x), .05);
                    this.vel = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(3);
                }
            }
        }

        if (this.type === 'fire' && this.frameCount % 2) {
            if (game.scene.underwater) {
                if (!game.saveData.getItem('nuinui-save-achievement-21')) game.saveData.setItem('nuinui-save-achievement-21', true);
                for (let i = 0; i < 2; i++) game.scene.particles.smoke_white(CollisionBox.center(this), new Vector2(0, 0), 1);
            } else game.scene.particles.sparkle_fire(CollisionBox.center(this));
        } else if (this.type === 'sword' && !(this.frameCount % 4)) game.scene.particles.sparkle_fire_4(CollisionBox.center(this));
        else if (this.type === 'petal' && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_3(CollisionBox.center(this));
        else if (this.type === 'rocket') {
            if (Math.random() > .5) this.vel.y += this.order * .5;
            else if (Math.random() > .5) this.vel.y -= this.order * .5;
            if (!(this.frameCount % 60)) this.order = -this.order;
            game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(this.vel.x > 0 ? -4 : 4, 0)), new Vector2(0, 0), 0);
        }

        if (this.type === 'mace') game.scene.actors = game.scene.actors.filter(actor => !(actor instanceof Bullet && actor.checkHit(game, this)));
        
        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.type === 'mace') return;
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.vel.x < 0) {
            cx.translate(this.size.x / 2, 0);
            cx.scale(-1, 1);
            cx.translate(-this.size.x / 2, 0);
        }
        if (this.type === 'dual') {
            if (!this.dir) {
                cx.translate(this.size.x / 2, 0);
                cx.scale(-1, 1);
                cx.translate(-this.size.x / 2, 0);
            }
            cx.drawImage(game.assets.images['sp_stardust'], 160 * Math.floor(this.frameCount / 4), 0, 160, 144, -72, -32, 160, 144);
        }
        else if (this.type === 'mace2') {
            cx.translate(8, 8);
            cx.rotate(this.frameCount * (Math.PI / 180));
            cx.drawImage(game.assets.images['sp_mace'], 0, 0, 32, 32, -16, -16, 32, 32);
        }
        else if (this.type === 'sword') {
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
            cx.drawImage(game.assets.images['sp_arrow'], this.type === 'fire' ? 20 : 0, this.originActor.weapon === 'bow' ? 0 : 10, 20, 10, 0, 0, 20, 10);
        }
        cx.restore();
    }
}

class Bullet extends Projectile {

    constructor(pos, vel, originActor, forceBullet) {
        super(pos, new Vector2(4, 4), vel, originActor);
        if (originActor instanceof Fubuki) {
            this.size = new Vector2(16, 16);
            this.iceSpike = true;
            this.health = 1;
        }
        else if ((originActor instanceof Miko && vel.y !== 0) || (originActor instanceof EvilFlare && originActor.phase === 'attack') || (originActor instanceof EvilMiko && !forceBullet)) {
            this.petal = true;
            this.dir = Math.random() > .5;
        }
        else if (this.originActor instanceof Marine || (this.originActor instanceof EvilFlare && this.originActor.phase === 'attack2')) {
            this.anchor = true;
            this.size = new Vector2(20, 20);
            this.dir = Math.random() > .5;
        }
        else if (this.originActor instanceof Oni) {
            this.size = new Vector2(8, 8);
            this.dir = this.originActor.dir;
            this.damage = 2;
        } else if (this.originActor instanceof EvilNoel) {
            this.mace = true;
            this.size = new Vector2(16, 16);
        } else if (this.originActor instanceof Demon || this.originActor instanceof Dragon) {
            this.size = new Vector2(16, 16);
            this.orb = true;
        } else if (this.originActor instanceof Calli) {
            this.size = new Vector2(8, 8);
            this.dir = this.originActor.dir;
        } else if (this.originActor instanceof Gura) {
            this.size = new Vector2(8, vel.y > 1 ? 16 : 8);
        }
    }
    
    takeHit = (game, other) => {
        if (other instanceof IceShield && !(this.originActor instanceof EvilNoel)) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            this.dropHeart(game, .9);
        }
        if (!this.iceSpike && !this.orb) return;
        if (other instanceof Arrow && other.type === 'fire') {
            this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
            game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);
        }
        if (this.orb) this.health = 0;
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        if (!this.health) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            if (!this.orb) this.dropHeart(game, .7);
            game.playSound('damage');
            game.score += 50;
        } else {
            game.score += 10;
            game.playSound('damage');
        }
    }

    update = game => {
        if ([Dokuro, Marine].some(a => this.originActor instanceof a) || (this.originActor instanceof Cannon && game.currentStage === 4) || this.candy || this.anchor || this.gravTowa) this.vel.y += .1;
        if (!(((this.iceSpike && this.originActor instanceof Fubuki) || this.orb) && this.frameCount < 60)) this.pos = this.pos.plus(this.vel);
        // if (this.frameCount % 2) game.scene.particles.smoke2(CollisionBox.center(this), new Vector2(-Math.sign(this.vel.x), -(Math.sign(this.vel.y) + 1)), 0);

        if ((this.mace || this.orb || this.candy) && !this.stoppedMace) this.angle += Math.PI / (this.orb ? 64 : 16);

        if (this.orb || this.originActor instanceof Calli) {
            for (let i = 0; i < 2; i++) {
                if (this.originActor instanceof Dragon) {
                    game.scene.particles.smoke_white(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8)), new Vector2(0, 0), 0);
                }else {
                    game.scene.particles.smoke_black(CollisionBox.center(this).plus(new Vector2(Math.random() * 16 - 8, Math.random() * 16 - 8)), new Vector2(0, 0), 0);
                }
            }
        }

        if (this.originActor instanceof Calli) {
            this.vel = this.vel.times(1.05);
        }

        if (this.orb && this.frameCount > 60) {
            const p1 = CollisionBox.center(game.scene.actors.find(actor => actor instanceof Flare));
            const p2 = CollisionBox.center(this);
            const a = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const targetVel = new Vector2(Math.cos(a), Math.sin(a)).times(-8);
            this.vel = this.vel.lerp(targetVel, .025);
        }

        let collision = false;
        if (this.mace && this.frameCount > 150) collision = true;
        const actorCollisions = game.scene.actors.filter(actor => actor instanceof Flare && !actor.isSliding && actor.checkHit(game, this));
        if (actorCollisions.length && !this.stoppedMace) {
            actorCollisions.forEach(collision => {
                collision.takeHit(game, this);
            });
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            collision = true;
        }
        else if (!(this.originActor instanceof Marine) && !this.pekoArrow && !this.anchor && !this.stoppedMace && CollisionBox.collidingCollisionBoxes(this, game.scene.currentSection.collisions).length) {
            if (this.originActor instanceof Cannon && game.currentStage === 4) this.vel.y = -this.vel.y;
            else collision = true;
            // game.playSound('no_damage');
            for (let i = 0; i < 3; i++) game.scene.particles.smoke_white(this.pos, new Vector2(0, 0), 1);
            if (this.candy) {
                game.scene.particles.explosion(CollisionBox.center(this));
                game.playSound("explosion");
            }
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            if (this.mace && !actorCollisions.length) {
                this.vel = new Vector2(0, 0);
                this.stoppedMace = true;
            } else game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }
        
        if (this.guraIce) {
            if (!(this.frameCount % 16)) game.scene.particles.sparkle_white(CollisionBox.center(this));
            this.vel.x = .5 * Math.sin(this.frameCount * .125);
        }
        
        if (this.petal && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_3(CollisionBox.center(this));
        if ((this.originActor instanceof Marine || this.anchor) && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_4(CollisionBox.center(this));
        if (this.originActor instanceof EvilNoel && !(this.frameCount % 2) && !this.stoppedMace) game.scene.particles.smoke_pink(CollisionBox.center(this), new Vector2(0, 0), 1);
        if (this.iceSpike && !(this.frameCount % 8)) game.scene.particles.sparkle_fire_2(CollisionBox.center(this), null, 0);

        this.frameCount++;
    }

    draw = (game, cx) => {
        if (this.mace && this.frameCount > 120 && Math.floor(this.frameCount / 2) % 2) return;
        cx.save();
        if (this.originActor instanceof Cannon && game.currentStage === 4) cx.filter = 'invert(100%)';
        if (this.orb && this.frameCount < 60) cx.filter = `brightness(${this.frameCount / 60})`;
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (this.candy) {
            cx.translate(4, 4);
            cx.rotate(this.angle + Math.PI * .75);
            cx.drawImage(game.assets.images['sp_candy'], 0, 0, 16, 16, -8, -8, 16, 16);
        }
        else if (this.iceSpike) {
            cx.translate(8, 8);
            cx.rotate(this.angle + Math.PI * .75);
            cx.drawImage(game.assets.images['sp_ice_spike'], -12, -12);
        }
        else if (this.syringe) {
            cx.rotate(this.angle + Math.PI * .75);
            cx.drawImage(game.assets.images['sp_ame_syringe'], -8, -8);
        }
        else if (this.mace) {
            cx.translate(8, 8);
            cx.rotate(this.angle + Math.PI * .75);
            cx.drawImage(game.assets.images['sp_mace'], -12, -12);
        }
        else if (this.orb) {
            cx.translate(8, 8);
            cx.rotate(this.angle + Math.PI * .75);
            cx.drawImage(game.assets.images['sp_demon_orb'], (Math.floor(this.frameCount * .25) % 2) * 24, this.originActor instanceof Dragon ? 24 : 0, 24, 24, -12, -12, 24, 24);
        }
        else if (this.originActor instanceof Oni) {
            cx.translate(this.size.x * .5, this.size.y * .5);
            cx.rotate(this.frameCount * .125);
            cx.drawImage(game.assets.images['sp_thunder'], 0, 0, 16, 16, -8, -8, 16, 16);
        }
        else if (this.guraIce) {
            cx.drawImage(game.assets.images['sp_ice_shield'], 0, 0, 15, 15, -4, -4, 15, 15);
        }
        else if (this.trident) {
            cx.drawImage(game.assets.images['sp_gura_bullet'], 0, 0, 16, 24, -4, -8, 16, 24);
        }
        else if (this.originActor instanceof Marine || this.anchor) {
            cx.translate(10, 10);
            cx.rotate(Math.floor(this.frameCount * 16 / 45) * 45 * (Math.PI / 180) * (this.dir ? 1 : -1));
            cx.drawImage(game.assets.images['sp_marine_sword'], -16, -16);
        }
        else if (this.petal) {
            cx.translate(3, 3);
            cx.rotate((this.frameCount * 8) * (Math.PI / 180) * (this.dir ? 1 : -1));
            cx.drawImage(game.assets.images['sp_petal'], 0, 0, 9, 9, -3, -3, 9, 9);
        } else if (this.originActor instanceof Calli) {
            if (!this.dir) {
                cx.translate(this.size.x / 2, 0);
                cx.scale(-1, 1);
                cx.translate(-this.size.x / 2, 0);
            }
            cx.drawImage(game.assets.images['sp_deadbeat'], 0, 0, 24, 24, -4, -4, 24, 24);
        } else if (this.originActor instanceof Pekora || this.pekoArrow) {
            cx.drawImage(game.assets.images['sp_peko_bullet'], Math.floor(this.frameCount / 16) % 2 ? 0 : 16, 0, 16, 16, -6, -6, 16, 16);
        } else cx.drawImage(game.assets.images['sp_bullet'], Math.floor(this.frameCount / 4) % 2 ? 0 : 8, 0, 8, 8, -2, -2, 8, 8);
        cx.restore();
    }
}

class IceShield extends Projectile {
    isPersistent = true;
    
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
        const playerCollisions = game.scene.actors.filter(actor => [
            Bullet, Rocket, Robot, Nousabot, Nousakumo, Pekora, Mikobell, Casinochip, Miko,
            Dokuro, Cannon, Pirate, Neko, Marine, Aqua, Fubuki, Fubuzilla, Miteiru, Oni, Ayame, Sword, Spirit, EvilNoel, Suisei, Polka, Card, Calli, Gura, Ina, Tentacle, Ame, Kiara, Fairy, Kanata, Dragon, DragonHand, Bibi, Towa]
            .some(e => actor instanceof e) && actor.checkHit(game, this));
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
        
        if (!(this.frameCount % 8)) game.scene.particles.sparkle_white(CollisionBox.center(this), 0);

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

    takeHit(game, other) {
        this.health = Math.max(0, this.health - (other.damage ? other.damage : 1));
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.scene.particles.digit(this.checkHit(game, other).pos, other.damage ? other.damage : 1);

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

    update(game) {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        const p1 = CollisionBox.center(flare);
        const p2 = CollisionBox.center(this);
        this.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.random() * 0.125 - 0.0625;
        const velocity = new Vector2(Math.cos(this.angle), Math.sin(this.angle)).times(-1);
        if (Math.random() > .5) velocity.y -= .5;

        this.pos = this.pos.plus(velocity);
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

    draw(game, cx) {
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
        const actors = game.scene.actors.filter(actor => ![this].includes(actor) && !actor.isSliding && actor.checkHit(game, this));
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

class Watamelon extends Aircon {
    size = new Vector2(16, 8);
    dir = 0;
    active = true;

    update = game => {
        const actors = game.scene.actors.filter(actor => ![this].includes(actor) && !actor.isSliding && actor.checkHit(game, this));
        actors.forEach(actor => {
            if ((actor instanceof Arrow && ['petal', 'bullet'].includes(actor.type)) || actor instanceof Bullet || (actor instanceof Aqua && !actor.playerAggro)) return;
            if (this.dir) actor.vel.x = Math.min(8, Math.max(-8, actor.vel.x + 6 * this.dir));
            actor.vel.y = Math.max(-8, this.dir ? actor.vel.y - 1 : actor.vel.y - 1.5);
            if (this.active && actor instanceof Flare) {
                game.playSound('jump');
                this.active = false;
                this.shakeBuffer = 15;
                actor.vel.y = -4;
                actor.isGrounded = false;
                if (actor.moto) {
                    if (game.scene.achievement25) game.saveData.setItem('nuinui-save-achievement-25', true);
                    else game.scene.achievement25 = true;
                }
            }
        });
        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_watamelon'], 0, 0, 16, 8, 0, 0, 16, 8);
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
        if (!this.active && (actorCollisions.length || game.scene.actors.find(a => a instanceof Noel))) {
            game.scene.shakeBuffer = 2;
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

class MovingBlock extends Actor {

    constructor(pos, xSize, dir) {
        super(new Vector2(pos.x * 16, pos.y * 16 - 1), new Vector2(xSize * 16, 16));
        this.dir = dir;
    }

    checkHit = (game, collisionBox) => {
        const collision = CollisionBox.intersects(this, collisionBox);
        return collision;
    }
    
    takeHit = (game, other) => {
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        game.playSound('hit');
        this.dir = !this.dir;
    }

    update = game => {
        if (!(this.frameCount % 8)) {
            game.scene.particles[this.dir ? 'sparkle_fire' : 'sparkle_fire_2'](this.pos.plus(new Vector2(this.dir ? 0 : this.size.x, 8)), new Vector2((this.dir ? 1 : -1) * (this.size.x / 32), 0), 1);
        }
        
        const actors = game.scene.actors.filter(actor => ![this].includes(actor) && !(actor instanceof Projectile) && CollisionBox.intersects(this, actor));
        actors.forEach(actor => {
            actor.vel.x = Math.min(8, Math.max(-8, actor.vel.x + .5 * (this.dir ? 1 : -1)));
        });
        this.frameCount++;
    }
}

export {
    Actor,
    Elfriend,
    Projectile,
    Arrow,
    Bullet,
    IceShield,
    Rocket,
    Aircon,
    Watamelon,
    Torche,
    MovingBlock,
};
