/// <binding AfterBuild='build' />
var gulp = require("gulp");
var gutil = require("gulp-util");
var watch = require("gulp-watch");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var pump = require("pump");
var del = require("del");

var build_output_dir = "dist";
var build_bundle_js = "bundle.js";

gulp.task("build", ["bundle-dev-js", "bundle-css"]);

gulp.task("release", ["bundle-public-js"]);

gulp.task("default", ["clean", "build"]);

gulp.task("clean", function () {
    return del([build_output_dir]);
});

gulp.task("bundle-dev-js", function (cb) {
    pump([
        browserify({
            entries: "./src/Config/includes.js",
            debug: true
        }).bundle(),
        source(build_bundle_js),
        gulp.dest(build_output_dir)
    ], cb);
});

gulp.task("bundle-css", function (cb) {
    gulp.src("./src/Content/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write('./sassmaps'))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("watch-css", function() {
    gulp.watch("src/Content/*.scss", ["bundle-css"]);
});