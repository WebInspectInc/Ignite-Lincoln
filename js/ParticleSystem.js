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