// initializations

game.load = function(){
    
    game.resourceManager.loadImageSources(
	[
	    {
		src:'rainbowBlock.png',
		id:'rainbowBlock'
	    },
	    {
		src:'rainbowSquare.png',
		id:'rainbowSquare'
	    },
	    {
		src:'boxSquare.png',
		id:'boxSquare'
	    },
	    {
		src:'hudProto.png',
		id:'hudProto'
	    },
	    {
		src:'soldierPose.png',
		id:'soldierPose'
	    },


	]
    );
    game.resourceManager.loadSoundSources([]);
    
    game.resourceManager.load(game.begin);

    var x = function(){
	var currTime = (new Date()).getTime();
	var lastTime = currTime;
	var elaps = 0;
	var drawFrame = 0;
	game.mainLoop = function(){
	    lastTime = currTime;
	    currTime = (new Date()).getTime();
	    elaps = currTime - lastTime;
	    drawFrame += elaps;
	    game.update(elaps);
	    if (drawFrame > 1e3/60){
		drawFrame %= 1e3/60;
		game.draw(elaps);
	    }
	    requestAnimationFrame(game.mainLoop);   
	}
    }();
};

game.begin = function(){
    game.graphicManager.init();
    game.inputManager.init();
    game.gfx.canvas.style.cursor = 'crosshair';
    window.addEventListener(
	'resize',
	function(){
	    game.graphicManager.resizeCanvas();
	    game.sceneManager.currentScene.resize();
	}
    );
    var title = new game.SceneWorkbench({
	id:'title',
	workbenchSize:new misc.V2(1000,1000),
	bg:{//img:game.resourceManager.getImageObject('rainbowSquare'),
	    pattern:{
		type:'checkerboard',
		size:new misc.V2(50,50),
		color1: 'lightgray',
		color2: 'gray',
		loop: new misc.V2(0,0),
		safeLoopBoundaries:function(){
		    return this.size.times(2);
		}
	    },
	    bgColor:'white'
	   }
    });
    title.addObject(new game.Object({
	pos:{x:0,y:0},
	id:'topLeft',
	img:game.resourceManager.getImageObject('rainbowSquare')
    }));
    title.addObject(new game.Object({
	pos:{
	    x:title.workbenchSize.x-game.resourceManager.getImageObject('boxSquare').width,
	    y:0},
	id:'topRight',
	img:game.resourceManager.getImageObject('boxSquare')
    }));
    title.addObject(new game.Object({
	pos:{
	    x:0,
	    y:title.workbenchSize.y-game.resourceManager.getImageObject('boxSquare').height
	    },
	id:'bottomLeft',
	img:game.resourceManager.getImageObject('boxSquare')
    }));
    title.addObject(new game.Object({
	pos:{
	    x:title.workbenchSize.x-game.resourceManager.getImageObject('boxSquare').width,
	    y:title.workbenchSize.y-game.resourceManager.getImageObject('boxSquare').height
	    },
	id:'bottomRight',
	img:game.resourceManager.getImageObject('boxSquare')
    }));
    title.addObject(new game.Object({
	pos: new misc.V2(),
	id:'hud',
	img:game.res.getImageObject('hudProto'),
	ignoreCamera:true
    }));

    var soldier = new game.Sprite({
	img:game.resourceManager.getImageObject('soldierPose'),
	frames:3,
	frameDuration:1000,
	center:{x:8,y:16}
    });

    title.addObject(new game.Object({
	pos:{x:100,y:100},
	id:'soldier',
	sprite:soldier    }));

    game.sceneManager.addScene(title);
    game.sceneManager.switchTo(title);
    game.animate=true;

    window.requestAnimationFrame = function() {
	return window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    window.oRequestAnimationFrame || 
	    function(f) {
		window.setTimeout(f,1e3/60);
	    };
    }();

    game.mainLoop();

};

game.update = function(elaps){
    game.mouse.update();
    game.sceneManager.currentScene.update(elaps);
};

game.draw = function(elaps){
    game.sceneManager.currentScene.draw(elaps);
};

game.end = function(){};
