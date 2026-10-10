const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

// Update Google Fonts
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=JetBrains\+Mono.*?rel="stylesheet">/, '<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">');

// Update Tailwind Config
const twConfigRegex = /tailwind\.config = \{[\s\S]*?\}/;
const newTwConfig = `tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            cyberDark: '#08080d',
            cyberCard: 'rgba(14, 17, 27, 0.75)',
            cyberBorder: 'rgba(0, 242, 254, 0.2)',
            neonCyan: '#00f2fe',
            electricBlue: '#0057ff',
          },
          fontFamily: {
            heading: ['Sora', 'sans-serif'],
            sans: ['Inter', 'sans-serif'],
            mono: ['"IBM Plex Mono"', 'monospace'],
          },
          boxShadow: {
            'neon-cyan': '0 0 20px rgba(0, 242, 254, 0.35)',
            'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
            'light-card': '0 4px 20px rgba(0, 0, 0, 0.05)',
          },
        }
      }
    }`;
html = html.replace(twConfigRegex, newTwConfig);

// Remove Particle Canvas
html = html.replace(/<canvas id="particleCanvas".*?<\/canvas>/, '');

fs.writeFileSync('frontend/index.html', html);
console.log('HTML fonts and tailwind config updated');
