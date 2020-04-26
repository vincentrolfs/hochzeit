import {MARKER_SHEET, PERSON_ANIMATIONS, PLAYER_SHEET} from "../utils/constants";
import {normalizeOnePointDefinition} from "../utils/normalizePointDefinitions";

export const Person = Q => Q.Sprite.extend("Person", {

    init: function (p, isPlayer, game) {

        this.game = game;

        this._super(p, { // default options

            collisionMask: ~Q.SPRITE_PARTICLE, // Hit everything except for particles (=invisibles)
            x: 8, // Starting position
            y: 0,
            sheet: PLAYER_SHEET, // Tilesheet used
            sprite: PERSON_ANIMATIONS, // Animations used

            points: [[-8, 0], [8, 0], [8, 16], [-8, 16]],

            direction: "down", // Starting direction

            walk: false, // Random walking
            walkRadius: 16,
            timeSinceWalk: 0,

            go_array: [],

            userControlledStepping: false,

            stepDistance: 16, // One step is 16 pixels
            stepDelay: 0.25,

            freeze: false,
            marked: false,
            interact: function () {
            }

        });

        this.add("2d, animation, smartControls");

        if (isPlayer) {

            this.add("playerFunctions");

        }

        this.p.startingX = this.p.x;
        this.p.startingY = this.p.y;

    },

    togglemark: function () {

        var p = this.p;

        p.marked = !p.marked;

        if (p.marked) {

            p.old_sheet = p.sheet;
            p.sheet = MARKER_SHEET;

        } else {

            p.sheet = p.old_sheet;

        }

    },

    step: function (dt) {

        var p = this.p;

        // Enables dynamic on/off switching of walking
        if (p.walk && !p.freeze) {

            p.timeSinceWalk += dt;

            var dirs = [];

            if (p.y - 16 >= p.startingY - p.walkRadius) dirs.push("up");
            if (p.y + 16 <= p.startingY + p.walkRadius) dirs.push("down");

            if (p.x - 16 >= p.startingX - p.walkRadius) dirs.push("left");
            if (p.x + 16 <= p.startingX + p.walkRadius) dirs.push("right");

            if (p.timeSinceWalk >= 0.7 && Math.random() > 0.995) {

                p.timeSinceWalk = 0;

                var direction_no = Math.round(Math.random() * (dirs.length - 1)); // Number between 0 and length of dirs-1

                p.go_array.push(dirs[direction_no]);

            }

        }

    },

    setFreeze: function (val) {

        this.p.freeze = !!val;

    },

    go: function (orders, callback) {

        var p = this.p;

        if (typeof orders == "string") {
            p.go_array.push(orders);
        } else {
            p.go_array = p.go_array.concat(orders);
        }

        if (typeof callback == "function") {

            console.log("here");

            var _super = this;

            this.on("step", function () {

                if (p.go_array.length === 0) {

                    _super.off("step", this);
                    callback();


                }

            });

        }

    },

    getMap: function () {

        return this.p.mapName;

    },

    getDirection: function () {

        return this.p.direction;

    },

    setControl: function (val) {

        this.p.userControlledStepping = !!val;

    },

    teleport: function (x, y, direction = null) {
        if (!direction) {
            direction = this.direction;
        }

        this.set(normalizeOnePointDefinition({
            x, y, direction
        }));
    }

});
