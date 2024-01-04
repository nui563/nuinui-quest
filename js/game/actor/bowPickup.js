import { Actor } from './actor.js';
import { Vector2, CollisionBox } from '../../lib/gameEngine.js';
import { Flare } from './flare.js';

class BowPickup extends Actor {
    constructor(pos, size, type) {
        super(pos, size);
        this.type = type;
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 24)) game.scene.particles.shine_white(CollisionBox.center(this), 1);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            flare.hasBow = true;
            flare.weapon = this.type;
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            game.saveData.setItem(`nuinui-save-item-${this.type}`, true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_bow_pickup'], this.type === 'bow' ? 0 : 20, 0, 20, 20, 0, 0, 20, 20);
        cx.restore();
    }
}
class RocketPickup extends Actor {
    isPersistent = true;
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 4)) game.scene.particles.charge_fire_2(CollisionBox.center(this));

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare) && !game.scene.bossKillEffect) {
            flare.chargeTypeList.push('rocket');
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-rocket', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_peko_rocket'], 0, 0);
        cx.restore();
    }
}
class PetalPickup extends Actor {
    isPersistent = true;
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 4)) game.scene.particles.charge_fire_3(CollisionBox.center(this));

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare) && !game.scene.bossKillEffect) {
            flare.chargeTypeList.push('petal');
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-petal', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_petal'], 0, 0);
        cx.restore();
    }
}
class SwordPickup extends Actor {
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 4)) game.scene.particles.charge_fire_4(CollisionBox.center(this));

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare) && !game.scene.bossKillEffect) {
            flare.chargeTypeList.push('sword');
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-sword', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_marine_sword'], -this.size.x / 2, -this.size.y / 2);
        cx.restore();
    }
}
class ShieldPickup extends Actor {
    isPersistent = true;
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 4)) game.scene.particles.charge(CollisionBox.center(this));

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare) && !game.scene.bossKillEffect) {
            flare.chargeTypeList.push('shield');
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-shield', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x + 12), Math.round(this.pos.y + 12));
        cx.drawImage(game.assets.images['sp_ice_shield'], -this.size.x / 2, -this.size.y / 2);
        cx.restore();
    }
}

class KiritoPickup extends Actor {
    isPersistent = true;
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 4)) game.scene.particles.charge(CollisionBox.center(this));

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare) && !game.scene.bossKillEffect) {
            flare.chargeTypeList.push('dual');
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-dual', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x + 12), Math.round(this.pos.y + 12));
        cx.drawImage(game.assets.images['sp_kirito'], -this.size.x / 2, -this.size.y / 2);
        cx.restore();
    }
}

class ClockPickup extends Actor {
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 24)) game.scene.particles.shine_white(CollisionBox.center(this), 1);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            flare.item = true;
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-clock', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_clock'], 0, 0, 20, 20, 0, 0, 20, 20);
        cx.restore();
    }
}

class JumpPickup extends Actor {
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 24)) game.scene.particles.shine_white(CollisionBox.center(this), 1);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            flare.doubleJump = true;
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-jump', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_jump'], 0, 0, 20, 20, 0, 0, 20, 20);
        cx.restore();
    }
}

class BootsPickup extends Actor {
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 24)) game.scene.particles.shine_white(CollisionBox.center(this), 1);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            flare.canWallJump = true;
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem('nuinui-save-item-boots', true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_boots'], 0, 0, 20, 20, 0, 0, 20, 20);
        cx.restore();
    }
}

class KeyPickup extends Actor {
    size = new Vector2(16, 16);

    constructor(pos, id) {
        super(pos);
        this.id = id;
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 24)) game.scene.particles.shine_white(CollisionBox.center(this), 1);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
            
            game.saveData.setItem(`nuinui-save-item-key${this.id}`, true);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_key'], 16 * this.id, 0, 16, 16, 0, 0, 16, 16);
        cx.restore();
    }
}

export {
    BowPickup,
    RocketPickup,
    PetalPickup,
    SwordPickup,
    ShieldPickup,
    KiritoPickup,
    ClockPickup,
    JumpPickup,
    BootsPickup,
    KeyPickup,
};
