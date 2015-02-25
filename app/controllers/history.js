var db = require("db_helper");
var anim = require("animate");

var section = null;

$.listView.addEventListener("itemclick", function(e){
    var item = e.section.getItemAt(e.itemIndex);
    if(!$.b_trash.select){
        Alloy.Globals.GAME_TIMESTAMP = parseFloat(item["lbl_date"]["id"]);
        openWindow(Alloy.createController("game_history").getView());
    }else{
        e.section.deleteItemsAt(e.itemIndex, 1, []);
        db.deleteGame(item["lbl_date"]["id"]);
        if(e.section.items.length == 0){
            $.win_unfinished_game.close();
        }
    }
});


$.win_history.addEventListener('open', function(){
    section = Ti.UI.createListSection({items: insertIntoRow()});
    $.listView.sections = [section];
});


function insertIntoRow(){

    var pendingGames = (db.getFinishedGames());
    Ti.API.info(JSON.stringify(pendingGames));
    var data = [];

    for(var i=0; i<pendingGames.length; i++){
        data.push({
            "lbl_date":{"text": formatDate(pendingGames[i]["id"]), "id": parseFloat(pendingGames[i]["id"])},
            "lbl_rounds":{"text": pendingGames[i]["rounds_total"] + " ROUNDS"},
            "b_del":{"visible": false},
            "b_more":{"backgroundImage": "/expand.png"},
            "b_view_table": {"visible": false},
            // "v_players":{"name": pendingGames[i]["player"], "score": pendingGames[i]["score"], backgroundColor: "red"},
            "properties" : {
                //height : '150dp',
                "height" : "100dp",
                "backgroundColor": "transparent"
            }
        });
    }
    return data;
}



function deleteFromList(){
    if(!$.b_trash.select){
        $.b_trash.select = true;
        $.b_trash.backgroundImage = "/trash_enable.png";

        //change list row with x icon
        for(var i=0; i<section.items.length; i++){
            var item = section.items[i];
            item["b_del"]["visible"] = true;

            section.updateItemAt(i, item);
        }
    }else{
        $.b_trash.select = false;
        $.b_trash.backgroundImage = "/trash_idle.png";

        for(var i=0; i<section.items.length; i++){
            var item = section.items[i];
            item["b_del"]["visible"] = false;

            section.updateItemAt(i, item);
        }
    }
}

function createViewRoundPlayer(name, score){
    var view = Ti.UI.createView({
        width: "50dp",
        height: "50dp",
        backgroundImage:"/icon_img.png",
        layout: "vertical"
    });

    var name = Ti.UI.createLabel({
        text: name,
        textAlign: "center"
    });

    var score = Ti.UI.createLabel({
        text: score,
        textAlign: "center"
    })

    view.add(name);
    view.add(score);

    return view;
}


function showMore(e){
    var item = section.getItemAt(e.itemIndex);

    // var anim_rotate = anim.rotate(180);
    // item.b_more.animation = anim_rotate;
    if(item.properties.height == "100dp"){
        Ti.API.info("HEIGHT 100 up");
        item.b_more.backgroundImage = "/lessen.png";
        item.properties.height = "200dp";
        item.b_view_table.visible = true;
    }else{
        Ti.API.info("HEIGHT 200 down");
        item.b_more.backgroundImage = "/expand.png";
        item.properties.height = "100dp";
        item.b_view_table.visible = false;
    }

        section.updateItemAt(e.itemIndex, item);
}


function closeWin(){
    closeWindow($.win_history);
}
