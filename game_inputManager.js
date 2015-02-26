game.inputManager = {
    init: function(){
	game.mouse = {
	    lastPos:{x:0,y:0},
	    currPos:{x:0,y:0},
	    deltaPos:{x:0,y:0},
	    buttons:{
		left:false,
		right:false,
		middle:false,
	    },
	    currentButtons:{
		left:false,
		right:false,
		middle:false,
	    },
	    lastButtons:{
		left:false,
		right:false,
		middle:false,
	    },
	    update:function(){
		misc.absorb(this.lastButtons,this.currentButtons);
		misc.absorb(this.currentButtons,this.buttons);
	    },
	    hasBeenPressed:function(s){
		return (this.lastButtons[s] === false && this.currentButtons[s] === true);
	    },
	    hasBeenReleased:function(s){
		return (this.lastButtons[s] === true && this.currentButtons[s] === false);
	    },
	    isDown:function(s){
		return currentButtons[s];
	    },
	    getFocus:function(){
		var objs = game.sceneManager.currentScene.objectList;
		for (var i = objs.length-1;
		    i >= 0; i--){
		    if (objs[i].checkHitbox({
			type:'point',
			point:new misc.V2(game.mouse.currPos)
		    })){
			return objs[i];
		    }
		}
		return null;
	    }
	};
	var mouseMovement = function (e){
	    game.mouse.lastPos=misc.absorb({},game.mouse.currPos);
	    game.mouse.currPos.x = e.pageX;
	    game.mouse.currPos.y = e.pageY;
	    game.mouse.deltaPos=misc.V2.subtract(game.mouse.currPos,game.mouse.lastPos);
	    game.mouse.focus = game.mouse.getFocus();
	    console.log(game.mouse.focus?game.mouse.focus.id:'none');
	}
	window.addEventListener('mousemove', mouseMovement);
	window.addEventListener('mousestop', mouseMovement);
	window.addEventListener('mousedown', function(e){
	    var e = e ? e:window.event;
	    var s;
	    switch(e.buttons){
	    case 1:
		s = 'left';
		break;
	    case 2:
		s = 'right';
		break;
	    case 4:
		s = 'middle';
		break;
	    }
	    console.log(s + ' down');
	    game.mouse.buttons[s]=true;
	    return cancelDefaultAction(e);
	});
	window.addEventListener('click',function(e){
	    var e = e ? e:window.event;
	    return cancelDefaultAction(e);
	});
	window.addEventListener('mouseup',function(e){
	    var e = e ? e:window.event;
	    var s;
	    switch(e.buttons){
	    case 1:
		s = 'left';
		break;
	    case 2:
		s = 'right';
		break;
	    case 4:
		s = 'middle';
		break;
	    }
	    console.log(s + ' up');
	    game.mouse.buttons[s]=false;
	    return cancelDefaultAction(e);
	});

    },
};
