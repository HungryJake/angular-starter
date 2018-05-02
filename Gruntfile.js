module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-open');

    // predefined constants
    var app_files = {
        js: ['src/app.js', 'src/**/*.js'],
        html: ['src/index.html'],
        tpl: ['src/**/*.html']
    };

    var dependencies = {
        js: [
            // 'node_modules/jquery/dist/jquery.js',
            // 'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-animate/angular-animate.js'
        ],
        css: [
            'node_modules/angular/angular-csp.css',
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.css'
        ]
    };

    var taskConfig = {

        dependencies: dependencies,

        app_files: app_files,

        open: {
            firefox: {
                path: 'http://localhost:9090',
                app: 'firefox'
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    //keepalive: true,
                    base: 'public',
                    port: 9090
                }
            }
        },

        clean: [
            'public/'
        ],

        copy: {

            build_vendor_js: {
                files: [{
                    src: '<%= dependencies.js %>',
                    dest: 'public/',
                    cwd: '.',
                    expand: true
                }]
            },

            build_vendor_css: {
                files: [{
                    src: '<%= dependencies.css %>',
                    dest: 'public/',
                    cwd: '.',
                    expand: true
                }]
            },

            build_src_js: {
                files: [{
                    src: '<%= app_files.js %>',
                    dest: 'public/',
                    cwd: '.',
                    expand: true
                }]
            },

            build_assets: {
                files: [{
                    src: ['assets/**/*.*'],
                    dest: 'public/',
                    cwd: '.',
                    expand: true
                }]
            }

        },

        uglify: {
            compile: {
                options: {
                    mangle: false
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        less: {
            compile: {
                files: {
                    'public/styles.css': 'src/less/**/*.less'
                }
            },
            options: {
                cleancss: true,
                compress: false
            }
        },

        concat: {
            compile_css: {
                src: [
                    '<%= dependencies.css %>',
                    'public/styles.css'
                ],
                dest: 'public/compressed/styles-min.css'
            },
            compile_js: {
                src: [
                    '<%= dependencies.js %>',
                    '<%= html2js.app.dest %>',
                    ['public/src/app.js', 'public/src/**/*.js']
                ],
                dest: 'public/compressed/scripts-min.js'
            }
        },

        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                es5: true
            },
            globals: {
                'angular': false
            }
        },

        html2js: {
            app: {
                options: {
                    base: 'src',
                    module: 'templates-app'
                },
                src: ['<%= app_files.tpl %>'],
                dest: 'public/templates-app.js'
            }
        },

        watch: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['jshint:src', 'copy:build_src_js', 'concat:compile_js']
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*.*'
                ],
                tasks: ['copy:build_assets']
            },

            tpls: {
                files: [
                    '<%= app_files.tpl %>'
                ],
                tasks: ['html2js', 'concat:compile_js']
            },

            less: {
                files: ['src/**/*.less'],
                tasks: ['less:compile']
            },

            index: {
                files: ['index.html'],
                tasks: ['index:build_dev']
            }
        },

        index: {
            build_dev: {
                dir: 'public',
                src: [
                    '<%= dependencies.js %>',
                    '<%= app_files.js %>',
                    'public/templates-app.js',
                    'public/**/*.css',
                    'public/styles.css'
                ]
            },
            compile: {
                dir: 'public',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= concat.compile_css.dest %>'
                ]
            }
        }
    };

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var dirRE = new RegExp('^public\/');

        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles
                    }
                });
            }
        });
    });

    grunt.registerTask('compile', [
        'concat:compile_css',
        'concat:compile_js',
        'uglify'
    ]);

    grunt.initConfig(taskConfig);

    grunt.registerTask('build_dev',
        [
            'clean',
            'html2js',
            'jshint',
            'copy:build_vendor_js',
            'copy:build_vendor_css',
            'copy:build_src_js',
            'copy:build_assets',
            'less:compile',
            'index:build_dev'
        ]
    );

    grunt.registerTask('build_test',
        [
            'clean',
            'html2js',
            'jshint',
            'copy:build_vendor_js',
            'copy:build_vendor_css',
            'copy:build_src_js',
            'copy:build_assets',
            'less:compile',
            'compile',
            'index:compile'
        ]
    );

    grunt.registerTask('dev', ['build_dev', 'connect:server', 'watch']);
    grunt.registerTask('test', ['build_test', 'connect:server', 'watch']);
};
