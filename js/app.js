/**
 * Created by jiangzhuang on 5/5/16.
 */

api_uri = "http://127.0.0.1:8080/";
templates_root = "/zrh-app/templates/";
deskey = "abc123.*abc123.*abc123.*abc123.*";

var myApp = angular.module('myApp', [
    'ng','ngRoute','ngAnimate','loginCtrl','registerCtrl','articleCtrl'
], function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

});


myApp.run(['$location', '$rootScope', '$http',
    function ($location, $rootScope, $http) {

        // 页面跳转后
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            var present_route = $location.$$path; //获取当前路由

        });

        /*********************************** 全局方法区 e***************************************/
            // 对象存储
        $rootScope.putObject = function (key, value) {
            localStorage.setItem(key, angular.toJson(value));
        };
        $rootScope.getObject = function (key) {
            return angular.fromJson(localStorage.getItem(key))
        };
        
        $rootScope.putSessionObject = function (key, value) {
        	sessionStorage.setItem(key, angular.toJson(value));
        };
        $rootScope.getSessionObject = function (key) {
            return angular.fromJson(sessionStorage.getItem(key))
        };
        //加密 3des
        $rootScope.encryptByDES = function(message) {        
            var keyHex = CryptoJS.enc.Utf8.parse(deskey);  
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {    
            mode: CryptoJS.mode.ECB,    
            padding: CryptoJS.pad.Pkcs7    
            });   
            return encrypted.toString();    
        }  
        //解密 
        $rootScope.decryptByDES = function(ciphertext) {    
            var keyHex = CryptoJS.enc.Utf8.parse(deskey);    
             
            // direct decrypt ciphertext  
            var decrypted = CryptoJS.DES.decrypt({    
                ciphertext: CryptoJS.enc.Base64.parse(ciphertext)    
            }, keyHex, {    
                mode: CryptoJS.mode.ECB,    
                padding: CryptoJS.pad.Pkcs7    
            });    
             
            return decrypted.toString(CryptoJS.enc.Utf8);    
        }   

        $rootScope.close_alert = function () {
            $rootScope.alert_show = null;
        };
        $rootScope.alert = function (data) {
            $rootScope.alert_show = true;
            if (data) {
                $rootScope.alert_str = data;
                setTimeout(function () {
                    $rootScope.alert_show = null;
                    $rootScope.$apply();
                }, 3000);
            } else {
                $rootScope.alert_str = "未知错误";
            }
        };

//      $rootScope.check_user = function () {
//          $rootScope.admin_info = $rootScope.getObject("user_info");
//          //console.log($rootScope.admin_info);
//          if ($rootScope.user_info) {
//              return $rootScope.user_info.id;
//          } else {
//              return false;
//          }
//      };


        if (!window.localStorage) {
            alert('This browser does NOT support localStorage');
        }
//      if (!$rootScope.check_user()) {
//          $location.path("/login");
//      }


    }]);