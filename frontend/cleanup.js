const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

// Fix corrupted background classes
html = html.replace(/bg-black\/ dark:bg-white\/ dark:bg-black\/60/g, 'bg-white dark:bg-black/60');
html = html.replace(/bg-black\/ dark:bg-white\/ dark:bg-black\/40/g, 'bg-white dark:bg-black/40');
html = html.replace(/bg-black\/ dark:bg-white\/ dark:bg-black\//g, 'bg-white dark:bg-black');
html = html.replace(/bg-black\/ dark:bg-white\//g, 'bg-white dark:bg-black');

// Fix corrupted border classes
html = html.replace(/border-black\/ dark:border-white\/([0-9]+)/g, 'border-gray-200 dark:border-white/$1');
html = html.replace(/border-black\/ dark:border-white\//g, 'border-gray-200 dark:border-white/10');

// Fix corrupted text classes
html = html.replace(/text-slate-900 dark:text-\[#111111\] dark:text-white/g, 'text-black dark:text-blue-300');
html = html.replace(/text-\[#111111\] dark:text-white/g, 'text-black dark:text-blue-300');

// Fix Body class
// User said: light theme: bg white, text black, cards white.
// dark theme: bg black, blue text, cards as it is.
html = html.replace(/<body class=".*?"/, '<body class="bg-white dark:bg-black text-black dark:text-blue-300 transition-colors duration-500 font-sans"');

// Fix specific text colors in the DOM (headings, labels, etc.)
html = html.replace(/text-slate-[0-9]+/g, 'text-gray-800 dark:text-blue-400');
html = html.replace(/text-black dark:text-slate-[0-9]+/g, 'text-black dark:text-blue-400');
html = html.replace(/dark:text-slate-[0-9]+/g, 'dark:text-blue-400');

// Fix neonCyan to electricBlue for text
html = html.replace(/text-neonCyan/g, 'text-blue-500');

fs.writeFileSync('frontend/index.html', html);
console.log('HTML cleanup complete');
