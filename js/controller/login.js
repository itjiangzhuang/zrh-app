/**
 * Created by jiangzhuang on 5/5/16.
 */

var loginCtrl = angular.module('loginCtrl', []);

loginCtrl.controller('LoginCtrl', function ($http, $scope, $rootScope, $location,$timeout) {
    $scope.$root.title = "登陆";
	$scope.loginUser = {
        "mobile": "",
        "password": ""
    };

    $scope.error_code_msg = {
    	    1003:"该用户不存在",
    	    2001:"用户名密码错误",
    	    1002:"该用户异常",
    	    1:"服务器异常,请稍后再试"
    };

    var check_params = function (params) {
        if (params.mobile == "" || params.password == "") {
            return false;
        }
        return true;
    };
    $scope.changeErrorMsg = function(msg){
		$scope.error_msg = msg;
		$timeout(function() {  
            //$scope.changeErrorMsg("");
            $scope.error_msg = "";
	        }, 5000);
	};
    $scope.textChange =function(e){
            $scope.error_msg = ""
    }
    $scope.loginUser = {
        "mobile":"",
        "code":""
    };
    $scope.ngBlur = function(){
        if(isNullOrEmpty($scope.loginUser.mobile)){
            $scope.changeErrorMsg("手机号码不能为空");
            //$scope.error_msg = "手机号码不能为空"
            $("#mobile").focus();
        }else{
            $http({
                url: api_uri+"reg/validateMobile",
                method: "GET",
                params: {"mobile":$scope.loginUser.mobile}
            }).success(function (d) {
                if (d.returnCode == 1001) {
                    $scope.enableMobile = true;
                    $scope.success_msg = "手机号输入正确";
                }
                else {
                    $scope.enableMobile =false;
                    $scope.changeErrorMsg("手机号未注册");
                }

            }).error(function (d) {
                console.log("login error");
            })
        }
    };
    $scope.login = function () {
        var m_params = $scope.loginUser;
        if (!check_params(m_params)) return;
        $http({
            url: api_uri+"auth/web",
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
            	//$location.path("/article/list");
                $location.path("/user/setting");
            }else {

            	var msg = $scope.error_code_msg[d.returnCode];
            	if(!msg){
            		msg = "登录失败";
            	}
                $scope.error_msg = msg;
            	//$scope.changeErrorMsg(msg);
            }

        }).error(function (d) {
        	$scope.changeErrorMsg("网络故障请稍后再试......");
            $location.path("/login");
        })
    };
    
    $scope.register = function(){
    	$location.path("/register/step1");
    };
    
    $scope.reset = function(){
    	$location.path("/register/reset1");
    };
});