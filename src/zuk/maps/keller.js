import {FROG_ANIMATIONS, FROG_SHEET, IMAGEFILE_GLOW, ITEM_CASHFLOW, ITEM_WASSERKARAFFE} from "../utils/constants";
import {store} from "../../redux/store";
import {flagFroschNass} from "../../redux/actions";

export const keller = {
    mapName: "keller",
    fileName: "keller.tmx",
    music: "shadows.mp3",
    loadingPoints: {
        default: [20, 7, "left", false],
    },
    switchPoints: [
        [20, 7, "hallway"],
    ],
    items: [
        {no: ITEM_CASHFLOW, x: 1, y: 8}
    ],
    storyParts: [
        {
            display: (flags) => !flags.froschIstNass,
            persons: [
                {
                    x: 2,
                    y: 11,
                    sheet: FROG_SHEET,
                    sprite: FROG_ANIMATIONS,
                    direction: "right",
                    interact: function (ui, flags, game) {
                        const hatWasser = game.hatItem(ITEM_WASSERKARAFFE);

                        if (flags.froschIstNass) {
                            ui.displayText(["Quack!", "Quack?"]);
                        } else if (hatWasser) {
                            ui.displayText(["Der arme Frosch ist halb vertrocknet...", "Du schüttest das Wasser auf den Frosch."], () => {
                                game.itemUsed(ITEM_WASSERKARAFFE);
                                store.dispatch(flagFroschNass());
                                this.p.collisionMask = 0;
                                this.go(["right", "right"], () => ui.displayText("Es scheint ihm besser zu gehen!"));
                            });
                        } else {
                            ui.displayText(["Der arme Frosch ist halb vertrocknet..."]);
                        }
                    }
                }
            ]
        },
        {
            display: flags => flags.karaffeRiniGegeben,
            invisibles: [
                {
                    x: 4,
                    y: 11,
                    asset: IMAGEFILE_GLOW,
                    interact: ui => ui.displayText([
                        "Da liegt ein winziges Blatt mit einer Inschrift...",
                        '"a = 15, b = 4, c = 19, d = 8, e = 23, f = 12, g = 1"',
                        "Was das wohl bedeuten mag?"
                    ])
                }
            ]
        }
    ],
};
