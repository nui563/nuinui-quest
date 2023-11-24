class KeyboardListener {
    keys = { left: false, right: false, down: false, up: false, a: false, b: false, c: false, l: false, r: false, start: false }

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
        switch (GAMEPADTYPE) {
            case 'a':
                return {
                    left: (gamepad.axes[0] && gamepad.axes[0] < -0.5) || (gamepad.buttons[14] && gamepad.buttons[14].value),
                    right: (gamepad.axes[0] && gamepad.axes[0] > 0.5) || (gamepad.buttons[15] && gamepad.buttons[15].value),
                    up: (gamepad.axes[1] && gamepad.axes[1] < -0.5) || (gamepad.buttons[12] && gamepad.buttons[12].value),
                    down: (gamepad.axes[1] && gamepad.axes[1] > 0.5) || (gamepad.buttons[13] && gamepad.buttons[13].value),
                    a: (gamepad.buttons[0] && gamepad.buttons[0].value),
                    b: (gamepad.buttons[1] && gamepad.buttons[1].value) || (gamepad.buttons[2] && gamepad.buttons[2].value),
                    c: (gamepad.buttons[3] && gamepad.buttons[3].value),
                    l: (gamepad.buttons[4] && gamepad.buttons[4].value) || (gamepad.buttons[6] && gamepad.buttons[6].value),
                    r: (gamepad.buttons[5] && gamepad.buttons[5].value) || (gamepad.buttons[7] && gamepad.buttons[7].value),
                    start: (gamepad.buttons[9] && gamepad.buttons[9].value)
                }
            case 'b':
                return {
                    left: (gamepad.axes[0] && gamepad.axes[0] < -0.5) || (gamepad.buttons[14] && gamepad.buttons[14].value),
                    right: (gamepad.axes[0] && gamepad.axes[0] > 0.5) || (gamepad.buttons[15] && gamepad.buttons[15].value),
                    up: (gamepad.axes[1] && gamepad.axes[1] < -0.5) || (gamepad.buttons[12] && gamepad.buttons[12].value),
                    down: (gamepad.axes[1] && gamepad.axes[1] > 0.5) || (gamepad.buttons[13] && gamepad.buttons[13].value),
                    a: (gamepad.buttons[1] && gamepad.buttons[1].value) || (gamepad.buttons[2] && gamepad.buttons[2].value),
                    b: (gamepad.buttons[0] && gamepad.buttons[0].value),
                    c: (gamepad.buttons[3] && gamepad.buttons[3].value),
                    l: (gamepad.buttons[4] && gamepad.buttons[4].value) || (gamepad.buttons[6] && gamepad.buttons[6].value),
                    r: (gamepad.buttons[5] && gamepad.buttons[5].value) || (gamepad.buttons[7] && gamepad.buttons[7].value),
                    start: (gamepad.buttons[9] && gamepad.buttons[9].value)
                }
            case 'c':
                return {
                    left: (gamepad.axes[0] && gamepad.axes[0] < -0.5) || (gamepad.buttons[14] && gamepad.buttons[14].value),
                    right: (gamepad.axes[0] && gamepad.axes[0] > 0.5) || (gamepad.buttons[15] && gamepad.buttons[15].value),
                    up: (gamepad.axes[1] && gamepad.axes[1] < -0.5) || (gamepad.buttons[12] && gamepad.buttons[12].value),
                    down: (gamepad.axes[1] && gamepad.axes[1] > 0.5) || (gamepad.buttons[13] && gamepad.buttons[13].value),
                    a: (gamepad.buttons[1] && gamepad.buttons[1].value) || (gamepad.buttons[2] && gamepad.buttons[2].value),
                    b: (gamepad.buttons[3] && gamepad.buttons[3].value),
                    c: (gamepad.buttons[0] && gamepad.buttons[0].value),
                    l: (gamepad.buttons[4] && gamepad.buttons[4].value) || (gamepad.buttons[6] && gamepad.buttons[6].value),
                    r: (gamepad.buttons[5] && gamepad.buttons[5].value) || (gamepad.buttons[7] && gamepad.buttons[7].value),
                    start: (gamepad.buttons[9] && gamepad.buttons[9].value)
                }
            default:
                return {}
        }
    }
}

let KEYMODE = 'keyboard';

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

const GAMEPADDEFAULTTYPE = 'a';
let GAMEPADTYPE = GAMEPADDEFAULTTYPE;

const KEYBOARDINPUT = {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    a: "KeyZ",
    b: "KeyX",
    c: "KeyC",
    l: "KeyA",
    r: "KeyS",
    start: "Enter"
}
const updateKeycodes = () => {
    const input = KEYMODE === 'keyboard' ? KEYBOARDINPUT : GAMEPADINPUT;
    KEYCODES = new Object();
    for (const [key, value] of Object.entries(input)) KEYCODES[value] = key;
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
    game.inputManager.keyboard.enable();
    selectedKey = null;
}
const changeKeyKeyboard = (game, key) => {
    const opt = game.menu.options.find(opt => opt.id === key);
    if (selectedKey) cancelKeyChange(game, selectedKey, opt);
    selectedKey = key;
    if (KEYBOARDINPUT[selectedKey]) {
        opt.value = '...';
        game.inputManager.keyboard.disable();
        document.body.onkeydown = e => changeKeyHandle(game, e, opt);
    }
}
const resetKeys = game => {
    if (selectedKey) cancelKeyChange(game, selectedKey);
    KEYCODES = {...DEFAULTKEYCODES}
    game.menu.options.filter(opt => opt.type === 'keyboard').forEach(opt => opt.value = KEYCODES[opt.id]);
    GAMEPADTYPE = 'a';
}
const toggleKeyMode = value => KEYMODE = value;