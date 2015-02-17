var db = require("db_helper");
var args = arguments[0] || {};

var lblUpdateScore = null;
var lsSelectedRowIndex = 0;
var round = args.round || 1;
var color = "blue";
var ls_players = [];

var section = Ti.UI.createListSection({items: insertIntoRow()});
$.listView.sections = [section];

$.lbl_remaining_rounds.text = Alloy.Globals.ROUNDS -1;
checkForNextRound();



$.listView.addEventListener('itemclick', function(e){
	if(lsSelectedRowIndex != null && lsSelectedRowIndex != e.itemIndex){
		var previous_item = e.section.getItemAt(lsSelectedRowIndex);
		previous_item["v_select"]["backgroundImage"] = "transparent";
		// previous_item["lbl_total_score"]["text"] = parseInt($.b_point_1.text) + parseInt($.b_point_2.text) + parseInt($.b_point_3.text) ;
		e.section.updateItemAt(lsSelectedRowIndex, previous_item);

		savePlayerScore(previous_item["lbl_name"]["text"], round,
						$.b_point_1.text +","+ $.b_point_2.text +","+ $.b_point_3.text,
						color);

		if(lblUpdateScore != null){
			lblUpdateScore.borderColor = "#334D5C";
			lblUpdateScore = null;
		}
	}



	var item = e.section.getItemAt(e.itemIndex);
	item["v_select"]["backgroundImage"] = "/b_selected.png";
	e.section.updateItemAt(e.itemIndex, item);

	lsSelectedRowIndex = e.itemIndex;

	populatePlayerScores(item["lbl_name"]["text"], round);
});

$.win_board_point.addEventListener("android:back", function(){
	goBackHome();
});

function checkForNextRound(){
	$.lbl_round.text = "Round " + round;
	$.lbl_remaining_rounds.text = Alloy.Globals.ROUNDS - round;
	if(Alloy.Globals.ROUNDS > 1 && round < Alloy.Globals.ROUNDS){
		$.lbl_next_round.text ="Round " + (round+1) + " >>";
	}else{
		$.lbl_next_round.text = "Finish";
	}
}

function savePlayerScore(name, round, score, color){
	db.setGamePlayerScore(name, round, score, color, Alloy.Globals.GAME_TIMESTAMP);
}


function populatePlayerScores(name, round){

	var playerData = db.getGamePlayerScore(name, round, Alloy.Globals.GAME_TIMESTAMP);

	var score = (playerData.get("score")).split(",");

	$.b_point_1.text = score[0];
	if(score[0] > 0){
		$.b_succ_1.visible = false;
	}else{
		$.b_succ_1.visible = true;
	}

	$.b_point_2.text = score[1];
	if(score[1] > 0){
		$.b_succ_2.visible = false;
	}else{
		$.b_succ_2.visible = true;
	}

	$.b_point_3.text = score[2];
	if(score[2] > 0){
		$.b_succ_3.visible = false;
	}else{
		$.b_succ_3.visible = true;
	}

	if(playerData.get("color") == "blue"){
		$.v_blue_dart.select = false;
		selectBlueDart();
	}else{
		$.v_yellow_dart.select = false;
		selectYellowDart();
	}


}

function insertIntoRow(){
	var data = [];

	var lsPlayers = db.getPlayerSumScore(Alloy.Globals.GAME_TIMESTAMP, round);
 	var first = 0;
	for(var i in lsPlayers){
		var dict = {};
		ls_players.push(i);
		dict["lbl_name"]={"text": i};
		dict["v_select"]={"backgroundImage": (first==0 ? "/b_selected.png" :"transparent")};
		dict["lbl_total_score"]={"text": lsPlayers[i]};

		data.push(dict);

		first += 1;

		if(first == 1){
			populatePlayerScores(i, round);
		}
	}

	return data;
}

function checkIfListHasPlayer(name){
	for(var i in ls_players){
		if(name == ls_players[i]){
			return true;
		}
	}
	return false;
}

function selectBlueDart(){
		$.v_blue_dart.backgroundImage ="/b_round_idle.png";
		$.v_yellow_dart.backgroundImage = "transparent";
		$.v_blue_dart.select = true;
		$.v_yellow_dart.select = false;
		color = "blue";

}

function selectYellowDart(){
		$.v_yellow_dart.backgroundImage = "/b_round_idle.png";
		$.v_blue_dart.backgroundImage = "transparent";
		$.v_blue_dart.select = false;
		$.v_yellow_dart.select = true;
		color = "yellow";

}

function updateScore1(e){
	$.b_succ_1.visible = false;
	$.b_point_1.borderColor = "#e75151";

	if(! (parseInt($.b_point_2.text) > 0))
		$.b_succ_2.visible = true;
	$.b_point_2.borderColor = "#334D5C";
	if(! (parseInt($.b_point_3.text) > 0))
		$.b_succ_3.visible = true;
	$.b_point_3.borderColor = "#334D5C";

	lblUpdateScore = $.b_point_1;
}
function updateScore2(e){
	$.b_succ_2.visible = false;
	$.b_point_2.borderColor = "#e75151";

	if(! (parseInt($.b_point_1.text) > 0))
		$.b_succ_1.visible = true;
	$.b_point_1.borderColor = "#334D5C";
	if(! (parseInt($.b_point_3.text) > 0))
		$.b_succ_3.visible = true;
	$.b_point_3.borderColor = "#334D5C";

	lblUpdateScore = $.b_point_2;
}
function updateScore3(e){
	$.b_succ_3.visible = false;
	$.b_point_3.borderColor = "#e75151";

	if(! (parseInt($.b_point_2.text) > 0))
		$.b_succ_2.visible = true;
	$.b_point_2.borderColor = "#334D5C";
	if(! (parseInt($.b_point_1.text) > 0))
		$.b_succ_1.visible = true;
	$.b_point_1.borderColor = "#334D5C";

	lblUpdateScore = $.b_point_3;
}

function updateScorePoint(e){
	if(lblUpdateScore != null){
		lblUpdateScore.text = e.source.text;

		var item = section.getItemAt(lsSelectedRowIndex);
		var previous_score = db.getPlayerTotalScore(item["lbl_name"]["text"], Alloy.Globals.GAME_TIMESTAMP);

		item["lbl_total_score"]["text"] = previous_score
										  + parseInt($.b_point_1.text) + parseInt($.b_point_2.text) + parseInt($.b_point_3.text) ;
		section.updateItemAt(lsSelectedRowIndex, item);
	}
}

function resetGame(){
	// save the last user before goind into next round
	if(lsSelectedRowIndex != null){
		var previous_item = section.getItemAt(lsSelectedRowIndex);
		var previous_score = db.getPlayerTotalScore(previous_item["lbl_name"]["text"], Alloy.Globals.GAME_TIMESTAMP);
		previous_item["v_select"]["backgroundImage"] = "transparent";
		previous_item["lbl_total_score"]["text"] = previous_score
										  + parseInt($.b_point_1.text) + parseInt($.b_point_2.text) + parseInt($.b_point_3.text) ;
 		section.updateItemAt(lsSelectedRowIndex, previous_item);

		savePlayerScore(previous_item["lbl_name"]["text"], round,
						$.b_point_1.text +","+ $.b_point_2.text +","+ $.b_point_3.text,
						color);
		if(lblUpdateScore != null){
			lblUpdateScore.borderColor = "#334D5C";
			lblUpdateScore = null;
		}
	}

	//set selected user to 0
	lsSelectedRowIndex = 0;
	var item = section.getItemAt(lsSelectedRowIndex);
	item["v_select"]["backgroundImage"] = "/b_selected.png";
	section.updateItemAt(lsSelectedRowIndex, item);

}

function createNextRound(){
	db.createGameModel(ls_players, Alloy.Globals.GAME_TIMESTAMP, round, function(){
		for(var i=0; i<ls_players.length; i++){
			populatePlayerScores(ls_players[i], round);
		}
	});
}

function nextRound(){
	var nextRound = round + 1;
	if(nextRound < Alloy.Globals.ROUNDS + 1){
		resetGame();

		round += 1;
		$.lbl_round.text = "Round " + nextRound;
		$.lbl_remaining_rounds.text = parseInt($.lbl_remaining_rounds.text) - 1;
		checkForNextRound();

		createNextRound();
	}else{
		resetGame();
		openWindow(Alloy.createController("winners_game").getView());
	}

}
