var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var cwd = process.cwd();
var path = require('path');

var builder = require(path.join(cwd, 'delphi/build-webpack-config'));
var config = require(path.join(cwd, 'webpack.config'));
var buildWebpackConfig = builder(config, {production: true});

gulp.task('delphi:build', function() {
  gulp.src('./src/entry.jsx')
    .pipe(gp.webpack(buildWebpackConfig))
    .pipe(gulp.dest('./dist'))
});
