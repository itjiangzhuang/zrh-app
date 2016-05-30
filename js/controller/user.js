/**
 * Created by jz on 2016/5/19.
 */

var userCtrl = angular.module('userCtrl', []);
/*个人中心*/
userCtrl.controller('UserCenterCtrl', function ($http, $scope, $rootScope, $location) {

    $scope.init = function () {
        //获取个人信息 以及各种列表数量
         $http({
            url: api_uri + "api/user/center",
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.nickname = d.result.nickname;
                $scope.isVip = d.result.isVip;
                $scope.batting = d.result.batting;
                $scope.ms = d.result.ms;
                $scope.cs = d.result.cs;
                $scope.headImg = d.result.headImg;
            }else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });

    };

    $scope.next_op = function (op) {
        var obj = {
            "questions": "/user/questions",//打开问题中心
            "messages": "/user/messages",//打开消息中心
            "projectManage": "/article/projectManage",//打开发布项目管理
            "projectInvest": "/article/projectInvest",//打开投资项目管理
            "applyInvest":"/user/applyInvest",//打开申请投资资质
            //"windControl":"/user/wind_control",//打开风控
            "myWallet":"/user/wallet",//打开我的钱包
            "setting":"/user/setting",//打开设置
            "goto_create":"/article/create/step1", //创建项目
            "goto_list":"/article/list" //找项目
        };
        $location.path(obj[op]);
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
    };

    $scope.init();
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

userCtrl.controller('ProjectManageCtrl', //项目管理
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
        $scope.init = function () {
        	$scope.border = true;
        	if(!$scope.type){
        		$scope.type = "1";
        	}

	        $http({
	            url: api_uri + "api/article/myList",
	            method: "GET",
	            params: {
	                "userId": $rootScope.login_user.userId,
	                "token": $rootScope.login_user.token,
	                "type": $scope.type
	            }
	        }).success(function (d) {
	            console.log(d);
	            if (d.returnCode == 0) {
	                $scope.obj_list = d.result;
	                angular.forEach($scope.obj_list, function(data){
                        if($scope.type == 0){
                        	data.jindu == "0%";
                        	data.jindushow = "未发布";
                        }else if($scope.type == 1){
                        	if(data.jd = 0){
                        		data.jindu == "10%";
                        	    data.jindushow = "已经发布";
                        	}else if(data.jd = 1){
                        		data.jindu == "30%";
                        	    data.jindushow = "等待联系";
                        	}else if(data.jd = 2){
                        		data.jindu == "50%";
                        	    data.jindushow = "跟进中";
                        	}else if(data.jd = 3){
                        		data.jindu == "100%";
                        	    data.jindushow = "签约成功";
                        	}else if(data.jd = -2){
                        		data.jindu == "0%";
                        	    data.jindushow = "签约失败";
                        	}
                        }                        
                    });
	            }else {
	                console.log(d);
	            }
	        }).error(function (d) {
	            console.log(d);
	        });
        };
        $scope.init();


        $scope.article_show =  function(id){
            if (!isNullOrEmpty(id)) {
               $location.path("/article/show/" + id);
            }
        };
        $scope.unRelease = function () {
              $scope.type = "0";
              $scope.init();
              $scope.border = false;
              $scope.noBorder = true;
        };
        $scope.release = function () {
              $scope.type = "1";
              $scope.init();
              $scope.border = true;
            $scope.noBorder = false;
        };
        $scope.release();
}]);
userCtrl.controller('ProjectInvestCtrl', //项目投资
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
        $scope.init = function () {

	        $http({
	            url: api_uri + "api/article/investList",
	            method: "GET",
	            params: $rootScope.login_user
	        }).success(function (d) {
	            console.log(d);
	            if (d.returnCode == 0) {
	                $scope.obj_list = d.result;
	                angular.forEach($scope.obj_list, function(data){
                            if(data.jd = 0){
                        		data.jindu == "10%";
                        	    data.jindushow = "竞标中";
                        	}else if(data.jd = 1){
                        		data.jindu == "30%";
                        	    data.jindushow = "约见信息";
                        	}else if(data.jd = 2){
                        		data.jindu == "50%";
                        	    data.jindushow = "跟进中";
                        	}else if(data.jd = 3){
                        		data.jindu == "100%";
                        	    data.jindushow = "签约成功";
                        	}else if(data.jd = -1){
                        		data.jindu == "0%";
                        	    data.jindushow = "竞标失败";
                        	}else if(data.jd = -2){
                        		data.jindu == "0%";
                        	    data.jindushow = "签约失败";
                        	}
                    });
	            }else {
	                console.log(d);
	            }
	        }).error(function (d) {
	            console.log(d);
	        });
        };
        $scope.init();


        $scope.article_show =  function(id){
            if (!isNullOrEmpty(id)) {
               $location.path("/article/show/" + id);
            }
        };
}]);

userCtrl.controller("ApplyInvestCtrl",function ($http, $scope, $rootScope, $location) {

	$scope.init = function(){
		 $http({
            url: api_uri + "api/user/showIq",
            method: "GET",
            params: {
                "userId": $rootScope.login_user.userId,
                "token": $rootScope.login_user.token
            }
        }).success(function (d) {
        	console.log(d);
            if (d.returnCode == 0) {
                $scope.userApplyInvest = d.result;
                if(!$scope.userApplyInvest){
                	$scope.userApplyInvest = {};
                }
            }else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });

        $http({
            url: api_uri + "api/qiniu/getUpToken",
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.qiniu_token = d.result.uptoken;
                var uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                    //	        uptoken_url: api_uri+"api/qiniu/getUpToken",
                    uptoken: $scope.qiniu_token,
                    //	        get_new_uptoken: true,
                    //save_key: true,
                    domain: $rootScope.qiniu_bucket_domain, //bucket 域名，下载资源时用到，**必需**
                    container: 'upload_container',           //上传区域DOM ID，默认是browser_button的父元素，
                    max_file_size: '10mb',           //最大文件体积限制
                    flash_swf_url: '../../framework/plupload/Moxie.swf',  //引入flash,相对路径
                    max_retries: 3,                   //上传失败最大重试次数
                    dragdrop: false,                   //开启可拖曳上传
                    drop_element: '',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                //分块上传时，每片的体积
                    auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FilesAdded': function (up, files) {
                            //                    plupload.each(files, function(file) {
                            //                        // 文件添加进队列后,处理相关的事情
                            //                    });
                        },
                        'BeforeUpload': function (up, file) {
//                          $rootScope.uploading = true;
//                          $scope.upload_percent = file.percent;
//                          $rootScope.$apply();
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情
//                          $scope.upload_percent = file.percent;
//                          $scope.$apply();
                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
//                          $scope.userApplyInvest.cardImg = file.name;
                            $scope.userApplyInvest.cardImg = file_url;
                            $scope.$apply();
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            $rootScope.alert("身份证上传失败！");
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后,处理相关的事情
                        },
                        'Key': function (up, file) {
                            var time = new Date().getTime();
                            var k = 'user/card/' + $rootScope.login_user.userId + '/' + time;
                            return k;
                        }
                    }
                });
            } else {
                console.log(d);
            }

        }).error(function (d) {
            console.log(d);
        });
	};

	$scope.init();

    $scope.apply = function(){

    	$scope.isApply = true;

    	var params = {
    		"userId": $rootScope.login_user.userId,
            "token": $rootScope.login_user.token
    	};
    	if (!isNullOrEmpty($scope.userApplyInvest.name)) {
            params.name = $scope.userApplyInvest.name;
        }
    	if (!isNullOrEmpty($scope.userApplyInvest.orgName)) {
            params.orgName = $scope.userApplyInvest.orgName;
        }
    	if (!isNullOrEmpty($scope.userApplyInvest.position)) {
            params.position = $scope.userApplyInvest.position;
        }
    	if (!isNullOrEmpty($scope.userApplyInvest.cardImg)) {
            params.cardImg = $scope.userApplyInvest.cardImg;
        }

        $.post(api_uri + "api/user/applyIq", params,
            function (data) {
                if (data.returnCode == 0) {
                    alert("提交成功,请等待审核...");
                    $scope.next = true;
                    $location.path("/user/center");
                } else {
                    console.log(data);
                }
                $scope.isApply = false;
                console.log(" isApply :" +  $scope.isApply);
                $scope.$apply();
            },
            "json");
    };

});

userCtrl.controller('SettingCtrl', //用户设置
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
        $scope.init = function () {
            //获取用户信息
            $http({
		        url: api_uri + "api/user/setting",
		        method: "GET",
		        params: $rootScope.login_user
		    }).success(function (d) {
		    	console.log(d);
		        if (d.returnCode == 0) {
		            $scope.user = d.result;		          
		        }else {
		            console.log(d);
		        }
		    }).error(function (d) {
		        console.log(d);
		    });        	
        	
			$http({
		        url: api_uri + "api/qiniu/getUpToken",
		        method: "GET",
		        params: $rootScope.login_user
		    }).success(function (d) {
		        console.log(d);
		        if (d.returnCode == 0) {
		            $scope.qiniu_token = d.result.uptoken;
		            var uploader = Qiniu.uploader({
		                runtimes: 'html5,flash,html4',    //上传模式,依次退化
		                browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
		                //	        uptoken_url: api_uri+"api/qiniu/getUpToken",
		                uptoken: $scope.qiniu_token,
		                //	        get_new_uptoken: true,
		                //save_key: true,
		                domain: $rootScope.qiniu_bucket_domain, //bucket 域名，下载资源时用到，**必需**
		                container: 'upload_container',           //上传区域DOM ID，默认是browser_button的父元素，
		                max_file_size: '10mb',           //最大文件体积限制
		                flash_swf_url: '../../framework/plupload/Moxie.swf',  //引入flash,相对路径
		                max_retries: 3,                   //上传失败最大重试次数
		                dragdrop: false,                   //开启可拖曳上传
		                drop_element: '',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		                chunk_size: '4mb',                //分块上传时，每片的体积
		                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
		                init: {
		                    'FilesAdded': function (up, files) {
		                        //                    plupload.each(files, function(file) {
		                        //                        // 文件添加进队列后,处理相关的事情
		                        //                    });
		                    },
		                    'BeforeUpload': function (up, file) {
		                        $rootScope.uploading = true;
		                        $scope.upload_percent = file.percent;
		                        $rootScope.$apply();
		                    },
		                    'UploadProgress': function (up, file) {
		                        // 每个文件上传时,处理相关的事情
		                        $scope.upload_percent = file.percent;
		                        $scope.$apply();
		                    },
		                    'FileUploaded': function (up, file, info) {
		                        var res = $.parseJSON(info);
		                        var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
		                        $scope.user.headImg = file_url;
		                        $scope.$apply();
		                        var params = $rootScope.login_user;
		                        params.key = "headImg";
		                        params.value = $scope.user.headImg;
		                        $.post(api_uri + "api/user/update", params,
								    function (data) {
								        if (data.returnCode == 0) {
								            
								        } else {
								            console.log(data);
								        }
								    },
								"json");
		                    },
		                    'Error': function (up, err, errTip) {
		                        console.log(err);
		                        $rootScope.alert("营业执照上传失败！");
		                    },
		                    'UploadComplete': function () {
		                        //队列文件处理完毕后,处理相关的事情
		                    },
		                    'Key': function (up, file) {
		                        var time = new Date().getTime();
		                        var k = 'user/headImg/' + $rootScope.login_user.userId + '/' + time;
		                        return k;
		                    }
		                }
		            });
		        } else {
		            console.log(d);
		        }
		
		    }).error(function (d) {
		        console.log(d);
		    });
	       
        };
        $scope.init();


        $scope.logout =  function(){
            $http({
	            url: api_uri + "api/auth/logout",
	            method: "GET",
	            params: $rootScope.login_user
	        }).success(function (d) {
	        	console.log(d);
	        }).error(function (d) {
	            console.log(d);
	        });
	         $rootScope.removeObject("login_user", $rootScope.login_user);
	         $rootScope.login_user = {};
	         $location.path("/login");
        };
}]);

/*我的钱包*/
userCtrl.controller('WalletCtrl',
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

        $scope.wallet_list = [{"className": "平安银行","cardId":"1234567899876543219","classification":"储蓄卡"},
            {"className": "平安银行","cardId":"1234567899876543219","classification":"储蓄卡"},
            {"className": "平安银行","cardId":"1234567899876543219","classification":"储蓄卡"}];

        $scope.addCard = function(){
            $location.path("/user/bankCard");
        }
    }]);
