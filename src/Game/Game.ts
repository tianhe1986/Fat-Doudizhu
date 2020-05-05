/**
* name 
*/
module Game{
	export class Game{
		public gameId:number;
		//环境变更
		public env:string;

		//进入视图
		public enterView: GameView.EnterView = null;

		//房间视图
		public roomView: GameView.RoomView = null;

		//游戏管理
		public room: Room = null;

		//对象管理
		public poolManage: PoolManage;

		//扑克逻辑处理
		public pokerLogic: PokerLogic = null;

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
			this.poolManage = new PoolManage();
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

			this.refreshToMatch();
		}

		// 重新回到匹配页
		public refreshToMatch()
		{
			// 简单粗暴的把原来的全清了，重新来过
			if (this.enterView) {
				this.enterView.removeSelf();
				this.enterView.destroy();
				this.enterView = null;
			}

			if (this.roomView) {
				this.roomView.removeSelf();
				this.roomView.destroy();
				this.roomView = null;
			}

			if (this.room) {
				delete this.room;
				this.room = null;
			}

			if (this.pokerLogic) {
				delete this.pokerLogic;
				this.pokerLogic = null;
			}

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

		// 重新匹配
		public reMatch()
		{
			this.refreshToMatch();
			this.beginMatch();
		}
	}
}
let game:Game.Game;