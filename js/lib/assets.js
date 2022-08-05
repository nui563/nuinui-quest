class Assets {
    images = new Object;
    imageList = [
        // Actors
        'sp_flare_idle',
        'sp_flare_jump',
        'sp_flare_fall',
        'sp_flare_run',
        'sp_flare_run_attack',
        'sp_flare_sleep',
        'sp_flare_wakeup',
        'sp_flare_wink',
        'sp_flare_look',
        'sp_flare_bow',
        'sp_flare_gun',
        'sp_flare_gun_arms',
        'sp_flare_gun_arms_back',
        'sp_flare_bow_jump',
        'sp_flare_gun_jump',
        'sp_flare_bow_fall',
        'sp_flare_gun_fall',
        'sp_flare_slide',
        "sp_flare_jetski",

        'sp_ponytail',
        'sp_ribbon',

        'sp_elfriend_idle',

        'sp_sukonbu',
        'sp_poyoyo',
        'sp_spirit',

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

        'sp_aqua_sleep',
        'sp_aqua_attack',
        'sp_aqua_walk',
        'sp_aqua_walk_aggro',
        'sp_aqua_jump',
        'sp_aqua_jump_aggro',

        'sp_marine_idle',
        'sp_marine_intro',
        'sp_marine_jump',
        'sp_marine_laugh',
        'sp_marine_sword',
        'sp_marine_dash',
        'sp_marine_hit',

        'sp_fubuki_idle',
        'sp_fubuki_jump',
        'sp_fubuki_hit',
        'sp_fubuki_charge',

        'sp_ayame_idle',

        'sp_vapor_block',
        'sp_nousabot',
        'sp_robot',
        'sp_bow_pickup',
        'sp_arrow',
        'sp_petal',
        'sp_peko_mini_boss',
        'sp_peko_mini_boss_shield',
        'sp_laser_target',
        'sp_ice_spike',
        'sp_ice_wind',
        'sp_ice_shield',

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
        'sp_rock',
        'sp_atfield',

        "sp_clock",
        "sp_moon",
        "sp_anchor",
        "sp_flag",

        "sp_dokuro",
        "sp_cannon",
        "sp_pirate",
        "sp_pirate_spin",
        "sp_pirate_jetski",

        "sp_port_clock",
        "sp_neko",
        "sp_jetski",
        "sp_jetski_item",
        "sp_boat",

        // Stage
        'ts_forest',
        'bg_forest',

        'ts_casino',
        'bg_casino',

        'ts_port',
        'bg_port',
        'bg_port_scroll',
        'bg_port_scroll2',

        'ts_yamato',
        'bg_yamato',

        // HUD
        'ui_start_label',
        'ui_forest_label',
        'ui_healthbar',
        'ui_healthbar_pekora',
        'ui_healthbar_miko',
        'ui_healthbar_marine',
        'ui_healthbar_fubuki',
        'ui_slot',
        'ui_slot2',
        'ui_level_icon',
        'ui_level_label',
        'ui_arrow_down',
        'ui_warning',
        'ui_focus',
        'ui_level_thanks',
        'ui_charge_type',
        'ui_shadow_mask',
        'ui_shadow_mask_small',
        'ui_digit',
        'ui_score',
        'ui_timer',

        // Particles
        'vfx_explosion',
        'vfx_smoke_white',
        'vfx_smoke_black',
        'vfx_smoke_spirit',
        'vfx_jump',
        'vfx_run',
        'vfx_step',
        'vfx_land',
        'vfx_shine_white',
        'vfx_shine_2_white',
        'vfx_sparkle_white',
        'vfx_sparkle_fire',
        'vfx_sparkle_fire_2',
        'vfx_sparkle_fire_3',
        'vfx_sparkle_fire_4',
        'vfx_impact',
        'vfx_ray_1',
        'vfx_ray_2',
        'vfx_ray_3',
        'vfx_ray_4',
        'vfx_transition',
        'vfx_rapid_fire',
        'vfx_water_trail'
    ];

    audioList = [
        { id: 'step' },
        { id: 'land' },
        { id: 'wakeup' },
        { id: 'question' },
        { id: 'level_start' },
        { id: 'object_pickup' },
        { id: 'bow_shoot' },
        { id: 'hit' },
        { id: 'no_damage' },
        { id: 'damage' },
        { id: 'rumble' },
        { id: 'charge' },
        { id: 'pew' },
        { id: 'boss_move' },
        { id: 'peko' },
        { id: 'fanfare' },
        { id: 'jump' },
        { id: 'select' },
        { id: 'elevator' },
        { id: 'focus' },
        { id: 'heal' },
        { id: 'noise' },
        { id: 'miko_chant' },
        { id: 'miko_kick' },
        { id: 'warning' },
        { id: 'dash' },
        { id: 'slash' },
        { id: 'gun' }
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
        },
        {
            id: "sneak",
            loopStart: 0
        },
        {
            id: "dummy_th000",
            loopStart: 0.783
        },
        {
            id: "aquamarine_bay",
            loopStart: 6.483
        },
        {
            id: "cosplay_pirate_idol_frenzy",
            loopStart: 6.033
        }
    ];
    
    constructor() {
        this.imageList.forEach(id => {
            this.images[id] = new Image;
            this.images[id].src = `img/${id}.png`;
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
        }),
        ...this.audioList.map(sound => {
            return new Promise(resolve => {
                fetch(`sound/${sound.id}.wav`).then(res => res.arrayBuffer()).then(buffer => {
                    this.audioCtx.decodeAudioData(buffer, decodedData => {
                        sound.buffer = decodedData;
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