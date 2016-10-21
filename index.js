'use strict'

const itermSession = process.env.ITERM_SESSION_ID && process.env.ITERM_SESSION_ID.indexOf(':') > 0
const termColor = process.env.TERM_COLOR && process.env.TERM_COLOR.indexOf('16m') >= 0

const has16m = itermSession || termColor

if (has16m && !/\-color/.test(process.argv.join(''))) {
	process.argv.splice(2, 0, '--color=16m')
}

const supportsColor = require('supports-color')

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

module.exports = termNG

