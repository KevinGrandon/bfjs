var readlineSync = require('readline-sync');

var instructions = require('./instructions');

var REPORT_ERRORS = false;
var memory = Array();
var maxMem = 256;
var maxVal = 255;
var instructionPointer = 0;
var memPointer = 0;
var inputPointer = 0;
var program = [];
var targets = [];
var input = [];
var output = '';
var promptForInput = 0;

function initMemory() {
	for (var i = 0; i <= maxMem; i++) {
		memory[i] = 0;
	}
	memPointer = 0;
}

function initIo() {
	inputPointer = 0;
	output = '';
}

function initProg(code) {
	program.length = 0;
	for (var i = 0; i < code.length; i++) {
		var op = code.charAt(i)
		// Check it's not a carriage return or anything that will
		// break the program viewer too badly.
		if (isValidOp(op)) {
			program[program.length] = op;
		}
	}
	instructionPointer = 0;
	initTargets();
}

function initTargets() {
	var PARSE_BRACKET_ERROR = 'Parse error: [ with no matching ]';
	targets.length = 0;
	var tempStack = [];
	for (var i = 0; i < program.length; i++) {
		var op = program[i];
		if (op == '[') {
			tempStack.push(i);
		}
		if (op == ']') {
			if (tempStack.length == 0 && REPORT_ERRORS) {
				console.error(PARSE_BRACKET_ERROR);
			}
			var target = tempStack.pop();
			targets[i] = target;
			targets[target] = i;
		}
	}
	if (tempStack.length > 0 && REPORT_ERRORS) {
		console.error(PARSE_BRACKET_ERROR);
	}
}

function initInput() {
	input.length = 0;
	var in_data = process.argv[3] || '';
	for (var i = 0; i < in_data.length; i++) {
		input[input.length] = in_data.charAt(i);
	}
	inputPointer = 0;
}

function getInput() {
	if (promptForInput) {
		console.log('Enter an input character (use #xxx to specify a decimal code, !xxx for an octal code, or $xxx for a hex code). E.g., #0');
		var data = readlineSync.question('Input :');

		if ((data == null) || (!data)) return 0;
		if (data.charAt(0) == '#') {
			return parseInt(data.substr(1), 10);
		}
		if (data.charAt(0) == '!') {
			return eval('0' + data.substr(1));
		}
		if (data.charAt(0) == '$') {
			return eval('0x' + data.substr(1));
		}
		return data.charCodeAt(0);
	} else {
		var result = (inputPointer >= input.length) ? 0 : input[inputPointer].charCodeAt(0);
		inputPointer++;
		return result;
	}
}

function isValidOp(op) {
	return instructions.all.indexOf(op) !== -1;
}

function putOutput(c) {
	output += c;
}

function executeOpcode(op) {
	switch (op) {
		case '+':
			memory[memPointer] ++;
			if (memory[memPointer] > maxVal) memory[memPointer] = 0;
			break;
		case '-':
			memory[memPointer] --;
			if (memory[memPointer] < 0) memory[memPointer] = maxVal;
			break;
		case '>':
			memPointer++;
			if (memPointer >= maxMem) memPointer = 0;
			break;
		case '<':
			memPointer--;
			if (memPointer < 0) memPointer = maxMem - 1;
			break;
		case '[':
			if (memory[memPointer] == 0) instructionPointer = targets[instructionPointer];
			break;
		case ']':
			instructionPointer = targets[instructionPointer] - 1;
			break;
		case '.':
			putOutput(String.fromCharCode(memory[memPointer]));
			break;
		case ',':
			memory[memPointer] = getInput();
			break;
	}
}

function runStep() {
	// execute instrcution under instructionPointer
	var op = program[instructionPointer];
	executeOpcode(op);
	// increment instructionPointer
	instructionPointer++;
	if (instructionPointer >= program.length) {
		return;
	}
	runStep();
}

module.exports = function(prog) {
	//console.log('Running', prog);
	initProg(prog);
	initMemory();
	initIo();
	initInput();
	runStep();
	return output;
};
