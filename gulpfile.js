var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');

var jsPaths = require('./public/lib/js-src-path')

gulp.task('nodemon', function() {
    nodemon({script: './server.js', ignore: ['./public/']});
});

gulp.task('bower', function() {
    bower({cwd: './public'});
});

gulp.task('jslib-builder', function() {
    for(var key in jsPaths) {
        var paths = jsPaths[key];
        console.log();
        gulp.src(paths)
            .pipe(sourcemaps.init())
            .pipe(concat(key + '.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(rename({suffix: ".min"}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/js'));
    }
});

gulp.task('jsapp-builder', function() {
    gulp.src(['public/app.js', 'public/service/**/*.js', 'public/directive/**/*.js', 'public/controller/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('css-builder', function() {
    gulp.src('public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 2 versions']))
        .pipe(concat('app.css'))
        .pipe(minifyCss())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./public/css'));
})

gulp.task('watch', function() {
    gulp.watch(['public/app.js', 'public/service/**/*.js', 'public/directive/**/*.js', 'public/controller/**/*.js'], ['jsapp-builder']);
    gulp.watch('public/scss/**/*.scss', ['css-builder']);
});

gulp.task('default', ['bower', 'css-builder', 'jslib-builder', 'jsapp-builder', 'nodemon', 'watch']);

