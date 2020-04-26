import {store} from "../../redux/store";
import {flagStartKaraffenRaetsel, setKaraffenRaetselOpen} from "../../redux/actions";
import {ITEM_WASSERKARAFFE} from "../utils/constants";
import {PFLANZE_2} from "./pflanzen";

const interactMitSpuele = (ui, flags) => {
    if (
        (flags.startedKaraffenRaetsel1 && !flags.finishedKaraffenRaetsel1) ||
        (flags.startedKaraffenRaetsel2 && !flags.finishedKaraffenRaetsel2)
    ) {
        store.dispatch(setKaraffenRaetselOpen(true));
    } else {
        ui.displayText(["Eine schöne, saubere Spüle."]);
    }
};

export const kueche = {
    mapName: "kueche",
    fileName: "kueche.tmx",
    music: "kecleon_shop.mp3",
    loadingPoints: {
        default: [11, 12, "up", true],
        wohnzimmer: [15, 6, "left", true],
        // Format: [x, y(, dir)(, isDoor)]
    },
    switchPoints: [
        [11, 12, "hallway"],
        [15, 6, "wohnzimmer"],
    ],
    reduxSubscription: (state, previousState, game) => {
        const ui = game.getUIHandler();

        if (state.flags.finishedKaraffenRaetsel1 && !previousState.flags.finishedKaraffenRaetsel1) {
            const player = game.getPlayer();
            const rebecca = game.filterPersons("_tag", "rebecca")[0];
            const path = player.p.x <= 60 ? ["left", "left", "up", "up", "up"] : ["left", "up", "up", "up"];

            player.setControl(false);
            rebecca.go(path, () =>
                ui.displayText("Rebecca: Wow Helly, du hast es geschafft!", () => player.go("down", () =>
                    ui.displayText([
                            "Das war eine große Hilfe.",
                            "Am besten bringst du die Karaffe direkt zum Buffet.",
                        ], () => game.itemFound(ITEM_WASSERKARAFFE, () => player.setControl(true))
                    )
                ))
            );
        } else if (state.flags.finishedKaraffenRaetsel2 && !previousState.flags.finishedKaraffenRaetsel2) {
            game.itemFound(ITEM_WASSERKARAFFE);
        }
    },
    items: [],
    storyParts: [
        {
            display: (flags) => !flags.froschIstNass,
            persons: [
                {
                    sheet: "rebecca",
                    x: 5,
                    y: 9,
                    direction: "up",
                    _tag: "rebecca",
                    interact: function (ui, flags, game) {
                        if (!flags.startedKaraffenRaetsel1) {
                            ui.displayText([
                                "Rebecca: Helly, kannst du mir mit den Getränken für das Buffet helfen?",
                                "Wir brauchen genau 11 Liter Wasser in einer Karaffe.",
                                "Etwas mehr, und das Wasser würde rausschwappen!",
                                "Etwas weniger, und alle wären durstig!",
                                "Das Problem ist, dass wir nur eine 15-Liter und eine 8-Liter Karaffe haben.",
                                "Kannst du bitte genau 11 Liter Wasser in die große Karaffe füllen?",
                                "Du findest die Karaffen drüben beim Wasserhahn.",
                            ], () => store.dispatch(flagStartKaraffenRaetsel()));

                        } else if (!flags.finishedKaraffenRaetsel1) {
                            ui.displayText([
                                "Kannst du mir mit den Getränken für helfen?",
                                "Wir brauchen genau 11 Liter Wasser in einer Karaffe.",
                                "Du findest die Karaffen drüben beim Wasserhahn.",
                            ]);
                        } else {
                            ui.displayText([
                                "Vielen Dank für deine Hilfe!"
                            ]);
                        }
                    }
                }
            ],
        },
        {
            display: true,
            invisibles: [
                {x: 3, y: 3, interact: interactMitSpuele},
                {x: 4, y: 3, interact: interactMitSpuele},
            ],
        },
        {
            display: flags => flags.mircoVerwandelt,
            invisibles: [
                {x: 1, y: 3, ...PFLANZE_2},
            ]
        }
    ],
};
