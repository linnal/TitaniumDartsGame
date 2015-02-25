

$.win_game_history.addEventListener('open', function(){
    $.listView.sections = populateList();
});


function populateList(){
    var db = require("db_helper");
    var result = [];

    var data = db.getGameHistory(Alloy.Globals.GAME_TIMESTAMP);
    // Ti.API.info(JSON.stringify(data));
    for(var i in data){
        var content = [];
        // Ti.API.info("length " + data[i].length);
        for(var j=0; j<data[i].length; j++){
            var score = data[i][j]["score"].split(",");
            content.push({
                "lbl_name":{"text": data[i][j]["name"]},
                "lbl_first":{"text": score[0]},
                "lbl_second":{"text": score[1]},
                "lbl_third":{"text": score[2]}
            });
            // Ti.API.info(JSON.stringify(content));
        }
        result.push(Ti.UI.createListSection({headerTitle: 'Round ' + i,items: content}));
    }

    return result;
}

function closeWin(){
    closeWindow($.win_game_history);
}
