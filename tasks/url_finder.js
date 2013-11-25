/*
 * url-finder
 * https://github.com/gaoht/url-finder
 *
 * Copyright (c) 2013 gaoht
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    function handleCSS (source, paths) {
        var replaceFunc = replace(paths);
        return source.replace(/(url\s*\(\s*['"]?\s*)([\w\-\/\.:]+)(\s*['"]?\s*\))/g, replaceFunc);
    }
    function handleJS (source, paths) {
        var replaceFunc = replace(paths);
        return source
            .replace(/(href\s*=\s*\\?["']\s*)([\w\-\/\.:]+)(\s*\\?["'])/g, replaceFunc)
            .replace(/(src\s*=\s*\\?["']\s*)([\w\-\/\.:]+)(\s*\\?["'])/g, replaceFunc);
    }
    function handleHTML (source, paths) {
        var replaceFunc = replace(paths);
        return source
            .replace(/(href\s*=\s*["']\s*)([\w\-\/\.:]+)(\s*["'])/g, replaceFunc)
            .replace(/(src\s*=\s*["']\s*)([\w\-\/\.:]+)(\s*["'])/g, replaceFunc);
    }
    function replace(paths){
        return function(str, prefix, path, suffix){
            var regx;
            for(var i=0; i<paths.length; i++){
                if(paths[i].pattern && paths[i].replaceWith){
                    regx = new RegExp(paths[i].pattern);
                    if(regx.test(path)){
                        return prefix + path.replace(regx, paths[i].replaceWith) + suffix;
                    }
                }
                return prefix + path + suffix;
            }
        };
    }
    var path = require('path');
    grunt.registerMultiTask('url_finder', 'HTML and CSS path scanner, to find and replace the URL path in HTML and CSS file', function () {
        var options = this.options({
            paths: []
        });
        this.files.forEach(function (f) {
                f.src.filter(function (filepath) {
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function (filepath) {
                        var destFile, extension = path.extname(filepath), filter, content,
                            isExpandedPair = f.orig.expand || false;
                        switch (extension) {
                            case '.css': filter = handleCSS; break;
                            case '.html': filter = handleHTML; break;
                            case '.js': filter = handleJS; break;
                            default: grunt.warn('Unsupported extension '+ filepath); return;
                        }
                        // Read file source.
                        content = grunt.file.read(filepath);
                        content = filter(content, options.paths);
                        if(!f.dest){
                            destFile = filepath;
                        }else if (detectDestType(f.dest) === 'directory') {
                            destFile = (isExpandedPair) ? f.dest : unixifyPath(path.join(f.dest, filepath));
                        }else {
                            destFile = f.dest;
                        }
                        grunt.file.write(destFile, content);
                        // Print a success message.
                        grunt.log.writeln('File "' + destFile + '" created.');
                    });
            }
        );
    });
    var detectDestType = function(dest) {
        if (grunt.util._.endsWith(dest, '/')) {
            return 'directory';
        } else {
            return 'file';
        }
    };
    var unixifyPath = function(filepath) {
        if (process.platform === 'win32') {
            return filepath.replace(/\\/g, '/');
        } else {
            return filepath;
        }
    };
};
