import {store} from "../../redux/store";
import {setCenterText} from "../../redux/actions";

export const nurtext = {
    mapName: "nurtext",
    music: "peace.mp3",
    loadAssetsOf: "moorrand",
    storyParts: [
        {
            display: flags => !flags.introBeendet,
            organise: (game, ui) => {
                store.dispatch(setCenterText(`Helena Blache \n\n und die Suche nach dem verlorenen Mirco`));

                ui.displayText([
                    "Willkommen in einer anderen Welt.",
                    "Auch hier steht die Hochzeit von Helena Blache und Mirco Heinzelmann kurz bevor.",
                    "Doch es gibt noch so viel zu erledigen, und dann verschwindet der künftige Ehemann auch noch mysteriös...",
                    "Kannst du die Rätsel lösen und die Hochzeit retten?",
                    "Viel Glück...",
                ], () => {
                    store.dispatch(setCenterText(""));
                    game.switchMap("moorrand");
                });
            }
        },
        {
            display: flags => flags.introBeendet,
            organise: (game, ui) => {
                store.dispatch(setCenterText("Das war... \n\n Helena Blache \n\n und die Suche nach dem verlorenen Mirco \n\n Ein Spiel von Vincent Rolfs \n\n Zur Hochzeit von Helena Blache und Mirco Heinzelmann am 25. April 2020 \n\n Vielen Dank für's Spielen!"));
            }
        },
    ],

};
