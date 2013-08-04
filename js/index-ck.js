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

function renderBuffer(width, height, renderFunc)
{
    var buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    if (renderFunc) renderFunc(buffer.getContext("2d"));
    return buffer;
}

/* **********************************************
     Begin ParticleSystem.js
********************************************** */

function ParticleSystem(ctx)
{
	this.ctx = ctx;
	//this.particles = [];
	this.frontParticles = [];
	this.backParticles = [];
	this.emitFrontNext = true;
	//this.emmisionRate = 35; //per second?
	this.angle = 0;
	this.maxParticles = 350;
	this.particlesPerSecond = 30;
	this.deltaElapsed = 0;
	this.xSpread = 200;

	this.particleImage = renderBuffer(40, 40, function(ctx)
	{ 
		ctx.beginPath();
		ctx.moveTo(20, 0);
		ctx.lineTo(10, 20);
		ctx.lineTo(20, 40);
		ctx.lineTo(30, 20);
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();
	});
}

ParticleSystem.prototype.step = function(delta)
{
	this.angle += 10 * delta;

	if (this.angle >= 360) this.angle -= 360 * 2;
	else if (this.angle <= -360) this.angle += 360;

	var particles = this.frontParticles.concat(this.backParticles);

	var self = this;
	var pStep = function(p)
	{
		p.step(delta);
		if (!p.dying && p.living > p.lifetime) p.dying = true;
		else if (p.living - p.deathTime > p.lifetime || p.y + 50 < 0)
		{
			// particles.splice(i, 1);
			if (p.front) self.frontParticles.splice(self.frontParticles.indexOf(p), 1);
			else self.backParticles.splice(self.backParticles.indexOf(p), 1);
		}
	}

	var f = this.frontParticles.length;
	var b = this.backParticles.length;

	var i = particles.length;

	while(i--) 
	{
		pStep(particles[i]);
	}

	for (var time = 1 / this.particlesPerSecond; this.deltaElapsed >= time; this.deltaElapsed -= time)
	{
		this.emit();
	}

	this.deltaElapsed += delta;
}

ParticleSystem.prototype.emit = function()
{
	if (this.frontParticles.length + this.backParticles.length < this.maxParticles) 
	{
		this.emitFrontNext = !this.emitFrontNext;
		var p = new Particle(this.x + (Math.random() - 0.5) * this.xSpread, this.y, Math.random() * 360, 50, Math.random() * 5 + 5)
		p.particleImage = this.particleImage;
		p.front = this.emitFrontNext;
		if (this.emitFrontNext) this.frontParticles.push(p);
		else this.backParticles.push(p);
	}
};

ParticleSystem.prototype.drawFront = function()
{
	for (var i = 0; i < this.frontParticles.length; i++)
	{
		this.frontParticles[i].draw(this.ctx);
	}
}

ParticleSystem.prototype.drawBack = function()
{
	for (var i = 0; i < this.backParticles.length; i++)
	{
		this.backParticles[i].draw(this.ctx);
	}
}

function Particle(x, y, angle, speed, lifetime)
{
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.speed = speed;
	this.lifetime = lifetime;
	this.fillStyle = "white";
	this.yvel = 0;
	this.rotation = 0;
	this.rotMod = Math.random() * 2 - 1;
	this.living = 0;
	this.deathTime = 3;
	this.dying = false;
	this.alpha = 1.0;
	this.front = true;

	this.r = Math.floor(Math.random() * 70) + 250;
	this.g = Math.floor(Math.random() * 70) + 155;
	this.b = Math.floor(Math.random() * 50);
}

Particle.prototype.step = function(delta)
{
	this.x += Math.cos(this.angle) * this.speed * delta;
	this.y += Math.sin(this.angle) * this.speed * delta;
	this.yvel += 60 * delta;
	this.y -= this.yvel * delta;
	this.lifetime -= delta;
	this.living += delta;
	this.rotation += Math.abs(Math.random() * delta * 2);

	var trueYVel = this.yvel + Math.sin(this.angle);
	var trueXVel = Math.cos(this.angle);

	this.newAngle = Math.atan2(trueXVel, trueYVel);

	if (this.dying)
	{
		var timeDying = this.living - this.lifetime;
		var deadness = timeDying / this.deathTime;

		this.alpha = 1.0 - deadness
		// this.r = 23;
		// this.g = 231;
		// this.b = 100 + Math.floor(Math.random() * 100);
		/*this.r = this.g = 150;
		this.b = 120 + Math.floor(Math.random() * 100);*/
		this.r = 220;
		this.g = 188;
		this.b = 255;
	}
};

Particle.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.beginPath();
	ctx.translate(this.x, this.y);
	ctx.scale(0.7, 0.7);
	ctx.rotate(this.newAngle * 180/Math.PI);
	// ctx.drawImage(this.particleImage, -20, -20);

	ctx.beginPath();
	ctx.moveTo(0, 20);
	ctx.lineTo(-10, 0);
	ctx.lineTo(0, -20);
	ctx.lineTo(10, 0);
	ctx.closePath();
	// ctx.fillStyle = this.fillStyle;
	ctx.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.alpha + ")";

	ctx.fill();

	ctx.restore();
};

/* **********************************************
     Begin _events.js
********************************************** */

$(document).on('touchstart', function()
{
	return false;
});

/* **********************************************
     Begin _text.js
********************************************** */

var font = "Helvetica, Arial, sans-serif";

function Text(ctx)
{
	this.ctx = ctx;
	this.wWidth = $(window).width();
	this.wHeight = $(window).height();
	this.widthIsBiggerThanHeight = (wWidth > wHeight) ? true : false;
	this.xHeight = ((this.widthIsBiggerThanHeight) ? this.wHeight * 1.5 : this.wWidth * 1.5);
	this.xWidth = this.findXWidth();
	this.xColor = "rgb(251,13,11)";
	this.count = 200;
	this.fadeIn = true;

	this.mottoY = this.wHeight / 2 + this. xHeight / 4;
	this.mottoX = this.wWidth / 2;
	this.mottoTextHeight = this.findMottoHeight(this.xWidth + 50, "unleash brilliance", ctx);
}

Text.prototype.draw = function(ctx)
{
	this.drawX(ctx);
	this.drawMotto(ctx);
};

Text.prototype.drawX = function(ctx)
{
	if(!ctx) ctx = this.ctx;
	ctx.save();
	ctx.fillStyle = this.xColor;
	ctx.font = "bold " + this.xHeight + "px " + font;
	ctx.textAlign = "center";
	ctx.fillText("x", this.wWidth / 2, this.wHeight / 2 + this.xHeight / 4);
	ctx.restore();
	// var mask = document.createElement('img');
	// mask.src = this.createXImage();

	// var img = document.createElement('img');
	// img.src = "coals.jpg";

	// var test = document.createElement('img');
	// test.src = this.mask(img, mask);

	// ctx.drawImage(mask, this.wWidth / 2 - this.xWidth / 2, this.wHeight / 2 - this.xHeight / 2, this.xWidth, this.xHeight);
};

Text.prototype.drawMotto = function(ctx)
{
	var x = this.mottoX;
	var y = this.mottoY;
	if(!ctx) ctx = this.ctx;

	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "500 " + this.mottoTextHeight + "px " + font;

	ctx.fillText("unleash brilliance", x, y + this.mottoTextHeight);
};

Text.prototype.step = function(delta)
{
	var minRed = 230;
	var maxRed = 251;
	var speed = 15;
	
	if(this.count > maxRed)
		this.forward = false;
	if(this.count < minRed)
		this.forward = true;

	this.forward === true ? this.count += speed * delta : this.count -= speed * delta;

	var red = Math.floor(this.count);

	this.xColor = "rgb(" + red + "," + (red - 200) + ",11)"
};

Text.prototype.findXWidth = function()
{
	var ctx = this.ctx;
	ctx.save();
	ctx.font = "bold " + this.xHeight + "px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("x", this.wWidth / 2, this.wHeight / 2 + this.xHeight / 4);
	var width = ctx.measureText("x").width;
	ctx.restore();
	return width;
};

Text.prototype.findMottoHeight = function(intendedWidth, someText, ctx)
{
	if(!ctx) ctx = this.ctx;
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
};

Text.prototype.createXImage = function()
{
	var width = this.xWidth;
	var height = this.xHeight;
	return renderBuffer(width, height, function(ctx)
	{
		ctx.font = "bold " + this.xHeight + "px Helvetica";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("x", width / 2, height / 2 + this.xHeight / 4);
	}).toDataURL();
};

Text.prototype.mask = function(img, mask)
{
	return renderBuffer(this.xWidth, this.xHeight, function(ctx)
	{
		var width = this.xWidth;
		var height = this.xHeight;
		ctx.drawImage(mask, 0, 0);
		ctx.globalCompositeOperation = 'source-atop';
		ctx.drawImage(img, 0, 0);
	}).toDataURL();
};

/* **********************************************
     Begin index.js
********************************************** */

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
particleSystem.xSpread = text.xWidth;

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
		if (delta < 0.16)
		{
			particleSystem.step(delta);
			text.step(delta);
			draw();
		}
	}
	window.requestAnimationFrame(step);
	prevTime = time;
}

window.requestAnimationFrame(step);
