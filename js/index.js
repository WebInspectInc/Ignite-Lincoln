//@codekit-prepend "convenience.js", ParticleSystem.js", "_events.js", "_text.js";

var c = document.getElementById("c")
	,ctx = c.getContext('2d')
	,wWidth = $(window).width()
	,wHeight = $(window).height()
	;

c.width = wWidth;
c.height = wHeight;

var text = new Text(ctx);

var particleSystem = new ParticleSystem(ctx);
particleSystem.x = wWidth / 2;
particleSystem.y = wHeight / 2 + xHeight / 4;

function draw()
{
	ctx.clearRect(0, 0, wWidth, wHeight);
	text.draw();
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
