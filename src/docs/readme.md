# term-ng  
>Enables enhanced node.js/fish-shell/XTerm/iTerm3 feature integration.

${badges}

## TermNG (Next Generation)

- Senses 24bit colour (truecolor) when `$TERM_COLOR=16m` environment variable is set.
- Adds `--color=16m` to front of process.argv before wrapping the `supports-color` module.
- Indicate enhanced media support by setting:
  + `$TERM_IMAGES=enabled` : Allow rendering of inline images using OSC sequences.
  + `$TERM_AUDIO=enabled` : Allow enhanced audio.
- Indicate that you use a font that has box drawing or full extended characters.
  + `$TERM_FONT=box` : Terminal font has UTF8 box drawing characters.
  + `$TERM_FONT=full` : Terminal font has full UTF8 extras (such as Menlo, DejaVu Mono).
- Sense $TERM suffixes to indicate enhanced termcap capabilities.

In fish, it's a simple as defining a universal, exported variable.

```shell
  set -Ux TERM_IMAGES enabled
  set -Ux TERM_FONT full
```

In bash an `export TERM_IMAGES=enabled` in `~/.bashrc` will do the trick. I don't use tcsh or zsh anymore so can't remember exactly which files are used when those shells are invoked interactively. Fish is almost always invoked interactively - which is kind of the point of fish, it being the 'Friendly INTERACTIVE Shell' after all! Write scripts for portablility (sh/bash/perl even node) then write fish functions to interact with those scripts from the keyboard... but I digress.

### Usage

### Terminal Color Test

From inside the package directory, running `npm run-script colors` will generate a preview of the entire color gamut your terminal is capable of. Output of a recent iTerm shown below:

![Color preview][colors]

[colors]: https://raw.githubusercontent.com/MarkGriffiths/term-ng/master/media/colors.png

## Documentation
Full documentation can be found at [https://markgriffiths.github.io/term-ng/][1]

[1]: https://markgriffiths.github.io/term-ng/
