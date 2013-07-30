function Text(ctx)
{
	this.ctx = ctx;
	this.wWidth = $(window).width();
	this.wHeight = $(window).height();
	this.widthIsBiggerThanHeight = (wWidth > wHeight) ? true : false;
	this.xHeight = ((this.widthIsBiggerThanHeight) ? this.wHeight * 0.75 : this.wWidth * 0.75);
	this.xWidth = this.findXWidth();
	this.xColor = "rgb(251,13,11)";
	this.count = 0;

	this.mottoY = this.wHeight / 2 + this. xHeight / 4;
	this.mottoX = this.wWidth / 2;
	this.mottoTextHeight = this.findXHeight(this.xWidth, "unleash brilliance", ctx);
	console.log(this.mottoTextHeight);
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
	ctx.font = "bold " + this.xHeight + "px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("x", this.wWidth / 2, this.wHeight / 2 + this.xHeight / 4);
	ctx.restore();
};

Text.prototype.drawMotto = function(ctx)
{
	var x = this.mottoX;
	var y = this.mottoY;
	if(!ctx) ctx = this.ctx;

	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = (this.mottoTextHeight < 30) ? "200 " : "" + this.mottoTextHeight + "px Helvetica";

	ctx.fillText("unleash brilliance", x, y + this.mottoTextHeight);
};

Text.prototype.step = function(delta)
{
	var minRed = 100;
	var maxRed = 251;
	var speed = 150;
	
	if(this.count > maxRed)
		this.forward = false;
	if(this.count < minRed)
		this.forward = true;

	this.forward === true ? this.count += speed * delta : this.count -= speed * delta;

	console.log(this.count)
	this.animLength = 5000;

	var red = (Math.floor(this.count) % this.animLength);

	this.xColor = "rgb(" + red + ",13,11)"
};

Text.prototype.findXWidth = function()
{
	var ctx = this.ctx;
	ctx.save();
	ctx.font = "bold " + this.xHeight + "px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("x", this.wWidth / 2, this.wHeight / 2 + this.xHeight / 4);
	var a = ctx.measureText("x").width;
	ctx.restore();
	return a;
};

Text.prototype.findXHeight = function(intendedWidth, someText, ctx)
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