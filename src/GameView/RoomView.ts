/**
* name 
*/
module GameView{
	export class RoomView extends ui.backUI{
		constructor(){
			super();
			this.score3.on(Laya.Event.CLICK, game.room, game.room.wantDiZhu, [3]);
			this.score2.on(Laya.Event.CLICK, game.room, game.room.wantDiZhu, [2]);
			this.score1.on(Laya.Event.CLICK, game.room, game.room.wantDiZhu, [1]);
			this.giveup.on(Laya.Event.CLICK, game.room, game.room.passDiZhu);
			this.outYes.on(Laya.Event.CLICK, game.room, game.room.giveOutAction);
			this.outNo.on(Laya.Event.CLICK, game.room, game.room.passAction);
			this.enter.on(Laya.Event.CLICK, game, game.reMatch);

			this.scoreList.renderHandler = new Laya.Handler(this,this.scoreRender);
		}

		public scoreRender(cell:Laya.Box,index:number):void
		{
			//如果索引不再可索引范围，则终止该函数
			if (index >= game.room.scoreList.length) {
				return;
			}

			let txt = game.room.scoreList[index];
			let scoreItem:any = cell.getChildByName("scoreText");
			scoreItem.text = txt;
		}
	}
}