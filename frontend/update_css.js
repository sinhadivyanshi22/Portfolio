const fs = require('fs');
let css = fs.readFileSync('frontend/style.css', 'utf8');

if (!css.includes('.dark .glass-card')) {
    css = css.replace('.glass-card {', '.glass-card {\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n}\n.dark .glass-card {');
    // also fix body background
    css = css.replace('body {\n  background-color: #06070b;\n  color: #e2e8f0;', 'body {\n  /* Tailwind classes handle bg/text colors */');
    fs.writeFileSync('frontend/style.css', css);
}

console.log('CSS updated successfully');
