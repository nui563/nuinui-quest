class StageSelect extends Menu {
    frameCount = 0;
    
    aBuffer = true;

    constructor(game, auto, previousMenu=null) {
        super();
        this.auto = auto;
        this.previousMenu = previousMenu;
        this.stageIndex = game.currentStage;
        
        this.stages = [];
        ['falls', 'casino', 'port', 'yamato', 'westa', 'holo hq', 'heaven'].forEach((label, i) => {
            if (game.saveData.getItem(`nuinui-save-stage-${i+1}`)) this.stages.push({index:i,label:new TextElem(Array.from(label), 'center')});
        });
        // this.stages.push({index:7, label:new TextElem(Array.from('test'), 'center')});
    }

    confirm = game => {
        game.setStage(this.stages[this.stageIndex].index);
        game.ctx3.clearRect(0, 0, game.width, game.height);
    }

    update = game => {
        if (this.auto) {
            if (this.frameCount === 60) {
                game.playSound('select');
                game.currentStage++;
                this.stageIndex++;
                if (game.currentStage > 6) {
                    game.currentStage = 0;
                    this.stageIndex = 0;
                }
            }
            if (this.frameCount === 180) {
                this.confirm(game);
                game.saveData.save('auto');
            }
        } else {
            if (this.confirmBuffer && !game.keys.a) {
                this.confirm(game);
            } else if (this.closeMenuBuffer && !game.keys.b) {
                this.closeMenuFrame--;
                if (!this.closeMenuFrame) {
                    if (this.previousMenu) {
                        this.previousMenu.frameCount = 0;
                        this.previousMenu.progress = 0;
                    }
                    game.menu = this.previousMenu;
                    game.ctx3.clearRect(0, 0, game.width, game.height);
                }
            } else if (game.keys.b && this.previousMenu) this.closeMenuBuffer = true;
            else {
                if (this.leftBuffer && !game.keys.left) this.leftBuffer = false;
                if (this.rightBuffer && !game.keys.right) this.rightBuffer = false;
                if (game.keys.left && !this.leftBuffer) {
                    this.leftBuffer = true;
                    this.stageIndex--;
                    if (this.stageIndex < 0) this.stageIndex = this.stages.length - 1;
                    game.playSound('menu');
                }
                if (game.keys.right && !this.rightBuffer) {
                    this.rightBuffer = true;
                    this.stageIndex++;
                    if (this.stageIndex === this.stages.length) this.stageIndex = 0;
                    game.playSound('menu');
                }
    
                if (this.aBuffer && !game.keys.a) this.aBuffer = false;
                if (game.keys.a && !this.aBuffer) {
                    this.aBuffer = true;
                    this.confirmBuffer = true;
                    game.playSound('select');
                }
            }
        }
        this.frameCount++;
    }

    drawBackground = (game, cx) => {
        cx.save();
        cx.globalAlpha = .5;
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, game.width, game.height);
        cx.restore();
        cx.fillRect(0, game.height * .5 - 40, game.width, 80);
        cx.fillStyle = '#3F3FBF';
        cx.fillRect(0, game.height * .5 - 40 + 1, game.width, 1);
        cx.fillRect(0, game.height * .5 + 40 - 2, game.width, 1);
    }

    drawOptions = (game, cx) => {
        cx.save();

        const offset = this.stages.length === 7 ? 44 : 48;

        cx.translate(game.width * .5 - (this.stages.length - 1) * offset * .5, game.height * .5);

        this.stages.forEach((stage, i) => {
            if (i === this.stageIndex) {
                const val = Math.round(Math.cos((this.frameCount * 6) * (Math.PI / 180)) * 2);
                cx.drawImage(game.assets.images['ui_arrow_down'], 0, 0, 8, 8, -4, val - 32, 8, 8);
            }

            cx.drawImage(game.assets.images['ui_level_icon'], 32 * stage.index, 0, 32, 32, -16, -20, 32, 32);
            stage.label.draw(game, cx, new Vector2(0, 20));

            cx.translate(offset, 0);
        });

        cx.restore();
    }
}