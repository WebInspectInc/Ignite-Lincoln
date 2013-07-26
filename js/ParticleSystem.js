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