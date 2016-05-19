/**
 * Created by jz on 2016/5/19.
 */

var userCtrl = angular.module('userCtrl', []);
/*个人中心*/
userCtrl.controller('UserCenterCtrl', function ($http, $scope, $rootScope, $location) {

    $scope.userQuestion = function () {
        $location.path('/user/question');
    };

    /*切换普通用户和vip*/
    $scope.names = 2;
$scope.vipToCommon = function(){
    if ($scope.names == 1) {
        $('.vipHave').css('display', 'none');
        $('.vipNone').css('display', 'block');
    }
}
});
/*问题中心*/
userCtrl.controller('UserQuestionCtrl', function ($http, $scope, $rootScope, $location) {
$scope.message_list =[{"content": "请问有什么抵押物可以提供","id":"1","classification":"房地产","loanValue":"200万","license":"2013.06.5"},
    {"content": "赵景明","id":'2',"classification":"房地产","loanValue":"200万","license":"2013.06.5"},
    {"content": "肖威","id":'3',"classification":"房地产","loanValue":"200万","license":"2013.06.5"}]

    $scope.questionDetail = function (id) {
        if (!isNullOrEmpty(id)) {
            $location.path('/user/questionDetail/'+id);
        }
    };
});
/*问题详情*/
userCtrl.controller('QuestionDetailCtrl', function ($http, $scope, $rootScope, $location) {
    $scope.message = {"content": "白杨","id":"1","classification":"房地产","loanValue":"200","license":"2013.06.5",}
    $scope.messageDet = [{"message1":"ladfsdfsdfsdfsdfsf"},
        {"message1":"ggggggggggg"},
        {"message2":"fffffffffffffff"},
        {"message1":"ssssssssssssssss"},
        {"message2":"ffffsaaaaaaa"},
        {"message1":"ccccccccccccccc"}],
        "messageContent1"[{"message1":"ladfsdfsdfsdfsdfsf"},
        {"message1":"ggggggggggg"},
        {"message1":"fffffffffffffff"},
        {"message1":"ssssssssssssssss"},
        {"message1":"ffffsaaaaaaa"},
        {"message1":"ccccccccccccccc"}]
});


userCtrl.controller('MyMessages', function ($http, $scope, $rootScope, $location) {



});


