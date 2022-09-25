class Game {
    frameCount = 0;
    drawFrameCount = 0;

    width = 16 * 20;
    height = 16 * 12;

    audioCtx = null;
    bufferLoader = null;

    bgmId = null;
    soundFrame = {};

    lastKeys = null;
    cpuKeys = new Object;

    currentStage = 0;

    score = 0;
    scoreDisplay = 0;

    demoCleared = false;

    timer = 0;

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
            document.getElementById('game-container').style.boxShadow = '0 0 2px 1px #08f';
        }

        if (!SAVEOK) {
            document.getElementById('game-container').innerHTML = 'The saving system is incompatible with your browser, please exit incognito mode or go to <a href="https://nuinui-quest.net" target="_blank">nuinui-quest.net</a>';
        }

        // Audio
        this.audioCtx = assets.audioCtx;

        // Init animation
        this.skipTicks = 1000 / 60;
        this.maxFrameSkip = 10;
        this.startTime = performance.now();
        this.nextGameTick = this.startTime;

        // DEBUG
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('stage')) this.currentStage = parseInt(urlParams.get('stage')) - 1;

        // Init stage selection
        this.scene = new Scene(this, JSON.parse(this.data).game.stages[this.currentStage]);

        if (!localStorage.getItem('nuinui-save-item-fire')) localStorage.setItem('nuinui-save-item-fire', true);
        this.updateItems();
        this.updateAchievements();
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
        if (this.audioCtx.state === 'running') this.audioCtx.suspend();
        this.isPaused = true;
    }

    resume = () => {
        console.log('resumed');
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        this.isPaused = false;
        this.run();
    }

    run = () => {
        this.nextGameTick = performance.now();
        this.animation = requestAnimationFrame(this.loop);
    }

    update = () => {
        this.soundFrame = {};
        this.keys = this.inputManager[KEYMODE === 'keyboard' ? 'getKeyboardKeys' : 'getGamepadKeys']();
        this.scene.update(this);
        if (this.bgmFadeOut) {
            this.bgm.gainNode.gain.value -= BGMVOLUME / 32;
            if (this.bgm.gainNode.gain.value <= 0.003) {
                this.bgmFadeOut = false;
                this.stopBGM();
            }
        }
        this.frameCount++;
    }

    updateItems = () => {
        ['bow', 'gun', 'clock', 'jump', 'fire', 'rocket', 'petal', 'sword', 'shield', 'dual'].forEach((item, i) => {
            if (localStorage.getItem(`nuinui-save-item-${item}`)) {
                const elem = document.getElementById(`save-item-${i+1}`);
                elem.classList.add("unlocked");
                if (['bow', 'gun'].includes(item)) {
                    elem.onclick = e => {
                        const flare = this.scene.actors.find(actor => actor instanceof Flare);
                        Array.from(document.getElementsByClassName('item-selected')).forEach(a => a.classList.remove('item-selected'));
                        elem.classList.add('item-selected');
                        flare.weapon = item;
                        this.playSound('wakeup');
                    }
                }
            }
        });
    }

    updateAchievements = () => {
        Array.from(document.getElementsByClassName('save-achievement')).forEach((elem, i) => {
            if (localStorage.getItem(`nuinui-save-achievement-${i+1}`)) elem.classList.add('unlocked');
        });
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

    playSound = id => {
        const sound = this.assets.audioList.find(sound => sound.id === id);
        if (SEMUTED || !sound.buffer || this.soundFrame[id]) return;
        this.soundFrame[id] = true;
        const source = this.audioCtx.createBufferSource();
        source.buffer = sound.buffer;
        source.loop = false;
        source.loopStart = 0;
        source.loopEnd = source.buffer.duration;
        if (['step', 'pew', 'bow_shoot', 'miko_chant', 'dash', 'slash', 'gun'].includes(id)) source.playbackRate.value = 1 + Math.random() * .2 - .1;
        sound.source = source;
        sound.gainNode = this.audioCtx.createGain();
        source.connect(sound.gainNode);
        sound.gainNode.connect(this.audioCtx.destination);
        sound.gainNode.gain.value = SEMUTED ? 0 : SEVOLUME;
        
        if (this.audioCtx.state === "suspended") this.audioCtx.resume().then(() => sound.source.start());
        else sound.source.start();
    }

    playBGM = id => {
        const bgm = this.assets.bgmData.find(bgm => bgm.id === id);
        if (!bgm.buffer) return;
        this.bgm = bgm;
        const source = this.audioCtx.createBufferSource();
        source.buffer = this.bgm.buffer;
        source.loop = true;
        source.loopStart = this.bgm.loopStart;
        source.loopEnd = source.buffer.duration;
        this.bgm.source = source;
        this.bgm.gainNode = this.audioCtx.createGain();
        source.connect(this.bgm.gainNode);
        this.bgm.gainNode.connect(this.audioCtx.destination);

        this.bgm.updateVolume = () => this.bgm.gainNode.gain.value = BGMMUTED ? 0 : BGMVOLUME;
        this.bgm.updateVolume();

        document.getElementById("bgm-volume").onchange = e => {
            BGMVOLUME = e.target.value;
            this.bgm.updateVolume();
        }
        document.getElementById("bgm-volume-icon").onclick = e => {
            BGMMUTED = !BGMMUTED;
            document.getElementById("bgm-volume-icon").innerHTML = BGMMUTED ? '<img src="./img/icon_volume_off.png">' : '<img src="./img/icon_volume_on.png">';
            this.bgm.updateVolume();
        }

        if (this.audioCtx.state === "suspended") this.audioCtx.resume().then(() => this.bgm.source.start());
        else this.bgm.source.start();
    }

    stopBGM = fadeout => {
        if (!this.bgm) return;
        if (fadeout) {
            this.bgmFadeOut = true;
        } else {
            this.bgm.source.stop();
            this.bgm = null;
            
            document.getElementById("bgm-volume").onchange = e => {
                BGMVOLUME = e.target.value;
            }
            document.getElementById("bgm-volume-icon").onclick = e => {
                BGMMUTED = !BGMMUTED;
                document.getElementById("bgm-volume-icon").innerHTML = BGMMUTED ? '<img src="./img/icon_volume_off.png">' : '<img src="./img/icon_volume_on.png">';
            }
        }
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