var db = require("db_helper");
var section = Ti.UI.createListSection({items: insertIntoRow()});
$.listView.sections = [section];


$.listView.addEventListener("itemclick", function(e){
    Ti.API.info(JSON.stringify(e))
});


for(var i=0; i<section.items.length; i++){
    var item = section.getItemAt(i);
    Ti.API.info(JSON.stringify(item));
}


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
            "v_players":{"name": pendingGames[i]["player"], "score": pendingGames[i]["score"], backgroundColor: "red"},
            "b_row": {"backgroundColor": "yellow"},
            "templ": {"backgroundColor": "transparent"}
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
    Ti.API.info("item " + JSON.stringify(item));

    var animation = Titanium.UI.createAnimation({
        // height : '200dp',
        backgroundColor: "black",
        duration : 1000
    });

    // item.row.animation = animation;
    item.b_row.animation = animation;
    // item.v_players.animation = animation;
    // item.templ.width = "200dp";
    section.updateItemAt(e.itemIndex, item);
}


function closeWin(){
    closeWindow($.win_history)
}
