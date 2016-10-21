import test from 'ava'
import termNG from '..'

test(`Module returns an object with correct properties.`, t => {
	t.plan(6)
	t.true({}.hasOwnProperty.call(termNG, 'color'), 'color property missing')
	t.true({}.hasOwnProperty.call(termNG, 'images'), 'images property missing')
	t.true({}.hasOwnProperty.call(termNG, 'audio'), 'audio property missing')
	t.true({}.hasOwnProperty.call(termNG, 'font'), 'font property missing')
	t.true({}.hasOwnProperty.call(termNG, 'termcap'), 'termcap property missing')
	t.true({}.hasOwnProperty.call(termNG, 'software'), 'software property missing')
})

test(`Module color property`, t => {
	t.plan(4)
	t.true({}.hasOwnProperty.call(termNG.color, 'basic'), 'basic property missing')
	t.true({}.hasOwnProperty.call(termNG.color, 'level'), 'level property missing')
	t.true({}.hasOwnProperty.call(termNG.color, 'has256'), 'has256 property missing')
	t.true({}.hasOwnProperty.call(termNG.color, 'has16m'), 'has16m property missing')
})

test(`Module font property`, t => {
	t.plan(2)
	t.true({}.hasOwnProperty.call(termNG.font, 'basic'), 'basic property missing')
	t.true({}.hasOwnProperty.call(termNG.font, 'enhanced'), 'enhanced property missing')
})

test(`Module termcap property`, t => {
	t.plan(2)
	t.true({}.hasOwnProperty.call(termNG.termcap, 'basic'), 'basic property missing')
	t.true({}.hasOwnProperty.call(termNG.termcap, 'enhanced'), 'enhanced property missing')
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
