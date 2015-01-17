var random = require('./../util/random_inc');

exports.all = [
	'+',
	'-',
	'>',
	'<',
	'[',
	']',
	'.',
	',',
	//'#' - Unused
];

/**
 * Returns a random instruction.
 */
exports.randomInstruction = function() {
	return exports.all[random(0, exports.all.length - 1)];
};
