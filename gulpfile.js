var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bower = require('gulp-bower');

gulp.task('nodemon', function() {
    nodemon({script: './server.js'});
});

gulp.task('bower', function() {
    bower({cwd: './public'});
});

gulp.task('default', ['bower', 'nodemon']);


