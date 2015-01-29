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
			"score": "0,0,0",
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
	coll.fetch({query: { statement: "SELECT * FROM game WHERE player=? and round=? and timestamp=?", 
						 params:[name, round, timestamp]}});
						 
	var res = coll.at(0);
	
	return res;
};

exports.setGamePlayerScore = function(name, round, score, color, timestamp){ 
	Ti.API.info("setGamePlayerScore " + score);
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
		Ti.API.info(JSON.stringify(coll.at(i)));
		var score = coll.at(i).get("score").split(",");
		
		res += (parseInt(score[0]) + parseInt(score[1]) + parseInt(score[2]));
	}
	
	return res;
};















