/**
 * Created by jz on 2016/5/19.
 */

var userCtrl = angular.module('userCtrl', []);
/*个人中心*/
userCtrl.controller('UserCenterCtrl', function ($http, $scope, $rootScope, $location) {

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

    $scope.next_op = function (op) {
        var obj = {
            "questions": "/user/questions",//打开问题中心
            "messages": "/user/messages",//打开消息中心
            "projectManage": "/article/projectManage",//打开发布项目管理
            "projectInvest": "/article/projectInvest",//打开投资项目管理
            "applyInvest":"/user/applyInvest",//打开申请投资资质
            "windControl":"/user/wind_control",//打开风控
            "myWallet":"/user/wallet",//打开我的钱包
            "setting":"/user/setting",//打开设置
            "goto_create":"/article/create/step1" //创建项目
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
        $scope.release = function () {
            $scope.invest_list=[{"company": "山西少爷孜然咸菜有限公司","classification":"生活消费","money":"1","date":"房地产","lilv":"200万","jindu":"30%","jindutext":"等待联系","license":"2013.06.5"},
                {"company": "速配云景科技有限公司","classification":"房地产","money":'2',"date":"房地产","lilv":"200万","jindu":"60%","license":"2013.06.5"},
                {"company": "山东大煎饼集团","classification":"放羊的","money":'3',"date":"房地产","lilv":"200万","jindu":"90%","license":"2013.06.5"}];
                    angular.forEach($scope.invest_list, function(data){
                        console.log(data);
                        console.log(data.jindu);
                        if(data.jindu == "30%"){
                            $scope.jindushow = "正在联系"
                        }else if (data.jindu == "60%"){
                            $scope.jindushow = "跟进中"
                        }
                        else if (data.jindu == "100%"){
                            $scope.jindushow = "签约成功"
                        }
                        else{
                            $scope.jindushow = "未发布"
                        }
                })

        };
        $scope.release();


        $scope.messageDetail =  function(id){
            if(!$rootScope.isNullOrEmpty(id)){
                $location.path("/questionDetail/"+id);
            }
        };
        $scope.unRelease = function () {
                    $scope.invest_list =[{"company": "hahahaha","classification":"生活消费","money":"1","date":"房地产","lilv":"200万","jindu":"0","license":"2013.06.5"},
                        ]
        };
    }]);
userCtrl.controller('ProjectInvestCtrl', //项目投资
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
        $scope.release = function () {
            $scope.invest_list=[{"company": "山西少爷孜然咸菜有限公司","classification":"生活消费","money":"1","date":"房地产","lilv":"200万","jindu":"30%","jindutext":"等待联系","license":"2013.06.5"},
                {"company": "速配云景科技有限公司","classification":"房地产","money":'2',"date":"房地产","lilv":"200万","jindu":"60%","license":"2013.06.5"},
                {"company": "山东大煎饼集团","classification":"放羊的","money":'3',"date":"房地产","lilv":"200万","jindu":"90%","license":"2013.06.5"}];
            angular.forEach($scope.invest_list, function(data){
                console.log(data);
                console.log(data.jindu);
                if(data.jindu == "30%"){
                    $scope.jindushow = "正在联系"
                }else if (data.jindu == "60%"){
                    $scope.jindushow = "跟进中"
                }
                else if (data.jindu == "100%"){
                    $scope.jindushow = "签约成功"
                }
                else{
                    $scope.jindushow = "未发布"
                }
            })

        };
        $scope.release();


        $scope.messageDetail =  function(id){
            if(!$rootScope.isNullOrEmpty(id)){
                $location.path("/questionDetail/"+id);
            }
        };
        $scope.unRelease = function () {
            $scope.invest_list =[{"company": "hahahaha","classification":"生活消费","money":"1","date":"房地产","lilv":"200万","jindu":"0","license":"2013.06.5"},
            ]
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
                    $location.path("/user/center");
                } else {
                    console.log(data);
                }
            },
        "json");
    };

});
