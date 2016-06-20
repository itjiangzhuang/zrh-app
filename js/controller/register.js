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
	
	$("#mobile").focus();
	
	$scope.changeErrorMsg = function(msg){
		$scope.error_msg = msg;
		$timeout(function() {  
	              $scope.changeErrorMsg(""); 
	        }, 5000);
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
		if(isNullOrEmpty($scope.registerUser.mobile)){
			$scope.changeErrorMsg("手机号码不能为空");
			$("#mobile").focus();
		}else{
			$http({
	            url: api_uri+"reg/validateMobile",
	            method: "GET",
	            params: {"mobile":$scope.registerUser.mobile}
	        }).success(function (d) {
	            if (d.returnCode == 0) {
	                $scope.enableMobile = true;
	                $scope.times();
					$http({
			            url: api_uri+"reg/sendSms",
			            method: "GET",
			            params: {
			            	"mobile":$scope.registerUser.mobile,
			            	"token":$rootScope.encryptByDES($scope.registerUser.mobile),
			            	"timestamp":moment().format('X')
			            }
			        }).success(function (d) {
			            if (d.returnCode == 0) {
			                $scope.changeErrorMsg("短信验证码已经发送到你的手机");
			            }
			            else {
			                 $scope.changeErrorMsg(d.returnCode);
			            }

			        }).error(function (d) {
			            console.log("login error");
			        })
	            }
	            else {
	            	$scope.enableMobile =false;
	            	$scope.changeErrorMsg("手机号错误");
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
	};


	$scope.validateCode = function(){
		if($scope.isVerify){
			$http({
	            url: api_uri+"reg/validateSms",
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
	};

});

registerCtrl.controller('RegStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams,$timeout) {

	$scope.registerUser = {
		"mobile":$routeParams.mobile,
		"password":"",
		"validatePwd":"",
		"token":$routeParams.token
	};

	$scope.changeErrorMsg = function(msg){
		$scope.error_msg = msg;
		$timeout(function() {
	              $scope.changeErrorMsg("");
	        }, 5000);
	};
	$scope.ngBlur = function(){
		console.log("ng-blur")
		var reg_str = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
		if(reg_str.test($scope.registerUser.password)){
		}else{
			$scope.error_msg = "密码必须是6-12位字母+数字"
		}
	}
	$scope.textChange =function(e){
		//console.log("bianhuale")
		var reg_str = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
		if(reg_str.test($scope.registerUser.password)){
			$scope.success_msg = "密码格式正确";
			$scope.error_msg = ""
		}else{
			$scope.success_msg = "";
			$scope.error_msg = "密码必须是6-12位字母+数字"
		}
	}
	$scope.textChange2 =function(e){
		//console.log("bianhuale")
		var reg_str = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
		if($scope.registerUser.password==$scope.registerUser.validatePwd &&reg_str.test($scope.registerUser.password)){
			$scope.success_msg = "点击注册按钮，注册用户";
			$scope.error_msg = ""
		}else{
			$scope.success_msg = "";
			$scope.error_msg = "两次输入的密码不一致"
		}
	}
	$scope.user_register = function(){
		var reg_str = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
		if($scope.registerUser.password==$scope.registerUser.validatePwd &&reg_str.test($scope.registerUser.password)){
			$http({
	            url: api_uri+"reg/regist",
	            method: "POST",
	            params: $scope.registerUser
	        }).success(function (d) {
	            if (d.returnCode == 0) {
	            	alert("注册成功");
	            	$rootScope.putObject("login_mobile",$scope.registerUser.mobile);
	                $http({
			            url: api_uri+"auth/web",
			            method: "POST",
			            params: {
			            	"mobile":$scope.registerUser.mobile,
			            	"password":$scope.registerUser.password
			            }
			        }).success(function (d) {
			            if (d.returnCode == 0) {
							$rootScope.login_user = {
			            		"userId":d.result.split("_")[0],
			            		"token":d.result.split("_")[1]
			            	}
							$rootScope.putObject("login_user", $rootScope.login_user);
			            	$location.path("/article/list");
			            }
			            else {
			            	$scope.changeErrorMsg(d.result);
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
		}else{
			if($scope.registerUser.password!=$scope.registerUser.validatePwd){
				$scope.changeErrorMsg("两次密码输入的不一致");
			}else if(!reg_str.test($scope.registerUser.password)){
				$scope.changeErrorMsg("密码强度不够,必须包含数字和字母");
			}
		}
	};

});

registerCtrl.controller('ResetStep1Ctrl', function ($http, $scope, $rootScope, $location,$timeout) {
	$scope.resetUser = {
		"mobile":"",
		"code":""
	};
	$scope.isVerify = false;//是否允许下一步

	$scope.enableMobile = false;//手机号码是否可用

	$scope.error_msg = "";

	$scope.changeErrorMsg = function(msg){
		$scope.error_msg = msg;
		$timeout(function() {
	              $scope.changeErrorMsg("");
	        }, 5000);
	};

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
	};

	$scope.send_code = function(){
		if(isNullOrEmpty($scope.resetUser.mobile)){
			$scope.changeErrorMsg("手机号码不能为空");
			$("#mobile").focus();
		}else{
			$http({
	            url: api_uri+"reg/validateMobile",
	            method: "GET",
	            params: {"mobile":$scope.resetUser.mobile}
	        }).success(function (d) {
	            if (d.returnCode == 1001) {
	            	$scope.enableMobile = true;
	                $scope.times();
					$http({
			            url: api_uri+"reg/sendSms2",
			            method: "GET",
			            params: {
			            	"mobile":$scope.resetUser.mobile,
			            	"token":$rootScope.encryptByDES($scope.resetUser.mobile),
			            	"timestamp":moment().format('X')
			            }
			        }).success(function (d) {
			            if (d.returnCode == 0) {
			            	$("#code").focus();
		                    $scope.changeErrorMsg("短信验证码已经发送到你的手机");
			            }
			            else {
			                $scope.changeErrorMsg(d.result);
			            }

			        }).error(function (d) {
			            console.log("login error");
			        })
	            }
	            else {
	            	$scope.enableMobile =false;
	            	$scope.changeErrorMsg("手机号错误");
	            }

	        }).error(function (d) {
	            console.log("login error");
	        })
		}
	};

	$scope.changeCode = function(){
		if($scope.enableMobile && !isNullOrEmpty($scope.resetUser.code)){
			$scope.isVerify= true;
		}else{
			$scope.isVerify= false;
		}
	};


	$scope.validateCode = function(){
		if($scope.isVerify){
			$http({
	            url: api_uri+"reg/validateSms",
	            method: "POST",
	            params: $scope.resetUser
	        }).success(function (d) {
	            if (d.returnCode == 0) {
	                $location.path("/register/reset2/"+$scope.resetUser.mobile+"/"+d.result);
	            }
	            else {
	            	$scope.changeErrorMsg(d.result);
	            }
	        }).error(function (d) {
	            console.log("login error");
	        })
		}
	};

});

registerCtrl.controller('ResetStep2Ctrl', function ($http, $scope, $rootScope, $location,$routeParams) {

	$scope.resetUser = {
		"mobile":$routeParams.mobile,
		"password":"",
		"validatePwd":"",
		"token":$routeParams.token
	};
	$scope.textChange =function(e){
		//console.log("bianhuale")
		var reg_str = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
		if(reg_str.test($scope.resetUser.password)){
			$scope.success_msg = "密码格式正确";
			$scope.error_msg = ""
		}else{
			$scope.success_msg = "";
			$scope.error_msg = "密码必须是6-12位字母+数字"
		}
	}
	$scope.textChange2 =function(e){
		//console.log("bianhuale")
		var reg_str = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
		if($scope.resetUser.password==$scope.resetUser.validatePwd &&reg_str.test($scope.resetUser.password)){
			$scope.success_msg = "点击重置按钮，重置密码";
			$scope.error_msg = ""
		}else{
			$scope.success_msg = "";
			$scope.error_msg = "两次输入的密码不一致"
		}
	}
	$scope.user_reset = function(){
		$http({
            url: api_uri+"reg/reset",
            method: "POST",
            params: $scope.resetUser
        }).success(function (d) {
            if (d.returnCode == 0) {
            	alert("重置密码成功");
            	$rootScope.putObject("login_mobile",$scope.resetUser.mobile);
                $http({
		            url: api_uri+"auth/web",
		            method: "POST",
		            params: {
		            	"mobile":$scope.resetUser.mobile,
		            	"password":$scope.resetUser.password
		            }
		        }).success(function (d) {
		            if (d.returnCode == 0) {
						$rootScope.login_user = {
		            		"userId":d.result.split("_")[0],
		            		"token":d.result.split("_")[1]
		            	}
						$rootScope.putObject("login_user", $rootScope.login_user);
		            	//$location.path("/article/list");
						$location.path("/user/setting");
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
	};
	
});

