import {IMAGEFILE_ASSET_MARKER, IMAGEFILE_ITEM} from "../utils/constants";

export const Item = Q => Q.Sprite.extend("Item", {

    init: function (p, id_on_map, game) {

        this.game = game;

        this.found = false;
        this.id_on_map = id_on_map; // Identifies item on the map to be able to delete it
        this.marked = false;

        this._super(p, {

            x: 8,
            y: 8,
            points: [[-8, 0], [8, 0], [8, 16], [-8, 16]],
            asset: IMAGEFILE_ITEM,
            no: 1, // What item is it?
            interact: void 0,

        });

        this.setInteractMethod();

        this.add("2d");
        this.on("hit", this, "collision");
        this.on("inserted", this, "inserted");

    },

    setInteractMethod: function () {

        // If user supplies his own interact function, we have to save it
        var item = this,
            game = this.game,
            extraInteract;

        if (typeof this.p.interact == "function") extraInteract = this.p.interact;

        this.p.interact = function (callback) {
            const findItem = () => game.itemFound(item.p.no, function () {
                item.find();

                if (typeof callback == "function") callback();
            });

            if (typeof extraInteract == "function"){
                extraInteract(game.getUIHandler(), findItem);
            } else {
                findItem();
            }
        };

    },

    togglemark: function () {

        var p = this.p;

        this.marked = !this.marked;

        if (this.marked) {

            p.old_asset = p.asset;
            p.asset = IMAGEFILE_ASSET_MARKER;

        } else {

            p.asset = p.old_asset;

        }

    },

    find: function () {

        var game = this.game,
            p = this.p;

        // So that item doesn't reappear!
        // Modify item representation in "map.items"
        game.getMap(p.mapName).p.items[this.id_on_map].found = true;
        // Modify actual item object
        this.found = true;

        this.destroy();

    },

    inserted: function (info) {

        // Save map name in p
        this.p.mapName = info.scene.name;

    },

    step: function (dt) {

        var p = this.p;

        // Save position in case of collision
        p.origX = p.x;
        p.origY = p.y;

    },

    collision: function (col) {

        var p = this.p;

        // Reset position; make sprite effectively immoveable
        p.x = p.origX;
        p.y = p.origY;

    }

});
