function ParticleSystem(ctx)
{
	this.ctx = ctx;
	this.particles = [];
	//this.emmisionRate = 35; //per second?
	this.angle = 0;
	this.maxParticles = 350;
}

ParticleSystem.prototype.step = function(delta)
{
	this.angle+= 0.05;

	var i = this.particles.length;
	while(i--)
	{
		this.particles[i].step(delta);
		if (this.particles[i].lifetime < 1) this.particles.splice(i, 1);
	}

	if (this.particles.length < this.maxParticles) this.particles.push(new Particle(this.x, this.y, this.angle, 50, 6));
};

ParticleSystem.prototype.draw = function()
{
	for (var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].draw(this.ctx);
	}
}

function Particle(x, y, angle, speed, lifetime)
{
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.speed = speed;
	this.lifetime = lifetime;
}

Particle.prototype.step = function(delta)
{
	this.x += Math.cos(this.angle) * this.speed * delta;
	this.y += Math.sin(this.angle) * this.speed * delta;
	this.lifetime -= delta;
};

Particle.prototype.draw = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.x, this.y, 10, Math.PI*2, false);
	ctx.fillStyle = "white";
	ctx.fill();
};

/* **********************************************
     Begin index.js
********************************************** */

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