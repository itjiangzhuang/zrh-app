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
	 
     $('#time').date();
});

articleCtrl.controller('ArticleCreateStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
     
});

articleCtrl.controller('IndustryCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.credit_list = ["不限","信用贷款","固定资产贷款","流动资产贷款","经营性物业贷款","房地产开发贷款","哈啊哈","够够够","辣辣辣"];
	 
	 
	  window.onload=function(){
	        var chkboxline=document.getElementsByClassName('chkboxline');
	        for(var i=0;i<chkboxline.length;i++){
	            chkboxline[i].onclick=function(){
	                var check=this.querySelector('span');
	                var checked=this.querySelectorAll("span")[1];
	                checked.style.display='inline-block';
	                checked.style.backgroundSize='72%'
	                check.style.display='none';
	            }
	        }
	    }
	 
     $('#time').date();
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

    