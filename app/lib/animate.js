exports.rotate = function(degrees){
    var matrix = Ti.UI.create2DMatrix();
    matrix = matrix.rotate(degrees);
    var animation = Ti.UI.createAnimation({
        transform : matrix,
        duration : 1000,
        autoreverse : false
    });

    return animation;
}

exports.move = function(degrees){
    var animation = Ti.UI.createAnimation({
        duration : 1000,
        backgroundColor : 'black',
        autoreverse: true
    });

    return animation;
}
