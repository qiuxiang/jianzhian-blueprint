var path = require('path')
  , glob = require('glob')

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: 'bower_components/bootstrap/fonts/*',
        dest: 'dist/fonts/'
      }
    },
    concat: {
      vendor: {
        src: [
          'bower_components/lodash/dist/lodash.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js'
        ],
        dest: 'dist/scripts/vendor.js'
      },
      scripts: {
        src:  'src/scripts/*.js',
        dest: 'dist/scripts/app.js'
      }
    },
    jade: {
      index: {
        files: {
          'dist/index.html': 'src/views/index.jade'
        }
      },
      views: {
        files: glob.sync('src/views/*/**/*.jade').reduce(function (files, file) {
          files[file.replace('src', 'dist').replace('jade', 'html')] = file
          return files
        }, {})
      }
    },
    less: {
      app: {
        files: {
          'dist/styles/app.css': 'src/styles/app.less'
        }
      }
    },
    uglify: {
      app: {
        files: {
          'dist/scripts/app.js': 'dist/scripts/app.js'
        }
      },
      vendor: {
        files: {
          'dist/scripts/vendor.js': 'dist/scripts/vendor.js'
        }
      }
    },
    cssmin: {
      css: {
        files: {
          'dist/styles/app.css': 'dist/styles/app.css'
        }
      }
    },
    watch: {
      scripts: {
        files: 'src/scripts/*.js',
        tasks: 'concat:scripts'
      },
      jade: {
        files: 'src/views/**/*.jade',
        tasks: 'jade'
      },
      less: {
        files: 'src/styles/**/*.less',
        tasks: 'less'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('build', ['copy', 'concat', 'jade', 'less'])
  grunt.registerTask('compress', ['uglify', 'cssmin'])
  grunt.registerTask('default', ['build', 'compress'])
}
