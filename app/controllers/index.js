






function startNewGame(){
	Alloy.createController("players").getView().open();
}

function continueGame(){
	Alloy.createController("unfinished_games").getView().open();
}

function showHistory(){
	
}

$.index.open();
