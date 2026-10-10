const fs = require('fs');
let js = fs.readFileSync('frontend/script.js', 'utf8');

// Remove Particle Animation (sections 3)
const particleStart = js.indexOf('/* =================================================================\n   3. HIGH-DENSITY INTERACTIVE NEON PARTICLE PHYSICS CANVAS');
if (particleStart !== -1) {
    const particleEnd = js.indexOf('/* =================================================================\n   4. TERMINAL TYPING EFFECT');
    if (particleEnd !== -1) {
        js = js.substring(0, particleStart) + js.substring(particleEnd);
    }
}

fs.writeFileSync('frontend/script.js', js);
console.log('Particles removed');
