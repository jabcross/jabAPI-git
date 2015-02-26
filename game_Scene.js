//specs: id, 

game.Scene = function(specs){
    misc.absorb(this,specs);
    this.constructor = game.Scene;
    this.objectList= [];
    this.pause= false;
    this.camera= {
	pos:{x:0,y:0},
	scale:{x:1,y:1},
	rot:0,
    };
};

game.Scene.prototype = {
    begin:function(){},
    switchIn:function(){},
    end:function(){},
    switchOut:function(){},
    getObject:function(id){
	return misc.searchFor(this.objectList,'id',id);
    },
    addObject: function(){
	for (var i = 0; i < arguments.length; i++){
	    this.objectList.push(arguments[i]);
	}
    },
    update: function(elaps){
	//if (!this.pause) 
        this.objectList.forEach(function(v){v.update(elaps)});
    },
    draw: function(elaps){
	game.gfx.drawBackground(this.bg,elaps,this.camera);
	for (var i = 0; i < this.objectList.length; i++){
	    this.objectList[i].draw(elaps,this.camera);
	}
    },
    resize: function(){

    },
    pause: function(){
	this.pause = true;
    },
    unpause: function(){
	this.pause = false;
    }
}
