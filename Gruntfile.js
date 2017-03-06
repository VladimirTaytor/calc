/*global module*/
module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        blanket_mocha : {
            test: {
                src: ['test/testRunner.html'],
                options : {
                    threshold : 60,
                    globalThreshold : 65,
                    log : true,
                    logErrors: true,
                    moduleThreshold : 60,
                    modulePattern : "./src/(.*?)/"
                }
            }
        },

        karma : {
            unit: {
                options: {
                    frameworks: ['mocha'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        // These files are probably going to be included in
                        // all our tests that we'd write. The files object in
                        // each individual karma target are added to these.
                        'node_modules/chai/chai.js',
                        'node_modules/mocha/mocha.js',
                        'lib/jquery.js',

                        // In our case, the test and src files are the
                        // same for the dev and prod targets so we can include
                        // them in the global files option here
                        'js/calculator.js',
                        'test/test.js',

                        'test/testRunner.html'
                    ],
                    preprocessors: {
                        'test/*.html': ['html2js'],
                        'js/*.js': ['coverage']
                    },
                    reporters: ['progress', 'coverage'],

                    coverageReporter: {
                        dir: 'test/coverage',
                        // Force the use of the Istanbul instrumenter to cover files
                        instrumenter: {
                            'js/*.js': ['istanbul']
                        },
                        reporters: [
                            // reporters not supporting the `file` property
                            //{ type: 'html', subdir: 'report-html' },
                            //{ type: 'lcov', subdir: 'report-lcov' },
                            // reporters supporting the `file` property, use `subdir` to directly
                            // output them in the `dir` directory
                            { type: 'lcovonly', subdir: '.', file: 'lcov.info' }
                        ]
                    }
                }

            }

           /* options: {
                // Configuration options that tell Karma how to run
                configFile: 'karma.conf.js',
                files: [
                    // These files are probably going to be included in
                    // all our tests that we'd write. The files object in
                    // each individual karma target are added to these.
                    'node_modules/chai/chai.js',
                    'node_modules/mocha/mocha.js',
                    'lib/jquery.js"',

                    // In our case, the test and src files are the
                    // same for the dev and prod targets so we can include
                    // them in the global files option here
                    'js/calculator.js',
                    'test/test.js',

                    // html2js preprocessor takes this file and converts it
                    // to a string in our JS when the tests run.
                    'test/testRunner.html'
                ]
            },

            dev: {
                singleRun: true,
                browsers: ['PhantomJS']
            }*/
        }
    });

    // Loading dependencies
    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) {
            console.log(key);
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('coverage', ['blanket_mocha']);
    grunt.registerTask('default', ['karma']);
    //grunt.registerTask('test', ['karma']);
};