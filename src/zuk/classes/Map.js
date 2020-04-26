import {MAIN_LEVEL, SCENE_BLACKMAP} from "../utils/constants";
import {store, subscribeWithState} from "../../redux/store";
import {normalizePointDefinitions} from "../utils/normalizePointDefinitions";

export const Map = Q => Q.Class.extend("Map", {

	init: function(settings, game){
		this.game = game;

		// Map settings provided when called
		this.settings = this.parseSettings(settings);

		// Map properties
		// Accessible by others
		var p = this.p = {
			items: this.settings.items, // All items the map can have, format {x: int, y: int, found: bool, no: int}

			assets: [], // So that other maps know what files this one uses & can load them beforehand
			visited: false
		};

		// p.assets: the stuff nearby maps load for this map
		if (this.settings.music) 	p.assets.push(this.settings.music);
		if (this.settings.fileName) p.assets.push(this.settings.fileName);
		if (this.settings.additionalAssets) p.assets = p.assets.concat(this.settings.additionalAssets);

		this.createScene();
		this.connectRedux();
	},

	parseSettings: function(settings){
		settings = Q._extend({
			mapName: "",
			fileName: "",

			loadingPoints:  { default: [0, 0] },
			switchPoints: [],

			items: [],
			storyParts: [],
			reduxSubscription: undefined,

			music: "",

			loadAssetsOf: [],
			additionalAssets: []
		}, settings);
		var storyParts = settings.storyParts;

		for (var i = 0; i < storyParts.length; i++){
			normalizePointDefinitions(storyParts[i].persons || []);
			normalizePointDefinitions(storyParts[i].invisibles || []);
		}

		normalizePointDefinitions(settings.loadingPoints);
		normalizePointDefinitions(settings.switchPoints);
		normalizePointDefinitions(settings.items);

		return settings;
	},

	insertItems: function(stage, player){
		var items = this.p.items;

		for ( var i = 0; i < items.length; i++ ){
			const item = items[i];
			const j = i;

			const displayTrigger = () => {
				// Wenn erstens das Item nicht mit dem Spieler crasht, und zweitens das Item noch nicht gefunden wurde, tus rauf
				if ( (item.x !== player.p.x || item.y !== player.p.y) && (!item.hasOwnProperty("found") || item.found === false)){
					stage.insert( new Q.Item( item, j, this.game ) );
				}
			};

			if (item.getDisplayTrigger){
				item.getDisplayTrigger(displayTrigger);
			} else {
				displayTrigger();
			}
		}
	},

	insertStoryParts: function(stage, player){
		var storyParts = this.settings.storyParts;

		for (var i = 0; i < storyParts.length; i++){
			if (this.shouldDisplayStoryPart(storyParts[i])){
				this.insertOneStoryPart(storyParts[i], stage, player);
			}
		}
	},

	insertOneStoryPart: function(storyPart, stage, player){
		var persons = storyPart.persons || [],
			invisibles = storyPart.invisibles || [],
			organise = storyPart.organise;

		for (var i = 0; i < persons.length; i++ ){
			if (persons[i].x !== player.p.x || persons[i].y !== player.p.y){
				stage.insert( new Q.Person( persons[i], false, this.game ) );
			}
		}

		for (i = 0; i < invisibles.length; i++ ){
			stage.insert( new Q.Invisible( invisibles[i] ) );
		}

		if (organise){
			organise(this.game, this.game.getUIHandler(), store.getState().flags);
		}
	},

	shouldDisplayStoryPart: function(storyPart){
		if (typeof storyPart.display !== 'function'){
			return !!storyPart.display;
		}

		return storyPart.display(store.getState().flags);
	},

	createScene: function(){
		var game = this.game,
			map = this,
			s = this.settings,
			p = this.p;

		Q.scene(s.mapName, function(stage) {
			var player = map.configuratePlayer();
			p.visited = true;

			game.getLoadingHandler().load(p.assets, function(){
				if (!s.fileName){
					Q.stageScene(SCENE_BLACKMAP, MAIN_LEVEL);
				} else {
					Q.stageTMX(s.fileName, stage);
					stage.insert(player);
					stage.add("viewport").follow(player);
				}

				map.insertItems(stage, player);
				map.insertStoryParts(stage, player);

				game.getAudioHandler().setSong(s.music);
				map.loadNearbyMapsAssets();
			}, "Lade Map...");

		}, {
			// Options for scene
			// Sort things on stage (persons etc) by y-values (height)
			sort: function(a,b) { return ((a.p && a.p.y) || -1) - ((b.p && b.p.y) || -1); }
		});

	},
	loadNearbyMapsAssets: function(){
		var reachables = this.settings.switchPoints.concat(this.settings.loadAssetsOf), // loadAssetsOf is just strings!
			loadArray = [],
			mapName,
			reachableMap;

		// Go through reachable maps...
		for (var i = 0; i < reachables.length; i++){
			mapName = reachables[i];

			// switchPoints are arrays which store mapName in position 2
			// but reachables might also contain plain strings, so we have to differentiate
			if (typeof mapName !== "string") mapName = mapName[2];

			reachableMap = this.game.getMap(mapName);

			// If map has not been visited yet
			if ( !reachableMap.p.visited ){
				// Preload it's assets
				loadArray = loadArray.concat( reachableMap.p.assets );
			}
		}

		this.game.getLoadingHandler().load(loadArray, null, "");
	},
	configuratePlayer: function(){

		var player = this.game.getPlayer(),
			settings = this.settings,
			savegame = this.game.getSavegame(),
			comingFrom,
			oldDirection,
			direction,
			loadingPointIsDoor,
			loadX, loadY;

		if (player){

			comingFrom = player.getMap();
			oldDirection = player.getDirection();

			// If the location where player comes from doesn't have it's own loading point
			if (typeof settings.loadingPoints[comingFrom] === "undefined"){

				// Use default loading point
				comingFrom = "default";

			}

		} else { // Player does not exist yet => Game has just started

			loadingPointIsDoor = false;

			if (savegame){ // New game with savegame => load data

				loadX = savegame.player.x;
				loadY = savegame.player.y;

				direction = savegame.player.direction;

			} else { // No savegame... just use default stuff

				comingFrom = "default";

			}

		}

		if (typeof loadX == "undefined")				loadX = settings.loadingPoints[comingFrom][0];
		if (typeof loadY == "undefined")				loadY = settings.loadingPoints[comingFrom][1];

		if (typeof direction == "undefined")			direction = settings.loadingPoints[comingFrom][2] || oldDirection || "down";
		if (typeof loadingPointIsDoor == "undefined")	loadingPointIsDoor = settings.loadingPoints[comingFrom][3];

		// Make changes to the player instance
		var playerConfig = {

			hasMoved: false,

			x: loadX,
			y: loadY,

			startingX: loadX,
			startingY: loadY,

			direction: 	direction,

			mapName: settings.mapName

		};

		this.game.resetPlayer();
		player = this.game.getPlayer();

		player.set(playerConfig);

		if (loadingPointIsDoor) player.go(direction);

		return player;

	},
	connectRedux: function(){
		const { reduxSubscription } = this.settings;

		if (!reduxSubscription){ return; }

		subscribeWithState((newState, previousState) => {
			const player = this.game.getPlayer();

			if (player && player.p.mapName === this.settings.mapName){
				reduxSubscription(newState, previousState, this.game);
			}
		})
	}
});
