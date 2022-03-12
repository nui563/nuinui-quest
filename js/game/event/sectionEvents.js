const FOREST_EVENTS = {
    "0_0": [
        {
            condition: game => game.scene.frameCount === 0,
            timeline: [
                // Wait for player input
                (game, event) => {
                    const scene = game.scene;
            
                    if (event.frameCount === 0) {
                        event.flare = new Flare(new Vector2(160, 48), new Vector2(16, 32));
                        event.flare.setAnimation('sleep');
                        event.flare.animationLocked = true;
            
                        scene.view.target = event.flare;
            
                        event.elfriends = [
                            new Elfriend(new Vector2(96, 48), true),
                            new Elfriend(new Vector2(128, 24), true),
                            new Elfriend(new Vector2(224, 32), false)
                        ];
            
                        scene.actors.push(
                            event.flare,
                            ...event.elfriends
                        );
                    }
            
                    if (game.keys.jump) event.next = true;
            
                    scene.customDraw.push(game => {
                        game.ctx0.drawImage(game.assets.images['ui_title_screen'], 24, 8);
                        game.ctx3.drawImage(game.assets.images['ui_start_label'], 0, 0, 96, 16, 192, 166, 96, 16);
                    });
                },
                (game, event) => {
                    const scene = game.scene;
            
                    switch (event.timelineFrame) {
                        case 0:
                            event.flare.setAnimation('wakeup');
                            game.playSound('wakeup');
                            break;
                        case 39:
                            event.flare.setAnimation('idle');
                            break;
                        case 89:
                            event.flare.dir = false;
                            break;
                        case 129:
                            event.flare.dir = true;
                            break;
                        case 394:
                            game.cpuKeys = new Object;
                            break;
                        case 400:
                            scene.actors = scene.actors.filter(actor => !event.elfriends.includes(actor));
                            break;
                        case 660:
                            event.flare.setAnimation('idle');
                            // event.flare.animationLocked = false;
                            event.flare.playerControl = true;
                            event.flare.animationLocked = false;
                            event.end = true;
            
                            // const a = new Audio('./sound/terminal.mp3');
                            // a.volume = .25;
                            // a.play();
                            break;
                            
                        default:
                            break;
                    }
            
                    if (event.timelineFrame > 159 && event.timelineFrame < 339) {
                        if (event.timelineFrame === 160) game.playSound('question');
                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['sp_speech_bubble'], 32 * (Math.floor(event.frameCount / 16) % 2), 0, 32, 24, 164, 20, 32, 24);
                            game.ctx3.drawImage(game.assets.images['sp_kintsuba'], 167, 23);
                        });
                    }
            
                    if (event.timelineFrame > 339 && event.timelineFrame < 394) {
                        if (event.timelineFrame === 340) event.flare.animationLocked = false;
                        game.cpuKeys.right = true;
                    }
            
                    if (event.timelineFrame > 480 && event.timelineFrame < 660) {
                        if (event.timelineFrame === 481) {
                            game.playSound('level_start');
                            event.flare.setAnimation('look');
                            event.flare.animationLocked = true;
                        }
                        scene.customDraw.push(game => {
                            game.ctx3.drawImage(game.assets.images['ui_forest_label'], game.width / 2 - 56, 32);
                        });
                    }
                }
            ]
        }
    ],
    "4_0": [
        {
            condition: game => {
                const flare = game.scene.actors.find(actor => actor instanceof Flare);
                return flare && flare.hasBow && !game.scene.miniBossStarted && !game.scene.miniBossCleared;
            },
            timeline: [
                (game, event) => {
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

                        scene.currentSection.collisions.push(...event.collisions);

                        flare.playerControl = false;
                    }

                    if (event.boss.phase === 'intro') {
                        scene.shakeBuffer = 2;
                        if (!(event.timelineFrame % 32)) game.playSound('rumble');
                    }

                    if (event.boss.phase === 'idle') {
                        flare.playerControl = true;
                    }
                    
                    if (event.boss.health <= 0) {
                        event.boss.laserTarget = null;
                        event.boss.middleVel = new Vector2(0, 0);
                        event.next = true;
                    }
                    
                    // scene.customDraw.push(game => {
                    //     game.ctx1.fillStyle = '#00f4';
                    //     event.collisions.forEach(({pos, size}) => {
                    //         game.ctx1.fillRect(pos.x % game.width, pos.y, size.x, size.y);
                    //     });
                    // });
                },
                (game, event) => {
                    const scene = game.scene;

                    const flare = scene.actors.find(actor => actor instanceof Flare);

                    scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => !event.collisions.includes(collision));

                    if (event.timelineFrame === 0) {
                        flare.playerControl = false;

                        scene.miniBossCleared = true;
                        event.boss.phase = 'death';
                    }
                    
                    if (event.timelineFrame === 180) {
                        
                        for (let i = 0; i < event.boss.size.x / 16; i++) {
                            scene.particles.explosion(event.boss.pos.plus(new Vector2(i * 16, event.boss.size.y)));
                        }

                        scene.actors = scene.actors.filter(actor => actor !== event.boss);

                        console.log(scene.currentSection.collisions);
                        
                        scene.currentSection.collisions = scene.currentSection.collisions.filter(collision => collision.pos.y > 96 || collision.pos.x < 1312 || collision.pos.x > 1536);
                        flare.playerControl = true;
                        event.end = true;
                    }
                }
            ]
        }
    ],
    "5_0": [
        {
            condition: game => {
                const flare = game.scene.actors.find(actor => actor instanceof Flare);
                return flare && !flare.hasBow;
            },
            timeline: [
                (game, event) => {
                    game.scene.actors.push(new BowPickup(new Vector2(116 * 16 - 2, 62), new Vector2(20, 20)));
                    event.end = true;
                }
            ]
        }
    ]
}