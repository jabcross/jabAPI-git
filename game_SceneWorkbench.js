game.SceneWorkbench = function(specs){
    this.constructor = game.SceneWorkbench;
    this.workbenchSize = new misc.V2(500,500);
    misc.absorb(this,specs);
    this.isDragging = false;
    this.originalDragPos = new misc.V2();
    this.originalCameraPos = new misc.V2();
    this.update = function(elaps){
	if (game.mouse.hasBeenPressed('left')&&game.mouse.focus===null){
	    game.gfx.canvas.style.cursor = 'move';
	    this.originalDragPos.set(game.mouse.currPos);
	    this.originalCameraPos.set(this.camera.pos);
	    this.isDragging = true;
	}
	if (game.mouse.hasBeenReleased('left')){
	    game.gfx.canvas.style.cursor = 'default';
	    this.isDragging = false;
	}
	if (this.isDragging){
	    this.camera.pos=this.originalCameraPos.subtract(misc.V2.subtract(game.mouse.currPos,this.originalDragPos));
	    this.edgeRestriction();
//	    console.log(this.camera.pos);
	}
	this.constructor.prototype.update.apply(this,[elaps]);
    };
    this.resize = function(){
	this.edgeRestriction();
    };
    this.switchIn = function(){
	this.edgeRestriction();
    };
    this.edgeRestriction = function(){
	
	if (this.workbenchSize.x > game.gfx.canvas.width){
	    if (this.camera.pos.x < 0) this.camera.pos.x = 0;
	    if (this.camera.pos.x > this.workbenchSize.x - game.gfx.canvas.width)
		this.camera.pos.x = this.workbenchSize.x - game.gfx.canvas.width;
	}
	else {
	    this.camera.pos.x = -(game.gfx.canvas.width - this.workbenchSize.x) / 2;
	}
	if (this.workbenchSize.y > game.gfx.canvas.height){
	    if (this.camera.pos.y < 0) this.camera.pos.y = 0;
	    if (this.camera.pos.y > this.workbenchSize.y - game.gfx.canvas.height)
		this.camera.pos.y = this.workbenchSize.y - game.gfx.canvas.height;
	    }
	else {
	    this.camera.pos.y = -(game.gfx.canvas.height - this.workbenchSize.y) / 2;
	}
    };
}
game.SceneWorkbench.prototype = new game.Scene();

