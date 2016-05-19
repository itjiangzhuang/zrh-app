/**
 * Created by jz on 2016/5/19.
 */

var userCtrl = angular.module('userCtrl', []);

userCtrl.controller('MyQuestionsCtrl', function ($http, $scope, $rootScope, $location) {

    $scope.init = function () {
        $http({
            url: api_uri + "api/articleComments/lastList",
            method: "GET",
            params: {
                "userId": $rootScope.login_user.userId,
                "token": $rootScope.login_user.token        
            }
        }).success(function (d) {
        	console.log(d);
            if (d.returnCode == 0) {
                $scope.obj_list = d.result;
                for(var i=0;i<$scope.obj_list.length;i++){
                	$scope.obj_list[i].time = moment.unix($scope.obj_list[i].lastUpdateTime/1000).format('YYYY.MM.DD');
                }
            }else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });
    };
    
    $scope.show = function(articleId,toUser){
    	$location.path("/article/questions/" + articleId+ "/" + toUser);
    };

    $scope.init();

});


