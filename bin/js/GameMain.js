// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        Laya.init(1200, 800);
        this.initStage();
        this.loadResource();
    }
    //初始化stage
    GameMain.prototype.initStage = function () {
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.bgColor = "#6699cc";
    };
    //加载资源
    GameMain.prototype.loadResource = function () {
        var uiResArry = [
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/doudizhu.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/poker.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, function () {
            game = new Game.Game();
            game.begin();
        }));
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map