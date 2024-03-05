class Assets {
    images = new Object;
    imageList = [
        [
            'ui_title',
            'ts_forest',
            'bg_forest',
            'sp_flare_sleep',
            'sp_elfriend_idle',
            'sp_elfriend_help',

            'ms_flare',
            'ms_miko',
            // Actors
            'sp_flare_idle',
            'sp_flare_jump',
            'sp_flare_fall',
            'sp_flare_run',
            'sp_flare_run_attack',
            'sp_flare_wakeup',
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
            "sp_flare_hit",
            "sp_flare_sit",
            "sp_flare_back",
            "sp_flare_chant",
            "sp_flare_moto",
            "sp_noel_moto",

            'sp_ponytail',
            'sp_ribbon',

            'sp_sukonbu',
            'sp_poyoyo',
            'sp_spirit',

            'font_en',
            'font_jp',
            'ui_version',
        ],
        [
            // HUD
            'ui_menu_title',
            'ui_forest_label',
            'ui_healthbar',
            'ui_healthbar_vertical',
            'ui_boss_icon',
            'ui_slot',
            'ui_level_icon',
            'ui_arrow',
            'ui_arrow_down',
            'ui_arrow_up',
            'ui_warning',
            'ui_warning2',
            'ui_focus',
            'ui_charge_type',
            'ui_shadow_mask',
            'ui_shadow_mask_small',
            'ui_digit',
            'ui_timer',
            'ui_timer_wide',
            'ui_text_bubble',
            'ui_tuto_1',
            'ui_tuto_2',
            'ui_tuto_3',
            'ui_tuto_4',
            'ui_bad_end',
            'ui_end',
            'ui_flare',
            'ui_items',
            'ui_achievements',
            'ui_help',
            'ui_noel',

            'opt_type_a',
            'opt_type_b',
            'opt_type_c'
        ],
        [
            // Stage
            'bg_intro1',
            'bg_intro2',
            'bg_intro3',
            'bg_shiraken',
            'bg_shikemura',

            'ts_forest_alt',
            'bg_forest_alt',

            'ts_casino',
            'bg_casino',
            'ts_casino_alt',
            'bg_casino_alt',

            'ts_port',
            'bg_port',
            'bg_port_scroll',
            'bg_port_scroll2',
            'ts_port_alt',
            'bg_port_alt',
            'bg_port_scroll_alt',
            'bg_port_scroll_alt2',

            'ts_yamato',
            'bg_yamato',
            'ts_yamato_alt',
            'bg_yamato_alt',

            'ts_westa',
            'bg_westa',
            'bg_westa2',
            'ts_westa_alt',
            'bg_westa_alt',
            'bg_westa_alt2',

            'bg_sword',
            'tmp',
        ],
        [
            // Particles
            'vfx_explosion',
            'vfx_smoke_white',
            'vfx_smoke_black',
            'vfx_smoke_spirit',
            'vfx_smoke_pink',
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
            'vfx_water_trail',
            'vfx_mace',
            'vfx_digit',
            'vfx_bubble'
        ],
        [
            'sp_pekora_idle',
            'sp_pekora_think',
            'sp_pekora_laugh',
            'sp_pekora_jump',
            'sp_pekora_hit',
            'sp_pekora_rocket',
            'sp_peko_back',
            
            'sp_peko_rocket',

            'sp_miko_idle',
            'sp_miko_hit',
            'sp_miko_jump',
            'sp_miko_sniper',
            'sp_miko_chant',
            'sp_miko_kick',
            'sp_miko_evil',
            'sp_miko_charge',
            'sp_miko_sit',
            'sp_miko_hit2',
            'sp_miko_release',

            'sp_aqua_sleep',
            'sp_aqua_attack',
            'sp_aqua_walk',
            'sp_aqua_walk_aggro',
            'sp_aqua_jump',
            'sp_aqua_jump_aggro',
            'sp_aqua_hit',

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
            'sp_ayame_back',
            'sp_ayame_focus',
            'sp_ayame_crouch',
            'sp_ayame_charge',
            'sp_ayame_hit',
            'sp_ayame_swords',
            'sp_ayame_rasetsu',
            'sp_ayame_asura',

            'sp_noel_idle',
            'sp_noel_evil',
            'sp_noel_hit',
            'sp_noel_jump',
            'sp_noel_fall',
            'sp_noel_slide',
            'sp_noel_weak',
            'sp_noel_run',
            'sp_noel_attack',
            'sp_noel_aerial',
            'sp_noel_jetski',
            "sp_noel_back",
            
            'sp_suisei_idle',
            'sp_suisei_stand',
            'sp_suisei_axe',
            'sp_suisei_hit',

            'sp_polka_idle',
            'sp_polka_charge',
            'sp_polka_release',
            'sp_polka_attack',

            'sp_kirito',
            'sp_stardust',
            'sp_card',
            'sp_wand',
            'sp_mace',
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
            'sp_fubuzilla',
            'sp_miteiru',
            'sp_oni',
            'sp_thunder',
            'sp_iroha',

            'sp_hand',
            'sp_watame',
            'sp_nousagi',
            'sp_nousagi2',
            'sp_nousakumo',
            'sp_35p',
            'sp_bullet',
            'sp_peko_bullet',
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
            'sp_throne',
            'sp_belt',

            "sp_checkpoint",
            "sp_clock",
            "sp_jump",
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

            "sp_comet",
            "sp_axe",
            "sp_axe2",
            "sp_axe3",
            "sp_axe_chain",
            "sp_axe2_chain",
            "sp_axe3_chain",
            "sp_dragon",
            "sp_crystal",
            "sp_block",
            "sp_wing",
            "sp_bucket",

            "sp_demon_ribcage",
            "sp_demon_spine",
            "sp_demon_hand",
            "sp_demon_head",
            "sp_demon_laser",
            "sp_demon_orb",

            "sp_gura_idle",
            "sp_gura_move",
            "sp_gura_down",
            "sp_gura_up",
            "sp_gura_hit",
            "sp_gura_trident",
            "sp_gura_bullet",
            "sp_gura_tornado",
            "sp_gura_tail",

            "sp_calli_idle",
            "sp_calli_hide",
            "sp_calli_point",
            "sp_calli_jump",
            "sp_calli_jump2",
            "sp_calli_hit",
            "sp_calli_charge",
            "sp_calli_scythe",
            "sp_calli_back",
            "sp_calli_dash",
            "sp_cloak",
            "sp_deadbeat",

            "sp_ina_idle",
            "sp_ina_halo",
            "sp_ina_tentacle",
            "sp_ina_hit",
            "sp_ina_book",

            "sp_ame_idle",
            "sp_ame_intro",
            "sp_ame_look",
            "sp_ame_item",
            "sp_ame_pound",
            "sp_ame_charge",
            "sp_ame_jump",
            "sp_ame_hit",
            "sp_ame_gun",
            "sp_ame_gun2",
            "sp_ame_syringe",
            "sp_ame_laugh",
            "sp_ame_smug",

            "sp_rain",
            "sp_ame_spiral",

            "sp_kiara_idle",
            "sp_kiara_walk",
            "sp_kiara_charge",
            "sp_kiara_dash",
            "sp_kiara_dash2",
            "sp_kiara_fire",
            "sp_kiara_jump",
            "sp_kiara_hit",

            "sp_okayu",
            "sp_korone",
            "sp_mio",
            "sp_bibi",
            "sp_lock",

            "sp_fairy",
            "sp_candy",
            
            "sp_kanata_idle",
            "sp_kanata_dash",
            "sp_kanata_wing",
            "sp_kanata_halo",
            "sp_kanata_hand",
            "sp_kanata_hit",

            "sp_peko_cannon",
            "sp_key",
            "sp_boots",
            "sp_rsa",
            "sp_shion",
            "sp_luna",
            "sp_switch",
            "sp_watamelon",

            "sp_towa_idle",
            "sp_towa_charge",
            "sp_towa_crouch",
            "sp_towa_sniper",
            "sp_towa_hair",
            "sp_towa_hit",
            "sp_towa_ko",

            'ts_heaven',
            'bg_heaven',
            'bg_heaven2',
            'ts_heaven_alt',
            'bg_heaven_alt',
            'bg_heaven_alt2',

            'bg_sun',
            
            'bg_holo_hq',
            'ts_holo_hq',
            'bg_holo_hq_alt',
            'ts_holo_hq_alt',

            'bg_gura',
            "bg_calli",
            "bg_kiara",

            "ui_speed",
            'ui_gamepad',

            'credits',

            "sp_thanks"
        ],
    ];

    audioList = [
        { id: 'step' },
        { id: 'land' },
        { id: 'question' },
        { id: 'cling' },
        { id: 'jingle' },
        { id: 'throw' },
        { id: 'hit' },
        { id: 'no_damage' },
        { id: 'damage' },
        { id: 'rumble' },
        { id: 'charge' },
        { id: 'charge2' },
        { id: 'pew' },
        { id: 'pew2' },
        { id: 'robot' },
        { id: 'peko' },
        { id: 'jump' },
        { id: 'select' },
        { id: 'shake' },
        { id: 'focus' },
        { id: 'heal' },
        { id: 'noise' },
        { id: 'jump2' },
        { id: 'dash' },
        { id: 'slash' },
        { id: 'gun' },
        { id: 'stage_clear' },
        { id: 'explosion' },
        { id: 'laser' },
        { id: 'menu' },
        { id: 'wind' },
        { id: 'start'}
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
        },
        {
            id: "beat_of_a_hundred_flowers",
            loopStart: 9.683
        },
        {
            id: "dethroneworld",
            loopStart: 12.467
        },
        {
            id: "corrupted_partner",
            loopStart: 11.817
        },
        {
            id: "axe_dungeon",
            loopStart: 19.283
        },
        {
            id: "axe_dungeon_tatakae",
            loopStart: 0.383
        },
        {
            id: "polkata_fugue",
            loopStart: 3.083
        },
        {
            id: "polkata_fugue_tatakae",
            loopStart: 0.383
        },
        {
            id: "bridging_the_gap",
            loopStart: 14.750
        },
        {
            id: "elite_devil",
            loopStart: 7.283
        },
        {
            id: "unlimited",
            loopStart: 24.417
        },
        {
            id: "office",
            loopStart: 0
        },
        {
            id: "mori",
            loopStart: 6.467
        },
        {
            id: "kiara",
            loopStart: 9.667
        },
        {
            id: "gura",
            loopStart: 13.133
        },
        {
            id: "ina",
            loopStart: 0.517
        },
        {
            id: "amelia",
            loopStart: 5.267
        },
        {
            id: "kiseki",
            loopStart: 25.4
        },
        {
            id: "towa",
            loopStart: 9.967
        },
        {
            id: "waterfall",
            loopStart: 0
        }
    ];
    
    constructor() {
        new Set(this.imageList.flat()).forEach(id => {
            this.images[id] = new Image;
        });
        this.audioCtx = new AudioContext();
        this.audioCtx.suspend();
    }

    load = async () => {
        await this.loadImages();
        await this.loadAudio();
    };

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

    loadImages = async () => {
        for (const chunk of this.imageList) {
            await Promise.all(chunk.map(id => new Promise((onload, onerror) =>
                Object.assign(this.images[id], {
                    onload,
                    onerror,
                    src: `img/${id}.png`,
                })
            )));
        }
    }
}