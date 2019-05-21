

var method = require('Method');
var sdk = require("SDK");

cc.Class({
    extends: cc.Component,

    properties: {
        centerword: {
            type: cc.Label,
            default: null
        },

        btnArr: {
            type: cc.Button,
            default: []
        },

        recountLabel: {
            type: cc.Label,
            default: null
        },

        scoreLabel: {
            type: cc.Label,
            default: null
        },

        rightSprite: {
            type: cc.Node,
            default: null
        },

        wrongSprite: {
            type: cc.Node,
            default: null
        },

        gameEndLayer: {
            type: cc.Node,
            default: null
        },

        gScoreLabel: {
            type: cc.Label,
            default: null
        },

        gWordLabel: {
            type: cc.Label,
            default: null
        },

        _current_time: cc.Integer,//当前剩余时间
        _current_score: cc.Integer,//当前分数
        _current_color: cc.String,//当前字体的颜色
        _game_end: cc.Boolean,
        _game_end_current: cc.Boolean,//控制当前一局
        _playe_tag : cc.Boolean,
        _finish_click : cc.Boolean,

    },

    onLoad: function () {
        this._playe_tag = false;
    },

    gameStart: function () {
        this.initData();
        this.setCurrentTime();
        this.setCurrentScore();
        this.createQuestion();
        this.schedule(this.timeRecount, 1);
    },

    initData: function () {
        this._finish_click = false;
        this._current_score = 0;
        this._current_time = GG.DEFAULT_GAMETIME;
        this._current_color = "";
        this._game_end_current = false;
        this._game_end = false;
        this.gameEndLayer.active = false;
    },

    timeRecount: function () {
        this._current_time -= 1;
        if (this._current_time < 0) {
            this.unschedule(this.timeRecount);
            this.gameEnd();
        }
        this.setCurrentTime();
    },

    setCurrentTime: function () {
        cc.log("倒计时：" + this._current_time);
        if (this._current_time > 0) {
            this.recountLabel.string = "倒计时：" + this._current_time;
        }
    },

    setCurrentScore: function () {
        this.scoreLabel.string = "得分：" + this._current_score;
    },

    setCenterWord: function () {
        let itxt = method.getItemsFromArr(GG.COLOR_ARR, 1);
        this.centerword.string = itxt;
        this.centerword.node.color = cc.color(GG.COLOR_NUM[this._current_color]);
    },

    createQuestion: function () {
        var mix_arr = method.mixArrItems(GG.COLOR_ARR);
        var t_arr = method.getItemsFromArr(mix_arr, 4);
        cc.log("-随机生成的颜色数组：" + t_arr);
        this._current_color = method.getItemsFromArr(t_arr, 1);
        cc.log("-随机当前的颜色" + this._current_color);
        this.setCenterWord();
        this.setBtns(t_arr);
        this._game_end_current = false;//题目都设置好后就可以开始当前局了
        this._finish_click = false;
    },

    setBtns: function (arr) {
        let iarr = arr;
        let mix_arr = method.mixArrItems(iarr);

        for (var i = 0; i < 4; ++i) {
            var btn = this.btnArr[i];
            var tip = btn.node.getChildByName("tip");
            tip.getComponent(cc.Label).string = iarr[i];
            tip.color = cc.color(GG.COLOR_NUM[mix_arr[i]]);
        }
    },

    btnClickCallBack: function (event) {
        if(this._finish_click == true){
            return;
        }
        this._finish_click = true;
        this.playBtn();
        if (this._game_end_current == true) {//如果当前这句结束了
            return;
        }

        this._game_end_current = true;
        let btnnode = event.target;
        var tip = btnnode.getChildByName("tip");
        let str = tip.getComponent(cc.Label).string;
        cc.log(str);
        if (str == this._current_color) {
            this._current_score += 1;
            this.showCorrect();
            this.setCurrentScore();
            this.goNextQuestion();
        } else {
            this.showWrong();
            this.goNextQuestion();
        }
    },

    showCorrect: function () {
        var self = this;
        this.rightSprite.stopAllActions();
        this.rightSprite.opacity = 255;
        this.wrongSprite.opacity = 0;
        this.rightSprite.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {

        })));
    },

    showWrong: function () {
        var self = this;
        this.wrongSprite.stopAllActions();
        this.rightSprite.opacity = 0;
        this.wrongSprite.opacity = 255;
        this.wrongSprite.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {

        })));
    },

    goNextQuestion: function () {
        if (this._game_end == true) {
            return;
        }
        this.createQuestion();

    },

    gameEnd: function () {
        if (this._game_end == false) {
            sdk.sendCaculationMsg("game finish");
            this._game_end = true;
            this.gScoreLabel.string = "总共答对" + this._current_score + "道题";
            let iword = this.getDesWord(this._current_score);
            this.gWordLabel.string = iword;
            this.gameEndLayer.active = true;
        }
    },

    getDesWord: function (score) {
        if (score == 0) {
            var sp = method.getItemsFromArr(GG.DES_LEVEL0, 1);
        } else if (score < 10) {
            var sp = method.getItemsFromArr(GG.DES_LEVEL1, 1);
        } else if (score < 15) {
            var sp = method.getItemsFromArr(GG.DES_LEVEL2, 1);
        } else {
            var sp = method.getItemsFromArr(GG.DES_LEVEL3, 1);
        }
        return sp;
    },

    playBtn : function(){
        if(this._playe_tag ==false ){
            this._playe_tag = true;
            sdk.sendCaculationMsg("click button");
        }
    },










});
