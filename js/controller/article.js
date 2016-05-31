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
    	$scope.bt_show = 0;
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
                $scope.step = d.result.step;
                if($scope.step == 0){//未发布
                	if($scope.operate.admin){
                		$scope.bt_show = 1;
                	}
                }else if($scope.step == 1){//已经发布
                	if($scope.operate.admin){
                		$scope.bt_show = 2;
                	}else{
                		$scope.bt_show = 3;
                	}      	
                }else if($scope.step == 2){//竞标中
                	if($scope.operate.admin){
                		$scope.bt_show = 4;
                	}else{
                		$scope.bt_show = 5;
                	}       	
                }else if($scope.step == 3){//等待联系
                	if($scope.operate.admin){
                		$scope.bt_show = 4;
                	}else{
                		$scope.bt_show = 7;
                	}       	
                }else if($scope.step == 4){//跟进中
                	if($scope.operate.admin){
                		$scope.bt_show = 4;
                	}else{
                		$scope.bt_show = 6;
                	} 
                }
                
            }else {
                console.log(d);
            }
        }).error(function (d) {
            console.log("login error");
        });        
    };
    $scope.init();
    
    $scope.release = function(){
    	$.get(api_uri + "api/article/release/"+$routeParams.id, $rootScope.login_user,
            function (d) {
                if (d.returnCode == 0) {		                    
                    $location.path("/article/show/"+d.result);
                    $scope.$apply();
                } else {
                	alert("发布失败,请完善必填项");
                    console.log(d);
                }
            },
		"json");
    };

    $scope.next_op = function (op) {
        var obj = {
            "update": "/article/update/step1/" + $routeParams.id,         
            "bid": "/article/bid/" + $routeParams.id,
            "ask": "/article/questions/" + $routeParams.id + "/" + $rootScope.login_user.userId,
            "bank":"/article/bank/"+$routeParams.id,//待约见银行
            "mobile":"/article/mobile/"+$routeParams.id//约见信息
        };
        $location.path(obj[op]);
    };

});

articleCtrl.controller('ArticleCreateStep1Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    $scope.create_license = function () {
        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/license/create");
    };

    $scope.getFormToken = function () {
        $http({
            url: api_uri + "api/article/formToken",
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            if (d.returnCode == 0) {
                $scope.article.formToken = d.result;
            }
            else {
                console.log(d);
            }

        }).error(function (d) {
            console.log("login error");
        })
    };
    $scope.changeLoanValue = function () {
        $scope.article.loanValue = $("#loanValue").val();
        $scope.$apply();
    };

    $scope.changeLoanLife = function () {
        $scope.article.loanLife = $("#loanLife").val();
        $scope.$apply();
    };

    $scope.changeRateCap = function () {
        $scope.article.rateCap = $("#rateCap").val();
        $scope.$apply();
    };

    $scope.changeRateFloor = function () {
        $scope.article.rateFloor = $("#rateFloor").val();
        $scope.$apply();
    };

    $scope.init = function () {
    	
    	$scope.article = $rootScope.getSessionObject("article");
		
		if (!$scope.article) {
		    $scope.article = {};
		    $scope.article.license = {};
		} else {
			$rootScope.removeSessionObject("article");
		    if (!$scope.article.license) {
		    	$scope.article.license = {};
		    }
		}
    	
        if (!$scope.article.formToken) {
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
            return "reqName";
        }
    };

    $scope.setStyle_div2 = function (arg1, arg2) {
        if (arg1 && arg2) {
            return "setafter";
        } else {
            return "reqName";
        }
    };
    $scope.init();
    $scope.choose_classification = function () {
        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/classification/create");
    };

    $scope.next_step = function () {
        

        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/step2");
//      $scope.$apply();

    };

});

articleCtrl.controller('ArticleLicenseCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {

    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("article");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("article");
    } else {
        alert("error op");
        $location.path("/article/list");
    }


    

    $scope.changeRegTime = function () {
        $scope.license.regTime = $("#regTime").val();
        $scope.$apply();
    };

    $scope.init = function () {    	
    	$scope.license = $scope.article.license;
		if (!$scope.license) {
		    $scope.license = {}
		}
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
            return "reqName";
        }
    };


    $scope.choose_type = function () {
        $scope.article.license = $scope.license;
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/businessType/create");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/businessType/update");
        }

    };


    $scope.change_time = function () {
        $scope.license.regTime = $("#time").val();
    };

    $scope.sure = function () {
        $scope.article.license = $scope.license;
        if ($routeParams.op == "create") {
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/create/step1");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/update/step1/" + $scope.article.id);
        }
    };
});

articleCtrl.controller('ArticleStep2Ctrl', function ($http, $scope, $rootScope, $location, $routeParams) {


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
            return "reqName";
        }
    };

    $scope.check = function (name) {
        for (var i = 0; i < $scope.pledgeTypeList.length; i++) {
            // 计算表单的总价
            var obj = $scope.pledgeTypeList[i];
            if (obj.name == name) {
                if (obj.check) {
                    obj.check = false;
                } else {
                    obj.check = true;
                    $scope.article.pledgeType = obj.name;
                }
            } else {
                obj.check = false;
            }
        }
    };

    $scope.init = function () {
    	$scope.article = $rootScope.getSessionObject("article");
    	if(!$scope.article.pledgeImgs){
    		$scope.article.pledgeImgs = [];
    		$scope.article.pledgeImgNames = [];
    	}
    	if(!$scope.article.financialImgs){
    		$scope.article.financialImgs = [];
    		$scope.article.financialImgNames = [];
    	}
    	if(!$scope.article.advantagesImgs){
    		$scope.article.advantagesImgs = [];
    		$scope.article.advantagesImgNames = [];
    	}
    	$scope.check($scope.article.pledgeType);
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

                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情

                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
                            $scope.article.pledgeImgNames.push(file.name);
                            $scope.article.pledgeImgs.push(file_url);
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

                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情

                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
                            $scope.article.financialImgNames.push(file.name);
                            $scope.article.financialImgs.push(file_url);
                            $scope.$apply();
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            $rootScope.alert("财务信息上传失败！");
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

                        },
                        'UploadProgress': function (up, file) {
                            // 每个文件上传时,处理相关的事情

                        },
                        'FileUploaded': function (up, file, info) {
                            var res = $.parseJSON(info);

                            var file_url = "http://" + $rootScope.qiniu_bucket_domain + "/" + res.key;
                            $scope.article.advantagesImgNames.push(file.name);
                            $scope.article.advantagesImgs.push(file_url);
                            $scope.$apply();
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            $rootScope.alert("公司优势资料上传失败！");
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
        $scope.article.pledgeImgNames.splice(index, 1);
        $scope.article.pledgeImgs.splice(index, 1);
    };

    $scope.removeFinancialImg = function (index) {
        $scope.article.financialImgNames.splice(index, 1);
        $scope.article.financialImgs.splice(index, 1);
    };

    $scope.removeAdvantagesImg = function (index) {
        $scope.article.advantagesImgNames.splice(index, 1);
        $scope.article.advantagesImgs.splice(index, 1);
    };

    $scope.init();

    $scope.choose_credit = function () {
    	$scope.save_div();
        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/credit");
    };
    
    $scope.save_div = function(){
    	$scope.article.pledge = $("#pledge").text();
    	$scope.article.financialInfo = $("#financialInfo").text();
    	$scope.article.advantages = $("#advantages").text();
    };
    
    $scope.validate_params = function(){
    	var params = {
	        "id": $scope.article.id,
	        "userId": $rootScope.login_user.userId,
	        "token": $rootScope.login_user.token,
	        "formToken":$scope.article.formToken
	    };
	    
	    if (!isNullOrEmpty($scope.article.loanValue)) {
            params.loanValue = $scope.article.loanValue;
        }
        if (!isNullOrEmpty($scope.article.loanLife)) {
            params.loanLife = $scope.article.loanLife;
        }
        if (!isNullOrEmpty($scope.article.rateCap)) {
            params.rateCap = $scope.article.rateCap;
        }
        if (!isNullOrEmpty($scope.article.rateFloor)) {
            params.rateFloor = $scope.article.rateFloor;
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
            params.licenseImgNames = $scope.article.license.licenseImgNames;
        }
        if (!isNullOrEmpty($scope.article.license.corporateRepresentative)) {
            params.corporateRepresentative = $scope.article.license.corporateRepresentative;
        }
	    
	    $scope.save_div();
    	
        if (!isNullOrEmpty($scope.article.pledgeType)) {
            params.pledgeType = $scope.article.pledgeType;
        }
        if (!isNullOrEmpty($scope.article.pledge)) {        	
            params.pledge = $scope.article.pledge;
        }
        if (!isNullOrEmpty($scope.article.pledgeImgs)) {
            params.pledgeImgs = $scope.article.pledgeImgs.join(",");
            params.pledgeImgNames = $scope.article.pledgeImgNames.join(",");
        }
        if (!isNullOrEmpty($scope.article.financialInfo)) {
            params.financialInfo = $scope.article.financialInfo;
        }
        if (!isNullOrEmpty($scope.article.financialImgs)) {
            params.financialImgs = $scope.article.financialImgs.join(",");
            params.financialImgNames = $scope.article.financialImgNames.join(",");
        }
        if (!isNullOrEmpty($scope.article.continualOperateYear)) {
            params.continualOperateYear = $scope.article.continualOperateYear;
        }
        if (!isNullOrEmpty($scope.article.continualPublicYear)) {
            params.continualPublicYear = $scope.article.continualPublicYear;
        }
        if (!isNullOrEmpty($scope.article.businessContact)) {
            params.businessContact = $scope.article.businessContact;
        }
        if (!isNullOrEmpty($scope.article.corporateResidence)) {
            params.corporateResidence = $scope.article.corporateResidence;
        }
        if (!isNullOrEmpty($scope.article.advantages)) {
            params.advantages = $scope.article.advantages;
        }
        if (!isNullOrEmpty($scope.article.advantagesImgs)) {
            params.advantagesImgs = $scope.article.advantagesImgs.join(",");
            params.advantagesImgNames = $scope.article.advantagesImgNames.join(",");
        }
        return params;
    };

    $scope.save = function () {
	    var params = $scope.validate_params();
        $.post(api_uri + "api/article/save", params,
            function (data) {
                if (data.returnCode == 0) {
                    $rootScope.removeSessionObject("article");
                    $location.path("/article/show/"+data.result);
                    $scope.$apply();
                } else {
                    console.log(data);
                }
            },
            "json");
    };

    $scope.release = function () {
    	
    	var params = $scope.validate_params();
        console.log(params);
        $.post(api_uri + "api/article/save", params,
            function (data) {
                if (data.returnCode == 0) {
                    $rootScope.removeSessionObject("article");
 
                    $.get(api_uri + "api/article/release/"+data.result, $rootScope.login_user,
			            function (d) {
			                if (data.returnCode == 0) {		                    
			                    $location.path("/article/show/"+data.result);
			                    $scope.$apply();
			                } else {
			                	alert("发布失败,请完善必填项");
			                    console.log(d);
			                }
			            },
		            "json");
                } else {
                    console.log(data);
                }
            },
            "json");
    };
});

articleCtrl.controller('CreditCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {


    $scope.article = $rootScope.getSessionObject("article");
    
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
        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/step2");

    };
});

articleCtrl.controller('ClassificationCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("article");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("article");
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
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/create/step1");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/update/step1/" + $scope.article.id);
        }
    }
});

articleCtrl.controller('BusinessTypeCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
    if ($routeParams.op == "create") {
        $scope.article = $rootScope.getSessionObject("article");
    } else if ($routeParams.op == "update") {
        $scope.article = $rootScope.getSessionObject("article");
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
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/license/create");
        } else if ($routeParams.op == "update") {
            $rootScope.putSessionObject("article", $scope.article);
            $location.path("/article/license/update");
        }
    };
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
        $scope.article = $rootScope.getSessionObject("article");       
        
        if (!$scope.article) {
        	params.id = $routeParams.id
        	$http({
	            url: api_uri + "api/article/update",
	            method: "GET",
	            params: params
	        }).success(function (data) {
	            if (data.returnCode == 0) {
	                
                    $scope.article = data.result;
                    if($scope.article.licenseImg){
                    	$scope.article.license.licenseImgs = $scope.article.licenseImg;
                        $scope.article.license.licenseImgNames = $scope.article.licenseImgName;
                    }
                    
                    if($scope.article.financialImg){
		                $scope.article.financialImgs = $scope.article.financialImg;
		                $scope.article.financialImgNames = $scope.article.financialImgName;
                    }
                    
                    if($scope.article.pledgeImg){
                    	$scope.article.pledgeImgs = $scope.article.pledgeImg;
                        $scope.article.pledgeImgNames = $scope.article.pledgeImgName;
                    }
                    
                    if($scope.article.advantagesImg){
	                    $scope.article.advantagesImgs = $scope.article.advantagesImg;
	                    $scope.article.advantagesImgNames = $scope.article.advantagesImgName;
                    }
	            }
	            else {
	                console.log(data);
	            }
	
	        }).error(function (d) {
	            console.log("login error");
	        });   
        } else {
            $rootScope.removeSessionObject("article");
        }
        $("#treelist").aomuntmoney();

        $('#rate').daterate();//利率选择
        $('#term').dateterm();//期限选择
        $('#term,#rate').click(function () {
            $('body').css('overflow', 'hidden');
        });
    };

    $scope.changeLoanValue = function () {
        $scope.article.loanValue = $("#loanValue").val();
        $scope.$apply();
    };

    $scope.changeLoanLife = function () {
        $scope.article.loanLife = $("#loanLife").val();
        $scope.$apply();
    };

    $scope.changeRateCap = function () {
        $scope.article.rateCap = $("#rateCap").val();
        $scope.$apply();
    };

    $scope.changeRateFloor = function () {
        $scope.article.rateFloor = $("#rateFloor").val();
        $scope.$apply();
    };

    $scope.setStyle_div = function (args) {
        if (args) {
            return "setafter";
        } else {
            return "reqName";
        }
    };

    $scope.setStyle_div2 = function (arg1, arg2) {
        if (arg1 && arg2) {
            return "setafter";
        } else {
            return "reqName";
        }
    };
    $scope.init();
    $scope.choose_classification = function () {
        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/classification/update");
    };


    $scope.create_license = function () {
        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/license/update");
    };

    $scope.next_step = function () {
        

        $rootScope.putSessionObject("article", $scope.article);
        $location.path("/article/step2");
//      $scope.$apply();

    };

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
//              "lastTime": $rootScope.getObject("lt_" + $routeParams.id + "_" + $routeParams.userId)
                "lastTime": 0
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
//	    var promise = $interval(function(){
//			$scope.otherList();
//		},1000);
//		$scope.$on('$destroy',function(){
//			$interval.cancel(promise);
//		});
//		$timeout(function() {  
//            $scope.otherList();
//      }, 1000);
        $scope.otherList();
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
            if (d.returnCode == 0) {
                $scope.other_list = d.result;               
                if($scope.other_list && $scope.other_list.length >0){
		    		$rootScope.putObject("lt_"+$routeParams.id+"_"+$routeParams.userId,$scope.other_list[$scope.other_list.length-1].createTime);
		    	    for(var i=0;i<$scope.other_list.length;i++){
		    	    	$scope.message_list.push($scope.other_list[i]);
		    	    }
                }
            }
            else {
                console.log(d);
            }
            $scope.otherList();
        }).error(function (d) {
        	$scope.otherList();
            console.log(d);
        });
    };
    
    $scope.sendMessage = function(){
    	var content = $("#content").html();
        $("#content").html("");
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
                var _scroll =  $('.displayFrame')[0].scrollHeight;
                $('.displayFrame').animate({scrollTop:_scroll},500);
            }
            else {
            	console.log("发送失败");
                console.log(data);
            }
		  },
		"json");
		var contentObj = {
			"self":true,
			"comment":content
		};
        $scope.message_list.push(contentObj);        
    };

    $scope.init();

});
articleCtrl.controller('ArticleBidCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
     
     $scope.init= function(){ 
     	$scope.title = "提示";
		$scope.content = "申请中,请稍后......";
     	$scope.return_url = "/article/show/"+$routeParams.id;
     	$http({
            url: api_uri+"api/articleUser/bid/"+$routeParams.id,
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.title = "已竞标";
				$scope.content = "竞标申请成功,等待项目方确认";
            }else {
            	$scope.title = "已竞标";
				$scope.content = d.result;
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });    	
     };
     $scope.init();
     $scope.sure = function(){
     	$location.path($scope.return_url);
     };  
});

articleCtrl.controller('ArticleMobileCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
     
     $scope.init= function(){ 
     	$http({
            url: api_uri+"api/article/mobile/"+$routeParams.id,
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.linkman = d.result;				
            }else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });
     };
     $scope.init();
     $scope.sure = function(){
     	//
     };  
});

articleCtrl.controller('ArticleBankCtrl', function ($http, $scope, $rootScope, $location, $routeParams) {
     
     $scope.init= function(){ 
     	$http({
            url: api_uri+"api/article/bank/"+$routeParams.id,
            method: "GET",
            params: $rootScope.login_user
        }).success(function (d) {
            console.log(d);
            if (d.returnCode == 0) {
                $scope.bank_list = d.result;				
            }else {
                console.log(d);
            }
        }).error(function (d) {
            console.log(d);
        });
     };
     $scope.init();
     $scope.sure = function(){
     	//
     };  
});

