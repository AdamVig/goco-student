var gulp = require("gulp");
var minifyCss = require("gulp-clean-css");
var prefix = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
  allSass: ["./scss/**/*.scss"],
  cssOut: "./www/css",
  sassIn: "./scss/ionic.app.scss"
};

var supportedBrowsers = {
  browsers: [
    "last 2 Chrome versions",
    "last 2 Android versions",
    "last 2 iOS versions",
    "last 2 ChromeAndroid versions"
  ]
};

gulp.task("default", ["sass"]);

gulp.task("sass", function () {
  return gulp.src(paths.sassIn)
//    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(prefix(supportedBrowsers))
//    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssOut))
    .pipe(minifyCss())
    .pipe(rename({extname: ".min.css"}))
    .pipe(gulp.dest(paths.cssOut));
});

gulp.task("watch", function () {
  gulp.watch(paths.allSass, ["sass"]);
});
