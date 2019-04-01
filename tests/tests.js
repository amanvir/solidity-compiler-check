import test from 'ava';
import parser from '../src/parser/parser';

test.beforeEach(t => {
	t.context.p = new parser()
})

test('it extracts the version from the code', t => {
	const testContract = `
		pragma solidity ^0.4.23;
		contract test {
			uint256 a;
			function f() {}
		}
	`

	const ast = t.context.p.parse(testContract);	
	const result = t.context.p.extractVersion(ast)
	t.deepEqual(result, '^0.4.23')
});
