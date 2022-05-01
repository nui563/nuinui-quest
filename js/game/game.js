class Game {
    frameCount = 0;
    drawFrameCount = 0;

    width = 16 * 20;
    height = 16 * 12;

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
        this.keys = new KeyboardListener().keys;

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
        this.isPaused = !document.hasFocus();
        window.onfocus = () => this.resume();
        window.onblur = () => this.pause();
        if (!this.isPaused) this.run();
    }

    pause = () => {
        console.log('game paused');
        this.isPaused = true;
        cancelAnimationFrame(this.animation);
    }

    resume = () => {
        console.log('resumed');
        this.isPaused = false;
        this.nextGameTick = performance.now();
        this.run();
    }

    run = () => {
        this.animation = requestAnimationFrame(this.loop);
    }

    update = () => {
        this.scene.update(this);
        this.frameCount++;
    }

    resetCanvas = () => {
        for (let i = 0; i < 4; i++) {
            this[`ctx${i}`].clearRect(0, 0, this.width, this.height);
        }
    }

    draw = () => {
        this.scene.draw(this);
        this.drawFrameCount++;
    }

    playSound = sound => {
        if (MUTED) return;
        const audio = this.assets.audios[sound];
        audio.currentTime = 0;
        audio.volume = VOLUME;
        audio.play();
    }

    loop = timestamp => {
        let loops = 0;
        while (timestamp - this.startTime > this.nextGameTick && loops < this.maxFrameSkip) {
            this.update();
            this.nextGameTick += this.skipTicks;
            loops++;
        }
        if (loops) this.draw();
        this.animation = requestAnimationFrame(this.loop);
    }

    // Resize display canvas
    resize = () => {
        const scaleX = window.innerWidth / this.width;
        const scaleY = window.innerHeight / this.height;
        const scaleToFit = Math.floor(Math.max(1, Math.min(scaleX, scaleY)));
        document.getElementById('game-container').style.transform = 'scale(' + scaleToFit + ')';
    }
}