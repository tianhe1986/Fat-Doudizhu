/**
* name
*/
var Game;
(function (Game_1) {
    var Game = /** @class */ (function () {
        function Game() {
            this.gameId = Math.round(Math.random() * 1000000);
            this.env = Config.Common.env;
        }
        Game.prototype.begin = function () {
            this.msgHandler = new Game_1.MessageHandler();
            var config;
            switch (this.env) {
                case 'local':
                    config = Config.Local;
                    break;
                default:
                    break;
            }
            this.socketManager = new Net.SocketManage(config.url);
            this.room = new Game_1.Room();
            this.pokerLogic = new Game_1.PokerLogic();
            this.enterView = new GameView.EnterView();
            this.roomView = new GameView.RoomView();
            Laya.stage.addChild(this.enterView);
        };
        //开始匹配
        Game.prototype.beginMatch = function () {
            var message = new Net.Message();
            message.command = Constants.MsgCode.MATCH_PLAYER;
            message.content = { "name": this.gameId };
            this.socketManager.sendData(message, this.msgHandler.matchCallback, this.msgHandler);
            this.enterView.isMatching.visible = true;
            this.enterView.enter.visible = false;
        };
        return Game;
    }());
    Game_1.Game = Game;
})(Game || (Game = {}));
var game;
//# sourceMappingURL=Game.js.map