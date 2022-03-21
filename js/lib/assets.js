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

        'sp_elfriend_idle',
        'sp_pekora_idle',

        'sp_nousabot',
        'sp_nousagi_dark',
        'sp_bow_pickup',
        'sp_arrow',
        'sp_peko_mini_boss',
        'sp_laser_target',

        'sp_vending_machine',

        // Stage
        'ts_forest',
        'bg_forest',
        'bg_forest_sakuga',


        // HUD
        'ui_title_screen',
        'ui_start_label',
        'sp_speech_bubble',
        'sp_kintsuba',
        'ui_forest_label',
        'ui_healthbar',

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
        'boss_move'
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
        ...Object.keys(this.audios).map(id => new Promise(resolve => this.audios[id].oncanplaythrough = () => resolve()))
    ]);
}