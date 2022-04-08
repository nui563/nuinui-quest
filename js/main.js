let DEBUGMODE = false;

window.onload = () => {
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
}