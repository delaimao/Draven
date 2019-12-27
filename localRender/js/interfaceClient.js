function callInterface( controller, action, paras, okFunc, errFunc){
	var url = "/mserver/interface/" + controller + "/?app=" + action;
	$.ajax({
			url:      url,
			type:     "POST",
			dataType: 'json',
			success: function(json){
				if(typeof okFunc === "function") { 
                    okFunc(json);
                }
			},
			error: function(jqXHR, textStatus, errorThrown){
				if(typeof errFunc === "function") { 
					errFunc(jqXHR, textStatus, errorThrown);
                }
			},
			data: paras,
			async: true
	});
}

function callRemoteUrl( url, okFunc, errFunc){
	$.ajax({
			url:      url,
			type:     "GET",
			dataType: 'json',
			success: function(json){
				if(typeof okFunc === "function") { 
                    okFunc(json);
                }
			},
			error: function(jqXHR, textStatus, errorThrown){
				if(typeof errFunc === "function") { 
					errFunc(jqXHR, textStatus, errorThrown);
                }
			},
			async: true
	});
}

