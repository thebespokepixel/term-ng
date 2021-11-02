import {promisify} from 'node:util'
import {exec} from 'node:child_process'
import test from 'ava'
import {readPackageSync} from 'read-pkg'

const execPromise = promisify(exec)
const pkg = readPackageSync()
const expectedVersion = pkg.version

test(`Module name/version is '${pkg.name} v${expectedVersion}'.`, async t => {
	const {stdout, error} = await execPromise('./termng.js -vv')
	t.is(error, undefined)
	t.is(stdout, `${pkg.name} v${expectedVersion}`)
})

test('No Color: has-color', async t => {
	const error = await t.throwsAsync(execPromise('./termng.js --no-color has-color'))
	t.is(error.code, 1)
})
test('No Color: has-256', async t => {
	const error = await t.throwsAsync(execPromise('./termng.js --no-color has-256'))
	t.is(error.code, 1)
})
test('No Color: has-16m', async t => {
	const error = await t.throwsAsync(execPromise('./termng.js --no-color has-16m'))
	t.is(error.code, 1)
})

test('256 Color: has-color', async t => {
	const {error} = await execPromise('./termng.js --color=256 has-color')
	t.is(error, undefined)
})
test('256 Color: has-256', async t => {
	const {error} = await execPromise('./termng.js --color=256 has-256')
	t.is(error, undefined)
})
test('256 Color: has-16m', async t => {
	const error = await t.throwsAsync(execPromise('./termng.js --color=256 has-16m'))
	t.is(error.code, 1)
})
