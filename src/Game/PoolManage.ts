/**
* name 
*/
module Game{
	export class PoolManage{
		constructor(){

		}

		//获得到一个Poker对象
		public getPoker(): Poker
		{
			let poker = Laya.Pool.getItemByClass('poker', Poker);
			poker.recover();

			return poker;
		}
	}
}