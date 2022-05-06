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

        'sp_ponytail',
        'sp_ribbon',

        'sp_elfriend_idle',
        
        'sp_kintsuba',
        'sp_kintsuba2',
        'sp_kintsuba_idle',

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

        'sp_nousabot',
        'sp_robot',
        'sp_bow_pickup',
        'sp_arrow',
        'sp_peko_mini_boss',
        'sp_laser_target',

        'sp_nousagi',
        'sp_35p',
        'sp_bullet',
        'sp_heart',
        'sp_vending_machine',
        "sp_carrots",
        "sp_statue",
        "sp_skulls",
        "sp_mikobell",
        "sp_casino_chip",

        "sp_clock",
        "sp_moon",

        // Stage
        'ts_forest',
        'bg_forest',
        'bg_forest_sakuga',

        'ts_casino',
        'bg_casino',

        // HUD
        'ui_title_screen',
        'ui_start_label',
        'sp_speech_bubble',
        'ui_forest_label',
        'ui_healthbar',
        'ui_healthbar_pekora',
        'ui_healthbar_miko',
        'ui_slot',
        'ui_slot2',
        'ui_level_icon',
        'ui_level_label',
        'ui_level_cleared',
        'ui_arrow_down',
        'ui_warning',
        'ui_focus',

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
        'warning'
    ]
    
    constructor() {
        this.imageList.forEach(id => {
            this.images[id] = new Image;
            this.images[id].src = `img/${id}.png`;
        });
        this.audioList.forEach(id => {
            this.audios[id] = new Audio(`./sound/${id}.wav`);
        });
    }

    load = () => Promise.all([
        ...Object.keys(this.images).map(id => new Promise(resolve => this.images[id].onload = () => resolve())),
        // ...Object.keys(this.audios).map(id => new Promise(resolve => this.audios[id].oncanplaythrough = () => resolve()))
    ]);
}