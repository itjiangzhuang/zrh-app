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
            "investProject": "/article/investProject",//打开投资项目管理
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

/*投资项目*/
userCtrl.controller('ProjectManageCtrl',
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
userCtrl.controller('InvestProjectCtrl',
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
		
	};
	
	$scope.init();
	

});

