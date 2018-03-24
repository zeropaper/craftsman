/* eslint-disable */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      target: ['**/*.es6.js'],
      options: {
        rules: {
          'no-mutable-exports': 'off'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      scripts: {
        files: [
          {
            expand: true,
            src: ['**/*.es6.js', '!node_modules/**/*'],
            dest: '',
            ext: '.js',
            extDot: 'first'
          }
        ]
      },
    },

    sass: {
      options: {
        sourceMap: true
      },
      styles: {
        files: [
          {
            expand: true,
            src: ['**/*.scss', '!node_modules/**/*'],
            dest: '',
            ext: '.precss',
            // extDot: 'first'
          }
        ]
      }
    },
    postcss: {
      options: {
        // map: true, // inline sourcemaps

        // or
        map: {
          inline: false, // save all sourcemaps as separate files...
          // annotation: '/' // ...to the specified directory
        },

        processors: [
          require('autoprefixer')({
            browsers: 'last 2 versions',
          }), // add vendor prefixes
        ]
      },
      styles: {
        files: [
          {
            expand: true,
            src: ['**/*.precss', '!node_modules/**/*'],
            dest: '',
            ext: '.css',
            // extDot: 'first'
          }
        ]
      }
    },

    browserSync: {
      options: {
        watchTask: true,
        proxy: 'irata.loc/themes/custom/craftsman',
      },
      dev: {
        bsFiles: {
          src: [
            '**/*.{css,js}',
            '!**/*.es6.js',
            '!node_modules/**/*'
          ]
        }
      }
    },

    chokidar: {
      scripts: {
        files: ['**/*.es6.js'],
        tasks: ['eslint', 'babel'],
      },

      styles: {
        files: ['**/*.scss', '!**/_*.scss'],
        tasks: ['sass', 'postcss'],
      },

      // templates: {

      // },
    },
  });

  grunt.registerTask('default', ['browserSync', 'chokidar']);
};
