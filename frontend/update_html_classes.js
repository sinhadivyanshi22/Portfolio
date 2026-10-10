const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

// Replace body class for light mode and dark mode
html = html.replace(/<body class=".*?"/, '<body class="bg-white dark:bg-[#06070b] text-[#111111] dark:text-[#e2e8f0] transition-colors duration-500 font-sans"');

// Fix text-white to text-[#111111] dark:text-white
html = html.replace(/text-white/g, 'text-[#111111] dark:text-white');
// Fix all neon colors to electricBlue in dark mode. Wait, they asked: "Change accent text and highlights to electric blue instead of multiple neon colors."
html = html.replace(/text-neonCyan/g, 'text-electricBlue');
html = html.replace(/text-neonPurple/g, 'text-electricBlue');
html = html.replace(/text-neonPink/g, 'text-electricBlue');
html = html.replace(/text-cyan-400/g, 'text-electricBlue');
html = html.replace(/text-amber-500/g, 'text-electricBlue');
html = html.replace(/text-emerald-500/g, 'text-electricBlue');

html = html.replace(/border-neonCyan\/30/g, 'border-electricBlue/30');
html = html.replace(/bg-neonCyan\/10/g, 'bg-electricBlue/10');
html = html.replace(/hover:shadow-\[0_0_20px_rgba\(0,242,254,0\.4\)\]/g, 'hover:shadow-[0_0_20px_rgba(0,87,255,0.4)]');
html = html.replace(/hover:shadow-\[0_0_20px_rgba\(245,158,11,0\.4\)\]/g, 'hover:shadow-[0_0_20px_rgba(0,87,255,0.4)]');

html = html.replace(/from-neonCyan\/40/g, 'from-electricBlue/40');
html = html.replace(/from-amber-500\/40/g, 'from-electricBlue/40');

// Fix cards: "Every card/block should have: White background, Thin light gray border, Soft shadow"
// The glass cards use the .glass-card css class.
// We should update the CSS file instead of inline classes for .glass-card, but the user requested changes.
// I'll update CSS for .glass-card later.

// Let's refine the fonts:
// Replace font-bold with font-heading if it is an h1, h2, h3.
html = html.replace(/<h([1-6])(.*?)class="(.*?)"/g, (match, p1, p2, p3) => {
    if (!p3.includes('font-heading')) {
        return `<h${p1}${p2}class="${p3} font-heading"`;
    }
    return match;
});

// Remove unused CSS or empty classes
html = html.replace(/class=""/g, '');

fs.writeFileSync('frontend/index.html', html);
console.log('HTML classes refined');
