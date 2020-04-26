zuk.addMap({

	mapName: "hotel",
	fileName: "hotel.tmx",
	music: "the-voices-in-the-dreams.mp3",
	loadingPoints: {
	
		default: [136, 256, "up", true],
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
		
		[136, 256, "next_town"],
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	invisibles: [{
		x: 40,
		y: 80,
		interact: function(){
			zuk_ui.displayText("Wir wünschen Ihnen einen angenehmen Aufenthalt!");
		}
	}],
	persons: [{
		x: 40,
		y: 48,
		sheet: "claire"
	},
	{
		x: 216,
		y: 48,
		sheet: "police",
		interact: function(){
			zuk_ui.displayText("Kein Zimmer? Kein Zutritt!");
		},
	},
	{
		x: 200,
		y: 48,
		sheet: "police",
		interact: function(){
			zuk_ui.displayText(["Hier dürfen leider nur Gäste passieren.", "Wir bitten um Ihr Verständnis."]);
		}
	},
	{
		x: 88,
		y: 176,
		sheet: "max",
		interact: function(){
			zuk_ui.displayText(["Ich bin der Rätselmeister.", "Mir ist zu Ohren gekommen,",  "dass du ins Regierungsgebäude willst.", "Dabei kann ich dir helfen!", "Aber vorher musst du mein Rätsel lösen!", "Wenn ich in der Mitte steh,", "Rechts ein e und links ein e," ,"Rage ich als stolzer Baum,", "Hoch empor in Waldes Raum.", "Was bin ich?"], function(){
				var answer = prompt().replace(/\s+/g, "").toLowerCase();
				var response = (answer === atob("ZWljaGU="))? "Das ist korrekt!" : "Nein, leider nicht...";
				zuk_ui.displayText(response);
			});
		}
	}]
	
});

zuk.addMap({

	mapName: "next_town",
	fileName: "next_town.tmx",
	music: "the-voices-in-the-dreams.mp3",
	loadingPoints: {
	
		default: [360, 544, "up", true],
		hotel: [584, 272, "down", true]
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[360, 544, "pathway"],
		[344, 544, "pathway"],
		[376, 544, "pathway"],
		[584, 272, "hotel"]
		
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	invisibles: [{
	
		x: 328,
		y: 176,
		interact: function(){
		
			zuk_ui.displayText("Rathaus der Stadt");
		
		}
		
	}],
	persons: [{
	
		x: 360,
		y: 192,
		direction: "down",
		sheet: "police",
		interact: function(callback){
		
			zuk_ui.displayText(["Zivilisten haben gerade keinen Zutritt.", "Mach doch eine Kaffeepause im Hotel!"]);
		
		}
	
	},{
	
		x: 424,
		y: 400,
		direction: "up",
		sheet: "bob",
		interact: function(callback){
		
			zuk_ui.displayText(["Oh, ein neues Gesicht!", "Du suchst Major Tom?", "Das große Gebäude da vorne ist von der Regierung.", "Ist nicht zu verfehlen!"]);
		
		}
	
	}]
	
});

// Pathway
zuk.addMap({

	mapName: "pathway",
	fileName: "pathway.tmx",
	loadingPoints: {
	
		default: [88, 368, "up", true],
		town: [88, 368, "up", true],
		next_town: [88, 32, "down", true],
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[88, 368, "town"],
		[88, 32, "next_town"]
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	music: "pokemon-friends.mp3",
	firstAct: "on_the_way",
	acts: {
	
		on_the_way: {
		
			persons: [{
			
				x: 136,
				y: 64,
				sheet: "max",
				walk: true,
				direction: "down",
				interact: function(callback){
				
					zuk_ui.displayText(["In deinem Alter noch so schnell unterwegs...", "Mach's wie ich und gönn' dir mal 'ne Pause!"]);
				
				}
			
			},
			{
			
				x: 72,
				y: 192,
				sheet: "claire",
				direction: "right",
				walk: true,
				interact: function(callback){
				
					zuk_ui.displayText(["Major Tom? Ich halte nichts von ihm.", "Ich finde ihn arrogant!"]);
				
				}
			
			}]
		
		}
	
	}
	
});

// Blue Room
zuk.addMap({

	mapName: "blue_room",
	fileName: "blue_room.tmx",
	loadingPoints: {
	
		default: [216, 208, "up", true],
		town: [216, 208, "up", true]
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[216, 208, "town"]
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	music: "come-on-in-to-post-town.mp3",
	items: [],
	firstAct: "exploring",
	acts: {
	
	}

});

// Jersey's Room
zuk.addMap({

	mapName: "jerseys_room",
	fileName: "jerseys_room.tmx",
	loadingPoints: {
	
		default: [200, 208, "up", true],
		town: [216, 208, "up", true]
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[216, 208, "town"]
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	music: "come-on-in-to-post-town.mp3",
	items: [],
	firstAct: "exploring",
	acts: {
	
	}

});

// Town
zuk.addMap({

	mapName: "town",
	fileName: "town.tmx",
	loadingPoints: {
	
		default: [200, 128, "up", false], // Default loading points must be specified!
		players_room: [88, 224, "down", true],
		pathway: [200, 96, "down", true],
		cave: [104, 368, "down", true],
		jerseys_room: [216, 224, "down", true],
		blue_room: [280, 224, "down", true]
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[88, 224, "players_room"],
		[200, 96, "pathway"],
		[184, 96, "pathway"],
		[216, 96, "pathway"],
		[104, 368, "cave"],
		[216, 224, "jerseys_room"],
		[280, 224, "blue_room"]
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	music: "come-on-in-to-post-town.mp3",
	items: [],
	invisibles: [
	
		{
			x: 40, y: 144,
			interact: function(){
		
				zuk_ui.displayText(["Da wurde etwas in den Baum geritzt!", '"Spiel entwickelt von Vincent Rolfs"', "Wer das wohl ist?"]);
		
			}	
		},
		
		{
			x: 264, y: 368,
			interact: function(){
		
				zuk_ui.displayText(["Die Tür ist verschlossen..."]);
		
			}	
		}
		
	],
	persons: [{
	
		x: 232,
		y: 400,
		interact: function(){
		
			zuk_ui.displayText("*Hust, Hust* \n Oh man, mir geht es gar nicht gut...");
		
		},
		walk: true
	
	}],
	firstAct: "exploring",
	acts: {
	
		new_game: {
		
			persons: [{ 
			
				x: 120,
				y: 240,
				sheet: "jersey",
				_tag: "jersey",
				direction: "left",
				interact: function(callback){
				
					var text;
					
					if (zuk.getMap("town").p.act == "new_game"){
					
						text = "Ich: Jersey?\nDa bist du ja! Ich wollte dich gerade wecken. Vorhin ist ein Brief eingetroffen - von der Regierung! \nMajor Tom hat geschrieben dass du dich sofort mit ihm treffen sollst. Er wartet im nächsten Dorf auf dich! Am besten gehst du sofort los!";
						
						zuk.getMap("town").p.act = "exploring";
					
					} else {
					
						text = "Major Tom erwartet dich im nächsten Dorf.\nKeine Ahnung was er will!";
					
					}
				
					zuk_ui.displayText(text, function(){
					
						zuk.getPlayer().setControl(true);
						if(typeof callback == "function") callback();
					
					});
				
				}
			
			}],
			
			organise: function(){
			
				zuk.getPlayer().setControl(false);
				zuk.getPlayer().go(["right"], function(){
				
					zuk.filterPersons("_tag", "jersey")[0].p.interact(function(){
					
						zuk.getPlayer().setControl(true);
					
					});
				
				});
			
			}
		
		},
		
		exploring: {
		
			persons: [{ 
			
				x: 328,
				y: 256,
				sheet: "jersey",
				direction: "left",
				interact: function(callback){
				
					zuk_ui.displayText("Hast du schon mit Major Tom geredet?\nEr wartet im nächsten Dorf auf dich.", callback);
				
				}
			
			}],
		
		}
	
	}

});

// Players room
zuk.addMap({

	mapName: "players_room",
	fileName: "interior.tmx",
	loadingPoints: {
	
		default: [56, 144, "down", false],
		begin: [56, 144, "down", false],
		town: [152, 32, "down", true]
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[152, 32, "town"]
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	music: "come-on-in-to-post-town.mp3",
	items: [],
	firstAct: "exploring",
	acts: {
	
		new_game: {
			
			organise: function(){
				
				zuk.getMap("players_room").p.act = "exploring";
				
				zuk_ui.displayText(["Was für eine Nacht...", "So schlecht geträumt habe ich lange nicht mehr.", "Aber jetzt erinnere ich alles nur noch verschwommen...", "Jersey kam vor, denke ich, und noch jemand...", "War es... Major Tom?", "Er antwortet seit Wochen nicht mehr auf meine Briefe.", "Ich sollte gehen und Jersey fragen, ob er etwas", "weiß, immerhin kennt er ihn besser als ich."], function(){
					
					zuk.getPlayer().setControl(false);
					
					zuk.getPlayer().go(["right", "right", "right", "up", "up", "up", "up", "right", "right", "right", "up", "up", "up"]);
					
				});
				
			}
			
		}
	
	}

});

// Cave
zuk.addMap({

	mapName: "cave",
	fileName: "cave.tmx",
	loadingPoints: {
	
		town: [248, 240, "up", true],
		begin: [200, 64, "down", false],
		default: [200, 64, "down", false]
		// Format: [x, y(, dir)(, isDoor)]
	
	},
	switchPoints: [
	
		[248, 240, "town"]
		// Format: [x_on_current_map, y_on_current_map, name_of_new_map]
	
	],
	items:[{ no: 2, x: 56, y: 176 }],
	music: "icy-sanctum.mp3",
	firstAct: "exploring",
	acts: {
	
		new_game: {
		
			persons: [{ 
			
				x: 168, y: 80,
				sheet: "bob",
				direction: "right"
				
			}, { 
			
				x: 184, y: 96,
				sheet: "max",
				direction: "up"
				
			},{ 
			
				x: 200, y: 112,
				sheet: "jersey",
				_tag: "jersey",
				direction: "up"
				
			},{ 
			
				x: 216, y: 96,
				sheet: "claire",
				direction: "up"
				
			},{ 
			
				x: 232, y: 80,
				sheet: "chris",
				direction: "left"
				
			}],
			
			organise: function(){
			
				zuk.getPlayer().setControl(false);
				
				zuk.getMap("cave").p.act = "exploring";
				zuk.getMap("begin").p.act = "intro2";
				
				setTimeout(function(){
				
					zuk_ui.displayText("...\n Es ist entschieden!", function(){
				
						setTimeout(function(){
			
							zuk.filterPersons("_tag", "jersey")[0].go("up", function(){
					
								zuk_ui.displayText("Hiermit ernenne ich dich zum Dorfältesten! \n Mögest du uns Weisheit und Wohlstand bringen! \n ALLE: Weisheit und Wohlstand!", function(){
								
									zuk.switchMap("begin");
								
								}, 3000);
					
							});
				
						}, 1500);
				
					}, 2000);
				
				}, 1500);
			
			}
		
		}
	
	}
	
});

// Begin
zuk.addMap({

	mapName: "begin",
	music: "icy-sanctum.mp3", // "good-night.mp3",
	loadAssetsOf: "town",
	firstAct: "intro1",
	acts: {
	
		intro1: {
			
			organise: function(){
				
				zuk.getMap("cave").p.act = "new_game";
				zuk.getMap("players_room").p.act = "new_game";
				zuk.getMap("town").p.act = "new_game";
				
				zuk_ui.displayText("Alles begann in einer dunklen Oktobernacht... \n Der Nacht in der ich zum Dorfältesten ernannt wurde...", function(){
					
					zuk.switchMap("cave");
					
				});
				
			}
			
		},
		
		intro2: {
			
			organise: function(){
				
				zuk_ui.displayText("Und so nahm das Unheil seinen Lauf...\n Nie hätte ich gedacht, \n dass soetwas bei uns passieren würde! \n Aber ich greife vor... \n Folgendes ereignete sich etwa zwei Jahre später...", function(){
					
					zuk.switchMap("players_room");
					
				});
				
			}
			
		}
	
	}

});