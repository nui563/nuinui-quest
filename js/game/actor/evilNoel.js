class EvilNoel extends Actor {
    size = new Vector2(16, 32);
    vel = new Vector2(0, 0);
    dir = true;

    phaseBuffer = 0;
    
    posTarget = null;
    posTargets = [
        new Vector2(325 * 16, 28 * 16),
        new Vector2(329.5 * 16, 28 * 16),
        new Vector2(334 * 16, 28 * 16)
    ];

    damage = 2;

    isTrueEnd = false;

    constructor(pos) {
        super(pos);
        this.posTarget = this.posTargets[1];
    }
    
    checkHit = (game, collisionBox) => CollisionBox.intersects(this, collisionBox);

    takeHit = (game, other) => {
        if (!this.invicibility) {
            this.shakeBuffer = 15;
            game.scene.particles.ray(this.checkHit(game, other).pos);
            game.scene.particles.impact(this.checkHit(game, other).pos);
            game.playSound('damage');
            
            game.score += 100;
            this.invicibility = 30;
            
            if (other.type === 'dual' && this.phase !== 'defeated') {
                this.phase = 'defeated';
                game.stopBGM();
                game.playSound('level_start');
                this.setAnimation('hit');
                game.scene.bossKillEffect = 60;
                game.scene.isFocus = 0;
                this.vel.y = -4;
                this.isTrueEnd = true;
            }
        }
    }
    
    defeatedPhase = game => {
        //velloss
        this.vel = this.vel.mult(new Vector2(0.9, 1));
        if (this.pos.y >= 32 * 16) {
            this.phase = 'weak';
            this.setAnimation('weak');
            this.vel = new Vector2(0, 0);
            this.vel.y = 0;
            this.pos.y = 32 * 16;
        }
    }
    
    weakPhase = game => {
    }

    attackPhase = game => {
        if (this.phaseBuffer > 29 && !(this.phaseBuffer % 10)) {
            const flare = game.scene.actors.find(actor => actor instanceof Flare);
            const p1 = CollisionBox.center(flare);
            const p2 = CollisionBox.center(this);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const vel = new Vector2(Math.cos(angle), Math.sin(angle)).times(-3);
            const bullet = new Bullet(p2, vel, this);
            bullet.angle = angle;
            game.scene.actors.push(bullet);
            game.playSound("no_damage");
        }

        if (this.phaseBuffer === (this.frameCount > 60 * 30 ? 90 : 60)) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }

    movePhase = game => {
        if (!this.phaseBuffer) {
            this.posTarget = this.posTargets[Math.floor(Math.random() * this.posTargets.length)];
        }
        if (this.pos.round().x === this.posTarget.round().x) {
            this.lastMove = this.phase;
            this.phase = 'idle';
        }
    }
    
    idlePhase = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (this.phaseBuffer >= 31) {
            if (Math.random() > (!this.lastMove ? 1 : this.lastMove === 'move' ? .1 : .3)) {
                // if (!game.scene.actors.find(a => a instanceof IceShield && a.originActor === this)) {
                //     this.phase = 'shield';
                //     this.setAnimation('charge');
                // } else if (this.pos.distance(flare.pos) < 16 * 8) {
                //     this.phase = 'wind';
                //     this.setAnimation('charge');
                // } else {
                    this.phase = 'attack';
                // }
            } else {
                this.phase = 'move';
            }
        }
    }
    
    setAnimation = animation => {
        this.animation = animation;
        this.animationFrame = 0;
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        
        if (this.phase) this[`${this.phase}Phase`](game);

        if (this.phase === 'defeated') {
            this.vel.y += .125;
            this.pos.y += this.vel.y;
        } else if (this.phase === 'weak') {
        } else {
            this.pos = this.pos.lerp(this.posTarget.plus(new Vector2(0, Math.sin((this.frameCount / 1000) * (180 / Math.PI))  * 4)), .05);
        }
        this.pos.y = Math.round((this.pos.y) * 100) / 100;
        this.pos.x = Math.round((this.pos.x) * 100) / 100;

        this.dir = CollisionBox.center(this).x < CollisionBox.center(flare).x;
        
        if (this.lastPhase !== this.phase) this.phaseBuffer = 0;
        else this.phaseBuffer++;
        this.lastPhase = this.phase;

        if (this.phase !== 'weak') {
            for (let i = 0; i < 2; i++) {
                game.scene.particles.smoke_pink(CollisionBox.center(this).plus(new Vector2(Math.random() * 32 - 16, Math.random() * 20 - 10)), new Vector2(Math.random() * 2 - 1, Math.random() * -1), 0);
            }
        }

        if (this.invicibility) this.invicibility--;
        this.animationFrame++;
        this.frameCount++;
    }

    draw = (game, cx) => {
        
        if (!this.isTrueEnd) {
            cx.save();
            cx.translate(Math.round(this.pos.x + this.size.x / 2 + Math.sin(this.frameCount / 100) * 32), Math.round(this.pos.y));
            cx.rotate(this.frameCount / 50 * Math.PI);
            cx.drawImage(game.assets.images['sp_mace'], -16, -16);
            cx.restore();
        }

        if (!(this.invicibility % 2)) {
            cx.save();
            cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
            if (!this.dir) {
                cx.translate(this.size.x / 2, 0);
                cx.scale(-1, 1);
                cx.translate(-this.size.x / 2, 0);
            }
            const img = ['defeated', 'weak'].includes(this.phase) ? this.animation : 'evil';
            cx.drawImage(game.assets.images[`sp_noel_${img}`], img === 'evil' ? -12 : -4, img === 'evil' ? -4 : -6);
            cx.restore();
        }

        if (!this.isTrueEnd) {
            cx.save();
            cx.translate(Math.round(this.pos.x + this.size.x / 2 - Math.sin(this.frameCount / 100) * 32), Math.round(this.pos.y));
            cx.rotate(-this.frameCount / 50 * Math.PI);
            cx.drawImage(game.assets.images['sp_mace'], -16, -16);
            cx.restore();
        }
    }
}