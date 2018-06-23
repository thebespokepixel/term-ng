import {resolve} from 'path'
import shell from 'shelljs'
import test from 'ava'
import readPkg from 'read-pkg'

const pkg = readPkg.sync(resolve(__dirname, '..'))

const expectedVersion = pkg.version

test.cb(`Module name/version is '${pkg.name} v${expectedVersion}'.`, t => {
	shell.exec('./bin/termng -vv', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, `${pkg.name} v${expectedVersion}`)
		t.end()
	})
})

test.cb('No Color: has-color', t => {
	shell.exec('./bin/termng --no-color has-color', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})
test.cb('No Color: has-256', t => {
	shell.exec('./bin/termng --no-color has-256', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})
test.cb('No Color: has-16m', t => {
	shell.exec('./bin/termng --no-color has-16m', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})

test.cb('256 Color: has-color', t => {
	shell.exec('./bin/termng --color=256 has-color', {
		silent: true
	}, code_ => {
		t.is(code_, 0)
		t.end()
	})
})
test.cb('256 Color: has-256', t => {
	shell.exec('./bin/termng --color=256 has-256', {
		silent: true
	}, code_ => {
		t.is(code_, 0)
		t.end()
	})
})
test.cb('256 Color: has-16m', t => {
	shell.exec('./bin/termng --color=256 has-16m', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})
