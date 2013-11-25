/*
 * url-finder
 * https://github.com/gaoht/url-finder
 *
 * Copyright (c) 2013 gaoht
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        // Configuration to be run (and then tested).
        clean: {
            test: ['tmp']
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },
        // Configuration to be run (and then tested).
        url_finder: {
            options: {
                paths: [
                    {
                        pattern: /toReplace/i,
                        replaceWith: "replacedWith"
                    }
                ]
            },
            css: {
                src: ['test/fixtures/css.css'],
                dest: 'tmp/css.css'
            },
			js: {
				src: ['test/fixtures/js.js'],
                dest: 'tmp/js.js'
			},
            html: {
                options: {
                    paths: [
                        {
                            pattern: /toReplace/i,
                            replaceWith: "replacedWith"
                        }
                    ]
                },
                src: ['test/fixtures/html.html'],
                dest: 'tmp/html.html'
            },
            regx: {
                options: {
                    paths: [
                        {
                            pattern: /test/i,
                            replaceWith: "firstTestReplaced"
                        }
                    ]
                },
                src: ['test/fixtures/html.html'],
                dest: 'tmp/html_test.html'
            },
            directory: {
                src: ['test/fixtures/*.*'],
                dest: 'tmp/'
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'url_finder', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
