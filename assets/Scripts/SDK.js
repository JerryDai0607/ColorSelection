
var SDK = {

    isAndroid : function(){
        cc.log("isNative:"+cc.sys.isNative);
        if(cc.sys.isNative){
            return cc.sys.os === cc.sys.OS_ANDROID;
        }else{
            return false;
        }
        
    },

    isApple : function(){
        cc.log("isNative:"+cc.sys.isNative+"-os:"+cc.sys.os);
        if(cc.sys.isNative && (cc.sys.os ==cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX)){
            return true;
        }else{
            return false;
        }
        
    },

    callIOS : function(classname,funcname,param = ""){
        cc.log("callIOS");
        if(!this.isApple()){
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
