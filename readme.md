# term-ng  
Enables enhanced node.js/fish-shell/XTerm/iTerm3 feature integration.

![Project status][project-badge]
[![Build Status][build-badge]][travis]
[![Dependency Status][david-badge]][david]
[![devDependency Status][david-dev-badge]][david-dev]
[![npm Status][npm-badge]][npm]

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

```sh
	set -Ux TERM_IMAGES enabled
	set -Ux TERM_FONT full
```

In bash an `export TERM_IMAGES=enabled` in `~/.bashrc` will do the trick. I don't use tcsh or zsh anymore so can't remember exactly which files are used when those shells are invoked interactively. Fish is almost always invoked interactively - which is kind of the point of fish, it being the 'Freindly INTERACTIVE Shell' after all! Write scripts for portablility (sh/bash/perl even node) then write fish functions to interact with those scripts from the keyboard... but I digress.

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

[project-badge]: http://img.shields.io/badge/status-beta-blue.svg?style=flat
[build-badge]: http://img.shields.io/travis/MarkGriffiths/term-ng.svg?branch=master&style=flat
[david-badge]: http://img.shields.io/david/MarkGriffiths/term-ng.svg?style=flat
[david-dev-badge]: http://img.shields.io/david/dev/MarkGriffiths/term-ng.svg?style=flat
[npm-badge]: https://img.shields.io/npm/v/term-ng.svg?style=flat
[colors]: http://markgriffiths.github.io/projects/term-ng/colors.png

[travis]: https://travis-ci.org/MarkGriffiths/term-ng
[david]: https://david-dm.org/MarkGriffiths/term-ng
[david-dev]: https://david-dm.org/MarkGriffiths/term-ng#info=devDependencies
[npm]: https://www.npmjs.com/package/term-ng
