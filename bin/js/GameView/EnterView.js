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
    var EnterView = /** @class */ (function (_super) {
        __extends(EnterView, _super);
        function EnterView() {
            var _this = _super.call(this) || this;
            _this.enter.on(Laya.Event.CLICK, game, game.beginMatch);
            _this.isMatching.visible = false;
            _this.enter.visible = true;
            return _this;
        }
        return EnterView;
    }(ui.enterUI));
    GameView.EnterView = EnterView;
})(GameView || (GameView = {}));
//# sourceMappingURL=EnterView.js.map