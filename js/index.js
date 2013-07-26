//@codekit-prepend "ParticleSystem.js";

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var c = document.getElementById("c")
,ctx = c.getContext('2d')
,wwidth = $(window).width()
,wheight = $(window).height()
,widthIsBiggerThanHeight = (wwidth > wheight) ? true : false
,xHeight = ((widthIsBiggerThanHeight) ? wheight * 0.75 : wwidth * 0.75)
;

c.width = wwidth;
c.height = wheight;



var particleSystem = new ParticleSystem(ctx);
particleSystem.x = wwidth / 2;
particleSystem.y = wheight / 2;

function draw()
{
	ctx.clearRect(0, 0, wwidth, wheight);
	ctx.fillStyle = "#FB0D0B";
	ctx.font = "bold " + xHeight + "px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("x", wwidth / 2, wheight / 2 + xHeight / 4);
	particleSystem.draw();
}

var prevTime = null

function step(time)
{
	if (prevTime != null)
	{
		var delta = (time - prevTime) / 1000;
		particleSystem.step(delta);
		draw();
	}
	window.requestAnimationFrame(step);
	prevTime = time;
}

window.requestAnimationFrame(step);