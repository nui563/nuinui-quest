class aa {
  constructor() {
    this.images = {};
    this.K = ["ui_title ts_forest bg_forest sp_flare_sleep sp_elfriend_idle ms_flare ms_miko sp_flare_idle sp_flare_jump sp_flare_fall sp_flare_run sp_flare_run_attack sp_flare_wakeup sp_flare_look sp_flare_bow sp_flare_gun sp_flare_gun_arms sp_flare_gun_arms_back sp_flare_bow_jump sp_flare_gun_jump sp_flare_bow_fall sp_flare_gun_fall sp_flare_slide sp_flare_jetski sp_flare_hit sp_flare_sit sp_flare_back sp_flare_chant sp_flare_moto sp_noel_moto sp_ponytail sp_ribbon sp_sukonbu sp_poyoyo sp_spirit font_en font_jp".split(" "), 
    "ui_menu_title ui_forest_label ui_healthbar ui_healthbar_vertical ui_boss_icon ui_slot ui_level_icon ui_arrow ui_arrow_down ui_warning ui_focus ui_charge_type ui_shadow_mask ui_shadow_mask_small ui_digit ui_score ui_timer ui_timer_wide ui_text_bubble ui_tuto_1 ui_tuto_2 ui_tuto_3 ui_tuto_4 ui_bad_end ui_end ui_flare ui_items ui_achievements opt_type_a opt_type_b opt_type_c".split(" "), "bg_intro1 bg_intro2 bg_intro3 bg_shiraken bg_shikemura ts_forest_alt bg_forest_alt ts_casino bg_casino ts_casino_alt bg_casino_alt ts_port bg_port bg_port_scroll bg_port_scroll2 ts_port_alt bg_port_alt bg_port_scroll_alt bg_port_scroll_alt2 ts_yamato bg_yamato ts_yamato_alt bg_yamato_alt ts_westa bg_westa bg_westa2 ts_westa_alt bg_westa_alt bg_westa_alt2 bg_sword tmp".split(" "), 
    "vfx_explosion vfx_smoke_white vfx_smoke_black vfx_smoke_spirit vfx_smoke_pink vfx_jump vfx_run vfx_step vfx_land vfx_shine_white vfx_shine_2_white vfx_sparkle_white vfx_sparkle_fire vfx_sparkle_fire_2 vfx_sparkle_fire_3 vfx_sparkle_fire_4 vfx_impact vfx_ray_1 vfx_ray_2 vfx_ray_3 vfx_ray_4 vfx_transition vfx_rapid_fire vfx_water_trail vfx_mace vfx_digit vfx_bubble".split(" "), "sp_pekora_idle sp_pekora_think sp_pekora_laugh sp_pekora_jump sp_pekora_hit sp_pekora_rocket sp_peko_back sp_peko_rocket sp_miko_idle sp_miko_hit sp_miko_jump sp_miko_sniper sp_miko_chant sp_miko_kick sp_miko_evil sp_miko_charge sp_miko_sit sp_miko_hit2 sp_miko_release sp_aqua_sleep sp_aqua_attack sp_aqua_walk sp_aqua_walk_aggro sp_aqua_jump sp_aqua_jump_aggro sp_aqua_hit sp_marine_idle sp_marine_intro sp_marine_jump sp_marine_laugh sp_marine_sword sp_marine_dash sp_marine_hit sp_fubuki_idle sp_fubuki_jump sp_fubuki_hit sp_fubuki_charge sp_ayame_idle sp_ayame_back sp_ayame_focus sp_ayame_crouch sp_ayame_charge sp_ayame_hit sp_ayame_swords sp_ayame_rasetsu sp_ayame_asura sp_noel_idle sp_noel_evil sp_noel_hit sp_noel_jump sp_noel_fall sp_noel_slide sp_noel_weak sp_noel_run sp_noel_attack sp_noel_aerial sp_noel_jetski sp_noel_back sp_suisei_idle sp_suisei_stand sp_suisei_axe sp_suisei_hit sp_polka_idle sp_polka_charge sp_polka_release sp_polka_attack sp_kirito sp_stardust sp_card sp_wand sp_mace sp_vapor_block sp_nousabot sp_robot sp_bow_pickup sp_arrow sp_petal sp_peko_mini_boss sp_peko_mini_boss_shield sp_laser_target sp_ice_spike sp_ice_wind sp_ice_shield sp_fubuzilla sp_miteiru sp_oni sp_thunder sp_hand sp_watame sp_nousagi sp_nousakumo sp_35p sp_bullet sp_peko_bullet sp_heart sp_carrots sp_statue sp_skulls sp_mikobell sp_casino_chip sp_aircon sp_scythe sp_rock sp_atfield sp_throne sp_checkpoint sp_clock sp_jump sp_moon sp_anchor sp_flag sp_dokuro sp_cannon sp_pirate sp_pirate_spin sp_pirate_jetski sp_port_clock sp_neko sp_jetski sp_jetski_item sp_boat sp_comet sp_axe sp_axe2 sp_axe3 sp_axe_chain sp_axe2_chain sp_axe3_chain sp_dragon sp_crystal sp_block sp_wing sp_bucket sp_demon_ribcage sp_demon_spine sp_demon_hand sp_demon_head sp_demon_laser sp_demon_orb sp_gura_idle sp_gura_move sp_gura_down sp_gura_up sp_gura_hit sp_gura_trident sp_gura_bullet sp_gura_tornado sp_gura_tail sp_calli_idle sp_calli_hide sp_calli_point sp_calli_jump sp_calli_jump2 sp_calli_hit sp_calli_charge sp_calli_scythe sp_calli_back sp_calli_dash sp_cloak sp_deadbeat sp_ina_idle sp_ina_halo sp_ina_tentacle sp_ina_hit sp_ina_book sp_ame_idle sp_ame_intro sp_ame_look sp_ame_item sp_ame_pound sp_ame_charge sp_ame_jump sp_ame_hit sp_ame_gun sp_ame_gun2 sp_ame_syringe sp_ame_laugh sp_ame_smug sp_rain sp_ame_spiral sp_kiara_idle sp_kiara_walk sp_kiara_charge sp_kiara_dash sp_kiara_dash2 sp_kiara_fire sp_kiara_jump sp_kiara_hit sp_okayu sp_korone sp_mio sp_bibi sp_lock sp_fairy sp_candy sp_kanata_idle sp_kanata_dash sp_kanata_wing sp_kanata_halo sp_kanata_hand sp_kanata_hit sp_peko_cannon sp_key sp_boots sp_rsa sp_shion sp_luna sp_switch sp_watamelon sp_towa_idle sp_towa_charge sp_towa_crouch sp_towa_sniper sp_towa_hair sp_towa_hit sp_towa_ko ts_heaven bg_heaven bg_heaven2 ts_heaven_alt bg_heaven_alt bg_heaven_alt2 bg_sun bg_holo_hq ts_holo_hq bg_holo_hq_alt ts_holo_hq_alt bg_gura bg_calli bg_kiara ui_speed credits sp_thanks".split(" ")];
    this.ie = [{id:"step"}, {id:"land"}, {id:"question"}, {id:"level_start"}, {id:"object_pickup"}, {id:"bow_shoot"}, {id:"hit"}, {id:"no_damage"}, {id:"damage"}, {id:"rumble"}, {id:"charge"}, {id:"charge2"}, {id:"pew"}, {id:"pew2"}, {id:"boss_move"}, {id:"peko"}, {id:"jump"}, {id:"select"}, {id:"elevator"}, {id:"focus"}, {id:"heal"}, {id:"noise"}, {id:"miko_chant"}, {id:"miko_kick"}, {id:"dash"}, {id:"slash"}, {id:"gun"}, {id:"death"}, {id:"stage_clear"}, {id:"explosion"}, {id:"laser"}, {id:"menu_move"}, 
    {id:"wind"}, {id:"start"}];
    this.je = [{id:"elite_moonlight_scuffle", loopStart:6.483}, {id:"serious_&_go", loopStart:6.6}, {id:"crazy_bnuuy", loopStart:8.083}, {id:"red_sus", loopStart:2.75}, {id:"smile_&_go_slow", loopStart:0}, {id:"robotic_foe", loopStart:5.283}, {id:"sneak", loopStart:0}, {id:"dummy_th000", loopStart:0.783}, {id:"aquamarine_bay", loopStart:6.483}, {id:"cosplay_pirate_idol_frenzy", loopStart:6.033}, {id:"beat_of_a_hundred_flowers", loopStart:9.683}, {id:"dethroneworld", loopStart:12.467}, {id:"corrupted_partner", 
    loopStart:11.817}, {id:"axe_dungeon", loopStart:19.283}, {id:"axe_dungeon_tatakae", loopStart:0.383}, {id:"polkata_fugue", loopStart:3.083}, {id:"polkata_fugue_tatakae", loopStart:0.383}, {id:"bridging_the_gap", loopStart:14.750}, {id:"elite_devil", loopStart:7.283}, {id:"unlimited", loopStart:24.417}, {id:"office", loopStart:0}, {id:"mori", loopStart:6.467}, {id:"kiara", loopStart:9.667}, {id:"gura", loopStart:13.133}, {id:"ina", loopStart:0.517}, {id:"amelia", loopStart:5.267}, {id:"kiseki", 
    loopStart:25.4}, {id:"towa", loopStart:9.967}];
    this.load = async() => {
      await this.la();
      await this.Z();
    };
    this.Z = () => Promise.all([...this.je.map(c => new Promise(b => {
      fetch(`music/${c.id}.wav`).then(a => a.arrayBuffer()).then(a => {
        this.cb.decodeAudioData(a, d => {
          c.buffer = d;
          b();
        });
      });
    })), ...this.ie.map(c => new Promise(b => {
      fetch(`sound/${c.id}.wav`).then(a => a.arrayBuffer()).then(a => {
        this.cb.decodeAudioData(a, d => {
          c.buffer = d;
          b();
        });
      });
    }))]);
    this.la = async() => {
      for (const c of this.K) {
        await Promise.all(c.map(b => new Promise((a, d) => Object.assign(this.images[b], {onload:a, onerror:d, src:`img/${b}.png`}))));
      }
    };
    (new Set(this.K.flat())).forEach(c => {
      this.images[c] = new Image();
    });
    this.cb = new AudioContext();
    this.cb.suspend();
  }
}
;class ba {
  constructor() {
    this.data = {};
    this.getItem = c => this.data[c];
    this.setItem = (c, b) => this.data[c] = b;
    this.save = c => globalThis.localStorage.setItem(`nuinui-save-${c}`, JSON.stringify(this.data));
    this.load = c => this.data = JSON.parse(globalThis.localStorage.getItem(`nuinui-save-${c}`));
    this.delete = c => globalThis.localStorage.removeItem(`nuinui-save-${c}`);
    this.K = c => globalThis.localStorage.getItem(`nuinui-opt-${c}`);
    this.ve = (c, b) => {
      globalThis.localStorage.setItem(`nuinui-opt-${c}`, b);
    };
  }
}
;class ca {
  constructor() {
    this.keys = {left:!1, right:!1, Bb:!1, Fc:!1, a:!1, b:!1, c:!1, xd:!1, r:!1, start:!1};
    this.enable = () => {
      document.body.onkeydown = c => this.K(c);
      document.body.onkeyup = c => this.K(c);
    };
    this.disable = () => {
      document.body.onkeydown = null;
      document.body.onkeyup = null;
    };
    this.K = c => {
      c.code in da && (this.keys[da[c.code]] = "keydown" === c.type, c.preventDefault());
    };
    this.enable();
  }
}
class ea {
  constructor() {
    this.K = this.keyboard = null;
    this.keyboard = new ca();
    window.addEventListener("gamepadconnected", c => {
      this.K = c.gamepad.index;
      fa = "gamepad";
    });
    window.addEventListener("gamepaddisconnected", c => {
      c.gamepad.index === this.K && (this.K = null, fa = "keyboard");
    });
  }
}
const ha = {left:"ArrowLeft", right:"ArrowRight", Fc:"ArrowUp", Bb:"ArrowDown", a:"KeyZ", b:"KeyX", c:"KeyC", xd:"KeyA", r:"KeyS", start:"Enter"};
var fa = "keyboard", da = {Ze:"left", $e:"right", af:"up", Ye:"down", gf:"a", ff:"b", df:"c", cf:"l", ef:"r", bf:"start"}, f = "a", k = null;
const ia = () => {
  da = Object.fromEntries(Object.entries("keyboard" === fa ? ha : void 0).map(([c, b]) => [b, c]));
}, ja = (c, b) => {
  b.value = ha[k];
  c.td.keyboard.enable();
  k = null;
}, ka = (c, b, a) => {
  const d = Object.entries(ha).find(([, e]) => e === b.code);
  d && d[0] !== k || (ha[k] = b.code, a.value = b.code, ia(), c.td.keyboard.enable(), k = null);
}, la = (c, b) => {
  const a = c.Ea.options.find(d => d.id === b);
  k && ja(c, a);
  k = b;
  ha[k] && (a.value = "...", c.td.keyboard.disable(), document.body.onkeydown = d => ka(c, d, a));
};
class m {
  constructor(c, b) {
    this.value = () => new m(this.x, this.y);
    this.S = a => new m(this.x + a.x, this.y + a.y);
    this.ka = a => new m(this.x * a, this.y * a);
    this.K = a => new m(this.x * a.x, this.y * a.y);
    this.Jc = a => this.x === a.x && this.y === a.y;
    this.floor = () => new m(Math.floor(this.x), Math.floor(this.y));
    this.round = () => new m(Math.round(this.x), Math.round(this.y));
    this.bb = (a, d) => new m((1 - d) * this.x + d * a.x, (1 - d) * this.y + d * a.y);
    this.Ab = a => Math.sqrt((this.x - a.x) ** 2 + (this.y - a.y) ** 2);
    this.Sd = a => !(this.x < a.A.x || a.A.x + a.size.x < this.x || this.y < a.A.y || a.A.y + a.size.y < this.y);
    this.x = c;
    this.y = b;
  }
}
var p = c => new m(c.A.x + c.size.x / 2, c.A.y + c.size.y / 2), r = (c, b) => q(c, b, "x") && q(c, b, "y") ? {A:new m(Math.max(c.A.x, b.A.x), Math.max(c.A.y, b.A.y)), size:new m(Math.round(100 * (Math.min(c.A.x + c.size.x, b.A.x + b.size.x) - Math.max(c.A.x, b.A.x))) / 100, Math.round(100 * (Math.min(c.A.y + c.size.y, b.A.y + b.size.y) - Math.max(c.A.y, b.A.y))) / 100)} : !1, q = (c, b, a) => !(c.A[a] + c.size[a] <= b.A[a] || c.A[a] >= b.A[a] + b.size[a]), t = (c, b) => b.filter(a => r(c, a)).map(a => 
({fb:a, ib:r(c, a)})), u = (c, b) => !(c.A.x + c.size.x > b.A.x + b.size.x || c.A.x < b.A.x) && !(c.A.y + c.size.y > b.A.y + b.size.y || c.A.y < b.A.y), v = (c, b, a) => !(c.A[a] + c.size[a] < b.A[a] || c.A[a] > b.A[a] + b.size[a]), ma = (c, b) => b.filter(a => v(c, a, "x") && v(c, a, "y"));
const na = (c, b) => {
  const a = 2 * Math.PI;
  b = (b - c) % a;
  return c + .05 * (2 * b % a - b);
};
function w(c, b, a) {
  c.La.push(new x({type:"digit", A:b, size:new m(5, 5), Wa:() => 5 * a, C:new m(.5 * (Math.random() - .5), -.5 - .5 * Math.random()), sa:24, zIndex:1}));
}
function oa(c, b) {
  c.La.push(new x({type:"explosion", A:b, size:new m(18, 18), Wa:a => a.size.x * Math.floor(8 * a.Ka / a.sa), C:new m(0, 0), sa:32, zIndex:1}));
}
function y(c, b, a = 1) {
  for (let d = 0; 16 > d; d++) {
    c.La.push(new x({type:"explosion", A:b.S(new m(Math.round(48 * Math.random() - 24), Math.round(48 * Math.random() - 24))), size:new m(18, 18), Wa:e => e.size.x * Math.floor(8 * e.Ka / e.sa), C:new m(0, 0), sa:32, zIndex:a, delay:d}));
  }
}
function pa(c, b) {
  c.La.push(new x({type:"land", A:b.A.S(new m(b.size.x / 2, b.size.y - 3)), size:new m(40, 16), Wa:a => a.size.x * Math.floor(6 * a.Ka / a.sa), C:new m(0, 0), sa:24, zIndex:0}));
}
function qa(c, b, a = 4) {
  c.La.push(new x({type:"water_trail", A:b.A.S(new m(b.size.x / 2, b.size.y - 16)), size:new m(16, 32), Wa:d => d.size.x * Math.floor(8 * d.Ka / d.sa), C:new m(a, 0), sa:24, zIndex:1}));
}
function z(c, b, a, d) {
  c.La.push(new x({type:"smoke_white", A:new m(Math.round(b.x) + Math.round(10 * Math.random() - 5), Math.round(b.y) + Math.round(10 * Math.random() - 5)), size:new m(8, 8), Wa:e => e.size.x * Math.floor(4 * e.Ka / e.sa), C:a, sa:12 + Math.floor(8 * Math.random()), zIndex:d}));
}
function ra(c, b, a, d) {
  c.La.push(new x({type:"smoke_black", A:new m(Math.round(b.x) + Math.round(10 * Math.random() - 5), Math.round(b.y) + Math.round(10 * Math.random() - 5)), size:new m(8, 8), Wa:e => e.size.x * Math.floor(4 * e.Ka / e.sa), C:a, sa:12 + Math.floor(8 * Math.random()), zIndex:d}));
}
function A(c, b, a, d) {
  c.La.push(new x({type:"smoke_spirit", A:new m(Math.round(b.x) + Math.round(10 * Math.random() - 5), Math.round(b.y) + Math.round(10 * Math.random() - 5)), size:new m(8, 8), Wa:e => e.size.x * Math.floor(4 * e.Ka / e.sa), C:a, sa:12 + Math.floor(8 * Math.random()), zIndex:d}));
}
function B(c, b, a, d) {
  c.La.push(new x({type:"smoke_pink", A:new m(Math.round(b.x) + Math.round(10 * Math.random() - 5), Math.round(b.y) + Math.round(10 * Math.random() - 5)), size:new m(8, 8), Wa:e => e.size.x * Math.floor(4 * e.Ka / e.sa), C:a, sa:12 + Math.floor(8 * Math.random()), zIndex:d}));
}
function sa(c, b, a, d) {
  c.La.push(new x({type:"bubble", A:b.round(), size:new m(8, 8), Wa:e => e.size.x * Math.floor(4 * e.Ka / e.sa), C:a, sa:32 + Math.floor(16 * Math.random()), zIndex:d}));
}
function ta(c, b) {
  c.La.push(new x({type:`shine_${.5 < Math.random() ? "" : "2_"}white`, A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(10, 10), Wa:a => a.size.x * Math.floor(4 * a.Ka / a.sa), C:new m(0, 0), sa:16, delay:Math.floor(8 * Math.random()), zIndex:1}));
}
function D(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random());
  c.La.push(new x({type:"sparkle_white", A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(16, 16), Wa:d => d.size.x * Math.floor(6 * d.Ka / d.sa), C:new m(0, 0), sa:24, zIndex:1, rotate:d => Math.PI / 180 * Math.floor(d.Ka) * a}));
}
function ua(c, b, a) {
  a = a ? a : new m(0, 0);
  const d = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random());
  c.La.push(new x({type:"sparkle_fire", A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(16, 16), Wa:e => e.size.x * Math.floor(6 * e.Ka / e.sa), C:a, sa:24, zIndex:1, rotate:e => Math.PI / 180 * Math.floor(e.Ka) * d}));
}
function va(c, b, a) {
  var d = null;
  d = d ? d : new m(0, 0);
  const e = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random());
  c.La.push(new x({type:"sparkle_fire_2", A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(16, 16), Wa:g => g.size.x * Math.floor(6 * g.Ka / g.sa), C:d, sa:24, zIndex:a, rotate:g => Math.PI / 180 * Math.floor(g.Ka) * e}));
}
function wa(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random());
  c.La.push(new x({type:"sparkle_fire_3", A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(16, 16), Wa:d => d.size.x * Math.floor(6 * d.Ka / d.sa), C:new m(0, 0), sa:24, zIndex:1, rotate:d => Math.PI / 180 * Math.floor(d.Ka) * a}));
}
function xa(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random());
  c.La.push(new x({type:"sparkle_fire_4", A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(16, 16), Wa:d => d.size.x * Math.floor(6 * d.Ka / d.sa), C:new m(0, 0), sa:24, zIndex:1, rotate:d => Math.PI / 180 * Math.floor(d.Ka) * a}));
}
function ya(c, b, a, d) {
  c.La.push(new x({type:`shine_${.5 < Math.random() ? "" : "2_"}white`, A:new m(Math.round(b.x) + Math.round(20 * Math.random() - 10), Math.round(b.y) + Math.round(20 * Math.random() - 10)), size:new m(10, 10), Wa:e => e.size.x * Math.floor(4 * e.Ka / e.sa), C:a, sa:16, delay:Math.floor(8 * Math.random()), zIndex:d}));
}
function E(c, b) {
  c.La.push(new x({type:"impact", A:b, size:new m(32, 32), Wa:a => a.size.x * Math.floor(2 * a.Ka / a.sa), C:new m(0, 0), sa:8, zIndex:1}));
}
function F(c, b) {
  for (let a = 0; 2 > a; a++) {
    c.La.push(new x({type:`ray_${Math.ceil(4 * Math.random())}`, A:b, size:new m(128, 128), C:new m(0, 0), sa:2, zIndex:1, delay:4 * a}));
  }
}
function za(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random()), d = 20 + 12 * Math.random(), e = Math.cos(2 * Math.random() * Math.PI), g = Math.sin(2 * Math.random() * Math.PI);
  c.La.push(new x({type:"sparkle_white", A:b.S(new m(e * d, g * d)), size:new m(16, 16), Wa:h => h.size.x * Math.floor(6 * h.Ka / h.sa), C:new m(-e, -g), sa:24, zIndex:1, rotate:h => Math.PI / 180 * Math.floor(h.Ka) * a}));
}
function Aa(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random()), d = 20 + 12 * Math.random(), e = Math.cos(2 * Math.random() * Math.PI), g = Math.sin(2 * Math.random() * Math.PI);
  c.La.push(new x({type:"sparkle_fire_2", A:b.S(new m(e * d, g * d)), size:new m(16, 16), Wa:h => h.size.x * Math.floor(6 * h.Ka / h.sa), C:new m(-e, -g), sa:24, zIndex:1, rotate:h => Math.PI / 180 * Math.floor(h.Ka) * a}));
}
function Ba(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random()), d = 20 + 12 * Math.random(), e = Math.cos(2 * Math.random() * Math.PI), g = Math.sin(2 * Math.random() * Math.PI);
  c.La.push(new x({type:"sparkle_fire_3", A:b.S(new m(e * d, g * d)), size:new m(16, 16), Wa:h => h.size.x * Math.floor(6 * h.Ka / h.sa), C:new m(-e, -g), sa:24, zIndex:1, rotate:h => Math.PI / 180 * Math.floor(h.Ka) * a}));
}
function Ca(c, b) {
  const a = (.5 < Math.random() ? 1 : -1) * Math.round(3 * Math.random()), d = 20 + 12 * Math.random(), e = Math.cos(2 * Math.random() * Math.PI), g = Math.sin(2 * Math.random() * Math.PI);
  c.La.push(new x({type:"sparkle_fire_4", A:b.S(new m(e * d, g * d)), size:new m(16, 16), Wa:h => h.size.x * Math.floor(6 * h.Ka / h.sa), C:new m(-e, -g), sa:24, zIndex:1, rotate:h => Math.PI / 180 * Math.floor(h.Ka) * a}));
}
class Da {
  constructor() {
    this.La = [];
  }
  update() {
    this.La = this.La.filter(c => c.Ka < c.sa);
    this.La.forEach(c => c.update());
  }
  ca(c, b, a) {
    this.La.filter(d => d.zIndex === a).forEach(d => d.ca(c, b));
  }
  Vd(c) {
    this.La.push(new x({type:"jump", A:c.A.S(new m(c.size.x / 2, c.size.y - 12)), size:new m(16, 32), Wa:b => b.size.x * Math.floor(4 * b.Ka / b.sa), C:new m(0, 0), sa:16, zIndex:0}));
  }
  $b(c, b) {
    const a = [b ? 1 : -1, 1];
    this.La.push(new x({type:"run", A:c.A.S(new m(b ? -8 : c.size.x + 8, c.size.y - 7)), size:new m(24, 16), Wa:d => d.size.x * Math.floor(4 * d.Ka / d.sa), scale:() => a, C:new m(0, 0), sa:16, zIndex:0}));
  }
  step(c) {
    const b = [c.dir ? 1 : -1, 1];
    this.La.push(new x({type:"step", A:c.A.S(new m(c.dir ? -8 : c.size.x + 8, c.size.y - 3)), size:new m(12, 12), Wa:a => a.size.x * Math.floor(4 * a.Ka / a.sa), scale:() => b, C:new m(0, 0), sa:16, zIndex:0}));
  }
  Ac(c, b, a) {
    const d = [b ? 1 : -1, a ? 1 : -1];
    this.La.push(new x({type:"mace", A:c, size:new m(64, 24), Wa:e => e.size.x * Math.floor(2 * e.Ka / e.sa), C:new m(0, 0), sa:8, zIndex:1, scale:() => d}));
  }
}
class x {
  constructor(c) {
    this.Ka = 0;
    Object.assign(this, c);
  }
  update() {
    this.delay ? this.delay-- : (this.A = this.A.S(this.C), this.Ka++);
  }
  ca(c, b) {
    this.delay || (c.save(), c.translate(Math.round(this.A.x), Math.round(this.A.y)), this.rotate && c.rotate(this.rotate(this)), this.scale && c.scale(...this.scale(this)), c.drawImage(b.images[`vfx_${this.type}`], this.Wa ? this.Wa(this) : 0, 0, this.size.x, this.size.y, -Math.round(.5 * this.size.x), -Math.round(.5 * this.size.y), this.size.x, this.size.y), c.restore());
  }
}
;class Ea extends G {
  constructor(c) {
    this.size = new m(8, 8);
    this.C = new m(0, 0);
    this.Ba = .2;
    this.R = (b, a) => r(this, a);
    this.update = b => {
      this.A = this.A.S(this.C);
      this.F % 16 || za(b.B.J, p(this));
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, b.B.P.L).length) {
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, b.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      let a = !1;
      const d = b.B.D.find(e => e instanceof H);
      r(this, d) ? (d.G = Math.min(d.da, d.G + 2), b.O("heal"), a = !0) : r(this, b.B.P) || (a = !0);
      a && (b.B.D = b.B.D.filter(e => e !== this));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      2 === b.Da && b.B.Ld && a.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(this.F / 4))));
      a.drawImage(b.I.images.sp_heart, 0, 0);
      a.restore();
    };
    super(c);
  }
}
;class I extends G {
  constructor(c) {
    super();
    this.size = new m(24, 24);
    this.C = new m(0, 0);
    this.da = 2;
    this.R = (b, a) => r(this, a);
    this.oa = (b, a) => {
      this.G = Math.max(0, this.G - (a.V ? a.V : 1));
      this.aa = 15;
      F(b.B.J, this.R(b, a).A);
      E(b.B.J, this.R(b, a).A);
      w(b.B.J, this.R(b, a).A, a.V ? a.V : 1);
      this.G ? (b.U += 20, b.O("damage")) : (b.B.D = b.B.D.filter(d => d !== this), "rocket" !== a.type && (y(b.B.J, p(this)), b.B.aa = 4, b.O("rumble")), b.U += 100, J(this, b, .7));
    };
    this.update = b => {
      const a = b.B.D.find(g => g instanceof H);
      this.C.x = Math.cos(this.F / 2048 * (180 / Math.PI)) / 2;
      this.C.y = Math.sin(this.F / 2048 * (180 / Math.PI)) / 2;
      this.A.x += this.C.x;
      this.A.y += this.C.y;
      for (var d = 0; 2 > d; d++) {
        z(b.B.J, p(this), new m(-this.C.x + .5 * Math.cos(2 * Math.random() * Math.PI), -this.C.y + .5 * Math.sin(2 * Math.random() * Math.PI)), 0);
      }
      if ([63, 95, 127].includes(this.F % 128) && r(this, b.B.view) && !a.Ia) {
        d = p(this);
        var e = p(a);
        192 > d.Ab(e) && d.y - 32 < e.y && (e = Math.atan2(e.y - d.y, e.x - d.x) + 0.125 * Math.random() - 0.0625, b.B.D.push(new L(d, (new m(Math.cos(e), Math.sin(e))).ka(2), this)), r(this, b.B.view) && b.O("pew"));
      }
      this.G < this.da / 2 && .9 < Math.random() && z(b.B.J, p(this), new m(0, -2), 1);
      this.dir = p(this).x < p(a).x;
      this.F++;
      this.zd && 656 <= this.A.x && (this.jd = !0);
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      a.drawImage(b.I.images.sp_nousabot, 0, 6 === b.Da ? 72 : 4 === b.Da ? 48 : 2 === b.Da ? 24 : 0, 24, 24, 0, 0, 24, 24);
      a.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
  }
}
class M extends G {
  constructor(c, b) {
    super();
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.da = 6;
    this.M = "idle";
    this.ea = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      3 !== a.Da ? (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1)) : w(a.B.J, this.R(a, d).A, 0);
      this.aa = 15;
      F(a.B.J, this.R(a, d).A);
      E(a.B.J, this.R(a, d).A);
      this.G ? (a.U += 50, a.O("damage")) : (a.B.D = a.B.D.filter(e => e !== this), "rocket" !== d.type && (y(a.B.J, p(this)), a.B.aa = 4, a.O("rumble")), J(this, a, .3), a.U += 200);
    };
    this.update = a => {
      const d = a.B.D.find(h => h instanceof H);
      this.F || 6 !== a.Da || (this.G = 8);
      this[`${this.M}Phase`](a);
      const e = {A:new m(this.A.x + this.C.x, this.A.y), size:this.size};
      if (!this.xb && t(e, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      const g = a.B.P.L.find(h => v({A:{x:this.A.x, y:this.A.y + this.size.y}, size:{x:this.size.x, y:0}}, h, "y") && q(e, h, "x"));
      u(e, a.B.P) && g || (this.C.x = 0, this.Ja *= -1);
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.A.y += this.C.y;
      this.ic || (this.dir = p(this).x < p(d).x);
      this.xe ? A(a.B.J, this.A.S(new m(this.size.x / 2, 0)), new m(0, -1), 0) : this.ic && .9 < Math.random() && A(a.B.J, p(this).S(new m(16 * Math.random() - 8, 16 * Math.random() - 8)), new m(0, -.25), 1);
      this.G < this.da / 2 && .9 < Math.random() && z(a.B.J, p(this), new m(0, -2), 1);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.Cd && d.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(this.F / 4))));
      this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
      const e = new m(12, 12);
      this.Cd ? d.drawImage(a.I.images.sp_pirate_jetski, -10, -8) : d.drawImage(a.I.images.sp_robot, this.ic ? 144 : 0 === this.C.x ? 0 : this.dir === 0 > this.C.x ? 48 : 96, 3 === a.Da ? 96 : 2 === a.Da ? 48 : 6 === a.Da ? 144 : 0, 48, 48, -e.x, -e.y, 48, 48);
      d.restore();
    };
    this.A = new m(16 * c.x, 16 * c.y - 32);
    this.G = this.da;
    this.M = (this.ic = b) ? "sleep" : "idle";
  }
}
class N extends G {
  constructor(c) {
    super();
    this.size = new m(20, 22);
    this.C = new m(0, 0);
    this.da = 2;
    this.Ba = .15;
    this.M = "idle";
    this.ea = 0;
    this.wait = !1;
    this.R = (b, a) => r(this, a);
    this.oa = (b, a) => {
      this.G = Math.max(0, this.G - (a.V ? a.V : 1));
      this.aa = 15;
      F(b.B.J, this.R(b, a).A);
      E(b.B.J, this.R(b, a).A);
      w(b.B.J, this.R(b, a).A, a.V ? a.V : 1);
      this.G ? (b.U += 10, b.O("damage")) : (b.B.D = b.B.D.filter(d => d !== this), "rocket" !== a.type && (y(b.B.J, p(this)), b.B.aa = 4, b.O("rumble")), J(this, b, .9), b.U += 50);
    };
    this.ia = b => {
      this.animation = b;
      this.pa = 0;
    };
    this.update = b => {
      const a = b.B.D.find(d => d instanceof H);
      this[`${this.M}Phase`](b);
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, b.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, b.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.C.x = 0;
      }
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, b.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, b.B.P.L).some(d => d.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, b.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      u(this, b.B.P) || (this.C.x = 0, this.Ja *= -1);
      this.dir = p(this).x < p(a).x;
      this.G < this.da / 2 && .9 < Math.random() && z(b.B.J, p(this), new m(0, -2), 1);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      const d = new m(6, 10);
      a.drawImage(b.I.images.sp_nousakumo, this.ga ? 0 : 32, 6 === b.Da ? 96 : 4 === b.Da ? 64 : 2 === b.Da ? 32 : 0, 32, 32, -d.x, -d.y, 32, 32);
      a.restore();
    };
    this.A = new m(16 * c.x, 16 * c.y - 22);
    this.G = this.da;
  }
}
;class Fa extends G {
  constructor(c) {
    super();
    this.size = new m(20, 38);
    this.C = new m(0, 0);
    this.da = 4;
    this.Ba = .15;
    this.M = "idle";
    this.ea = 0;
    this.R = (b, a) => r(this, a);
    this.oa = (b, a) => {
      this.G = Math.max(0, this.G - (a.V ? a.V : 1));
      this.aa = 15;
      F(b.B.J, this.R(b, a).A);
      E(b.B.J, this.R(b, a).A);
      w(b.B.J, this.R(b, a).A, a.V ? a.V : 1);
      this.G ? (b.U += 50, b.O("damage")) : (b.B.D = b.B.D.filter(d => d !== this), "rocket" !== a.type && (y(b.B.J, p(this)), b.B.aa = 4, b.O("rumble")), J(this, b, .6), b.U += 200);
    };
    this.ia = b => {
      this.animation = b;
      this.pa = 0;
    };
    this.update = b => {
      const a = b.B.D.find(d => d instanceof H);
      this[`${this.M}Phase`](b);
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, b.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, b.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.C.x = 0;
      }
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, b.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, b.B.P.L).some(d => d.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, b.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      u(this, b.B.P) || (this.C.x = 0, this.Ja *= -1);
      this.dir = p(this).x < p(a).x;
      this.G < this.da / 2 && .9 < Math.random() && z(b.B.J, p(this), new m(0, -2), 1);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      const d = new m(6, 10);
      a.drawImage(b.I.images.sp_mikobell, this.ga ? 0 : 32, 0, 32, 48, -d.x, -d.y, 32, 48);
      a.restore();
    };
    this.A = new m(16 * c.x, 16 * c.y - 38);
    this.G = this.da;
  }
}
class Ga extends G {
  constructor(c, b) {
    super();
    this.size = new m(32, 32);
    this.C = new m(0, 0);
    this.da = 4;
    this.Ba = .2;
    this.K = !1;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.G = Math.max(0, this.G - (d.V ? d.V : 1));
      this.aa = 15;
      F(a.B.J, this.R(a, d).A);
      E(a.B.J, this.R(a, d).A);
      w(a.B.J, this.R(a, d).A, d.V ? d.V : 1);
      this.G ? (a.U += 20, a.O("damage")) : (a.B.D = a.B.D.filter(e => e !== this), "rocket" !== d.type && (y(a.B.J, p(this)), a.B.aa = 4, a.O("rumble")), J(this, a, .7), a.U += 100);
    };
    this.update = a => {
      a.B.D.find(d => d instanceof H);
      this.K ? this.C.x = 1.75 * this.Ja : this.K = u(this, a.B.view);
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.C.x = 0;
        this.Ja *= -1;
        r(this, a.B.view) && a.O("question");
      }
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(d => d.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      u(this, a.B.P) ? this.ea++ : (this.C.x = 0, this.Ja *= -1);
      this.qa = this.M;
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      d.drawImage(a.I.images.sp_casino_chip, Math.floor(this.F / 6) % 2 ? 0 : 32, 3 === a.Da ? 64 : this.color ? 0 : 32, 32, 32, 0, 0, 32, 32);
      d.restore();
    };
    this.color = .5 > Math.random();
    this.A = new m(16 * c.x, 16 * c.y - 32);
    this.Ja = b;
    this.G = this.da;
  }
}
class Ha extends G {
  constructor(c, b, a) {
    super();
    this.size = new m(0, 0);
    this.angle = 0;
    this.R = (d, e) => {
      d = t(e, this.L);
      return d.length ? r(d[0].fb, e) : !1;
    };
    this.update = () => {
      this.angle = this.offset + Math.PI / 180 * this.speed * this.F % (2 * Math.PI);
      this.L.forEach((d, e) => {
        const g = this.angle;
        d.A = this.A.S((new m(Math.cos(g), Math.sin(g))).ka(16 * (e + 1))).S(new m(-6, -6));
      });
      for (let d = 0; 2 > d; d++) {
      }
      this.F++;
    };
    this.ca = (d, e) => {
      e.save();
      e.translate(Math.round(this.A.x), Math.round(this.A.y));
      e.rotate(this.angle);
      e.drawImage(d.I.images.sp_scythe, 0, 0, 80, 32, 0, -8, 80, 32);
      e.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.speed = b;
    this.offset = Math.PI / 180 * a;
    this.L = [];
    for (c = 0; 4 > c; c++) {
      this.L.push({A:new m(this.A.x + 16 * c, this.A.y), size:new m(12, 12)});
    }
  }
}
class Ia extends G {
  constructor() {
    super();
    this.size = new m(0, 0);
    this.C = new m(0, 0);
    this.da = 24;
    this.T = 0;
    this.D = [];
    this.R = (c, b) => r(this, b);
    this.oa = (c, b) => {
      this.$ || (this.G = Math.max(0, this.G - (b.V ? b.V : 1)), this.aa = 15, this.$ = 30);
      this.G || (c.B.D = c.B.D.filter(a => a !== this));
    };
    this.update = c => {
      this.D.forEach(b => {
        if (!b.G) {
          b.M = "defeated";
          for (let a = 0; 64 > a; a++) {
            z(c.B.J, p(b).S(new m(Math.round(48 * Math.random() - 24), Math.round(48 * Math.random() - 24))), new m(0, 0), 1);
          }
          c.B.D = c.B.D.filter(a => a !== b);
          this.D = this.D.filter(a => a !== b);
        }
      });
      0 !== this.A.y && (this.A.y = .9 * this.A.y);
      .1 > Math.abs(-this.A.y) && (this.A.y = 0);
      this === c.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || c.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.F++;
    };
    this.ca = (c, b) => {
      b.save();
      b.translate(Math.floor(this.A.x), Math.floor(this.A.y));
      b.globalAlpha = .75;
      this.$ % 2 && (b.globalAlpha = .5);
      for (let a = 0; 128 > a; a++) {
        b.drawImage(c.I.images.sp_skulls, 0, a, 320, 1, 4 * Math.cos((c.B.F + a) / c.height / 4 * (180 / Math.PI)) - 8, a + 2 * Math.cos(c.B.F / c.height / 4 * (180 / Math.PI)) - 2, 320, 1);
      }
      b.restore();
    };
    this.A = new m(2728, -64);
    this.G = this.da;
  }
}
;class Ja extends G {
  constructor(c) {
    super();
    this.size = new m(16, 16);
    this.C = new m(0, 0);
    this.da = 2;
    this.R = (b, a) => r(this, a);
    this.oa = (b, a) => {
      this.G = Math.max(0, this.G - (a.V ? a.V : 1));
      this.aa = 15;
      F(b.B.J, this.R(b, a).A);
      E(b.B.J, this.R(b, a).A);
      w(b.B.J, this.R(b, a).A, a.V ? a.V : 1);
      this.G ? (b.O("damage"), b.U += 20) : (b.B.D = b.B.D.filter(d => d !== this), b.U += 100, b.O("noise"), J(this, b, .7), this.K && (this.K.xe = null, this.K.ic = !0, this.K.M = "sleep", this.K.C = new m(0, 0)));
    };
    this.update = b => {
      var a = b.B.D.find(d => d instanceof H);
      this.K ? this.A = this.A.bb(this.K.A.S(new m(0, -16)), .075) : (r(this, b.B.view) && b.B.D.some(d => d instanceof M) ? this.C = p(this).bb(p(a), .005).S(p(this).ka(-1)) : (this.C.x = Math.cos(this.F / 2048 * (180 / Math.PI)) / 2, this.C.y = Math.sin(this.F / 4096 * (180 / Math.PI)) / 2), this.A = this.A.S(this.C));
      !this.K && 192 > p(a).Ab(p(this)) && (a = b.B.D.find(d => d instanceof M && d.ic && 64 > p(this).Ab(p(d)))) && (this.K = a, this.K.xe = this, this.K.ic = !1, this.K.M = "idle", b.O("noise"));
      for (a = 0; 2 > a; a++) {
        A(b.B.J, p(this), new m(-this.C.x + .5 * Math.cos(2 * Math.random() * Math.PI), -this.C.y + .5 * Math.sin(2 * Math.random() * Math.PI)), 0);
      }
      if (!this.K && [63].includes(this.F % 128) && r(this, b.B.view)) {
        for (a = 0; 8 > a; a++) {
          const d = Math.PI / 4 * a + (this.Z ? 0 : Math.PI / 8);
          b.B.D.push(new L(p(this), (new m(Math.cos(d), Math.sin(d))).ka(2), this));
          r(this, b.B.view) && b.O("pew");
        }
      }
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      a.drawImage(b.I.images.sp_spirit, this.Z ? 0 : 16, 0, 16, 16, 0, 0, 16, 16);
      a.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
    this.Z = .5 < Math.random();
  }
}
class Ka extends G {
  constructor(c) {
    super(c);
    this.size = new m(96, 48);
    this.C = new m(0, 0);
    this.ea = 0;
    this.qa = this.M = "newBody";
    this.da = 32;
    this.Z = 16;
    this.K = 8;
    this.la = [];
    this.T = 0;
    this.R = (b, a) => r(this, a);
    this.oa = (b, a) => {
      "newBody" !== this.M && (this.$ || (this.$ = 30, this.G = Math.max(0, this.G - (a.V ? a.V : 1)), this.aa = 15, F(b.B.J, this.R(b, a).A), E(b.B.J, this.R(b, a).A), w(b.B.J, this.R(b, a).A, a.V ? a.V : 1)), this.G || "death" === this.M ? (b.O("damage"), b.U += 20) : (b.B.D = b.B.D.filter(d => ![L, Ja, M].some(e => d instanceof e)), this.M = "death", b.O("level_start")));
    };
    this.update = b => {
      if (this.M) {
        this[`${this.M}Phase`](b);
      }
      var a = new m(this.A.x + this.C.x, this.A.y), d = this.size;
      if (624 > a.x || 832 < a.x + d.x) {
        this.A.x = Math.round(this.A.x), this.Ja *= -1, this.C.x = 0;
      }
      a = [this, ...this.la];
      this.A.x += this.C.x;
      this.la.forEach((g, h) => g.A.x = this.A.x + Math.cos((this.F + 200 * h) / 2000 * (180 / Math.PI)) * this.Z);
      const e = b.B.D.find(g => g instanceof H);
      t(e, a.filter(g => 2 !== g.type)).length && (e.A.x += 4 * (p(this).x < p(e).x ? 1 : -1), e.C.x = 0);
      a.filter(g => 2 !== g.type).find(g => v({A:{x:e.A.x, y:e.A.y + e.size.y}, size:{x:e.size.x, y:0}}, g, "y") && q(e, g, "x")) && (e.A.x += this.C.x);
      8 === this.K && this.G < .6 * this.da && (this.K = 14, this.Z = 24);
      14 === this.K && this.G < .3 * this.da && (this.K = 19, this.Z = 32);
      a.forEach(g => {
        g.G < .5 * g.da && .9 < Math.random() && z(b.B.J, g.A.S((new m(Math.random(), Math.random())).K(g.size)), new m(0, -2), 1);
      });
      this === b.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || b.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.F++;
    };
    this.ca = (b, a) => {
      this.$ % 2 || (a.save(), a.translate(Math.round(this.A.x + Math.cos(this.F / 2000 * (180 / Math.PI)) * this.Z), Math.round(this.A.y)), this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0)), a.drawImage(b.I.images.sp_fubuzilla, 0, 0, 112, 60, -8, -12, 112, 60), a.restore(), this.Oc && a.drawImage(b.I.images.sp_laser_target, "attack" === this.M ? 0 : Math.floor(this.F / 2) % 2 * 24, 0, 24, 24, this.Oc.x - 12, this.Oc.y - 12, 24, 24));
    };
    this.G = this.da;
  }
}
class La extends G {
  constructor(c, b) {
    super();
    this.size = new m(48, 48);
    this.C = new m(0, 0);
    this.da = 6;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.G = Math.max(0, this.G - (d.V ? d.V : 1));
      this.aa = 15;
      F(a.B.J, this.R(a, d).A);
      E(a.B.J, this.R(a, d).A);
      w(a.B.J, this.R(a, d).A, d.V ? d.V : 1);
      this.G ? (a.O("damage"), a.U += 20) : (a.B.D = a.B.D.filter(e => e !== this), a.U += 100, J(this, a, .7), "rocket" !== d.type && (y(a.B.J, p(this)), a.B.aa = 4, a.O("rumble")));
    };
    this.update = a => {
      this.K && !this.K.G && (this.K = null);
      this.K && r(this.K, a.B.view) || !this.F || this.F % 128 || !r(this, a.B.view) || (this.K = new Ga(this.A.S(new m(0, 48)).ka(.0625), this.dir ? 1 : -1), a.B.D.push(this.K), a.O("pew"));
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
      d.drawImage(a.I.images.sp_miteiru, 0, 0);
      d.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
    this.dir = b;
  }
}
class Ma extends G {
  constructor(c) {
    super();
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.da = 32;
    this.R = (b, a) => r(this, a);
    this.oa = (b, a) => {
      this.G = Math.max(0, this.G - (a.V ? a.V : 1));
      this.aa = 15;
      F(b.B.J, this.R(b, a).A);
      E(b.B.J, this.R(b, a).A);
      w(b.B.J, this.R(b, a).A, a.V ? a.V : 1);
      this.G ? (b.O("damage"), b.U += 20) : (b.B.D = b.B.D.filter(d => d !== this), b.U += 100, J(this, b, .7), "rocket" !== a.type && (y(b.B.J, p(this)), b.B.aa = 4, b.O("rumble")));
    };
    this.update = b => {
      var a = b.B.D.find(d => d instanceof H);
      this.C.x = Math.cos(this.F / 2048 * (180 / Math.PI)) / 2;
      this.C.y = Math.sin(this.F / 2048 * (180 / Math.PI)) / 2;
      this.A = this.A.bb(new m(a.A.x + 96 * (4 === b.Da ? -1 : 1), this.A.y), .05);
      this.A = this.A.S(this.C);
      this.dir = p(this).x > p(a).x;
      if ([127].includes(this.F % 128) && r(this, b.B.view)) {
        const d = p(this);
        a = p(a);
        192 > d.Ab(a) && d.y - 32 < a.y && (a = Math.atan2(a.y - d.y, a.x - d.x), b.B.D.push(new L(d, (new m(Math.cos(a), Math.sin(a))).ka(2), this)), r(this, b.B.view) && b.O("pew"), this.Dc = 8);
      }
      this.Dc && this.Dc--;
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      a.drawImage(b.I.images.sp_oni, this.Dc ? 80 : Math.floor(this.F / 16) % 2 ? 40 : 0, 0, 40, 42, -14, -4, 40, 42);
      a.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
  }
}
;class Na extends G {
  constructor() {
    var c = new m(448, 384);
    super(c);
    this.size = new m(64, 48);
    this.T = this.ea = 0;
    this.Lc = [];
    this.K = 0;
    this.R = (b, a) => {
      b = r(this, a);
      return ["intro", "defeated"].includes(this.M) ? null : b;
    };
    this.oa = (b, a) => {
      this.G && !this.$ && (this.G = Math.max(0, this.G - (a.V ? a.V : 1)), this.aa = 15, F(b.B.J, this.R(b, a).A), E(b.B.J, this.R(b, a).A), w(b.B.J, this.R(b, a).A, a.V ? a.V : 1), b.O("hit"), this.G ? (b.U += 100, this.$ = 12) : b.U += 5000);
    };
    this.update = b => {
      if (this.M) {
        this[`${this.M}Phase`](b);
      }
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.nb && (this.nb = this.nb.S(new m(0, .1 * Math.sin(Math.PI / 180 * this.F))), this.A = this.A.bb(this.nb, .1));
      this.jc && this.Lc.every(a => r(a, this.jc)) && (this.unit = this.jc, this.unit.ed = !0, this.jc = null);
      this === b.B.N && (this.T < this.G ? (this.T += 4, this.F % 4 || b.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      for (let a = 0; 8 > a; a++) {
        B(b.B.J, p(this).S(new m(48 * Math.random() - 24, 64 * Math.random() - 32)), new m(Math.random() - .5, -2 * Math.random()), 0);
      }
      this.K && this.G && (this.F % 20 || b.O("explosion"), this.K--);
      this.$ && this.$--;
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      for (var d = 0; 3 > d; d++) {
        a.save(), a.translate(.5 * this.size.x, 0), a.drawImage(b.I.images.sp_demon_spine, 24 * d, 0, 24, 24, -12, this.size.y + 12 + 24 * d + 2 * Math.sin((this.F + 120 * d) % 360 * 2 * (Math.PI / 180)), 24, 24), a.drawImage(b.I.images.sp_demon_ribcage, 40 * d, 0, 40, 40, -("laser" === this.M ? 64 : 56) + 4 * d, this.size.y + 20 * d + 2 * Math.cos((this.F + 120 * d) % 360 * 2 * (Math.PI / 180)), 40, 40), a.scale(-1, 1), a.drawImage(b.I.images.sp_demon_ribcage, 40 * d, 0, 40, 40, -("laser" === this.M ? 
        64 : 56) + 4 * d, this.size.y + 20 * d + 2 * Math.cos((this.F + 120 * d) % 360 * 2 * (Math.PI / 180)), 40, 40), a.restore();
      }
      a.save();
      10 < this.$ && (a.filter = "contrast(0) brightness(2)");
      d = ["charge", "attack", "death"].includes(this.M) || this.K ? 96 : ["laser", "end"].includes(this.M) ? 96 * (1 + Math.floor(.5 * this.F) % 4) : 0;
      a.drawImage(b.I.images.sp_demon_head, d, 0, 96, 96, -16, -16, 96, 96);
      a.restore();
      "laser" === this.M && (a.drawImage(b.I.images.sp_demon_laser, Math.floor(.25 * this.F) % 4 * 64, 96, 64, 96, 0, 64, 64, 96), a.drawImage(b.I.images.sp_demon_laser, Math.floor(.25 * this.F) % 6 * 64, 0, 64, 96, 0, 64, 64, 96));
      a.restore();
    };
    this.G = this.da = 512;
    this.nb = c;
  }
}
class Oa extends G {
  constructor(c) {
    super((new m(33.5, 20)).ka(16));
    this.size = new m(16, 32);
    this.qd = !1;
    this.K = 0;
    this.oa = (b, a) => {
      !this.la && a instanceof Pa && a.za instanceof Na && (this.aa = 15, F(b.B.J, this.R(b, a).A), E(b.B.J, this.R(b, a).A), b.O("hit"), this.la = 180, this.Z = 60, this.K = 0);
    };
    this.update = b => {
      if (this.ed) {
        var a = b.B.D.find(d => d instanceof Na);
        this.A.y = a.Lc[0].A.y - 18;
        a.Lc.find(d => r(this, d)) || (this.A.y = 320, this.ed = !1, a.unit = null);
      }
      if (this.ed || this.la) {
        for (.95 < Math.random() && (this.aa = 2), a = 0; 2 > a; a++) {
          B(b.B.J, p(this).S(new m(16 * Math.random() - 8, 32 * Math.random() - 16)), new m(Math.random() - .5, -2 * Math.random()), 0);
        }
      }
      !this.K || this.Z || this.F % 4 || za(b.B.J, this.A.S(this.size.ka(.5)));
      this.qd && this.$a && "end" === this.$a.M && (this.qd = !1);
      this.la ? this.la-- : this.Z ? this.Z-- : this.qd && !this.ed && (300 > this.K ? this.K++ : (this.K = 0, this.Z = 60, a = new O(this.A, new m(16, 16), new m(-1, -6), "mace2", b.B.D.find(d => d instanceof H)), b.B.D.push(a)));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.K && (300 > this.K || this.F % 2) && (a.save(), a.translate(.5 * this.size.x - 16, -8), a.fillStyle = "#000", a.fillRect(0, 0, 32, 4), a.fillStyle = "#fff", a.fillRect(0, 0, Math.round(32 * this.K / 300), 4), a.restore());
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      this[`${this.name}Draw`](b, a);
      a.restore();
    };
    this.name = c;
    this.dir = !1;
  }
}
;class Qa extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !1;
    this.T = 0;
    this.Ba = .15;
    this.ea = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.K && this.K.oa(a, d), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && (this.dir = p(this).x < p(d).x);
      if (this.K) {
        for (d = 0; 2 > d; d++) {
          A(a.B.J, p(this).S(new m(32 * Math.random() - 16, 20 * Math.random() - 10)), new m(2 * Math.random() - 1, -1 * Math.random()), 0);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        var e = new m(16, 10);
        d.drawImage(a.I.images[`sp_pekora_${this.animation}`], Math.floor(this.pa / ("laugh" === this.animation ? 8 : 1)) % ("laugh" === this.animation ? 2 : 1) * 48, 0, 48, 48, -e.x, -e.y, 48, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class Ra extends G {
  constructor(c, b) {
    super(c);
    this.dir = !0;
    this.size = new m(256, 96);
    this.da = 32;
    this.T = 0;
    this.M = "intro";
    this.ea = this.Ma = 0;
    this.Ca = [];
    this.Ya = [];
    this.la = [];
    this.Ne = new m(0, 0);
    this.K = null;
    this.G = this.da;
    for (var a = 0; 7 > a; a++) {
      this.Ca.push({A:new m(c.x - 2, -2 - 18 * (a + 1)), size:new m(20, 20)});
    }
    for (a = 0; 7 > a; a++) {
      this.Ya.push({A:new m(c.x + this.size.x - 18, this.size.y + 2 + 18 * a), size:new m(20, 20)});
    }
    this.la = [];
    for (a = 0; 4 > a; a++) {
      this.la.push({pe:3 === a, A:new m(c.x + (b ? this.size.x / 4 - 10 : this.size.x - this.size.x / 3), -this.size.y + a % 4 * 18), size:new m(20, 20)});
    }
    this.Z = [];
    for (c = 0; 4 > c; c++) {
      this.Z.push({A:p(this.la[3]), size:new m(8, 8), oe:.01 + .05 * Math.random(), Pd:16 + Math.floor(16 * Math.random()), G:1});
    }
  }
  R(c, b) {
    c = t(b, this.Z);
    return c.length ? (c[0].fb.Mc = !0, c[0].ib) : r(this.la[3], b);
  }
  oa(c, b) {
    this.Z.some(a => a.Mc) ? (this.Z.forEach(a => {
      a.Mc && (a.G--, c.U += 10, a.Mc = !1, c.O("hit"), a.G || oa(c.B.J, this.R(c, b).A), F(c.B.J, this.R(c, b).A), E(c.B.J, this.R(c, b).A), w(c.B.J, this.R(c, b).A, b.V ? b.V : 1));
    }), this.Z = this.Z.filter(a => a.G)) : (this.aa = 15, c.U += 50, this.G = Math.max(0, this.G - (b.V ? b.V : 1)), c.O("damage"), this.ra = 20, F(c.B.J, this.R(c, b).A), E(c.B.J, this.R(c, b).A), w(c.B.J, this.R(c, b).A, b.V ? b.V : 1), this.G || (c.U += 1000));
  }
  update(c) {
    this[`${this.M}Phase`](c);
    if (this.K) {
      const b = c.B.D.find(a => a instanceof H);
      this.pb = b.A.x < this.K.x;
      "intro" !== this.M && "death" !== this.M && (this.K.x += Math.max(-2, Math.min(2, this.K.bb(b.A, .05).x - this.K.x)));
      144 < this.K.y && this.K.y--;
    }
    ["left", "right", "middle"].forEach(b => {
      const a = this[`${b}Parts`], d = this[`${b}Phase`], e = this[`${b}Vel`];
      a.forEach(g => {
        g.A = g.A.S(e);
        ["move"].includes(d) && (0 > e.y && 0 > g.A.y + g.size.y && (g.A.y += 18 * a.length), 0 < e.y && g.A.y >= this.size.y && (g.A.y -= 18 * a.length));
      });
    });
    this.Z.forEach((b, a) => {
      b.Mc = !1;
      a = a * Math.PI / 4 + 1 / (this.G < this.da / 2 ? 512 : 2048) * this.F * (180 / Math.PI) * (a % 2 ? 1 : -1);
      b.A = b.A.bb(p(this.la[3]).S(new m(-4 + Math.cos(a) ** 3 * b.Pd, -4 + Math.sin(a) ** 3 * b.Pd)), b.oe * (this.G < this.da / 2 ? 2 : 1));
    });
    this.G && this.G < this.da / 2 && 4 > this.Z.length && .997 < Math.random() && this.Z.push({A:p(this.la[3]).S(new m(64 * Math.random(), -128)), size:new m(8, 8), oe:.01 + .05 * Math.random(), Pd:16 + Math.floor(16 * Math.random()), G:2});
    this.ra && this.ra--;
    this.G < this.da / 2 && [...this.Ca, ...this.Ya, ...this.la].forEach(b => {
      .9 < Math.random() && z(c.B.J, p(b), new m(0, -2), 1);
    });
    "intro" === this.M && this.T < this.G ? (this.T += .25, this.F % 4 || c.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G));
    this.Ma && this.Ma--;
    this.qa !== this.M ? this.ea = 0 : this.ea++;
    this.qa = this.M;
    this.F++;
  }
  ca(c, b) {
    b.save();
    [...this.Ca, ...this.Ya, ...this.la].forEach((a, d) => {
      b.save();
      a.pe && Math.floor(this.ra / 4) % 2 && (b.filter = "contrast(0) brightness(2)");
      b.drawImage(c.I.images.sp_peko_mini_boss, a.pe ? 24 : 0, 0, 24, 24, Math.round(a.A.x) - 2 + 2 * Math.cos(8 * Math.floor(this.F + 8 * d) * Math.PI / 180), Math.round(a.A.y) - 2, 24, 24);
      b.restore();
    });
    this.Z.filter(a => !a.Mc).forEach((a, d) => {
      b.save();
      b.translate(Math.round(p(a).x), Math.round(p(a).y));
      b.rotate((90 * d + Math.floor(this.F / 4) % 4 * 90) * Math.PI / 180 * (d % 2 ? 1 : -1));
      b.drawImage(c.I.images.sp_peko_mini_boss_shield, 0, 0, 8, 8, -4, -4, 8, 8);
      b.restore();
    });
    this.Oc && b.drawImage(c.I.images.sp_laser_target, "attack" === this.M ? 0 : Math.floor(this.F / 2) % 2 * 24, 0, 24, 24, this.Oc.x - 12, this.Oc.y - 12, 24, 24);
    this.K && (b.save(), b.translate(this.K.x, this.K.y + ("death" === this.M ? this.ea : 0)), this.pb && b.scale(-1, 1), b.drawImage(c.I.images.sp_peko_back, 0, 0, 48, 48, -24, 0, 48, 48), b.restore());
    b.restore();
  }
}
;class Sa extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.T = 0;
    this.Ba = .15;
    this.ea = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      this.$ || (a.B.Jd && d.type && (a.B.Jd = !1), this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.K && this.K.oa(a, d), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.Nd.style.filter = "none", a.Od.style.filter = "none", a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && "idle" === this.animation && (this.dir = p(this).x < p(d).x);
      if (this.K) {
        for (d = 0; 2 > d; d++) {
          A(a.B.J, p(this).S(new m(32 * Math.random() - 16, 20 * Math.random() - 10)), new m(2 * Math.random() - 1, -1 * Math.random()), 0);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        var e = new m(16, 16);
        d.drawImage(a.I.images[`sp_miko_${this.animation}`], Math.floor(this.pa / ("chant" === this.animation ? 16 : 1)) % ("chant" === this.animation ? 4 : 1) * 48, 0, 48, 48, -e.x, -e.y, 48, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class Ta extends G {
  constructor(c) {
    super();
    this.size = new m(16, 16);
    this.C = new m(0, 0);
    this.da = 3;
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
  }
  R(c, b) {
    return r(this, b);
  }
  oa(c, b) {
    this.G = Math.max(0, this.G - (b.V ? b.V : 1));
    this.aa = 15;
    F(c.B.J, this.R(c, b).A);
    E(c.B.J, this.R(c, b).A);
    w(c.B.J, this.R(c, b).A, b.V ? b.V : 1);
    this.G ? (c.U += 20, c.O("damage")) : (c.B.D = c.B.D.filter(a => a !== this), "rocket" !== b.type && (y(c.B.J, p(this)), c.B.aa = 4, c.O("rumble")), J(this, c, .7), c.U += 100);
  }
  update(c) {
    const b = c.B.D.find(d => d instanceof H);
    this.C.x = Math.cos(this.F / 2048 * (180 / Math.PI));
    this.C.y = Math.sin(this.F / 2048 * (180 / Math.PI)) / 4;
    this.A.x += this.C.x;
    this.A.y += this.C.y;
    for (var a = 0; 2 > a; a++) {
      ra(c.B.J, p(this), new m(-this.C.x + .5 * Math.cos(2 * Math.random() * Math.PI), -this.C.y + .5 * Math.sin(2 * Math.random() * Math.PI)), 0);
    }
    (c.B.Ld ? [127] : [63, 127]).includes(this.F % 128) && r(this, c.B.view) && (a = p(this).S(new m(0, -8)), c.B.D.push(new L(a, new m(-3, -2), this)), c.B.D.push(new L(a, new m(-1, -2), this)), c.B.D.push(new L(a, new m(1, -2), this)), c.B.D.push(new L(a, new m(3, -2), this)), r(this, c.B.view) && c.O("pew"));
    this.G <= this.da / 2 && .9 < Math.random() && z(c.B.J, p(this), new m(0, -2), 1);
    this.dir = p(this).x < p(b).x;
    this.F++;
  }
  ca(c, b) {
    b.save();
    b.translate(Math.round(this.A.x), Math.round(this.A.y));
    this.dir || (b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.translate(-this.size.x / 2, 0));
    b.drawImage(c.I.images.sp_dokuro, Math.floor(this.F / 16) % 6 * 16, 0, 16, 16, 0, 0, 16, 16);
    b.restore();
  }
}
class P extends G {
  constructor(c, b) {
    super();
    this.size = new m(16, 24);
    this.C = new m(0, 0);
    this.K = this.angle = 0;
    this.Z = 1;
    this.da = 3;
    this.A = (new m(c.x, c.y)).ka(16);
    this.dir = b;
    this.G = this.da;
  }
  R(c, b) {
    return r(this, b);
  }
  oa(c, b) {
    this.G = Math.max(0, this.G - (b.V ? b.V : 1));
    this.aa = 15;
    F(c.B.J, this.R(c, b).A);
    E(c.B.J, this.R(c, b).A);
    w(c.B.J, this.R(c, b).A, b.V ? b.V : 1);
    this.G ? (c.U += 20, c.O("damage")) : (c.B.D = c.B.D.filter(a => a !== this), "rocket" !== b.type && (y(c.B.J, p(this)), c.B.aa = 4, c.O("rumble")), J(this, c, .7), c.U += 100);
  }
  update(c) {
    c.B.D.find(b => b instanceof H);
    if ([0, 32, 64, 96].includes(this.F % 128) && r(this, c.B.view)) {
      const b = (new m(Math.cos(this.angle), Math.sin(this.angle))).ka(-2);
      this.dir && (b.x *= -1);
      const a = new L(p(this).S(new m(4 * b.x, 4 * b.y - 4)), b, this);
      3 === c.Da && (a.A = a.A.S(new m(8 * b.x * (this.dir ? 0.5 : 1.75), 8 * b.y)), a.angle = this.angle * (this.dir ? -1 : 1) + (this.dir ? Math.PI : 0), a.size = new m(16, 16), a.Z = !0);
      c.B.D.push(a);
      r(this, c.B.view) && c.O("pew");
      this.angle += Math.PI / 7 * this.Z;
      this.K += this.Z;
      3 !== this.K && this.K || (this.Z *= -1);
    }
    this.G <= this.da / 2 && .9 < Math.random() && z(c.B.J, p(this), new m(0, -2), 1);
    this.F++;
  }
  ca(c, b) {
    b.save();
    b.translate(Math.round(this.A.x), Math.round(this.A.y));
    this.Cd && b.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(this.F / 16))));
    this.dir || (b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.translate(-this.size.x / 2, 0));
    b.drawImage(c.I.images.sp_cannon, 48 * this.K + Math.floor(this.F / 16) % 2 * 24, 4 === c.Da ? 64 : 3 === c.Da ? 32 : 0, 24, 32, 0, -8, 24, 32);
    b.restore();
  }
}
class Ua extends G {
  constructor(c) {
    super();
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.da = 6;
    this.M = "idle";
    this.ea = 0;
    this.Ja = 1;
    this.A = new m(16 * c.x, 16 * c.y - 32);
    this.G = this.da;
  }
  R(c, b) {
    return this.K ? r(this.K, b) : r(this, b);
  }
  oa(c, b) {
    this.K ? (c.O("no_damage"), D(c.B.J, p(this.R(c, b)))) : (this.G = Math.max(0, this.G - (b.V ? b.V : 1)), this.aa = 15, F(c.B.J, this.R(c, b).A), E(c.B.J, this.R(c, b).A), w(c.B.J, this.R(c, b).A, b.V ? b.V : 1), this.G ? (c.U += 50, c.O("damage")) : (c.B.D = c.B.D.filter(a => a !== this), "rocket" !== b.type && (y(c.B.J, p(this)), c.B.aa = 4, c.O("rumble")), J(this, c, .3), c.U += 200));
  }
  update(c) {
    const b = c.B.D.find(e => e instanceof H);
    this[`${this.M}Phase`](c);
    const a = {A:new m(this.A.x + this.C.x, this.A.y), size:this.size};
    if (t(a, c.B.P.L).length) {
      for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, c.B.P.L).length;) {
        this.A.x += Math.sign(this.C.x);
      }
      this.Ja *= -1;
      this.C.x = 0;
    }
    const d = c.B.P.L.find(e => v({A:{x:this.A.x, y:this.A.y + this.size.y}, size:{x:this.size.x, y:0}}, e, "y") && q(a, e, "x"));
    u(a, c.B.P) && d || (this.C.x = 0, this.Ja *= -1);
    this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
    this.A.y += this.C.y;
    this.dir = p(this).x < p(b).x;
    this.G < this.da / 2 && .9 < Math.random() && z(c.B.J, p(this), new m(0, -2), 1);
    "attack" === this.M ? this.K = {A:this.A.S(new m(-24, 8)), size:new m(64, 24)} : this.K = null;
    this.qa !== this.M ? this.ea = 0 : this.ea++;
    this.qa = this.M;
    this.F++;
  }
  ca(c, b) {
    const a = 4 === c.Da;
    b.save();
    b.translate(Math.round(this.A.x), Math.round(this.A.y));
    this.Cd && b.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(this.F / 16))));
    this.dir || (b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.translate(-this.size.x / 2, 0));
    if ("attack" === this.M) {
      b.drawImage(c.I.images.sp_pirate_spin, Math.floor(this.F / 4) % 3 * 64, a ? 40 : 0, 64, 40, -24, -6, 64, 40);
    } else {
      const d = new m(12, 12);
      b.drawImage(c.I.images.sp_pirate, 0 === this.C.x ? 0 : this.dir === 0 > this.C.x ? 48 : 96, a ? 48 : 0, 48, 48, -d.x, -d.y, 48, 48);
    }
    b.restore();
  }
}
class Va extends G {
  constructor(c) {
    super();
    this.size = new m(24, 32);
    this.C = new m(0, 0);
    this.da = 2;
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
  }
  R(c, b) {
    return r(this, b);
  }
  oa(c, b) {
    b instanceof O && "fire" === b.type ? (this.G = Math.max(0, this.G - (b.V ? b.V : 1)), w(c.B.J, this.R(c, b).A, b.V ? b.V : 1)) : w(c.B.J, this.R(c, b).A, 0);
    this.aa = 15;
    F(c.B.J, this.R(c, b).A);
    E(c.B.J, this.R(c, b).A);
    this.G ? (c.U += 10, c.O("damage")) : (c.B.D = c.B.D.filter(a => a !== this), c.B.aa = 4, J(this, c, .7), c.O("damage"), c.U += 50);
  }
  update(c) {
    if (c.B.Sa) {
      c.B.Cc && (c.B.D = c.B.D.filter(a => a !== this));
      c = c.B.D.find(a => a instanceof H);
      c = p(c);
      var b = p(this);
      this.angle = Math.atan2(b.y - c.y, b.x - c.x);
      this.A = this.A.S((new m(Math.cos(this.angle), Math.sin(this.angle))).ka(-1).ka(.125));
      this.F++;
    } else {
      this.jd = !0;
    }
  }
  ca(c, b) {
    if (!c.B.Cc && c.B.Sa) {
      b.save();
      b.translate(Math.round(this.A.x), Math.round(this.A.y));
      b.globalAlpha = .75;
      this.dir || (b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.translate(-this.size.x / 2, 0));
      for (let a = 0; 40 > a; a++) {
        b.globalAlpha = Math.random(), b.drawImage(c.I.images.sp_neko, 0, a, 32, 1, 2 * Math.cos((this.F + a) / 360 * (180 / Math.PI)) - 4, a - 4, 32, 1);
      }
      b.restore();
    }
  }
}
class Wa extends G {
  constructor(c, b) {
    super();
    this.size = new m(48, 32);
    this.C = new m(0, 0);
    this.V = 1;
    this.A = (new m(c.x, c.y)).ka(16);
    this.dir = b;
  }
  R(c, b) {
    const a = r(this, b);
    c.B.Id && b instanceof H && a && (c.B.Id = !1);
    return a;
  }
  ca(c, b) {
    b.save();
    b.translate(Math.round(this.A.x), Math.round(this.A.y));
    this.dir || (b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.translate(-this.size.x / 2, 0));
    b.drawImage(c.I.images.sp_rock, 0, 0);
    b.restore();
  }
}
;class Q extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 40);
    this.C = new m(0, 0);
    this.dir = !1;
    this.Ba = .15;
    this.T = this.ea = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 8) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      this.ga = !1;
      this.G && 96 < this.A.y + this.C.y && (this.ga = !0, this.A.y = 96, this.C = new m(0, 0));
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.G && !["dash"].includes(this.M) && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === a.B.N && (this.T < this.G ? (this.T++, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y + Math.cos(180 / Math.PI * Math.floor(this.F / 16))));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        var e = new m(12, 4), g = ["laugh", "intro"].includes(this.animation) ? 8 : 1, h = ["laugh", "intro"].includes(this.animation) ? 2 : 1, l = ["laugh", "intro"].includes(this.animation) ? 48 : 40;
        g = Math.floor(this.pa / g) % h * l;
        d.drawImage(a.I.images[`sp_marine_${this.animation}`], 0 < this.C.y && "jump" === this.animation ? 40 : g, 0, l, 48, -e.x, -e.y, l, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class Xa extends G {
  constructor() {
    super(new m(3126, 68), new m(20, 20));
    this.update = c => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 24 || ta(c.B.J, p(this));
      const b = c.B.D.find(a => a instanceof H);
      r(this, b) && (b.Ub = !0, b.lb = this.type, c.B.D = c.B.D.filter(a => a !== this), D(c.B.J, p(this)), c.O("object_pickup"), c.saveData.setItem(`nuinui-save-item-${this.type}`, !0));
      this.F++;
    };
    this.ca = (c, b) => {
      b.save();
      b.translate(Math.round(this.A.x), Math.round(this.A.y));
      b.drawImage(c.I.images.sp_bow_pickup, "bow" === this.type ? 0 : 20, 0, 20, 20, 0, 0, 20, 20);
      b.restore();
    };
    this.type = "gun";
  }
}
class Ya extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.ba = !0;
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 4 || Aa(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && !b.B.wa && (a.Xa.push("rocket"), b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-rocket", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      a.drawImage(b.I.images.sp_peko_rocket, 0, 0);
      a.restore();
    };
  }
}
class Za extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.ba = !0;
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 4 || Ba(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && !b.B.wa && (a.Xa.push("petal"), b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-petal", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      a.drawImage(b.I.images.sp_petal, 0, 0);
      a.restore();
    };
  }
}
class $a extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 4 || Ca(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && !b.B.wa && (a.Xa.push("sword"), b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-sword", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      a.drawImage(b.I.images.sp_marine_sword, -this.size.x / 2, -this.size.y / 2);
      a.restore();
    };
  }
}
class ab extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.ba = !0;
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 4 || za(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && !b.B.wa && (a.Xa.push("shield"), b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-shield", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x + 12), Math.round(this.A.y + 12));
      a.drawImage(b.I.images.sp_ice_shield, -this.size.x / 2, -this.size.y / 2);
      a.restore();
    };
  }
}
class bb extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.ba = !0;
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 4 || za(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && !b.B.wa && (a.Xa.push("dual"), b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-dual", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x + 12), Math.round(this.A.y + 12));
      a.drawImage(b.I.images.sp_kirito, -this.size.x / 2, -this.size.y / 2);
      a.restore();
    };
  }
}
class cb extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 24 || ta(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && (a.item = !0, b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-clock", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      a.drawImage(b.I.images.sp_clock, 0, 0, 20, 20, 0, 0, 20, 20);
      a.restore();
    };
  }
}
class db extends G {
  constructor(c) {
    super(c, new m(20, 20));
    this.update = b => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 24 || ta(b.B.J, p(this));
      const a = b.B.D.find(d => d instanceof H);
      r(this, a) && (a.yc = !0, b.B.D = b.B.D.filter(d => d !== this), D(b.B.J, p(this)), b.O("object_pickup"), b.saveData.setItem("nuinui-save-item-jump", !0));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      a.drawImage(b.I.images.sp_jump, 0, 0, 20, 20, 0, 0, 20, 20);
      a.restore();
    };
  }
}
class eb extends G {
  constructor() {
    super(new m(2710, 48), new m(20, 20));
    this.update = c => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 24 || ta(c.B.J, p(this));
      const b = c.B.D.find(a => a instanceof H);
      r(this, b) && (b.Ic = !0, c.B.D = c.B.D.filter(a => a !== this), D(c.B.J, p(this)), c.O("object_pickup"), c.saveData.setItem("nuinui-save-item-boots", !0));
      this.F++;
    };
    this.ca = (c, b) => {
      b.save();
      b.translate(Math.round(this.A.x), Math.round(this.A.y));
      b.drawImage(c.I.images.sp_boots, 0, 0, 20, 20, 0, 0, 20, 20);
      b.restore();
    };
  }
}
class R extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 16);
    this.update = a => {
      this.A.y += Math.cos(Math.PI / 180 * Math.floor(3 * this.F)) / 4;
      this.F % 24 || ta(a.B.J, p(this));
      const d = a.B.D.find(e => e instanceof H);
      r(this, d) && (a.B.D = a.B.D.filter(e => e !== this), D(a.B.J, p(this)), a.O("object_pickup"), a.saveData.setItem(`nuinui-save-item-key${this.id}`, !0));
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      d.drawImage(a.I.images.sp_key, 16 * this.id, 0, 16, 16, 0, 0, 16, 16);
      d.restore();
    };
    this.id = b;
  }
}
;class S extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !1;
    this.Ba = .2;
    this.K = this.ea = 0;
    this.V = 1;
    this.R = (a, d) => {
      a = r(this.K && !this.C.x && d instanceof H ? this.Z : this, d);
      return this.M && !["flee", "defeated"].includes(this.M) ? a : null;
    };
    this.oa = (a, d) => {
      this.$ || (this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), a.O("no_damage"), this.G ? this.$ = 8 : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 100), "sword" === d.type && "defeated" !== this.M ? (this.K && (this.K = 0, a.va(), a.Aa("sneak")), this.M = "defeated", a.O("level_start"), a.B.wa = 60, a.B.na = 0, this.C.y = -4, d = a.B.D.find(e => e instanceof H), a.saveData.setItem("nuinui-save-achievement-10", !0), d.Xa.includes("dual") || a.B.D.push(new bb(this.A.value()))) : 
      w(a.B.J, this.R(a, d).A, 0));
      "defeated" !== this.M && (this.K || (a.va(), a.Aa("dummy_th000")), this.K = 480);
    };
    this.la = a => {
      a.B.D.find(d => d instanceof H);
      this.Z = {A:this.A.S(new m(this.dir ? this.size.x : -64, 0)), size:{x:64, y:this.size.y}};
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(e => e instanceof H);
      this.la(a);
      if (r(this, d) || r(this.Z, d)) {
        this.K || (a.va(), a.Aa("dummy_th000")), this.K = 480;
      }
      this.P = a.B.ob.find(e => p(this).Sd(e));
      this.Ud && this.P === a.B.P && (this.Ud = !1);
      if (this.M && !this.Ud) {
        this[`${this.M}Phase`](a);
      }
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      -4 > this.C.y && (this.C.y = -4, this.C.x /= 2);
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if ("defeated" !== this.M) {
        if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, this.P.L).length) {
          for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, this.P.L).length;) {
            this.A.x += Math.sign(this.C.x);
          }
          this.ga && (this.dir = !this.dir, this.K && (a.va(), a.Aa("sneak")), this.K = 0);
          this.C.x = 0;
        }
        this.ga = !1;
        if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, this.P.L).length) {
          this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, this.P.L).some(e => e.fb.A.y > this.A.y);
          for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, this.P.L).length;) {
            this.A.y += Math.sign(this.C.y);
          }
          this.G && (this.C.y = 0);
        }
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.K && this.A.y === d.A.y && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.$ && this.$--;
      this.K && (this.K--, this.K || (a.va(), a.Aa("sneak")));
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        var e = "defeated" === this.M ? "hit" : (this.ga ? this.animation : "jump") + (this.K && "attack" !== this.animation ? "_aggro" : ""), g = new m("sleep walk jump walk_aggro jump_aggro hit".split(" ").includes(e) ? 26 : "attack" === e ? 64 : 12, "attack" === e ? 36 : 11), h = ["sleep", "walk"].includes(e) ? 16 : ["walk_aggro"].includes(e) ? 8 : "attack" === e ? 4 : 1, l = ["sleep", "walk", "walk_aggro"].includes(e) ? 4 : "attack" === e ? 9 : 1, n = "attack" === e ? 160 : ["sleep", "walk", 
        "jump", "walk_aggro", "hit"].includes(e) ? 64 : ["jump_aggro"].includes(e) ? 80 : 48;
        d.drawImage(a.I.images[`sp_aqua_${e}`], Math.floor(this.pa / h) % l * n, 0, n, "attack" === e ? 96 : 48, -g.x, -g.y, n, "attack" === e ? 96 : 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class fb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .15;
    this.T = this.ea = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && "idle" === this.animation && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        var e = new m(24, 16);
        d.drawImage(a.I.images[`sp_fubuki_${this.animation}`], Math.floor(this.pa / ("chant" === this.animation ? 16 : 1)) % ("chant" === this.animation ? 4 : 1) * 48, 0, 64, 48, -e.x, -e.y, 64, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class gb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .15;
    this.ea = 0;
    this.angle = null;
    this.T = 0;
    this.ra = this.Ca = null;
    this.R = (a, d) => {
      a = r(this, d);
      return ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      "charge" === this.M || this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.K = !1, this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000, d instanceof O && d.Zd && a.saveData.setItem("nuinui-save-achievement-14", !0)));
    };
    this.Z = a => {
      110 === this.ea && (a.B.D = a.B.D.filter(d => !(d instanceof hb)), this.ra = this.Ca = null, this.ia("idle"), this.M = "idle");
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(g => g instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M && (this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100);
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.G && (this.dir = !this.dir);
        this.C.x = 0;
      }
      this.la = this.ga = !1;
      const e = {A:new m(this.A.x, this.A.y + this.C.y), size:this.size};
      if (t(e, a.B.P.L).length) {
        this.ga = t(e, a.B.P.L).some(g => g.fb.A.y > this.A.y);
        this.la = t(e, a.B.P.L).some(g => g.fb.A.y < this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.K = this.la ? !0 : this.ga ? !1 : this.K;
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && !this.K && this.G && ["idle", "focus", "attack"].includes(this.M) && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      if (this.G < .5 * this.da && .9 < Math.random()) {
        for (d = 0; 2 > d; d++) {
          A(a.B.J, p(this).S(new m(16 * Math.random() - 8, 16 * Math.random() - 8)), new m(0, -2), 1);
        }
      }
      if ("charge" === this.M) {
        for (d = 0; 2 > d; d++) {
          A(a.B.J, p(this).S(new m(16 * Math.random() - 8, 16 * Math.random() - 8)), new m(-this.C.x, 0), 0);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2 || "move" === this.M || "charge" === this.M && this.F % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        this.K && (d.translate(0, this.size.y / 2), d.scale(1, -1), d.translate(0, -this.size.y / 2));
        var e = new m(16, 16), g = "chant" === this.animation ? 16 : 1, h = "chant" === this.animation ? 4 : 1;
        this.ra || this.Ca || d.drawImage(a.I.images.sp_ayame_swords, 0, 0, 48, 32, -17, -2, 48, 32);
        "charge" !== this.M && d.drawImage(a.I.images.sp_ayame_back, 0, 0, 32, 20, -8, 11, 32, 20);
        "charge" === this.M ? d.drawImage(a.I.images[`sp_ayame_${this.animation}`], Math.floor(this.pa / g) % h * 48, 0, 96, 48, -e.x - 48, -e.y, 96, 48) : d.drawImage(a.I.images[`sp_ayame_${this.animation}`], Math.floor(this.pa / g) % h * 48, 0, 48, 48, -e.x, -e.y, 48, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
class hb extends G {
  constructor(c, b, a) {
    super(c);
    this.size = new m(24, 24);
    this.C = new m(0, 0);
    this.R = (d, e) => r(this, e);
    this.oa = d => {
      this.aa = 15;
      d.O("no_damage");
    };
    this.update = d => {
      this.Z = "throw" === this.zb.M;
      this.A.x = this.Z ? this.A.x + Math.cos(this.F / 256 * (180 / Math.PI)) * ("asura" === this.type ? 1 : -1) * 8 : this.A.x + Math.cos(this.F / 512 * (180 / Math.PI)) * ("asura" === this.type ? 1 : -1);
      this.A = this.A.S(this.zb.C);
      if ("asura" !== this.type && .75 < Math.random()) {
        for (let e = 0; 2 > e; e++) {
          A(d.B.J, p(this).S(new m(8 * Math.random() - 4, 8 * Math.random() - 4)), new m(-this.C.x, 0), 0);
        }
      }
      this.F++;
    };
    this.ca = (d, e) => {
      "charge" === this.zb.M || this.Z && this.F % 2 || (e.save(), e.translate(Math.round(this.A.x + this.size.x / 2), Math.round(this.A.y + this.size.y / 2)), "asura" === this.type && e.scale(-1, 1), e.rotate((this.K + this.F * (this.Z ? 30 : 15)) * Math.PI / 180), e.drawImage(d.I.images[`sp_ayame_${this.type}`], 0, 0, 38, 38, -19, -19, 38, 38), e.restore());
    };
    this.zb = b;
    this.type = a;
    this.K = Math.floor(360 * Math.random());
  }
}
;class T extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.ea = 0;
    this.Ra = null;
    this.K = [new m(5200, 448), new m(5272, 448), new m(5344, 448)];
    this.T = 0;
    this.V = 2;
    this.Nc = !1;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      if (!this.$) {
        const e = d.V ? "dual" === d.type ? 64 : d.V : 1;
        this.G = Math.max(0, this.G - e);
        this.aa = 15;
        F(a.B.J, this.R(a, d).A);
        E(a.B.J, this.R(a, d).A);
        w(a.B.J, this.R(a, d).A, e);
        a.O("damage");
        a.U += 100;
        this.$ = 30;
        this.G || "defeated" === this.M || (this.M = "defeated", a.va(), a.O("level_start"), this.ia("hit"), a.B.wa = 60, a.B.na = 0, this.C.y = -4, this.Nc = !0);
      }
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M ? (this.C.y += .125, this.A.y += this.C.y) : "weak" !== this.M && (this.A = this.A.bb(this.Ra.S(new m(0, 4 * Math.sin(this.F / 1000 * (180 / Math.PI)))), .05));
      this.A.y = Math.round(100 * this.A.y) / 100;
      this.A.x = Math.round(100 * this.A.x) / 100;
      this.dir = p(this).x < p(d).x;
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      if ("weak" !== this.M) {
        for (d = 0; 2 > d; d++) {
          B(a.B.J, p(this).S(new m(32 * Math.random() - 16, 20 * Math.random() - 10)), new m(2 * Math.random() - 1, -1 * Math.random()), 0);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += 2, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      this.Nc || (d.save(), d.translate(Math.round(this.A.x + this.size.x / 2 + 32 * Math.sin(this.F / 100)), Math.round(this.A.y)), d.rotate(this.F / 50 * Math.PI), d.drawImage(a.I.images.sp_mace, -16, -16), d.restore());
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
        const e = ["defeated", "weak"].includes(this.M) ? this.animation : "evil";
        d.drawImage(a.I.images[`sp_noel_${e}`], "evil" === e ? -12 : -4, "evil" === e ? -4 : -6);
        d.restore();
      }
      this.Nc || (d.save(), d.translate(Math.round(this.A.x + this.size.x / 2 - 32 * Math.sin(this.F / 100)), Math.round(this.A.y)), d.rotate(-this.F / 50 * Math.PI), d.drawImage(a.I.images.sp_mace, -16, -16), d.restore());
    };
    this.Ra = this.K[1];
    this.G = this.da = b;
  }
}
;class ib extends G {
  constructor(c, b, a) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !1;
    this.Ba = .15;
    this.T = this.ea = 0;
    this.animation = "stand";
    this.pa = 0;
    this.R = (d, e) => {
      d = r(this, e);
      return ["flee", "defeated"].includes(this.M) ? null : d;
    };
    this.oa = (d, e) => {
      this.$ || (this.G = Math.max(0, this.G - (e.V ? e.V : 1)), this.aa = 15, F(d.B.J, this.R(d, e).A), E(d.B.J, this.R(d, e).A), w(d.B.J, this.R(d, e).A, e.V ? e.V : 1), d.O("damage"), this.G ? (d.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), d.U += 5000));
    };
    this.ia = d => {
      this.animation = d;
      this.pa = 0;
    };
    this.update = d => {
      const e = d.B.D.find(g => g instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](d);
      }
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, d.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, d.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, d.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, d.B.P.L).some(g => g.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, d.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      e.Y && this.G && "idle" !== this.M && (this.dir = p(this).x < p(e).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === d.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || d.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (d, e) => {
      if (!(this.$ % 2)) {
        e.save();
        e.translate(Math.round(this.A.x), Math.round(this.A.y));
        this.dir || (e.translate(this.size.x / 2, 0), e.scale(-1, 1), e.translate(-this.size.x / 2, 0));
        var g = new m(16, 16);
        e.drawImage(d.I.images[`sp_suisei_${this.animation}`], Math.floor(this.pa / ("axe" === this.animation ? 4 : 1)) % ("axe" === this.animation ? 2 : 1) * 48, 0, 48, 48, -g.x, -g.y, 48, 48);
        e.restore();
      }
    };
    this.G = this.da = b;
    this.cd = a;
    this.cd.Wb = this;
  }
}
;class jb extends G {
  constructor(c) {
    var b = new m(4 * Math.random() - 2, 2 + Math.random());
    super(c);
    this.size = new m(16, 16);
    this.V = 1;
    this.update = a => {
      const d = a.B.D.find(h => h instanceof H);
      z(a.B.J, p(this), new m(0, 0), 0);
      this.F % 4 || va(a.B.J, p(this), 1);
      this.A = this.A.S(this.C);
      let e = !1;
      const g = a.B.D.filter(h => !(h instanceof jb) && !(h instanceof ib) && h.R(a, this));
      g.length ? 1 === g.length && g[0] instanceof kb ? this.C.x = (2 + 4 * Math.random()) * (p(this).x < p(g[0]).x ? -1 : 1) : (e = !0, g.forEach(h => {
        h.oa(a, this);
      }), y(a.B.J, p(this)), this.aa = 4, a.O("explosion")) : ma(this, a.B.P.L).length && this.A.y > d.A.y ? (e = !0, y(a.B.J, p(this)), this.aa = 4, a.O("explosion")) : !r(this, a.B.view) && this.A.y > d.A.y && (e = !0);
      e && (a.B.D = a.B.D.filter(h => h !== this));
      this.F++;
    };
    this.R = (a, d) => r(this, d);
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
      d.drawImage(a.I.images.sp_comet, 0, 0);
      d.restore();
    };
    this.C = b;
  }
}
class kb extends G {
  constructor(c) {
    super(c);
    this.size = new m(64, 32);
    this.C = new m(0, 0);
    this.V = 1;
    this.Ba = .15;
    this.la = !0;
    this.ga = !1;
    this.angle = null;
    this.oa = (b, a) => {
      this.aa = 2;
      b.O("no_damage");
      D(b.B.J, p(a));
    };
    this.update = b => {
      b.B.D.find(a => a instanceof H);
      this.Z ? this.Z-- : (!this.la || this.ga || this.K || (this.C.y += this.Ba), this.A = this.A.S(this.C), !this.ga && this.A.y >= 928 - this.size.y && (b.B.J.$b(this, !0), b.B.J.$b(this, !1), b.B.aa = 4, b.O("rumble"), this.ga = !0, this.size = new m(64, 32), this.A.y = 928 - this.size.y, this.C.y = 0), 1952 > this.A.x && (this.A.x = 1952, this.C = new m(0, 0), b.B.aa = 4, b.O("rumble"), this.K = 30), 2144 < this.A.x && (this.A.x = 2144, this.C = new m(0, 0), b.B.aa = 4, b.O("rumble"), this.K = 
      30), this.K || !this.ga || ["intro", "charge"].includes(this.Wb.M) || (this.A.x += .25 * (p(this).x < p(this.Wb).x ? 1 : -1), this.F % 2 || z(b.B.J, new m(this.A.x + this.size.x / 4 + Math.random() * this.size.x / 2, this.A.y + this.size.y), new m(0, 0), 1)), this.K && (this.K--, this.K || (this.angle = -Math.PI / 2, this.size = new m(64, 32), this.la = !0)), this.F++);
    };
    this.R = (b, a) => r(this, a);
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x) + this.size.x / 2 + (32 === this.size.x ? 8 : 0), Math.round(this.A.y) + (32 === this.size.y ? 8 : 32));
      this.Z && Math.floor(this.Z / 8) % 2 && (a.filter = "contrast(0) brightness(2)");
      this.dir || a.scale(-1, 1);
      null !== this.angle && a.rotate(this.angle + Math.PI / 2);
      a.drawImage(b.I.images.sp_axe, 0, 0, 64, 64, -32, -32, 64, 64);
      a.restore();
      if ("intro" !== this.Wb.M) {
        const d = this.A.S(new m(this.size.x / 2, this.size.y / (64 === this.size.y ? 2 : 4))), e = p(this.Wb), g = d.S(e.ka(-1));
        for (let h = 1; 4 > h; h++) {
          a.save(), a.translate(d.x + Math.abs(h / 4 * g.x) * (d.x > e.x ? -1 : 1), d.y + Math.abs(h / 4 * g.y) * (d.y > e.y ? -1 : 1)), a.drawImage(b.I.images.sp_axe_chain, 0, 0, 16, 16, -8, -8, 16, 16), a.restore();
        }
      }
    };
  }
}
class lb extends G {
  constructor(c, b = null, a = 0) {
    super();
    this.size = new m(64, 32);
    this.C = new m(0, 0);
    this.V = 2;
    this.Ba = .1;
    this.Z = !1;
    this.ra = !0;
    this.update = d => {
      const e = d.B.D.find(h => h instanceof H), g = Math.abs(p(e).x - p(this).x);
      this.ra && 48 > g && this.A.y < e.A.y && null === this.la && (this.aa = 2);
      !this.Z && this.ra && (null !== this.la && !((this.F - this.offset) % this.la) || null === this.la && 40 > g && this.A.y < e.A.y) && (this.Z = !0, this.ra = !1);
      this.Z && (this.C.y += this.Ba);
      this.A = this.A.S(this.C);
      this.Z && d.B.P.L.find(h => r(this, h)) && (this.C.y = 0, this.Z = !1, d.B.aa = 4, d.O("explosion"), this.K = 30);
      this.ra || this.Z || this.K || (this.A.y !== this.Ca ? this.A.y = Math.max(this.Ca, this.A.y - (null === this.la ? .5 : 2)) : this.ra = !0);
      this.K && this.K--;
      this.F++;
    };
    this.R = (d, e) => r(this, e);
    this.ca = (d, e) => {
      const g = null === this.la ? "sp_axe2" : "sp_axe3";
      e.save();
      e.translate(Math.round(this.A.x) + this.size.x / 2, Math.round(this.Ca));
      const h = Math.abs(Math.round(this.A.y) - this.Ca) / 5;
      for (let l = 0; 5 > l; l++) {
        e.drawImage(d.I.images[`${g}_chain`], 0, 0, 16, 16, -8, -8 + l * h, 16, 16);
      }
      e.restore();
      e.save();
      e.translate(Math.round(this.A.x) + this.size.x / 2, Math.round(this.A.y));
      e.drawImage(d.I.images[g], 0, 0, 64, 64, -32, -24, 64, 64);
      e.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.Ca = this.A.y;
    this.la = b;
    this.offset = a;
  }
}
;class mb extends G {
  constructor(c, b, a) {
    super(c);
    this.size = new m(32, 32);
    this.C = new m(0, 0);
    this.da = 4;
    this.R = (d, e) => {
      d = r(this, e);
      return this.K ? null : d;
    };
    this.oa = (d, e) => {
      this.G = Math.max(0, this.G - (e.V ? e.V : 1));
      this.aa = 15;
      F(d.B.J, this.R(d, e).A);
      E(d.B.J, this.R(d, e).A);
      w(d.B.J, this.R(d, e).A, e.V ? e.V : 1);
      this.G ? (d.O("damage"), d.U += 20) : (d.U += 100, d.O("explosion"), this.K = 180);
    };
    this.update = d => {
      this.K ? (this.K--, this.K || (this.G = this.da)) : !this.attack || this.F % 10 || (d.B.D.push(new L(p(this), new m(Math.random() - .5, 4), this)), d.O("pew"));
      this.F++;
    };
    this.ca = (d, e) => {
      e.save();
      this.K && (e.filter = "contrast(2) brightness(.5)");
      e.translate(Math.round(this.A.x) + 16, Math.round(this.A.y) + 16 + Math.floor(4 * Math.sin(Math.PI / 180 * this.F * 4 + this.id * Math.PI / 2)));
      2 !== this.wb.he && "prepare" !== this.wb.M && e.rotate(Math.PI / 180 * Math.floor(-this.F));
      e.drawImage(d.I.images.sp_card, this.attack || this === this.wb.nf ? 64 + 64 * this.id : 0, 1 === this.wb.he && "prepare" !== this.wb.M ? 64 : 0, 64, 64, -32, -32, 64, 64);
      e.restore();
    };
    this.G = this.da;
    this.wb = b;
    this.id = a;
  }
}
class nb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .15;
    this.he = this.T = this.ea = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return "hide" === this.M || "prepare" === this.M ? null : ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      2128 > this.A.x && (this.dir = !this.dir, this.C.x = 1);
      2336 < this.A.x && (this.dir = !this.dir, this.C.x = -1);
      if ("c" !== this.M) {
        "fly" !== this.M && (this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100);
        this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
        if ("defeated" !== this.M) {
          if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
            for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
              this.A.x += Math.sign(this.C.x);
            }
            this.Ja *= -1;
            this.C.x = 0;
          }
          this.ga = !1;
          if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
            this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
            for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
              this.A.y += Math.sign(this.C.y);
            }
            this.G && (this.C.y = 0);
          }
        }
        this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
        this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      }
      d.Y && this.G && "release" !== this.M && "attack" !== this.M && "fly" !== this.M && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.K.forEach((e, g) => {
        e.A = "prepare" === this.M ? e.A.bb(p(this).S(new m(-16, -16)), .2) : e.A.bb(new m(16 * (133 + 4 * g), 592), .1);
      });
      "fly" === this.M && A(a.B.J, p(this), new m(0, 0), 0);
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      this.$ % 2 || "hide" === this.M || (d.save(), d.translate(Math.round(this.A.x), Math.round(this.A.y)), this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0)), "fly" === this.M ? (d.translate(this.size.x / 2, this.size.y / 2), d.drawImage(a.I.images.sp_wand, Math.floor(this.pa / 4) % 2 * 32, 0, 32, 32, -16, -16, 32, 32)) : d.drawImage(a.I.images[`sp_polka_${this.animation}`], Math.floor(this.pa / 1) % 1 * 48, 0, 64, 48, -16, -16, 64, 48), "charge" === 
      this.M && (d.globalAlpha = .75, d.drawImage(a.I.images.sp_wand, Math.floor(this.pa / 4) % 2 * 32, 0, 32, 32, -24, 0, 32, 32)), d.restore());
    };
    this.G = this.da = b;
    this.K = [];
    for (c = 0; 4 > c; c++) {
      this.K.push(new mb(p(this).S(new m(-16, -24)), this, c));
    }
  }
}
;class ob extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.ea = 0;
    this.Ra = null;
    this.V = 1;
    this.rc = this.T = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.rc || this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (this.rc = this.G < .25 * this.da ? 180 : .5 < Math.random() ? 60 : 0, a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(g => g instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M ? (this.C.y += .125, this.A.y += this.C.y) : "sit" !== this.M && (this.A = this.A.bb(this.Ra.S(new m(0, 4 * Math.sin(this.F / 1000 * (180 / Math.PI)))), this.G < .5 * this.da ? .1 : .05));
      this.A.y = Math.round(100 * this.A.y) / 100;
      this.A.x = Math.round(100 * this.A.x) / 100;
      if (!["sit", "wait"].includes(this.M) || "wait" === this.M && 60 < this.ea) {
        this.K = this.K.bb(this.A.S(new m(this.size.x / 2, 4 * Math.cos(this.F / 1000 * (180 / Math.PI)))), "wait" === this.M ? .05 : .1), this.Z = this.Z.bb(this.A.S(new m(this.size.x / 2 + 32 * Math.sin(.01 * this.F), 0)), .1), this.la = this.la.bb(this.A.S(new m(this.size.x / 2 - 32 * Math.sin(.01 * this.F), 0)), .1);
      }
      this.dir = p(this).x < p(d).x;
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      if (!["sit"].includes(this.M) && this.G) {
        for (var e = 0; 2 > e; e++) {
          B(a.B.J, p(this).S(new m(16 * Math.random() - 8, 20 * Math.random() - 10)), new m(Math.random() - .5, -2 * Math.random()), 0);
        }
      }
      if (!["sit", "wait"].includes(this.M) && this.G) {
        for (e = 0; 2 > e; e++) {
          B(a.B.J, this.K.S(new m(16 * Math.random() - 8, 64 * Math.random() - 32)), new m(Math.random() - .5, -4 * Math.random()), 0);
        }
      }
      this.rc && this.G && (a.B.D.filter(g => g instanceof O && !g.wd && 48 > Math.abs(this.A.x - g.A.x) && Math.sign(g.C.x) !== Math.sign(this.dir ? 1 : -1)).forEach(g => g.wd = 1), this.F % 20 || a.O("explosion"), e = Math.random() * Math.PI * 2, ya(a.B.J, this.K.S(new m(0, -16)), (new m(Math.cos(e), Math.sin(e))).ka(-8 * (this.G < .5 * this.da ? 2 : 1)), 0), d.C.x += 1 / (p(this).Ab(p(d)) * (this.G < .25 * this.da ? .5 : 1)) * 50 * (p(this).x < p(d).x ? 1 : -1));
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.rc && this.rc--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      "attack3" === this.M && (d.save(), d.translate(Math.round(this.Xb.x), Math.round(this.Xb.y)), d.drawImage(a.I.images.sp_bucket, 120 < this.ea ? 32 : 0, 0, 32, 32, -16, -16, 32, 32), d.restore());
      !["sit"].includes(this.M) && this.G && (d.save(), d.translate(Math.round(this.K.x), Math.round(this.K.y)), this.rc && d.translate(Math.floor(6 * Math.random()) - 3, 0), d.drawImage(a.I.images.sp_dragon, this.rc ? 32 : 0, 0, 32, 64, -16, -64, 32, 64), d.restore(), d.save(), d.translate(Math.round(this.Z.x), Math.round(this.Z.y)), d.rotate(this.F / 50 * Math.PI), d.drawImage(a.I.images.sp_crystal, -8, -8), d.rotate(-this.F / 25 * Math.PI), d.drawImage(a.I.images.sp_crystal, -8, -8), d.restore());
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x) + this.size.x / 2, Math.round(this.A.y));
        if (!["sit"].includes(this.M) && this.G) {
          for (let e = 0; 2 > e; e++) {
            d.save(), d.translate(0, 16), e && d.scale(-1, 1), d.rotate(.25 * Math.PI + Math.sin(Math.PI / 180 * this.F * 2) * Math.PI * .125), d.drawImage(a.I.images.sp_wing, 0, -32), d.restore();
          }
        }
        this.dir || d.scale(-1, 1);
        d.drawImage(a.I.images[`sp_miko_${this.animation}`], -20, -4);
        d.restore();
      }
      !["sit"].includes(this.M) && this.G && (d.save(), d.translate(Math.round(this.la.x), Math.round(this.la.y)), d.rotate(-this.F / 50 * Math.PI), d.drawImage(a.I.images.sp_crystal, -8, -8), d.rotate(this.F / 25 * Math.PI), d.drawImage(a.I.images.sp_crystal, -8, -8), d.restore());
    };
    this.G = this.da = b;
    this.K = this.A.S(new m(this.size.x / 2, -150));
    this.Z = this.A.S(new m(this.size.x / 2, -150));
    this.la = this.A.S(new m(this.size.x / 2, -150));
    this.Xb = this.A.S(new m(this.size.x / 2, -150));
  }
}
;class pb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.ea = 0;
    this.V = 2;
    this.T = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000, this.K = !1));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M && (this.C.y += .1);
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      !a.B.lc || this.F % 32 || sa(a.B.J, this.A.S(new m(6 * Math.random() - 3 + (this.dir ? this.size.x : 0), 8)), new m(0, -.5 - .5 * Math.random()), 1);
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.G && !this.K && this.G < .5 * this.da && (this.K = !0);
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if ("up" === this.animation && 30 < this.ea) {
        d.save();
        d.translate(160, 192);
        for (var e = 0; 6 > e; e++) {
          d.drawImage(a.I.images.sp_gura_tornado, Math.floor(.25 * this.ea) % 4 * 24, 0, 24, 32, (this.K ? 48 : 32) * Math.sin(.5 * this.ea) - 12, 32 * e, 24, 32);
        }
        d.restore();
      }
      this.$ % 2 || (d.save(), e = p(this).round(), d.translate(e.x, e.y), this.dir || d.scale(-1, 1), d.translate(0, Math.round(Math.max(0, 2 - Math.abs(this.C.x)) * Math.sin(Math.floor(.125 * this.F)))), d.drawImage(a.I.images.sp_gura_tail, Math.floor(this.ea * (1 + Math.abs(.25 * this.C.x)) / 8) % 6 * 32, 0, 32, 32, -32, -16 + 2 * Math.cos(Math.floor(.125 * this.F)), 32, 32), ["move", "down"].includes(this.animation) ? (d.save(), "down" === this.animation && (d.rotate(.5 * Math.PI), d.translate(0, 
      -14)), d.drawImage(a.I.images.sp_gura_trident, this.K ? 72 : 0, 48, 72, 16, -32, -4, 72, 16), d.restore()) : "up" === this.animation ? d.drawImage(a.I.images.sp_gura_trident, this.K ? 72 : 0, 64 + Math.floor(.25 * this.ea) % 2 * 32, 72, 32, -36, -36, 72, 32) : d.drawImage(a.I.images.sp_gura_trident, this.K ? 72 : 0, 0, 72, 48, -24, -20, 72, 48), d.drawImage(a.I.images[`sp_gura_${this.animation}`], this.K ? 48 : 0, 0, 48, 48, -24, -24, 48, 48), d.restore());
      if ("up" === this.animation && 30 < this.ea) {
        d.save();
        d.translate(160, 192);
        for (e = 0; 6 > e; e++) {
          d.drawImage(a.I.images.sp_gura_tornado, Math.floor(.25 * this.ea) % 4 * 24, 0, 24, 32, -(this.K ? 48 : 32) * Math.sin(.5 * this.ea) - 12, 32 * e, 24, 32);
        }
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class U extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .25;
    this.ea = 0;
    this.V = 1;
    this.T = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.K && this.K.oa(a, d), this.G ? (a.U += 100, this.$ = 30) : (this.Z = !1, a.B.Sa = !1, this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      ["attack", "attack3"].includes(this.M) || (this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100);
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && "idle" === this.animation && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.Z && (60 <= this.Z && (a.B.Sa = !0), a.B.ja.push(e => {
        const g = e.W;
        g.save();
        g.fillStyle = "#000";
        g.globalAlpha = 60 < this.Z ? 1 : this.Z / 60;
        g.fillRect(0, 0, e.width, e.height);
        g.restore();
      }), this.la || this.Z--, this.Z || (a.B.Sa = !1));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2 || this.K && !this.C.y && 2 < Math.abs(this.C.x))) {
        d.save();
        var e = p(this).round();
        d.translate(e.x, e.y);
        this.dir || d.scale(-1, 1);
        "jump" !== this.animation && "jump2" !== this.animation || d.rotate(Math.floor(.5 * this.F) * Math.PI * .25);
        e = ["point", "charge", "back"].includes(this.animation) ? Math.floor(this.F * ("back" === this.animation ? .25 : .125)) % 2 : 0;
        "charge" === this.animation && d.translate(0, 2 * Math.sin(.125 * this.F));
        d.drawImage(a.I.images[`sp_calli_${this.animation}`], 48 * e, 0, 48, 48, -24, -31, 48, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
class qb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(64, 64);
    this.C = new m(0, 0);
    this.angle = 0;
    this.uc = this.rotate = !0;
    this.R = (a, d) => this.rotate ? r(this, d) : !1;
    this.oa = a => {
      this.aa = 15;
      a.O("no_damage");
    };
    this.update = () => {
      this.A.y < this.Pa.A.y - 16 ? this.C.y += .1 : this.C.y = 0;
      if (this.rotate) {
        this.F % 2 || (this.angle += Math.PI * ("attack4" === this.Pa.M ? .5 : .25));
        const a = p(this).round(), d = p(this.Pa).S(new m(8, 0)).round();
        this.uc && 8 > a.Ab(d) && (this.rotate = !1, this.K = !0);
      }
      this.A = this.A.S(this.C);
      this.K && (this.dir = this.Pa.dir, this.C = new m(0, 0), this.rotate && ["jump", "charge"].includes(this.Pa.animation) ? this.A = this.Pa.A.S(this.Pa.size.ka(.5).S(this.size.ka(-.5))).round() : this.A = p(this.Pa).S(new m(.5 * -this.size.x + 8 * (this.dir ? -1 : 1), .5 * -this.size.y)).round());
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      const e = p(this).round();
      d.translate(e.x, e.y);
      this.dir || d.scale(-1, 1);
      this.rotate && d.rotate(this.angle);
      "charge" === this.Pa.animation && d.translate(0, Math.floor(2 * Math.cos(.125 * this.Pa.F)));
      "attack4" === this.Pa.M && Math.floor(.25 * this.F) % 2 && (d.filter = "contrast(0) brightness(2)");
      d.drawImage(a.I.images.sp_calli_scythe, 0, this.rotate ? 128 : this.uc ? 0 : 64, 64, 64, -32, -32, 64, 64);
      d.restore();
    };
    this.Pa = b;
    this.dir = b.dir;
  }
}
;class rb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.ea = 0;
    this.V = 2;
    this.T = 0;
    this.Ra = null;
    this.xb = 1;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.Ra = new m(this.A.x, 344), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.Lb = (a, d, e) => {
      const g = a.B;
      g.P.L = g.P.L.filter(h => !(h.A.x === 16 * d && 352 === h.A.y));
      e || a.O("explosion");
      g.ma[`${d}_21`] && (delete g.ma[`${d}_21`], delete g.ma[`${d}_22`], y(a.B.J, (new m(d + .5, 22)).ka(16), 0));
      "29" === g.ma[`${d + 1}_22`] && (g.ma[`${d + 1}_22`] = "20");
      "29" === g.ma[`${d - 1}_22`] && (g.ma[`${d - 1}_22`] = "28");
    };
    this.update = a => {
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M && (this.C.y += .1);
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.Ra && (this.A = this.A.bb(this.Ra, .1), 1 > this.A.Ab(this.Ra) && (this.A = this.Ra, this.Ra = null));
      this.G && this.G < .75 * this.da && !(this.F % 600) && (this.xb = 1 === this.xb ? .5 < Math.random() ? 2 : 0 : 1, a.B.aa = 15, a.O("charge2"), a.B.Dc = 60);
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      "attack3" === this.M && (d.save(), d.translate(Math.round(this.Xb.x), Math.round(this.Xb.y)), 120 < this.ea && 240 > this.ea && d.translate(Math.round(2 * Math.random() - 1), Math.round(Math.round(2 * Math.random() - 1))), d.drawImage(a.I.images.sp_ina_book, 120 < this.ea && 240 > this.ea ? 32 : 0, 0, 32, 32, -16, -16, 32, 32), d.restore());
      if (!(this.$ % 2)) {
        d.save();
        var e = p(this).round();
        d.translate(e.x, e.y);
        this.dir || d.scale(-1, 1);
        d.translate(Math.round(4 * Math.cos(Math.floor(this.F / 16))), Math.round(Math.max(0, 2 - Math.abs(this.C.x)) * Math.sin(Math.floor(.125 * this.F))));
        e = ["idle"].includes(this.animation) ? Math.floor(this.F / 16) % 3 : 0;
        d.drawImage(a.I.images.sp_ina_halo, 0, 0, 20, 20, -16, -28 - 2 * Math.cos(Math.floor(.125 * this.F)), 20, 20);
        d.drawImage(a.I.images[`sp_ina_${this.animation}`], 48 * e, 0, 48, 48, -24, -24, 48, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
    this.Xb = this.A.S(new m(.5 * this.size.x, -150));
  }
}
class V extends G {
  constructor(c) {
    super(c);
    this.size = new m(16, 48);
    this.C = new m(0, 0);
    this.V = 2;
    this.da = 4;
    this.R = (b, a) => {
      b = r(this, a);
      return this.K ? null : b;
    };
    this.oa = (b, a) => {
      this.G = Math.max(0, this.G - (a.V ? a.V : 1));
      this.aa = 15;
      F(b.B.J, this.R(b, a).A);
      E(b.B.J, this.R(b, a).A);
      w(b.B.J, this.R(b, a).A, a.V ? a.V : 1);
      (a = b.B.D.find(d => d instanceof rb && d.G)) && "noel" === b.mode && a.oa(b, a);
      this.G ? (b.O("damage"), b.U += 20) : (b.U += 100, b.O("explosion"), this.K = 300, this.Ra = this.A.S(new m(0, 32)));
    };
    this.update = b => {
      if (this.K) {
        this.K--, this.K || (this.G = this.da, this.Ra = this.A.S(new m(0, -32)));
      } else if (this.attack) {
        var a = b.B.D.find(d => d instanceof H);
        if (120 > this.Z) {
          this.Ra = new m(a.A.x, 360);
        } else if (150 === this.Z) {
          this.Ra = new m(this.A.x, this.A.y - 32);
          a = Math.floor(this.A.x / 16);
          for (let d = a; d < a + 2; d++) {
            b.B.D.find(e => e instanceof rb).Lb(b, d), b.B.aa = 15;
          }
        } else {
          180 === this.Z ? this.Ra = new m(this.A.x, this.A.y + 64) : 240 < this.Z && (this.attack = !1, this.Ra = this.Sc, this.Sc = null);
        }
        this.Z++;
      }
      this.Ra && (this.A = this.A.bb(this.Ra, .1), 1 > this.A.Ab(this.Ra) && (this.A = this.Ra, this.Ra = null, qa(b.B.J, this, 0)));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      this.K && (a.filter = "contrast(2) brightness(.5)");
      this.attack && 120 < this.Z && 150 > this.Z && Math.floor(.5 * this.F) % 2 && (a.filter = "contrast(0) brightness(2)");
      var d = p(this).round();
      a.translate(d.x + 4 * (1 + this.la) * Math.cos(Math.floor(.125 * this.F + this.la)), d.y + 4 * (1 + this.la) * Math.sin(Math.floor(.125 * this.F + this.la)));
      d = Math.floor(.125 * this.F + this.la) % 3;
      a.drawImage(b.I.images.sp_ina_tentacle, this.K ? 320 : 64 * d, 0, 64, 64, -20, -32, 64, 64);
      a.restore();
    };
    this.G = this.da;
    this.la = 2 * Math.random() - 1;
  }
}
;class sb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.ea = 0;
    this.V = 1;
    this.T = 0;
    this.R = (a, d) => "defeated" === this.M ? !1 : r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.ia("hit"), this.C = new m(this.dir ? -2 : 2, -3), this.M = "defeated", a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      ["jump", "defeated"].includes(this.M) && (this.C.y += .125);
      ["jump"].includes(this.M) || (this.C.x *= .95);
      .01 > Math.abs(this.C.x) && (this.C.x = 0);
      this.A = this.A.S(this.C);
      this.A.y = Math.round(100 * this.A.y) / 100;
      this.A.x = Math.round(100 * this.A.x) / 100;
      368 > this.A.x && (this.A.x = 368, "jump" === this.M ? (this.C.x *= -1, this.dir = !this.dir) : this.C.x = 0);
      576 < this.A.x && (this.A.x = 576, "jump" === this.M ? (this.C.x *= -1, this.dir = !this.dir) : this.C.x = 0);
      512 < this.A.y && (this.A.y = 512, this.C.y = 0, "defeated" === this.M && "back" !== this.animation && this.ia("idle"));
      ["idle", "rocket"].includes(this.M) && "gun" !== this.animation && (this.dir = p(this).x < p(d).x);
      if (this.G) {
        for (d = 0; 2 > d; d++) {
          B(a.B.J, p(this).S(new m(16 * Math.random() - 8, 20 * Math.random() - 10)), new m(Math.random() - .5, -2 * Math.random()), 0);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += 1, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      "gun" === this.animation && 2 < Math.floor(.25 * this.pa) && this.ia("idle");
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        d.translate(Math.round(this.A.x) + this.size.x / 2, Math.round(this.A.y));
        this.dir || d.scale(-1, 1);
        if (!["back"].includes(this.animation)) {
          d.save();
          d.translate(-this.size.x / 2, 0);
          var e = this.C.x, g = Math.round(e) || ["gun", "fall", "jump"].includes(this.animation);
          e = Math.round(16 / (1 + Math.abs(e)));
          const h = .125 < this.C.y ? -2 : 0;
          d.drawImage(a.I.images.sp_ponytail, Math.floor(this.pa / e) % 3 * 24, g ? 24 : 0, 24, 24, -14, 2 + (this.C.y ? -4 : 0) + h + ("slide" === this.animation ? 8 : 0), 24, 24);
          d.drawImage(a.I.images.sp_ribbon, Math.floor(this.pa / e * 1.5) % 3 * 16, g ? 16 : 0, 16, 16, g ? ["run", "run_attack"].includes(this.animation) ? -14 : -9 : -8, (g ? 16 : 18) + 2 * h, 16, 16);
          d.save();
          d.translate(this.size.x / 2, 0);
          d.scale(-1, 1);
          d.drawImage(a.I.images.sp_ribbon, Math.floor(this.pa / e * 1.5) % 3 * 16, g ? 16 : 0, 16, 16, g ? ["run", "run_attack"].includes(this.animation) ? -12 : -9 : -8, (g ? 16 : 18) + h, 16, 16);
          d.restore();
          d.restore();
        }
        g = this.animation;
        "gun" === g ? d.drawImage(a.I.images[`sp_flare_${g}`], 40 * Math.floor(.25 * this.pa), 0, 40, 40, -16, -6, 40, 40) : ("slide" === g && d.translate(0, 11), d.drawImage(a.I.images[`sp_flare_${g}`], -16, -6));
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class tb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .25;
    this.ea = 0;
    this.V = 1;
    this.T = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.Z = !1, a.B.Sa = !1, this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(g => g instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "syringe" !== this.M && (this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100);
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.C.x = 0;
        "jump" === this.animation && (this.dir = !this.dir);
        if ("dash" === this.animation) {
          a.B.aa = 15;
          a.O("explosion");
          for (var e = 0; 8 > e; e++) {
            const g = .5 * -Math.PI + .125 * Math.PI * e;
            a.B.D.push(new L(p(this), (new m(Math.cos(g) * (this.dir ? -1 : 1), Math.sin(g))).ka(2), this));
          }
        }
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(g => g.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && ["idle", "walk"].includes(this.animation) && (this.dir = p(this).x < p(d).x);
      e = a.B.D.filter(g => g instanceof O && g.R(a, this) && !g.Zd);
      e.length && (this.aa = 4, a.O("no_damage"), d instanceof W || e.forEach(g => {
        g.Zd = !0;
        g.C = g.C.ka(-1);
      }));
      e = Math.abs(this.A.x - d.A.x);
      this.Kc && e < this.Kc && d.oa(a, d);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      var e = p(this).round();
      if (this.Kc) {
        d.save();
        d.translate(e.x, 384);
        for (var g = 0; 6 > g; g++) {
          d.drawImage(a.I.images.sp_kiara_fire, Math.floor(.25 * this.ea) % 4 * 24, 0, 24, 32, this.Kc * Math.sin(.5 * this.ea) - 12, 32 * g, 24, 32);
        }
        d.restore();
      }
      this.$ % 2 || (d.save(), d.translate(e.x, e.y), this.dir || d.scale(-1, 1), g = ["walk"].includes(this.animation) ? Math.floor(this.pa / 16) % 4 : 0, d.drawImage(a.I.images[`sp_kiara_${this.animation}`], 64 * g, 0, 64, 64, -36, -35, 64, 64), d.restore());
      if (this.Kc) {
        d.save();
        d.translate(e.x, 384);
        for (e = 0; 6 > e; e++) {
          d.drawImage(a.I.images.sp_kiara_fire, Math.floor(.25 * this.ea) % 4 * 24, 0, 24, 32, -this.Kc * Math.sin(.5 * this.ea) - 12, 32 * e, 24, 32);
        }
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class ub extends G {
  constructor(c, b) {
    super();
    this.size = new m(16, 16);
    this.C = new m(0, 0);
    this.da = 5;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.G = Math.max(0, this.G - (d.V ? d.V : 1));
      this.aa = 15;
      F(a.B.J, this.R(a, d).A);
      E(a.B.J, this.R(a, d).A);
      w(a.B.J, this.R(a, d).A, d.V ? d.V : 1);
      this.G ? (a.U += 20, a.O("damage")) : (a.B.D = a.B.D.filter(e => e !== this), a.U += 100, J(this, a, .7), a.O("hit"));
    };
    this.update = a => {
      const d = a.B.D.find(h => h instanceof H);
      if (!this.K && r(this, a.B.view)) {
        if (this.K = 120, (.5 > Math.random() || 120 > this.F) && r(this, a.B.view)) {
          var e = .5 > Math.random();
          for (var g = 0; 8 > g; g++) {
            const h = Math.PI / 4 * g + (e ? 0 : Math.PI / 8);
            a.B.D.push(new L(p(this), (new m(Math.cos(h), Math.sin(h))).ka(2), this));
          }
          r(this, a.B.view) && a.O("pew");
        } else {
          e = p(this), g = p(d), e = Math.atan2(g.y - e.y, g.x - e.x) + .5 * Math.random() - .25, this.C = (new m(Math.cos(e), Math.sin(e))).ka(2), a.O("wind");
        }
      } else {
        this.C = this.C.ka(.975), this.F % 15 || D(a.B.J, p(this));
      }
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.C.x = 0;
      }
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(h => h.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.dir = p(this).x < p(d).x;
      this.F++;
      this.K && this.K--;
      this.zd && 656 <= this.A.x && (this.jd = !0);
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x + .5 * this.size.x), Math.round(this.A.y + .5 * this.size.y + 2 * Math.sin(Math.floor(.125 * this.F))));
      d.save();
      d.rotate(.125 * Math.round(2 * this.C.x));
      const e = Math.PI / 180 * Math.sin(Math.floor(this.F / 8) + 4 * this.Z) * 15;
      for (let g = 0; 2 > g; g++) {
        d.save(), g && d.scale(-1, 1), d.translate(-4, 0), d.rotate(e), d.drawImage(a.I.images.sp_fairy, 32, this.type ? 32 : 0, 20, 11, -16, -6, 20, 11), d.restore();
      }
      this.dir || d.scale(-1, 1);
      this.type && (d.save(), d.rotate(-.25 + .25 * Math.sin(.05 * this.F)), d.drawImage(a.I.images.sp_fairy, 32, 43, 15, 15, -22, 0, 15, 15), d.restore());
      d.drawImage(a.I.images.sp_fairy, 0, this.type ? 32 : 0, 32, 32, -16, -16, 32, 32);
      d.restore();
      this.dir || d.scale(-1, 1);
      this.type || d.drawImage(a.I.images.sp_fairy, 32, 11, 15, 15, 0, -20 + 2 * Math.sin(.05 * this.F), 15, 15);
      d.restore();
    };
    this.A = (new m(c.x, c.y)).ka(16);
    this.G = this.da;
    this.type = b;
    this.Z = Math.random();
  }
}
;class vb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.ea = 0;
    this.V = 2;
    this.T = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000, this.K = !1));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M && (this.C.y += .1);
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      !a.B.lc || this.F % 32 || sa(a.B.J, this.A.S(new m(6 * Math.random() - 3 + (this.dir ? this.size.x : 0), 8)), new m(0, -.5 - .5 * Math.random()), 1);
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.G && !this.K && this.G < .5 * this.da && (this.K = !0);
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      var e = p(this).round();
      if (this.la) {
        d.save();
        d.translate(e.x, e.y);
        this.dir && d.scale(-1, 1);
        d.rotate(.5 * Math.PI);
        for (var g = 0; 6 > g; g++) {
          d.drawImage(a.I.images.sp_gura_tornado, Math.floor(.25 * this.ea) % 4 * 24, 0, 24, 32, 32 * Math.sin(.5 * this.ea) - 12, 32 * g, 24, 32);
        }
        d.restore();
      }
      if (!(this.$ % 2)) {
        d.save();
        d.translate(e.x, e.y);
        g = Math.PI / 180 * Math.sin(Math.floor(this.F / 8)) * 15;
        for (let h = 0; 2 > h; h++) {
          d.save(), d.translate(-4 * (this.dir ? 1 : -1), 0), h && d.scale(-1, 1), d.translate(-4, 0), d.rotate(g), d.drawImage(a.I.images.sp_kanata_wing, 0, 0, 20, 12, -20, -6, 20, 12), d.restore();
        }
        this.dir || d.scale(-1, 1);
        d.translate(0, Math.round(Math.max(0, 2 - Math.abs(this.C.x)) * Math.sin(Math.floor(.125 * this.F))));
        d.drawImage(a.I.images[`sp_kanata_${this.animation}`], 0, 0, 48, 48, -24, -24, 48, 48);
        d.drawImage(a.I.images.sp_kanata_halo, 0, 0, 16, 16, 4, -16 - Math.sin(Math.floor(8 + .125 * this.F)), 16, 16);
        d.restore();
      }
      if (this.la) {
        d.save();
        d.translate(e.x, e.y);
        this.dir && d.scale(-1, 1);
        d.rotate(.5 * Math.PI);
        for (e = 0; 6 > e; e++) {
          d.drawImage(a.I.images.sp_gura_tornado, Math.floor(.25 * this.ea) % 4 * 24, 0, 24, 32, -32 * Math.sin(.5 * this.ea) - 12, 32 * e, 24, 32);
        }
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;class xb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(64, 48);
    this.T = this.ea = 0;
    this.Lc = [];
    this.K = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return ["intro", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      this.G && !this.$ && (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("hit"), this.G ? (a.U += 100, this.$ = 30) : a.U += 5000);
    };
    this.update = a => {
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.nb && (this.nb = this.nb.S(new m(0, .1 * Math.sin(Math.PI / 180 * this.F))), this.A = this.A.bb(this.nb, .1));
      this.jc && this.Lc.every(d => r(d, this.jc)) && (this.unit = this.jc, this.unit.ed = !0, this.jc = null);
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.K && this.G && (this.F % 20 || a.O("explosion"), this.K--);
      this.$ && this.$--;
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      for (var e = 0; 3 > e; e++) {
        d.save(), d.translate(.5 * this.size.x, 0), d.drawImage(a.I.images.sp_demon_spine, 24 * e, 24, 24, 24, -12, this.size.y + 12 + 24 * e + 2 * Math.sin((this.F + 120 * e) % 360 * 2 * (Math.PI / 180)), 24, 24), d.restore();
      }
      d.save();
      22 < this.$ && (d.filter = "contrast(0) brightness(2)");
      e = ["charge", "attack", "death"].includes(this.M) || this.K ? 96 : ["laser", "end"].includes(this.M) ? 96 * (1 + Math.floor(.5 * this.F) % 4) : 0;
      d.translate(20, 28);
      this.aa && d.rotate(Math.PI / 16 * Math.sin(this.F / 32));
      d.drawImage(a.I.images.sp_demon_head, e, 96, 96, 96, -48, -48, 96, 96);
      d.restore();
      "laser" === this.M && (d.drawImage(a.I.images.sp_demon_laser, Math.floor(.25 * this.F) % 4 * 64, 288, 64, 96, 0, 64, 64, 96), d.drawImage(a.I.images.sp_demon_laser, Math.floor(.25 * this.F) % 6 * 64, 192, 64, 96, 0, 64, 64, 96));
      d.restore();
    };
    this.G = this.da = b;
    this.nb = c;
  }
}
class yb extends G {
  constructor(c, b, a, d) {
    super(c);
    this.size = new m(24, 48);
    this.amount = .05;
    this.R = (e, g) => {
      if (!(g.za instanceof Na)) {
        return r(this, g);
      }
    };
    this.oa = (e, g) => {
      this.aa = 15;
      F(e.B.J, this.R(e, g).A);
      E(e.B.J, this.R(e, g).A);
      w(e.B.J, this.R(e, g).A, 0);
      this.$a.jc || (this.A.x += this.size.x * (this.dir ? 1 : -1));
      e.O("hit");
    };
    this.update = e => {
      this.nb && (this.nb = this.nb.S(new m(0, .1 * Math.sin(Math.PI / 180 * this.F))), this.A = this.A.bb(this.nb, this.amount));
      "end" === this.$a.M && (this.aa = 2);
      for (let g = 0; 2 > g; g++) {
        z(e.B.J, p(this).S(new m(16 * Math.random() - 8 + 16 * (this.dir ? 1 : -1), 32 * Math.random() - 16)), new m(Math.random() - .5 + .5 * (this.dir ? 1 : -1), -2 * Math.random()), 0);
      }
      this.F++;
    };
    this.ca = (e, g) => {
      g.save();
      g.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (g.translate(this.size.x / 2, 0), g.scale(-1, 1), g.translate(-this.size.x / 2, 0));
      g.drawImage(e.I.images.sp_demon_hand, this.$a.jc || this.$a.unit || "end" === this.$a.M ? 64 : 0, 64, 64, 64, -24, -8, 64, 64);
      g.restore();
    };
    this.dir = a;
    this.$a = b;
    this.nb = d;
  }
}
;class zb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .15;
    this.ea = 0;
    this.angle = null;
    this.$ = this.T = 0;
    this.R = (a, d) => {
      a = r(this, d);
      return ["flee", "defeated"].includes(this.M) ? null : a;
    };
    this.oa = (a, d) => {
      2 === this.oc && (this.$ = 0, this.oc = !1, a.B.D = a.B.D.filter(e => !e.oc), this.ia("idle"), this.M = "idle", this.ea = 0);
      "charge" === this.M || this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.K = !1, this.C = new m(this.dir ? -2 : 2, -2.5), 128 === this.A.y && this.A.y--, a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(g => g instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "defeated" === this.M && 128 > this.A.y && (this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100, 128 < this.A.y + this.C.y && a.O("explosion"));
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.G && (this.dir = !this.dir);
        this.C.x *= -1;
      }
      this.la = this.ga = !1;
      const e = {A:new m(this.A.x, this.A.y + this.C.y), size:this.size};
      if (t(e, a.B.P.L).length) {
        this.ga = t(e, a.B.P.L).some(g => g.fb.A.y > this.A.y);
        this.la = t(e, a.B.P.L).some(g => g.fb.A.y < this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.G && (this.K = this.la ? !0 : this.ga ? !1 : this.K);
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && ["idle", "focus", "sniper", "bibi"].includes(this.M) && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      if (this.G && this.G < .5 * this.da && .9 < Math.random()) {
        for (d = 0; 2 > d; d++) {
          ra(a.B.J, p(this).S(new m(16 * Math.random() - 8, 16 * Math.random() - 8)), new m(Math.random() - .5, -2 * Math.random()), 0);
        }
      }
      if (this.oc) {
        for (d = 0; 4 > d; d++) {
          ra(a.B.J, p(this).S(new m(32 * Math.random() - 16, 8 + 16 * Math.random() - 8)), new m(Math.random() - .5, -3 * Math.random()), 1);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.Z && this.Z--;
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2 || "move" === this.M || "charge" === this.M && this.F % 2)) {
        d.save();
        var e = p(this).round();
        d.translate(e.x, e.y);
        this.dir || d.scale(-1, 1);
        this.K && d.scale(1, -1);
        "intro" === this.M && (d.filter = `brightness(${a.B.kc ? 1 - a.B.kc / (.5 * a.height) : 1})`);
        this.oc && (d.filter = "brightness(0)");
        e = new m("crouch" === this.animation ? -1 : "sniper" === this.animation ? -5 : 0, "charge" === this.animation || "hit" === this.animation ? 4 : "crouch" === this.animation ? 9 : 0);
        "ko" !== this.animation && d.drawImage(a.I.images.sp_towa_hair, 0, 0, 48, 48, -24 + e.x, -31 + e.y, 48, 48);
        d.drawImage(a.I.images[`sp_towa_${this.animation}`], Math.floor(this.pa / 1) % 1 * 48, 0, 48, 48, -24, -31, 48, 48);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
class Ab extends G {
  constructor(c, b) {
    super();
    this.size = new m(16, 16);
    this.C = new m(0, 0);
    this.T = 0;
    this.Ba = .1;
    this.M = "idle";
    this.ea = 0;
    this.wait = !1;
    this.$ = 0;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      2 === this.oc && (this.oc = !1);
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), this.G ? (a.U += 10, a.O("damage"), this.$ = 12) : (a.B.D = a.B.D.filter(e => e !== this), "rocket" !== d.type && (y(a.B.J, p(this)), a.B.aa = 4, a.O("rumble")), J(this, a, .9), a.U += 50));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      var d = a.B.D.find(e => e instanceof H);
      this[`${this.M}Phase`](a);
      this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100;
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.C.x *= -1;
      }
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.C.y = 0;
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      u(this, a.B.P) || (this.C.x = 0, this.Ja *= -1);
      this.dir = p(this).x < p(d).x;
      if (this.oc) {
        for (3 > this.$ && (this.$ = 10), d = 0; 4 > d; d++) {
          ra(a.B.J, p(this).S(new m(32 * Math.random() - 16, 16 * Math.random() - 8)), new m(Math.random() - .5, -3 * Math.random()), 1);
        }
      } else {
        for (d = 0; 2 > d; d++) {
          B(a.B.J, p(this).S(new m(12 * Math.random() - 6, 16 * Math.random() - 8)), new m(Math.random() - .5, -2 * Math.random()), 0);
        }
      }
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .95 * this.T + .05 * this.G, .05 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this.$ && this.$--;
      this.F++;
    };
    this.ca = (a, d) => {
      this.$ % 2 || (d.save(), d.translate(Math.round(this.A.x), Math.round(this.A.y)), this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0)), this.oc && (d.filter = "brightness(0)"), d.drawImage(a.I.images.sp_bibi, this.ga ? Math.floor(this.F / 16) % 2 * 24 : 24, 0, 24, 16, -6, 0, 24, 16), d.restore());
    };
    this.A = c;
    this.G = this.da = b;
  }
}
class Bb extends G {
  constructor(c) {
    super(c);
    this.size = new m(16, 16);
    this.C = new m(0, 0);
    this.R = (b, a) => a instanceof O ? null : r(this, a);
    this.oa = () => {
    };
    this.update = b => {
      for (let a = 0; 2 > a; a++) {
        B(b.B.J, p(this).S(new m(12 * Math.random() - 6, 8 + 16 * Math.random() - 8)), new m(Math.random() - .5, -2 * Math.random()), 0);
      }
      480 < this.F && (b.B.D = b.B.D.filter(a => a !== this));
      this.F++;
    };
    this.ca = () => {
    };
  }
}
;class W extends H {
  constructor(c, b, a) {
    super(c, b, a);
    this.da = 16;
    this.Pc = [];
    this.nd = 5;
    this.Ub = this.yc = this.item = !1;
    this.nc = 0;
    this.Ic = !1;
    this.G = this.da;
    c.saveData.getItem("nuinui-save-item-boots") && (this.Ic = !0);
  }
  update(c) {
    const b = this.Y ? c.keys : c.Fa, a = this.Ia || this.xa || this.Z && this.ga || this.gb || b.left === b.right ? 0 : .35 * (b.right ? 1 : -1);
    this.Hd = !1;
    var d = [...c.B.P.L];
    c.B.D.find(() => !1) && d.push(...c.B.D.filter(() => !1));
    if (1 < this.F && this.Y && t(this, d.filter(n => !n.ta && !0)).length) {
      Cb(c);
    } else if (t(this, d.filter(n => n.ta)).length) {
      var e = d.filter(n => n.ta).find(n => r(this, n));
      e.Kb ? this.A.x-- : this.A.y = e.A.y + 8 > this.A.y + .5 * this.size.y ? e.A.y - this.size.y : e.A.y + 16;
    }
    e = this.ga;
    this.ga = d.find(n => v({A:{x:this.A.x, y:this.A.y + this.size.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    var g = d.find(n => v({A:{x:this.A.x, y:this.A.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    if (!(this.Ga || this.Ia || this.xa || this.ra) && this.ga && b.a && b.Bb) {
      this.C.x = this.nd * (this.dir ? 1 : -1), this.ra = this.xa = !0, this.A.y += 16, this.size.y = 16, c.B.J.$b(this, this.dir), c.O("dash");
    } else {
      if (!this.xa && !b.a || this.xa && this.ra && !b.a) {
        this.ra = !1;
      }
      if (this.xa && (!this.ga || 1.73 > Math.abs(this.C.x))) {
        if (this.ga && g) {
          this.C.x += this.dir ? 1 : -1;
        } else {
          if (this.xa = !1, this.size.y = 32, !this.ga !== !g) {
            this.A.y -= 16;
          } else {
            for (this.A.y = this.A.round(16).y; t(this, d).length;) {
              this.A.y--;
            }
          }
        }
      }
    }
    this.ga = d.find(n => v({A:{x:this.A.x, y:this.A.y + this.size.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    g = d.find(n => v({A:{x:this.A.x, y:this.A.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    !this.gb || !this.ga && this.C.x || (this.gb = !1);
    let h = null;
    if (this.Ic && !this.ga && 1 < this.C.y) {
      const n = {A:{x:this.A.x, y:this.A.y + .5 * this.size.y}, size:{x:this.size.x, y:.5 * this.size.y}};
      (h = d.find(C => v(n, C, "x") && q(n, C, "y"))) && 16 !== h.size.y && (h = null);
      h && 2 < this.C.y && (this.C.y -= .5, z(c.B.J, this.A.S(new m(this.size.x * (this.dir ? 1 : 0), this.size.y)), new m(0, 0), 0));
    }
    this.Yc = !1;
    this.Ib && !b.a && (this.Ib = !1);
    !(this.ga && !this.C.y || this.yc && !this.Rb || h) || !b.a || this.Ib || this.ra || g || b.Bb && this.ra || (this.ga || (this.Rb = !0), this.la = this.ga ? 2.4 : 2, this.pb = this.Yc = this.Ib = !0, c.B.$c && (c.B.$c = !1), this.xa && (this.Hd = !0, this.xa = !1, this.gb = !0, this.C.x = this.nd * (this.dir ? 1 : -1), this.A.y -= 16, this.size.y = 32), h && (c.O("land"), this.C.x = 4 * (this.dir ? -1 : 1), this.dir = !this.dir, F(c.B.J, p(h)), E(c.B.J, p(h))));
    this.pb && b.a ? (this.Rb && (this.C.y = 2 * -this.la, this.pb = !1), this.C.y -= this.la, this.la /= 1.5) : this.pb = !1;
    !e && this.ga && (this.gd ? this.gd = !1 : this.Ga || (c.O("land"), pa(c.B.J, this)), this.Rb = !1);
    (this.xa || this.gb) && b.left !== b.right && (this.C.x = Math.abs(this.C.x) * (b.right ? 1 : -1));
    e = this.dir;
    this.dir = this.Z || this.Ga || this.Ia || b.left === b.right ? this.dir : b.right;
    e !== this.dir && this.gb && (this.C.x *= .5);
    e = c.B.tc ? .25 * (c.B.sd ? 1 : -1) : 0;
    this.gb || (this.C = this.C.K(this.xa ? new m(0.96, 1) : this.de));
    .05 > this.C.x && -0.05 < this.C.x && (this.C.x = 0);
    this.C.x = Math.round(100 * (this.C.x + a + e)) / 100;
    this.C.y = Math.min(6, Math.round(100 * (this.C.y + this.Ba * (this.gb ? 1.25 : 1))) / 100);
    c.B.lc && 2 < this.C.y && (this.C.y = 2);
    this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
    if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, d).length) {
      this.A.x = Math.round(this.A.x);
      for (e = 0; !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, d).length;) {
        if (this.A.x += Math.sign(this.C.x), 10 < e) {
          this.A.x++;
          break;
        } else {
          e++;
        }
      }
      this.xa && (this.Hd = !0, this.xa = !1, this.A.y -= 16, this.size.y = 32);
      this.C.x = 0;
    }
    this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
    if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, d).length) {
      for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, d).length;) {
        this.A.y += Math.sign(this.C.y);
      }
      this.C.y = 0;
    }
    this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
    !this.ga || this.Z || this.xa || this.Ga || !a || !this.C.x || this.C.y || (a !== this.Fd ? c.B.J.$b(this, this.dir) : 15 === this.pa % 16 && (c.O("step"), c.B.J.step(this)));
    this.Yc && this.C.y && !this.Ga && c.B.J.Vd(this);
    d = !1;
    this.Ga || (b.b && this.K++, 30 < this.K && !(this.F % 4) && c.B.J.charge(p(this)), 60 < this.K && (b.b || (d = !0)), !b.b && this.K && (this.K = 0));
    e = b.b || d;
    this.Ya && !b.b && (this.Ya = !1);
    this.Z && this.Z--;
    this.Ma && this.Ma--;
    if (e = e && !this.Ya && !this.Z && !this.xa) {
      this.Ga ? (c.B.D.push(new O(this.A.S(new m(-16, 22)), new m(20, 7), new m(5 * (this.dir ? 1 : -1), .5 * Math.cos(2 * this.F)), "bullet", this)), c.B.D.push(new O(this.A.S(new m(-16, 22)), new m(20, 7), new m(5 * (this.dir ? 1 : -1), .5 * -Math.cos(2 * this.F)), "bullet", this)), c.B.D.push(new O(this.A.S(new m(-16, 22)), new m(20, 7), new m(5 * (this.dir ? 1 : -1), .25 * Math.cos(2 * this.F)), "bullet", this)), c.B.D.push(new O(this.A.S(new m(-16, 22)), new m(20, 7), new m(5 * (this.dir ? 1 : 
      -1), .25 * -Math.cos(2 * this.F)), "bullet", this)), c.O("pew"), this.Z = 9, this.Ma = 12) : (this.Be = this.nc = this.nc ? 0 : 32, this.ga && 4 > Math.abs(this.C.x) && (this.C.x = 4 * (b.left === b.right ? 0 : b.right && this.dir ? 1 : b.left && !this.dir ? -1 : 0)), g = new O(p(this).S(new m(this.dir ? 0 : -56, -16)), new m(56, 32), new m(0, 0), "mace", this), g.V = d ? 5 : 2, g.ba = !0, c.B.D.push(g), c.O("bow_shoot"), c.B.J.Ac(p(this).S(new m(16 * (this.dir ? 1 : -1), 0)), this.dir, 0 !== 
      this.nc), this.Z = d ? 12 : 24, this.Ma = 24), this.Ya = !0, this.mc = 0;
    }
    !this.Ga || !this.ga || this.F % 6 || 2 !== c.Da || qa(c.B.J, this);
    this.Ga && 2 === c.Da && z(c.B.J, this.A.S(new m(this.size.x, this.size.y - 8)), new m(4, 0), 0);
    this.Ia && z(c.B.J, this.A.S(new m(0, this.size.y - 8)), new m(-4, 0), 0);
    d = c.B.D.filter(n => [M, I, N, Qa, Ra, Fa, Ga, Sa, Ha, Ta, P, Ua, Va, Wa, Q, S, fb, Ka, La, Ma, gb, hb, Ja, T, kb, ib, nb, lb, ob, sb, pb, U, qb, rb, V, Db, tb, ub, vb, yb, Ab, Bb, zb].some(C => n instanceof C) && n.R(c, this));
    d.length && d.forEach(n => this.oa(c, n));
    let l;
    !this.Ma || this.xa ? l = this.ga ? this.xa || this.Hd ? "slide" : b.left !== b.right ? "run" : "idle" : .6 >= this.C.y ? "jump" : "fall" : e && (l = this.ga ? "attack" : "aerial");
    this.Ga && (l = "jetski");
    this.Ia && (l = "moto");
    l && !this.hb && l !== this.animation ? this.ia(l) : this.pa++;
    0 < this.C.y && (this.la = 0);
    !c.B.lc || this.F % 32 || sa(c.B.J, this.A.S(new m(6 * Math.random() - 3 + (this.dir ? this.size.x : 0), 8)), new m(0, -.5 - .5 * Math.random()), 1);
    this.Fd = a;
    this.nc && this.nc--;
    this.$ && this.$--;
    this.sc && !c.B.na && this.sc--;
    this.F % 3 || ("slide" === this.animation || this.gb) && this.Pc.push({F:this.F, pa:this.pa, animation:this.animation, A:this.A.value(), size:this.size.value(), dir:this.dir});
    this.Pc = this.Pc.filter(n => 12 > this.F - n.F);
    Eb(this, c);
    this.F++;
  }
  oa(c, b) {
    if (!(this.xa || b instanceof M && b.ic || b instanceof T && b.Nc) && this.Y) {
      if (this.Ia) {
        var a = c.B.rb.find(d => d.speed);
        a.speed = Math.max(2.5, a.speed - .05);
      }
      this.$ || (c.B.Zc && (c.B.Zc = !1), c.B.xc && (c.B.xc = !1), c.B.ad && b instanceof Ha && (c.B.ad = !1), b.za instanceof P && 4 === c.Da ? c.O("question") : c.O("damage"), a = b.V ? b.V : 1, b.za instanceof P && 4 === c.Da || (this.G = Math.max(0, this.G - a), this.$ = 45), this.K = 0, c.B.aa = 8, b instanceof Ha || b instanceof Ua || b instanceof S && b.K && !b.C.x ? (F(c.B.J, b.R(c, this).A), E(c.B.J, b.R(c, this).A)) : (F(c.B.J, this.R(c, b).A), E(c.B.J, this.R(c, b).A)), this.C.x += 4 * 
      (this.dir ? -1 : 1), -2 < this.C.y && (this.C.y -= 2));
      this.G || Cb(c);
    }
  }
  ia(c) {
    this.pa = 0;
    this.animation = c;
  }
  Gd(c, b, a) {
    const {offset:d, size:e, speed:g, frames:h} = this.Ca[a.animation], l = "run" === a.animation && this.Nb ? "run_attack" : a.animation;
    c.I.images[`sp_noel_${l}`] && b.drawImage(c.I.images[`sp_noel_${l}`], (Math.floor(a.pa * g) % h + ("attack" !== l && "aerial" !== l || !this.Be ? 0 : 1)) * e.x, 0, e.x, e.y, d.x, d.y, e.x, e.y);
  }
  ca(c, b) {
    [...this.Pc, this].forEach((a, d) => {
      const e = a === this;
      e && this.$ % 2 || (b.save(), e || (b.globalAlpha = (d + 1) / 2), e && 60 < this.K && Math.floor(this.F / 4) % 2 && (b.filter = "brightness(2)"), b.translate(Math.round(a.A.x), Math.round(a.A.y)), a.dir || (b.translate(a.size.x / 2, 0), b.scale(-1, 1), b.translate(-a.size.x / 2, 0)), this.ga && this.Ga && b.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(this.F / 4)))), this.Ia && (b.translate(0, Math.floor(this.F / 4) % 2), this.ga || b.rotate(.05 * this.C.y)), this.Gd(c, b, a), 
      b.restore());
    });
  }
}
;class Db extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(16, 32);
    this.C = new m(0, 0);
    this.dir = !0;
    this.Ba = .15;
    this.ea = 0;
    this.V = 1;
    this.T = 0;
    this.dc = 360;
    this.R = (a, d) => r(this, d);
    this.oa = (a, d) => {
      this.$ || (this.G = Math.max(0, this.G - (d.V ? d.V : 1)), this.aa = 15, F(a.B.J, this.R(a, d).A), E(a.B.J, this.R(a, d).A), w(a.B.J, this.R(a, d).A, d.V ? d.V : 1), a.O("damage"), this.G ? (a.U += 100, this.$ = 30) : (this.Z = !1, a.B.Sa = !1, this.C = new m(this.dir ? -2 : 2, -2.5), a.U += 5000));
    };
    this.ia = a => {
      this.animation = a;
      this.pa = 0;
    };
    this.update = a => {
      const d = a.B.D.find(e => e instanceof H);
      if (this.M) {
        this[`${this.M}Phase`](a);
      }
      "syringe" !== this.M && (this.C.y = Math.round(100 * (this.C.y + this.Ba)) / 100);
      this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
      if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, a.B.P.L).length) {
        for (this.A.x = Math.round(this.A.x); !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, a.B.P.L).length;) {
          this.A.x += Math.sign(this.C.x);
        }
        this.Ja *= -1;
        this.C.x = 0;
      }
      this.ga = !1;
      if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).length) {
        this.ga = t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, a.B.P.L).some(e => e.fb.A.y > this.A.y);
        for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, a.B.P.L).length;) {
          this.A.y += Math.sign(this.C.y);
        }
        this.G && (this.C.y = 0);
      }
      this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
      this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
      d.Y && this.G && "idle" === this.animation && (this.dir = p(this).x < p(d).x);
      this.qa !== this.M ? this.ea = 0 : this.ea++;
      this.qa = this.M;
      this === a.B.N && (this.T < this.G ? (this.T += .5, this.F % 4 || a.O("pew2")) : (this.T = .9 * this.T + .1 * this.G, .1 > Math.abs(this.G - this.T) && (this.T = this.G)));
      this.$ && this.$--;
      this.pa++;
      this.F++;
    };
    this.ca = (a, d) => {
      if (!(this.$ % 2)) {
        d.save();
        var e = p(this).round();
        d.translate(e.x, e.y);
        this.dir || d.scale(-1, 1);
        e = ["gun"].includes(this.animation) ? Math.floor(.25 * this.pa) % 3 : ["charge"].includes(this.animation) && 20 < this.ea || "laugh" === this.animation ? Math.floor(this.pa * ("laugh" === this.animation ? .2 : .1)) % 2 : 0;
        d.drawImage(a.I.images[`sp_ame_${this.animation}`], 48 * e, 0, 48, 48, -24, -31, 48, 48);
        ["item", "laugh"].includes(this.animation) && d.drawImage(a.I.images.sp_clock, 0, 0, 20, 20, -16, -40 + Math.floor(2 * Math.sin(.125 * this.F)), 20, 20);
        d.restore();
      }
    };
    this.G = this.da = b;
  }
}
;function J(c, b, a) {
  !(Math.random() > a) || 2 === b.Da && b.B.Ld && b.B.D.find(d => d instanceof Ea) || b.B.D.push(new Ea(p(c).S(new m(-4, -4))));
}
function Fb(c, b) {
  b.save();
  b.translate(Math.round(c.A.x), Math.round(c.A.y));
  b.fillStyle = "#00f8";
  b.fillRect(0, 0, c.size.x, 1);
  b.fillRect(0, 0, 1, c.size.y);
  b.fillRect(c.size.x - 1, 0, 1, c.size.y);
  b.fillRect(0, c.size.y - 1, c.size.x, 1);
  b.fillStyle = "#00f4";
  b.fillRect(0, 0, c.size.x, c.size.y);
  b.restore();
}
class G {
  constructor(c, b) {
    this.F = 0;
    this.update = () => this.F++;
    this.oa = () => {
    };
    this.A = c;
    this.size = b;
  }
  ca(c, b) {
    globalThis.Z && Fb(this, b);
  }
  R(c, b) {
    return r(this, b);
  }
}
class Gb extends G {
  constructor(c, b) {
    super(c);
    this.size = new m(24, 16);
    this.K = Math.floor(360 * Math.random());
    this.update = a => {
      this.A.y += Math.cos((this.K + 2 * this.F) % 360 / 180 * Math.PI) / 4;
      this.dir = a.B.D.find(d => d instanceof H).A.x > this.A.x;
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (d.translate(this.size.x / 2, 0), d.scale(-1, 1), d.translate(-this.size.x / 2, 0));
      d.drawImage(a.I.images.sp_elfriend_idle, Math.floor(.2 * (this.K % 2 + this.F)) % 2 * 24, 0, 24, 24, 0, 0, 24, 24);
      d.restore();
    };
    this.dir = b;
  }
}
class Pa extends G {
  constructor(c, b, a, d) {
    super(c, b);
    this.V = 1;
    this.C = a;
    this.za = d;
  }
  update(c) {
    this.A = this.A.S(this.C);
    let b = !1;
    const a = c.B.D.filter(d => ![this, this.za].includes(d) && d.R(c, this));
    a.length ? (a.forEach(d => {
      d.oa(c, this);
    }), b = !0) : ma(this, c.B.P.L).length ? (b = !0, r(this, c.B.view) && c.O("no_damage"), D(c.B.J, p(this))) : r(this, c.B.P) || (b = !0);
    b && (c.B.D = c.B.D.filter(d => d !== this));
    this.F++;
  }
}
class O extends Pa {
  constructor(c, b, a, d, e) {
    super(c, b, a, e);
    this.update = g => {
      "dual" === this.type && (this.F % 20 || g.O("slash"), this.dir = this.za.dir, this.A = p(this.za).S(new m(this.dir ? 0 : -this.size.x, -16)));
      this.wd && (this.C.x *= .5, this.C.y = .2 * this.wd, this.wd++);
      if ("sword" === this.type || "mace2" === this.type) {
        this.C.y += .2;
      }
      this.A = this.A.S(this.C);
      var h = !1;
      const l = g.B.D.filter(n => (!(n instanceof Pa) || "fire" === this.type && n instanceof L && n.Z || n instanceof Hb || n.K || n instanceof Ib && n.za !== this.za) && !(n instanceof X) && !(n instanceof Ea) && (!(n instanceof tb) || !1) && !(n instanceof Oa) && !(n instanceof Ha) && (![this.za].includes(n) || this.Zd) && n.R(g, this));
      l.length ? (l.forEach(n => {
        n.oa(g, this);
      }), "dual" !== this.type && (h = !0), "rocket" === this.type && (y(g.B.J, p(this)), g.B.aa = 4, g.O("rumble"))) : !["bullet", "sword", "dual", "mace"].includes(this.type) && ma(this, g.B.P.L).length ? (h = !0, "rocket" === this.type ? (y(g.B.J, p(this)), g.B.aa = 4, g.O("rumble")) : (g.O("no_damage"), D(g.B.J, p(this)))) : r(this, g.B.view) || ["sword", "dual"].includes(this.type) && this.A.y < g.B.view.A.y || (h = !0);
      "dual" === this.type && 36 < this.F && (h = !0);
      "mace" === this.type && (h = !0);
      h && (g.B.D = g.B.D.filter(n => n !== this));
      ["petal", "bullet", "sword", "mace2"].includes(this.type) || (this.C.y = 0);
      if ("petal" === this.type && (h = g.B.D.filter(n => [M, I, N, Qa, Fa, Ga, Sa, Ta, P, Ua, Va, Q, S, fb, Ka, La, Ma, gb, Ja, T, ib, nb, ob, pb, U, rb, Db, tb, ub, vb, xb, yb, Ab, zb].some(C => n instanceof C)), h.length)) {
        const n = p(this);
        h = h.reduce((C, wb) => n.Ab(p(wb)) < n.Ab(p(C)) ? wb : C);
        h = p(h);
        128 > n.Ab(h) && (this.angle = na(this.angle, Math.atan2(h.y - n.y, h.x - n.x)), this.C = (new m(Math.cos(this.angle), Math.sin(this.angle))).ka(3));
      }
      if ("fire" === this.type && this.F % 2) {
        if (g.B.lc) {
          for (g.saveData.getItem("nuinui-save-achievement-21") || g.saveData.setItem("nuinui-save-achievement-21", !0), h = 0; 2 > h; h++) {
            z(g.B.J, p(this), new m(0, 0), 1);
          }
        } else {
          ua(g.B.J, p(this));
        }
      } else {
        "sword" !== this.type || this.F % 4 ? "petal" !== this.type || this.F % 8 ? "rocket" === this.type && (.5 < Math.random() ? this.C.y += .5 * this.Z : .5 < Math.random() && (this.C.y -= .5 * this.Z), this.F % 60 || (this.Z = -this.Z), z(g.B.J, p(this).S(new m(0 < this.C.x ? -4 : 4, 0)), new m(0, 0), 0)) : wa(g.B.J, p(this)) : xa(g.B.J, p(this));
      }
      "mace" === this.type && (g.B.D = g.B.D.filter(n => !(n instanceof L && n.R(g, this))));
      this.F++;
    };
    this.ca = (g, h) => {
      "mace" !== this.type && (h.save(), h.translate(Math.round(this.A.x), Math.round(this.A.y)), 0 > this.C.x && (h.translate(this.size.x / 2, 0), h.scale(-1, 1), h.translate(-this.size.x / 2, 0)), "dual" === this.type ? (this.dir || (h.translate(this.size.x / 2, 0), h.scale(-1, 1), h.translate(-this.size.x / 2, 0)), h.drawImage(g.I.images.sp_stardust, 160 * Math.floor(this.F / 4), 0, 160, 144, -72, -32, 160, 144)) : "mace2" === this.type ? (h.translate(8, 8), h.rotate(Math.PI / 180 * this.F), h.drawImage(g.I.images.sp_mace, 
      0, 0, 32, 32, -16, -16, 32, 32)) : "sword" === this.type ? (h.translate(10, 10), h.rotate(Math.PI / 180 * Math.floor(16 * this.F / 45) * 45 * (this.dir ? 1 : -1)), h.drawImage(g.I.images.sp_marine_sword, -16, -16)) : "petal" === this.type ? (h.translate(4.5, 4.5), h.rotate(Math.PI / 180 * this.F * 8 * (this.dir ? 1 : -1)), h.drawImage(g.I.images.sp_petal, -4.5, -4.5)) : "bullet" === this.type ? h.drawImage(g.I.images.sp_bullet, Math.floor(this.F / 4) % 2 ? 0 : 8, 0, 8, 8, -2, -2, 8, 8) : "rocket" === 
      this.type ? h.drawImage(g.I.images.sp_peko_rocket, 4, -4) : h.drawImage(g.I.images.sp_arrow, "fire" === this.type ? 20 : 0, "bow" === this.za.lb ? 0 : 10, 20, 10, 0, 0, 20, 10), h.restore());
    };
    this.type = d;
    "sword" === this.type && (this.size.y = 20, this.C.y = -6);
    "petal" === this.type && (this.dir = .5 < Math.random(), this.angle = Math.atan2(this.C.y, this.C.x));
    "rocket" === this.type && (this.Z = .5 < Math.random() ? 1 : -1);
    "mace" !== this.type && (this.V = ["dual"].includes(this.type) ? 2 : ["rocket"].includes(this.type) ? 5 : ["sword"].includes(this.type) ? 4 : ["fire"].includes(this.type) ? 3 : 1);
    "mace2" === this.type && (this.V = 48);
    "bullet" === this.type && (this.size = new m(4, 4));
  }
}
class L extends Pa {
  constructor(c, b, a, d) {
    super(c, new m(4, 4), b, a);
    this.oa = (e, g) => {
      g instanceof Ib && !(this.za instanceof T) && (e.B.D = e.B.D.filter(h => h !== this), J(this, e, .9));
      if (this.Z || this.K) {
        g instanceof O && "fire" === g.type && (this.G = Math.max(0, this.G - (g.V ? g.V : 1)), w(e.B.J, this.R(e, g).A, g.V ? g.V : 1)), this.K && (this.G = 0), this.aa = 15, F(e.B.J, this.R(e, g).A), E(e.B.J, this.R(e, g).A), this.G ? (e.U += 10, e.O("damage")) : (e.B.D = e.B.D.filter(h => h !== this), this.K || J(this, e, .7), e.O("damage"), e.U += 50);
      }
    };
    this.update = e => {
      if ([Ta, Q].some(l => this.za instanceof l) || this.za instanceof P && 4 === e.Da || this.Ca || this.la || this.pb) {
        this.C.y += .1;
      }
      (this.Z && this.za instanceof fb || this.K) && 60 > this.F || (this.A = this.A.S(this.C));
      (this.Ac || this.K || this.Ca) && !this.ra && (this.angle += Math.PI / (this.K ? 64 : 16));
      if (this.K || this.za instanceof U) {
        for (var g = 0; 2 > g; g++) {
          this.za instanceof xb ? z(e.B.J, p(this).S(new m(16 * Math.random() - 8, 16 * Math.random() - 8)), new m(0, 0), 0) : ra(e.B.J, p(this).S(new m(16 * Math.random() - 8, 16 * Math.random() - 8)), new m(0, 0), 0);
        }
      }
      this.za instanceof U && (this.C = this.C.ka(1.05));
      if (this.K && 60 < this.F) {
        g = p(e.B.D.find(l => l instanceof H));
        var h = p(this);
        g = Math.atan2(h.y - g.y, h.x - g.x);
        this.C = this.C.bb((new m(Math.cos(g), Math.sin(g))).ka(-8), .025);
      }
      h = !1;
      this.Ac && 150 < this.F && (h = !0);
      g = e.B.D.filter(l => l instanceof H && !l.xa && l.R(e, this));
      if (g.length && !this.ra) {
        g.forEach(l => {
          l.oa(e, this);
        });
        for (h = 0; 3 > h; h++) {
          z(e.B.J, this.A, new m(0, 0), 1);
        }
        h = !0;
      } else if (this.za instanceof Q || this.Ma || this.la || this.ra || !ma(this, e.B.P.L).length) {
        r(this, e.B.P) || (h = !0);
      } else {
        this.za instanceof P && 4 === e.Da ? this.C.y = -this.C.y : h = !0;
        for (let l = 0; 3 > l; l++) {
          z(e.B.J, this.A, new m(0, 0), 1);
        }
        this.Ca && (y(e.B.J, p(this)), e.O("explosion"));
      }
      h && (this.Ac && !g.length ? (this.C = new m(0, 0), this.ra = !0) : e.B.D = e.B.D.filter(l => l !== this));
      this.Ya && (this.F % 16 || D(e.B.J, p(this)), this.C.x = .5 * Math.sin(.125 * this.F));
      !this.Yd || this.F % 8 || wa(e.B.J, p(this));
      !(this.za instanceof Q || this.la) || this.F % 8 || xa(e.B.J, p(this));
      !(this.za instanceof T) || this.F % 2 || this.ra || B(e.B.J, p(this), new m(0, 0), 1);
      !this.Z || this.F % 8 || va(e.B.J, p(this), 0);
      this.F++;
    };
    this.ca = (e, g) => {
      this.Ac && 120 < this.F && Math.floor(this.F / 2) % 2 || (g.save(), this.za instanceof P && 4 === e.Da && (g.filter = "invert(100%)"), this.K && 60 > this.F && (g.filter = `brightness(${this.F / 60})`), g.translate(Math.round(this.A.x), Math.round(this.A.y)), this.Ca ? (g.translate(4, 4), g.rotate(this.angle + .75 * Math.PI), g.drawImage(e.I.images.sp_candy, 0, 0, 16, 16, -8, -8, 16, 16)) : this.Z ? (g.translate(8, 8), g.rotate(this.angle + .75 * Math.PI), g.drawImage(e.I.images.sp_ice_spike, 
      -12, -12)) : this.gb ? (g.rotate(this.angle + .75 * Math.PI), g.drawImage(e.I.images.sp_ame_syringe, -8, -8)) : this.Ac ? (g.translate(8, 8), g.rotate(this.angle + .75 * Math.PI), g.drawImage(e.I.images.sp_mace, -12, -12)) : this.K ? (g.translate(8, 8), g.rotate(this.angle + .75 * Math.PI), g.drawImage(e.I.images.sp_demon_orb, Math.floor(.25 * this.F) % 2 * 24, this.za instanceof xb ? 24 : 0, 24, 24, -12, -12, 24, 24)) : this.za instanceof Ma ? (g.translate(.5 * this.size.x, .5 * this.size.y), 
      g.rotate(.125 * this.F), g.drawImage(e.I.images.sp_thunder, 0, 0, 16, 16, -8, -8, 16, 16)) : this.Ya ? g.drawImage(e.I.images.sp_ice_shield, 0, 0, 15, 15, -4, -4, 15, 15) : this.Ib ? g.drawImage(e.I.images.sp_gura_bullet, 0, 0, 16, 24, -4, -8, 16, 24) : this.za instanceof Q || this.la ? (g.translate(10, 10), g.rotate(Math.PI / 180 * Math.floor(16 * this.F / 45) * 45 * (this.dir ? 1 : -1)), g.drawImage(e.I.images.sp_marine_sword, -16, -16)) : this.Yd ? (g.translate(3, 3), g.rotate(Math.PI / 
      180 * this.F * 8 * (this.dir ? 1 : -1)), g.drawImage(e.I.images.sp_petal, 0, 0, 9, 9, -3, -3, 9, 9)) : this.za instanceof U ? (this.dir || (g.translate(this.size.x / 2, 0), g.scale(-1, 1), g.translate(-this.size.x / 2, 0)), g.drawImage(e.I.images.sp_deadbeat, 0, 0, 24, 24, -4, -4, 24, 24)) : this.za instanceof Qa || this.Ma ? g.drawImage(e.I.images.sp_peko_bullet, Math.floor(this.F / 16) % 2 ? 0 : 16, 0, 16, 16, -6, -6, 16, 16) : g.drawImage(e.I.images.sp_bullet, Math.floor(this.F / 4) % 2 ? 
      0 : 8, 0, 8, 8, -2, -2, 8, 8), g.restore());
    };
    a instanceof fb ? (this.size = new m(16, 16), this.Z = !0, this.G = 1) : a instanceof Sa && 0 !== b.y || a instanceof sb && "attack" === a.M || a instanceof ob && !d ? (this.Yd = !0, this.dir = .5 < Math.random()) : this.za instanceof Q || this.za instanceof sb && "attack2" === this.za.M ? (this.la = !0, this.size = new m(20, 20), this.dir = .5 < Math.random()) : this.za instanceof Ma ? (this.size = new m(8, 8), this.dir = this.za.dir, this.V = 2) : this.za instanceof T ? (this.Ac = !0, this.size = 
    new m(16, 16)) : this.za instanceof Na || this.za instanceof xb ? (this.size = new m(16, 16), this.K = !0) : this.za instanceof U ? (this.size = new m(8, 8), this.dir = this.za.dir) : this.za instanceof pb && (this.size = new m(8, 1 < b.y ? 16 : 8));
  }
}
class Ib extends Pa {
  constructor(c, b, a) {
    super(c, new m(12, 12), new m(0, 0), a);
    this.ba = !0;
    this.oa = (d, e) => {
      F(d.B.J, this.R(d, e).A);
      E(d.B.J, this.R(d, e).A);
      d.O("no_damage");
      d.B.D = d.B.D.filter(g => g !== this);
      d.U += 100;
    };
    this.update = d => {
      if (!this.Z || 60 < this.F) {
        this.A = this.A.S(this.C);
      }
      this.A = p(this.za).S(new m(24 * Math.cos(this.F / 16 + this.la) - this.size.x / 2, 24 * Math.sin(this.F / 16 + this.la) - this.size.y / 2));
      var e = !1, g = d.B.D.filter(l => (l instanceof H || l instanceof O) && l.R(d, this));
      const h = d.B.D.filter(l => [L, Hb, M, I, N, Qa, Fa, Ga, Sa, Ta, P, Ua, Va, Q, S, fb, Ka, La, Ma, gb, hb, Ja, T, ib, nb, mb, U, pb, rb, V, Db, tb, ub, vb, xb, yb, Ab, zb].some(n => l instanceof n) && l.R(d, this));
      g = this.za instanceof H ? h : g;
      if (g.length) {
        g.forEach(l => {
          l.oa(d, this);
        });
        for (e = 0; 3 > e; e++) {
          z(d.B.J, this.A, new m(0, 0), 1);
        }
        e = !0;
      }
      e && (d.B.D = d.B.D.filter(l => l !== this), d.O("no_damage"));
      this.F % 8 || D(d.B.J, p(this));
      this.F++;
    };
    this.ca = (d, e) => {
      e.save();
      e.translate(Math.round(this.A.x), Math.round(this.A.y));
      e.drawImage(d.I.images.sp_ice_shield, -3, -3);
      e.restore();
    };
    this.la = b;
  }
}
class Hb extends Pa {
  constructor(c, b, a) {
    super(c, new m(8, 8), b, a);
    this.V = this.G = 2;
  }
  oa(c, b) {
    this.G = Math.max(0, this.G - (b.V ? b.V : 1));
    F(c.B.J, this.R(c, b).A);
    E(c.B.J, this.R(c, b).A);
    w(c.B.J, this.R(c, b).A, b.V ? b.V : 1);
    this.G ? (this.aa = 15, c.O("hit"), c.U += 10) : ("rocket" !== b.type && (y(c.B.J, p(this)), c.B.aa = 4, c.O("rumble")), c.B.D = c.B.D.filter(a => a !== this), J(this, c, .7), c.U += 100);
  }
  update(c) {
    var b = c.B.D.find(d => d instanceof H);
    b = p(b);
    var a = p(this);
    this.angle = Math.atan2(a.y - b.y, a.x - b.x) + 0.125 * Math.random() - 0.0625;
    b = (new m(Math.cos(this.angle), Math.sin(this.angle))).ka(-1);
    .5 < Math.random() && (b.y -= .5);
    this.A = this.A.S(b);
    z(c.B.J, p(this).S(new m(0 < this.C.x ? -4 : 4, 0)), new m(0, 0), 0);
    a = !1;
    b = c.B.D.filter(d => d instanceof H && d.R(c, this));
    if (b.length) {
      b.forEach(d => {
        d.oa(c, this);
      });
      for (a = 0; 3 > a; a++) {
        z(c.B.J, this.A, new m(0, 0), 1);
      }
      a = !0;
    } else {
      ma(this, c.B.P.L).length ? a = !0 : r(this, c.B.P) || (a = !0);
    }
    a && (c.B.D = c.B.D.filter(d => d !== this), b.some(d => d instanceof O && "rocket" === d.type) || (y(c.B.J, p(this)), c.B.aa = 4, c.O("rumble")), J(this, c, .9));
    this.F++;
  }
  ca(c, b) {
    b.save();
    b.translate(Math.round(this.A.x + 4), Math.round(this.A.y + 4));
    b.rotate(this.angle - Math.PI);
    b.drawImage(c.I.images.sp_peko_rocket, -8, -8);
    b.restore();
  }
}
class Jb extends G {
  constructor(c, b) {
    super(new m(16 * c.x, 16 * c.y), new m(32, 64));
    this.R = () => !1;
    this.update = a => {
      .75 < Math.random() && ya(a.B.J, p(this).S(new m(16 * Math.random() - 8, 16)), new m(this.dir, -3), 1);
      a.B.D.filter(d => ![this].includes(d) && !d.xa && d.R(a, this)).forEach(d => {
        d instanceof O && ["petal", "bullet"].includes(d.type) || d instanceof L || d instanceof S && !d.K || (this.dir && (d.C.x = Math.min(8, Math.max(-8, d.C.x + 6 * this.dir))), d.C.y = Math.max(-8, this.dir ? d.C.y - 1 : d.C.y - 1.5));
      });
      this.F++;
    };
    this.ca = (a, d) => {
      d.save();
      d.translate(Math.round(this.A.x), Math.round(this.A.y));
      d.drawImage(a.I.images.sp_aircon, 0, this.size.y - 16);
      d.restore();
    };
    this.dir = void 0 === b ? 0 : b;
  }
}
class Kb extends Jb {
  constructor() {
    super(...arguments);
    this.size = new m(16, 8);
    this.dir = 0;
    this.active = !0;
    this.update = c => {
      c.B.D.filter(b => ![this].includes(b) && !b.xa && b.R(c, this)).forEach(b => {
        b instanceof O && ["petal", "bullet"].includes(b.type) || b instanceof L || b instanceof S && !b.K || (this.dir && (b.C.x = Math.min(8, Math.max(-8, b.C.x + 6 * this.dir))), b.C.y = Math.max(-8, this.dir ? b.C.y - 1 : b.C.y - 1.5), this.active && b instanceof H && (c.O("jump"), this.active = !1, this.aa = 15, b.C.y = -4, b.ga = !1, b.Ia && (c.B.xc ? c.saveData.setItem("nuinui-save-achievement-25", !0) : c.B.xc = !0)));
      });
      this.F++;
    };
    this.ca = (c, b) => {
      b.save();
      b.translate(Math.round(this.A.x), Math.round(this.A.y));
      b.drawImage(c.I.images.sp_watamelon, 0, 0, 16, 8, 0, 0, 16, 8);
      b.restore();
    };
  }
}
class X extends G {
  constructor(c) {
    super(new m(16 * c.x, 16 * c.y));
    this.size = new m(16, 24);
    this.active = !1;
    this.update = b => {
      const a = b.B.D.filter(d => d instanceof O && "fire" === d.type && d.R(b, this));
      this.active || !a.length && !b.B.D.find(d => d instanceof W) || (b.B.aa = 2, b.O("noise"), this.active = !0, b.U += 10);
      !this.active || this.F % 4 || ua(b.B.J, p(this), new m(0, -.5));
      this.F++;
    };
    this.ca = (b, a) => {
      a.save();
      a.translate(Math.round(this.A.x), Math.round(this.A.y));
      this.dir || (a.translate(this.size.x / 2, 0), a.scale(-1, 1), a.translate(-this.size.x / 2, 0));
      a.drawImage(b.I.images.sp_elfriend_idle, Math.floor(.2 * (this.K % 2 + this.F)) % 2 * 24, 0, 24, 24, 0, 0, 24, 24);
      a.restore();
    };
  }
}
;const Lb = {" ":{width:4}, 0:{A:{x:0, y:0}, width:5}, 1:{A:{x:1, y:0}, width:4}, 2:{A:{x:2, y:0}, width:5}, 3:{A:{x:3, y:0}, width:5}, 4:{A:{x:4, y:0}, width:5}, 5:{A:{x:5, y:0}, width:5}, 6:{A:{x:6, y:0}, width:5}, 7:{A:{x:7, y:0}, width:5}, 8:{A:{x:8, y:0}, width:5}, 9:{A:{x:9, y:0}, width:5}, a:{A:{x:0, y:1}, width:5}, b:{A:{x:1, y:1}, width:5}, c:{A:{x:2, y:1}, width:5}, d:{A:{x:3, y:1}, width:5}, e:{A:{x:4, y:1}, width:5}, f:{A:{x:5, y:1}, width:5}, g:{A:{x:6, y:1}, width:5}, h:{A:{x:7, y:1}, 
width:5}, i:{A:{x:8, y:1}, width:2}, j:{A:{x:9, y:1}, width:4}, k:{A:{x:0, y:2}, width:5}, l:{A:{x:1, y:2}, width:4}, m:{A:{x:2, y:2}, width:5}, n:{A:{x:3, y:2}, width:5}, o:{A:{x:4, y:2}, width:5}, p:{A:{x:5, y:2}, width:5}, q:{A:{x:6, y:2}, width:5}, r:{A:{x:7, y:2}, width:5}, s:{A:{x:8, y:2}, width:5}, t:{A:{x:9, y:2}, width:4}, u:{A:{x:0, y:3}, width:5}, v:{A:{x:1, y:3}, width:5}, w:{A:{x:2, y:3}, width:5}, x:{A:{x:3, y:3}, width:5}, y:{A:{x:4, y:3}, width:4}, z:{A:{x:5, y:3}, width:5}, "!":{A:{x:6, 
y:3}, width:3}, "?":{A:{x:7, y:3}, width:5}, ".":{A:{x:8, y:3}, width:5}, ":":{A:{x:9, y:3}, width:5}, "/":{A:{x:0, y:4}, width:5}, "+":{A:{x:1, y:4}, width:5}, "-":{A:{x:2, y:4}, width:5}, _:{A:{x:3, y:4}, width:5}, "%":{A:{x:4, y:4}, width:5}, "#":{A:{x:5, y:4}, width:5}, "[":{A:{x:6, y:4}, width:5}, "]":{A:{x:7, y:4}, width:5}, "(":{A:{x:8, y:4}, width:5}, ")":{A:{x:9, y:4}, width:5}, "\u00f1":{A:{x:0, y:5}, width:5}, "\u00e9":{A:{x:1, y:5}, width:5}, "\u00f3":{A:{x:2, y:5}, width:5}, "\u00fa":{A:{x:3, 
y:5}, width:5}, "\u00ed":{A:{x:4, y:5}, width:3}, "\u00e1":{A:{x:5, y:5}, width:5}, "\u00a1":{A:{x:6, y:5}, width:3}, "\u00bf":{A:{x:7, y:5}, width:5}}, Mb = "\u3042\u3044\u3046\u3048\u304a\u304b\u304d\u304f\u3051\u3053\u3055\u3057\u3059\u305b\u305d\u305f\u3061\u3064\u3066\u3068\u306a\u306b\u306c\u306d\u306e\u306f\u3072\u3075\u3078\u307b\u307e\u307f \u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308a\u308b\u308c\u308d\u308f\u3092\u3093\u304c\u304e\u3050\u3052\u3054\u3056\u3058\u305a\u305c\u305e\u3060\u3062\u3065\u3067\u3069\u3070\u3073\u3076 \u3079\u307c\u3071\u3074\u3077\u307a\u307d\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u30a2\u30a4\u30a6\u30a8\u30aa\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf \u30c1\u30c4\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e6\u30e8\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30ac\u30ae \u30b0\u30b2\u30b4\u30b6\u30b8\u30ba\u30bc\u30be\u30c0\u30c2\u30c5\u30c7\u30c9\u30d0\u30d3\u30d6\u30d9\u30dc\u30d1\u30d4\u30d7\u30da\u30dd\u30a1\u30a3\u30a5\u30a7\u30a9\u30c3\u30e3\u30e5\u30e7 \u30f4\u300c\u300d\u300e\u300f\u3001\u3002\uff01\uff1f\uff1a\u30fc\uff0f\u301c\uff05\u30fb\uff08\uff09at.+1234567890".split(" ");
class Y {
  constructor(c, b, a = "en") {
    this.ca = (d, e, g) => {
      e.save();
      e.translate(g.x, g.y);
      "center" === this.Z && e.translate(-Math.ceil(.5 * this.width), 0);
      "right" === this.Z && e.translate(-this.width, 0);
      const h = d.I.images[`font_${"jp" === this.K ? "jp" : "en"}`];
      "jp" === this.K ? this.la.forEach(l => {
        if (" " !== l) {
          const n = Mb.findIndex(C => C.includes(l));
          e.drawImage(h, 8 * Mb[n].indexOf(l), 8 * n, 8, 8, 0, 0, 8, 8);
        }
        e.translate(8, 0);
      }) : this.la.forEach(l => {
        if (" " === l) {
          e.translate(Lb[l].width, 0);
        } else {
          const {A:n, width:C} = Lb[l];
          e.drawImage(h, 6 * n.x, 6 * n.y, 7, 6, 0, 0, 7, 6);
          e.translate(C + 1, 0);
        }
      });
      e.restore();
    };
    this.K = a;
    this.la = c;
    this.width = "jp" === this.K ? 8 * c.length : c.reduce((d, e) => d + Lb[e].width + 1, 0);
    this.Z = b;
  }
}
;class Nb {
  constructor() {
    this.F = 0;
  }
  pb(c, b) {
    b.save();
    b.globalAlpha = .5;
    b.fillStyle = "#000";
    b.fillRect(0, 0, c.width, c.height);
    b.restore();
    b.fillRect(.5 * c.width - 96, 0, 192, c.height);
    b.fillStyle = "#3F3FBF";
    b.fillRect(.5 * c.width - 96 + 1, 0, 1, c.height);
    b.fillRect(.5 * c.width + 96 - 2, 0, 1, c.height);
  }
  ca(c) {
    const b = c.qc;
    b.save();
    b.clearRect(0, 0, c.width, c.height);
    this.pb(c, b);
    this.Ya(c, b);
    b.restore();
  }
}
class Ob extends Nb {
  constructor(c, b, a) {
    super();
    this.index = 0;
    this.ua = !0;
    this.K = b;
    this.gb = a;
    this.Bc(c);
    this.Ib = new Y(Array.from(this.gb), "center");
    this.Nb = new Y(Array.from("no data"), "left");
  }
  Bc(c) {
    this.Ma = [];
    for (let b = 0; b < c.Qe; b++) {
      const a = globalThis.localStorage.getItem(`nuinui-save-${b}`);
      if (a) {
        const d = JSON.parse(a);
        this.Ma.push({Bd:"fire rocket petal sword shield dual".split(" ").map(e => d[`nuinui-save-item-${e}`]), items:["gun", "clock", "jump", "boots", "bow"].map(e => d[`nuinui-save-item-${e}`]), keys:Array(5).fill(null).map((e, g) => d[`nuinui-save-item-key${g}`]), od:Array(28).fill(null).map((e, g) => d[`nuinui-save-achievement-${g + 1}`])});
      } else {
        this.Ma.push(null);
      }
    }
  }
  update(c) {
    this.Z && !c.keys.b ? (this.la--, this.la || (this.K && (this.K.Bc(c), this.K.F = 0, this.K.progress = 0), c.Ea = this.K, c.qc.clearRect(0, 0, c.width, c.height))) : c.keys.b ? this.Z = !0 : (this.ra && !c.keys.Bb && (this.ra = !1), c.keys.Bb && !this.ra && (this.ra = !0, this.index++, this.index === this.Ma.length && (this.index = 0), c.O("menu_move")), this.Ca && !c.keys.Fc && (this.Ca = !1), c.keys.Fc && !this.Ca && (this.Ca = !0, this.index--, 0 > this.index && (this.index = this.Ma.length - 
    1), c.O("menu_move")), this.ua && !c.keys.a && (this.ua = !1), c.keys.a && !this.ua && (this.ua = !0, "delete" === this.gb ? (c.saveData.delete(this.index), this.Bc(c)) : "save" === this.gb ? (c.saveData.setItem("nuinui-save-current-stage", c.Da), c.saveData.save(this.index), this.Bc(c)) : globalThis.localStorage.getItem(`nuinui-save-${this.index}`) && (c.saveData.load(this.index), this.K = null, c.mode = "flare", c.we(c.saveData.getItem("nuinui-save-current-stage")), c.qc.clearRect(0, 0, c.width, 
    c.height)), c.O("select")));
    this.F++;
  }
  Ya(c, b) {
    b.save();
    this.Ib.ca(c, b, new m(.5 * c.width, 8));
    b.translate(.5 * c.width - 80, 24);
    this.Ma.forEach((a, d) => {
      this.index === d && (d = Math.floor(.05 * this.F) % 2, b.strokeStyle = "#FFF", b.strokeRect(-.5 - d, -.5 - d, 161 + 2 * d, 49 + 2 * d));
      b.fillStyle = "#3F3FBF";
      b.fillRect(0, 0, 160, 48);
      b.fillStyle = "#0F0F3F";
      b.fillRect(1, 1, 158, 46);
      a ? (a.Bd.forEach((e, g) => {
        e && b.drawImage(c.I.images.ui_charge_type, 12 * g, 0, 12, 12, 4 + 16 * g, 4, 12, 12);
      }), a.items.forEach((e, g) => {
        e && b.drawImage(c.I.images.ui_items, 20 * g, 0, 20, 20, 2 + 19 * g, 18, 20, 20);
      }), a.keys.forEach((e, g) => {
        e && b.drawImage(c.I.images.sp_key, 16 * g, 0, 16, 16, 100 + g % 3 * 20 + (2 < g ? 10 : 0), 4 + 18 * Math.floor(g / 3), 16, 16);
      }), a.od.forEach((e, g) => {
        b.fillStyle = e ? "#3F3FBF" : "#000";
        b.fillRect(5 + 5 * g + 2 * Math.floor(g / 4), 40, 3, 4);
      })) : this.Nb.ca(c, b, new m(4, 4));
      b.translate(0, 56);
    });
    b.restore();
  }
}
class Pb extends Nb {
  constructor() {
    super();
    this.K = new Y(Array.from("credits"), "center");
  }
  update(c) {
    this.Z && !c.keys.b ? (this.la--, this.la || (c.Ea = null, c.qc.clearRect(0, 0, c.width, c.height))) : c.keys.b && (this.Z = !0);
    this.F++;
  }
  Ya(c, b) {
    b.save();
    this.K.ca(c, b, new m(.5 * c.width, 24));
    b.translate(.5 * c.width, .5 * c.height);
    b.drawImage(c.I.images.credits, 0, 0, 192, 80, -96, -40, 192, 80);
    (new Y(Array.from("created by"), "left")).ca(c, b, new m(-85, -26));
    (new Y(Array.from("music by"), "left")).ca(c, b, new m(-2, 20));
    b.restore();
  }
}
;function Qb(c, b) {
  b.we(c.sb[c.K].index);
  b.qc.clearRect(0, 0, b.width, b.height);
}
class Rb extends Nb {
  constructor(c, b, a = null) {
    super();
    this.F = 0;
    this.ua = !0;
    this.Ca = b;
    this.ra = a;
    this.K = c.Da;
    this.sb = [];
    "falls;casino;port;yamato;westa;holo hq;heaven".split(";").forEach((d, e) => {
      c.saveData.getItem(`nuinui-save-stage-${e + 1}`) && this.sb.push({index:e, label:new Y(Array.from(d), "center")});
    });
  }
  update(c) {
    this.Ca ? (60 === this.F && (c.O("select"), c.Da++, this.K++, 6 < c.Da && (this.K = c.Da = 0)), 180 === this.F && Qb(this, c)) : this.Ma && !c.keys.a ? Qb(this, c) : this.Z && !c.keys.b ? (this.la--, this.la || (this.ra && (this.ra.F = 0, this.ra.progress = 0), c.Ea = this.ra, c.qc.clearRect(0, 0, c.width, c.height))) : c.keys.b && this.ra ? this.Z = !0 : (this.jb && !c.keys.left && (this.jb = !1), this.kb && !c.keys.right && (this.kb = !1), c.keys.left && !this.jb && (this.jb = !0, this.K--, 
    0 > this.K && (this.K = this.sb.length - 1), c.O("menu_move")), c.keys.right && !this.kb && (this.kb = !0, this.K++, this.K === this.sb.length && (this.K = 0), c.O("menu_move")), this.ua && !c.keys.a && (this.ua = !1), c.keys.a && !this.ua && (this.Ma = this.ua = !0, c.O("select")));
    this.F++;
  }
  pb(c, b) {
    b.save();
    b.globalAlpha = .5;
    b.fillStyle = "#000";
    b.fillRect(0, 0, c.width, c.height);
    b.restore();
    b.fillRect(0, .5 * c.height - 40, c.width, 80);
    b.fillStyle = "#3F3FBF";
    b.fillRect(0, .5 * c.height - 40 + 1, c.width, 1);
    b.fillRect(0, .5 * c.height + 40 - 2, c.width, 1);
  }
  Ya(c, b) {
    b.save();
    const a = 7 === this.sb.length ? 44 : 48;
    b.translate(.5 * c.width - (this.sb.length - 1) * a * .5, .5 * c.height);
    this.sb.forEach((d, e) => {
      e === this.K && b.drawImage(c.I.images.ui_arrow_down, 0, 0, 8, 8, -4, Math.round(2 * Math.cos(Math.PI / 180 * this.F * 6)) - 32, 8, 8);
      b.drawImage(c.I.images.ui_level_icon, 32 * d.index, 0, 32, 32, -16, -20, 32, 32);
      d.label.ca(c, b, new m(0, 20));
      b.translate(a, 0);
    });
    b.restore();
  }
}
;class Sb extends Nb {
  constructor(c, b = null) {
    super();
    this.index = 0;
    this.K = b;
    this.ra = new Y(Array.from("achievements"), "center");
    this.sb = [];
    [[{Ta:"defeat the first boss (no hit)", Ua:"\u3055\u3044\u3057\u3087 \u306e \u30dc\u30b9 \u3092 \u305f\u304a\u3059\uff08\u30ce\u30fc\u30d2\u30c3\u30c8\uff09"}, {Ta:"win 3 times at tsunomaki janken", Ua:"\u3064\u306e\u307e\u304d\u3058\u3083\u3093\u3051\u3093 \u3067 3\u304b\u3044 \u304b\u3064"}, {Ta:"defeat pekora (no jump)", Ua:"\u3046\u3055\u3060 \u307a\u3053\u3089 \u3092 \u305f\u304a\u3059\uff08\u30b8\u30e3\u30f3\u30d7 \u306a\u3057\uff09"}, {Ta:"clear stage (in under 5 minutes)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff085\u3075\u3093 \u3044\u306a\u3044\uff09"}], 
    [{Ta:"clear stage (no hit from scythes)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff08\u304a\u304a\u304c\u307e \u30d2\u30c3\u30c8 \u306a\u3057\uff09"}, {Ta:"find shion", Ua:"\u3080\u3089\u3055\u304d \u30b7\u30aa\u30f3 \u3092 \u3055\u304c\u3059"}, {Ta:"defeat miko (no charge shot)", Ua:"\u3055\u304f\u3089 \u307f\u3053 \u3092 \u305f\u304a\u3059\uff08\u30c1\u30e3\u30fc\u30b8\u30b7\u30e7\u30c3\u30c8 \u306a\u3057\uff09"}, {Ta:"clear stage (in under 5 minutes)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff085\u3075\u3093 \u3044\u306a\u3044\uff09"}], 
    [{Ta:"find the hidden room", Ua:"\u304b\u304f\u3057\u3079\u3084 \u3092 \u3055\u304c\u3059"}, {Ta:"defeat aqua", Ua:"\u307f\u306a\u3068 \u3042\u304f\u3042 \u3092 \u305f\u304a\u3059"}, {Ta:"clear stage (no hit from rocks)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff08\u304c\u3093\u305b\u304d \u30d2\u30c3\u30c8 \u306a\u3057\uff09"}, {Ta:"clear stage (in under 5 minutes)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff085\u3075\u3093 \u3044\u306a\u3044\uff09"}], 
    [{Ta:"find poyoyo", Ua:"\u307d\u3088\u3088 \u3092 \u3055\u304c\u3059"}, {Ta:"defeat ayame with her own a.t. field", Ua:"at\u30d5\u30a3\u30fc\u30eb\u30c9 \u3067 \u306a\u304d\u308a \u3042\u3084\u3081 \u3092 \u305f\u304a\u3059"}, {Ta:"survive 1 minute in the last room", Ua:"\u3055\u3044\u3054 \u306e \u3078\u3084 \u3067 1\u3075\u3093\u304b\u3093 \u3044\u304d\u306e\u3053\u308b"}, {Ta:"clear stage (in under 5 minutes)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff085\u3075\u3093 \u3044\u306a\u3044\uff09"}], 
    [{Ta:"unlock noel as a playable character", Ua:"\u3057\u308d\u304c\u306d \u30ce\u30a8\u30eb \u3092 \u30a2\u30f3\u30ed\u30c3\u30af"}, {Ta:"bad end", Ua:""}, {Ta:"good end", Ua:""}, {Ta:"clear stage (in under 5 minutes)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff085\u3075\u3093 \u3044\u306a\u3044\uff09"}], [{Ta:"shoot fire bullets underwater", Ua:"\u3059\u3044\u3061\u3085\u3046 \u3067 \u3072\u306e\u305f\u307e \u3092 \u3046\u3064"}, {Ta:"defeat ame while time is slowed down", 
    Ua:"\u3068\u304d \u3092 \u3068\u3081\u3066 \u30a2\u30e1\u30ea\u30a2 \u3092 \u305f\u304a\u3059"}, {Ta:"clear stage (flare only)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff08\u30d5\u30ec\u30a2\u3060\u3051\uff09"}, {Ta:"clear stage (noel only)", Ua:"\u30b9\u30c6\u30fc\u30b8 \u3092 \u30af\u30ea\u30a2\u3059\u308b\uff08\u30ce\u30a8\u30eb\u3060\u3051\uff09"}], [{Ta:"bounce twice without landing", Ua:"\u3058\u3081\u3093 \u306b \u3075\u308c\u305a \u306b 2\u304b\u3044 \u30d0\u30a6\u30f3\u30c9\u3059\u308b"}, 
    {Ta:"defeat kanata (no fall)", Ua:"\u3042\u307e\u306d \u304b\u306a\u305f \u3092 \u305f\u304a\u3059\uff08\u3089\u3063\u304b \u306a\u3057\uff09"}, {Ta:"defeat the secret boss", Ua:"\u30b7\u30fc\u30af\u30ec\u30c3\u30c8\u30dc\u30b9 \u3092 \u305f\u304a\u3059"}, {Ta:"true end", Ua:""}]].forEach((a, d) => {
      if (c.saveData.getItem(`nuinui-save-stage-${d + 1}`)) {
        const e = {label:new Y(Array.from(`stage ${d + 1}`), "center"), od:[]};
        a.forEach(({Ta:g, Ua:h}, l) => {
          e.od.push({Te:new Y(Array.from(g), "left"), Ue:new Y(Array.from(h), "left", "jp"), We:c.saveData.getItem(`nuinui-save-achievement-${4 * d + l + 1}`)});
        });
        this.sb.push(e);
      }
    });
  }
  update(c) {
    this.Z && !c.keys.b ? (this.la--, this.la || (this.K && (this.K.F = 0, this.K.progress = 0), c.Ea = this.K, c.qc.clearRect(0, 0, c.width, c.height))) : c.keys.b ? this.Z = !0 : (this.kb && !c.keys.right && (this.kb = !1), c.keys.right && !this.kb && (this.kb = !0, this.index++, this.index === this.sb.length && (this.index = 0), c.O("menu_move")), this.jb && !c.keys.left && (this.jb = !1), c.keys.left && !this.jb && (this.jb = !0, this.index--, 0 > this.index && (this.index = this.sb.length - 
    1), c.O("menu_move")));
    this.F++;
  }
  pb(c, b) {
    b.save();
    b.globalAlpha = .5;
    b.fillStyle = "#000";
    b.fillRect(0, 0, c.width, c.height);
    b.restore();
    b.fillRect(.5 * c.width - 128, 0, 256, c.height);
    b.fillStyle = "#3F3FBF";
    b.fillRect(.5 * c.width - 128 + 1, 0, 1, c.height);
    b.fillRect(.5 * c.width + 128 - 2, 0, 1, c.height);
  }
  Ya(c, b) {
    b.save();
    this.ra.ca(c, b, new m(.5 * c.width, 8));
    b.save();
    const a = this.sb[this.index];
    a.label.ca(c, b, new m(.5 * c.width, 20));
    1 < this.sb.length && (b.drawImage(c.I.images.ui_arrow, 0, 0, 8, 8, .5 * c.width + 32 - Math.floor(.05 * this.F) % 2, 20, 8, 8), b.save(), b.scale(-1, 1), b.drawImage(c.I.images.ui_arrow, 0, 0, 8, 8, .5 * -c.width + 32 - Math.floor(.05 * this.F) % 2, 20, 8, 8), b.restore());
    b.translate(.5 * c.width - 128, 32);
    const d = b.createLinearGradient(0, 32, 32, 0);
    d.addColorStop(0, "#007FBF");
    d.addColorStop(1, "#7FFFFF");
    a.od.forEach((e, g) => {
      b.filter = e.We ? "none" : "saturate(0)";
      b.fillStyle = "#0F0F3F";
      b.fillRect(42, 4, 204, 24);
      e.Te.ca(c, b, new m(48, 8));
      e.Ue.ca(c, b, new m(48, 17));
      b.fillStyle = d;
      b.fillRect(8, 0, 32, 32);
      b.drawImage(c.I.images.ui_achievements, 32 * g, 32 * this.index, 32, 32, 8, 0, 32, 32);
      b.translate(0, 40);
    });
    b.restore();
    b.restore();
  }
}
;class Tb extends Nb {
  constructor(c, b = null) {
    super();
    this.K = 0;
    this.options = [{id:"sfx", Tb:(a, d) => {
      a.wc = Math.max(0, Math.min(1, Math.round(10 * (a.wc + d)) / 10));
      a.saveData.ve("se", a.wc);
    }}, {id:"bgm", Tb:(a, d) => {
      a.Pb = Math.max(0, Math.min(1, Math.round(10 * (a.Pb + d)) / 10));
      a.saveData.ve("bgm", a.Pb);
      a.Za && a.Za.ye();
    }}, {id:"fullscreen", values:["no", "yes"].map(a => new Y(Array.from(a), "left")), Cb:a => {
      window.K ? window.K.window.Kd.Ke().then(d => {
        window.K.window.Kd.Re(!d);
        a.Rd = !d;
      }) : document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : document.documentElement.requestFullscreen();
    }, Tb:a => {
      window.K ? window.K.window.Kd.Ke().then(d => {
        window.K.window.Kd.Re(!d);
        a.Rd = !d;
      }) : document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : document.documentElement.requestFullscreen();
    }}, {id:"integer scaling", values:["no", "yes"].map(a => new Y(Array.from(a), "left")), Cb:a => {
      a.scale = !a.scale;
      a.resize();
    }, Tb:a => {
      a.scale = !a.scale;
      a.resize();
    }}, {id:"delete save data", Cb:a => a.Ea = new Ob(a, a.Ea, "delete")}, {id:"type", type:"gamepad", values:["a", "b", "c"].map(a => [a, new Y(Array.from(a), "left")]), Tb:(a, d) => {
      0 < d ? "a" === f ? f = "b" : "b" === f ? f = "c" : "c" === f && (f = "a") : "a" === f ? f = "c" : "b" === f ? f = "a" : "c" === f && (f = "b");
    }}];
    this.Ma = b;
    this.options.find(a => "sfx" === a.id).value = c.wc;
    this.options.find(a => "bgm" === a.id).value = c.Pb;
    this.gb = new Y(Array.from("options"), "center");
    Object.entries(ha).forEach(([a, d]) => this.options.push({id:a, value:d, type:"keyboard", Cb:e => la(e, a)}));
    this.options.forEach(a => a.text = new Y(Array.from(a.id), "left"));
  }
  Bc() {
  }
  update(c) {
    if (this.Z && !c.keys.b) {
      this.la--, this.la || (this.Ma && (this.Ma.F = 0, this.Ma.progress = 0), c.Ea = this.Ma, c.qc.clearRect(0, 0, c.width, c.height));
    } else if (c.keys.b && !k) {
      this.Z = !0;
    } else {
      const b = this.options.filter(a => !a.type || a.type === fa);
      this.K >= b.length && (this.K = 0);
      this.ra && !c.keys.Bb && (this.ra = !1);
      c.keys.Bb && !this.ra && (this.ra = !0, this.K++, this.K === b.length && (this.K = 0), c.O("menu_move"));
      this.Ca && !c.keys.Fc && (this.Ca = !1);
      c.keys.Fc && !this.Ca && (this.Ca = !0, this.K--, 0 > this.K && (this.K = b.length - 1), c.O("menu_move"));
      this.jb && !c.keys.left && (this.jb = !1);
      this.kb && !c.keys.right && (this.kb = !1);
      b[this.K].Tb && (c.keys.left && !this.jb && (this.jb = !0, b[this.K].Tb(c, -.1), c.O("select")), c.keys.right && !this.kb && (this.kb = !0, b[this.K].Tb(c, .1), c.O("select")));
      this.ua && !c.keys.a && (this.ua = !1);
      c.keys.a && !this.ua && b[this.K].Cb && (this.ua = !0, b[this.K].Cb(c, .1), c.O("select"));
    }
    this.F++;
  }
  Ya(c, b) {
    b.save();
    this.gb.ca(c, b, new m(.5 * c.width, 8));
    b.translate(.5 * c.width - 96, 24);
    b.save();
    this.options.filter(a => !a.type || a.type === fa).forEach((a, d) => {
      a.text.ca(c, b, new m(16, 0));
      b.save();
      this.K === d && b.drawImage(c.I.images.ui_arrow, 0, 0, 8, 8, 8 - Math.floor(.05 * this.F) % 2, 0, 8, 8);
      b.translate(16, 0);
      switch(a.id) {
        case "sfx":
        case "bgm":
          const e = c[`${"sfx" === a.id ? "se" : "bgm"}Volume`];
          b.save();
          b.fillStyle = "#FFF";
          b.translate(96, 0);
          for (let g = 0; 10 >= g; g++) {
            const h = g / 10;
            e === h ? b.fillRect(6 * g, 0, 3, 7) : e <= h ? b.fillRect(6 * g + 1, 3, 1, 1) : b.fillRect(6 * g, 2, 3, 3);
          }
          b.restore();
          break;
        case "integer scaling":
        case "fullscreen":
          a.values[c["integer scaling" === a.id ? "scale" : a.id] ? 1 : 0].ca(c, b, new m(96, 0));
          break;
        case "left":
        case "right":
        case "up":
        case "down":
        case "l":
        case "r":
        case "a":
        case "b":
        case "c":
        case "start":
          a.value && (new Y(Array.from(a.value.toLowerCase()), "left")).ca(c, b, new m(96, 0));
          break;
        case "type":
          (new Y(Array.from(f), "left")).ca(c, b, new m(96, 0)), b.drawImage(c.I.images[`opt_type_${f}`], 0, 0, 110, 32, 24, 16, 110, 32);
      }
      b.restore();
      b.translate(0, "keyboard" === a.type ? 8 : 12);
      [1, 3, 4].includes(d) && b.translate(0, 8);
    });
    b.restore();
    b.restore();
  }
}
;function Ub(c, b) {
  0 > c.ec && (c.ec = c.Ma.length - 1);
  c.ec === c.Ma.length && (c.ec = 0);
  b.mode = c.Ma[c.ec];
  c = "noel" === b.mode ? W : H;
  const a = b.B.D.find(d => d instanceof H);
  b.B.D = b.B.D.filter(d => d !== a);
  c = new c(b, a.A, a.size);
  c.ia("idle");
  c.Y = !0;
  c.C = a.C;
  c.dir = a.dir;
  c.ga = a.ga;
  c.xa = a.xa;
  c.G = a.G;
  c.Ga = a.Ga;
  c.Ia = a.Ia;
  c.Rb = a.Rb;
  b.B.D.push(c);
  b.B.view.target = c;
  b.B.ee && "noel" === b.mode && (b.B.ee = !1);
  b.B.fe && "noel" !== b.mode && (b.B.fe = !1);
}
class Vb extends Nb {
  constructor(c) {
    super();
    this.progress = this.K = 0;
    this.ua = !0;
    this.options = [{id:"stage select", Cb:b => b.Ea = new Rb(b, !1, b.Ea)}, {id:"achievements", Cb:b => b.Ea = new Sb(b, b.Ea)}, {id:"game mode", values:["flare", "noel", "cursed"].map(b => new Y(Array.from(b), "left")), Cb:b => {
      b.Ea.ec++;
      Ub(b.Ea, b);
    }, Tb:(b, a) => {
      b.Ea.ec += 0 < a ? 1 : -1;
      Ub(b.Ea, b);
    }}, {id:"options", Cb:b => b.Ea = new Tb(b, b.Ea)}, {id:"save", Cb:b => b.Ea = new Ob(b, b.Ea, "save")}, {id:"load", Cb:b => b.Ea = new Ob(b, b.Ea, "load")}, {id:"return to title", Cb:() => location.reload()}];
    this.options.forEach(b => b.text = new Y(Array.from(b.id), "left"));
    c.saveData.getItem("nuinui-save-item-noel") || (this.options = this.options.filter(b => "game mode" !== b.id));
    this.Bc(c);
  }
  Bc(c) {
    this.Bd = [];
    this.nc = new Y(Array.from("skills"), "right");
    "fire rocket petal sword shield dual".split(" ").forEach(a => this.Bd.push(c.saveData.getItem(`nuinui-save-item-${a}`)));
    this.keys = [];
    this.mc = new Y(Array.from("keys"), "right");
    for (var b = 0; 5 > b; b++) {
      this.keys.push(c.saveData.getItem(`nuinui-save-item-key${b}`));
    }
    this.gb = 0;
    for (b = 1; 28 >= b; b++) {
      c.saveData.getItem(`nuinui-save-achievement-${b}`) && this.gb++;
    }
    c.saveData.getItem("nuinui-save-item-bow") || 28 !== this.gb || c.saveData.setItem("nuinui-save-item-bow", !0);
    this.Ib = new Y(Array.from(`${this.gb}/28`), "left");
    this.items = [];
    this.Nb = new Y(Array.from("items"), "right");
    ["gun", "clock", "jump", "boots", "bow"].forEach(a => this.items.push(c.saveData.getItem(`nuinui-save-item-${a}`)));
    this.Ma = ["flare"];
    c.saveData.getItem("nuinui-save-item-noel") && this.Ma.push("noel");
    c.saveData.getItem("nuinui-save-item-bow") && this.Ma.push("cursed");
    this.ec = "cursed" === c.mode ? 2 : "noel" === c.mode ? 1 : 0;
  }
  update(c) {
    if (this.Z && !c.keys.b) {
      this.la--, this.la || (c.Ea = null, c.qc.clearRect(0, 0, c.width, c.height));
    } else if (c.keys.b) {
      this.Z = !0;
    } else {
      const b = this.options.filter(a => !a.type || a.type === fa);
      this.K >= b.length && (this.K = 0);
      this.ra && !c.keys.Bb && (this.ra = !1);
      c.keys.Bb && !this.ra && (this.ra = !0, this.K++, this.K === b.length && (this.K = 0), c.O("menu_move"));
      this.Ca && !c.keys.Fc && (this.Ca = !1);
      c.keys.Fc && !this.Ca && (this.Ca = !0, this.K--, 0 > this.K && (this.K = b.length - 1), c.O("menu_move"));
      this.jb && !c.keys.left && (this.jb = !1);
      this.kb && !c.keys.right && (this.kb = !1);
      b[this.K].Tb && (c.keys.left && !this.jb && (this.jb = !0, b[this.K].Tb(c, -.1), c.O("select")), c.keys.right && !this.kb && (this.kb = !0, b[this.K].Tb(c, .1), c.O("select")));
      this.ua && !c.keys.a && (this.ua = !1);
      c.keys.a && !this.ua && b[this.K].Cb && (this.ua = !0, b[this.K].Cb(c, .1), c.O("select"));
    }
    this.progress = Math.min(1, .05 * this.F);
    this.F++;
  }
  Ya(c, b) {
    b.save();
    b.translate(.5 * c.width - 96, 12);
    this.options.filter(a => !a.type || a.type === fa).forEach((a, d) => {
      a.text.ca(c, b, new m(16, 0));
      b.save();
      this.K === d && b.drawImage(c.I.images.ui_arrow, 0, 0, 8, 8, 8 - Math.floor(.05 * this.F) % 2, 0, 8, 8);
      b.translate(16, 0);
      switch(a.id) {
        case "game mode":
          a.values[this.ec].ca(c, b, new m(96, 0));
          break;
        case "achievements":
          this.Ib.ca(c, b, new m(96, 0));
      }
      b.restore();
      b.translate(0, 10);
    });
    b.restore();
    b.save();
    b.translate(.5 * c.width - 51 - 16, c.height - 92);
    b.fillStyle = "#3F3FBF";
    b.fillRect(-5, -5, 102, 22);
    b.fillStyle = "#0F0F3F";
    b.fillRect(-4, -4, 100, 20);
    this.Nb.ca(c, b, new m(96, -12));
    this.items.forEach((a, d) => {
      a && (a = Math.min(1, Math.max(0, this.progress - .1 * (10 * (d + 1) - this.F))), b.globalAlpha = a, b.drawImage(c.I.images.ui_items, 20 * d, 0, 20, 20, 20 * d + 4 - Math.round(8 * (1 - Math.pow(2, -10 * a))), -4, 20, 20));
    });
    b.restore();
    b.save();
    b.translate(.5 * c.width - 51 - 16, c.height - 60);
    b.fillStyle = "#3F3FBF";
    b.fillRect(-5, -5, 102, 22);
    b.fillStyle = "#0F0F3F";
    b.fillRect(-4, -4, 100, 20);
    this.nc.ca(c, b, new m(96, -12));
    this.Bd.forEach((a, d) => {
      a && (a = Math.min(1, Math.max(0, this.progress - .1 * (6 * (d + 1) - this.F))), b.globalAlpha = a, b.drawImage(c.I.images.ui_charge_type, 12 * d, 0, 12, 12, 16 * d + 8 - Math.round(8 * (1 - Math.pow(2, -10 * a))), 0, 12, 12));
    });
    b.restore();
    b.save();
    b.translate(.5 * c.width - 51 - 16, c.height - 28);
    b.fillStyle = "#3F3FBF";
    b.fillRect(-5, -5, 102, 22);
    b.fillStyle = "#0F0F3F";
    b.fillRect(-4, -4, 100, 20);
    this.mc.ca(c, b, new m(96, -12));
    this.keys.forEach((a, d) => {
      a && (a = Math.min(1, Math.max(0, this.progress - .1 * (8 * (d + 1) - this.F))), b.globalAlpha = a, b.drawImage(c.I.images.sp_key, 16 * d, 0, 16, 16, 20 * d + 6 - Math.round(8 * (1 - Math.pow(2, -10 * a))), -2, 16, 16));
    });
    b.restore();
    b.save();
    b.globalAlpha = this.progress;
    b.drawImage(c.I.images.ui_flare, 0, 0, 128, 144, c.width - 96 - Math.round(48 * (1 - Math.pow(2, -10 * this.progress))), c.height - 144, 128, 144);
    b.restore();
  }
}
;function Cb(c) {
  c.Nd.style.filter = "none";
  c.Od.style.filter = "none";
  c.va();
  c.B.te = new Wb(c, c.data.me.sb[c.Da]);
  c.U = 0;
  c.hd = 0;
}
function Eb(c, b) {
  c.Y && b.keys.start && (b.O("select"), b.Ea = new Vb(b));
}
function Xb(c) {
  c.saveData.setItem("nuinui-save-stage-5", !0);
  c.Ea = new Rb(c, !0);
  c.pc = null;
  c.U += 40000;
  60000 <= (new Date()).getTime() - c.B.ue && c.saveData.setItem("nuinui-save-achievement-15", !0);
  const b = (new Date()).getTime() - c.yb.getTime();
  420000 >= b && c.saveData.setItem("nuinui-save-achievement-16", !0);
  c.U += Math.max(0, 420000 - b);
}
class H extends G {
  constructor(c, b, a) {
    super(b, a);
    this.C = new m(0, 0);
    this.nd = 4;
    this.de = new m(0.8, 1);
    this.Ba = .3;
    this.ba = this.dir = !0;
    this.le = 360;
    this.sc = 0;
    this.dc = 360;
    this.Y = !1;
    this.ga = !0;
    this.pb = !1;
    this.la = 0;
    this.Ic = this.yc = this.item = this.Ub = !1;
    this.Fe = !0;
    this.K = 0;
    this.md = !1;
    this.rd = 0;
    this.Xa = [];
    this.Dd = {Kc:{ld:5, Rc:"charge_fire"}, yf:{ld:2, Rc:"charge_fire_2"}, Yd:{ld:3, Rc:"charge_fire_3"}, Df:{ld:2.5, Rc:"charge_fire_4"}, Af:{Rc:"charge"}, pf:{Rc:"charge"}};
    this.da = 16;
    this.Ca = {uf:{offset:new m(-8, -6), size:new m(32, 40), speed:1, frames:1}, Bf:{offset:new m(-8, -6), size:new m(32, 40), speed:1, frames:1}, vf:{offset:new m(-8, -6), size:new m(32, 40), speed:1, frames:1}, ic:{offset:new m(-8, 3), size:new m(40, 32), speed:.04, frames:4}, Ef:{offset:new m(-8, 3), size:new m(40, 32), speed:.1, frames:4}, $b:{offset:new m(-30, -18), size:new m(64, 64), speed:.3, frames:10}, zf:{offset:new m(-30, -18), size:new m(64, 64), speed:.3, frames:10}, Vd:{offset:new m(-10, 
    -6), size:new m(32, 40), speed:1, frames:1}, qf:{offset:new m(-10, -6), size:new m(32, 40), speed:1, frames:1}, kf:{offset:new m(-9, -6), size:new m(32, 40), speed:.25, frames:3}, mf:{offset:new m(-9, -6), size:new m(32, 40), speed:.25, frames:3}, lf:{offset:new m(-9, -6), size:new m(32, 40), speed:.25, frames:3}, attack:{offset:new m(-42, -5), size:new m(64, 40), speed:1, frames:1}, hf:{offset:new m(-42, -5), size:new m(64, 40), speed:1, frames:1}, rf:{offset:new m(-9, -6), size:new m(40, 40), 
    speed:.25, frames:3}, tf:{offset:new m(-9, -6), size:new m(40, 40), speed:.25, frames:3}, sf:{offset:new m(-9, -6), size:new m(40, 40), speed:.25, frames:3}, Cf:{offset:new m(0, -11), size:new m(32, 32), speed:1, frames:1}, Ga:{offset:new m(-8, -8), size:new m(32, 40), speed:1, frames:1}, Ia:{offset:new m(-16, -16), size:new m(48, 48), speed:1, frames:1}, Mc:{offset:new m(-10, -6), size:new m(32, 40), speed:1, frames:1}, back:{offset:new m(-24, -6), size:new m(44, 40), speed:1, frames:1}};
    this.G = this.da;
    this.qb = 0;
    "cursed" !== c.mode && c.saveData.getItem("nuinui-save-item-gun") && (this.lb = "gun");
    "cursed" === c.mode && c.saveData.getItem("nuinui-save-item-bow") && (this.lb = "bow");
    this.lb && (this.Ub = !0);
    this.Xa = [];
    "fire rocket petal sword shield dual".split(" ").forEach(d => {
      c.saveData.getItem(`nuinui-save-item-${d}`) && this.Xa.push(d);
    });
    c.saveData.getItem("nuinui-save-item-clock") && (this.item = !0);
    c.saveData.getItem("nuinui-save-item-jump") && (this.yc = !0);
    c.saveData.getItem("nuinui-save-item-boots") && (this.Ic = !0);
  }
  update(c) {
    const b = this.Y ? c.keys : c.Fa, a = this.Ia || this.xa || b.left === b.right ? 0 : .35 * (b.right ? 1 : -1);
    var d = [...c.B.P.L];
    c.B.D.find(() => !1) && d.push(...c.B.D.filter(() => !1));
    if (1 < this.F && this.Y && t(this, d.filter(n => !n.ta && !0)).length) {
      Cb(c);
    } else if (t(this, d.filter(n => n.ta)).length) {
      var e = d.filter(n => n.ta).find(n => r(this, n));
      e.Kb ? this.A.x-- : this.A.y = e.A.y + 8 > this.A.y + .5 * this.size.y ? e.A.y - this.size.y : e.A.y + 16;
    }
    var g = this.ga;
    this.ga = d.find(n => v({A:{x:this.A.x, y:this.A.y + this.size.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    var h = d.find(n => v({A:{x:this.A.x, y:this.A.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    if (!(this.Ia || this.Ga || this.xa || this.ra) && this.ga && b.a && b.Bb) {
      this.C.x = this.nd * (this.dir ? 1 : -1), this.ra = this.xa = !0, this.A.y += 16, this.size.y = 16, c.B.J.$b(this, this.dir), c.O("dash");
    } else {
      if (!this.xa && !b.a || this.xa && this.ra && !b.a) {
        this.ra = !1;
      }
      if (this.xa && (!this.ga || 1.73 > Math.abs(this.C.x))) {
        if (this.ga && h) {
          this.C.x += this.dir ? 1 : -1;
        } else {
          if (this.xa = !1, this.size.y = 32, !this.ga !== !h) {
            this.A.y -= 16;
          } else {
            for (this.A.y = this.A.round(16).y; t(this, d).length;) {
              this.A.y--;
            }
          }
        }
      }
    }
    this.ga = d.find(n => v({A:{x:this.A.x, y:this.A.y + this.size.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    h = d.find(n => v({A:{x:this.A.x, y:this.A.y}, size:{x:this.size.x, y:0}}, n, "y") && q(this, n, "x"));
    e = null;
    if (this.Ic && !this.ga && 1 < this.C.y) {
      const n = {A:{x:this.A.x, y:this.A.y + .5 * this.size.y}, size:{x:this.size.x, y:.5 * this.size.y}};
      (e = d.find(C => v(n, C, "x") && q(n, C, "y"))) && 16 !== e.size.y && (e = null);
      e && 2 < this.C.y && (this.C.y -= .5, z(c.B.J, this.A.S(new m(this.size.x * (this.dir ? 1 : 0), this.size.y)), new m(0, 0), 0));
    }
    this.Yc = !1;
    this.Ib && !b.a && (this.Ib = !1);
    !(this.ga && !this.C.y || this.yc && !this.Rb || e) || !b.a || this.Ib || this.ra || h || b.Bb && this.ra || (this.ga || (this.Rb = !0), this.la = this.ga ? 2.4 : 2, this.pb = this.Yc = this.Ib = !0, c.B.$c && (c.B.$c = !1), this.xa && (this.xa = !1, this.C.x += 4.8 * (this.dir ? 1 : -1), this.A.y -= 16, this.size.y = 32), e && (c.O("land"), this.C.x = 4 * (this.dir ? -1 : 1), this.dir = !this.dir, F(c.B.J, p(e)), E(c.B.J, p(e))));
    this.pb && b.a ? (this.Rb && (this.C.y = 2 * -this.la, this.pb = !1), this.C.y -= this.la, this.la /= 1.5) : this.pb = !1;
    !g && this.ga && (this.gd ? this.gd = !1 : this.Ia || this.Ga || (c.O("land"), pa(c.B.J, this)), this.Rb = !1);
    this.xa && b.left !== b.right && (this.C.x = Math.abs(this.C.x) * (b.right ? 1 : -1));
    this.dir = this.Ga || this.Ia || b.left === b.right ? this.dir : b.right;
    g = c.B.tc ? .25 * (c.B.sd ? 1 : -1) : 0;
    this.C = this.C.K(this.xa ? new m(0.96, 1) : this.de);
    .05 > this.C.x && -0.05 < this.C.x && (this.C.x = 0);
    this.C.x = Math.round(100 * (this.C.x + a + g)) / 100;
    this.C.y = Math.min(6, Math.round(100 * (this.C.y + this.Ba)) / 100);
    c.B.lc && 2 < this.C.y && (this.C.y = 2);
    this.C = new m(Math.max(-8, Math.min(8, this.C.x)), Math.max(-8, Math.min(8, this.C.y)));
    if (t({A:new m(this.A.x + this.C.x, this.A.y), size:this.size}, d).length) {
      this.A.x = Math.round(this.A.x);
      for (g = 0; !t({A:new m(this.A.x + Math.sign(this.C.x), this.A.y), size:this.size}, d).length;) {
        if (this.A.x += Math.sign(this.C.x), 10 < g) {
          this.A.x++;
          break;
        } else {
          g++;
        }
      }
      this.xa && (this.xa = !1, this.A.y -= 16, this.size.y = 32);
      this.C.x = 0;
    }
    this.A.x = Math.round(100 * (this.A.x + this.C.x)) / 100;
    if (t({A:new m(this.A.x, this.A.y + this.C.y), size:this.size}, d).length) {
      for (this.A.y = Math.round(this.A.y); !t({A:new m(this.A.x, this.A.y + Math.sign(this.C.y)), size:this.size}, d).length;) {
        this.A.y += Math.sign(this.C.y);
      }
      this.C.y = 0;
    }
    this.A.y = Math.round(100 * (this.A.y + this.C.y)) / 100;
    !this.ga || this.xa || this.Ga || this.Ia || !a || !this.C.x || this.C.y || (a !== this.Fd ? c.B.J.$b(this, this.dir) : 15 === this.pa % 16 && (c.O("step"), c.B.J.step(this)));
    this.Yc && this.C.y && !this.Ga && !e && c.B.J.Vd(this);
    this.Ia || this.Ga || b.xd === b.r || this.md || (this.qb += b.xd ? -1 : 1, 0 > this.qb && (this.qb = this.Xa.length - 1), this.qb === this.Xa.length && (this.qb = 0), this.md = !0, this.rd = 60);
    b.xd || b.r || !this.md || (this.md = !1);
    this.rd && this.rd--;
    e = !1;
    if (!this.Ia && !this.Ga) {
      b.b && this.K++;
      if (30 < this.K && !(this.F % 4)) {
        c.B.J[this.Dd[this.Xa[this.qb]].Rc](p(this));
      }
      45 < this.K && (b.b || (e = !0));
      !b.b && this.K && (this.K = 0);
    }
    d = b.b || e;
    this.Ya && !b.b && (this.Ya = !1);
    this.Z && this.Z--;
    this.Ma && this.Ma--;
    if (d = this.Ub && d && (this.Ga || !this.Ya) && !this.Z && !this.xa) {
      if (e && "dual" === this.Xa[this.qb]) {
        g = new O(this.A, new m(64, 32), new m(0, 0), "dual", this), g.ba = !0, g.dir = this.dir, c.B.D.push(g);
      } else if (e && "shield" === this.Xa[this.qb]) {
        for (c.B.D = c.B.D.filter(n => !(n instanceof Ib && n.za === this)), g = 0; 6 > g; g++) {
          c.B.D.push(new Ib(p(this), 2 * Math.PI / 6 * g, this));
        }
      } else if (e && "petal" === this.Xa[this.qb]) {
        for (g = 0; 4 > g; g++) {
          h = Math.PI / 8 * g - 1.5 * Math.PI / 8, c.B.D.push(new O(this.A.S(new m(0, 8)), new m(8, 8), (new m(Math.cos(h) * (this.dir ? 1 : -1), Math.sin(h))).ka(this.Dd[this.Xa[this.qb]].ld), "petal", this));
        }
      } else {
        g = e ? this.Dd[this.Xa[this.qb]].ld : 5, this.Ga ? (h = this.Ga ? 1 : .5 * this.C.x, c.B.D.push(new O(this.A.S(new m(this.Ia ? this.size.x : -16, 22)), new m(20, 7), new m(g * h * (this.dir ? 1 : -1), .5 * Math.cos(2 * this.F)), "bullet", this)), c.B.D.push(new O(this.A.S(new m(this.Ia ? this.size.x : -16, 22)), new m(20, 7), new m(g * h * (this.dir ? 1 : -1), .5 * -Math.cos(2 * this.F)), "bullet", this))) : this.Ia ? (g = new O(this.A.S(new m(this.Ia ? this.size.x : -16, 16)), new m(20, 
        7), new m(0, 0), "rocket", this), g.C.x = this.C.x + 2, c.B.D.push(g)) : ("bow" !== this.lb && (this.Xc = !this.Xc), g = new O(this.A.S(new m("gun" === this.lb ? 8 * (this.dir ? 1 : -1) : 0, "gun" === this.lb && this.Xc ? 12 : 8)), new m(20, 7), new m(g * (this.dir ? 1 : -1) * ("gun" === this.lb ? 1.1 : 1), 0), e ? this.Xa[this.qb] : null, this), c.B.D.push(g));
      }
      "dual" === this.Xa[this.qb] && e || c.O(this.Ga || this.Ia ? "pew" : "bow" === this.lb ? "bow_shoot" : "gun");
      this.Ya = !0;
      this.Z = e ? 36 : this.Ga ? 9 : "gun" === this.lb ? 9 : 12;
      this.Ma = 12;
      this.mc = 0;
    }
    !this.Ga || !this.ga || this.F % 6 || 2 !== c.Da || qa(c.B.J, this);
    this.Ga && 2 === c.Da && z(c.B.J, this.A.S(new m(this.size.x, this.size.y - 8)), new m(4, 0), 0);
    this.Ia && z(c.B.J, this.A.S(new m(0, this.size.y - 8)), new m(-4, 0), 0);
    e = c.B.D.filter(n => [M, I, N, Qa, Ra, Fa, Ga, Sa, Ha, Ta, P, Ua, Va, Wa, Q, S, fb, Ka, La, Ma, gb, hb, Ja, T, kb, ib, nb, lb, ob, pb, U, qb, rb, V, Db, tb, ub, vb, yb, Ab, Bb, zb].some(C => n instanceof C) && n.R(c, this));
    e.length && e.forEach(n => this.oa(c, n));
    this.Ed && (c.B.wa || Xb(c));
    if (this.Td || "bow" === this.lb) {
      for (3 === c.Da && .95 < Math.random() && (this.aa = 2), e = 0; 2 > e; e++) {
        B(c.B.J, p(this).S(new m(16 * Math.random() - 8, 32 * Math.random() - 16)), new m(Math.random() - .5, -2 * Math.random()), 0);
      }
    }
    !c.B.lc || this.F % 32 || sa(c.B.J, this.A.S(new m(6 * Math.random() - 3 + (this.dir ? this.size.x : 0), 8)), new m(0, -.5 - .5 * Math.random()), 1);
    let l;
    !this.Ma || this.xa ? l = this.ga ? this.xa ? "slide" : b.left !== b.right ? "run" : "idle" : .6 >= this.C.y ? "jump" : "fall" : d && (l = this.ga ? 0 === this.C.x || "bow" === this.lb ? this.lb : "run_attack" : 0 < this.C.y ? `${this.lb}_fall` : `${this.lb}_jump`);
    this.Ga && (l = "jetski");
    this.Ia && (l = "moto");
    "run_attack" === this.animation && this.mc++;
    l && !this.hb && l !== this.animation ? this.ia(l) : this.pa++;
    0 < this.C.y && (this.la = 0);
    this.Fd = a;
    this.$ && this.$--;
    this.sc && !c.B.na && this.sc--;
    Eb(this, c);
    this.F++;
  }
  oa(c, b) {
    if (!(this.xa || b instanceof M && b.ic || b instanceof T && b.Nc) && this.Y && !b.$) {
      if (this.Ia) {
        var a = c.B.rb.find(d => d.speed);
        a.speed = Math.max(2.5, a.speed - .05);
      }
      this.$ || this.Ed || (c.B.Zc && (c.B.Zc = !1), c.B.xc && (c.B.xc = !1), c.B.ad && b instanceof Ha && (c.B.ad = !1), b.za instanceof P && 4 === c.Da ? c.O("question") : c.O("damage"), a = b.V ? b.V : 1, b.za instanceof P && 4 === c.Da || (this.G = Math.max(0, this.G - a), this.$ = 45), this.K = 0, c.B.aa = 8, b instanceof Ha || b instanceof Ua || b instanceof S && b.K && !b.C.x ? (F(c.B.J, b.R(c, this).A), E(c.B.J, b.R(c, this).A)) : (F(c.B.J, this.R(c, b).A), E(c.B.J, this.R(c, b).A)), this.C.x += 
      4 * (this.dir ? -1 : 1), -2 < this.C.y && (this.C.y -= 2));
      this.G && "cursed" !== c.mode || this.Ed || (c.B.D.find(d => d instanceof T) ? (this.Ed = !0, this.$ = 0, this.Y = !1, this.ia("hit"), this.hb = !0, c.O("level_start"), c.B.wa = 60, c.B.na = 0, c.B.Sa = !1, this.C.y = -6, c.va()) : Cb(c));
    }
  }
  ia(c) {
    "run_attack" === c && "run" === this.animation || "run" === c && "run_attack" === this.animation || (this.pa = 0);
    this.animation = c;
    this.Nb = "run" === this.animation && this.Nb || "run_attack" === this.animation;
  }
  Gd(c, b) {
    const {offset:a, size:d, speed:e, frames:g} = this.Ca[this.animation];
    if (!["sleep", "wakeup", "back"].includes(this.animation)) {
      var h = "run" !== this.animation || this.C.x ? this.C.x : 2, l = Math.round(h) || [this.lb, `${this.lb}_fall`, `${this.lb}_jump`, "moto"].includes(this.animation);
      h = Math.round(16 / (1 + Math.abs(h)));
      var n = this.C.y > this.Ba ? -2 : 0;
      b.drawImage(c.I.images.sp_ponytail, Math.floor(this.pa / h) % 3 * 24, l ? 24 : 0, 24, 24, this.Ga || this.Ia ? -14 : l ? -18 + (this.xa ? 4 : 0) : -14, 2 + n, 24, 24);
      b.drawImage(c.I.images.sp_ribbon, Math.floor(this.pa / h * 1.5) % 3 * 16, l ? 16 : 0, 16, 16, l ? ["run", "run_attack"].includes(this.animation) ? -14 : -9 : -8, (l ? 16 : 18) + 2 * n, 16, 16);
      ["run", "run_attack"].includes(this.animation) || (b.save(), b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.drawImage(c.I.images.sp_ribbon, Math.floor(this.pa / h * 1.5) % 3 * 16, l ? 16 : 0, 16, 16, l ? ["run", "run_attack"].includes(this.animation) ? -12 : -9 : -8, (l ? 16 : 18) + n, 16, 16), b.restore());
    }
    "back" === this.animation && b.translate(16, 0);
    h = ["gun", "gun_fall", "gun_jump"].includes(this.animation) && this.Xc ? 40 : 0;
    l = Math.floor(this.pa * e) % g;
    if ("run_attack" === this.animation && 12 > this.mc || this.Nb) {
      n = this.Ca.gun.size;
      const C = this.Ca.gun.offset.S(new m([0, 1, 2, 6, 7].includes(l) ? 1 : 3 < [3, 4, 8].includes(l) ? 0 : 1, [0, 1, 2, 6, 7].includes(l) ? 1 : 3 < [3, 4, 8].includes(l) ? 0 : -1));
      b.drawImage(c.I.images.sp_flare_gun_arms_back, Math.floor(this.mc * this.Ca.gun.speed) % this.Ca.gun.frames * n.x, this.Xc || "run" === this.animation && this.Nb ? 40 : 0, n.x, n.y, C.x, C.y, n.x, n.y);
    }
    b.drawImage(c.I.images[`sp_flare_${"run" === this.animation && this.Nb ? "run_attack" : this.animation}`], l * d.x, h, d.x, d.y, a.x, a.y, d.x, d.y);
    if ("run_attack" === this.animation && 12 > this.mc || this.Nb) {
      h = this.Ca.gun.size, l = this.Ca.gun.offset.S(new m([0, 1, 2, 6, 7].includes(l) ? -1 : 3 < [3, 4, 8].includes(l) ? 0 : -1, [0, 1, 2, 6, 7].includes(l) ? -1 : 3 < [3, 4, 8].includes(l) ? 0 : 1)), b.drawImage(c.I.images.sp_flare_gun_arms, Math.floor(this.mc * this.Ca.gun.speed) % this.Ca.gun.frames * h.x, !this.Xc || "run" === this.animation && this.Nb ? 0 : 40, h.x, h.y, l.x, l.y, h.x, h.y);
    }
  }
  ca(c, b) {
    this.$ % 2 || (b.save(), 45 < this.K && Math.floor(this.F / 4) % 2 && (b.filter = "brightness(2)"), b.translate(Math.round(this.A.x), Math.round(this.A.y)), this.dir || (b.translate(this.size.x / 2, 0), b.scale(-1, 1), b.translate(-this.size.x / 2, 0)), this.ga && this.Ga && b.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(this.F / 4)))), this.Ia && (b.translate(0, Math.floor(this.F / 4) % 2), this.ga || b.rotate(.05 * this.C.y)), this.Gd(c, b), (this.Ga || this.Ia && this.Z) && 
    this.Ya && b.drawImage(c.I.images.vfx_rapid_fire, Math.floor(this.F / 2) % 2 * 24, 0, 24, 24, 24, 12, 24, 24), b.restore());
  }
}
;var Zb = {forest:{"0_0":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (b.ua = !0, b.ke = Object.keys(globalThis.localStorage).find(d => ["nuinui-save-0", "nuinui-save-1", "nuinui-save-2"].includes(d)), "noel" === c.mode ? (b.ha = new W(c, new m(160, 48), new m(16, 32)), b.ha.ia("idle")) : (b.ha = new H(c, new m(160, 48), new m(16, 32), c.mode), b.ha.ia("sleep")), b.ha.hb = !0, a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "right"), b.hc = 0, b.Me = ["new game", "continue", "options", "credits"].map(d => new Y(Array.from(d), 
  "center")), c.Vc && c.O("stage_clear"));
  if (c.saveData.getItem("nuinui-save-stage-1")) {
    if (c.keys.a && !b.ua && (b.next = !0, c.Vc && (c.Vc = !1)), Math.floor(.05 * b.F) % 2 || c.Vc) {
      c.Vc && (b.H % 8 || ya(c.B.J, a.view.A.S(new m(Math.floor(Math.random() * c.width), Math.floor(Math.random() * c.height))), new m(2 + 2 * Math.random(), 4), 0)), a.ja.push(d => {
        d.Vc ? d.X.drawImage(d.I.images.sp_thanks, 0, 0) : b.text.ca(d, d.X, new m(d.width - 12, d.height - 16));
      });
    }
  } else {
    b.kb && !c.keys.right && (b.kb = !1);
    c.keys.right && !b.kb && (b.kb = !0, b.hc++, 3 < b.hc && (b.hc = 0), c.O("menu_move"));
    b.jb && !c.keys.left && (b.jb = !1);
    c.keys.left && !b.jb && (b.jb = !0, b.hc--, 0 > b.hc && (b.hc = 3), c.O("menu_move"));
    b.ua && !c.keys.a && (b.ua = !1);
    if (c.keys.a && !b.ua) {
      switch(b.ua = !0, c.O("select"), b.hc) {
        case 0:
          c.saveData.setItem("nuinui-save-item-fire", !0);
          b.ha.Xa.push("fire");
          c.saveData.setItem("nuinui-save-stage-1", !0);
          b.se = !0;
          b.next = !0;
          break;
        case 1:
          b.ke && (c.Ea = new Ob(c, c.Ea, "load"));
          break;
        case 2:
          c.Ea = new Tb(c);
          break;
        case 3:
          c.Ea = new Pb();
      }
    }
    a.ja.push(d => {
      d.X.save();
      [56, 58, 59].includes(Math.floor(a.F / 4) % 60) && (d.X.filter = "brightness(2)");
      d.X.drawImage(d.I.images.ui_title, 64, 80);
      d.X.restore();
      d.X.save();
      d.X.translate(.5 * d.width, d.height - 16);
      d.X.drawImage(d.I.images.ui_menu_title, 0, 0, 80, 16, -40, -8, 80, 16);
      d.X.save();
      1 !== b.hc || b.ke || (d.X.globalAlpha = .5);
      b.Me[b.hc].ca(d, d.X, new m(0, -4));
      d.X.restore();
      const e = Math.floor(.05 * a.F % 2);
      d.X.drawImage(d.I.images.ui_arrow, 0, 0, 4, 7, 28 + e, -4, 4, 7);
      d.X.scale(-1, 1);
      d.X.drawImage(d.I.images.ui_arrow, 0, 0, 4, 7, 28 + e, -4, 4, 7);
      d.X.restore();
    });
  }
}, (c, b) => {
  const a = c.B, d = b.H;
  switch(d) {
    case 30:
      b.se ? (a.aa = 30, c.O("explosion")) : (b.ha.ia("wakeup"), c.O("question"));
      break;
    case 69:
      b.se || (b.ha.ia("idle"), b.H = 579);
      break;
    case 330:
      b.ha.ia("idle");
      c.O("explosion");
      break;
    case 600:
      b.ha.dir = !1;
      break;
    case 630:
      b.ha.dir = !0;
      break;
    case 860:
      c.Va(), b.ha.ia("idle"), b.ha.Y = !0, b.ha.hb = !1, b.end = !0, a.Sb = !0, c.Aa("smile_&_go_slow", !0), c.yb = new Date();
  }
  480 > d && (150 < d && c.B.ja.push(e => {
    const g = e.X;
    g.save();
    330 < d && 350 > d && g.translate(Math.floor(4 * Math.random() - 2), 0);
    g.drawImage(e.I.images.bg_intro1, 0, 0);
    g.drawImage(e.I.images.bg_intro2, 0, 0);
    330 < d ? g.drawImage(e.I.images.bg_shikemura, 144, 0) : g.drawImage(e.I.images.bg_shiraken, 144, 0);
    330 < d && 350 > d && g.translate(Math.floor(4 * Math.random() - 2), 0);
    g.drawImage(e.I.images.ms_flare, 340 > d ? 0 : 100, 0, 100, 128, 0, e.height - 128, 100, 128);
    g.restore();
  }), 180 < d && c.B.ja.push(e => {
    const g = Math.min(1, (d - 120 - 120) / 30), h = e.X;
    h.save();
    330 < d && 350 > d && h.translate(Math.floor(4 * Math.random() - 2), 0);
    h.drawImage(e.I.images.ms_miko, 0, 0, 128, 128, 9 + e.width - 128, e.height - 128 * g, 128, 128);
    h.restore();
  }), 300 < d && c.B.ja.push(e => {
    const g = Math.min(1, (d - 120 - 180) / 30), h = e.X;
    h.save();
    h.drawImage(e.I.images.bg_intro3, 0, -(e.height * (1 - g)));
    h.restore();
  }));
  120 <= d && 150 > d && c.B.ja.push(e => {
    const g = (d - 120) / 15, h = e.X;
    h.save();
    h.fillStyle = "#000";
    h.fillRect(0, e.height, e.width, -e.height * g);
    h.restore();
  });
  150 <= d && 165 > d && c.B.ja.push(e => {
    const g = (d - 150) / 15, h = e.X;
    h.save();
    h.fillStyle = "#000";
    h.fillRect(0, 0, e.width, e.height * (1 - g));
    h.restore();
  });
  450 <= d && 480 > d && c.B.ja.push(e => {
    const g = (d - 450) / 15, h = e.X;
    h.save();
    h.fillStyle = "#000";
    h.fillRect(0, e.height, e.width, -e.height * g);
    h.restore();
  });
  480 <= d && 495 > d && c.B.ja.push(e => {
    const g = (d - 480) / 15, h = e.X;
    h.save();
    h.fillStyle = "#000";
    h.fillRect(0, 0, e.width, e.height * (1 - g));
    h.restore();
  });
  660 <= d && 718 > d ? (660 === d && (b.ha.hb = !1, c.Va()), c.Fa.right = !0) : c.Fa && (c.Fa.right = void 0);
  760 < d && 860 > d && (761 === d && (c.O("level_start"), ["flare", "cursed"].includes(c.mode) && b.ha.ia("look"), b.ha.hb = !0), d % (780 > d ? 0 : 800 > d ? 2 : 4) || a.ja.push(e => {
    e.X.drawImage(e.I.images.ui_forest_label, e.width / 2 - 56, 32);
  }));
}]}, {fa:c => !c.B.D.find(b => b instanceof Gb), ba:!1, timeline:[(c, b) => {
  b.Ie = [new Gb(new m(96, 48), !0), new Gb(new m(128, 24), !0), new Gb(new m(224, 32), !1), new Gb(new m(176, 224), !0), new Gb(new m(320, 240), !0), new Gb(new m(64, 304), !0)];
  c.B.D.push(...b.Ie);
  b.end = !0;
}]}], "2_1":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.drawImage(a.I.images.sp_carrots, 720, 288);
    a.W.drawImage(a.I.images.sp_nousagi, Math.floor(b.H / 16) % 2 ? 0 : 24, 0, 24, 24, 672, 328, 24, 24);
    a.W.translate(888, 0);
    a.W.scale(-1, 1);
    a.W.translate(-888, 0);
    a.W.drawImage(a.I.images.sp_nousagi, Math.floor(b.H / 16) % 2 ? 0 : 24, 0, 24, 24, 864, 328, 24, 24);
    a.W.restore();
  });
}]}], "3_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.drawImage(a.I.images.sp_nousagi, Math.floor(b.H / 16) % 2 ? 0 : 24, 0, 24, 24, 1040, 136, 24, 24);
    a.W.translate(1080, 0);
    a.W.scale(-1, 1);
    a.W.translate(-1080, 0);
    a.W.drawImage(a.I.images.sp_nousagi, Math.floor(b.H / 16) % 2 ? 0 : 24, 0, 24, 24, 1024, 280, 24, 24);
    a.W.restore();
  });
}]}, {fa:c => !c.B.Xe, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  b.H || (b.ib = {A:{x:1264, y:304}, size:{x:1, y:48}}, a.P.L.push(b.ib));
  b.buffer && (a.P.L = a.P.L.filter(d => d !== b.ib), delete a.ma["79_19"], delete a.ma["79_20"], delete a.ma["79_21"], a.Xe = !0, b.end = !0);
  c = c.B.D.filter(d => d instanceof O && "rocket" === d.type);
  t(b.ib, c).length && (b.buffer = !0);
}]}], "4_0":[{fa:c => c.B.D.find(b => b instanceof H).Ub, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.drawImage(a.I.images.sp_nousagi, Math.floor(b.H / 16) % 2 ? 0 : 24, 24, 24, 24, 1288, 72, 24, 24);
    a.W.restore();
  });
}]}, {fa:c => 96 > c.B.D.find(b => b instanceof H).A.y && ("noel" === c.mode || c.B.D.find(b => b instanceof H).Ub) && !c.B.Cc, ba:!0, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (d.Y = !1, a.na && (a.na = 0), b.ac = 1504 < d.A.x, c.Fa.left = b.ac, c.Fa.right = !b.ac, c.va(!0), b.Qa = new Qa(new m(16 * (b.ac ? 85 : 94), 64), 32), b.Qa.ia("idle"), b.Qa.dir = b.ac, a.D.push(b.Qa));
  if (d && (b.ac && 1504 > d.A.x || !b.ac && 1360 < d.A.x)) {
    if (c.Fa.left || c.Fa.right) {
      c.Va(), b.Qa.ia("laugh"), c.O("peko");
    }
    140 < b.H && b.Qa.ia("idle");
    200 < b.H && (b.next = !0);
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (b.Qa.ia("jump"), b.Qa.C.y = -4, c.O("jump"), a.P.L = a.P.L.filter(e => !((b.ac && 1360 === e.A.x || !b.ac && 1504 === e.A.x) && 96 === e.A.y)));
  b.N || r(b.Qa, a.view) || (a.D = a.D.filter(e => !(e instanceof Qa)), a.Ha = !0, c.Aa("robotic_foe"), a.wf = "started", b.N = new Ra(new m(1312, 0), b.ac), a.N = b.N, a.N.K = b.Qa.A, a.N.K.y = 192, a.N.icon = 1, a.D.push(b.N), a.Zc = !0, a.P.L.push({A:{x:16 * (b.ac ? 85 : 94), y:96}, size:{x:16, y:16}}), b.L = [{A:{x:1312, y:-32}, size:{x:16, y:128}}, {A:{x:1552, y:-32}, size:{x:16, y:128}}], a.P.L.push(...b.L));
  b.N && ("intro" === b.N.M && (a.aa = 2, b.H % 32 || c.O("rumble")), "idle" !== b.N.M || d.Y || (a.Ha = !1, d.Y = !0), 0 >= b.N.G && (a.Zc && c.saveData.setItem("nuinui-save-achievement-1", !0), b.N.Oc = null, b.N.Ne = new m(0, 0), c.O("level_start"), a.wa = 60, a.D = a.D.filter(e => !(e instanceof L)), a.D = a.D.filter(e => !(e instanceof Hb)), a.na = 0, a.N = null, a.ya = null, b.next = !0));
}, (c, b) => {
  const a = c.B, d = a.D.find(g => g instanceof H);
  a.P.L = a.P.L.filter(g => !b.L.includes(g));
  0 === b.H && (d.Y = !1, c.va(), a.Cc = !0, b.N.M = "death", a.na && (a.na = 0));
  !(b.H % 32) && 160 >= b.H && c.O("rumble");
  if (180 === b.H) {
    for (var e = 0; e < b.N.size.x / 16; e++) {
      y(a.J, b.N.A.S(new m(16 * e, b.N.size.y)));
    }
    a.D = a.D.filter(g => g !== b.N);
    a.P.L = a.P.L.filter(g => 96 < g.A.y || 1312 >= g.A.x || 1536 < g.A.x);
    c.O("rumble");
    e = a.view.A.ka(.0625).floor();
    for (let g = e.y; g < e.y + 1 + a.view.size.y / 16; g++) {
      for (let h = e.x; h < e.x + 1 + a.view.size.x / 16; h++) {
        (81 < h && 97 >= h && 5 === g || 82 < h && 96 >= h && 6 === g) && delete a.ma[`${h}_${g}`];
      }
    }
    d.Y = !0;
    b.end = !0;
    c.Aa("serious_&_go");
  }
  a.aa = 2;
}]}], "5_0":[{fa:c => !c.B.D.find(b => b instanceof H).Ub, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.filter = "brightness(.5)";
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    for (let d = -2; 12 > d; d++) {
      a.W.drawImage(a.I.images.sp_peko_mini_boss, 0, 0, 24, 24, 1696 + 4 * Math.cos(Math.PI / 180 * (b.H + 30 * d)), 16 * d + b.H % 16, 24, 24);
    }
    a.W.restore();
  });
  c.B.ja.push(a => {
    a.X.save();
    a.X.translate(-a.B.view.A.x, -a.B.view.A.y);
    for (let d = -1; 13 > d; d++) {
      a.X.drawImage(a.I.images.sp_peko_mini_boss, 0, 0, 24, 24, 1792 + 4 * Math.sin(Math.PI / 180 * (b.H - 30 * d)), 16 * d - b.H % 16, 24, 24);
    }
    a.X.restore();
  });
}]}], "6_0":[{fa:c => !c.B.D.find(b => b instanceof H).Ub, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    const d = a.W;
    d.save();
    d.translate(-a.B.view.A.x, -a.B.view.A.y);
    d.translate(2080, 144);
    d.drawImage(a.I.images.ui_tuto_1, 0, Math.floor(b.H / 16) % 2 ? 0 : 16, 48, 16, 0, 0, 48, 16);
    d.restore();
  });
}]}], "7_0":[{fa:c => c.B.D.find(b => b instanceof H).Ub, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    const d = a.W;
    d.save();
    d.translate(-a.B.view.A.x, -a.B.view.A.y);
    d.translate(2544, 48);
    d.drawImage(a.I.images.ui_tuto_2, Math.floor(b.H / 8) % 2 ? 0 : 16, Math.floor(b.H / 16) % 2 ? 0 : 16, 16, 16, 0, 0, 16, 16);
    d.drawImage(a.I.images.ui_tuto_3, 0, Math.floor(b.H / 16) % 2 ? 0 : 16, 32, 16, 16, 0, 32, 16);
    d.translate(0, 32);
    d.drawImage(a.I.images.ui_tuto_2, 16, Math.floor(b.H / 16) % 2 ? 0 : 16, 16, 16, 0, 0, 16, 16);
    d.drawImage(a.I.images.ui_tuto_3, 32, Math.floor(b.H / 16) % 2 ? 0 : 16, 32, 16, 16, 0, 32, 16);
    d.restore();
  });
}]}], "9_0":[{fa:c => !c.saveData.getItem("nuinui-save-item-gun") && ["flare", "cursed"].includes(c.mode), ba:!1, timeline:[(c, b) => {
  c.B.D = c.B.D.filter(a => !(a instanceof Xa));
  c.B.D.push(new Xa());
  b.end = !0;
}]}], "11_4":[{fa:c => !c.saveData.getItem("nuinui-save-item-key0"), ba:!1, timeline:[(c, b) => {
  c.B.D = c.B.D.filter(a => !(a instanceof R));
  c.B.D.push(new R(new m(4080, 880), 0));
  b.end = !0;
}]}], "3_5":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = new m(1152, 1072), e = a.D.find(n => n instanceof H), g = p(e).x > d.x, h = p(e).Ab(d), l = !b.Gb && null === b.result && 80 > h && 48 < h && e.ga && e.dir !== g;
  b.H || (b.tb = 0, b.ub = 0, b.Ae = 0);
  !l || b.H % 8 || (b.tb += .5 < Math.random() ? 1 : -1, b.ub += .5 < Math.random() ? 1 : -1, 0 > b.tb && (b.tb = 2), 2 < b.tb && (b.tb = 0), 0 > b.ub && (b.ub = 2), 2 < b.ub && (b.ub = 0));
  b.Gb || (b.result = null);
  l && !b.Gb && c.keys.Bb && void 0 !== b.tb && (e.Y = !1, c.O("select"), b.Gb = 60, b.result = b.tb === b.ub ? null : b.tb === (b.ub + 1) % 3 ? 1 : 2);
  b.Gb && (b.Gb--, b.Gb || (e.Y = !0, b.tb += .5 < Math.random() ? 1 : -1, b.ub += .5 < Math.random() ? 1 : -1, 0 > b.tb && (b.tb = 2), 2 < b.tb && (b.tb = 0), 0 > b.ub && (b.ub = 2), 2 < b.ub && (b.ub = 0), b.result || c.O("question"), 1 === b.result && (e.oa(c, e), y(c.B.J, p(e)), c.B.aa = 4, c.O("explosion")), 2 === b.result && (b.Ae++, 2 < b.Ae && !c.saveData.getItem("nuinui-save-achievement-2") && c.saveData.setItem("nuinui-save-achievement-2", !0), a.D.push(new Ea(p(e).S(new m(-4, -96)))))));
  a.ja.push(n => {
    if (l || b.Gb) {
      const C = n.B.view.A.S(p(e).ka(-1)).round();
      n.W.save();
      n.W.translate(-C.x, -n.B.view.A.y + 1072);
      e.dir && n.W.scale(-1, 1);
      b.Gb && (n.W.filter = "invert(100%)");
      n.W.drawImage(n.I.images.ui_text_bubble, b.Gb ? 32 : 0, 0, 32, 32, -16, -24, 32, 32);
      n.W.drawImage(n.I.images.sp_hand, 16 * b.ub, 0, 16, 16, -8, -20, 16, 16);
      b.Gb || n.W.drawImage(n.I.images.ui_arrow_down, -14, -8 - Math.floor(b.H / 32) % 2);
      n.W.restore();
    }
    n.W.save();
    n.W.translate(-n.B.view.A.x + d.x, -n.B.view.A.y + d.y);
    g && n.W.scale(-1, 1);
    n.W.drawImage(n.I.images.sp_watame, 2 === b.result ? 48 : 1 === b.result ? 96 : 0, 0, 48, 48, -24, Math.floor(b.H / 32) % 2, 48, 48);
    b.Gb && (n.W.filter = "invert(100%)");
    if (l || b.Gb) {
      n.W.drawImage(n.I.images.ui_text_bubble, b.Gb ? 32 : 0, 0, 32, 32, -16, -24, 32, 32), n.W.drawImage(n.I.images.sp_hand, 16 * b.tb, 0, 16, 16, -8, -20, 16, 16);
    }
    n.W.restore();
  });
}]}], "6_1":[{fa:c => 1 === c.B.D.find(b => b instanceof H).Xa.length, ba:!0, timeline:[(c, b) => {
  1 < c.B.D.find(a => a instanceof H).Xa.length && c.B.ja.push(a => {
    const d = a.W;
    d.save();
    d.translate(-a.B.view.A.x, -a.B.view.A.y);
    d.translate(2056, 264);
    d.drawImage(a.I.images.ui_tuto_4, 0, Math.floor(b.H / 16) % 2 ? 0 : 48, 48, 48, 0, 0, 48, 48);
    d.restore();
  });
}]}, {fa:c => !c.B.Hc, ba:!0, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (c.va(), d.Y = !1, a.na && (a.na = 0), b.Qa = new Qa(new m(1968, 320), 32), b.Qa.ia("think"), a.D.push(b.Qa));
  30 === b.H && b.Qa.ia("idle");
  c.Fa.left = !0;
  2128 > d.A.x && (c.Va(), a.$c = !0, b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  if (20 === b.H) {
    b.ib = {A:{x:2224, y:240}, size:{x:16, y:48}};
    a.P.L.push(b.ib);
    const e = a.view.A.ka(.0625).floor();
    for (let g = e.y; g < e.y + 1 + a.view.size.y / 16; g++) {
      for (let h = e.x; h < e.x + 1 + a.view.size.x / 16; h++) {
        139 === h && [15, 16, 17].includes(g) && (a.ma[`${h}_${g}`] = "6");
      }
    }
    a.aa = 4;
    c.O("rumble");
    a.Ha = !0;
  }
  40 === b.H && (a.N = b.Qa, a.ya = new Y(Array.from("usada pekora"), "left"), a.N.icon = 2);
  80 === b.H && (b.Qa.dir = !0, c.Aa("crazy_bnuuy"));
  180 === b.H && b.Qa.ia("laugh");
  250 === b.H && (a.Ha = !1, d.Y = !0, b.Qa.ia("idle"), b.Qa.M = "idle");
  b.Qa.G || (a.$c && c.saveData.setItem("nuinui-save-achievement-3", !0), a.N = null, a.ya = null, d.Y = !1, b.Qa.M = "defeated", b.Qa.dir = !1, b.Qa.ia("idle"), !d.Xa.includes("rocket") && ["flare", "cursed"].includes(c.mode) && c.B.D.push(new Ya(b.Qa.A.value())), a.D = a.D.filter(e => !(e instanceof L)), a.D = a.D.filter(e => !(e instanceof Hb)), c.va(), c.O("level_start"), a.wa = 60, a.na = 0, b.next = !0);
}, (c, b) => {
  const a = c.B;
  90 === b.H && (a.Hc = !0);
  if (120 === b.H) {
    a.P.L = a.P.L.filter(d => d !== b.ib && (1920 !== d.A.x || 304 > d.A.y || 352 === d.A.y));
    a.aa = 4;
    c.O("rumble");
    c = a.view.A.ka(.0625).floor();
    for (let d = c.y; d < c.y + 1 + a.view.size.y / 16; d++) {
      for (let e = c.x; e < c.x + 1 + a.view.size.x / 16; e++) {
        (120 === e && [19, 20, 21].includes(d) || 139 === e && [15, 16, 17].includes(d)) && delete a.ma[`${e}_${d}`];
      }
    }
    b.next = !0;
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  60 < b.H && u(b.Qa, a.P) && (b.Qa.M = "flee");
  1850 > b.Qa.A.x && (a.D = a.D.filter(e => e !== b.Qa), d.Y = !0, b.end = !0, c.Aa("serious_&_go"));
  "flee" === b.Qa.M && (d.dir = p(b.Qa).x > p(d).x);
}]}], "5_1":[{fa:() => !0, ba:!0, timeline:[(c, b) => {
  const a = c.B.D.find(d => d instanceof H);
  0 === b.H && (a.Y = !1);
  c.Fa.left = !0;
  1744 > a.A.x && (b.end = !0, c.va(), c.U += 10000, b = (new Date()).getTime() - c.yb.getTime(), 300000 >= b && c.saveData.setItem("nuinui-save-achievement-4", !0), c.U += Math.max(0, 300000 - b), c.saveData.setItem("nuinui-save-stage-2", !0), c.Ea = new Rb(c, !0));
}]}]}, casino:{"0_0":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  .97 < Math.random() && (a.aa = 2, c.O("elevator"));
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (b.ua = !0, "noel" === c.mode ? b.ha = new W(c, new m(152, 112), new m(16, 32)) : b.ha = new H(c, new m(152, 112), new m(16, 32), c.mode), b.ha.ia("idle"), a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "center"), a.ad = !0);
  c.keys.a && !b.ua && (b.next = !0);
  Math.floor(.05 * b.F) % 2 && a.ja.push(d => {
    b.text.ca(d, d.X, new m(.5 * d.width, d.height - 16));
  });
}, (c, b) => {
  const a = c.B;
  switch(b.H) {
    case 0:
      a.aa = 20;
      c.O("rumble");
      const d = a.view.A.ka(.0625).floor();
      for (let e = d.y; e < d.y + 1 + a.view.size.y / 16; e++) {
        for (let g = d.x; g < d.x + 1 + a.view.size.x / 16; g++) {
          [4, 15].includes(g) && 12 > e && (a.ma[`${g}_${e}`] = "5");
        }
      }
  }
  89 < b.H && (c.Fa.right = !0, 256 < b.ha.A.x && (b.next = !0, b.ha.A = new m(16, 896), b.ha.gd = !0));
}, (c, b) => {
  const a = c.B;
  if (40 === b.H) {
    const d = a.view.A.ka(.0625).floor();
    for (let e = d.y; e < d.y + 1 + a.view.size.y / 16; e++) {
      for (let g = d.x; g < d.x + 1 + a.view.size.x / 16; g++) {
        2 === g && 54 < e && 58 > e && (a.ma[`${g}_${e}`] = "1"), 3 === g && 54 < e && 58 > e && (a.ma[`${g}_${e}`] = "1"), 4 === g && 54 < e && 58 > e && (a.ma[`${g}_${e}`] = "5");
      }
    }
    c.O("rumble");
    a.aa = 4;
    b.ib = {A:{x:64, y:880}, size:{x:16, y:48}};
    a.P.L.push(b.ib);
  }
  96 < b.ha.A.x && (c.Va(), b.ha.Y = !0, b.end = !0, a.Sb = !0, c.Aa("red_sus"), c.yb = new Date());
}]}], "0_4":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.drawImage(a.I.images.sp_statue, 480, 768);
    a.W.drawImage(a.I.images.sp_35p, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 32, 820, 896, 32, 32);
    a.W.restore();
  });
}]}], "5_2":[{fa:c => {
  const b = c.B.D.find(a => a instanceof H);
  return b && ["flare", "cursed"].includes(c.mode) && !b.item && !c.B.D.find(a => a instanceof cb);
}, ba:!0, timeline:[(c, b) => {
  const a = c.B.D.find(d => d instanceof H);
  0 === b.H && (a.Y = !1, b.Fb = new Gb(new m(1748, 464), !1), c.B.D.unshift(b.Fb), c.Fa.right = !0);
  1696 < a.A.x && (c.Va(), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  59 < b.H && 240 > b.H && 60 === b.H && (d.ia("look"), c.O("level_start"), d.hb = !0);
  180 === b.H && (d.hb = !1, d.ia("idle"));
  240 === b.H && c.B.D.push(new cb(b.Fb.A.value().S(new m(0, -16))));
  240 < b.H && (b.Fb.A.y -= 2);
  r(b.Fb, a.view) || (a.D = a.D.filter(e => e !== b.Fb), d.Y = !0, b.end = !0);
}]}], "7_2":[{fa:c => !c.saveData.getItem("nuinui-save-item-key1"), ba:!1, timeline:[(c, b) => {
  c.B.D = c.B.D.filter(a => !(a instanceof R));
  c.B.D.push(new R(new m(2400, 496), 1));
  b.end = !0;
}]}], "8_0":[{fa:c => !c.B.Cc, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (b.N = new Ia(), a.D.push(b.N));
  if (2608 < d.A.x && !b.L) {
    b.L = [{A:{x:2576, y:112}, size:{x:16, y:48}}, {A:{x:3168, y:112}, size:{x:16, y:48}}];
    a.P.L.push(...b.L);
    const e = a.P.A.ka(.0625).floor();
    for (let g = e.y; g < e.y + 1 + a.P.size.y / 16; g++) {
      for (let h = e.x; h < e.x + 1 + a.P.size.x / 16; h++) {
        161 === h && [7, 8, 9].includes(g) && (a.ma[`${h}_${g}`] = "5"), 198 === h && [7, 8, 9].includes(g) && (a.ma[`${h}_${g}`] = "5");
      }
    }
    a.aa = 4;
    c.O("rumble");
  }
  2864 < d.A.x && (d.Y = !1, a.na && (a.na = 0), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H ? (a.N = b.N, a.ya = new Y(Array.from("???"), "left"), a.N.icon = 1, b.Pa = new U(new m(3040, 128), 24), b.Pa.C = new m(-2, -4), b.Pa.ia("jump2"), b.Pa.K = a.N, b.N.D.push(b.Pa), a.D.push(b.Pa), a.Ha = !0) : 200 > b.H && b.Pa.ga && (b.Pa.C = new m(0, 0), b.Pa.ia("hide"), b.Pa.dir = !1, b.Pa.vc || (b.Pa.vc = new qb(b.Pa.A.S(new m(.5 * b.Pa.size.x - 24, -192)), b.Pa), a.D.unshift(b.Pa.vc)));
  100 === b.H && (a.Ha = !1, d.Y = !0, b.Pa.M = "idle", b.Pa.vc.uc = !1, b.Pa.vc.aa = 15, c.O("slash"));
  b.N.G || (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, a.D = a.D.filter(e => !(e instanceof U)), a.D = a.D.filter(e => !(e instanceof qb)), b.next = !0, d.Y = !1);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  if (60 === b.H) {
    a.P.L = a.P.L.filter(e => e !== b.ib && (1920 !== e.A.x || 304 > e.A.y || 352 === e.A.y));
    a.aa = 4;
    c.O("rumble");
    a.P.L = a.P.L.filter(e => !b.L.includes(e));
    c = a.P.A.ka(.0625).floor();
    for (let e = c.y; e < c.y + 1 + a.P.size.y / 16; e++) {
      for (let g = c.x; g < c.x + 1 + a.P.size.x / 16; g++) {
        161 === g && [7, 8, 9].includes(e) && (a.ma[`${g}_${e}`] = "0"), 198 === g && [7, 8, 9].includes(e) && (a.ma[`${g}_${e}`] = "0");
      }
    }
    d.Y = !0;
  }
  120 === b.H && (a.Cc = !0, b.end = !0);
}]}], "13_2":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.drawImage(a.I.images.sp_35p, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 32, 4272, 496, 32, 32);
    a.W.drawImage(a.I.images.sp_35p, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 32, 4336, 496, 32, 32);
    a.W.restore();
  });
}]}], "14_2":[{fa:() => !0, ba:!1, timeline:[c => {
  c.B.ja.push(b => {
    b.W.save();
    b.W.translate(-b.B.view.A.x, -b.B.view.A.y);
    b.W.drawImage(b.I.images.sp_moon, 4576, 400);
    b.W.restore();
  });
}]}, {fa:c => !c.B.Hc, ba:!0, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (d.Y = !1, a.na && (a.na = 0), b.ab = new Sa(new m(4688, 512), 48), b.ab.ia("idle"), b.ab.dir = !1, a.D.push(b.ab), c.Nd.style.filter = "brightness(0%)", c.Od.style.filter = "brightness(0%)", c.va(), c.B.Jd = !0);
  c.Fa.right = !0;
  4560 < d.A.x && (c.Va(), b.L = [{A:{x:4464, y:384}, size:{x:16, y:192}}, {A:{x:4800, y:384}, size:{x:16, y:192}}], a.P.L.push(...b.L), b.next = !0, a.N = b.ab, a.ya = new Y(Array.from("sakura miko"), "left"), a.N.icon = 3, a.Ha = !0, b.ab.ia("sniper"));
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  120 === b.H && (a.Ha = !1, c.Aa("elite_moonlight_scuffle"), c.Nd.style.filter = "none", c.Od.style.filter = "none", b.ab.M = "sniper", d.Y = !0);
  b.ab.G || (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, b.next = !0, d.Y = !1, b.ab.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), !d.Xa.includes("petal") && ["flare", "cursed"].includes(c.mode) && a.D.push(new Za(b.ab.A.value())), c.va(), c.B.Jd && c.saveData.setItem("nuinui-save-achievement-7", !0));
}, (c, b) => {
  const a = c.B;
  120 === b.H && (a.Hc = !0);
  180 === b.H && (a.P.L = a.P.L.filter(d => !b.L.includes(d)), a.D = a.D.filter(d => !(d instanceof Sa)), a.D.find(d => d instanceof H).Y = !0, c.Aa("red_sus"), b.end = !0);
}]}], "15_2":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (d.Y = !1);
  c.Fa.right = !0;
  5120 < d.A.x && (b.end = !0, a.ad && c.saveData.setItem("nuinui-save-achievement-5", !0), c.va(), c.U += 20000, b = (new Date()).getTime() - c.yb.getTime(), 300000 >= b && c.saveData.setItem("nuinui-save-achievement-8", !0), c.U += Math.max(0, 300000 - b), c.saveData.setItem("nuinui-save-stage-3", !0), c.Ea = new Rb(c, !0));
}]}], "13_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(h => h instanceof H), e = new m(4392, 96), g = p(d).x > e.x;
  c.saveData.setItem("nuinui-save-achievement-6", !0);
  a.ja.push(h => {
    h.W.save();
    h.W.translate(-h.B.view.A.x + e.x, -h.B.view.A.y + e.y);
    a.Jb && h.W.drawImage(h.I.images.sp_rsa, Math.floor(.125 * b.H) % 2 * 16, 0, 16, 16, 16, -8 + 4 * Math.sin(b.H / 16), 16, 16);
    g && h.W.scale(-1, 1);
    h.W.drawImage(h.I.images.sp_shion, Math.floor(.125 * b.H) % 2 * 48, 0, 48, 48, -24, 1, 48, 48);
    h.W.restore();
  });
}]}]}, port:{"0_0":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  .97 < Math.random() && (a.aa = 2, c.O("elevator"));
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (b.ua = !0, "noel" === c.mode ? b.ha = new W(c, new m(152, 112), new m(16, 32)) : b.ha = new H(c, new m(152, 112), new m(16, 32), c.mode), b.ha.ia("idle"), a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "center"));
  c.keys.a && !b.ua && (b.next = !0);
  Math.floor(.05 * b.F) % 2 && a.ja.push(d => {
    b.text.ca(d, d.X, new m(.5 * d.width, d.height - 16));
  });
}, (c, b) => {
  const a = c.B;
  switch(b.H) {
    case 0:
      a.aa = 20;
      c.O("rumble");
      const d = a.view.A.ka(.0625).floor();
      for (let e = d.y; e < d.y + 1 + a.view.size.y / 16; e++) {
        for (let g = d.x; g < d.x + 1 + a.view.size.x / 16; g++) {
          [3, 16].includes(g) && 12 > e && (a.ma[`${g}_${e}`] = "5");
        }
      }
  }
  89 < b.H && (c.Fa.right = !0, 256 < b.ha.A.x && (b.next = !0, b.ha.A = new m(16, 896), b.ha.gd = !0));
}, (c, b) => {
  const a = c.B;
  if (40 === b.H) {
    const d = a.view.A.ka(.0625).floor();
    for (let e = d.y; e < d.y + 1 + a.view.size.y / 16; e++) {
      for (let g = d.x; g < d.x + 1 + a.view.size.x / 16; g++) {
        2 === g && 54 < e && 58 > e && (a.ma[`${g}_${e}`] = "1"), 3 === g && 54 < e && 58 > e && (a.ma[`${g}_${e}`] = "1"), 4 === g && 54 < e && 58 > e && (a.ma[`${g}_${e}`] = "5");
      }
    }
    c.O("rumble");
    a.aa = 4;
    b.ib = {A:{x:64, y:880}, size:{x:16, y:48}};
    a.P.L.push(b.ib);
  }
  96 < b.ha.A.x && (c.Va(), b.ha.Y = !0, b.end = !0, a.Sb = !0, c.Aa("aquamarine_bay"), c.yb = new Date());
}]}], "2_1":[{fa:c => !c.saveData.getItem("nuinui-save-item-key2"), ba:!1, timeline:[(c, b) => {
  c.B.D = c.B.D.filter(a => !(a instanceof R));
  c.B.D.push(new R(new m(752, 224), 2));
  b.end = !0;
}]}], "3_1":[{fa:c => !c.B.zc, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  0 === b.H && (c.B.zc = !0, b.D = [new X({x:61, y:21}), new X({x:61, y:25}), new X({x:61, y:29}), new X({x:78, y:21}), new X({x:78, y:17})], a.D.push(...b.D), a.ma["62_15"] = "7", a.ma["62_16"] = "7", a.ma["62_17"] = "7", b.ib = {A:{x:992, y:240}, size:{x:16, y:48}}, a.P.L.push(b.ib));
  b.D.every(d => d.active) && (c.O("rumble"), a.aa = 4, delete a.ma["62_15"], delete a.ma["62_16"], delete a.ma["62_17"], a.P.L = a.P.L.filter(d => d !== b.ib), b.end = !0);
}]}], "3_3":[{fa:() => !0, ba:!1, timeline:[c => {
  c.B.ja.push(b => {
    b.W.save();
    b.W.translate(-b.B.view.A.x, -b.B.view.A.y);
    b.W.drawImage(b.I.images.sp_port_clock, b.B.Jb ? 128 : 0, 0, 128, 128, 984, 832, 128, 128);
    b.W.restore();
  });
}]}], "6_5":[{fa:c => !c.pc, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x + 2200, -a.B.view.A.y + 1077);
    a.W.scale(-1, 1);
    a.W.drawImage(a.I.images.sp_aqua_sleep, Math.floor(b.H / 24) % 4 * 64, 0, 64, 48, 0, 0, 64, 48);
    a.W.restore();
  });
}]}], "8_4":[{fa:() => !0, ba:!1, timeline:[c => {
  c.saveData.setItem("nuinui-save-achievement-9", !0);
}]}], "7_5":[{fa:c => !c.B.P.L.find(b => 2464 === b.A.x && 992 === b.A.y), ba:!0, timeline:[(c, b) => {
  const a = c.B;
  0 === b.H && (b.D = [new X({x:150, y:63.5})], a.D.push(...b.D), a.ma["154_62"] = "7", a.ma["155_62"] = "7", b.ib = {A:{x:2464, y:992}, size:{x:32, y:16}}, a.P.L.push(b.ib));
  b.D[0].active && (c.O("rumble"), a.aa = 4, a.background["150_65"] = "19", delete a.ma["154_62"], delete a.ma["155_62"], a.P.L = a.P.L.filter(d => d !== b.ib), b.end = !0);
}]}], "8_3":[{fa:c => !c.B.qe && !c.B.Cc, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  0 !== b.H || a.qe || (a.qe = !0, ["flare", "cursed"].includes(c.mode) && c.va(!0), b.cc = new S(new m(2616, 624), 1), b.cc.ia("sleep"), b.D = [new X({x:135, y:38.5}), new X({x:164, y:43.5}), new X({x:144, y:38.5}), new X({x:155, y:38.5}), new X({x:144, y:31.5}), new X({x:155, y:31.5}), new X({x:135, y:26.5}), new X({x:164, y:26.5}), b.cc], a.D.push(...b.D), a.ob[13].L.push({A:{x:2672, y:592}, size:{x:16, y:64}}));
  120 === b.H && c.Aa("sneak");
  if (!a.Sa) {
    a.Sa = !0;
    for (let d = 0; 9 > d; d++) {
      a.ma[`120_${37 + d}`] = "7";
    }
    b.L = [{A:{x:1920, y:592}, size:{x:16, y:144}}];
    a.ob[11].L.push(b.L[0]);
  }
  if (b.D.filter(d => d instanceof X).every(d => d.active)) {
    a.Cc = !0;
    a.Sa = !1;
    a.na && (a.na = 0);
    ["flare", "cursed"].includes(c.mode) && (c.va(), c.Aa("aquamarine_bay"));
    c.O("rumble");
    a.aa = 4;
    for (c = 0; 9 > c; c++) {
      delete a.ma[`120_${37 + c}`];
    }
    a.ob[11].L = a.ob[11].L.filter(d => d !== b.L[0]);
    a.D = a.D.filter(d => !(d instanceof S));
    b.next = !0;
  }
}, () => {
}]}], "7_3":[{fa:c => "noel" !== c.mode && c.B.D.find(b => b instanceof H).dir && c.B.ob[13].L.find(b => 2672 === b.A.x && 592 === b.A.y), ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (b.cc = a.D.find(e => e instanceof S), a.ob[13].L.push({A:{x:2672, y:592}, size:{x:16, y:64}}));
  if (2400 < d.A.x) {
    b.cc.A = new m(2160, 432);
    b.cc.dir = !0;
    b.cc.Ja = 1;
    b.cc.M = "move";
    b.cc.ea = 0;
    b.cc.Ud = !0;
    y(c.B.J, new m(2544, 624));
    y(c.B.J, new m(2560, 592));
    y(c.B.J, new m(2560, 656));
    c.O("rumble");
    a.aa = 12;
    a.ma["166_41"] = "22";
    a.ma["167_41"] = "23";
    for (c = 0; 4 > c; c++) {
      delete a.ma[`167_${37 + c}`];
    }
    a.ob[13].L = a.ob[13].L.filter(e => !(2672 === e.A.x && 592 === e.A.y));
    b.end = !0;
  }
}, () => {
}]}], "3_0":[{fa:() => !0, ba:!1, timeline:[c => {
  c.B.ja.push(b => {
    b.W.save();
    b.W.translate(-b.B.view.A.x, -b.B.view.A.y);
    b.W.drawImage(b.I.images.sp_anchor, 944, -12);
    b.W.restore();
    b.X.save();
    b.X.translate(-b.B.view.A.x + 1120, -b.B.view.A.y + 56);
    b.X.rotate(.125 * -Math.PI);
    b.X.drawImage(b.I.images.sp_flag, 0, Math.floor(b.B.F / 8 + 4) % 6 * 234, 128, 234, 16, 0, 24, 128);
    b.X.rotate(.125 * -Math.PI);
    b.X.drawImage(b.I.images.sp_flag, 0, Math.floor(b.B.F / 8) % 6 * 234, 128, 234, -8, 8, 48, 128);
    b.X.restore();
  });
}]}], "2_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Y && (d.Y = !1, c.Fa.left = !0, a.na && (a.na = 0));
  720 > d.A.x && (d.Ga = !0);
  d.Ga || c.B.ja.push(e => {
    e.Na.save();
    e.Na.translate(-e.B.view.A.x + 744, -e.B.view.A.y + 136);
    e.Na.translate(0, Math.round(Math.cos(180 / Math.PI * Math.floor(b.H / 4))));
    e.Na.scale(-1, 1);
    e.Na.drawImage(e.I.images.sp_jetski, 0, 0);
    e.Na.restore();
  });
  150 < b.H && c.B.ja.push(e => {
    e.X.save();
    e.X.fillStyle = "#000";
    e.X.globalAlpha = Math.min(1, (b.H - 150) / 30);
    e.X.fillRect(0, 0, e.width, e.height);
    e.X.restore();
  });
}]}], "1_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    if (!a.B.wa) {
      a.W.save();
      a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
      var d = Math.floor(.5 * b.H) % 320, e = Math.floor(.0625 * -b.H) % 320;
      a.W.drawImage(a.I.images["bg_port_scroll" + (a.B.Jb ? "_alt" : "") + "2"], 0, 0, 320, 160, 320 + e, 0, 320, 160);
      a.W.drawImage(a.I.images["bg_port_scroll" + (a.B.Jb ? "_alt" : "") + "2"], 0, 0, 320, 160, e + 640, 0, 320, 160);
      a.W.drawImage(a.I.images["bg_port_scroll" + (a.B.Jb ? "_alt" : "")], 0, 0, 320, 160, 320 + d, 0, 320, 160);
      a.W.drawImage(a.I.images["bg_port_scroll" + (a.B.Jb ? "_alt" : "")], 0, 0, 320, 160, 320 + d - 320, 0, 320, 160);
      320 > Math.floor(.5 * b.H) && a.W.drawImage(a.I.images["bg_port_scroll" + (a.B.Jb ? "_alt" : "")], 320, 0, 320, 160, 320 + d, 0, 320, 160);
      a.W.restore();
      a.X.save();
      a.X.fillStyle = "#fff";
      for (d = 0; d < a.height; d++) {
        .99 < Math.random() && a.X.fillRect(Math.round(a.width * (0.75 + Math.random() / 4)), d, a.width / 4, 1);
      }
      a.X.restore();
    }
  });
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  var d = a.D.find(e => e instanceof H);
  0 === b.H && (b.eb = [], b.Ob = (e, g, h, l, n, C) => {
    e = [P, Wa].includes(e) ? new e(g, C) : new e(g);
    e.xb = h;
    e.zd = !0;
    e.Cd = n;
    e.ze = l;
    b.eb.push(e);
    a.D.push(e);
  }, a.Ld = !0, a.Jb && (a.Tc = !0), a.Id = !0);
  60 > b.H && c.B.ja.push(e => {
    e.X.save();
    for (let g = 0; 20 > g; g++) {
      const h = Math.max(0, (b.H - 30) / 30 + (20 - g) / 20);
      for (let l = 0; 12 > l; l++) {
        e.X.drawImage(e.I.images.vfx_transition, 16 * Math.floor(7 * (1 - h)), 0, 16, 16, 16 * g, 16 * l, 16, 16);
      }
    }
    e.X.restore();
  });
  480 > d.A.x && (d.Y = !0, c.Va(), b.L || (b.L = [{A:{x:304, y:0}, size:{x:16, y:192}}, {A:{x:640, y:0}, size:{x:16, y:192}}], a.P.L.push(...b.L)));
  switch(b.H) {
    case 180:
    case 240:
    case 480:
    case 540:
    case 600:
    case 660:
    case 720:
    case 3240:
    case 3300:
    case 3360:
    case 3420:
    case 3480:
    case 3540:
    case 3600:
      b.Ob(I, new m(18, 4), 1.5, !1, !1);
      break;
    case 960:
    case 1320:
    case 1920:
    case 2400:
    case 2640:
    case 2880:
    case 3120:
    case 3840:
      b.Ob(M, new m(18, 11), .5, !0, !0);
      break;
    case 1080:
    case 1440:
    case 1560:
    case 1620:
    case 1740:
    case 1800:
    case 2280:
    case 2520:
    case 2760:
    case 3E3:
      b.Ob(I, new m(18, 5), 1, !1, !1);
      b.Ob(I, new m(18, 7), 1, !1, !1);
      break;
    case 1200:
      b.Db = {A:new m(-240, 0), xb:.125}, b.Ob(P, new m(10, 6), .125, !1, !0, !0), b.Ob(P, new m(-1, 6), .125, !1, !0, !0);
  }
  480 < b.H && !(b.H % 240) && .75 < Math.random() && (d = [9, 9.5, 10], b.Ob(Wa, new m(10, d[Math.floor(Math.random() * d.length)]), 2, !1, !1, .5 < Math.random()));
  b.eb.forEach(e => {
    e instanceof P && (e.xb = b.Db.xb);
    e.A.x += e.xb;
    e.aa || !e.ze || e.F % 6 || qa(c.B.J, e);
    e.zd && 656 <= e.A.x && (b.eb = b.eb.filter(g => g !== e), e.jd = !0);
  });
  a.D.filter(e => e instanceof Ea).forEach(e => e.A.x++);
  b.Db && (192 === b.Db.A.x && (b.Db.xb = 0, b.next = !0), b.Db.A.x += b.Db.xb, c.B.ja.push(e => {
    e.B.wa || (e.W.save(), e.W.translate(-e.B.view.A.x + Math.round(b.Db.A.x), -e.B.view.A.y + Math.round(b.Db.A.y) + Math.round(Math.cos(180 / Math.PI * Math.floor(b.H / 16)))), e.W.drawImage(e.I.images.sp_boat, 0, 0), e.W.restore());
  }));
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (b.Yb = new Q(new m(384, -32), 96), b.Yb.M = "intro", b.Ce = [new Jb(new m(20.5, 7.5), 1), new Jb(new m(37.5, 7.5), -1)], a.D.push(b.Yb, ...b.Ce), a.Ha = !0, a.N = b.Yb, a.ya = new Y(Array.from("houshou marine"), "left"), a.N.icon = 5, c.va());
  180 === b.H && (b.Yb.ia("idle"), b.Yb.M = "idle", a.Ha = !1, c.Aa("cosplay_pirate_idol_frenzy"));
  if (480 < b.H && !(b.H % 240) && .75 < Math.random()) {
    const e = [9, 9.5, 10];
    b.Ob(Wa, new m(10, e[Math.floor(Math.random() * e.length)]), 2, !1, !1, .5 < Math.random());
  }
  b.eb.forEach(e => {
    e instanceof P && (e.xb = b.Db.xb);
    e.A.x += e.xb;
    e.aa || !e.ze || e.F % 6 || qa(c.B.J, e);
    e.zd && 656 <= e.A.x && (b.eb = b.eb.filter(g => g !== e), e.jd = !0);
  });
  a.D.filter(e => e instanceof Ea).forEach(e => e.A.x++);
  b.Db && c.B.ja.push(e => {
    e.B.wa || (e.W.save(), e.W.translate(-e.B.view.A.x + Math.round(b.Db.A.x), -e.B.view.A.y + Math.round(b.Db.A.y) + Math.round(Math.cos(180 / Math.PI * Math.floor(b.H / 16)))), e.W.drawImage(e.I.images.sp_boat, 0, 0), e.W.restore());
  });
  b.Yb.G || (c.O("level_start"), a.wa = 60, a.na = 0, a.Jb && (a.Tc = !1), b.next = !0, d.Y = !1, b.Yb.M = "defeated", a.D = a.D.filter(e => !(e instanceof L) && !(e instanceof Wa) && !(e instanceof Jb) && !(e instanceof Ta)), !d.Xa.includes("sword") && ["flare", "cursed"].includes(c.mode) && a.D.push(new $a(96 > b.Yb.A.y ? new m(b.Yb.A.x, 96) : b.Yb.A.value())), c.va());
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  120 === b.H && (a.Hc = !0);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof Q)), a.N = null, a.ya = null, a.D.find(e => e instanceof H).Y = !0, c.Aa("aquamarine_bay"), a.Id && c.saveData.setItem("nuinui-save-achievement-11", !0));
  352 > d.A.x && (b.next = !0);
}, (c, b) => {
  var a = c.B.D.find(d => d instanceof H);
  0 === b.H && (a.Y = !1);
  a.ga && 120 < b.H && (c.Fa.left = !0);
  352 > a.A.x && c.Fa.left && !b.ae && (b.ae = b.H);
  336 > a.A.x && (b.end = !0, c.va(), c.U += 30000, a = (new Date()).getTime() - c.yb.getTime(), 300000 >= a && c.saveData.setItem("nuinui-save-achievement-12", !0), c.U += Math.max(0, 300000 - a), c.saveData.setItem("nuinui-save-stage-4", !0), c.Ea = new Rb(c, !0));
  120 < b.ae && c.B.ja.push(d => {
    d.X.save();
    d.X.fillStyle = "#000";
    d.X.globalAlpha = Math.min(1, (b.H - b.ae) / 30);
    d.X.fillRect(0, 0, d.width, d.height);
    d.X.restore();
  });
}]}]}, yamato:{"0_10":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (b.ua = !0, "noel" === c.mode ? b.ha = new W(c, new m(16, 1760), new m(16, 32)) : b.ha = new H(c, new m(16, 1760), new m(16, 32), c.mode), b.ha.ia("idle"), b.ha.Ga = !0, b.ha.ga = !1, b.ha.Y = !1, a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "right"));
  b.ha.C.x = 0;
  b.ha.C.y = -b.ha.Ba;
  c.keys.a && !b.ua && (b.ha.C.x = 8, b.next = !0);
  Math.floor(.05 * b.F) % 2 && a.ja.push(d => {
    b.text.ca(d, d.X, new m(d.width - 16, d.height - 12));
  });
}, (c, b) => {
  const a = c.B;
  if (b.ha.ga) {
    b.ha.Ga = !1;
    b.ha.Y = !0;
    c.Va();
    for (let d = 0; 5 > d; d++) {
      y(a.J, p(b.ha).S(new m(Math.floor(4 * Math.random()) - 2, Math.floor(4 * Math.random()) - 2)));
    }
    c.O("rumble");
    b.next = !0;
  } else {
    c.Fa.right = !0, b.ha.C.x = 3, b.F % 10 || y(a.J, p(b.ha));
  }
}, (c, b) => {
  const a = c.B;
  b.end = !0;
  a.Sb = !0;
  c.yb = new Date();
  c.Aa("beat_of_a_hundred_flowers");
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.translate(136, 0);
    a.W.scale(-1, 1);
    a.W.translate(-136, 0);
    a.W.drawImage(a.I.images.sp_sukonbu, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 32, 0, 2019, 32, 32);
    a.W.restore();
  });
}]}], "2_9":[{fa:c => {
  const b = c.B.D.find(a => a instanceof H);
  return b && !b.yc && ["flare", "cursed"].includes(c.mode) && !c.B.D.find(a => a instanceof db);
}, ba:!0, timeline:[(c, b) => {
  const a = c.B.D.find(d => d instanceof H);
  0 === b.H && (a.Y = !1, b.Fb = new Gb(new m(784, 1968), !1), c.B.D.unshift(b.Fb), c.Fa.right = !0);
  704 < a.A.x && (c.Va(), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  59 < b.H && 240 > b.H && 60 === b.H && (d.ia("look"), c.O("level_start"), d.hb = !0);
  180 === b.H && (d.hb = !1, d.ia("idle"));
  240 === b.H && c.B.D.push(new db(b.Fb.A.value().S(new m(0, -16))));
  240 < b.H && (b.Fb.A.y -= 2);
  r(b.Fb, a.view) || (a.D = a.D.filter(e => e !== b.Fb), d.Y = !0, b.end = !0);
}]}], "4_5":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  !b.H || b.H % 360 || (c.B.tc = 180, c.B.sd = b.H / 180 % 4);
}]}], "1_4":[{fa:c => !c.B.Je, ba:!1, timeline:[(c, b) => {
  c = c.B;
  if (864 > c.D.find(a => a instanceof H).A.x) {
    c.na && (c.na = 0);
    c.tc && (c.tc = 0);
    b.Qd = new Ka(new m(640, 1120));
    c.D.push(b.Qd);
    for (let a = 0; 7 > a; a++) {
      c.ma[`30_${63 + a}`] = "27", c.ma[`60_${63 + a}`] = "27";
    }
    b.L = [{A:{x:480, y:1008}, size:{x:16, y:112}}, {A:{x:960, y:1008}, size:{x:16, y:112}}];
    c.ob[5].L.push(...b.L);
    c.aa = 4;
    b.next = !0;
    c.Ha = !0;
    c.N = b.Qd;
    c.ya = new Y(Array.from("fubura tower"), "left");
    c.N.icon = 1;
  }
}, (c, b) => {
  const a = c.B;
  if (!b.Qd.G) {
    a.N = null;
    a.ya = null;
    for (let d = 0; 7 > d; d++) {
      delete a.ma[`30_${63 + d}`], delete a.ma[`60_${63 + d}`];
    }
    c.O("level_start");
    a.wa = 60;
    a.na = 0;
    a.ob[5].L = a.ob[5].L.filter(d => !b.L.includes(d));
    a.Je = !0;
    b.end = !0;
  }
}]}], "1_3":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.saveData.setItem("nuinui-save-achievement-13", !0);
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.drawImage(a.I.images.sp_poyoyo, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 24, 560, 682, 32, 24);
    a.W.restore();
  });
}]}], "1_2":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  120 < b.H % 180 && (c.B.tc = 2, c.B.sd = !1);
}]}], "4_1":[{fa:c => !c.B.De, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  if (288 >= d.A.y) {
    a.na && (a.na = 0);
    b.zb = new gb(new m(1672, 288), 40);
    b.zb.ia("idle");
    b.zb.dir = !1;
    a.D.push(b.zb);
    for (let e = 0; 3 > e; e++) {
      a.ma[`${88 + e}_19`] = "f", a.ma[`${88 + e}_20`] = "e", a.ma[`${109 + e}_19`] = "f", a.ma[`${109 + e}_20`] = "e";
    }
    b.L = [{A:{x:1408, y:320}, size:{x:48, y:16}}, {A:{x:1744, y:320}, size:{x:48, y:16}}];
    a.P.L.push(...b.L);
    c.O("rumble");
    a.aa = 4;
    a.Oa = new m(Math.round((d.A.x + b.zb.A.x) / 2) - c.width / 2, 192);
    a.Ha = !0;
    a.N = b.zb;
    a.ya = new Y(Array.from("nakiri ayame"), "left");
    a.N.icon = 6;
    b.next = !0;
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  a.Oa.x = Math.round((d.A.x + b.zb.A.x) / 2) - c.width / 2;
  120 === b.H && (a.Ha = !1, b.zb.ia("idle"), b.zb.M = "idle");
  b.zb.G || (a.Oa = null, a.N = null, a.ya = null, d.Y = !1, c.O("level_start"), a.wa = 60, a.na = 0, b.zb.M = "defeated", a.D = a.D.filter(e => !(e instanceof hb)), b.next = !0);
}, (c, b) => {
  const a = c.B;
  120 === b.H && (a.De = !0);
  if (180 === b.H) {
    a.P.L = a.P.L.filter(d => !b.L.includes(d));
    a.D = a.D.filter(d => !(d instanceof gb));
    for (let d = 0; 3 > d; d++) {
      delete a.ma[`${88 + d}_19`], delete a.ma[`${88 + d}_20`], delete a.ma[`${109 + d}_19`], delete a.ma[`${109 + d}_20`];
    }
    c.O("rumble");
    a.aa = 4;
    a.D.find(d => d instanceof H).Y = !0;
    b.end = !0;
  }
}]}], "10_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  c.Sa && (c.Sa = !1);
  b.end = !0;
}]}], "11_1":[{fa:c => !c.saveData.getItem("nuinui-save-item-key3"), ba:!1, timeline:[(c, b) => {
  c.B.D = c.B.D.filter(a => !(a instanceof R));
  c.B.D.push(new R(new m(3584, 688), 3));
  b.end = !0;
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  c.Sa || (c.Sa = !0);
  b.D = [new X({x:222.25, y:42.5}), new X({x:225.75, y:42.5})];
  b.D.forEach(a => a.active = !0);
  c.D.push(...b.D);
  b.end = !0;
}]}], "13_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c.B.ja.push(a => {
    a.W.save();
    a.W.translate(-a.B.view.A.x, -a.B.view.A.y);
    a.W.translate(4160, 0);
    a.W.drawImage(a.I.images.sp_sukonbu, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 32, 64, 132, 32, 32);
    a.W.scale(-1, 1);
    a.W.drawImage(a.I.images.sp_sukonbu, Math.floor(b.H / 16) % 2 ? 0 : 32, 0, 32, 32, -304, 132, 32, 32);
    a.W.restore();
  });
}]}], "14_0":[{fa:c => !c.B.Hc, ba:!0, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (d.Y = !1, a.na && (a.na = 0), b.Mb = new fb(new m(4688, -64), 48), b.Mb.ia("jump"), b.Mb.dir = !1, a.D.push(b.Mb), c.va());
  c.Fa.right = !0;
  b.Mb.ga && b.Mb.ia("idle");
  4560 < d.A.x && (c.Va(), b.L = [{A:{x:4464, y:0}, size:{x:16, y:192}}, {A:{x:4800, y:0}, size:{x:16, y:192}}], a.P.L.push(...b.L), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  !d.Y && b.Mb.ga && b.Mb.ia("idle");
  30 === b.H && (a.Ha = !0, a.N = b.Mb, a.ya = new Y(Array.from("shirakami fubuki"), "left"), a.N.icon = 7);
  150 === b.H && (b.Mb.M = "idle", d.Y = !0, a.Ha = !1, c.Aa("dethroneworld"));
  b.Mb.G || (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, b.next = !0, d.Y = !1, b.Mb.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), !d.Xa.includes("shield") && ["flare", "cursed"].includes(c.mode) && a.D.push(new ab(b.Mb.A.value())), c.va());
}, (c, b) => {
  const a = c.B;
  120 === b.H && (a.Hc = !0);
  180 === b.H && (a.P.L = a.P.L.filter(d => !b.L.includes(d)), a.D = a.D.filter(d => !(d instanceof fb)), a.D.find(d => d instanceof H).Y = !0, b.end = !0, c.Aa("beat_of_a_hundred_flowers"));
}]}], "15_0":[{fa:() => !0, ba:!1, timeline:[c => {
  c = c.B;
  const b = c.D.find(e => e instanceof H), a = new m(5E3, 112), d = p(b).x > a.x;
  c.ja.push(e => {
    e.W.save();
    e.W.translate(-e.B.view.A.x + a.x, -e.B.view.A.y + a.y);
    d && e.W.scale(-1, 1);
    e.W.drawImage(e.I.images.sp_mio, 0, 0, 48, 48, -24, 1, 48, 48);
    e.W.restore();
  });
}]}], "16_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  192 < d.A.y && !a.Sa && (a.Sa = !0, c.va());
  a.Sa && d.ga && (b.next = !0);
}, (c, b) => {
  const a = c.B;
  "noel" === c.mode ? b.next = !0 : (60 === b.H && (a.Ha = !0, a.ue = (new Date()).getTime()), 120 === b.H && (b.Zb = new T(new m(5272, 384), 256), b.Zb.M = "move", a.D.push(b.Zb), c.Aa("corrupted_partner"), a.N = b.Zb, a.ya = new Y(Array.from("shirogane noel?"), "left"), a.N.icon = 10), b.Zb && 448 < b.Zb.A.y && (a.Ha = !1), b.Zb && b.Zb.Nc && (a.D = a.D.filter(d => !(d instanceof L)), a.Ha = !1, b.next = !0));
}, (c, b) => {
  c.B.N = null;
  c.B.ya = null;
  "noel" === c.mode ? b.next = !0 : (c = c.B.D.find(a => a instanceof H), 0 === b.H && (c.Y = !1), "weak" === b.Zb.M && (b.next = !0));
}, (c, b) => {
  var a = c.B;
  const d = a.D.find(e => e instanceof H);
  if ("noel" === c.mode) {
    b.next = !0;
  } else {
    if (180 > b.H) {
      for (a = 0; 2 > a; a++) {
        B(c.B.J, p(b.Zb).S(new m(32 * Math.random() - 16, 20 * Math.random() - 10 - b.H)), new m(4 * Math.random() - 2, -1 * Math.random()), 0);
      }
    } else if (360 > b.H) {
      for (a = 0; 4 > a; a++) {
        B(c.B.J, p(d).S(new m(32 * Math.random() - 16, 20 * Math.random() - 10 - 4 * (360 - b.H))), new m(2 * Math.random() - 1, -1 * Math.random()), 0);
      }
    } else {
      360 === b.H && (a.Oa = new m(5120, 384), d.Td = !0, d.hb = !0, d.ia("hit"), d.C.y = -1, d.Ba = 0);
    }
    d.Td && 352 > d.A.y && (b.Zb.ia("idle"), b.next = !0);
  }
}, (c, b) => {
  60 === b.H && (b.end = !0, c.mode = "noel", c.va(), c.U += 40000, 60000 <= (new Date()).getTime() - c.B.ue && c.saveData.setItem("nuinui-save-achievement-15", !0), b = (new Date()).getTime() - c.yb.getTime(), 300000 >= b && c.saveData.setItem("nuinui-save-achievement-16", !0), c.U += Math.max(0, 300000 - b), c.saveData.setItem("nuinui-save-stage-5", !0), c.Ea = new Rb(c, !0));
}]}]}, westa:{"0_7":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (b.ua = !0, a.Sa = !0, "noel" === c.mode ? (b.ha = new W(c, new m(152, 1472), new m(16, 32)), b.ha.ia("idle"), c.saveData.setItem("nuinui-save-achievement-17", !0)) : (b.ha = new H(c, new m(152, 1472), new m(16, 32), c.mode), b.ha.ia("sleep")), b.ha.hb = !0, a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "right"));
  if (60 > b.H) {
    const d = 1 - (0 === b.H / 60 ? 0 : Math.pow(2, 10 * b.H / 60 - 10));
    a.ja.push(e => {
      e.X.save();
      e.X.globalAlpha = d;
      e.X.fillStyle = "#000";
      e.X.fillRect(0, 0, e.width, e.height);
      e.X.restore();
    });
  } else {
    c.keys.a && !b.ua && (b.next = !0), Math.floor(.05 * b.F) % 2 && a.ja.push(d => {
      b.text.ca(d, d.X, new m(d.width - 16, d.height - 12));
    });
  }
}, (c, b) => {
  const a = c.B;
  switch(b.H) {
    case 0:
      ["flare", "cursed"].includes(c.mode) && (b.ha.ia("wakeup"), c.O("question"));
      break;
    case 39:
      c.Aa("axe_dungeon"), b.ha.ia("idle"), b.ha.Y = !0, b.ha.hb = !1, b.end = !0, a.Sb = !0, c.yb = new Date();
  }
}]}], "2_6":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  c.Sa || (c.Sa = !0);
  b.end = !0;
}]}], "4_6":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  c.Sa && (c.Sa = !1);
  b.end = !0;
}]}], "1_4":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  c.Sa || (c.Sa = !0);
  b.end = !0;
}]}], "2_4":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  c.Sa && (c.Sa = !1);
  b.end = !0;
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  const a = c.D.find(d => d instanceof H);
  800 < a.A.x && 1600 > a.A.x && !(b.F % 10) && c.D.push(new jb(new m(a.A.x + 16 * Math.floor(20 * Math.random()), 752)));
}]}], "6_4":[{fa:c => !c.B.Se, ba:!0, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.F || (d.Y = !1, c.Va(), c.va(!0), a.na = 0);
  if (1968 > d.A.x) {
    c.Fa.right = !0;
  } else {
    if (c.Va(), 50 === b.F) {
      b.L = [{A:{x:1936, y:880}, size:{x:16, y:48}}, {A:{x:2208, y:880}, size:{x:16, y:48}}];
      a.P.L.push(...b.L);
      c.B.aa = 4;
      c.O("rumble");
      for (c = 0; 3 > c; c++) {
        a.ma[`121_${55 + c}`] = "12", a.ma[`138_${55 + c}`] = "12";
      }
      a.Ha = !0;
    } else {
      120 < b.F && (b.cd = new kb(new m(2048, 704)), b.Wb = new ib(new m(2072, 672), 48, b.cd), b.Wb.M = "intro", a.N = b.Wb, a.ya = new Y(Array.from("hoshimachi suisei"), "left"), a.N.icon = 8, a.D.push(b.cd, b.Wb), b.next = !0);
    }
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.cd.ga && (d.Y = !0);
  b.Wb.ga && a.Ha && (a.Ha = !1, c.Aa("axe_dungeon_tatakae"));
  b.Wb.G || (c.va(), c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.Wb.M = "defeated", a.D = a.D.filter(e => !(e instanceof jb)), a.D = a.D.filter(e => !(e instanceof kb)), b.next = !0);
}, (c, b) => {
  const a = c.B;
  120 === b.H && (a.Se = !0);
  if (180 === b.H) {
    a.P.L = a.P.L.filter(d => !b.L.includes(d));
    a.D = a.D.filter(d => !(d instanceof ib));
    for (let d = 0; 3 > d; d++) {
      delete a.ma[`121_${55 + d}`], delete a.ma[`138_${55 + d}`];
    }
    c.O("rumble");
    a.aa = 4;
    c.Aa("polkata_fugue");
    a.D.find(d => d instanceof H).Y = !0;
    b.end = !0;
  }
}]}], "10_4":[{fa:c => !c.saveData.getItem("nuinui-save-item-key4"), ba:!1, timeline:[(c, b) => {
  c.B.D = c.B.D.filter(a => !(a instanceof R));
  c.B.D.push(new R(new m(3992, 832), 4));
  b.end = !0;
}]}], "6_3":[{fa:c => !c.B.Pe, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  if (2368 > a.D.find(d => d instanceof H).A.x) {
    b.wb || (b.wb = new nb(new m(2160, 704), 48), b.wb.ia("idle"), a.D.push(b.wb, ...b.wb.K));
    b.L = [{A:{x:2080, y:592}, size:{x:16, y:48}}, {A:{x:2384, y:592}, size:{x:16, y:48}}];
    a.P.L.push(...b.L);
    c.B.aa = 4;
    c.O("rumble");
    for (let d = 0; 3 > d; d++) {
      a.ma[`130_${37 + d}`] = "29", a.ma[`149_${37 + d}`] = "29";
    }
    a.Oa = new m(2080, a.view.A.y);
    c.va(!0);
    b.next = !0;
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (a.Ha = !0, a.N = b.wb, a.ya = new Y(Array.from("omaru polka"), "left"), a.N.icon = 9, d.Y = !1, c.Va());
  c.Fa.left = 2296 < d.A.x ? !0 : void 0;
  90 === b.H && (c.Va(), d.Y = !0, a.Ha = !1, c.Aa("polkata_fugue_tatakae"), b.wb.M = "charge", b.wb.ia("charge"), c.O("charge"));
  b.wb.G || (c.va(), c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, a.D.filter(e => e instanceof Jb).forEach(e => e.dir = 0), d.Y = !1, b.wb.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), a.D = a.D.filter(e => !(e instanceof mb)), c.Va(), b.next = !0);
}, (c, b) => {
  const a = c.B;
  120 === b.H && (a.Pe = !0);
  if (180 === b.H) {
    a.P.L = a.P.L.filter(d => !b.L.includes(d));
    a.D = a.D.filter(d => !(d instanceof nb));
    for (let d = 0; 3 > d; d++) {
      delete a.ma[`130_${37 + d}`], delete a.ma[`149_${37 + d}`];
    }
    c.O("rumble");
    a.aa = 4;
    a.Oa = null;
    c.Aa("polkata_fugue");
    a.D.find(d => d instanceof H).Y = !0;
    b.end = !0;
  }
}]}], "3_3":[{fa:c => !c.B.Ve, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (a.be = !0, c.va(!0), d.Y = !1, c.Va(), b.eb = [[new N({x:80, y:45})], [new N({x:80, y:45}), new N({x:83, y:45})], [new N({x:83, y:45}), new N({x:80, y:45}), new I({x:77, y:42})], [new N({x:73, y:45}), new N({x:80, y:45}), new I({x:77, y:42}), new Ua({x:77, y:46})], [new Ua({x:80, y:46}), new I({x:83, y:42}), new I({x:77, y:42}), new N({x:73, y:45}), new N({x:80, y:45})], [new Ua({x:80, y:46}), new I({x:83, y:42}), new I({x:77, y:42}), new N({x:81, y:45}), new N({x:79, y:45})], [new I({x:83, 
  y:42}), new I({x:77, y:42}), new N({x:81, y:45}), new N({x:79, y:45}), new I({x:73, y:41}), new I({x:71, y:41}), new N({x:71, y:45}), new N({x:73, y:45})]]);
  1600 >= d.A.x ? (c.Va(), d.Y = !0, c.Aa("bridging_the_gap"), b.L = [{A:{x:1104, y:576}, size:{x:16, y:192}}, {A:{x:1760, y:576}, size:{x:16, y:192}}], a.P.L.push(...b.L), b.Hb = 0, b.kd = !0, b.eb[b.Hb].forEach(e => a.D.push(e)), b.next = !0) : c.Fa.left = !0;
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.Hb !== b.eb.length - 1 || a.D.find(e => b.eb[b.Hb].includes(e)) || (a.P.L = a.P.L.filter(e => !b.L.includes(e)), a.be = !1, a.Ve = !0, b.end = !0);
  B(c.B.J, a.view.A.S(new m(Math.floor(Math.random() * c.width), 192)), new m(Math.random() - .5, -Math.random()), 0);
  b.H % 2 && ya(c.B.J, a.view.A.S(new m(Math.floor(Math.random() * c.width), Math.floor(Math.random() * c.height))), new m(8 * (b.kd ? -1 : 1), 2 * Math.random() - 1), 0);
  1600 < d.A.x && (a.D.forEach(e => {
    e.A.x = 1440 > e.A.x ? e.A.x + 320 : e.A.x - 320;
  }), a.J.La.forEach(e => e.A.x -= 320), "noel" === c.mode && d.Pc.forEach(e => e.A.x -= 320), Yb(a), b.kd || a.D.find(e => b.eb[b.Hb].includes(e)) || (b.Hb++, b.kd = .5 < Math.random(), b.Hb < b.eb.length && b.eb[b.Hb].forEach(e => {
    e.A.x += 320;
    a.D.push(e);
  })));
  1280 > d.A.x && (a.D.forEach(e => {
    e.A.x = 1440 > e.A.x ? e.A.x + 320 : e.A.x - 320;
  }), a.J.La.forEach(e => e.A.x += 320), "noel" === c.mode && d.Pc.forEach(e => e.A.x += 320), Yb(a), b.kd && !a.D.find(e => b.eb[b.Hb].includes(e)) && (b.Hb++, b.kd = .5 < Math.random(), b.Hb < b.eb.length && b.eb[b.Hb].forEach(e => a.D.push(e))));
}]}], "1_3":[{fa:() => !0, ba:!1, timeline:[c => {
  c.B.wa || c.B.ja.push(b => {
    b.W.save();
    b.W.translate(-b.B.view.A.x, -b.B.view.A.y);
    b.W.drawImage(b.I.images.sp_throne, 592, 576);
    b.W.restore();
  });
}]}, {fa:c => !c.B.Oe, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (c.va(!0), b.ab = new ob(new m(632, 688), 64), b.ab.ia("sit"), b.ab.M = "sit", a.D.push(b.ab), d.Y = !1, c.Va());
  c.Fa.left = 704 < d.A.x ? !0 : void 0;
  704 >= d.A.x && (c.Fa.left = void 0, b.L = [{A:{x:304, y:576}, size:{x:16, y:192}}, {A:{x:960, y:576}, size:{x:16, y:192}}], a.P.L.push(...b.L), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  a.Oa = new m(Math.max(320, Math.min(640, Math.round((d.A.x + d.size.x / 2 + b.ab.A.x + b.ab.size.x / 2) / 2) - c.width / 2)), 576);
  60 === b.H && (a.Ha = !0, a.N = b.ab, a.ya = new Y(Array.from("demon lord miko"), "left"), a.N.icon = 3, b.ab.ia("evil"), b.ab.ea = 0, b.ab.M = "wait");
  180 === b.H && (b.ab.rc = 60, c.Aa("elite_devil"));
  240 === b.H && (b.ab.ea = 0, b.ab.M = "idle", c.Va(), d.Y = !0, a.Ha = !1);
  b.ab.G || (c.va(), c.O("level_start"), a.wa = 120, a.na = 0, a.N = null, a.ya = null, d.Y = !1, c.Va(), b.ab.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), a.D = a.D.filter(() => !0), b.next = !0, b = (new Date()).getTime() - c.yb.getTime(), 300000 >= b && c.saveData.setItem("nuinui-save-achievement-20", !0), c.U += Math.max(0, 300000 - b));
}, (c, b) => {
  c = c.B;
  const a = c.D.find(d => d instanceof H);
  120 === b.H && (c.Oe = !0, a instanceof W && (c.Oa = null));
  180 === b.H && (c.P.L = c.P.L.filter(d => !b.L.includes(d)), c.D = c.D.filter(d => !(d instanceof ob)), a instanceof W ? (a.Y = !0, b.end = !0) : b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  60 < b.H && (a.Sb = !1, a.Oa = new m(480, 576), c.Fa.left = 640 < d.A.x ? !0 : void 0, c.Fa.right = 624 > d.A.x ? !0 : void 0, 640 > d.A.x && 624 < d.A.x && !c.Fa.left && !c.Fa.right && (c.Fa.a = d.ga, 0 < d.C.y && 688 < d.A.y && (d.Ba = 0, d.C.y = 0, d.ia("sit"), d.hb = !0, b.next = !0)));
}, (c, b) => {
  const a = c.B.D.find(d => d instanceof H);
  120 === b.H && c.O("peko");
  60 === b.H ? (a.Td = !0, c.O("rumble"), c.saveData.setItem("nuinui-save-achievement-18", !0)) : 60 < b.H && (c.B.ja.push(d => {
    d.X.save();
    d.X.drawImage(d.I.images.ui_bad_end, 0, 0);
    const e = d.X.createLinearGradient(0, 32, 32, 0);
    e.addColorStop(0, "#007FBF");
    e.addColorStop(1, "#7FFFFF");
    d.X.translate(d.width - 80, d.height - 40);
    d.saveData.getItem("nuinui-save-achievement-10") || (d.X.filter = "grayscale(100%)");
    d.X.fillStyle = e;
    d.X.fillRect(0, 0, 32, 32);
    d.X.drawImage(d.I.images.ui_achievements, 32, 64, 32, 32, 0, 0, 32, 32);
    d.X.filter = "grayscale(100%)";
    d.X.fillRect(40, 0, 32, 32);
    d.X.drawImage(d.I.images.ui_achievements, 0, 128, 32, 32, 40, 0, 32, 32);
    d.X.restore();
  }), c.keys.a || c.keys.start) && (c.O("select"), c.Ea = new Vb(c));
}]}], "1_2":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Y = !1;
  b.H || (b.ha = new sb(new m(528, 512), 64), b.ha.ia("back"), b.ha.M = "back", a.D.push(b.ha));
  if (!d.C.x && !b.L) {
    b.L = [{A:{x:352, y:528}, size:{x:16, y:16}}];
    a.P.L.push(...b.L);
    c.B.aa = 4;
    c.O("rumble");
    for (c = 0; 3 > c; c++) {
      a.ma[`${20 + c}_33`] = 2 === c ? "5" : "4";
    }
    for (c = 0; 3 > c; c++) {
      a.ma[`${20 + c}_23`] = 2 === c ? "5" : "4";
    }
    for (c = 0; 3 > c; c++) {
      a.ma[`${37 + c}_23`] = 0 === c ? "3" : "4";
    }
    a.background["23_23"] = "2";
    a.background["24_23"] = "16";
    a.background["25_23"] = "16";
    a.background["26_23"] = "2";
    a.background["27_23"] = "1";
    a.background["28_23"] = "2";
    a.background["29_23"] = "16";
    a.background["30_23"] = "16";
    a.background["31_23"] = "2";
    a.background["32_23"] = "1";
    a.background["33_23"] = "2";
    a.background["34_23"] = "16";
    a.background["35_23"] = "16";
    a.background["36_23"] = "2";
    b.next = !0;
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  switch(b.H) {
    case 60:
      a.Ec = 2;
      c.B.aa = 4;
      c.O("rumble");
      break;
    case 90:
      b.ha.dir = !1;
      b.ha.ia("idle");
      break;
    case 120:
      b.ha.ia("chant"), a.N = b.ha, a.ya = new Y(Array.from("shiranui flare"), "left"), a.N.icon = 0, c.Aa("serious_&_go");
  }
  a.N === b.ha && b.ha.G === b.ha.T && (b.ha.ea = 0, b.ha.qa = "back", b.ha.ia("idle"), b.ha.M = "idle", d.Y = !0, b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  2 === a.Ec && b.ha.G <= .5 * b.ha.da && (a.Ec = 1, c.B.aa = 4, c.O("rumble"));
  !b.ha.G && a.N && (c.va(), c.O("level_start"), a.wa = 120, a.na = 0, a.N = null, a.ya = null, d.Y = !1, a.D = a.D.filter(e => !(e instanceof Ib)), a.D = a.D.filter(e => !(e instanceof L)), a.D = a.D.filter(e => !(e instanceof Ea)));
  a.N || a.wa || (b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  120 === b.H && (b.ha.ia("back"), d.hb = !0, d.ia("back"));
  180 === b.H && (a.Ec = .5, c.B.aa = 4, c.O("rumble"), b.Ge = !1);
  300 < b.H && (b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  if (90 > b.H && (a.ja.push(e => {
    const g = Math.min(1, b.H / 60), h = e.X;
    h.save();
    h.fillStyle = "#000";
    h.fillRect(0, e.height, e.width, -e.height * g);
    h.restore();
  }), 89 === b.H)) {
    a.D = a.D.filter(g => g !== d);
    c = new H(c, (new m(25.5, 20)).ka(16), new m(16, 32));
    const e = new Oa(b.Ge ? "flare" : "noel");
    e.ba = !0;
    a.D.push(c, e);
    a.view.target = c;
    for (c = 0; 3 > c; c++) {
      delete a.ma[`${37 + c}_23`];
    }
    for (c = 0; 3 > c; c++) {
      delete a.ma[`${20 + c}_23`];
    }
    a.Ec = 0;
    b.end = !0;
  }
}]}], "1_1":[{fa:() => !0, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.H % 4 || ya(a.J, a.view.A.S(new m(Math.floor(Math.random() * c.width), Math.floor(Math.random() * c.height))), new m(4 * Math.random(), 4), 0);
  (b = a.D.find(d => d instanceof H)) && 352 <= b.A.y && (b.A = (new m(480 > b.A.x ? 23 : 36, 19)).ka(16), b.oa(c, b), b.C.x = 0);
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  const a = c.D.find(d => d instanceof H);
  b.H || (c.$d = .75, a.ia("back"), a.hb = !0);
  90 > b.H && (c.ja.push(d => {
    const e = Math.max(0, (b.H - 30) / 60), g = d.X;
    g.save();
    g.fillStyle = "#000";
    g.fillRect(0, 0, d.width, d.height * (1 - e));
    g.restore();
  }), 89 === b.H && (b.next = !0));
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (b.$a = new Na(), b.$a.M = "intro", a.D.unshift(b.$a), c.Aa("unlimited"));
  if (!a.N && "intro" !== b.$a.M) {
    d.hb = !1;
    d.Y = !0;
    a.N = b.$a;
    a.ya = new Y(Array.from("???"), "left");
    a.N.icon = 1;
    const e = a.D.find(g => g instanceof Oa);
    e.qd = !0;
    e.$a = b.$a;
  }
  a.N && "end" === b.$a.M && (a.N.nb.y -= 128, c.va(), c.O("level_start"), a.wa = 120, a.na = 0, a.N = null, a.ya = null, d.Y = !1, a.D = a.D.filter(e => !(e instanceof L)), a.Sb = !1, b.next = !0);
}, (c, b) => {
  const a = c.B;
  var d = a.D.find(e => e instanceof H);
  a.Oa && b.viewTarget && (a.Oa = a.Oa.bb(b.viewTarget, .1));
  b.Wc && 160 > b.Wc && "death" !== b.$a.M && (c.O("death"), a.wa = 120, b.Xd = 60, b.$a.M = "death");
  b.Xd && (a.wa = 2, b.Xd--, b.Xd || (b.next = !0));
  b.H || (a.Oa = a.view.A);
  360 > b.H ? b.viewTarget = p(b.$a).S(new m(.5 * -c.width, .5 * -c.height)) : 600 > b.H ? (b.viewTarget = new m(320, 192), d.A.x = 408, d.dir = !0) : b.viewTarget = p(b.$a).S(new m(.5 * -c.width, .5 * -c.height));
  180 < b.H && c.B.ja.push(e => {
    const g = e.X;
    g.save();
    g.translate(-e.B.view.A.x, -e.B.view.A.y);
    g.translate(424, 304);
    g.drawImage(e.I.images.sp_polka_release, 0, 0, 48, 48, Math.floor(.25 * b.H) % 2, 0, 48, 48);
    g.translate(32, 0);
    g.save();
    g.translate(24, 0);
    g.rotate(Math.PI / 180 * b.H * 100);
    g.drawImage(e.I.images.sp_axe, 0, 0, 64, 64, -32, -32, 64, 64);
    g.restore();
    g.drawImage(e.I.images.sp_suisei_axe, Math.floor(.5 * b.H) % 2 * 48, 0, 48, 48, 0, 0, 48, 48);
    g.translate(80, 0);
    g.scale(-1, 1);
    g.drawImage(e.I.images.sp_miko_release, 0, 0, 48, 48, Math.floor(.25 * b.H) % 2, 0, 48, 48);
    g.restore();
  });
  if (180 === b.H) {
    b.$a.Lc.forEach(e => e.nb.x += 32 * (e.dir ? 1 : -1));
  } else if (600 < b.H) {
    b.Wc ? b.Wc -= 8 : b.Wc = Math.round(a.Oa.y + c.height), c.B.ja.push(e => {
      const g = e.W;
      g.save();
      g.translate(-e.B.view.A.x, -e.B.view.A.y);
      for (let h = 0; 3 > h; h++) {
        g.save(), g.translate(480, b.Wc + 32 * h), g.globalAlpha = 1 - h / 3, g.rotate(Math.PI / 180 * b.H * 100), g.drawImage(e.I.images.sp_axe, 0, 0, 64, 64, -32, -32, 64, 64), g.restore();
      }
      g.restore();
    });
  } else if (180 < b.H) {
    b.H % 4 || za(a.J, b.$a.A.S(new m(.5 * b.$a.size.x, 64)));
    for (d = 0; 2 > d; d++) {
      ra(a.J, b.$a.A.S(new m(.5 * b.$a.size.x, 64)), new m(16 * Math.random() - 8, -2), 1);
    }
    b.H % 60 || c.O("charge2");
  }
}, (c, b) => {
  const a = c.B;
  360 > b.H ? a.wa = 2 : (a.Oa && (a.Oa = null), c.B.ja.push(d => {
    const e = d.W;
    e.save();
    e.drawImage(d.I.images.bg_intro1, 0, 0, d.width, d.height, 0, 0, d.width, d.height);
    e.drawImage(d.I.images.tmp, 0, 0, d.width, d.height, 0, 0, d.width, d.height);
    e.restore();
  }));
  c.B.ja.push(d => {
    const e = d.X;
    e.save();
    180 > b.H && (e.globalAlpha = b.H / 180);
    360 < b.H && (e.globalAlpha = Math.max(0, 1 - (b.H - 360) / 120));
    e.fillStyle = "#FFF";
    e.fillRect(0, 0, d.width, d.height);
    e.restore();
  });
  480 === b.H && c.O("stage_clear");
  180 === b.H && (a.D = [], c.finished = !0, c.saveData.setItem("nuinui-save-achievement-19", !0), c.saveData.setItem("nuinui-save-item-noel", !0), c.saveData.setItem("nuinui-save-stage-6", !0));
  c.finished && (c.mode = "flare", 360 > b.H && c.B.ja.push(d => {
    d.X.save();
    d.X.translate(d.width - 32, 2 * (b.H - 240));
    d.X.rotate(b.H / Math.PI);
    d.X.drawImage(d.I.images.sp_bibi, 0, 4, 24, 12, -12, -6, 24, 12);
    d.X.restore();
  }), c.B.ja.push(d => {
    d.W.save();
    d.W.drawImage(d.I.images.ui_end, 0, 0);
    d.W.restore();
  }), c.keys.a || c.keys.start) && (c.O("select"), c.Ea = new Vb(c));
}]}]}, holo_hq:{"0_0":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (b.ua = !0, b.ha = new ("noel" === c.mode ? W : H)(c, new m(72, 112), new m(16, 32), c.mode), b.ha.ia("idle"), b.ha.Y = !1, a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "center"));
  c.keys.a && !b.ua && (b.next = !0);
  Math.floor(.05 * b.F) % 2 && a.ja.push(d => {
    b.text.ca(d, d.X, new m(.5 * d.width, d.height - 12));
  });
}, (c, b) => {
  b.ha.Y = !0;
  const a = c.B;
  b.end = !0;
  a.Sb = !0;
  c.Aa("office");
  c.yb = new Date();
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  const a = c.D.find(l => l instanceof H), d = new m(816, 96), e = p(a).x > d.x, g = new m(864, 96), h = p(a).x > g.x;
  c.ja.push(l => {
    l.W.save();
    l.W.translate(-l.B.view.A.x + d.x, -l.B.view.A.y + d.y);
    e && l.W.scale(-1, 1);
    l.W.drawImage(l.I.images.sp_okayu, Math.floor(b.H / 32) % 2 * 48, 0, 48, 48, -24, 1, 48, 48);
    l.W.restore();
    l.W.save();
    l.W.translate(-l.B.view.A.x + g.x, -l.B.view.A.y + g.y);
    h && l.W.scale(-1, 1);
    l.W.drawImage(l.I.images.sp_korone, Math.floor(b.H / 40) % 2 * 48, 0, 48, 48, -24, 1, 48, 48);
    l.W.restore();
  });
}]}], "3_0":[{fa:c => !c.B.Ee, ba:!1, timeline:[(c, b) => {
  c.B.Ee = !0;
  const a = c.B, d = new m(1120 + Math.floor(1.5 * b.H), 136 - Math.floor(Math.abs(16 * Math.sin(.1 * b.H))));
  for (c = 0; 2 > c; c++) {
    B(a.J, d.S(new m(16 * Math.random() - 8, 20 * Math.random() - 10)), new m(Math.random() - .5, -2 * Math.random()), 0);
  }
  a.ja.push(e => {
    e.Na.save();
    e.Na.translate(-a.view.A.x + d.x, -a.view.A.y + d.y);
    e.Na.drawImage(e.I.images.sp_bibi, Math.floor(b.H / 16) % 2 * 24, 0, 24, 16, -12, -8, 24, 16);
    e.Na.restore();
  });
}]}], "4_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  if (0 === b.H) {
    a.mb = 0;
    a.Eb = [0, 1, 2, 3, 4];
    for (var d = a.Eb.length - 1; 0 < d; d--) {
      var e = Math.floor(Math.random() * (d + 1));
      [a.Eb[d], a.Eb[e]] = [a.Eb[e], a.Eb[d]];
    }
    b.key = c.saveData.getItem("nuinui-save-item-key" + a.Eb[a.mb]);
  }
  const g = new m(1440, 120 - (b.Vb ? 0 : 2 * Math.sin(.05 * b.H)));
  d = a.D.find(l => l instanceof H);
  e = p(d).Ab(g);
  const h = b.key && !b.zc && 48 > e && d.ga;
  h && !b.zc && c.keys.Bb && !d.xa && (d.Y = !1, a.na && (a.na = 0), a["noel" === c.mode ? "achievement24" : "achievement23"] = !0, c.O("no_damage"), c.va(), b.zc = !0, F(c.B.J, g), E(c.B.J, g), b.Vb = 120);
  if (b.Vb) {
    90 < b.Vb && (g.x += Math.floor(4 * Math.random() - 2)), b.Vb--, b.Vb || (b.next = !0);
  } else {
    for (c = 0; 2 > c; c++) {
      B(a.J, g.S(new m(16 * Math.random() - 8, 20 * Math.random() - 10)), new m(Math.random() - .5, -2 * Math.random()), 0);
    }
  }
  a.ja.push(l => {
    l.Na.save();
    l.Na.translate(Math.round(-a.view.A.x + g.x), Math.round(-a.view.A.y + g.y));
    l.Na.drawImage(l.I.images.sp_lock, 16 * a.Eb[a.mb], 0, 16, 16, -8, -8, 16, 16);
    l.Na.restore();
    h && (l.X.save(), l.X.translate(Math.round(-a.view.A.x + 1440), Math.round(-a.view.A.y + 104)), l.X.drawImage(l.I.images.ui_text_bubble, 0, 0, 32, 32, -16, -40, 32, 32), l.X.drawImage(l.I.images.sp_key, 16 * a.Eb[a.mb], 0, 16, 16, -8, -36, 16, 16), l.X.drawImage(l.I.images.ui_arrow_down, 0, 0, 8, 8, 6, -24 - Math.floor(b.H / 32) % 2, 8, 8), l.X.restore());
  });
}, (c, b) => {
  const a = c.B;
  if (180 === b.H) {
    c = a.D.find(d => d instanceof H);
    c.dir = !0;
    switch(a.Eb[a.mb]) {
      case 0:
        a.view.A = new m(0, 384);
        c.A = new m(72, 512);
        c.dir = !0;
        break;
      case 1:
        a.view.A = new m(320, 192);
        c.A = new m(408, 320);
        c.dir = !0;
        break;
      case 2:
        a.view.A = new m(0, 192);
        c.A = new m(88, 240);
        c.dir = !0;
        a.lc = !0;
        break;
      case 3:
        a.view.A = new m(640, 192);
        c.A = new m(720, 320);
        c.dir = !0;
        break;
      case 4:
        a.view.A = new m(1280, 192), c.A = new m(1360, 320), c.dir = !0;
    }
    a.view.target = c;
    b.end = !0;
  } else {
    a.aa = 2, b.H % 60 || c.O("charge2");
  }
  a.ja.push(d => {
    const e = d.X;
    e.save();
    if (4 > b.H) {
      e.fillStyle = "#000";
    } else if (8 > b.H) {
      e.fillStyle = "#FFF";
    } else if (180 > b.H) {
      e.fillStyle = "#FFF";
      const g = b.H / 180, h = Math.pow(2, 10 * g - 10);
      e.fillRect(.5 * d.width - Math.round(.5 * d.width * h), 0, Math.round(d.width * h), d.height);
      e.globalAlpha = g;
    } else {
      e.fillStyle = "#FFF";
    }
    e.fillRect(0, 0, d.width, d.height);
    e.restore();
  });
}]}], "5_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(l => l instanceof H);
  0 === b.H && (b.key = c.saveData.getItem("nuinui-save-item-key" + a.Eb[a.mb]), d.Y = !0);
  const e = new m(1760, 120 - (b.Vb ? 0 : 2 * Math.sin(.05 * b.H))), g = p(d).Ab(e), h = b.key && !b.zc && 48 > g && d.ga;
  h && !b.zc && c.keys.Bb && !d.xa && (d.Y = !1, a.na && (a.na = 0), c.O("no_damage"), c.va(), b.zc = !0, F(c.B.J, e), E(c.B.J, e), b.Vb = 120);
  if (b.Vb) {
    90 < b.Vb && (e.x += Math.floor(4 * Math.random() - 2)), b.Vb--, b.Vb || (b.next = !0);
  } else {
    for (c = 0; 2 > c; c++) {
      B(a.J, e.S(new m(16 * Math.random() - 8, 20 * Math.random() - 10)), new m(Math.random() - .5, -2 * Math.random()), 0);
    }
  }
  a.ja.push(l => {
    l.Na.save();
    l.Na.translate(Math.round(-a.view.A.x + e.x), Math.round(-a.view.A.y + e.y));
    l.Na.drawImage(l.I.images.sp_lock, 16 * a.Eb[a.mb], 0, 16, 16, -8, -8, 16, 16);
    l.Na.restore();
    h && (l.X.save(), l.X.translate(Math.round(-a.view.A.x + 1760), Math.round(-a.view.A.y + 104)), l.X.drawImage(l.I.images.ui_text_bubble, 0, 0, 32, 32, -16, -40, 32, 32), l.X.drawImage(l.I.images.sp_key, 16 * a.Eb[a.mb], 0, 16, 16, -8, -36, 16, 16), l.X.drawImage(l.I.images.ui_arrow_down, 0, 0, 8, 8, 6, -24 - Math.floor(b.H / 32) % 2, 8, 8), l.X.restore());
  });
}, (c, b) => {
  const a = c.B;
  if (180 === b.H) {
    c = a.D.find(d => d instanceof H);
    c.dir = !0;
    switch(a.Eb[a.mb]) {
      case 0:
        a.view.A = new m(0, 384);
        c.A = new m(72, 512);
        c.dir = !0;
        break;
      case 1:
        a.view.A = new m(320, 192);
        c.A = new m(408, 320);
        c.dir = !0;
        break;
      case 2:
        a.view.A = new m(0, 192);
        c.A = new m(88, 240);
        c.dir = !0;
        a.lc = !0;
        break;
      case 3:
        a.view.A = new m(640, 192);
        c.A = new m(720, 320);
        c.dir = !0;
        break;
      case 4:
        a.view.A = new m(1280, 192), c.A = new m(1360, 320), c.dir = !0;
    }
    a.view.target = c;
    b.end = !0;
  } else {
    a.aa = 2, b.H % 60 || c.O("charge2");
  }
  a.ja.push(d => {
    const e = d.X;
    e.save();
    if (4 > b.H) {
      e.fillStyle = "#000";
    } else if (8 > b.H) {
      e.fillStyle = "#FFF";
    } else if (180 > b.H) {
      e.fillStyle = "#FFF";
      const g = b.H / 180, h = Math.pow(2, 10 * g - 10);
      e.fillRect(.5 * d.width - Math.round(.5 * d.width * h), 0, Math.round(d.width * h), d.height);
      e.globalAlpha = g;
    } else {
      e.fillStyle = "#FFF";
    }
    e.fillRect(0, 0, d.width, d.height);
    e.restore();
  });
}]}], "0_2":[{fa:() => !0, ba:!1, timeline:[c => {
  c = c.B;
  c.wa || c.ja.push(b => {
    const a = b.W;
    a.save();
    a.drawImage(b.I.images.bg_kiara, 0, 0, 320, 192, 0, 0, 320, 192);
    a.restore();
  });
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (d.Y = !1, b.L = [{A:{x:-16, y:384}, size:{x:16, y:192}}, {A:{x:320, y:384}, size:{x:16, y:192}}, {A:{x:0, y:368}, size:{x:320, y:16}}], a.P.L.push(...b.L), b.N = new tb(new m(232, 512), 64), b.N.ia("idle"), b.N.dir = !1, a.D.push(b.N));
  60 === b.H && (b.N.ia("charge"), a.Ha = !0, c.Aa("kiara"));
  75 === b.H && b.N.ia("idle");
  90 === b.H && b.N.ia("charge");
  120 === b.H && (b.N.ia("idle"), a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("takanashi kiara"), "left"));
  240 === b.H && (a.Ha = !1, d.Y = !0, b.N.M = "idle");
  384 >= d.A.y && (d.C.y = 0);
  b.N && b.N.jf && ((24 > d.A.x || 280 < d.A.x) && d.oa(c, d), a.ja.push(e => {
    const g = e.Na;
    g.save();
    for (var h = 0; 6 > h; h++) {
      g.drawImage(e.I.images.sp_kiara_fire, Math.floor(.25 * b.H) % 4 * 24, 0, 24, 32, 16 * Math.sin(b.H) - 12, 32 * h, 24, 32);
    }
    g.translate(320, 0);
    for (h = 0; 6 > h; h++) {
      g.drawImage(e.I.images.sp_kiara_fire, Math.floor(.25 * b.H) % 4 * 24, 0, 24, 32, -16 * Math.sin(b.H) - 12, 32 * h, 24, 32);
    }
    g.restore();
  }));
  b.N && !b.N.G && (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), c.va(), b.next = !0);
  a.ja.push(e => {
    if (60 > b.H) {
      const g = b.H / 60, h = e.X;
      h.save();
      h.fillStyle = "#FFF";
      h.globalAlpha = 1 - g;
      h.fillRect(0, 0, e.width, e.height);
      h.restore();
    }
  });
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof tb)), d.Y = !0);
  240 === b.H && (d.Y = !1, d.C = new m(0, 0), d.dir = !0, 4 > a.mb ? (a.view.A = new m(1600, 192), d.A = new m(1656, 288), a.mb++) : (a.view.A = new m(1920, 0), d.A = new m(1984, 80)), a.Oa = null, a.view.target = d, c.Aa("office"), b.end = !0);
  180 < b.H && a.ja.push(e => {
    const g = e.X;
    g.save();
    g.globalAlpha = (b.H - 180) / 60;
    g.fillStyle = "#FFF";
    g.fillRect(0, 0, e.width, e.height);
    g.restore();
  });
}]}], "0_1":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  b.H % 16 || sa(a.J, new m(Math.random() * c.width, 192 + 192 * Math.random()), new m(0, -.5 - Math.random()), 0);
  a.wa || a.ja.push(d => {
    const e = d.W;
    e.save();
    for (let g = 0; g < d.height; g++) {
      e.drawImage(d.I.images.bg_gura, 0, g, d.width, 1, -Math.round(4 * (1 + Math.sin(Math.PI / 180 * (b.H + g) * .5))), g, 320, 1);
    }
    e.drawImage(d.I.images.bg_gura, 0, 192, 320, 192, 0, 0, 320, 192);
    e.restore();
  });
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  60 === b.H && (b.L = [{A:{x:-16, y:192}, size:{x:16, y:192}}, {A:{x:320, y:192}, size:{x:16, y:192}}, {A:{x:-16, y:176}, size:{x:320, y:16}}], a.P.L.push(...b.L), d.Y = !1, a.Ha = !0, b.N = new pb(new m(-32, 224), 64), a.D.push(b.N), b.N.M = "move", b.N.Z = !0, b.N.uc = !0, b.N.C.x = 3, c.Aa("gura"));
  90 === b.H && (a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("gawr gura"), "left"));
  240 === b.H && (b.N.uc = !1, a.Ha = !1, d.Y = !0);
  192 >= d.A.y && (d.C.y = 0);
  d.ga && (40 > d.A.x || 264 < d.A.x) && d.oa(c, d);
  b.N && !b.N.G && (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), c.va(), b.next = !0);
  a.ja.push(e => {
    if (60 > b.H) {
      const g = b.H / 60, h = e.X;
      h.save();
      h.fillStyle = "#FFF";
      h.globalAlpha = 1 - g;
      h.fillRect(0, 0, e.width, e.height);
      h.restore();
    }
  });
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof pb)), d.Y = !0);
  240 === b.H && (a.lc = !1, d.Y = !1, d.C = new m(0, 0), d.dir = !0, 4 > a.mb ? (a.view.A = new m(1600, 192), d.A = new m(1656, 288), a.mb++) : (a.view.A = new m(1920, 0), d.A = new m(1984, 80)), a.Oa = null, a.view.target = d, c.Aa("office"), b.end = !0);
  180 < b.H && a.ja.push(e => {
    const g = e.X;
    g.save();
    g.globalAlpha = (b.H - 180) / 60;
    g.fillStyle = "#FFF";
    g.fillRect(0, 0, e.width, e.height);
    g.restore();
  });
}]}], "1_1":[{fa:() => !0, ba:!1, timeline:[c => {
  c = c.B;
  c.wa || c.ja.push(b => {
    const a = b.W;
    a.save();
    a.drawImage(b.I.images.bg_calli, 0, 0, 320, 192, 0, 0, 320, 192);
    a.restore();
  });
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (d.Y = !1, a.na && (a.na = 0), b.L = [{A:{x:304, y:192}, size:{x:16, y:192}}, {A:{x:640, y:192}, size:{x:16, y:192}}], a.P.L.push(...b.L), b.N = new U(new m(552, 320), 64), b.N.ia("hide"), b.N.dir = !1, a.D.push(b.N), c.va());
  60 === b.H && (a.Ha = !0, a.N = b.N, a.N.icon = 1);
  160 === b.H && (b.N.vc = new qb(b.N.A.S(new m(.5 * b.N.size.x - 24, -192)), b.N), a.D.unshift(b.N.vc));
  180 === b.H && (b.N.ia("point"), c.Aa("mori"), c.O("dash"), a.ya = new Y(Array.from("mori calliope"), "left"));
  240 === b.H && (b.N.vc.uc = !1, b.N.vc.aa = 15, c.O("slash"));
  300 === b.H && (b.N.ia("idle"), b.N.M = "idle", a.Ha = !1, d.Y = !0);
  192 >= d.A.y && (d.C.y = 0);
  b.N.G || (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), c.va(), b.next = !0);
  180 < b.H && 240 > b.H && (220 > b.H || Math.floor(.5 * b.H) % 2) && a.ja.push(e => {
    const g = e.X, h = b.H - 180;
    g.save();
    g.translate(Math.round(-a.view.A.x + 560 + h), Math.round(-a.view.A.y + 320 - .5 * h));
    Math.floor(.25 * b.H) % 2 && g.scale(-1, -1);
    g.drawImage(e.I.images.sp_cloak, 0, 0, 48, 24, -24, -12, 48, 24);
    g.restore();
  });
  a.ja.push(e => {
    if (60 > b.H) {
      const g = b.H / 60, h = e.X;
      h.save();
      h.fillStyle = "#FFF";
      h.globalAlpha = 1 - g;
      h.fillRect(0, 0, e.width, e.height);
      h.restore();
    }
  });
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof U)), d.Y = !0);
  240 === b.H && (d.Y = !1, d.C = new m(0, 0), d.dir = !0, 4 > a.mb ? (a.view.A = new m(1600, 192), d.A = new m(1656, 288), a.mb++) : (a.view.A = new m(1920, 0), d.A = new m(1984, 80)), a.Oa = null, a.view.target = d, c.Aa("office"), b.end = !0);
  180 < b.H && a.ja.push(e => {
    const g = e.X;
    g.save();
    g.globalAlpha = (b.H - 180) / 60;
    g.fillStyle = "#FFF";
    g.fillRect(0, 0, e.width, e.height);
    g.restore();
  });
}]}], "2_1":[{fa:() => !0, ba:!1, timeline:[c => {
  const b = c.B;
  b.wa || b.ja.push(a => {
    const d = a.W;
    d.save();
    d.drawImage(a.I.images[b.Tc ? "bg_port_scroll_alt2" : "bg_port_scroll2"], 0, 0, 320, 160, 0, 0, 320, 160);
    d.drawImage(a.I.images[b.Tc ? "bg_port_scroll_alt" : "bg_port_scroll"], 0, 0, 320, 160, 0, 16, 320, 160);
    d.restore();
  });
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (d.Y = !1, a.na && (a.na = 0), a.view.A = new m(640, 192), a.Oa = a.view.A, b.L = [{A:{x:624, y:192}, size:{x:16, y:192}}, {A:{x:960, y:192}, size:{x:16, y:192}}, {A:{x:624, y:176}, size:{x:320, y:16}}], a.P.L.push(...b.L), a.Tc = !0, c.va());
  1 === b.H && (d.Y = !0);
  864 < d.A.x && (d.Y = !1, b.next = !0, a.aa = 60, c.O("charge2"));
  a.ja.push(e => {
    if (60 > b.H) {
      const g = b.H / 60, h = e.X;
      h.save();
      h.fillStyle = "#FFF";
      h.globalAlpha = 1 - g;
      h.fillRect(0, 0, e.width, e.height);
      h.restore();
    }
  });
}, (c, b) => {
  const a = c.B, d = a.D.find(g => g instanceof H);
  30 === b.H && (d.dir = !1);
  if (90 === b.H) {
    c.Aa("ina");
    b.N = new rb(new m(712, 384), 64);
    b.N.Ra = new m(712, 304);
    b.N.ia("idle");
    b.N.dir = !0;
    a.D.push(b.N);
    var e = [new V(new m(672, 392)), new V(new m(688, 384)), new V(new m(712, 400)), new V(new m(720, 400)), new V(new m(752, 384)), new V(new m(768, 392))];
    a.D.push(...e);
    e.forEach(g => g.Ra = new m(g.A.x, g.A.y - 64));
  }
  120 === b.H && (a.Ha = !0, a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("ninomae inanis"), "left"), a.aa = 60, b.N.Lb(c, 40), b.N.Lb(c, 41), b.N.Lb(c, 42), b.N.Lb(c, 43), b.N.Lb(c, 44), b.N.Lb(c, 45), b.N.Lb(c, 46), b.N.Lb(c, 47), b.N.Lb(c, 48), b.N.Lb(c, 49));
  240 === b.H && (b.N.M = "idle", a.Ha = !1, d.Y = !0, b.Ad = 0);
  if (240 < b.H && b.N.G && b.N.xb && !(Math.floor(b.H * b.N.xb) % 2)) {
    b.Ad++;
    b.Ad % 16 || b.N.Lb(c, 49 + Math.floor(b.Ad / 16), !0);
    a.view.A.x++;
    a.D.filter(g => g instanceof V || g instanceof rb).forEach(g => {
      g.A.x++;
      g.Ra && g.Ra.x++;
      g.Sc && g.Sc.x++;
      g.Xb && g.Xb.x++;
    });
    b.L[0].A.x++;
    b.L[1].A.x++;
    b.L[2].A.x++;
    if (960 === a.view.A.x) {
      b.Ad = 0;
      a.view.A.x -= 320;
      b.L[0].A.x -= 320;
      b.L[1].A.x -= 320;
      b.L[2].A.x -= 320;
      a.D.forEach(g => {
        g.A.x -= 320;
        g.Ra && (g.Ra.x -= 320);
        g.Sc && (g.Sc.x -= 320);
        g.Xb && (g.Xb.x -= 320);
      });
      a.J.La.forEach(g => g.A.x -= 320);
      for (e = 50; 60 > e; e++) {
        a.ma[`${e + 20}_21`] && (a.ma[`${e}_21`] = a.ma[`${e + 20}_21`], a.ma[`${e}_22`] = a.ma[`${e + 20}_22`], a.P.L.push({A:{x:16 * e, y:352}, size:{x:16, y:16}}));
      }
      for (e = 60; 80 > e; e++) {
        a.ma[`${e}_21`] = "2a", a.ma[`${e}_22`] = "29", a.P.L.push({A:{x:16 * e, y:352}, size:{x:16, y:16}});
      }
    }
    a.Oa = a.view.A;
  }
  b.N && (352 <= d.A.y || d.A.x + 64 < b.N.A.x) && (d.A = new m(b.N.A.x + 160, 256), d.oa(c, d), d.C.x = 0);
  if (b.N && !b.N.G) {
    for (e = 40; 80 > e; e++) {
      a.background[`${e}_22`] = "40", a.background[`${e}_23`] = "41", a.ma[`${e}_21`] = "2a", a.ma[`${e}_22`] = "29", delete a.ma[`${e}_23`], a.P.L.push({A:{x:16 * e, y:352}, size:{x:16, y:16}});
    }
    a.Tc = !1;
    c.O("level_start");
    a.wa = 60;
    a.na = 0;
    a.N = null;
    a.ya = null;
    d.Y = !1;
    b.N.M = "defeated";
    a.D = a.D.filter(g => !(g instanceof L));
    a.D = a.D.filter(g => !(g instanceof V));
    c.va();
    b.next = !0;
  }
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof rb)), d.Y = !0);
  240 === b.H && (d.Y = !1, d.C = new m(0, 0), d.dir = !0, 4 > a.mb ? (a.view.A = new m(1600, 192), d.A = new m(1656, 288), a.mb++) : (a.view.A = new m(1920, 0), d.A = new m(1984, 80)), a.Oa = null, a.view.target = d, c.Aa("office"), b.end = !0);
  180 < b.H && a.ja.push(e => {
    const g = e.X;
    g.save();
    g.globalAlpha = (b.H - 180) / 60;
    g.fillStyle = "#FFF";
    g.fillRect(0, 0, e.width, e.height);
    g.restore();
  });
}]}], "4_1":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (d.Y = !1, b.N = new Db(new m(1512, 320), 64), b.N.ia(a.pd ? "smug" : "intro"), b.N.dir = !1, a.D.push(b.N), c.va());
  60 === b.H && (a.pd || (b.N.ia("look"), b.N.dir = !0), a.Ha = !0, c.Aa("amelia"));
  120 !== b.H || a.pd || (b.N.dir = !1);
  180 === b.H && (a.pd || b.N.ia("intro"), a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("amelia watson"), "left"));
  300 === b.H && (a.Ha = !1, d.Y = !0, b.N.M = "idle", b.N.ia("idle"));
  300 > b.H && a.pd && (d.aa = 3, a.ja.push(e => {
    const g = b.H / 300, h = e.W;
    h.save();
    h.fillStyle = "#FFF";
    h.globalAlpha = 1 - g;
    h.translate(.5 * e.width, .5 * e.height);
    h.rotate(.02 * -Math.PI * b.H);
    h.drawImage(e.I.images.sp_ame_spiral, 0, 0, 320, 320, -160, -160, 320, 320);
    h.restore();
  }));
  b.N && !b.N.G && (!a.na && !a.fc || c.saveData.getItem("nuinui-save-achievement-22") || c.saveData.setItem("nuinui-save-achievement-22", !0), c.O("level_start"), a.wa = 60, a.na = 0, a.fc = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), c.va(), b.next = !0);
  a.ja.push(e => {
    if (60 > b.H) {
      const g = b.H / 60, h = e.X;
      h.save();
      h.fillStyle = "#FFF";
      h.globalAlpha = 1 - g;
      h.fillRect(0, 0, e.width, e.height);
      h.restore();
    }
  });
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof Db)), d.Y = !0);
  240 === b.H && (d.Y = !1, d.C = new m(0, 0), d.dir = !0, 4 > a.mb ? (a.view.A = new m(1600, 192), d.A = new m(1656, 288), a.mb++) : (a.view.A = new m(1920, 0), d.A = new m(1984, 80)), a.Oa = null, a.view.target = d, c.Aa("office"), b.end = !0);
  180 < b.H && a.ja.push(e => {
    const g = e.X;
    g.save();
    g.globalAlpha = (b.H - 180) / 60;
    g.fillStyle = "#FFF";
    g.fillRect(0, 0, e.width, e.height);
    g.restore();
  });
}]}], "6_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  0 === b.H && (a.Uc = !0, b.L = [{A:{x:1904, y:-192}, size:{x:16, y:384}}, {A:{x:2240, y:-192}, size:{x:16, y:384}}, {A:{x:2064, y:112}, size:{x:32, y:16}}, {A:{x:2056, y:96}, size:{x:8, y:32}}, {A:{x:2096, y:96}, size:{x:8, y:32}}], a.P.L.push(...b.L), d.Y = !0);
  !b.Md && 2072 < d.A.x && (d.Y = !1, d.A.x = 2073.6, d.C.x = 0, b.Md = !0, b.dd = 0);
  b.Md && (60 === b.dd && c.O("peko"), 120 === b.dd && (y(c.B.J, p(d)), c.B.aa = 15, c.O("rumble")), 120 < b.dd && (d.C.y = -4), b.dd++, -192 > d.A.y && (c.saveData.setItem("nuinui-save-stage-7", !0), a.ee && c.saveData.setItem("nuinui-save-achievement-23", !0), a.fe && c.saveData.setItem("nuinui-save-achievement-24", !0), c.Ea = new Rb(c, !0), c.va(), b.end = !0));
  a.ja.push(e => {
    e.W.save();
    e.W.translate(-e.B.view.A.x, -e.B.view.A.y);
    e.W.drawImage(e.I.images.sp_peko_cannon, 0, 0, 48, 10, 2056, 88, 48, 10);
    e.W.translate(2160, 0);
    e.W.scale(-1, 1);
    e.W.drawImage(e.I.images.sp_nousagi, Math.floor(b.H / 16) % 2 ? 0 : 24, 24, 24, 24, 16, 105, 24, 24);
    e.W.translate(-16, 0);
    2160 < d.A.x && e.W.scale(-1, 1);
    !b.Md || 60 > b.dd ? e.W.drawImage(e.I.images.sp_pekora_idle, 0, 0, 48, 48, -24, 86, 48, 48) : e.W.drawImage(e.I.images.sp_pekora_laugh, Math.floor(.125 * b.H) % 2 * 48, 0, 48, 48, -24, 86, 48, 48);
    e.W.restore();
    e.Na.save();
    e.Na.translate(-e.B.view.A.x, -e.B.view.A.y);
    e.Na.drawImage(e.I.images.sp_peko_cannon, 0, 10, 48, 38, 2056, 98, 48, 38);
    e.Na.restore();
  });
  b.H % 4 || ya(c.B.J, a.view.A.S(new m(Math.floor(Math.random() * c.width), Math.floor(Math.random() * c.height))), new m(Math.random(), -4), 0);
}]}]}, heaven:{"0_6":[{fa:c => 0 === c.B.F, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.ua && !c.keys.a && (b.ua = !1);
  0 === b.F && (c.Va(), b.ua = !0, b.ha = new ("noel" === c.mode ? W : H)(c, new m(-16, 1344), new m(16, 32), c.mode), b.ha.ia("idle"), b.ha.Y = !1, b.ha.C = new m(0, -16), a.Uc = !0, a.bc = !0, a.view.target = b.ha, a.D.push(b.ha), b.text = new Y(Array.from("press z to start"), "center"));
  b.ha && (b.ha.ga ? c.keys.a && !b.ua && (b.next = !0) : b.ha.C.x = 3.5);
  Math.floor(.05 * b.F) % 2 && a.ja.push(d => {
    b.text.ca(d, d.X, new m(.75 * d.width - 16, d.height - 12));
  });
}, (c, b) => {
  b.ha.Y = !0;
  const a = c.B;
  b.end = !0;
  a.Sb = !0;
  c.Aa("kiseki");
  c.yb = new Date();
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Y && (b.A && d.A.y > a.P.A.y + a.P.size.y ? (d.A = b.A.value(), d.oa(c, d)) : d.xa || (b.A ? a.P.L.find(e => v({A:{x:d.A.x, y:d.A.y + d.size.y}, size:{x:d.size.x, y:0}}, e, "y") && q(d, e, "x")) && (b.A = d.A.value()) : b.A = d.A.value()));
}]}, {fa:() => !0, ba:!0, timeline:[(c, b) => {
  const a = c.B;
  b.H % 4 || !a.bc || ya(c.B.J, a.view.A.S(new m(Math.floor(Math.random() * c.width), Math.floor(Math.random() * c.height))), new m(-4, Math.random()), 0);
}]}], "1_6":[{fa:c => c.B.Uc, ba:!1, timeline:[c => {
  c.B.Uc = !1;
}]}], "3_6":[{fa:c => !c.B.re, ba:!1, timeline:[c => {
  const b = c.B, a = b.D.find(d => d instanceof H);
  1120 < a.A.x && (a.Y = !1, c.Fa.right = !0);
  1216 < a.A.x ? (a.Ia = !0, a.C.x = 2) : b.ja.push(d => {
    d.Na.save();
    d.Na.translate(-d.B.view.A.x, -d.B.view.A.y);
    d.Na.drawImage(d.I.images.sp_flare_moto, 48, 0, 48, 48, 1200, 1264, 48, 48);
    d.Na.restore();
  });
}]}], "4_6":[{fa:c => !c.B.re, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (d.Y = !0, c.Fa.right = null, b.ce = 2, b.speed = 2, b.eb = [], b.Ob = (e, g) => {
    g = new e(g);
    e !== Kb && (g.dir = !1);
    b.eb.push(g);
    a.D.push(g);
  });
  d.C.x = b.speed;
  7 > d.C.x && 1760 <= d.A.x + .5 * d.size.x ? (a.D = a.D.filter(e => e.A.x + e.size.x > a.view.A.x), a.D.forEach(e => e.A.x -= 320), a.J.La.forEach(e => e.A.x -= 320), a.view.A.x -= 320, 3 < b.speed && (b.Ob(I, a.view.A.ka(.0625).S(new m(30, .5 > Math.random() ? 3.5 : 6))), b.Ob(Kb, a.view.A.ka(.0625).S(new m(25 + Math.floor(8 * Math.random()), 9.5))))) : 7 < d.C.x ? a.ja.push(e => {
    e.X.save();
    e.X.fillStyle = "#fff";
    e.X.globalAlpha = Math.min(1, Math.max(0, 1 - (1920 - d.A.x) / 160));
    e.X.fillRect(0, 0, e.width, e.height);
    e.X.restore();
  }) : b.H % 30 || (b.speed += .05);
  b.ce = .9 * b.ce + .1 * d.C.x;
  a.ja.push(e => {
    e.X.save();
    e.X.fillStyle = "#fff";
    for (var g = 0; g < e.height; g++) {
      .99 < Math.random() && e.X.fillRect(0, g, Math.round(.125 * e.width * Math.random() * b.speed), 1);
    }
    g = (b.ce - 2) / 5;
    e.X.fillStyle = "#FFF";
    e.X.translate(.5 * e.width, e.height - 3);
    6 < b.speed && e.X.translate(Math.round(2 * Math.random() - 1), Math.round(Math.random()));
    e.X.drawImage(e.I.images.ui_speed, 0, 0, 64, 32, -32, -29, 64, 32);
    e.X.rotate(Math.PI + Math.PI * g);
    e.X.fillRect(0, -1, 22, 2);
    e.X.restore();
  });
  if (180 < b.H && 600 > b.H) {
    const e = new m(b.H - 180 - 48, 112 + Math.floor(b.H / 4) % 2);
    z(c.B.J, a.view.A.S(e.S(new m(8, 40))), new m(-4, 0), 0);
    a.ja.push(g => {
      g.W.save();
      g.W.drawImage(g.I.images.sp_watame, 144, 0, 48, 48, e.x, e.y, 48, 48);
      g.W.restore();
    });
  }
  a.xc && d.ga && !d.C.y && (a.xc = !1);
}]}], "6_6":[{fa:c => c.B.D.find(b => b instanceof H).Ia, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Ia = !1;
  d.C = new m(8, -4);
  y(c.B.J, p(d));
  c.B.aa = 4;
  c.O("rumble");
  a.re = !0;
  b.end = !0;
}]}], "7_4":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  if (!b.H) {
    a.bc = !0;
    const d = a.P.A;
    b.Qb = [{A:d.S((new m(9, 26)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(10, 26)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(11, 26)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(15, 23)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(16, 23)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(5, 16)).ka(16)), size:new m(16, 16), ta:!0, frame:120, 
    offset:0, active:!0}, {A:d.S((new m(5, 12)).ka(16)), size:new m(16, 16), ta:!0, frame:120, offset:0}, {A:d.S((new m(14, 12)).ka(16)), size:new m(16, 16), ta:!0, frame:120, offset:0}];
    b.Qb.forEach(e => {
      delete a.ma[`${e.A.x / 16}_${e.A.y / 16}`];
    });
    a.P.L = a.P.L.filter(e => !b.Qb.some(g => g.A.Jc(e.A)));
  }
  b.Qb.filter(d => !((b.H + d.offset) % d.frame)).forEach(d => {
    d.active = !d.active;
    c.O("elevator");
    d.active ? (a.P.L.push(d), a.ma[`${d.A.x / 16}_${d.A.y / 16}`] = "06") : (a.P.L = a.P.L.filter(e => e !== d), delete a.ma[`${d.A.x / 16}_${d.A.y / 16}`]);
  });
}]}], "9_4":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Y && !d.xa && (b.A && d.A.y > a.P.A.y + a.P.size.y ? (d.A = b.A.value(), d.oa(c, d), d.C.x = 0) : b.A || (b.A = d.A.value()));
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  if (!b.H) {
    a.bc = !1;
    const d = a.P.A;
    b.Qb = [{A:d.S((new m(5, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(6, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(7, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(8, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(9, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(10, 5)).ka(16)), size:new m(16, 
    16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(10, 6)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(10, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(10, 8)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(10, 9)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(18, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(19, 10)).ka(16)), 
    size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(20, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(21, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(21, 8)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(21, 9)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(31, 2)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(31, 
    3)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(31, 4)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, Kb:!0}, {A:d.S((new m(28, 6)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(28, 10)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}];
    b.Qb.forEach(e => {
      delete a.ma[`${e.A.x / 16}_${e.A.y / 16}`];
    });
    a.P.L = a.P.L.filter(e => !b.Qb.some(g => g.A.Jc(e.A)));
  }
  b.Qb.filter(d => !((b.H + d.offset) % d.frame)).forEach(d => {
    d.active = !d.active;
    c.O("elevator");
    d.active ? (a.P.L.push(d), a.ma[`${d.A.x / 16}_${d.A.y / 16}`] = "06") : (a.P.L = a.P.L.filter(e => e !== d), delete a.ma[`${d.A.x / 16}_${d.A.y / 16}`]);
  });
}]}], "9_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  a.bc = !0;
  const d = a.D.find(e => e instanceof H);
  d.Y && (b.A && d.A.y > a.P.A.y + a.P.size.y ? (d.A = b.A.value(), d.oa(c, d)) : b.A ? a.P.L.find(e => !e.ta && v({A:{x:d.A.x, y:d.A.y + d.size.y}, size:{x:d.size.x, y:0}}, e, "y") && q(d, e, "x")) && (b.A = d.A.value()) : b.A = d.A.value());
}]}], "8_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  a.bc = !0;
  if (!a.Wd) {
    var d = a.D.find(e => e instanceof H);
    b.A && d.A.y + 32 >= a.P.A.y + a.P.size.y ? (d.A = b.A.value(), d.oa(c, d), d.C.x = 0, a.ge = !1) : b.A ? a.P.L.find(e => !e.ta && v({A:{x:d.A.x, y:d.A.y + d.size.y}, size:{x:d.size.x, y:0}}, e, "y") && q(d, e, "x")) && (b.A = d.A.value()) : b.A = d.A.value();
  }
}]}, {fa:c => !c.B.Wd && 2824 < c.B.D.find(b => b instanceof H).A.x, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (a.na = 0, d.C.x = 0, d.Y = !1, c.Fa.left = !0, a.Uc = !0, a.ge = !0);
  2824 > d.A.x && c.Va();
  60 === b.H && (b.L = [{A:{x:2544, y:-192}, size:{x:16, y:384}}, {A:{x:2880, y:-192}, size:{x:16, y:384}}], a.P.L.push(...b.L), a.Ha = !0, b.N = new vb(new m(2688, -64), 64), a.D.push(b.N), b.N.M = "move", b.N.Z = !1, b.N.uc = !0, b.N.C.x = -3, b.N.C.y = 2);
  90 === b.H && (a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("amane kanata"), "left"));
  240 === b.H && (b.N.uc = !1, a.Ha = !1, d.Y = !0);
  b.N && !b.N.G && (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "defeated", a.D = a.D.filter(e => !(e instanceof L)), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  180 === b.H && (a.D = a.D.filter(e => !(e instanceof vb)), c.B.D.push(new eb()), d.Y = !0, a.ge && c.saveData.setItem("nuinui-save-achievement-26", !0), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  if (!a.D.find(e => e instanceof eb) && !a.Wd) {
    for (d.C.x = 0, d.Y = !1, a.Wd = !0, a.P.L = a.P.L.filter(e => !b.L.includes(e)), a.P.L = a.P.L.filter(e => 144 !== e.A.y), a.aa = 4, c.O("rumble"), c = 0; 6 > c; c++) {
      delete a.ma[`${167 + c}_${9}`];
    }
  }
  160 < d.A.y && (d.Rb = !0, d.Y = !0, a.Uc = !1, b.end = !0);
}]}], "6_1":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(h => h instanceof H), e = new m(2336, 304), g = p(d).x > e.x;
  if (!a.Qc && a.D.find(h => h instanceof O && 2368 < h.A.x && 2400 > h.A.x && 320 < h.A.y)) {
    for (a.aa = 15, a.Qc = !0, c.O("charge2"), c = 0; 5 > c; c++) {
      delete a.ma[`${141}_${17 + c}`], a.P.L = a.P.L.filter(h => !(2256 === h.A.x && 256 < h.A.y && 352 > h.A.y));
    }
  }
  a.ja.push(h => {
    h.W.save();
    h.W.translate(-h.B.view.A.x + e.x, -h.B.view.A.y + e.y);
    h.W.drawImage(h.I.images.sp_switch, a.Qc ? 0 : 40, 0, 40, 24, 28, 24, 40, 24);
    (g || !a.Qc && Math.floor(b.H / 32) % 2) && h.W.scale(-1, 1);
    h.W.drawImage(h.I.images.sp_luna, a.Qc ? 0 : 48, 0, 48, 48, -24, 1 + Math.floor(b.H / 16 + 1) % 2 * (a.Qc ? 0 : 1), 48, 48);
    h.W.restore();
  });
}]}], "8_1":[{fa:c => c.B.Qc && !c.B.Le, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  a.Le = !0;
  [48, 59].forEach(d => {
    for (let e = 167; 173 > e; e++) {
      delete a.ma[`${e}_${d}`], a.P.L = a.P.L.filter(g => !(g.A.x === 16 * e && g.A.y === 16 * d));
    }
  });
  [166, 173].forEach(d => {
    for (let e = 50; 58 > e; e++) {
      a.ma[`${d}_${e}`] = "17", a.P.L.push({A:{x:16 * d, y:16 * e}, size:{x:16, y:16}});
    }
  });
  b.end = !0;
}]}], "8_6":[{fa:c => !c.B.He, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (a.bc = !1, a.na = 0, d.Y = !1);
  60 === b.H && (b.L = [{A:{x:2672, y:1152}, size:{x:96, y:16}}, {A:{x:2560, y:1264}, size:{x:16, y:48}}], a.P.L.push(...b.L), a.Ha = !0, b.N = new xb(new m(2688, 1280), 64), b.N.M = "intro", a.D.unshift(b.N));
  !a.N && b.N && "intro" !== b.N.M && (d.Y = !0, a.N = b.N, a.N.icon = 1, a.Ha = !1);
  !(30 < b.H) || a.N || b.H % 60 || c.O("charge2");
  b.N && !b.N.G && (c.O("level_start"), a.wa = 120, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "end", a.D = a.D.filter(e => !(e instanceof L)), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  if (180 === b.H) {
    a.D = a.D.filter(e => !(e instanceof xb || e instanceof yb));
    a.P.L = a.P.L.filter(e => !b.L.includes(e));
    for (let e = 0; 3 > e; e++) {
      delete a.ma[`${160}_${79 + e}`];
    }
    a.aa = 4;
    c.O("rumble");
    d.Y = !0;
    a.He = !0;
    c.saveData.setItem("nuinui-save-achievement-27", !0);
    b.end = !0;
  }
}]}], "4_3":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Y && (b.A && d.A.y > a.P.A.y + a.P.size.y ? (d.A = b.A.value(), d.oa(c, d), d.C.x = 0) : b.A ? !d.xa && a.P.L.find(e => !e.ta && v({A:{x:d.A.x, y:d.A.y + d.size.y}, size:{x:d.size.x, y:0}}, e, "y") && q(d, e, "x")) && (b.A = d.A.value()) : b.A = d.A.value());
}]}], "2_3":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  d.Y && (b.A && d.A.y > a.P.A.y + a.P.size.y ? (d.A = b.A.value(), d.oa(c, d), d.C.x = 0) : b.A ? !d.xa && a.P.L.find(e => !e.ta && v({A:{x:d.A.x, y:d.A.y + d.size.y}, size:{x:d.size.x, y:0}}, e, "y") && q(d, e, "x")) && (b.A = d.A.value()) : b.A = d.A.value());
}]}, {fa:() => !0, ba:!1, timeline:[(c, b) => {
  c = c.B;
  b.H || (c.bc = !0, b.bd = new Jb(new m(45, 56), 0), b.dir = !0, c.D.push(b.bd));
  if (720 > b.bd.A.x || 1008 < b.bd.A.x) {
    b.dir = !b.dir;
  }
  b.bd.A.x += .5 * (b.dir ? 1 : -1);
}]}], "0_2":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B;
  if (!b.H) {
    a.bc = !1;
    const d = a.P.A;
    b.Qb = [{A:d.S((new m(2, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(3, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(4, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(5, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(6, 7)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(2, 11)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(3, 
    11)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(4, 11)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(5, 11)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(6, 11)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0, active:!0}, {A:d.S((new m(15, 18)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, {A:d.S((new m(16, 18)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}, 
    {A:d.S((new m(17, 18)).ka(16)), size:new m(16, 16), ta:!0, frame:90, offset:0}];
    b.Qb.forEach(e => {
      delete a.ma[`${e.A.x / 16}_${e.A.y / 16}`];
    });
    a.P.L = a.P.L.filter(e => !b.Qb.some(g => g.A.Jc(e.A)));
  }
  b.Qb.filter(d => !((b.H + d.offset) % d.frame)).forEach(d => {
    d.active = !d.active;
    c.O("elevator");
    d.active ? (a.P.L.push(d), a.ma[`${d.A.x / 16}_${d.A.y / 16}`] = "06") : (a.P.L = a.P.L.filter(e => e !== d), delete a.ma[`${d.A.x / 16}_${d.A.y / 16}`]);
  });
}]}], "1_0":[{fa:() => !0, ba:!1, timeline:[c => {
  c = c.B;
  var b = c.D.find(a => a instanceof H);
  b = 144 > b.A.y || 160 > b.A.y && b.ga;
  c.bc = !b;
  c.Oa = b ? new m(320, 0) : null;
}]}], "0_0":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (a.Oa = null, a.kc = .5 * c.height, a.na = 0, a.bc = !1, d.Y = !1, c.Fa.left = !0, c.va(!0));
  240 > d.A.x && c.Fa.left ? (c.Va(), b.ud = 8, b.fd = 0, b.vd = 0, c.Aa("unlimited"), b.L = [{A:{x:-16, y:0}, size:{x:16, y:192}}, {A:{x:320, y:0}, size:{x:16, y:192}}], a.P.L.push(...b.L)) : (a.ja.push(e => {
    e.X.save();
    e.X.translate(80, 32 + 16 * (8 - b.ud) + b.fd);
    e.X.globalAlpha = 1 - (b.vd ? .01 * b.vd : 0);
    e.X.drawImage(e.I.images.sp_towa_hair, 0, 0, 48, 48, -32, -48, 48, 48);
    e.X.drawImage(e.I.images.sp_towa_idle, 0, 0, 48, 48, -32, -48, 48, 48);
    e.X.drawImage(e.I.images.sp_bibi, Math.floor(b.H / 16) % 2 * 24, 0, 24, 16, 2, -16, 24, 16);
    e.X.restore();
  }), b.ud ? (b.fd += 8, b.fd > 16 * b.ud && (b.fd = 0, b.ud--)) : (b.N || c.Fa.left || (b.N = new Ab(new m(88, 144), 48), a.D.push(b.N), a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("bibi"), "left"), d.Y = !0), b.vd++));
  100 <= b.vd && (b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.N && !b.N.G && (c.O("level_start"), a.wa = 60, a.na = 0, a.N = null, a.ya = null, c.va(), b.N = null, d.Y = !1, a.D = a.D.filter(e => !(e instanceof Bb)), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H || (b.N = new zb(new m(152, 32), 80), b.N.M = "intro", b.N.K = !0, b.N.ia("crouch"), a.D.push(b.N), b.N.dir = p(b.N).x < p(d).x);
  180 === b.H && (a.N = b.N, a.N.icon = 1, a.ya = new Y(Array.from("tokoyami towa"), "left"), d.dir = p(a.N).x > p(d).x);
  180 <= b.H && a.kc && (a.kc -= .25, b.H % 60 || (c.O("rumble"), a.aa = 45), a.kc || (a.N.M = "idle", d.Y = !0, c.Aa("towa")));
  b.N && !b.N.G && (c.O("level_start"), a.wa = 60, a.N.yd = !1, a.na = 0, a.N = null, a.ya = null, d.Y = !1, b.N.M = "defeated", a.D = a.D.filter(e => !(e instanceof Ab || e instanceof Bb || e instanceof L)), c.va(), c.saveData.setItem("nuinui-save-achievement-28", !0), b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  b.H ? 120 < b.H && (b.Gc += .75, b.N.A.x = Math.max(b.N.A.x, b.Gc - 32), b.N.A.x === b.Gc - 32 && (b.N.aa = 1), b.H % 24 || c.O("step"), a.ja.push(e => {
    e.Na.save();
    e.Na.translate(Math.round(b.Gc - 64), 116);
    e.Na.drawImage(e.I.images.sp_aqua_walk, Math.floor(.125 * b.H) % 4 * 64, 0, 64, 48, 0, 0, 64, 48);
    e.Na.restore();
  }), d.dir = p(b.N).x > p(d).x) : (b.Gc = 0, a.P.L = a.P.L.filter(e => !b.L.includes(e)));
  b.Gc > c.width + 64 && (b.next = !0);
}, (c, b) => {
  const a = c.B, d = a.D.find(e => e instanceof H);
  60 === b.H && (a.D = a.D.filter(e => !(e instanceof zb)), c.Fa.left = !0);
  60 < b.H && (-128 > d.A.x && (d.A.x = 304, d.A.y = 320, d.C.y = 0, a.view.A = new m(0, 192), a.Sb = !1, b.end = !0), 0 > d.A.x && a.ja.push(e => {
    e.X.save();
    e.X.fillStyle = "#000";
    e.X.globalAlpha = Math.min(1, Math.max(0, Math.abs(d.A.x) / 128));
    e.X.fillRect(0, 0, e.width, e.height);
    e.X.restore();
  }));
}]}], "0_1":[{fa:() => !0, ba:!1, timeline:[(c, b) => {
  const a = c.B, d = a.D.find(g => g instanceof H), e = b.H;
  152 > d.A.x && 600 > e && (c.Va(), d.ia("back"), d.hb = !0);
  660 < e && (d.hb = !1, c.Fa.left = !0, -128 > d.A.x && (c.Ea = new Rb(c, !0), c.Vc = !0, b.end = !0), 0 > d.A.x && a.ja.push(g => {
    g.X.save();
    g.X.fillStyle = "#000";
    g.X.globalAlpha = Math.min(1, Math.max(0, Math.abs(d.A.x) / 128));
    g.X.fillRect(0, 0, g.width, g.height);
    g.X.restore();
  }));
  if (630 > e && 150 < e) {
    const g = Math.max(0, Math.min(1, (e - 120 - 180) / 180));
    if (g && 1 > g) {
      for (b.H % 15 || c.O("explosion"), b = 0; 8 > b; b++) {
        z(a.J, new m(132 + Math.round(64 * Math.random() - 32), 168 + Math.round(16 * Math.random() - 8)), new m(0, 0), 2);
      }
    }
    c.B.ja.push(h => {
      const l = h.Na;
      l.save();
      330 < e && 350 > e && l.translate(Math.floor(4 * Math.random() - 2), 0);
      l.drawImage(h.I.images.bg_intro1, 0, 0);
      l.drawImage(h.I.images.bg_intro2, 0, 0);
      g && l.translate(Math.round(2 * Math.random() - 1), 0);
      l.drawImage(h.I.images.bg_intro3, 0, 0, 320, 170 - 170 * g, 0, 170 * g, 320, 170 - 170 * g);
      l.restore();
    });
  }
  120 <= e && 150 > e && c.B.ja.push(g => {
    const h = (e - 120) / 15, l = g.X;
    l.save();
    l.fillStyle = "#000";
    l.fillRect(0, g.height, g.width, -g.height * h);
    l.restore();
  });
  150 <= e && 165 > e && c.B.ja.push(g => {
    const h = (e - 150) / 15, l = g.X;
    l.save();
    l.fillStyle = "#000";
    l.fillRect(0, 0, g.width, g.height * (1 - h));
    l.restore();
  });
  600 <= e && 630 > e && c.B.ja.push(g => {
    const h = (e - 600) / 15, l = g.X;
    l.save();
    l.fillStyle = "#000";
    l.fillRect(0, g.height, g.width, -g.height * h);
    l.restore();
  });
  630 <= e && 645 > e && c.B.ja.push(g => {
    const h = (e - 630) / 15, l = g.X;
    l.save();
    l.fillStyle = "#000";
    l.fillRect(0, 0, g.width, g.height * (1 - h));
    l.restore();
  });
}]}]}};
class $b {
  constructor(c, b) {
    this.index = this.H = this.F = 0;
    this.end = this.next = !1;
    this.update = a => {
      this.timeline[this.index](a, this);
      this.next ? (this.H = 0, this.next = !1, this.index++) : this.H++;
      this.F++;
    };
    this.timeline = c;
    this.ba = b;
  }
}
;function Yb(c) {
  if (c.view.target) {
    var b = new m(c.view.target.A.x + c.view.target.size.x / 2, c.view.target.A.y + (32 === c.view.target.size.y ? 16 : 0));
    b = (new m(Math.max(c.P.A.x, Math.min(c.P.A.x + c.P.size.x - c.view.size.x, b.x - c.view.size.x / 2)), Math.max(c.P.A.y, Math.min(c.P.A.y + c.P.size.y - c.view.size.y, b.y - c.view.size.y / 2)))).round();
  } else {
    b = c.P.A;
  }
  c.Oa && (b.x = .7 * c.view.A.x + .3 * c.Oa.x, .3 > Math.abs(b.x - c.Oa.x) && (b.x = c.Oa.x), b.y = .7 * c.view.A.y + .3 * c.Oa.y, .3 > Math.abs(b.y - c.Oa.y) && (b.y = c.Oa.y));
  if (c.view.A && c.la) {
    const a = c.view.A.bb(b, .3);
    a.round().Jc(b) ? c.la = !1 : c.view.A = a;
  } else {
    c.view.A ? (c.view.A = c.view.A.bb(b, .2), c.view.A.x = b.x) : c.view.A = b;
  }
}
function ac(c, b) {
  const a = p(c.view.target);
  if (!a.Sd(c.P)) {
    const d = c.ob.find(e => a.Sd(e));
    if (d) {
      c.P = d;
      c.la = !0;
      c.rb = c.rb.filter(g => g.ba);
      c.P.rb && c.P.rb.filter(g => g.fa(b)).forEach(g => c.rb.push(new $b(g.timeline, g.ba)));
      const e = [];
      c.rb.forEach(g => {
        g.D && e.push(...g.D);
      });
      c.D.forEach(g => {
        g.ba && e.push(g);
      });
      c.D = c.D.filter(g => e.includes(g));
      c.P.D.forEach(g => {
        c.D.push(eval("new " + g.className + "(...event.data)"));
      });
      c.D.some(() => !1) && b.pc && b.pc.A && c.D.filter(() => !1).forEach(g => {
        g.A.Jc(b.pc.A) && (b.pc = g);
      });
    }
  }
}
function bc(c, b, a, d) {
  const e = c.view.A.ka(.0625).floor();
  for (let g = e.y - (c.Ec ? 1 : 0); g < e.y + 1 + c.view.size.y / 16; g++) {
    for (let h = e.x; h < e.x + 1 + c.view.size.x / 16; h++) {
      let l = d[`${h}_${g}`];
      void 0 !== l && (l = parseInt(l, 16), "forest" === c.name && 36 < l && 40 > l && Math.floor(c.F / 8) % 2 && (l += 8), 63 < l && (l += Math.floor(c.F / (69 === l ? 12 : 69 < l && "forest" === c.name ? 24 : 6)) % 3 * 8), a.drawImage(b.I.images[`ts_${c.name}${c.Jb ? "_alt" : ""}`], l % 8 * 16, 16 * Math.floor(l / 8), 16, 16, 16 * h, 16 * g + (!c.Ec || d !== c.background && 22 < h && 37 > h ? 0 : Math.floor(c.F / c.Ec) % 16), 16, 16));
    }
  }
}
function cc(c, b, a) {
  const d = `bg_${c.name}${c.Jb ? "_alt" : ""}`;
  a.drawImage(b.I.images[d], 0, 0, b.width, b.height, 0, 0, b.width, b.height);
  if (c.be) {
    for (var e = 0; e < b.height; e++) {
      a.drawImage(b.I.images[d], 0, e, b.width, 1, Math.round(4 * Math.sin(Math.PI / 180 * (c.F + e) * 4)), e, b.width, 1);
    }
  }
  if (c.$d && !b.finished) {
    a.save();
    a.globalAlpha = c.$d;
    for (e = 0; e < b.height; e++) {
      const g = Math.round(2 * (1 + Math.sin(Math.PI / 180 * (c.F + e) * 4)));
      a.drawImage(b.I.images[`${d}2`], 0, e, b.width, 1, -g, e, b.width + 2 * g, 1);
    }
    a.restore();
  }
  "heaven" === c.name && a.drawImage(b.I.images[`${d}2`], 0, Math.round(1 + Math.sin(Math.PI / 180 * c.F * 2)), b.width, b.height, 0, 0, b.width, b.height);
  0 < c.kc && (a.fillStyle = "#000", a.fillRect(0, 0, b.width, Math.round(c.kc)), a.fillRect(0, b.height, b.width, -Math.round(c.kc)));
}
function dc(c, b, a) {
  a.drawImage(b.I.images.ui_score, b.width - 57, 2);
  b.hd = b.hd ? .9 * b.hd + .1 * b.U : b.U;
  ("00000000" + (b.hd | 0)).slice(-8).split("").forEach((g, h) => {
    a.drawImage(b.I.images.ui_digit, 5 * g, 0, 5, 5, b.width - 53 + 6 * h, 5, 5, 5);
  });
  if (b.yb) {
    var d = ((new Date()).getTime() - b.yb.getTime()) / 1000;
    let g;
    var e = ("00" + (d / 60 % 60 | 0)).slice(-2);
    g = ("00" + (d % 60 | 0)).slice(-2);
    3600 > d ? a.drawImage(b.I.images.ui_timer, b.width - 39, 15) : (a.drawImage(b.I.images.ui_timer_wide, b.width - 57, 15), ("00" + (d / 3600 | 0)).slice(-2).split("").forEach((h, l) => {
      a.drawImage(b.I.images.ui_digit, 5 * parseInt(h), 0, 5, 5, b.width - 53 + 6 * l, 18, 5, 5);
    }));
    e.split("").forEach((h, l) => {
      a.drawImage(b.I.images.ui_digit, 5 * parseInt(h), 0, 5, 5, b.width - 35 + 6 * l, 18, 5, 5);
    });
    g.split("").forEach((h, l) => {
      a.drawImage(b.I.images.ui_digit, 5 * parseInt(h), 0, 5, 5, b.width - 17 + 6 * l, 18, 5, 5);
    });
  }
  if (d = c.D.find(g => g instanceof H)) {
    a.save(), "cursed" !== b.mode && (d.T = d.T ? .9 * d.T + .1 * d.G : d.G, e = Math.ceil(64 * d.T / d.da), a.fillStyle = "#000", a.fillRect(9, 16, 6, 64), a.fillStyle = "#3F3FBF", a.fillRect(11, 16, 3, 64), a.fillStyle = d instanceof W ? "#FFBF3F" : "#FF3F3F", a.fillRect(9, 80 - e, 6, e), a.fillStyle = d instanceof W ? "#FFFFBF" : "#FF9F7F", a.fillRect(11, 80 - e, 3, e), a.drawImage(b.I.images.ui_healthbar, 4, 0), a.drawImage(b.I.images.ui_boss_icon, d instanceof W ? 80 : 0, 0, 8, 8, 8, 6, 8, 8)), 
    (d.Ub || d.Ga || d.Ia) && a.drawImage(b.I.images.ui_slot, 0, b.height - 24), !d.Ub || d.Ga || d.Ia || (a.drawImage(b.I.images.sp_bow_pickup, "bow" === d.lb ? 0 : 20, 0, 20, 20, 2, b.height - 22, 20, 20), d.Fe && a.drawImage(b.I.images.ui_charge_type, 12 * d.qb, 0, 12, 12, 12, b.height - 12, 12, 12)), !d.item || d.Ga || d.Ia || (a.drawImage(b.I.images.ui_slot, 24, b.height - 24), c.fc || d.sc && !c.na ? (a.globalAlpha = .5, a.drawImage(b.I.images.sp_clock, 26, b.height - 22), a.globalAlpha = 1, 
    a.fillStyle = "#f00", a.fillRect(28, b.height - 13, Math.ceil(16 * d.sc / d.le), 2)) : a.drawImage(b.I.images.sp_clock, 26, b.height - 22)), d.yc && (a.save(), a.drawImage(b.I.images.ui_slot, 48, b.height - 24), d.Rb && (a.filter = "brightness(.25)"), a.drawImage(b.I.images.sp_jump, 50, b.height - 22), a.restore()), !d.rd || d.Ga || d.Ia || (a.translate(-c.view.A.x, -c.view.A.y), a.drawImage(b.I.images.ui_charge_type, 12 * d.qb, 0, 12, 12, Math.round(d.A.x + d.size.x / 2) - 6, Math.round(d.A.y) - 
    20, 12, 12)), (d.Ga || d.Ia) && a.drawImage(b.I.images.sp_jetski_item, 2, b.height - 22), a.restore();
  }
  c.N && (a.save(), a.translate(b.width / 2, b.height - 16), a.fillStyle = "#000", a.fillRect(-64, 5, 128, 6), a.fillStyle = "#3F3FBF", a.fillRect(-64, 6, 128, 3), a.fillStyle = "#FF003F", a.fillRect(-64, 5, Math.ceil(128 * c.N.T / c.N.da), 6), a.fillStyle = "#FF7FBF", a.fillRect(-64, 6, Math.ceil(128 * c.N.T / c.N.da), 3), a.drawImage(b.I.images.ui_healthbar_vertical, -80, 0), a.drawImage(b.I.images.ui_boss_icon, 8 * c.N.icon, 0, 8, 8, -76, 4, 8, 8), c.ya && (a.fillStyle = "#000", a.fillRect(-64, 
  -4, c.ya.width + 1, 7), c.ya.ca(b, a, new m(-64, -4))), a.restore());
}
function ec(c, b) {
  for (let a = 0; 6 > a; a++) {
    const d = 2 * c.F;
    b.drawImage(c.I.images.ui_warning, 96 * (a - 1) + d % 96, 64);
    b.drawImage(c.I.images.ui_warning, 96 * a - d % 96, c.height - 64 - 16);
  }
}
class Wb {
  constructor(c, b) {
    this.F = 0;
    this.K = 30;
    this.view = {A:null, size:null, target:null};
    this.J = new Da();
    this.D = [];
    this.ja = [];
    this.rb = [];
    this.Ha = this.Sb = !1;
    this.aa = 0;
    this.Jb = !1;
    this.name = b.name;
    this.ra = Zb[this.name];
    this.ob = [];
    b.ob.forEach(({A:a, size:d, D:e}) => {
      this.ob.push({A:new m(16 * a.x, 16 * a.y), size:new m(16 * d.x, 16 * d.y), rb:this.ra[`${a.x / 20}_${a.y / 12}`] || [], D:e, L:[]});
    });
    this.background = {...b.ne.background};
    this.ma = {...b.ne.ma};
    Object.keys(b.ne.L).forEach(a => {
      const [d, e] = a.split("_"), g = {A:{x:16 * d, y:16 * e}, size:{x:16, y:16}};
      (a = this.ob.find(h => u(g, h))) && a.L.push(g);
    });
    c.pc ? c.pc.xf(c, this) : (this.P = this.ob[0], this.P.rb.forEach(a => this.rb.push(new $b(a.timeline, a.ba))));
    c.saveData.getItem("nuinui-save-achievement-28") && (this.Jb = !0);
    this.view.size = new m(c.width, c.height);
    Yb(this);
  }
  update(c) {
    this.ja = [];
    this.rb.length && this.rb.forEach(a => {
      a.update(c);
      a.end && (this.rb = this.rb.filter(d => d !== a));
    });
    const b = this.D.find(a => a instanceof H);
    !(b && b.item && c.keys.c && b.Y) || this.na || this.fc || b.sc || this.wa || b.Ga || b.Ia || (this.na = b.dc, b.sc = b.le, c.O("focus"));
    this.D = this.D.filter(a => !a.jd);
    this.na && this.F % 3 ? this.D.filter(a => a instanceof H || a instanceof gb || a instanceof Db || a instanceof O).forEach(a => a.update(c)) : this.fc && this.F % 3 ? this.D.filter(a => a instanceof Db || a instanceof L).forEach(a => a.update(c)) : (!this.wa || this.F % 2) && this.D.forEach(a => a.update(c));
    ac(this, c);
    Yb(this);
    this.Z && this.view.A.Jc(this.Z) || (this.Z = this.view.A);
    this.J.update();
    this.Dc && this.Dc--;
    this.aa && this.aa--;
    this.wa && this.wa--;
    this.tc && this.tc--;
    this.na && this.na--;
    this.fc && this.fc--;
    this.K && this.K--;
    this.F++;
    this.te && (c.B = this.te);
  }
  ca(c) {
    for (let d = 0; 3 > d; d++) {
      const e = c[`ctx${d}`];
      e.save();
      this.aa && 3 !== d && e.translate(Math.floor(6 * Math.random()) - 3, 0);
      var b = this.view.A.ka(-1).round();
      switch(d) {
        case 0:
          e.clearRect(0, 0, c.width, c.height);
          if (this.N instanceof zb) {
            var a = 1;
            this.N.Z ? (a = (this.N.Z / 10 - 1) * (this.N.yd ? 1 : -1), ta(c.B.J, this.view.A.S((new m(Math.random() * c.width, Math.random() * c.height)).round())), e.fillStyle = "#000", e.globalAlpha = this.N.Z / 20, e.fillRect(0, 0, c.width, c.height)) : this.N.yd && (a = -1);
            1 !== a && (e.translate(0, .5 * c.height), e.scale(1, a), e.translate(0, .5 * -c.height));
          }
          if (this.wa) {
            e.fillStyle = "#fff";
            e.fillRect(0, 0, c.width, c.height);
            break;
          }
          cc(this, c, e);
          e.translate(b.x, b.y);
          this.$d && !c.finished && e.drawImage(c.I.images.sp_moon, 416, 128);
          bc(this, c, e, this.background);
          break;
        case 1:
          e.clearRect(0, 0, c.width, c.height);
          this.N instanceof zb && (a = 1, this.N.Z ? (a = (this.N.Z / 10 - 1) * (this.N.yd ? 1 : -1), ta(c.B.J, this.view.A.S((new m(Math.random() * c.width, Math.random() * c.height)).round())), e.fillStyle = "#000", e.globalAlpha = this.N.Z / 20, e.fillRect(0, 0, c.width, c.height)) : this.N.yd && (a = -1), 1 !== a && (e.translate(0, .5 * c.height), e.scale(1, a), e.translate(0, .5 * -c.height)));
          !this.Dc || Math.floor(.5 * this.F) % 2 || (e.fillStyle = "#fff", e.fillRect(0, 0, c.width, c.height), e.filter = "brightness(0%)");
          if (this.fc) {
            e.save();
            10 > this.fc && (e.globalAlpha = this.fc / 10);
            e.save();
            e.filter = "hue-rotate(90deg)";
            for (a = 0; a < c.height; a++) {
              e.drawImage(c.I.images.ui_focus, 0, a, 336, 1, 4 * Math.cos((this.F + a) / c.height / 4 * (180 / Math.PI)) - 8, a, 336, 1);
            }
            e.restore();
            a = this.D.find(g => g instanceof H);
            this.na > a.dc - 30 && ta(c.B.J, this.view.A.S((new m(Math.random() * c.width, Math.random() * c.height)).round()));
            this.na > a.dc - 10 && (e.fillStyle = "#fff", e.globalAlpha = (this.na - a.dc - 10) / 10, e.fillRect(0, 0, c.width, c.height));
            e.restore();
          }
          if (this.na) {
            10 > this.na && (e.globalAlpha = this.na / 10);
            for (a = 0; a < c.height; a++) {
              e.drawImage(c.I.images.ui_focus, 0, a, 336, 1, 4 * Math.cos((this.F + a) / c.height / 4 * (180 / Math.PI)) - 8, a, 336, 1);
            }
            a = this.D.find(g => g instanceof H);
            this.na > a.dc - 30 && ta(c.B.J, this.view.A.S((new m(Math.random() * c.width, Math.random() * c.height)).round()));
            this.na > a.dc - 10 && (e.fillStyle = "#fff", e.globalAlpha = (this.na - a.dc - 10) / 10, e.fillRect(0, 0, c.width, c.height));
            e.globalAlpha = 1;
          }
          this.Ha && ec(c, e);
          e.translate(b.x, b.y);
          this.J.ca(e, c.I, 0);
          this.D.forEach(g => {
            e.save();
            g.aa && (g.aa--, e.translate(Math.floor(8 * Math.random()) - 4, 0));
            g.ca(c, e);
            e.restore();
          });
          globalThis.Z && this.D.forEach(g => Fb(g, e));
          this.J.ca(e, c.I, 1);
          if (this.wa) {
            break;
          }
          bc(this, c, e, this.ma);
          globalThis.Z && this.P.L.forEach(g => {
            e.save();
            e.translate(Math.round(g.A.x), Math.round(g.A.y));
            e.fillStyle = "#00f8";
            e.fillRect(0, 0, g.size.x, 1);
            e.fillRect(0, 0, 1, g.size.y);
            e.fillRect(g.size.x - 1, 0, 1, g.size.y);
            e.fillRect(0, g.size.y - 1, g.size.x, 1);
            e.fillStyle = "#00f4";
            e.fillRect(0, 0, g.size.x, g.size.y);
            e.restore();
          });
          break;
        case 2:
          if (e.clearRect(0, 0, c.width, c.height), !this.wa) {
            this.Sa && (e.save(), e.fillStyle = "#000000BF", e.fillRect(0, 0, c.width, c.height), e.globalCompositeOperation = "destination-out", this.D.filter(g => g instanceof H || g instanceof U || g instanceof T || g instanceof S || g instanceof X && g.active).forEach(g => {
              e.save();
              g = p(g).round();
              e.translate(g.x - this.view.A.x, g.y - this.view.A.y);
              Math.floor(this.F / 16) % 2 && e.scale(-1, 1);
              e.drawImage(c.I.images.ui_shadow_mask, -64, -64);
              e.restore();
            }), this.D.filter(g => g instanceof O && "fire" === g.type || g instanceof L && g.za instanceof U).forEach(g => {
              e.save();
              g = p(g).round();
              e.translate(g.x - this.view.A.x, g.y - this.view.A.y);
              Math.floor(this.F / 16) % 2 && e.scale(-1, 1);
              e.drawImage(c.I.images.ui_shadow_mask_small, -32, -32);
              e.restore();
            }), e.restore());
            this.tc && (e.save(), this.sd || (e.translate(c.width, 0), e.scale(-1, 1)), e.drawImage(c.I.images.sp_ice_wind, 16 - Math.floor(this.F / 2) % 16, 16 - Math.floor(this.F / 2) % 16, 320, 192, 0, 0, 320, 192), e.restore());
            this.Tc && (e.save(), e.drawImage(c.I.images.sp_rain, 16 - Math.floor(this.F / 2) % 16, 32 - Math.floor(2 * this.F) % 32, 320, 192, 0, 0, 320, 192), e.restore());
            !0 === this.Uc && (e.save(), e.globalAlpha = .75 + .25 * Math.sin(.02 * this.F), e.globalCompositeOperation = "lighter", e.drawImage(c.I.images.bg_sun, 0, 0, c.width, c.height, 0, 0, c.width, c.height), e.restore());
            this.Sb && dc(this, c, e);
            this.na && (e.save(), e.translate(-this.view.A.x, -this.view.A.y), b = this.D.find(g => g instanceof H), a = (new m(b.A.x + b.size.x / 2 - 16, b.A.y - 16)).round(), e.fillStyle = "#fff", e.fillRect(a.x, a.y, 32, 4), e.fillStyle = "#f0f", e.fillRect(a.x, a.y, Math.ceil(32 * this.na / b.dc), 4), e.restore());
            if (this.Sa && 2 === c.Da) {
              for (b = this.D.filter(g => g instanceof X && g.active).length, a = 0; 8 > a; a++) {
                e.drawImage(c.I.images.vfx_smoke_white, 0, 0, 8, 8, 22, 4 + 10 * a, 8, 8), e.drawImage(c.I.images.vfx_smoke_black, 8, 0, 8, 8, 22, 4 + 10 * a, 8, 8), a < b && e.drawImage(c.I.images.vfx_smoke_white, 16, 0, 8, 8, 22, 4 + 10 * a, 8, 8);
              }
            }
            if (this.be && (b = this.rb.find(g => void 0 !== g.Hb))) {
              for (a = 0; a < b.eb.length; a++) {
                e.drawImage(c.I.images.vfx_smoke_white, 0, 0, 8, 8, 22, 4 + 10 * a, 8, 8), e.drawImage(c.I.images.vfx_smoke_black, 8, 0, 8, 8, 22, 4 + 10 * a, 8, 8), a < b.Hb && e.drawImage(c.I.images.vfx_smoke_white, 16, 0, 8, 8, 22, 4 + 10 * a, 8, 8);
              }
            }
            this.K && (e.fillStyle = "#000", e.globalAlpha = 1 - (30 - this.K) / 30, e.fillRect(0, 0, c.width, c.height));
            this.J.ca(e, c.I, 2);
          }
      }
      e.restore();
    }
    this.ja.forEach(d => d(c));
  }
}
;class fc {
  constructor(c, b) {
    this.F = 0;
    this.width = 320;
    this.height = 192;
    this.Rd = document.fullscreenElement ? !0 : !1;
    this.scale = !1;
    this.cb = null;
    this.la = {};
    this.wc = .3;
    this.Pb = .4;
    this.Fa = {};
    this.hd = this.U = this.Da = 0;
    this.mode = "flare";
    this.K = !1;
    this.yb = 0;
    this.Z = !1;
    this.Qe = 3;
    this.saveData = new ba();
    this.start = () => {
      document.Z = () => {
        "hidden" !== document.visibilityState || this.K ? this.K && !this.pb && this.resume() : this.Ma();
      };
      "hidden" !== document.visibilityState ? this.$b() : this.K = !0;
    };
    this.Ma = () => {
      "running" === this.cb.state && this.cb.suspend();
      clearInterval(this.Ya);
      this.Ya = null;
      this.K = !0;
    };
    this.resume = () => {
      "suspended" === this.cb.state && this.cb.resume();
      this.K = !1;
      this.$b();
    };
    this.$b = () => {
      this.animation = requestAnimationFrame(this.ca);
      this.Ya = setInterval(() => this.update(), 1000 / 60);
    };
    this.update = () => {
      this.Z && (this.Z = !1);
      this.la = {};
      this.keys = this.td["keyboard" === fa ? "getKeyboardKeys" : "getGamepadKeys"]();
      this.Ea ? this.Ea.update(this) : this.B && this.B.update(this);
      this.Ca && (this.Za.vb.gain.value -= this.Pb / 32, 0.003 >= this.Za.vb.gain.value && (this.Ca = !1, this.va()));
      this.ra && (this.Za.vb.gain.value += this.Pb / 32, this.Za.vb.gain.value >= this.Pb && (this.ra = !1, this.Za.vb.gain.value = this.Pb));
      this.F++;
    };
    this.we = d => {
      this.pc = null;
      this.Da = d;
      this.B = new Wb(this, this.data.me.sb[this.Da]);
      this.Va();
      this.va();
      this.Ea = null;
    };
    this.Va = () => {
      this.Fa = {};
    };
    this.ca = () => {
      this.animation = requestAnimationFrame(this.ca);
      this.Z || (this.Z = !0, this.Ea ? this.Ea.ca(this) : this.B && this.B.ca(this));
    };
    this.O = d => {
      const e = this.I.ie.find(h => h.id === d);
      if (this.wc && e.buffer && !this.la[d]) {
        this.la[d] = !0;
        var g = this.cb.createBufferSource();
        g.buffer = e.buffer;
        g.loop = !1;
        g.loopStart = 0;
        g.loopEnd = g.buffer.duration;
        "step pew bow_shoot miko_chant dash slash gun".split(" ").includes(d) && (g.playbackRate.value = 1 + .2 * Math.random() - .1);
        e.source = g;
        e.vb = this.cb.createGain();
        g.connect(e.vb);
        e.vb.connect(this.cb.destination);
        e.vb.gain.value = this.wc;
        "suspended" === this.cb.state ? this.cb.resume().then(() => e.source.start()) : e.source.start();
      }
    };
    this.Aa = (d, e) => {
      var g = this.I.je.find(h => h.id === d);
      g.buffer && (this.Za = g, this.source = g = this.cb.createBufferSource(), g.buffer = this.Za.buffer, g.loop = !0, g.loopStart = this.Za.loopStart, g.loopEnd = g.buffer.duration, this.Za.source = g, this.Za.vb = this.cb.createGain(), g.connect(this.Za.vb), this.Za.vb.connect(this.cb.destination), this.Za.ye = () => {
        this.Za.vb.gain.value = this.Pb;
      }, this.Za.ye(), e && (this.ra = !0, this.Za.vb.gain.value = 0), "suspended" === this.cb.state ? this.cb.resume().then(() => this.Za.source.start()) : this.Za.source.start());
    };
    this.va = d => {
      this.Za && (d ? this.Ca = !0 : (this.Za.source.stop(), this.Za = null));
    };
    this.resize = () => {
      let d = Math.max(1, Math.min(window.innerWidth / this.width, window.innerHeight / this.height));
      this.scale && (d = Math.floor(d));
      document.getElementById("game-container").style.transform = "scale(" + d + ")";
    };
    this.I = c;
    this.I.load();
    this.data = b;
    this.td = new ea();
    b = document.createElement("div");
    document.body.appendChild(b);
    b.id = "game-container";
    b.style.width = `${this.width}px`;
    b.style.height = `${this.height}px`;
    for (let d = 0; 4 > d; d++) {
      this[`canvas${d}`] = document.createElement("canvas"), b.appendChild(this[`canvas${d}`]), this[`canvas${d}`].id = `layer${d}`, this[`canvas${d}`].style.zIndex = d, this[`canvas${d}`].width = this.width, this[`canvas${d}`].height = this.height, this[`ctx${d}`] = this[`canvas${d}`].getContext("2d"), this[`ctx${d}`].imageSmoothingEnabled = !1;
    }
    let a = null;
    b.addEventListener("pointermove", ({currentTarget:{style:d}}) => {
      a ? clearTimeout(a) : d.cursor = "auto";
      a = setTimeout(() => {
        d.cursor = "none";
        a = null;
      }, 2e3);
    });
    this.resize();
    window.addEventListener("resize", this.resize);
    window.K || (document.K = () => this.Rd = document.fullscreenElement);
    this.cb = c.cb;
    c = this.saveData.K("se");
    b = this.saveData.K("bgm");
    this.wc = null === c ? this.wc : Number(c);
    this.Pb = null === b ? this.Pb : Number(b);
    globalThis.Z && (c = new URLSearchParams(window.location.search), c.has("stage") && (this.Da = parseInt(c.get("stage")) - 1));
    this.B = new Wb(this, this.data.me.sb[this.Da]);
  }
}
;window.addEventListener("load", () => {
  fetch("save.json").then(c => c.json()).then(c => {
    c = new fc(new aa(), Object.freeze(c));
    c.start();
    if (globalThis.Z) {
      for (var b = 1; 27 >= b; b++) {
        c.saveData.setItem(`nuinui-save-achievement-${b}`, !0);
      }
      for (b = 0; 5 > b; b++) {
        c.saveData.setItem(`nuinui-save-item-key${b}`, !0);
      }
      for (b = 1; 7 >= b; b++) {
        c.saveData.setItem(`nuinui-save-stage-${b}`, !0);
      }
      c.saveData.setItem("nuinui-save-item-bow", !0);
      c.saveData.setItem("nuinui-save-item-gun", !0);
      c.saveData.setItem("nuinui-save-item-clock", !0);
      c.saveData.setItem("nuinui-save-item-jump", !0);
      c.saveData.setItem("nuinui-save-item-boots", !0);
      c.saveData.setItem("nuinui-save-item-noel", !0);
      c.saveData.setItem("nuinui-save-item-fire", !0);
      c.saveData.setItem("nuinui-save-item-rocket", !0);
      c.saveData.setItem("nuinui-save-item-petal", !0);
      c.saveData.setItem("nuinui-save-item-sword", !0);
      c.saveData.setItem("nuinui-save-item-shield", !0);
      c.saveData.setItem("nuinui-save-item-dual", !0);
    }
  });
}, {once:!0});

