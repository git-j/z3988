'use strict';

module.exports = function (grunt) {

grunt.initConfig({
  browserify: {
    all: {
      src: 'Z3988.js',
      dest: 'z3988-web.js',
      options: {
        transform: ['debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
      },
    },
  },
});
grunt.loadNpmTasks('grunt-browserify');

};