import {FROG_ANIMATIONS, FROG_SHEET, ITEM_ZAUBERTRANK, PERSON_ANIMATIONS} from "../utils/constants";
import {store} from "../../redux/store";
import {flagMircoVerwandelt, flagSelbstzerstoerungEingeleitet} from "../../redux/actions";
import {PFLANZE_3, PFLANZE_4} from "./pflanzen";

let zaubertrankDisplayTrigger = () => 1;

const mircoMixin = {
    collisionMask: 0,
    sheet: FROG_SHEET,
    sprite: FROG_ANIMATIONS,
    direction: "right",
    _tag: "mirco",
    interact: (ui, flags, game) => ui.displayText("Helly, wir müssen das Passwort in den Computer eingeben. Hast du eine Idee was es sein könnte?",)
};

export const hellysZimmer = {
    mapName: "hellysZimmer",
    fileName: "hellys-zimmer.tmx",
    music: "kecleon_shop.mp3",
    additionalAssets: ["heavy_rain.mp3", "paradise.mp3"],
    loadingPoints: {
        default: [16, 8, "left", true],
    },
    switchPoints: [
        [16, 8, "hallway"],
    ],
    items: [
        {
            no: ITEM_ZAUBERTRANK,
            x: 15,
            y: 3,
            _tag: "zaubertrank",
            interact: (ui, callback) => ui.displayText("Das muss dem Mann aus der Tasche gefallen sein...", callback),
            getDisplayTrigger: (doDisplay) => zaubertrankDisplayTrigger = doDisplay
        }
    ],
    storyParts: [
        {
            display: flags => flags.froschAusTeichBefreit && !flags.selbstzerstoerungEingeleitet,
            persons: [
                {
                    x: 10,
                    y: 4,
                    direction: "down",
                    _tag: "vincent",
                    sheet: "vincent",
                    collisionMask: 0,
                },
                {
                    x: 5,
                    y: 3,
                    ...mircoMixin
                },
            ],
            organise: function (game, ui, flags) {
                const vincent = game.filterPersons("_tag", "vincent")[0];
                const mirco = game.filterPersons("_tag", "mirco")[0];
                const player = game.getPlayer();

                game.getAudioHandler().forceSong("heavy_rain.mp3");
                player.setControl(false);

                vincent.go(["down"], () =>
                    ui.displayText([
                        "Du kommst zu spät, Helena.",
                        "Dein Verlobter ist ganz schön hartnäckig, weißt du das?",
                        "Selbst nachdem ich ihn in einen Frosch verwandelt habe, versucht er weiter mein Spiel zu sabotieren...",
                        "...",
                    ], () => {
                        vincent.teleport(9, 8, "right");
                        vincent.go(["right"], () =>
                            ui.displayText([
                                '"Helena Blache und die Suche nach dem verlorenen Mirco" sollte mein Meisterwerk werden.',
                                "Ein Spiel für die ganze Familie! Eine fantastische Reise voller Abenteuer und Rätselraten!",
                                "..."
                            ], () => {
                                vincent.teleport(15, 3, "down");
                                vincent.go(["down"], () =>
                                    ui.displayText([
                                        "Aber Mirco konnte es nicht lassen. Erst musste er aus seinem Gefängnis ausbrechen, und dann versuchte er das Spiel zu hacken...",
                                        "Alles nur damit eure unwichtige Hochzeit stattfinden kann!",
                                        "..."
                                    ], () => {
                                        zaubertrankDisplayTrigger();
                                        vincent.teleport(1, 8, "right");
                                        vincent.go("right", () =>
                                            ui.displayText([
                                                "Aber damit ist es jetzt vorbei.",
                                                "Es ist Zeit, dieses Spiel ein für alle Mal zu beenden.",
                                                "..."
                                            ], () => {
                                                vincent.teleport(10, 4, "up");
                                                ui.displayText([
                                                        "Selbstzerstörungssequenz eingeleitet...",
                                                        "Skripttermination wird initialisiert..."
                                                    ], () =>
                                                        mirco.go([
                                                                "right", "right", "right", "right", "right", "up",
                                                            ], () =>
                                                                ui.displayText([
                                                                        "IIIIIH!",
                                                                        "Weiche von mir, Frosch!"
                                                                    ], () =>
                                                                        vincent.go(["down"], () =>
                                                                            ui.displayText([
                                                                                "Auch das macht jetzt keinen Unterscheid mehr.",
                                                                                "Die Selbstzerstörungssequenz wurde eingeleitet.",
                                                                                "Jetzt gibt es kein Entkommen.",
                                                                                "Auf Nimmerwiedersehen!"
                                                                            ], () => {
                                                                                vincent.destroy();
                                                                                player.setControl(true);
                                                                                store.dispatch(flagSelbstzerstoerungEingeleitet());
                                                                            })
                                                                        )
                                                                )
                                                        )
                                                );
                                            })
                                        )
                                    })
                                )
                            })
                        )
                    })
                );
            }
        },
        {
            display: flags => flags.selbstzerstoerungEingeleitet && !flags.mircoVerwandelt,
            persons: [
                {
                    x: 10,
                    y: 2,
                    ...mircoMixin
                },
            ],
            organise: function (game, ui, flags) {
                zaubertrankDisplayTrigger();
            }
        },
        {
            display: flags => flags.froschAusTeichBefreit,
            invisibles: [
                {
                    // Computer
                    x: 10,
                    y: 3,
                    interact: (ui, flags, game) => {
                        const mirco = game.filterPersons("_tag", "mirco")[0];
                        const player = game.getPlayer();

                        if (flags.mircoVerwandelt) {
                            ui.displayText([
                                "Selbstzerstörung wird vorbereitet...",
                                "Bitte Passwort eingeben..."
                            ], () => {
                                const eingabe = (window.prompt("Bitte Passwort eingeben...") || "")
                                    .toLowerCase().replace(/\s+/g, "");
                                const passwort = atob('Z3L8bixyb3Qsd2Vp3yxibGF1LGdlbGI=');

                                if (eingabe === passwort) {
                                    player.setControl(false);
                                    ui.displayText([
                                            "Passwort korrekt!",
                                            "Mirco: Du hast es geschafft, Helly!"
                                        ], () => {
                                            game.getAudioHandler().forceSong("paradise.mp3");
                                            player.go(["down", "down", "down"], () => {
                                                mirco.go(["left"], () => {
                                                    player.p.direction = "up";
                                                    mirco.p.direction = "up";
                                                    ui.displayText([
                                                            "Mirco: So, jetzt muss ich mich nur eben reinhacken...",
                                                            "Es ist ein Unix-System!",
                                                            "AES-Verschlüsselung brechen...",
                                                            "Deep-Learning Blockchain minen...",
                                                            "Und...",
                                                            "Fertig!",
                                                            "Jetzt kann uns nichts mehr passieren!"
                                                        ], () =>
                                                            mirco.go(["down", "down"], () => ui.displayText([
                                                                "Helly, ich bin so froh dass wir es geschafft haben.",
                                                                "Die Hochzeit ist gerettet!"
                                                            ], () => game.switchMap("nurtext")))
                                                    );
                                                })
                                            })
                                        }
                                    )
                                } else {
                                    ui.displayText([
                                        "Falsches Passwort!",
                                        "Passworthinweis: Grünzeug"
                                    ])
                                }
                            })
                        } else if (game.hatItem(ITEM_ZAUBERTRANK)) {
                            player.setControl(false);

                            ui.displayText("Du schüttest den Zaubertrank auf den Frosch.", () => {
                                mirco.go(["right", "right", "down"], () => {
                                    mirco.set({
                                        sheet: "mirco",
                                        sprite: PERSON_ANIMATIONS
                                    });
                                    mirco.go(["down", "left"], () => {
                                        player.p.direction = "right";
                                        ui.displayText([
                                            "Mirco: Helly, du hast mich befreit!",
                                            "Ich wusste, das du clever genug sein würdest, um meine Rätsel zu lösen und mich zu finden!",
                                            "Man, ein Frosch zu sein ist garnicht cool.",
                                            "Man fühlt sich so... schleimig!",
                                            "Aber wie dem auch sei, wir haben nicht viel Zeit!",
                                            "Hm...",
                                            "Ich kann die Selbstzerstörung stoppen, indem ich mich mich in den Mainframe hacke und im RAM einen Overflow erzeuge...",
                                            "Aber dafür brauche ich das Passwort...",
                                            "Helly, wir müssen das Passwort in den Computer eingeben. Hast du eine Idee was es sein könnte?",
                                        ], () => {
                                            store.dispatch(flagMircoVerwandelt());
                                            player.setControl(true);
                                        })
                                    })
                                });
                            });
                        } else {
                            ui.displayText("Quack! Quack! Quack!");
                        }
                    }
                },
            ],
        },
        {
            display: flags => flags.mircoVerwandelt,
            persons: [
                {
                    x: 11,
                    y: 4,
                    sheet: "mirco",
                    interact: mircoMixin.interact,
                    _tag: mircoMixin._tag,
                    direction: "left"
                }
            ]
        },
        {
            display: flags => flags.mircoVerwandelt,
            invisibles: [
                {x: 2, y: 3, ...PFLANZE_3},
                {x: 1, y: 10, ...PFLANZE_4},
                {x: 1, y: 11, ...PFLANZE_4},
            ]
        }
    ],
};
