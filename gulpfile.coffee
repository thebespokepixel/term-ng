gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
util = require 'util'
pkg = require './package.json'
exec = require('child_process').exec

gulp.task 'task', (cb) ->
	exec 'ping -c 5 localhost', (err, stdout, stderr) ->
		console.log stdout
		console.log stderr
		cb err

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

# gulp.task 'shipit', ->


gulp.task 'default', ['compile']

gulp.task 'pre-push', ['test']

gulp.task 'pre-commit', ['test']
