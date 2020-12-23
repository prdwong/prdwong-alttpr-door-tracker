var options = {};

//USER OPTIONS
options.potsanity = true;
options.lobbyshuffle = true;
options.showcounter = false;
options.disableExits = false;
options.rightErase = false;



options.mode = "normal"; //UI mode -- normal, connect, imager, mover, special, popup

//connect mode
options.connectPlus = false; //indicate if connect mode is overlaid on top of another mode
options.connectStart = {}; //which exit the line drawing initially started from. .room and .exit

//special or imager mode, carrying an image around with the cursor
options.imagerPlus = false; //indicate if imager mode is overlaid on top of another mode
options.imagerSave = ""; //save imager cursor when using imagerPlus
options.cursor = ""; //what the cursor should be. Example: "hookshot"

//special menu, current state of option
options.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//options.special //index of right-side option being used
options.lastDelete = -1;
//options.lastDeleteTime //Last delete click (for double-click detection)

//mover mode
//options.room; //the initial room of the moving command.

//popup mode
//options.popup = ""; //which popup menu is on

//global scratch space
options.images = new Array();
