gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
spawn = require 'gulp-spawn'

gulp.task 'default', ->
	gulp.src './src/*.coffee'
		.pipe coffee
			bare: true
		.on 'error', gutil.log
		.pipe gulp.dest './'

gulp.task 'test', -> true
