'use strict'

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex
}

var trucolor = _interopDefault(require('trucolor'))
var truwrap = _interopDefault(require('truwrap'))
var yargs = _interopDefault(require('yargs'))
var readPkg = _interopDefault(require('read-pkg-up'))
var updateNotifier = _interopDefault(require('update-notifier'))
var coreJs_modules_es7_array_includes = require('core-js/modules/es7.array.includes')
var supportsColor = _interopDefault(require('supports-color'))

if (process.env.ITERM_SESSION_ID && process.env.ITERM_SESSION_ID.includes(':') || process.env.TERM_COLOR && process.env.TERM_COLOR.includes('16m')) {
	if (!/\-color/.test(process.argv.join(''))) {
		process.argv.splice(2, 0, '--color=16m')
	}
}

const termNG = {
	color: {
		level: supportsColor.level || 0,
		basic: supportsColor.hasBasic || false,
		hasBasic: supportsColor.hasBasic || false,
		has256: supportsColor.level >= 2,
		has16m: supportsColor.level >= 3
	},
	images: process.env.TERM_IMAGES !== undefined && supportsColor.level >= 2,
	audio: process.env.TERM_AUDIO !== undefined,
	font: {
		basic: process.env.TERM_FONT !== undefined,
		enhanced: process.env.TERM_FONT === 'full'
	},
	termcap: {
		basic: process.env.TERM_ENHANCED !== undefined && process.env.TERM_ENHANCED === 'disabled',
		enhanced: process.env.TERM_ENHANCED === 'enabled'
	},
	software: process.env.TERM_PROGRAM || process.env.TERMKIT_HOST_APP || process.env.TERM || process.env.GULP
}

const clr = trucolor.simplePalette()

const _package = readPkg.sync().pkg

const renderer = truwrap({
	right: 0,
	outStream: process.stderr
})

const _yargs = yargs.strict().options({
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
		describe: 'Force color depth --color=256|16m. Disable with --no-color'
	}
}).command('has-color', 'Is basic color supported?').command('has-256', 'Is 256 color supported?').command('has-16m', 'Is 24 bit color supported?').command('has-images', 'Are images supported? (set $TERM_IMAGES=enabled)').command('has-audio', 'Is audio supported? (set $TERM_AUDIO=enabled)').command('has-box-font', 'Is audio supported? (set $TERM_FONT=box)').command('has-full-font', 'Is audio supported? (set $TERM_FONT=full)').command('is-enhanced', 'Is the current terminal using an enhanced termcap? (set $TERM_ENHANCED=enabled)').command('user-agent', 'Print the current terminal software').wrap(renderer.getWidth())
const argv = _yargs.argv

const usage = `
${clr.title}term-ng${clr.title.out} ${clr.dim}v${_package.version}${clr.dim.out}

Allow user configured enhanced terminal capabilities to be queried.

The command will exit with status 0 if all the provided queries (except user-agent) are true, otherwise exits with status 1.

If user-agent is used, the command will return the string on stdout and exit status 0.

${clr.title}Usage:${clr.title.out}
${clr.command}termng ${clr.option}[command]`

const epilogue = `${clr.command}© 2016 The Bespoke Pixel. ${clr.grey}Released under the MIT License.${clr.grey.out}`

if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg: _package
	}).notify()
}

if (argv.help) {
	renderer.write(usage)
	renderer.break(2)
	renderer.write(_yargs.getUsageInstance().help())
	renderer.break()
	renderer.write(epilogue)
	renderer.break(2)
	process.exit(0)
}

if (argv.version) {
	process.stdout.write(argv.version > 1 ? `${_package.name} v${_package.version}` : _package.version)
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
