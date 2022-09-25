const EVENTS = {
    "forest": {
        "0_0": [
            {
                condition: game => game.scene.frameCount === 0,
                isPersistent: true,
                timeline: [
                    // Wait for player input
                    (game, event) => {
                        const scene = game.scene;
                
                        if (event.frameCount === 0) {
                            event.flare = new Flare(new Vector2(160, 48), new Vector2(16, 32));
                            event.flare.setAnimation('sleep');
                            event.flare.animationLocked = true;
                
                            scene.view.target = event.flare;
                
                            scene.actors.push(event.flare);
                        }
                
                        if (game.keys.jump) event.next = true;

                        scene.customDraw.push(game => {
                            game.ctx0.drawImage(game.assets.images['ui_start_label'], 204, 165);
                            if (!(Math.floor(scene.frameCount / 32) % 2)) {
                                game.ctx0.fillStyle = "#0008";
                                game.ctx0.fillRect(208, 167, 104, 20);
                            }
                        });
                    },
                    (game, event) => {
                        const scene = game.scene;
                        switch (event.timelineFrame) {
                            case 30:
                                scene.shakeBuffer = 30;
                                game.playSound('rumble');
                                break;
                            case 90:
                                event.flare.setAnimation('wakeup');
                                game.playSound('wakeup');
                                break;
                            case 129:
                                event.flare.setAnimation('idle');
                                break;
                            case 150:
                                event.flare.dir = false;
                                break;
                            case 180:
                                event.flare.dir = true;
                                break;
                            case 294:
                                game.cpuKeys = new Object;
                                break;
                            case 500:
                                event.flare.setAnimation('idle');
                                event.flare.playerControl = true;
                                event.flare.animationLocked = false;
                                event.end = true;
                                scene.enableHUD = true;
                                game.playBGM('smile_&_go_slow');
                                game.timer = new Date();
                                break;
                            default:
                                break;
                        }

                        if (event.timelineFrame > 239 && event.timelineFrame < 294) {
                            if (event.timelineFrame === 240) event.flare.animationLocked = false;
                            game.cpuKeys.right = true;
                        }
                
                        if (event.timelineFrame > 380 && event.timelineFrame < 500) {
                            if (event.timelineFrame === 381) {
                                game.playSound('level_start');
                                event.flare.setAnimation('look');
                                event.flare.animationLocked = true;
                            }
                            if (!(event.timelineFrame % (event.timelineFrame < 400 ? 0 : event.timelineFrame < 440 ? 2 : 4))) {
                                scene.customDraw.push(game => {
                                    game.ctx3.drawImage(game.assets.images['ui_forest_label'], game.width / 2 - 56, 32);
                                });
                            }
                        }
                    }
                ]
            },
            {
                condition: game => !game.scene.actors.find(a => a instanceof Elfriend),
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        event.elfriends = [
                            new Elfriend(new Vector2(96, 48), true),
                            new Elfriend(new Vector2(128, 24), true),
                            new Elfriend(new Vector2(224, 32), false),
                            new Elfriend(new Vector2(16 * 11, 16 * 14), true),
                            new Elfriend(new Vector2(16 * 20, 16 * 15), true),
                            new Elfriend(new Vector2(16 * 4, 16 * 19), true)
                        ];
                        game.scene.actors.push(...event.elfriends);
                        event.end = true;
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "2_1": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_carrots'], 45 * 16, 18 * 16);
                            game.ctx0.drawImage(game.assets.images['sp_nousagi'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 24, 0, 24, 24, 42 * 16, 21 * 16 - 8, 24, 24);
                            game.ctx0.translate(55.5 * 16, 0);
                            game.ctx0.scale(-1, 1);
                            game.ctx0.translate(-(55.5 * 16), 0);
                            game.ctx0.drawImage(game.assets.images['sp_nousagi'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 24, 0, 24, 24, 54 * 16, 21 * 16 - 8, 24, 24);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "3_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_nousagi'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 24, 0, 24, 24, 65 * 16, 9 * 16 - 8, 24, 24);
                            game.ctx0.translate(67.5 * 16, 0);
                            game.ctx0.scale(-1, 1);
                            game.ctx0.translate(-(67.5 * 16), 0);
                            game.ctx0.drawImage(game.assets.images['sp_nousagi'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 24, 0, 24, 24, 64 * 16, 18 * 16 - 8, 24, 24);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "4_0": [
            {
                condition: game => game.scene.actors.find(actor => actor instanceof Flare).hasBow,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_nousagi'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 24, 24, 24, 24, 80.5 * 16, 5 * 16 - 8, 24, 24);
                            game.ctx0.restore();
                        });
                    }
                ]
            },
            {
                condition: game => game.scene.actors.find(actor => actor instanceof Flare).hasBow && !game.scene.miniBossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                            if (scene.isFocus) scene.isFocus = 0;
                            event.side = flare.pos.x > 16 * 94;

                            game.cpuKeys.left = event.side;
                            game.cpuKeys.right = !event.side;

                            game.stopBGM(true);

                            event.pekora = new Pekora(new Vector2((event.side ? 85 : 94) * 16, 4 * 16), 32);
                            event.pekora.setAnimation('idle');
                            event.pekora.dir = event.side;
                            scene.actors.push(event.pekora);
                        }

                        if (flare && ((event.side && flare.pos.x < 16 * 94) || (!event.side && flare.pos.x > 16 * 85))) {
                            if (game.cpuKeys.left || game.cpuKeys.right) {
                                game.cpuKeys = new Object;
                                event.pekora.setAnimation('laugh');
                                game.playSound('peko');
                            }
                            if (event.timelineFrame > 140) event.pekora.setAnimation('idle');
                            if (event.timelineFrame > 200) event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            event.pekora.setAnimation('jump');
                            event.pekora.vel.y = -4;
                            game.playSound("jump");

                            scene.currentSection.collisions = scene.currentSection.collisions.filter(a => !(((event.side && a.pos.x === 16 * 85) || (!event.side && a.pos.x === 16 * 94)) && a.pos.y === 16 * 6));
                        }

                        if (!event.boss && !CollisionBox.intersects(event.pekora, scene.view)) {
                            scene.actors = scene.actors.filter(a => !(a instanceof Pekora));
                            
                            scene.warning = true;
                            game.playBGM('robotic_foe');

                            scene.miniBoss = 'started';
                            event.boss = new PekoMiniBoss(new Vector2(82 * 16, 0), event.side);
                            scene.actors.push(event.boss);

                            scene.achievement2 = true;
                            
                            scene.currentSection.collisions.push({ pos: { x: (event.side ? 85 : 94) * 16, y: 6 * 16 }, size: { x: 16, y: 16 }});

                            event.collisions = [
                                { pos: { x: 82 * 16, y: -2 * 16 }, size: { x: 16, y: 8 * 16 }},
                                { pos: { x: 97 * 16, y: -2 * 16 }, size: { x: 16, y: 8 * 16 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);
                        }

                        if (event.boss) {
                            if (event.boss.phase === 'intro') {
                                scene.shakeBuffer = 2;
                                if (!(event.timelineFrame % 32)) game.playSound('rumble');
                            }
    
                            if (event.boss.phase === 'idle' && !flare.playerControl) {
                                scene.warning = false;
                                flare.playerControl = true;
                            }
                            
                            if (event.boss.health <= 0) {
                                if (scene.achievement2) {
                                    localStorage.setItem('nuinui-save-achievement-2', true);
                                    game.updateAchievements();
                                }
                                event.boss.laserTarget = null;
                                event.boss.middleVel = new Vector2(0, 0);

                                game.playSound('level_start');
                                scene.bossKillEffect = 60;
                                scene.isFocus = 0;
                                
                                event.next = true;
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));

                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                            game.stopBGM();

                            scene.miniBossCleared = true;
                            event.boss.phase = 'death';
                            if (scene.isFocus) scene.isFocus = 0;
                        }
                        
                        if (!(event.timelineFrame % 32) && event.timelineFrame <= 160) game.playSound('rumble');
                        
                        if (event.timelineFrame === 180) {
                            
                            for (let i = 0; i < event.boss.size.x / 16; i++) {
                                scene.particles.explosion(event.boss.pos.plus(new Vector2(i * 16, event.boss.size.y)));
                            }

                            scene.actors = scene.actors.filter(actor => actor !== event.boss);
                            
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => collision.pos.y > 96 || collision.pos.x <= 1312 || collision.pos.x > 1536);
                            
                            game.playSound('rumble');

                            const pos = scene.view.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                    if ((x > 81 && x <= 97 && y === 5) || (x > 82 && x <= 96 && y === 6)) delete scene.foreground[`${x}_${y}`];
                                }
                            }
                            scene.drawView = true;

                            flare.playerControl = true;
                            event.end = true;
                            game.playBGM('serious_&_go');
                        }
                        
                        scene.shakeBuffer = 2;
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "5_0": [
            {
                condition: game => game.scene.miniBoss !== 'started',
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        // if (event.timelineFrame % 2 && Math.random() > .75) game.scene.shakeBuffer = 2;
                        // if (!(event.timelineFrame % 120)) {
                        //     game.playSound('rumble');
                        // }
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            for (let i = -2; i < 12; i++) {
                                game.ctx0.drawImage(game.assets.images['sp_peko_mini_boss'], 0, 0, 24, 24, 106 * 16 + 4 * Math.cos((event.timelineFrame + 32*i) * (Math.PI / 180)), i * 16 + (event.timelineFrame*3) % 16, 24, 24);
                            }
                            game.ctx0.restore();
                        });
                        game.scene.customDraw.push(game => {
                            game.ctx2.save();
                            game.ctx2.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            for (let i = -1; i < 13; i++) {
                                game.ctx2.drawImage(game.assets.images['sp_peko_mini_boss'], 0, 0, 24, 24, 112 * 16 + 4 * Math.sin((event.timelineFrame + 32*i) * (Math.PI / 180)), i * 16 - (event.timelineFrame*3) % 16, 24, 24);
                            }
                            game.ctx2.restore();
                        });
                    }
                ]
            }
            // {
            //     condition: game => !localStorage.getItem('nuinui-save-item-bow'),
            //     isPersistent: false,
            //     timeline: [
            //         (game, event) => {
            //             game.scene.actors = game.scene.actors.filter(a => !(a instanceof BowPickup));
            //             game.scene.actors.push(new BowPickup(new Vector2(116 * 16 - 2, 32), new Vector2(20, 20), 'bow'));
            //             event.end = true;
            //         }
            //     ]
            // }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "6_0": [
            {
                condition: game => !localStorage.getItem('nuinui-save-item-gun'),
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.actors = game.scene.actors.filter(a => !(a instanceof BowPickup));
                        game.scene.actors.push(new BowPickup(new Vector2(131 * 16 - 2, 4.25 * 16), new Vector2(20, 20), 'gun'));
                        event.end = true;
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "6_1": [
            {
                condition: game => !game.scene.bossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;

                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            game.stopBGM();
                            flare.playerControl = false;
                            if (scene.isFocus) scene.isFocus = 0;
                            event.pekora = new Pekora(new Vector2(123 * 16, 20 * 16), 32);
                            event.pekora.setAnimation('think');
                            scene.actors.push(event.pekora);
                        }

                        if (event.timelineFrame === 30) {
                            event.pekora.setAnimation('idle');
                        }
                        
                        game.cpuKeys.left = true;

                        if (flare.pos.x < 133 * 16) {
                            // flare.playerControl = true;
                            game.cpuKeys = new Object;
                            scene.achievement3 = true;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 20) {
                            event.collision = { pos: { x: 139 * 16, y: 15 * 16 }, size: { x: 16, y: 48 }};
                            scene.currentSection.collisions.push(event.collision);

                            const pos = scene.view.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                    if (x === 139 && [15, 16, 17].includes(y)) scene.foreground[`${x}_${y}`] = "6";
                                }
                            }

                            scene.shakeBuffer = 4;
                            game.playSound("rumble");
                            scene.warning = true;
                        }

                        // if (scene.warning && !(event.timelineFrame % 60)) game.playSound('warning');
                        
                        if (event.timelineFrame === 60) {
                            event.pekora.dir = true;
                        }

                        if (event.timelineFrame === 90) {
                            event.pekora.dir = true;
                            game.playSound('peko');
                            event.pekora.setAnimation('laugh');
                        }

                        if (event.timelineFrame === 200) {
                            scene.warning = false;
                            flare.playerControl = true;
                            event.pekora.setAnimation('idle');
                            event.pekora.phase = 'idle';
                            game.playBGM('crazy_bnuuy');
                        }

                        if (!event.pekora.health) {
                            
                            if (scene.achievement3) {
                                localStorage.setItem('nuinui-save-achievement-3', true);
                                game.updateAchievements();
                            }

                            flare.playerControl = false;
                            event.pekora.phase = 'defeated';
                            event.pekora.dir = false;
                            event.pekora.setAnimation('idle');
                            if (!flare.chargeTypeList.includes('rocket')) game.scene.actors.push(new RocketPickup(event.pekora.pos.value(), new Vector2(20, 20)));
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            scene.actors = scene.actors.filter(a => !(a instanceof Rocket));
                            game.stopBGM();

                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;

                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 90) scene.bossCleared = true;

                        if (event.timelineFrame === 120) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => collision !== event.collision && (collision.pos.x !== 1920 || collision.pos.y < 304 || collision.pos.y === 352));

                            scene.shakeBuffer = 4;
                            game.playSound("rumble");

                            const pos = scene.view.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                    if ((x === 120 && [19, 20, 21].includes(y)) || (x === 139 && [15, 16, 17].includes(y))) delete scene.foreground[`${x}_${y}`];
                                }
                            }
                            scene.drawView = true;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame > 60 && CollisionBox.includedIn(event.pekora, scene.currentSection)) {
                            event.pekora.phase = "flee";
                        }

                        if (event.pekora.pos.x < 1850) {
                            scene.actors = scene.actors.filter(actor => actor !== event.pekora);
                            flare.playerControl = true;
                            event.end = true;
                            game.playBGM('serious_&_go');
                        }

                        if (event.pekora.phase === 'flee') {
                            flare.dir = CollisionBox.center(event.pekora).x > CollisionBox.center(flare).x;
                        }
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "5_1": [
            {
                condition: game => true,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                        }
                        
                        game.cpuKeys.left = true;

                        if (flare.pos.x < 109 * 16) {
                            game.cpuKeys = new Object;
                            event.end = true;
                            
                            scene.nextScene = new StageSelect(game, 0, 1);
                            game.checkpoint = null;
                            game.stopBGM();
                            game.score += 10000;
                            const time = new Date().getTime() - game.timer.getTime();
                            if (time <= 300000) {
                                localStorage.setItem('nuinui-save-achievement-4', true);
                                game.updateAchievements();
                            }
                            const timerScore = Math.max(0, 300000 - time);
                            game.score += timerScore;
                        }
                    }
                ]
            }
        ]
    },
    "casino": {
        "0_0": [
            {
                condition: game => game.scene.frameCount === 0,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                
                        if (Math.random() > .97) {
                            scene.shakeBuffer = 2;
                            game.playSound("elevator");
                        }

                        if (event.frameCount === 0) {
                            event.flare = new Flare(new Vector2(16 * 9.5, 16 * 7), new Vector2(16, 32));
                            event.flare.setAnimation('idle');
                            
                            scene.view.target = event.flare;
                            scene.actors.push(event.flare);
                        }
                
                        if (game.keys.jump) event.next = true;
                
                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['ui_start_label'], 204, 165);
                            if (!(Math.floor(scene.frameCount / 32) % 2)) {
                                game.ctx3.fillStyle = "#0008";
                                game.ctx3.fillRect(208, 167, 104, 20);
                            }
                        });
                    },
                    (game, event) => {
                        const scene = game.scene;
                
                        switch (event.timelineFrame) {
                            case 0:
                                scene.shakeBuffer = 20;
                                game.playSound('rumble');

                                const pos = scene.view.pos.times(1 / 16).floor();
                                for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                    for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                        if ([4, 15].includes(x) && y < 12) scene.foreground[`${x}_${y}`] = "5";
                                    }
                                }

                                break;
                            case 59:
                                game.playSound("level_start");
                                break;
                            default:
                                break;
                        }

                        if (event.timelineFrame > 89) {
                            game.cpuKeys.right = true;

                            if (event.flare.pos.x > 16 * 16) {
                                event.next = true;
                                event.flare.pos = new Vector2(16, 16 * 56);
                                event.flare.landBuffer = true;
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 40) {
                            const pos = scene.view.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                    if (x === 2 && y > 54 && y < 58) scene.foreground[`${x}_${y}`] = "1";
                                    if (x === 3 && y > 54 && y < 58) scene.foreground[`${x}_${y}`] = "1";
                                    if (x === 4 && y > 54 && y < 58) scene.foreground[`${x}_${y}`] = "5";
                                }
                            }
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;

                            event.collision = { pos: { x: 4 * 16, y: 55 * 16 }, size: { x: 16, y: 48 }};
                            scene.currentSection.collisions.push(event.collision);
                        }

                        if (event.flare.pos.x > 16 * 6) {
                            
                            game.cpuKeys = new Object;
                            event.flare.playerControl = true;
                            event.end = true;
                            scene.enableHUD = true;
                            game.playBGM('red_sus');
                            game.timer = new Date();
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "0_4": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_statue'], 12 * 40, 48 * 16);
                            game.ctx0.drawImage(game.assets.images['sp_35p'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 32, 20.5 * 40, 56 * 16, 32, 32);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "5_2": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.achievement5 = true;
                        event.end = true;
                    }
                ]
            },
            {
                condition: game => {
                    const flare = game.scene.actors.find(actor => actor instanceof Flare);
                    return flare && !flare.item && !game.scene.actors.find(actor => actor instanceof ClockPickup);
                },
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                        
                            event.elfriend = new Elfriend(new Vector2(109.25 * 16, 29 * 16), false);
                            game.scene.actors.unshift(event.elfriend);

                            game.cpuKeys.right = true;
                        }

                        if (flare.pos.x > 106 * 16) {
                            game.cpuKeys = new Object;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame > 59 && event.timelineFrame < 240) {
                            if (event.timelineFrame === 60) {
                                flare.setAnimation('look');
                                game.playSound('level_start');
                                flare.animationLocked = true;
                            }
                        }

                        if (event.timelineFrame === 180) {
                            flare.animationLocked = false;
                            flare.setAnimation('idle');
                        }

                        if (event.timelineFrame === 240) {
                            game.scene.actors.push(new ClockPickup(event.elfriend.pos.value().plus(new Vector2(0, -16)), new Vector2(20, 20)));
                        }

                        if (event.timelineFrame > 240) {
                            event.elfriend.pos.y -= 2;
                        }

                        if (!CollisionBox.intersects(event.elfriend, scene.view)) {
                            scene.actors = scene.actors.filter(a => a !== event.elfriend);
                            flare.playerControl = true;
                            event.end = true;
                        }
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "7_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        if (game.scene.achievement5) {
                            localStorage.setItem('nuinui-save-achievement-5', true);
                            game.updateAchievements();
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "8_0": [
            {
                condition: game => !game.scene.miniBossCleared,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        if (game.scene.miniBossCleared) {
                            if (event.endFrame === undefined) event.endFrame = 60;
                            else if (event.endFrame > 1) event.endFrame--;
                        }
                        let alpha = event.endFrame ? event.endFrame / 60 : 1;
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.globalAlpha = alpha * .75;
                            for (let i = 0; i < 128; i++) {
                                game.ctx0.drawImage(game.assets.images['sp_skulls'], 0, i, 320, 1,
                                    20 * 8.5 * 16 + Math.cos(((game.scene.frameCount + i) / game.height / 4) * (180 / Math.PI)) * 4 - 8,
                                    i + Math.cos((game.scene.frameCount / game.height / 4) * (180 / Math.PI)) * 2 - 2,
                                    320, 1);
                            }
                            game.ctx0.restore();
                        });
                    }
                ]
            },
            {
                condition: game => !game.scene.miniBossCleared,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (flare.pos.x > 163 * 16 && !event.collisions) {
                            event.collisions = [
                                { pos: { x: 161 * 16, y: 7 * 16 }, size: { x: 16, y: 48 }},
                                { pos: { x: 198 * 16, y: 7 * 16 }, size: { x: 16, y: 48 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);

                            const pos = scene.currentSection.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.currentSection.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.currentSection.size.x / 16; x++) {
                                    if (x === 161 && [7, 8, 9].includes(y)) scene.foreground[`${x}_${y}`] = "5";
                                    if (x === 198 && [7, 8, 9].includes(y)) scene.foreground[`${x}_${y}`] = "5";
                                }
                            }

                            scene.shakeBuffer = 4;
                            game.playSound("rumble");
                        }

                        if (flare.pos.x > 179 * 16) {
                            flare.playerControl = false;
                            if (scene.isFocus) scene.isFocus = 0;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            event.pekora = new Pekora(new Vector2(193 * 16, 8 * 16), 12);
                            event.pekora.vel = new Vector2(-2, -4);
                            event.pekora.setAnimation('jump');

                            event.miko = new Miko(new Vector2(166 * 16, 8 * 16), 12);
                            event.miko.vel = new Vector2(2, -4);
                            event.miko.setAnimation('jump');

                            scene.actors.push(event.miko, event.pekora);
                            
                            scene.warning = true;
                        }
                        else if (event.timelineFrame < 200) {
                            if (event.pekora.isGrounded) {
                                event.pekora.vel = new Vector2(0, 0);
                                event.pekora.setAnimation('rocket');
                            }
                            if (event.miko.isGrounded) {
                                if (event.miko.animation !== 'sniper') game.playSound('no_damage');
                                event.miko.vel = new Vector2(0, 0);
                                event.miko.setAnimation('sniper');
                            }
                        }

                        
                        if (scene.warning && !(event.timelineFrame % 60)) game.playSound('warning');

                        // if (event.timelineFrame === 90) {
                        //     game.playSound('peko');
                        //     event.pekora.setAnimation('laugh');
                        // }

                        if (event.timelineFrame === 100) {
                            scene.warning = false;
                            flare.playerControl = true;
                        }

                        if (event.timelineFrame === 140) {
                            event.pekora.lastPhase = 'rocket';
                            event.pekora.phase = 'rocket';
                            event.miko.lastPhase = 'sniper';
                            event.miko.phase = 'sniper';
                            event.pekora.phaseBuffer = 0;
                            event.miko.phaseBuffer = 0;
                        }

                        if (!event.pekora.health && !event.pekoraDefeated) {
                            event.pekoraDefeated = true;
                            event.pekora.phase = 'defeated';
                            for (let i = 0; i < 64; i++) scene.particles.smoke_white(CollisionBox.center(event.pekora).plus(new Vector2(Math.round(Math.random() * 48 - 24), Math.round(Math.random() * 48 - 24))), new Vector2(0, 0), 1);
                            scene.actors = scene.actors.filter(a => a !== event.pekora);
                        }
                        if (!event.miko.health && !event.mikoDefeated) {
                            event.mikoDefeated = true;
                            event.miko.phase = 'defeated';
                            for (let i = 0; i < 64; i++) scene.particles.smoke_white(CollisionBox.center(event.miko).plus(new Vector2(Math.round(Math.random() * 48 - 24), Math.round(Math.random() * 48 - 24))), new Vector2(0, 0), 1);
                            scene.actors = scene.actors.filter(a => a !== event.miko);
                        }

                        if (event.pekoraDefeated && event.mikoDefeated) {
                            scene.actors = scene.actors.filter(a => !(a instanceof Rocket));
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            event.next = true;
                            flare.playerControl = false;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 60) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => collision !== event.collision && (collision.pos.x !== 1920 || collision.pos.y < 304 || collision.pos.y === 352));

                            scene.shakeBuffer = 4;
                            game.playSound("rumble");

                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));

                            const pos = scene.currentSection.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.currentSection.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.currentSection.size.x / 16; x++) {
                                    if (x === 161 && [7, 8, 9].includes(y)) scene.foreground[`${x}_${y}`] = "0";
                                    if (x === 198 && [7, 8, 9].includes(y)) scene.foreground[`${x}_${y}`] = "0";
                                }
                            }

                            flare.playerControl = true;
                        }

                        if (event.timelineFrame === 120) {
                            scene.miniBossCleared = true;
                            game.playSound("noise");
                            
                            localStorage.setItem('nuinui-save-achievement-6', true);
                            game.updateAchievements();

                            event.end = true;
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "13_2": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_35p'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 32, (20 * 13 + 7) * 16, 31 * 16, 32, 32);
                            game.ctx0.drawImage(game.assets.images['sp_35p'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 32, (20 * 13 + 11) * 16, 31 * 16, 32, 32);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "14_2": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            // game.ctx0.globalAlpha = .5;
                            game.ctx0.drawImage(game.assets.images['sp_moon'], 20 * 14.5 * 16 - 64, 25 * 16);
                            game.ctx0.restore();
                        });
                    }
                ]
            },
            {
                condition:game => !game.scene.bossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                            if (scene.isFocus) scene.isFocus = 0;
                            
                            event.miko = new Miko(new Vector2((14 * 20 + 13) * 16, 32 * 16), 48);
                            event.miko.setAnimation('chant');
                            event.miko.dir = false;
                            scene.actors.push(event.miko);
                            
                            game.canvas1.style.filter = 'brightness(0%)';
                            game.canvas2.style.filter = 'brightness(0%)';
                            game.stopBGM();
                            
                            game.scene.achievement7 = true;
                        }
                        
                        game.cpuKeys.right = true;

                        if (flare.pos.x > 14.25 * 20 * 16) {
                            game.cpuKeys = new Object;

                            event.collisions = [
                                { pos: { x: (14 * 20 - 1) * 16, y: 24 * 16 }, size: { x: 16, y: 12 * 16 }},
                                { pos: { x: 15 * 20 * 16, y: 24 * 16 }, size: { x: 16, y: 12 * 16 }}
                            ];

                            scene.currentSection.collisions.push(...event.collisions);

                            

                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 60) {
                            game.canvas1.style.filter = 'none';
                            game.canvas2.style.filter = 'none';
                            scene.warning = true;
                            game.playBGM('elite_moonlight_scuffle');
                        }

                        if (event.timelineFrame === 240) {
                            event.miko.phase = 'idle';
                            flare.playerControl = true;
                            scene.warning = false;
                        }
                        
                        if (!event.miko.health) {
                            
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;

                            event.next = true;

                            flare.playerControl = false;
                            event.miko.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            if (!flare.chargeTypeList.includes('petal')) scene.actors.push(new PetalPickup(event.miko.pos.value(), new Vector2(20, 20)));
                            game.stopBGM();
                            
                            if (game.scene.achievement7) {
                                localStorage.setItem('nuinui-save-achievement-7', true);
                                game.updateAchievements();
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 120) scene.bossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.actors = scene.actors.filter(a => !(a instanceof Miko));

                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            flare.playerControl = true;
                            game.playBGM('red_sus');
                            event.end = true;
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "15_2": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                        }
                        
                        game.cpuKeys.right = true;

                        if (flare.pos.x > (16 * 20) * 16) {
                            game.cpuKeys = new Object;
                            event.end = true;
                            
                            scene.nextScene = new StageSelect(game, 1, 2);
                            game.checkpoint = null;
                            game.stopBGM();
                            game.score += 20000;
                            const time = new Date().getTime() - game.timer.getTime();
                            if (time <= 300000) {
                                localStorage.setItem('nuinui-save-achievement-8', true);
                                game.updateAchievements();
                            }
                            const timerScore = Math.max(0, 300000 - time);
                            game.score += timerScore;
                        }
                    }
                ]
            }
        ]
    },


    //----------------------------------------------------------------------------------------------------------------------------------------------------------


    "port": {
        "0_0": [
            {
                condition: game => game.scene.frameCount === 0,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                
                        if (Math.random() > .97) {
                            scene.shakeBuffer = 2;
                            game.playSound("elevator");
                        }

                        if (event.frameCount === 0) {
                            event.flare = new Flare(new Vector2(16 * 9.5, 16 * 7), new Vector2(16, 32));
                            event.flare.setAnimation('idle');
                            
                            scene.view.target = event.flare;
                            scene.actors.push(event.flare);
                        }
                
                        if (game.keys.jump) event.next = true;
                
                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['ui_start_label'], 204, 165);
                            if (!(Math.floor(scene.frameCount / 32) % 2)) {
                                game.ctx3.fillStyle = "#0008";
                                game.ctx3.fillRect(208, 167, 104, 20);
                            }
                        });
                    },
                    (game, event) => {
                        const scene = game.scene;
                
                        switch (event.timelineFrame) {
                            case 0:
                                scene.shakeBuffer = 20;
                                game.playSound('rumble');

                                const pos = scene.view.pos.times(1 / 16).floor();
                                for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                    for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                        if ([3, 16].includes(x) && y < 12) scene.foreground[`${x}_${y}`] = "5";
                                    }
                                }

                                break;
                            case 59:
                                game.playSound("level_start");
                                break;
                            default:
                                break;
                        }

                        if (event.timelineFrame > 89) {
                            game.cpuKeys.right = true;

                            if (event.flare.pos.x > 16 * 16) {
                                event.next = true;
                                event.flare.pos = new Vector2(16, 16 * 56);
                                event.flare.landBuffer = true;
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 40) {
                            const pos = scene.view.pos.times(1 / 16).floor();
                            for (let y = pos.y; y < pos.y + 1 + scene.view.size.y / 16; y++) {
                                for (let x = pos.x; x < pos.x + 1 + scene.view.size.x / 16; x++) {
                                    if (x === 2 && y > 54 && y < 58) scene.foreground[`${x}_${y}`] = "1";
                                    if (x === 3 && y > 54 && y < 58) scene.foreground[`${x}_${y}`] = "1";
                                    if (x === 4 && y > 54 && y < 58) scene.foreground[`${x}_${y}`] = "5";
                                }
                            }
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;

                            event.collision = { pos: { x: 4 * 16, y: 55 * 16 }, size: { x: 16, y: 48 }};
                            scene.currentSection.collisions.push(event.collision);
                        }

                        if (event.flare.pos.x > 16 * 6) {
                            
                            game.cpuKeys = new Object;
                            event.flare.playerControl = true;
                            event.end = true;
                            scene.enableHUD = true;

                            game.playBGM('aquamarine_bay');
                            game.timer = new Date();
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "3_3": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_port_clock'], 61.5 * 16, 52 * 16);
                            game.ctx0.restore();
                        });
                    }
                ]
            },
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "6_5": [
            {
                condition: game => !game.checkpoint,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x + (20 * 6 + 17.5) * 16, -game.scene.view.pos.y + (5 * 12 + 7) * 16 + 5);
                            game.ctx0.scale(-1, 1);
                            game.ctx0.drawImage(game.assets.images['sp_aqua_sleep'],
                                (Math.floor(event.timelineFrame / 24) % 4) * 64, 0, 64, 48,
                                0, 0, 64, 48);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "8_4": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        localStorage.setItem('nuinui-save-achievement-9', true);
                        game.updateAchievements();
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "7_5": [
            {
                condition: game => !game.scene.currentSection.collisions.find(a => a.pos.x === 154 * 16 && a.pos.y === 62 * 16),
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 0) {
                            event.actors = [new Torche({ "x": 150, "y": 63.5 })];
                            scene.actors.push(...event.actors);
                            
                            scene.foreground[`154_62`] = "7";
                            scene.foreground[`155_62`] = "7";

                            event.collision = { pos: { x: 154 * 16, y: 62 * 16 }, size: { x: 32, y: 16 }};
                            scene.currentSection.collisions.push(event.collision);
                        }

                        if (event.actors[0].active) {
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;
                            
                            scene.background[`150_65`] = "19";
                            delete scene.foreground[`154_62`];
                            delete scene.foreground[`155_62`];
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(e => e !== event.collision);

                            event.end = true;
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "8_3": [
            {
                condition: game => !game.scene.miniBossStarted && !game.scene.miniBossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 0 && !scene.miniBossStarted) {
                            scene.miniBossStarted = true;
                            game.stopBGM(true);

                            event.aqua = new Aqua(new Vector2(163.5 * 16, 39 * 16), 1);
                            // event.aqua.currentSection = scene.currentSection;
                            event.aqua.setAnimation('sleep');

                            event.actors = [
                                new Torche({ "x": 135, "y": 38.5 }),
                                new Torche({ "x": 164, "y": 43.5 }),
                                new Torche({ "x": 144, "y": 38.5 }),
                                new Torche({ "x": 155, "y": 38.5 }),
                                new Torche({ "x": 144, "y": 31.5 }),
                                new Torche({ "x": 155, "y": 31.5 }),
                                new Torche({ "x": 135, "y": 26.5 }),
                                new Torche({ "x": 164, "y": 26.5 }),
                                event.aqua
                            ];
                            scene.actors.push(...event.actors);

                            scene.sections[13].collisions.push({ pos: { x: 167 * 16, y: 37 * 16 }, size: { x: 16, y: 4 * 16 }});
                        }

                        if (event.timelineFrame === 120) game.playBGM('sneak');

                        if (!scene.blackout) {
                            scene.blackout = true;

                            for (let y = 0; y < 9; y++) {
                                scene.foreground[`120_${37 + y}`] = "7";
                            }
                            event.collisions = [
                                { pos: { x: 120 * 16, y: 37 * 16 }, size: { x: 16, y: 9 * 16 }}
                            ];
                            scene.sections[11].collisions.push(event.collisions[0]);
                        }

                        if (event.actors.filter(a => a instanceof Torche).every(a => a.active)) {
                            scene.miniBossCleared = true;
                            scene.blackout = false;
                            if (scene.isFocus) scene.isFocus = 0;
                            
                            game.stopBGM();
                            game.playBGM('aquamarine_bay');
                            
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;
                            for (let y = 0; y < 9; y++) {
                                delete scene.foreground[`120_${37 + y}`];
                            }
                            scene.sections[11].collisions = scene.sections[11].collisions.filter(e => e !== event.collisions[0]);

                            scene.actors = scene.actors.filter(a => !(a instanceof Aqua));
                            event.next = true;
                        }
                    },
                    (game, event) => {}
                ]
            }
        ],
        "7_3": [
            {
                condition: game => game.scene.actors.find(actor => actor instanceof Flare).dir && game.scene.sections[13].collisions.find(c => c.pos.x === 167 * 16 && c.pos.y === 37 * 16),
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            event.aqua = scene.actors.find(a => a instanceof Aqua);

                            scene.sections[13].collisions.push({ pos: { x: 167 * 16, y: 37 * 16 }, size: { x: 16, y: 4 * 16 }});
                        }

                        if (flare.pos.x > 150 * 16) {
                            event.aqua.pos = new Vector2(135 * 16, 27 * 16);
                            // event.aqua.currentSection = scene.sections[8];
                            event.aqua.dir = true;
                            event.aqua.moveDir = 1;
                            event.aqua.phase = 'move';
                            event.aqua.phaseBuffer = 0;
                            event.aqua.isWaiting = true;

                            game.scene.particles.explosion(new Vector2(159 * 16, 39 * 16));
                            game.scene.particles.explosion(new Vector2(160 * 16, 37 * 16));
                            game.scene.particles.explosion(new Vector2(160 * 16, 41 * 16));
                            game.playSound('rumble');
                            scene.shakeBuffer = 12;
                            scene.foreground[`166_41`] = "22";
                            scene.foreground[`167_41`] = "23";
                            for (let y = 0; y < 4; y++) {
                                delete scene.foreground[`167_${37 + y}`];
                            }
                            scene.sections[13].collisions = scene.sections[13].collisions.filter(c => !(c.pos.x === 167 * 16 && c.pos.y === 37 * 16));

                            event.end = true;
                        }
                    },
                    (game, event) => {}
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "3_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            // game.ctx0.globalAlpha = .5;
                            game.ctx0.drawImage(game.assets.images['sp_anchor'], 59 * 16, -12);
                            game.ctx0.restore();

                            game.ctx2.save();
                            game.ctx2.translate(-game.scene.view.pos.x + 70 * 16, -game.scene.view.pos.y + 3.5 * 16);
                            game.ctx2.rotate(-Math.PI * .125)
                            game.ctx2.drawImage(game.assets.images['sp_flag'], 0, (Math.floor((game.scene.frameCount / 8) + 4) % 6) * 234, 128, 234, 16, 0, 24, 128);
                            game.ctx2.rotate(-Math.PI * .125)
                            game.ctx2.drawImage(game.assets.images['sp_flag'], 0, (Math.floor(game.scene.frameCount / 8) % 6) * 234, 128, 234, -8, 8, 48, 128);
                            game.ctx2.restore();
                        });
                    }
                ]
            },
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "2_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (flare.playerControl) {
                            flare.playerControl = false;
                            game.cpuKeys.left = true;
                            if (scene.isFocus) scene.isFocus = 0;
                        }

                        if (flare.pos.x < 45 * 16) {
                            flare.jetski = true;
                        }

                        if (!flare.jetski) {
                            game.scene.customDraw.push(game => {
                                game.ctx1.save();
                                game.ctx1.translate(-game.scene.view.pos.x + 46.5 * 16, -game.scene.view.pos.y + 8.5 * 16);
                                game.ctx1.translate(0, Math.round(Math.cos(Math.floor(event.timelineFrame / 4) * (180 / Math.PI))));
                                game.ctx1.scale(-1, 1);
                                game.ctx1.drawImage(game.assets.images['sp_jetski'], 0, 0);
                                game.ctx1.restore();
                            });
                        }

                        if (event.timelineFrame > 150) {
                            game.scene.customDraw.push(game => {
                                game.ctx2.save();
                                game.ctx2.fillStyle = '#000';
                                game.ctx2.globalAlpha = Math.min(1, (event.timelineFrame - 150) / 30);
                                game.ctx2.fillRect(0, 0, game.width, game.height);
                                game.ctx2.restore();
                            });
                        }
                    }
                ]
            }
        ],


        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "1_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            if (game.scene.bossKillEffect) return;
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            const scrollVal = Math.floor(event.timelineFrame * .5) % 320;
                            const scrollVal2 = Math.floor(-event.timelineFrame * .0625) % 320;
                            game.ctx0.drawImage(game.assets.images['bg_port_scroll2'], 0, 0, 320, 160, 20 * 16 + scrollVal2, 0, 320, 160);
                            game.ctx0.drawImage(game.assets.images['bg_port_scroll2'], 0, 0, 320, 160, 20 * 16 + scrollVal2 + 320, 0, 320, 160);
                            game.ctx0.drawImage(game.assets.images['bg_port_scroll'], 0, 0, 320, 160, 20 * 16 + scrollVal, 0, 320, 160);
                            game.ctx0.drawImage(game.assets.images['bg_port_scroll'], 0, 0, 320, 160, 20 * 16 + scrollVal - 320, 0, 320, 160);
                            if (Math.floor(event.timelineFrame * .5) < 320) game.ctx0.drawImage(game.assets.images['bg_port_scroll'], 320, 0, 320, 160, 20 * 16 + scrollVal, 0, 320, 160);
                            game.ctx0.restore();
                            
                            game.ctx2.save();
                            game.ctx2.fillStyle = '#fff';
                            for (let i = 0; i < game.height; i++) {
                                if (Math.random() > .99) {
                                    game.ctx2.fillRect(Math.round(game.width * (0.75 + Math.random() / 4)), i, game.width / 4, 1);
                                }
                            }
                            game.ctx2.restore();
                        });
                    }
                ]
            },
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            event.enemies = [];
                            event.addEnemy = (enemyClass, pos, scrollSpeed, waterEffect, waterOffset, dir) => {
                                let enemy;
                                if ([Cannon, Rock].includes(enemyClass)) {
                                    enemy = new enemyClass(pos, dir);
                                } else enemy = new enemyClass(pos);
                                enemy.scrollSpeed = scrollSpeed;
                                enemy.scrollFilter = true;
                                enemy.waterOffset = waterOffset;
                                enemy.waterEffect = waterEffect;
                                event.enemies.push(enemy);
                                scene.actors.push(enemy);
                            };

                            scene.bossStarted = true;
                            
                            scene.achievement11 = true;
                        }

                        if (event.timelineFrame < 60) {
                            game.scene.customDraw.push(game => {
                                game.ctx2.save();
                                for (let x = 0; x < 20; x++) {
                                    const sequence = Math.max(0, (event.timelineFrame - 30) / 30 + (20 - x) / 20);
                                    for (let y = 0; y < 12; y++) {
                                        game.ctx2.drawImage(game.assets.images['vfx_transition'], 16 * Math.floor((1 - sequence) * 7), 0, 16, 16, x * 16, y * 16, 16, 16);
                                    }
                                }
                                game.ctx2.restore();
                            });
                        }

                        if (flare.pos.x < 30 * 16) {
                            flare.playerControl = true;
                            game.cpuKeys = new Object;
                            if (!event.collisions) {
                                event.collisions = [
                                    { pos: { x: 19 * 16, y: 0 }, size: { x: 16, y: 12 * 16 }},
                                    { pos: { x: 40 * 16, y: 0 }, size: { x: 16, y: 12 * 16 }}
                                ];
    
                                scene.currentSection.collisions.push(...event.collisions);
                            }
                        }

                        switch (event.timelineFrame) {
                            case 3 * 60:
                            case 4 * 60:
                            case 8 * 60:
                            case 9 * 60:
                            case 10 * 60:
                            case 11 * 60:
                            case 12 * 60:
                            case 54 * 60:
                            case 55 * 60:
                            case 56 * 60:
                            case 57 * 60:
                            case 58 * 60:
                            case 59 * 60:
                            case 60 * 60:
                                event.addEnemy(Nousabot, new Vector2(18, 4), 1.5, false, false);
                                break;
                            case 16 * 60:
                            case 22 * 60:
                            case 32 * 60:
                            case 40 * 60:
                            case 44 * 60:
                            case 48 * 60:
                            case 52 * 60:
                            case 64 * 60:
                                event.addEnemy(Robot, new Vector2(18, 11), .5, true, true);
                                break;
                            case 18 * 60:
                            case 24 * 60:
                            case 26 * 60:
                            case 27 * 60:
                            case 29 * 60:
                            case 30 * 60:
                            case 38 * 60:
                            case 42 * 60:
                            case 46 * 60:
                            case 50 * 60:
                                event.addEnemy(Nousabot, new Vector2(18, 5), 1, false, false);
                                event.addEnemy(Nousabot, new Vector2(18, 7), 1, false, false);
                                break;
                            case 20 * 60:
                                event.boat = {
                                    pos: new Vector2(320 - 560, 0),
                                    scrollSpeed: .125
                                }
                                event.addEnemy(Cannon, new Vector2(10, 6), .125, false, true, true);
                                event.addEnemy(Cannon, new Vector2(-1, 6), .125, false, true, true);
                                break;
                            default:
                                break;
                        }

                        // switch (event.timelineFrame) {
                        //     case 3 * 60:
                        //         event.boat = {
                        //             pos: new Vector2(192, 0),
                        //             scrollSpeed: .125
                        //         }
                        //         break;
                        //     default:
                        //         break;
                        // }

                        if (event.timelineFrame > 480 && !(event.timelineFrame % 240) && Math.random() > .75) {
                            const yPos = [9, 9.5, 10];
                            event.addEnemy(Rock, new Vector2(10, yPos[Math.floor(Math.random() * yPos.length)]), 2, false, false, Math.random() > .5);
                        }

                        event.enemies.forEach(a => {
                            if (a instanceof Cannon) a.scrollSpeed = event.boat.scrollSpeed;
                            a.pos.x += a.scrollSpeed;
                            if (!a.shakeBuffer && a.waterEffect && !(a.frameCount % 6)) game.scene.particles.water_trail(a);
                            if (a.scrollFilter && a.pos.x >= 41 * 16) {
                                event.enemies = event.enemies.filter(e => e !== a);
                                a.toFilter = true;
                            }
                        });
                        scene.actors.filter(a => a instanceof Heart).forEach(a => a.pos.x++);

                        //boat
                        if (event.boat) {
                            if (event.boat.pos.x === 192) {
                                event.boat.scrollSpeed = 0;
                                event.next = true;
                            }
                            event.boat.pos.x += event.boat.scrollSpeed;
                            game.scene.customDraw.push(game => {
                                if (game.scene.bossKillEffect) return;
                                game.ctx0.save();
                                game.ctx0.translate(
                                    -game.scene.view.pos.x + Math.round(event.boat.pos.x),
                                    -game.scene.view.pos.y + Math.round(event.boat.pos.y) + Math.round(Math.cos(Math.floor(event.timelineFrame / 16) * (180 / Math.PI))));
                                game.ctx0.drawImage(game.assets.images['sp_boat'], 0, 0);
                                game.ctx0.restore();
                            });
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            event.marine = new Marine(new Vector2(24 * 16, -32), 48);
                            event.marine.phase = 'intro';

                            event.aircons = [
                                new Aircon(new Vector2(20, 7.5), 1),
                                new Aircon(new Vector2(38, 7.5), -1),
                            ];
                            scene.actors.push(event.marine, ...event.aircons);

                            scene.warning = true;
                            game.stopBGM();
                        }

                        if (event.timelineFrame === 180) {
                            event.marine.setAnimation('idle');
                            event.marine.phase = 'idle';
                            
                            scene.warning = false;
                            game.playBGM("cosplay_pirate_idol_frenzy");
                        }

                        if (event.timelineFrame > 480 && !(event.timelineFrame % 240) && Math.random() > .75) {
                            const yPos = [9, 9.5, 10];
                            event.addEnemy(Rock, new Vector2(10, yPos[Math.floor(Math.random() * yPos.length)]), 2, false, false, Math.random() > .5);
                        }
                        
                        event.enemies.forEach(a => {
                            if (a instanceof Cannon) a.scrollSpeed = event.boat.scrollSpeed;
                            a.pos.x += a.scrollSpeed;
                            if (!a.shakeBuffer && a.waterEffect && !(a.frameCount % 6)) game.scene.particles.water_trail(a);
                            if (a.scrollFilter && a.pos.x >= 41 * 16) {
                                event.enemies = event.enemies.filter(e => e !== a);
                                a.toFilter = true;
                            }
                        });
                        scene.actors.filter(a => a instanceof Heart).forEach(a => a.pos.x++);
                        
                        //boat
                        if (event.boat) {
                            game.scene.customDraw.push(game => {
                                if (game.scene.bossKillEffect) return;
                                game.ctx0.save();
                                game.ctx0.translate(
                                    -game.scene.view.pos.x + Math.round(event.boat.pos.x),
                                    -game.scene.view.pos.y + Math.round(event.boat.pos.y) + Math.round(Math.cos(Math.floor(event.timelineFrame / 16) * (180 / Math.PI))));
                                game.ctx0.drawImage(game.assets.images['sp_boat'], 0, 0);
                                game.ctx0.restore();
                            });
                        }
                        
                        if (!event.marine.health) {
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;

                            event.next = true;

                            flare.playerControl = false;
                            event.marine.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet) && !(a instanceof Rock) && !(a instanceof Aircon) && !(a instanceof Dokuro));
                            if (!flare.chargeTypeList.includes('sword')) scene.actors.push(new SwordPickup(event.marine.pos.y < 96 ? new Vector2(event.marine.pos.x, 96) : event.marine.pos.value(), new Vector2(20, 20)));
                            game.stopBGM();
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 120) scene.bossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.actors = scene.actors.filter(a => !(a instanceof Marine));

                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            flare.playerControl = true;

                            game.playBGM('aquamarine_bay');
                            
                            if (scene.achievement11) {
                                localStorage.setItem('nuinui-save-achievement-11', true);
                                game.updateAchievements();
                            }
                        }
                        if (flare.pos.x < 22 * 16) {
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                        }

                        if (flare.isGrounded && event.timelineFrame > 120) {
                            game.cpuKeys.left = true;
                        }

                        if (flare.pos.x < 22 * 16 && game.cpuKeys.left && !event.transitionFrame) event.transitionFrame = event.timelineFrame;

                        if (flare.pos.x < 21 * 16) {
                            event.end = true;
                            game.scene.nextScene = new StageSelect(game, 2, 3);
                            // game.demoCleared = true;
                            game.checkpoint = null;
                            game.cpuKeys = new Object;
                            game.stopBGM();
                            game.score += 30000;
                            const time = new Date().getTime() - game.timer.getTime();
                            if (time <= 300000) {
                                localStorage.setItem('nuinui-save-achievement-12', true);
                                game.updateAchievements();
                            }
                            const timerScore = Math.max(0, 300000 - time);
                            game.score += timerScore;
                        }
                        
                        if (event.transitionFrame > 120) {
                            game.scene.customDraw.push(game => {
                                game.ctx2.save();
                                game.ctx2.fillStyle = '#000';
                                game.ctx2.globalAlpha = Math.min(1, (event.timelineFrame - event.transitionFrame) / 30);
                                game.ctx2.fillRect(0, 0, game.width, game.height);
                                game.ctx2.restore();
                            });
                        }
                    }
                ]
            }
        ]
    },
    "yamato": {
        "0_10": [
            {
                condition: game => game.scene.frameCount === 0,
                isPersistent: true,
                timeline: [
                    // Wait for player input
                    (game, event) => {
                        const scene = game.scene;
                
                        if (event.frameCount === 0) {
                            event.flare = new Flare(new Vector2(16, (-16 + 16 * 12) * 10), new Vector2(16, 32));
                            event.flare.setAnimation('idle');
                            event.flare.jetski = true;
                            event.flare.isGrounded = false;
                            
                            event.flare.playerControl = false;

                            scene.view.target = event.flare;
                            scene.actors.push(event.flare);
                        }

                        event.flare.vel.x = 0;
                        event.flare.vel.y = -event.flare.gravity;
                
                        if (game.keys.jump) {
                            event.flare.vel.x = 8;
                            event.next = true;
                        }

                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['ui_start_label'], 204, 165);
                            if (!(Math.floor(scene.frameCount / 32) % 2)) {
                                game.ctx3.fillStyle = "#0008";
                                game.ctx3.fillRect(208, 167, 104, 20);
                            }
                        });
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.flare.isGrounded) {
                            event.flare.jetski = false;
                            event.flare.playerControl = true;
                            game.cpuKeys = new Object;
                            
                            for (let i = 0; i < 5; i++) {
                                scene.particles.explosion(CollisionBox.center(event.flare).plus(new Vector2(Math.floor(Math.random() * 4) - 2, Math.floor(Math.random() * 4) - 2)));
                            } 
                            game.playSound('rumble');
                            
                            event.next = true;
                        } else {
                            game.cpuKeys.right = true;
                            event.flare.vel.x = 3;
                            if(!(event.frameCount % 10)) scene.particles.explosion(CollisionBox.center(event.flare));
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        event.end = true;
                        scene.enableHUD = true;
                        game.timer = new Date();
                        game.playBGM('beat_of_a_hundred_flowers');

                        // event.flare.pos = new Vector2(53 * 16, 64 * 16);

                        // event.flare.pos = new Vector2(3.75 * 20 * 16, 12 * 16);
                        // event.flare.pos = new Vector2(13.75 * 20 * 16, 0);
                    }
                ]
            },
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.translate(8.5 * 16, 0);
                            game.ctx0.scale(-1, 1);
                            game.ctx0.translate(-8.5 * 16, 0);
                            game.ctx0.drawImage(game.assets.images['sp_sukonbu'],
                                Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 32, 0, (10 * 12 + 6) * 16 + 3, 32, 32);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],
        "2_9": [
            {
                condition: game => {
                    const flare = game.scene.actors.find(actor => actor instanceof Flare);
                    return flare && !flare.doubleJump && !game.scene.actors.find(actor => actor instanceof JumpPickup);
                },
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                        
                            event.elfriend = new Elfriend(new Vector2((9 + 2 * 20) * 16, 10.25 * 12 * 16), false);
                            game.scene.actors.unshift(event.elfriend);

                            game.cpuKeys.right = true;
                        }

                        if (flare.pos.x > (4 + 2 * 20) * 16) {
                            game.cpuKeys = new Object;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame > 59 && event.timelineFrame < 240) {
                            if (event.timelineFrame === 60) {
                                flare.setAnimation('look');
                                game.playSound('level_start');
                                flare.animationLocked = true;
                            }
                        }

                        if (event.timelineFrame === 180) {
                            flare.animationLocked = false;
                            flare.setAnimation('idle');
                        }

                        if (event.timelineFrame === 240) {
                            game.scene.actors.push(new JumpPickup(event.elfriend.pos.value().plus(new Vector2(0, -16)), new Vector2(20, 20)));
                        }

                        if (event.timelineFrame > 240) {
                            event.elfriend.pos.y -= 2;
                        }

                        if (!CollisionBox.intersects(event.elfriend, scene.view)) {
                            scene.actors = scene.actors.filter(a => a !== event.elfriend);
                            flare.playerControl = true;
                            event.end = true;
                        }
                    }
                ]
            }
        ],
        "4_5": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        if (event.timelineFrame && !(event.timelineFrame % 360)) {
                            game.scene.iceWind = 180;
                            game.scene.iceWindDir = (event.timelineFrame / 180) % 4;
                        }
                    }
                ]
            }
        ],
        "1_4": [
            {
                condition: game => !game.scene.fubuzillaCleared,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        if (flare.pos.x < 54 * 16) {
                            if (scene.isFocus) scene.isFocus = 0;
                            if (scene.iceWind) scene.iceWind = 0;
                            event.fubuzilla = new Fubuzilla(new Vector2(40 * 16, 70 * 16));
                            scene.actors.push(event.fubuzilla);
                            
                            for (let y = 0; y < 7; y++) {
                                scene.foreground[`30_${63 + y}`] = "27";
                                scene.foreground[`60_${63 + y}`] = "27";
                            }
                            event.collisions = [
                                { pos: { x: 30 * 16, y: 63 * 16 }, size: { x: 16, y: 16 * 7 }},
                                { pos: { x: 60 * 16, y: 63 * 16 }, size: { x: 16, y: 16 * 7 }}
                            ];
                            scene.sections[5].collisions.push(...event.collisions);

                            scene.shakeBuffer = 4;

                            // game.stopBGM();
                            event.next = true;

                            scene.warning = true;
                        }
                    },
                       (game, event) => {
                        const scene = game.scene;

                        if (!event.fubuzilla.health) {
                            for (let y = 0; y < 7; y++) {
                                delete scene.foreground[`30_${63 + y}`];
                                delete scene.foreground[`60_${63 + y}`];
                            }

                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;

                            scene.sections[5].collisions = scene.sections[5].collisions.filter(a => !event.collisions.includes(a));

                            scene.fubuzillaCleared = true;

                            event.end = true;
                        }
                    }
                ]
            }
        ],
        "1_3": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        localStorage.setItem('nuinui-save-achievement-13', true);
                        game.updateAchievements();

                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_poyoyo'],
                                Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 24, 35 * 16, 42.5 * 16 + 2, 32, 24);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],
        "1_2": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        if (event.timelineFrame % 180 < 120) {
                            game.scene.iceWind = 2;
                            game.scene.iceWindDir = false;
                        }
                    }
                ]
            }
        ],
        "4_1": [
            {
                condition: game => !game.scene.ayameBossCleared,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (flare.pos.y <= 18 * 16) {
                            if (scene.isFocus) scene.isFocus = 0;
                            
                            event.ayame = new Ayame(new Vector2(104.5 * 16, 18 * 16), 40);
                            event.ayame.setAnimation('idle');
                            event.ayame.dir = false;
                            scene.actors.push(event.ayame);
                            
                            for (let x = 0; x < 3; x++) {
                                scene.foreground[`${88 + x}_19`] = "f";
                                scene.foreground[`${88 + x}_20`] = "e";
                                scene.foreground[`${109 + x}_19`] = "f";
                                scene.foreground[`${109 + x}_20`] = "e";
                            }
                            event.collisions = [
                                { pos: { x: 88 * 16, y: 20 * 16 }, size: { x: 16 * 3, y: 16 }},
                                { pos: { x: 109 * 16, y: 20 * 16 }, size: { x: 16 * 3, y: 16 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);

                            game.playSound('rumble');
                            scene.shakeBuffer = 4;

                            scene.lockedViewPos = new Vector2(0, 12 * 16);
                            scene.warning = true;

                            // game.stopBGM();
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        scene.lockedViewPos.x = Math.round((flare.pos.x + event.ayame.pos.x) / 2) - game.width / 2;

                        if (event.timelineFrame === 120) {
                            scene.warning = false;
                            event.ayame.setAnimation('idle');
                            event.ayame.phase = 'idle';
                        }

                        if (!event.ayame.health) {
                            scene.lockedViewPos = null;

                            flare.playerControl = false;
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;

                            event.ayame.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Sword));

                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 120) scene.ayameBossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.actors = scene.actors.filter(a => !(a instanceof Ayame));

                            for (let x = 0; x < 3; x++) {
                                delete scene.foreground[`${88 + x}_19`];
                                delete scene.foreground[`${88 + x}_20`];
                                delete scene.foreground[`${109 + x}_19`];
                                delete scene.foreground[`${109 + x}_20`];
                            }
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;

                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            flare.playerControl = true;
                            event.end = true;
                        }
                    }
                ]
            }
        ],
        "13_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.translate(13 * 20 * 16, 0);
                            game.ctx0.drawImage(game.assets.images['sp_sukonbu'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 32, 4 * 16, 8 * 16 + 4, 32, 32);
                            game.ctx0.scale(-1, 1);
                            game.ctx0.drawImage(game.assets.images['sp_sukonbu'], Math.floor(event.timelineFrame / 16) % 2 ? 0 : 32, 0, 32, 32, -19 * 16, 8 * 16 + 4, 32, 32);
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],
        "14_0": [
            {
                condition:game => !game.scene.bossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (event.timelineFrame === 0) {
                            flare.playerControl = false;
                            if (scene.isFocus) scene.isFocus = 0;
                            
                            event.fubuki = new Fubuki(new Vector2((14 * 20 + 13) * 16, -64), 48);
                            // event.fubuki = new Fubuki(new Vector2((14 * 20 + 13) * 16, -64), 1);
                            event.fubuki.setAnimation('jump');
                            event.fubuki.dir = false;
                            scene.actors.push(event.fubuki);

                            game.stopBGM();
                        }
                        
                        game.cpuKeys.right = true;

                        if (event.fubuki.isGrounded) event.fubuki.setAnimation('idle');

                        if (flare.pos.x > 14.25 * 20 * 16) {
                            game.cpuKeys = new Object;

                            event.collisions = [
                                { pos: { x: (14 * 20 - 1) * 16, y: 0 }, size: { x: 16, y: 12 * 16 }},
                                { pos: { x: 15 * 20 * 16, y: 0 }, size: { x: 16, y: 12 * 16 }}
                            ];

                            scene.currentSection.collisions.push(...event.collisions);

                            

                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (!flare.playerControl && event.fubuki.isGrounded) event.fubuki.setAnimation('idle');

                        if (event.timelineFrame === 60) {
                            scene.warning = true;
                            game.playBGM('dethroneworld');
                        }

                        if (event.timelineFrame === 240) {
                            event.fubuki.phase = 'idle';
                            flare.playerControl = true;
                            scene.warning = false;
                        }
                        
                        if (!event.fubuki.health) {
                            
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;

                            event.next = true;
                            flare.playerControl = false;
                            event.fubuki.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            if (!flare.chargeTypeList.includes('shield')) scene.actors.push(new ShieldPickup(event.fubuki.pos.value(), new Vector2(20, 20)));
                            game.stopBGM();
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 120) scene.bossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.actors = scene.actors.filter(a => !(a instanceof Fubuki));

                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            flare.playerControl = true;
                            event.end = true;
                            
                            game.playBGM('beat_of_a_hundred_flowers');
                        }
                    }
                ]
            }
        ],
        "16_0": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (flare.pos.y > 12 * 16) {
                            scene.blackout = true;
                        }

                        if (scene.blackout && flare.isGrounded) {
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 60) {
                            scene.warning = true;
                        }

                        if (event.timelineFrame === 120) {
                            event.noel = new EvilNoel(new Vector2(329.5 * 16, 24 * 16));
                            event.noel.phase = 'move';
                            scene.actors.push(event.noel);
                        }

                        if (event.noel && event.noel.pos.y > 28 * 16) {
                            scene.warning = false;
                            
                            scene.noelTime = new Date().getTime();
                            event.end = true;
                        }
                    }
                ]
            }
        ]
    },


    //----------------------------------------------------------------------------------------------------------------------------------------------------------


    "westa": {
        "0_0": [
            {
                condition: game => game.scene.frameCount === 0,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                
                        if (event.frameCount === 0) {
                            event.flare = new Flare(new Vector2(9.5 * 16, 9 * 16), new Vector2(16, 32));
                            event.flare.setAnimation('sleep');
                            event.flare.animationLocked = true;
                
                            scene.view.target = event.flare;
                            scene.blackout = true;
                
                            scene.actors.push(event.flare);
                            game.demoCleared = true;
                        }
                
                        // if (game.keys.jump) event.next = true;

                        if (event.timelineFrame < 120) {
                            const alpha = 1 - (event.timelineFrame / 120 === 0 ? 0 : Math.pow(2, 10 * event.timelineFrame / 120 - 10));
                            scene.customDraw.push(game => {
                                game.ctx3.save();
                                game.ctx3.globalAlpha = alpha;
                                game.ctx3.fillStyle = "#000";
                                game.ctx3.fillRect(0, 0, game.width, game.height);
                                game.ctx3.restore();
                            });
                        }

                        // scene.customDraw.push(game => {
                        //     game.ctx3.drawImage(game.assets.images['ui_start_label'], 204, 165);
                        //     if (!(Math.floor(scene.frameCount / 32) % 2)) {
                        //         game.ctx3.fillStyle = "#0008";
                        //         game.ctx3.fillRect(208, 167, 104, 20);
                        //     }
                        // });
                    },
                    (game, event) => {
                        const scene = game.scene;
                        switch (event.timelineFrame) {
                            case 00:
                                event.flare.setAnimation('wakeup');
                                game.playSound('wakeup');
                                break;
                            case 39:
                                event.flare.setAnimation('idle');
                                event.flare.playerControl = true;
                                event.flare.animationLocked = false;
                                event.end = true;
                                scene.enableHUD = true;
                                // game.playBGM('smile_&_go_slow');
                                game.timer = new Date();
                                break;
                            default:
                                break;
                        }
                    }
                ]
            }
        ]
    }
}