var path = require('path')
  , glob = require('glob')

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      vendor: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js'
        ],
        dest: 'public/scripts/vendor.js'
      },
      scripts: {
        src:  'assets/scripts/*.js',
        dest: 'public/scripts/app.js'
      }
    },
    jade: {
      index: {
        files: {
          'public/index.html': 'assets/views/index.jade'
        }
      },
      views: {
        files: glob.sync('assets/views/*/**/*.jade').reduce(function (files, file) {
          files[file.replace('assets', 'public').replace('jade', 'html')] = file
          return files
        }, {})
      }
    },
    less: {
      app: {
        files: {
          'public/styles/app.css': 'assets/styles/app.less'
        }
      }
    },
    watch: {
      scripts: {
        files: 'assets/scripts/*.js',
        tasks: 'concat:scripts'
      },
      jade: {
        files: 'assets/views/**/*.jade',
        tasks: 'jade'
      },
      less: {
        files: 'assets/styles/**/*.less',
        tasks: 'less'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['concat', 'jade', 'less'])
}