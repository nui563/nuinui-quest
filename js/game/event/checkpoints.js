const CHECKPOINT_STAGE_1_0 = (game, scene) => {
    scene.currentSection = scene.sections[5];
    const flare = new Flare(new Vector2(109.5 * 16, 4 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.hasBow = true;
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.dir = false;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
}

const CHECKPOINT_STAGE_1_1 = (game, scene) => {
    scene.currentSection = scene.sections[7];
    const flare = new Flare(new Vector2(149.5 * 16, 40 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.hasBow = true;
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.dir = true;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossStarted = true;
    scene.miniBossCleared = true;

    game.playBGM('serious_&_go');
}

const CHECKPOINT_STAGE_1_2 = (game, scene) => {
    scene.currentSection = scene.sections[13];
    const flare = new Flare(new Vector2(149.5 * 16, 16 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.hasBow = true;
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.dir = false;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossStarted = true;
    scene.miniBossCleared = true;

    game.playBGM('serious_&_go');
}

const CHECKPOINT_STAGE_2_0 = (game, scene) => {
    scene.currentSection = scene.sections[5];
    const flare = new Flare(new Vector2(146.5 * 16, 4 * 16), new Vector2(16, 32));
    flare.setAnimation('idle');
    flare.playerControl = true;
    flare.hasBow = true;
    flare.chargeTypeList = ['fire', 'rocket'];
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.item = true;
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
    flare.hasBow = true;
    flare.chargeTypeList = ['fire', 'rocket'];
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.item = true;
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
    flare.hasBow = true;
    flare.chargeTypeList = ['fire', 'rocket', 'petal'];
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.item = true;
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
    flare.hasBow = true;
    flare.chargeTypeList = ['fire', 'rocket', 'petal'];
    if (game.demoCleared) flare.chargeTypeList = ['fire', 'rocket', 'petal', 'sword'];
    flare.item = true;
    flare.dir = false;
    scene.enableHUD = true;
    scene.actors.push(flare);
    
    scene.view.target = flare;
    scene.miniBossCleared = true;

    game.playBGM('aquamarine_bay');
}