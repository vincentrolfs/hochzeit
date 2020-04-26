import {SOUNDFILE_BUMP} from "../utils/constants";
import {store} from "../../redux/store";

export const PlayerFunctions = Q => Q.component("playerFunctions", {

    // Initialize some stuff
    added: function () {

        var p = this.entity.p;

        // Activity user controls (see step function of smartControls)
        p.userControlledStepping = true;

        if (!p.mapName) {
            p.mapName = "";
        } // Map on which the player is on
        if (!p.hasMoved) {
            p.hasMoved = false;
        } // Has the player moved since arrival/map loading

        // check switch points everytime player moves
        this.entity.on("step", this, "checkSwitchPoints");

        // Make bump sound!

        p.seriousBumps = 0; // Bumps against Persons/Items play 3 times but shouldn't. Let's prevent it by counting!

        this.entity.on("hit", this, "bumpSound");

        // check action (talking, items) everytime player presses action key
        Q.input.on("action", this, "checkAction");

    },

    bumpSound: function (collision) {

        var obj = collision.obj;

        // Bumps against Persons/Items play 3 times but shouldn't. Let's prevent it by counting!
        if (obj.isA("Person") || obj.isA("Item")) {

            var p = this.entity.p;

            if (p.seriousBumps < 2) {

                p.seriousBumps++;
                return;

            } else {

                p.seriousBumps = 0;
                // The third hit should create a sound, thus no return statement!

            }

        }

        this.entity.game.getAudioHandler().playSound(SOUNDFILE_BUMP);

    },

    // Check if player is tryna talk to somebody
    checkAction: function () {

        var p = this.entity.p,
            game = this.entity.game;

        // Only check action if player is allowed to move + is standing still
        if (p.freeze || p.stepping || !p.userControlledStepping || game.getUIHandler().isBusy()) return;

        // key: 	direction in which player is looking
        // value: 	x coordinates of that point (converted so size of sprite doesn't matter)
        // 			y coords (converted)
        // 			inverted direction
        var places = {

                "up": [p.x, p.y + p.cy - 16, "down"],
                "down": [p.x, p.y + p.cy + 16, "up"],
                "left": [p.x - 16, p.y + p.cy, "right"],
                "right": [p.x + 16, p.y + p.cy, "left"]

            },
            spot = places[p.direction], // The actual spot the player is looking at
            actionSprites = game.getActionSprites(), // All the sprites the player can interact with
            i = 0,
            l = actionSprites.length,
            sprite;

        for (; i < l; i++) { // Loop through actionSprites

            sprite = actionSprites[i];

            if ((sprite.p.x) === spot[0] && (sprite.p.y + sprite.p.cy) === spot[1]) { // If the sprite is on the spot the player is looking at

                if (sprite.p.direction) {

                    // Change direction of sprite if it has one
                    sprite.p.direction = spot[2];

                }

                // Interact with sprite; call the interact function so that "this" symbolizes the sprite
                sprite.p.interact.call(sprite, game.getUIHandler(), store.getState().flags, game);
            }

        }

    },

    checkSwitchPoints: function () {

        // abort if player is moving. if he just started moving it's fine.
        if (this.entity.p.stepping && !this.entity.p.justStartedStepping) return;

        var p = this.entity.p,
            game = this.entity.game;

        // Check if player has moved since he arrived on the map
        // Peform check only if he hasMoved isn't already true
        // If player is on another location than he was when he came...
        if (!p.hasMoved && ((p.startingX !== p.x) || (p.startingY !== p.y))) {

            // ...we can say that he must have moved
            p.hasMoved = true;

        }

        // If the player hasnt moved yet, return
        if (!p.hasMoved) return;

        var switchPoints = game.getActiveMap().settings.switchPoints,
            i = 0,
            l = switchPoints.length;

        // Go through switchPoints, check if player is on one
        for (i = 0; i < l; i++) {

            // If player is on the switch point
            if (p.x === switchPoints[i][0] && p.y === switchPoints[i][1]) {

                game.switchMap(switchPoints[i][2]); // Argument signifies name of new map

                // We switch! Stop searching!
                break;

            }

        }

    }

});
