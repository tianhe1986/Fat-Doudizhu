/**
* name 
*/
module Game{
	export class CardSet{
		/**牌型*/
		public type:number = Constants.PokerType.NO_CARDS;
		/**头子（头子中最小的那张）*/
		public header:number = 0;
		/**具体是哪些牌,用于展示在桌面上(index)*/
		public cards:Array<number> = [];
	}
}