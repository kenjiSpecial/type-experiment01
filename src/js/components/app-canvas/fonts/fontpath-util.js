
module.exports.pointToPixel = function(fontSize, dpi){
    dpi = dpi || dpi === 0 ? dpi : 96;
    fontSize = fontSize * dpi / 72;
    return Math.round(fontSize);
};


module.exports.getPxScale = function(font, fontSize) {
    if(font.bitmap)
        return 1.0;

    fontSize = typeof fontSize === "number" ? fontSize : this.pointToPixel(font.size);

    var sz = font.units_per_EM/64;
    sz = (sz/font.size * fontSize);

    //var val = ( 1 / 64/ font.size * fontSize ) ;

    return ((font.resolution * 1/72 * sz) / font.units_per_EM);
};


module.exports.getDistance = function(pt1, pt2){
    var dx = pt1.x - pt2.x;
    var dy = pt1.y - pt2.y;

    var dis = Math.sqrt( dx * dx + dy * dy );

    return dis;
}
