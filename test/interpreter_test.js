var assert = require('assert');
var interpreter = require(__dirname + '/../src/lib/interpreter');

suite('interpreter > ', function() {
	test('interprets brainfuck', function() {
		assert.equal(interpreter('++++++++[<++++++++>-]<+.'),
			'A');
		assert.equal(interpreter('++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.'),
			'Hello World!\n');
	});
});
