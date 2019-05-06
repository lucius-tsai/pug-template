// 剩下拷貝檔案
// 圖片編譯時間太久
// https://gist.github.com/LoyEgor/e9dba0725b3ddbb8d1a68c91ca5452b5
var gulp = require('gulp');

//utility
var del = require('del');
var rename = require("gulp-rename");
var browsersync = require("browser-sync").create();
var util = require('gulp-util');

//html
var pug = require('gulp-pug');

// imgs
var imagemin = require("gulp-imagemin");
const gulpPngquant = require('imagemin-pngquant');
var newer = require("gulp-newer");
const image = require('gulp-image');

// css
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

//js
var uglify = require('gulp-uglify');

var env = util.env.env || 'development';
console.log('Using '+ env + ' mode');


var DIST = './build';
var PATHS = {
  
  PUG_SRC:  ['./src/**/*.pug', '!./src/**/_*.pug'],
  PUG_DIST: DIST,
  PUG_WATCH:'./src/**/*.pug',

  SASS_SRC:   ['./src/**/*.scss', '!./src/**/_*.scss'],
  SASS_DIST:  DIST,
  SASS_WATCH: './src/**/*.scss',

  CSS_SRC:   './src/**/*.css',
  CSS_DIST:  DIST,
  CSS_WATCH: './src/**/*.css',

  IMGS_SRC:   './src/**/*.{png, gif,jpg,svg,jpeg}',
  IMGS_DIST:  DIST,
  IMGS_WATCH: './src/**/*.{png, gif,jpg,svg,jpeg}',

  PNGS_SRC:   './src/**/*.png',
  PNGS_DIST:  DIST,
  PNGS_WATCH: './src/**/*.png',

  JS_SRC:   './src/**/*.js',
  JS_DIST:  DIST,
  JS_WATCH: './src/**/*.js',

  CP_SRC: ['./src/**/*.*', '!./src/**/*.{pug, scss, css, png, gif, jpg, svg, jpeg, js}'],
  CP_DIST: DIST,
  CP_WATCH: ['./src/**/*.*', '!./src/**/*.{pug, scss, css, png, gif, jpg, svg, jpeg, js}']

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

console.log(env, runOpts)

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

function cpFiles() {
  return gulp.src(PATHS.CP_SRC)
    .pipe(gulp.dest(PATHS.CP_DIST))
}
function compilePNGS() {
  return gulp
    .src(PATHS.PNGS_SRC)
    .pipe(newer(PATHS.PNGS_DIST))
    .pipe(
      runOpts.imgs.imagemin ?
      gulpPngquant({
        quality: '65-80'
      })
      :
      util.noop()
    )
    .pipe(gulp.dest(PATHS.PNGS_DIST));
}
function compileImages() {
  return gulp
    .src(PATHS.IMGS_SRC)
    .pipe(newer(PATHS.IMGS_DIST))
    .pipe(
      runOpts.imgs.imagemin ?
      // image()
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true, optimizationLevel: 3 }),
          imagemin.jpegtran({ progressive: true, arithmetic: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: false,
                collapseGroups: true
              }
            ]
          })
        ],
        {
          verbose: true,
          interlaced: true,
          progressive: true,
          optimizationLevel: 7,
        }
      )
      :
      util.noop()
    )
    .pipe(gulp.dest(PATHS.IMGS_DIST));
}

function browserSyncReload(done) {
  browsersync.reload();
}



function compilePug() {
  return gulp.src(PATHS.PUG_SRC)
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(PATHS.PUG_DIST))
  .pipe(browsersync.stream());
}

function compileJS() {
  return gulp.src(PATHS.JS_SRC)
  .pipe(runOpts.js.uglify ? uglify() : util.noop())
  .pipe(gulp.dest(PATHS.JS_DIST))
  .pipe(browsersync.stream());
}

function compileSass () {
  return gulp.src(PATHS.SASS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(runOpts.css.cssnano ? cssnano() : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path){
      path.dirname = path.dirname.replace('scss', 'css')
      path.dirname = path.dirname.replace('sass', 'css')
      console.log(path)
    }))
    .pipe(gulp.dest(PATHS.SASS_DIST))
    .pipe(browsersync.stream());
}

function compileCss () {
  return gulp.src(PATHS.CSS_SRC)
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
  gulp.watch( PATHS.JS_WATCH, gulp.series(compileJS));
  gulp.watch( PATHS.IMGS_WATCH, gulp.series(compileImages));
  // gulp.watch( PATHS.PNGS_WATCH, gulp.series(compilePNGS));
  gulp.watch( PATHS.CP_WATCH, gulp.series(cpFiles));
}

const buildProject = gulp.series(clean, compileSass, compileCss, compilePug, compileJS, compileImages, 
  //compilePNGS, 
  cpFiles);

const watch = gulp.series( buildProject ,gulp.parallel(watchFiles, browserSync));

exports.watch = watch;
exports.build = buildProject;

exports.sass = compileSass;
exports.img = compileImages;