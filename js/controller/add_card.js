/**
 * Created by baiyang on 2016/5/18.
 */
/*增加银行卡*/
var bankCardCtrl = angular.module('bankCardCtrl', []);
bankCardCtrl.controller('addBankCardCtrl',
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
        $scope.getSRF = function(){
            $(document).ready(function(){  $("input[name=demo]").focus();});
        }
        $scope.cardPassword = ""
        $scope.getSRF();
        $scope.change = function () {
            console.log($scope.cardPassword);
            if($scope.cardPassword.length == 6){
                $location.path("/user/bankCard2")
            }
        }
    }]);
bankCardCtrl.controller('addBankCard2Ctrl',
    ['$scope','$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
        //$scope.phoneNum = ""
        $scope.alertTip = function () {
            $('.coverAlert').css("display","block")
        }
        $scope.exitAlertTip = function () {
            $('.coverAlert').css("display","none")
        }
        $scope.next_step = function(){
            if(Scope.phoneNum ==11){
                $location.path("/wallet/createCard3")
            }else{

            }
        }
    }]);
