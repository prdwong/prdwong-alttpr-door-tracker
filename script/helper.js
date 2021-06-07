//Helper calculation functions


//*** MAGIC NUMBER FUNCTIONS

//Positions exit boxes
function translateExitPos(indexStr) {
	var index = parseInt(indexStr)
	var coord = {};
	switch (index) {
		case 0: coord.x = 12; coord.y = -2; break;
		case 1: coord.x = 32; coord.y = -2; break;
		case 2: coord.x = 52; coord.y = -2; break;
		case 3: coord.x = -2; coord.y = 12; break;
		case 4: coord.x = 66; coord.y = 12; break;
		case 5: coord.x = -2; coord.y = 32; break;
		case 6: coord.x = 66; coord.y = 32; break;
		case 7: coord.x = -2; coord.y = 52; break;
		case 8: coord.x = 66; coord.y = 52; break;
		case 9: coord.x = 12; coord.y = 66; break;
		case 10: coord.x = 32; coord.y = 66; break;
		case 11: coord.x = 52; coord.y = 66; break;
		default: coord.x = 0; coord.y = 0; break;
	}
	return coord;
}


//*** GENERIC HELPER FUNCTIONS

//given an rgb string and opacity value, return the rgba string
function rgb2rgba(colorStr, opacity) {
	if (colorStr.substring(0, 3) !== "rgb")
		console.log("Color doesn't support alpha value: "+colorStr);
	return colorStr.substring(0, colorStr.indexOf(")"))+","+opacity+")";
}

//Extracts room/exit number from a event.target.id string
//Free standing icons may be placed outside rooms, in which case NaN will be returned (their id contains "_A_"
function getRoomNumFromID(id) {
	if (id.substring(0, 2) === "i_")
		id = id.substring(2);
	if (id.substring(0, 4) === "room" || id.substring(0, 4) === "exit")
		return parseInt(id.substring(4, 6));
	if (id.substring(0, 4) === "free" && id.split("_").length - 1 > 1)
		return parseInt(id.substring(id.indexOf("_")+1, id.indexOf("_")+1 + id.substring(id.indexOf("_")+1).indexOf("_")));
	return -1;
}
function getExitNumFromID(id) {
	if (id.substring(0, 2) === "i_")
		id = id.substring(2);
	if (id.substring(0, 4) === "exit")
		return parseInt(id.substring(id.indexOf("_")+1));
	return -1;
}

//Returns true if exits can be created/destroyed for the specified room
//disableExits option set to true, then pre-defined tiles cannot have exit modification
function exitModificationAllowed(room) {
	roomData = map[curDungeon].rooms[room];
	if (options.disableExits === true && roomData.icon !== "")
		return false;
	return true;
}

//Calculate x/y coord of room (upper left corner) within the mapper element
function calcRoomCoord(room) {
	var coord = {};
	coord.x = (room % NUM_MAP_COLUMNS) * (ROOM_SIZE + ROOM_PADDING) + ROOM_PADDING;
	coord.y = parseInt(room / NUM_MAP_COLUMNS) * (ROOM_SIZE + ROOM_PADDING) + ROOM_PADDING;
	return coord;
}

function assignOptions() {
	options.potsanity = document.getElementById("opt_potsanity_on").checked;
	options.lobbyshuffle = document.getElementById("opt_lobby_on").checked;
	options.showcounter = document.getElementById("opt_counter_on").checked;
	options.disableExits = document.getElementById("opt_exit_disable").checked;
	options.rightErase = document.getElementById("opt_eraseR_enable").checked;
	options.multipleConnectors = document.getElementById("opt_multiConn_enable").checked;
	options.superEnable = document.getElementById("opt_super_enable").checked;
}


//*** COUNTER HELPERS

//Count how many chest and big chest icons there are
//Also counts boss icon
function countChests(dungeon) {
	chestCount = 0;
	var imgs2count = ["chest", "bigchest"];
	
	for (var i = 0; i < map[dungeon].images.length; i++) {
		var freeUrl = document.getElementById(map[dungeon].images[i]).style.backgroundImage;
		var img = freeUrl.substring(freeUrl.indexOf("/") + 1, freeUrl.indexOf(".png"));
		if (imgs2count.indexOf(img) !== -1
			|| (img === "boss" && [0,4,12].indexOf(dungeon) === -1))
			chestCount++;
	}
	for (var i = 0; i < ROOM_NUM; i++)
		for (var j = 0; j < EXIT_NUM; j++) {
			var exitData = map[dungeon].rooms[i].exits[j];
			if (imgs2count.indexOf(exitData.icon) !== -1
				|| (exitData.icon === "boss" && [0,4,12].indexOf(dungeon) === -1))
				chestCount++;
		}
	return chestCount;
}

//Count how many small key icons there are
function countKeys(dungeon) {
	keyCount = 0;
	var imgs2count = ["ditems_sk", "ban_sk"];
	
	for (var i = 0; i < map[dungeon].images.length; i++) {
		var freeUrl = document.getElementById(map[dungeon].images[i]).style.backgroundImage;
		var img = freeUrl.substring(freeUrl.indexOf("/") + 1, freeUrl.indexOf(".png"));
		if (imgs2count.indexOf(img) !== -1)
			keyCount++;
	}
	for (var i = 0; i < ROOM_NUM; i++)
		for (var j = 0; j < EXIT_NUM; j++) {
			var exitData = map[dungeon].rooms[i].exits[j];
			if (imgs2count.indexOf(exitData.icon) !== -1)
				keyCount++;
		}
	return keyCount;
}

//Update counter2 for the current dungeon, based on the click
function scratchCounterUpdate(click) {
	if (click === 0) //left click counter down
		map[curDungeon].counter2 = Math.max(0, map[curDungeon].counter2 - 1);
	if (click === 2) //right click counter up
		map[curDungeon].counter2 += 1;
	updateDungeonCounterText(curDungeon);
}


//*** FREE STANDING ICON HELPERS

//Find if we are hovering over an icon (x and y are event.pageX/event.pageY coords)
//Returns the latest (topmost) icon id, -1 if no icon found
function findHoveredIcon(x, y) {
	for (var i = document.getElementById("easel").childNodes.length - 2; i >= 0; i -= 2) {
		var el = document.getElementById("easel").childNodes[i];
		if (map[curDungeon].images.indexOf(el.id) !== -1 || options.images.indexOf(el.id) !== -1) {
			iconStylex = parseInt(el.style.left) + parseInt(el.style.marginLeft) + DUNGEON_WINDOW_WIDTH;
			iconStyley = parseInt(el.style.top) + parseInt(el.style.marginTop);
			if (x >= iconStylex && x < iconStylex + FREEIMG_SIZE
				&& y >= iconStyley && y < iconStyley + FREEIMG_SIZE)
				return el.id;
		}
	}
	return -1;
}

//delete the latest icon under the cursor
//returns true if an icon was deleted
function tryToDeleteHoveredIcon(event) {
	var iconid = findHoveredIcon(event.pageX, event.pageY);
	if (iconid !== -1) {
		document.getElementById(iconid).remove();
		document.getElementById("i_"+iconid).remove();
		if (map[curDungeon].images.indexOf(iconid) !== -1)
			map[curDungeon].images.splice(map[curDungeon].images.indexOf(iconid), 1);
		else
			options.images.splice(options.images.indexOf(iconid), 1);
		return true;
	}
	return false;
}

//returns list of ids of icons in the specified room
function findIconsInRoom(roomNum) {
	var iconArray = new Array();
	for (var i = 0; i < map[curDungeon].images.length; i++) {
		if (getRoomNumFromID(map[curDungeon].images[i]) === roomNum)
			iconArray.push(map[curDungeon].images[i]);
	}
	return iconArray;
}

//deletes all free-standing icons for the specified room tile
function deleteIconsFromRoom(roomNum) {
	var icons = findIconsInRoom(roomNum);
	for (var i = icons.length - 1; i >= 0; i--) {
		document.getElementById(icons[i]).remove();
		document.getElementById("i_"+icons[i]).remove();
		map[curDungeon].images.splice(map[curDungeon].images.indexOf(icons[i]), 1);
	}
}


//*** CONNECTOR HELPERS

//Returns true if room+exit matches options.connectStart
function isStartConnectExit(room, exit) {
	return ((options.mode === "connect" || options.connectPlus === true)
		&& options.connectStart.room === room && options.connectStart.exit === exit)
}

//Checks if start and end are already connected
//Returns index in connect array if they are, otherwise -1. Only returns first match (there should only be one)
function checkDuplicateConnector(start, end) {
	for (var i = 0; i < map[curDungeon].connects.length; i++) {
		var test = map[curDungeon].connects[i];
		if (test.show === true
			&& ((test.start.room === start.room && test.start.exit === start.exit && test.end.room === end.room && test.end.exit == end.exit)
				|| (test.end.room === start.room && test.end.exit === start.exit && test.start.room === end.room && test.start.exit == end.exit)))
			return i;
	}
	return -1;
}

//check to see if an exit has a connector attached to it
function isConnected(room, exit) {
	for (var i = 0; i < map[curDungeon].connects.length; i++) {
		if (map[curDungeon].connects[i].show === true
			&& ((map[curDungeon].connects[i].start.room === room && map[curDungeon].connects[i].start.exit === exit)
				|| (map[curDungeon].connects[i].end.room === room && map[curDungeon].connects[i].end.exit === exit)))
			return true;
	}
	return false;
}

//return array of objects (index,room,exit) that connect to this exit
//hidden = true will also return connectors that have show=false
function findConnections(room, exit, hidden = false) {
	var arr = new Array();
	for (var i = 0; i < map[curDungeon].connects.length; i++) {
		var connector = map[curDungeon].connects[i];
		if (connector.show === true || hidden === true) {
			if (connector.start.room === room && connector.start.exit === exit)
				arr.push({index:i, room:connector.end.room, exit:connector.end.exit});
			else if (connector.end.room === room && connector.end.exit === exit)
				arr.push({index:i, room:connector.start.room, exit:connector.start.exit});
		}
	}
	return arr;
}

//looks through the connectors of the current dungeon and deletes connectors that share an endpoint with the specified connector
function handleOldConnectors(connector) {
	var deleted = false;
	var startRoom = connector.start.room;
	var startExit = connector.start.exit;
	var endRoom = connector.end.room;
	var endExit = connector.end.exit;
	for (var i = map[curDungeon].connects.length - 1; i >= 0; i--) {
		var testConnector = map[curDungeon].connects[i];
		if ((testConnector.start.room === startRoom && testConnector.start.exit === startExit)
			|| (testConnector.start.room === endRoom && testConnector.start.exit === endExit)
			|| (testConnector.end.room === startRoom && testConnector.end.exit === startExit)
			|| (testConnector.end.room === endRoom && testConnector.end.exit === endExit)) {
			map[curDungeon].connects.splice(i, 1);
			refreshExitGfx(testConnector.start.room, testConnector.start.exit);
			refreshExitGfx(testConnector.end.room, testConnector.end.exit);
			deleted = true;
		}
	}
	if (deleted === true)
		refreshLines(null, true);
}

//Mark connectors as "show" if they connect to the specified exit. Both endpoints must be visible
function reinstateConnectors(room, exit) {
	var list = findConnections(room, exit, true);
	for (var i = 0; i < list.length; i++) {
		var connector = map[curDungeon].connects[list[i].index];
		if (connector.show === false && map[curDungeon].rooms[list[i].room].exits[list[i].exit].visible === true) {
			connector.show = true;
			connector.drawn = false;
			refreshExitGfx(list[i].room, list[i].exit);
			refreshLines(null);
		}
	}
}

//adds connector to the connector list
//del indicates if you want an existing connector deleted or left alone
//returns true if connector list was added to
function addConnector(start, end, del = false) {
	var exists = checkDuplicateConnector(start, end);
	if (exists !== -1) { //it already exists, delete it
		if (del === true) {
			map[curDungeon].connects.splice(exists, 1);
			refreshExitGfx(start.room, start.exit);
			refreshExitGfx(end.room, end.exit);
			refreshLines(null, true); //redraw all connectors since we deleted one
		} //else leave it alone
	} else {
		var connect = {drawn:false, show:true};
		connect.start = {room:start.room, exit:start.exit};
		connect.end = {room:end.room, exit:end.exit};
		if (options.multipleConnectors === false)
			handleOldConnectors(connect); //remove connectors getting deleted first
		map[curDungeon].connects.push(connect);
		refreshExitGfx(start.room, start.exit);
		refreshExitGfx(end.room, end.exit);
		refreshLines(null); //draw undrawn connectors
		return true;
	}
	return false;
}

//removes all connectors to the room, in prep for deletion or replacement
//Because deletion is expected, does not refresh exit gfx
function resetConnections(roomNum) {
	var checks = new Array();
	for (var i = map[curDungeon].connects.length - 1; i >= 0; i--) {
		if (map[curDungeon].connects[i].start.room === roomNum
			|| map[curDungeon].connects[i].end.room === roomNum) {
			if (map[curDungeon].connects[i].start.room !== roomNum) {
				var del = new Object();
				del.room = map[curDungeon].connects[i].start.room;
				del.exit = map[curDungeon].connects[i].start.exit;
				checks.push(del);
			} else if (map[curDungeon].connects[i].end.room !== roomNum) {
				var del = new Object();
				del.room = map[curDungeon].connects[i].end.room;
				del.exit = map[curDungeon].connects[i].end.exit;
				checks.push(del);
			}
			map[curDungeon].connects.splice(i, 1);
		}
	}
	for (var i = 0; i < checks.length; i++) {
		refreshExitGfx(checks[i].room, checks[i].exit);
	}
	if (checks.length > 0) refreshLines(null, true); //redraw connectors if a connector was deleted
}


//*** ROOM/EXIT HELPERS

//return the state of the exit, based on the icon
function getExitState(roomNum, exitNum) {
	var exitData = map[curDungeon].rooms[roomNum].exits[exitNum];
	if (EXIT_STATE_ICONS.indexOf(exitData.icon) !== -1)
		return EXIT_STATE_ICONS.indexOf(exitData.icon);
	return 0;
}

//Cycles exit state
function cycleExitState(roomNum, exitNum) {
	var exit = map[curDungeon].rooms[roomNum].exits[exitNum];
	if (exit.visible === false) {
		exit.visible = true;
		reinstateConnectors(roomNum, exitNum);
		refreshExitGfx(roomNum, exitNum);
	} else {
		var exitState = getExitState(roomNum, exitNum);
		exitState++;
		if (exitState >= EXIT_STATE_ICONS.length) {
			exitState = 0;
			if (exitModificationAllowed(roomNum) === true) { //remove the exit
				exit.visible = false;
				var list = findConnections(roomNum, exitNum);
				for (var i = 0; i < list.length; i++) {
					map[curDungeon].connects[list[i].index].show = false;
					refreshExitGfx(list[i].room, list[i].exit);
				}
				if (list.length > 0) refreshLines(null, true); //redraw all because some are invisible now
			}
		}
		exit.icon = EXIT_STATE_ICONS[exitState];
		refreshExitGfx(roomNum, exitNum);
		updateDungeonCounterText(curDungeon);
	}
}

//Sets icon of exit to the specified value
//Syncs state depending on the icon
//Creates room and exit if they were not before
function assignIconToExit(room, exit, iconName) {
	var roomData = map[curDungeon].rooms[room];
	var exitData = roomData.exits[exit];
	roomData.visible = true;
	exitData.visible = true;
	exitData.icon = iconName;
	updateDungeonCounterText(curDungeon);
	refreshRoomGfx(room);
	refreshExitGfx(room, exit);
}

//Deletes the exit and all its connections
function deleteExit(roomNum, exitNum) {
	map[curDungeon].rooms[roomNum].exits[exitNum].visible = false;
	map[curDungeon].rooms[roomNum].exits[exitNum].icon = "";
	var list = findConnections(roomNum, exitNum);
	for (var i = list.length - 1; i >= 0; i--) {
		map[curDungeon].connects.splice(list[i].index, 1);
		refreshExitGfx(list[i].room, list[i].exit);
	}
	if (isStartConnectExit(roomNum, exitNum)) {
		if (options.connectPlus === true) {
			clearDynamicLine();
			options.connectPlus = false;
		} else
			cancelConnectMode();
	}
	if (list.length > 0) refreshLines(null, true);
	refreshExitGfx(roomNum, exitNum);
	updateDungeonCounterText(curDungeon);
}

//delete a room
function deleteRoom(roomNum) {
	map[curDungeon].rooms[roomNum].visible = false;
	map[curDungeon].rooms[roomNum].icon = "";
	for (var i = 0; i < EXIT_NUM; i++)
		deleteExit(roomNum, i);
	deleteIconsFromRoom(roomNum);
}

//Takes tile from specIndex special menu and places it into the specified dungeon+room
function fillTile(dungeon, specIndex, tile, destRoom) {
	var mapRoom = map[dungeon].rooms[destRoom];
	var srcRoom = specData[specIndex].rooms[tile];

	mapRoom.visible = true;
	mapRoom.icon = srcRoom.img;
	for (var j = 0; j < srcRoom.exits.length; j++) {
		mapRoom.exits[srcRoom.exits[j]].visible = true;
		mapRoom.exits[srcRoom.exits[j]].icon = "";
		
		if (options.lobbyshuffle === false || ["entrancem", "entrancew", "entrancee", "entranceb"].indexOf(srcRoom.icons[j]) === -1)
			mapRoom.exits[srcRoom.exits[j]].icon = srcRoom.icons[j];
	}
	if (dungeon === curDungeon) refreshRoomAndExitsGfx(destRoom)

	if (specData[specIndex].rooms[tile].imgs !== undefined) {
		for (var j = 0; j < specData[specIndex].rooms[tile].imgs.length; j++) {
			var icon = specData[specIndex].rooms[tile].imgs[j].img;
			if (icon === "potkey")
				icon = (options.potsanity === true ? "chest" : "")
			else if (icon === "potbigkey")
				icon = (options.potsanity === true ? "chest" : "")

			var coord = calcRoomCoord(destRoom);
			var imgx = DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + specData[specIndex].rooms[tile].imgs[j].x;
			var imgy = MAP_OFFSET_Y + coord.y + specData[specIndex].rooms[tile].imgs[j].y;
			if (icon !== "")
				addFreeStandingIconElement(imgx, imgy, icon, dungeon);
		}
	}
	updateDungeonCounterText(dungeon);
}

//Pre-defined tile placer
function specialHandler(destRoom) {
	var specIndex = options.special;

	if (specData[specIndex].multi === true) { //Multi-linked room placement
		var validRoom = new Array();
		for (var i = 0; i < specData[specIndex].rooms.length; i++)
			if (destRoom + i * NUM_MAP_COLUMNS < ROOM_NUM)
				validRoom[i] = true;
			else
				validRoom[i] = false;
		
		//delete whatever was there before
		for (var i = 0; i < specData[specIndex].rooms.length; i++)
			if (validRoom[i] === true)
				deleteRoom(destRoom + i * NUM_MAP_COLUMNS);
			
		for (var i = 0; i < specData[specIndex].rooms.length; i++)
			if (validRoom[i] === true)
				fillTile(curDungeon, specIndex, i, destRoom + i * NUM_MAP_COLUMNS);
		
		if (specData[specIndex].connectors !== undefined) {
			for (var i = 0; i < specData[specIndex].connectors.length; i++) {
				var conn = specData[specIndex].connectors[i];
				if (validRoom[conn.room1] === true && validRoom[conn.room2] === true) {
					var startRoom = destRoom + conn.room1 * NUM_MAP_COLUMNS;
					var endRoom = destRoom + conn.room2 * NUM_MAP_COLUMNS;
					addConnector({room:startRoom, exit:conn.exit1}, {room:endRoom, exit:conn.exit2});
				}
			}
		}

	} else { //Single room placement
		deleteRoom(destRoom);
		fillTile(curDungeon, specIndex, options.state[specIndex], destRoom);
	}
}






//Place pre-defined tiles
function InitializeDungeonMaps() {
	for (var i = 0; i < 13; i++)
		for (var j = 0; j < map[i].images.length; j++) {
			document.getElementById("i_"+map[i].images[j]).remove();
			document.getElementById(map[i].images[j]).remove();
		}
	for (var j = 0; j < options.images.length; j++) {
		document.getElementById("i_"+options.images[j]).remove();
		document.getElementById(options.images[j]).remove();
	}
	for (var i = 0; i < 13; i++) {
		var dungStyle = document.getElementById("dung"+i).style;
		dungStyle.backgroundImage = "url(images/dung"+i+".png)";
	}
	resetAll();
	fillTile(0, 3, 8, 7); //escape drop
	fillTile(8, 8, 8, 18); //TT jail
	fillTile(9, 8, 25, 18); //IP boss
	if (options.lobbyshuffle === false) {
		fillTile(0, 3, 0, 17);//HCM
		fillTile(0, 3, 1, 16);//HCW
		fillTile(0, 3, 2, 18);//HCE
		fillTile(0, 3, 7, 6);//Sanc
		fillTile(1, 4, 3, 17);//EP
		fillTile(2, 5, 0, 17); //DPM
		fillTile(2, 5, 1, 18); //DPE
		fillTile(2, 5, 4, 16); //DPW
		fillTile(2, 5, 5, 6);//DPB
		fillTile(4, 6, 9, 17);//AT
		fillTile(5, 6, 0, 17);//PoD
		fillTile(6, 7, 7, 17);//SP
		fillTile(7, 7, 12, 7);//SWE
		fillTile(7, 7, 13, 13);//SWB
		fillTile(8, 8, 0, 17);//TT
		fillTile(9, 8, 13, 17);//IP
		fillTile(10, 9, 6, 17);//MM
		fillTile(11, 10, 5, 18);//TRM
		fillTile(11, 10, 3, 17);//TRE
		fillTile(11, 10, 6, 16);//TRW
		fillTile(11, 10, 7, 6);//TRB
		fillTile(12, 11, 0, 17);//GT
	}
	
	//These tiles not selectable by user
	
	//Hera5
	map[3].rooms[2].visible = true;
	map[3].rooms[2].icon = "heradrops";
	map[3].rooms[2].exits[4].visible = true;
	map[3].rooms[2].exits[10].visible = true;
	map[3].rooms[2].exits[10].icon = "pit";
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(2).x+32, 33+(64+32)*0+32, "boss", 3);

	//Hera4
	map[3].rooms[7].visible = true;
	map[3].rooms[7].icon = "heradrop4";
	map[3].rooms[7].exits[1].visible = true;
	map[3].rooms[7].exits[3].visible = true;
	map[3].rooms[7].exits[4].visible = true;
	map[3].rooms[7].exits[10].visible = true;
	map[3].rooms[7].exits[1].icon = "entrancedrop";
	map[3].rooms[7].exits[10].icon = "pit";

	//Hera3
	map[3].rooms[12].visible = true;
	map[3].rooms[12].icon = "heradrop3";
	map[3].rooms[12].exits[1].visible = true;
	map[3].rooms[12].exits[3].visible = true;
	map[3].rooms[12].exits[4].visible = true;
	map[3].rooms[12].exits[10].visible = true;
	map[3].rooms[12].exits[1].icon = "entrancedrop";
	map[3].rooms[12].exits[10].icon = "pit";
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(12).x+32, 33+(64+32)*2+24, "hint", 3);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(12).x+32, 33+(64+32)*2+16, "bigchest", 3);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(12).x+32, 33+(64+32)*2+32, "chest", 3);

	//Hera2
	map[3].rooms[17].visible = true;
	map[3].rooms[17].icon = "heradrop2";
	map[3].rooms[17].exits[1].visible = true;
	map[3].rooms[17].exits[4].visible = true;
	map[3].rooms[17].exits[8].visible = true;
	map[3].rooms[17].exits[10].visible = true;
	map[3].rooms[17].exits[1].icon = "entrancedrop";
	map[3].rooms[17].exits[10].icon = "pit";
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(17).x+48, 33+(64+32)*3+32, "xtalswitch", 3);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(17).x+16, 33+(64+32)*3+32, "ditems_bk", 3);

	//Hera1
	map[3].rooms[22].visible = true;
	map[3].rooms[22].icon = "heradrop1";
	map[3].rooms[22].exits[0].visible = true;
	map[3].rooms[22].exits[1].visible = true;
	map[3].rooms[22].exits[7].visible = true;
	map[3].rooms[22].exits[8].visible = true;
	map[3].rooms[22].exits[10].visible = true;
	map[3].rooms[22].exits[1].icon = "entrancedrop";
	if (options.lobbyshuffle === false)
		map[3].rooms[22].exits[10].icon = "entrancem";
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(22).x+32, 33+(64+32)*4+24, "hint", 3);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(22).x+32, 33+(64+32)*4+16, "chest", 3);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(22).x+32, 33+(64+32)*4+40, "switch1", 3);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(22).x+32, 33+(64+32)*4+48, "xtalswitch", 3);

	//Hera connectors
	map[3].connects[0] = {};
	map[3].connects[0].start = {room:2, exit:10};
	map[3].connects[0].end = {room:7, exit:1};
	map[3].connects[0].drawn = false;
	map[3].connects[0].show = true;
	map[3].connects[1] = {};
	map[3].connects[1].start = {room:7, exit:10};
	map[3].connects[1].end = {room:12, exit:1};
	map[3].connects[1].drawn = false;
	map[3].connects[1].show = true;
	map[3].connects[2] = {};
	map[3].connects[2].start = {room:12, exit:10};
	map[3].connects[2].end = {room:17, exit:1};
	map[3].connects[2].drawn = false;
	map[3].connects[2].show = true;
	map[3].connects[3] = {};
	map[3].connects[3].start = {room:17, exit:10};
	map[3].connects[3].end = {room:22, exit:1};
	map[3].connects[3].drawn = false;
	map[3].connects[3].show = true;
	
	//SW big chest
	map[7].rooms[12].visible = true;
	map[7].rooms[12].exits[7].visible = true;
	map[7].rooms[12].exits[9].visible = true;
	map[7].rooms[12].exits[11].visible = true;
	map[7].rooms[12].icon = "swdrop3";
	if (options.lobbyshuffle === false)
		map[7].rooms[12].exits[9].icon = "entrancem";
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(12).x+16, 33+(64+32)*2+40, "bigchest", 7);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(12).x+56, 33+(64+32)*2+40, "chest", 7);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(12).x+48, 33+(64+32)*2+16, "entrancedrop", 7);

	//SW compass
	map[7].rooms[16].visible = true;
	map[7].rooms[16].icon = "swdrop1";
	map[7].rooms[16].exits[2].visible = true;
	map[7].rooms[16].exits[8].visible = true;
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(16).x+48, 33+(64+32)*3+32, "chest", 7);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(16).x+16, 33+(64+32)*3+16, "entrancedrop", 7);

	//SW pinball
	map[7].rooms[17].visible = true;
	map[7].rooms[17].icon = "swdrop2";
	map[7].rooms[17].exits[2].visible = true;
	map[7].rooms[17].exits[7].visible = true;
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(17).x+32, 33+(64+32)*3+32, "chest", 7);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(17).x+32, 33+(64+32)*3+16, "entrancedrop", 7);

	//SW middle drop
	map[7].rooms[6].visible = true;
	map[7].rooms[6].icon = "swdrop4";
	map[7].rooms[6].exits[9].visible = true;
	map[7].rooms[6].exits[8].visible = true;
	if (options.lobbyshuffle === false)
		map[7].rooms[6].exits[9].icon = "entrancew";
	if (options.potsanity === true)
		addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(6).x+8, 33+(64+32)*1+40, "chest", 7);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(6).x+48, 33+(64+32)*1+16, "entrancedrop", 7);

	//SW boss drop
	map[7].rooms[8].visible = true;
	map[7].rooms[8].icon = "xswboss";
	map[7].rooms[8].exits[9].visible = true;
	if (options.potsanity === true)
		addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(3).x+8, 33+(64+32)*1+40, "chest", 7);
	addFreeStandingIconElement(DUNGEON_WINDOW_WIDTH+DUNGEON_SCRATCH_WIDTH+calcRoomCoord(3).x+48, 33+(64+32)*1+16, "boss", 7);

	for (var i = 0; i < 13; i++) {
		updateDungeonCounterText(i);
	}
}

