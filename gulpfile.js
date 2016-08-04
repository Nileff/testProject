var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = webpackStream.webpack;
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', ['less','webpack', 'sync', 'watch', 'copyfile']);

gulp.task('watch', ['less','webpack'], function () {
    gulp.watch('./src/less/**/*.less', ['less']);
});

gulp.task('webpack', function (callback) {
    var firstBuild = true;

    return webpackStream( require('./webpack.config.js') )
        .pipe(gulp.dest('build'))
        .on('data', function () {
            if(firstBuild)
            {
                firstBuild = false;
                callback();
            }
        });
});

gulp.task('less', function () {
    return gulp.src('./src/less/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'IE 9'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('copyfile', function() {
    gulp.src('./src/less/font/*.{ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest('./build/css/font'));
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('sync', ['less','webpack'], function(){
    browserSync.init({
        server: './build'
    });
    gulp.watch('./build/**/*.*').on('change', browserSync.reload);
});