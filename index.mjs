const itermSession = process.env.ITERM_SESSION_ID && process.env.ITERM_SESSION_ID.indexOf(':') > 0;
const termColor = process.env.TERM_COLOR && process.env.TERM_COLOR.indexOf('16m') >= 0;
const has16m = itermSession || termColor;

if (has16m && !/-color/.test(process.argv.join(''))) {
  process.argv.splice(2, 0, '--color=16m');
}

const hasFlag = flag => {
  const terminatorPos = process.argv.indexOf('--');
  const prefix = /^-{1,2}/.test(flag) ? '' : '--';
  const pos = process.argv.indexOf(prefix + flag);
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

const support = level => {
  if (level === 0) {
    return false;
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
};

let supportLevel = (() => {
  if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
    return 1;
  }

  if (process.stdout && !process.stdout.isTTY) {
    return 0;
  }

  if (process.platform === 'win32') {
    return 1;
  }

  if ('CI' in process.env || 'TEAMCITY_VERSION' in process.env) {
    return 0;
  }

  if ('COLORTERM' in process.env) {
    return 1;
  }

  if (process.env.TERM === 'dumb') {
    return 0;
  }

  if (/^xterm-256(?:color)?/.test(process.env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    return 1;
  }

  return 0;
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
  images: process.env.TERM_IMAGES !== undefined && supportsColor.level >= 2,
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

export default termNG;
