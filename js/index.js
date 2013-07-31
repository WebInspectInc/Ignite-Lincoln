//@codekit-prepend "convenience.js", ParticleSystem.js", "_events.js", "_text.js";

var c = document.getElementById("c")
	,ctx = c.getContext('2d')
	,wWidth = $(window).width()
	,wHeight = $(window).height()
	,widthIsBiggerThanHeight = (wWidth > wHeight) ? true : false
	,xHeight = ((widthIsBiggerThanHeight) ? wHeight * 0.75 : wWidth * 0.75)
	;

c.width = wWidth;
c.height = wHeight;

//test
var text = new Text(ctx);

var particleSystem = new ParticleSystem(ctx);
particleSystem.x = wWidth / 2;
particleSystem.y = wHeight / 2 + text.xHeight / 4 - 20;

function draw()
{
	ctx.clearRect(0, 0, wWidth, wHeight);
	particleSystem.drawBack();
	text.drawX();
	//particleSystem.draw();
	particleSystem.drawFront();
	//text.drawMotto();
}

var prevTime = null

function step(time)
{
	if (prevTime != null)
	{
		var delta = (time - prevTime) / 1000;
		particleSystem.step(delta);
		text.step(delta);
		draw();
	}
	window.requestAnimationFrame(step);
	prevTime = time;
}

window.requestAnimationFrame(step);
