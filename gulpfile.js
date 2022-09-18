const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');

function html()
{
    console.log("HTML")
    return gulp.src('src/*.html',)
    .pipe(gulp.dest('dist'));
}

function style()
{
    console.log("Style")
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
}

function js()
{
    console.log("JS")
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'));
}

function images()
{
    console.log("Images")
    return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}

function watch()
{
    browserSync.init({
        server:
        {
            baseDir: './dist'
        },
        online: true,
        tunnel: true,
    });
    gulp.watch('src/*.html', html).on('change', browserSync.reload)
    gulp.watch('src/scss/**/*.scss', style)
    gulp.watch('src/js/**/*.js', js).on('change', browserSync.reload)
    gulp.watch('src/images/**/*', images)
}

exports.html = html;
exports.style = style;
exports.watch = watch;