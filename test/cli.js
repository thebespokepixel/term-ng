import {exec} from 'child_process'
import test from 'ava'
import pkg from '../package.json'

const expectedVersion = pkg.version

test.cb(`Module name/version is '${pkg.name} v${expectedVersion}'.`, t => {
	exec('./bin/termng -vv', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, `${pkg.name} v${expectedVersion}`)
		t.end()
	})
})

test.cb('No Color: has-color', t => {
	exec('./bin/termng --no-color has-color', error_ => {
		t.is(error_.code, 1)
		t.end()
	})
})
test.cb('No Color: has-256', t => {
	exec('./bin/termng --no-color has-256', error_ => {
		t.is(error_.code, 1)
		t.end()
	})
})
test.cb('No Color: has-16m', t => {
	exec('./bin/termng --no-color has-16m', error_ => {
		t.is(error_.code, 1)
		t.end()
	})
})

test.cb('256 Color: has-color', t => {
	exec('./bin/termng --color=256 has-color', error_ => {
		t.is(error_, null)
		t.end()
	})
})
test.cb('256 Color: has-256', t => {
	exec('./bin/termng --color=256 has-256', error_ => {
		t.is(error_, null)
		t.end()
	})
})
test.cb('256 Color: has-16m', t => {
	exec('./bin/termng --color=256 has-16m', error_ => {
		t.is(error_.code, 1)
		t.end()
	})
})
