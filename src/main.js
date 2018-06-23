/* ────────╮
 │ Term-NG │ Next generation terminal detector
 ╰─────────┴─────────────────────────────────────────────────────────────────── */
/* eslint complexity:0 */

const itermSession = process.env.ITERM_SESSION_ID && process.env.ITERM_SESSION_ID.indexOf(':') > 0
const termColor = process.env.TERM_COLOR && (process.env.TERM_COLOR.indexOf('16m') >= 0)

const has16m = itermSession || termColor

if (has16m && !(/-color/.test(process.argv.join('')))) {
	process.argv.splice(2, 0, '--color=16m')
}

// From https://github.com/sindresorhus/has-flag, under MIT license
const hasFlag = flag => {
	const terminatorPos = process.argv.indexOf('--')
	const prefix = /^-{1,2}/.test(flag) ? '' : '--'
	const pos = process.argv.indexOf(prefix + flag)

	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos)
}

// From https://github.com/chalk/supports-color, under MIT license
const support = level => {
	if (level === 0) {
		return false
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	}
}

let supportLevel = (() => {
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return 0
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3
	}

	if (hasFlag('color=256')) {
		return 2
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return 1
	}

	if (process.stdout && !process.stdout.isTTY) {
		return 0
	}

	if (process.platform === 'win32') {
		return 1
	}

	if ('CI' in process.env || 'TEAMCITY_VERSION' in process.env) {
		return 0
	}

	if ('COLORTERM' in process.env) {
		return 1
	}

	if (process.env.TERM === 'dumb') {
		return 0
	}

	if (/^xterm-256(?:color)?/.test(process.env.TERM)) {
		return 2
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return 1
	}

	return 0
})()

if (supportLevel === 0 && 'FORCE_COLOR' in process.env) {
	supportLevel = 1
}

const supportsColor = process && support(supportLevel)

/**
 * Terminal features.
 * @namespace
 */
const termNG = {
	/**
	 * Supported terminal color depth.
	 * @type {Object}
	 * @property {Number} level  - 0 = None, 1 = Basic, 2 = 256 colors, 3 = 24 bit color
	 * @property {Boolean} basic - Is there basic color support?
	 * @property {Boolean} has256 - Terminal supports 256 colors
	 * @property {Boolean} has16m - Terminal supports 16 million (24 bit) color
	 */
	color: {
		level: supportsColor.level || 0,
		basic: supportsColor.hasBasic || false,
		hasBasic: supportsColor.hasBasic || false,
		has256: supportsColor.level >= 2,
		has16m: supportsColor.level >= 3
	},
	/**
	 * Does the terminal support inline images?
	 * @type {Boolean}
	 * @example <caption>To set:</caption>
	 * env TERM_IMAGES=enabled
	 */
	images: (process.env.TERM_IMAGES !== undefined) && supportsColor.level >= 2,
	/**
	 * Does the terminal support audio?
	 * @type {Boolean}
	 * @example <caption>To set:</caption>
	 * env TERM_AUDIO=enabled
	 */
	audio: process.env.TERM_AUDIO !== undefined,
	/**
	 * Terminal font character set.
	 * @type {Object}
	 * @property {Boolean} basic    - Font has basic box drawing symbols.
	 * @property {Boolean} enhanced - Font has 'full' Unicode character support
	 * @example <caption>To set:</caption>
	 * env TERM_FONT=[box|full]
	 */
	font: {
		basic: process.env.TERM_FONT !== undefined,
		enhanced: process.env.TERM_FONT === 'full'
	},
	/**
	 * Termcap support
	 * @type {Object}
	 * @property {Boolean} basic    - Using the default termcap.
	 * @property {Boolean} enhanced - Using an enhanced/custom termcap.
	 * @example <caption>To set:</caption>
	 * env TERM_ENHANCED=enabled
	 */
	termcap: {
		basic: process.env.TERM_ENHANCED !== undefined && process.env.TERM_ENHANCED === 'disabled',
		enhanced: process.env.TERM_ENHANCED === 'enabled'
	},
	/**
	 * Name of running terminal software, i.e. 'iTerm.app'
	 * @type {String}
	 */
	software: process.env.TERM_PROGRAM || process.env.TERMKIT_HOST_APP || process.env.TERM || process.env.GULP
}

export default termNG
