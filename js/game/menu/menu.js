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
    indexOffset = 0;
    index = 0;
    indexAnim = 0;

    aBuffer = true;

    constructor(game, previousMenu, action) {
        super();
        this.previousMenu = previousMenu;
        this.action = action;

        this.menuInit(game);

        this.gradient = game.ctx3.createLinearGradient(0, 24, 0, 48);
        this.gradient.addColorStop(0, '#00003F');
        this.gradient.addColorStop(.5, '#00003F');
        this.gradient.addColorStop(1, '#000');
        
        this.titleText = new TextElem(Array.from(this.action), 'center');
        this.noData = new TextElem(Array.from('no data'), 'center');
        this.autoSaveText = new TextElem(Array.from('autosave'), 'left');
        this.fileSaveTextList = new Array(5).fill(null).map((_, i) => new TextElem(Array.from(`file ${i+1}`), 'left'));
    }

    menuInit = game => {
        this.saveDataArray = [];
        const arr = ['auto', ...Array.from({ length: game.saveCount }, (_, i) => i)];
        arr.forEach(i => {
            const saveData = localStorage.getItem(`nuinui-save-${i}`);
            if (!saveData) this.saveDataArray.push(null);
            else {
                const parsed = JSON.parse(saveData);
                
                this.saveDataArray.push({
                    noel: parsed['nuinui-save-item-noel'],
                    stage: parsed['nuinui-save-current-stage'],
                    stages: new Array(7).fill(null).map((_, i) => parsed[`nuinui-save-stage-${i+1}`]),
                    skills: ['fire', 'rocket', 'petal', 'sword', 'shield', 'dual'].map(skill => parsed[`nuinui-save-item-${skill}`]),
                    items: ['gun', 'clock', 'jump', 'boots', 'bow'].map(item => parsed[`nuinui-save-item-${item}`]),
                    keys: new Array(5).fill(null).map((_, i) => parsed[`nuinui-save-item-key${i}`]),
                    achievements: new Array(28).fill(null).map((_, i) => parsed[`nuinui-save-achievement-${i+1}`]),
                });
            }
        });
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
                if (this.index === this.saveDataArray.length) {
                    this.index = 0;
                    this.indexAnim = this.index;
                }
                game.playSound('menu_move');
            }

            if (this.upBuffer && !game.keys.up) this.upBuffer = false;
            if (game.keys.up && !this.upBuffer) {
                this.upBuffer = true;
                this.index--;
                if (this.index < 0) {
                    this.index = this.saveDataArray.length - 1;
                    this.indexAnim = this.index;
                }
                game.playSound('menu_move');
            }

            if (this.aBuffer && !game.keys.a) this.aBuffer = false;
            if (game.keys.a && !this.aBuffer) {
                this.aBuffer = true;

                if (this.action === 'delete') {
                    if (this.index !== 0) {
                        game.saveData.delete(this.index-1);
                        this.menuInit(game);
                    }
                } else if (this.action === 'save') {
                    if (this.index !== 0) {
                        game.saveData.setItem('nuinui-save-current-stage', game.currentStage);
                        game.saveData.save(this.index-1);
                        this.menuInit(game);
                    }
                } else {
                    const dataIndex = this.index === 0 ? 'auto' : this.index-1;
                    if (localStorage.getItem(`nuinui-save-${dataIndex}`)) {
                        game.saveData.load(dataIndex);
                        this.previousMenu = null;
                        game.mode = 'flare';
                        game.setStage(game.saveData.getItem('nuinui-save-current-stage'));
                        game.ctx3.clearRect(0, 0, game.width, game.height);
                    }
                }
                game.playSound('select');
            }
        }
        if (this.indexAnim !== this.index) {
            this.indexAnim += (this.index - this.indexAnim) * .25;
            if (Math.abs(this.index - this.indexAnim) < .025) this.indexAnim = this.index;
        }
        this.indexOffset = this.index < 3 ? 0 : 3;
        this.frameCount++;
    }
    
    drawOptions = (game, cx) => {
        cx.save();
        this.titleText.draw(game, cx, new Vector2(game.width * .5, 5));

        cx.translate(game.width * .5 - 92, 18);
        
        cx.save();
        cx.translate(0, Math.round(this.indexAnim * 58) - this.indexOffset * 58);
        const offset = Math.floor(this.frameCount * .05) % 2;
        cx.fillStyle = '#FFF';
        cx.fillRect(0 - offset, 0 - offset, 184 + offset * 2, 56 + offset * 2);
        cx.restore();

        cx.save();
        this.saveDataArray.slice(this.indexOffset, this.indexOffset + 3).forEach((saveData, i) => {
            const relIndex = i + this.indexOffset;
            const selected = this.index === relIndex;

            const autosave = ['save', 'delete'].includes(this.action) && relIndex === 0;
            cx.filter = autosave ? 'grayscale(100%)' : 'none';
            cx.fillStyle = selected ? '#FFF' : '#3F3FBF';
            cx.fillRect(0, 0, 184, 56);
            cx.fillStyle = '#000';
            cx.fillRect(1, 1, 182, 12);
            cx.fillStyle = this.gradient;
            cx.fillRect(1, 13, 182, 36);

            cx.save();
            if (selected) cx.filter = 'brightness(0)';
            if (!relIndex) this.autoSaveText.draw(game, cx, new Vector2(1, 49));
            else this.fileSaveTextList[relIndex-1].draw(game, cx, new Vector2(1, 49));
            if (!saveData) this.noData.draw(game, cx, new Vector2(92, 49));
            cx.restore();

            if (saveData) {
                saveData.skills.forEach((skill, j) => {
                    if (skill) cx.drawImage(game.assets.images['ui_charge_type'], 2 + j * 12, 2, 8, 8, 4 + j * 12, 3, 8, 8);
                });

                saveData.items.forEach((item, j) => {
                    if (item) {
                        cx.drawImage(game.assets.images['ui_items'], j * 20, 0, 20, 20, 3 + j * 20, 12, 20, 20);
                    }
                });
                
                saveData.keys.forEach((key, j) => {
                    if (key) cx.drawImage(game.assets.images['sp_key'], j * 16, 0, 16, 16, 165 - 13 * j, 14, 16, 16);
                });

                saveData.stages.forEach((stage, j) => {
                    if (stage) cx.drawImage(game.assets.images['ui_level_icon'], j * 32 + 5, 10, 22, 12, 3 + j * 26, 32, 22, 12);
                });

                saveData.achievements.forEach((achievement, j) => {
                    const stageIndex = Math.floor(j / 4);
                    if (achievement) {
                        cx.drawImage(game.assets.images[Math.floor(this.frameCount * .125) % 2 ? 'vfx_shine_white' : 'vfx_shine_2_white'], 2, 2, 5, 5, 4 + j * 5 + stageIndex * 6, 44, 5, 5);
                    }
                });

                cx.save();
                cx.translate(188, 0);
                cx.scale(-1, 1);
                if (saveData.noel) cx.drawImage(game.assets.images['sp_noel_idle'], 0, 1, 24, 23, 23, -10, 24, 23);
                cx.drawImage(game.assets.images['sp_ponytail'], 24, 0, 24, 13, -4, 0, 24, 13);
                cx.drawImage(game.assets.images['sp_flare_idle'], 0, 0, 32, 23, 4, -10, 32, 23);
                cx.restore();
            }
            cx.translate(0, 58);
        });
        cx.restore();

        for (let i = 0; i < this.saveDataArray.length; i++) {
            cx.drawImage(game.assets.images['vfx_smoke_white'], i === this.index ? 0 : 16, 0, 8, 8, 192, 51 + i * 12, 8, 8);
        }

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