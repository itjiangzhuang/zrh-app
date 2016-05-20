/**
 * Created by jz on 2016/5/19.
 */

var userCtrl = angular.module('userCtrl', []);
/*个人中心*/
userCtrl.controller('UserCenterCtrl', function ($http, $scope, $rootScope, $location) {

    $scope.userQuestion = function () {//打开问题中心
        $location.path('/user/questions');
    };
    $scope.messageCenter = function () {//打开消息中心
        $location.path('/user/messages');
    };
    $scope.myWallet = function () {//打开我的钱包
        $location.path('/user/wallet');
    };
    $scope.windControl = function () {//打开？？
        $location.path('/user/wind_control');
    };
    $scope.setting = function () {
        $location.path('/user/setting');
    };
    $scope.investProjects = function () {
        $location.path('/invest_projects');
    };
    $scope.goto_create = function () {

        $location.path("/article/create/step1");
    }

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

    $scope.show = function(articleId,toUser) {
        $location.path("/article/questions/" + articleId + "/" + toUser);
        /*切换普通用户和vip*/
        $scope.names = 2;
        $scope.vipToCommon = function () {
            if ($scope.names == 1) {
                $('.vipHave').css('display', 'none');
                $('.vipNone').css('display', 'block');
            }
        }
    }
});

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



