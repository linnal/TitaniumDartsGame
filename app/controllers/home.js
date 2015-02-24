

function startNewGame(){
    openWindow(Alloy.createController("players").getView());
}

function continueGame(){
    openWindow(Alloy.createController("unfinished_games").getView());
}

function showHistory(){
    openWindow(Alloy.createController("history").getView());
}
