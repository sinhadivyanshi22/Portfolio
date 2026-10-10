const fs = require('fs');
let css = fs.readFileSync('frontend/style.css', 'utf8');

// First remove any existing custom glass-card styles to start fresh
css = css.replace(/\.glass-card\s*\{[^}]*\}/g, '');
css = css.replace(/\.dark\s+\.glass-card\s*\{[^}]*\}/g, '');
css = css.replace(/\.glass-card:hover\s*\{[^}]*\}/g, '');
css = css.replace(/body\s*\{[^}]*\}/g, ''); // body background is handled by tailwind

// Append new styles
const newStyles = `
/* Theme Overrides */
body {
  /* Colors handled by tailwind */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Glass Card - Light Mode (Default) */
.glass-card {
  background: #ffffff;
  border: 1px solid #e2e8f0; /* Thin light gray border */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); /* Soft shadow */
  border-radius: 1rem;
  transition: all 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Glass Card - Dark Mode */
.dark .glass-card {
  background: rgba(14, 17, 27, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}
.dark .glass-card:hover {
  border-color: rgba(0, 87, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6);
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
.dark ::-webkit-scrollbar-thumb:hover {
  background: #0057ff;
}
`;

css += newStyles;
fs.writeFileSync('frontend/style.css', css);
console.log('CSS styles updated for cards and theme');
