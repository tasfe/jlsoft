var version = Math.random();
var JLQuery = {};
JLQuery.config = {
	grid: "",
	callback: {}
}

JLQuery.enterOpen = function(e,divID){
	var e = e || window.event; 
	if(e.keyCode == 13){ 
		JLQuery.open(divID);
	} 
}

JLQuery.gridShow = function(obj, json){
	var modalURL = pubJson.getURL("FormUrl") + "/form/form_pc/FormGridQuery.html?rid="+Math.random();
	
/**
	var dir = "context";
	if(!JL.isNull(json.dir)){
		dir = json.dir;
	}
	
	if(!JL.isNull(json.namespace)){
		var namespace = json.namespace;
		var sqlid = json.sqlid;
		if(!JL.isNull(namespace) && $("script[src*='"+namespace+".js']").length==0){
			var src = pubJson.getURL("FormUrl") + "/"+dir+"/"+namespace+".js";
			$(document).find("body").append("<script type='text/javascript' src='"+src+"?rid="+rid+"'><\/script>");
		}
		
		var sqlMap = eval(namespace+"_"+sqlid);
		sqlMap.sqlid = namespace+"."+sqlid;
	}
**/
	var form = eval(obj.closest("div.pagr_content").attr("data-name"));
	JLQuery["config"] = {};
	JLQuery["config"]["form"] = form;
	JLQuery["config"]["isOpen"] = false;
	$.extend(JLQuery["config"], json);

    var modalField = {};
    if(!JL.isNull(JLQuery["config"]["init"])){
    	$.each(JLQuery["config"]["init"], function(name,value){
    		if(name.indexOf(".")!=-1){
    			var gridname = name.split(".")[0];
    			var key = name.split(".")[1];
    			var grid = form.getPluginObj(gridname);
    			modalField[value] = grid.getData(grid.getLastActive(), key);
    		}else{
    			modalField[value] = obj.closest("div.pagr_content").find("[name='"+name+"']").val();
    		}
    	});
    	JLQuery["config"]["modalField"] = modalField;
    }

    obj.load(modalURL);
};

//sqlid版
JLQuery.show2 = function(form, json, obj){
	var modalURL = pubJson.getURL("FormUrl") + "/form/form_pc/commonQuery.html?rid="+Math.random();
	
	var sqlMap = JL.getSqlMap(json);
	
	JLQuery["config"] = {};
	$.extend(JLQuery["config"], json);
	JLQuery["config"]["form"] = form;
	JLQuery["config"]["sqlMap"] = sqlMap;
	JLQuery["config"]["notCover"] = true;
	
	var modalField = {};
	if(!JL.isNull(JLQuery["config"]["init"])){
		$.each(JLQuery["config"]["init"], function(name,value){
			var split = name.split(".");
			if(split.length > 1){
				if(split[1] == "key"){
					var pluginData = form.getPluginObj(split[0]).getData();
					modalField[value] = pluginData.key;
				}else if(split[1] == "value"){
					var pluginData = form.getPluginObj(split[0]).getData();
					modalField[value] = pluginData.value;
				}else{
					var rowindex = form.getPluginObj(split[0]).getSelectedIndex()[0];
					var pluginData = form.getPluginObj(split[0]).getData(rowindex);
					modalField[value] = pluginData[split[1]];
				}
			}else if(!JL.isNull(form.getPluginObj(name))){
				modalField[value] = form.getPluginObj(name).getData();
			}else{
				modalField[value] = form.getTab().find("[name='"+name+"']").val();
			}
		});
	}
	if(!JL.isNull(json.queryField)){
		$.extend(modalField, json.queryField);
	}
	JLQuery["config"]["modalField"] = modalField;
	
	var config = JLQuery["config"];
	if(!JL.isNull(config.listener) && !JL.isNull(config.listener.beforequery)){
		try{
			if(config.listener.beforequery(JLQuery["config"]["modalField"])){
				return true;
			}
		}catch(e){
			console.error(e);
		}
	}
	
	JL.window(modalURL,modalField, function(obj){
		commonQuery.setTab(obj);
		commonQuery.initForm();
	});
};

//querybh版
JLQuery.show = function(form, json, obj){
	var modalURL = pubJson.getURL("FormUrl") + "/form/form_pc/FormQueryPro.html?rid="+Math.random();
	
	JLQuery["config"] = {};
	JLQuery["config"]["form"] = form;
	JLQuery["config"]["notCover"] = true;
	$.extend(JLQuery["config"], json);
	
	var modalField = {};
	if(!JL.isNull(JLQuery["config"]["init"])){
		$.each(JLQuery["config"]["init"], function(name,value){
			var split = name.split(".");
			if(split.length > 1){
				if(split[1] == "key"){
					var pluginData = form.getPluginObj(split[0]).getData();
					modalField[value] = pluginData.key;
				}else if(split[1] == "value"){
					var pluginData = form.getPluginObj(split[0]).getData();
					modalField[value] = pluginData.value;
				}else{
					var rowindex = form.getPluginObj(split[0]).getSelectedIndex()[0];
					var pluginData = form.getPluginObj(split[0]).getData(rowindex);
					modalField[value] = pluginData[split[1]];
				}
			}else{
				modalField[value] = form.getTab().find("[name='"+name+"']").val();
			}
		});
		JLQuery["config"]["modalField"] = modalField;
	}
	
	var config = JLQuery["config"];
	if(!JL.isNull(config.listener) && !JL.isNull(config.listener.beforequery)){
		try{
			if(config.listener.beforequery(JLQuery["config"]["modalField"])){
				return true;
			}
		}catch(e){
			console.error(e);
		}
	}
	
	if(JLQuery["config"]["realTime"]){
		var XmlData={};
		XmlData["CX01"] = JLQuery.config.querybh;
		XmlData["queryField"] = $.extend(modalField,userInfo);
		
		var ajaxJson = {};
		ajaxJson["src"] = "jlquery/selectCustom.do?rid="+Math.random();
		ajaxJson["data"] = {"XmlData":JSON.stringify(XmlData)};
		ajaxJson["alert"] = true;
		ajaxJson["async"] = true;
		ajaxJson["callback"] = function(resultData){
			if(!JL.isNull(resultData)){
				JLQuery["config"]["resultData"] = resultData["data"];
				JLQuery["config"]["fileName"] = resultData["fileName"];
				if(JLQuery["config"]["resultData"].length == 0){
					JL.tip("查询无此数据");
					return false;
				}
				JL.window(modalURL,modalField);
			}
		};
		JL.ajax(ajaxJson,true);
	}else{
		JL.window(modalURL,modalField);
	}

};

JLQuery.close = function(jsonData){
	var config = JLQuery["config"];
	
	if(!JL.isNull(config.listener) && !JL.isNull(config.listener.beforecallback)){
		try{
			var bcb = config.listener.beforecallback(jsonData);
			if(bcb != undefined){
				jsonData = bcb;
			}
		}catch(e){
			console.error(e);
		}
	}
	
	if(!JL.isNull(config.fieldMapping)){
		for(var i=0; i<jsonData.length; i++){
			var rowData = jsonData[i];
			var rowNew = {};
			var grid = null;
			$.each(rowData, function(key,value){
				if(typeof value == "string" 
					&& value.indexOf("[") == 0 
					&& value.indexOf("]") != -1 ){
					value = JSON.parse(value);
				}
				var name = config.fieldMapping[key];
				
				if(!JL.isNull(name)){
					var name_split = name.split(".");
					if(name_split.length == 1){
						JLQuery.write(name,value);
					}else if(name_split.length == 2){
						grid = config.form.getPluginObj(name_split[0]);
						rowNew[name_split[1]] = value;
					}
				}else{
					if(typeof value == "object" && $.isArray(value)){
						for(var j=0; j<value.length; j++){
							var detailRow = value[j];
							var detailRowNew = {};
							var grid1 = null;
							if(typeof detailRow == "object"){
								$.each(detailRow, function(key1,value1){
									var name1 = config.fieldMapping[key+"."+key1];
									if(!JL.isNull(name1)){
										var name_split1 = name1.split(".");
										var gridName = name_split1[0];
										var fieldName = name_split1[1];
										grid1 = config.form.getPluginObj(gridName);
										detailRowNew[fieldName] = value1;
									}
								});
							}
							
							if(!JL.isNull(grid1)){
								$.extend(detailRowNew, rowNew);
								grid1.addRow(detailRowNew);
							}
						}
					}
				}
			});
			
			if(!JL.isNull(grid)){
				if(!(!JL.isNull(rowData.item) && rowData.item.length > 0)){
					if(config.update && i == 0){
						var lastActive = grid.getSelectedIndex()[0];
						grid.setRow(rowNew,lastActive);
					}else{
						grid.addRow(rowNew);
					}
				}
			}
		}
	} else {
		JLQuery.hide(jsonData);
	}
	
	$(".jl_modal .modal_close").click();

	if(!JL.isNull(config.listener) && !JL.isNull(config.listener.aftercallback)){
		try{
			config.listener.aftercallback(jsonData);
		}catch(e){
			console.error(e);
		}
	}
}
JLQuery.hide = function(jsonData){
	var config = JLQuery["config"];
	if(JL.isNull(config["grid"])){
		var rowData = JL.isNull(jsonData[0])? {}: jsonData[0];
		$.each(rowData, function(key,value){
			if(!JL.isNull(config["callback"]) && !JL.isNull(config["callback"][key])){
				JLQuery.write(config["callback"][key],value);
			}
		});
	}else{
		var grid = JLGrid.getGrid(config["grid"]);
		var count = grid.getDatas().length;
		var lastActive = grid.getSelectedIndex()[0];
		var line = grid.getDatas()[lastActive];
		
		for(var i=0;i<jsonData.length;i++){
			var rowData=jsonData[i];
			var pData={};
			
			$.each(rowData, function(key,value){
				if(config["callback"][key]) {
					pData[config["callback"][key]]=value;	
				}
			});

			if(!JL.isNull(lastActive) && i == 0 && JL.isNull(config["notCover"])){
				pData = $.extend({}, line, pData);
				grid.setRow(pData,lastActive);
			}else{
				grid.addRow(pData);
			}
		}
	}
	
	if(!JL.isNull(JLQuery["config"]["aftercallback"])){
		JLQuery["config"]["aftercallback"](jsonData);
	}
};

JLQuery.write = function(key,value,form){
	var currentTab = null;
	if(JL.checkClient("pc")){
		currentTab = $(".pagr_content[data-id]:not(:hidden)");
	}else if(JL.checkClient("mobile")){
		currentTab = $(".jl_main[data-id]:not(:hidden)");
	}
	var page = "";
	if(!JL.isNull(currentTab.attr("data-name"))){
		page = eval(currentTab.attr("data-name"));
	}
	if(!JL.isNull(form)){
		page = form;
	}
	var plugins = page.getPlugin();
	var pluginObjs = page.getPluginObj();
	currentTab = page.getTab();
	
	if(!JL.isNull(pluginObjs[key])){
		pluginObjs[key].setData(value);
	}else if(!JL.isNull(plugins[key]) && !JL.isNull(plugins[key]["jlid"])){
		var pluginInit = plugins[key];
		pluginInit["obj"] = currentTab.find("#d_"+key);
		pluginInit["zdid"] = key;
		pluginInit["config"] = pluginInit;
		var plugin = eval(pluginInit["jlid"]);
		try{
			plugin.setValue(pluginInit,value);
		}catch(e){
			console.info(e);
		}
	}else if(currentTab.find("select[name='"+key+"']").length>0){
		value = JL.formatString(value); 
		currentTab.find("select[name='"+key+"']").val(value);
	}else if(currentTab.find(":radio[name='"+key+"']").length > 0){
		value = JL.formatString(value); 
		currentTab.find(":radio[name='"+key+"'][value='"+value+"']").attr("checked",true);
	}else if(currentTab.find(":checkbox[name='"+key+"']").length > 0){
		if(typeof value == "string"){
			value = JSON.parse(value);
		}
		for(var i=0;i<value.length;i++){
			var checkbox_value = value[i];
			currentTab.find(":checkbox[name='"+key+"'][value='"+checkbox_value["key"]+"']").attr("checked",true);
		}
	}else{
		currentTab.find("[name='"+key+"']").val(value);
	}
}

var queryGrid = {};