/**
* name
*/
var Constants;
(function (Constants) {
    //牌型
    var PokerType = /** @class */ (function () {
        function PokerType() {
        }
        PokerType.PASS_CARDS = -2; //过
        PokerType.NO_CARDS = -1; //前面还没有牌（首家）
        PokerType.ERROR_CARDS = 0; //错误牌型
        PokerType.SINGLE_CARD = 1; //单牌
        PokerType.DOUBLE_CARD = 2; //对子
        PokerType.THREE_CARD = 3; //3不带
        PokerType.THREE_ONE_CARD = 4; //3带1
        PokerType.THREE_TWO_CARD = 5; //3带2
        PokerType.BOMB_TWO_CARD = 6; //4带2
        PokerType.STRAIGHT = 7; //连牌
        PokerType.CONNECT_CARD = 8; //连对
        PokerType.AIRCRAFT = 9; //飞机不带
        PokerType.AIRCRAFT_CARD = 10; //飞机带单牌
        PokerType.AIRCRAFT_WING = 11; //飞机带对子
        PokerType.BOMB_CARD = 12; //炸弹
        PokerType.KINGBOMB_CARD = 13; //王炸
        return PokerType;
    }());
    Constants.PokerType = PokerType;
})(Constants || (Constants = {}));
//# sourceMappingURL=PokerType.js.map