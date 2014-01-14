window.onload = function () {

	if (typeof Object.beget!=='function'){
		Object.beget = function (o) {
			var F = function (){};
			F.prototype = o;
			return new F();
		}
	}
	
	if (typeof Object.prototype.descend!=='function'){
		Object.prototype.descend = function() {
			var F = function(){};
			F.prototype = this;
			return new F();
		}	
	}
	
	game = {};

	game.resourceManager = function(){
		var imageSources = [];
		var imageObjects = [];
		return {
			addImageSource: function (src){
				imageSources.push(src);
			},
			loadImages: function(cB){
				var callback = cB;
				var count = imageSources.length;
				for (var i = 0; i<imageSources.length;i++){
					imageObjects[i] = new Image();
					imageObjects[i].src = imageSources[i];
					imageObjects[i].onload = function (){
						count--;
						if (count === 0){
							callback();
						}
					}
				}	
			},
			getImageObject : function(src){
				var ret;
				for (var i = 0; i<imageObjects.length; i++){
					if (imageSources[i] === src){
						return imageObjects[i];
					}
				}
				return undefined;
			}
		}
	}();
	game.object = function(){
		return {
			pos:{
				x:0,
				y:0
			},
			update:function(){
			},
			draw:function(){
			}
		}
	}();
	game.sceneManager = function(){
		return {
			sceneList : [],
			addScene : function(_id){
				var s = {
					objectList:[],
					id:_id,
					addObject:function(obj){
						objectList.push(obj);
					},
					begin : function(){
					},
					end : function(){
					},
					update : function(){
					},
					draw : function(){
					}
				};
				sceneList.push(s);
			}
		}
	}();
	game.sceneManager.addScene("intro");
	game.fadeToWhite = function fadeToWhite(alphaVal,callback){
			var alphaVal = (alphaVal==undefined)?0.02:parseFloat(alphaVal)+0.02;
			with(game.canvas.ctx){
				fillStyle="white";
				globalAlpha=alphaVal;
				fillRect(0,0,game.canvas.width,game.canvas.height);
			}
			if (alphaVal < 1.0) {
				setTimeout(function(){
					fadeToWhite(alphaVal);
				},30);
			}
			else (typeof callback === 'function'?callback:function(){})();
		}

	game.onResourcesLoaded = function(){
		game.canvas = document.getElementById('game');
		// Force canvas to dynamically change its size to
		// the same width/height as the browser window
		game.canvas.width = document.body.clientWidth;
		game.canvas.height = document.body.clientHeight;
		game.canvas.ctx = game.canvas.getContext('2d');


		game.intro = {};
		game.intro.grd=game.canvas.ctx.createLinearGradient			(0,0,game.canvas.width,game.canvas.height);
		with(game.intro.grd){
			addColorStop(0,'#ceefff');
			addColorStop(1,'52bcff');
		}
		
		game.intro.showIntro = function () {
			var phrase = "Click or tap the screen to start the game";
			game.canvas.ctx.fillStyle=game.intro.grd;
			game.canvas.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);	
			var orgWidth;
			var logo = {};
			var textSize;
			var xCoord;
			var logoImg = game.resourceManager.getImageObject('logo.png');
			orgWidth = logoImg.width;
			logoImg.width = Math.round(document.body.clientWidth/2);	
			logoImg.height = logoImg.height*logoImg.width/orgWidth;
			logo.img = logoImg;
			logo.x = (game.canvas.width-logoImg.width)/2;
			logo.y = (game.canvas.height-logoImg.height)/2;
			game.canvas.ctx.drawImage(logo.img,logo.x,logo.y,logo.img.width,logo.img.height);		
			game.canvas.ctx.fillStyle='black';
			game.canvas.ctx.font = 'bold 16px Arial, sans-serif';
			textSize = game.canvas.ctx.measureText(phrase);
			xCoord = (game.canvas.width-textSize.width)/2;
			game.canvas.ctx.fillText(phrase,xCoord,logo.y+logo.img.height+50);
		}

		var State = {
			_current: 0,
			INTRO:0,
			LOADING:1,
			LOADED:2
		}

		window.addEventListener('click',handleClick,false);
		window.addEventListener('resize',doResize,false);

		doResize();

		function handleClick() {
			State._current = State.LOADING;
			game.fadeToWhite();	
		}
	
		function doResize(){
			with (game.canvas){
				width = document.body.clientWidth;
				height = document.body.clientHeight;
			}
			switch (State._current){
				case State.INTRO:
					game.intro.showIntro();
					break;
			}
		}
		game.intro.showIntro();
	}
	
	game.resourceManager.addImageSource("logo.png");
	game.resourceManager.loadImages(game.onResourcesLoaded);
}

