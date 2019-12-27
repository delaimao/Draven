
function ntv_uuid(len, radix) {

    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');

}

function getUrlParam(name) 
{ 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) 
	{
		return r[2];
	}
	else
	{
		return null; 
	}
}

function gen_rtmp_live_url(host,app,stream,token,port)
{
	var url;
	var npos = host.indexOf(":");
	if(npos>0){
		url = "rtmp://"  + host.substr(0,npos) + ":" + port + "/" + app + "/" + stream;
	}else{
		url = "rtmp://"  + host                + ":" + port + "/" + app + "/" + stream;
	}

    if(token!="")
    {
        url = url + "?token=" + token;
    }
    else{
    	url = url + "?token=";
    }
    return url;
}

function gen_flv_vod_url(host,app,stream,ver,token)
{
    var url  = "http://"  + host + "/sps/" + app + "/" + stream + ".flv?ver=" + ver;
    if(token!="")
    {
        url = url + "&token=" + token;
    }
    return url;
}

function gen_vod_cover_url(host,app,stream,ver){
	var url  = "http://"  + host + "/media/mjepg/" + app + "/" + stream + "/" + stream;
	if(ver!="" && ver!="-1"){
		url = url + "_v" + ver;
	}
	url = url + ".jpg";
	return url;
}


function gen_mp4_url(host,app,stream,ver,token)
{
    var   url= "http://" + host + "/mp4/" + app + "/" + stream + "/" + stream;
    if(ver!="" && ver!="-1")
    {
       url = url + "_v" + ver;
    }
    url    = url  + ".mp4";
    if(token!="")
    {
        url = url + "?token=" + token;
    }
    return url;
}

function gen_hls_url(host,app,stream,ver,token)
{
	var d = new Date();
	var url  = "http://"  + host + "/m3u8/" + app + "/" + stream + ".m3u8?from=ph";
	if(ver!="" && ver!="-1")
	{
	   url = url + "&ver=" + ver;
	}
	if(token!="")
    {
        url = url + "&token=" + token;
    }
	return url;
}

/**
 * 当前站点的http域名和端口
 */
function http_host(){
	//var host = document.location.host;			//带端口
	var host = document.location.hostname;      //不带端口
	var port = document.location.port;
	var protocal =  http_protocal();
	
	if(port==80 || port==""){
		return protocal + host;
	}else{
		return protocal + host + ":" + port;
	}
}

function http_protocal(){
	var prot     = document.location.protocol;
	var protocal = "http://";
	if(prot.indexOf("https")==0){
		protocal = "https://";
	}
	return protocal;
}

function local_host(){
	var port     = document.location.port;
	var protocal =  http_protocal();
	var host     = "127.0.0.1";
	
	if(port==80 || port==""){
		return protocal + host;
	}else{
		return protocal + host + ":" + port;
	}
}