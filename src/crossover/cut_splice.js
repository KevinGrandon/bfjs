var random = require('./..//util/random_inc');

/**
 * A simple strategy to mix genes within the two programs.
 * Uses a "cut and splice" technique to augment and return a program.
 * Applies the technique to the first program and returns that.
 * To apply the cut and splice to the second program, reverse the args and call this again.
 */
module.exports = function(prog1, prog2) {
	var pos1 = random(0, prog1.length - 1);
	var pos2 = random(0, prog2.length - 1);

	var newProg = prog1.substring(0, pos1) + prog2.substring(pos2);
	return newProg;
};
