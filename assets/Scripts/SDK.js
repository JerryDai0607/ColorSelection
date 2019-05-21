
var SDK = {

    isAndroid : function(){
        cc.log("isAndroid:"+cc.sys.isNative);
        if(cc.sys.isNative){
            return cc.sys.os === cc.sys.OS_ANDROID;
        }else{
            return false;
        }
        
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

    sendCaculationMsg : function(f){
        this.callIOS("GUBrigde", "statisticalEvent:",f);
    },

    

};

module.exports = SDK;
