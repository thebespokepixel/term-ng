#! /usr/bin/env node
'use strict'

const termNG = require('../../index')
const clr = require('trucolor').simplePalette()
const updateNotifier = require('update-notifier')
const pkg = require('../../package.json')

const renderer = require('truwrap')({
	right: 0,
	outStream: process.stderr
})

const usage = `
${ clr.title }term-ng${ clr.title.out } ${ clr.dim }v${ pkg.version }${ clr.dim.out }

Allow user configured enhanced terminal capabilities to be queried.

The command will exit with status 0 if all the provided queries (except user-agent) are true, otherwise exits with status 1.

If user-agent is used, the command will return the string on stdout and exit status 0.

Usage:

${ clr.command }termng ${ clr.option }[command]`

const epilogue = `${ clr.command }© 2016 The Bespoke Pixel. ${ clr.grey }Released under the MIT License.${ clr.grey.out }`

const yargs = require('yargs').strict()
	.options({
		h: {
			alias: 'help',
			describe: 'Display this help.'
		},
		v: {
			alias: 'version',
			count: true,
			describe: 'Return the current version on stdout. -vv Return name & version.'
		},
		color: {
			describe: '--color=16m Disable with --no-color'
		}
	})
	.command('has-color', 'Is basic color supported?')
	.command('has-256', 'Is 256 color supported?')
	.command('has-16m', 'Is 24 bit color supported?')
	.command('has-images', 'Are images supported? (set $TERM_IMAGES=enabled)')
	.command('has-audio', 'Is audio supported? (set $TERM_AUDIO=enabled)')
	.command('has-box-font', 'Is audio supported? (set $TERM_FONT=box)')
	.command('has-full-font', 'Is audio supported? (set $TERM_FONT=full)')
	.command('is-enhanced', 'Is the current terminal using an enhanced termcap?')
	.command('user-agent', 'Print the current terminal software')
	.wrap(renderer.getWidth())

const argv = yargs.argv

updateNotifier({
	pkg
}).notify()

if (argv.help) {
	renderer.write(usage)
	renderer.break(2)
	renderer.write(yargs.getUsageInstance().help())
	renderer.break()
	renderer.write(epilogue)
	renderer.break(2)
	process.exit(0)
}

if (argv.version) {
	process.stdout.write(argv.version > 1 ? `${pkg.name} v${pkg.version}` : pkg.version)
	process.exit(0)
}

if (argv._.indexOf('user-agent') !== -1) {
	process.stdout.write(termNG.software)
	process.exit(0)
}

const matrix = {
	'has-color': termNG.color.basic,
	'has-256': termNG.color.has256,
	'has-16m': termNG.color.has16m,
	'has-images': termNG.images,
	'has-audio': termNG.audio,
	'has-box-font': termNG.font.basic || termNG.font.enhanced,
	'has-full-font': termNG.font.enhanced,
	'is-enhanced': termNG.termcap.enhanced
}

argv._.forEach(query => {
	if (!matrix[query]) {
		process.exit(1)
	}
})
