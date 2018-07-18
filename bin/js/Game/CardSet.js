/**
* name
*/
var Game;
(function (Game) {
    var CardSet = /** @class */ (function () {
        function CardSet() {
            /**牌型*/
            this.type = Constants.PokerType.NO_CARDS;
            /**头子（头子中最小的那张）*/
            this.header = 0;
            /**具体是哪些牌,用于展示在桌面上(index)*/
            this.cards = [];
        }
        return CardSet;
    }());
    Game.CardSet = CardSet;
})(Game || (Game = {}));
//# sourceMappingURL=CardSet.js.map