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
var Game;
(function (Game) {
    var Poker = /** @class */ (function (_super) {
        __extends(Poker, _super);
        function Poker() {
            var _this = _super.call(this) || this;
            _this.isSelected = false;
            //图片
            _this.img = "doudizhu/bg_poker.png";
            _this.width = 105;
            _this.height = 150;
            return _this;
        }
        Poker.prototype.switchStatus = function () {
            if (game.room.canSelect) {
                this.isSelected = !this.isSelected;
                if (this.isSelected) {
                    this.y = -20;
                }
                else {
                    this.y = 0;
                }
                game.room.checkOutPokers();
            }
        };
        Object.defineProperty(Poker.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
                this.img = "poker/" + value + ".jpg";
                if (value < 53) {
                    if (value % 4 == 0) {
                        this.point = value / 4 + 2;
                    }
                    else {
                        this.point = Math.floor(value / 4) + 3;
                    }
                }
                else {
                    this.point = Math.floor(value / 4) + 2 + value % 4;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Poker;
    }(Laya.Image));
    Game.Poker = Poker;
})(Game || (Game = {}));
//# sourceMappingURL=Poker.js.map