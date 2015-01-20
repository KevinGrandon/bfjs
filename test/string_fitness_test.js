var assert = require('assert');
var stringFitness = require(__dirname + '/../src/fitness/string_fitness');

suite('string fitness > ', function() {
	test('scoring', function() {
		assert.equal(stringFitness('hello world!', 'hello world!'),
			'3084');
		assert.equal(stringFitness('aello world!', 'hello world!'),
			'3065');
		assert.equal(stringFitness('hello world!asdf', 'hello world!'),
			'3080');
	});
});
