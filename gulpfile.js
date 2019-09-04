// https://medium.com/@dzhurovivan/es6-development-environment-made-easy-with-babel-gulp-and-webpack-a4017bd96c30

var gulp = require('gulp');

//utility
var del = require('del');
var rename = require("gulp-rename");
var browsersync = require("browser-sync").create();
var util = require('gulp-util');
let webpack = require('webpack-stream');

//html
var pug = require('gulp-pug');

// imgs
var newer = require("gulp-newer");
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
var imageminGiflossy = require('imagemin-giflossy');

// css
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

//js
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// import source from 'vinyl-source-stream'

var env = util.env.env || 'development';
console.log(util)
console.log('===== using '+ env + ' mode =====');

var DIST = './build';

var PATHS = {
  
  PUG_SRC:    ['./src/**/*.pug', '!./src/**/_*.pug', '!./src/layouts/**/*.*'],
  PUG_DIST:   DIST,
  PUG_WATCH:  './src/**/*.pug',

  SASS_SRC:   ['./src/**/*.scss', '!./src/**/_*.scss', '!./src/sass/bootstrap/**/*.*'],
  SASS_DIST:  DIST,
  SASS_WATCH: './src/**/*.scss',

  CSS_SRC:    './src/**/*.css',
  CSS_DIST:   DIST,
  CSS_WATCH:  './src/**/*.css',


  IMGS_SRC:   './src/**/*.{png,jpg,svg,jpeg}',
  IMGS_DIST:  DIST,
  IMGS_WATCH: './src/**/*.{png,jpg,svg,jpeg}',

  // IMGS_SRC:   ['./src/**/*.{png,gif,jpg,svg,jpeg}', '!./src/pdf/imgs/*.*'],
  // IMGS_DIST:  DIST,
  // IMGS_WATCH: ['./src/**/*.{png,gif,jpg,svg,jpeg}', '!./src/pdf/imgs/*.*'],


  PNGS_SRC:   './src/**/*.png',
  PNGS_DIST:  DIST,
  PNGS_WATCH: './src/**/*.png',

  JS_SRC:     ['./src/**/*.js', '!./src/**/*.babel.js'],
  JS_DIST:    DIST,
  JS_WATCH:   ['./src/**/*.js', '!./src/**/*.babel.js'],

  JS_BABEL_SRC:     './src/**/*.babel.js',
  JS_BABEL_DIST:    DIST,
  JS_BABEL_WATCH:   './src/**/*.babel.js',

  WP_SRC:     './src/assets/js/**/*.js',
  WP_DIST:    DIST,
  WP_WATCH:   './src/assets/js/**/*.js',

  CP_SRC:     ['./src/**/*.*', '!./src/**/*.{pug,scss,css,png,jpg,svg,jpeg}', '!./src/assets/js/**/*.*'],
  CP_DIST:    DIST,
  CP_WATCH:   ['./src/**/*.*', '!./src/**/*.{pug,scss,css,png,jpg,svg,jpeg,js}', '!./src/assets/js/**/*.*'],

  // CP_SRC:     ['./src/**/*.*', '!./src/**/*.{pug,scss,css,png,gif,jpg,svg,jpeg,js}', './src/pdf/imgs/*.*'],
  // CP_DIST:    DIST,
  // CP_WATCH:   ['./src/**/*.*', '!./src/**/*.{pug,scss,css,png,gif,jpg,svg,jpeg,js}', './src/pdf/imgs/*.*']


}

var run = {
  default: {
    js: {
      uglify: false
    },
    css: {
      cssnano: false
    },
    imgs: {
      imagemin: false
    }
  },
  development: {
    js: {
      uglify: false
    },
    css: {
      cssnano: false
    },
    imgs: {
      imagemin: false
    }
  },
  production: {
    js: {
      uglify: true
    },
    css: {
      cssnano: true
    },
    imgs: {
      imagemin: true
    }
  }
}



var runOpts = env ?  run[env] : run.default

function clean() {
  return del([DIST]);
}

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: DIST
    },
    port: 3000
  });
  if (done){
    done();
  } 
}

function browserSyncReload(done) {
  browsersync.reload();
}

function cpFiles() {
  return gulp
    .src(PATHS.CP_SRC)
    .pipe(gulp.dest(PATHS.CP_DIST))
}

function compileImages() {
  return gulp
    .src(PATHS.IMGS_SRC)
    .pipe(newer(PATHS.IMGS_DIST))
    .pipe(
      // runOpts.imgs.imagemin ?
      // cache(
        imagemin(
          [
            //png
            imageminPngquant({
              speed: 3,
              quality: [0.75, 0.85] //lossy settings
            }),
            imageminZopfli({
              more: true
              // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //   interlaced: true,
            //   optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
              optimizationLevel: 3,
              optimize: 3, //keep-empty: Preserve empty transparent frames
              lossy: 2
            }),
            //svg
            imagemin.svgo({
              plugins: [{
                  removeViewBox: false
              }]
            }),
            //jpg lossless
            imagemin.jpegtran({
              progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
              quality: 90
            })
          ], { verbose: true }
        )
      // )
      // :
      // util.noop()
    )
    .pipe(gulp.dest(PATHS.IMGS_DIST));
}



function compilePug() {
  return gulp
    .src(PATHS.PUG_SRC)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(PATHS.PUG_DIST))
    .pipe(browsersync.stream());
}

function compileJS() {
  return gulp
    .src(PATHS.JS_SRC)
    .pipe(sourcemaps.init())
    .pipe(runOpts.js.uglify ? uglify() : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.JS_DIST))
    .pipe(browsersync.stream());
}

function compileBabelJS() {
  return gulp
    .src(PATHS.JS_BABEL_SRC)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
      browserify({
        // insertGlobals : false,
        debug : runOpts.js.uglify,
        transform: [babelify.configure({
          presets: ['@babel/env']
        })]
      })
    )
    // .pipe(source(PATHS.JS_BABEL_SRC))
    // .pipe(buffer())
    
    // .pipe(babel({
    //   presets: ['@babel/env'],
    //   compact: false,
    // }))
    .pipe(runOpts.js.uglify ? uglify() : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('.babel', '')
    }))
    .pipe(gulp.dest(PATHS.JS_BABEL_DIST))
    .pipe(browsersync.stream());
}

function webpackTask() {
  return gulp
    .src(DIST)
    .pipe(webpack( env==='development' ? require('./webpack.dev.js') : require('./webpack.prod.js') , require("webpack")))
    .pipe(gulp.dest(DIST+ '/assets/js'))
    .pipe(browsersync.stream());
    
    // .pipe(gulp.dest('./build/assets/js'));
}

function compileSass () {
  return gulp
    .src(PATHS.SASS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(runOpts.css.cssnano ? cssnano({
      reduceIdents: false
    }) : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path){
      path.dirname = path.dirname.replace('scss', 'css')
      path.dirname = path.dirname.replace('sass', 'css')
    }))
    .pipe(gulp.dest(PATHS.SASS_DIST))
    .pipe(browsersync.stream());
}

function compileCss () {
  return gulp
    .src(PATHS.CSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(runOpts.css.cssnano ? cssnano() : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.CSS_DIST))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch( PATHS.PUG_WATCH, gulp.series(compilePug));
  gulp.watch( PATHS.SASS_WATCH, gulp.series(compileSass));
  gulp.watch( PATHS.CSS_WATCH, gulp.series(compileCss));
  // gulp.watch( PATHS.JS_WATCH, gulp.series(compileJS));
  // gulp.watch( PATHS.JS_WATCH, gulp.series(compileJS));
  gulp.watch( PATHS.IMGS_WATCH, gulp.series(compileImages));
  gulp.watch( PATHS.CP_WATCH, gulp.series(cpFiles));
  gulp.watch( PATHS.JS_WATCH, gulp.series(webpackTask));
}

const buildProject = gulp.series(
  clean, compileSass, compileCss, compilePug,
  // compileJS, compileBabelJS,
  compileImages, cpFiles, webpackTask
);

const beforeWatch = gulp.series(
  clean,
  compileSass,
  compileCss,
  compilePug,
  // compileJS,
  // compileBabelJS,
  compileImages,
  cpFiles,
  webpackTask
);

const watch = gulp.series(beforeWatch ,gulp.parallel(watchFiles, browserSync));

exports.watch = watch;
exports.build = buildProject;

exports.sass = compileSass;
exports.img = compileImages;
exports.files = cpFiles;

exports.es6 = compileBabelJS;