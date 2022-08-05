class StageSelect {
    frameCount = 0;
    transitionAlpha = 1;

    constructor(game, currentStage, selectedStage) {
        this.currentStage = currentStage;
        this.selectedStage = selectedStage;
        if (currentStage !== selectedStage) game.checkpoint = null;

        game.resetCanvas();
        
        // Save
        for (let i = 0; i < 5; i++) document.getElementById(`save-stage-${i+1}`).onclick = e => null;
    }

    update = game => {
        if (!this.frameCount) game.stopBGM();

        if (this.frameCount < 30) this.transitionAlpha = 1 - this.frameCount / 30;
        else if (this.frameCount < 150) this.transitionAlpha = 0;
        else this.transitionAlpha = (this.frameCount - 150) / 30;

        if (this.frameCount === 90) game.playSound('select');

        if (this.frameCount === 180) {
            game.currentStage = this.selectedStage;
            game.scene = new Scene(game, JSON.parse(game.data).game.stages[this.selectedStage]);
        }

        this.frameCount++;
    }

    draw = game => {
        for (let i = 0; i < 4; i++) {
            const cx = game[`ctx${i}`];
            cx.save();
            switch (i) {
                case 0:
                    cx.fillStyle = "#000";
                    cx.fillRect(0, 0, game.width, game.height);
                    break;
                case 3:
                    cx.clearRect(0, 0, game.width, game.height);
                    cx.translate(game.width / 2 - 112, 0);
                    for (let i = 0; i < 5; i++) {
                        const stage = this.frameCount < 90 ? this.currentStage : this.selectedStage;
                        cx.save();
                        cx.globalAlpha = i === stage ? 1 : .125;
                        if (i === stage) {
                            const val = Math.round(Math.cos((this.frameCount * 6) * (Math.PI / 180)) * 2);
                            cx.drawImage(game.assets.images['ui_arrow_down'], 0, 0, 8, 8, 48 * i + 12, game.height / 2 - 32 + val, 8, 8);
                        }
                        cx.drawImage(game.assets.images['ui_level_icon'], 32 * i, 0, 32, 32, 48 * i, game.height / 2 - 16, 32, 32);
                        cx.drawImage(game.assets.images['ui_level_label'], 0, 6 * i, 48, 6, 48 * i - 8, game.height / 2 + 20, 48, 6);
                        cx.restore();
                    }

                    cx.fillStyle = '#000';
                    cx.globalAlpha = this.transitionAlpha;
                    cx.fillRect(0, 0, game.width, game.height);
                    break;
            }
            cx.restore();
        }
    }
}