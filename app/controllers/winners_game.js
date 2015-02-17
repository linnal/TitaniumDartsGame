var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];
 

function insertIntoRow(){
	var db = require("db_helper");
	var data = [];
	
	var lsPlayers = db.getPlayerSumScore(Alloy.Globals.GAME_TIMESTAMP, Alloy.Globals.ROUNDS); 
 	var count = 0;
 	
 	var values = [];
 	for(var i in lsPlayers){
 		values.push(lsPlayers[i]);
 	}
 	
 	values.sort().reverse();
 	Ti.API.info(JSON.stringify(values));
 	
	while(values.length > 0){
		var max = values.shift();
		for(var i in lsPlayers){
			Ti.API.info(i + "  " + lsPlayers[i]);
			if(lsPlayers[i] == max){
				count += 1;
				var dict = {};
				dict["lbl_pos"]={"text": count};
				dict["lbl_name"]={"text": i};
				dict["lbl_point"]={"text": lsPlayers[i]};  
				
				data.push(dict);
				delete lsPlayers[i];
				
				Ti.API.info(JSON.stringify(lsPlayers));
				break;
			}
		}
	}
 
	return data;
}


$.win_winners.addEventListener("android:back", function(){
	goBackHome();
});