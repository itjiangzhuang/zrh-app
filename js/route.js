/**
 * Created by jiangzhuang on 5/5/16.
 */

//路由设定
myApp.config(function ($routeProvider) {
    $routeProvider
        //登录
        .when('/login', {
            templateUrl: templates_root + 'login/login.html',
            controller: 'LoginCtrl'
        })
        //注册
        .when('/register/step1', {//注册第一步
            templateUrl: templates_root + 'register/step1.html',
            controller: 'RegStep1Ctrl'
        })
        .when('/register/step2/:mobile/:token', {//注册第二步
            templateUrl: templates_root + 'register/step2.html',
            controller: 'RegStep2Ctrl'
        })
        .when('/register/reset1', {//重置第一步
            templateUrl: templates_root + 'register/reset1.html',
            controller: 'ResetStep1Ctrl'
        })
         .when('/register/reset2/:mobile/:token', {//重置第二步
            templateUrl: templates_root + 'register/reset2.html',
            controller: 'ResetStep2Ctrl'
        })
        
        //项目
        .when('/article/list', {//列表
            templateUrl: templates_root + 'article/list.html',
            controller: 'ArticleListCtrl'
        })
        .when('/article/show/:id', {//详情
            templateUrl: templates_root + 'article/show.html',
            controller: 'ArticleShowCtrl'
        })
        .when('/article/create/step1', {//创建第一步
            templateUrl: templates_root + 'article/createStep1.html',
            controller: 'ArticleCreateStep1Ctrl'
        })
        .when('/article/update/step1/:id', {//创建第一步
            templateUrl: templates_root + 'article/createStep1.html',
            controller: 'ArticleUpdateStep1Ctrl'
        })
        .when('/article/create/license/:op', {//选择营业执照
            templateUrl: templates_root + 'article/license.html',
            controller: 'ArticleCreateLicenseCtrl'
        })
        .when('/article/create/step2', {//创建第二步
            templateUrl: templates_root + 'article/createStep2.html',
            controller: 'ArticleCreateStep2Ctrl'
        })
        .when('/article/update/step2/:id', {//创建第二步
            templateUrl: templates_root + 'article/createStep2.html',
            controller: 'ArticleUpdateStep2Ctrl'
        })
        .when('/article/credit/:op', {//贷款方式
            templateUrl: templates_root + 'article/select.html',
            controller: 'CreditCtrl'
        })
        .when('/article/classification/:op', {//行业类别
            templateUrl: templates_root + 'article/select.html',
            controller: 'ClassificationCtrl'
        })
        .when('/article/businessType/:op', {//公司类型
            templateUrl: templates_root + 'article/select.html',
            controller: 'BusinessTypeCtrl'
        })

         .when('/article/details', {//产品详情
            templateUrl: templates_root + 'article/details.html',
            controller: 'DetailsCtrl'
        })
        .when('/article/details', {//产品详情
            templateUrl: templates_root + 'article/details.html',
            controller: 'DetailsCtrl'
        })
        .when('/article/putquestions', {//问答界面
            templateUrl: templates_root + 'article/putquestions.html',
            controller: 'PutquestionsCtrl'
        })
        .when('/article/bidalert1', {//未竞标alert
            templateUrl: templates_root + 'article/bidalert1.html',
            controller: 'Bidalert1Ctrl'
        })
        .when('/article/bidalert2', {//已竞标alert
            templateUrl: templates_root + 'article/bidalert2.html',
            controller: 'Bidalert2Ctrl'
        })
        .otherwise({redirectTo: '/article/list'})
});