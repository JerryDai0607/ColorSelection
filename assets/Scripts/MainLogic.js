var sdk = require("SDK");

cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: {
            type: cc.Node,
            default: null
        },

        tipNode: {
            type: cc.Node,
            default: null
        },

        lobbyNode: {
            type: cc.Node,
            default: null
        },

        title0: {
            type: cc.Node,
            default: null
        },

        title1: {
            type: cc.Node,
            default: null
        },

        _played_lobby_eft: cc.Integer,
        _show_tip_times: cc.Integer
    },

    onEnable : function(){
        cc.systemEvent.on(GG.EVENT.CHARGE_OK, this.enterGameWithLastScroe, this);
    },

    onDisable : function(){
        cc.systemEvent.off(GG.EVENT.CHARGE_OK, this.enterGameWithLastScroe, this);
    },


    start: function () {
        this._played_lobby_eft = 0;
        this._show_tip_times = 0;
        sdk.sendCaculationMsg("into game");
        this.lobbyNode.active = true;
        this.tipNode.active = true;
        this.playLobbyEft();
    },

    enterGame: function () {
        sdk.sendCaculationMsg("start game");
        this.lobbyNode.active = false;
        this.tipNode.active = false;
        this.gameNode.getComponent("GameControl").gameStart();
    },

    //充值成功后走这个进入游戏
    enterGameWithLastScroe : function(){
        cc.log("金主大爷的回调");
        this.lobbyNode.active = false;
        this.tipNode.active = false;
        this.gameNode.getComponent("GameControl").gameStartWithOutDelet();
    },

    enterTips: function () {
        sdk.sendCaculationMsg("into tips");
        this._show_tip_times += 1;
        if (this._show_tip_times > 3) {
            this.enterGame();
        } else {
            this.lobbyNode.active = false;
            this.tipNode.active = true;
        }

    },

    enterLobby: function () {
        sdk.sendCaculationMsg("back to first");
        this.lobbyNode.active = true;
        this.tipNode.active = false;
        this.playLobbyEft();
    },

    playLobbyEft: function () {
        this._played_lobby_eft += 1;
        if (this._played_lobby_eft >= 4) {
            return;
        }
        this.title0.y = 500;
        this.title1.x = 1000;
        var act0 = cc.moveTo(0.5, cc.v2(-57, 0)).easing(cc.easeIn(1));
        this.title0.runAction(act0);
        var act1 = cc.moveTo(0.5, cc.v2(34, 0)).easing(cc.easeIn(1));
        this.title1.runAction(cc.sequence(cc.delayTime(0.5), act1));
    },

    //这边调用充值
    btnCharge : function(){
        //this.enterGameWithLastScroe();
        sdk.sendCaculationMsg("replay");
    },

    //这边调用分享接口
    btnShare : function(){
        sdk.sendCaculationMsg("share");
    },

    
});
