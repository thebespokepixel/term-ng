/* ────────╮
 │ Term-NG │ Next Generation Terminal Feature Exposure/Whitelisting
 ╰─────────┴──────────────────────────────────────────────────────────────────── */
/* eslint unicorn/no-process-exit:0, node/prefer-global/process: [error] */

import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {simple} from 'trucolor'
import {truwrap} from 'truwrap'
import {stripIndent, TemplateTag, replaceSubstitutionTransformer} from 'common-tags'
import {box} from '@thebespokepixel/string'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers' // eslint-disable-line node/file-extension-in-import
import meta from '@thebespokepixel/meta'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'
import termNG from './index.js'

const clr = simple({format: 'sgr'})
const metadata = meta(dirname(fileURLToPath(import.meta.url)))

const renderer = truwrap({
	right: 0,
	outStream: process.stderr,
})

const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`,
	),
)

const title = box(colorReplacer`${'title|term-ng'}${`dim| │ ${metadata.version(3)}`}`, {
	borderColor: 'yellow',
	margin: {
		top: 1,
	},
	padding: {
		bottom: 0,
		top: 0,
		left: 2,
		right: 2,
	},
})

const yargsInstance = yargs(hideBin(process.argv))
	.strictOptions()
	.help(false)
	.version(false)
	.options({
		h: {
			alias: 'help',
			describe: 'Display this help.',
		},
		v: {
			alias: 'version',
			count: true,
			describe: 'Return the current version on stdout. -vv Return name & version.',
		},
		color: {
			describe: 'Force color depth --color=256|16m. Disable with --no-color',
		},
	})
	.command('has-color', 'Is basic color supported?')
	.command('has-256', 'Is 256 color supported?')
	.command('has-16m', 'Is 24 bit color supported?')
	.command('has-images', 'Are images supported? (set $TERM_IMAGES=enabled)')
	.command('has-audio', 'Is audio supported? (set $TERM_AUDIO=enabled)')
	.command('has-box-font', 'Is audio supported? (set $TERM_FONT=box)')
	.command('has-full-font', 'Is audio supported? (set $TERM_FONT=full)')
	.command('is-enhanced', 'Is the current terminal using an enhanced termcap? (set $TERM_ENHANCED=enabled)')
	.command('user-agent', 'Print the current terminal software')

const {argv} = yargsInstance

const usage = stripIndent(colorReplacer)`
Allow user configured enhanced terminal capabilities to be queried.

The command will exit with status 0 if all the provided queries (except user-agent) are true, otherwise exits with status 1.

If user-agent is used, the command will return the string on stdout and exit status 0.

${clr.title}Usage:${clr.title.out}
${clr.command}termng ${clr.option}[command]${clr.option.out}`

const epilogue = `${clr.title}${metadata.copyright}. ${clr.grey}Released under the MIT License.${clr.grey.out}`

if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg,
	}).notify()
}

if (argv.help) {
	(async () => {
		const usageContent = await yargsInstance.wrap(renderer.getWidth()).getHelp()
		renderer.write(title).break(2)
		renderer.write(usage)
		renderer.break(2)
		renderer.write(usageContent)
		renderer.break(2)
		renderer.write(epilogue)
		renderer.break(2)
		process.exit(0)
	})()
}

if (argv.version) {
	process.stdout.write(metadata.version(argv.version))
	process.exit(0)
}

if (argv._.includes('user-agent')) {
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
	'is-enhanced': termNG.termcap.enhanced,
}

for (const query of argv._) {
	if (!matrix[query]) {
		process.exit(1)
	}
}
