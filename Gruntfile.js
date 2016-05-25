module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            /*js: {
                src: ['src/users.js',
                        'src/index.js',
                        'src/nodejs-grunt.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },*/
            css: {
                src: [
                    'css/viprelease.css',
                    'css/vipuser.css',
                    'css/view.css',
                    'css/register.css',
                    'css/upload.css',
                    'css/user.css',
                    'css/common.css',
                    'css/mobiscroll.2.13.2.css',
                    'css/found.css',
                    'css/invest_projects.css',
                    'css/me.min.css'
                ],
                dest: 'dist/<%= pkg.name %>.min.css'
            }
        },
        cssmin: {
            css: {
                src:'dist/all.css',
                dest:'dist/all-min.css'
            }
        }
        /*uglify: {
            options: {
                banner: '/!*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> *!/\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }*/
    });
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    /*grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');

    //grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', [ 'concat','cssmin']);
};