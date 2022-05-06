let DEBUGMODE = false;

let SEMUTED = false;
let SEVOLUME = 0.25;
let BGMMUTED = false;
let BGMVOLUME = 0.125;

let SCREENDISPLAY = null;
let SCREENSHAKE = true;

const toggleInfo = () => {
    const container = document.getElementById("info-container");
    const toggle = container.style.display === 'none';
    container.style.display = toggle ? 'flex' : 'none';
    document.getElementById('info-icon').innerHTML = toggle ? 'close' : 'information';
}

window.onload = () => {
    INPUTMANAGER = new InputManager();
    // Game
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", "save.json", true);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            const data = rawFile.responseText;
            console.log("save file loaded", JSON.parse(data));
            const game = new Game(new Assets(), data);
            game.assets.load().then(game.start());
        }
    }
    rawFile.send(null);
    
    // Sound options
    document.getElementById("se-volume").onchange = e => SEVOLUME = e.target.value;
    document.getElementById("se-volume-icon").onclick = e => {
        SEMUTED = !SEMUTED;
        document.getElementById("se-volume-icon").innerHTML = SEMUTED ? "volume_off" : "volume_up";
    }
    document.getElementById("bgm-volume").onchange = e => BGMVOLUME = e.target.value;
    document.getElementById("bgm-volume-icon").onclick = e => {
        BGMMUTED = !BGMMUTED;
        document.getElementById("bgm-volume-icon").innerHTML = BGMMUTED ? "volume_off" : "volume_up";
    }

    window.onblur = () => {
        document.getElementById('focus-warning').style.display = 'flex';
        document.getElementById('game-container').style.boxShadow = '0 0 2px #08f';
    }
    window.onfocus = () => {
        document.getElementById('focus-warning').style.display = 'none';
        document.getElementById('game-container').style.boxShadow = '0 0 2px #000';
    }
}