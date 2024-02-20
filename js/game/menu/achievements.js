class Achievements extends Menu {
    index = 0;

    constructor(game, previousMenu=null) {
        super();
        this.previousMenu = previousMenu;

        this.titleText = new TextElem(Array.from('achievements'), 'center');

        this.stages = [];
        [
            [
                { en: "defeat the first boss (no hit)", jp: "さいしょ の ボス を たおす（ノーヒット）" },
                { en: "win 3 times at tsunomaki janken", jp: "つのまきじゃんけん で 3かい かつ" },
                { en: "defeat pekora (no jump)", jp: "うさだ ぺこら を たおす（ジャンプ なし）" },
                { en: "clear stage (in under 5 minutes)", jp: "ステージ を クリアする（5ふん いない）" }
            ],
            [
                { en: "clear stage (no hit from scythes)", jp: "ステージ を クリアする（おおがま ヒット なし）" },
                { en: "find shion", jp: "むらさき シオン を さがす" },
                { en: "defeat miko (no charge shot)", jp: "さくら みこ を たおす（チャージショット なし）" },
                { en: "clear stage (in under 5 minutes)", jp: "ステージ を クリアする（5ふん いない）" }
            ],
            [
                { en: "find the hidden room", jp: "かくしべや を さがす" },
                { en: "defeat aqua", jp: "みなと あくあ を たおす" },
                { en: "clear stage (no hit from rocks)", jp: "ステージ を クリアする（がんせき ヒット なし）" },
                { en: "clear stage (in under 5 minutes)", jp: "ステージ を クリアする（5ふん いない）" }
            ],
            [
                { en: "find poyoyo", jp: "ぽよよ を さがす" },
                { en: "defeat ayame with her own a.t. field", jp: "atフィールド で なきり あやめ を たおす" },
                { en: "survive 1 minute in the last room", jp: "さいご の へや で 1ふんかん いきのこる" },
                { en: "clear stage (in under 5 minutes)", jp: "ステージ を クリアする（5ふん いない）" }
            ],
            [
                { en: "unlock noel as a playable character", jp: "しろがね ノエル を アンロック" },
                { en: "bad end", jp: "" },
                { en: "good end", jp: "" },
                { en: "clear stage (in under 5 minutes)", jp: "ステージ を クリアする（5ふん いない）" }
            ],
            [
                { en: "shoot fire bullets underwater", jp: "すいちゅう で ひのたま を うつ" },
                { en: "defeat ame while time is slowed down", jp: "とき を とめて アメリア を たおす" },
                { en: "clear stage (flare only)", jp: "ステージ を クリアする（フレアだけ）" },
                { en: "clear stage (noel only)", jp: "ステージ を クリアする（ノエルだけ）" }
            ],
            [
                { en: "bounce twice without landing", jp: "じめん に ふれず に 2かい バウンドする" },
                { en: "defeat kanata (no fall)", jp: "あまね かなた を たおす（らっか なし）" },
                { en: "defeat the secret boss", jp: "シークレットボス を たおす" },
                { en: "true end", jp: "" }
            ]
        ].forEach((arr, i) => {
            if (game.saveData.getItem(`nuinui-save-stage-${i+1}`)) {
                const stage = {
                    label: new TextElem(Array.from(`stage ${i+1}`), 'center'),
                    achievements: []
                }
                arr.forEach(({en, jp}, j) => {
                    stage.achievements.push({
                        textEN: new TextElem(Array.from(en), 'left'),
                        textJP: new TextElem(Array.from(jp), 'left', 'jp'),
                        unlocked: game.saveData.getItem(`nuinui-save-achievement-${i*4+j+1}`)
                    });
                });
                this.stages.push(stage);
            }
        });
    }

    update = game => {
        if (this.closeMenuBuffer && !game.keys.b) {
            this.closeMenuFrame--;
            if (!this.closeMenuFrame) {
                if (this.previousMenu) {
                    this.previousMenu.frameCount = 0;
                    this.previousMenu.progress = 0;
                }
                game.menu = this.previousMenu;
                game.ctx3.clearRect(0, 0, game.width, game.height);
            }
        } else if (game.keys.b) this.closeMenuBuffer = true;
        else {
            if (this.rightBuffer && !game.keys.right) this.rightBuffer = false;
            if (game.keys.right && !this.rightBuffer) {
                this.rightBuffer = true;
                this.index++;
                if (this.index === this.stages.length) this.index = 0;
                game.playSound('menu_move');
            }

            if (this.leftBuffer && !game.keys.left) this.leftBuffer = false;
            if (game.keys.left && !this.leftBuffer) {
                this.leftBuffer = true;
                this.index--;
                if (this.index < 0) this.index = this.stages.length - 1;
                game.playSound('menu_move');
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
        cx.fillRect(game.width * .5 - 128, 0, 256, game.height);
        cx.fillStyle = '#3F3FBF';
        cx.fillRect(game.width * .5 - 128 + 1, 0, 1, game.height);
        cx.fillRect(game.width * .5 + 128 - 2, 0, 1, game.height);
    }

    drawOptions = (game, cx) => {
        cx.save();

        this.titleText.draw(game, cx, new Vector2(game.width * .5, 8));


        cx.save();
        const stage = this.stages[this.index];
        stage.label.draw(game, cx, new Vector2(game.width * .5, 20));

        if (this.stages.length > 1) {
            cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, game.width * .5 + 32 - Math.floor(this.frameCount * .05) % 2, 20, 8, 8);
            cx.save();
            cx.scale(-1, 1);
            cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, -game.width * .5 + 32 - Math.floor(this.frameCount * .05) % 2, 20, 8, 8);
            cx.restore();
        }
        
        cx.translate(game.width * .5 - 128, 32);
        const gradient = cx.createLinearGradient(0, 32, 32, 0);
        gradient.addColorStop(0, '#007FBF');
        gradient.addColorStop(1, '#7FFFFF');

        stage.achievements.forEach((achievement, i) => {
            cx.filter = achievement.unlocked ? 'none' : 'saturate(0)';
            cx.fillStyle = '#00003F';
            cx.fillRect(42, 4, 204, 24);
            achievement.textEN.draw(game, cx, new Vector2(48, 8));
            achievement.textJP.draw(game, cx, new Vector2(48, 17));
            cx.fillStyle = gradient;
            cx.fillRect(8, 0, 32, 32);
            cx.drawImage(game.assets.images['ui_achievements'], i * 32, this.index * 32, 32, 32, 8, 0, 32, 32);
            cx.translate(0, 40);
        });
        cx.restore();

        cx.restore();
    }
}