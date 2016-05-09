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
        .when('/register/step1', {
            templateUrl: templates_root + 'register/step1.html',
            controller: 'RegStep1Ctrl'
        })
        .when('/register/step2/:mobile/:token', {
            templateUrl: templates_root + 'register/step2.html',
            controller: 'RegStep2Ctrl'
        })
        .when('/register/reset1', {
            templateUrl: templates_root + 'register/reset1.html',
            controller: 'ResetStep1Ctrl'
        })
         .when('/register/reset2/:mobile/:token', {
            templateUrl: templates_root + 'register/reset2.html',
            controller: 'ResetStep2Ctrl'
        })
        
        //项目
        .when('/article/list', {
            templateUrl: templates_root + 'article/list.html',
            controller: 'ArticleListCtrl'
        })
        .when('/article/show/:id', {
            templateUrl: templates_root + 'article/show.html',
            controller: 'ArticleShowCtrl'
        })
        .when('/article/create/step1', {
            templateUrl: templates_root + 'article/createStep1.html',
            controller: 'ArticleCreateStep1Ctrl'
        })
        .when('/article/create/step2', {
            templateUrl: templates_root + 'article/createStep2.html',
            controller: 'ArticleCreateStep2Ctrl'
        })
        .when('/article/industry', {
            templateUrl: templates_root + 'article/industry.html',
            controller: 'IndustryCtrl'
        })
        .when('/article/branch', {
            templateUrl: templates_root + 'article/branch.html',
            controller: 'BranchCtrl'
        })
        
        .otherwise({redirectTo: '/article/list'})
})