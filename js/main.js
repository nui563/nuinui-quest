let DEBUGMODE = false;
let MUTED = false;
let VOLUME = 0.5;

window.onload = () => {
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

    // Sound volume
    document.getElementById("volume").onchange = e => VOLUME = e.target.value;
    document.getElementById("muted").onclick = e => {
        MUTED = !MUTED;
        document.getElementById("muted").innerHTML = MUTED ? "volume_off" : "volume_up";
    }
}
