###
Client Gulp File
###

gulp = require 'gulp'
cordial = require '@thebespokepixel/cordial'

gulp.task 'bump',                              cordial.version.build.inc
gulp.task 'reset',                             cordial.version.build.reset
gulp.task 'write',                             cordial.version.build.write

gulp.task 'babel',         ['bump', 'write'],  cordial.compile.babel  ['src/**/*.js'],     './'
gulp.task 'babel-format',  ['bump', 'write'],  cordial.format.babel    'src/**/*.js',      './'

gulp.task 'test',          ['xo'],             cordial.test.ava       ['test/*']
gulp.task 'xo',                                cordial.test.xo        ['lib/**/*.js', 'index.js']

gulp.task 'commit',                            cordial.git.commitAll
gulp.task 'push',                              cordial.git.pushAll     'origin'
gulp.task 'backup',        ['push'],           cordial.git.pushAll     'backup'

gulp.task 'prerelease',    ['reset', 'write'], cordial.npm.version.set 'prerelease'
gulp.task 'publish',       ['test'],  cordial.npm.publish

gulp.task 'default',       ['babel-format']

gulp.task 'post-flow-release-start', ['reset', 'write'], cordial.flow.release.start
gulp.task 'post-flow-release-finish', ['publish', 'push']
gulp.task 'filter-flow-release-start-version', cordial.flow.release.versionFilter
gulp.task 'filter-flow-release-finish-tag-message', cordial.flow.release.tagFilter

