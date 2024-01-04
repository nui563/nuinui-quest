import { Actor } from './actor.js';
import { Vector2, CollisionBox } from '../../lib/gameEngine.js';
import { Flare } from './flare.js';

class Heart extends Actor {
    size = new Vector2(8, 8);
    vel = new Vector2(0, 0);
    gravity = .2;
    heal = 2;
    
    constructor(pos, fromMap) {
        if (fromMap) {
            super(new Vector2(pos.x * 16, pos.y * 16), new Vector2(32, 4 * 16));
        } else super(pos);
    }
    
    checkHit = (game, collisionBox) => {
        return CollisionBox.intersects(this, collisionBox);
    }
    
    update = game => {
        this.pos = this.pos.plus(this.vel);
        
        if (!(this.frameCount % 16)) game.scene.particles.charge(CollisionBox.center(this));

        this.vel.y = Math.round((this.vel.y + this.gravity) * 100) / 100;
        this.vel = new Vector2(Math.max(-8, Math.min(8, this.vel.x)), Math.max(-8, Math.min(8, this.vel.y)));

        if (CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + this.vel.y), size:this.size }, game.scene.currentSection.collisions).length) {
            this.pos.y = Math.round(this.pos.y);
            while (!CollisionBox.intersectingCollisionBoxes({ pos:new Vector2(this.pos.x, this.pos.y + Math.sign(this.vel.y)), size:this.size }, game.scene.currentSection.collisions).length) {
                this.pos.y = this.pos.y + Math.sign(this.vel.y);
            }
            this.vel.y = 0;
        }
        // this.pos.y = Math.round((this.pos.y + this.vel.y) * 100) / 100;

        let collision = false;
        const flare = game.scene.actors.find(a => a instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            flare.health = Math.min(flare.maxHealth, flare.health + this.heal);
            game.playSound('heal');
            collision = true;
        }
        else if (!CollisionBox.intersects(this, game.scene.currentSection)) collision = true;

        if (collision) {
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        if (game.currentStage === 2 && game.scene.bossStarted) cx.translate(0, Math.round(Math.cos(Math.floor(this.frameCount / 4) * (180 / Math.PI))));
        cx.drawImage(game.assets.images['sp_heart'], 0, 0);
        cx.restore();
    }
}

export { Heart };
