exports.baseController = "base";






function startNewGame(){
	openWindow(Alloy.createController("players").getView());
}

function continueGame(){
	openWindow(Alloy.createController("unfinished_games").getView());
}

function showHistory(){
	var prova = Alloy.Collections.game;
	prova.fetch();

	Ti.API.info(JSON.stringify(prova));
}

$.index.open();
