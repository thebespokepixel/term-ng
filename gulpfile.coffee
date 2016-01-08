gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
spawn = require 'gulp-spawn'
util = require 'util'
pkg = require './package.json'

gulp.task 'compile', (cb) ->
	gulp.src './src/*.coffee'
		.pipe coffee
			bare: true
		.on 'error', (err) ->
			cb err
		.pipe gulp.dest './'
	do cb

gulp.task 'test', ['compile'], (cb) ->
	process.env.GULP = pkg.name
	termng = require './index'
	gutil.log "Running tests… #{util.inspect termng, {depth: 2}}"
	cb 'Test failed!' unless termng.software?
	gutil.log 'Tests complete.'
	do cb

gulp.task 'default', ['compile']

gulp.task 'pre-push', ['test']

gulp.task 'pre-commit', ['test']
