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
<<<<<<< HEAD
	,ctx = c.getContext('2d')
	,wWidth = $(window).width()
	,wHeight = $(window).height()
	,widthIsBiggerThanHeight = (wWidth > wHeight) ? true : false
	,xHeight = ((widthIsBiggerThanHeight) ? wHeight * 0.75 : wWidth * 0.75)
	,xWidth
	;

c.width = wWidth;
c.height = wHeight;

drawX();
drawMotto();


function drawX()
{
	ctx.fillStyle = "#FB0D0B";
	ctx.font = "bold " + xHeight + "px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("x", wWidth / 2, wHeight / 2 + xHeight / 4);
	xWidth = ctx.measureText("x").width;
}

function drawMotto()
{
	var y = wHeight / 2 + xHeight / 4;
	var x = wWidth / 2;
	var textHeight = findWidth(xWidth, "unleashing brilliance");

	ctx.fillStyle = "white";
	ctx.font = (textHeight < 30) ? "200 " : "" + textHeight + "px Helvetica";

	ctx.fillText("unleashing brilliance", x, y + textHeight);
}

function findWidth(intendedWidth, someText)
{
	var size = 30,
		test, fin, dir,
		end = false;

	console.log("ha");
	console.log(someText);

	while(end == false)
	{
		ctx.font = size + "px Helvetica";
		test = ctx.measureText(someText).width;
		if(test > intendedWidth)
		{
			size--;
			if(!dir)
				dir = 1;
			else if(dir == 0)
				end = true;
		}
		else
		{
			size++;
			if(!dir)
				dir = 0;
			else if(dir == 1)
				end = true;
		}
	}
	return size;
}
=======
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
>>>>>>> c793997b5382196a1c9a0f166447435e50ef53d5
