class KeyboardListener {
    keys = { left: false, right: false, jump: false, attack: false, item: false }

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
        if (e.code in KEYCODES) this.keys[KEYCODES[e.code]] = e.type === "keydown";
    }
}

class InputManager {
    keyboard = null;
    gamepad = null;

    constructor() {
        this.keyboard = new KeyboardListener();
        window.addEventListener('gamepadconnected', event => {
            if (this.gamepad === null) {
                this.gamepad = event.gamepad.index;
                toggleKeyMode(document.getElementById('key-mode-opt-gamepad'), 'gamepad');
                document.getElementById('key-mode-opt-gamepad').disabled = false;
            }
        });
        window.addEventListener("gamepaddisconnected", event => {
            if (event.gamepad.index === this.gamepad) {
                this.gamepad = null;
                toggleKeyMode(document.getElementById('key-mode-opt-keyboard'), 'keyboard');
                document.getElementById('key-mode-opt-gamepad').disabled = true;
            }
        });
    }

    getKeyboardKeys = () => this.keyboard.keys;

    getGamepadKeys = () => {
        if (this.gamepad === null) return {}
        const gamepad = navigator.getGamepads()[this.gamepad];
        // console.log(gamepad.buttons.map(a=>a.value))
        switch (GAMEPADTYPE) {
            case 'a':
                return {
                    left: gamepad.axes[0] < -0.5 || gamepad.buttons[14].value,
                    right: gamepad.axes[0] > 0.5 || gamepad.buttons[15].value,
                    jump: gamepad.buttons[1].value || gamepad.buttons[2].value,
                    attack: gamepad.buttons[3].value,
                    item: gamepad.buttons[0].value
                }
            case 'b':
                return {
                    left: gamepad.axes[0] < -0.5 || gamepad.buttons[14].value,
                    right: gamepad.axes[0] > 0.5 || gamepad.buttons[15].value,
                    jump: gamepad.buttons[0].value,
                    attack: gamepad.buttons[1].value || gamepad.buttons[2].value,
                    item: gamepad.buttons[3].value
                }
            case 'c':
                return {
                    left: gamepad.axes[0] < -0.5 || gamepad.buttons[14].value,
                    right: gamepad.axes[0] > 0.5 || gamepad.buttons[15].value,
                    jump: gamepad.axes[1] < -0.5 || gamepad.buttons[12].value,
                    attack: gamepad.buttons[1].value || gamepad.buttons[3].value,
                    item: gamepad.buttons[0].value || gamepad.buttons[2].value
                }
            default:
                return {}
        }
    }
}

let INPUTMANAGER = null;

let KEYMODE = 'keyboard';

const DEFAULTKEYCODES = {
    ArrowLeft: "left",
    ArrowRight: "right",
    KeyZ: "jump",
    KeyX: "attack",
    KeyC: "item"
}
let KEYCODES = {...DEFAULTKEYCODES};

const GAMEPADDEFAULTTYPE = 'a';
let GAMEPADTYPE = GAMEPADDEFAULTTYPE;

const KEYBOARDINPUT = {
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "KeyZ",
    attack: "KeyX",
    item: "KeyC"
}
const updateKeycodes = () => {
    const input = KEYMODE === 'keyboard' ? KEYBOARDINPUT : GAMEPADINPUT;
    KEYCODES = new Object();
    for (const [key, value] of Object.entries(input)) KEYCODES[value] = key;
}
let selectedKey = null;
const cancelKeyChange = key => {
    const elem = document.getElementById(`key-${KEYMODE}-${key}`);
    elem.innerHTML = KEYBOARDINPUT[key];
    elem.classList.remove('active');
    INPUTMANAGER.keyboard.enable();
    selectedKey = null;
}
const changeKeyHandle = e => {
    const elem = document.getElementById(`key-${KEYMODE}-${selectedKey}`);
    KEYBOARDINPUT[selectedKey] = e.code;
    elem.innerHTML = e.code;
    updateKeycodes();
    elem.classList.remove('active');
    INPUTMANAGER.keyboard.enable();
    selectedKey = null;
}
const changeKeyKeyboard = key => {
    if (selectedKey) cancelKeyChange(selectedKey);
    selectedKey = key;
    if (KEYBOARDINPUT[selectedKey]) {
        const elem = document.getElementById(`key-${KEYMODE}-${selectedKey}`);
        elem.innerHTML = '.';
        elem.classList.add('active');
        INPUTMANAGER.keyboard.disable();
        document.body.onkeydown = changeKeyHandle;
    }
}
const resetKeys = () => {
    if (selectedKey) cancelKeyChange(selectedKey);
    KEYCODES = {...DEFAULTKEYCODES}
    document.getElementById('gamepad-type-A').click();
    document.getElementById('key-keyboard-left').innerHTML = 'ArrowLeft';
    document.getElementById('key-keyboard-right').innerHTML = 'ArrowRight';
    document.getElementById('key-keyboard-jump').innerHTML = 'KeyZ';
    document.getElementById('key-keyboard-attack').innerHTML = 'KeyX';
    document.getElementById('key-keyboard-item').innerHTML = 'KeyC';
}

const toggleOptions = () => {
    const container = document.getElementById("options-container");
    const toggle = container.style.display === 'none';
    container.style.display = toggle ? 'flex' : 'none';
    document.getElementById('options-icon').innerHTML = toggle ? 'close' : 'settings';
}

const setScreenDisplay = (e, value) => {
    Array.from(document.getElementsByClassName('screen-opt')).forEach(elem => elem.classList.remove("active"));
    e.classList.add("active");
    SCREENDISPLAY = value;
    window.dispatchEvent(new Event('resize'));
}

const toggleKeyMode = (e, value) => {
    Array.from(document.getElementsByClassName('key-mode-opt')).forEach(elem => elem.classList.remove("active"));
    e.classList.add("active");
    document.getElementById(`key-${KEYMODE}-container`).style.display = 'none';
    KEYMODE = value;
    document.getElementById(`key-${KEYMODE}-container`).style.display = 'flex';
}

const changeGamepadType = e => {
    GAMEPADTYPE = e.value;
    document.getElementById('gamepad-type-img').src = `./img/opt_type_${GAMEPADTYPE}.png`;
}