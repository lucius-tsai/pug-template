

const DIST = './build';

function Path(SRC, DIST, WATCH) {
  let paths = Object.create(Path.prototype)
  paths.SRC = SRC
  paths.DIST = DIST
  paths.WATCH = WATCH
  return paths
}

const PUG_PATHS = Path(
  './src/**/*.pug',
  DIST,
  './src/**/*.pug',
)

const SASS_PATHS = Path(
  ['./src/**/*.scss', '!./src/**/_*.scss', '!./src/sass/bootstrap/**/*.*'],
  DIST,
  './src/**/*.scss',
)

console.log(PUG_PATHS, SASS_PATHS)
let template = require('./pug/user.pug')

let variable = {
  Paths: {
    PUG_PATHS, SASS_PATHS
  }
}

console.log(variable)

var html = template(variable)

document.querySelector("#app").innerHTML = html