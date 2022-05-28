class Assets {
    images = new Object;
    imageList = [
        // Actors
        'sp_flare_idle',
        'sp_flare_jump',
        'sp_flare_fall',
        'sp_flare_run',
        'sp_flare_sleep',
        'sp_flare_wakeup',
        'sp_flare_wink',
        'sp_flare_look',
        'sp_flare_bow',
        'sp_flare_bow_jump',
        'sp_flare_bow_fall',
        'sp_flare_slide',

        'sp_ponytail',
        'sp_ribbon',

        'sp_elfriend_idle',

        'sp_pekora_idle',
        'sp_pekora_think',
        'sp_pekora_laugh',
        'sp_pekora_jump',
        'sp_pekora_hit',
        'sp_pekora_rocket',
        
        'sp_peko_rocket',

        'sp_miko_idle',
        'sp_miko_hit',
        'sp_miko_jump',
        'sp_miko_sniper',
        'sp_miko_chant',
        'sp_miko_kick',

        'sp_vapor_block',
        'sp_nousabot',
        'sp_robot',
        'sp_bow_pickup',
        'sp_arrow',
        'sp_peko_mini_boss',
        'sp_peko_mini_boss_shield',
        'sp_laser_target',

        'sp_nousagi',
        'sp_nousakumo',
        'sp_35p',
        'sp_bullet',
        'sp_heart',
        "sp_carrots",
        "sp_statue",
        "sp_skulls",
        "sp_mikobell",
        "sp_casino_chip",
        "sp_aircon",
        "sp_scythe",

        "sp_clock",
        "sp_moon",

        // Stage
        'ts_forest',
        'bg_forest',

        'ts_casino',
        'bg_casino',

        'ts_port',
        'bg_port',

        // HUD
        'ui_start_label',
        'ui_forest_label',
        'ui_healthbar',
        'ui_healthbar_pekora',
        'ui_healthbar_miko',
        'ui_slot',
        'ui_slot2',
        'ui_level_icon',
        'ui_level_label',
        'ui_arrow_down',
        'ui_warning',
        'ui_focus',
        'ui_level_thanks',

        // Particles
        'vfx_explosion',
        'vfx_smoke_white',
        'vfx_smoke_black',
        'vfx_jump',
        'vfx_run',
        'vfx_step',
        'vfx_land',
        'vfx_shine_white',
        'vfx_shine_2_white',
        'vfx_sparkle_white',
        'vfx_impact',
        'vfx_ray_1',
        'vfx_ray_2',
        'vfx_ray_3',
        'vfx_ray_4'
    ];

    audios = new Object;
    audioList = [
        'step',
        'land',
        'wakeup',
        'question',
        'level_start',
        'object_pickup',
        'bow_shoot',
        'hit',
        'no_damage',
        'damage',
        'rumble',
        'charge',
        'pew',
        'boss_move',
        'peko',
        'fanfare',
        'jump',
        'select',
        'elevator',
        'focus',
        'heal',
        'noise',
        'miko_chant',
        'miko_kick',
        'warning',
        'dash'
    ]
    
    bgmData = [
        {
            id: "elite_moonlight_scuffle",
            loopStart: 6.483
        },
        {
            id: "serious_&_go",
            loopStart: 6.6
        },
        {
            id: "crazy_bnuuy",
            loopStart: 8.083
        },
        {
            id: "red_sus",
            loopStart: 2.75
        },
        {
            id: "smile_&_go_slow",
            loopStart: 0
        },
        {
            id: "robotic_foe",
            loopStart: 5.283
        }
    ];
    
    constructor() {
        this.imageList.forEach(id => {
            this.images[id] = new Image;
            this.images[id].src = `img/${id}.png`;
        });
        this.audioList.forEach(id => {
            this.audios[id] = new Audio(`./sound/${id}.wav`);
        });

        this.audioCtx = new AudioContext();
        this.audioCtx.suspend();
    }

    load = () => new Promise(resolve => {
        this.loadImages().then(() => {
            this.loadAudio().then(() => resolve());
        });
    });

    loadAudio = () => Promise.all([
        ...this.bgmData.map(bgm => {
            return new Promise(resolve => {
                fetch(`music/${bgm.id}.wav`).then(res => res.arrayBuffer()).then(buffer => {
                    this.audioCtx.decodeAudioData(buffer, decodedData => {
                        bgm.buffer = decodedData;
                        resolve();
                    });
                });
            });
        })
    ]);

    loadImages = () => Promise.all([
        ...Object.keys(this.images).map(id => new Promise(resolve => this.images[id].onload = () => resolve())),
        // ...Object.keys(this.audios).map(id => new Promise(resolve => this.audios[id].oncanplaythrough = () => resolve()))
    ]);
}