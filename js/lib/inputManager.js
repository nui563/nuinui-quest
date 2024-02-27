class KeyboardListener {
    keys = { left: false, right: false, down: false, up: false, a: false, b: false, c: false, l: false, r: false, start: false, d: false}

    constructor() {
        this.enable();
    }

    enable = () => {
        document.body.onkeydown = e => this.handler(e);
        document.body.onkeyup = e => this.handler(e);
    }

    disable = () => {
        document.body.onkeydown = null;
        document.body.onkeyup = null;
    }

    handler = e => {
        if (e.code in KEYCODES) {
            this.keys[KEYCODES[e.code]] = e.type === "keydown";
            e.preventDefault();
        }
    }
}

class InputManager {
    keyboard = null;
    gamepadIndex = null;

    constructor() {
        this.keyboard = new KeyboardListener();
        window.addEventListener('gamepadconnected', event => {
            this.gamepadIndex = event.gamepad.index;
            toggleKeyMode('gamepad');
        });
        window.addEventListener("gamepaddisconnected", event => {
            if (event.gamepad.index === this.gamepadIndex) {
                this.gamepadIndex = null;
                toggleKeyMode('keyboard');
            }
        });
    }

    getKeyboardKeys = () => this.keyboard.keys;

    getGamepadKeys = () => {
        if (this.gamepadIndex === null || this.gamepadIndex > navigator.getGamepads().length || !navigator.getGamepads()[this.gamepadIndex]) return {}
        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        const input = {};
        input.left = (gamepad.axes[0] && gamepad.axes[0] < -0.5) || (gamepad.buttons[14] && gamepad.buttons[14].value);
        input.right = (gamepad.axes[0] && gamepad.axes[0] > 0.5) || (gamepad.buttons[15] && gamepad.buttons[15].value);
        input.up = (gamepad.axes[1] && gamepad.axes[1] < -0.5) || (gamepad.buttons[12] && gamepad.buttons[12].value);
        input.down = (gamepad.axes[1] && gamepad.axes[1] > 0.5) || (gamepad.buttons[13] && gamepad.buttons[13].value);
        input.start = gamepad.buttons[9] && gamepad.buttons[9].value;
        Object.entries(GAMEPAD_INPUT).forEach(([key, value]) => {
            input[key] = value.some(i => gamepad.buttons[i] && gamepad.buttons[i].value);
        });
        return input;
    }
}

let KEYMODE = 'keyboard';

const GAMEPAD_DEFAULT_INPUT = {
    l: [4, 6],
    r: [5, 7],
    a: [0],
    b: [1, 2],
    c: [3],
    d: []
}
let GAMEPAD_INPUT = {...GAMEPAD_DEFAULT_INPUT};

const DEFAULTKEYCODES = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowDown: "down",
    KeyZ: "a",
    KeyX: "b",
    KeyC: "c",
    KeyA: "l",
    KeyS: "r",
    Enter: "start"
}
let KEYCODES = {...DEFAULTKEYCODES};

const DEFAULT_KEYBOARD_INPUT = {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    a: "KeyZ",
    b: "KeyX",
    c: "KeyC",
    l: "KeyA",
    r: "KeyS",
    start: "Enter",
    d: ""
}
let KEYBOARDINPUT = {...DEFAULT_KEYBOARD_INPUT};
const updateKeycodes = () => {
    KEYCODES = new Object();
    for (const [key, value] of Object.entries(KEYBOARDINPUT)) KEYCODES[value] = key;
}
let selectedKey = null;
const cancelKeyChange = (game, key, opt) => {
    opt.value = KEYBOARDINPUT[key];
    game.inputManager.keyboard.enable();
    selectedKey = null;
}
const changeKeyHandle = (game, e, opt) => {
    const other = Object.entries(KEYBOARDINPUT).find(([key, value]) => value === e.code);
    if (other && other[0] !== selectedKey) return;
    KEYBOARDINPUT[selectedKey] = e.code;
    opt.value = e.code;
    updateKeycodes();
    game.saveData.setOpt('keyboard', JSON.stringify(KEYCODES));
    game.inputManager.keyboard.enable();
    selectedKey = null;
}
const changeKeyKeyboard = (game, opt, key) => {
    if (selectedKey) cancelKeyChange(game, selectedKey, opt);
    selectedKey = key;
    opt.value = '...';
    game.inputManager.keyboard.disable();
    document.body.onkeydown = e => changeKeyHandle(game, e, opt);
}
const resetKeys = game => {
    if (selectedKey) cancelKeyChange(game, selectedKey);
    KEYCODES = {...DEFAULTKEYCODES};
    GAMEPAD_INPUT = {...GAMEPAD_DEFAULT_INPUT};
    game.menu.options.filter(opt => opt.type === 'keyboard').forEach(opt => opt.value = KEYCODES[opt.id]);
    game.saveData.setOpt('keyboard', JSON.stringify(KEYCODES));
    game.saveData.setOpt('gamepad', JSON.stringify(GAMEPAD_INPUT));
}
const toggleKeyMode = value => KEYMODE = value;