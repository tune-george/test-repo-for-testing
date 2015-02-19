var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var lessGlob = 'delphi_components/**/*.less';

gulp.task('delphi:less-lint', function() {
  var stream =  gulp.src(lessGlob)
    //.pipe(cache('linting'))
    .pipe(gp.using({color: 'blue'}))
    .pipe(gp.recess().on('error', function(err) {
      console.log("ERROR", err);
    }))
    .pipe(gp.recess.reporter())
});