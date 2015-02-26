game.resourceManager = function(){
    var images = [];
    var sounds = [];
    return {
	load: function(cB){
	    this.loadImages(cB);
	    game.res = game.resourceManager;
	},
	loadImageSources: function(list){
	    images = list;
	},
	loadSoundSources: function(list){
	    sounds = list;
	},
	addImageSource: function (specs){
	    images.push(
		{
		    src:specs.src,
		    id:specs.id,
		    obj:undefined
		}
	    );
	},
	addSoundSource: function (specs){
	    sounds.push(
		{
		    src:specs.src,
		    id:specs.id,
		    obj:undefined
		}
	    );
	},
	loadImages: function(cB){
	    var callBack = cB;
	    var count = 0;
	    var onLoad = function (){
		count++;
		console.log('Loaded '+count+' of '+images.length +
			    ' images: ' + this.id);
		if (count === images.length){
		    console.log('Finished loading images');
		    game.resourceManager.loadSounds(callBack);
		}
	    };

	    if (images.length === 0){
		console.log('No imagess to load');
		this.loadSounds(callBack);
	    }
	    else {
		console.log("Loading "+images.length+" images");
		for (var i = 0; i<images.length;i++){
			console.log("Trying to load " + images[i].id);
		    images[i].obj = new Image();
		    images[i].obj.src = images[i].src;
		    images[i].obj.id = images[i].id;
		    images[i].obj.index = i;
		    images[i].obj.onload = onLoad;
		}// end for
	    }// end else
	},
	loadSounds: function(cB){
	    var callBack = cB;
	    var count = 0;
	    var onLoad = function (){
		count++;
		console.log('Loaded '+count+' of '+sounds.length +
			    ' sounds: ' + this.id);
		if (count === sounds.length){
		    console.log('Finished loading sounds');
		    callback();
		}
	    };
	    if (sounds.length === 0){
		console.log('No sounds to load');
		callBack();
	    }
	    else {
		console.log("Loading "+sounds.length+" sounds");
		for (var i = 0; i<sounds.length;i++){
		    sounds[i].obj = new Audio(sounds[i].src);
		    sounds[i].obj.id = sounds[i].id;
		    sounds[i].obj.onload = onLoad;
		}// end for
	    }// end else
	},
	getImageObject : function(id){
	    var ret;
	    for (var i = 0; i<images.length; i++){
		if (images[i].id === id){
		    return images[i].obj;
		}
	    }
	    return undefined;
	},
	getSoundObject : function(id){
	    var ret;
	    for (var i = 0; i<sounds.length; i++){
		if (sounds[i].id === id){
		    return sounds[i].obj;
		}
	    }
	    return undefined;
	},
	
    }
}();
