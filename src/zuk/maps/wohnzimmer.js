import {ITEM_CASHFLOW} from "../utils/constants";
import {store} from "../../redux/store";
import {flagCashflowAbgegeben} from "../../redux/actions";
import {PFLANZE_5, PFLANZE_6} from "./pflanzen";

export const wohnzimmer = {
    mapName: "wohnzimmer",
    fileName: "wohnzimmer.tmx",
    music: "kecleon_shop.mp3",
    loadingPoints: {
        default: [0, 11, "right", true],
        kueche: [0, 5, "right", true],
        // Format: [x, y(, dir)(, isDoor)]
    },
    switchPoints: [
        [0, 11, "hallway"],
        [0, 5, "kueche"],
    ],
    items: [],
    storyParts: [
        {
            display: true,
            persons: [
                {
                    x: 8,
                    y: 12,
                    direction: "up",
                    sheet: "christian",
                    interact: function (ui, flags, game) {
                        const hatSpiel = game.hatItem(ITEM_CASHFLOW);
                        const code = '"25 6 10 23 19 16 23 13 5 14 8 23 13 1 10 15 3 23 2 25 14 23 5 2 5 13 14 23 5 19 16 6 15 25 25 7 17 10 14 7 3 2 8 23 10 4 24 3 13 23"';

                        if (flags.cashflowAbgegeben) {
                            ui.displayText([
                                "Sag Mal, hast du Mirco gesehen?",
                                "Ach, du willst du den Coupon nochmal sehen?",
                                "Auf dem Coupon steht " + code + ".",
                                "Keine Ahnung was das bedeutet."
                            ]);
                        } else if (hatSpiel) {
                            ui.displayText([
                                "Du hast das Cashflow-Spiel gefunden!",
                                "Super, dann ist der Abend ja gerettet.",
                                'Nanu, was ist das denn? Da ist ein Zettel mit irgendwelchen Zahlen drin.',
                                'Da steht ' + code + ".",
                                "Ist wahrscheinlich irgendein Coupon...",
                                "Sag Bescheid wenn du den Code brauchst."
                            ], () => {
                                store.dispatch(flagCashflowAbgegeben());
                            });
                        } else {
                            ui.displayText([
                                "Christian: Helly, wir wollten doch später mit allen Gästen eine Runde Cashflow spielen.",
                                "Die XXL-Version!",
                                "Ich kann das Spiel aber nicht finden.",
                                "Hast du es gesehen?",
                            ])
                        }
                    }
                }
            ]
        },
        {
            display: (flags) => flags.startedKaraffenRaetsel2,
            persons: [
                {
                    sheet: "rebecca",
                    x: 15,
                    y: 10,
                    direction: "left",
                    _tag: "rebecca",
                    interact: (ui, flags) => {
                        ui.displayText(flags.karaffeRiniGegeben ?
                            [
                                "Oh Helly, wo ist nur Mirco???",
                            ]
                            :
                            [
                                "So viel zu tun..."
                            ]
                        );
                    }
                }
            ]
        },
        {
            display: flags => flags.mircoVerwandelt,
            invisibles: [
                {x: 16, y: 3, ...PFLANZE_5},
                {x: 17, y: 12, ...PFLANZE_6},
                {x: 17, y: 13, ...PFLANZE_6},
            ]
        }
    ],
};
