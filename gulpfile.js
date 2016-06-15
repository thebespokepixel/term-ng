'use strict'
/*
 *  Client Gulp File
 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// transpilation/formatting
gulp.task('bundle', gulp.parallel(
	cordial.macro({
		master: true,
		source: 'src/index.es6'
	}).bundle(),
	cordial.format({
		source: 'src/lib/cli/index.es6'
	}).rollup.babel({
		dest: 'lib/cli/index.js'
	}))
)

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/**/*.es6']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Hooks
gulp.task('start-release', gulp.series('reset'))
gulp.task('test-release', gulp.series('test'))
gulp.task('finish-release', gulp.series('push-force'))

// Default
gulp.task('default', gulp.series('bump', 'bundle'))
