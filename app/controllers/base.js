Alloy.Globals.openWindows = [];

openWindow = function(win, animate){
	var last_win = Alloy.Globals.openWindows[Alloy.Globals.openWindows.length-1];
	// Ti.API.info(win.id + "   " + last_win.id);
	if(last_win && last_win.id === win.id){
		Ti.API.info(" ###########################################################");
		Ti.API.info(" ######## This window is already open, nothing to do! ######");
		Ti.API.info(" ###########################################################");
	}
	else{
        if(OS_ANDROID)
            win.open({animated:false});
        else if(OS_IOS){
            Alloy.Globals.navigationIos.openWindow(win);
        }
		Alloy.Globals.openWindows.push(win);
	}

	win.addEventListener('close', function(){
		Ti.API.info('Got close event for window ' );
		Alloy.Globals.openWindows.pop();
		$.destroy();
	});
};

closeWindow = function(win){
    if(OS_ANDROID){
        win.close({animated: false});
    }else{
        win.close({animated: true});
    }

};

goBackHome = function(){
	var windows = Alloy.Globals.openWindows;
	var lastWindow = null;
	for (var i=0, j=windows.length; i<j; i++){
        var win = windows[j-i-1];
        if (i==0){
        	lastWindow = win;
        }else{
    		closeWindow(win);
        }
    }
	closeWindow(lastWindow);
};

