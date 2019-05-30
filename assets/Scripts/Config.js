window.GG = {};

GG.DEFAULT_GAMETIME = 20;//默认游戏时长
GG.DEFAULT_GAMESCORE =20;//题目数
GG.COLOR_ARR = ["红","黄","蓝","黑","绿"];
GG.COLOR_NUM = {
    "红":"ff0000",
    "黄":"ffff00",
    "蓝":"0000ff",
    "黑":"000000",
    "绿":"00ff00",
};
GG.DES_LEVEL0 = ["别骗我，你都没点击按钮吗","你肯定是故意的","0分还是很少见的","天才","牛","氪得高分哟"];
GG.DES_LEVEL1 = ["你有那么一点菜啊","我建议你再来一次","少年，打篮球吗？","再接再厉啊","你可能需要再来一次","看好了再选","要睁大眼睛看哦","你是caixukun吧！","充值还能更强哦"];
GG.DES_LEVEL2 = ["看样子还行","你可以更厉害的","你已经超过很多菜鸟了","哎哟，不错哦","你开挂了吧","掌声在哪里","充还能更强哦"];
GG.DES_LEVEL3 = ["你为何如此优秀","一枝独秀","还敢再来一次吗！","眼睛看花了吧，不过你很棒棒啊","应该没人超过你了吧","天才","请接受我的膜拜","充值还能更强哦"];
GG.DES_LEVEL4 = ["人民币战士","阁下一定是土豪","佩服","人生如戏，全靠氪","无人能及"];

// var CHARGEOK = function(){
//     cc.log("充值成功");
// };
// window.CHARGEOK = CHARGEOK;
GG.EVENT = {
    CHARGE_OK : "CHARGE_OK"
};
window.CHARGEOK = function(){
    cc.log("充值成功");
    let event = new cc.Event.EventCustom("CHARGE_OK", true);
    cc.systemEvent.dispatchEvent(event);
};