var db = require("db_helper");

var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];
 
$.listView.addEventListener("itemclick", function(e){
	var item = e.section.getItemAt(e.itemIndex); 
	Ti.API.info(JSON.stringify(item));
	if(!$.b_trash.select){
		//TODO start playing game
	}else{
		e.section.deleteItemsAt(e.itemIndex, 1, []);
		db.deleteGame(item["lbl_date"]["id"]);
		if(e.section.items.length == 0){
			$.win_unfinished_game.close();
		}
	}
});



function insertIntoRow(){ 
	 
	var pendingGames = (db.getPendingGames());
	
	var data = [];
	 
	for(var i=0; i<pendingGames.length; i++){ 
		data.push({  
			"lbl_date":{"text": formatDate(pendingGames[i]["id"]), "id": parseFloat(pendingGames[i]["id"])},
			"lbl_rounds":{"text": pendingGames[i]["rounds_total"] + " ROUNDS"},
			"lbl_round_ok":{"text": pendingGames[i]["rounds_done"]},
			"lbl_round_ko":{"text": pendingGames[i]["rounds_total"]-pendingGames[i]["rounds_done"]},
			"b_del":{"visible": false}
		});
	}
	return data;
}

function formatDate(timestamp){ 
	var date = new Date(timestamp); 
	return (date.getDay()+1) + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + (date.getHours()+1) + ":"+ (date.getMinutes()+1);
}

function deleteFromList(){
	if(!$.b_trash.select){
		$.b_trash.select = true;
		$.b_trash.backgroundImage = "/trash_enable.png";
		
		//change list row with x icon
		for(var i=0; i<section.items.length; i++){
			var item = section.items[i];
			item["b_del"]["visible"] = true;
			
			section.updateItemAt(i, item);
		}
	}else{
		$.b_trash.select = false;
		$.b_trash.backgroundImage = "/trash_idle.png";
		
		for(var i=0; i<section.items.length; i++){
			var item = section.items[i]; 
			item["b_del"]["visible"] = false;
			
			section.updateItemAt(i, item);
		}
	}
}
