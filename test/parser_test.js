var assert = require('assert');
var parser = require(__dirname + '/../src/lib/parser');

suite('parser > ', function() {
	test('generates proper ast', function() {
		var code = '-[>+<-].,';
		var result = parser(code);
		var expected = [
		{"symbol":"-"},[{"symbol":"["},{"symbol":">"},{"symbol":"+"},{"symbol":"<"},{"symbol":"-"},{"symbol":"]"}],{"symbol":"."},{"symbol":","}
		];
		assert.deepEqual(result, expected);
	});
});
