var db = require("db_helper");


$.win_history_tbl.addEventListener('open', function(){
    populateTable();
});


function populateTable(){

    var pendingGames = db.getFinishedGames();
    var data = [];

    for(var i=0; i<pendingGames.length; i++){

        var row = Ti.UI.createTableViewRow({
            //className:'forumEvent',
            backgroundSelectedColor:'transparent',
            rowIndex:i,
            height:"100dp"
        });

        var row_view = Alloy.createController('history_row', {"data": pendingGames[i]}).getView();

        row.add(row_view);

        data.push(row);
    }

    $.tableView.data = data;
}


function onTableClick(e){
    if(e.source.id == "b_more"){
        if(e.row.height == "200dp"){
            e.row.height = "100dp";
            e.source.backgroundImage = "/expand.png";

            e.row.children[0].children[1].children[5].visible = false;
        }else{
            e.row.height = "200dp";
            e.source.backgroundImage = "/lessen.png";

            e.row.children[0].children[1].children[5].visible = true;
        }
    }else if(e.source.id == "b_del"){
        $.tableView.deleteRow(e.row);
        db.deleteGame(e.row.children[0].children[1].idGame);
    }else{
        // Alloy.Globals.GAME_TIMESTAMP = parseFloat(e.row.children[0].children[1].idGame);
        // openWindow(Alloy.createController("game_history").getView());
    }
}



function deleteFromList(){
    // Ti.API.info(JSON.stringify($.tableView));

    if(!$.b_trash.select){
        $.b_trash.select = true;
        $.b_trash.backgroundImage = "/trash_enable.png";

        //change list row with x icon
        var section  = $.tableView.sections[0];
        // Ti.API.info(section.rows.length);
        for(var i=0; i<section.rows.length; i++){
            section.rows[i].children[0].children[1].children[3].visible = true;
        }

    }else{
        $.b_trash.select = false;
        $.b_trash.backgroundImage = "/trash_idle.png";

        //change list row with x icon
        var section  = $.tableView.sections[0];
        // Ti.API.info(section.rows.length);
        for(var i=0; i<section.rows.length; i++){
            section.rows[i].children[0].children[1].children[3].visible = false;
        }
    }
}


