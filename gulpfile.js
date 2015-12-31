var gulp = require('gulp')
var gutil = require('gulp-util')
var coffee = require('gulp-coffee')
// var spawn = require('gulp-spawn')
var xoformatter = require('gulp-xo-formatter')

gulp.task('default', function () {
	gulp.src('./src/*.coffee')
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(xoformatter({semicolon: false}))
		.pipe(gulp.dest('./'))
})

