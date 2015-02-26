game.Object = function(specs){
    misc.absorb(this,specs);
    this.getHitbox();
};

game.Object.prototype = {
    pos:new misc.V2(),
    update:function(elaps){
	},
    draw:function(elaps,camera){
	game.graphicManager.draw(this,elaps,camera);
    },
    getHitbox: function(){
	if (this.hitbox) {}
	else if (this.img){
	    this.hitbox = {
		type: 'rectangle',
		point1: new misc.V2(),
		point2: new misc.V2(this.img.width,this.img.height)
	    }
	}
	else if (this.sprite) { 
	    this.hitbox = {
		type: 'rectangle',
		point1: (new misc.V2(this.sprite.center)).negate(),
		point2: new misc.V2(this.sprite.dim)
	    }
	}
	return this.hitbox;
    },
    checkHitbox:function(specs){
	if (specs.type = 'point'){
	    if (this.hitbox.type ='rectangle'){
		var pos = new misc.V2(this.pos);
		if (this.ignoreCamera!==true)pos.dec(game.sceneManager.currentScene.camera.pos);
//		console.log(game.sceneManager.currentScene.camera.pos);
		if (game.mouse.currPos.x >= pos.x+this.hitbox.point1.x &&
		    game.mouse.currPos.x <= pos.x+this.hitbox.point2.x &&
		    game.mouse.currPos.y >= pos.y+this.hitbox.point1.y &&	
		    game.mouse.currPos.y <= pos.y+this.hitbox.point2.y)
		    return true;
	    }
	}
	return false;
    }
};
