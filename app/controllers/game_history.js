

$.win_game_history.addEventListener('open', function(){
    $.listView.sections = populateList();
});


function populateList(){
    var db = require("db_helper");
    var result = [];



    var data = db.getGameHistory(Alloy.Globals.GAME_TIMESTAMP);
    // Ti.API.info(JSON.stringify(data));
    for(var i in data){
        var header = Ti.UI.createView({
            backgroundColor: "#29695b",
            height: "50dp"
        });
        var title = Ti.UI.createLabel({
            color: "white",
            text: "Round " + i,
            font:{
                fontSize: "22dp"
            },
            left: "10dp"
        });

        header.add(title);
        var round_max = {"pos":0, "vl":0};
        var content = [];
        // Ti.API.info("length " + data[i].length);
        for(var j=0; j<data[i].length; j++){
            var score = data[i][j]["score"].split(",");

            if((parseInt(score[0])+parseInt(score[1])+parseInt(score[2])) > round_max.vl){
                round_max.vl = parseInt(score[0])+parseInt(score[1])+parseInt(score[2]);
                round_max.pos = j;
            }

            content.push({
                "lbl_name":{"text": data[i][j]["name"]},
                "lbl_first":{"text": score[0]},
                "lbl_second":{"text": score[1]},
                "lbl_third":{"text": score[2]}
            });

        }

        // Ti.API.info("max content " + JSON.stringify(content[round_max.pos]));
        // Ti.API.info("round max " + JSON.stringify(round_max));
        content[round_max.pos]["img_star"] = {"visible":true};

        result.push(Ti.UI.createListSection({headerView: header,
                                             items: content}));
    }

    return result;
}

function closeWin(){
    closeWindow($.win_game_history);
}
