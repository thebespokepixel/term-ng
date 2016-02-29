'use strict'

import test from 'ava'
import termNG from '../index.js'

test(`Module returns an object with correct properties.`, t => {
	t.plan(6)
	t.ok(termNG.hasOwnProperty('color'), 'color property missing')
	t.ok(termNG.hasOwnProperty('images'), 'images property missing')
	t.ok(termNG.hasOwnProperty('audio'), 'audio property missing')
	t.ok(termNG.hasOwnProperty('font'), 'font property missing')
	t.ok(termNG.hasOwnProperty('termcap'), 'termcap property missing')
	t.ok(termNG.hasOwnProperty('software'), 'software property missing')
})

test(`Module color property`, t => {
	t.plan(4)
	t.ok(termNG.color.hasOwnProperty('basic'), 'basic property missing')
	t.ok(termNG.color.hasOwnProperty('level'), 'level property missing')
	t.ok(termNG.color.hasOwnProperty('has256'), 'has256 property missing')
	t.ok(termNG.color.hasOwnProperty('has16m'), 'has16m property missing')
})

test(`Module font property`, t => {
	t.plan(2)
	t.ok(termNG.font.hasOwnProperty('basic'), 'basic property missing')
	t.ok(termNG.font.hasOwnProperty('enhanced'), 'enhanced property missing')
})

test(`Module termcap property`, t => {
	t.plan(2)
	t.ok(termNG.termcap.hasOwnProperty('basic'), 'basic property missing')
	t.ok(termNG.termcap.hasOwnProperty('enhanced'), 'enhanced property missing')
})

test(`Module property types`, t => {
	t.plan(11)
	t.is(typeof termNG.color.basic, 'boolean', 'color.basic incorrect type')
	t.is(typeof termNG.color.level, 'number', 'color.basic incorrect type')
	t.is(typeof termNG.color.has256, 'boolean', 'color.has256 incorrect type')
	t.is(typeof termNG.color.has16m, 'boolean', 'color.has16m incorrect type')
	t.is(typeof termNG.images, 'boolean', 'images incorrect type')
	t.is(typeof termNG.audio, 'boolean', 'images incorrect type')
	t.is(typeof termNG.font.basic, 'boolean', 'font.basic incorrect type')
	t.is(typeof termNG.font.enhanced, 'boolean', 'font.enhanced incorrect type')
	t.is(typeof termNG.termcap.basic, 'boolean', 'termcap.basic incorrect type')
	t.is(typeof termNG.termcap.enhanced, 'boolean', 'termcap.enhanced incorrect type')
	t.is(typeof termNG.software, 'string', 'software incorrect type')
})

// module.exports = {
// 	color: {
// 		basic: supportsColor.hasBasic,
// 		level: supportsColor.level,
// 		has256: supportsColor.level >= 2,
// 		has16m: supportsColor.level >= 3
// 	},
// 	images: process.env.TERM_IMAGES !== undefined && supportsColor.level >= 2,
// 	audio: process.env.TERM_AUDIO !== undefined,
// 	font: {
// 		basic: process.env.TERM_FONT !== undefined,
// 		enhanced: process.env.TERM_FONT === 'full'
// 	},
// 	termcap: {
// 		basic: /^xterm-256/.test(process.env.TERM),
// 		enhanced: /\+iterm3/.test(process.env.TERM)
// 	},
// 	software: process.env.TERM_PROGRAM || process.env.TERMKIT_HOST_APP || process.env.TERM || process.env.GULP
// }
