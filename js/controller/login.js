/**
 * Created by jiangzhuang on 5/5/16.
 */

var loginCtrl = angular.module('loginCtrl', []);

loginCtrl.controller('LoginCtrl', function ($http, $scope, $rootScope, $location) {
	$scope.loginUser = {
        "mobile": "",
        "password": ""
    };
    var check_params = function (params) {
        if (params.mobile == "" || params.password == "") {
            console.log("username or password is empty")
            return false;
        }
        return true;
    };
    $scope.login = function () {
        var m_params = $scope.loginUser;
        if (!check_params(m_params)) return;
        $http({
            url: api_uri+"api/auth/web",
            method: "POST",
//          headers: {
//			      'Content-Type': 'application/x-www-form-urlencoded'
//			},
            params: m_params           
        }).success(function (d) {
            if (d.returnCode == 0) {
                console.log(d);
                $rootScope.login_user = {
            		"userId":d.result.split("_")[0],
            		"token":d.result.split("_")[1]
            	}
                $rootScope.putObject("login_user", $rootScope.login_user);
            	$location.path("/article/list");
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
            $location.path("/login");
        })
    };
    
    $scope.register = function(){
    	$location.path("/register/step1");
    }
    
    $scope.reset = function(){
    	$location.path("/register/reset1");
    }
});