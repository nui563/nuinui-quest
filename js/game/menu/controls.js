class Controls extends Menu {
    optionIndex = 0;

    aBuffer = true;

    labels = {
        a: 'jump',
        b: 'attack',
        c: 'item',
        l: 'skill-',
        r: 'skill+',
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down',
        start: 'menu',
        d: 'dash'
    }

    gamepadOptions = [
        'a',
        'b',
        'c',
        'l',
        'r',
        'd'
    ];

    options = [];
    selectedOpt = null;

    constructor(game, previousMenu=null) {
        super();
        this.previousMenu = previousMenu;

        this.titleText = new TextElem(Array.from('controls'), 'center');
        [6, 7, 4, 5, 3, 1, 2, 0].forEach(i => {
            const value = Object.keys(GAMEPAD_INPUT).find(key => GAMEPAD_INPUT[key].includes(i));
            const opt = { id: i, value: value, type: 'gamepad' };
            opt.func = game => this.listenToGamepadInputInit(opt);
            this.options.push(opt);
        });
        Object.entries(KEYBOARDINPUT).forEach(([key, value]) => {
            const opt = { id: key, value: value, type:'keyboard' };
            opt.func = game => changeKeyKeyboard(game, opt, key);
            this.options.push(opt);
        });
        Object.entries(this.labels).forEach(([key, value]) => this.labels[key] = new TextElem(Array.from(value), 'left'));
    }
    
    menuInit = game => {

    }

    listenToGamepadInputInit = opt => {
        // cancel if try to change the only a button
        if (opt.value === 'a' && GAMEPAD_INPUT.a.length === 1) return;
        this.listenToGamepadInput = true;
        this.selectedOpt = {
            opt: opt,
            index: this.gamepadOptions.indexOf(opt.value)
        }
        if (this.selectedOpt.index === -1) this.selectedOpt.index = 0;
    }

    cancelGamepadInput = () => {
        this.listenToGamepadInput = false;
        this.selectedOpt = null;
    }

    update = game => {
        if (this.bBuffer && !game.keys.b) this.bBuffer = false;
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
        } else if (game.keys.b && !selectedKey && !this.listenToGamepadInput && !this.bBuffer) this.closeMenuBuffer = true;
        else if (this.listenToGamepadInput) {
            const opt = this.selectedOpt.opt;
            const options = this.gamepadOptions;
            if (this.downBuffer && !game.keys.down) this.downBuffer = false;
            if (game.keys.down && !this.downBuffer) {
                this.downBuffer = true;
                this.selectedOpt.index++;
                if (this.selectedOpt.index === options.length) this.selectedOpt.index = 0;
                game.playSound('menu');
            }

            if (this.upBuffer && !game.keys.up) this.upBuffer = false;
            if (game.keys.up && !this.upBuffer) {
                this.upBuffer = true;
                this.selectedOpt.index--;
                if (this.selectedOpt.index < 0) this.selectedOpt.index = options.length - 1;
                game.playSound('menu');
            }

            if (game.keys.b && !this.bBuffer) {
                this.bBuffer = true;
                this.cancelGamepadInput();
                game.playSound('menu');
            }

            if (this.aBuffer && !game.keys.a) this.aBuffer = false;
            if (game.keys.a && !this.aBuffer) {
                this.aBuffer = true;
                this.bBuffer = true;
                if (opt.value) GAMEPAD_INPUT[opt.value] = GAMEPAD_INPUT[opt.value].filter(i => i !== opt.id);
                opt.value = options[this.selectedOpt.index];
                GAMEPAD_INPUT[opt.value].push(opt.id);
                this.cancelGamepadInput();
                game.playSound('select');
                game.saveData.setOpt('gamepad', JSON.stringify(GAMEPAD_INPUT));
            }
        } else {
            const options = this.options.filter(opt => !opt.type || opt.type === KEYMODE);
            if (this.optionIndex >= options.length) this.optionIndex = 0;

            if (this.downBuffer && !game.keys.down) this.downBuffer = false;
            if (game.keys.down && !this.downBuffer) {
                this.downBuffer = true;
                this.optionIndex += KEYMODE === 'keyboard' ? 1 : 2;
                if (this.optionIndex === options.length) this.optionIndex = 0;
                game.playSound('menu');
            }

            if (this.upBuffer && !game.keys.up) this.upBuffer = false;
            if (game.keys.up && !this.upBuffer) {
                this.upBuffer = true;
                this.optionIndex += KEYMODE === 'keyboard' ? -1 : -2;
                if (this.optionIndex < 0) this.optionIndex = options.length - 1;
                game.playSound('menu');
            }

            if (this.leftBuffer && !game.keys.left) this.leftBuffer = false;
            if (this.rightBuffer && !game.keys.right) this.rightBuffer = false;
            if (KEYMODE === 'gamepad') {
                if (game.keys.left && !this.leftBuffer) {
                    this.leftBuffer = true;
                    this.optionIndex += this.optionIndex % 2 ? -1 : 1;
                    if (this.optionIndex < 0) this.optionIndex = options.length - 1;
                    game.playSound('menu');
                }
                if (game.keys.right && !this.rightBuffer) {
                    this.rightBuffer = true;
                    this.optionIndex -= this.optionIndex % 2 ? 1 : -1;
                    if (this.optionIndex === options.length) this.optionIndex = 0;
                    game.playSound('menu');
                }
            }

            if (this.aBuffer && !game.keys.a) this.aBuffer = false;
            if (game.keys.a && !this.aBuffer && options[this.optionIndex].func) {
                this.aBuffer = true;
                options[this.optionIndex].func(game, .1);
                game.playSound('select');
            }
        }
        
        this.frameCount++;
    }

    drawKeyboardOption = (game, cx, options) => {
        options.forEach((opt, i) => {
            this.labels[opt.id].draw(game, cx, new Vector2(16, 0));
            cx.save();
            if (this.optionIndex === i) {
                cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, 8 - Math.floor(this.frameCount * .05) % 2, 0, 8, 8);
            }
            cx.translate(16, 0);
            if (opt.value) new TextElem(Array.from(opt.value.toLowerCase()), 'left').draw(game, cx, new Vector2(96, 0));
            cx.restore();
            cx.translate(0, 12);
        });
    }

    drawGamepadOption = (game, cx, options) => {
        cx.drawImage(game.assets.images['ui_gamepad'], 0, 0, 192, 64, 0, 0, 192, 64);
        options.forEach((opt, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            // this.labels[opt.id].draw(game, cx, new Vector2(16 + col * 32, 0 + row * 12));
            cx.save();
            cx.translate(col * 128, 5 + row * 16);
            if (this.optionIndex === i) {
                cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, 8 - Math.floor(this.frameCount * .05) % 2, 0, 8, 8);
                if (this.selectedOpt && this.selectedOpt.opt.id === opt.id) {
                    cx.globalAlpha = .5;
                }
            }
            if (opt.value) this.labels[opt.value].draw(game, cx, new Vector2(16, 0));
            cx.restore();
        });
        if (this.selectedOpt) {
            cx.translate(64, 72);
            const options = this.gamepadOptions;
            options.forEach((opt, i) => {
                cx.save();
                cx.translate(0, i * 12);
                if (i === this.selectedOpt.index) {
                    cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, 8 - Math.floor(this.frameCount * .05) % 2, 0, 8, 8);
                }
                this.labels[opt].draw(game, cx, new Vector2(16, 0));
                cx.restore();
            });
        }
    }

    drawOptions = (game, cx) => {
        cx.save();
        this.titleText.draw(game, cx, new Vector2(game.width * .5, 8));
        cx.translate(game.width * .5 - 96, 24);
        const options = this.options.filter(opt => opt.type === KEYMODE);
        if (KEYMODE === 'keyboard') this.drawKeyboardOption(game, cx, options);
        else this.drawGamepadOption(game, cx, options);
        cx.restore();
    }
}