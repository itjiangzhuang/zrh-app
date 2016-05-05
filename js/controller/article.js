/**
 * Created by jiangzhuang on 5/5/16.
 */

var articleCtrl = angular.module('articleCtrl', []);

articleCtrl
.controller('ArticleListCtrl', function ($http, $scope, $rootScope, $location) {
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
});