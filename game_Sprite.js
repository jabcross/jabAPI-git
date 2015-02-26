game.Sprite = function(specs){
    this.img = specs.img;
    this.currFrame = 0;
    this.frames = specs.frames;
    this.frameDuration = specs.frameDuration;
    this.center = specs.center;
    this.time = 0;
    if (this.img.width%this.frames!==0){
	console.log('Spritesheet of '+this.img.id+" doesn't match "+ this.frames + 'frames!');
    }
    this.dim = {
	x:Math.floor(this.img.width/this.frames),
	y:this.img.height
    };
};
game.Sprite.prototype = {
};
