






function startNewGame(){
	Alloy.createController("players").getView().open();
}

function continueGame(){ 
	Alloy.createController("unfinished_games").getView().open();
}

function showHistory(){
	var prova = Alloy.Collections.game;
	prova.fetch();
	
	Ti.API.info(JSON.stringify(prova));
}

$.index.open();
