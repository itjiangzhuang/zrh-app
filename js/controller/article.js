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
	 	$scope.createArticle = {}
	 }
	  
	 $scope.getFormToken = function () {
        $http({
            url: api_uri+"api/article/formToken",
            method: "GET"
        }).success(function (d) {
        	console.log(d);
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
    
    if(isNullOrEmpty($scope.createArticle.id)){
    	$scope.getFormToken();
    };
    
    $scope.choose_classification = function(){
    	$rootScope.putObject("create_article",$scope.createArticle);
    	$location.path("/article/classification");
    };
    
    $scope.choose_loanLife = function(){
    	alert("选择融资期限");
    };
    
    $scope.choose_loanValue = function(){
    	alert("选择融资金额");
    };
    
    $scope.choose_rate = function(){
    	alert("选择融资利率");
    };
    
    $scope.create_license = function(){
    	$location.path("/article/create/license");
    };
    
    $scope.next_step = function(){
    	$location.path("/article/create/step2");
    };
    
});

articleCtrl.controller('ArticleCreateLicenseCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.article = $rootScope.getObject("create_article");
	 
	 $scope.uploadFile = "";
	 
	 if($scope.article){
	 	$scope.license = $scope.article.license;
	 }else{
	 	$scope.license = {}
	 }
	 
     $("#time").date();
     
     $scope.choose_type = function(){
     	alert("选择公司类型");
     };
     
     $scope.pic_select = function(){
     	alert("select");
     	$("#picpath").click();
     };
     
     $scope.upload = function() {    //$files: an array of files selected, each file has name, size, and type.
//	    for (var i = 0; i < $files.length; i++) {     
//	    	var file = $files[i];	    	
//	    }
            alert("upload");
//          $.ajaxFileUpload({
//              url: api_uri+"api/file/upload",
//              type: 'post',
//              secureuri: false, //一般设置为false
//              fileElementId: 'picpath', // 上传文件的id、name属性名
//              dataType: 'text', //返回值类型，一般设置为json、application/json
////              elementIds: elementIds, //传递参数到服务器
//              data:{
//              	"userId":$scope.loginUser.userId,
//              	"token":$scope.loginUser.token
//              },
//              success: function (data, status) {
//                  alert(data);
//              },
//              error: function (data, status, e) {
//                  alert(e);
//              }
//          });
	};
	
	$scope.sure = function(){
		console.log($scope.uploadFile);
		alert("sure");
	}
});

articleCtrl.controller('ArticleCreateStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
     
});

articleCtrl.controller('CreditCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 	 
	 $scope.article = $rootScope.getObject("create_article");
	 
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.credit_list = [{"name":"不限","check":false},
		 {"name":"信用贷款","check":false},
		 {"name":"固定资产贷款","check":false},
		 {"name":"流动资产贷款","check":false},
		 {"name":"经营性物业贷款","check":false},
		 {"name":"房地产开发贷款","check":false}];	 
	 
	 $scope.check = function(name){
	 	for (var i = 0; i < $scope.credit_list.length; i++) {
		    // 计算表单的总价
		    var credit = $scope.credit_list[i];
		    if(credit.name == name){
		    	if(credit.check){
		    		credit.check = false;
		    	}else{
		    		credit.check = true;
		    	}
		    }else{
		    	credit.check = false;
		    }
		}
	 };
	 
	 $scope.check($scope.article.credit);
	 
	 $scope.sure = function(){ 	
	 	$scope.article.credit = "";	 	
	 	for (var i = 0; i < $scope.credit_list.length; i++) {
	 	   var credit = $scope.credit_list[i];
	 	   if(credit.check){
            	$scope.article.credit = credit.name;	 
	 	   }
	 	}
	 	$rootScope.putObject("create_article",$scope.article);
	 	$location.path("/article/create/step1");
	 }
});

articleCtrl.controller('ClassificationCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.article = $rootScope.getObject("create_article");
	 
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.branch_list = [{"name":"大农业","check":false},
	 {"name":"房地产","check":false},
	 {"name":"商业贸易","check":false},
	 {"name":"仓储物流","check":false},
	 {"name":"工业制造","check":false},
	 {"name":"医疗","check":false},
	 {"name":"教育","check":false},
	 {"name":"建筑工程","check":false},
	 {"name":"电子商务","check":false}];	 
	 
	 $scope.check = function(name){
	 	for (var i = 0; i < $scope.branch_list.length; i++) {
		    // 计算表单的总价
		    var branch = $scope.branch_list[i];
		    if(branch.name == name){
		    	if(branch.check){
		    		branch.check = false;
		    	}else{
		    		branch.check = true;
		    	}
		    }else{
		    	branch.check = false;
		    }
		}
	 };
	 
	 $scope.check($scope.article.classification);
	 
	 $scope.sure = function(){ 	
	 	$scope.article.classification = "";	 	
	 	for (var i = 0; i < $scope.branch_list.length; i++) {
	 	   var branch = $scope.branch_list[i];
	 	   if(branch.check){
            	$scope.article.classification = branch.name;	 
	 	   }
	 	}
	 	$rootScope.putObject("create_article",$scope.article);
	 	$location.path("/article/create/step1");
	 }
});

    