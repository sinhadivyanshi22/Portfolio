const fs = require('fs');
let js = fs.readFileSync('frontend/script.js', 'utf8');

const themeScript = `
/* =================================================================
   9. THEME TOGGLE (LIGHT/DARK MODE)
   ================================================================= */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Set Light Mode as Default if no preference is saved
if (localStorage.theme === 'dark') {
  htmlEl.classList.add('dark');
} else {
  htmlEl.classList.remove('dark'); // Default to light
  localStorage.theme = 'light';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    if (htmlEl.classList.contains('dark')) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  });
}
`;

if (!js.includes('THEME TOGGLE (LIGHT/DARK MODE)')) {
    js = js + '\n\n' + themeScript;
    fs.writeFileSync('frontend/script.js', js);
}
console.log('Script updated successfully');
