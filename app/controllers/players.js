var lsPlayers = [];
var nrOfPlayers = 0;
var whichSvView = 0;

var coll_player = Alloy.Collections.player; 
coll_player.fetch({query:'SELECT * FROM player ORDER BY name'});

var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];

$.lbl_round.text = Alloy.Globals.ROUNDS;


coll_player.on('add', function(e){  
	nrOfPlayers += 1;
	
	var newPlayer = {
					"lbl_name":{"text": e.get("name")},
					"lbl_char":{"text": (e.get("name")).charAt(0).toUpperCase()},
					"b_play":{"backgroundImage": "/b_round_idle.png", "play": true}};
					
	section.insertItemsAt(section.items.length, [newPlayer]);
	
	$.txt_field.value = "";
	
	$.listView.scrollToItem(0, section.items.length-1, {
        animated : false
    });
});
 


$.listView.addEventListener("itemclick", function(e){
	var item = e.section.getItemAt(e.itemIndex); 
	if(!$.b_trash.select){
		if(!item["b_play"]["play"]){ 
			item["b_play"]["backgroundImage"] = "/b_round_present.png";
			item["b_play"]["play"] = true;
			lsPlayers.push(item["lbl_name"]["text"]);
		}else{
			item["b_play"]["backgroundImage"] = "/b_round_idle.png"; 
			item["b_play"]["play"] = false;
			for(var i in lsPlayers){ 
				if(lsPlayers[i] == item["lbl_name"]["text"]){
					lsPlayers.splice(i, 1);
				}
			}
		}
		e.section.updateItemAt(e.itemIndex, item); 
	}else{
		e.section.deleteItemsAt(e.itemIndex, 1, []);
	}
});


$.win_players.addEventListener("android:back", function(){
	if(whichSvView == 1){
		$.sv.scrollToView(0);
	}else{
		$.win_players.close();
	}
});


function insertIntoRow(){
	nrOfPlayers = coll_player.length;
	var data = [];
	for(var i=0; i<coll_player.length; i++){ 
		
		data.push({ 
			// "id": coll_player.at(i).get("id"),
			"lbl_name":{"text": coll_player.at(i).get("name")},
			"lbl_char":{"text": coll_player.at(i).get("name").charAt(0).toUpperCase()},
			"b_play":{"backgroundImage": "/b_round_idle.png", "play": false}
		});
	}
	return data;
}




function addNewPlayer(){
	if($.txt_field.value.length > 2 && nrOfPlayers < 100){ 
		var db = require("db_helper");
		db.addPlayer($.txt_field.value); 
	}
}

function next(){
	$.sv.scrollToView(1);
	whichSvView = 1;
}

 
function startGame(){ 
	var db = require("db_helper"); 
	var timestamp = new Date().getTime();
	db.createGameModel(lsPlayers, timestamp, 1,  function(){
		Alloy.Globals.GAME_TIMESTAMP = timestamp;
		Alloy.createController("board_points", {"players": lsPlayers}).getView().open();
	});
}


function decrementRound(){
	if(parseInt($.lbl_round.text) > 1){
		Alloy.Globals.ROUNDS -= 1;
		$.lbl_round.text = Alloy.Globals.ROUNDS;
	}
}

function incrementRound(){
	if(parseInt($.lbl_round.text) < 100){
		Alloy.Globals.ROUNDS += 1;
		$.lbl_round.text = Alloy.Globals.ROUNDS;
	}
}

function deleteFromList(){
	if(!$.b_trash.select){
		$.b_trash.select = true;
		$.b_trash.backgroundImage = "/trash_enable.png";
		
		//change list row with x icon
		for(var i=0; i<section.items.length; i++){
			var item = section.items[i];
			item["b_play"]["backgroundImage"] = "/no.png";
			
			section.updateItemAt(i, item);
		}
	}else{
		$.b_trash.select = false;
		$.b_trash.backgroundImage = "/trash_idle.png";
		
		for(var i=0; i<section.items.length; i++){
			var item = section.items[i];
			Ti.API.info(JSON.stringify(item));
			item["b_play"]["backgroundImage"] = "/b_round_idle.png";
			
			section.updateItemAt(i, item);
		}
	}
}
 
