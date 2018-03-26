const path = require('path');
const loadGruntTasks = require('load-grunt-tasks');
const autoprefixer = require('autoprefixer');

module.exports = (grunt) => {
  loadGruntTasks(grunt);

  grunt.initConfig({
    eslint: {
      target: ['**/*.es6.js'],
      options: {
        rules: {
          'no-mutable-exports': 'off',
        },
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env'],
      },
      scripts: {
        files: [
          {
            expand: true,
            src: ['**/*.es6.js', '!node_modules/**/*'],
            dest: '',
            ext: '.js',
            extDot: 'first',
          },
        ],
      },
    },


    sass: {
      options: {
        sourceMap: true,
      },
      styles: {
        files: [
          {
            expand: true,
            src: ['**/*.scss', '!**/_*.scss', '!node_modules/**/*'],
            dest: '',
            ext: '.precss',
          },
        ],
      },
    },
    postcss: {
      options: {
        map: {
          inline: false,
        },

        processors: [
          autoprefixer({
            browsers: 'last 2 versions',
          }),
        ],
      },
      styles: {
        files: [
          {
            expand: true,
            src: ['**/*.precss', '!node_modules/**/*'],
            dest: '',
            ext: '.css',
          },
        ],
      },
    },
    clean: {
      precss: ['**/*.precss{,.map}', '**/_*.css{,.map}', '!node_modules/**/*'],
    },


    browserSync: {
      // see https://browsersync.io/docs/options
      options: {
        open: false,
        watchTask: true,
        proxy: 'irata.loc/themes/custom/craftsman',
      },
      dev: {
        bsFiles: {
          src: [
            '**/*.{css,js}',
            '!**/*.es6.js',
            '!Gruntfile.js',
            '!node_modules/**/*',
          ],
        },
      },
    },


    chokidar: {
      options: {
        spawn: false,
      },

      scripts: {
        files: ['**/*.es6.js', '!node_modules**/*'],
        tasks: ['eslint', 'babel'],
      },

      styles: {
        files: [
          '**/*.scss',
          // '!**/_*.scss',
          '!node_modules**/*',
        ],
        tasks: ['sass', 'postcss', 'clean:precss'],
      },

      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true,
        },
      },
    },
  });

  const changeExt = (filepath, find, replace = '') => filepath.replace(find, replace);

  // this event listener is aimed to rebuild as few files as possible
  grunt.event.on('chokidar', (action, filepath, target) => {
    grunt.log.writeln(`${target}: ${filepath} has ${action}`);
    const ext = filepath.split('.').slice(1).join('.');

    if (ext === 'es6.js') {
      grunt.config('eslint.scripts.target', filepath);
      grunt.config('babel.scripts', {
        src: filepath,
        dest: changeExt(filepath, '.es6'),
      });
    }
    // scss import files (name starting with "_") should trigger the rebuild of all CSS
    else if (ext === 'scss' && path.basename(filepath)[0] !== '_') {
      grunt.config('sass.styles', {
        src: filepath,
        dest: changeExt(filepath, '.scss', '.precss'),
      });
      grunt.config('postcss.styles', {
        src: changeExt(filepath, '.css', '.precss'),
        dest: changeExt(filepath, '.scss', '.css'),
      });
      // The clean task can be left as-is
    }
  });

  // for full build
  grunt.registerTask('build', ['eslint', 'babel', 'sass', 'postcss', 'clean']);

  // for development
  grunt.registerTask('serve', ['browserSync', 'chokidar']);

  grunt.registerTask('default', ['serve']);
};
