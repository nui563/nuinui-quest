class Checkpoint extends Actor {
    size = new Vector2(16, 24);

    constructor(data) {
        super();
        Object.entries(data).forEach(([key, value]) => this[key] = value);
        this.pos = new Vector2(this.pos.x, this.pos.y).times(16);
    }

    update = game => {
        const flare = game.scene.actors.find(actor => actor instanceof Flare);
        if (CollisionBox.intersects(this, flare) && game.checkpoint !== this) this.setCheckpoint(game);
        this.frameCount++;
    }

    setCheckpoint = game => {
        game.checkpoint = this;
        game.playSound('level_start');
        game.scene.particles.explosion(this.pos);
        game.scene.shakeBuffer = 15;
    }

    takeHit = (game, other) => {
        this.shakeBuffer = 15;
        game.scene.particles.ray(this.checkHit(game, other).pos);
        game.scene.particles.impact(this.checkHit(game, other).pos);
        
        if (game.checkpoint !== this) this.setCheckpoint(game);
        else game.playSound('no_damage');
    }

    draw = (game, cx) => {
        cx.save();
        cx.translate(Math.round(this.pos.x), Math.round(this.pos.y));
        cx.drawImage(game.assets.images['sp_checkpoint'], 0, 0);
        if (game.checkpoint === this) cx.drawImage(game.assets.images['sp_elfriend_idle'], 0, 0, 24, 24, -8, -14, 24, 24);
        cx.restore();
    }

    respawn = (game, scene) => {
        scene.currentSection = scene.sections[this.section];
        const flare = new Flare(this.pos.plus(new Vector2(0, -8)), new Vector2(16, 32));
        flare.setAnimation('idle');
        flare.playerControl = true;
        flare.dir = this.dir;

        scene.actors.push(flare);
        scene.enableHUD = true;
        scene.view.target = flare;
        if (this.sceneData) Object.entries(this.sceneData).forEach(([key, value]) => scene[key] = value);

        if (this.bgm) game.playBGM(this.bgm);
    }
}

const CHECKPOINT_STAGE_1_2 = (game, scene) => {
    scene.currentSection = scene.sections[13];
    const flare = new Flare(new Vector2(149.5 * 16, 16 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = false;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossCleared = true;

    game.playBGM('serious_&_go');
}

const CHECKPOINT_STAGE_2_0 = (game, scene) => {
    scene.currentSection = scene.sections[5];
    const flare = new Flare(new Vector2(146.5 * 16, 4 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = true;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;

    game.playBGM('red_sus');
}

const CHECKPOINT_STAGE_2_1 = (game, scene) => {
    scene.currentSection = scene.sections[10];
    const flare = new Flare(new Vector2(269.5 * 16, 31 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = true;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossCleared = true;

    game.playBGM('red_sus');
}

const CHECKPOINT_STAGE_3_0 = (game, scene) => {
    scene.currentSection = scene.sections[3];
    const flare = new Flare(new Vector2(129.5 * 16, 68 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = true;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;

    game.playBGM('aquamarine_bay');
}

const CHECKPOINT_STAGE_3_1 = (game, scene) => {
    scene.currentSection = scene.sections[3];
    const flare = new Flare(new Vector2(89.5 * 16, 8 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = false;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossCleared = true;

    game.playBGM('aquamarine_bay');
}

const CHECKPOINT_STAGE_4_0 = (game, scene) => {
    scene.currentSection = scene.sections[7];
    const flare = new Flare(new Vector2(83 * 16, 32 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = true;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;

    // game.playBGM('aquamarine_bay');
}

const CHECKPOINT_STAGE_4_1 = (game, scene) => {
    scene.currentSection = scene.sections[12];
    const flare = new Flare(new Vector2(270 * 16, 6 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.dir = true;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossCleared = true;

    // game.playBGM('aquamarine_bay');
}