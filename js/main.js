let DEBUGMODE = false;

let SEMUTED = false;
let SEVOLUME = 0.5;
let BGMMUTED = false;
let BGMVOLUME = 0.75;

let SCREENDISPLAY = null;
let SCREENSHAKE = true;

const toggleInfo = () => {
    const container = document.getElementById("info-container");
    const toggle = container.style.display === 'none';
    container.style.display = toggle ? 'flex' : 'none';
    document.getElementById('info-icon').innerHTML = toggle ? '<img src="./img/icon_close.png">' : '<img src="./img/icon_info.png">';
}

const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
}

window.onload = () => {
    INPUTMANAGER = new InputManager();
    // Game
    fetch("save.json").then(res => res.json()).then(res => {
        console.log("save file loaded", res);
        const game = new Game(new Assets(), JSON.stringify(res));
        game.assets.load().then(game.start());
    });

    // Sound options
    document.getElementById("se-volume").onchange = e => SEVOLUME = e.target.value;
    document.getElementById("se-volume-icon").onclick = e => {
        SEMUTED = !SEMUTED;
        document.getElementById("se-volume-icon").innerHTML = SEMUTED ? '<img src="./img/icon_volume_off.png">' : '<img src="./img/icon_volume_on.png">';
    }

    window.onblur = () => {
        if (KEYMODE === 'keyboard') {
            document.getElementById('focus-warning').style.display = 'flex';
            document.getElementById('game-container').style.boxShadow = '0 0 2px #08f';
        }
    }
    window.onfocus = () => {
        document.getElementById('focus-warning').style.display = 'none';
        document.getElementById('game-container').style.boxShadow = '0 0 2px #000';
    }

    document.getElementById("bgm-volume").onchange = e => {
        BGMVOLUME = e.target.value;
    }
    document.getElementById("bgm-volume-icon").onclick = e => {
        BGMMUTED = !BGMMUTED;
        document.getElementById("bgm-volume-icon").innerHTML = BGMMUTED ? '<img src="./img/icon_volume_off.png">' : '<img src="./img/icon_volume_on.png">';
    }

    if (typeof __TAURI__ !== 'undefined') {
        document.getElementById('fullscreen-icon').style.display = 'none';
    }
}