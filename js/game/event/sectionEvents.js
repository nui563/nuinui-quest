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
                            
                            if (game.noelMode) {
                                event.flare = new Noel(new Vector2(160, 48), new Vector2(16, 32));
                                event.flare.setAnimation('idle');
                            } else {
                                event.flare = new Flare(new Vector2(160, 48), new Vector2(16, 32));
                                event.flare.setAnimation('sleep');
                            }
                            event.flare.animationLocked = true;

                            // --- debug
                            // event.flare.pos.x = 7 * 16 * 20;
                            // event.flare.pos.y = 15 * 16;
                            // scene.enableHUD = true;
                            // event.flare.animationLocked = false;
                            // event.flare.setAnimation('idle');
                            // event.flare.playerControl = true;
                            // event.end = true;
                            // ---

                            scene.view.target = event.flare;
                
                            scene.actors.push(event.flare);
                        }
                
                        if (game.keys.jump) event.next = true;

                        scene.customDraw.push(game => {
                            game.ctx3.save();
                            if ([56, 58, 59].includes(Math.floor(scene.frameCount / 4) % 60)) game.ctx3.filter = 'brightness(2)';
                            game.ctx3.drawImage(game.assets.images['ui_title'], 64, 80);
                            game.ctx3.restore();
                            game.ctx0.drawImage(game.assets.images['ui_start_label'], 0, 24 * (Math.floor(scene.frameCount / 32) % 2), 112, 24, game.width * .5 - 56, game.height - 24, 112, 24);
                        });
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const frame = event.timelineFrame;
                        
                        switch (frame) {
                            case 30:
                                scene.shakeBuffer = 30;
                                game.playSound('explosion');
                                // event.flare.setAnimation('wakeup');
                                break;
                            // case 69:
                            //     event.flare.setAnimation('idle');
                            //     break;
                            case 330:
                                event.flare.setAnimation('idle');
                                game.playSound('explosion');
                                break;
                            // case 90:
                            // case 540:
                                // game.playSound('wakeup');
                                // break;
                            // case 579:
                            //     event.flare.setAnimation('idle');
                            //     break;
                            case 600:
                                event.flare.dir = false;
                                break;
                            case 630:
                                event.flare.dir = true;
                                break;
                            case 860:
                                game.cpuKeys = new Object;
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

                        const transitionIntro = 120;
                        const transitionIntroDuration = 30;
                        
                        const transitionEnd = 450;
                        const transitionEndDuration = 30;

                        if (frame < transitionEnd + transitionEndDuration) {
                            if (frame > transitionIntro + transitionIntroDuration) {
                                game.scene.customDraw.push(game => {
                                    const cx = game.ctx2;
                                    cx.save();
                                    if (frame > 330 && frame < 350) cx.translate(Math.floor(Math.random() * 4 - 2), 0);
                                    cx.drawImage(game.assets.images['bg_intro1'], 0, 0);
                                    cx.drawImage(game.assets.images['bg_intro2'], 0, 0);
                                    if (frame > 330) cx.drawImage(game.assets.images['bg_shikemura'], 16 * 9, 0);
                                    else cx.drawImage(game.assets.images['bg_shiraken'], 16 * 9, 0);
                                    if (frame > 330 && frame < 350) cx.translate(Math.floor(Math.random() * 4 - 2), 0);
                                    cx.drawImage(game.assets.images['ms_flare'], frame < 340 ? 0 : 100, 0, 100, 128, 0, game.height - 128, 100, 128);
                                    cx.restore();
                                });
                            }
    
                            if (frame > transitionIntro + 60) {
                                game.scene.customDraw.push(game => {
                                    const progress = Math.min(1, (frame - transitionIntro - 120) / 30);
                                    const cx = game.ctx2;
                                    cx.save();
                                    if (frame > 330 && frame < 350) cx.translate(Math.floor(Math.random() * 4 - 2), 0);
                                    cx.drawImage(game.assets.images['ms_miko'], 0, 0, 128, 128, 9 + game.width - 128, game.height - 128 * progress, 128, 128);
                                    cx.restore();
                                });
                            }
    
                            if (frame > transitionIntro + 180) {
                                game.scene.customDraw.push(game => {
                                    const progress = Math.min(1, (frame - transitionIntro - 180) / 30);
                                    const cx = game.ctx2;
                                    cx.save();
                                    cx.drawImage(game.assets.images['bg_intro3'], 0, 0 - game.height * (1 - progress));
                                    cx.restore();
                                });
                            }
                        }

                        if (transitionIntro <= frame && frame < transitionIntro + transitionIntroDuration) {
                            //transition intro 1
                            game.scene.customDraw.push(game => {
                                const progress = (frame - transitionIntro) / (transitionIntroDuration * .5);
                                const cx = game.ctx2;
                                cx.save();
                                cx.fillStyle = '#000';
                                cx.fillRect(0, game.height, game.width, -game.height * progress);
                                cx.restore();
                            });
                        }

                        const transitionIntro2 = transitionIntro + transitionIntroDuration;
                        const transitionIntroDuration2 = 15;
                        if (transitionIntro2 <= frame && frame < transitionIntro2 + transitionIntroDuration2) {
                            //transition intro 2
                            game.scene.customDraw.push(game => {
                                const progress = (frame - transitionIntro2) / transitionIntroDuration2;
                                const cx = game.ctx2;
                                cx.save();
                                cx.fillStyle = '#000';
                                cx.fillRect(0, 0, game.width, game.height * (1 - progress));
                                cx.restore();
                            });
                        }
                        
                        if (transitionEnd <= frame && frame < transitionEnd + transitionEndDuration) {
                            //transition intro 1
                            game.scene.customDraw.push(game => {
                                const progress = (frame - transitionEnd) / (transitionEndDuration * .5);
                                const cx = game.ctx2;
                                cx.save();
                                cx.fillStyle = '#000';
                                cx.fillRect(0, game.height, game.width, -game.height * progress);
                                cx.restore();
                            });
                        }

                        const transitionEnd2 = transitionEnd + transitionEndDuration;
                        const transitionEndDuration2 = 15;
                        if (transitionEnd2 <= frame && frame < transitionEnd2 + transitionEndDuration2) {
                            //transition intro 2
                            game.scene.customDraw.push(game => {
                                const progress = (frame - transitionEnd2) / transitionEndDuration2;
                                const cx = game.ctx2;
                                cx.save();
                                cx.fillStyle = '#000';
                                cx.fillRect(0, 0, game.width, game.height * (1 - progress));
                                cx.restore();
                            });
                        }


                        if (frame >= 660 && frame < 718) {
                            if (frame === 660) {
                                event.flare.animationLocked = false;
                                game.cpuKeys = new Object;
                            }
                            game.cpuKeys.right = true;
                        } else if (game.cpuKeys) game.cpuKeys.right = undefined;
                        
                
                        if (frame > 760 && frame < 860) {
                            if (frame === 761) {
                                game.playSound('level_start');
                                if (!game.noelMode) {
                                    event.flare.setAnimation('look');
                                }
                                event.flare.animationLocked = true;
                            }
                            if (!(frame % (frame < 780 ? 0 : frame < 800 ? 2 : 4))) {
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
                condition: game => (game.noelMode || game.scene.actors.find(actor => actor instanceof Flare).hasBow) && !game.scene.miniBossCleared,
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
                            scene.boss = event.boss;
                            scene.boss.icon = 1;
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
                                scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                                scene.actors = scene.actors.filter(a => !(a instanceof Rocket));
                                scene.isFocus = 0;
                                scene.boss = null;
                                
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
                condition: game => !game.scene.actors.find(actor => actor instanceof Flare).hasBow,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.filter = 'brightness(.5)';
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            for (let i = -2; i < 12; i++) {
                                game.ctx0.drawImage(game.assets.images['sp_peko_mini_boss'], 0, 0, 24, 24, 106 * 16 + 4 * Math.cos((event.timelineFrame + 30*i) * (Math.PI / 180)), i * 16 + (event.timelineFrame) % 16, 24, 24);
                            }
                            game.ctx0.restore();
                        });
                        game.scene.customDraw.push(game => {
                            game.ctx2.save();
                            game.ctx2.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            for (let i = -1; i < 13; i++) {
                                game.ctx2.drawImage(game.assets.images['sp_peko_mini_boss'], 0, 0, 24, 24, 112 * 16 + 4 * Math.sin((event.timelineFrame - 30*i) * (Math.PI / 180)), i * 16 - (event.timelineFrame) % 16, 24, 24);
                            }
                            game.ctx2.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "6_0": [
            {
                condition: game => !game.scene.actors.find(actor => actor instanceof Flare).hasBow,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            const cx = game.ctx0;
                            cx.save();
                            cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            cx.translate((6.5 * 20) * 16, 9 * 16);
                            cx.drawImage(game.assets.images['ui_tuto_1'], 0, Math.floor(event.timelineFrame / 16) % 2 ? 0 : 16, 48, 16, 0, 0, 48, 16);
                            cx.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "7_0": [
            {
                condition: game => game.scene.actors.find(actor => actor instanceof Flare).hasBow,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.customDraw.push(game => {
                            const cx = game.ctx0;
                            cx.save();
                            cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            cx.translate((8 * 20 - 5) * 16, 4 * 16);
                            cx.drawImage(game.assets.images['ui_tuto_2'], 16, Math.floor(event.timelineFrame / 16) % 2 ? 0 : 16, 16, 16, 0, 0, 16, 16);
                            cx.drawImage(game.assets.images['ui_tuto_3'], 32, Math.floor(event.timelineFrame / 16) % 2 ? 0 : 16, 32, 16, 16, 0, 32, 16);
                            cx.translate(8 * 16, 0);
                            cx.drawImage(game.assets.images['ui_tuto_2'], Math.floor(event.timelineFrame / 8) % 2 ? 0 : 16, Math.floor(event.timelineFrame / 16) % 2 ? 0 : 16, 16, 16, 0, 0, 16, 16);
                            cx.drawImage(game.assets.images['ui_tuto_3'], 0, Math.floor(event.timelineFrame / 16) % 2 ? 0 : 16, 32, 16, 16, 0, 32, 16);
                            cx.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "9_0": [
            {
                condition: game => !localStorage.getItem('nuinui-save-item-gun') && !game.noelMode,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        game.scene.actors = game.scene.actors.filter(a => !(a instanceof BowPickup));
                        game.scene.actors.push(new BowPickup(new Vector2(195.5 * 16 - 2, 4.25 * 16), new Vector2(20, 20), 'gun'));
                        event.end = true;
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "3_5": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const jankenPos = new Vector2(16 * (3 * 20 + 12), 16 * 5 * 12 + 16 * 7);
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        const dir = CollisionBox.center(flare).x > jankenPos.x;
                        const dist = CollisionBox.center(flare).distance(jankenPos);
                        const canJanken = !event.jankenBuffer && event.result === null && dist < 5 * 16 && dist > 3 * 16 && flare.isGrounded && flare.dir !== dir;
                        
                        if (!event.timelineFrame) {
                            event.wHand = 0;
                            event.fHand = 0;
                        }

                        if (canJanken && !(event.timelineFrame % 8)) {
                            event.wHand += Math.random() > .5 ? 1 : -1;
                            event.fHand += Math.random() > .5 ? 1 : -1;
                            if (event.wHand < 0) event.wHand = 2;
                            if (event.wHand > 2) event.wHand = 0;
                            if (event.fHand < 0) event.fHand = 2;
                            if (event.fHand > 2) event.fHand = 0;
                        }

                        if (!event.jankenBuffer) event.result = null;

                        if (canJanken && !event.jankenBuffer && game.keys.down && event.wHand !== undefined) {
                            flare.playerControl = false;
                            game.playSound('level_start');
                            event.jankenBuffer = 60;
                            event.result = event.wHand === event.fHand ? null : (event.wHand === (event.fHand + 1) % 3) ? 1 : 2;
                        }

                        if (event.jankenBuffer) {
                            event.jankenBuffer--;

                            if (!event.jankenBuffer) {
                                flare.playerControl = true;
                                event.wHand += Math.random() > .5 ? 1 : -1;
                                event.fHand += Math.random() > .5 ? 1 : -1;
                                if (event.wHand < 0) event.wHand = 2;
                                if (event.wHand > 2) event.wHand = 0;
                                if (event.fHand < 0) event.fHand = 2;
                                if (event.fHand > 2) event.fHand = 0;
                                
                                if (!event.result) game.playSound('question');

                                if (event.result === 1) {
                                    flare.takeHit(game, flare);
                                    game.scene.particles.explosion(CollisionBox.center(flare));
                                    game.scene.shakeBuffer = 4;
                                    game.playSound("explosion");
                                }

                                if (event.result === 2) {
                                    scene.actors.push(new Heart(CollisionBox.center(flare).plus(new Vector2(-4, -6 * 16))));
                                }
                            }
                        }

                        scene.customDraw.push(game => {
                            
                            if (canJanken || event.jankenBuffer) {
                                const bubblePos = game.scene.view.pos.plus(CollisionBox.center(flare).times(-1)).round();
                                game.ctx0.save();
                                game.ctx0.translate(-bubblePos.x, -game.scene.view.pos.y + 16 * 5 * 12 + 16 * 7);
                                if (flare.dir) game.ctx0.scale(-1, 1);
                                if (event.jankenBuffer) game.ctx0.filter = 'invert(100%)';
                                game.ctx0.drawImage(game.assets.images['ui_text_bubble'], event.jankenBuffer ? 32 : 0, 0, 32, 32, -16, -24, 32, 32);
                                game.ctx0.drawImage(game.assets.images['sp_hand'], 16 * event.fHand, 0, 16, 16, -8, -20, 16, 16);
                                if (!event.jankenBuffer) game.ctx0.drawImage(game.assets.images['ui_arrow_down'], -14, -8 - (Math.floor(event.timelineFrame / 32) % 2));
                                game.ctx0.restore();
                            }
                            
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x + jankenPos.x, -game.scene.view.pos.y + jankenPos.y);
                            if (dir) game.ctx0.scale(-1, 1);
                            game.ctx0.drawImage(game.assets.images['sp_watame'], event.result === 2 ? 48 : 0, 0, 48, 48, -24, Math.floor(event.timelineFrame / 32) % 2, 48, 48);
                            if (event.jankenBuffer) game.ctx0.filter = 'invert(100%)';
                            if (canJanken || event.jankenBuffer) {
                                game.ctx0.drawImage(game.assets.images['ui_text_bubble'], event.jankenBuffer ? 32 : 0, 0, 32, 32, -16, -24, 32, 32);
                                game.ctx0.drawImage(game.assets.images['sp_hand'], 16 * event.wHand, 0, 16, 16, -8, -20, 16, 16);
                            }
                            game.ctx0.restore();
                        });
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "6_1": [
            {
                condition: game => game.scene.actors.find(actor => actor instanceof Flare).chargeTypeList.length === 1,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        if (game.scene.actors.find(actor => actor instanceof Flare).chargeTypeList.length > 1) {
                            game.scene.customDraw.push(game => {
                                const cx = game.ctx0;
                                cx.save();
                                cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                                cx.translate((6.5 * 20) * 16 - 24, 18 * 16 - 24);
                                cx.drawImage(game.assets.images['ui_tuto_4'], 0, Math.floor(event.timelineFrame / 16) % 2 ? 0 : 48, 48, 48, 0, 0, 48, 48);
                                cx.restore();
                            });
                        }
                    }
                ]
            },
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

                        if (event.timelineFrame === 40) {
                            scene.boss = event.pekora;
                            scene.boss.icon = 2;
                        }
                        
                        if (event.timelineFrame === 80) {
                            event.pekora.dir = true;
                            game.playBGM('crazy_bnuuy');
                        }
                        
                        if (event.timelineFrame === 180) {
                            event.pekora.setAnimation('laugh');
                        }

                        if (event.timelineFrame === 250) {
                            scene.warning = false;
                            flare.playerControl = true;
                            event.pekora.setAnimation('idle');
                            event.pekora.phase = 'idle';
                        }

                        if (!event.pekora.health) {
                            
                            if (scene.achievement3) {
                                localStorage.setItem('nuinui-save-achievement-3', true);
                                game.updateAchievements();
                            }

                            scene.boss = null;
                            flare.playerControl = false;
                            event.pekora.phase = 'defeated';
                            event.pekora.dir = false;
                            event.pekora.setAnimation('idle');
                            if (!flare.chargeTypeList.includes('rocket') && !game.noelMode) game.scene.actors.push(new RocketPickup(event.pekora.pos.value(), new Vector2(20, 20)));
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
                            
                            if (game.noelMode) {
                                event.flare = new Noel(new Vector2(16 * 9.5, 16 * 7), new Vector2(16, 32));
                            } else {
                                event.flare = new Flare(new Vector2(16 * 9.5, 16 * 7), new Vector2(16, 32));
                            }
                            event.flare.setAnimation('idle');

                            scene.view.target = event.flare;
                            scene.actors.push(event.flare);
                        }
                
                        if (game.keys.jump) event.next = true;
                
                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['ui_start_label'], 0, 24 * (Math.floor(scene.frameCount / 32) % 2), 112, 24, game.width * .5 - 56, game.height - 24, 112, 24);
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
                    return flare && !game.noelMode && !flare.item && !game.scene.actors.find(actor => actor instanceof ClockPickup);
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
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 0) {
                            event.boss = new CasinoBoss();
                            scene.actors.push(event.boss);
                        }

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
                            scene.boss = event.boss;
                            scene.boss.icon = 1;

                            event.pekora = new Pekora(new Vector2(193 * 16, 8 * 16), 4);
                            event.pekora.vel = new Vector2(-2, -4);
                            event.pekora.setAnimation('jump');
                            event.pekora.skullBoss = scene.boss;

                            event.miko = new Miko(new Vector2(166 * 16, 8 * 16), 4);
                            event.miko.vel = new Vector2(2, -4);
                            event.miko.setAnimation('jump');
                            event.miko.skullBoss = scene.boss;

                            event.boss.actors.push(event.miko, event.pekora);
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

                        
                        // if (scene.warning && !(event.timelineFrame % 60)) game.playSound('warning');

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

                        if (!event.boss.health) {
                            scene.boss = null;
                            scene.actors = scene.actors.filter(a => !(a instanceof Rocket));
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            scene.actors = scene.actors.filter(a => !(a instanceof Pekora));
                            scene.actors = scene.actors.filter(a => !(a instanceof Miko));
                            event.next = true;
                            flare.playerControl = false;
                            game.playSound("noise");
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
                            event.miko.setAnimation('idle');
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
                            scene.boss = event.miko;
                            scene.boss.icon = 3;
                            scene.warning = true;
                            event.miko.setAnimation('sniper');
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 120) {
                            scene.warning = false;
                            game.playBGM('elite_moonlight_scuffle');
                            game.canvas1.style.filter = 'none';
                            game.canvas2.style.filter = 'none';
                            event.miko.phase = 'sniper';
                            flare.playerControl = true;
                        }
                        
                        if (!event.miko.health) {
                            
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;
                            scene.boss = null;

                            event.next = true;

                            flare.playerControl = false;
                            event.miko.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            if (!flare.chargeTypeList.includes('petal') && !game.noelMode) scene.actors.push(new PetalPickup(event.miko.pos.value(), new Vector2(20, 20)));
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
                            if (game.noelMode) {
                                event.flare = new Noel(new Vector2(16 * 9.5, 16 * 7), new Vector2(16, 32));
                            } else {
                                event.flare = new Flare(new Vector2(16 * 9.5, 16 * 7), new Vector2(16, 32));
                            }
                            event.flare.setAnimation('idle');

                            scene.view.target = event.flare;
                            scene.actors.push(event.flare);
                        }
                
                        if (game.keys.jump) event.next = true;
                
                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['ui_start_label'], 0, 24 * (Math.floor(scene.frameCount / 32) % 2), 112, 24, game.width * .5 - 56, game.height - 24, 112, 24);
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
                            if(!game.noelMode) game.stopBGM(true);

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
                            
                            if (!game.noelMode) {
                                game.stopBGM();
                                game.playBGM('aquamarine_bay');
                            }
                            
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
                            event.marine = new Marine(new Vector2(24 * 16, -32), 96);
                            event.marine.phase = 'intro';

                            event.aircons = [
                                new Aircon(new Vector2(20, 7.5), 1),
                                new Aircon(new Vector2(38, 7.5), -1),
                            ];
                            scene.actors.push(event.marine, ...event.aircons);

                            scene.warning = true;
                            scene.boss = event.marine;
                            scene.boss.icon = 5;
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
                            if (!flare.chargeTypeList.includes('sword') && !game.noelMode) scene.actors.push(new SwordPickup(event.marine.pos.y < 96 ? new Vector2(event.marine.pos.x, 96) : event.marine.pos.value(), new Vector2(20, 20)));
                            game.stopBGM();
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 120) scene.bossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.actors = scene.actors.filter(a => !(a instanceof Marine));
                            scene.boss = null;

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
                            
                            if (game.noelMode) {
                                event.flare = new Noel(new Vector2(16, (-16 + 16 * 12) * 10), new Vector2(16, 32));
                            } else {
                                event.flare = new Flare(new Vector2(16, (-16 + 16 * 12) * 10), new Vector2(16, 32));
                            }
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
                            game.ctx3.drawImage(game.assets.images['ui_start_label'], 0, 24 * (Math.floor(scene.frameCount / 32) % 2), 112, 24, game.width - 112, game.height - 22, 112, 24);
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
                    return flare && !flare.doubleJump && !game.noelMode && !game.scene.actors.find(actor => actor instanceof JumpPickup);
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
                            scene.boss = event.fubuzilla;
                            scene.boss.icon = 1;
                        }
                    },
                       (game, event) => {
                        const scene = game.scene;

                        if (!event.fubuzilla.health) {
                            scene.boss = null;
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
                            scene.boss = event.ayame;
                            scene.boss.icon = 6;

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
                            scene.boss = null;

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

                        if (event.timelineFrame === 30) {
                            scene.warning = true;
                            scene.boss = event.fubuki;
                            scene.boss.icon = 7;
                        }

                        if (event.timelineFrame === 150) {
                            event.fubuki.phase = 'idle';
                            flare.playerControl = true;
                            scene.warning = false;
                            game.playBGM('dethroneworld');
                        }
                        
                        if (!event.fubuki.health) {
                            
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;
                            scene.boss = null;

                            event.next = true;
                            flare.playerControl = false;
                            event.fubuki.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            if (!flare.chargeTypeList.includes('shield') && !game.noelMode) scene.actors.push(new ShieldPickup(event.fubuki.pos.value(), new Vector2(20, 20)));
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

                        if (flare.pos.y > 12 * 16 && !scene.blackout) {
                            scene.blackout = true;
                            game.stopBGM();
                        }

                        if (scene.blackout && flare.isGrounded) {
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (game.noelMode) event.next = true;
                        else {
                            if (event.timelineFrame === 60) {
                                scene.warning = true;
                                scene.noelTime = new Date().getTime();
                            }
    
                            if (event.timelineFrame === 120) {
                                event.noel = new EvilNoel(new Vector2(329.5 * 16, 24 * 16));
                                event.noel.phase = 'move';
                                scene.actors.push(event.noel);
                                game.playBGM('corrupted_partner');
                            }
    
                            if (event.noel && event.noel.pos.y > 28 * 16) {
                                scene.warning = false;
                            }
    
                            if (event.noel && event.noel.isTrueEnd) {
                                scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                                scene.warning = false;
                                event.next = true;
                            }
                        }

                    },
                    (game, event) => {
                        if (game.noelMode) event.next = true;
                        else {
                            const scene = game.scene;
                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            if (event.timelineFrame === 0) flare.playerControl = false;
                            if (event.noel.phase === 'weak') event.next = true;
                        }
                    },
                    (game, event) => {
                        
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (game.noelMode) event.next = true;
                        else {
                            if (event.timelineFrame < 180) {
                                for (let i = 0; i < 2; i++) {
                                    game.scene.particles.smoke_pink(CollisionBox.center(event.noel).plus(new Vector2(
                                        Math.random() * 32 - 16, Math.random() * 20 - 10 - (event.timelineFrame))),
                                        new Vector2(Math.random() * 4 - 2, Math.random() * -1), 0);
                                }
                            } else if (event.timelineFrame < 360) {
                                for (let i = 0; i < 4; i++) {
                                    const dist = 360 - event.timelineFrame;
                                    game.scene.particles.smoke_pink(CollisionBox.center(flare).plus(new Vector2(
                                        Math.random() * 32 - 16, Math.random() * 20 - 10 - dist * 4)),
                                        new Vector2(Math.random() * 2 - 1, Math.random() * -1), 0);
                                }
                            } else if (event.timelineFrame === 360) {
                                scene.lockedViewPos = new Vector2(16 * 20 * 16, 2 * 12 * 16);
                                flare.isEvil = true;
                                flare.animationLocked = true;
                                flare.setAnimation('hit');
                                flare.vel.y = -1;
                                flare.gravity = 0;
                            }
    
                            if (flare.isEvil && flare.pos.y < 22 * 16) {
                                event.noel.setAnimation('idle');
                                event.next = true;
                            }
                        }
                    },
                    (game, event) => {
                        if (event.timelineFrame === 60) {
                            event.end = true;
                            game.noelMode = true;
                            game.scene.nextScene = new StageSelect(game, 3, 4);
                            game.checkpoint = null;
                            game.score += 40000;
                    
                            const noelTimer = new Date().getTime() - game.scene.noelTime;
                            if (noelTimer >= 60000) {
                                localStorage.setItem('nuinui-save-achievement-15', true);
                                game.updateAchievements();
                            }
                    
                            const time = new Date().getTime() - game.timer.getTime();
                            if (time <= 300000) {
                                localStorage.setItem('nuinui-save-achievement-16', true);
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


    "westa": {
        "0_7": [
            {
                condition: game => game.scene.frameCount === 0,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                
                        if (event.frameCount === 0) {
                            scene.blackout = true;
                            if (game.noelMode) {
                                event.flare = new Noel(new Vector2(9.5 * 16, (7 * 12 + 8) * 16), new Vector2(16, 32));
                                event.flare.setAnimation('idle');
                                
                                localStorage.setItem('nuinui-save-achievement-17', true);
                                game.updateAchievements();
                            } else {
                                event.flare = new Flare(new Vector2(9.5 * 16, (7 * 12 + 8) * 16), new Vector2(16, 32));
                                event.flare.setAnimation('sleep');
                            }
                            event.flare.animationLocked = true;
                            
                            //---
                            // event.flare.animationLocked = false;
                            // event.flare.playerControl = true;
                            // event.flare.dir = true;
                            // event.flare.pos = new Vector2(15 * 16, (3 * 12 - 4) * 16);
                            // scene.blackout = false;
                            // scene.travelRoom = true;
                            // scene.enableHUD = true;
                            // scene.mikoBossCleared = true;
                            // game.timer = new Date();
                            // event.end = true;
                            //---

                            scene.view.target = event.flare;
                            scene.actors.push(event.flare);
                        }

                        if (event.timelineFrame < 60) {
                            const alpha = 1 - (event.timelineFrame / 60 === 0 ? 0 : Math.pow(2, 10 * event.timelineFrame / 60 - 10));
                            scene.customDraw.push(game => {
                                game.ctx3.save();
                                game.ctx3.globalAlpha = alpha;
                                game.ctx3.fillStyle = "#000";
                                game.ctx3.fillRect(0, 0, game.width, game.height);
                                game.ctx3.restore();
                            });
                        } else {
                            if (game.keys.jump) event.next = true;
                            scene.customDraw.push(game => {
                                game.ctx3.drawImage(game.assets.images['ui_start_label'], 0, 24 * (Math.floor(scene.frameCount / 32) % 2), 112, 24, game.width - 104, game.height - 20, 112, 24);
                            });
                        }

                    },
                    (game, event) => {
                        const scene = game.scene;
                        switch (event.timelineFrame) {
                            case 0:
                                if (!game.noelMode) {
                                    event.flare.setAnimation('wakeup');
                                    game.playSound('wakeup');
                                }
                                break;
                            case 39:
                                game.playBGM('axe_dungeon');
                                event.flare.setAnimation('idle');
                                event.flare.playerControl = true;
                                event.flare.animationLocked = false;
                                event.end = true;
                                scene.enableHUD = true;
                                game.timer = new Date();
                                break;
                            default:
                                break;
                        }
                    }
                ]
            }
        ],
        "2_6": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        if (!scene.blackout) scene.blackout = true;
                        event.end = true;
                    }
                ]
            }
        ],
        "4_6": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        if (scene.blackout) scene.blackout = false;
                        event.end = true;
                    }
                ]
            }
        ],
        "1_4": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        if (!scene.blackout) scene.blackout = true;
                        event.end = true;
                    }
                ]
            }
        ],
        "2_4": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        if (scene.blackout) scene.blackout = false;
                        event.end = true;
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
                        if (flare.pos.x > 50 * 16 && flare.pos.x < 100 * 16 && !(event.frameCount % 10)) {
                            scene.actors.push(new Comet(
                                new Vector2(flare.pos.x + Math.floor(Math.random() * 20) * 16, (4 * 12 - 1) * 16),
                                new Vector2(Math.random() * 4 - 2, 2 + Math.random())));
                        }
                    }
                ]
            }
        ],
        "6_4": [
            {
                condition: game => !game.scene.suiseiBossCleared,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (!event.frameCount) {
                            flare.playerControl = false;
                            game.cpuKeys = new Object;
                            game.stopBGM(true);
                        }

                        if (flare.pos.x < (6 * 20 + 3) * 16) {
                            game.cpuKeys.right = true;
                        } else {
                            game.cpuKeys = new Object;
                            
                            if (event.frameCount === 50) {
                                event.collisions = [
                                    { pos: { x: (6 * 20 + 1) * 16, y: (4 * 12 + 7) * 16 }, size: { x: 16, y: 3 * 16 }},
                                    { pos: { x: (7 * 20 - 2) * 16, y: (4 * 12 + 7) * 16 }, size: { x: 16, y: 3 * 16 }}
                                ];
                                scene.currentSection.collisions.push(...event.collisions);
                                game.scene.shakeBuffer = 4;
                                game.playSound('rumble');
                                for (let y = 0; y < 3; y++) {
                                    scene.foreground[`121_${55 + y}`] = "12";
                                    scene.foreground[`138_${55 + y}`] = "12";
                                }
                                scene.warning = true;
                            } else if (event.frameCount > 120) {
                                event.axe = new Axe(new Vector2(6.5 * 20 * 16 - 32, (4 * 12 - 4) * 16));
                                event.suisei = new Suisei(new Vector2(6.5 * 20 * 16 - 8, (4 * 12 - 6) * 16), 48, event.axe);
                                event.suisei.phase = 'intro';
    
                                scene.boss = event.suisei;
                                scene.boss.icon = 8;
                                
                                scene.actors.push(event.axe, event.suisei);

                                event.next = true;
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.axe.isGrounded) {
                            // scene.warning = false;
                            flare.playerControl = true;
                        }

                        if (event.suisei.isGrounded && scene.warning) {
                            scene.warning = false;
                            game.playBGM('axe_dungeon_tatakae');
                        }
                        
                        if (!event.suisei.health) {
                            game.stopBGM();
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;
                            scene.boss = null;

                            flare.playerControl = false;
                            event.suisei.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Comet));
                            scene.actors = scene.actors.filter(a => !(a instanceof Axe));
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 120) scene.suiseiBossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.actors = scene.actors.filter(a => !(a instanceof Suisei));

                            for (let y = 0; y < 3; y++) {
                                delete scene.foreground[`121_${55 + y}`];
                                delete scene.foreground[`138_${55 + y}`];
                            }
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;
                            
                            game.playBGM('polkata_fugue');

                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            flare.playerControl = true;
                            event.end = true;
                        }
                    }
                ]
            }
        ],
        "6_3": [
            {
                condition: game => !game.scene.polkaBossCleared,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (flare.pos.x < (7.5 * 20 - 2) * 16) {
                            if (!event.polka) {
                                event.polka = new Polka(new Vector2((6 * 20 + 15) * 16, 44 * 16), 48);
                                event.polka.setAnimation('idle');
                                scene.actors.push(event.polka, ...event.polka.cards);
                            }
                            event.collisions = [
                                { pos: { x: (6.5 * 20) * 16, y: (3 * 12 + 1) * 16 }, size: { x: 16, y: 3 * 16 }},
                                { pos: { x: (7.5 * 20 - 1) * 16, y: (3 * 12 + 1) * 16 }, size: { x: 16, y: 3 * 16 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);
                            game.scene.shakeBuffer = 4;
                            game.playSound('rumble');
                            for (let y = 0; y < 3; y++) {
                                scene.foreground[`130_${37 + y}`] = "29";
                                scene.foreground[`149_${37 + y}`] = "29";
                            }
                            scene.lockedViewPos = new Vector2(20 * 6.5 * 16, 0);

                            game.stopBGM(true);
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (!event.timelineFrame) {
                            scene.warning = true;
                            scene.boss = event.polka;
                            scene.boss.icon = 9;
                            flare.playerControl = false;
                            game.cpuKeys = new Object;
                        }

                        game.cpuKeys.left = flare.pos.x > (7.5 * 20 - 6.5) * 16 ? true : undefined;

                        if (event.timelineFrame === 90) {
                            game.cpuKeys = new Object;
                            flare.playerControl = true;
                            scene.warning = false;
                            
                            game.playBGM('polkata_fugue_tatakae');

                            event.polka.phase = 'charge';
                            event.polka.setAnimation('charge');
                            game.playSound('charge');
                        }

                        if (!event.polka.health) {
                            game.stopBGM();
                            game.playSound('level_start');
                            scene.bossKillEffect = 60;
                            scene.isFocus = 0;
                            scene.boss = null;

                            flare.playerControl = false;
                            event.polka.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            scene.actors = scene.actors.filter(a => !(a instanceof Card));
                            game.cpuKeys = new Object;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame === 120) scene.polkaBossCleared = true;

                        if (event.timelineFrame === 180) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.actors = scene.actors.filter(a => !(a instanceof Polka));

                            for (let y = 0; y < 3; y++) {
                                delete scene.foreground[`130_${37 + y}`];
                                delete scene.foreground[`149_${37 + y}`];
                            }
                            game.playSound('rumble');
                            scene.shakeBuffer = 4;
                            scene.lockedViewPos = null;

                            game.playBGM('polkata_fugue');

                            const flare = scene.actors.find(actor => actor instanceof Flare);
                            flare.playerControl = true;
                            event.end = true;
                        }
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "3_3": [
            {
                condition: game => !game.scene.travelRoom,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        if (!event.timelineFrame) {
                            scene.travelEvent = true;
                            game.stopBGM(true);
                            flare.playerControl = false;
                            game.cpuKeys = new Object;
                            
                            event.enemies = [
                                [new Nousakumo({x:80, y:45})],
                                [new Nousakumo({x:80, y:45}), new Nousakumo({x:83, y:45})],
                                [new Nousakumo({x:83, y:45}), new Nousakumo({x:80, y:45}), new Nousabot({x:77, y:42})],
                                [new Nousakumo({x:73, y:45}), new Nousakumo({x:80, y:45}), new Nousabot({x:77, y:42}), new Pirate({x:77, y:46})],
                                [new Pirate({x:80, y:46}), new Nousabot({x:83, y:42}), new Nousabot({x:77, y:42}), new Nousakumo({x:73, y:45}), new Nousakumo({x:80, y:45})],
                                [new Pirate({x:80, y:46}), new Nousabot({x:83, y:42}), new Nousabot({x:77, y:42}), new Nousakumo({x:81, y:45}), new Nousakumo({x:79, y:45})],
                                [new Nousabot({x:83, y:42}), new Nousabot({x:77, y:42}), new Nousakumo({x:81, y:45}), new Nousakumo({x:79, y:45}),
                                    new Nousabot({x:73, y:41}), new Nousabot({x:71, y:41}), new Nousakumo({x:71, y:45}), new Nousakumo({x:73, y:45})]
                            ];
                        }

                        if (flare.pos.x <= 100 * 16) {
                            game.cpuKeys = new Object;
                            flare.playerControl = true;
                            game.playBGM('bridging_the_gap');
                            event.collisions = [
                                { pos: { x: 69 * 16, y: (3 * 12) * 16 }, size: { x: 16, y: 12 * 16 }},
                                { pos: { x: 110 * 16, y: (3 * 12) * 16 }, size: { x: 16, y: 12 * 16 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);
                            event.travelCount = 0;
                            event.travelDir = true;
                            event.enemies[event.travelCount].forEach(e => scene.actors.push(e));
                            event.next = true;
                        } else game.cpuKeys.left = true;
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.travelCount === event.enemies.length - 1 && !scene.actors.find(a => event.enemies[event.travelCount].includes(a))) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.travelEvent = false;
                            scene.travelRoom = true;
                            event.end = true;
                        }

                        game.scene.particles.smoke_pink(scene.view.pos.plus(new Vector2(Math.floor(Math.random() * game.width), 12 * 16)), new Vector2(Math.random() - .5, -Math.random()), 0);

                        if (event.timelineFrame % 2) game.scene.particles.shine_vel_white(scene.view.pos.plus(new Vector2(Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height))),
                            new Vector2(8 * (event.travelDir ? 1 : -1), Math.random() * 2 - 1), 0);

                        if (flare.pos.x > 100 * 16) {
                            scene.actors.forEach(actor => {
                                if (!(actor instanceof Checkpoint)) {
                                    if (actor.pos.x < 90 * 16) actor.pos.x += 20 * 16;
                                    else actor.pos.x -= 20 * 16;
                                }
                            });
                            scene.particles.pool.forEach(p => p.pos.x -= 20 * 16);
                            if (game.noelMode) flare.lastPoses.forEach(p => p.pos.x -= 20 * 16);
                            scene.setViewPos();

                            if (!event.travelDir && !scene.actors.find(a => event.enemies[event.travelCount].includes(a))) {
                                event.travelCount++;
                                event.travelDir = Math.random() > .5;
                                if (event.travelCount < event.enemies.length) event.enemies[event.travelCount].forEach(e => {
                                    e.pos.x += 20 * 16;
                                    scene.actors.push(e)
                                });
                            }
                        }

                        if (flare.pos.x < 80 * 16) {
                            scene.actors.forEach(actor => {
                                if (!(actor instanceof Checkpoint)) {
                                    if (actor.pos.x < 90 * 16) actor.pos.x += 20 * 16;
                                    else actor.pos.x -= 20 * 16;
                                }
                            });
                            scene.particles.pool.forEach(p => p.pos.x += 20 * 16);
                            if (game.noelMode) flare.lastPoses.forEach(p => p.pos.x += 20 * 16);
                            scene.setViewPos();
                            
                            if (event.travelDir && !scene.actors.find(a => event.enemies[event.travelCount].includes(a))) {
                                event.travelCount++;
                                event.travelDir = Math.random() > .5;
                                if (event.travelCount < event.enemies.length) event.enemies[event.travelCount].forEach(e => scene.actors.push(e));
                            }
                        }
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "1_3": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        if (game.scene.bossKillEffect) return;
                        game.scene.customDraw.push(game => {
                            game.ctx0.save();
                            game.ctx0.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            game.ctx0.drawImage(game.assets.images['sp_throne'], 37 * 16, 36 * 16);
                            game.ctx0.restore();
                        });
                    }
                ]
            },
            {
                condition: game => !game.scene.mikoBossCleared,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (!event.timelineFrame) {
                            game.stopBGM(true);
                            event.miko = new EvilMiko(new Vector2(39.5 * 16, 43 * 16), 64);
                            // event.miko = new EvilMiko(new Vector2(39.5 * 16, 43 * 16), 1);
                            event.miko.setAnimation('sit');
                            event.miko.phase = 'sit';
                            scene.actors.push(event.miko);

                            flare.playerControl = false;
                            game.cpuKeys = new Object;
                        }
                        
                        game.cpuKeys.left = flare.pos.x > 44 * 16 ? true : undefined;

                        if (flare.pos.x <= 44 * 16) {
                            game.cpuKeys.left = undefined;

                            event.collisions = [
                                { pos: { x: 19 * 16, y: 36 * 16 }, size: { x: 16, y: 12 * 16 }},
                                { pos: { x: 60 * 16, y: 36 * 16 }, size: { x: 16, y: 12 * 16 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        scene.lockedViewPos = new Vector2(
                            Math.max(20 * 16, Math.min(40 * 16, Math.round((flare.pos.x + flare.size.x / 2 + event.miko.pos.x + event.miko.size.x / 2) / 2) - game.width / 2)),
                            3 * 12 * 16);

                        if (event.timelineFrame === 60) {
                            scene.warning = true;
                            scene.boss = event.miko;
                            scene.boss.icon = 3;
                            
                            event.miko.setAnimation('evil');
                            event.miko.phaseBuffer = 0;
                            event.miko.phase = 'wait';
                        }

                        if (event.timelineFrame === 180) {
                            event.miko.dragonBreath = 60;
                            game.playBGM('elite_devil');
                        }

                        if (event.timelineFrame === 240) {
                            
                            event.miko.phaseBuffer = 0;
                            event.miko.phase = 'idle';

                            game.cpuKeys = new Object;
                            flare.playerControl = true;

                            scene.warning = false;
                        }

                        if (!event.miko.health) {
                            game.stopBGM();
                            game.playSound('level_start');
                            scene.bossKillEffect = 120;
                            scene.isFocus = 0;
                            scene.boss = null;

                            flare.playerControl = false;
                            game.cpuKeys = new Object;
                            event.miko.phase = 'defeated';
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            scene.actors = scene.actors.filter(a => !(a instanceof Block));
                            event.next = true;
                            
                            const time = new Date().getTime() - game.timer.getTime();
                            if (time <= 300000) {
                                localStorage.setItem('nuinui-save-achievement-20', true);
                                game.updateAchievements();
                            }
                            const timerScore = Math.max(0, 300000 - time);
                            game.score += timerScore;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 120) {
                            scene.mikoBossCleared = true;
                            if (flare instanceof Noel) scene.lockedViewPos = null;
                        }

                        if (event.timelineFrame === 180) {
                            scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));
                            scene.actors = scene.actors.filter(a => !(a instanceof EvilMiko));

                            if (flare instanceof Noel) {
                                flare.playerControl = true;
                                event.end = true;
                            } else {
                                event.next = true;
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (event.timelineFrame > 60) {
                            scene.enableHUD = false;
                            scene.lockedViewPos = new Vector2(30 * 16, 36 * 16);
                            game.cpuKeys.left = flare.pos.x > 40 * 16 ? true : undefined;
                            game.cpuKeys.right = flare.pos.x < 39 * 16 ? true : undefined;
    
                            if (flare.pos.x < 40 * 16 && flare.pos.x > 39 * 16 && !game.cpuKeys.left && !game.cpuKeys.right) {
                                game.cpuKeys.jump = flare.isGrounded;
    
                                if (flare.vel.y > 0 && flare.pos.y > 43 * 16) {
                                    flare.gravity = 0;
                                    flare.vel.y = 0;
                                    flare.setAnimation('sit');
                                    flare.animationLocked = true;
                                    event.next = true;
                                }
                            }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 120) game.playSound('peko');
                        if (event.timelineFrame === 60) {
                            flare.isEvil = true;
                            game.playSound('rumble');
                            
                            localStorage.setItem('nuinui-save-achievement-18', true);
                            game.updateAchievements();
                        } else if (event.timelineFrame > 60) {
                            game.scene.customDraw.push(game => {
                                game.ctx3.save();
                                game.ctx3.drawImage(game.assets.images['ui_bad_end'], 0, 0);
                                game.ctx3.restore();
                            });
                        }
                    }
                ]
            }
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "1_2": [
            {
                condition: game => true,
                isPersistent: false,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        flare.playerControl = false;

                        if (!event.timelineFrame) {
                            // --DEBUG
                            // flare.pos = new Vector2(25.5, 19).times(16);
                            // event.end = true;
                            // --DEBUG

                            event.flare = new EvilFlare(new Vector2(33 * 16, 32 * 16), 64);
                            // event.flare = new EvilFlare(new Vector2(33 * 16, 32 * 16), 1);
                            event.flare.setAnimation('back');
                            event.flare.phase = 'back';
                            scene.actors.push(event.flare);
                        }

                        if (!flare.vel.x && !event.collisions) {
                            event.collisions = [
                                { pos: { x: 22 * 16, y: 33 * 16 }, size: { x: 16, y: 16 }}
                            ];
                            scene.currentSection.collisions.push(...event.collisions);
                            game.scene.shakeBuffer = 4;
                            game.playSound('rumble');
                            for (let x = 0; x < 3; x++) scene.foreground[`${20 + x}_33`] = x === 2 ? "5" : "4";
                            for (let x = 0; x < 3; x++) scene.foreground[`${20 + x}_23`] = x === 2 ? "5" : "4";
                            for (let x = 0; x < 3; x++) scene.foreground[`${37 + x}_23`] = x === 0 ? "3" : "4";
                            scene.background[`23_23`] = "2";
                            scene.background[`24_23`] = "16";
                            scene.background[`25_23`] = "16";
                            scene.background[`26_23`] = "2";
                            scene.background[`27_23`] = "1";
                            scene.background[`28_23`] = "2";
                            scene.background[`29_23`] = "16";
                            scene.background[`30_23`] = "16";
                            scene.background[`31_23`] = "2";
                            scene.background[`32_23`] = "1";
                            scene.background[`33_23`] = "2";
                            scene.background[`34_23`] = "16";
                            scene.background[`35_23`] = "16";
                            scene.background[`36_23`] = "2";

                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        switch (event.timelineFrame) {
                            case 60:
                                scene.towerScroll = 2;
                                game.scene.shakeBuffer = 4;
                                game.playSound('rumble');
                                break;
                            case 90:
                                event.flare.dir = false;
                                event.flare.setAnimation('idle');
                                break;
                            case 120:
                                event.flare.setAnimation('chant');
                                scene.boss = event.flare;
                                scene.boss.icon = 0;
                                game.playBGM('serious_&_go');
                                break;
                            default:
                                break;
                        }

                        if (scene.boss === event.flare && event.flare.health === event.flare.healthBar) {
                            event.flare.phaseBuffer = 0;
                            event.flare.lastPhase = 'back';
                            event.flare.setAnimation('idle');
                            event.flare.phase = 'idle';

                            flare.playerControl = true;

                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (scene.towerScroll === 2 && event.flare.health <= event.flare.maxHealth * .5) {
                            scene.towerScroll = 1;
                            game.scene.shakeBuffer = 4;
                            game.playSound('rumble');
                        }

                        if (!event.flare.health && scene.boss) {
                            game.stopBGM();
                            game.playSound('level_start');
                            scene.bossKillEffect = 120;
                            scene.isFocus = 0;
                            scene.boss = null;

                            flare.playerControl = false;
                            scene.actors = scene.actors.filter(a => !(a instanceof IceShield));
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            scene.actors = scene.actors.filter(a => !(a instanceof Heart));
                        }

                        if (!scene.boss && !scene.bossKillEffect) {
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame === 120) {
                            event.flare.setAnimation('back');
                            flare.animationLocked = true;
                            flare.setAnimation('back');
                        }

                        if (event.timelineFrame === 180) {
                            scene.towerScroll = .5;
                            game.scene.shakeBuffer = 4;
                            game.playSound('rumble');
                            event.choice = false;
                        }

                        if (event.timelineFrame > 300) {
                        //     const keyPress = game.keys.left !== game.keys.right;
                        //     if (!event.keyBuffer && keyPress) {
                        //         game.playSound('wakeup');
                        //         event.choice = !event.choice;
                        //         event.keyBuffer = true;
                        //     }
                        //     if (event.keyBuffer && !keyPress) event.keyBuffer = false;

                        //     scene.customDraw.push(game => {
                        //         const cx = game.ctx3;
                        //         cx.save();
                        //         cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                        //         [flare, event.flare].forEach((actor, i) => {
                        //             cx.filter = `brightness(${!(i % 2) === event.choice ? 1 : .25})`;
                        //             cx.drawImage(game.assets.images['ui_arrow_down'], 0, 0, 8, 8, Math.round(actor.pos.x + actor.size.x * .5 - 4), Math.round(actor.pos.y - 16 + 4 * Math.sin(event.timelineFrame * 4 * (Math.PI / 180))), 8, 8);
                        //         })
                        //         cx.restore();
                        //     });

                        //     if (game.keys.jump) {
                        //         game.playSound('select');
                                event.next = true;
                        //     }
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (event.timelineFrame < 90) {
                            scene.customDraw.push(game => {
                                const progress = Math.min(1, event.timelineFrame / 60);
                                const cx = game.ctx3;
                                cx.save();
                                cx.fillStyle = '#000';
                                cx.fillRect(0, game.height, game.width, -game.height * progress);
                                cx.restore();
                            });
                            if (event.timelineFrame === 89) {
                                scene.actors = scene.actors.filter(a => a !== flare);
                                const newFlare = new (event.choice ? Noel : Flare)(new Vector2(25.5, 20).times(16), new Vector2(16, 32));
                                const helper = new ShirakenHelper(new Vector2(33.5, 20).times(16), event.choice ? 'flare' : 'noel', false);
                                helper.isPersistent = true;
                                scene.actors.push(newFlare, helper);
                                scene.view.target = newFlare;
                                for (let x = 0; x < 3; x++) delete scene.foreground[`${37 + x}_23`];
                                for (let x = 0; x < 3; x++) delete scene.foreground[`${20 + x}_23`];
                                scene.towerScroll = 0;
                                event.end = true;
                            }
                        }
                    }
                ]
            },
        ],

        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------


        "1_1": [
            {
                condition: game => true,
                isPersistent: true,
                timeline: [
                    (game, event) => {
                        const scene = game.scene;
                        if (!(event.timelineFrame % 4)) scene.particles.shine_vel_white(scene.view.pos.plus(new Vector2(Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height))),
                            new Vector2(Math.random() * 4, 4), 0);
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        if (!flare) return;
                        if (flare.pos.y >= 22 * 16) {
                            flare.pos = new Vector2(flare.pos.x < 30 * 16 ? 23 : 36, 19).times(16);
                            flare.takeHit(game, flare);
                            flare.vel.x = 0;
                        }
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

                        if (!event.timelineFrame) {
                            scene.skyTransistion = .75;
                            flare.setAnimation('back');
                            flare.animationLocked = true;
                        }

                        if (event.timelineFrame < 90) {
                            scene.customDraw.push(game => {
                                const progress = Math.max(0, (event.timelineFrame - 30) / 60);
                                const cx = game.ctx3;
                                cx.save();
                                cx.fillStyle = '#000';
                                cx.fillRect(0, 0, game.width, game.height * (1 - progress));
                                cx.restore();
                            });
                            if (event.timelineFrame === 89) {
                                event.next = true;
                            }
                        }
                        
                        game.scene.customDraw.push(game => {
                            const cx = game.ctx0;
                            cx.save();
                            cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                            // cx.drawImage(game.assets.images['bg_sword'], 24 * 16, 16 * 5);
                            // cx.drawImage(game.assets.images['tmp'], 23 * 16, 18 * 16);
                            cx.restore();
                        });
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);

                        if (!event.timelineFrame) {
                            event.demon = new Demon(new Vector2(28 * 16, 24 * 16), 512);
                            // event.demon = new Demon(new Vector2(28 * 16, 24 * 16), 64);
                            event.demon.phase = 'intro';
                            scene.actors.unshift(event.demon);
                            game.playBGM('unlimited');
                        }

                        if (!scene.boss && event.demon.phase !== 'intro') {
                            flare.animationLocked = false;
                            flare.playerControl = true;
                            scene.boss = event.demon;
                            scene.boss.icon = 1;
                            const noel = scene.actors.find(actor => actor instanceof ShirakenHelper);
                            noel.chargeEnabled = true;
                            noel.demon = event.demon;
                        }

                        if (scene.boss && event.demon.phase === 'end') {
                            scene.boss.targetPos.y -= 128;
                            game.stopBGM();
                            game.playSound('level_start');
                            scene.bossKillEffect = 120;
                            scene.isFocus = 0;
                            scene.boss = null;

                            flare.playerControl = false;
                            scene.actors = scene.actors.filter(a => !(a instanceof Bullet));
                            scene.enableHUD = false;
                            event.next = true;
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;
                        const flare = scene.actors.find(actor => actor instanceof Flare);
                        
                        if (scene.lockedViewPos && event.viewTarget) scene.lockedViewPos = scene.lockedViewPos.lerp(event.viewTarget, .1);

                        if (event.yAxe && event.yAxe < 10 * 16 && event.demon.phase !== 'death') {
                            game.playSound('death');
                            scene.bossKillEffect = 120;
                            event.nextBuffer = 60;
                            event.demon.phase = 'death';
                        }

                        if (event.nextBuffer) {
                            scene.bossKillEffect = 2;
                            event.nextBuffer--;
                            if (!event.nextBuffer) event.next = true;
                        }

                        if (!event.timelineFrame) scene.lockedViewPos = scene.view.pos;

                        if (event.timelineFrame < 6 * 60) {
                            event.viewTarget = CollisionBox.center(event.demon).plus(new Vector2(-game.width * .5, -game.height * .5));
                        } else if (event.timelineFrame < 10 * 60) {
                            event.viewTarget = new Vector2(20 * 16, 12 * 16);
                            flare.pos.x = 25.5 * 16;
                            flare.dir = true;
                        } else {
                            event.viewTarget = CollisionBox.center(event.demon).plus(new Vector2(-game.width * .5, -game.height * .5));
                        }

                        if (event.timelineFrame > 3 * 60) {
                            game.scene.customDraw.push(game => {
                                const cx = game.ctx2;
                                cx.save();
                                cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                                cx.translate(26.5 * 16, 19 * 16);
                                cx.drawImage(game.assets.images['sp_polka_release'], 0, 0, 48, 48, Math.floor(event.timelineFrame * .25) % 2, 0, 48, 48);
                                cx.translate(2 * 16, 0);
                                cx.save();
                                cx.translate(24, 24 - 24);
                                cx.rotate(event.timelineFrame * 100 * (Math.PI / 180));
                                cx.drawImage(game.assets.images['sp_axe'], 0, 0, 64, 64, -32, -32, 64, 64);
                                cx.restore();
                                cx.drawImage(game.assets.images['sp_suisei_axe'], (Math.floor(event.timelineFrame * .5) % 2) * 48, 0, 48, 48, 0, 0, 48, 48);
                                cx.translate(2 * 16 + 48, 0);
                                cx.scale(-1, 1);
                                cx.drawImage(game.assets.images['sp_miko_release'], 0, 0, 48, 48, Math.floor(event.timelineFrame * .25) % 2, 0, 48, 48);
                                cx.restore();
                            });
                        }

                        if (event.timelineFrame === 3 * 60) event.demon.hands.forEach(hand => hand.targetPos.x += 32 * (hand.dir ? 1 : -1));
                        else if (event.timelineFrame > 10 * 60) {
                            if (!event.yAxe) event.yAxe = Math.round(scene.lockedViewPos.y + game.height);
                            else event.yAxe -= 8;
                            game.scene.customDraw.push(game => {
                                const cx = game.ctx0;
                                cx.save();
                                cx.translate(-game.scene.view.pos.x, -game.scene.view.pos.y);
                                for (let i = 0; i < 3; i++) {
                                    cx.save();
                                    cx.translate(30 * 16, event.yAxe + 32 * i);
                                    cx.globalAlpha = 1 - i / 3;
                                    cx.rotate(event.timelineFrame * 100 * (Math.PI / 180));
                                    cx.drawImage(game.assets.images['sp_axe'], 0, 0, 64, 64, -32, -32, 64, 64);
                                    cx.restore();
                                }
                                cx.restore();
                            });
                        } else if (event.timelineFrame > 3 * 60) {
                            if (!(event.timelineFrame % 4)) scene.particles.charge(event.demon.pos.plus(new Vector2(event.demon.size.x * .5, 64)));
                            for (let i = 0; i < 2; i++) scene.particles.smoke_black(event.demon.pos.plus(new Vector2(event.demon.size.x * .5, 64)), new Vector2(Math.random() * 16 - 8, -2), 1);
                            if (!(event.timelineFrame % 60)) game.playSound('charge2');
                        }
                    },
                    (game, event) => {
                        const scene = game.scene;

                        if (event.timelineFrame < 6 * 60) scene.bossKillEffect = 2;
                        else {
                            if (scene.lockedViewPos) scene.lockedViewPos = null;
                            game.scene.customDraw.push(game => {
                                const cx = game.ctx0;
                                cx.save();
                                cx.drawImage(game.assets.images['bg_intro1'], 0, 0, game.width, game.height, 0, 0, game.width, game.height);
                                cx.drawImage(game.assets.images['tmp'], 0, 0, game.width, game.height, 0, 0, game.width, game.height);
                                cx.restore();
                            });
                        }
                        game.scene.customDraw.push(game => {
                            const cx = game.ctx3;
                            cx.save();
                            if (event.timelineFrame < 180) cx.globalAlpha = event.timelineFrame / 180;
                            if (event.timelineFrame > 6 * 60) cx.globalAlpha = Math.max(0, 1 - (event.timelineFrame - (6 * 60)) / 120);
                            cx.fillStyle = '#FFF';
                            cx.fillRect(0, 0, game.width, game.height);
                            cx.restore();
                        });

                        if (event.timelineFrame === 8 * 60) game.playSound('stage_clear');

                        if (event.timelineFrame === 180) {
                            scene.actors = [];
                            game.finished = true;
                            localStorage.setItem('nuinui-save-achievement-19', true);
                            game.updateAchievements();
                        }

                        if (game.finished) {
                            game.scene.customDraw.push(game => {
                                game.ctx0.save();
                                game.ctx0.drawImage(game.assets.images['ui_end'], 0, 0);
                                game.ctx0.restore();
                            });
                        }
                    }
                ]
            }
        ]
    }
}