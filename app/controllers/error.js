var args = arguments[0] || {};

$.lbl_msg.text = args.msg;
$.img.image = args.img;


$.win_error.addEventListener("open", function(){
	setTimeout(function(){
		$.win_error.close();
	}, 4000);
});
