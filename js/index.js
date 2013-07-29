//@codekit-prepend "convenience.js", ParticleSystem.js", "_events.js";

var c = document.getElementById("c")
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
	var textHeight = findWidth(xWidth, "unleash brilliance");

	ctx.fillStyle = "white";
	ctx.font = (textHeight < 30) ? "200 " : "" + textHeight + "px Helvetica";

	ctx.fillText("unleash brilliance", x, y + textHeight);
}

function findWidth(intendedWidth, someText)
{
	var size = 30,
		test, fin, dir,
		end = false;

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

var particleSystem = new ParticleSystem(ctx);
particleSystem.x = wWidth / 2;
particleSystem.y = wHeight / 2 + xHeight / 4;

function draw()
{
	ctx.clearRect(0, 0, wWidth, wHeight);
	drawX();
	drawMotto();
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
