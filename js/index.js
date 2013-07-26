var c = document.getElementById("c");
var ctx = c.getContext('2d');

var wwidth = $(window).width();
var wheight = $(window).height();

c.width = wwidth;
c.height = wheight;


ctx.font = "bold 300px Helvetica";
ctx.fillText("x", 200, 200);