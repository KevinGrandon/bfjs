const MIN_PROGRAM_SIZE = 20;
const MAX_PROGRAM_SIZE = 40;

var instructions = require('./instructions');
var random = require('./../util/random_inc');

module.exports = function(callback) {
	var size = random(MIN_PROGRAM_SIZE, MAX_PROGRAM_SIZE); 
	var program = '';

	for (var i = 0; i < size; i++) {
		program += instructions.randomInstruction();
	}
	callback(program);
};
