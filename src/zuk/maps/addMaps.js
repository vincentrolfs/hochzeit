import {moorrand} from "./moorrand";
import {hallway} from "./hallway";
import {kueche} from "./kueche";
import {wohnzimmer} from "./wohnzimmer";
import {keller} from "./keller";
import {hellysZimmer} from "./hellys-zimmer";
import {nurtext} from "./nurtext";

export const addMaps = zuk => {
    zuk.addMap(moorrand);
    zuk.addMap(kueche);
    zuk.addMap(hallway);
    zuk.addMap(wohnzimmer);
    zuk.addMap(keller);
    zuk.addMap(hellysZimmer);
    zuk.addMap(nurtext);
};
