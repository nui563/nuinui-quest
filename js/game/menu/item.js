import { Menu, SaveMenu } from './menu.js';
import { StageSelect } from './stageSelect.js';
import { Achievements } from './achievements.js';
import { Options } from './options.js';
import { Noel } from '../actor/noel.js';
import { currentInputSettings } from '../../lib/inputManager.js';
import { TextElem } from '../../lib/text.js';
import { Flare } from '../actor/flare.js';
import { Vector2 } from '../../lib/gameEngine.js';

class Item extends Menu {
    optionIndex = 0;

    progress = 0;

    aBuffer = true;

    options = [
        {
            id:'stage select',
            func: (g, value) => g.menu = new StageSelect(g, false, g.menu)
        },
        {
            id:'achievements',
            func: (g, value) => g.menu = new Achievements(g, g.menu)
        },
        {
            id:'game mode',
            values: ['flare', 'noel', 'cursed'].map(a => new TextElem(Array.from(a), 'left')),
            func: (g, value) => {
                g.menu.gamemodeIndex++;
                g.menu.applyMode(g);
            },
            func2: (g, value) => {
                g.menu.gamemodeIndex += value > 0 ? 1 : -1;
                g.menu.applyMode(g);
            }
        },
        {
            id:'options',
            func: (g, value) => g.menu = new Options(g, g.menu)
        },
        {
            id:'save',
            func: (g, value) => g.menu = new SaveMenu(g, g.menu, 'save')
        },
        {
            id:'load',
            func: (g, value) => g.menu = new SaveMenu(g, g.menu, 'load')
        },
        {
            id:'return to title',
            func: (g, value) => location.reload()
        }
    ];

    constructor(game) {
        super();
        this.options.forEach(option => option.text = new TextElem(Array.from(option.id), 'left'));
        if (!game.saveData.getItem(`nuinui-save-item-noel`)) this.options = this.options.filter(o => o.id !== 'game mode');
        
        this.menuInit(game);

        // lowpass filter
        // game.bgm.source.stop();
        // game.bgm.gainNode.gain.value = 0;
        // this.biquadFilter = game.audioCtx.createBiquadFilter();
        // this.biquadFilter.type = 'lowpass';
        // this.biquadFilter.frequency.setValueAtTime(200, game.audioCtx.currentTime + 1);
        // game.source.connect(this.biquadFilter);
        // this.biquadFilter.connect(game.audioCtx.destination);
        // game.biquadFilter = this.biquadFilter;
    }

    menuInit(game) {
        this.skills = [];
        this.skillsTitle = new TextElem(Array.from('skills'), 'right');
        ['fire', 'rocket', 'petal', 'sword', 'shield', 'dual'].forEach(skill => this.skills.push(game.saveData.getItem(`nuinui-save-item-${skill}`)));

        this.keys = [];
        this.keysTitle = new TextElem(Array.from('keys'), 'right');
        for (let i = 0; i < 5; i++) this.keys.push(game.saveData.getItem(`nuinui-save-item-key${i}`));

        // unlock cursed mode
        this.achievementCount = 0;
        for (let i = 1; i <= 28; i++) {
            if (game.saveData.getItem(`nuinui-save-achievement-${i}`)) this.achievementCount++;
        }
        if (!game.saveData.getItem('nuinui-save-item-bow') && this.achievementCount === 28) game.saveData.setItem('nuinui-save-item-bow', true);
        this.achievementCountText = new TextElem(Array.from(`${this.achievementCount}/28`), 'left');

        this.items = [];
        this.itemsTitle = new TextElem(Array.from('items'), 'right');
        ['gun', 'clock', 'jump', 'boots', 'bow'].forEach(item => this.items.push(game.saveData.getItem(`nuinui-save-item-${item}`)));

        this.gamemodes = ['flare'];
        if (game.saveData.getItem('nuinui-save-item-noel')) this.gamemodes.push('noel');
        if (game.saveData.getItem('nuinui-save-item-bow')) this.gamemodes.push('cursed');
        this.gamemodeIndex = game.mode === 'cursed' ? 2 : game.mode === 'noel' ? 1 : 0;
    }

    applyMode(game) {
        if (this.gamemodeIndex < 0) this.gamemodeIndex = this.gamemodes.length - 1;
        if (this.gamemodeIndex === this.gamemodes.length) this.gamemodeIndex = 0;
        game.mode = this.gamemodes[this.gamemodeIndex];

        const className = game.mode === 'noel' ? Noel : Flare;
        const oldPlayer = game.scene.actors.find(a => a instanceof Flare);
        game.scene.actors = game.scene.actors.filter(a => a !== oldPlayer);
        const newPlayer = new className(game, oldPlayer.pos, oldPlayer.size);
        newPlayer.setAnimation('idle');
        newPlayer.playerControl = true;
        newPlayer.vel = oldPlayer.vel;
        newPlayer.dir = oldPlayer.dir;
        newPlayer.isGrounded = oldPlayer.isGrounded;
        newPlayer.isSliding = oldPlayer.isSliding;
        newPlayer.health = oldPlayer.health;
        newPlayer.jetski = oldPlayer.jetski;
        newPlayer.moto = oldPlayer.moto;
        newPlayer.doubleJumpBuffer = oldPlayer.doubleJumpBuffer;
        game.scene.actors.push(newPlayer);
        game.scene.view.target = newPlayer;

        if (game.scene.achievement23 && game.mode === 'noel') game.scene.achievement23 = false;
        if (game.scene.achievement24 && game.mode !== 'noel') game.scene.achievement24 = false;
    }

    update(game) {
        if (this.closeMenuBuffer && !game.keys.b) {
            this.closeMenuFrame--;
            if (!this.closeMenuFrame) {
                // this.biquadFilter.disconnect();
                // game.bgm.gainNode.gain.value = game.bgmVolume;
                game.menu = null;
                game.ctx3.clearRect(0, 0, game.width, game.height);
            }
        } else if (game.keys.b) this.closeMenuBuffer = true;
        else {
            const options = this.options.filter(opt => !opt.type || opt.type === currentInputSettings.KEYMODE);
            if (this.optionIndex >= options.length) this.optionIndex = 0;

            if (this.downBuffer && !game.keys.down) this.downBuffer = false;
            if (game.keys.down && !this.downBuffer) {
                this.downBuffer = true;
                this.optionIndex++;
                if (this.optionIndex === options.length) this.optionIndex = 0;
                game.playSound('menu_move');
            }

            if (this.upBuffer && !game.keys.up) this.upBuffer = false;
            if (game.keys.up && !this.upBuffer) {
                this.upBuffer = true;
                this.optionIndex--;
                if (this.optionIndex < 0) this.optionIndex = options.length - 1;
                game.playSound('menu_move');
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
        
        this.progress = Math.min(1, this.frameCount * .05);
        this.frameCount++;
    }
    
    drawOptions(game, cx) {
        cx.save();

        cx.translate(game.width * .5 - 96, 12);
        this.options.filter(opt => !opt.type || opt.type === currentInputSettings.KEYMODE).forEach((opt, i) => {
            opt.text.draw(game, cx, new Vector2(16, 0));

            cx.save();
            
            if (this.optionIndex === i) {
                cx.drawImage(game.assets.images['ui_arrow'], 0, 0, 8, 8, 8 - Math.floor(this.frameCount * .05) % 2, 0, 8, 8);
            }

            cx.translate(16, 0);
            switch (opt.id) {
                case 'game mode':
                    opt.values[this.gamemodeIndex].draw(game, cx, new Vector2(96, 0));
                    break;
                case 'achievements':
                    this.achievementCountText.draw(game, cx, new Vector2(96, 0));
                    break;
                default:
                    break;
            }
            cx.restore();
            cx.translate(0, 10);
        });
        cx.restore();

        // items
        cx.save();
        cx.translate(game.width * .5 - 51 - 16, game.height - 92);
        cx.fillStyle = '#3F3FBF';
        cx.fillRect(-5, -5, 102, 22);
        cx.fillStyle = '#0F0F3F';
        cx.fillRect(-4, -4, 100, 20);
        this.itemsTitle.draw(game, cx, new Vector2(96, -12));
        this.items.forEach((item, i) => {
            if (item) {
                const offset = (i+1) * 10 - this.frameCount;
                const progress = Math.min(1, Math.max(0, this.progress - offset * .1));
                cx.globalAlpha = progress;
                const xOffset = Math.round(8 * (1 - Math.pow(2, -10 * progress)));
                cx.drawImage(game.assets.images['ui_items'], i * 20, 0, 20, 20, i * 20 + 4 - xOffset, -4, 20, 20);
            }
        });
        cx.restore();

        // skills
        cx.save();
        cx.translate(game.width * .5 - 51 - 16, game.height - 60);
        cx.fillStyle = '#3F3FBF';
        cx.fillRect(-5, -5, 102, 22);
        cx.fillStyle = '#0F0F3F';
        cx.fillRect(-4, -4, 100, 20);
        this.skillsTitle.draw(game, cx, new Vector2(96, -12));
        this.skills.forEach((skill, i) => {
            if (skill) {
                const offset = (i+1) * 6 - this.frameCount;
                const progress = Math.min(1, Math.max(0, this.progress - offset * .1));
                cx.globalAlpha = progress;
                const xOffset = Math.round(8 * (1 - Math.pow(2, -10 * progress)));
                cx.drawImage(game.assets.images['ui_charge_type'], i * 12, 0, 12, 12, i * 16 + 8 - xOffset, 0, 12, 12);
            }
        });
        cx.restore();

        // keys
        cx.save();
        cx.translate(game.width * .5 - 51 - 16, game.height - 28);
        cx.fillStyle = '#3F3FBF';
        cx.fillRect(-5, -5, 102, 22);
        cx.fillStyle = '#0F0F3F';
        cx.fillRect(-4, -4, 100, 20);
        this.keysTitle.draw(game, cx, new Vector2(96, -12));
        this.keys.forEach((key, i) => {
            if (key) {
                const offset = (i+1) * 8 - this.frameCount;
                const progress = Math.min(1, Math.max(0, this.progress - offset * .1));
                cx.globalAlpha = progress;
                const xOffset = Math.round(8 * (1 - Math.pow(2, -10 * progress)));
                cx.drawImage(game.assets.images['sp_key'], i * 16, 0, 16, 16, -2 + i * 20 + 8 - xOffset, -2, 16, 16);
            }
        });
        cx.restore();
        
        // portrait
        cx.save();
        cx.globalAlpha = this.progress;
        const xOffset = Math.round(48 * (1 - Math.pow(2, -10 * this.progress)));
        cx.drawImage(game.assets.images['ui_flare'], 0, 0, 128, 144, game.width - 96 - xOffset, game.height - 144, 128, 144);
        cx.restore();
    }
}

export { Item };
