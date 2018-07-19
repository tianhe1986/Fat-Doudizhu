/**
* name 
*/
module Game{
	export class Poker extends Laya.Image{
		//index序号
		protected _index:number;

		//点数
		public point:number;

		public isSelected:boolean = false;

		//图片
		public img:string = "doudizhu/bg_poker.png";

		constructor(){
			super();
			this.width = 105;
			this.height = 150;
		}

		public recover()
		{
			this.off(Laya.Event.CLICK, this, this.switchStatus);
			this.img = "doudizhu/bg_poker.png";
		}

		public switchStatus()
		{
			if (game.room.canSelect) {
				this.isSelected = ! this.isSelected;
				if (this.isSelected) {
					this.y = -20;
				} else {
					this.y = 0;
				}
				game.room.checkOutPokers();
			}
		}

		public set index(value:number)
		{
			this._index = value;
			this.img = "poker/" + value + ".jpg";
			if (value < 53) {
				if (value % 4 == 0) {
					this.point = value/4 + 2;
				} else {
					this.point = Math.floor(value/4) + 3;
				}
			} else {
				this.point = Math.floor(value/4) + 2 + value % 4;
			}
		}

		public get index()
		{
			return this._index;
		}
	}
}