misc = {};
misc.V2 = function(a,b){
//    this.constructor = misc.V2;
    this.x = 0;
    this.y = 0;
     if (b === undefined){
	if (typeof a === 'number'){
	    this.x = a;
	    this.y = a;
	}
	else if (typeof a === 'object'){
	    this.x = a.x;
	    this.y = a.y;
	}
    }
    else {
	this.x = a;
	this.y = b;
    }
};
misc.V2.add = function(a,b){
    return new misc.V2(a.x+b.x,a.y+b.y);
}
misc.V2.subtract = function(a,b){
    return new misc.V2(a.x-b.x,a.y-b.y);
}
misc.V2.prototype = {
    copy: function(){
	return new misc.V2(this.x,this.y);
    },
    negate: function(){
	return new misc.V2(-this.x,-this.y);
    },
    add: function(x){
	return new misc.V2(this.x+x.x,this.y+x.y);
    },
    subtract: function(x){
	var v = new misc.V2(x);
	return new misc.V2(this.x-v.x,this.y-v.y);
    },
    set: misc.V2,
    inc: function(x){
	if (x === undefined) {
	    console.log('increment is undefined');
	    return this;
	}
	var v = new misc.V2(x);
	this.x += v.x;
	this.y += v.y;
	return this;
    },
    dec: function(x){
	if (x === undefined) {
	    console.log('increment is undefined');
	    return this;
	}
	var v = new misc.V2(x);
	this.x -= v.x;
	this.y -= v.y;
	return this;
    },
    times: function(s){
	return new misc.V2(this.x*s,this.y*s);
    }
};
misc.absorb=function(obj,targ){
    if (targ === undefined) return obj;
    var keys = Object.keys(targ);
    for (var i = 0; i < keys.length; i++){
	obj[keys[i]]=targ[keys[i]];
    }
    return obj;
}
misc.searchFor = function(array,keyname,value){
    for (var i = 0; i<array.length;i++){
	if (array[i][keyname]===value) return array[i];
    }
    return null;
}
