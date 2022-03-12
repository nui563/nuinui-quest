class Game {
    frameCount = 0;
    drawFrameCount = 0;

    width = 16 * 20;
    height = 16 * 12;

    lastKeys = null;
    cpuKeys = new Object;

    constructor(assets, data) {
        // Assets
        this.assets = assets;

        // Data
        this.stages = data.game.stages;

        // Controller
        this.keys = new KeyboardListener().keys;

        // Display layers
        const container = document.createElement("div");
        document.body.appendChild(container);
        container.id = 'game-container';
        container.style.width = `${this.width}px`;
        container.style.height = `${this.height}px`;
        for (let i = 0; i < 4; i++) {
            const canvas = document.createElement("canvas");
            container.appendChild(canvas);
            canvas.id = `layer${i}`;
            canvas.style.zIndex = i;
            canvas.width = this.width;
            canvas.height = this.height;
            this[`ctx${i}`] = canvas.getContext('2d');
            this[`ctx${i}`].imageSmoothingEnabled = false;
        }

        this.resize();
        window.addEventListener('resize', this.resize);

        // Init animation
        this.skipTicks = 1000 / 60;
        this.maxFrameSkip = 10;
        this.startTime = performance.now();
        this.nextGameTick = this.startTime;

        // Init scene
        this.scene = new Scene(this, this.stages['forest']);
    }

    start = () => {
        // Manage pausing game when window out of focus
        this.isPaused = !document.hasFocus();
        window.onfocus = () => this.resume();
        window.onblur = () => this.pause();
        if (!this.isPaused) this.run();
    }

    pause = () => {
        console.log('paused')
        this.isPaused = true;
        cancelAnimationFrame(this.animation);
    }

    resume = () => {
        console.log('resumed')
        this.isPaused = false;
        this.nextGameTick = performance.now();
        this.run();
    }

    run = () => {
        this.animation = requestAnimationFrame(this.loop);
    }

    update = () => {
        this.scene.update(this);
        this.lastKeys = 
        this.frameCount++;
    }

    draw = () => {
        this.scene.draw(this);
        this.drawFrameCount++;
    }

    playSound = sound => {
        const audio = this.assets.audios[sound];
        audio.currentTime = 0;
        audio.volume = .5;
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