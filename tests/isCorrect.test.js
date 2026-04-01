const test = require('node:test');
const assert = require('node:assert');
const isCorrect = require('../extract_is_correct.js');

test('isCorrect handles exact matches', (t) => {
  assert.strictEqual(isCorrect('hello', ['hello']), true);
  assert.strictEqual(isCorrect('test string', ['test string', 'another']), true);
});

test('isCorrect handles case insensitivity', (t) => {
  assert.strictEqual(isCorrect('Hello', ['hello']), true);
  assert.strictEqual(isCorrect('TEST STRING', ['test string']), true);
  assert.strictEqual(isCorrect('MiXeD CaSe', ['mixed case']), true);
});

test('isCorrect handles leading/trailing/multiple spaces', (t) => {
  assert.strictEqual(isCorrect(' hello ', ['hello']), true);
  assert.strictEqual(isCorrect('test   string', ['test string']), true);
  assert.strictEqual(isCorrect('  spaces  all  around  ', ['spaces all around']), true);
});

test('isCorrect handles punctuation removal', (t) => {
  assert.strictEqual(isCorrect('hello!', ['hello']), true);
  assert.strictEqual(isCorrect('test, string.', ['test string']), true);
  assert.strictEqual(isCorrect('"quotes" and ?marks?', ['quotes and marks']), true);
  assert.strictEqual(isCorrect("don't", ['dont']), true); // Note: normalize removes '
});

test('isCorrect handles regex special characters without breaking', (t) => {
  assert.strictEqual(isCorrect('a+b=c', ['a+b=c']), true); // + and = are preserved
  assert.strictEqual(isCorrect('cost $100', ['cost $100']), true); // $ is preserved
  assert.strictEqual(isCorrect('this * that', ['this * that']), true); // * is preserved
  assert.strictEqual(isCorrect('test [brackets]', ['test [brackets]']), true); // [ and ] are preserved
});

test('isCorrect returns false for no match', (t) => {
  assert.strictEqual(isCorrect('hello', ['world']), false);
  assert.strictEqual(isCorrect('hello', []), false);
  assert.strictEqual(isCorrect('test', ['testing']), false);
  assert.strictEqual(isCorrect('testing', ['test']), false);
});

test('isCorrect matches any option in acceptedAnswers', (t) => {
  assert.strictEqual(isCorrect('apple', ['banana', 'apple', 'orange']), true);
  assert.strictEqual(isCorrect(' ORANGE ', ['banana', 'apple', 'orange']), true);
  assert.strictEqual(isCorrect('pear', ['banana', 'apple', 'orange']), false);
});
