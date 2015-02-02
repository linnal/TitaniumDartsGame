var coll_player = Alloy.Collections.player; 
coll_player.fetch({query:'SELECT * FROM game_round'});

var section = Ti.UI.createListSection({items: insertIntoRow()}); 
$.listView.sections = [section];



function insertIntoRow(){ 
	var data = [];
	for(var i=0; i<coll_player.length; i++){ 
		
		data.push({ 
			// "id": coll_player.at(i).get("id"),
			"lbl_date":{"text": coll_player.at(i).get("id")},
			"lbl_rounds":{"text": coll_player.at(i).get("rounds") + " ROUNDS"},
			"lbl_round_ok":{"text": "a"},
			"lbl_round_ko":{"text": "b"}
		});
	}
	return data;
}
