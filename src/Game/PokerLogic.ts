/**
* name 
*/
module Game{
	export class PokerLogic{
		constructor(){

		}

		//是否可出
		public canOut(nowPokers:CardSet, myReadyPokers:CardSet)
		{
			//如果当前没有牌，只要牌型正确，就可以出
			if (nowPokers.type == Constants.PokerType.NO_CARDS && myReadyPokers.type != Constants.PokerType.ERROR_CARDS) {
				return true;
			}

			//炸弹
			if (myReadyPokers.type == Constants.PokerType.KINGBOMB_CARD) { //王炸，天下无敌
				return true;
			} else if (myReadyPokers.type == Constants.PokerType.BOMB_CARD) {
				if (nowPokers.type == Constants.PokerType.BOMB_CARD) { //前面也是炸弹，需要比较大小
					if (myReadyPokers.header > nowPokers.header) {
						return true;
					}
				} else { //炸了
					return true;
				}
			} else {
				if (myReadyPokers.cards.length == nowPokers.cards.length && myReadyPokers.type == nowPokers.type && myReadyPokers.header > nowPokers.header) { //同类型，张数相同，值更大
					return true;
				}
			}

			return false;
		}

		//计算牌型
		public calcuPokerType(cards: Array<number>): number
		{
			//转换为点数
			let points = this.cardsToPoints(cards);

			let len = points.length;

			if (len == 1) { //单牌
				return Constants.PokerType.SINGLE_CARD;
			} else if (len == 2) {
				if (points[0] == 16 && points[1] == 17) { //王炸
					return Constants.PokerType.KINGBOMB_CARD;
				}
				if (points[0] == points[1]) { //对子
					return Constants.PokerType.DOUBLE_CARD;
				}
			} else if (len == 3 && points[0] == points[1] && points[1] == points[2]) { //三不带
				return Constants.PokerType.THREE_CARD;
			} else if (len == 4)  {            
				if (points[0] == points[1] && points[1] == points[2] && points[2] == points[3]) { //炸弹
					return Constants.PokerType.BOMB_CARD;
				} else if (this.calcMaxSameNum(points) == 3) {//最多有三张相等的，说明是三带一
					return Constants.PokerType.THREE_ONE_CARD;
				}
			} else if (len >= 5 && this.isStraight(points) && points[len - 1] < 15) { //这里直接判断所有顺子，免得后面大于5的时候都去判断是否是顺子
				return Constants.PokerType.STRAIGHT;
			} else if (len == 5 && this.calcMaxSameNum(points) == 3 && this.calcDiffNum(points) == 2) {//最大相同数为3，有两种点数，说明是三带二
				return Constants.PokerType.THREE_TWO_CARD;            
			} else if ( len >= 6) {//大于6的情况比较多，比如连对（n对），飞机（n飞，带或不带，3张飞还是4张飞
				let maxSameNum = this.calcMaxSameNum(points);
				let diffNum = this.calcDiffNum(points);
				if (len%3 == 0 && maxSameNum == 3 && diffNum == len/3 && (points[len - 1] - points[0] == len/3 - 1) && points[len - 1] < 15) { //三张牌飞机不带
					return Constants.PokerType.AIRCRAFT;
				} else if (len%2 == 0 && maxSameNum == 2 && diffNum == len/2 && (points[len - 1] - points[0] == len/2 - 1) && points[len - 1] < 15) { //连对
					return Constants.PokerType.CONNECT_CARD;
				} else if (len%4 == 0) {
					let threeCards = this.calcSameNumCards(points, 3);
					if (threeCards.length == len/4 && this.isStraight(threeCards) && threeCards[threeCards.length - 1] < 15) { //飞机三带一
						return Constants.PokerType.AIRCRAFT_CARD;
					}
				} else if (len%5 == 0) {
					let threeCards = this.calcSameNumCards(points, 3);
					if (threeCards.length == len/5 && this.isStraight(threeCards) && threeCards[threeCards.length - 1] < 15 && diffNum == len/5*2) { //飞机三带二
						return Constants.PokerType.AIRCRAFT_WING;
					}
				} else if (len == 6 && maxSameNum == 4 ) { //四带二
					return Constants.PokerType.BOMB_TWO_CARD;
				} else if (len == 8 && maxSameNum == 4) { // 四带两对
					let twoCards = this.calcSameNumCards(points, 2);
					if (twoCards.length == 2) {
						return Constants.PokerType.BOMB_FOUR_CARD;
					}
				} else if (len % 6 == 0) {
					let fourCards = this.calcSameNumCards(points, 4);
					if (fourCards.length == len/6 && this.isStraight(fourCards) && fourCards[fourCards.length - 1] < 15) { // 连续四带二
						return Constants.PokerType.BOMB_TWO_STRAIGHT_CARD;
					}
				} else if (len % 8 == 0) {
					let fourCards = this.calcSameNumCards(points, 4);
					let twoCards = this.calcSameNumCards(points, 2);
					if (twoCards.length == 2 * fourCards.length && fourCards.length == len/8 && this.isStraight(fourCards) && fourCards[fourCards.length - 1] < 15) { // 连续四带两对
						return Constants.PokerType.BOMB_FOUR_STRAIGHT_CARD;
					}
				}
			}
			return Constants.PokerType.ERROR_CARDS; //错误牌型
		}

		//计算最大的牌
		public calcPokerHeader(cards: Array<number>, type: number): number
		{
			let points = this.cardsToPoints(cards);

			switch (type) {
				case Constants.PokerType.SINGLE_CARD: //单牌
				case Constants.PokerType.DOUBLE_CARD: //对子
				case Constants.PokerType.THREE_CARD: //三张
				case Constants.PokerType.STRAIGHT: //连牌
				case Constants.PokerType.CONNECT_CARD: //连对
				case Constants.PokerType.AIRCRAFT: //飞机不带
				case Constants.PokerType.BOMB_CARD: //炸弹
					return points[0];
				case Constants.PokerType.THREE_ONE_CARD: //3带1
				case Constants.PokerType.THREE_TWO_CARD: //3带2
				case Constants.PokerType.BOMB_TWO_CARD: //4带2
					return points[2];
				case Constants.PokerType.AIRCRAFT_CARD: //飞机带单牌
				case Constants.PokerType.AIRCRAFT_WING: //飞机带对子
					return this.calcFirstPoint(points, 3);
				default:
					return 0;
			}
		}

		//最多有多少张点数相同的牌
		public calcMaxSameNum(points: Array<number>): number
		{
			let maxNum = 1;
			let nowNum = 1;
			for (let i = 0; i < points.length - 1; i++) {
				if (points[i] == points[i+1]) { //与下一张相同，数量加1
					nowNum++;
					if (nowNum > maxNum) {
						maxNum = nowNum;
					}
				} else { //重新开始计算
					nowNum = 1;
				}
			}

			return maxNum;
		}

		//第一个出现N次的点数
		public calcFirstPoint(points: Array<number>, num:number): number
		{
			let nowNum = 1;
			for (let i = 0; i < points.length - 1; i++) {
				if (points[i] == points[i+1]) { //与下一张相同，数量加1
					nowNum++;
				} else { //重新开始计算
					if (nowNum == num) {
						return points[i];
					}
					nowNum = 1;
				}
			}

			if (nowNum == num) {
				return points[points.length - 1];
			}

			return 0;
		}

		//取出所有满足条件的点数：该点数的数量等于N
		public calcSameNumCards(points: Array<number>, num:number): Array<number>
		{
			let cards = new Array<number>();

			let nowNum = 1;
			for (let i = 0; i < points.length - 1; i++) {
				if (points[i] == points[i+1]) { //与下一张相同，数量加1
					nowNum++;
				} else { //重新开始计算
					if (nowNum == num) {
						cards.push(points[i]);
					}
					nowNum = 1;
				}
			}

			if (nowNum == num) {
				cards.push(points[points.length - 1]);
			}

			return cards;
		}

		//有多少不同的点数
		public calcDiffNum(points: Array<number>): number
		{
			let diffNum = 1;
			for (let i = 0; i < points.length - 1; i++) {
				if (points[i] != points[i+1]) { //与下一张不同，数量加1
					diffNum++;
				}
			}

			return diffNum;
		}

		//是否是顺子
		public isStraight(points: Array<number>): boolean
		{
			for (let i = 0; i < points.length - 1; i++) {
				if (points[i+1] - points[i] != 1) {
					return false;
				}
			}
			return true;
		}

		//牌转点数
		public cardsToPoints(cards: Array<number>): Array<number>
		{
			let points = new Array<number>();
			let point = 0;
			cards.forEach((value, index, array) => {
				if (value < 53) {
					if (value % 4 == 0) {
						point = value/4 + 2;
					} else {
						point = Math.floor(value/4) + 3;
					}
				} else {
					point = Math.floor(value/4) + 2 + value % 4;
				}
				points.push(point);
			});

			//从小到大，再排一下序
			points.sort(function(a, b){return a - b;});

			return points;
		}
	}
}