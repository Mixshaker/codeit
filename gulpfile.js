"use strict";

let gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    refresh = require('gulp-refresh'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(refresh())
});

gulp.task('html', () => {
    return gulp.src('dist/*.html')
        .pipe(refresh())
});

// gulp.task('js', () => {
//     return gulp.src('lib/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'))
//         .pipe(refresh())
// });

gulp.task('watch', () => {
    refresh.listen()
    gulp.watch('sass/*.scss', ['sass'])
    gulp.watch('dist/*.html', ['html'])
    // gulp.watch('dist/js/*.js', ['js'])
});

gulp.task('default', ['sass', 'html', 'watch']);