const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert');

function extractFunctions() {
    const htmlPath = path.join(__dirname, '../Simple_Past_Interactive_Practice_by_lovable.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    function getFuncCode(name) {
        const startMarker = `function ${name}`;
        const startIndex = html.indexOf(startMarker);
        if (startIndex === -1) throw new Error(`Function ${name} not found`);

        let braceCount = 0;
        let foundStartBrace = false;
        let endIndex = -1;

        for (let i = startIndex; i < html.length; i++) {
            if (html[i] === '{') {
                braceCount++;
                foundStartBrace = true;
            } else if (html[i] === '}') {
                braceCount--;
            }

            if (foundStartBrace && braceCount === 0) {
                endIndex = i + 1;
                break;
            }
        }

        if (endIndex === -1) throw new Error(`Could not find end of ${name}`);
        return html.substring(startIndex, endIndex);
    }

    const normalizeCode = getFuncCode('normalize');
    const isPartialCode = getFuncCode('isPartial');
    // escapeRegExp might be needed if the file wasn't changed
    let escapeRegExpCode = '';
    try {
        escapeRegExpCode = getFuncCode('escapeRegExp');
    } catch (e) {
        // Ignored
    }

    return new Function(`
        ${normalizeCode}
        ${escapeRegExpCode}
        ${isPartialCode}
        return isPartial;
    `)();
}

const isPartial = extractFunctions();

test('isPartial: user input is contained in correct answer', () => {
    assert.strictEqual(isPartial('play', 'played'), true, 'Should return true when input is a substring of correct answer');
    assert.strictEqual(isPartial('did', 'did you put'), true, 'Should return true for word match');
});

test('isPartial: correct answer is contained in user input', () => {
    assert.strictEqual(isPartial('I played football', 'played'), true, 'Should return true when correct answer is a substring of input');
    assert.strictEqual(isPartial('did you put it there', 'did you put'), true, 'Should return true when correct phrase is part of input');
});

test('isPartial: false when strings match exactly after normalization', () => {
    assert.strictEqual(isPartial('played', 'played'), false, 'Exact matches are not partial');
    assert.strictEqual(isPartial(' Played! ', 'played'), false, 'Exact matches with spaces/punctuation are not partial');
    assert.strictEqual(isPartial('PLAYED', 'played'), false, 'Exact case-insensitive matches are not partial');
});

test('isPartial: false when no overlap', () => {
    assert.strictEqual(isPartial('went', 'played'), false, 'Unrelated strings should return false');
    assert.strictEqual(isPartial('cat', 'dog'), false, 'Unrelated strings should return false');
});

test('isPartial: edge cases (empty strings)', () => {
    assert.strictEqual(isPartial('', 'played'), false, 'Empty user input should not partially match');
    assert.strictEqual(isPartial('played', ''), false, 'Empty correct answer should not partially match');
});
