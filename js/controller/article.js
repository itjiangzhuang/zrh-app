/**
 * Created by jiangzhuang on 5/5/16.
 */

var articleCtrl = angular.module('articleCtrl', []);

articleCtrl.controller('ArticleListCtrl', function ($http, $scope, $rootScope, $location) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
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
    }
})

articleCtrl.controller('ArticleShowCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
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
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
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
            	"userId":$scope.loginUser.userId,
            	"token":$scope.loginUser.token
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
    	$location.path("/article/classification");
    };
    
    
    $scope.create_license = function(){
    	$location.path("/article/create/license");
    };
 
    
    params = {
    	"id":$scope.createArticle.id,
    	"userId":$scope.loginUser.userId,
    	"token":$scope.loginUser.token,
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
            $location.path("/article/create/license");
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
    	
    	$http({
	            url: api_uri+"api/article/createStep1",
	            method: "POST",
	            params: params           
        }).success(function (d) {
            if (d.returnCode == 0) {
//          	$scope.createArticle.id = d.result;
            	$rootScope.removeObject("create_article");
            	$scope.articleStep2 = {
            		"id":d.result
            	}           	
            	$rootScope.putSessionObject("articleStep2",$scope.articleStep2);
                $location.path("/article/create/step2");
            }else {
            	console.log(d);
            }

        }).error(function (d) {
            console.log(d);
        })
    	
    	
    };
    
});

articleCtrl.controller('ArticleCreateLicenseCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	$scope.loginUser = $rootScope.getObject("login_user");
	 
	$scope.article = $rootScope.getObject("create_article");
	 

	$scope.license = $scope.article.license;
 	if($scope.license){
 		$scope.license = {}
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
     	alert("选择公司类型");
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
                	"userId":$scope.loginUser.userId,
                	"token":$scope.loginUser.token
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
        $rootScope.putObject("create_article",$scope.article);
        $location.path("/article/create/step1");
	}
});

articleCtrl.controller('ArticleCreateStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.articleStep2 = $rootScope.getSessionObject("articleStep2");
     
     $scope.pledgeTypeList = [
       {"name":"房产","check":false},
       {"name":"地产","check":false},
       {"name":"股票","check":false},
       {"name":"车辆","check":false},
       {"name":"其他","check":false}
     ]
});

articleCtrl.controller('CreditCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 	 
	 $scope.article = $rootScope.getObject("create_article");
	 
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
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
	 	$rootScope.putObject("create_article",$scope.article);
	 	$location.path("/article/create/step1");
	 }
});

articleCtrl.controller('ClassificationCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.article = $rootScope.getObject("create_article");
	 
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.obj_list = [{"name":"大农业","check":false},
	 {"name":"房地产","check":false},
	 {"name":"商业贸易","check":false},
	 {"name":"仓储物流","check":false},
	 {"name":"工业制造","check":false},
	 {"name":"医疗","check":false},
	 {"name":"教育","check":false},
	 {"name":"建筑工程","check":false},
	 {"name":"电子商务","check":false}];	 
	 
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
	 	$rootScope.putObject("create_article",$scope.article);
	 	$location.path("/article/create/step1");
	 }
});

    