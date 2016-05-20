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
        .when('/article/update/step1/:id', {//更新第一步
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
        .when('/article/update/step2/:id', {//更新第二步
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
        .when('/article/questions/:id/:userId', {//问答界面
            templateUrl: templates_root + 'article/questions.html',
            controller: 'QuestionsCtrl'
        })
        .when('/article/bidalert1', {//未竞标alert
            templateUrl: templates_root + 'article/bidalert1.html',
            controller: 'Bidalert1Ctrl'
        })
        .when('/article/bidalert2', {//已竞标alert
            templateUrl: templates_root + 'article/bidalert2.html',
            controller: 'Bidalert2Ctrl'
        })
        .when('/user/center', {//个人中心
            templateUrl: templates_root + 'user/center.html',
            controller: 'UserCenterCtrl'
        })
        .when('/user/questions', {//vip投资问题
            templateUrl: templates_root + 'user/myquestions.html',
            controller: 'MyQuestionsCtrl'
        })
        .when('/user/questionDetail/:id', {
            templateUrl: templates_root + 'user/question_detail.html',
            controller: 'QuestionDetailCtrl'
        })
        .when('/user/messages', {
            templateUrl: templates_root + 'user/my_message.html',
            controller: 'MyMessages'
        })
        .when('/user/wind_control', {//风控标准
            templateUrl: templates_root + 'user/wind_control.html',
            controller: 'WindControlCtrl'
        })
        .when('/user/wallet', {//我的钱包
            templateUrl: templates_root + 'user/wallet.html',
            controller: 'WalletCtrl'
        })
        .when('/user/setting', {//设置
            templateUrl: templates_root + 'user/setting.html',
            controller: 'SettingCtrl'
        })
        /*.when('/user/questions', {//vip投资问题
            templateUrl: templates_root + 'user/myquestions.html',
            controller: 'MyQuestionsCtrl'
        })
        .when('/article/vipmymessage', {//vip我的消息
            templateUrl: templates_root + 'article/vipmymessage.html',
            controller: 'VipmymessageCtrl'
        })


        .when('/article/guarantee', {//信用担保选择
            templateUrl: templates_root + 'article/guarantee.html',
            controller: 'GuaranteeCtrl'
        })
        .when('/article/shezhi', {//设置
            templateUrl: templates_root + 'article/shezhi.html',
            controller: 'shezhiCtrl'
        })
        .when('/article/speedprogress', {//vip项目进度
            templateUrl: templates_root + 'article/speedprogress.html',
            controller: 'SpeedprogressCtrl'
        })
        .when('/article/administrationstep1', {//vip已发布项目管理第一步
            templateUrl: templates_root + 'article/administrationstep1.html',
            controller: 'Administrationstep1Ctrl'
        })
        .when('/article/administrationstep2', {//vip已发布项目管理第二步
            templateUrl: templates_root + 'article/administrationstep2.html',
            controller: 'Administrationstep2Ctrl'
        })
        .when('/article/administrationstep3', {//vip已发布项目管理第三步
            templateUrl: templates_root + 'article/administrationstep3.html',
            controller: 'Administrationstep3Ctrl'
        })
        .when('/article/administrationstep4', {//vip未发布项目管理第-步
            templateUrl: templates_root + 'article/administrationstep4.html',
            controller: 'Administrationstep4Ctrl'
        })
        .when('/article/administrationstep5', {//vip未发布项目管理第二步
            templateUrl: templates_root + 'article/administrationstep5.html',
            controller: 'Administrationstep5Ctrl'
        })
        .when('/article/administrationstep6', {//vip未发布项目管理第三步
            templateUrl: templates_root + 'article/administrationstep6.html',
            controller: 'Administrationstep6Ctrl'
        })
        .when('/article/speeddetailsstep1', {//vip项目进度详情审核中
            templateUrl: templates_root + 'article/speeddetailsstep1.html',
            controller: 'Speeddetailsstep1Ctrl'
        })
        .when('/article/speeddetailsstep2', {//vip项目进度详情约见
            templateUrl: templates_root + 'article/speeddetailsstep2.html',
            controller: 'Speeddetailsstep2Ctrl'
        })
        .when('/article/speeddetailsstep3', {//vip项目进度详情跟进中
            templateUrl: templates_root + 'article/speeddetailsstep3.html',
            controller: 'Speeddetailsstep3Ctrl'
        })
        .when('/article/speeddetailsstep4', {//vip项目进度详情签约完成
            templateUrl: templates_root + 'article/speeddetailsstep4.html',
            controller: 'Speeddetailsstep4Ctrl'
        })
        .when('/article/speeddetailsstep5', {//vip项目进度详情签约失败
            templateUrl: templates_root + 'article/speeddetailsstep5.html',
            controller: 'Speeddetailsstep5Ctrl'
        })
        .when('/article/telephone', {//约见电话
            templateUrl: templates_root + 'article/telephone.html',
            controller: 'TelephoneCtrl'
        })*/
        .otherwise({redirectTo: '/article/list'})
});