var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var GameView;
(function (GameView) {
    var RoomView = /** @class */ (function (_super) {
        __extends(RoomView, _super);
        function RoomView() {
            var _this = _super.call(this) || this;
            _this.score3.on(Laya.Event.CLICK, game.room, game.room.wantDiZhu, [3]);
            _this.score2.on(Laya.Event.CLICK, game.room, game.room.wantDiZhu, [2]);
            _this.score1.on(Laya.Event.CLICK, game.room, game.room.wantDiZhu, [1]);
            _this.giveup.on(Laya.Event.CLICK, game.room, game.room.passDiZhu);
            _this.outYes.on(Laya.Event.CLICK, game.room, game.room.giveOutAction);
            _this.outNo.on(Laya.Event.CLICK, game.room, game.room.passAction);
            _this.scoreList.renderHandler = new Laya.Handler(_this, _this.scoreRender);
            return _this;
        }
        RoomView.prototype.scoreRender = function (cell, index) {
            //如果索引不再可索引范围，则终止该函数
            if (index >= game.room.scoreList.length) {
                return;
            }
            var txt = game.room.scoreList[index];
            var scoreItem = cell.getChildByName("scoreText");
            scoreItem.text = txt;
        };
        return RoomView;
    }(ui.backUI));
    GameView.RoomView = RoomView;
})(GameView || (GameView = {}));
//# sourceMappingURL=RoomView.js.map