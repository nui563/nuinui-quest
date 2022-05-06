class Game {
    frameCount = 0;
    drawFrameCount = 0;

    width = 16 * 20;
    height = 16 * 12;

    bgm = null;

    lastKeys = null;
    cpuKeys = new Object;

    currentStage = 0;
    stage2cleared = false;

    constructor(assets, data) {
        // Assets
        this.assets = assets;

        // JSON data
        this.data = data;

        // Controller
        // this.keys = new KeyboardListener().keys;
        this.inputManager = INPUTMANAGER;

        // Display layers
        const container = document.createElement("div");
        document.body.appendChild(container);
        container.id = 'game-container';
        container.style.width = `${this.width}px`;
        container.style.height = `${this.height}px`;
        for (let i = 0; i < 4; i++) {
            this[`canvas${i}`] = document.createElement("canvas");
            container.appendChild(this[`canvas${i}`]);
            this[`canvas${i}`].id = `layer${i}`;
            this[`canvas${i}`].style.zIndex = i;
            this[`canvas${i}`].width = this.width;
            this[`canvas${i}`].height = this.height;
            this[`ctx${i}`] = this[`canvas${i}`].getContext('2d');
            this[`ctx${i}`].imageSmoothingEnabled = false;
        }

        this.resize();
        window.addEventListener('resize', this.resize);

        if (!document.hasFocus()) {
            document.getElementById('focus-warning').style.display = 'flex';
            document.getElementById('game-container').style.boxShadow = '0 0 2px #08f';
        }

        // Init animation
        this.skipTicks = 1000 / 60;
        this.maxFrameSkip = 10;
        this.startTime = performance.now();
        this.nextGameTick = this.startTime;

        // Init stage selection
        // this.scene = new StageSelect(null, 0);
        this.scene = new Scene(this, JSON.parse(this.data).game.stages[this.currentStage]);
    }

    start = () => {
        // Manage pausing game when window out of focus
        document.onvisibilitychange = () => {
            if (document.visibilityState === 'hidden') this.pause();
            else if (this.isPaused) this.resume();
        };
        if (document.visibilityState !== 'hidden') this.run();
        else this.isPaused = true;
    }

    pause = () => {
        console.log('game paused');
        if (this.bgm) this.bgm.pause();
        this.isPaused = true;
    }

    resume = () => {
        console.log('resumed');
        if (this.bgm) this.bgm.play();
        this.isPaused = false;
        this.run();
    }

    run = () => {
        this.nextGameTick = performance.now();
        this.animation = requestAnimationFrame(this.loop);
    }

    update = () => {
        if (this.bgm) {
            if (BGMMUTED && this.bgm.volume !== 0) this.bgm.volume = 0;
            else if (!BGMMUTED && this.bgm.volume !== BGMVOLUME) this.bgm.volume = BGMVOLUME;
        }
        this.keys = this.inputManager[KEYMODE === 'keyboard' ? 'getKeyboardKeys' : 'getGamepadKeys']();
        this.scene.update(this);
        this.frameCount++;
    }

    resetCanvas = () => {
        for (let i = 0; i < 4; i++) {
            this[`ctx${i}`].clearRect(0, 0, this.width, this.height);
            this[`canvas${i}`].style.filter = 'none';
        }
    }

    draw = () => {
        this.scene.draw(this);
        this.drawFrameCount++;
    }

    playSound = sound => {
        if (SEMUTED) return;
        const audio = new Audio(`./sound/${sound}.wav`);
        const onCanPlay = () => {
            audio.currentTime = 0;
            audio.oncanplay = null;
            audio.play();
        }
        audio.oncanplay = onCanPlay;
        audio.volume = SEVOLUME;
    }

    playBGM = bgm => {
        if (this.bgm) this.stopBGM();
        this.bgm = new Audio(`./music/${bgm}.flac`);
        this.bgm.volume = BGMMUTED ? 0 : BGMVOLUME;
        this.bgm.loop = true;
        const onCanPlay = () => {
            this.bgm.currentTime = 0;
            this.bgm.oncanplay = null;
            this.bgm.play();
        }
        this.bgm.oncanplay = onCanPlay;
    }

    stopBGM = () => {
        if (!this.bgm) return;
        this.bgm.pause();
        this.bgm.currentTime = 0;
    }

    loop = timestamp => {
        let loops = 0;
        while (timestamp - this.startTime > this.nextGameTick && loops < this.maxFrameSkip) {
            this.update();
            this.nextGameTick += this.skipTicks;
            loops++;
        }
        if (loops) this.draw();
        if (!this.isPaused) this.animation = requestAnimationFrame(this.loop);
    }

    // Resize display canvas
    resize = () => {
        const scaleX = window.innerWidth / this.width;
        const scaleY = window.innerHeight / this.height;
        const scaleToFit = Math.floor(Math.max(1, Math.min(scaleX, scaleY)));
        document.getElementById('game-container').style.transform = 'scale(' + (SCREENDISPLAY ? SCREENDISPLAY : scaleToFit) + ')';
    }
}