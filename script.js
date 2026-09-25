/* =================================================================
   1. REAL-TIME HUD DIGITAL CLOCK (Top-Right)
   ================================================================= */
function updateClock() {
  const hudTime = document.getElementById('hud-time');
  const hudDate = document.getElementById('hud-date');
  const now = new Date();

  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (hudTime) hudTime.textContent = timeString;
  if (hudDate) hudDate.textContent = dateString;
}
setInterval(updateClock, 1000);
updateClock();

// Set dynamic footer year
const yearElem = document.getElementById('year-field');
if (yearElem) yearElem.textContent = new Date().getFullYear();

/* =================================================================
   2. INTERACTIVE DUAL-RING GLOWING MOUSE CURSOR
   ================================================================= */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('custom-cursor');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

function renderCursor() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }
  requestAnimationFrame(renderCursor);
}
renderCursor();

// Scale up cursor ring when hovering interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .interactive-btn');
interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (cursorRing) {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursorRing.style.borderColor = '#00ff9d';
      cursorRing.style.boxShadow = '0 0 25px rgba(0, 255, 157, 0.6)';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursorRing) {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(0, 242, 254, 0.6)';
      cursorRing.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.3)';
    }
  });
});

/* =================================================================
   3. HIGH-DENSITY INTERACTIVE NEON PARTICLE PHYSICS CANVAS
   ================================================================= */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
});

// Particle Config
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 65 : 140;
const connectionDistance = isMobile ? 90 : 130;
const mouseRadius = 150;

let mousePos = { x: -1000, y: -1000 };
window.addEventListener('mousemove', (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mousePos.x = -1000;
  mousePos.y = -1000;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.9;
    this.vy = (Math.random() - 0.5) * 0.9;
    this.radius = Math.random() * 1.8 + 1;
    const palette = [
      'rgba(0, 242, 254, ',
      'rgba(155, 81, 224, ',
      'rgba(255, 0, 127, '
    ];
    this.color = palette[Math.floor(Math.random() * palette.length)];
    this.alpha = Math.random() * 0.6 + 0.3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    const dx = mousePos.x - this.x;
    const dy = mousePos.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < mouseRadius) {
      const force = (mouseRadius - dist) / mouseRadius;
      const angle = Math.atan2(dy, dx);
      this.x -= Math.cos(angle) * force * 3;
      this.y -= Math.sin(angle) * force * 3;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.shadowColor = this.color + '1)';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);

      if (dist < connectionDistance) {
        const alpha = 1 - dist / connectionDistance;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.25})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const dx = particles[i].x - mousePos.x;
    const dy = particles[i].y - mousePos.y;
    const dist = Math.hypot(dx, dy);
    if (dist < mouseRadius) {
      const alpha = 1 - dist / mouseRadius;
      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.strokeStyle = `rgba(155, 81, 224, ${alpha * 0.45})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =================================================================
   4. TERMINAL TYPING EFFECT (Hero Section)
   ================================================================= */
const roles = [
  "4th Year B.Tech Computer Science Student",
  "Full-Stack Software Engineer",
  "Distributed Systems & Cloud Enthusiast",
  "600+ LeetCode Solved & Algorithmic Thinker",
  "Building Scalable Backend Microservices"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeElement = document.getElementById('dynamic-type');

function typeLoop() {
  const currentText = roles[roleIndex];
  if (isDeleting) {
    typeElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentText.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeLoop, speed);
}
typeLoop();

/* =================================================================
   5. SCROLL REVEAL (IntersectionObserver)
   ================================================================= */
const revealElements = document.querySelectorAll('.reveal-elem');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el) => revealObserver.observe(el));

/* =================================================================
   6. FLOATING NAV BAR SCROLL SPY & ACTIVE HIGHLIGHT
   ================================================================= */
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let currentSectionId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navItems.forEach((link) => {
    if (link.getAttribute('data-target') === currentSectionId) {
      link.classList.add('bg-white/20', 'text-neonCyan', 'font-semibold');
      link.classList.remove('text-slate-400');
    } else {
      link.classList.remove('bg-white/20', 'text-neonCyan', 'font-semibold');
      link.classList.add('text-slate-400');
    }
  });
});

/* =================================================================
   7. CLIPBOARD COPY EMAIL HELPER
   ================================================================= */
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyEmailText = document.getElementById('copy-email-text');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const email = 'sinhadivyanshi2205@gmail.com';
    const tempInput = document.createElement('textarea');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const original = copyEmailText.textContent;
    copyEmailText.textContent = 'COPIED TO CLIPBOARD!';
    copyEmailBtn.classList.add('border-neonCyan', 'text-neonCyan');

    setTimeout(() => {
      copyEmailText.textContent = original;
      copyEmailBtn.classList.remove('border-neonCyan', 'text-neonCyan');
    }, 2200);
  });
}

/* =================================================================
   8. CONTACT FORM SIMULATION
   ================================================================= */
const contactForm = document.getElementById('portfolio-contact-form');
const feedbackBox = document.getElementById('form-feedback');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin text-sm"></i>
      <span>ENCRYPTING & SENDING...</span>
    `;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>TRANSMIT MESSAGE</span>
        <i class="fa-solid fa-paper-plane text-xs"></i>
      `;

      if (feedbackBox) {
        feedbackBox.className = 'p-3 rounded-xl text-center text-xs font-mono bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 block';
        feedbackBox.innerHTML = `
          <i class="fa-solid fa-circle-check mr-1.5"></i>
          Message successfully dispatched to Divyanshi Sinha. I will get back to you within 24 hours!
        `;

        setTimeout(() => {
          feedbackBox.className = 'hidden';
        }, 6000);
      }
    }, 1200);
  });
}
