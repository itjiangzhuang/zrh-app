/**
 * Created by jiangzhuang on 5/5/16.
 */

var articleCtrl = angular.module('articleCtrl', []);

articleCtrl.controller('ArticleListCtrl', function ($http, $scope, $rootScope, $location) {
	 
	 $scope.list = function () {
        $http({
            url: api_uri+"api/article/list",
            method: "GET"
        }).success(function (d) {
        	console.log(d);
            if (d.returnCode == 0) {
                $scope.result_list = d.result;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };

    $scope.list();

    $scope.article_show = function (id) {
        if (!isNullOrEmpty(id)) {
            $location.path("/article/show/" + id);
        }
    };

    $scope.goto_create = function () {

        $location.path("/article/create/step1");
    }
    $scope.goto_center = function () {

        $location.path("/user/center");
    }

});

articleCtrl.controller('ArticleShowCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    $scope.init = function () {
        $http({
            url: api_uri + "api/article/show/" + $routeParams.id,
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.article = d.result.article;
                $scope.operate = d.result.operate;
                $scope.batting = d.result.batting;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };

    $scope.init();

    $scope.next_op = function (op) {
        alert(op);
        var obj = {
            "update": "/article/update/step1/" + $routeParams.id,
            "release": "/article/update/step1/" + $routeParams.id,
            "bid": "/article/bid/" + $routeParams.id,
            "ask": "/article/questions/" + $routeParams.id + "/" + $rootScope.login_user.userId
        };
//	    alert(obj[op]);
        $location.path(obj[op]);
    };

});

articleCtrl.controller('ArticleCreateStep1Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    $scope.createArticle = $rootScope.getSessionObject("create_article");
    console.log($scope.createArticle);

    if (!$scope.createArticle) {
        $scope.createArticle = {};
        $scope.createArticle.license = {};
    } else {
        if (!$scope.createArticle.license) {
            $scope.createArticle.license = {};
        }
    }
    /*添加选取金额的布局*/
    $scope.add = function () {
        var txt1 = '<li><span></span><ul><li>万</li><li>十万</li><li>百万</li><li>千万</li><li>亿</li></ul></li>'
        for (var i = 0; i < 10; i++) {
            $("#treelist").append(txt1);
            $("#treelist span").eq(i).text(i + 1);
        }
    }
    $scope.add();

    $scope.getFormToken = function () {
        $http({
            url: api_uri + "api/article/formToken",
            method: "GET",
            params: {
                "userId": $rootScope.login_user.userId,
                "token": $rootScope.login_user.token
            }
        }).success(function (d) {
            if (d.returnCode == 0) {
                $scope.createArticle.formToken = d.result;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };
    $scope.changeLoanValue = function () {
        $scope.createArticle.loanValue = $("#loanValue").val();
        $scope.$apply();
    };

    $scope.changeLoanLife = function () {
        $scope.createArticle.loanLife = $("#loanLife").val();
        $scope.$apply();
    };

    $scope.changeRateCap = function () {
        $scope.createArticle.rateCap = $("#rateCap").val();
        $scope.$apply();
    };

    $scope.changeRateFloor = function () {
        $scope.createArticle.rateFloor = $("#rateFloor").val();
        $scope.$apply();
    };

    $scope.init = function () {
        if (!$scope.createArticle.id || isNullOrEmpty($scope.createArticle.id)) {
            $scope.getFormToken();
        }

        $("#treelist").aomuntmoney();


        $('#rate').daterate();//利率选择
        $('#term').dateterm();//期限选择
        $('#term,#rate').click(function () {
            $('body').css('overflow', 'hidden');
        });
    };

    $scope.setStyle_div = function (args) {
        if (args) {
            return "setafter";
        } else {
            return "reqname";
        }
    }

    $scope.setStyle_div2 = function (arg1, arg2) {
        if (arg1 && arg2) {
            return "setafter";
        } else {
            return "reqname";
        }
    }
    console.log($scope.createArticle);
    $scope.init();
    console.log($scope.createArticle);
    $scope.choose_classification = function () {
        $rootScope.putSessionObject("create_article", $scope.createArticle);
        $location.path("/article/classification/create");
    };


    $scope.create_license = function () {
        $rootScope.putSessionObject("create_article", $scope.createArticle);
        $location.path("/article/create/license/create");
    };

    params = {
        "id": $scope.createArticle.id,
        "userId": $rootScope.login_user.userId,
        "token": $rootScope.login_user.token,
        "formToken": $scope.createArticle.formToken
    };


    $scope.next_step = function () {
        if (!isNullOrEmpty($scope.createArticle.loanValue)) {
            params.loanValue = $scope.createArticle.loanValue;
        }
        if (!isNullOrEmpty($scope.createArticle.loanLife)) {
            params.loanLife = $scope.createArticle.loanLife;
        }
        if (!isNullOrEmpty($scope.createArticle.rateCap)) {
            params.rateCap = $scope.createArticle.rateCap;
        }
        if (!isNullOrEmpty($scope.createArticle.rateFloor)) {
            params.rateFloor = $scope.createArticle.rateFloor;
        }
        if (!isNullOrEmpty($scope.createArticle.classification)) {
            params.classification = $scope.createArticle.classification;
        }

        if (!isNullOrEmpty($scope.createArticle.license.businessName)) {
            params.businessName = $scope.createArticle.license.businessName;
        } else {
            alert("请完善公司名称");
            $scope.create_license();
        }
        if (!isNullOrEmpty($scope.createArticle.license.regTime)) {
            params.regTime = $scope.createArticle.license.regTime;
        }
        if (!isNullOrEmpty($scope.createArticle.license.businessType)) {
            params.businessType = $scope.createArticle.license.businessType;
        }
        if (!isNullOrEmpty($scope.createArticle.license.regFunds)) {
            params.regFunds = $scope.createArticle.license.regFunds;
        }
        if (!isNullOrEmpty($scope.createArticle.license.licenseImgs)) {
            params.licenseImgs = $scope.createArticle.license.licenseImgs.join(",");
            params.licenseImgNames = $scope.createArticle.license.licenseImgNames.join(",");
        }
        if (!isNullOrEmpty($scope.createArticle.license.corporateRepresentative)) {
            params.corporateRepresentative = $scope.createArticle.license.corporateRepresentative;
        }

        $.post(api_uri + "api/article/createStep1", params,
            function (data) {
                if (data.returnCode == 0) {
                    $rootScope.removeSessionObject("create_article");
                    $scope.articleStep2 = {
                        "id": data.result
                    }
                    $rootScope.putSessionObject("articleStep2", $scope.articleStep2);
                    $location.path("/article/create/step2");
                } else {
                    $rootScope.removeObject("create_article");
                    console.log(data);
                }
            },
            "json");
    };

});

articleCtrl.controller('ArticleCreateLicenseCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("create_article");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("update_article");
    } else {
        alert("error op");
        $location.path("/article/list");
    }


    $scope.license = $scope.article.license;
    if (!$scope.license) {
        $scope.license = {}
    }

    $scope.changeRegTime = function () {
        $scope.license.regTime = $("#regTime").val();
        $scope.$apply();
        console.log($scope.license);
    }

    $scope.init = function () {
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
                            $scope.license.licenseImgNames = file.name;
                            $scope.license.licenseImgs = file_url;
                            $scope.$apply();
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
                            var k = 'article/license/' + $rootScope.login_user.userId + '/' + time;
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

        $("#time").date();
    };

    $scope.init();

    $scope.setStyle_div = function (args) {
        if (args) {
            return "setafter";
        } else {
            return "reqname";
        }
    };


    $scope.choose_type = function () {
        $scope.article.license = $scope.license;
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("create_article", $scope.article);
            $location.path("/article/businessType/create");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("update_article", $scope.article);
            $location.path("/article/businessType/update");
        }

    };


    $scope.change_time = function () {
        $scope.license.regTime = $("#time").val();
    };

    $scope.sure = function () {
        $scope.article.license = $scope.license;
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("create_article", $scope.article);
            $location.path("/article/create/step1");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("update_article", $scope.article);
            $location.path("/article/update/step1/" + $scope.article.id);
        }
    };
});

articleCtrl.controller('ArticleCreateStep2Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    $scope.articleStep2 = $rootScope.getSessionObject("articleStep2");

    console.log($scope.articleStep2);

    $scope.pledgeTypeList = [
        {"name": "房产", "check": false},
        {"name": "地产", "check": false},
        {"name": "股票", "check": false},
        {"name": "车辆", "check": false},
        {"name": "其他", "check": false}
    ];

    $scope.setStyle_div = function (args) {
        if (args) {
            return "setafter";
        } else {
            return "reqname";
        }
    }

    $scope.check = function (name) {
        for (var i = 0; i < $scope.pledgeTypeList.length; i++) {
            // 计算表单的总价
            var obj = $scope.pledgeTypeList[i];
            if (obj.name == name) {
                if (obj.check) {
                    obj.check = false;
                } else {
                    obj.check = true;
                    $scope.articleStep2.pledgeType = obj.name;
                }
            } else {
                obj.check = false;
            }
        }
    };

    $scope.init = function () {
        $scope.check($scope.articleStep2.pledgeType);

        if (!$scope.articleStep2.pledge) {
            $scope.articleStep2.pledge = "请具体描述下抵押物的金额、权属情况、股票号等信息。也可以点击加号直接上传房本、车本、股票号等数据图片。";
        }

        if (!$scope.articleStep2.pledgeImgs) {
            $scope.articleStep2.pledgeImgs = [];
            $scope.articleStep2.pledgeImgNames = [];
        }
        if (!$scope.articleStep2.financialImgs) {
            $scope.articleStep2.financialImgs = [];
            $scope.articleStep2.financialImgNames = [];
        }
        if (!$scope.articleStep2.advantagesImgs) {
            $scope.articleStep2.advantagesImgs = [];
            $scope.articleStep2.advantagesImgNames = [];
        }

        $http({
            url: api_uri + "api/qiniu/getUpToken",
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.qiniu_token = d.result.uptoken;
                var uploaderPledgeImg = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: 'pickPledgeImg',       //上传选择的点选按钮，**必需**
                    //	        uptoken_url: api_uri+"api/qiniu/getUpToken",
                    uptoken: $scope.qiniu_token,
                    //	        get_new_uptoken: true,
                    //save_key: true,
                    domain: $rootScope.qiniu_bucket_domain, //bucket 域名，下载资源时用到，**必需**
                    container: 'upload_pledgeImg',           //上传区域DOM ID，默认是browser_button的父元素，
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
//							 $rootScope.uploading = true;
//							 $scope.upload_percent = file.percent;
//							 $rootScope.$apply();
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情
//							 $scope.upload_percent = file.percent;
//							 $scope.$apply();
                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
                            $scope.articleStep2.pledgeImgNames.push(file.name);
                            $scope.articleStep2.pledgeImgs.push(file_url);
                            $scope.$apply();
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            $rootScope.alert("抵押物图片上传失败！");
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后,处理相关的事情
                        },
                        'Key': function (up, file) {
                            var time = new Date().getTime();
                            var k = 'article/pledge/' + $rootScope.login_user.userId + '/' + time;
                            return k;
                        }
                    }
                });

                var uploaderFinancialImg = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: 'pickFinancialImg',       //上传选择的点选按钮，**必需**
                    //	        uptoken_url: api_uri+"api/qiniu/getUpToken",
                    uptoken: $scope.qiniu_token,
                    //	        get_new_uptoken: true,
                    //save_key: true,
                    domain: $rootScope.qiniu_bucket_domain, //bucket 域名，下载资源时用到，**必需**
                    container: 'upload_financialImg',           //上传区域DOM ID，默认是browser_button的父元素，
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
//							 $rootScope.uploading = true;
//							 $scope.upload_percent = file.percent;
//							 $rootScope.$apply();
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情
//							 $scope.upload_percent = file.percent;
//							 $scope.$apply();
                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
                            $scope.articleStep2.financialImgNames.push(file.name);
                            $scope.articleStep2.financialImgs.push(file_url);
                            $scope.$apply();
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            $rootScope.alert("抵押物图片上传失败！");
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后,处理相关的事情
                        },
                        'Key': function (up, file) {
                            var time = new Date().getTime();
                            var k = 'article/financial/' + $rootScope.login_user.userId + '/' + time;
                            return k;
                        }
                    }
                });

                var uploaderAdvantagesImg = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: 'pickAdvantagesImg',       //上传选择的点选按钮，**必需**
                    //	        uptoken_url: api_uri+"api/qiniu/getUpToken",
                    uptoken: $scope.qiniu_token,
                    //	        get_new_uptoken: true,
                    //save_key: true,
                    domain: $rootScope.qiniu_bucket_domain, //bucket 域名，下载资源时用到，**必需**
                    container: 'upload_advantagesImg',           //上传区域DOM ID，默认是browser_button的父元素，
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
//							 $rootScope.uploading = true;
//							 $scope.upload_percent = file.percent;
//							 $rootScope.$apply();
                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情
//							 $scope.upload_percent = file.percent;
//							 $scope.$apply();
                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
                            $scope.articleStep2.advantagesImgNames.push(file.name);
                            $scope.articleStep2.advantagesImgs.push(file_url);
                            $scope.$apply();
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            $rootScope.alert("抵押物图片上传失败！");
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后,处理相关的事情
                        },
                        'Key': function (up, file) {
                            var time = new Date().getTime();
                            var k = 'article/advantages/' + $rootScope.login_user.userId + '/' + time;
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

    $scope.removePledgeImg = function (index) {
        $scope.articleStep2.pledgeImgNames.splice(index, 1);
        $scope.articleStep2.pledgeImgs.splice(index, 1);
    };

    $scope.removeFinancialImg = function (index) {
        $scope.articleStep2.financialImgNames.splice(index, 1);
        $scope.articleStep2.financialImgs.splice(index, 1);
    };

    $scope.removeAdvantagesImg = function (index) {
        $scope.articleStep2.advantagesImgNames.splice(index, 1);
        $scope.articleStep2.advantagesImgs.splice(index, 1);
    };

    $scope.init();

    $scope.choose_credit = function () {
        $rootScope.putSessionObject("articleStep2", $scope.articleStep2);
        $location.path("/article/credit/create");
    }

    params = {
        "id": $scope.articleStep2.id,
        "userId": $rootScope.login_user.userId,
        "token": $rootScope.login_user.token
    };

    $scope.save = function () {
        if (!isNullOrEmpty($scope.articleStep2.pledgeType)) {
            params.pledgeType = $scope.articleStep2.pledgeType;
        }
        if (!isNullOrEmpty($scope.articleStep2.pledge)) {
            params.pledge = $scope.articleStep2.pledge;
        }
        if (!isNullOrEmpty($scope.articleStep2.pledgeImgs)) {
            params.pledgeImgs = $scope.articleStep2.pledgeImgs.join(",");
            params.pledgeImgNames = $scope.articleStep2.pledgeImgNames.join(",");
        }
        if (!isNullOrEmpty($scope.articleStep2.financialInfo)) {
            params.financialInfo = $scope.articleStep2.financialInfo;
        }
        if (!isNullOrEmpty($scope.articleStep2.financialImgs)) {
            params.financialImgs = $scope.articleStep2.financialImgs.join(",");
            params.financialImgNames = $scope.articleStep2.financialImgNames.join(",");
        }
        if (!isNullOrEmpty($scope.articleStep2.continualOperateYear)) {
            params.continualOperateYear = $scope.articleStep2.continualOperateYear;
        }
        if (!isNullOrEmpty($scope.articleStep2.continualPublicYear)) {
            params.continualPublicYear = $scope.articleStep2.continualPublicYear;
        }
        if (!isNullOrEmpty($scope.articleStep2.businessContact)) {
            params.businessContact = $scope.articleStep2.businessContact;
        }
        if (!isNullOrEmpty($scope.articleStep2.corporateResidence)) {
            params.corporateResidence = $scope.articleStep2.corporateResidence;
        }
        if (!isNullOrEmpty($scope.articleStep2.advantages)) {
            params.advantages = $scope.articleStep2.advantages;
        }
        if (!isNullOrEmpty($scope.articleStep2.advantagesImgs)) {
            params.advantagesImgs = $scope.articleStep2.advantagesImgs.join(",");
            params.advantagesImgNames = $scope.articleStep2.advantagesImgNames.join(",");
        }

        $.post(api_uri + "api/article/createStep2", params,
            function (data) {
                if (data.returnCode == 0) {
//          	$scope.createArticle.id = d.result;
                    $rootScope.removeSessionObject("articleStep2");
                    $location.path("/article/list");
                } else {
                    console.log(data);
                }
            },
            "json");
    };

    $scope.release = function () {
        alert("发布项目");
    }
});

articleCtrl.controller('CreditCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("articleStep2");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("articleStep2");
    } else {
        alert("error op");
        $location.path("/article/list");
    }

    if (!$scope.article) {
        $scope.article = {};
    }

    $scope.obj_list = [{"name": "不限", "check": false},
        {"name": "信用贷款", "check": false},
        {"name": "固定资产贷款", "check": false},
        {"name": "流动资产贷款", "check": false},
        {"name": "经营性物业贷款", "check": false},
        {"name": "房地产开发贷款", "check": false}];

    $scope.check = function (name) {
        for (var i = 0; i < $scope.obj_list.length; i++) {
            // 计算表单的总价
            var obj = $scope.obj_list[i];
            if (obj.name == name) {
                if (obj.check) {
                    obj.check = false;
                } else {
                    obj.check = true;
                }
            } else {
                obj.check = false;
            }
        }
    };

    $scope.check($scope.article.credit);

    $scope.sure = function () {
        $scope.article.credit = "";
        for (var i = 0; i < $scope.obj_list.length; i++) {
            var obj = $scope.obj_list[i];
            if (obj.check) {
                $scope.article.credit = obj.name;
            }
        }
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("articleStep2", $scope.article);
            $location.path("/article/create/step2");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("articleStep2", $scope.article);
            $location.path("/article/update/step2/" + $scope.article.id);
        }

    }
});

articleCtrl.controller('ClassificationCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("create_article");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("update_article");
    } else {
        alert("error op");
        $location.path("/article/list");
    }

    $scope.obj_list = [{"name": "大农业", "check": false},
        {"name": "房地产", "check": false},
        {"name": "商业贸易", "check": false},
        {"name": "仓储物流", "check": false},
        {"name": "工业制造", "check": false},
        {"name": "医疗", "check": false},
        {"name": "教育", "check": false},
        {"name": "建筑工程", "check": false},
        {"name": "电子商务", "check": false}];

    $scope.check = function (name) {
        for (var i = 0; i < $scope.obj_list.length; i++) {
            // 计算表单的总价
            var obj = $scope.obj_list[i];
            if (obj.name == name) {
                if (obj.check) {
                    obj.check = false;
                } else {
                    obj.check = true;
                }
            } else {
                obj.check = false;
            }
        }
    };

    $scope.check($scope.article.classification);

    $scope.sure = function () {
        $scope.article.classification = "";
        for (var i = 0; i < $scope.obj_list.length; i++) {
            var obj = $scope.obj_list[i];
            if (obj.check) {
                $scope.article.classification = obj.name;
            }
        }
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("create_article", $scope.article);
            $location.path("/article/create/step1");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("update_article", $scope.article);
            $location.path("/article/update/step1/" + $scope.article.id);
        }
    }
});

articleCtrl.controller('BusinessTypeCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("create_article");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("update_article");
    } else {
        alert("error op");
        $location.path("/article/list");
    }

    $scope.obj_list = [
        {"name": "个人独资企业", "check": false},
        {"name": "合伙企业", "check": false},
        {"name": "有限责任公司", "check": false},
        {"name": "股份制有限公司", "check": false}
    ];

    $scope.check = function (name) {
        for (var i = 0; i < $scope.obj_list.length; i++) {
            // 计算表单的总价
            var obj = $scope.obj_list[i];
            if (obj.name == name) {
                if (obj.check) {
                    obj.check = false;
                } else {
                    obj.check = true;
                }
            } else {
                obj.check = false;
            }
        }
    };

    $scope.check($scope.article.license.businessType);

    $scope.sure = function () {
        $scope.article.license.businessType = "";
        for (var i = 0; i < $scope.obj_list.length; i++) {
            var obj = $scope.obj_list[i];
            if (obj.check) {
                $scope.article.license.businessType = obj.name;
            }
        }
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("create_article", $scope.article);
            $location.path("/article/create/license/create");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("update_article", $scope.article);
            $location.path("/article/create/license/update");
        }
    }
});

articleCtrl.controller('ArticleUpdateStep1Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {


    params = {
        "userId": $rootScope.login_user.userId,
        "token": $rootScope.login_user.token
    };

    $scope.init = function () {
        if (!$routeParams.id || isNullOrEmpty($routeParams.id)) {
            $location.path("/article/list");
        }

        $scope.article = $rootScope.getSessionObject("update_article");
        if (!$scope.article) {
            params.id = $routeParams.id
            $.post(api_uri + "api/article/updateStep1", params,
                function (data) {
                    if (data.returnCode == 0) {
                        $scope.article = {};
                        $scope.article.id = $routeParams.id;
                        $scope.article.loanValue = data.result.loanValue;
                        $scope.article.loanLife = data.result.loanLife;
                        $scope.article.rateCap = data.result.rateCap;
                        $scope.article.rateFloor = data.result.rateFloor;
                        $scope.article.classification = data.result.classification;
                        $scope.article.license = {};
                        $scope.article.license.businessName = data.result.businessName;
                        $scope.article.license.regTime = data.result.regTime;
                        $scope.article.license.businessType = data.result.businessType;
                        $scope.article.license.regFunds = data.result.regFunds;
                        $scope.article.license.licenseImgs = data.result.licenseImgs;
                        $scope.article.license.corporateRepresentative = data.result.corporateRepresentative;
                    } else {
                        console.log(data);
                    }
                },
                "json");
        } else {
            $rootScope.removeSessionObject("update_article");
        }

        $('#rate').daterate();//利率选择
        $('#term').dateterm();//期限选择
    };

    $scope.setStyle_div = function (args) {
        if (args) {
            return "setafter";
        } else {
            return "reqname";
        }
    };

    $scope.setStyle_div2 = function (arg1, arg2) {
        if (arg1 && arg2) {
            return "setafter";
        } else {
            return "reqname";
        }
    };

    $scope.init();

    $scope.choose_classification = function () {
        $rootScope.putSessionObject("update_article", $scope.article);
        $location.path("/article/classification/update");
    };

    $scope.create_license = function () {
        $rootScope.putSessionObject("update_article", $scope.article);
        $location.path("/article/create/license/update");
    };

    $scope.next_step = function () {
        if (!isNullOrEmpty($scope.article.loanvalue)) {
            params.loanvalue = $scope.article.loanvalue;
        }
        if (!isNullOrEmpty($scope.article.loanlife)) {
            params.loanlife = $scope.article.loanlife;
        }
        if (!isNullOrEmpty($scope.article.ratecap)) {
            params.ratecap = $scope.article.ratecap;
        }
        if (!isNullOrEmpty($scope.article.ratefloor)) {
            params.ratefloor = $scope.article.ratefloor;
        }
        if (!isNullOrEmpty($scope.article.classification)) {
            params.classification = $scope.article.classification;
        }

        if (!isNullOrEmpty($scope.article.license.businessName)) {
            params.businessName = $scope.article.license.businessName;
        } else {
            alert("请完善公司名称");
            $scope.create_license();
        }
        if (!isNullOrEmpty($scope.article.license.regTime)) {
            params.regTime = $scope.article.license.regTime;
        }
        if (!isNullOrEmpty($scope.article.license.businessType)) {
            params.businessType = $scope.article.license.businessType;
        }
        if (!isNullOrEmpty($scope.article.license.regFunds)) {
            params.regFunds = $scope.article.license.regFunds;
        }
        if (!isNullOrEmpty($scope.article.license.licenseImgs)) {
            params.licenseImgs = $scope.article.license.licenseImgs;
        }
        if (!isNullOrEmpty($scope.article.license.corporateRepresentative)) {
            params.corporateRepresentative = $scope.article.license.corporateRepresentative;
        }

        $.post(api_uri + "api/article/createStep1", params,
            function (data) {
                if (data.returnCode == 0) {
                    $location.path("/article/create/step2/" + $scope.article.id);
                } else {
                    console.log(data);
                }
            },
            "json");
    };

});


articleCtrl.controller('ArticleUpdateStep2Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {


    params = {
        "userId": $rootScope.login_user.userId,
        "token": $rootScope.login_user.token
    }

    $scope.init = function () {
        if (!$routeParams.id || isNullOrEmpty($routeParams.id)) {
            $location.path("/article/list");
        }

        $scope.article = $rootScope.getSessionObject("update_article");
        if (!$scope.article) {
            params.id = $routeParams.id
            $.post(api_uri + "api/article/updateStep2", params,
                function (data) {
                    if (data.returnCode == 0) {
                        $scope.article = {};
                        $scope.article.id = $routeParams.id;
                        $scope.article.pledgeType = data.result.pledgeType;
                        $scope.article.pledge = data.result.pledge;
                        $scope.article.pledgeImgs = data.result.pledgeImgs;
                        $scope.article.financialInfo = data.result.financialInfo;
                        $scope.article.financialImgs = data.result.financialImgs;
                        $scope.article.credit = data.result.credit;
                        $scope.article.continualOperateYear = data.result.continualOperateYear;
                        $scope.article.continualPublicYear = data.result.continualPublicYear;
                        $scope.article.businessContact = data.result.businessContact;
                        $scope.article.corporateResidence = data.result.corporateResidence;
                        $scope.article.advantagesImgs = data.result.advantagesImgs;
                        $scope.article.advantages = data.result.advantages;
                    } else {
                        console.log(data);
                    }
                },
                "json");
        } else {
            $rootScope.removeSessionObject("update_article");
        }
    };

    $scope.init();


});


articleCtrl.controller('DetailsCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {

});
articleCtrl.controller('QuestionsCtrl', function ($http, $scope, $rootScope, $location, $routeParams, $timeout, $interval) {

    $scope.init = function () {
        //初始化消息时间
        var lastTime = $rootScope.getObject("lt_" + $routeParams.id + "_" + $routeParams.userId);
        if (!lastTime) {
            $rootScope.putObject("lt_" + $routeParams.id + "_" + $routeParams.userId, 0);
        }

        //获取项目信息
        $http({
            url: api_uri + "api/article/showTitle/" + $routeParams.id,
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.article = d.result.article;
                $scope.batting = d.result.batting;
            }
            else {
                console.log(d);
            }
        }).error(function (d) {
            console.log("login error");
        });
        //获取全部消息列表
        $http({
            url: api_uri + "api/articleComments/list/" + $routeParams.id + "/" + $routeParams.userId,
            method: "GET",
            params: {
                "userId": $rootScope.login_user.userId,
                "token": $rootScope.login_user.token,
                "lastTime": $rootScope.getObject("lt_" + $routeParams.id + "_" + $routeParams.userId)
            }
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.message_list = d.result;
            }
            else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });
        //保存最后时间戳
    	if($scope.message_list && $scope.message_list.length >0){
    		$rootScope.putObject("lt_"+$routeParams.id+"_"+$routeParams.userId,$scope.message_list[$scope.message_list.length-1].createTime);
    	}else{
    		$scope.message_list = [];
    	}
//  	//定时执行消息获取
	    var promise = $interval(function(){
			$scope.otherList();
		},1000);
		$scope.$on('$destroy',function(){
			$interval.cancel(promise);
		});
//		$timeout(function() {  
//            $scope.otherList();
//      }, 1000);

    };


    $scope.otherList = function () {
        //获取别人消息的列表 加入数组
        $http({
            url: api_uri + "api/articleComments/otherList/" + $routeParams.id + "/" + $routeParams.userId,
            method: "GET",
            params: {
                "userId": $rootScope.login_user.userId,
                "token": $rootScope.login_user.token,
                "lastTime": $rootScope.getObject("lt_" + $routeParams.id + "_" + $routeParams.userId)
            }
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.other_list = d.result;
                $scope.message_list.push($scope.other_list);
            }
            else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });
    };
    
    $scope.sendMessage = function(){
    	var content = $scope.content;
    	$scope.content = "";

    	params = {
    		"userId": $rootScope.login_user.userId,
			"token": $rootScope.login_user.token,
			"content":content
    	};
    	//提交评论,并且添加进入列表
    	$.post(api_uri+"api/articleComments/leave/"+$routeParams.id+"/"+$routeParams.userId,
    	  params,function(data){
            if (data.returnCode == 0) {
                console.log("发送成功");
            }
            else {
            	console.log("发送失败");
                console.log(data);
            }
		  },
		"json");
		contentObj = {
			"self":true,
			"comment":content
		}
        $scope.message_list.push(contentObj);
    };

    $scope.init();

});
articleCtrl.controller('Bidalert1Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {

});
articleCtrl.controller('Bidalert2Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {

});


