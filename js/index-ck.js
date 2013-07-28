<<<<<<< HEAD
function ParticleSystem(e){this.ctx=e;this.particles=[];this.angle=0;this.maxParticles=350}function Particle(e,t,n,r,i){this.x=e;this.y=t;this.angle=n;this.speed=r;this.lifetime=i}function drawX(){ctx.fillStyle="#FB0D0B";ctx.font="bold "+xHeight+"px Helvetica";ctx.textAlign="center";ctx.fillText("x",wWidth/2,wHeight/2+xHeight/4);xWidth=ctx.measureText("x").width}function drawMotto(){var e=wHeight/2+xHeight/4,t=wWidth/2,n=findWidth(xWidth,"unleash brilliance");ctx.fillStyle="white";ctx.font=n<30?"200 ":""+n+"px Helvetica";ctx.fillText("unleash brilliance",t,e+n)}function findWidth(e,t){var n=30,r,i,s,o=!1;while(o==0){ctx.font=n+"px Helvetica";r=ctx.measureText(t).width;if(r>e){n--;s?s==0&&(o=!0):s=1}else{n++;s?s==1&&(o=!0):s=0}}return n}function draw(){ctx.clearRect(0,0,wWidth,wHeight);drawX();drawMotto();particleSystem.draw()}function step(e){if(prevTime!=null){var t=(e-prevTime)/1e3;particleSystem.step(t);draw()}window.requestAnimationFrame(step);prevTime=e}(function(){var e=0,t=["webkit","moz"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"]}window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),i=Math.max(0,16-(r-e)),s=window.setTimeout(function(){t(r+i)},i);e=r+i;return s});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})();ParticleSystem.prototype.step=function(e){this.angle+=.05;var t=this.particles.length;while(t--){this.particles[t].step(e);this.particles[t].lifetime<1&&this.particles.splice(t,1)}this.particles.length<this.maxParticles&&this.particles.push(new Particle(this.x,this.y,this.angle,50,6))};ParticleSystem.prototype.draw=function(){for(var e=0;e<this.particles.length;e++)this.particles[e].draw(this.ctx)};Particle.prototype.step=function(e){this.x+=Math.cos(this.angle)*this.speed*e;this.y+=Math.sin(this.angle)*this.speed*e;this.lifetime-=e};Particle.prototype.draw=function(e){e.beginPath();e.arc(this.x,this.y,10,Math.PI*2,!1);e.fillStyle="white";e.fill()};var c=document.getElementById("c"),ctx=c.getContext("2d"),wWidth=$(window).width(),wHeight=$(window).height(),widthIsBiggerThanHeight=wWidth>wHeight?!0:!1,xHeight=widthIsBiggerThanHeight?wHeight*.75:wWidth*.75,xWidth;c.width=wWidth;c.height=wHeight;drawX();drawMotto();var particleSystem=new ParticleSystem(ctx);particleSystem.x=wWidth/2;particleSystem.y=wHeight/2;var prevTime=null;window.requestAnimationFrame(step);
=======
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

/* **********************************************
     Begin ParticleSystem.js
********************************************** */

function ParticleSystem(ctx)
{
	this.ctx = ctx;
	this.particles = [];
	//this.emmisionRate = 35; //per second?
	this.angle = 0;
	this.maxParticles = 350;

	this.fillStyle = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
	this.fillStyle.addColorStop(0, "rgba(255, 255, 255, 1)");
	this.fillStyle.addColorStop(1, "rgba(255, 255, 255, 0)");
}

ParticleSystem.prototype.step = function(delta)
{
	this.angle += 10 * delta;

	if (this.angle >= 360) this.angle -= 360 * 2;
	else if (this.angle <= -360) this.angle += 360;

	var i = this.particles.length;
	while(i--)
	{
		this.particles[i].step(delta);
		if (this.particles[i].lifetime < 1) this.particles.splice(i, 1);
	}

	if (this.particles.length < this.maxParticles) 
		{
			this.particles.push(new Particle(this.x, this.y, this.angle, 50, 6));
			this.particles[this.particles.length - 1].fillStyle = this.fillStyle;
		}
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
	this.fillStyle = "white";
	this.yvel = 0;
}

Particle.prototype.step = function(delta)
{
	this.x += Math.cos(this.angle) * this.speed * delta;
	this.y += Math.sin(this.angle) * this.speed * delta;
	this.yvel += 60 * delta;
	this.y -= this.yvel * delta;
	this.lifetime -= delta;
};

Particle.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.beginPath();
	ctx.translate(this.x, this.y);
	ctx.arc(0, 0, 20, Math.PI*2, false);
	ctx.fillStyle = this.fillStyle;
	ctx.fill();
	ctx.restore();
};

/* **********************************************
     Begin index.js
********************************************** */

//@codekit-prepend "convenience.js", ParticleSystem.js";

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
particleSystem.y = wHeight / 2;

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
>>>>>>> a77f01ab36db23ee8f21694921916f59b2becc71
