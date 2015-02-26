game.sceneManager = {
    sceneList : [],
    currentScene: null,
    addScene : function(s){
	this.sceneList.push(s);
    },
    switchTo: function(s){
	this.currentScene = s;
	s.switchIn();
    }
}
