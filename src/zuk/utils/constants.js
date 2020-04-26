export const CANVAS_ID = "canvas";
export const MUSIC_CHECKBOX_ID = "musicEnabled";
export const SOUND_CHECKBOX_ID = "soundEnabled";
export const SAVE_BUTTON_ID = "save";

export const BLACKMAP_LEVEL = 0;
export const MAIN_LEVEL = 1;
export const UI_LEVEL = 2;

export const SCENE_BLACKMAP = "_blackmap";
export const SCENE_UI = "_ui";

export const MUSIC_COOKIENAME = "musicEnabled";
export const SOUND_COOKIENAME = "soundEnabled";
export const SAVEGAME_COOKIENAME = "savegame";

export const PERCENTAGE_PLACEHOLDER = "___percentage___";

// What value to use when saving a boolean cookie, e.g. soundEnabled
export const COOKIE_TRUTHVALUE = "1";
export const COOKIE_FALSEVALUE = "0";

export const ITEM_CASHFLOW = "1";
export const ITEM_WASSERKARAFFE = "2";
export const ITEM_ZAUBERTRANK = "3";
export const ITEM_NAMES = {
	"1": "Cashflow-Spiel",
	"2": "Wasserkaraffe",
	"3": "Zaubertrank",
};

export const MAIN_TILESET = "dp_tileset.png";
export const INTERIOR_TILESET = "interior.png";

export const IMAGEFILE_ITEM = "item.png";
export const IMAGEFILE_SCROLL_MARKER = "scroll_marker.png";

export const IMAGEFILE_FROG = "frog.png";
export const FROG_SHEET = "frog";
export const FROG_ANIMATIONS = "frog_animations";

export const IMAGEFILE_GLOW = "glow.png";

export const PERSON_SHEETS_DIRECTORY = 'persons/';
export const PERSON_SHEETS_FILETYPE = 'png';
export const AVAILABLE_PERSON_SHEETS = ["helly", "rebecca", "christian", "rini", "mirco", "vincent"];
export const PLAYER_SHEET = "helly";
export const PERSON_ANIMATIONS = "person_animations";

export const SOUNDFILE_BUMP = "bump.mp3";
export const SOUNDFILE_ITEM = "item.mp3";

export const DEFAULT_MAP = "nurtext";
export const MAP_SWITCH_TIMEOUT = 0;
export const DEFAULT_TEXT_SPEED = 1500;

export const MUSIC_ENABLED_DEFAULT = true;
export const SOUND_ENABLED_DEFAULT = true;

export const TEXT_FAMILY = "aller";
export const TEXT_SIZE = 26;

// For debugging
export const IMAGEFILE_ASSET_MARKER = "asset_marker.png";
export const IMAGEFILE_PERSON_MARKER = "persons/person_marker.png";
export const MARKER_SHEET = "marker";

export const LOAD_ON_STARTUP = [
	MAIN_TILESET,
	INTERIOR_TILESET,
	IMAGEFILE_ITEM,
	IMAGEFILE_FROG,
	IMAGEFILE_GLOW,
	IMAGEFILE_PERSON_MARKER,
	IMAGEFILE_ASSET_MARKER,
	SOUNDFILE_BUMP,
	SOUNDFILE_ITEM,
	"heavy_rain.mp3",
	"paradise.mp3",
];
