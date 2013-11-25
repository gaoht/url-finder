'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var assertFileContentsEqual = function(test, actualFile, expectedFile, message) {
    var actual = grunt.file.read(actualFile);
    var expected = grunt.util.normalizelf(grunt.file.read(expectedFile));
    test.equal(actual, expected, message);
};

exports.url_finder = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  html: function(test) {
    test.expect(1);
    assertFileContentsEqual(test, 'tmp/html.html',
          'test/expected/html.html',
          'expected all matched url paths replaced with the specified one');
    test.done();
  },
  css: function(test) {
      test.expect(1);
      assertFileContentsEqual(test, 'tmp/css.css',
          'test/expected/css.css',
          'expected all matched url paths replaced with the specified one');
      test.done();
  },
  regx: function(test){
      test.expect(1);
      assertFileContentsEqual(test, 'tmp/html_test.html',
          'test/expected/html_test.html',
          'expected all matched url paths replaced with the specified one');
      test.done();
  },
  js: function(test){
      test.expect(1);
      assertFileContentsEqual(test, 'tmp/js.js',
          'test/expected/js.js',
          'expected all matched url paths replaced with the specified one');
      test.done();
  }
};
