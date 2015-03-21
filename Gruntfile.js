'use strict';

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    env : {
      tests : {
        PORT : 5456,
        LOGGER_LEVEL : 40
      },
      dev : {
        PORT : 5455
      }
    },
    mochaTest : {
      app : {
        options : {
          reporter : 'spec'
        },
        src : ['tests/index.js']
      },
      'travis-cov' : {
        options : {
          reporter : 'travis-cov'
        },
        src : ['tests/index.js']
      }
    },
    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      gruntfile : {
        src : 'Gruntfile.js'
      },
      app : {
        src : ['app/**/*.js']
      },
      tests : {
        src : ['tests/**/*.js']
      },
    },
    watch : {
      gruntfile : {
        files : '<%= jshint.gruntfile.src %>',
        tasks : ['jshint:gruntfile']
      },
      app : {
        files : '<%= jshint.app.src %>',
        tasks : ['test']
      },
      tests : {
        files : '<%= jshint.tests.src %>',
        tasks : ['test']
      },
    },
    concurrent : {
      dev : {
        tasks : ['nodemon', 'node-inspector'],
        options : {
          logConcurrentOutput : true
        }
      }
    },
    nodemon : {
      dev : {
        script : 'index.js',
        options : {
          nodeArgs : ['--debug']
        }
      }
    },
    'node-inspector' : {
      dev : {
        options : {
          'web-port' : 8181
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('dev', ['env:dev', 'concurrent:dev']);
  grunt.registerTask('test', ['jshint', 'env:tests', 'mochaTest']);

};
