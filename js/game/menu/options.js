class Options extends Menu {
    optionIndex = 0;
    options = [];

    sections = [
        {
            id: 'audio',
            options: [
                {
                    id:'sfx',
                    func2: (game, value) => {
                        game.seVolume = Math.max(0, Math.min(1, Math.round((game.seVolume + value) * 10) / 10));
                        game.saveData.setOpt('se', game.seVolume);
                    }
                },
                {
                    id:'bgm',
                    func2: (game, value) => {
                        game.bgmVolume = Math.max(0, Math.min(1, Math.round((game.bgmVolume + value) * 10) / 10));
                        game.saveData.setOpt('bgm', game.bgmVolume);
                        if (game.bgm) game.bgm.updateVolume();
                    }
                }
            ]
        },
        {
            id: 'video',
            options: [
                {
                    id:'fullscreen',
                    values: ['no', 'yes'].map(a => new TextElem(Array.from(a), 'left')),
                    func: (game, value) => {
                        game.toggleFullscreen();
                    },
                    func2: (game, value) => {
                        game.toggleFullscreen();
                    }
                },
                {
                    id:'integer scaling',
                    values: ['no', 'yes'].map(a => new TextElem(Array.from(a), 'left')),
                    func: (game, value) => {
                        game.scale = !game.scale;
                        game.saveData.setOpt('scale', game.scale);
                        game.resize();
                    },
                    func2: (game, value) => {
                        game.scale = !game.scale;
                        game.saveData.setOpt('scale', game.scale);
                        game.resize();
                    }
                }
            ]
        },
        {
            id: 'controls',
            options: [
                {
                    id:'customize',
                    func: (game, value) => game.menu = new Controls(game, game.menu)
                },
                {
                    id:'reset',
                    func: (game, value) => {
                        KEYCODES = {...DEFAULTKEYCODES};
                        KEYBOARDINPUT = {...DEFAULT_KEYBOARD_INPUT};
                        GAMEPAD_INPUT = {...GAMEPAD_DEFAULT_INPUT};
                        game.saveData.setOpt('keyboard', JSON.stringify(KEYCODES));
                        game.saveData.setOpt('gamepad', JSON.stringify(GAMEPAD_INPUT));
                    }
                }
            ]
        },
        {
            id: 'misc.',
            options: [
                {
                    id: 'screen shake',
                    values: ['no', 'yes'].map(a => new TextElem(Array.from(a), 'left')),
                    func: (game, value) => {
                        game.screenShake = !game.screenShake;
                        game.saveData.setOpt('screenShake', game.screenShake);
                    },
                    func2: (game, value) => {
                        game.screenShake = !game.screenShake;
                        game.saveData.setOpt('screenShake', game.screenShake);
                    }
                },
                {
                    id: 'color palette',
                    values: ['default', 'special'].map(a => new TextElem(Array.from(a), 'left')),
                    func: (game, value) => {
                        game.altColor = !game.altColor;
                        game.saveData.setOpt('altColor', game.altColor);
                    },
                    func2: (game, value) => {
                        game.altColor = !game.altColor;
                        game.saveData.setOpt('altColor', game.altColor);
                    }
                }
            ]
        },
        {
            id: 'data',
            options: [
                {
                    id:'delete save file',
                    func: (game, value) => game.menu = new SaveMenu(game, game.menu, 'delete')
                }
            ]
        }
    ];

    constructor(game, previousMenu=null) {
        super();
        this.previousMenu = previousMenu;

        if (!game.saveData.getOpt('altColorUnlocked')) {
            const section = this.sections.find(s => s.id === 'misc.');
            section.options = section.options.filter(opt => opt.id !== 'color palette');
        }

        this.titleText = new TextElem(Array.from('options'), 'center');
        this.sections.forEach(section => {
            section.title = new TextElem(Array.from(section.id), 'left');
            this.options.push(...section.options);
        });
        this.options.forEach(option => option.text = new TextElem(Array.from(option.id), 'left'));
    }

    menuInit = game => {

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
        } else if (game.keys.b && !selectedKey) this.closeMenuBuffer = true;
        else {
            const options = this.options.filter(opt => !opt.type || opt.type === KEYMODE);
            if (this.optionIndex >= options.length) this.optionIndex = 0;

            if (this.downBuffer && !game.keys.down) this.downBuffer = false;
            if (game.keys.down && !this.downBuffer) {
                this.downBuffer = true;
                this.optionIndex++;
                if (this.optionIndex === options.length) this.optionIndex = 0;
                game.playSound('menu');
            }

            if (this.upBuffer && !game.keys.up) this.upBuffer = false;
            if (game.keys.up && !this.upBuffer) {
                this.upBuffer = true;
                this.optionIndex--;
                if (this.optionIndex < 0) this.optionIndex = options.length - 1;
                game.playSound('menu');
            }

            if (this.leftBuffer && !game.keys.left) this.leftBuffer = false;
            if (this.rightBuffer && !game.keys.right) this.rightBuffer = false;
            if (options[this.optionIndex].func2) {
                if (game.keys.left && !this.leftBuffer) {
                    this.leftBuffer = true;
                    options[this.optionIndex].func2(game, -.1);
                    game.playSound('select');
                }
                if (game.keys.right && !this.rightBuffer) {
                    this.rightBuffer = true;
                    options[this.optionIndex].func2(game, .1);
                    game.playSound('select');
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
    
    drawOptions = (game, cx) => {
        cx.save();

        this.titleText.draw(game, cx, new Vector2(game.width * .5, 8));

        cx.translate(game.width * .5 - 96, 24);

        cx.translate(8, 0);

        this.sections.forEach((section, i) => {
            if (i) cx.translate(0, 16);
            section.title.draw(game, cx, new Vector2(16, 0));
            cx.translate(0, 10);

            section.options.forEach((opt, j) => {
                if (j) cx.translate(0, 10);
                opt.text.draw(game, cx, new Vector2(8, 0));

                if (opt === this.options[this.optionIndex]) {
                    cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, -Math.floor(this.frameCount * .05) % 2, 0, 8, 8);
                }
                
                cx.save();
                cx.translate(8, 0);
                switch (opt.id) {
                    case 'sfx':
                    case 'bgm':
                        const val = game[`${opt.id === 'sfx' ? 'se' : 'bgm'}Volume`];

                        cx.save();
                        cx.fillStyle = '#FFF';
                        cx.translate(96, 0);
                        for (let i = 0; i <= 10; i++) {
                            const currVal = i / 10;
                            if (val === currVal) cx.fillRect(i * 6, 0, 3, 7);
                            else if (val <= currVal) cx.fillRect(i * 6 + 1, 3, 1, 1);
                            else cx.fillRect(i * 6, 2, 3, 3);
                        }
                        cx.restore();
                        break;
                    case 'integer scaling':
                    case 'fullscreen':
                    case 'screen shake':
                    case 'color palette':
                        let value;
                        switch (opt.id) {
                            case 'integer scaling':
                                value = 'scale';
                                break;
                            case 'screen shake':
                                value = 'screenShake';
                                break;
                            case 'color palette':
                                value = 'altColor'
                                break;
                            default:
                                value = opt.id;
                                break;
                        }
                        opt.values[game[value] ? 1 : 0].draw(game, cx, new Vector2(96, 0));
                        break;
                    default:
                        break;
                }
                cx.restore();
            });
        });

        cx.restore();
    }
}