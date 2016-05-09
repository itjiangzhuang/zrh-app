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
	 
	 $scope.createArticle={
	 	"loanValue":9000,
	 	"loanLife":24,
	 	"classification":"测试"
	 };
	  
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
    }
    
    
});

articleCtrl.controller('ArticleCreateStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
     $('#time').date();
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

articleCtrl.controller('BranchCtrl', function ($http, $scope, $rootScope, $location,$routeParams) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.branch_list = ["大农业","房地产","商业贸易","仓储物流","工业制造","医疗","教育","建筑工程","电子商务"];
	 
	 
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

    