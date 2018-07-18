/**
* name 
*/
module Constants{
	//牌型
	export class PokerType{
		public static PASS_CARDS = -2; //过
		public static NO_CARDS = -1; //前面还没有牌（首家）
		public static ERROR_CARDS = 0; //错误牌型
		public static SINGLE_CARD = 1; //单牌
		public static DOUBLE_CARD = 2; //对子
		public static THREE_CARD = 3;//3不带
		public static THREE_ONE_CARD = 4;//3带1
		public static THREE_TWO_CARD = 5; //3带2
		public static BOMB_TWO_CARD = 6; //4带2
		public static STRAIGHT = 7; //连牌
		public static CONNECT_CARD = 8; //连对
		public static AIRCRAFT = 9; //飞机不带
		public static AIRCRAFT_CARD = 10; //飞机带单牌
		public static AIRCRAFT_WING = 11; //飞机带对子
		public static BOMB_CARD = 12; //炸弹
		public static KINGBOMB_CARD = 13;//王炸
	}
}