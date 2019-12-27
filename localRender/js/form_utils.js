/**
 * 使用json对象内容填充form
 * @param json  对象，如 {'name':'jacky'}
 * @param formId form的id
 */

/**
 * 解决没有被选择的checkbox和radio不能序列化问题，由于是反向填充fillFormFromJson需要获取这些对象。
 * form元素使用name识别。
 */
$.fn.ntv_serialize = function () {
    var a = this.serializeArray();
    var $radio = $('input[type=radio],input[type=checkbox]', this);
    var temp = {};
    $.each($radio, function () {
        if (!temp.hasOwnProperty(this.name)) {
            if ($("input[name='" + this.name + "']:checked").length == 0) {
                temp[this.name] = "";
                a.push({name: this.name, value: ""});
            }
        }
    });
    return a;
};

function fillFormFromJson(json,formId) {
	var serializeArray = $("#"+formId).ntv_serialize();
	for(var i = 0 ; i < serializeArray.length ; i ++ ){
		var name = serializeArray[i].name;
		var ele   = $("[name='"+name+"']");
		//console.log(name + ":" + ele.attr("type") + ":" + ele.attr("value"));
		if(json.hasOwnProperty(name)){
			var value = json[name];
			if(ele.attr("type")=="checkbox"){
				//之前把value==这个判断子句合并到父判断子句，导致checkbox值被置空，即便选择也无法提交正确数值 :)
				if(value==ele.attr("value")){
					ele.attr("checked", "checked");
					ele.attr("checked", true);
				}
			}else{
				ele.val(value);
			}
		}
	}
}

/**
 * 序列化表单提交对象，表单域使用name属性识别。
 * @param formId
 * @returns
 */
function serializeForm(formId){
	return $("#"+formId).serialize();
}
/**
 * 用get方法提交表单
 * @param url
 * @param formId  id of the form
 * @param funcSuccess
 * @param funcError
 */
function submitForm(url,formId,funcSuccess,funcError) 
{
	var paras = serializeForm(formId);
	if(url.indexOf("?")>0){
		url = url + "&" + paras;
	}else{
		url = url + "?" + paras;
	}
	
	$.ajax({
		url:  url,
		type:     "GET",
		dataType: "json",
		success: funcSuccess,
		error:   funcError,
		async:   true,
	});
}

/**
 * 实现全选操作，根据allId元素的选中状态改变subId元素的选中状态
 * 传入的是id属性。
 */
function checkAllbyId(allId,subId){
    var all = document.getElementById(allId);
    if(all.checked==true){
    	$("input[type=checkbox]").each(function(){  
			$(this).attr("checked", true);
		}); 
    }else{
    	$("input[type=checkbox]:checked").each(function(){  
			$(this).attr("checked", false);
		}); 
    }
}
/**
 * 获取复选框的值，以,拼接的字符串，用于表单提交。
 * 传入的是id属性。
 */
function checkValues(id){
	var id_array=new Array();  
	$("input[type=checkbox]:checked").each(function(){  
		id_array.push($(this).val());
	});  
	return id_array.join(',');
}

/**
 * 可编辑标签
@param btnEdit  按钮对象
@param func    回调函数
@param btnHtml 按钮编辑状态的显示效果，忽略显示“保存”
回调原型：editLabelFunc(id,value,oldValue)
     id  编辑目标的id
	 value 编辑新值
	 oldValue 编辑前的值
样例：
<span id="aaa">小米笔记本电脑</span><button onclick="editLabel(this)">编辑</button>
*/
function editLabelFunc(id,value,oldValue){
	document.getElementById(id).innerHTML= value;
}
function editLabel(labelId,btnEdit,func, btnHtml) {
	//替换按钮标签
	var btnOldHtml = btnEdit.innerHTML;
	btnHtml = btnHtml || "保存";
	btnEdit.innerHTML = btnHtml;

	//要编辑的对象
	//var prev = btnEdit.previousSibling;
	var label    = document.getElementById(labelId);
	var oldValue = label.innerHTML;
	label.innerHTML = "";

	//创建编辑框
	var inputObj  = document.createElement("input");
	inputObj.type = "text";
	//inputObj.id = "inputText";
	//inputObj.className="text";
	inputObj.value = oldValue;
	label.appendChild(inputObj);
	inputObj.focus();

	func = func || editLabelFunc;
	inputObj.onblur = function() {
		//恢复按钮标签
		btnEdit.innerHTML = btnOldHtml;
		label.innerHTML   = this.value;
		//回调
		func(labelId, this.value, oldValue);
	}
}