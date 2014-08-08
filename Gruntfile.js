module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      scripts: {
        flatten: true,
        expand: true,
        src: 'assets/scripts/*.js',
        dest: 'public/scripts/'
      }
    },
    concat: {
      vendor: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/Snap.svg/dist/snap.svg.js'
        ],
        dest: 'public/scripts/vendor.js'
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
        tasks: 'copy:scripts'
      },
      less: {
        files: 'assets/styles/*.less',
        tasks: 'less'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['copy', 'concat', 'less'])
}