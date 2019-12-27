function getBrowser(){
	var userAgent = navigator.userAgent; 
	var isOpera = userAgent.indexOf("Opera") > -1;
	//判断是否Opera浏览器
	if (isOpera) {
	    return "Opera"
	}; 
	//判断是否Firefox浏览器
	if (userAgent.indexOf("Firefox") > -1) {
	    return "FF";
	} 
	//判断是否chorme浏览器
	if (userAgent.indexOf("Chrome") > -1){
		return "Chrome";
	}
	//判断是否Safari浏览器
	if (userAgent.indexOf("Safari") > -1) {
	    return "Safari";
	} 
	//判断是否IE浏览器
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
	    return "IE";
	}
	//判断是否Edge浏览器
	if (userAgent.indexOf("Trident") > -1) {
	    return "Edge";
	}
	
	return "";
}

//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,   //IE内核
            presto: u.indexOf('Presto') > -1,      //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),                 //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),            //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,//android终端
            iPhone: u.indexOf('iPhone') > -1 ,                          //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,                                //是否iPad
            webApp: u.indexOf('Safari') == -1,                           //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1,                    //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq"                                //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
/*
 * 用法：
 * 判断是否移动端
 * if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }
 */

function apple_android(){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	    return 1;
	} else if (/(Android)/i.test(navigator.userAgent)) {
	    return 2;
	} else {
	    return 0;
	}
}