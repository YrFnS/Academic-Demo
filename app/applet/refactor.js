const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if file contains Shell
      if (content.includes('Shell')) {
        // Remove import { Shell } from '@/components/shell';
        content = content.replace(/import\s*{\s*Shell\s*}\s*from\s*['"]@\/components\/shell['"];?\n?/g, '');
        
        // Remove <Shell> and </Shell> tags but keep their contents
        // We need to be careful with indentation, but a simple replace is usually fine
        content = content.replace(/<Shell>\s*/g, '');
        content = content.replace(/\s*<\/Shell>/g, '');
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Processed ${fullPath}`);
      }
    }
  }
}

processDirectory('/app/applet/app');
console.log('Done!');
