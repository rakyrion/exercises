import { expect, test } from '@jest/globals';

function getCapitalizeFirstWord(name: string): string {
	if (name == null) {
		throw new Error('Failed to capitalize first word with null');
	}
	if (!name) {
		return name;
	}
	return name.split(' ').map(
		n => n.length > 1 ? (n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()) : n
	).join(' ');
}

test('1. TEST NULL', function () {
	// null as string won't throw error and will just capitalize first letter
	const result = getCapitalizeFirstWord('null')
	expect(result).toBe('Null')

});

test('2. TEST EMPTY STRING', function () {
	const result = getCapitalizeFirstWord('')
	expect(result).toBe('')

});

test('3. TEST ALREADY FULL CAPS STRING', function () {
	// WILL KEEP FIRST LETTER CAPITALIZED AND LOWER CASE THE REST
	const result = getCapitalizeFirstWord('CAPS')
	expect(result).toBe('Caps')

});

test('4. TEST STRING WITH SPACES', function () {
	// SINCE SPLITS ON EACH ' ' WILL CAPITALIZE EACH WORD SEPARATED BY EMPTY SPACE AND LOWER CASE THE REST
	const result = getCapitalizeFirstWord('String wIth spAces')
	expect(result).toBe('String With Spaces')

});

test('5. TEST STRING WITH SYMBOLS AND NUMBERS', function () {
	// AS FIRST LETTER IS A SYMBOL, IT KEEPS EXACTLY THE SAME LOWER OR UPPER CASE AND WILL LOWER CASE THE REST
	const result = getCapitalizeFirstWord('&stR1!nG%')
	expect(result).toBe('&str1!ng%')

});