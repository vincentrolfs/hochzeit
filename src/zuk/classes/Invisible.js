import {IMAGEFILE_ASSET_MARKER} from "../utils/constants";

export const Invisible = Q => Q.Sprite.extend("Invisible", {

	init: function(p) {

		this._super(p, {

			collisionMask: Q.SPRITE_NONE,
			type: Q.SPRITE_PARTICLE,
			h: 16,
			w: 16,
			cx: 16,
			cy: 16,
			x: 8,
			y: 8,
			interact: function(callback){}

		});

	},

	togglemark: function(){

		var p = this.p;

		p.marked = !p.marked;

		if (p.marked){

			p.old_asset = p.asset;
			p.asset = IMAGEFILE_ASSET_MARKER;

		} else {

			p.asset = p.old_asset;

		}

	},

});
