class BowPickup extends Actor {
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        this.pos.y += Math.cos(Math.floor(this.frameCount * 3) * (Math.PI / 180)) / 4;
        if (!(this.frameCount % 24)) game.scene.particles.shine_white(CollisionBox.center(this), 1);

        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare)) {
            flare.hasBow = true;
            game.scene.actors = game.scene.actors.filter(actor => actor !== this);
            game.scene.particles.sparkle_white(CollisionBox.center(this));
            game.playSound('object_pickup');
        }

        this.frameCount++;
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_bow_pickup'], 0, 0, 20, 20, 0, 0, 20, 20);
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