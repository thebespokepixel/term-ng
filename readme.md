[project-badge]: http://img.shields.io/badge/status-alpha-red.svg?style=flat
[build-badge]: http://img.shields.io/travis/MarkGriffiths/term-ng.svg?branch=master&style=flat
[david-badge]: http://img.shields.io/david/MarkGriffiths/term-ng.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/MarkGriffiths/term-ng.svg?style=flat
[npm-badge]: https://img.shields.io/npm/v/term-ng.svg?style=flat

[travis]: https://travis-ci.org/MarkGriffiths/term-ng
[david]: https://david-dm.org/MarkGriffiths/term-ng
[david-dev]: https://david-dm.org/MarkGriffiths/term-ng#info=devDependencies
[npm]: https://www.npmjs.com/package/term-ng

# term-ng  
A augmented drop-in console replacement that supports logging levels. 

![Project status][project-badge]
[![Build Status][build-badge]][travis]
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]
[![npm Status][npm-badge]][npm]

Provides enhanced node.js/fish-shell/iTerm3 integration and user experience.

- Senses enabled 24bit colour (truecolor).
- Adds support for inline images and audio via enhanced termcap info.
- Wraps 'supports-color' to enable --color=16m when appropriate.
- Very basic at the moment.
