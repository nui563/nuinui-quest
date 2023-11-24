class Menu {
    frameCount = 0;

    startFrameSpeed = 10;
    endFrameSpeed = 10;

    constructor() {
        this.nextSceneFrame = this.endFrameSpeed;
    }

    drawBackground = (game, cx) => {
        cx.save();
        cx.globalAlpha = .5;
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, game.width, game.height);
        cx.restore();
        cx.fillRect(game.width * .5 - 96, 0, 192, game.height);
        cx.fillStyle = '#3F3FBF';
        cx.fillRect(game.width * .5 - 96 + 1, 0, 1, game.height);
        cx.fillRect(game.width * .5 + 96 - 2, 0, 1, game.height);
    }

    draw = game => {
        const cx = game.ctx3;
        cx.save();
        cx.clearRect(0, 0, game.width, game.height);
        this.drawBackground(game, cx);
        this.drawOptions(game, cx);
        cx.restore();
    }
}

class SaveMenu extends Menu {
    index = 0;

    aBuffer = true;

    constructor(game, previousMenu, action) {
        super();
        this.previousMenu = previousMenu;
        this.action = action;

        this.menuInit(game);
        
        this.titleText = new TextElem(Array.from(this.action), 'center');
        this.noData = new TextElem(Array.from('no data'), 'left');
    }

    menuInit = game => {
        this.saveDataArray = [];
        for (let i = 0; i < game.saveCount; i++) {
            const saveData = localStorage.getItem(`nuinui-save-${i}`);
            if (!saveData) this.saveDataArray.push(null);
            else {
                const parsed = JSON.parse(saveData);
                
                this.saveDataArray.push({
                    skills: ['fire', 'rocket', 'petal', 'sword', 'shield', 'dual'].map(skill => parsed[`nuinui-save-item-${skill}`]),
                    items: ['gun', 'clock', 'jump', 'boots', 'bow'].map(item => parsed[`nuinui-save-item-${item}`]),
                    keys: new Array(5).fill(null).map((_, i) => parsed[`nuinui-save-item-key${i}`]),
                    achievements: new Array(28).fill(null).map((_, i) => parsed[`nuinui-save-achievement-${i+1}`]),
                });
            }
        }
    }

    update = game => {
        if (this.closeMenuBuffer && !game.keys.b) {
            this.closeMenuFrame--;
            if (!this.closeMenuFrame) {
                if (this.previousMenu) {
                    this.previousMenu.menuInit(game);
                    this.previousMenu.frameCount = 0;
                    this.previousMenu.progress = 0;
                }
                game.menu = this.previousMenu;
                game.ctx3.clearRect(0, 0, game.width, game.height);
            }
        } else if (game.keys.b) this.closeMenuBuffer = true;
        else {
            if (this.downBuffer && !game.keys.down) this.downBuffer = false;
            if (game.keys.down && !this.downBuffer) {
                this.downBuffer = true;
                this.index++;
                if (this.index === this.saveDataArray.length) this.index = 0;
                game.playSound('menu_move');
            }

            if (this.upBuffer && !game.keys.up) this.upBuffer = false;
            if (game.keys.up && !this.upBuffer) {
                this.upBuffer = true;
                this.index--;
                if (this.index < 0) this.index = this.saveDataArray.length - 1;
                game.playSound('menu_move');
            }

            if (this.aBuffer && !game.keys.a) this.aBuffer = false;
            if (game.keys.a && !this.aBuffer) {
                this.aBuffer = true;

                if (this.action === 'delete') {
                    game.saveData.delete(this.index);
                    this.menuInit(game);
                } else if (this.action === 'save') {
                    game.saveData.setItem('nuinui-save-current-stage', game.currentStage);
                    game.saveData.save(this.index);
                    this.menuInit(game);
                } else if (localStorage.getItem(`nuinui-save-${this.index}`)) {
                    game.saveData.load(this.index);
                    this.previousMenu = null;
                    game.mode = 'flare';
                    game.setStage(game.saveData.getItem('nuinui-save-current-stage'));
                    game.ctx3.clearRect(0, 0, game.width, game.height);
                }
                game.playSound('select');
            }
        }
        this.frameCount++;
    }
    
    drawOptions = (game, cx) => {
        cx.save();

        this.titleText.draw(game, cx, new Vector2(game.width * .5, 8));

        cx.translate(game.width * .5 - 80, 24);
        this.saveDataArray.forEach((saveData, i) => {
            if (this.index === i) {
                const offset = Math.floor(this.frameCount * .05) % 2;
                cx.strokeStyle = '#FFF';
                cx.strokeRect(-.5 - offset, -.5 - offset, 161 + offset * 2, 49 + offset * 2);
            }
            cx.fillStyle = '#3F3FBF';
            cx.fillRect(0, 0, 160, 48);
            cx.fillStyle = '#0F0F3F';
            cx.fillRect(1, 1, 158, 46);

            if (!saveData) this.noData.draw(game, cx, new Vector2(4, 4));
            else {
                saveData.skills.forEach((skill, j) => {
                    if (skill) cx.drawImage(game.assets.images['ui_charge_type'], j * 12, 0, 12, 12, 4 + j * 16, 4, 12, 12);
                });

                saveData.items.forEach((item, j) => {
                    if (item) cx.drawImage(game.assets.images['ui_items'], j * 20, 0, 20, 20, 2 + j * 19, 18, 20, 20);
                });
                
                saveData.keys.forEach((key, j) => {
                    if (key) cx.drawImage(game.assets.images['sp_key'], j * 16, 0, 16, 16, 100 + (j % 3) * 20 + (j > 2 ? 10 : 0), 4 + Math.floor(j / 3) * 18, 16, 16);
                });

                saveData.achievements.forEach((achievement, j) => {
                    cx.fillStyle = achievement ? '#3F3FBF' : '#000';
                    cx.fillRect(5 + j * 5 + Math.floor(j / 4) * 2, 40, 3, 4);
                });
            }
            // cx.drawImage(game.assets.images['ui_achievements'], i * 32, this.index * 32, 32, 32, 8, 0, 32, 32);
            cx.translate(0, 56);
        });

        cx.restore();
    }
}

class Credits extends Menu {

    constructor(game) {
        super();

        this.titleText = new TextElem(Array.from('credits'), 'center');
    }

    update = game => {
        if (this.closeMenuBuffer && !game.keys.b) {
            this.closeMenuFrame--;
            if (!this.closeMenuFrame) {
                game.menu = null;
                game.ctx3.clearRect(0, 0, game.width, game.height);
            }
        } else if (game.keys.b) this.closeMenuBuffer = true;
        
        this.frameCount++;
    }
    
    drawOptions = (game, cx) => {
        cx.save();

        this.titleText.draw(game, cx, new Vector2(game.width * .5, 24));

        cx.translate(game.width * .5, game.height * .5);
        cx.drawImage(game.assets.images['credits'], 0, 0, 192, 80, -96, -40, 192, 80);
        new TextElem(Array.from('created by'), 'left').draw(game, cx, new Vector2(-85, -26));
        new TextElem(Array.from('music by'), 'left').draw(game, cx, new Vector2(-2, 20));

        cx.restore();
    }
}