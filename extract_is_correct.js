const fs = require('fs');
const path = require('path');

function extract() {
    const filePath = path.join(__dirname, 'Simple_Past_Interactive_Practice_by_lovable.html');
    const content = fs.readFileSync(filePath, 'utf8');

    function extractFunctionBody(functionName) {
        const startMarker = "function " + functionName;
        const startIndex = content.indexOf(startMarker);

        if (startIndex === -1) {
          throw new Error("Function " + functionName + " not found");
        }

        let braceCount = 0;
        let endIndex = -1;
        let foundStartBrace = false;

        for (let i = startIndex; i < content.length; i++) {
          if (content[i] === '{') {
            braceCount++;
            foundStartBrace = true;
          } else if (content[i] === '}') {
            braceCount--;
          }

          if (foundStartBrace && braceCount === 0) {
            endIndex = i + 1;
            break;
          }
        }

        if (endIndex === -1) {
          throw new Error("Could not find the end of function " + functionName);
        }

        return content.substring(startIndex, endIndex);
    }

    const normalizeCode = extractFunctionBody('normalize');
    const escapeRegExpCode = extractFunctionBody('escapeRegExp');
    const isCorrectCode = extractFunctionBody('isCorrect');

    return new Function(
        normalizeCode + "\n" +
        escapeRegExpCode + "\n" +
        isCorrectCode + "\n" +
        "return isCorrect;"
    )();
}

module.exports = extract();
