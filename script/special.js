//All right-side menu definitions and pre-defined tiles

//**********
//Pre-defined rooms for right side menu 
//**********

//Special rooms
var specData = new Array();

//Same order as the table
//Poddrops
var group = {multi:true};
group.rooms = new Array();
//lobby
var room = {};
room.img = "poddrops";
room.exits = [0,1,2,5,10];
room.icons = ["", "shutter", "", "pit", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:16});
group.rooms.push(room);
//stalfos
var room = {};
room.img = "poddrops2";
room.exits = [0,1,4];
room.icons = ["entrancedrop", "", "teleport"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:24});
group.rooms.push(room);
//mimics/stairs
var room = {};
room.img = "poddrops3";
room.exits = [0,2,6];
room.icons = ["", "", "teleportgray"];
room.imgs = new Array();
room.imgs.push({img:"allbow10", x:16, y:16});
room.imgs.push({img:"hint", x:40, y:8});
//room.imgs.push({img:"hint", x:48, y:8});
group.rooms.push(room);
//Connectors
group.connectors = new Array();
var conn = {};
conn.room1 = 0; conn.exit1 = 5;
conn.room2 = 1; conn.exit2 = 0;
group.connectors.push(conn);
var conn = {};
conn.room1 = 1; conn.exit1 = 4;
conn.room2 = 2; conn.exit2 = 6;
group.connectors.push(conn);
specData.push(group);

//ipdrops
var group = {multi:true};
group.rooms = new Array();
//big spike
var room = {};
room.img = "ipdrops";
room.exits = [2,7,8,11];
room.icons = ["pit", "", "", ""];
group.rooms.push(room);
//freezor
var room = {};
room.img = "ipdrops2";
room.exits = [1,4,7,9,11];
room.icons = ["entrancedrop", "", "", "pit", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:48});
room.imgs.push({img:"bombos", x:16, y:32});
room.imgs.push({img:"hint", x:48, y:8});
group.rooms.push(room);
//bigchest
var room = {};
room.img = "ipdrops3";
room.exits = [1,2,7,8,11];
room.icons = ["pit", "", "entrancedrop", "", "pit"];
room.imgs = new Array();
room.imgs.push({img:"bigchest", x:8, y:40});
room.imgs.push({img:"ditems_bk", x:48, y:32});
group.rooms.push(room);
//prekhold
var room = {};
room.img = "ipdrops4";
room.exits = [1,2,8,10,11];
room.icons = ["entrancedrop", "", "", "entrancedrop", ""];
group.rooms.push(room);
//Connectors
group.connectors = new Array();
var conn = {};
conn.room1 = 0; conn.exit1 = 2;
conn.room2 = 1; conn.exit2 = 1;
group.connectors.push(conn);
var conn = {};
conn.room1 = 1; conn.exit1 = 9;
conn.room2 = 2; conn.exit2 = 7;
group.connectors.push(conn);
var conn = {};
conn.room1 = 2; conn.exit1 = 11;
conn.room2 = 3; conn.exit2 = 10;
group.connectors.push(conn);
var conn = {};
conn.room1 = 2; conn.exit1 = 1;
conn.room2 = 3; conn.exit2 = 1;
group.connectors.push(conn);
specData.push(group);

//MMdrops
var group = {multi:true};
group.rooms = new Array();
//wizzrobes
var room = {};
room.img = "mmdrops";
room.exits = [0,1,7,8];
room.icons = ["pit", "", "pit", "torch"];
room.imgs = new Array();
room.imgs.push({img:"hint", x:40, y:24});
group.rooms.push(room);
//bk
var room = {};
room.img = "mmdrops2";
room.exits = [0,1,3,7,8,9];
room.icons = ["", "", "entrancedrop", "teleport", "entrancedrop", "entrancedrop"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:48});
group.rooms.push(room);
//hourglass
var room = {};
room.img = "mmdrops3";
room.exits = [0,2,9,11];
room.icons = ["teleport", "", "teleportgray", ""];
room.imgs = new Array();
room.imgs.push({img:"ditems_bk", x:16, y:32});
group.rooms.push(room);
//big door
var room = {};
room.img = "mmdrops4";
room.exits = [1,3,4];
room.icons = ["ditems_bk", "teleportgray", ""];
group.rooms.push(room);
//Connectors
group.connectors = new Array();
var conn = {};
conn.room1 = 0; conn.exit1 = 0;
conn.room2 = 1; conn.exit2 = 3;
group.connectors.push(conn);
var conn = {};
conn.room1 = 0; conn.exit1 = 8;
conn.room2 = 1; conn.exit2 = 8;
group.connectors.push(conn);
var conn = {};
conn.room1 = 0; conn.exit1 = 7;
conn.room2 = 1; conn.exit2 = 9;
group.connectors.push(conn);
var conn = {};
conn.room1 = 1; conn.exit1 = 7;
conn.room2 = 2; conn.exit2 = 9;
group.connectors.push(conn);
var conn = {};
conn.room1 = 2; conn.exit1 = 0;
conn.room2 = 3; conn.exit2 = 3;
group.connectors.push(conn);
specData.push(group);

//XHC
var group = {popup:true};
group.x = 5; group.y = 4;
group.rooms = new Array();
//LobbyM
var room = {img:"xhc0", entr:"main", high:true};
room.x = 3; room.y = 1;
room.exits = [1,3,5,6,10];
room.icons = ["", "", "", "", "entrancem"];
group.rooms.push(room);
//LobbyW
var room = {img:"xhc1", entr:"west", high:true};
room.x = 2; room.y = 1;
room.exits = [2,4,6,11];
room.icons = ["", "", "", "entrancew"];
group.rooms.push(room);
//LobbyE
var room = {img:"xhc2", entr:"east", high:true};
room.x = 4; room.y = 1;
room.exits = [0,1,5,9];
room.icons = ["", "", "", "entrancee"];
group.rooms.push(room);
//BackLobbyE
var room = {img:"xhc3", high:true};
room.x = 4; room.y = 0;
room.exits = [3,9,10];
room.icons = ["", "", ""];
group.rooms.push(room);
//BackHall
var room = {img:"xhc4", high:true};
room.x = 3; room.y = 0;
room.exits = [1,3,4];
room.icons = ["", "", ""];
group.rooms.push(room);
//Map
var room = {img:"xhc5", high:true};
room.x = 4; room.y = 2;
room.exits = [1,9,10];
room.icons = ["", "shutter", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:24, y:16});
room.imgs.push({img:"potkey", x:40, y:8});
group.rooms.push(room);
//Sneak
var room = {img:"xhc6", high:true};
room.x = 3; room.y = 3;
room.exits = [0,4,8];
room.icons = ["", "", ""];
group.rooms.push(room);
//Sanc
var room = {img:"xhc7", entr:"back"};
room.x = 2; room.y = 0;
room.exits = [1,10];
room.icons = ["shutter", "entranceb"];
room.imgs = new Array();
room.imgs.push({img:"sanc", x:32, y:32});
room.imgs.push({img:"chest", x:24, y:16});
group.rooms.push(room);
//HC drop
var room = {img:"hcdrop"};
room.x = 0; room.y = 0;
room.exits = [2,11];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:8, y:40});
room.imgs.push({img:"chest", x:24, y:40});
room.imgs.push({img:"chest", x:16, y:24});
room.imgs.push({img:"entrancedrop", x:48, y:32});
group.rooms.push(room);
//Boom
var room = {img:"xhcboom"};
room.x = 3; room.y = 2;
room.exits = [0,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:48});
room.imgs.push({img:"potkey", x:64, y:48});
group.rooms.push(room);
//Boss
var room = {img:"xhcboss"};
room.x = 2; room.y = 3;
room.exits = [0];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:40, y:8});
room.imgs.push({img:"potbigkey", x:56, y:24});
room.imgs.push({img:"ditems_bk", x:48, y:16});
group.rooms.push(room);
//post throne
var room = {img:"xhcdarkthrone"};
room.x = 0; room.y = 3;
room.exits = [2,10];
room.icons = ["", "shutter"];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//Dark snakes
var room = {img:"xhcsnakes"};
room.x = 1; room.y = 3;
room.exits = [1,2];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//Dark cross
var room = {img:"xhcdarkcross"};
room.x = 1; room.y = 2;
room.exits = [1,10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:56, y:32});
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//pre key rat
var room = {img:"xhcprerat"};
room.x = 1; room.y = 1;
room.exits = [7,10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//Key rat
var room = {img:"xhckeyrat"};
room.x = 0; room.y = 1;
room.exits = [2,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:8, y:16});
room.imgs.push({img:"lantern", x:32, y:48});
group.rooms.push(room);

/*//Back west
var room = {img:"xhcbackw"};
room.x = 2; room.y = 0;
room.exits = [4,11];
room.icons = ["", ""];
room.imgs = new Array();
group.rooms.push(room);*/
/*//pit path
var room = {img:"xhcz"};
room.x = 4; room.y = 3;
room.exits = [1,7];
room.icons = ["", ""];
group.rooms.push(room);*/
//switches
var room = {img:"xhcswitches"};
room.x = 1; room.y = 0;
room.exits = [2,10];
room.icons = ["", ""];
group.rooms.push(room);
specData.push(group);

//XEPIP
var group = {popup:true};
group.x = 3; group.y = 4;
group.rooms = new Array();
//ledge
var room = {img:"xep0", high:true, half:true};
room.x = 1; room.y = 1.5;
room.exits = [5,6,10];
room.icons = ["", "", ""];
group.rooms.push(room);
//compass
var room = {img:"xep1", high:true};
room.x = 0; room.y = 1;
room.exits = [4,6,11];
room.icons = ["", "", "shutter"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:8});
room.imgs.push({img:"hint", x:48, y:8});
group.rooms.push(room);
//bigchest
var room = {img:"xep2", high:true, half:true};
room.x = 1; room.y = 1;
room.exits = [1,3,4];
room.icons = ["ditems_bk", "", ""];
room.imgs = new Array();
room.imgs.push({img:"bigchest", x:32, y:32});
group.rooms.push(room);
//entr
var room = {img:"xepentr", entr:"main"};
room.x = 1; room.y = 3;
room.exits = [1,10];
room.icons = ["", "entrancem"];
group.rooms.push(room);
//cannon
var room = {img:"xepcannon"};
room.x = 1; room.y = 2;
room.exits = [1,10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:40});
group.rooms.push(room);
//east
var room = {img:"xepright"};
room.x = 2; room.y = 1;
room.exits = [5];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:56, y:48});
group.rooms.push(room);
//dark key
var room = {img:"xepkey"};
room.x = 2; room.y = 2;
room.exits = [0,3];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:56, y:16});
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//bk
var room = {img:"xepbk"};
room.x = 0; room.y = 2;
room.exits = [2,4];
room.icons = ["ditems_bk", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:16});
group.rooms.push(room);
//back
var room = {img:"xepdarkback"};
room.x = 2; room.y = 0;
room.exits = [5,10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
room.imgs.push({img:"potkey", x:40, y:48});
group.rooms.push(room);
//cannonball hell
var room = {img:"xepcannonhell"};
room.x = 1; room.y = 0;
room.exits = [7,8];
room.icons = ["", ""];
group.rooms.push(room);
//eyegore
var room = {img:"xepeyegore"};
room.x = 0; room.y = 0;
room.exits = [2,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"allbow10", x:32, y:32});
group.rooms.push(room);
/*//boss
var room = {img:"xepboss"};
room.x = 1; room.y = 0;
room.exits = [10];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"boss", x:32, y:32});
group.rooms.push(room);*/
specData.push(group);

//XDP
var group = {popup:true};
group.x = 4; group.y = 3;
group.rooms = new Array();
//LobbyM
var room = {img:"xdp0", entr:"main", high:true};
room.x = 2; room.y = 1;
room.exits = [0,1,2,6,10];
room.icons = ["", "", "", "", "entrancem"];
group.rooms.push(room);
//LobbyE
var room = {img:"xdp1", entr:"east", high:true};
room.x = 3; room.y = 1;
room.exits = [0,2,5,11];
room.icons = ["", "", "", "entrancee"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:16});
group.rooms.push(room);
//Map
var room = {img:"xdp2", high:true};
room.x = 2; room.y = 0;
room.exits = [7,8,9,11];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:16});
group.rooms.push(room);
//Torch
var room = {img:"xdp3"};
room.x = 1; room.y = 0;
room.exits = [6,11];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"boots", x:48, y:16});
room.imgs.push({img:"bigchest", x:16, y:16});
room.imgs.push({img:"chest", x:40, y:16});
room.imgs.push({img:"hint", x:48, y:0});
group.rooms.push(room);
//LobbyW
var room = {img:"xdplobbyw", entr:"west"};
room.x = 1; room.y = 1;
room.exits = [2,9];
room.icons = ["", "entrancew"];
group.rooms.push(room);
//Lobbyback
var room = {img:"xdpback", entr:"back"};
room.x = 0; room.y = 2;
room.exits = [0,9];
room.icons = ["", "entranceb"];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:8, y:24});
group.rooms.push(room);
//east trap
var room = {img:"xdptrap", vhalf:true};
room.x = 3; room.y = 0;
room.exits = [7,9];
room.icons = ["", ""];
group.rooms.push(room);
//BK
var room = {img:"xdpbk", vhalf:true};
room.x = 3.5; room.y = 0;
room.exits = [11];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:8});
group.rooms.push(room);
//Popos
var room = {img:"xdppopo"};
room.x = 0; room.y = 1;
room.exits = [0,2];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:56, y:16});
room.imgs.push({img:"enemy", x:16, y:48});
group.rooms.push(room);
//Wall
var room = {img:"xdpwall"};
room.x = 0; room.y = 0;
room.exits = [0,11];
room.icons = ["ditems_bk", ""];
room.imgs = new Array();
room.imgs.push({img:"torch", x:32, y:16});
room.imgs.push({img:"potkey", x:56, y:40});
group.rooms.push(room);
//basement
var room = {img:"xherabase"};
room.x = 3; room.y = 2;
room.exits = [0];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:56});
room.imgs.push({img:"xtalswitch", x:8, y:24});
room.imgs.push({img:"torch", x:48, y:40});
group.rooms.push(room);
//cage
var room = {img:"xheracage"};
room.x = 2; room.y = 2;
room.exits = [1];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:40});
room.imgs.push({img:"xtalswitch", x:16, y:24});
group.rooms.push(room);
specData.push(group);

//XPoD
var group = {popup:true};
group.x = 4; group.y = 4;
group.rooms = new Array();
//Lobby
var room = {img:"xpod0", entr:"main", high:true};
room.x = 2; room.y = 2;
room.exits = [0,1,2,10];
room.icons = ["", "", "", "entrancem"];
group.rooms.push(room);
//bumper
var room = {img:"xpod1", high:true};
room.x = 2; room.y = 1;
room.exits = [0,2,6,9,11];
room.icons = ["", "shutter", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:48});
room.imgs.push({img:"xtalswitch", x:32, y:48});
group.rooms.push(room);
//hammerjump
var room = {img:"xpod2", high:true};
room.x = 2; room.y = 0;
room.exits = [1,2,3,9,11];
room.icons = ["", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:16});
room.imgs.push({img:"chest", x:40, y:48});
group.rooms.push(room);
//sexystatue
var room = {img:"xpod3", high:true};
room.x = 3; room.y = 1;
room.exits = [0,5,7,9];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:56});
room.imgs.push({img:"xtalswitch", x:24, y:32});
room.imgs.push({img:"hammer", x:16, y:40});
group.rooms.push(room);
//back
var room = {img:"xpodback"};
room.x = 3; room.y = 0;
room.exits = [2,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"allbow10", x:16, y:48});
room.imgs.push({img:"xtalswitch", x:16, y:16});
room.imgs.push({img:"switch1", x:32, y:16});
group.rooms.push(room);
//dark basement
var room = {img:"xpoddarkbase"};
room.x = 1; room.y = 1;
room.exits = [1,2];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:56, y:48});
room.imgs.push({img:"chest", x:40, y:48});
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//maze
var room = {img:"xpodmaze"};
room.x = 1; room.y = 0;
room.exits = [4,6];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:16});
room.imgs.push({img:"chest", x:56, y:56});
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//shooter
var room = {img:"xpodshooter"};
room.x = 1; room.y = 2;
room.exits = [1];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:48});
group.rooms.push(room);
//darkboss
var room = {img:"xpoddarkboss"};
room.x = 3; room.y = 2;
room.exits = [0,2];
room.icons = ["shutter", "ditems_bk"];
room.imgs = new Array();
room.imgs.push({img:"hammer", x:16, y:16});
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
/*//conveyor
var room = {img:"xpodconveyor"};
room.x = 3; room.y = 2;
room.exits = [0,9];
room.icons = ["", ""];
group.rooms.push(room);*/
//entrance
var room = {img:"xatentr", entr:"main"};
room.x = 2; room.y = 3;
room.exits = [2,9];
room.icons = ["", "entrancem"];
room.imgs = new Array();
room.imgs.push({img:"enemy", x:16, y:16});
room.imgs.push({img:"chest", x:56, y:24});
group.rooms.push(room);
//maze
var room = {img:"xatmaze"};
room.x = 1; room.y = 3;
room.exits = [2,6];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
room.imgs.push({img:"chest", x:8, y:32});
group.rooms.push(room);
//pits
var room = {img:"xatpits"};
room.x = 0; room.y = 3;
room.exits = [2,6];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:40, y:24});
room.imgs.push({img:"lantern", x:24, y:32});
group.rooms.push(room);
//cop
var room = {img:"xatcop"};
room.x = 0; room.y = 2;
room.exits = [2,6];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"enemy", x:32, y:32});
room.imgs.push({img:"potkey", x:16, y:48});
room.imgs.push({img:"hint", x:40, y:8});
group.rooms.push(room);
//statue push
var room = {img:"xatstatue"};
room.x = 0; room.y = 1;
room.exits = [0,6];
room.icons = ["", ""];
group.rooms.push(room);
//aga
var room = {img:"xataga"};
room.x = 0; room.y = 0;
room.exits = [0,9];
room.icons = ["", "shutter"];
room.imgs = new Array();
room.imgs.push({img:"sword0", x:16, y:8});
group.rooms.push(room);
specData.push(group);

//XSP
var group = {popup:true};
group.x = 5; group.y = 4;
group.rooms = new Array();
//Lobby
var room = {img:"xsp0", high:true};
room.x = 2; room.y = 2;
room.exits = [1,3,7,8,10];
room.icons = ["", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"bigchest", x:32, y:32});
room.imgs.push({img:"potkey", x:56, y:32});
room.imgs.push({img:"hookshot", x:32, y:16});
group.rooms.push(room);
//Start
var room = {img:"xsp4", high:true};
room.x = 4; room.y = 2;
room.exits = [0,3,7];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:16, y:40});
group.rooms.push(room);
//Pool1
var room = {img:"xsp5", high:true};
room.x = 3; room.y = 2;
room.exits = [3,7,8];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"flippers", x:16, y:48});
room.imgs.push({img:"hammer", x:16, y:8});
room.imgs.push({img:"potkey", x:32, y:8});
group.rooms.push(room);
//Pool2
var room = {img:"xsp6", high:true};
room.x = 1; room.y = 2;
room.exits = [4,7,8];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"switch0", x:40, y:40});
room.imgs.push({img:"xtalswitch", x:48, y:8});
room.imgs.push({img:"flippers", x:16, y:48});
room.imgs.push({img:"potkey", x:32, y:16});
group.rooms.push(room);
//Leftside
var room = {img:"xsp2", high:true};
room.x = 0; room.y = 2;
room.exits = [1,4,7,8];
room.icons = ["entrancedrop", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:16});
room.imgs.push({img:"switch1", x:48, y:16});
room.imgs.push({img:"hookshot", x:32, y:16});
group.rooms.push(room);
//Statue
var room = {img:"xsp1", high:true};
room.x = 2; room.y = 1;
room.exits = [1,2,6,10];
room.icons = ["", "", "", ""];
group.rooms.push(room);
//diverdown
var room = {img:"xsp3", high:true};
room.x = 3; room.y = 1;
room.exits = [0,1,2,6];
room.icons = ["", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:56, y:40});
room.imgs.push({img:"chest", x:40, y:40});
group.rooms.push(room);
//entr
var room = {img:"xspentr", entr:"main"};
room.x = 4; room.y = 1;
room.exits = [0,10];
room.icons = ["", "entrancem"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:24, y:16});
room.imgs.push({img:"flippers", x:24, y:40});
room.imgs.push({img:"mudoraa", x:32, y:48});
room.imgs.push({img:"hint", x:40, y:24});
group.rooms.push(room);
//compass
var room = {img:"xspcompass"};
room.x = 2; room.y = 3;
room.exits = [1];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:8});
group.rooms.push(room);
//waterfall
var room = {img:"xspwaterfall"};
room.x = 3; room.y = 0;
room.exits = [2,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:48});
group.rooms.push(room);
//TIC
var room = {img:"xsptic"};
room.x = 2; room.y = 0;
room.exits = [0,2];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:56, y:40});
room.imgs.push({img:"flippers", x:32, y:48});
group.rooms.push(room);
/*//boss
var room = {img:"xspboss"};
room.x = 1; room.y = 0;
room.exits = [10];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"boss", x:32, y:32});
group.rooms.push(room);*/
//swprison
var room = {img:"xswpotprison"};
room.x = 1; room.y = 1;
room.exits = [6, 10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:16});
group.rooms.push(room);
//sweast
var room = {img:"xsweast", entr:"east"};
room.x = 1; room.y = 0;
room.exits = [7,9];
room.icons = ["", "entrancee"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:16});
group.rooms.push(room);
//back
var room = {img:"xswback", entr:"back"};
room.x = 0; room.y = 1;
room.exits = [0,9];
room.icons = ["", "entranceb"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:24, y:48});
group.rooms.push(room);
//mummy hellway
var room = {img:"xswmummy"};
room.x = 0; room.y = 0;
room.exits = [0,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"firerod", x:48, y:32});
room.imgs.push({img:"sword0", x:16, y:16});
group.rooms.push(room);
specData.push(group);

//XTT
var group = {popup:true};
group.x = 5; group.y = 6;
group.rooms = new Array();
//SW lobby
var room = {img:"xtt0", entr:"main", high:true};
room.x = 3; room.y = 4;
room.exits = [1,2,6,10];
room.icons = ["", "", "shutter", "entrancem"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:16});
group.rooms.push(room);
//NW lobby
var room = {img:"xtt1", high:true};
room.x = 3; room.y = 3;
room.exits = [4,6,8,10,11];
room.icons = ["", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:24, y:40});
group.rooms.push(room);
//NE lobby
var room = {img:"xtt2", high:true};
room.x = 4; room.y = 3;
room.exits = [0,2,3,5,7,9,10];
room.icons = ["", "ditems_bk", "", "", "", "", ""];
group.rooms.push(room);
//SE lobby
var room = {img:"xtt3", high:true};
room.x = 4; room.y = 4;
room.exits = [0,1,5,7];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:24, y:40});
group.rooms.push(room);
//toilet
var room = {img:"xtt4", high:true};
room.x = 4; room.y = 2;
room.exits = [0,2,3,7,11];
room.icons = ["", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"shutter", x:32, y:16});
room.imgs.push({img:"potkey", x:56, y:16});
group.rooms.push(room);
//hellway
var room = {img:"xtt5", high:true};
room.x = 3; room.y = 2;
room.exits = [0,4,8];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"switch1", x:16, y:48});
room.imgs.push({img:"switch0", x:48, y:16});
group.rooms.push(room);
//x
var room = {img:"xip0", high:true};
room.x = 1; room.y = 0;
room.exits = [5,7,8,11];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:32, y:32});
room.imgs.push({img:"hint", x:24, y:0});
room.imgs.push({img:"potkey", x:16, y:16});
group.rooms.push(room);
//spike
var room = {img:"xip1", high:true};
room.x = 2; room.y = 2;
room.exits = [0,2,5];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:48});
group.rooms.push(room);
//TT jail
var room = {img:"xtt6"};
room.x = 4; room.y = 5;
room.exits = [0,3,7];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"ditems_bk", x:48, y:40});
room.imgs.push({img:"glove1", x:16, y:24});
room.imgs.push({img:"chest", x:56, y:8});
room.imgs.push({img:"sanc", x:48, y:8});
group.rooms.push(room);
//big
var room = {img:"xttbig"};
room.x = 3; room.y = 5;
room.exits = [4,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"bigchest", x:16, y:48});
room.imgs.push({img:"hammer", x:24, y:48});
group.rooms.push(room);
//spike switch
var room = {img:"xttspikeswitch"};
room.x = 3; room.y = 1;
room.exits = [1,10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:8, y:32});
room.imgs.push({img:"potkey", x:24, y:32});
group.rooms.push(room);
//attic1
var room = {img:"xttattic1"};
room.x = 3; room.y = 0;
room.exits = [5,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"switch0", x:24, y:56});
room.imgs.push({img:"switch1", x:8, y:48});
room.imgs.push({img:"hint", x:16, y:32});
group.rooms.push(room);
//attic2
var room = {img:"xttattic2"};
room.x = 4; room.y = 0;
room.exits = [7];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:40, y:40});
room.imgs.push({img:"mudorac", x:48, y:40});
group.rooms.push(room);
/*//boss
var room = {img:"xttboss"};
room.x = 3; room.y = 1;
room.exits = [10];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"boss", x:32, y:32});
group.rooms.push(room);*/
//entrance
var room = {img:"xipentr", entr:"main"};
room.x = 2; room.y = 0;
room.exits = [5,11];
room.icons = ["", "entrancem"];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:8, y:56});
room.imgs.push({img:"hint", x:48, y:32});
room.imgs.push({img:"bombos", x:48, y:48});
group.rooms.push(room);
//compass
var room = {img:"xipcompass"};
room.x = 1; room.y = 1;
room.exits = [1];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:48});
group.rooms.push(room);
//icebreaker
var room = {img:"xipicebreak", half:true};
room.x = 2; room.y = 1;
room.exits = [2,3];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:24});
group.rooms.push(room);
//h-room
var room = {img:"xiphroom", half:true};
room.x = 2; room.y = 1.5;
room.exits = [5,11];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"hammer", x:32, y:40});
room.imgs.push({img:"glove1", x:8, y:56});
room.imgs.push({img:"chest", x:24, y:56});
room.imgs.push({img:"potkey", x:16, y:40});
group.rooms.push(room);
//ipbj
var room = {img:"xipbj"};
room.x = 1; room.y = 2;
room.exits = [0,4];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"switch1", x:16, y:16});
group.rooms.push(room);
//pengator
var room = {img:"xippengator"};
room.x = 1; room.y = 3;
room.exits = [1,6];
room.icons = ["", ""];
group.rooms.push(room);
//hookshot
var room = {img:"xiphook"};
room.x = 2; room.y = 3;
room.exits = [3,5];
room.icons = ["shutter", ""];
room.imgs = new Array();
room.imgs.push({img:"hookshot", x:16, y:16});
group.rooms.push(room);
//shadows
var room = {img:"xipshadows"};
room.x = 2; room.y = 4;
room.exits = [5,10];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:16, y:24});
group.rooms.push(room);
//icy bridge
var room = {img:"xipicybridge"};
room.x = 1; room.y = 4;
room.exits = [1,5];
room.icons = ["", ""];
group.rooms.push(room);
//ice-t
var room = {img:"xipicet"};
room.x = 0; room.y = 4;
room.exits = [0,6];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:48});
group.rooms.push(room);
//ice-t
var room = {img:"xiptetris"};
room.x = 0; room.y = 3;
room.exits = [0,1];
room.icons = ["", ""];
group.rooms.push(room);
//switch
var room = {img:"xipswitch"};
room.x = 2; room.y = 5;
room.exits = [5];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:48, y:32});
group.rooms.push(room);
//IP boss drop
var room = {img:"xippreboss"};
room.x = 1; room.y = 5;
room.exits = [1];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"glove1", x:16, y:40});
room.imgs.push({img:"hammer", x:16, y:32});
room.imgs.push({img:"boss", x:16, y:56});
group.rooms.push(room);
specData.push(group);


//XMM
var group = {popup:true};
group.x = 3; group.y = 5;
group.rooms = new Array();
//Lobby
var room = {img:"xmm0", high:true};
room.x = 1; room.y = 3;
room.exits = [0,2,3,4,6,7,8,11];
room.icons = ["", "", "", "", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"switch0", x:24, y:16});
room.imgs.push({img:"switch0", x:48, y:24});
room.imgs.push({img:"chest", x:32, y:8});
group.rooms.push(room);
//Compass
var room = {img:"xmm1", high:true};
room.x = 0; room.y = 3;
room.exits = [2,4,8,9,11];
room.icons = ["", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:8});
room.imgs.push({img:"switch0", x:16, y:24});
room.imgs.push({img:"torch", x:16, y:48});
room.imgs.push({img:"shutter", x:32, y:16});
room.imgs.push({img:"potkey", x:40, y:56});
room.imgs.push({img:"xtalswitch", x:48, y:48});
group.rooms.push(room);
//big chest
var room = {img:"xmm2", high:true};
room.x = 2; room.y = 3;
room.exits = [0,3,5,7];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"bigchest", x:48, y:8});
room.imgs.push({img:"shutter", x:32, y:32});
room.imgs.push({img:"switch0", x:16, y:16});
room.imgs.push({img:"chest", x:8, y:24});
group.rooms.push(room);
//spike
var room = {img:"xmm3", high:true};
room.x = 2; room.y = 2;
room.exits = [0,3,7,9];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:8, y:40});
room.imgs.push({img:"chest", x:24, y:48});
group.rooms.push(room);
//sluggula
var room = {img:"xmm4", high:true};
room.x = 1; room.y = 2;
room.exits = [2,8,9,11];
room.icons = ["", "", "", ""];
group.rooms.push(room);
//hookshot
var room = {img:"xmm5", high:true};
room.x = 1; room.y = 1;
room.exits = [1,10,11];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:56, y:24});
room.imgs.push({img:"hookshot", x:40, y:24});
group.rooms.push(room);
//entrance
var room = {img:"xmmentr", entr:"main"};
room.x = 2; room.y = 4;
room.exits = [6,9];
room.icons = ["", "entrancem"];
room.imgs = new Array();
room.imgs.push({img:"boots", x:40, y:40});
room.imgs.push({img:"hookshot", x:32, y:40});
group.rooms.push(room);
//mire2
var room = {img:"xmmwizz"};
room.x = 1; room.y = 4;
room.exits = [2,8];
room.icons = ["", ""];
group.rooms.push(room);
//elbox
var room = {img:"xmmelbow"};
room.x = 2; room.y = 1;
room.exits = [5,9];
room.icons = ["", ""];
group.rooms.push(room);
//fishbone
var room = {img:"xmmfish"};
room.x = 0; room.y = 1;
room.exits = [6,11];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:24, y:16});
room.imgs.push({img:"potkey", x:8, y:16});
room.imgs.push({img:"switch0", x:48, y:48});
group.rooms.push(room);
//xroom
var room = {img:"xmmsomaria"};
room.x = 2; room.y = 0;
room.exits = [1,7];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
room.imgs.push({img:"somaria", x:16, y:16});
group.rooms.push(room);
//spooky
var room = {img:"xmmspooky"};
room.x = 1; room.y = 0;
room.exits = [7,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"lantern", x:32, y:32});
room.imgs.push({img:"xtalswitch", x:48, y:16});
room.imgs.push({img:"switch0", x:16, y:48});
group.rooms.push(room);
//slime
var room = {img:"xmmslime"};
room.x = 0; room.y = 0;
room.exits = [4,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:48, y:8});
group.rooms.push(room);
//preboss
var room = {img:"xmmpreboss"};
room.x = 0; room.y = 2;
room.exits = [0,4];
room.icons = ["ditems_bk", ""];
room.imgs = new Array();
room.imgs.push({img:"switch1", x:32, y:16});
group.rooms.push(room);
/*//boss
var room = {img:"xmmboss"};
room.x = 0; room.y = 0;
room.exits = [10];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"boss", x:32, y:16});
group.rooms.push(room);*/
//useless
var room = {img:"xmmuseless"};
room.x = 0; room.y = 4;
room.exits = [2];
room.icons = [""];
group.rooms.push(room);
specData.push(group);

//XTR
var group = {popup:true};
group.x = 5; group.y = 5;
group.rooms = new Array();
//tr lobby
var room = {img:"xtr0", high:true};
room.x = 3; room.y = 1;
room.exits = [0,2,4,8,9,11];
room.icons = ["", "", "", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"somaria", x:32, y:32});
group.rooms.push(room);
//tr pipes
var room = {img:"xtr2", high:true};
room.x = 3; room.y = 3;
room.exits = [0,3,7];
room.icons = ["", "", "shutter"];
group.rooms.push(room);
//lava
var room = {img:"xtr3", high:true};
room.x = 2; room.y = 3;
room.exits = [3,4,9];
room.icons = ["", "", ""];
group.rooms.push(room);
//big chest
var room = {img:"xtr1", high:true};
room.x = 2; room.y = 4;
room.exits = [0,2,7,11];
room.icons = ["", "ditems_bk", "", "entrancee"];
room.imgs = new Array();
room.imgs.push({img:"bigchest", x:48, y:48});
room.imgs.push({img:"shutter", x:48, y:32});
group.rooms.push(room);
//helma
var room = {img:"xtr4", high:true};
room.x = 1; room.y = 1;
room.exits = [0,7,9];
room.icons = ["", "", ""];
group.rooms.push(room);
//entr
var room = {img:"xtrentr", entr:"main", vhalf:true};
room.x = 3.5; room.y = 2;
room.exits = [2,11];
room.icons = ["", "entrancem"];
room.imgs = new Array();
room.imgs.push({img:"somaria", x:48, y:24});
room.imgs.push({img:"hint", x:40, y:48});
group.rooms.push(room);
//laser wall
var room = {img:"xtrentrw", entr:"west"};
room.x = 1; room.y = 4;
room.exits = [6,10];
room.icons = ["", "entrancew"];
group.rooms.push(room);
//laser bridge
var room = {img:"xtrbridge", entr:"back"};
room.x = 1; room.y = 2;
room.exits = [0,9];
room.icons = ["", "entranceb"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:24, y:16});
room.imgs.push({img:"chest", x:24, y:32});
room.imgs.push({img:"chest", x:8, y:24});
room.imgs.push({img:"chest", x:8, y:40});
group.rooms.push(room);
//compass
var room = {img:"xtrcomp", vhalf:true};
room.x = 3; room.y = 2;
room.exits = [0];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:40});
group.rooms.push(room);
//fire pits
var room = {img:"xtrfire"};
room.x = 4; room.y = 1;
room.exits = [0,3];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"somaria", x:24, y:24});
room.imgs.push({img:"firerod", x:32, y:32});
group.rooms.push(room);
//roller
var room = {img:"xtrroller"};
room.x = 4; room.y = 0;
room.exits = [9];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:8, y:16});
room.imgs.push({img:"chest", x:24, y:16});
group.rooms.push(room);
//chomp
var room = {img:"xtrchomp", vhalf:true};
room.x = 3; room.y = 0;
room.exits = [0,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:32, y:8});
room.imgs.push({img:"chest", x:16, y:16});
room.imgs.push({img:"potkey", x:8, y:48});
group.rooms.push(room);
//pokey
var room = {img:"xtrpokey"};
room.x = 1; room.y = 3;
room.exits = [4,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"potkey", x:48, y:48});
room.imgs.push({img:"xtalswitch", x:40, y:32});
group.rooms.push(room);
//crystal roller
var room = {img:"xtrcrysroll"};
room.x = 2; room.y = 2;
room.exits = [0,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:8, y:16});
room.imgs.push({img:"xtalswitch", x:24, y:8});
group.rooms.push(room);
//dark
var room = {img:"xtrdark"};
room.x = 1; room.y = 0;
room.exits = [0,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"somaria", x:16, y:32});
room.imgs.push({img:"lantern", x:32, y:32});
group.rooms.push(room);
//peg maze
var room = {img:"xtrpegmaze"};
room.x = 0; room.y = 1;
room.exits = [1,8];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:32, y:40});
room.imgs.push({img:"switch0", x:32, y:16});
group.rooms.push(room);
//preboss
var room = {img:"xtrpreboss"};
room.x = 0; room.y = 0;
room.exits = [0,10];
room.icons = ["ditems_bk", ""];
room.imgs = new Array();
room.imgs.push({img:"somaria", x:32, y:32});
group.rooms.push(room);
//trap tile
var room = {img:"xtrtrap", vhalf:true};
room.x = 3.5; room.y = 0;
room.exits = [11];
room.icons = [""];
group.rooms.push(room);

specData.push(group);

//XGT
var group = {popup:true};
group.x = 5; group.y = 6;
group.rooms = new Array();
//lobby
var room = {img:"xgt0", entr:"main", high:true};
room.x = 2; room.y = 2;
room.exits = [0,1,2,10];
room.icons = ["", "", "", "entrancem"];
group.rooms.push(room);
//basement
var room = {img:"xgt1", high:true};
room.x = 2; room.y = 3;
room.exits = [0,2,3,4,5,9];
room.icons = ["", "", "", "", "shutter", ""];
room.imgs = new Array();
room.imgs.push({img:"shutter", x:16, y:32});
room.imgs.push({img:"boots", x:24, y:16});
room.imgs.push({img:"bigchest", x:16, y:48});
room.imgs.push({img:"chest", x:16, y:16});
room.imgs.push({img:"somaria", x:48, y:32});
room.imgs.push({img:"chest", x:56, y:16});
room.imgs.push({img:"chest", x:40, y:16});
group.rooms.push(room);
//hookshot
var room = {img:"xgt4", high:true};
room.x = 1; room.y = 3;
room.exits = [0,4,9];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"hammer", x:48, y:16});
room.imgs.push({img:"potkey", x:56, y:24});
room.imgs.push({img:"chest", x:48, y:48});
room.imgs.push({img:"xtalswitch", x:8, y:48});
room.imgs.push({img:"hookshot", x:8, y:24});
room.imgs.push({img:"boots", x:16, y:24});
group.rooms.push(room);
//teleports
var room = {img:"xgt5", high:true};
room.x = 1; room.y = 4;
room.exits = [0,7,8];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:48, y:8});
room.imgs.push({img:"potkey", x:24, y:16});
room.imgs.push({img:"chest", x:16, y:32});
group.rooms.push(room);
//firerod
var room = {img:"xgt6", high:true};
room.x = 3; room.y = 3;
room.exits = [2,3,11];
room.icons = ["", "", ""];
room.imgs = new Array();
room.imgs.push({img:"firerod", x:48, y:32});
room.imgs.push({img:"chest", x:16, y:8});
group.rooms.push(room);
//invisiblefloor
var room = {img:"xgt2", high:true};
room.x = 2; room.y = 4;
room.exits = [0,2,7,8];
room.icons = ["", "", "", "shutter"];
group.rooms.push(room);
//mini-helmasaur
var room = {img:"xgthelma", high:true};
room.x = 4; room.y = 1;
room.exits = [4,8,9,10];
room.icons = ["", "", "", ""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:48});
room.imgs.push({img:"chest", x:40, y:8});
room.imgs.push({img:"chest", x:56, y:8});
room.imgs.push({img:"potkey", x:56, y:24});
room.imgs.push({img:"torch", x:48, y:48});
room.imgs.push({img:"xtalswitch", x:8, y:40});
group.rooms.push(room);
//moldorm
var room = {img:"xgt3", high:true};
room.x = 4; room.y = 0;
room.exits = [0,2,7,11];
room.icons = ["", "", "", "pit"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:32, y:56});
room.imgs.push({img:"hookshot", x:32, y:40});
group.rooms.push(room);
//DM
var room = {img:"xgtdm"};
room.x = 1; room.y = 2;
room.exits = [10];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:16, y:16});
room.imgs.push({img:"chest", x:16, y:32});
room.imgs.push({img:"chest", x:48, y:16});
room.imgs.push({img:"chest", x:48, y:32});
group.rooms.push(room);
//rando
var room = {img:"xgtrando"};
room.x = 0; room.y = 4;
room.exits = [8];
room.icons = [""];
room.imgs = new Array();
room.imgs.push({img:"chest", x:40, y:8});
room.imgs.push({img:"chest", x:56, y:8});
room.imgs.push({img:"chest", x:40, y:24});
room.imgs.push({img:"chest", x:56, y:24});
group.rooms.push(room);
//compass
var room = {img:"xgtcompass"};
room.x = 3; room.y = 4;
room.exits = [2,8];
room.icons = ["shutter", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:56, y:16});
room.imgs.push({img:"chest", x:8, y:8});
room.imgs.push({img:"chest", x:24, y:8});
room.imgs.push({img:"chest", x:8, y:24});
room.imgs.push({img:"chest", x:24, y:24});
room.imgs.push({img:"potkey", x:32, y:40});
group.rooms.push(room);
//right timer
var room = {img:"xgttimer"};
room.x = 4; room.y = 5;
room.exits = [3,7];
room.icons = ["", ""];
group.rooms.push(room);
//right teleport
var room = {img:"xgteasttele"};
room.x = 3; room.y = 5;
room.exits = [4,7];
room.icons = ["shutter", ""];
group.rooms.push(room);
//ice armos
var room = {img:"xgtice"};
room.x = 2; room.y = 5;
room.exits = [5,11];
room.icons = ["", "shutter"];
room.imgs = new Array();
room.imgs.push({img:"chest", x:48, y:24});
room.imgs.push({img:"chest", x:40, y:8});
room.imgs.push({img:"chest", x:56, y:8});
room.imgs.push({img:"chest", x:64, y:56});
room.imgs.push({img:"enemy", x:48, y:48});
group.rooms.push(room);
//mimic
var room = {img:"xgtmimic"};
room.x = 0; room.y = 1;
room.exits = [1,2];
room.icons = ["", "ditems_bk"];
room.imgs = new Array();
room.imgs.push({img:"allbow10", x:32, y:48});
room.imgs.push({img:"xtalswitch", x:16, y:16});
group.rooms.push(room);
//postmimic
var room = {img:"xgtswitchspike"};
room.x = 0; room.y = 0;
room.exits = [4,11];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"xtalswitch", x:48, y:32});
group.rooms.push(room);
//cannons
var room = {img:"xgtcannons"};
room.x = 1; room.y = 0;
room.exits = [2,3];
room.icons = ["", ""];
group.rooms.push(room);
//gauntlet1
var room = {img:"xgtgauntlet1"};
room.x = 2; room.y = 0;
room.exits = [2,9];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"enemy", x:32, y:32});
group.rooms.push(room);
//gauntlet2
var room = {img:"xgtgauntlet2"};
room.x = 2; room.y = 1;
room.exits = [0,7];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"enemy", x:32, y:32});
group.rooms.push(room);
//lanmo2
var room = {img:"xgtlanmo"};
room.x = 1; room.y = 1;
room.exits = [0,8];
room.icons = ["", "shutter"];
room.imgs = new Array();
room.imgs.push({img:"enemy", x:16, y:48});
group.rooms.push(room);
//wizzrobes
var room = {img:"xgtwizz"};
room.x = 4; room.y = 3;
room.exits = [0,2];
room.icons = ["", ""];
room.imgs = new Array();
room.imgs.push({img:"enemy", x:48, y:16});
group.rooms.push(room);
//collapsing spears
var room = {img:"xgtspears"};
room.x = 4; room.y = 2;
room.exits = [4,11];
room.icons = ["", ""];
group.rooms.push(room);
//postmoldorm
var room = {img:"xgthelmaspike"};
room.x = 3; room.y = 0;
room.exits = [2,8];
room.icons = ["", "shutter"];
group.rooms.push(room);
//preboss
var room = {img:"xgtpreboss"};
room.x = 3; room.y = 1;
room.exits = [0,2];
room.icons = ["ditems_bk", ""];
room.imgs = new Array();
group.rooms.push(room);
specData.push(group);

//Delete
var group = {};
group.rooms = new Array();
//icon
var room = {img:"delete"}; //"delete" is special value for this room to signify delete function
group.rooms.push(room);
specData.push(group);


//***** Superpopup organization *****
var superData = new Array();

var room = {x:0, y:3, dungeon:0, room:0, border:"udr", text:"PoD pits"}; superData.push(room);
var room = {x:5, y:7, dungeon:1, room:0, border:"ulr", text:"IP pits"}; superData.push(room);
var room = {x:5, y:0, dungeon:2, room:0, border:"dlr", text:"MM pits"}; superData.push(room);
var room = {x:1, y:1, dungeon:3, room:0, border:"d"}; superData.push(room);
var room = {x:0, y:1, dungeon:3, room:1, border:"ud"}; superData.push(room);
var room = {x:2, y:1, dungeon:3, room:2, border:"dr"}; superData.push(room);
var room = {x:2, y:0, dungeon:3, room:3, border:"r"}; superData.push(room);
var room = {x:1, y:0, dungeon:3, room:4, border:"l"}; superData.push(room);
var room = {x:2, y:2, dungeon:3, room:5, border:"ulr"}; superData.push(room);
var room = {x:2, y:3, dungeon:3, room:6, border:"ldr"}; superData.push(room);
var room = {x:1, y:2, dungeon:4, room:2, border:"ur"}; superData.push(room);
var room = {x:1, y:2.5, dungeon:4, room:0, border:"rd"}; superData.push(room);
var room = {x:0, y:2, dungeon:4, room:1, border:"ud"}; superData.push(room);
var room = {x:1, y:4, dungeon:5, room:0, border:"dl"}; superData.push(room);
var room = {x:2, y:4, dungeon:5, room:1, border:"udr"}; superData.push(room);
var room = {x:1, y:3, dungeon:5, room:2, border:"lur"}; superData.push(room);
var room = {x:0, y:6, dungeon:6, room:0, border:"dr"}; superData.push(room);
var room = {x:0, y:5, dungeon:6, room:1, border:""}; superData.push(room);
var room = {x:0, y:4, dungeon:6, room:2, border:"ur"}; superData.push(room);
var room = {x:1, y:5, dungeon:6, room:3, border:"urd"}; superData.push(room);
var room = {x:2, y:7, dungeon:7, room:0, border:""}; superData.push(room);
var room = {x:4, y:7, dungeon:7, room:1, border:"ur"}; superData.push(room);
var room = {x:3, y:7, dungeon:7, room:2, border:""}; superData.push(room);
var room = {x:1, y:7, dungeon:7, room:3, border:"u"}; superData.push(room);
var room = {x:0, y:7, dungeon:7, room:4, border:"u"}; superData.push(room);
var room = {x:2, y:6, dungeon:7, room:5, border:"lu"}; superData.push(room);
var room = {x:3, y:6, dungeon:7, room:6, border:"ur"}; superData.push(room);
var room = {x:3, y:2, dungeon:8, room:0, border:"ld"}; superData.push(room);
var room = {x:3, y:1, dungeon:8, room:1, border:"l"}; superData.push(room);
var room = {x:4, y:1, dungeon:8, room:2, border:"r"}; superData.push(room);
var room = {x:4, y:2, dungeon:8, room:3, border:"rd"}; superData.push(room);
var room = {x:4, y:0, dungeon:8, room:4, border:"r"}; superData.push(room);
var room = {x:3, y:0, dungeon:8, room:5, border:"l"}; superData.push(room);
var room = {x:6, y:6, dungeon:8, room:6, border:"lu"}; superData.push(room);
var room = {x:6, y:7, dungeon:8, room:7, border:"l"}; superData.push(room);
var room = {x:5, y:3, dungeon:9, room:0, border:"d"}; superData.push(room);
var room = {x:4, y:3, dungeon:9, room:1, border:"dul"}; superData.push(room);
var room = {x:6, y:3, dungeon:9, room:2, border:"d"}; superData.push(room);
var room = {x:6, y:2, dungeon:9, room:3, border:"u"}; superData.push(room);
var room = {x:5, y:2, dungeon:9, room:4, border:"l"}; superData.push(room);
var room = {x:5, y:1, dungeon:9, room:5, border:"lur"}; superData.push(room);
var room = {x:3, y:3, dungeon:10, room:0, border:"lur"}; superData.push(room);
var room = {x:4, y:4, dungeon:10, room:1, border:"udr"}; superData.push(room);
var room = {x:3, y:4, dungeon:10, room:2, border:"l"}; superData.push(room);
var room = {x:3, y:5, dungeon:10, room:3, border:"rd"}; superData.push(room);
var room = {x:2, y:5, dungeon:10, room:4, border:"udl"}; superData.push(room);
var room = {x:5, y:4, dungeon:11, room:0, border:"ulr"}; superData.push(room);
var room = {x:5, y:5, dungeon:11, room:1, border:""}; superData.push(room);
var room = {x:4, y:5, dungeon:11, room:2, border:"ul"}; superData.push(room);
var room = {x:4, y:6, dungeon:11, room:3, border:"ld"}; superData.push(room);
var room = {x:6, y:5, dungeon:11, room:4, border:"du"}; superData.push(room);
var room = {x:5, y:6, dungeon:11, room:5, border:"dr"}; superData.push(room);
var room = {x:6, y:1, dungeon:11, room:6, border:"l"}; superData.push(room);
var room = {x:6, y:0, dungeon:11, room:7, border:"ld"}; superData.push(room);