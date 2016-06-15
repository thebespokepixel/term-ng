# term-ng  
>Enables enhanced node.js/fish-shell/XTerm/iTerm3 feature integration.
>
>![Project status][project-badge]
[![npm Status][npm-badge]][npm]
[![XO code style][xo-badge]][xo]
[![Chat on Gitter][gitter-badge]][gitter]  
[![Build Status][build-badge]][travis]
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]

## TermNG (Next Generation)

-	Senses 24bit colour (truecolor) when `$TERM_COLOR=16m` environment variable is set.
-	Adds `--color=16m` to front of process.argv before wrapping the `supports-color` module.
-	Indicate enhanced media support by setting:
	+	`$TERM_IMAGES=enabled` : Allow rendering of inline images using OSC sequences.
	+	`$TERM_AUDIO=enabled` : Allow enhanced audio.
-	Indicate that you use a font that has box drawing or full extended characters.
	+	`$TERM_FONT=box` : Terminal font has UTF8 box drawing characters.
	+	`$TERM_FONT=full` : Terminal font has full UTF8 extras (such as Menlo, DejaVu Mono).
-	Sense $TERM suffixes to indicate enhanced termcap capabilities.

In fish, it's a simple as defining a universal, exported variable.

```shell
	set -Ux TERM_IMAGES enabled
	set -Ux TERM_FONT full
```

In bash an `export TERM_IMAGES=enabled` in `~/.bashrc` will do the trick. I don't use tcsh or zsh anymore so can't remember exactly which files are used when those shells are invoked interactively. Fish is almost always invoked interactively - which is kind of the point of fish, it being the 'Freindly INTERACTIVE Shell' after all! Write scripts for portablility (sh/bash/perl even node) then write fish functions to interact with those scripts from the keyboard... but I digress.

### Usage

```shell
  > npm install --save term-ng
```

```js

  const termNG = require('term-ng')

  // returns an object:
  
  // Color support
  termNG.color.basic // Boolean - is there basic color support.
  termNG.color.level    // Integer - 0 = None, 1 = Basic, 2 = 256 colors, 3 = 24 bit color
  termNG.color.has256   // Boolean - terminal supports 256 colors
  termNG.color.has16m   // Boolean - terminal supports 16 million (24 bit) color

  // Images support
  termNG.images // Boolean - Does the terminal support inline images
                // env TERM_IMAGES=enabled to set 

  // Audio support
  termNG.audio // Boolean - Should the terminal support audio playback?
               // env TERM_AUDIO=enabled to set
  
  // Font support
  termNG.font.basic    // Boolean - font has basic box drawing symbols
  termNG.font.enhanced // Boolean - font has 'full' Unicode character support
                       // env TERM_FONT=[box|full] to set

  // Termcap support
  termNG.termcap.basic    // Boolean - using the default termcap
  termNG.termcap.enhanced // Boolean - using an enhanced/custom termcap
                          // env TERM_ENHANCED=enabled to override

  // Terminal software
  termNG.software // String - name of running terminal software, i.e. 'iTerm.app'

```

### CLI Usage

```shell

  > npm install --global term-ng

  > term-ng --help
```

```
  ...
  Usage:
  termng [command]

  Commands:
  has-color      Is basic color supported?
  has-256        Is 256 color supported?
  has-16m        Is 24 bit color supported?
  has-images     Are images supported? (set $TERM_IMAGES=enabled)
  has-audio      Is audio supported? (set $TERM_AUDIO=enabled)
  has-box-font   Is audio supported? (set $TERM_FONT=box)
  has-full-font  Is audio supported? (set $TERM_FONT=full)
  is-enhanced    Is the current terminal using an enhanced termcap? (set $TERM_ENHANCED=enabled)
  user-agent     Print the current terminal software

  Options:
  -h, --help     Display this help.
  -v, --version  Return the current version on stdout. -vv Return name & version.
  --color        Force color depth --color=256|16m. Disable with --no-color

```


### Notes on enhancing termcap

In some of my 'private' admin/control systems, I use a customised terminfo database that wraps some of the (very useful) enhanced OSC abilities of more recent iTerm builds into new commands available via `tput` (which I further wrap in fish functions).

The `terminfo` directory above contains `iTerm.ti`. Using `/usr/bin/tic` and ncurses' terminfo database (available from [invisible-island.net](http://invisible-island.net/ncurses/ncurses.html#downloads)), I build a new terminal type `xterm-256color+iterm3`, and change the Terminal type preference in iTerm to the same, setting the $TERM environment variable.

The new terminfo entries are built thusly...

```sh
cd term-ng/terminfo
curl http://invisible-island.net/datafiles/current/terminfo.src.gz
gunzip terminfo.src.gz
tic -xrs -e xterm-256color terminfo.src
tic -xsv3 iTerm.ti
```

This create a new, updated xterm-256color and then extends it for iTerm. this is non-destructive as it creates new entries at ` ~/.terminfo/`. Simply delete this directory to return the terminfo databases back to the original OS provided state.

A word of caution... while this has worked very well for me, I have found that some things complain about an unrecognized term type - Homebrew is notable here. A simple workaround is to have a standard `xterm-256color` profile defined to use when brewing.

### Terminal Color Test

From inside the package directory, running `npm run-script colors` will generate a preview of the entire color gamut your terminal is capable of. Output of a recent iTerm beta shown below:

![Color preview][colors]

[colors]: https://raw.githubusercontent.com/MarkGriffiths/term-ng/master/media/colors.png

[project-badge]: http://img.shields.io/badge/status-beta-blue.svg?style=flat
[build-badge]: http://img.shields.io/travis/MarkGriffiths/term-ng.svg?branch=master&style=flat
[david-badge]: http://img.shields.io/david/MarkGriffiths/term-ng.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/MarkGriffiths/term-ng.svg?style=flat
[npm-badge]: https://img.shields.io/npm/v/term-ng.svg?style=flat
[xo-badge]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[gitter-badge]: https://badges.gitter.im/MarkGriffiths/help.svg

[travis]: https://travis-ci.org/MarkGriffiths/term-ng
[david]: https://david-dm.org/MarkGriffiths/term-ng
[david-dev]: https://david-dm.org/MarkGriffiths/term-ng#info=devDependencies
[npm]: https://www.npmjs.com/package/term-ng
[xo]: https://github.com/sindresorhus/xo
[gitter]: https://gitter.im/MarkGriffiths/help?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
