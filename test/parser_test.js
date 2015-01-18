var assert = require('assert');
var parser = require(__dirname + '/../src/lib/parser');

suite('parser > ', function() {
	test('to token stream', function() {
		var code = '-[>+<-].,';
		var result = parser.tokenize(code);
		var expected = [
		{"symbol":"-"},[{"symbol":"["},{"symbol":">"},{"symbol":"+"},{"symbol":"<"},{"symbol":"-"},{"symbol":"]"}],{"symbol":"."},{"symbol":","}
		];
		assert.deepEqual(result, expected);
	});

	test('to program', function() {
		var code = '-[>+<-].,';
		var result = parser.programize(parser.tokenize(code));
		assert.deepEqual(result, code);
	});
});
