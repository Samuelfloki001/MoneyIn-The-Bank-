const fs = require('fs');

try {
  const data = fs.readFileSync('firebase.json', 'utf8');
  JSON.parse(data);
  console.log('✅ firebase.json is valid JSON');
} catch (err) {
  console.error('❌ firebase.json has an error:');
  console.error(err.message);
}