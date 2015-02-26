function cancelDefaultAction(e) {
 var evt = e ? e:window.event;
 if (evt.preventDefault) evt.preventDefault();
 evt.returnValue = false;
 return false;
}

// Call the cancelDefaultAction() function
// to prevent the default browser response:

function handleEvent(e) {

}

game.graphicManager = {
    init: function(){
	game.gfx = this;
	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.resizeCanvas();
    },
    drawSkewedVert: function(specs) {
    },
    drawShape: function (shape) {
	if (shape.type === 'rectangle'){
	    if (shape.pattern.type === 'checkerboard'){
		var offset = new misc.V2();
		if (shape.pattern.loop){
		    var ms = (new Date()).getMilliseconds();
		    offset.set(shape.pattern.loop.x*ms/1000,shape.pattern.loop.y*ms/1000);
		}

		for (var i = 0;
		     i <= Math.ceil(shape.dim.x/(shape.pattern.size.x));
		     i++){
		    for (var j = -1;
			 j <= Math.ceil(shape.dim.y/(shape.pattern.size.y));
			 j++){
			this.ctx.fillStyle = ((i+j)%2===0)?
			    shape.pattern.color1:
			    shape.pattern.color2;
			this.ctx.fillRect(shape.pos.x+(i+offset.x)*shape.pattern.size.x,
					  shape.pos.y+(j+offset.y)*shape.pattern.size.y,
					  shape.pattern.size.x,
					  shape.pattern.size.y);
		    }
		}   
	    }
	} 
    },
    drawBackground: function(specs,elaps,camera) {
	if (specs.img){
	    var offset = new misc.V2();
	    var pos = new misc.V2();
	    if (specs.loop){
		var ms = (new Date()).getMilliseconds();
		offset.set(specs.loop.x*ms/1000,specs.loop.y*ms/1000);
	    }
	    for (var i = -1;
		 i <= Math.ceil(this.canvas.width/specs.img.width);
		 i++){
		for (var j = -1;
		     j <= Math.ceil(this.canvas.height/specs.img.height);
		     j++){
		    pos.set(
			    (i+(offset.x)%1)*specs.img.width,
			    (j+(offset.y)%1)*specs.img.height
			)
		    this.drawImage({
			img:specs.img,
			pos:pos
		    });
		}
	    }
	}
	else if (specs.pattern){
	    var pos = specs.pattern.safeLoopBoundaries().times(-1);
	    if (specs.ignoreCamera !== true){
		pos.dec(
		    {
			x:camera.pos.x%specs.pattern.safeLoopBoundaries().x,
			y:camera.pos.y%specs.pattern.safeLoopBoundaries().y,
		    }
		);
	    }
	    this.drawShape({
		type:'rectangle',
		pos:pos,
		dim:(new misc.V2(game.gfx.canvas.width,game.gfx.canvas.height)).add(specs.pattern.safeLoopBoundaries().times(2)),
		pattern:specs.pattern,
	    });
	}
	else{
	    this.ctx.fillStyle = specs.bgColor;
	    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
    },
    draw: function(specs,elaps,camera){
	if (specs.ignoreCamera)camera = {pos:new misc.V2()};
	if (specs.sprite!==undefined){
	    this.drawSprite(specs,elaps,camera);
	}
	else if (specs.img!==undefined){
	    this.drawImage(specs,camera);
	}
    },
    drawSprite:function(specs,elaps,camera){
	if (specs.sprite.frames > 1){
	    specs.sprite.time += elaps;
	    if (specs.sprite.time >= specs.sprite.frameDuration){
		specs.sprite.time %= specs.sprite.frameDuration;
		specs.sprite.currFrame = (specs.sprite.currFrame+1)%specs.sprite.frames;
	    }
	}
	this.drawFrame(specs,camera);
    },
    drawFrame: function(specs,camera){
	this.ctx.drawImage(
	    specs.sprite.img,
	    specs.sprite.currFrame*specs.sprite.dim.x,0,
	    specs.sprite.dim.x,specs.sprite.dim.y,
	    specs.pos.x-specs.sprite.center.x-camera.pos.x,
	    specs.pos.y-specs.sprite.center.y-camera.pos.y,
	    specs.sprite.dim.x,specs.sprite.dim.y
	)
    },
    drawImage: function(specs,camera){
	this.ctx.save();
	if (camera === undefined) camera = {pos:{x:0,y:0}};
	if (specs.scale !== undefined){
	    this.ctx.scale(specs.scale.x,specs.scale.y);
	}
	if (specs.vSkew !== undefined){
	    var pos = new misc.V2();
	    var dir = Math.sign(specs.vSkew)
	    for (pos.x = 0;pos.x < specs.img.width;){
		this.ctx.drawImage(specs.img,
				   pos.x,0,
				   1,specs.img.height,
				   specs.pos.x+pos.x-camera.pos.x,
				   specs.pos.y+pos.y-camera.pos.y,
				   1,specs.img.height);
		pos.x ++;
		if (pos.x % specs.vSkew === 0) pos.y += dir;
	    }
	}
	else{
	    this.ctx.drawImage(specs.img,specs.pos.x-camera.pos.x,specs.pos.y-camera.pos.y);
	}
	this.ctx.restore();
    },
    resizeCanvas: function(){
	this.canvas.width = document.body.clientWidth;
	this.canvas.height = document.body.clientHeight;
    }
};
