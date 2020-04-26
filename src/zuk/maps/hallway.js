import {store} from "../../redux/store";
import {flagStartKaraffenRaetsel} from "../../redux/actions";
import {PFLANZE_1} from "./pflanzen";

export const hallway = {
    mapName: "hallway",
    fileName: "hallway.tmx",
    music: "kecleon_shop.mp3",
    loadingPoints: {
        default: [15, 15, "up", true],
        kueche: [15, 3, "down", true],
        wohnzimmer: [21, 6, "left", true],
        keller: [3, 13, "right", false],
        hellysZimmer: [0, 6, "right", true],
    },
    switchPoints: [
        [15, 15, "moorrand"],
        [15, 3, "kueche"],
        [21, 6, "wohnzimmer"],
        [3, 13, "keller"],
        [0, 6, "hellysZimmer"],
    ],
    items: [],
    storyParts: [
        {
            display: (flags) => flags.cashflowAbgegeben && !flags.startedKaraffenRaetsel2,
            persons: [
                {
                    sheet: "rebecca",
                    x: 15,
                    y: 10,
                    direction: "up",
                    _tag: "rebecca",
                    interact: (ui) => {
                        ui.displayText([
                            "Gehe doch bitte zur Spüle und fülle ein Fass mit genau 11 Litern!",
                            "Danach kannst du das Fass direkt zu Rini bringen.",
                            "Danke!"
                        ]);
                    }
                }
            ],
            organise: function (game, ui, flags) {
                const rebecca = game.filterPersons("_tag", "rebecca")[0];
                const player = game.getPlayer();
                let path = ["up", "up", "up", "up"];

                if (player.p.x <= 250) {
                    path = path.concat(["up"]);
                } else {
                    path = path.concat(["right", "right", "right", "right"])
                }

                player.setControl(false);

                ui.displayText(["Helly!"], () => rebecca.go(path, () => {
                    ui.displayText([
                        "Tut mir Leid dass ich so Stress mache.",
                        "Ich bin ein bisschen unter Zeitdruck, weil Mirco mir eigentlich helfen sollte...",
                        "Keine Ahnung wo er ist.",
                        "Auf jeden Fall wollte ich fragen, wo die Fass mit dem Wasser ist?",
                        "...",
                        "Du hast das Wasser benutzt um einen Frosch zu retten?",
                        "Oh...",
                        "Kannst du dann nochmal Wasser holen?",
                        "Leider ist das kleine Fass kaputt gegangen...",
                        "Aber ich habe noch zwei gigantische Fässer gefunden!",
                        "Gehe doch bitte zur Spüle und fülle ein Fass mit genau 11 Litern!",
                        "Danach kannst du das Fass direkt zu Rini bringen.",
                        "Danke!"
                    ], () => {
                        store.dispatch(flagStartKaraffenRaetsel());
                        player.setControl(true);
                    })
                }));

            }
        },
        {
            display: flags => flags.mircoVerwandelt,
            invisibles: [
                {x: 20, y: 13, ...PFLANZE_1},
                {x: 20, y: 14, ...PFLANZE_1},
            ]
        }
    ],
};
