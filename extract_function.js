const fs = require('fs');
const path = require('path');

function extract() {
    const filePath = path.join(__dirname, 'Simple_Past_Interactive_Practice_by_lovable.html');
    const content = fs.readFileSync(filePath, 'utf8');

    const functionName = 'getMotivationMessage';
    const startMarker = `function ${functionName}`;
    const startIndex = content.indexOf(startMarker);

    if (startIndex === -1) {
      throw new Error(`Function ${functionName} not found`);
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
      throw new Error(`Could not find the end of function ${functionName}`);
    }

    const functionCode = content.substring(startIndex, endIndex);
    return new Function(`return (${functionCode})`)();
}

module.exports = extract();
