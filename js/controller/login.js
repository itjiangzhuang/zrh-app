/**
 * Created by jiangzhuang on 5/5/16.
 */

var loginCtrl = angular.module('loginCtrl', []);

loginCtrl.controller('LoginCtrl', function ($http, $scope, $rootScope, $location,$timeout) {
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
    $scope.changeErrorMsg = function(msg){
		$scope.error_msg = msg;
		$timeout(function() {  
	              $scope.changeErrorMsg(""); 
	        }, 5000);
	}
    $scope.login = function () {
        var m_params = $scope.loginUser;
        if (!check_params(m_params)) return;
        $http({
            url: api_uri+"api/auth/web",
            method: "POST",
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
            	$scope.changeErrorMsg("登录失败:"+d.result);
                console.log(d);
            }

        }).error(function (d) {
        	$scope.changeErrorMsg("网络故障请稍后再试......");
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