
if (
	(process.env.ITERM_SESSION_ID && process.env.ITERM_SESSION_ID.includes(':')) ||
	(process.env.TERM_COLOR && process.env.TERM_COLOR.includes('16m'))
) {
	if (!(/\-color/.test(process.argv.join('')))) {
		process.argv.splice(2, 0, '--color=16m')
	}
}
