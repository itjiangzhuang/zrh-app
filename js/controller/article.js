/**
 * Created by jiangzhuang on 5/5/16.
 */

var articleCtrl = angular.module('articleCtrl', []);

articleCtrl.controller('ArticleListCtrl', function ($http, $scope, $rootScope, $location) {
	 
	 $scope.list = function () {
        $http({
            url: api_uri+"api/article/list",
            method: "GET"
        }).success(function (d) {
        	console.log(d);
            if (d.returnCode == 0) {
                $scope.article_list = d.result;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };
    
    $scope.list();
    
    $scope.article_show =  function(id){
    	if(!isNullOrEmpty(id)){
    		$location.path("/article/show/"+id);
    	}
	};

	$scope.goto_create = function () {

		$location.path("/article/create/step1");
	}

})

articleCtrl.controller('ArticleShowCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 
	 $scope.init = function () {
        $http({
            url: api_uri+"api/article/show/"+$routeParams.id,
            method: "GET"
        }).success(function (d) {
        	console.log(d);
            if (d.returnCode == 0) {
                $scope.article = d.result.article;
                $scope.operate = d.result.operate;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };
    
    $scope.init();
    
});

articleCtrl.controller('ArticleCreateStep1Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 
	 $scope.createArticle = $rootScope.getObject("create_article");
	 console.log($scope.createArticle);
	 
	 if(!$scope.createArticle){
	 	$scope.createArticle = {};
	 	$scope.createArticle.license = {};
	 }else{
	 	if(!$scope.createArticle.license){
	 		$scope.createArticle.license = {};
	 	}
	 }
	  
	 $scope.getFormToken = function () {
        $http({
            url: api_uri+"api/article/formToken",
            method: "GET",
            params:{
				"userId": $rootScope.login_user.userId,
				"token": $rootScope.login_user.token
            }
        }).success(function (d) {
            if (d.returnCode == 0) {
                $scope.createArticle.formToken = d.result;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };
    
    $scope.changeLoanLife = function(){
    	$scope.createArticle.loanLife = $("#loanLife").val();
    	$scope.$apply();
    }
    
    $scope.changeRateCap = function(){
    	$scope.createArticle.rateCap = $("#rateCap").val();
    	$scope.$apply();
    }
    
    $scope.changeRateFloor = function(){
    	$scope.createArticle.rateFloor = $("#rateFloor").val();
    	$scope.$apply();
    }
    
    $scope.init = function(){
    	if(!$scope.createArticle.id||isNullOrEmpty($scope.createArticle.id)){
	    	$scope.getFormToken();
	    }
    	$('#rate').daterate();//利率选择
    	$('#term').dateterm();//期限选择
    };
    
    $scope.setStyle_div = function(args){	   
	 	if(args){
	 		return "setafter";
	 	}else{
	 		return "reqname";
	 	}
	 }
    
     $scope.setStyle_div2 = function(arg1,arg2){	   
	 	if(arg1&&arg2){
	 		return "setafter";
	 	}else{
	 		return "reqname";
	 	}
	 }
    
    $scope.init();
    console.log($scope.createArticle);
    $scope.choose_classification = function(){
    	$rootScope.putObject("create_article",$scope.createArticle);
    	$location.path("/article/classification/create");
    };
    
    
    $scope.create_license = function(){
    	$rootScope.putObject("create_article",$scope.createArticle);
    	$location.path("/article/create/license/create");
    };
 
    
    params = {
    	"id":$scope.createArticle.id,
		"userId": $rootScope.login_user.userId,
		"token": $rootScope.login_user.token,
    	"formToken":$scope.createArticle.formToken   	
    }
    
    
    $scope.next_step = function(){
    	if(!isNullOrEmpty($scope.createArticle.loanvalue)){
    		params.loanvalue = $scope.createArticle.loanvalue;
    	}
    	if(!isNullOrEmpty($scope.createArticle.loanlife)){
    		params.loanlife = $scope.createArticle.loanlife;
    	}
    	if(!isNullOrEmpty($scope.createArticle.ratecap)){
    		params.ratecap = $scope.createArticle.ratecap;
    	}
    	if(!isNullOrEmpty($scope.createArticle.ratefloor)){
    		params.ratefloor = $scope.createArticle.ratefloor;
    	}
    	if(!isNullOrEmpty($scope.createArticle.classification)){
    		params.classification = $scope.createArticle.classification;
    	}

        if(!isNullOrEmpty($scope.createArticle.license.businessName)){
    		params.businessName = $scope.createArticle.license.businessName;
    	}else{
    		alert("请完善公司名称");
    		$scope.create_license();
    	}
        if(!isNullOrEmpty($scope.createArticle.license.regTime)){
    		params.regTime = $scope.createArticle.license.regTime;
    	}
        if(!isNullOrEmpty($scope.createArticle.license.businessType)){
    		params.businessType = $scope.createArticle.license.businessType;
    	}
        if(!isNullOrEmpty($scope.createArticle.license.regFunds)){
    		params.regFunds = $scope.createArticle.license.regFunds;
    	}
        if(!isNullOrEmpty($scope.createArticle.license.licenseImgs)){
    		params.licenseImgs = $scope.createArticle.license.licenseImgs;
    	}
    	if(!isNullOrEmpty($scope.createArticle.license.corporateRepresentative)){
    		params.corporateRepresentative = $scope.createArticle.license.corporateRepresentative;
    	}
    	
    	$.post(api_uri+"api/article/createStep1",params,
		  function(data){
		    if (data.returnCode == 0) {
            	$rootScope.removeObject("create_article");
            	$scope.articleStep2 = {
            		"id":data.result
            	}           	
            	$rootScope.putSessionObject("articleStep2",$scope.articleStep2);
                $location.path("/article/create/step2");
            }else {
            	console.log(data);
            }
		  },
		"json");
    };
    
});

articleCtrl.controller('ArticleCreateLicenseCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
	 
	 if($routeParams.op == "create"){
	 	$scope.article = $rootScope.getObject("create_article");
	 }else if($routeParams.op == "update"){
	 	$scope.article = $rootScope.getSessionObject("update_article");
	 }else{
	 	alert("error op");
	 	$location.path("/article/list");
	 }
	 

	$scope.license = $scope.article.license;
 	if(!$scope.license){
 		$scope.license = {}
 	}
 	
 	$scope.changeRegTime = function(){
 		$scope.license.regTime = $("#regTime").val();
 		$scope.$apply();
 		console.log($scope.license);
 	}
	 
	 $scope.setStyle_div = function(args){	   
	 	if(args){
	 		return "setafter";
	 	}else{
	 		return "reqname";
	 	}
	 }
	 
     $("#time").date();
     
     $scope.choose_type = function(){
     	$scope.article.license = $scope.license;
		if($routeParams.op == "create"){
	 	    $rootScope.putObject("create_article",$scope.article);
	 	    $location.path("/article/businessType/create");
		}else if($routeParams.op == "update"){
		 	$rootScope.putSessionObject("update_article",$scope.article);
	 	    $location.path("/article/businessType/update");
		}
     	
     };
     
     $scope.pic_select = function(){
     	$("#file").click();
     };
     
     $scope.upload = function() {    
            $.ajaxFileUpload({
                url: api_uri+"api/file/upload",
                type: 'post',
                secureuri: false, //一般设置为false
                fileElementId: 'file', // 上传文件的id、name属性名
                dataType: 'text', //返回值类型，一般设置为json、application/json
                jsonp: 'jsoncallback',  
                data:{
					"userId": $rootScope.login_user.userId,
					"token": $rootScope.login_user.token
                },
                success: function (data, status) {
                    console.log(data);
                },
                error: function (data, status, e) {
                    console.log(e);
                }
            });
	};
	
	$scope.change_time = function(){
		$scope.license.regTime = $("#time").val();
	}
	
	$scope.sure = function(){
		$scope.article.license = $scope.license;
		if($routeParams.op == "create"){
	 	    $rootScope.putObject("create_article",$scope.article);
	 	    $location.path("/article/create/step1");
		}else if($routeParams.op == "update"){
		 	$rootScope.putSessionObject("update_article",$scope.article);
	 	    $location.path("/article/update/step1/"+$scope.article.id);
		}
	}
});

articleCtrl.controller('ArticleCreateStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 
	 $scope.articleStep2 = $rootScope.getSessionObject("articleStep2");
     
     $scope.pledgeTypeList = [
       {"name":"房产","check":false},
       {"name":"地产","check":false},
       {"name":"股票","check":false},
       {"name":"车辆","check":false},
       {"name":"其他","check":false}
     ];

	 params = {
		"id":$scope.articleStep2.id,
		"userId": $rootScope.login_user.userId,
		"token": $rootScope.login_user.token
	 };

	$scope.save  = function(){
		if(!isNullOrEmpty($scope.articleStep2.pledgeType)){
	    	params.pledgeType = $scope.articleStep2.pledgeType;
	    }
		if(!isNullOrEmpty($scope.articleStep2.pledge)){
	    	params.pledge = $scope.articleStep2.pledge;
	    }
		if(!isNullOrEmpty($scope.articleStep2.pledgeImgs)){
	    	params.pledgeImgs = $scope.articleStep2.pledgeImgs;
	    }
		if(!isNullOrEmpty($scope.articleStep2.financialInfo)){
	    	params.financialInfo = $scope.articleStep2.financialInfo;
	    }
		if(!isNullOrEmpty($scope.articleStep2.financialImgs)){
	    	params.financialImgs = $scope.articleStep2.financialImgs;
	    }
		if(!isNullOrEmpty($scope.articleStep2.continualOperateYear)){
	    	params.continualOperateYear = $scope.articleStep2.continualOperateYear;
	    }
		if(!isNullOrEmpty($scope.articleStep2.continualPublicYear)){
	    	params.continualPublicYear = $scope.articleStep2.continualPublicYear;
	    }
		if(!isNullOrEmpty($scope.articleStep2.businessContact)){
	    	params.businessContact = $scope.articleStep2.businessContact;
	    }
		if(!isNullOrEmpty($scope.articleStep2.corporateResidence)){
	    	params.corporateResidence = $scope.articleStep2.corporateResidence;
	    }
		if(!isNullOrEmpty($scope.articleStep2.advantages)){
	    	params.advantages = $scope.articleStep2.advantages;
	    }
		if(!isNullOrEmpty($scope.articleStep2.advantagesImgs)){
	    	params.advantagesImgs = $scope.articleStep2.advantagesImgs;
	    }

		$.post(api_uri+"api/article/createStep2",params,
		  function(data){
		    if (data.returnCode == 0) {
//          	$scope.createArticle.id = d.result;
            	$rootScope.removeSessionObject("articleStep2");
                $location.path("/article/list");
            }else {
            	console.log(data);
            }
		  },
		"json");
	};



});

articleCtrl.controller('CreditCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {

	 if($routeParams.op == "create"){
	 	$scope.article = $rootScope.getObject("create_article");
	 }else if($routeParams.op == "update"){
	 	$scope.article = $rootScope.getSessionObject("update_article");
	 }else{
	 	alert("error op");
	 	$location.path("/article/list");
	 }


	 
	 $scope.obj_list = [{"name":"不限","check":false},
		 {"name":"信用贷款","check":false},
		 {"name":"固定资产贷款","check":false},
		 {"name":"流动资产贷款","check":false},
		 {"name":"经营性物业贷款","check":false},
		 {"name":"房地产开发贷款","check":false}];	 
	 
	 $scope.check = function(name){
	 	for (var i = 0; i < $scope.obj_list.length; i++) {
		    // 计算表单的总价
		    var obj = $scope.obj_list[i];
		    if(obj.name == name){
		    	if(obj.check){
		    		obj.check = false;
		    	}else{
		    		obj.check = true;
		    	}
		    }else{
		    	obj.check = false;
		    }
		}
	 };
	 
	 $scope.check($scope.article.credit);
	 
	 $scope.sure = function(){ 	
	 	$scope.article.credit = "";	 	
	 	for (var i = 0; i < $scope.obj_list.length; i++) {
	 	   var obj = $scope.obj_list[i];
	 	   if(obj.check){
            	$scope.article.credit = obj.name;	 
	 	   }
	 	}
	 	if($routeParams.op == "create"){
	 	    $rootScope.putObject("create_article",$scope.article);
	 	    $location.path("/article/create/step1");
		}else if($routeParams.op == "update"){
		 	$rootScope.putSessionObject("update_article",$scope.article);
	 	    $location.path("/article/update/step1/"+$scope.article.id);
		}

	 }
});

articleCtrl.controller('ClassificationCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 if($routeParams.op == "create"){
	 	$scope.article = $rootScope.getObject("create_article");
	 }else if($routeParams.op == "update"){
	 	$scope.article = $rootScope.getSessionObject("update_article");
	 }else{
	 	alert("error op");
	 	$location.path("/article/list");
	 }
	 
	 $scope.obj_list = [{"name":"大农业","check":false},
	 {"name":"房地产","check":false},
	 {"name":"商业贸易","check":false},
	 {"name":"仓储物流","check":false},
	 {"name":"工业制造","check":false},
	 {"name":"医疗","check":false},
	 {"name":"教育","check":false},
	 {"name":"建筑工程","check":false},
	 {"name":"电子商务","check":false},
		 {"name":"生活消费","check":false},
		 {"name":"汽车交通","check":false},
		 {"name":"汽车交通高新技术","check":false},
		 {"name":"互联网","check":false},
	 ];
	 
	 $scope.check = function(name){
	 	for (var i = 0; i < $scope.obj_list.length; i++) {
		    // 计算表单的总价
		    var obj = $scope.obj_list[i];
		    if(obj.name == name){
		    	if(obj.check){
		    		obj.check = false;
		    	}else{
		    		obj.check = true;
		    	}
		    }else{
		    	obj.check = false;
		    }
		}
	 };
	 
	 $scope.check($scope.article.classification);
	 
	 $scope.sure = function(){ 	
	 	$scope.article.classification = "";	 	
	 	for (var i = 0; i < $scope.obj_list.length; i++) {
	 	   var obj = $scope.obj_list[i];
	 	   if(obj.check){
            	$scope.article.classification = obj.name;	 
	 	   }
	 	}
	 	if($routeParams.op == "create"){
	 	    $rootScope.putObject("create_article",$scope.article);
	 	    $location.path("/article/create/step1");
		}else if($routeParams.op == "update"){
		 	$rootScope.putSessionObject("update_article",$scope.article);
	 	    $location.path("/article/update/step1/"+$scope.article.id);
		}
	 }
});

articleCtrl.controller('BusinessTypeCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 if($routeParams.op == "create"){
	 	$scope.article = $rootScope.getObject("create_article");
	 }else if($routeParams.op == "update"){
	 	$scope.article = $rootScope.getSessionObject("update_article");
	 }else{
	 	alert("error op");
	 	$location.path("/article/list");
	 }

	 $scope.obj_list = [
		 {"name":"个人独资企业","check":false},
		 {"name":"合伙企业","check":false},
		 {"name":"有限责任公司","check":false},
		 {"name":"股份制有限公司","check":false}
	 ];

	 $scope.check = function(name){
	 	for (var i = 0; i < $scope.obj_list.length; i++) {
		    // 计算表单的总价
		    var obj = $scope.obj_list[i];
		    if(obj.name == name){
		    	if(obj.check){
		    		obj.check = false;
		    	}else{
		    		obj.check = true;
		    	}
		    }else{
		    	obj.check = false;
		    }
		}
	 };

	 $scope.check($scope.article.license.businessType);

	 $scope.sure = function(){
	 	$scope.article.license.businessType = "";
	 	for (var i = 0; i < $scope.obj_list.length; i++) {
	 	   var obj = $scope.obj_list[i];
	 	   if(obj.check){
            	$scope.article.license.businessType = obj.name;
	 	   }
	 	}
	 	if($routeParams.op == "create"){
	 	    $rootScope.putObject("create_article",$scope.article);
	 	    $location.path("/article/create/license/create");
		}else if($routeParams.op == "update"){
		 	$rootScope.putSessionObject("update_article",$scope.article);
	 	    $location.path("/article/create/license/update");
		}
	 }
});

articleCtrl.controller('ArticleUpdateStep1Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {


    params = {
		"userId": $rootScope.login_user.userId,
		"token": $rootScope.login_user.token
    }

    $scope.init = function(){
    	if(!$routeParams.id||isNullOrEmpty($routeParams.id)){
    		$location.path("/article/list");
    	}

    	$scope.article = $rootScope.getSessionObject("update_article");
    	if(!$scope.article){
    		params.id = $routeParams.id
	    	$.post(api_uri+"api/article/updateStep1",params,
			  function(data){
			    if (data.returnCode == 0) {
			    	$scope.article = {};
			    	$scope.article.id = $routeParams.id;
	                $scope.article.loanValue =  data.result.loanValue;
	                $scope.article.loanLife =  data.result.loanLife;
	                $scope.article.rateCap =  data.result.rateCap;
	                $scope.article.rateFloor =  data.result.rateFloor;
	                $scope.article.classification =  data.result.classification;
	                $scope.article.license = {};
	                $scope.article.license.businessName = data.result.businessName;
	                $scope.article.license.regTime = data.result.regTime;
	                $scope.article.license.businessType = data.result.businessType;
	                $scope.article.license.regFunds = data.result.regFunds;
	                $scope.article.license.licenseImgs = data.result.licenseImgs;
	                $scope.article.license.corporateRepresentative = data.result.corporateRepresentative;
	            }else {
	            	console.log(data);
	            }
			  },
			"json");
    	}else{
    		$rootScope.removeSessionObject("update_article");
    	}

    	$('#rate').daterate();//利率选择
    	$('#term').dateterm();//期限选择
    };

    $scope.setStyle_div = function(args){
	 	if(args){
	 		return "setafter";
	 	}else{
	 		return "reqname";
	 	}
	 }

     $scope.setStyle_div2 = function(arg1,arg2){
	 	if(arg1&&arg2){
	 		return "setafter";
	 	}else{
	 		return "reqname";
	 	}
	 }

    $scope.init();

    $scope.choose_classification = function(){
    	$rootScope.putSessionObject("update_article",$scope.article);
    	$location.path("/article/classification/update");
    };

    $scope.create_license = function(){
    	$rootScope.putSessionObject("update_article",$scope.article);
    	$location.path("/article/create/license/update");
    };

    $scope.next_step = function(){
    	if(!isNullOrEmpty($scope.article.loanvalue)){
    		params.loanvalue = $scope.article.loanvalue;
    	}
    	if(!isNullOrEmpty($scope.article.loanlife)){
    		params.loanlife = $scope.article.loanlife;
    	}
    	if(!isNullOrEmpty($scope.article.ratecap)){
    		params.ratecap = $scope.article.ratecap;
    	}
    	if(!isNullOrEmpty($scope.article.ratefloor)){
    		params.ratefloor = $scope.article.ratefloor;
    	}
    	if(!isNullOrEmpty($scope.article.classification)){
    		params.classification = $scope.article.classification;
    	}

        if(!isNullOrEmpty($scope.article.license.businessName)){
    		params.businessName = $scope.article.license.businessName;
    	}else{
    		alert("请完善公司名称");
    		$scope.create_license();
    	}
        if(!isNullOrEmpty($scope.article.license.regTime)){
    		params.regTime = $scope.article.license.regTime;
    	}
        if(!isNullOrEmpty($scope.article.license.businessType)){
    		params.businessType = $scope.article.license.businessType;
    	}
        if(!isNullOrEmpty($scope.article.license.regFunds)){
    		params.regFunds = $scope.article.license.regFunds;
    	}
        if(!isNullOrEmpty($scope.article.license.licenseImgs)){
    		params.licenseImgs = $scope.article.license.licenseImgs;
    	}
    	if(!isNullOrEmpty($scope.article.license.corporateRepresentative)){
    		params.corporateRepresentative = $scope.article.license.corporateRepresentative;
    	}

    	$.post(api_uri+"api/article/createStep1",params,
		  function(data){
		    if (data.returnCode == 0) {
                $location.path("/article/create/step2/"+$scope.article.id);
            }else {
            	console.log(data);
            }
		  },
		"json");
    };

});



articleCtrl.controller('ArticleUpdateStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {


    params = {
		"userId": $rootScope.login_user.userId,
		"token": $rootScope.login_user.token
    }

    $scope.init = function(){
    	if(!$routeParams.id||isNullOrEmpty($routeParams.id)){
    		$location.path("/article/list");
    	}

    	$scope.article = $rootScope.getSessionObject("update_article");
    	if(!$scope.article){
    		params.id = $routeParams.id
	    	$.post(api_uri+"api/article/updateStep2",params,
			  function(data){
			    if (data.returnCode == 0) {
			    	$scope.article = {};
			    	$scope.article.id = $routeParams.id;
	                $scope.article.pledgeType =  data.result.pledgeType;
	                $scope.article.pledge =  data.result.pledge;
	                $scope.article.pledgeImgs =  data.result.pledgeImgs;
	                $scope.article.financialInfo =  data.result.financialInfo;
	                $scope.article.financialImgs =  data.result.financialImgs;
	                $scope.article.credit =  data.result.credit;
	                $scope.article.continualOperateYear =  data.result.continualOperateYear;
	                $scope.article.continualPublicYear =  data.result.continualPublicYear;
	                $scope.article.businessContact =  data.result.businessContact;
	                $scope.article.corporateResidence =  data.result.corporateResidence;
	                $scope.article.advantagesImgs =  data.result.advantagesImgs;
	                $scope.article.advantages =  data.result.advantages;
	            }else {
	            	console.log(data);
	            }
			  },
			"json");
    	}else{
    		$rootScope.removeSessionObject("update_article");
    	}
    };

    $scope.init();



});


articleCtrl.controller('DetailsCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('PutquestionsCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Bidalert1Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Bidalert2Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('VipusercenterCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('InvestmentproblemCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('VipmymessageCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('WalletCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('WindcontrolCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('GuaranteeCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('shezhiCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('SpeedprogressCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Administrationstep1Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Administrationstep2Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Administrationstep3Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Administrationstep4Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Administrationstep5Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Administrationstep6Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Speeddetailsstep1Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Speeddetailsstep2Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Speeddetailsstep3Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Speeddetailsstep4Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('Speeddetailsstep5Ctrl',function($http, $scope, $rootScope, $location,$routeParams){

});
articleCtrl.controller('TelephoneCtrl',function($http, $scope, $rootScope, $location,$routeParams){

});








