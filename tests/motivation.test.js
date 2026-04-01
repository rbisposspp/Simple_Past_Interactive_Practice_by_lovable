const test = require('node:test');
const assert = require('node:assert');
const getMotivationMessage = require('../extract_function.js');

test('getMotivationMessage handles 100% score', (t) => {
  assert.strictEqual(getMotivationMessage('A2', 100), 'Perfect! Excellent work!');
  assert.strictEqual(getMotivationMessage('B1', 100), 'Flawless! Outstanding!');
});

test('getMotivationMessage handles >= 80% score', (t) => {
  assert.strictEqual(getMotivationMessage('A2', 80), 'Great job! Almost perfect!');
  assert.strictEqual(getMotivationMessage('A2', 99), 'Great job! Almost perfect!');
  assert.strictEqual(getMotivationMessage('B1', 80), 'Great job! Just a few to review.');
  assert.strictEqual(getMotivationMessage('B1', 99), 'Great job! Just a few to review.');
});

test('getMotivationMessage handles >= 60% score', (t) => {
  assert.strictEqual(getMotivationMessage('A2', 60), 'Good effort! Review and try again.');
  assert.strictEqual(getMotivationMessage('A2', 79), 'Good effort! Review and try again.');
  assert.strictEqual(getMotivationMessage('B1', 60), 'Good progress. Review the tricky ones.');
  assert.strictEqual(getMotivationMessage('B1', 79), 'Good progress. Review the tricky ones.');
});

test('getMotivationMessage handles < 60% score', (t) => {
  assert.strictEqual(getMotivationMessage('A2', 59), 'Keep practicing! You will get there.');
  assert.strictEqual(getMotivationMessage('A2', 0), 'Keep practicing! You will get there.');
  assert.strictEqual(getMotivationMessage('B1', 59), 'Keep at it! Focus on the hints.');
  assert.strictEqual(getMotivationMessage('B1', 0), 'Keep at it! Focus on the hints.');
});

test('getMotivationMessage handles case sensitivity and CEFR variations', (t) => {
  assert.strictEqual(getMotivationMessage('a2', 100), 'Perfect! Excellent work!');
  assert.strictEqual(getMotivationMessage('A', 100), 'Perfect! Excellent work!');
  assert.strictEqual(getMotivationMessage('b', 100), 'Flawless! Outstanding!');
  assert.strictEqual(getMotivationMessage('', 100), 'Flawless! Outstanding!');
});
