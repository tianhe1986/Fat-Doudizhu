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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var backUI = /** @class */ (function (_super) {
        __extends(backUI, _super);
        function backUI() {
            return _super.call(this) || this;
        }
        backUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.backUI.uiView);
        };
        backUI.uiView = { "type": "View", "props": { "y": 3, "width": 1200, "left": -6, "height": 800 }, "child": [{ "type": "Box", "props": { "y": 100, "width": 105, "visible": true, "var": "leftCard", "left": 77, "height": 417 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 105, "visible": false, "skin": "doudizhu/bg_poker.png", "height": 150 } }] }, { "type": "Box", "props": { "y": 100, "width": 105, "visible": true, "var": "rightCard", "left": 1014, "height": 271 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 105, "visible": false, "skin": "doudizhu/bg_poker.png", "height": 150 } }] }, { "type": "Box", "props": { "y": 551, "width": 688, "visible": true, "var": "myCard", "left": 315, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 105, "visible": false, "skin": "doudizhu/bg_poker.png", "height": 150 } }] }, { "type": "Box", "props": { "y": 125, "x": 251, "width": 105, "visible": true, "var": "leftOutCard", "height": 387 }, "child": [{ "type": "Image", "props": { "width": 105, "visible": false, "skin": "doudizhu/bg_poker.png", "height": 150 } }] }, { "type": "Box", "props": { "y": 127, "x": 847, "width": 105, "visible": true, "var": "rightOutCard", "height": 391 }, "child": [{ "type": "Image", "props": { "width": 105, "visible": false, "skin": "doudizhu/bg_poker.png", "height": 150 } }] }, { "type": "Box", "props": { "y": 346, "width": 465, "visible": true, "var": "myOutCard", "left": 383, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 105, "visible": false, "skin": "doudizhu/bg_poker.png", "height": 150 } }] }, { "type": "Box", "props": { "y": 484, "x": 482, "width": 205, "visible": true, "var": "outOption", "height": 45 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 90, "visible": false, "var": "outYes", "skin": "comp/button.png", "labelSize": 22, "label": "出牌", "height": 45 } }, { "type": "Button", "props": { "y": 0, "x": 114, "width": 90, "visible": false, "var": "outNo", "skin": "comp/button.png", "labelSize": 22, "label": "不出", "height": 45 } }] }, { "type": "Box", "props": { "y": 20, "x": 117, "width": 18, "visible": false, "var": "leftAction", "height": 30 }, "child": [{ "type": "Line", "props": { "y": 2.5, "x": 9.5, "toY": 25, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Lines", "props": { "y": -21.5, "x": -32.5, "points": "36,41,42,51,47,41", "lineWidth": 1, "lineColor": "#ff0000" } }] }, { "type": "Box", "props": { "y": 21, "x": 1055, "width": 18, "visible": false, "var": "rightAction", "height": 30 }, "child": [{ "type": "Line", "props": { "y": 2.5, "x": 9.5, "toY": 25, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Lines", "props": { "y": -21.5, "x": -32.5, "points": "36,41,42,51,47,41", "lineWidth": 1, "lineColor": "#ff0000" } }] }, { "type": "Box", "props": { "y": 429, "x": 578, "width": 18, "visible": false, "var": "myAction", "height": 30 }, "child": [{ "type": "Line", "props": { "y": 2.5, "x": 9.5, "toY": 25, "toX": 0, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Lines", "props": { "y": -21.5, "x": -32.5, "points": "36,41,42,51,47,41", "lineWidth": 1, "lineColor": "#ff0000" } }] }, { "type": "Text", "props": { "y": 60, "x": 79, "width": 42, "var": "leftName", "text": "text", "height": 34, "fontSize": 24 } }, { "type": "Text", "props": { "y": 61, "x": 1016, "width": 42, "var": "rightName", "text": "text", "height": 34, "fontSize": 24 } }, { "type": "Text", "props": { "y": 714, "x": 560, "width": 42, "var": "myName", "text": "text", "height": 34, "fontSize": 24 } }, { "type": "Image", "props": { "y": 718, "x": 478, "width": 60, "visible": false, "var": "dizhuhead", "skin": "doudizhu/dizhu.png", "height": 70 } }, { "type": "Box", "props": { "y": 19, "x": 445, "width": 315, "visible": true, "var": "dizhuCards", "height": 150 }, "child": [{ "type": "Image", "props": { "visible": false, "skin": "doudizhu/bg_poker.png" } }] }, { "type": "Box", "props": { "y": 487, "x": 380, "width": 427, "visible": false, "var": "qiangdizhu", "height": 37 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 81, "var": "score1", "skin": "comp/button.png", "labelSize": 20, "label": "一分", "height": 37 } }, { "type": "Button", "props": { "y": 0, "x": 105, "width": 81, "var": "score2", "skin": "comp/button.png", "labelSize": 20, "label": "两分", "height": 37 } }, { "type": "Button", "props": { "y": 0, "x": 210, "width": 81, "var": "score3", "skin": "comp/button.png", "labelSize": 20, "label": "三分", "height": 37 } }, { "type": "Button", "props": { "y": 0, "x": 315, "width": 81, "var": "giveup", "skin": "comp/button.png", "labelSize": 20, "label": "不要", "height": 37 } }] }, { "type": "Text", "props": { "y": 290, "x": 234, "width": 54, "visible": false, "var": "leftPass", "text": "打得", "height": 34, "fontSize": 26, "color": "#1b1717", "bold": true } }, { "type": "Text", "props": { "y": 488, "x": 557, "width": 54, "visible": false, "var": "myPass", "text": "打得", "height": 34, "fontSize": 26, "color": "#060606", "bold": true } }, { "type": "Text", "props": { "y": 290, "x": 926, "width": 54, "visible": false, "var": "rightPass", "text": "打得", "height": 34, "fontSize": 26, "color": "#060606", "bold": true } }, { "type": "Box", "props": { "y": 79, "x": 379, "visible": false, "var": "scorePanel", "renderType": "render" }, "child": [{ "type": "Rect", "props": { "width": 427, "lineWidth": 1, "height": 283, "fillColor": "#d1e3d5" } }, { "type": "List", "props": { "y": 58, "x": 29, "width": 379, "var": "scoreList", "renderType": "render", "height": 190 }, "child": [{ "type": "Box", "props": { "y": -1, "x": 9, "width": 377, "renderType": "render", "height": 36 }, "child": [{ "type": "Text", "props": { "y": 2, "x": 9, "width": 372, "text": "text", "name": "scoreText", "height": 28, "fontSize": 20, "color": "#000000" } }] }] }, { "type": "Text", "props": { "y": 14, "x": 157, "width": 95, "text": "计分板", "height": 43, "fontSize": 30, "color": "#342828", "bold": true } }] }, { "type": "Rect", "props": { "y": -4, "x": 0, "width": 1200, "lineWidth": 0, "height": 804, "fillColor": "#78a4f1" } }, { "type": "Text", "props": { "y": 120, "x": 19, "width": 43, "visible": false, "var": "leftPokerNum", "text": "text", "height": 27, "fontSize": 24, "color": "#000000" } }, { "type": "Text", "props": { "y": 120, "x": 1137, "visible": false, "var": "rightPokerNum", "text": "text", "height": 27, "fontSize": 24, "color": "#000000" } }, { "type": "Text", "props": { "y": 714, "x": 348, "width": 43, "visible": false, "var": "myPokerNum", "text": "text", "height": 27, "fontSize": 24, "color": "#000000" } }] };
        return backUI;
    }(View));
    ui.backUI = backUI;
})(ui || (ui = {}));
(function (ui) {
    var enterUI = /** @class */ (function (_super) {
        __extends(enterUI, _super);
        function enterUI() {
            return _super.call(this) || this;
        }
        enterUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.enterUI.uiView);
        };
        enterUI.uiView = { "type": "View", "props": { "width": 800, "rotation": 0, "height": 600 }, "child": [{ "type": "Button", "props": { "y": 234, "x": 291, "width": 191, "var": "enter", "skin": "comp/button.png", "scaleY": 1, "scaleX": 1, "pivotY": -1, "pivotX": 3, "labelSize": 28, "label": "开始匹配", "height": 75 } }, { "type": "Text", "props": { "y": 255, "x": 309, "width": 164, "var": "isMatching", "text": "正在匹配", "height": 63, "fontSize": 36 } }, { "type": "Rect", "props": { "y": 0, "x": 0, "width": 1200, "lineWidth": 1, "height": 805, "fillColor": "#56b8e7" } }] };
        return enterUI;
    }(View));
    ui.enterUI = enterUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map