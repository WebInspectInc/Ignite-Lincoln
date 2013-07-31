function Text(ctx)
{
	this.ctx = ctx;
	this.wWidth = $(window).width();
	this.wHeight = $(window).height();
	this.widthIsBiggerThanHeight = (wWidth > wHeight) ? true : false;
	this.xHeight = ((this.widthIsBiggerThanHeight) ? this.wHeight * 0.75 : this.wWidth * 0.75);
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
	ctx.font = "bold " + this.xHeight + "px Helvetica";
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
	ctx.font = "500 " + this.mottoTextHeight + "px Helvetica";

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