/**
* name 
*/
module GameView{
	export class EnterView extends ui.enterUI{
		constructor(){
			super();
			this.enter.on(Laya.Event.CLICK, game, game.beginMatch);
			this.isMatching.visible = false;
			this.enter.visible = true;
		}
	}
}