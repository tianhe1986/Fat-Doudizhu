/**
* name
*/
var Net;
(function (Net) {
    var Socket = Laya.Socket;
    var SocketManage = /** @class */ (function () {
        function SocketManage(url) {
            this.sequence = 1;
            this.callbackPool = {};
            this.url = url;
            this.connect();
        }
        SocketManage.prototype.connect = function () {
            this.socket = new Socket();
            this.socket.connectByUrl(this.url);
            this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
            this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
        };
        SocketManage.prototype.onSocketOpen = function () {
            // 发送字符串
            this.socket.send(JSON.stringify({ 'opcode': 10001 }));
            this.socket.flush();
        };
        SocketManage.prototype.onSocketClose = function () {
            //console.log("Socket closed");
        };
        SocketManage.prototype.onMessageReveived = function (message) {
            //console.log("Message from server:");
            if (typeof message == "string") {
                var data = JSON.parse(message);
                if (data.seq && this.callbackPool[data.seq]) {
                    this.callbackPool[data.seq][0].call(this.callbackPool[data.seq][1], data);
                    delete (this.callbackPool[data.seq]);
                }
                else {
                    game.msgHandler.handle(data);
                }
            }
            this.socket.input.clear();
        };
        SocketManage.prototype.onConnectError = function (e) {
            //console.log("error");
        };
        SocketManage.prototype.sendData = function (data, callback, obj) {
            data.seq = this.sequence++;
            this.socket.send(JSON.stringify(data));
            if (callback && obj) {
                this.callbackPool[data.seq] = [callback, obj];
            }
        };
        return SocketManage;
    }());
    Net.SocketManage = SocketManage;
})(Net || (Net = {}));
//# sourceMappingURL=SocketManage.js.map