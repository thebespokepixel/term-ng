'use strict'

import shell from 'shelljs'
import pkg from '../package.json'
import test from 'ava'

test.cb(`Module name/version is '${pkg.name}'.`, t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js -vv', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, `${pkg.name} v${pkg.version}`)
		t.end()
	})
})

test.cb('No Color: has-color', t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js --no-color has-color', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})
test.cb('No Color: has-256', t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js --no-color has-256', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})
test.cb('No Color: has-16m', t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js --no-color has-16m', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})

test.cb('256 Color: has-color', t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js --color=256 has-color', {
		silent: true
	}, code_ => {
		t.is(code_, 0)
		t.end()
	})
})
test.cb('256 Color: has-256', t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js --color=256 has-256', {
		silent: true
	}, code_ => {
		t.is(code_, 0)
		t.end()
	})
})
test.cb('256 Color: has-16m', t => {
	shell.exec('/usr/bin/env node ../lib/cli/index.js --color=256 has-16m', {
		silent: true
	}, code_ => {
		t.is(code_, 1)
		t.end()
	})
})
