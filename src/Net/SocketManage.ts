/**
* name 
*/
module Net{
	import Socket = Laya.Socket;
	import Byte = Laya.Byte;
	export class SocketManage{
		private socket: Socket;
		private output: Byte;
		private url: string;
		private sequence:number = 1;
		private callbackPool: Object = {};

		constructor(url) {
			this.url = url;
			this.connect();
		}

		private connect(): void {
			this.socket = new Socket();
			
			this.socket.connectByUrl(this.url);

			this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
			this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
			this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
			this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
		}

		private onSocketOpen(): void {

			// 发送字符串
			this.socket.send(JSON.stringify({'opcode': 10001}));
			this.socket.flush();
		}

		private onSocketClose(): void {
			//console.log("Socket closed");
		}

		private onMessageReveived(message: any): void {
			//console.log("Message from server:");
			if (typeof message == "string") {
				let data = JSON.parse(message);
				if (data.seq && this.callbackPool[data.seq]) {
					this.callbackPool[data.seq][0].call(this.callbackPool[data.seq][1], data);
					delete(this.callbackPool[data.seq]);
				} else {
					game.msgHandler.handle(data);
				}
			}

			this.socket.input.clear();
		}

		private onConnectError(e: Event): void {
			//console.log("error");
		}

		public sendData(data: Message, callback:Function|null, obj:any|null)
		{
			data.seq = this.sequence++;
			this.socket.send(JSON.stringify(data));

			if (callback && obj) {
				this.callbackPool[data.seq] = [callback, obj];
			}
		}
	}
}