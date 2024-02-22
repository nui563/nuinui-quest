let DEBUGMODE = true;
let SHOW_HITBOX = false;

const debugSave = game => {
    for (let i = 1; i <= 27; i++) game.saveData.setItem(`nuinui-save-achievement-${i}`, true);
    for (let i = 0; i < 5; i++) game.saveData.setItem(`nuinui-save-item-key${i}`, true);
    for (let i = 1; i <= 7; i++) game.saveData.setItem(`nuinui-save-stage-${i}`, true);

    game.saveData.setItem('nuinui-save-item-bow', true);
    game.saveData.setItem('nuinui-save-item-gun', true);
    game.saveData.setItem('nuinui-save-item-clock', true);
    game.saveData.setItem('nuinui-save-item-jump', true);
    game.saveData.setItem('nuinui-save-item-boots', true);
    game.saveData.setItem('nuinui-save-item-noel', true);

    game.saveData.setItem('nuinui-save-item-fire', true);
    game.saveData.setItem('nuinui-save-item-rocket', true);
    game.saveData.setItem('nuinui-save-item-petal', true);
    game.saveData.setItem('nuinui-save-item-sword', true);
    game.saveData.setItem('nuinui-save-item-shield', true);
    game.saveData.setItem('nuinui-save-item-dual', true);
}

window.addEventListener('load', () => {
    fetch("save.json").then(res => res.json()).then(res => {
        const game = new Game(new Assets(), Object.freeze(res));
        if (DEBUGMODE) debugSave(game);
    });
}, { once: true });