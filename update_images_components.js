const fs = require('fs');
const path = require('path');

const imageMap = {
  '/images/about-team.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  '/images/logo.png': 'https://images.unsplash.com/photo-1614031413149-161403141314?auto=format&fit=crop&q=80&w=200',
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const dirs = ['./app', './components'];
dirs.forEach(dir => {
  const files = walkDir(dir);
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [key, value] of Object.entries(imageMap)) {
      if (content.includes(key)) {
        content = content.replaceAll(key, value);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  });
});
