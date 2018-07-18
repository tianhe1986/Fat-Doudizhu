/**
* name
*/
var Game;
(function (Game) {
    var MessageHandler = /** @class */ (function () {
        function MessageHandler() {
        }
        MessageHandler.prototype.handle = function (data) {
            if (data.code == undefined || data.code == 0) {
                //根据不同的command进行处理
                switch (data.command) {
                    case Constants.MsgCode.PLAY_GAME: //游戏中消息
                        game.room.onPlayGame(data.content);
                        break;
                    case Constants.MsgCode.PLAYER_WANTDIZHU: //抢地主消息
                        game.room.onWantDiZhu(data.content);
                        break;
                    default:
                        break;
                }
            }
            else { //错误处理
            }
        };
        MessageHandler.prototype.matchCallback = function (message) {
            //console.log(message);
            //处理座位信息
            game.room.processSeat(message.content);
            //展示房间
            game.enterView.removeSelf();
            Laya.stage.addChild(game.roomView);
        };
        return MessageHandler;
    }());
    Game.MessageHandler = MessageHandler;
})(Game || (Game = {}));
//# sourceMappingURL=MessageHandler.js.map