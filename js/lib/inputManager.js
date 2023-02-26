class KeyboardListener {
    keys = { left: false, right: false, down: false, up: false, jump: false, attack: false, item: false, l: false, r: false }

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
            const gp = navigator.getGamepads()[this.gamepadIndex];
            console.log("Gamepad connected at index %d: %s.", gp.index, gp.id);

            toggleKeyMode(document.getElementById('key-mode-opt-gamepad'), 'gamepad');
            document.getElementById('key-mode-opt-gamepad').disabled = false;
            console.log('Gamepad mode enabled');
        });
        window.addEventListener("gamepaddisconnected", event => {
            console.log("Gamepad disconnected from index %d: %s", event.gamepad.index, event.gamepad.id);

            if (event.gamepad.index === this.gamepadIndex) {
                this.gamepadIndex = null;

                toggleKeyMode(document.getElementById('key-mode-opt-keyboard'), 'keyboard');
                document.getElementById('key-mode-opt-gamepad').disabled = true;
                console.log('Gamepad mode disabled');
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
                    jump: (gamepad.buttons[0] && gamepad.buttons[0].value),
                    attack: (gamepad.buttons[1] && gamepad.buttons[1].value) || (gamepad.buttons[2] && gamepad.buttons[2].value),
                    item: (gamepad.buttons[3] && gamepad.buttons[3].value),
                    l: (gamepad.buttons[4] && gamepad.buttons[4].value) || (gamepad.buttons[6] && gamepad.buttons[6].value),
                    r: (gamepad.buttons[5] && gamepad.buttons[5].value) || (gamepad.buttons[7] && gamepad.buttons[7].value)
                }
            case 'b':
                return {
                    left: (gamepad.axes[0] && gamepad.axes[0] < -0.5) || (gamepad.buttons[14] && gamepad.buttons[14].value),
                    right: (gamepad.axes[0] && gamepad.axes[0] > 0.5) || (gamepad.buttons[15] && gamepad.buttons[15].value),
                    up: (gamepad.axes[1] && gamepad.axes[1] < -0.5) || (gamepad.buttons[12] && gamepad.buttons[12].value),
                    down: (gamepad.axes[1] && gamepad.axes[1] > 0.5) || (gamepad.buttons[13] && gamepad.buttons[13].value),
                    jump: (gamepad.buttons[1] && gamepad.buttons[1].value) || (gamepad.buttons[2] && gamepad.buttons[2].value),
                    attack: (gamepad.buttons[0] && gamepad.buttons[0].value),
                    item: (gamepad.buttons[3] && gamepad.buttons[3].value),
                    l: (gamepad.buttons[4] && gamepad.buttons[4].value) || (gamepad.buttons[6] && gamepad.buttons[6].value),
                    r: (gamepad.buttons[5] && gamepad.buttons[5].value) || (gamepad.buttons[7] && gamepad.buttons[7].value)
                }
            case 'c':
                return {
                    left: (gamepad.axes[0] && gamepad.axes[0] < -0.5) || (gamepad.buttons[14] && gamepad.buttons[14].value),
                    right: (gamepad.axes[0] && gamepad.axes[0] > 0.5) || (gamepad.buttons[15] && gamepad.buttons[15].value),
                    up: (gamepad.axes[1] && gamepad.axes[1] < -0.5) || (gamepad.buttons[12] && gamepad.buttons[12].value),
                    down: (gamepad.axes[1] && gamepad.axes[1] > 0.5) || (gamepad.buttons[13] && gamepad.buttons[13].value),
                    jump: (gamepad.buttons[1] && gamepad.buttons[1].value) || (gamepad.buttons[2] && gamepad.buttons[2].value),
                    attack: (gamepad.buttons[3] && gamepad.buttons[3].value),
                    item: (gamepad.buttons[0] && gamepad.buttons[0].value),
                    l: (gamepad.buttons[4] && gamepad.buttons[4].value) || (gamepad.buttons[6] && gamepad.buttons[6].value),
                    r: (gamepad.buttons[5] && gamepad.buttons[5].value) || (gamepad.buttons[7] && gamepad.buttons[7].value)
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
    ArrowUp: "up",
    ArrowDown: "down",
    KeyZ: "jump",
    KeyX: "attack",
    KeyC: "item",
    KeyA: "l",
    KeyS: "r"
}
let KEYCODES = {...DEFAULTKEYCODES};

const GAMEPADDEFAULTTYPE = 'a';
let GAMEPADTYPE = GAMEPADDEFAULTTYPE;

const KEYBOARDINPUT = {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    jump: "KeyZ",
    attack: "KeyX",
    item: "KeyC",
    l: "KeyA",
    r: "KeyS"
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
    document.getElementById('key-keyboard-up').innerHTML = 'ArrowUp';
    document.getElementById('key-keyboard-down').innerHTML = 'ArrowDown';
    document.getElementById('key-keyboard-jump').innerHTML = 'KeyZ';
    document.getElementById('key-keyboard-attack').innerHTML = 'KeyX';
    document.getElementById('key-keyboard-item').innerHTML = 'KeyC';
    document.getElementById('key-keyboard-l').innerHTML = 'KeyA';
    document.getElementById('key-keyboard-r').innerHTML = 'KeyS';
}

let OPTIONSENABLED = false;
const toggleOptions = () => {
    const container = document.getElementById("options-container");
    const toggle = container.style.display === 'none';
    container.style.display = toggle ? 'flex' : 'none';
    document.getElementById('options-icon').innerHTML = toggle ? '<img src="./img/icon_close.png">' : '<img src="./img/icon_settings.png">';
    OPTIONSENABLED = !OPTIONSENABLED;
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
    if (KEYMODE === 'gamepad') {
        document.getElementById('focus-warning').style.display = 'none';
        document.getElementById('game-container').style.boxShadow = '0 0 2px #000';
    }
}

const changeGamepadType = e => {
    GAMEPADTYPE = e.value;
    document.getElementById('gamepad-type-img').src = `./img/opt_type_${GAMEPADTYPE}.png`;
}