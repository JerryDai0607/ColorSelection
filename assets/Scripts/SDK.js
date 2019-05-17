
var SDK = {

    isAndroid : function(){
        cc.log("isAndroid:"+cc.sys.os);
        return cc.sys.os === cc.sys.OS_ANDROID;
    },

    callIOS : function(classname,funcname,param = ""){
        cc.log("callIOS");
        if(this.isAndroid()){
            return;
        }
        cc.log("callIOSsucess");
        try {
            var ret = jsb.reflection.callStaticMethod(classname, funcname, param);
        } catch (e) {
            cc.log(e.stack);
        }
        return ret;
    },

    sendCaculationMsg : function(){
        this.callIOS("clasename","funcname");//需要修改
    },

    

};

module.exports = SDK;
