/**
* name 
*/
module Game{
	export class Game{
		public gameId:number;
		//环境变更
		public env:string;

		//进入视图
		public enterView: GameView.EnterView;

		//房间视图
		public roomView: GameView.RoomView;

		//游戏管理
		public room: Room;

		//扑克逻辑处理
		public pokerLogic: PokerLogic;

		//socket管理
		public socketManager: Net.SocketManage;

		//消息处理
		public msgHandler: MessageHandler;

		constructor()
		{
			this.gameId = Math.round(Math.random() * 1000000);
			this.env = Config.Common.env;
		}

		public begin()
		{
			this.msgHandler = new MessageHandler();

			let config:any;
			switch (this.env) {
				case 'local':
					config = Config.Local;
					break;
				default:
					break;
			}
			this.socketManager = new Net.SocketManage(config.url);

			this.room = new Room();
			this.pokerLogic = new PokerLogic();

			this.enterView = new GameView.EnterView();
			this.roomView = new GameView.RoomView();
			Laya.stage.addChild(this.enterView);
		}

		//开始匹配
		public beginMatch()
		{
			let message = new Net.Message();
			message.command = Constants.MsgCode.MATCH_PLAYER;
			message.content = { "name": this.gameId };
			this.socketManager.sendData(message, this.msgHandler.matchCallback, this.msgHandler);
			this.enterView.isMatching.visible = true;
			this.enterView.enter.visible = false;
		}
	}
}
let game:Game.Game;