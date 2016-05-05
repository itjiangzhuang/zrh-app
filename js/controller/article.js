/**
 * Created by jiangzhuang on 5/5/16.
 */

var articleCtrl = angular.module('articleCtrl', []);

articleCtrl
.controller('ArticleListCtrl', function ($http, $scope, $rootScope, $location) {
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
    
    $scope.show =  function(id){
    	if(!isNullOrEmpty(id)){
    		$location.path("/article/show/"+id);
    	}
    }
})

.controller('ArticleShowCtrl', function ($http, $scope, $rootScope, $location) {
	 $scope.loginUser = $rootScope.getObject("login_user");
	 
	 $scope.init = function () {
        $http({
            url: api_uri+"api/article/show/"+$rootScope.id,
            method: "GET"
        }).success(function (d) {
        	console.log(d);
            if (d.returnCode == 0) {
                $scope.article = d.result;
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