/**
* name
*/
var Constants;
(function (Constants) {
    var MsgCode = /** @class */ (function () {
        function MsgCode() {
        }
        MsgCode.SYSTEM_MSG = 1;
        MsgCode.REGISTER = 2;
        MsgCode.LOGIN = 3;
        MsgCode.MATCH_PLAYER = 4;
        MsgCode.PLAY_GAME = 5;
        MsgCode.ROOM_NOTIFY = 6;
        MsgCode.PLAYER_PLAYCARD = 7;
        MsgCode.PLAYER_WANTDIZHU = 8;
        return MsgCode;
    }());
    Constants.MsgCode = MsgCode;
})(Constants || (Constants = {}));
//# sourceMappingURL=MsgCode.js.map