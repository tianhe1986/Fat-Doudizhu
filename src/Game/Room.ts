/**
* name 
*/
module Game{
	export class Room{
		//房间号
		public roomId:number;

		//自己牌
		public myPokers: Array<Poker> = [];

		//左边牌
		public leftPokers: Array<Poker> = [];

		//右边牌
		public rightPokers: Array<Poker> = [];

		//地主牌
		public dizhuPokers: Array<Poker> = [];

		//当前打出展示的牌，自己，左，右
		public myOutPokers: Array<Poker> = [];
		public leftOutPokers: Array<Poker> = [];
		public rightOutPokers: Array<Poker> = [];


		//自己信息
		public myInfo = {"seat":0, "name": "", "pass":0}; //座位，昵称，是否跳过

		//左右座位信息
		public leftInfo = {"seat":0, name: ""};
		public rightInfo = {"seat":0, name: ""};

		//当前出牌座位
		public nowSeat:number;

		//地主
		public dizhu:number;

		//当前桌面上牌，若重新一轮则为空
		public nowPokers:CardSet;

		//当前我选中的牌
		public myReadyPokers:CardSet;

		//是否可出
		public canSelect:boolean = false;

		public scoreList:Array<string> = [];

		constructor()
		{
			this.myReadyPokers = new CardSet();
			this.nowPokers = new CardSet();
			for (let i = 0; i < 17; i++) {
				this.leftPokers.push(new Poker());
				this.rightPokers.push(new Poker());
			}	
		}

		//收到游戏中消息
		public onPlayGame(content:any)
		{
			let state = content.state;
			switch (state) {
				case 0: //发牌了
					let tempCards = content.cards.sort(function(a,b){return b-a});
					this.refreshMyPokers(tempCards);
					this.showAllPokers();
					break;
				case 1: //游戏中，出牌信息
					this.nextOutProcess(content);
					break;
				case 2: //游戏结束，结算
					this.gameOver(content);
					break;
				default:
					break;
			}
		}

		//游戏结束处理
		public gameOver(content)
		{
			//设置数据
			let scores = content.scores;
			console.log(scores);
			let groups = [this.myInfo, this.leftInfo, this.rightInfo];
			let txt = '';
			this.scoreList = [];
			groups.forEach((info, index, array) => {
				//console.log(info.seat, scores[info.seat]);
				txt = (info.seat == this.dizhu ? '(地主) ' : '(农民) ' ) + info.seat + '号位 : ' + <string>scores[info.seat];
				this.scoreList.push(txt);
			});

			game.roomView.scoreList.array = this.scoreList;
			game.roomView.scorePanel.visible = true;
		}

		//出牌信息处理
		public nextOutProcess(content:any): void
		{
			//当前出牌的座位
			let seat = content.curPlayerIndex;
			this.nowSeat = seat;

			this.showCouldAction(seat);
			//console.log(content.curCard);
			//上一轮出牌座位
			let lastSeat = seat - 1;;
			if (lastSeat == 0) {
				lastSeat = 3;
			}

			//当前出牌类型
			let cardType = content.curCard.type;
			switch (cardType) {
				case Constants.PokerType.NO_CARDS: //新一轮开始
					//清空当前牌
					this.removeAllOutPokers();
					break;
				case Constants.PokerType.PASS_CARDS: //不要
					//清空当前出牌者的牌
					this.removeOutPokers(seat);
					//上轮出牌座位展示不要
					this.showPass(lastSeat);
					break;
				default:
					//清空当前出牌者的牌
					this.removeOutPokers(seat);
					//展示新牌
					this.showOutPokers(lastSeat, content.curCard);
					break;
			}

			//如果是我，展示出牌与不出牌框
			if (seat == this.myInfo.seat) {
				this.canSelect = true;
				game.roomView.outYes.visible = false;
				game.roomView.outNo.visible = (cardType != Constants.PokerType.NO_CARDS);
			} else {
				this.canSelect = false;
				game.roomView.outYes.visible = false;
				game.roomView.outNo.visible = false;
			}
			//TODO: 如果新一轮，只要选了牌，就可出，不允许不出
			//如果有其他的牌，选的牌类型相同，且值更大，则可出。允许不出
		}

		//出牌
		public giveOutAction()
		{
			if (game.pokerLogic.canOut(this.nowPokers, this.myReadyPokers)) {
				let data = new Net.Message();
				data.command = Constants.MsgCode.PLAYER_PLAYCARD;
				data.content = { roomId:this.roomId, index:this.myInfo.seat, curCards:{type: this.myReadyPokers.type, header:this.myReadyPokers.header, cards:this.myReadyPokers.cards}};
				game.socketManager.sendData(data, this.giveOutBack, this);
			}
		}

		public giveOutBack(data: Net.Message)
		{
			if(data.code == 0) {
				//已选择的牌从手牌中移除
				let newPokers = new Array<Poker>();
				this.myPokers.forEach((poker, index, array) => {
					if (poker.isSelected) {
						poker.removeSelf();
					} else {
						newPokers.push(poker);
					}
				});
				this.myPokers = newPokers;

				let i = 0;
				this.myPokers.forEach((poker, index, array) => {
					poker.x = (i++)*30;
					poker.y = 0;
				});
				this.canSelect = false;

				//清除当前准备好的牌
				this.myReadyPokers.cards = [];
				this.myReadyPokers.type = Constants.PokerType.ERROR_CARDS;

				game.roomView.outYes.visible = false;
				game.roomView.outNo.visible = false;

				game.roomView.myPokerNum.text = '' + this.myPokers.length;
			}
		}

		//检查要出的牌
		public checkOutPokers()
		{
			//将选中的牌放入准备牌中
			this.myReadyPokers.cards = [];
			this.myPokers.forEach((poker, index, array) => {
				if (poker.isSelected) {
					this.myReadyPokers.cards.push(poker.index);
				}
			});
			//计算牌型
			this.myReadyPokers.type = game.pokerLogic.calcuPokerType(this.myReadyPokers.cards);

			//计算牌头
			this.myReadyPokers.header = game.pokerLogic.calcPokerHeader(this.myReadyPokers.cards, this.myReadyPokers.type);

			//是否可出
			if (game.pokerLogic.canOut(this.nowPokers, this.myReadyPokers)) {
				game.roomView.outYes.visible = true;
			} else {
				game.roomView.outYes.visible = false;
			}
		}

		public passAction()
		{
			let data = new Net.Message();
        	data.command = Constants.MsgCode.PLAYER_PLAYCARD;
        	data.content = { roomId:this.roomId, index:this.myInfo.seat, curCards:{ type:Constants.PokerType.PASS_CARDS, cards:[]}};
        	game.socketManager.sendData(data, this.passActionBack, this);
		}

		public passActionBack(data: Net.Message)
		{
			if(data.code == 0) {
				//还原已选择的牌
				this.myPokers.forEach((poker, index, array) => {
					poker.isSelected = false;
					poker.y = 0;
				});
				this.canSelect = false;
				game.roomView.outYes.visible = false;
				game.roomView.outNo.visible = false;
			}
		}

		public showOutPokers(seat:number, cards:any)
		{
			/*this.nowPokers.cards = cards.cards;
			this.nowPokers.type = cards.type;
			this.nowPokers.header = cards.header;*/
			this.nowPokers = cards;
			if (seat == this.myInfo.seat) {
				for (let i = 0; i < cards.cards.length; i++) {
					let poker = new Poker();
					poker.index = cards.cards[i];
					this.myOutPokers.push(poker);
					poker.x = i*30;
					poker.y = 0;
					poker.skin = poker.img;
					game.roomView.myOutCard.addChild(poker);
				}
				//这里不用移除手牌，在出牌成功的时候自然会移除
			} else if (seat == this.leftInfo.seat) {
				for (let i = 0; i < cards.cards.length; i++) {
					let poker = new Poker();
					poker.index = cards.cards[i];
					this.leftOutPokers.push(poker);
					poker.x = 0;
					poker.y = i*30;
					poker.skin = poker.img;
					game.roomView.leftOutCard.addChild(poker);
				}
				//将最后的几张手牌移除即可
				let len = this.leftPokers.length - 1;
				for (let i = 0; i < cards.cards.length; i++) {
					this.leftPokers[len - i].removeSelf();
				}
				this.leftPokers.splice(this.leftPokers.length - cards.cards.length);
				game.roomView.leftPokerNum.text = '' + this.leftPokers.length;
			} else {
				for (let i = 0; i < cards.cards.length; i++) {
					let poker = new Poker();
					poker.index = cards.cards[i];
					this.rightOutPokers.push(poker);
					poker.x = 0;
					poker.y = i * 30;
					poker.skin = poker.img;
					game.roomView.rightOutCard.addChild(poker);
				}
				let len = this.rightPokers.length - 1;
				for (let i = 0; i < cards.cards.length; i++) {
					this.rightPokers[len - i].removeSelf();
				}
				this.rightPokers.splice(this.rightPokers.length - cards.cards.length);
				game.roomView.rightPokerNum.text = '' + this.rightPokers.length;
			}
		}

		public removeOutPokers(seat: number): void
		{
			let group = this.myOutPokers;
			if (seat == this.leftInfo.seat) {
				group = this.leftOutPokers;
				game.roomView.leftPass.visible = false;
			} else if (seat == this.rightInfo.seat) {
				group = this.rightOutPokers;
				game.roomView.rightPass.visible = false;
			} else {
				game.roomView.myPass.visible = false;
			}

			group.forEach((poker, index, array) => {
				poker.removeSelf();
			});
			group = [];
		}

		//清空当前牌
		public removeAllOutPokers()
		{
			this.nowPokers.cards = [];
			this.nowPokers.header = 0;
			this.nowPokers.type = Constants.PokerType.NO_CARDS;
			let groups = [this.myOutPokers, this.leftOutPokers, this.rightOutPokers];
			groups.forEach((groupItem, groupIndex, groupArray) => {
				groupItem.forEach((poker, index, array) => {
					poker.removeSelf();
				});
				groupItem = [];
			});
			game.roomView.myPass.visible = false;
			game.roomView.leftPass.visible = false;
			game.roomView.rightPass.visible = false;
		}

		//展示不要框
		public showPass(seat:number)
		{
			if (seat == this.myInfo.seat) {
				game.roomView.myPass.visible = true;
			} else if (seat == this.leftInfo.seat) {
				game.roomView.leftPass.visible = true;
			} else {
				game.roomView.rightPass.visible = true;
			}
		}

		//刷新牌
		protected refreshMyPokers(tempCards:Array<number>)
		{
			this.myPokers = [];
			tempCards.forEach((value, index, array) => {
				let poker = new Poker();
				poker.index = value;
				this.myPokers.push(poker);
			});
		}

		//展示所有的牌
		protected showAllPokers()
		{
			//一开始默认都是17张
			game.roomView.leftPokerNum.text = '17';
			game.roomView.leftPokerNum.visible = true;
			game.roomView.rightPokerNum.text = '17';
			game.roomView.rightPokerNum.visible = true;
			game.roomView.myPokerNum.text = '17';
			game.roomView.myPokerNum.visible = true;

			let i = 0;
			this.myPokers.forEach((poker, index, array) => {
				poker.x = (i++)*30;
				poker.y = 0;
				poker.skin = poker.img;
				poker.on(Laya.Event.CLICK, poker, poker.switchStatus);
				game.roomView.myCard.addChild(poker);
			});

			i = 0;
			this.leftPokers.forEach((poker, index, array) => {
				poker.x = 0;
				poker.y = (i++)*15;
				poker.skin = poker.img;
				game.roomView.leftCard.addChild(poker);
			});

			i = 0;
			this.rightPokers.forEach((poker, index, array) => {
				poker.x = 0;
				poker.y = (i++)*15;
				poker.skin = poker.img;
				game.roomView.rightCard.addChild(poker);
			});
		}

		//收到抢地主消息
		public onWantDiZhu(content:any):void
		{
			//有地主了，展示地主信息
			if (content.dizhu != undefined) {
				this.showDizhu(content.dizhu, content.dizhuCards);
			} else {
				//如果轮到自己，展示抢地主选项
				let seat = content.curPlayerIndex;
        		let nowScore = content.nowScore;
				this.showCouldAction(seat);
				if (seat == this.myInfo.seat) {
					game.roomView.qiangdizhu.visible = true;
					//不抢始终显示
					game.roomView.giveup.visible = true;
					//显示比当前分大的按钮
					for (let i = 1; i <= 3; i++) {
						if (i <= nowScore) {
							game.roomView['score'+i].visible = false;
						} else {
							game.roomView['score'+i].visible = true;
						}
					}
				} else {
					game.roomView.qiangdizhu.visible = false;
				}
			}
		}

		//抢地主
		public wantDiZhu(score:number): void
		{
			let data = new Net.Message();
			data.command = Constants.MsgCode.PLAYER_WANTDIZHU;
			data.content = { roomId:this.roomId, index:this.myInfo.seat, score:score};
			game.socketManager.sendData(data, this.wantDizhuBack, this);
		}

		//抢地主回调
		public wantDizhuBack(data: Net.Message): void
		{
			if (data.code == 0) {
				game.roomView.qiangdizhu.visible = false;
			}
		}

		//不抢地主
		public passDiZhu(): void
		{
			let data = new Net.Message();
			data.command = Constants.MsgCode.PLAYER_WANTDIZHU;
			data.content = { roomId:this.roomId, index:this.myInfo.seat, score:0};
			game.socketManager.sendData(data, this.wantDizhuBack, this);
		}

		//展示行动信息
		public showCouldAction(seat:number):void
		{
			if (seat == this.myInfo.seat) {
				game.roomView.myAction.visible = true;
				game.roomView.leftAction.visible = false;
				game.roomView.rightAction.visible = false;
			} else if (seat == this.leftInfo.seat) {
				game.roomView.myAction.visible = false;
				game.roomView.leftAction.visible = true;
				game.roomView.rightAction.visible = false;
			} else {
				game.roomView.myAction.visible = false;
				game.roomView.leftAction.visible = false;
				game.roomView.rightAction.visible = true;
			}
		}

		//展示地主信息
		public showDizhu(dizhu:number, dizhuCards:Array<number>):void
		{
			this.dizhu = dizhu;

			//地主牌
			let i = 0;
			dizhuCards.forEach((value, index, array) => {
				let poker = new Poker();
				poker.index = value;
				this.dizhuPokers.push(poker);
				poker.x = (i++)*105;
				poker.y = 0;
				poker.skin = poker.img;
				game.roomView.dizhuCards.addChild(poker);
			});

			//地主图标
			game.roomView.dizhuhead.visible = true;
			if (dizhu == this.myInfo.seat) {
				game.roomView.dizhuhead.pos(478, 718);
				//加入手牌，并重新排序
				dizhuCards.forEach((value, index, array) => {
					let poker = new Poker();
					poker.index = value;
					this.myPokers.push(poker);
					poker.skin = poker.img;
					poker.on(Laya.Event.CLICK, poker, poker.switchStatus);
					game.roomView.myCard.addChild(poker);
				});
				this.myPokers.sort(function(a,b){return b.index-a.index});
				let i = 0;
				this.myPokers.forEach((poker, index, array) => {
					poker.x = (i++)*30;
					poker.y = 0;
					poker.zOrder = i;
				});
				game.roomView.myPokerNum.text = '20';
			} else if (dizhu == this.leftInfo.seat) {
				game.roomView.dizhuhead.pos(5, 300);
				//加入手牌展示即可
				let i = 17;
				dizhuCards.forEach((value, index, array) => {
					let poker = new Poker();
					this.leftPokers.push(poker);
					poker.x = 0;
					poker.y = (i++)*15;
					poker.skin = poker.img;
					game.roomView.leftCard.addChild(poker);
				});
				game.roomView.leftPokerNum.text = '20';
			} else {
				let i = 17;
				dizhuCards.forEach((value, index, array) => {
					let poker = new Poker();
					this.rightPokers.push(poker);
					poker.x = 0;
					poker.y = (i++)*15;
					poker.skin = poker.img;
					game.roomView.rightCard.addChild(poker);
				});
				game.roomView.dizhuhead.pos(1130, 300);
				game.roomView.rightPokerNum.text = '20';
			}
		}

		//处理座位
		public processSeat(content:any)
		{
			let players = content.players;
            this.roomId = content.roomId;
            for( let i = 0; i < players.length; i++)
            {
                if(game.gameId == players[i])
                {
                    this.myInfo.name = (i+1) + '号位：' + players[i];
                    this.myInfo.seat = i + 1;
                    if(i == 2)
                    {
                        this.rightInfo.name = '1号位：' + players[0];
						this.rightInfo.seat = 1;
                        this.leftInfo.name = '2号位：' + players[1];
                        this.leftInfo.seat = 2;
                    }else if(i == 0)
                    {
                        this.rightInfo.name = '2号位：' + players[1];
						this.rightInfo.seat = 2;
                        this.leftInfo.name = '3号位：' + players[2];
                        this.leftInfo.seat = 3;
                        
                    }else
                    {
                        this.rightInfo.name = '3号位：' + players[2];
						this.rightInfo.seat = 3;
                        this.leftInfo.name = '1号位：' + players[0];
                        this.leftInfo.seat = 1;
                    }
                }
            }
			game.roomView.myName.text = this.myInfo.name;
			game.roomView.myName.visible = true;
			game.roomView.leftName.text = this.leftInfo.name;
			game.roomView.leftName.visible = true;
			game.roomView.rightName.text = this.rightInfo.name;
			game.roomView.rightName.visible = true;
		}
	}
}