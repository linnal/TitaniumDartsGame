exports.addPlayer = function(name){
	var player = Alloy.createModel("player", {
		"name" : name
	});

	player.save();

	Alloy.Collections.player.add(player);
};

exports.createGameModel = function(names, timestamp, round, callback){

	for(var i in names){
		var game = Alloy.createModel("game",{
			"player": names[i],
			"score": "-1,-1,-1",
			"timestamp": timestamp,
			"color": "blue",
			"round": round
		});

		game.save();

		Alloy.Collections.game.add(game);

		if(i == names.length-1){
			callback();
		}
	}
};


exports.getGamePlayerScore = function(name, round, timestamp){
	var coll = Alloy.Collections.game;
	coll.fetch({query: { statement: "SELECT * FROM game WHERE player=? and round=? and timestamp=? ORDER BY timestamp",
						 params:[name, round, timestamp]}});

	var res = coll.at(0);

	return res;
};

exports.setGamePlayerScore = function(name, round, score, color, timestamp){
	var player = exports.getGamePlayerScore(name, round, timestamp);

	player.set({"score" : score});
	player.set({"color" : color});

	player.save();
};


exports.getPlayerTotalScore = function(name, timestamp){
	var coll = Alloy.Collections.game;
	coll.fetch({query: { statement: "SELECT * FROM game WHERE player=? and timestamp=? ORDER BY round",
						 params:[name, timestamp]}});

	var res = 0;

	for(var i=0; i<coll.length-1; i++){
		var score = coll.at(i).get("score").split(",");

		res += (parseInt(score[0]) + parseInt(score[1]) + parseInt(score[2]));
	}

	return res;
};




exports.saveGameRounds = function(id, round){
	var gameRoundModel = Alloy.createModel('game_round',
						{
							"game_id": id,
							"rounds": round
						});

	gameRoundModel.save();

	Alloy.Collections.game_round.add(gameRoundModel);
};

exports.getGameRounds = function(id){
	var collection = Alloy.Collections.game_round;
	collection.fetch({query: {statement: "SELECT * FROM game_round WHERE id=?", params:[id]}});

	return collection.at(0);
};


exports.getPendingGames = function(){
	var result = [];

	var collection_round = Alloy.Collections.game_round;
	collection_round.fetch({query: "SELECT * FROM game_round"});
	var collection_game = Alloy.Collections.game;
	for(var i=0; i<collection_round.length; i++){
		var id = collection_round.at(i).get("game_id");
		var rounds_total = parseInt(collection_round.at(i).get("rounds"));
		collection_game.fetch({query:{statement: "SELECT DISTINCT round FROM game WHERE timestamp=?", params:[id]}});
		if(collection_game.length < rounds_total){
			result.push({"id": parseFloat(id), "rounds_total": rounds_total, "rounds_done": collection_game.length});
		}else if(!areAllPlayersScoreSet(id, rounds_total)){
			result.push({"id": parseFloat(id), "rounds_total": rounds_total, "rounds_done": rounds_total});
		}
	}
	return result;
};


exports.deletePlayer = function(name){
	var collection_player = Alloy.Collections.player;
	collection_player.fetch({query:{statement: "SELECT * FROM player WHERE name=?", params:[name]}});

	for(var i=0; i<collection_player.length; i++){
		collection_player.at(i).destroy();
	}
};


exports.deleteGame = function(id){

	var collection_round = Alloy.Collections.game_round;
	collection_round.fetch({query:{statement: "SELECT * FROM game_round WHERE game_id=?", params:[id]}});
	var collection_game = Alloy.Collections.game;
	collection_game.fetch({query:{statement: "SELECT * FROM game WHERE timestamp=?", params:[id]}});

	for(var i=0; i<collection_round.length; i++){
		collection_round.at(i).destroy();
	}
	for(var i=0; i<collection_game.length; i++){
		collection_game.at(i).destroy();
	}
};

exports.getGamePlayers = function(id){
	var result = [];

	var collection_game = Alloy.Collections.game;
	collection_game.fetch({query:{statement: "SELECT DISTINCT player FROM game WHERE timestamp=?", params:[id]}});

	for(var i=0; i<collection_game.length; i++){
		result.push(collection_game.at(i).get("player"));
	}

	return result;
};



exports.getPlayerSumScore = function(id, round){
	var collection_game = Alloy.Collections.game;
	collection_game.fetch({query:{statement: "SELECT  player, score FROM game WHERE timestamp=? and round<=?", params:[id, round]}});

	var result = {};
	var name = "";

	for(var i=0; i<collection_game.length; i++){
		name = collection_game.at(i).get("player");
		var sc = collection_game.at(i).get("score").split(",");
		var score = (parseInt(sc[0]) + parseInt(sc[1]) + parseInt(sc[2]));

		if(result[name])
			result[name] += (score < 0 ? 0 : score);
		else
			result[name] = (score < 0 ? 0 : score);
	}

	return result;
};


exports.getUnscoredPlayers = function(id, round){
	var result = [];
	var collection_game = Alloy.Collections.game;
	collection_game.fetch({query:{statement: "SELECT player, score FROM game WHERE timestamp=? and round=?", params:[id, round]}});

		for(var i=0; i<collection_game.length; i++){
			name = collection_game.at(i).get("player");
			var sc = collection_game.at(i).get("score").split(",");
			var score = (parseInt(sc[0]) + parseInt(sc[1]) + parseInt(sc[2]));

			if(score < 0){
				result.push(name);
			}
		}
	return result;
}


exports.getFinishedGames = function(){
	var result = [];

	var collection_round = Alloy.Collections.game_round;
	collection_round.fetch({query: "SELECT * FROM game_round ORDER BY game_id DESC"});
	var collection_game = Alloy.Collections.game;
	for(var i=0; i<collection_round.length; i++){
		var id = parseFloat(collection_round.at(i).get("game_id"));
		var rounds_total = parseInt(collection_round.at(i).get("rounds"));
		collection_game.fetch({query:{statement: "SELECT DISTINCT round FROM game WHERE timestamp=?", params:[id]}});

		if(collection_game.length == rounds_total){
			var arr_players = [];
			var players = exports.getGamePlayers(id);
			for(var p in players){

				score = exports.getPlayerTotalScore(players[p], id)
				arr_players.push({"name": players[p], "score": score});
			}

			result.push({"id": id, "players": arr_players,"rounds_total": rounds_total});
		}
	}
	return result;
}


exports.getGameHistory = function(id){
	var result = {};
	var collection_game = Alloy.Collections.game;
	collection_game.fetch({query:{statement: "SELECT * FROM game WHERE timestamp=?", params:[id]}});

	for(var i=0; i<collection_game.length; i++){
		var res = collection_game.at(i);
		var round = res.get("round");
		var d = {"name": res.get("player"), "score": res.get("score")};
		if(result[round]){
			result[round].push(d);
		}else{
			result[round] = [d];
		}
	}

	return result;
}



areAllPlayersScoreSet = function(id, round){
	var coll_game = Alloy.Collections.game;
	coll_game.fetch({query:{statement: "SELECT * FROM game WHERE timestamp=? and round=?", params:[id, round]}});
	Ti.API.info("length " + coll_game.length);
	for(var i=0; i<coll_game.length; i++){
		Ti.API.info(JSON.stringify(coll_game.at(i)));
		var sc = coll_game.at(i).get("score").split(",");
		var score = (parseInt(sc[0]) + parseInt(sc[1]) + parseInt(sc[2]));
		Ti.API.info("Player: " + coll_game.at(i).get("player") + " Score : " + score)
		if(score < 0) {
			return false
		}
	}

	return true;
}












