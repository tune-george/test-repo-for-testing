var gulp = require('gulp');
var gp = require('gulp-load-plugins')();

var jsGlob = 'delphi_components/**/*.{js,jsx}'; // run in the context of project
var reactOptions = {'harmony' : true};

// look into js-hint-cached
// jsx omit quotmark and maxlen

var jsHintOptions = {
  "bitwise"     : true,
  "boss"        : true,
  "browser"     : true,
  "curly"       : true,
  "devel"       : true,
  "eqnull"      : true,
  "esnext"      : true,
  "indent"      : true,
  "maxlen"      : 115,
  "noempty"     : true,
  "nonstandard" : true,
  "quotmark"    : true,
  "strict"      : false,
  "undef"       : true,
  "unused"      : true,
  "trailing"    : true,
  "globals"     : {
    "React"   : true,
    "require" : true,
    "exports" : true,
    "module"  : true
  }
}

var isJsx = function(file) {
  return /\.jsx$/.test(file.path);
};

var logError = function(err) {
  gp.gutil.beep();
  console.log(err.toString());
  this.emit('end');
}

gulp.task('delphi:js-lint', function() {
  return gulp.src(jsGlob)
    //.pipe(cache('linting'))
    .pipe(gp.plumber(logError))
    .pipe(gp.if(isJsx, gp.react(reactOptions)))
    .pipe(gp.jshint(jsHintOptions))
    .pipe(gp.jshint.reporter('jshint-stylish'));
});