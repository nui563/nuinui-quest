class Kintsuba extends Actor {
    size = new Vector2(24, 32);
    vel = new Vector2(0, 0);
    dir = true;

    constructor(pos) {
        super(pos);
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        this.vel.x = Math.cos((this.frameCount / 2048) * (180 / Math.PI)) / 8;
        this.vel.y = Math.sin((this.frameCount / 2048) * (180 / Math.PI)) / 4;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        if (!(this.frameCount % 12)) game.scene.particles.shine_white(CollisionBox.center(this), 0);

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
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
        cx.drawImage(game.assets.images['sp_kintsuba_idle'], 0, 0);
        cx.restore();
    }
}