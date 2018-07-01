let gulp = require('gulp');
let uglifyJS = require('gulp-uglify');
let minifyCSS = require('gulp-minify-css');
let sourcemaps = require('gulp-sourcemaps');
let minifyHtml = require('gulp-minify-html');
let browserSync = require('browser-sync').create();
let babel = require('gulp-babel');
let jshint = require("gulp-jshint");


// task
gulp.task('minify-html', function () {
    gulp.src('src/**.html') // path to your files
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function () {
    gulp.src(['src/**.css'])
        .pipe(sourcemaps.init())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('jsLint', function () {
    gulp.src('src/**.js') // path to your files
        .pipe(jshint())
        .pipe(jshint.reporter()); // Dump results
});

gulp.task('js', function () {
    gulp.src(['src/**.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglifyJS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('build', function () {
    gulp.run(['styles', 'jsLint', 'js', 'minify-html']);
});

gulp.task('serve', function () {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('./src/*', ['styles', 'jsLint', 'js', 'minify-html']);
    gulp.watch('./src/*', browserSync.reload);
});

gulp.task('default', function () {
    gulp.run('build');
});