//Helper calculation functions

/*MAGIC NUMBER FUNCTIONS*/
//Positions exit boxes
function translateExitPos(indexStr) {
	var index = parseInt(indexStr)
	var coord = {};
	switch (index) {
		case 0: coord.x = 4; coord.y = -8; break;
		case 1: coord.x = 24; coord.y = -8; break;
		case 2: coord.x = 44; coord.y = -8; break;
		case 3: coord.x = -8; coord.y = 4; break;
		case 4: coord.x = 56; coord.y = 4; break;
		case 5: coord.x = -8; coord.y = 24; break;
		case 6: coord.x = 56; coord.y = 24; break;
		case 7: coord.x = -8; coord.y = 44; break;
		case 8: coord.x = 56; coord.y = 44; break;
		case 9: coord.x = 4; coord.y = 56; break;
		case 10: coord.x = 24; coord.y = 56; break;
		case 11: coord.x = 44; coord.y = 56; break;
		default: coord.x = 0; coord.y = 0; break;
	}
	return coord;
}

/*GENERIC HELPER FUNCTIONS*/

//Calculate x/y coord of room (upper left corner)
function calcRoomCoord(room) {
	var coord = {};
	coord.x = (room % NUM_MAP_COLUMNS) * (ROOM_SIZE + ROOM_PADDING) + ROOM_PADDING;
	coord.y = parseInt(room / NUM_MAP_COLUMNS) * (ROOM_SIZE + ROOM_PADDING) + ROOM_PADDING;
	return coord;
}

//Count how many chest and big chest icons there are
function countChests(dungeon) {
	chestCount = 0;
	map[dungeon].images.forEach(function(img, imgNum) {
		if (img.img === "chest" || img.img === "bigchest")
			chestCount++;
	});
	for (var i = 0; i < ROOM_NUM; i++)
		for (var j = 0; j < EXIT_NUM; j++) {
			if (map[dungeon].rooms[i].exits[j].icon === "chest" || map[dungeon].rooms[i].exits[j].icon === "bigchest")
				chestCount++;
		}
	return chestCount;
}

//Find if we are hovering over an icon (x and y are event.pageX/event.pageY coords)
//Returns the latest (topmost) icon index, -1 if no icon found
function findHoveredIcon(x, y) {
	if (x >= DUNGEON_WINDOW_WIDTH && x < DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + MAP_SIZE
		&& y >= MAP_OFFSET_Y && y < MAP_OFFSET_Y + MAP_SIZE)
		for (var i = map[curDungeon].images.length - 1; i >= 0; i--) {
			if (x - DUNGEON_WINDOW_WIDTH >= map[curDungeon].images[i].x - FREEIMG_SIZE/2
				&& y - MAP_OFFSET_Y >= map[curDungeon].images[i].y - FREEIMG_SIZE/2
				&& x - DUNGEON_WINDOW_WIDTH <= map[curDungeon].images[i].x + FREEIMG_SIZE/2
				&& y - MAP_OFFSET_Y <= map[curDungeon].images[i].y + FREEIMG_SIZE/2) {
				return i;
			}
		}
	return -1;
}

//Find if we are hovering over an icon (x and y are event.pageX/event.pageY coords)
//Returns the latest (topmost) icon index, -1 if no icon found
function findHoveredScratchIcon(x, y) {
	if (x >= DUNGEON_WINDOW_WIDTH && x < DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + MAP_SIZE
		&& y >= MAP_OFFSET_Y && y < MAP_OFFSET_Y + MAP_SIZE)
		for (var i = options.images.length - 1; i >= 0; i--) {
			if (x - DUNGEON_WINDOW_WIDTH >= options.images[i].x - FREEIMG_SIZE/2
				&& y - MAP_OFFSET_Y >= options.images[i].y - FREEIMG_SIZE/2
				&& x - DUNGEON_WINDOW_WIDTH <= options.images[i].x + FREEIMG_SIZE/2
				&& y - MAP_OFFSET_Y <= options.images[i].y + FREEIMG_SIZE/2) {
				return i;
			}
		}
	return -1;
}

//Checks if start and end are already connected
//Returns index in connect array if they are, otherwise -1. Only returns first match (there should only be one)
function checkExistingConnector(start, end) {
	for (var i = 0; i < map[curDungeon].connects.length; i++) {
		var test = map[curDungeon].connects[i];
		if ((test.start.room === start.room && test.start.exit === start.exit && test.end.room === end.room && test.end.exit == end.exit)
			|| (test.end.room === start.room && test.end.exit === start.exit && test.start.room === end.room && test.start.exit == end.exit))
			return i;
	}
	return -1;
}

//adds connector to the connector list only. no room/exit state changes
//del indicates if you want an existing connector deleted or left alone
//returns true if connector list was added to
function addConnector(start, end, del = false) {
	var exists = checkExistingConnector(start, end);
	if (exists !== -1) { //it already exists, delete it
		if (del === true)
			map[curDungeon].connects.splice(exists, 1);
		//else leave it alone
	} else {
		var connect = {};
		connect.start = {room:start.room, exit:start.exit};
		connect.end = {room:end.room, exit:end.exit};
		map[curDungeon].connects.push(connect);
		return true;
	}
	return false;
}

//cycles exit state
function cycleExitState(roomNum, exitNum) {
	exit = map[curDungeon].rooms[roomNum].exits[exitNum];
	if (exit.visible === false)
		if (options.disableExits === true)
			; //do nothing
		else
			exit.visible = true;
	else {
		exit.state++;
		if (exit.state >= EXIT_STATE_NUM) {
			if (options.disableExits === true && map[curDungeon].rooms[roomNum].icon !== "")
				; //do not turn off
			else
				exit.visible = false;
			exit.state = 0;
			exit.icon = "";
		}
	}
}

function findIconsInRoom(roomNum) {
	var iconArray = new Array();
	var rowSrc = parseInt(roomNum / NUM_MAP_COLUMNS);
	var colSrc = roomNum % NUM_MAP_COLUMNS;
	var SrcminX = DUNGEON_SCRATCH_WIDTH + ROOM_PADDING/2 + colSrc * (ROOM_SIZE + ROOM_PADDING);
	var SrcmaxX = DUNGEON_SCRATCH_WIDTH + ROOM_PADDING/2 + (colSrc + 1) * (ROOM_SIZE + ROOM_PADDING);
	var SrcminY = ROOM_PADDING/2 + rowSrc * (ROOM_SIZE + ROOM_PADDING);
	var SrcmaxY = ROOM_PADDING/2 + (rowSrc + 1) * (ROOM_SIZE + ROOM_PADDING);
	for (var i = map[curDungeon].images.length - 1; i >= 0; i--) {
		if (map[curDungeon].images[i].x > SrcminX && map[curDungeon].images[i].x <= SrcmaxX
			&& map[curDungeon].images[i].y > SrcminY && map[curDungeon].images[i].y <= SrcmaxY) {
			iconArray.push(i);
		}
	}
	return iconArray;
}

//deletes all free-standing icons for the specified room tile
function deleteIconsFromRoom(roomNum) {
	var icons = findIconsInRoom(roomNum);
	for (var i = 0; i < icons.length; i++) {
		map[curDungeon].images.splice(icons[i], 1);
	}
}

//removes all connectors to the room, in prep for deletion or replacement
function resetConnections(roomNum) {
	for (var i = map[curDungeon].connects.length - 1; i >= 0; i--) {
		if (map[curDungeon].connects[i].start.room === roomNum
			|| map[curDungeon].connects[i].end.room === roomNum)
			map[curDungeon].connects.splice(i, 1);
	}
}



function deleteExit(roomNum, exitNum) {
	map[curDungeon].rooms[roomNum].exits[exitNum].visible = false;
	map[curDungeon].rooms[roomNum].exits[exitNum].state = 0;
	map[curDungeon].rooms[roomNum].exits[exitNum].icon = "";
}

//delete a room
//For some reason, need to wipe/redraw images outside of this function
function deleteRoom(roomNum) {
	map[curDungeon].rooms[roomNum].visible = false;
	map[curDungeon].rooms[roomNum].icon = "";
	for (var i = 0; i < EXIT_NUM; i++)
		deleteExit(roomNum, i);

	resetConnections(roomNum);
	refreshLines(event); //remove connections

	deleteIconsFromRoom(roomNum);
}

function fillTile(dungeon, specIndex, tile, destRoom) {
	var mapRoom = map[dungeon].rooms[destRoom];
	var srcRoom = specData[specIndex].rooms[tile];

	mapRoom.visible = true;
	mapRoom.icon = srcRoom.img;
	for (var j = 0; j < srcRoom.exits.length; j++) {
		mapRoom.exits[srcRoom.exits[j]].visible = true;
		mapRoom.exits[srcRoom.exits[j]].state = 0;
		
		if (srcRoom.icons[j].substring(0, 8) === "entrance" && options.lobbyshuffle === true && srcRoom.icons[j].substring(8) !== "drop")
			; //don't fill this entrance icon
		else
			mapRoom.exits[srcRoom.exits[j]].icon = srcRoom.icons[j];
	}

	if (specData[specIndex].rooms[tile].imgs !== undefined) {
		for (var j = 0; j < specData[specIndex].rooms[tile].imgs.length; j++) {
			var newImg = {};
			newImg.img = specData[specIndex].rooms[tile].imgs[j].img;
			
			//don't push keydrops for now
			if (newImg.img === "potkey")
				newImg.img = (options.potsanity === true ? "chest" : "");
			else if (newImg.img === "potbigkey")
				newImg.img = (options.potsanity === true ? "chest" : "");
			
			var coord = calcRoomCoord(destRoom);
			newImg.x = DUNGEON_SCRATCH_WIDTH + coord.x + specData[specIndex].rooms[tile].imgs[j].x;
			newImg.y = coord.y + specData[specIndex].rooms[tile].imgs[j].y;
			newImg.drawn = false;
			if (newImg.img !== "")
				map[dungeon].images.push(newImg);
		}
	}
}

//Place pre-defined tiles
function InitializeDungeonMaps() {
	resetAll();
	fillTile(0, 3, 8, 7); //escape drop
	fillTile(8, 8, 8, 18); //TT jail
	fillTile(9, 8, 22, 18); //IP boss
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
		fillTile(4, 6, 8, 17);//AT
		fillTile(5, 6, 0, 17);//PoD
		fillTile(6, 7, 7, 17);//SP
		fillTile(7, 7, 12, 7);//SWE
		fillTile(7, 7, 13, 13);//SWB
		fillTile(8, 8, 0, 17);//TT
		fillTile(9, 8, 14, 17);//IP
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
	map[3].images.push({drawn:false, img:"boss", x:38+32+(64+32)*2+32, y:32+(64+32)*0+32});

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
	map[3].images.push({drawn:false, img:"hint", x:38+32+(64+32)*2+32, y:32+(64+32)*2+24});
	map[3].images.push({drawn:false, img:"bigchest", x:38+32+(64+32)*2+32, y:32+(64+32)*2+16});
	map[3].images.push({drawn:false, img:"chest", x:38+32+(64+32)*2+32, y:32+(64+32)*2+32});

	//Hera2
	map[3].rooms[17].visible = true;
	map[3].rooms[17].icon = "heradrop2";
	map[3].rooms[17].exits[1].visible = true;
	map[3].rooms[17].exits[4].visible = true;
	map[3].rooms[17].exits[8].visible = true;
	map[3].rooms[17].exits[10].visible = true;
	map[3].rooms[17].exits[1].icon = "entrancedrop";
	map[3].rooms[17].exits[10].icon = "pit";
	map[3].images.push({drawn:false, img:"xtalswitch", x:38+32+(64+32)*2+48, y:32+(64+32)*3+32});
	map[3].images.push({drawn:false, img:"ditems_bk", x:38+32+(64+32)*2+16, y:32+(64+32)*3+32});

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
	map[3].images.push({drawn:false, img:"hint", x:38+32+(64+32)*2+32, y:32+(64+32)*4+24});
	map[3].images.push({drawn:false, img:"chest", x:38+32+(64+32)*2+32, y:32+(64+32)*4+16});
	map[3].images.push({drawn:false, img:"switch1", x:38+32+(64+32)*2+32, y:32+(64+32)*4+40});
	map[3].images.push({drawn:false, img:"xtalswitch", x:38+32+(64+32)*2+32, y:32+(64+32)*4+48});

	//Hera connectors
	map[3].connects[0] = {};
	map[3].connects[0].start = {room:2, exit:10};
	map[3].connects[0].end = {room:7, exit:1};
	map[3].connects[1] = {};
	map[3].connects[1].start = {room:7, exit:10};
	map[3].connects[1].end = {room:12, exit:1};
	map[3].connects[2] = {};
	map[3].connects[2].start = {room:12, exit:10};
	map[3].connects[2].end = {room:17, exit:1};
	map[3].connects[3] = {};
	map[3].connects[3].start = {room:17, exit:10};
	map[3].connects[3].end = {room:22, exit:1};
	
	//SW big chest
	map[7].rooms[12].visible = true;
	map[7].rooms[12].exits[7].visible = true;
	map[7].rooms[12].exits[9].visible = true;
	map[7].rooms[12].exits[11].visible = true;
	map[7].rooms[12].icon = "swdrop3";
	if (options.lobbyshuffle === false)
		map[7].rooms[12].exits[9].icon = "entrancem";
	map[7].images.push({drawn:false, img:"bigchest", x:38+32+(64+32)*2+16, y:32+(64+32)*2+40});
	map[7].images.push({drawn:false, img:"chest", x:38+32+(64+32)*2+56, y:32+(64+32)*2+40});
	map[7].images.push({drawn:false, img:"entrancedrop", x:38+32+(64+32)*2+48, y:32+(64+32)*2+16});

	//SW compass
	map[7].rooms[16].visible = true;
	map[7].rooms[16].icon = "swdrop1";
	map[7].rooms[16].exits[2].visible = true;
	map[7].rooms[16].exits[8].visible = true;
	map[7].images.push({drawn:false, img:"chest", x:38+32+(64+32)*1+48, y:32+(64+32)*3+32});
	map[7].images.push({drawn:false, img:"entrancedrop", x:38+32+(64+32)*1+16, y:32+(64+32)*3+16});

	//SW pinball
	map[7].rooms[17].visible = true;
	map[7].rooms[17].icon = "swdrop2";
	map[7].rooms[17].exits[2].visible = true;
	map[7].rooms[17].exits[7].visible = true;
	map[7].images.push({drawn:false, img:"chest", x:38+32+(64+32)*2+32, y:32+(64+32)*3+32});
	map[7].images.push({drawn:false, img:"entrancedrop", x:38+32+(64+32)*2+32, y:32+(64+32)*3+16});

	//SW middle drop
	map[7].rooms[6].visible = true;
	map[7].rooms[6].icon = "swdrop4";
	map[7].rooms[6].exits[9].visible = true;
	map[7].rooms[6].exits[8].visible = true;
	if (options.lobbyshuffle === false)
		map[7].rooms[6].exits[9].icon = "entrancew";
	if (options.potsanity === true)
		map[7].images.push({drawn:false, img:"chest", x:38+32+(64+32)*1+8, y:32+(64+32)*1+40});
	map[7].images.push({drawn:false, img:"entrancedrop", x:38+32+(64+32)*1+48, y:32+(64+32)*1+16});

	//SW boss drop
	map[7].rooms[8].visible = true;
	map[7].rooms[8].icon = "xswboss";
	map[7].rooms[8].exits[9].visible = true;
	if (options.potsanity === true)
		map[7].images.push({drawn:false, img:"chest", x:38+32+(64+32)*3+8, y:32+(64+32)*1+40});
	map[7].images.push({drawn:false, img:"boss", x:38+32+(64+32)*3+48, y:32+(64+32)*1+16});

	for (var i = 0; i < 13; i++) {
		updateDungeonCounterText(i);
	}
}

//Fill in X marks if the tile has already been placed
function updatePopupMarks(dungeon) {
	for (var i = 0; i < specData[dungeon].rooms.length; i++) {
		var placed = false;
		for (var j = 0; j < 13; j++)
			for (var k = 0; k < ROOM_NUM; k++)
				if (map[j].rooms[k].icon === specData[dungeon].rooms[i].img)
					placed = true;
		var style = document.getElementById("specpop"+dungeon+"_"+i).style;
		if (placed === true) {
			style.backgroundImage = "url(\"images/halfxmark.png\"), url(\"images/"+specData[dungeon].rooms[i].img+".png\")";
		} else {
			style.backgroundImage = "url(\"images/"+specData[dungeon].rooms[i].img+".png\")";
		}
	}
}



//Pre-defined tile placer
//destRoom is the room that is being applied to
function specialHandler(destRoom) {
	var specIndex = options.special;
	var iconLength = map[curDungeon].images.length;
	var iconsDeleted = false;

	if (specData[specIndex].multi === true) {
		//Multi-linked room placement
		var validRoom = new Array();
		for (var i = 0; i < specData[specIndex].rooms.length; i++) {
			if (destRoom + i * NUM_MAP_COLUMNS < ROOM_NUM) //Old code to skip over prior placed rooms && map[curDungeon].rooms[destRoom + i * NUM_MAP_COLUMNS].visible === false)
				validRoom[i] = true;
			else
				validRoom[i] = false;
		}
		
		//delete whatever was there before
		for (var i = 0; i < specData[specIndex].rooms.length; i++) {
			if (validRoom[i] === true)
				deleteRoom(destRoom + i * NUM_MAP_COLUMNS);
		}
		if (map[curDungeon].images.length !== iconLength) iconsDeleted = true;
		
		for (var i = 0; i < specData[specIndex].rooms.length; i++) {
			if (validRoom[i] === true) {
				var mapRoom = map[curDungeon].rooms[destRoom + i * NUM_MAP_COLUMNS];
				var srcRoom = specData[specIndex].rooms[i];
				mapRoom.visible = true;
				mapRoom.icon = srcRoom.img;
				for (var j = 0; j < srcRoom.exits.length; j++) {
					mapRoom.exits[srcRoom.exits[j]].visible = true;
					mapRoom.exits[srcRoom.exits[j]].state = 0;
					mapRoom.exits[srcRoom.exits[j]].icon = srcRoom.icons[j];
				}
				
				if (specData[specIndex].rooms[i].imgs !== undefined) {
					for (var j = 0; j < specData[specIndex].rooms[i].imgs.length; j++) {
						var newImg = {};
						newImg.img = specData[specIndex].rooms[i].imgs[j].img;
						var coord = calcRoomCoord(destRoom + i * NUM_MAP_COLUMNS);
						newImg.x = DUNGEON_SCRATCH_WIDTH + coord.x + specData[specIndex].rooms[i].imgs[j].x;
						newImg.y = coord.y + specData[specIndex].rooms[i].imgs[j].y;
						newImg.drawn = false;
						map[curDungeon].images.push(newImg);
					}
				}
			}
		}
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

	} else {
		//Single room placement
		deleteRoom(destRoom);
		if (map[curDungeon].images.length !== iconLength) iconsDeleted = true;
		fillTile(curDungeon, specIndex, options.state[specIndex], destRoom);
	}
	
	if (iconsDeleted === true)
		wipeImages();
	drawImages();
}