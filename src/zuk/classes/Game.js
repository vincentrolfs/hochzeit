import {
    AVAILABLE_PERSON_SHEETS,
    DEFAULT_MAP,
    FROG_ANIMATIONS,
    FROG_SHEET,
    IMAGEFILE_FROG,
    IMAGEFILE_PERSON_MARKER,
    ITEM_NAMES,
    LOAD_ON_STARTUP,
    MAIN_LEVEL,
    MAP_SWITCH_TIMEOUT,
    MARKER_SHEET,
    PERCENTAGE_PLACEHOLDER,
    PERSON_ANIMATIONS,
    PERSON_SHEETS_DIRECTORY,
    PERSON_SHEETS_FILETYPE,
    PLAYER_SHEET,
    SAVEGAME_COOKIENAME,
    SOUNDFILE_ITEM
} from "../utils/constants";
import {docCookies} from "../lib/docCookies";
import {store} from "../../redux/store";
import {importFlags} from "../../redux/actions";

export const Game = Q => Q.Class.extend("Game", {

        init: function () {

            // Provides better Math.random
            Math.seedrandom();

            this.loadingHandler = new Q.LoadingHandler();
            this.audioHandler = new Q.AudioHandler(this.loadingHandler);
            this.UIHandler = new Q.UIHandler(this, this.audioHandler, this.loadingHandler);

            this.player = null; // Variable holds instance of Person class that has player functions
            this.playerState = {

                items: {}

            };
            this.savegame = null;
            this.startingMap = null;
            this.activeMapName = "";
            this.maps = {};

        },

        _getStartupAssets: function () {
            var startupAssets = [];

            for (var i = 0; i < AVAILABLE_PERSON_SHEETS.length; i++) {
                startupAssets.push(PERSON_SHEETS_DIRECTORY + AVAILABLE_PERSON_SHEETS[i] + "." + PERSON_SHEETS_FILETYPE);
            }

            return startupAssets.concat(LOAD_ON_STARTUP);
        },

        start: function () {
            console.log("Starting game from inside...");

            var game = this;

            this.UIHandler.loadAssets(function () {
                game.loadingHandler.load(game._getStartupAssets(), function () {
                    console.log("Loaded most initial assets succesfully.");

                    game.createImageDefinitions();
                    game.loadSavegame();

                    Q.stageScene(game.startingMap, MAIN_LEVEL);
                    game.activeMapName = game.startingMap;
                }, "Lade Spieldaten: " + PERCENTAGE_PLACEHOLDER + "%...");
            });
        },

        loadSavegame: function () {

            console.log("Trying to load savegame...");

            var saveCookie = docCookies.getItem(SAVEGAME_COOKIENAME),
                savegame,
                error = false;

            try {

                savegame = JSON.parse(saveCookie);

            } catch (e) {

                error = true;

            }

            if (error || !savegame || window.location.search === "?new") {

                this.startingMap = DEFAULT_MAP;
                console.log("Could not load savegame. Error: ", error, ". Savegame: ", savegame);

            } else {

                this.applySavegame(savegame);

            }

        },

        applySavegame: function (savegame) {
            this.savegame = savegame;
            this.startingMap = savegame.player.map;

            var savedMaps = savegame.maps;

            for (var mapName in savedMaps) {
                if (savedMaps.hasOwnProperty(mapName) && this.maps.hasOwnProperty(mapName)) {
                    this.loadItems(mapName);
                }
            }

            store.dispatch(importFlags(savegame.flags));
            this.playerState = savegame.playerState;

            if (savegame.forcedSong){
                this.audioHandler.forceSong(savegame.forcedSong);
            }

            console.log("Loaded savegame successfully: ", savegame);
        },

        loadItems: function (map) {

            var savedMaps = this.savegame.maps;

            if (typeof savedMaps[map].items !== "object" || !savedMaps[map].items.length) return;

            var savedItems = savedMaps[map].items,
                realItems = this.maps[map].p.items,
                saved, real;

            for (var i = 0; i < savedItems.length; i++) {

                for (var j = 0; j < realItems.length; j++) {

                    saved = savedItems[i];
                    real = realItems[j];

                    if (saved.x === real.x && saved.y === real.y && saved.no === real.no) {

                        real.found = !!saved.found;

                    }

                }

            }

        },

        save: function () {

            var player = this.player;

            if (this.UIHandler.isBusy() || !player.p.userControlledStepping || player.p.freeze || player.p.stepping) return;

            var saveObject = {};

            saveObject.forcedSong = this.audioHandler.getForcedSong();
            saveObject.flags = store.getState().flags;
            saveObject.playerState = this.playerState;
            saveObject.player = {

                x: player.p.x,
                y: player.p.y,
                direction: player.p.direction,
                map: this.activeMapName

            };

            var mapData = {};

            for (var mapName in this.maps) {
                if (this.maps.hasOwnProperty(mapName)) {
                    mapData[mapName] = {
                        items: this.maps[mapName].p.items,
                    };
                }
            }

            saveObject.maps = mapData;

            const saveString = JSON.stringify(saveObject);
            docCookies.setItem(SAVEGAME_COOKIENAME, saveString, Infinity);
            console.log("Saved game: ", saveString);

            this.UIHandler.displayText(["Spiel gespeichert!"]);

        },

        switchMap: function (to) {

            var game = this;
            Q.clearStage(MAIN_LEVEL);

            // Timeout because it feels more natural in-game
            window.setTimeout(function () {
                game.activeMapName = to;
                Q.stageScene(to, MAIN_LEVEL);
            }, MAP_SWITCH_TIMEOUT);

        },
        resetPlayer: function () {

            this.player = new Q.Person({sheet: PLAYER_SHEET}, true, this);

        },
        itemUsed: function (no) {
            var items = this.playerState.items;

            if (!this.hatItem(no)){
                throw new Error("Can't use item that is not in inventory.");
            }

            items[no]--;
        },
        itemFound: function (no, callback) {
            var items = this.playerState.items;

            // Increase quantity in hold by one
            if (typeof items[no] === "number") {
                items[no]++; // If player already holds one, just increase
            } else {
                items[no] = 1; // Else set to one
            }

            this.audioHandler.playSound(SOUNDFILE_ITEM);

            this.UIHandler.displayText([ITEM_NAMES[no] + " erhalten!"], function () {
                if (typeof callback == "function") callback();
            });
        }
        ,
        hatItem: function (no) {
            var items = this.playerState.items;

            return items[no] && items[no] > 0;
        }
        ,
        getAudioHandler: function () {
            return this.audioHandler;
        }
        ,
        getUIHandler: function () {
            return this.UIHandler;
        }
        ,
        getLoadingHandler: function () {
            return this.loadingHandler;
        }
        ,
        getMap: function (mapName) {
            return this.maps[mapName];
        }
        ,
        getActiveMap: function () {
            return this.maps[this.activeMapName];
        }
        ,
        getActionSprites: function () {
            // All the sprites the player can interact with
            return Q("Person", MAIN_LEVEL).items.concat(Q("Item", MAIN_LEVEL).items).concat(Q("Invisible", MAIN_LEVEL).items);
        }
        ,
        getPlayer: function () {
            return this.player;
        }
        ,
        getSavegame: function () {
            return this.savegame;
        }
        ,

        filterPersons: function (property, value) {
            return Q("Person", MAIN_LEVEL).items.filter(function (person) {
                return person.p.hasOwnProperty(property) && person.p[property] === value;
            });
        },

        filterItems: function (property, value) {
            return Q("Item", MAIN_LEVEL).items.filter(function (item) {
                return item.p.hasOwnProperty(property) && item.p[property] === value;
            });
        },

        setGlobalFreeze: function (value) {
            var persons = Q("Person", MAIN_LEVEL).items,
                i = 0,
                l = persons.length;

            for (; i < l; i++) {
                persons[i].setFreeze(value);
            }
        }
        ,

        addMap: function (mapData) {
            if (!mapData.mapName) new Error("No map name provided!");
            this.maps[mapData.mapName] = new Q.Map(mapData, this);
        }
        ,

        createImageDefinitions: function () {
            Q.sheet(MARKER_SHEET,
                IMAGEFILE_PERSON_MARKER,
                {
                    tilew: 32,
                    tileh: 32,
                    spacingX: 16
                }
            );

            Q.sheet(FROG_SHEET,
                IMAGEFILE_FROG,
                {
                    tilew: 32,
                    tileh: 32,
                    spacingY: 16
                }
            );

            AVAILABLE_PERSON_SHEETS.forEach((sheetName) => Q.sheet(sheetName,
                PERSON_SHEETS_DIRECTORY + sheetName + ".png",
                {
                    tilew: 32,
                    tileh: 32,
                    spacingX: 16
                }
            ));

            const frogStand = {frames: [7, 8, 9, 10, 11, 12], rate: 1 / 10};
            const frogWalk = {frames: [14, 15, 16], rate: 1 / 5};
            Q.animations(FROG_ANIMATIONS, {
                stand_up: frogStand,
                stand_down: frogStand,
                stand_right: frogStand,
                stand_left: frogStand,

                walk_up: frogWalk,
                walk_down: frogWalk,
                walk_right: frogWalk,
                walk_left: frogWalk,
            });

            Q.animations(PERSON_ANIMATIONS, {
                stand_up: {frames: [0], loop: false},
                stand_down: {frames: [5], loop: false},
                stand_right: {frames: [1], loop: false},
                stand_left: {frames: [6], loop: false},

                walk_up: {frames: [2, 0, 10], rate: 1 / 5},
                walk_down: {frames: [11, 5, 8], rate: 1 / 5},
                walk_right: {frames: [7, 1, 4], rate: 1 / 5},
                walk_left: {frames: [3, 6, 9], rate: 1 / 5},
            });
        }

    })
;
