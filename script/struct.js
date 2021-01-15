const ROOM_NUM = 25;
const EXIT_NUM = 12;
const EXIT_STATE_ICONS = ["", "xmark", "ditems_sk"];

const DUNG_ABBREV = ["HC", "EP", "DP", "Hera", "AT", "PoD", "SP", "SW", "TT", "IP", "MM", "TR", "GT"];
const SPEC_TEXT = ["PoD pits", "IP pits", "MM pits", "HC", "EP", "DP/ Hera", "AT/ PoD", "SP/SW", "TT/IP", "MM", "TR", "GT", ""];
const ICON_NAMES =
	["num1", "allbow10", "hookshot", "hammer", "somaria", "ditems_sk", "xmark", "ditems_bk", "flippers", "boots", "glove1", "xtalswitch", "mudoraa", "keydoor",
	"num2", "firerod", "bombos", "lantern", "torch", "ban_sk", "boss", "entranceb", "entrancedrop", "sanc", "shutter", "switch0", "mudorab", "hint",
	"num3", "bombs", "enemy", "sword0", "chest", "bigchest", "entrancew", "entrancem", "entrancee", "teleport", "pit", "switch1", "mudorac", "info"];
	
	
var curDungeon = 0; //Currently displayed dungeon

var map = new Array; //array of dungeon information

function resetAll() {
	options.images = new Array();
	options.imageNum = 0;
	
	//curDungeon = 0;
	for (i = 0; i < 13; i++) {
		map[i] = {};
		map[i].rooms = new Array; //array of room information
		for (j = 0; j < ROOM_NUM; j++) {
			map[i].rooms[j] = {};
			map[i].rooms[j].visible = false; //display room or not
			map[i].rooms[j].icon = ""; //special room displays
			map[i].rooms[j].exits = new Array; //array of exit information for the room
			for (k = 0; k < EXIT_NUM; k++) {
				map[i].rooms[j].exits[k] = {};
				map[i].rooms[j].exits[k].visible = false; //display exit or not
				map[i].rooms[j].exits[k].icon = ""; //icon to display for the exit, like "hookshot"
			}
		}
		map[i].connects = new Array; //array of connections (start.room, start.exit, end.room, end.exit, drawn, show)
		map[i].images = new Array; //array of free images (element id string)
		map[i].counter = "?"; //scroll wheel counter
		map[i].counter2 = 0; //mouse click counter
		map[i].finished = false; //x mark on dungeon
	}
}

