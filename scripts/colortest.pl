#!/usr/bin/perl
# Mark Griffiths <mark@thebespokepixel.com>
# MIT Licensed

print "\n  \x1b[38;5;15m\x1b[1mSelect Graphic Rendition (SGR) Test\x1b[0m\n\n";
# first the system ones:
print "   \x1b[38;5;8m╭ \x1b[38;5;15mDirect 4 bit SGR colour selector                                                          \x1b[38;5;8m╭ \x1b[38;5;15mExtended 8-bit color selector\x1b[0m\n";
print "   \x1b[38;5;8m├ Foreground \\e[{color}m ────────────────────┬ Background \\e[{color}m ────────────────────╮ ├ Foreground \\e[38;5;{color}m ───────────────┬ Background \\e[48;5;{color}m ───────────────╮\n";
print "   \x1b[38;5;8m│  ";
for ($color = 30; $color < 38; $color++) {
	print "\x1b[${color}m  ●  ";
}
print "  \x1b[38;5;8m│  ";
for ($color = 40; $color < 48; $color++) {
	print "\x1b[${color}m     ";
}
print "\x1b[0m  \x1b[38;5;8m│ │  ";
for ($color = 0; $color < 8; $color++) {
	print "\x1b[38;5;${color}m  ●  ";
}
print "  \x1b[38;5;8m│  ";
for ($color = 0; $color < 8; $color++) {
	print "\x1b[48;5;${color}m     ";
}
print "\x1b[0m  \x1b[38;5;8m│\n";

print "   │  \x1b[38;5;238m [30 \x1b[38;5;235m";
for ($color = 31; $color < 38; $color++) {
	$l=sprintf("%02d",$color);
	print "\x1b[${color}m [$l ";
}
print "  \x1b[38;5;8m│  \x1b[38;5;250m [40 \x1b[38;5;0m";
for ($color = 41; $color < 48; $color++) {
	$l=sprintf("%02d",$color);
	print "\x1b[${color}m [$l ";
}
print "\x1b[0m  \x1b[38;5;8m│ │  \x1b[38;5;238m 000 ";
for ($color = 1; $color < 8; $color++) {
	$l=sprintf("%03d",$color);
	print "\x1b[38;5;${color}m $l ";
}
print "\x1b[38;5;8m  │  \x1b[38;5;250m 000 \x1b[38;5;0m";
for ($color = 1; $color < 8; $color++) {
	$l=sprintf("%03d",$color);
	print "\x1b[48;5;${color}m $l ";
}
print "\x1b[0m  \x1b[38;5;8m│\n";
print "   ├────────────────────────────────────────────┼────────────────────────────────────────────┤ ├────────────────────────────────────────────┼────────────────────────────────────────────┤\n";
print "   │  ";
for ($color = 90; $color < 98; $color++) {
	print "\x1b[${color}m  ●  ";
}
print "  \x1b[38;5;8m│  ";
for ($color = 100; $color < 108; $color++) {
	print "\x1b[${color}m     ";
}
print "\x1b[0m  \x1b[38;5;8m│ │  ";
for ($color = 8; $color < 16; $color++) {
	print "\x1b[38;5;${color}m  ●  ";
}
print "  \x1b[38;5;8m│  ";
for ($color = 8; $color < 16; $color++) {
	print "\x1b[48;5;${color}m     ";
}
print "\x1b[0m  \x1b[38;5;8m│\n";

print "   │  ";
for ($color = 90; $color < 98; $color++) {
	$l=sprintf("%02d",$color);
	print "\x1b[${color}m [$l ";
}
print "  \x1b[38;5;8m│  \x1b[38;5;0m";
for ($color = 100; $color < 108; $color++) {
	$l=sprintf("%03d",$color);
	print "\x1b[${color}m $l ";
}
print "\x1b[0m  \x1b[38;5;8m│ │  ";
for ($color = 8; $color < 16; $color++) {
	$l=sprintf("%03d",$color);
	print "\x1b[38;5;${color}m $l ";
}
print "  \x1b[38;5;8m│  \x1b[38;5;0m";
for ($color = 8; $color < 16; $color++) {
	$l=sprintf("%03d",$color);
	print "\x1b[48;5;${color}m $l ";
}
print "\x1b[0m  \x1b[38;5;8m│\n";
print "   \x1b[38;5;8m╰ High intensity ────────────────────────────┴────────────────────────────────────────────╯ ╰────────────────────────────────────────────┴────────────────────────────────────────────╯\n\n";

print "  \x1b[38;5;8m╭ \x1b[38;5;15m\x1b[1m256 colour extended mode\x1b[0m (8-bit): Color cube, 6x6x6\x1b[0m\n";

for ($green = 0; $green < 6; $green++) {
	print "  ";
	for ($red = 0; $red < 6; $red++) {

			for ($blue = 0; $blue < 6; $blue++) {
				$color = 16 + ($red * 36) + ($green * 6) + $blue;
				print "\x1b[48;5;${color}m     ";
			}
		print "\x1b[0m ";
	}
	print "\n  ";
	for ($red = 0; $red < 6; $red++) {
		for ($blue = 0; $blue < 6; $blue++) {
			$color = 16 + ($red * 36) + ($green * 6) + $blue;
			$l=sprintf("%03d",$color);
			if ($blue<3 && $green<2 && $red<2){
				print "\x1b[38;5;7m"
			} else {
				print "\x1b[38;5;0m"
			}
			print "\x1b[48;5;${color}m $l ";
		}
		print "\x1b[0m ";
	}
	print "\n  ";
	for ($red = 0; $red < 6; $red++) {

			for ($blue = 0; $blue < 6; $blue++) {
				$color = 16 + ($red * 36) + ($green * 6) + $blue;
				print "\x1b[48;5;${color}m     ";
			}
		print "\x1b[0m ";
	}
	print "\n";
}

# now the grayscale ramp
print "\n  \x1b[38;5;8m╭ \x1b[38;5;15m\x1b[1mGrayscale ramp:\x1b[0m\n";
print "  \x1b[38;5;8m│\x1b[48;5;0m        ";
for ($color = 232; $color < 256; $color++) {
	print "\x1b[48;5;${color}m       ";
}
print "\x1b[48;5;15m        \x1b[0m\n";
print "  \x1b[38;5;8m│\x1b[38;5;7m\x1b[48;5;0m   000  ";
for ($color = 232; $color < 256; $color++) {
	$l=sprintf("%03d",$color);
	if ($color==240){
		print "\x1b[38;5;0m"
	}
	#(255 - $color) + 232;
	print "\x1b[48;5;${color}m  $l  ";
}
print "\x1b[48;5;15m  015   \x1b[0m\n\n";

# now the color cube
print "  \x1b[38;5;8m╭ \x1b[38;5;15m\x1b[1m\x1b[38;5;1mR\x1b[38;5;2mG\x1b[38;5;12mB\x1b[38;5;15m 3-byte Truecolour mode:\x1b[0m Color cube\n";
for ($green = 0; $green < 256; $green+=15) {
	print "  ";
	for ($red = 0; $red < 256; $red+=51) {
		for ($index = 0; $index < 256; $index+=8.8) {
			$blue=int($index);
			print "\x1b[48;2;${red};${green};${blue}m ";
		}
		print "\x1b[0m ";
	}
	print "\n";
}

# now the grayscale ramp
print "\n  Grayscale ramp:\n  ";
for ($index = 0; $index < 256; $index+=1.39) {
	$gray=int($index);
	print "\x1b[48;2;${gray};${gray};${gray}m ";
}
print "\x1b[0m\n  ";
for ($index = 0; $index < 256; $index+=1.39) {
	$gray=int($index);
	print "\x1b[48;2;${gray};${gray};${gray}m ";
}
print "\x1b[0m\n\n";

print "  \x1b[38;5;15m\x1b[1mType Modes \x1b[22m\x1b[2m(Default Foreground/Background Colours)\x1b[0m\n\n";

print "             |\x1b[39m\x1b[49m\x1b[7m      Background      \x1b[27m|      Foreground      |      \x1b[1mBold\x1b[22m      |      \x1b[97mBright\x1b[39m      |      \x1b[2mFaint\x1b[22m      |      \x1b[3mItalic\x1b[23m      |      \x1b[4mUnderline\x1b[24m      |      \x1b[5mBlink\x1b[25m      |\n";
#print             "             |      Background      |      Foreground      |      Bold      |      Bright      |      Faint      |      Italic      |      Underline      |      Blink      |\n";
print  "  \x1b[38;5;3m[39m[49m [7m                      [27m                       [1m    [22m     [97m      [39m      [2m     [22m      [3m      [23m      [4m         [24m      [5m     [25m   [0m\n";
print "  \x1b[38;5;12m↑Default ↑Negative                ↑Positive                  ↑On    ↑Off     ↑On       ↑Off      ↑On     ↑Off      ↑On      ↑Off      ↑On         ↑Off      ↑On     ↑Off   ↑Full Reset\x1b[0m\n\n";
