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
                condition: game => game.scene.actors.find(actor => actor instanceof Flare).hasBow && !game.scene.miniBossStarted && !game.scene.miniBossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        if (event.timelineFrame === 0) {
                            game.stopBGM();
                        }
                        game.scene.miniBossStarted = true;
                        const scene = game.scene;    
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        if (flare && flare.pos.x < 16 * 90) event.next = true;
                    },
                    (game, event) => {
                        const scene = game.scene;

                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            scene.miniBoss = 'started';
                            event.boss = new PekoMiniBoss(new Vector2(82 * 16, 0));
                            scene.actors.push(event.boss);

                            event.collisions = [
                                { pos: { x: 81.25 * 16, y: 0 }, size: { x: 16, y: 6 * 16 }},
                                { pos: { x: 97.75 * 16, y: 0 }, size: { x: 16, y: 6 * 16 }}
                            ];

                            scene.warning = true;
                            scene.currentSection.collisions.push(...event.collisions);

                            flare.playerControl = false;
                        }

                        if (event.boss.phase === 'intro') {
                            scene.shakeBuffer = 2;
                            if (!(event.timelineFrame % 32)) game.playSound('rumble');
                        }

                        if (event.boss.phase === 'idle' && !flare.playerControl) {
                            scene.warning = false;
                            flare.playerControl = true;
                            game.playBGM('robotic_foe');
                        }
                        
                        if (event.boss.health <= 0) {
                            event.boss.laserTarget = null;
                            event.boss.middleVel = new Vector2(0, 0);
                            event.next = true;
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
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.checkpoint = CHECKPOINT_STAGE_1_0;
                        console.log('checkpoint')
                        event.end = true;
                    }
                ]
            },
            {
                condition: game => game.scene.miniBoss !== 'started',
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        if (event.timelineFrame % 2 && Math.random() > .75) game.scene.shakeBuffer = 2;
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
            },
            {
                condition: game => {
                    const flare = game.scene.actors.find(actor => actor instanceof Flare);
                    return flare && !flare.hasBow && !game.scene.actors.find(actor => actor instanceof BowPickup);
                },
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        game.scene.actors.push(new BowPickup(new Vector2(116 * 16 - 2, 62), new Vector2(20, 20)));
                        event.end = true;
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "7_3": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.checkpoint = CHECKPOINT_STAGE_1_1;
                        console.log('checkpoint')
                        event.end = true;
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "7_1": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.checkpoint = CHECKPOINT_STAGE_1_2;
                        console.log('checkpoint')
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
                            event.next = true;
                            flare.playerControl = false;
                            event.pekora.phase = 'defeated';
                            event.pekora.dir = false;
                            event.pekora.setAnimation('idle');
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            game.stopBGM();
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
                            event.flare.hasBow = true;
                            
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
                            game.scene.actors.push(new ClockPickup(event.elfriend.pos.value(), new Vector2(20, 20)));
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
                        game.checkpoint = CHECKPOINT_STAGE_2_0;
                        console.log('checkpoint')
                        event.end = true;
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
                            game.ctx0.globalAlpha = alpha;
                            game.ctx0.drawImage(game.assets.images['sp_skulls'], 20 * 8.5 * 16, Math.cos((game.scene.frameCount / game.height / 4) * (180 / Math.PI)) * 2 - 2);
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
                            event.pekora = new Pekora(new Vector2(193 * 16, 8 * 16), 16);
                            event.pekora.vel = new Vector2(-2, -4);
                            event.pekora.setAnimation('jump');

                            event.miko = new Miko(new Vector2(166 * 16, 8 * 16), 16);
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
            },
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.checkpoint = CHECKPOINT_STAGE_2_1;
                        console.log('checkpoint')
                        event.end = true;
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
                            
                            event.miko = new Miko(new Vector2((14 * 20 + 13) * 16, 32 * 16), 32);
                            event.miko.setAnimation('chant');
                            event.miko.dir = false;
                            scene.actors.push(event.miko);
                            
                            game.canvas1.style.filter = 'brightness(0%)';
                            game.canvas2.style.filter = 'brightness(0%)';
                            game.stopBGM();
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

                        // if (scene.warning && !(event.timelineFrame % 60)) game.playSound('warning');

                        if (event.timelineFrame === 240) {
                            event.miko.phase = 'idle';
                            flare.playerControl = true;
                            scene.warning = false;
                            // game.playBGM('elite_moonlight_scuffle');
                        }
                        
                        if (!event.miko.health) {
                            event.next = true;
                            flare.playerControl = false;
                            event.miko.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            game.stopBGM();
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
                        }
                    }
                ]
            }
        ]
    },
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
                            event.flare.hasBow = true;
                            event.flare.item = true;
                            
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
                        }
                    }
                ]
            }
        ],
    }
}