module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: [
                        //'framework/jquery/jquery-1.9.1.js',
                        //'framework/angular-1.3.0.14/angular.min.js',
                        //'framework/angular-1.3.0.14/angular-animate.min.js',
                        //'framework/angular-1.3.0.14/angular-route.min.js',
                        //'framework/ajaxfileupload.js',
                        //'js/iscroll.js',
                        //'js/date.js',
                        //'js/daterate.js',
                        //'js/dateterm.js',
                        //'js/common.js',
                        //'framework/moment/moment.js',
                        //'framework/qiniu/qiniu.js',
                        //'framework/plupload/plupload.full.min.js',
                        //'js/mobiscroll.2.13.2.js',
                        //'js/mobiscroll.list.js',
                        //'js/moneyamount.js',
                        //'js/security/core.js',
                        //'js/security/tripledes3.js',
                        //'js/security/mode-ecb.js',
                    'js/controller/login.js',
                    'js/controller/register.js',
                    'js/controller/article.js',
                    'js/controller/user.js',
                    'js/controller/add_card.js',
                    'js/app.js',
                    'js/route.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            },
            css: {

                src: [
                    //'css/viprelease.css',
                    //'css/article.css',
                    //'css/register.css',
                    //'css/user.css',
                    //'css/found.css',
                    //'css/invest_projects.css',
                    //'css/mobiscroll.2.13.2.css',
                    'dist/zrh-app.123.0.0.4.css'
                ],
                dest: 'dist/<%= pkg.name %>.1234.<%= pkg.version %>.css'
            }
        },
        cssmin: {
            css: {
                src:'dist/<%= pkg.name %>.1234.<%= pkg.version %>.css',
                dest:'dist/<%= pkg.name %>.min.<%= pkg.version %>.css'
            }
        },
        uglify: {
            options: {
                mangle: false, //不混淆变量名
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.<%= pkg.version %>.js': ['<%= concat.js.dest %>']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');

    //grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', [ 'concat','uglify','cssmin']);
};