var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var prefix = require('gulp-autoprefixer');

var paths = {
  sass: ['./scss/**/*.scss']
};

var supportedBrowsers = [
  'last 2 Chrome versions',
  'last 2 Android versions',
  'last 2 iOS versions',
  'last 2 ChromeAndroid versions'
];

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    return gulp.src('./scss/ionic.app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'))
        .pipe(prefix({
	    browsers: supportedBrowsers
	}))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
