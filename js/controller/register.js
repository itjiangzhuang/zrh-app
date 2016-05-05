/**
 * Created by jiangzhuang on 5/5/16.
 */

var registerCtrl = angular.module('registerCtrl', []);

registerCtrl.controller('RegStep1Ctrl', function ($http, $scope, $rootScope, $location,$timeout) {
	$scope.registerUser = {
		"mobile":"",
		"code":""
	}	
	$scope.isVerify = false;//是否允许下一步
	
	$scope.enableMobile = false;//手机号码是否可用
	
	$scope.error_msg = "";
	
	$scope.changeErrorMsg = function(msg){
		$scope.error_msg = msg;
		$timeout(function() {  
	              $scope.changeErrorMsg(""); 
	        }, 5000);
	}
	
	$scope.validate_mobile = function(){
		if(isNullOrEmpty($scope.registerUser.mobile)){
			$scope.changeErrorMsg("手机号码不能为空");
			$("#mobile").focus();
		}else{
			$http({
	            url: api_uri+"api/reg/validateMobile",
	            method: "GET",
	            params: {"mobile":$scope.registerUser.mobile}           
	        }).success(function (d) {
	            if (d.returnCode == 0) {
	                $scope.enableMobile = true;
	            }
	            else {
	            	$scope.enableMobile =false;
	            	$scope.changeErrorMsg(d.result);
	                console.log(d);
	            }
	
	        }).error(function (d) {
	            console.log("login error");
	        })
		}  
	}

	//发送短信 倒计时
	$scope.sms_second = 60;
	$scope.send_sms = true;	
	$scope.times = function(){		
		if($scope.sms_second > 0){
			$scope.send_sms = false;
		    $scope.sms_second--;
			$timeout(function() {  
	              $scope.times(); 
	        }, 1000);
		}else if ( $scope.sms_second <= 0 ){
			 $scope.send_sms = true;
			 $scope.sms_second = 60;
		}
	}

	$scope.send_code = function(){
		if($scope.enableMobile){			
			$scope.times();			
			$http({
	            url: api_uri+"api/reg/sendSms",
	            method: "GET",
	            params: {"mobile":$scope.registerUser.mobile}           
	        }).success(function (d) {
	            if (d.returnCode == 0) {
	            	$("#code").focus();
                    alert("短信验证码已经发送到你的手机");
	            }
	            else {
	                console.log(d);
	            }
	
	        }).error(function (d) {
	            console.log("login error");
	        })
		}		
	}
	
	$scope.changeCode = function(){
		if($scope.enableMobile && !isNullOrEmpty($scope.registerUser.code)){
			$scope.isVerify= true;
		}else{
			$scope.isVerify= false;
		}	   
	}
	
	
	$scope.validateCode = function(){
		if($scope.isVerify){
			$http({
	            url: api_uri+"api/reg/validateSms",
	            method: "POST",
	            params: $scope.registerUser
	        }).success(function (d) {
	            if (d.returnCode == 0) {
	                $location.path("/register/step2/"+$scope.registerUser.mobile+"/"+d.result);
	            }
	            else {
	            	$scope.changeErrorMsg(d.result);
	            }
	        }).error(function (d) {
	            console.log("login error");
	        })	
		}		
	}
	
});

registerCtrl.controller('RegStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {

	$scope.registerUser = {
		"mobile":$routeParams.mobile,
		"password":"",
		"validatePwd":"",
		"token":$routeParams.token
	}
	
	$scope.user_register = function(){
		$http({
            url: api_uri+"api/reg/regist",
            method: "POST",
            params: $scope.registerUser
        }).success(function (d) {
            if (d.returnCode == 0) {
            	alert("注册成功");
            	$rootScope.putObject("login_mobile",$scope.registerUser.mobile);
                $http({
		            url: api_uri+"api/auth/web",
		            method: "POST",
		            params: {
		            	"mobile":$scope.registerUser.mobile,
		            	"password":$scope.registerUser.password
		            }
		        }).success(function (d) {
		            if (d.returnCode == 0) {
		            	loginUser = {
		            		"userId":d.result.split("_")[0],
		            		"token":d.result.split("_")[1]
		            	}
		            	$rootScope.putObject("login_user",loginUser);
		            	$location.path("/article/list");
		            }
		            else {
		                console.log(d);
		            }
		        }).error(function (d) {
		            console.log("login error");
		        })	 
            }
            else {
                console.log(d);
            }
        }).error(function (d) {
            console.log("login error");
        })	
	}
	
});

