#! /usr/bin/env node
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { simple } from 'trucolor';
import { truwrap } from 'truwrap';
import { TemplateTag, replaceSubstitutionTransformer, stripIndent } from 'common-tags';
import { box } from '@thebespokepixel/string';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import meta from '@thebespokepixel/meta';
import updateNotifier from 'update-notifier';

const name = "term-ng";
const version = "3.0.2";
const description = "Terminal/$TERM feature snooping and whitelisting";
const main = "index.js";
const types = "index.d.ts";
const type = "module";
const bin = {
	termng: "./termng.js"
};
const files = [
	"index.js",
	"index.d.ts"
];
const scripts = {
	build: "rollup -c && chmod 755 termng.js && npm run readme",
	test: "xo && c8 --reporter=text ava",
	"doc-serve": "documentation serve --watch --theme node_modules/documentation-theme-bespoke --github --config src/docs/documentation.yml --project-name $npm_package_name  --project-version $npm_package_version src/index.js",
	"doc-build": "documentation build --format html --output docs --theme node_modules/documentation-theme-bespoke --github --config src/docs/documentation.yml --project-name $npm_package_name  --project-version $npm_package_version src/index.js",
	readme: "compile-readme -u src/docs/example.md src/docs/readme.md > readme.md",
	coverage: "c8 --reporter=lcov ava; open coverage/lcov-report/index.html",
	prepublishOnly: "npx -p typescript tsc index.js --declaration --allowJs --emitDeclarationOnly",
	colors: "scripts/colortest.pl"
};
const repository = {
	type: "git",
	url: "https://github.com/thebespokepixel/term-ng.git"
};
const engines = {
	node: ">=14.0"
};
const keywords = [
	"24bit",
	"color",
	"ansi",
	"truecolor",
	"trucolor",
	"sgr",
	"cli",
	"tty",
	"iterm",
	"xterm"
];
const author = "Mark Griffiths <mark@thebespokepixel.com> (http://thebespokepixel.com/)";
const copyright = {
	year: "2021",
	owner: "The Bespoke Pixel"
};
const license = "MIT";
const bugs = {
	url: "https://github.com/thebespokepixel/term-ng/issues"
};
const homepage = "https://github.com/thebespokepixel/term-ng#readme";
const devDependencies = {
	"@rollup/plugin-commonjs": "^21.0.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.6",
	"@types/estree": "^0.0.50",
	ava: "^4.0.0-rc.1",
	c8: "^7.10.0",
	"documentation-theme-bespoke": "^2.0.12",
	"read-pkg": "^7.0.0",
	rollup: "^2.59.0",
	"rollup-plugin-cleanup": "^3.2.1",
	xo: "^0.46.3"
};
const dependencies = {
	"@thebespokepixel/meta": "^3.0.4",
	"@thebespokepixel/string": "^2.0.1",
	trucolor: "^2.0.4",
	truwrap: "^2.0.4",
	"update-notifier": "^5.1.0",
	yargs: "^17.2.1"
};
const xo = {
	semicolon: false,
	ignores: [
		"index.js",
		"termng.js",
		"index.d.ts",
		"docs/**",
		"coverage/**"
	]
};
const badges = {
	github: "thebespokepixel",
	npm: "thebespokepixel",
	"libraries-io": "TheBespokePixel",
	codeclimate: "7ba2088efca500b3b4ff",
	name: "term-ng",
	providers: {
		aux1: {
			title: "github",
			text: "source",
			color: "4E73B6",
			link: "https://github.com/thebespokepixel/term-ng"
		}
	},
	readme: {
		"Publishing Status": [
			[
				"npm",
				"libraries-io-npm"
			],
			[
				"travis-com",
				"rollup"
			]
		],
		"Development Status": [
			[
				"travis-com-dev",
				"libraries-io-github"
			],
			[
				"snyk",
				"code-climate",
				"code-climate-coverage"
			]
		],
		"Documentation/Help": [
			"inch",
			"twitter"
		]
	},
	docs: [
		[
			"aux1",
			"travis"
		],
		[
			"code-climate",
			"code-climate-coverage"
		],
		[
			"snyk",
			"libraries-io-npm"
		]
	]
};
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	types: types,
	type: type,
	bin: bin,
	files: files,
	scripts: scripts,
	repository: repository,
	engines: engines,
	keywords: keywords,
	author: author,
	copyright: copyright,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	dependencies: dependencies,
	xo: xo,
	badges: badges
};

const itermSession = process.env.ITERM_SESSION_ID && process.env.ITERM_SESSION_ID.indexOf(':') > 0;
const colorTermTruecolor = process.env.COLORTERM && process.env.COLORTERM.includes('truecolor');
const termColor16m = process.env.TERM_COLOR && process.env.TERM_COLOR.includes('16m');
const has16m = itermSession || colorTermTruecolor || termColor16m;
if (has16m && !(/-color/.test(process.argv.join('')))) {
	process.argv.splice(2, 0, '--color=16m');
}
const hasFlag = flag => {
	const terminatorPos = process.argv.indexOf('--');
	const prefix = /^-{1,2}/.test(flag) ? '' : '--';
	const pos = process.argv.indexOf(prefix + flag);
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos)
};
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
};
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
})();
if (supportLevel === 0 && 'FORCE_COLOR' in process.env) {
	supportLevel = 1;
}
const supportsColor = process && support(supportLevel);
const termNG = {
	color: {
		level: supportsColor.level || 0,
		basic: supportsColor.hasBasic || false,
		hasBasic: supportsColor.hasBasic || false,
		has256: supportsColor.level >= 2,
		has16m: supportsColor.level >= 3
	},
	images: (process.env.TERM_IMAGES !== undefined) && supportsColor.level >= 2,
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
};

const clr = simple({format: 'sgr'});
const metadata = meta(dirname(fileURLToPath(import.meta.url)));
const renderer = truwrap({
	right: 0,
	outStream: process.stderr,
});
const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`,
	),
);
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
});
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
	.command('user-agent', 'Print the current terminal software');
const {argv} = yargsInstance;
const usage = stripIndent(colorReplacer)`
Allow user configured enhanced terminal capabilities to be queried.

The command will exit with status 0 if all the provided queries (except user-agent) are true, otherwise exits with status 1.

If user-agent is used, the command will return the string on stdout and exit status 0.

${clr.title}Usage:${clr.title.out}
${clr.command}termng ${clr.option}[command]${clr.option.out}`;
const epilogue = `${clr.title}${metadata.copyright}. ${clr.grey}Released under the MIT License.${clr.grey.out}`;
if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg,
	}).notify();
}
if (argv.help) {
	(async () => {
		const usageContent = await yargsInstance.wrap(renderer.getWidth()).getHelp();
		renderer.write(title).break(2);
		renderer.write(usage);
		renderer.break(2);
		renderer.write(usageContent);
		renderer.break(2);
		renderer.write(epilogue);
		renderer.break(2);
		process.exit(0);
	})();
}
if (argv.version) {
	process.stdout.write(metadata.version(argv.version));
	process.exit(0);
}
if (argv._.includes('user-agent')) {
	process.stdout.write(termNG.software);
	process.exit(0);
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
};
for (const query of argv._) {
	if (!matrix[query]) {
		process.exit(1);
	}
}
