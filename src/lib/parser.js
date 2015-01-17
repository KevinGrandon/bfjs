/**
 * Builds an AST (abstract syntax tree) from brainfuck.
 */

function Increment() {
	this.symbol = '+';
}

function Decrement() {
	this.symbol = '-';
}

function Next() {
	this.symbol = '>';
}

function Prev() {
	this.symbol = '<';
}

function Input() {
	this.symbol = ',';
}

function Output() {
	this.symbol = '.';
}

function LoopStart() {
	this.symbol = '[';
}

function LoopEnd() {
	this.symbol = ']';
}

function getLoop(prog, start) {
	// Get the section of the loop.
	var end = getLoopEnd(prog, start);
	var loopPart = prog.substring(start + 1, end - 1);

	// Re-run the parser on this part.
	return module.exports(loopPart);
}

function getLoopEnd(prog, position) {
	var depth = 0;
	var found = false;

	while (!found) {
		if (position > prog.length) {
			break;
		}

		var currChar = prog[position];
		switch (currChar) {
			case '[':
				// In a nested loop, increment depth.
				depth++;
				break;
			case ']':
				if (depth == 1) {
					// We found the correct end brace.
					found = true;
					break;
				} else {
					// Keep searching.
					depth--;
				}
				break;
		}
		position++;
	}
	return position;
}

module.exports = function(prog) {
	var ast = [];

	for (var i = 0; i < prog.length; i++) {
		var inst = prog[i];
		switch (inst) {
			case '+':
				ast.push(new Increment());
				break;
			case '-':
				ast.push(new Decrement());
				break;
			case '>':
				ast.push(new Next());
				break;
			case '<':
				ast.push(new Prev());
				break;
			case ',':
				ast.push(new Input());
				break;
			case '.':
				ast.push(new Output());
				break;
			case '[':
				var loop = [new LoopStart()]
					.concat(getLoop(prog, i))
					.concat(new LoopEnd());
				ast.push(loop);

				// Increment until the end of the loop.
				i += loop.length - 1;
				break;
		}
	}

	return ast;
};