var c=document.getElementById("c"),ctx=c.getContext("2d"),wwidth=$(window).width(),wheight=$(window).height(),widthIsBiggerThanHeight=wwidth>wheight?!0:!1,xHeight=widthIsBiggerThanHeight?wheight*.75:wwidth*.75;c.width=wwidth;c.height=wheight;ctx.fillStyle="#FB0D0B";ctx.font="bold "+xHeight+"px Helvetica";ctx.textAlign="center";ctx.fillText("x",wwidth/2,wheight/2+xHeight/4);