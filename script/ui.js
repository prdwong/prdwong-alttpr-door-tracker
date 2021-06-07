const DUNGEON_HIGHLIGHT = "green";
const HOVER_OPACITY = 0.5;
const UNEXPLORED_EXIT_COLOR = "rgb(0,255,0)"; //must be rgb
const EXIT_HOVER_COLOR = "rgb(255,255,0)"; //must be rgb
const EXIT_CONNECTING_COLOR = "cyan"; //color of start exit when drawing a connector
const FREEIMG_SIZE = 16; //px
const DELETE_HOVER_COLOR = "rgba(255,0,0,0.5)";
const BAD_TILE_PLACEMENT_COLOR = "rgba(255,0,0,0.25)";
const IMG_CIRCLING_WIDTH = 2; //px
const IMG_CIRCLING_COLOR = "yellow";
const RIGHT_DEL_CIRCLING_COLOR = "rgba(0,255,0,0.75)";
const MOVING_LINE_COLOR = "maroon";
const MOVE_ARROW_SIZE = 15; //px
const DOUBLE_CLICK_TIME = 500; //ms
const POPUP_HIGHLIGHT_BORDER_COLOR = "yellow";
const POPUP_HIGHLIGHT_BORDER_WIDTH = 3; //px
const FREEIMG_EL_SIZE = FREEIMG_SIZE * Math.sqrt(2) - IMG_CIRCLING_WIDTH;
const USELESS_TILE_FADE = 0.67;

//*****
//GRAPHICAL UTILITIES
//Helpers that change how the tracker looks
//*****

//change the cursor based on options.cursor value
function setCursor() {
	var cursor = (options.cursor === "" ? "" : "url(images/icons/icon-"+options.cursor+".png), alias");
	document.getElementById("i_mapper").style.cursor = cursor;
	document.getElementById("myCanvas").style.cursor = cursor;
	document.getElementById("i_special").style.cursor = cursor;
	document.getElementById("i_iconography").style.cursor = cursor;
	document.getElementById("i_dungeons").style.cursor = cursor;
	for (var j = 0; j < specData.length; j++) {
		if (specData[j].popup === true) {
			document.getElementById("specpop"+j).style.cursor = cursor;
		}
	}
	document.getElementById("superpop").style.cursor = cursor;
}

//Update generic counter text for the dungeon
//Avoid unnecessary innerHTML assigns for perf reasons
function updateDungeonCounterText(dungeon) {
	if (dungeon === curDungeon && parseInt(document.getElementById("ind_chests").innerHTML) !== countChests(curDungeon))
		document.getElementById("ind_chests").innerHTML = countChests(curDungeon);
	if (dungeon === curDungeon && parseInt(document.getElementById("ind_keys").innerHTML) !== countKeys(curDungeon))
		document.getElementById("ind_keys").innerHTML = countKeys(curDungeon);
	var text = "";
	if (map[dungeon].counter2 > 0)
		text += map[dungeon].counter2;
	text += "<br>";
	if (options.showcounter === true)
		if (map[dungeon].counter === "?")
			text += map[dungeon].counter + "/" + countChests(dungeon); //rtl
		else
			text += countChests(dungeon) + "/" + map[dungeon].counter;
	else
		text += map[dungeon].counter;
	if (text !== document.getElementById("i_scratchtxt"+dungeon).innerHTML)
		document.getElementById("i_scratchtxt"+dungeon).innerHTML = text;
}

//Delayed call to indicate end of double-click time on room
//override forces the reversion regardless of logic
function revertDelHighlight(room, override = false) {
	if (options.lastDelete === room && window.performance.now() - options.lastDeleteTime >= DOUBLE_CLICK_TIME)
		options.lastDelete = -1; //time expired, reset to first click
	if (override === true
		|| window.performance.now() - options.lastDeleteTime >= DOUBLE_CLICK_TIME //time expired, revert
		|| options.lastDelete !== room) //click on different room could have restarted timer, but still revert if the timer is for a different room
		document.getElementById("i_room"+room).style.backgroundColor = "";
}

//Fill in X marks if the tile has already been placed
function updatePopupMarks(dungeon) {
	for (var i = 0; i < specData[dungeon].rooms.length; i++) {
		var placed = false;
		loop: for (var j = 0; j < 13; j++)
			for (var k = 0; k < ROOM_NUM; k++)
				if (map[j].rooms[k].icon === specData[dungeon].rooms[i].img) {
					placed = true;
					break loop;
				}
		var style = document.getElementById("specpop"+dungeon+"_"+i).style;
		var opacity = (specData[dungeon].rooms[i].high === true ? 1 : USELESS_TILE_FADE);
		if (placed === true) {
			document.getElementById("specpop"+dungeon+"_"+i+"_opa").style.backgroundColor = "rgba(0,0,0,"+(1-(opacity*HOVER_OPACITY))+")";
			style.backgroundImage = "url(\"images/xmark.png\"), url(\"images/"+specData[dungeon].rooms[i].img+".png\")";
		} else {
			document.getElementById("specpop"+dungeon+"_"+i+"_opa").style.backgroundColor = "rgba(0,0,0,"+(1-opacity)+")";
			style.backgroundImage = "url(\"images/"+specData[dungeon].rooms[i].img+".png\")";
		}
	}
}

//Fill in X marks if the tile has already been placed, red borders as overwrite warning
function updateSuperMarks() {
	for (var i = 0; i < superData.length; i++) {
		roomData = specData[superData[i].dungeon].rooms[superData[i].room];
		var placed = false;
		var img = roomData.img
		loop: for (var j = 0; j < 13; j++)
			for (var k = 0; k < ROOM_NUM; k++)
				if (map[j].rooms[k].icon === img) {
					placed = true;
					break loop;
				}
		var style = document.getElementById("superpop"+i).style;
		if (placed === true) {
			style.backgroundImage = "url(\"images/xmark.png\"), url(\"images/"+img+".png\")";
			document.getElementById("i_superpop"+i).style.backgroundColor = "rgba(0,0,0,"+(1-HOVER_OPACITY)+")";
		} else {
			style.backgroundImage = "url(\"images/"+img+".png\")";
			document.getElementById("i_superpop"+i).style.backgroundColor = "";
		}
		
		var style = document.getElementById("i_superpop"+i).style;
		var borderStyle = "1px solid white";
		if (superData[i].border.indexOf("u") !== -1) style.borderTop = borderStyle;
		if (superData[i].border.indexOf("d") !== -1) style.borderBottom = borderStyle;
		if (superData[i].border.indexOf("l") !== -1) style.borderLeft = borderStyle;
		if (superData[i].border.indexOf("r") !== -1) style.borderRight = borderStyle;
		
		var valid = true;
		var tiles = (superData[i].text === undefined ? 1 : specData[superData[i].dungeon].rooms.length);
		for (var j = 0; j < tiles; j++) {
			tileNum = options.superRoom + j*NUM_MAP_COLUMNS;
			if (tileNum >= ROOM_NUM
				|| map[curDungeon].rooms[tileNum].visible === true
				|| findIconsInRoom(tileNum).length > 0) {
				valid = false;
				break;
			}
		}
		if (valid === false) {
			style.borderTop = style.borderTop.replace(/white/g, "red");
			style.borderBottom = style.borderBottom.replace(/white/g, "red");
			style.borderLeft = style.borderLeft.replace(/white/g, "red");
			style.borderRight = style.borderRight.replace(/white/g, "red");
			style.borderWidth = (superData[i].text === undefined ? "2px" : "4px");
		}
	}
}

//*****
//ROOM/EXIT UPDATERS
//Controls how rooms of the main tracker looks
//*****

//Update all the exit style properties due to state of exit (no hover styling)
function refreshExitGfx(room, exit) {
	var iexitStyle = document.getElementById("i_exit"+room+"_"+exit).style;
	var exitStyle = document.getElementById("exit"+room+"_"+exit).style;
	var exitData = map[curDungeon].rooms[room].exits[exit];
	
	iexitStyle.backgroundColor = "";
	exitStyle.backgroundImage = (exitData.icon === "" ? "" : "url(images/"+exitData.icon+".png)");
	var exitOpacity = (exitData.visible === true ? 1 : 0);
	exitStyle.backgroundColor = rgb2rgba(EXIT_COLOR, exitOpacity);
	exitStyle.outlineColor = rgb2rgba(EXIT_BORDER_COLOR, exitOpacity);
	
	if (exitData.visible === true //only visible exits can be unexplored
		&& EXIT_STATE_ICONS[getExitState(room, exit)] !== "xmark" //xmark is explored
		&& (exitData.icon !== "entrancem" && exitData.icon !== "entrancew" && exitData.icon !== "entrancee" && exitData.icon !== "entranceb") //entrances are explored
		&& isConnected(room, exit) === false) { //connected exits are explored
		exitStyle.backgroundColor = UNEXPLORED_EXIT_COLOR;
		if (getExitState(room, exit) === 0 && exitData.icon !== "") //change border as well in case icon covers background color
			exitStyle.outlineColor = UNEXPLORED_EXIT_COLOR;
	}
	
	//Start connector always looks the same
	if (isStartConnectExit(room, exit) === true) { //start connector exit is always visible, no opacity
		exitStyle.backgroundColor = EXIT_CONNECTING_COLOR;
		exitStyle.outlineColor = EXIT_BORDER_COLOR;
	}
	
	if (exitData.visible === false && exitModificationAllowed(room) === false) {
		exitStyle.display = "none";
		iexitStyle.display = "none";
	} else {
		exitStyle.display = "";
		iexitStyle.display = "";
	}
}

//Update all the room style properties due to state of room (no hover styling)
function refreshRoomGfx(room) {
	var iroomStyle = document.getElementById("i_room"+room).style;
	var imageOpaqueStyle = document.getElementById("room"+room+"_opa").style;
	var roomStyle = document.getElementById("room"+room).style;
	var roomData = map[curDungeon].rooms[room];
	
	iroomStyle.backgroundColor = "";
	imageOpaqueStyle.backgroundColor = "";
	roomStyle.backgroundImage = (roomData.icon === "" ? "" : "url(images/"+roomData.icon+".png)");
	roomStyle.backgroundColor = rgb2rgba(ROOM_COLOR, (roomData.visible === true ? 1 : 0));
	
	if ((options.mode === "connect" || options.connectPlus === true)
		&& options.connectStart.room === room) {
		//make start of connector room visible
		if (roomData.visible === false)
			roomStyle.backgroundColor = rgb2rgba(ROOM_COLOR, HOVER_OPACITY);
	}
	
	if (room === options.lastDelete && window.performance.now() - options.lastDeleteTime < DOUBLE_CLICK_TIME)
		iroomStyle.backgroundColor = DELETE_HOVER_COLOR;
	//reversion handled by timeout logic or by cancelling delete mode
}

//Update all style properties of room and child exits (no hover styling)
function refreshRoomAndExitsGfx(room) {
	refreshRoomGfx(room);
	for (var i = 0; i < EXIT_NUM; i++)
		refreshExitGfx(room, i);
}

//Set style properties for all rooms and exits on the map.
function refreshAllRooms() {
	for (var i = 0; i < ROOM_NUM; i++)
		refreshRoomAndExitsGfx(i);
}

//Changes room/exit styling properties based on what the mouse is on top of
function applyHoverStyling(event) {
	//changes only apply if hovering over room or exit
	if (event.target.id.substring(2, 6) === "room" || event.target.id.substring(2, 6) === "exit") {
		var roomNum = getRoomNumFromID(event.target.id);
		var exitNum = getExitNumFromID(event.target.id);
		var roomData = map[curDungeon].rooms[roomNum];
		var roomStyle = document.getElementById("room"+roomNum).style;
		
		if (options.mode !== "special") { //default hover behavior
			if (roomData.visible === false) //ghost room if over hovering over room or exit
				roomStyle.backgroundColor = rgb2rgba(ROOM_COLOR, HOVER_OPACITY);
			
			if (exitNum === -1) { //room hover
				for (var i = 0; i < EXIT_NUM; i++) {
					var exitData = roomData.exits[i];
					var exitStyle = document.getElementById("exit"+roomNum+"_"+i).style;
					if (exitData.visible === false && isStartConnectExit(roomNum, i) === false) {
						exitStyle.backgroundColor = rgb2rgba(EXIT_COLOR, HOVER_OPACITY * HOVER_OPACITY);
						exitStyle.outlineColor = EXIT_BORDER_COLOR;
					}
				}
			} else { //exit hover
				var exitData = roomData.exits[exitNum];
				var exitStyle = document.getElementById("exit"+roomNum+"_"+exitNum).style;
				if (isStartConnectExit(roomNum, exitNum) === false) { //no change if hovering over start connection
					if (roomData.visible === true) { //hovering over an exit in a real room
						if (exitData.visible === false) {
							exitStyle.backgroundColor = rgb2rgba(EXIT_HOVER_COLOR, HOVER_OPACITY); //ghost exit
							exitStyle.outlineColor = EXIT_BORDER_COLOR;
						} else { //real exit
							exitStyle.backgroundColor = EXIT_HOVER_COLOR;
							exitStyle.outlineColor = EXIT_BORDER_COLOR;
						}
					} else { //hovering over an exit in a ghost room
						exitStyle.backgroundColor = rgb2rgba(EXIT_HOVER_COLOR, HOVER_OPACITY * HOVER_OPACITY);
						exitStyle.outlineColor = EXIT_BORDER_COLOR;
					}
				}
				if (exitData.visible === true && isConnected(roomNum, exitNum) === true) { //highlight matching exit
					var list = findConnections(roomNum, exitNum);
					for (var i = 0; i < list.length; i++) {
						if (map[curDungeon].rooms[list[i].room].exits[list[i].exit].visible === true && isStartConnectExit(list[i].room, list[i].exit) === false)
							document.getElementById("exit"+list[i].room+"_"+list[i].exit).style.backgroundColor = EXIT_HOVER_COLOR;
					}
				}
			}
		} else if (options.cursor === "delete") {
			if (exitNum !== -1) { //highlight exit for deletion
				var exitData = roomData.exits[exitNum];
				var exitStyle = document.getElementById("exit"+roomNum+"_"+exitNum).style;
				if (exitData.visible === true && exitModificationAllowed(roomNum)) {
					document.getElementById("i_exit"+roomNum+"_"+exitNum).style.backgroundColor = DELETE_HOVER_COLOR;
					exitStyle.backgroundColor = EXIT_COLOR;
					exitStyle.outlineColor = EXIT_BORDER_COLOR;
				}
			}
		} else { //special mode that's not delete
			//pre-defined tile previews if over room or exit
			var startDataNum = options.state[options.special]; //first tile preview
			var specialLength = (specData[options.special].multi === true ? specData[options.special].rooms.length : 1);
			var valid = true; //no overwriting
			for (var i = 0; i < specialLength; i++) {
				var tileNum = roomNum + NUM_MAP_COLUMNS * i;
				if (tileNum >= ROOM_NUM || map[curDungeon].rooms[tileNum].visible === true || findIconsInRoom(tileNum).length > 0) {
					valid = false; //some overwrite
					break;
				}
			}
			for (var i = 0; i < specialLength; i++) {
				var tileNum = roomNum + NUM_MAP_COLUMNS * i;
				var roomCheck = document.getElementById("room"+tileNum);
				if (roomCheck !== null) {
					roomCheck.style.backgroundImage = "url(images/"+specData[options.special].rooms[startDataNum+i].img+".png)";
					document.getElementById("room"+tileNum+"_opa").style.backgroundColor = "rgba(0,0,0,"+HOVER_OPACITY+")";
					//roomCheck.style.filter = "brightness("+(HOVER_OPACITY*100)+"%)";
					if (valid === false) {
						roomCheck.style.backgroundImage = "url(images/xmark.png), " + roomCheck.style.backgroundImage;
						document.getElementById("i_room"+tileNum).style.backgroundColor = BAD_TILE_PLACEMENT_COLOR;
					}
					for (var j = 0; j < EXIT_NUM; j++) {
						var exitExists = (specData[options.special].rooms[startDataNum+i].exits.indexOf(j) !== -1)
						if (exitExists) {
							roomCheck.childNodes[EXIT_NUM-j-1+1].style.backgroundColor = rgb2rgba(UNEXPLORED_EXIT_COLOR, HOVER_OPACITY);
							roomCheck.childNodes[EXIT_NUM-j-1+1].style.outlineColor = EXIT_BORDER_COLOR;
							roomCheck.childNodes[EXIT_NUM-j-1+1].style.display = "";
							
							if (valid === false)
								document.getElementById("i_exit"+tileNum+"_"+j).style.backgroundColor = BAD_TILE_PLACEMENT_COLOR;
						} else {
							roomCheck.childNodes[EXIT_NUM-j-1+1].style.display = "none";
						}
					}
				}
			}
		}
	}
	
	highlightHoverIcon(event);
}

//enables border for free-standing icon under mouse, if appropriate
//dungeon icons take priority over scratch icon
//later icons take priority over earlier icons
function highlightHoverIcon(event) {
	var circleColor = "";
	if (options.mode === "special" && options.cursor === "delete")
		circleColor = IMG_CIRCLING_COLOR;
	else if (options.rightErase === true) {
		circleColor = RIGHT_DEL_CIRCLING_COLOR;
	} else
		return; //no icon highlights
	
	if (event.target.id.substring(2, 6) === "exit") { //interactable
		if (options.rightErase === true)
			return;
		if (map[curDungeon].rooms[getRoomNumFromID(event.target.id)].exits[getExitNumFromID(event.target.id)].visible === true)
			return; //deletable
	}
	
	var iconid = findHoveredIcon(event.pageX, event.pageY);
	if (iconid !== -1) {
		document.getElementById("i_"+iconid).style.borderColor = circleColor;
	}
}

//*****
//CANVAS FUNCTIONS
//Drawing on canvas
//*****

//Creates elements for a free standing icon and adds it to the data structs
//pass "scratch7" to add a free standing icon to dungeon 7 scratch space
function addFreeStandingIconElement(x, y, img = options.cursor, dungeon = curDungeon) {
	var icontd = document.createElement("div");
	var scratchicon = (dungeon.toString().substring(0, 7) === "scratch");

	if (scratchicon === false) {
		var col = (x - DUNGEON_WINDOW_WIDTH - DUNGEON_SCRATCH_WIDTH - ROOM_PADDING/2) / (ROOM_SIZE + ROOM_PADDING);
		var row = (y - MAP_OFFSET_Y - ROOM_PADDING/2) / (ROOM_SIZE + ROOM_PADDING);
		var roomNum = parseInt(col) + parseInt(row) * NUM_MAP_COLUMNS;
		if (row < 0 || col < 0 || parseInt(col) >= NUM_MAP_COLUMNS || roomNum >= ROOM_NUM)
			roomNum = "A"; //outside of any room
		icontd.id = "free"+dungeon+"_"+roomNum+"_"+options.imageNum;
	} else
		icontd.id = "free"+dungeon.substring(7)+"_"+options.imageNum;
	
	icontd.class = "noselect";
	icontd.style.position = "absolute";
	icontd.style.height = FREEIMG_SIZE;
	icontd.style.width = FREEIMG_SIZE;
	icontd.style.top = y;
	icontd.style.left = x - DUNGEON_WINDOW_WIDTH;
	icontd.style.marginLeft = -(FREEIMG_SIZE / 2);
	icontd.style.marginTop = -(FREEIMG_SIZE / 2);
	icontd.style.padding = "0px";
	icontd.style.backgroundRepeat = "no-repeat";
	icontd.style.backgroundPosition = "center";
	icontd.style.backgroundImage = "url(images/"+img+".png)";
	icontd.style.backgroundSize = FREEIMG_SIZE+"px";
	if (dungeon !== curDungeon && scratchicon === false)
		icontd.style.display = "none";
	document.getElementById("easel").appendChild(icontd);
	
	var iicontd = document.createElement("td");
	iicontd.id = "i_" + icontd.id;
	iicontd.class = icontd.class;
	iicontd.style.position = icontd.style.position;
	iicontd.style.height = FREEIMG_EL_SIZE;
	iicontd.style.width = FREEIMG_EL_SIZE;
	iicontd.style.top = icontd.style.top; //y - MAP_OFFSET_Y - roomCoord.y - FREEIMG_EL_SIZE/2 - IMG_CIRCLING_WIDTH + roomCoord.y + (FREEIMG_EL_SIZE+(IMG_CIRCLING_WIDTH*2))/2 - FREEIMG_SIZE/2;
	iicontd.style.left = icontd.style.left; //x - DUNGEON_WINDOW_WIDTH - DUNGEON_SCRATCH_WIDTH - roomCoord.x - FREEIMG_EL_SIZE/2 - IMG_CIRCLING_WIDTH + roomCoord.x + (FREEIMG_EL_SIZE+(IMG_CIRCLING_WIDTH*2))/2 - FREEIMG_SIZE/2;
	iicontd.style.marginLeft = -(FREEIMG_EL_SIZE/2 + IMG_CIRCLING_WIDTH);
	iicontd.style.marginTop = -(FREEIMG_EL_SIZE/2 + IMG_CIRCLING_WIDTH);
	iicontd.style.padding = icontd.style.padding;
	iicontd.style.border = IMG_CIRCLING_WIDTH + "px solid rgba(0,0,0,0)";
	iicontd.style.borderRadius = "50%";
	iicontd.style.display = icontd.style.display;
	iicontd.style.zIndex = 2;
	document.getElementById("easel").appendChild(iicontd);

	if (scratchicon === false)
		map[dungeon].images.push(icontd.id);
	else
		options.images.push(icontd.id);

	options.imageNum++;
}

//Redraw all lines on canvas
function refreshLines(event, force = false) {

	var theCanvas = document.getElementById("staticCanvas");
	var ctx = theCanvas.getContext("2d");
	if (force === true)
		ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
	ctx.strokeStyle = EXIT_CONNECTING_COLOR;
	ctx.lineWidth = 2;
	ctx.beginPath();
	
	//Draw each connector for the dungeon
	map[curDungeon].connects.forEach(function(con, conNum) {
		//make sure both exits exist, if either one has been removed, then the connector isn't displayed
		if ((map[curDungeon].rooms[con.start.room].exits[con.start.exit].visible === true
				&& map[curDungeon].rooms[con.end.room].exits[con.end.exit].visible === true)
			//or, if we are about to connect an exit, show connectors that will be re-instated when the exit is created
			|| ((options.mode === "connect" || options.connectPlus === true)
				&& ((con.start.room === options.connectStart.room && con.start.exit === options.connectStart.exit)
					|| (con.end.room === options.connectStart.room && con.end.exit === options.connectStart.exit)))) {
						
			if (con.show === true && (con.drawn === false || force === true)) {

				con.drawn = true;
				var exit = document.getElementById("exit"+con.start.room+"_"+con.start.exit).style;
				var coord = calcRoomCoord(con.start.room);
				ctx.moveTo(DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(exit.left), MAP_OFFSET_Y + coord.y + parseInt(exit.top));

				var exit = document.getElementById("exit"+con.end.room+"_"+con.end.exit).style;
				var coord = calcRoomCoord(con.end.room);
				ctx.lineTo(DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(exit.left), MAP_OFFSET_Y + coord.y + parseInt(exit.top));

				
			}
		}
	});
	ctx.stroke();
	
	if ((options.mode === "connect" || options.connectPlus === true) && event !== null) {
		//Draw the dynamic connector line to the mouse pointer
		var start = document.getElementById("exit"+options.connectStart.room+"_"+options.connectStart.exit).style;
		var coord = calcRoomCoord(options.connectStart.room);
		var fromx = DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(start.left);
		var fromy = MAP_OFFSET_Y + coord.y + parseInt(start.top);

		var theCanvas = document.getElementById("myCanvas");
		var ctx = theCanvas.getContext("2d");
		clearDynamicLine();
		ctx.lineWidth = 2;
		ctx.strokeStyle = EXIT_CONNECTING_COLOR;
		ctx.beginPath();
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(event.pageX, event.pageY);
		ctx.stroke();

		options.lastCursor = {x:event.pageX, y:event.pageY};

	} else if (options.mode === "mover") {
		//Draw the move arrow
		var coord = calcRoomCoord(options.room);
		var tox = event.pageX;
		var toy = event.pageY;
		var fromx = DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + ROOM_SIZE/2;
		var fromy = MAP_OFFSET_Y + coord.y + ROOM_SIZE/2;
		var dx = tox - fromx;
		var dy = toy - fromy;
		var angle = Math.atan2(dy, dx);
		
		var theCanvas = document.getElementById("myCanvas");
		var ctx = theCanvas.getContext("2d");
		clearDynamicLine();
		ctx.lineWidth = 2;
		
		ctx.strokeStyle = MOVING_LINE_COLOR;
		ctx.beginPath();
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.moveTo(tox, toy);
		ctx.lineTo(Math.round(tox - MOVE_ARROW_SIZE * Math.cos(angle - Math.PI/6)), Math.round(toy - MOVE_ARROW_SIZE * Math.sin(angle - Math.PI/6)));
		ctx.moveTo(tox, toy);
		ctx.lineTo(Math.round(tox - MOVE_ARROW_SIZE * Math.cos(angle + Math.PI/6)), Math.round(toy - MOVE_ARROW_SIZE * Math.sin(angle + Math.PI/6)));
		ctx.stroke();
		
		options.lastCursor = {x:event.pageX, y:event.pageY};
	}
}

function clearDynamicLine() {
	var fromx;
	var fromy;
	
	if (options.mode === "connect" || options.connectPlus === true) {
		var start = document.getElementById("exit"+options.connectStart.room+"_"+options.connectStart.exit).style;
		var coord = calcRoomCoord(options.connectStart.room);
		fromx = DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(start.left);
		fromy = MAP_OFFSET_Y + coord.y + parseInt(start.top);
	} else if (options.mode === "mover") {
		var coord = calcRoomCoord(options.room);
		fromx = DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + ROOM_SIZE/2;
		fromy = MAP_OFFSET_Y + coord.y + ROOM_SIZE/2;
	}
	
	var theCanvas = document.getElementById("myCanvas");
	var ctx = theCanvas.getContext("2d");
	ctx.clearRect(Math.min(fromx, options.lastCursor.x) - MOVE_ARROW_SIZE, Math.min(fromy, options.lastCursor.y) - MOVE_ARROW_SIZE, Math.abs(fromx - options.lastCursor.x) + MOVE_ARROW_SIZE*2, Math.abs(fromy - options.lastCursor.y) + MOVE_ARROW_SIZE*2);
}


//*****
//EVENT HANDLERS
//*****

//mouseover/mouseout on the popup menus
//Sets border highlight on the hovered cell
function popupHighlight(event) {
	var cellStyle = document.getElementById(event.target.id).style;
	if (event.type === "mouseover")
		cellStyle.outline = POPUP_HIGHLIGHT_BORDER_WIDTH + "px solid " + POPUP_HIGHLIGHT_BORDER_COLOR;
	else
		cellStyle.outline = "";
}

//mouseover/mouseout on any room or exit
function roomVisible(event) {
	var room = getRoomNumFromID(event.target.id);

	if (event.type === "mouseover")
		applyHoverStyling(event);
	else { //mouseout, essentially want to undo hovering
		if (options.mode === "special" && specData[options.special].multi === true) {
			//restore for all preview tiles
			for (var i = 0; i < specData[options.special].rooms.length; i++) {
				var tileNum = room + i * NUM_MAP_COLUMNS;
				if (tileNum < ROOM_NUM)
					refreshRoomAndExitsGfx(tileNum);
			}
		} else {
			refreshRoomAndExitsGfx(room);
			var exit = getExitNumFromID(event.target.id);
			if (exit !== -1) {
				var list = findConnections(room, exit);
				for (var i = 0; i < list.length; i++)
					refreshExitGfx(list[i].room, list[i].exit);
			}
		}
	}
}

//mouse wheel scrolled
function mouseWheel(event) {
	var cellName = event.target.id.substring(2); //remove "i_" prefix
	var dungeon = curDungeon;
	if (cellName.substring(0, 4) === "dung" || cellName.substring(0, 7) === "scratch")
		dungeon = parseInt(cellName.substring(cellName.substring(0, 4) === "scra" ? 7 : 4));
	if (map[dungeon].counter === "?") map[dungeon].counter = 0;
	if (event.deltaY > 0) //scroll down
		map[dungeon].counter = Math.max(0, map[dungeon].counter - 1);
	if (event.deltaY < 0) //scroll up
		map[dungeon].counter = Math.max(0, map[dungeon].counter + 1);
	updateDungeonCounterText(dungeon);
}

//Handler for tracker clicks
//Z-Structure of event handlers in the main tracker is:
//Exits (top), Rooms, Free (imgs) (bottom)
function trackerClick(event) {
	var cellName = event.target.id.substring(2); //remove the "i_" prefix
	
	if (document.getElementById("options").style.display === "") //process no clicks if options window is open
		return;
	
	if (event.button === 1) { //middle click
		//Hovering over an icon -- delete it
		if (tryToDeleteHoveredIcon(event) === true) {
			;
		} else if (cellName.substring(0, 4) === "icon" && ICON_NAMES[cellName.substring(4)] !== "info") {
			//Always activate imager mode
			if (options.mode === "special")
				cancelSpecialMode(event);
			if (options.mode === "imager")
				cancelImagerMode();
			if (options.mode === "connect")
				cancelConnectMode();
			if (options.mode === "normal")
				startImagerMode(parseInt(cellName.substring(4)));
			//popup mode -- everything else disabled
			//mover mode -- cannot left click in this mode
		}
	}
	
	if (event.button !== 0 && event.button !== 2) //Respond to only left and right clicks
		return;

	//Clicks on the left-side dungeons always switch the map
	if (cellName.substring(0, 4) === "dung") {
		//Left or right click
		if (event.button === 0)
			switchMap(parseInt(cellName.substring(4)), event);
		else if (event.button === 2) {
			var dungNum = parseInt(cellName.substring(4));
			map[dungNum].finished = !map[dungNum].finished;
			var dungStyle = document.getElementById(cellName).style;
			if (map[dungNum].finished === true)
				dungStyle.backgroundImage = "url('images/xmark.png'), " + dungStyle.backgroundImage;
			else
				dungStyle.backgroundImage = dungStyle.backgroundImage.substring("url('images/xmark.png'), ".length);
		}
		return;
	}
	
	if (cellName.substring(0, 4) === "icon" && ICON_NAMES[cellName.substring(4)] === "info") {
		//cancel all modes
		if (options.mode === "popup")
			cancelPopupMode();
		else if (options.mode === "special")
			cancelSpecialMode(event);
		else if (options.mode === "connect")
			cancelConnectMode();
		else if (options.mode === "imager")
			cancelImagerMode();
		else if (options.mode === "super")
			cancelSuperMode();
		openOptions();
		return;
	}
	
	switch (options.mode) {
		case "normal":
			if (event.button === 0) {
				if (cellName.substring(0, 4) === "icon") {
					startImagerMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 4) === "spec") {
					startSpecialMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon) //clicked on different dungeon, switch map
						switchMap(parseInt(cellName.substring(7)), event);
					else { //clicked on same dungeon, update counter
						scratchCounterUpdate(event.button);
						updateDungeonCounterText(curDungeon);
					}
				} else if (cellName.substring(0, 4) === "room") {
					var roomNum = getRoomNumFromID(event.target.id);
					var roomData = map[curDungeon].rooms[roomNum];
					if (roomData.visible === true) { //room already exists
						options.mode = "mover";
						options.room = roomNum;
						canvasMove(event);
					} else { //Action: Create custom room
						roomData.visible = true;
						refreshRoomGfx(roomNum);
						applyHoverStyling(event);
					}
				} else if (cellName.substring(0, 4) === "exit") {
					var roomNum = getRoomNumFromID(event.target.id);
					var exitNum = getExitNumFromID(event.target.id);
					var roomData = map[curDungeon].rooms[roomNum];
					var exitData = roomData.exits[exitNum];
					if (roomData.visible === false) { //Action: Create custom room & exit
						roomData.visible = true;
						exitData.visible = true;
						refreshRoomGfx(roomNum);
						refreshExitGfx(roomNum, exitNum);
						applyHoverStyling(event);
					} else {
						cycleExitState(roomNum, exitNum) //Action: Cycle exit
						updateDungeonCounterText(curDungeon);
						refreshExitGfx(roomNum, exitNum);
						applyHoverStyling(event);
					}
				}
				//Default do nothing
			} else if (event.button === 2) {
				if (cellName.substring(0, 4) === "icon") {
					trackerClick(Object.defineProperty(event, 'button', {value: 0}));
				} else if (cellName.substring(0, 4) === "spec") {
					var specIndex = parseInt(cellName.substring(4));
					if (specData[specIndex].popup === true)
						startPopupMode(specIndex);
					else
						trackerClick(Object.defineProperty(event, 'button', {value: 0}));
				} else if (cellName.substring(0, 4) === "exit") {
					startConnectMode(getRoomNumFromID(event.target.id), getExitNumFromID(event.target.id));
					applyHoverStyling(event);
					refreshLines(event);
				} else if (options.rightErase === true && tryToDeleteHoveredIcon(event) === true) { //Action: Delete hovered icon
					updateDungeonCounterText(curDungeon);
				} else if (cellName.substring(0, 7) === "scratch") { //same as left click
					if (parseInt(cellName.substring(7)) !== curDungeon)
						switchMap(parseInt(cellName.substring(7)), event);
					else {
						scratchCounterUpdate(event.button);
						updateDungeonCounterText(curDungeon);
					}
				} else if (cellName.substring(0, 4) === "room" && options.superEnable === true) {
					startSuperMode(getRoomNumFromID(event.target.id));
				}
				//Default do nothing
			}
			break;
				
		//*****
		//Connect mode: pairing two exits together
		//*****
		case "connect":
			if (event.button === 0) {
				if (cellName.substring(0, 4) === "icon") { //drew a path to an icon
					assignIconToExit(options.connectStart.room, options.connectStart.exit, ICON_NAMES[parseInt(cellName.substring(4))])
					cancelConnectMode();
					applyHoverStyling(event);
				} else if (cellName.substring(0, 4) === "spec") {
					startSpecialMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) === curDungeon)
						; //do nothing
					else {
						cancelConnectMode();
						trackerClick(event);
					}
				//no action on room left click (avoid misclick of exit)
				} else if (cellName.substring(0, 4) === "exit") {
					var roomNum = getRoomNumFromID(event.target.id);
					var exitNum = getExitNumFromID(event.target.id);
					var roomData = map[curDungeon].rooms[roomNum];
					var exitData = roomData.exits[exitNum];
					var connectEnd = {room:roomNum, exit:exitNum};
					if (isStartConnectExit(roomNum, exitNum)) {
						cancelConnectMode();
						trackerClick(event);
					} else { //connect the exits
						if (addConnector(options.connectStart, connectEnd, true) === true) { //addConnector deletes if duplicate
							roomData.visible = true;
							exitData.visible = true;
							map[curDungeon].rooms[options.connectStart.room].visible = true;
							map[curDungeon].rooms[options.connectStart.room].exits[options.connectStart.exit].visible = true;
						} else { //erased connector
							; //no other actions
						}
						cancelConnectMode();
						refreshRoomGfx(roomNum);
						refreshExitGfx(roomNum, exitNum);
						refreshRoomGfx(options.connectStart.room);
						refreshExitGfx(options.connectStart.room, options.connectStart.exit);
						applyHoverStyling(event);
					}
				}
				//Default do nothing
			} else if (event.button === 2) {
				if (cellName.substring(0, 4) === "spec") {
					var specIndex = parseInt(cellName.substring(4));
					if (specData[specIndex].popup === true)
						startPopupMode(specIndex);
					else
						trackerClick(Object.defineProperty(event, 'button', {value: 0}));
				} else if (options.rightErase === true && tryToDeleteHoveredIcon(event) === true) { //delete hovered icon
					updateDungeonCounterText(curDungeon);
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon) {
						cancelConnectMode();
						trackerClick(event);
					} else
						cancelConnectMode();
				} else if (cellName.substring(0, 4) === "room" && options.superEnable === true) {
					startSuperMode(getRoomNumFromID(event.target.id));
				} else { //default cancel
					cancelConnectMode();
				}
			}
			break;
			
		//*****
		//Imager mode: Placing an icon
		//*****
		case "imager":
			if (event.button === 0) {
				if (cellName.substring(0, 4) === "icon") {
					cancelImagerMode();
					trackerClick(event);
				} else if (cellName.substring(0, 4) === "spec") {
					startSpecialMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 4) === "exit") { //assign icon to the exit
					var roomNum = getRoomNumFromID(event.target.id);
					var exitNum = getExitNumFromID(event.target.id);
					assignIconToExit(roomNum, exitNum, options.cursor);
					cancelImagerMode();
					applyHoverStyling(event);
				} else if (cellName.substring(0, 4) === "room" || cellName.substring(0, 6) === "mapper" || cellName.substring(0, 7) === "scratch" || cellName.substring(0, 4) === "exit") {
					if (cellName.substring(0, 7) === "scratch")
						addFreeStandingIconElement(event.pageX, event.pageY, options.cursor, cellName);
					else
						addFreeStandingIconElement(event.pageX, event.pageY);
					cancelImagerMode();
					updateDungeonCounterText(curDungeon);
				}
				//Default do nothing
			} else if (event.button === 2) { //right click cancels the mode
				if (cellName.substring(0, 4) === "icon") {
					if (ICON_NAMES[parseInt(cellName.substring(4))] === options.cursor)
						cancelImagerMode();
					else {
						cancelImagerMode();
						trackerClick(event);
					}
				} else if (cellName.substring(0, 4) === "spec") {
					if (specData[parseInt(cellName.substring(4))].popup === true)
						startPopupMode(parseInt(cellName.substring(4)));
					else
						trackerClick(Object.defineProperty(event, 'button', {value: 0}));
				} else if (options.rightErase === true && tryToDeleteHoveredIcon(event) === true) { //delete hovered icon
					updateDungeonCounterText(curDungeon);
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon)
						switchMap(parseInt(cellName.substring(7)), event);
					else
						cancelImagerMode();
				} else if (cellName.substring(0, 4) === "room" && options.superEnable === true) {
					startSuperMode(getRoomNumFromID(event.target.id));
				} else { //Default cancel
					cancelImagerMode();
				}
			}
			break;
			
		//*****
		//Delete mode
		//*****
		case "special":
			if (options.cursor === "delete") {
				if (event.button === 0) {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode(event);
						trackerClick(event);
					} else if (cellName.substring(0, 4) === "spec") {
						cancelSpecialMode(event);
						trackerClick(event);
					} else if (tryToDeleteHoveredIcon(event) === true) { //clicked where there might be free-standing icons
						updateDungeonCounterText(curDungeon);
					} else {
						var roomNum = getRoomNumFromID(event.target.id);
						var exitNum = getExitNumFromID(event.target.id);
						if (cellName.substring(0, 7) === "scratch") {
							switchMap(parseInt(cellName.substring(7)), event);
						} else if (cellName.substring(0, 4) === "room"
							|| (cellName.substring(0, 4) === "exit"
								&& (map[curDungeon].rooms[roomNum].exits[exitNum].visible === false || exitModificationAllowed(roomNum) === false))) {
							if (options.lastDelete === roomNum && window.performance.now() - options.lastDeleteTime < DOUBLE_CLICK_TIME) {
								//Double-click delete
								deleteRoom(roomNum);
								revertDelHighlight(options.lastDelete, true); //immediately revert
								options.lastDelete = -1;
								refreshRoomAndExitsGfx(roomNum);
								updateDungeonCounterText(curDungeon);
							} else { //first click
								if (options.lastDelete !== -1) //another first click in process
									revertDelHighlight(options.lastDelete, true); //immediately revert the previous one
								options.lastDelete = roomNum;
								options.lastDeleteTime = window.performance.now();
								refreshRoomGfx(roomNum);
								setTimeout(revertDelHighlight, DOUBLE_CLICK_TIME, roomNum);
							}
							//stay in delete mode, no hovering applies
							//no remaining icons that might now have circling
						} else if (cellName.substring(0, 4) === "exit" && exitModificationAllowed(roomNum)) { //visible exit
							deleteExit(roomNum, exitNum);
							refreshExitGfx(roomNum, exitNum);
							refreshLines(event, true); //some connections might have gone away
							updateDungeonCounterText(curDungeon);
						}
					}
					//Default do nothing
				} else if (event.button === 2) {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode(event);
						trackerClick(event);
					} else if (cellName.substring(0, 4) === "spec") {
						cancelSpecialMode(event);
						if (specData[parseInt(cellName.substring(4))].rooms[0].img !== "delete")
							trackerClick(event);
					} else if (cellName.substring(0, 7) === "scratch") {
						if (parseInt(cellName.substring(7)) !== curDungeon)
							switchMap(parseInt(cellName.substring(7)), event);
						else
							cancelSpecialMode(event);
					} else if (options.rightErase === true && tryToDeleteHoveredIcon(event) === true) { //delete hovered icon
						updateDungeonCounterText(curDungeon);
					} else if (cellName.substring(0, 4) === "room" && options.superEnable === true) {
						cancelSpecialMode(event);
						startSuperMode(getRoomNumFromID(event.target.id));
					} else { //Default cancel
						cancelSpecialMode(event);
						applyHoverStyling(event);
					}
				}

		//*****
		//Special mode
		//*****
			} else {
				if (event.button === 0) {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode(event);
						trackerClick(event);
					} else if (cellName.substring(0, 7) === "scratch") {
						if (parseInt(cellName.substring(7)) !== curDungeon)
							switchMap(parseInt(cellName.substring(7)), event);
						else
							; //do nothing
					} else if (cellName.substring(0, 4) === "spec") {
						var specIndex = parseInt(cellName.substring(4));
						if (specIndex !== options.special) {
							cancelSpecialMode(event);
							trackerClick(event);
						} else {
							if (specData[specIndex].popup === true) {
								//clicked on popup room again
								options.state[specIndex]++;
								options.state[specIndex] = options.state[specIndex] % specData[specIndex].rooms.length;
								document.getElementById("spec"+specIndex).style.backgroundImage = "url(\"images/"+specData[specIndex].rooms[options.state[specIndex]].img+".png\")";
								startSpecialMode(parseInt(cellName.substring(4)));
							}
							//Not a popup, do nothing
						}
					} else if (cellName.substring(0, 4) === "room" || cellName.substring(0, 4) === "exit") {
						roomNum = getRoomNumFromID(event.target.id);
						specialHandler(roomNum);
						cancelSpecialMode(event); //also refreshes room+exits
						applyHoverStyling(event);
					}
					//Default do nothing
				} else if (event.button === 2)  {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode(event);
						trackerClick(event);
					} else if (cellName.substring(0, 4) === "spec") {
						if (specData[options.special].multi === true && options.special === parseInt(cellName.substring(4)))
							cancelSpecialMode(event); //do no more
						else {
							cancelSpecialMode(event);
							trackerClick(event);
						}
					} else if (options.rightErase === true && tryToDeleteHoveredIcon(event) === true) { //delete hovered icon
						updateDungeonCounterText(curDungeon);
					} else if (cellName.substring(0, 7) === "scratch") {
						if (parseInt(cellName.substring(7)) !== curDungeon)
							switchMap(parseInt(cellName.substring(7)), event);
						else
							cancelSpecialMode(event);
					} else if (cellName.substring(0, 4) === "room" && options.superEnable === true) {
						cancelSpecialMode(event);
						startSuperMode(getRoomNumFromID(event.target.id));
					} else { //Default cancel
						cancelSpecialMode(event);
					}
				}
			}
			break;
			
		//*****
		//Popup mode to select pre-defined tiles
		//*****
		case "popup":
			if (event.button === 0) {
				if (cellName.substring(0, 4) === "spec") {
					cancelPopupMode();
					trackerClick(event);
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon) {
						cancelPopupMode();
						trackerClick(event);
					}
				} else if (event.target.id.substring(0, 7) === "specpop") {
					cancelPopupMode();
					options.state[options.popup] = parseInt(cellName.substring(cellName.indexOf("_")+1));
					startSpecialMode(options.popup);
				}
				//Default do nothing
			} else if (event.button === 2) {
				if (cellName.substring(0, 4) === "spec") {
					cancelPopupMode();
					if (parseInt(cellName.substring(4)) !== options.popup)
						trackerClick(event);
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon) {
						cancelPopupMode();
						trackerClick(event);
					} else
						cancelPopupMode();
				} else {
					cancelPopupMode();
				}
			}
			break;
			
		//*****
		//Super mode to select pre-defined tiles
		//*****
		case "super":
			if (event.button === 0) {
				if (cellName.substring(0, 4) === "spec") {
					cancelSuperMode();
					trackerClick(event);
				} else if (event.target.id.substring(0, 10) === "i_superpop") {
					cancelSuperMode();
					var cellNum = parseInt(event.target.id.substring(event.target.id.substring(0, 2) === "i_"?10:8));
					options.state[superData[cellNum].dungeon] = superData[cellNum].room;
					startSpecialMode(superData[cellNum].dungeon);
					specialHandler(options.superRoom);
					cancelSpecialMode(event); //also refreshes room+exits
					applyHoverStyling(event);
				}
				//Default do nothing
			} else if (event.button === 2) {
				if (cellName.substring(0, 4) === "spec") {
					cancelSuperMode();
					trackerClick(event);
				} else {
					cancelSuperMode();
				}
			}
			break;
			
		default: break;
	}
}

//Mouse move on the canvas. For dynamic drawings
function canvasMove(event) {
	//check all images for icon highlighting
	for (var i = 0; i < map[curDungeon].images.length; i++) {
		var imgStyle = document.getElementById("i_"+map[curDungeon].images[i]).style;
		if (imgStyle.borderColor !== "rgba(0, 0, 0, 0)")
			imgStyle.borderColor = "rgba(0,0,0,0)";
	}
	for (var i = 0; i < options.images.length; i++) {
		var imgStyle = document.getElementById("i_"+options.images[i]).style;
		if (imgStyle.borderColor !== "rgba(0, 0, 0, 0)")
			imgStyle.borderColor = "rgba(0,0,0,0)";
	}
	highlightHoverIcon(event);
	
	if (options.mode === "connect" || options.connectPlus === true) {
		refreshLines(event); //Dynamic connector line drawing
	} else if (options.mode === "mover") {
		if (event.buttons !== 1) { //released outside the window or something
			clearDynamicLine();
			options.mode = "normal";
		}
		refreshLines(event); //Dynamic mover line drawing
	}
}

//Could be released outside of window!
function trackerRelease(event) {
	var cellName = event.target.id.substring(2); //remove "i_" prefix

	if (event.button === 0) {
		if (options.mode === "mover") {
			//mode is auto-cancelled via mousemove event if button is released outside window
			var dest = getRoomNumFromID(event.target.id);
			var src = options.room;
			if ((cellName.substring(0, 4) === "room" || cellName.substring(0, 4) === "exit")
				&& map[curDungeon].rooms[dest].visible === false //only allow movement into empty space
				&& dest !== src) { //moving to a new location
				var destRoom = map[curDungeon].rooms[dest];
				var srcRoom = map[curDungeon].rooms[src];
				deleteRoom(dest);
				destRoom.visible = srcRoom.visible;
				destRoom.icon = srcRoom.icon;
				for (var i = 0; i < EXIT_NUM; i++) {
					destRoom.exits[i].visible = srcRoom.exits[i].visible;
					destRoom.exits[i].icon = srcRoom.exits[i].icon;
				}
				for (var i = 0; i < map[curDungeon].connects.length; i++) {
					if (map[curDungeon].connects[i].start.room === src)
						map[curDungeon].connects[i].start.room = dest;
					if (map[curDungeon].connects[i].end.room === src)
						map[curDungeon].connects[i].end.room = dest;
				}
				
				var srcRoomEl = document.getElementById("room"+src);
				var destRoomEl = document.getElementById("room"+dest);
				var isrcRoomEl = document.getElementById("i_room"+src);
				var idestRoomEl = document.getElementById("i_room"+dest);
				for (var i = 0; i < map[curDungeon].images.length; i++) {
					if (getRoomNumFromID(map[curDungeon].images[i]) === src) {
						var oldID = map[curDungeon].images[i];
						var newID = oldID.replace("_"+src+"_", "_"+dest+"_");
						map[curDungeon].images[i] = newID;
						var oldimg = document.getElementById(oldID);
						oldimg.id = newID;
						var oldiimg = document.getElementById("i_"+oldID);
						oldiimg.id = "i_"+newID;
						var diffX = calcRoomCoord(dest).x - calcRoomCoord(src).x;
						var diffY = calcRoomCoord(dest).y - calcRoomCoord(src).y;
						oldimg.style.top = parseInt(oldimg.style.top) + diffY;
						oldimg.style.left = parseInt(oldimg.style.left) + diffX;
						oldiimg.style.top = parseInt(oldiimg.style.top) + diffY;
						oldiimg.style.left = parseInt(oldiimg.style.left) + diffX;
					}
				}

				deleteRoom(src);

				refreshRoomAndExitsGfx(src);
				refreshRoomAndExitsGfx(dest);
			}
			clearDynamicLine();
			options.mode = "normal";
			applyHoverStyling(event);
			refreshLines(event, true); //remove/redraw connectors
		}
	}
}


//*****
//MODE ENTRY FUNCTIONS
//start and end for each type of mode
//*****

function startConnectMode(room, exit) {
	options.mode = "connect";
	options.connectStart.room = room;
	options.connectStart.exit = exit;
	refreshExitGfx(room, exit); //update the start connection gfx
}
function cancelConnectMode() {
	clearDynamicLine();
	options.mode = "normal";
	refreshRoomGfx(options.connectStart.room); //remove start room if it was ghostly start
	refreshExitGfx(options.connectStart.room, options.connectStart.exit);
}

function startImagerMode(img) {
	options.mode = "imager";
	options.cursor = ICON_NAMES[img];
	setCursor();
}
function cancelImagerMode() {
	options.mode = "normal";
	options.cursor = "";
	setCursor();
}

function startSpecialMode(index) {
	if (specData[index].rooms[0].img !== "delete") {
		if (options.mode === "connect")
			options.connectPlus = true;
		else if (options.mode === "imager") {
			options.imagerPlus = true;
			options.imagerSave = options.cursor;
		}
	} else { //delete mode, cancel the modes instead
		if (options.mode === "connect")
			cancelConnectMode();
		if (options.mode === "imager")
			; //cancelImagerMode();
	}
	options.mode = "special";
	options.special = index;
	options.cursor = specData[index].rooms[options.state[index]].img;
	setCursor();
}
function cancelSpecialMode(event = null) {
	if (options.cursor === "delete" && options.lastDelete !== -1) {
		revertDelHighlight(options.lastDelete, true);
		options.lastDelete = -1;
	}
	if (options.connectPlus === true) {
		options.mode = "connect";
		options.connectPlus = false;
	} else if (options.imagerPlus === true) {
		options.mode = "imager";
		options.imagerPlus = false;
	} else
		options.mode = "normal";
	
	if (specData[options.special].popup === true && options.state[options.special] !== 0) {
		options.state[options.special] = 0;
		document.getElementById("spec"+options.special).style.backgroundImage = "url(\"images/"+specData[options.special].rooms[0].img+".png\")";
	}
	if (options.mode === "imager")
		options.cursor = options.imagerSave;
	else
		options.cursor = "";
	setCursor();
	
	if (event !== null) {
		var roomNum = getRoomNumFromID(event.target.id);
		if (event.target.id.indexOf("superpop") !== -1)
			roomNum = options.superRoom;
		if (roomNum !== -1) {
			var tiles = (specData[options.special].multi === true ? specData[options.special].rooms.length : 1)
			for (var i = 0; i < tiles; i++) {
				var tileNum = roomNum + i * NUM_MAP_COLUMNS
				if (tileNum < ROOM_NUM)
					refreshRoomAndExitsGfx(tileNum);
			}
		}
	}
}

function startPopupMode(index) {
	if (options.mode === "connect")
		options.connectPlus = true;
	else if (options.mode === "imager") {
		options.imagerPlus = true;
		options.imagerSave = options.cursor;
	}
	options.mode = "popup";
	options.popup = index;
	updatePopupMarks(index);
	document.getElementById("specpop"+index).style.display = "";
}
function cancelPopupMode() {
	options.mode = "normal";
	var menu = document.getElementById("specpop"+options.popup);
	if (menu !== null)
		menu.style.display = "none";
	if (options.connectPlus === true) {
		options.mode = "connect";
		options.connectPlus = false;
	} else if (options.imagerPlus === true) {
		options.mode = "imager";
		options.imagerPlus = false;
	}
}

function startSuperMode(room) {
	options.superRoom = room;
	if (options.mode === "connect")
		options.connectPlus = true;
	else if (options.mode === "imager") {
		options.imagerPlus = true;
		options.imagerSave = options.cursor;
	}
	options.mode = "super";
	updateSuperMarks();
	document.getElementById("superpop").style.display = "";
}
function cancelSuperMode() {
	options.mode = "normal";
	document.getElementById("superpop").style.display = "none";
	if (options.connectPlus === true) {
		options.mode = "connect";
		options.connectPlus = false;
	} else if (options.imagerPlus === true) {
		options.mode = "imager";
		options.imagerPlus = false;
	}
}

//Clicked on a different dungeon. Reload new dungeon.
function switchMap(dungeon, event = null) {
	if (dungeon === curDungeon) { //cancel one mode if applicable
		if (event.button === 2) {
			if (options.mode === "connect")
				cancelConnectMode();
			else if (options.mode === "imager")
				cancelImagerMode();
			else if (options.mode === "special")
				cancelSpecialMode(event);
			else if (options.mode === "popup")
				cancelPopupMode();
			else if (options.mode === "super")
				cancelSuperMode();
		}
		return; //otherwise do nothing
	}
	//Cancel any connect mode
	if (options.mode === "connect") options.mode = "normal";
	options.connectPlus = false;
	
	//Preserve imager mode across dungeons
//	cancelImagerMode();

	//Cannot click on dungeon while in mover mode
	
	//Preserve special mode across dungeons
//	cancelSpecialMode();

	//Cancel popup window when changing dungeons?
	if (options.mode === "popup")
		cancelPopupMode();
	if (options.mode === "super")
		cancelSuperMode();

	for (var i = 0; i < map[curDungeon].images.length; i++) {
		document.getElementById(map[curDungeon].images[i]).style.display = "none";
		document.getElementById("i_"+map[curDungeon].images[i]).style.display = "none";
	}
	
	document.getElementById("dungrow"+curDungeon).style.backgroundColor = "rgba(0,0,0,0)"; //transparent to show border
	curDungeon = dungeon;
	document.getElementById("dungrow"+dungeon).style.backgroundColor = DUNGEON_HIGHLIGHT;
	
	for (var i = 0; i < map[curDungeon].images.length; i++) {
		document.getElementById(map[curDungeon].images[i]).style.display = "";
		document.getElementById("i_"+map[curDungeon].images[i]).style.display = "";
	}
	updateDungeonCounterText(curDungeon);
	
	refreshAllRooms(); //switching map
	refreshLines(event, true);
}





function button_click(but) {
	assignOptions();
	switch(but.id) {
		case "reset_button":
			InitializeDungeonMaps();
			refreshAllRooms(); //total reset
			refreshLines(null, true);
			break;
		case "close_button":
			for (var i = 0; i < 13; i++) {
				updateDungeonCounterText(i);
			}
			refreshAllRooms();
			break;
	}
	document.getElementById("options").style.display = "none";
}

function openOptions() {
	document.getElementById("options").style.display = "";
}