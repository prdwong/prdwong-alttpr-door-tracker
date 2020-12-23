const DUNGEON_HIGHLIGHT = "green";
const HOVER_OPACITY = 0.5;
const EXIT_HOVER_COLOR = "yellow";
const EXIT_CONNECTING_COLOR = "cyan"; //color of start exit when drawing a connector
const FREEIMG_SIZE = 16; //px
const DELETE_HOVER_COLOR = "rgba(255,0,0,0.5)";
const BAD_MULTI_PIT_PLACEMENT = "rgba(255,0,0,0.25)";
const IMG_CIRCLING_SIZE = 20; //px
const IMG_CIRCLING_COLOR = "yellow";
const MOVING_LINE_COLOR = "maroon";
const MOVE_ARROW_SIZE = 15; //px
const DOUBLE_CLICK_TIME = 500; //ms

//change the cursor based on options.cursor value
function setCursor() {
	var cursor = (options.cursor === "" ? "" : "url(images/icons/icon-"+options.cursor+".png), alias");
	document.getElementById("i_mapper").style.cursor = cursor;
	document.getElementById("myCanvas").style.cursor = cursor;
	document.getElementById("i_scratch").style.cursor = cursor;
	document.getElementById("i_special").style.cursor = cursor;
	document.getElementById("i_iconography").style.cursor = cursor;
	document.getElementById("i_dungeons").style.cursor = cursor;
	for (var j = 0; j < specData.length; j++) {
		if (specData[j].popup === true) {
			document.getElementById("specpop"+j).style.cursor = cursor;
		}
	}
}

//Update generic counter text for the dungeon
function updateDungeonCounterText(dungeon) {
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
	document.getElementById("i_scratch"+dungeon).innerHTML = text;
}

//Redraw all lines on canvas
function refreshLines(event) {
	var theCanvas = document.getElementById("myCanvas");
	var ctx = theCanvas.getContext("2d");
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

			var exit = document.getElementById("exit"+con.start.room+"_"+con.start.exit).style;
			var coord = calcRoomCoord(con.start.room);
			ctx.moveTo(DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(exit.left) + (EXIT_SIZE / 2), MAP_OFFSET_Y + coord.y + parseInt(exit.top) + (EXIT_SIZE / 2));

			var exit = document.getElementById("exit"+con.end.room+"_"+con.end.exit).style;
			var coord = calcRoomCoord(con.end.room);
			ctx.lineTo(DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(exit.left) + (EXIT_SIZE / 2), MAP_OFFSET_Y + coord.y + parseInt(exit.top) + (EXIT_SIZE / 2));

			ctx.stroke();
		}
	});
	
	if (options.mode === "connect" || options.connectPlus === true) {
		//Draw the dynamic connector line to the mouse pointer
		var start = document.getElementById("exit"+options.connectStart.room+"_"+options.connectStart.exit).style;
		var coord = calcRoomCoord(options.connectStart.room);
		ctx.moveTo(DUNGEON_WINDOW_WIDTH + DUNGEON_SCRATCH_WIDTH + coord.x + parseInt(start.left) + (EXIT_SIZE / 2), MAP_OFFSET_Y + coord.y + parseInt(start.top) + (EXIT_SIZE / 2));
		ctx.lineTo(event.pageX, event.pageY);
		ctx.stroke();
	} else if (options.mode === "special" && options.cursor === "delete") {
		var img = null;
		var highlight = findHoveredIcon(event.pageX, event.pageY);
		if (highlight !== -1) img = map[curDungeon].images[highlight];
		else {
			highlight = findHoveredScratchIcon(event.pageX, event.pageY);
			if (highlight !== -1) img = options.images[highlight];
		}
		//Circle highlighted icons for deletion
		if (img !== null) {
			ctx.strokeStyle = IMG_CIRCLING_COLOR;
			ctx.beginPath();
			ctx.arc(DUNGEON_WINDOW_WIDTH + img.x, MAP_OFFSET_Y + img.y, IMG_CIRCLING_SIZE/2, 0, 2*Math.PI);
			ctx.stroke();
		}
		//Red room marked for deletion
		var cellName = event.target.id.substring(2);
		var target = null;
		if (cellName.substring(0, 4) === "room")
			target = document.getElementById(event.target.id);
		else if (cellName.substring(0, 4) === "exit")
			target = document.getElementById(event.target.id).parentNode;
		if (target !== null) {
			if (highlight !== -1)
				target.style.backgroundColor = "";
			else if (parseInt(cellName.substring(4, 6)) === options.lastDelete && window.performance.now() - options.lastDeleteTime < DOUBLE_CLICK_TIME) {
				target.style.backgroundColor = DELETE_HOVER_COLOR;
			} else
				target.style.backgroundColor = "";
		}
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
		ctx.strokeStyle = MOVING_LINE_COLOR;
		ctx.beginPath();
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.moveTo(tox, toy);
		ctx.lineTo(tox - MOVE_ARROW_SIZE * Math.cos(angle - Math.PI/6), toy - MOVE_ARROW_SIZE * Math.sin(angle - Math.PI/6));
		ctx.moveTo(tox, toy);
		ctx.lineTo(tox - MOVE_ARROW_SIZE * Math.cos(angle + Math.PI/6), toy - MOVE_ARROW_SIZE * Math.sin(angle + Math.PI/6));
		ctx.stroke();
	}
}

//Redo all attributes of the specified room
function refreshRoomHelper(room) {
	document.getElementById("i_room"+room).style.backgroundColor = ""; //reset delete highlight or multipit alpha overlay
	var roomData = map[curDungeon].rooms[room];
	var roomStyle = document.getElementById("room"+room).style;
	roomStyle.opacity = (roomData.visible === true ? 1 : 0);
	roomStyle.backgroundImage = (roomData.icon === "" ? "" : "url(images/"+roomData.icon+".png)");
	roomStyle.backgroundColor = ROOM_COLOR;
	for (var j = 0; j < EXIT_NUM; j++) {
		var exitData = map[curDungeon].rooms[room].exits[j];
		var exitStyle = document.getElementById("exit"+room+"_"+j).style;
		document.getElementById("i_exit"+room+"_"+j).style.backgroundColor = ""; //undo delete highlight
		exitStyle.opacity = (exitData.visible === true ? 1 : 0);
		exitStyle.backgroundColor = EXIT_COLOR;
		var img = (exitData.state === 1 ? "xmark" : (exitData.state === 2 ? "ditems_sk" : exitData.icon));
		exitStyle.backgroundImage = (img === "" ? "" : "url(images/"+img+".png)");
	}
}

//Change room displays based on mouse hovers
//null arguments is OK (mouse hovering over no exit, or no room)
//cellName assumed to be a room or exit
function refreshVisible(cellName = "") {
	if (cellName !== "" && cellName.substring(0, 4) !== "room" && cellName.substring(0, 4) !== "exit")
		console.log("Error in cellName arg calling refreshVisible: ", cellName);
	
	//Laziness: redo visibility for everything
	for (var i = 0; i < ROOM_NUM; i++) {
		refreshRoomHelper(i);
	}
	
	document.getElementById("chests").innerHTML = countChests(curDungeon);
	updateDungeonCounterText(curDungeon);

	//Special handling for whatever we're hovering over
	var mouseRoom = parseInt(cellName.substring(4, 6));
	var mouseExit = parseInt(cellName.substring(cellName.indexOf("_") + 1));
	var room = document.getElementById("room"+mouseRoom);
	var exit = document.getElementById("exit"+mouseRoom+"_"+mouseExit);
	var showExits = (room === null || map[curDungeon].rooms[mouseRoom].icon === "" || options.disableExits === false);
	if (options.mode !== "special" || options.cursor !== "delete") { //Default hover behavior except for delete mode
		if (room !== null) { //hovering over a room
			//normal room if it's already created, ghost room if hovering
			room.style.opacity = (map[curDungeon].rooms[mouseRoom].visible === true ? 1 : HOVER_OPACITY);
			if (map[curDungeon].rooms[mouseRoom].visible === true)
				if (exit === null) {
					//hovering over a real room, show ghost exits
					for (var j = 0; j < EXIT_NUM; j++)
						room.childNodes[j].style.opacity = (map[curDungeon].rooms[mouseRoom].exits[j].visible === true ? 1 : (showExits === false ? 0 : HOVER_OPACITY));
				} else {
					//hovering over an exit in a real room
					exit.style.opacity = (map[curDungeon].rooms[mouseRoom].exits[mouseExit].visible === true ? 1 : (showExits === false ? 0 : HOVER_OPACITY));
					exit.style.backgroundColor = EXIT_HOVER_COLOR;
				}
			else {
				//empty square (no room)
				if (exit === null) {
					//hovering over a ghost room
					for (var j = 0; j < EXIT_NUM; j++)
						room.childNodes[j].style.opacity = (map[curDungeon].rooms[mouseRoom].exits[j].visible === true ? 1 : (showExits === false ? 0 : HOVER_OPACITY));
				} else {
					//hovering over an exit in a ghost room
					exit.style.opacity = (showExits === false ? 0 : 1); //already ghostly room, no need for additionaly ghostliness
					exit.style.backgroundColor = EXIT_HOVER_COLOR;
				}
			}
		}
	}
	
	if (options.mode === "connect" || options.connectPlus === true) {
		//highlight the start exit of the line
		var exitStart = document.getElementById("exit"+options.connectStart.room+"_"+options.connectStart.exit);
		exitStart.style.opacity = 1;
		exitStart.style.backgroundColor = EXIT_CONNECTING_COLOR;
		//make start of connector visible
		if (map[curDungeon].rooms[options.connectStart.room].visible === false)
			document.getElementById("room"+options.connectStart.room).style.opacity = HOVER_OPACITY;
	}
	
	if (options.mode === "special" && options.cursor !== "delete") {
		//pre-defined tile previews if over room/exit
		if (room !== null) {
			if (specData[options.special].multi === true) { //multiple room laydown
				var valid = true;
				for (var i = 0; i < specData[options.special].rooms.length; i++) {
					var tileNum = mouseRoom + NUM_MAP_COLUMNS * i;
					if (valid === false || tileNum >= ROOM_NUM || map[curDungeon].rooms[tileNum].visible === true)
						valid = false;
				}
				for (var i = 0; i < specData[options.special].rooms.length; i++) {
					var tileNum = mouseRoom + NUM_MAP_COLUMNS * i;
					var roomCheck = document.getElementById("room"+tileNum);
					if (roomCheck !== null) {
						if (valid === false) {
							document.getElementById("room"+tileNum).style.backgroundImage = "url(images/xmark.png)";
							document.getElementById("i_room"+tileNum).style.backgroundColor = BAD_MULTI_PIT_PLACEMENT;
						} else
							document.getElementById("room"+tileNum).style.backgroundImage = "url(images/blank.png)";
						document.getElementById("room"+tileNum).style.backgroundImage += ", url(images/"+specData[options.special].rooms[i].img+".png)";
						document.getElementById("room"+tileNum).style.opacity = HOVER_OPACITY;
					}
				}
			} else {
				var valid = (map[curDungeon].rooms[mouseRoom].visible === false)
				var icons = findIconsInRoom(mouseRoom);
				if (valid === false || icons.length > 0)
					room.style.backgroundImage = "url(images/xmark.png)";
				else
					room.style.backgroundImage = "url(images/blank.png)";
				room.style.backgroundImage += ", url(images/"+specData[options.special].rooms[options.state[options.special]].img+".png)";
				room.style.opacity = HOVER_OPACITY;
			}
		}
	} else if (options.mode === "special" && options.cursor === "delete") {
		//highlight exit for deletion
		if (cellName.substring(0, 4) === "exit" && options.disableExits === false) {
			if (map[curDungeon].rooms[mouseRoom].exits[mouseExit].visible === true) {
				var target = document.getElementById("i_"+cellName);
				target.style.backgroundColor = DELETE_HOVER_COLOR;
			}
		}
	}
	
	//Nothing else happening in imager, mover, popup
}

//Called on mouseover/mouseout on any room or exit
function roomVisible(event) {
	var cellName = event.target.id.substring(2);
	if (options.mode !== "popup") { //all is paused during popup
		if (cellName.substring(0, 4) === "exit" || cellName.substring(0, 4) === "room") {
			if (event.type === "mouseover")
				refreshVisible(cellName);
			else
				refreshVisible();
		}
	}
}

//Clears entire board of free-standing images, mark all icons as not drawn
function wipeImages() {
	var theCanvas = document.getElementById("imgCanvas");
	var ctx = theCanvas.getContext("2d");
	ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
	for (var i = 0; i < map[curDungeon].images.length; i++)
		map[curDungeon].images[i].drawn = false;
	for (var i = 0; i < options.images.length; i++)
		options.images[i].drawn = false;
}

//Redraw all free images
//Only draws images marked as not drawn yet
//Does not clear/erase anything
function drawImages() {
	document.getElementById("chests").innerHTML = countChests(curDungeon);
	updateDungeonCounterText(curDungeon);
	var theCanvas = document.getElementById("imgCanvas");
	var ctx = theCanvas.getContext("2d", {antialias: false});
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	map[curDungeon].images.forEach(function(img, imgNum) {
		if (img.drawn === false) {
			img.drawn = true;
			var imageObj = new Image();
			imageObj.src = "images/"+img.img+".png";
			imageObj.onload = function() {
				ctx.drawImage(imageObj, (DUNGEON_WINDOW_WIDTH + img.x - FREEIMG_SIZE/2) * IMG_CANVAS_SCALE, (MAP_OFFSET_Y + img.y - FREEIMG_SIZE/2) * IMG_CANVAS_SCALE, FREEIMG_SIZE * IMG_CANVAS_SCALE, FREEIMG_SIZE * IMG_CANVAS_SCALE);
			};
		}
	});
	options.images.forEach(function(img, imgNum) {
		if (img.drawn === false) {
			img.drawn = true;
			var imageObj = new Image();
			imageObj.src = "images/"+img.img+".png";
			imageObj.onload = function() {
				ctx.drawImage(imageObj, (DUNGEON_WINDOW_WIDTH + img.x - FREEIMG_SIZE/2) * IMG_CANVAS_SCALE, (MAP_OFFSET_Y + img.y - FREEIMG_SIZE/2) * IMG_CANVAS_SCALE, FREEIMG_SIZE * IMG_CANVAS_SCALE, FREEIMG_SIZE * IMG_CANVAS_SCALE);
			};
		}
	});
}

//Handler for tracker clicks
function trackerClick(event) {
	var cellName = event.target.id.substring(2); //remove the "i_" prefix
	
	if (event.button === 1) { //middle click
		//Hovering over an icon -- delete it
		var iconIndex = findHoveredIcon(event.pageX, event.pageY);
		if (iconIndex !== -1) map[curDungeon].images.splice(iconIndex, 1);
		else {
			iconIndex = findHoveredScratchIcon(event.pageX, event.pageY);
			if (iconIndex !== -1) options.images.splice(iconIndex, 1);
		}
		if (iconIndex !== -1) { //deleted an icon
			wipeImages();
			drawImages();
			refreshLines(event); //remove circling
		}

		if (cellName.substring(0, 4) === "icon") {
			//Always activate imager mode
			if (options.mode === "special")
				cancelSpecialMode();
			if (options.mode === "imager")
				cancelImagerMode();
			if (options.mode === "connect")
				cancelConnectMode(event);
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
		switchMap(parseInt(cellName.substring(4)), event);
		return;
	}
	
	if (cellName.substring(0, 4) === "icon" && ICON_NAMES[cellName.substring(4)] === "info") {
		//cancel all modes
		if (options.mode === "popup")
			cancelPopupMode();
		else if (options.mode === "special")
			cancelSpecialMode();
		else if (options.mode === "connect")
			cancelConnectMode(event);
		else if (options.mode === "imager")
			cancelImagerMode();
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
					else //clicked on same dungeon, update counter
						scratchCounterUpdate(event.button);
				} else if (cellName.substring(0, 4) === "room") {
					if (map[curDungeon].rooms[parseInt(cellName.substring(4))].visible === true) { //room already exists
						options.mode = "mover";
						options.room = parseInt(cellName.substring(4, 6));
						canvasMove(event);
					} else { //no room here yet
						map[curDungeon].rooms[parseInt(cellName.substring(4))].visible = true;
						refreshVisible(cellName);
					}
				} else if (cellName.substring(0, 4) === "exit") {
					roomNum = parseInt(cellName.substring(4, 6));
					exitNum = parseInt(cellName.substring(cellName.indexOf("_")+1));
					if (map[curDungeon].rooms[roomNum].visible === false) { //whole room is not visible
						map[curDungeon].rooms[roomNum].visible = true;
						if (options.disableExits === true && map[curDungeon].rooms[roomNum].icon !== "")
							; //don't create it
						else
							map[curDungeon].rooms[roomNum].exits[exitNum].visible = true;
					} else { //room already visible, clicking on exit
						var exit = map[curDungeon].rooms[roomNum].exits[exitNum];
						if (exit.visible === false) //no exit, create it
							if (options.disableExits === true && map[curDungeon].rooms[roomNum].icon !== "")
								; //don't create it
							else
								exit.visible = true;
						else { //exit exists, cycle exit state
							cycleExitState(roomNum, exitNum);
						}
						refreshLines(event); //connector line add/remove
					}
					refreshVisible(cellName);
				}
				//Default do nothing
			} else if (event.button === 2) {
				if (cellName.substring(0, 4) === "icon") { //same as left click
					startImagerMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 4) === "spec") {
					if (specData[parseInt(cellName.substring(4))].popup === true) //popup menu
						startPopupMode(parseInt(cellName.substring(4)));
					else //no popup menu, same as left click
						startSpecialMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 7) === "scratch") { //same as left click
					if (parseInt(cellName.substring(7)) !== curDungeon)
						switchMap(parseInt(cellName.substring(7)), event);
					else
						scratchCounterUpdate(event.button);
				//no action on room right-click
				} else if (cellName.substring(0, 4) === "exit"
					&& (options.disableExits === false
						|| map[curDungeon].rooms[parseInt(cellName.substring(4, 6))].icon === ""
						|| map[curDungeon].rooms[parseInt(cellName.substring(4, 6))].exits[parseInt(cellName.substring(cellName.indexOf("_")+1))].visible === true)) {
					startConnectMode(parseInt(cellName.substring(4, 6)), parseInt(cellName.substring(cellName.indexOf("_")+1)));
					refreshLines(event);
					refreshVisible(cellName);
				} else if (options.rightErase === true) { //delete hovered icon
					var hover = findHoveredIcon(event.pageX, event.pageY);
					if (hover !== -1) {
						map[curDungeon].images.splice(hover, 1);
						wipeImages();
						drawImages();
					}
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
					map[curDungeon].rooms[options.connectStart.room].visible = true;
					var exit = map[curDungeon].rooms[options.connectStart.room].exits[options.connectStart.exit];
					exit.visible = true;
					exit.state = 0;
					exit.icon = ICON_NAMES[parseInt(cellName.substring(4))];
					cancelConnectMode(event); //also reverts highlight/dynamic line
				} else if (cellName.substring(0, 4) === "spec") { //preserve connection while grabbing tile
					if (specData[parseInt(cellName.substring(4))].rooms[0].img === "delete") //But not for delete function
						cancelConnectMode(event);
					startSpecialMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) === curDungeon)
						; //do nothing
					else {
						cancelConnectMode(event);
						trackerClick(event);
					}
				//no action on room left click (avoid misclick of exit)
				} else if (cellName.substring(0, 4) === "exit") {
					var exitClick = {room:parseInt(cellName.substring(4,6)), exit: parseInt(cellName.substring(cellName.indexOf("_")+1))};
					if (options.connectStart.room === exitClick.room && options.connectStart.exit === exitClick.exit) {
						cancelConnectMode(event);
						trackerClick(event);
					} else { //connect the exits
						if (options.disableExits === false
							|| map[curDungeon].rooms[parseInt(cellName.substring(4, 6))].icon === ""
							|| map[curDungeon].rooms[parseInt(cellName.substring(4, 6))].exits[parseInt(cellName.substring(cellName.indexOf("_")+1))].visible === true) {
							if (addConnector(options.connectStart, exitClick, true) === true) { //addConnector deletes if duplicate
								map[curDungeon].rooms[exitClick.room].visible = true;
								map[curDungeon].rooms[exitClick.room].exits[exitClick.exit].visible = true;
								map[curDungeon].rooms[options.connectStart.room].visible = true;
								map[curDungeon].rooms[options.connectStart.room].exits[options.connectStart.exit].visible = true;
							}
							cancelConnectMode(event);
						}
					}
				}
				//Default do nothing
			} else if (event.button === 2) {
				if (cellName.substring(0, 4) === "spec") {
					var specIndex = parseInt(cellName.substring(4));
					if (specData[specIndex].popup === true)
						startPopupMode(specIndex);
					else {
						if (specData[specIndex].rooms[0].img === "delete")
							cancelConnectMode(event);
						startSpecialMode(specIndex);
					}
				} else if (cellName.substring(0, 7) === "scratch") {
					cancelConnectMode(event);
					if (parseInt(cellName.substring(7)) !== curDungeon)
						trackerClick(event);
				} else { //Default cancel
					cancelConnectMode(event);
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
					if (specData[parseInt(cellName.substring(4))].rooms[0].img === "delete")
						cancelImagerMode();
					//else save the image
					startSpecialMode(parseInt(cellName.substring(4)));
				} else if (cellName.substring(0, 4) === "exit"
					&& (options.disableExits === false
						|| map[curDungeon].rooms[parseInt(cellName.substring(4, 6))].icon === ""
						|| map[curDungeon].rooms[parseInt(cellName.substring(4, 6))].exits[parseInt(cellName.substring(cellName.indexOf("_")+1))].visible === true)) { //assign icon to the exit
					var roomNum = parseInt(cellName.substring(4, 6));
					var exitNum = parseInt(cellName.substring(cellName.indexOf("_")+1));
					map[curDungeon].rooms[roomNum].visible = true;
					map[curDungeon].rooms[roomNum].exits[exitNum].visible = true;
					map[curDungeon].rooms[roomNum].exits[exitNum].state = 0;
					map[curDungeon].rooms[roomNum].exits[exitNum].icon = options.cursor;
					refreshVisible(cellName);
					cancelImagerMode();
				} else if (cellName.substring(0, 4) === "room" || cellName.substring(0, 6) === "mapper" || cellName.substring(0, 7) === "scratch" || cellName.substring(0, 4) === "exit") {
					//add free-standing icon
					var newicon = {};
					newicon.img = options.cursor;
					newicon.x = event.pageX - DUNGEON_WINDOW_WIDTH;
					newicon.y = event.pageY - MAP_OFFSET_Y;
					newicon.drawn = false;
					if (cellName.substring(0, 7) === "scratch")
						options.images.push(newicon);
					else
						map[curDungeon].images.push(newicon);
					drawImages();
					cancelImagerMode();
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
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon)
						switchMap(parseInt(cellName.substring(7)), event);
					else
						cancelImagerMode();
				} else if (cellName.substring(0, 4) === "spec") {
					if (specData[parseInt(cellName.substring(4))].popup === true)
						startPopupMode(parseInt(cellName.substring(4)));
					else {
						if (specData[parseInt(cellName.substring(4))].rooms[0].img === "delete")
							cancelImagerMode(); //Don't carry the icon into delete function
						startSpecialMode(parseInt(cellName.substring(4)));
					}
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
						cancelSpecialMode();
						trackerClick(event);
					} else if (cellName.substring(0, 4) === "spec") {
						cancelSpecialMode();
						trackerClick(event);
					} else { //clicked where there might be free-standing icons
						var hovered = findHoveredIcon(event.pageX, event.pageY);
						if (hovered !== -1)
							map[curDungeon].images.splice(hovered, 1);
						else {
							hovered = findHoveredScratchIcon(event.pageX, event.pageY);
							if (hovered !== -1) options.images.splice(hovered, 1);
						}
						if (hovered !== -1) { //clicked on an icon to delete
							wipeImages();
							drawImages();
							refreshLines(event); //remove circling
						} else {
							var roomNum = parseInt(cellName.substring(4, 6));
							var exitNum = parseInt(cellName.substring(cellName.indexOf("_")+1));
							if (cellName.substring(0, 7) === "scratch") {
								switchMap(parseInt(cellName.substring(7)), event);
							} else if (cellName.substring(0, 4) === "room"
								|| (cellName.substring(0, 4) === "exit" && map[curDungeon].rooms[roomNum].exits[exitNum].visible === false)
								|| (cellName.substring(0, 4) === "exit" && options.disableExits === true)) {
								if (options.lastDelete === parseInt(cellName.substring(4, 6)) && window.performance.now() - options.lastDeleteTime < DOUBLE_CLICK_TIME) {
									//Double-click delete
									var numIcons = map[curDungeon].images.length;
									deleteRoom(parseInt(cellName.substring(4, 6)));
									if (numIcons !== map[curDungeon].images.length) {
										wipeImages();
										drawImages();
									}
									refreshVisible(cellName);
									options.lastDelete = -1;
								} else { //first click
									options.lastDelete = parseInt(cellName.substring(4, 6));
									options.lastDeleteTime = window.performance.now();
									refreshLines(event);
									setTimeout(resetDelHighlight, DOUBLE_CLICK_TIME);
								}
							} else if (cellName.substring(0, 4) === "exit") { //visible exit
								deleteExit(roomNum, exitNum);
								refreshVisible(cellName);
							}
						}
					}
					//Default do nothing
				} else if (event.button === 2) {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode();
						trackerClick(event);
					} else if (cellName.substring(0, 4) === "spec") {
						cancelSpecialMode();
						if (specData[parseInt(cellName.substring(4))].rooms[0].img !== "delete")
							trackerClick(event);
					} else if (cellName.substring(0, 7) === "scratch") {
						if (parseInt(cellName.substring(7)) !== curDungeon)
							switchMap(parseInt(cellName.substring(7)), event);
						else {
							cancelSpecialMode();
							refreshLines(event); //remove circling
						}
					} else { //Default cancel
						cancelSpecialMode();
						refreshLines(event); //remove circling
					}
				}

		//*****
		//Special mode
		//*****
			} else {
				if (event.button === 0) {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode();
						trackerClick(event);
					} else if (cellName.substring(0, 7) === "scratch") {
						switchMap(parseInt(cellName.substring(7)), event);
					} else if (cellName.substring(0, 4) === "spec") {
						var specIndex = parseInt(cellName.substring(4));
						if (specIndex !== options.special) {
							cancelSpecialMode();
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
						roomNum = parseInt(cellName.substring(4, 6));
						specialHandler(roomNum);
						cancelSpecialMode();
						refreshVisible(cellName);
						refreshLines(event); //might have deleted some connectors
					}
					//Default do nothing
				} else if (event.button === 2)  {
					if (cellName.substring(0, 4) === "icon") {
						cancelSpecialMode();
						trackerClick(event);
					} else if (cellName.substring(0, 4) === "spec") {
							cancelSpecialMode();
							trackerClick(event);
					} else if (cellName.substring(0, 7) === "scratch") {
						if (parseInt(cellName.substring(7)) !== curDungeon)
							switchMap(parseInt(cellName.substring(7)), event);
						else
							cancelSpecialMode();
					} else { //Default cancel
						cancelSpecialMode();
						refreshVisible(cellName); //remove pre-visualization
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
				} else if (event.target.id.substring(0, 7) === "specpop") {
					options.state[options.popup] = parseInt(cellName.substring(cellName.indexOf("_")+1));
					document.getElementById("specpop"+options.popup).style.display = "none";
					startSpecialMode(options.popup);
				}
				//Default do nothing
			} else if (event.button === 2) {
				cancelPopupMode();
				if (cellName.substring(0, 4) === "spec") {
					if (parseInt(cellName.substring(4)) === options.popup)
						;
					else
						trackerClick(event);
				} else if (cellName.substring(0, 7) === "scratch") {
					if (parseInt(cellName.substring(7)) !== curDungeon)
						trackerClick(event);
				}
			}
			break;
			
		default: break;
	}
}

//Mouse move on the canvas. For dynamic drawings
function canvasMove(event) {
	if (options.mode === "connect" || options.connectPlus === true) {
		refreshLines(event); //Dynamic connector line drawing
	} else if (options.mode === "mover") {
		if (event.buttons !== 1) //released outside the window or something
			options.mode = "normal";
		refreshLines(event); //Dynamic mover line drawing
	} else if (options.mode === "special" && options.cursor === "delete") {
		refreshLines(event); //Dynamic icon highlighting and red room highlighting in this mode
	}
}

//Could be released outside of window!
function trackerRelease(event) {
	var cellName = event.target.id.substring(2); //remove "i_" prefix

	if (event.button === 0) {
		if (options.mode === "mover") {
			//mode is auto-cancelled via mousemove event if button is released outside window
			var dest = parseInt(cellName.substring(4, 6));
			var src = options.room;
			if ((cellName.substring(0, 4) === "room" || cellName.substring(0, 4) === "exit")
				&& map[curDungeon].rooms[dest].visible === false //only allow movement into empty space
				&& dest !== src) { //moving to a new location
				var destRoom = map[curDungeon].rooms[dest];
				var srcRoom = map[curDungeon].rooms[src];
				destRoom.visible = srcRoom.visible;
				destRoom.icon = srcRoom.icon;
				for (var i = 0; i < EXIT_NUM; i++) {
					destRoom.exits[i].visible = srcRoom.exits[i].visible;
					destRoom.exits[i].state = srcRoom.exits[i].state;
					destRoom.exits[i].icon = srcRoom.exits[i].icon;
				}
				for (var i = 0; i < map[curDungeon].connects.length; i++) {
					if (map[curDungeon].connects[i].start.room === src)
						map[curDungeon].connects[i].start.room = dest;
					if (map[curDungeon].connects[i].end.room === src)
						map[curDungeon].connects[i].end.room = dest;
				}
				var icons = findIconsInRoom(src);
				var srcCoord = calcRoomCoord(src);
				var destCoord = calcRoomCoord(dest);
				var diffX = destCoord.x - srcCoord.x;
				var diffY = destCoord.y - srcCoord.y;
				for (var i = 0; i < icons.length; i++) {
					map[curDungeon].images[icons[i]].x += diffX;
					map[curDungeon].images[icons[i]].y += diffY;
				}
				deleteRoom(options.room);
				if (icons.length > 0) { //moved some icons, so need to refresh
					wipeImages();
					drawImages();
				}
				refreshVisible(cellName);
			}
			options.mode = "normal";
			refreshLines(event); //remove dynamic line
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

function startConnectMode(room, exit) {
	options.mode = "connect";
	options.connectStart.room = room;
	options.connectStart.exit = exit;
}
function cancelConnectMode(event) {
	options.mode = "normal";
	refreshLines(event); //remove the dynamic line
	var cellName = event.target.id.substring(2);
	if (cellName.substring(0, 4) === "room" || cellName.substring(0, 4) === "exit")
		refreshVisible(cellName); //make sure hover is displayed correctly on exit
	else
		refreshVisible();
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
	if (options.mode === "connect")
		options.connectPlus = true;
	else if (options.mode === "imager") {
		options.imagerPlus = true;
		options.imagerSave = options.cursor;
	}
	options.mode = "special";
	options.special = index;
	options.cursor = specData[index].rooms[options.state[index]].img;
	setCursor();
}
function cancelSpecialMode() {
	options.lastDelete = -1;
	if (options.connectPlus === true) {
		options.mode = "connect";
		options.connectPlus = false;
	} else if (options.imagerPlus === true) {
		options.mode = "imager";
		options.imagerPlus = false;
	} else
		options.mode = "normal";
	
	for (var i = 0; i < 13; i++) {
		if (specData[i].popup === true) {
			//Reset all rooms lists to 0
			options.state[i] = 0;
			document.getElementById("spec"+i).style.backgroundImage = "url(\"images/"+specData[i].rooms[0].img+".png\")";
		}
	}
	if (options.mode === "imager")
		options.cursor = options.imagerSave;
	else
		options.cursor = "";
	setCursor();
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

function scratchCounterUpdate(click) {
	if (click === 0) //left click counter down
		map[curDungeon].counter2 = Math.max(0, map[curDungeon].counter2 - 1);
	if (click === 2) //right click counter up
		map[curDungeon].counter2 += 1;
	updateDungeonCounterText(curDungeon);
}

//clears all room deletion highlights
function resetDelHighlight() {
	for (var i = 0; i < ROOM_NUM; i++) {
		document.getElementById("i_room"+i).style.backgroundColor = "";
	}
}


//Clicked on a different dungeon. Reload new dungeon.
function switchMap(dungeon, event = null) {
	if (dungeon === curDungeon) { //cancel one mode if applicable
		if (event.button === 2) {
			if (options.mode === "connect")
				cancelConnectMode(event);
			else if (options.mode === "imager")
				cancelImagerMode();
			else if (options.mode === "special")
				cancelSpecialMode();
			else if (options.mode === "popup")
				cancelPopupMode();
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
	
	wipeImages();
	document.getElementById("dungrow"+curDungeon).style.backgroundColor = "rgba(0,0,0,0)"; //transparent to show border
	curDungeon = dungeon;
	document.getElementById("dungrow"+dungeon).style.backgroundColor = DUNGEON_HIGHLIGHT;
	refreshVisible();
	refreshLines(event);
	drawImages();
}

function button_click(but) {
	switch(but.id) {
		case "reset_button":
			options.potsanity = document.getElementById("opt_potsanity_on").checked;
			options.lobbyshuffle = document.getElementById("opt_lobby_on").checked;
			options.showcounter = document.getElementById("opt_counter_on").checked;
			options.disableExits = document.getElementById("opt_exit_disable").checked;
			options.rightErase = document.getElementById("opt_eraseR_enable").checked;
			InitializeDungeonMaps();
			refreshVisible();
			refreshLines();
			wipeImages();
			drawImages();
			document.getElementById("options").style.display = "none";
			break;
		case "close_button":
			options.potsanity = document.getElementById("opt_potsanity_on").checked;
			options.lobbyshuffle = document.getElementById("opt_lobby_on").checked;
			options.showcounter = document.getElementById("opt_counter_on").checked;
			options.disableExits = document.getElementById("opt_exit_disable").checked;
			options.rightErase = document.getElementById("opt_eraseR_enable").checked;
			for (var i = 0; i < 13; i++) {
				updateDungeonCounterText(i);
			}
			document.getElementById("options").style.display = "none";
			break;
	}
}

function openOptions() {
	document.getElementById("options").style.display = "";
}