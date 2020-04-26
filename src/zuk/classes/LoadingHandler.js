import {PERCENTAGE_PLACEHOLDER} from "../utils/constants";
import {store} from "../../redux/store";
import {setCenterText} from "../../redux/actions";

export const LoadingHandler = Q => Q.Class.extend("LoadingHandler", {

	init: function(){
		this.doneLoading = [];
	},

	displayLoadingText: function(text, loaded, total){

		if (typeof text !== "string" || !text.length) return;

		var textWithPercentage = text.replace(PERCENTAGE_PLACEHOLDER, Math.round((loaded/total)*100));

		console.log("Loading text: ", textWithPercentage);
		store.dispatch(setCenterText(textWithPercentage));
	},

	removeDuplicates: function(arr){
		var seen = {};
		return arr.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	},

	load: function(loadArray, callback, text){

		if (typeof loadArray === "undefined"){ console.warn("Can't load undefined."); return; }

		loadArray = this.removeDuplicates(loadArray);
		console.log("Loading: ", loadArray);

		if (!loadArray.length){

			this.loadSuccess(loadArray, callback);

		} else {

			var loadingHandler = this;
			const withText = !!text;

			Q.load(loadArray, function() {
				if (withText) { store.dispatch(setCenterText("")); }
				loadingHandler.loadSuccess(loadArray, callback);
			}, {
				progressCallback: function(loaded, total){
					loadingHandler.displayLoadingText(text, loaded, total);
				},
			});
		}

	},

	loadSuccess: function(loadArray, callback){

		console.log("Loaded succesfully: ", loadArray);
		if (typeof callback === "function") callback();

	}

});
