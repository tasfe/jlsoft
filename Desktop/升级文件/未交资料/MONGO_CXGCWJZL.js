﻿var MONGO_CXGCWJZL_queryGCWJZL = {
	"DataBaseType" : "scmform",
	"title" : "查询工程未交资料",
	"url" : pubJson.getURL("FormUrl") + "/queryGCWJZL/WJZL.do",
    "page" : "scm/gcgl/gcdl/search/CXGCWJZL.html",
	"result" : [
			  {"id":"DJZT", "name":"单据状态", "width":200},
	  	      {"id":"GCDLD01", "name":"工程登录单", "width":200},
	 	      // {"id":"QY", "name":"区域", "width":200},
	 	      {"id":"JXSMC", "name":"经销商", "width":200},
	 	      {"id":"EJJXSMC", "name":"二级经销商", "width":200},
	 	      {"id":"SYDW", "name":"使用单位", "width":200},
	 	      {"id":"FXD01", "name":"工程分销单号", "width":200},
	           {"id": "SPXX02","name": "商品编码","width": 120},
	           {"id": "SPXX04","name": "商品名称","width": 200},
	           {"id": "THSL","name": "分销数量","summary" : "sum","width": 120,"align":"right"},
	           // {"id": "CKSL","name": "出库数量","summary" : "sum","width": 120,"align":"right"},
	           {"id": "YJSL","name": "已交资料数量","summary" : "sum","width": 120,"align":"right"},
               {"id": "WSJSL","name": "未交数量","summary" : "sum","width": 120,"align":"right"},
               {"id": "YFHSL","name": "已返还数量","summary" : "sum","width": 120,"align":"right"},
	           // {"id": "WTZLSL","name": "问题资料数量","summary" : "sum","width": 120,"align":"right"},
		       {"id": "GCSCSL","name": "收差数量","summary" : "sum","width": 100,"align":"right"},
	           {"id": "FXJE","name": "分销金额","summary" : "sum","width": 120,"align":"right"},
	           {"id": "FXDJ","name": "分销单价","width": 100,"align":"right"},
	           {"id": "SYDWDZ","name": "使用单位地址","width": 100},
	           {"id": "LXDH","name": "联系电话","width": 100},
	           {"id": "GCLX","name": "工程类型","width": 100},
	 	      {"id":"SBR", "name":"制单人", "width":150},
	 	      {"id":"SBSJ", "name":"制单日期", "width":250},
	 	      // {"id":"PFR", "name":"审核人", "width":250},
	 	      // {"id":"PFSJ", "name":"审核日期", "width":250},
	 	      {"id":"KDSJ", "name":"开单时间", "width":250},
	 	      {"id":"BZ", "name":"备注", "width":250},
		      // {"id":"DZ", "name":"是否个人搭载", "width":250},
		      // {"id":"SFTSGC", "name":"是否可核查拍照", "width":250},
		      // {"id":"GCGZR", "name":"厂家跟踪人", "width":250},
        	  {"id":"GCYT", "name":"工程用途", "width":200},
	]
};
