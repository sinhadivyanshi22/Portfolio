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
   4. TERMINAL TYPING EFFECT (Hero Section)
   ================================================================= */
const roles = [
  "Building Production-Ready Software.",
  "Java • Spring Boot • React.",
  "Turning Ideas into Scalable Products.",
  "AI-Powered Solutions. Clean Engineering.",
  "Future Software Engineer • 2027.",
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
   8. CONTACT FORM -> POST /api/contact
   ================================================================= */
const contactForm = document.getElementById('portfolio-contact-form');
const feedbackBox = document.getElementById('form-feedback');
const submitBtn = document.getElementById('submit-btn');

function getContactEndpoint() {
  const configured = (typeof window !== 'undefined' && window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.API_BASE_URL)
    || (typeof document !== 'undefined' && document.querySelector('meta[name="backend-api-url"]')?.getAttribute('content'));
  
  if (configured && typeof configured === 'string' && configured.trim() !== '') {
    return configured.trim().replace(/\/+$/, '') + '/api/contact';
  }

  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal) {
    if (window.location.port === '4173') {
      return '/api/contact';
    }
    return 'http://localhost:4173/api/contact';
  }

  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return 'http://localhost:4173/api/contact';
  }

  return '/api/contact';
}

const CONTACT_FORM_RENDERED_AT = Date.now();
const CONTACT_IDLE_LABEL = '<span>TRANSMIT MESSAGE</span><i class="fa-solid fa-paper-plane text-xs"></i>';
const CONTACT_BUSY_LABEL = '<i class="fa-solid fa-spinner fa-spin text-sm"></i><span>TRANSMIT IN PROGRESS...</span>';

function setSubmitBusy(isBusy) {
  if (!submitBtn) return;
  submitBtn.disabled = isBusy;
  submitBtn.innerHTML = isBusy ? CONTACT_BUSY_LABEL : CONTACT_IDLE_LABEL;
}

function showFeedback(tone, html) {
  if (!feedbackBox) return;
  const tones = {
    success: 'p-3 rounded-xl text-center text-xs font-mono bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 block',
    error: 'p-3 rounded-xl text-center text-xs font-mono bg-red-950/60 border border-red-500/50 text-red-300 block'
  };
  feedbackBox.className = tones[tone] || 'hidden';
  feedbackBox.innerHTML = html;
}

function clearFeedback() {
  if (!feedbackBox) return;
  feedbackBox.className = 'hidden';
  feedbackBox.innerHTML = '';
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const readValue = (id) => {
      const input = document.getElementById(id);
      return input ? input.value : '';
    };

    const payload = {
      name: readValue('form-name'),
      email: readValue('form-email'),
      subject: readValue('form-subject'),
      message: readValue('form-message'),
      company_website: readValue('form-website'),
      renderedAt: CONTACT_FORM_RENDERED_AT
    };

    clearFeedback();
    setSubmitBusy(true);

    const endpoint = getContactEndpoint();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data || !data.ok) {
        if (response.status === 404) {
          throw new Error('API endpoint not found (HTTP 404). If your frontend is deployed to a static host (like GitHub Pages), configure your backend URL in frontend/config.js.');
        }
        if (response.status === 403) {
          throw new Error('Origin blocked by CORS (HTTP 403). Please add your site domain to ALLOWED_ORIGIN in backend/.env.');
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a few minutes before trying again.');
        }
        throw new Error((data && data.error) || `Request failed (HTTP ${response.status}). Please try again.`);
      }

      contactForm.reset();
      showFeedback('success', '<i class="fa-solid fa-circle-check mr-1.5"></i> Message successfully dispatched to Divyanshi Sinha. I will get back to you within 24 hours!');
      setTimeout(clearFeedback, 6000);
    } catch (err) {
      let message = err.message;
      if (err instanceof TypeError) {
        const isLocal = typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:');
        const isStaticHost = typeof window !== 'undefined' &&
          (window.location.hostname.endsWith('github.io') || window.location.hostname.endsWith('vercel.app') || window.location.hostname.endsWith('netlify.app'));

        if (isLocal) {
          message = 'Could not reach the backend server at localhost:4173. Please make sure the backend is running (run `npm start` in your terminal).';
        } else if (isStaticHost && (!window.PORTFOLIO_CONFIG || !window.PORTFOLIO_CONFIG.API_BASE_URL)) {
          message = 'Backend API is not configured for this static site. Please set your deployed backend URL in `frontend/config.js`, or email me directly at sinhadivyanshi2205@gmail.com.';
        } else {
          message = 'Could not reach the server. Please check your network connection, or email me directly at sinhadivyanshi2205@gmail.com.';
        }
      }
      showFeedback('error', `<i class="fa-solid fa-circle-exclamation mr-1.5"></i> ${message}`);
    } finally {
      setSubmitBusy(false);
    }
  });
}



/* =================================================================
   9. PERMANENT DARK THEME
   ================================================================= */
document.documentElement.classList.add('dark');

