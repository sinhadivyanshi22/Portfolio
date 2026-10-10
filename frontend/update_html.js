const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

// Update tailwind config in html
html = html.replace(/darkMode: 'class',/g, "darkMode: 'class',");
html = html.replace(/<body class="/g, '<body class="bg-slate-50 dark:bg-[#06070b] text-slate-900 dark:text-[#e2e8f0] transition-colors duration-500 ');

// Add Theme Toggle button
const themeToggleBtn = `
  <!-- Theme Toggle -->
  <button id="theme-toggle" class="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-slate-200 dark:border-white/20 shadow-xl hover:scale-110 transition-transform duration-300" aria-label="Toggle Theme">
    <i class="fa-solid fa-moon text-slate-800 dark:hidden text-lg"></i>
    <i class="fa-solid fa-sun text-yellow-400 hidden dark:block text-lg"></i>
  </button>
`;
html = html.replace('</nav>', '</nav>\n' + themeToggleBtn);

// Add GitHub Contributions
const githubSection = `
    <!-- GitHub Contributions Section -->
    <section id="github" class="reveal-elem scroll-mt-24">
      <div class="flex items-center gap-3 mb-10">
        <span class="text-neonCyan font-mono text-sm tracking-widest">07 //</span>
        <h2 class="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">GITHUB ACTIVITY</h2>
        <div class="flex-grow h-[1px] bg-gradient-to-r from-neonCyan/40 to-transparent ml-4"></div>
      </div>
      <div class="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 w-full overflow-hidden text-center">
        <h3 class="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">@sinhadivyanshi22</h3>
        <div class="w-full overflow-x-auto pb-4">
          <img src="https://ghchart.rshah.org/00f2fe/sinhadivyanshi22" alt="GitHub Contributions Calendar" class="mx-auto min-w-[700px] h-auto rounded-lg invert dark:invert-0 brightness-90 dark:brightness-100" />
        </div>
      </div>
    </section>
`;

// Add LeetCode Section
const leetCodeSection = `
    <!-- LeetCode Journey Section -->
    <section id="leetcode" class="reveal-elem scroll-mt-24">
      <div class="flex items-center gap-3 mb-10">
        <span class="text-amber-500 font-mono text-sm tracking-widest">08 //</span>
        <h2 class="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">LEETCODE JOURNEY</h2>
        <div class="flex-grow h-[1px] bg-gradient-to-r from-amber-500/40 to-transparent ml-4"></div>
      </div>
      <div class="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <i class="fa-solid fa-code text-3xl"></i>
            </div>
            <div>
              <h3 class="text-2xl font-heading font-bold text-slate-900 dark:text-white">@divyanshisin2205</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 font-mono mt-1">Consistent Problem Solver</p>
            </div>
          </div>
          <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed pt-2">Actively solving algorithmic challenges to strengthen data structures and logic building. Focused on mastering core concepts for technical interviews and efficient system design.</p>
          <a href="https://leetcode.com/u/divyanshisin2205/" target="_blank" class="inline-block mt-4 interactive-btn px-6 py-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-heading font-bold text-sm tracking-wide border border-amber-500/30 hover:bg-amber-500 hover:text-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition duration-300">
            View Full Profile
          </a>
        </div>
        <div class="grid grid-cols-2 gap-4">
           <div class="p-4 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
              <span class="text-3xl font-bold font-mono text-amber-500">60+</span>
              <span class="text-[11px] text-slate-600 dark:text-slate-400 font-sans tracking-wide mt-1 uppercase">Problems Solved</span>
           </div>
           <div class=\"p-4 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center\">
              <span class=\"text-3xl font-bold font-mono text-emerald-500\">Easy</span>
              <span class=\"text-[11px] text-slate-600 dark:text-slate-400 font-sans tracking-wide mt-1 uppercase\">Top Difficulty</span>
           </div>
        </div>
      </div>
    </section>
`;

if (!html.includes('id="github"')) {
    html = html.replace('<!-- Contact Section -->', githubSection + '\n\n' + leetCodeSection + '\n\n    <!-- Contact Section -->');
}

// Add phone number to contact
if (html.includes('<span>Bengaluru / Delhi NCR / Remote (India & Global)</span>')) {
    html = html.replace('<span>Bengaluru / Delhi NCR / Remote (India & Global)</span>', '<span>Bengaluru / Delhi NCR / Remote</span>\n            </div>\n            <div class="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">\n              <div class="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">\n                <i class="fa-solid fa-phone"></i>\n              </div>\n              <span class="font-mono">+91 9876543210</span>');
}

fs.writeFileSync('frontend/index.html', html);
console.log('HTML updated successfully');
