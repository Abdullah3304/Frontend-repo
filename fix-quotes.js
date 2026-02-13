const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Fix mixed quotes: `${...}' -> `${...}`
  content = content.replace(/`\$\{API_BASE_URL\}([^`]*?)'/g, '`${API_BASE_URL}$1`');
  content = content.replace(/`\$\{BASE_URL\}([^`]*?)'/g, '`${BASE_URL}$1`');
  
  // Fix mixed quotes: `${...}" -> `${...}`
  content = content.replace(/`\$\{API_BASE_URL\}([^`]*?)"/g, '`${API_BASE_URL}$1`');
  content = content.replace(/`\$\{BASE_URL\}([^`]*?)"/g, '`${BASE_URL}$1`');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${file}`);
    fixed++;
  }
});

console.log(`\n🎉 Fixed ${fixed} files with mixed quotes`);

