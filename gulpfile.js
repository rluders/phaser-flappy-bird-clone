var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', ['less', 'scripts']);

gulp.task('less', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('./src/typescript/**/*.ts')
        .pipe(ts(tsProject));

    return merge([
        tsResult.js.pipe(gulp.dest('./dist/js'))
    ]);
});