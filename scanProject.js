const fs = require('fs');
const path = require('path');
const projectRoot = path.resolve('.');
const outputFile = 'project-structure.txt';

function scanDir(dir, indent='') {
    const items = fs.readdirSync(dir);
    for (let item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            fs.appendFileSync(outputFile, \\📁 \\n\);
            scanDir(fullPath, indent+'  ');
        } else {
            fs.appendFileSync(outputFile, \\📄 \ (\ bytes)\n\);
        }
    }
}

fs.writeFileSync(outputFile, \Project scan: \\n\n\);
scanDir(projectRoot);
console.log('✅ Project scanned! See project-structure.txt');
