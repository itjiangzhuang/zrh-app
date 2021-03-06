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
            templateUrl: templates_root + 'article/step1.html',
            controller: 'ArticleCreateStep1Ctrl'
        })
        .when('/article/update/step1/:id', {//更新第一步
            templateUrl: templates_root + 'article/step1.html',
            controller: 'ArticleUpdateStep1Ctrl'
        })
        .when('/article/license/:op', {//选择营业执照
            templateUrl: templates_root + 'article/license.html',
            controller: 'ArticleLicenseCtrl'
        })
        .when('/article/step2', {//创建第二步
            templateUrl: templates_root + 'article/step2.html',
            controller: 'ArticleStep2Ctrl'
        })
        .when('/article/credit', {//贷款方式
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
        .when('/article/questions/:id/:userId', {//问答界面
            templateUrl: templates_root + 'article/questions.html',
            controller: 'QuestionsCtrl'
        })
        .when('/user/center', {//个人中心
            templateUrl: templates_root + 'user/center.html',
            controller: 'UserCenterCtrl'
        })
        .when('/user/questions', {//vip投资问题
            templateUrl: templates_root + 'user/myquestions.html',
            controller: 'MyQuestionsCtrl'
        })
        .when('/user/messages', {
            templateUrl: templates_root + 'user/my_message.html',
            controller: 'MyMessages'
        })
        //.when('/user/wind_control', {//风控标准
        //    templateUrl: templates_root + 'user/wind_control.html',
        //    controller: 'WindControlCtrl'
        //})
        .when('/user/wallet', {//我的钱包
            templateUrl: templates_root + 'user/wallet.html',
            controller: 'WalletCtrl'
        })
        .when('/user/bankCard', {//我的钱包
            templateUrl: templates_root + 'add_bankcard/add_bankcard.html',
            controller: 'addBankCardCtrl'
        })
        .when('/user/bankCard2', {//我的钱包
            templateUrl: templates_root + 'add_bankcard/add_bankcard2.html',
            controller: 'addBankCard2Ctrl'
        })
        .when('/user/setting', {//设置
            templateUrl: templates_root + 'user/setting.html',
            controller: 'SettingCtrl'
        })
        .when('/user/applyInvest', {//申请投资资质
            templateUrl: templates_root + 'user/apply_invest.html',
            controller: 'ApplyInvestCtrl'
        })
        .when('/article/projectManage', {//项目管理
            templateUrl: templates_root + 'user/project_manage.html',
            controller: 'ProjectManageCtrl'
        })
        .when('/article/projectInvest', {//项目投资
            templateUrl: templates_root + 'user/project_invest.html',
            controller: 'ProjectInvestCtrl'
        })
        .when('/article/bid/:id', {//项目详情
            templateUrl: templates_root + 'article/alert.html',
            controller: 'ArticleBidCtrl'
        })
        .when('/article/mobile/:id', {//联系人
            templateUrl: templates_root + 'article/mobile.html',
            controller: 'ArticleMobileCtrl'
        })
        .when('/article/bank/:id', {//银行列表
            templateUrl: templates_root + 'article/bank.html',
            controller: 'ArticleBankCtrl'
        })
        .when('/user/update', {//用户更改参数
            templateUrl: templates_root + 'user/update.html',
            controller: 'UserUpdateCtrl'
        })
        .when('/error', {//用户更改参数
            templateUrl: templates_root + '404.html',
            //controller: 'UserUpdateCtrl'
        })
        .otherwise({redirectTo: '/login'})
});