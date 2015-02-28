var data = arguments[0].data || {};


$.lbl_date.text = formatDate(data.id);
$.lbl_rounds.text = data.rounds_total + " ROUNDS";
$.row.idGame = data.id;

for(var i=0; i<data.players.length; i++){
    $.v_players.add(createViewPlayer(data.players[i].name, data.players[i].score));
}




function createViewPlayer(name, score){
    var lbl_name= Ti.UI.createLabel({
        top: "10dp",
        text: name,
        color: "white",
        textAlign: "center",
        width: "auto",
        // height: "30dp",
        font:{
            fontSize: "10dp"
        }
    });

    var lbl_score= Ti.UI.createLabel({
        text:  score,
        color: "white",
        textAlign: "center",
        width: "auto",
        // height: "30dp",
        font:{
            fontSize: "15dp"
        }
    });


    var view = Ti.UI.createView({
        width: "50dp",
        height: "50dp",
        left: "10dp",
        layout: "vertical",
        backgroundImage: "/icon_img.png",
        touchEnabled : false
    });

    view.add(lbl_name);
    view.add(lbl_score);

    return view;
}


function showMore(){
    Alloy.Globals.GAME_TIMESTAMP = parseFloat($.row.idGame);
    openWindow(Alloy.createController("game_history").getView());
}


