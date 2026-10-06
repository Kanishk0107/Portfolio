/* ═══════════════════════════════════════════════════════
   KANISHK BHARDWAJ PORTFOLIO — APP.JS
   Navbar · Canvas · Ticker · Skyline · Orbit · Reveal
   ═══════════════════════════════════════════════════════ */

// ── NAVBAR ──────────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('navBurger');
const navMob   = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link, .nm-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMob.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navMob.classList.remove('open');
  });
});

// ── HERO CANVAS (Particle Grid) ──────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], mouse = { x: -999, y: -999 };
  const DOT_COLOR   = 'rgba(37,99,235,';
  const LINE_COLOR  = 'rgba(37,99,235,';
  const GRID_SPACING = 60;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.floor(W / GRID_SPACING) + 2;
    const rows = Math.floor(H / GRID_SPACING) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * GRID_SPACING,
          y: r * GRID_SPACING,
          ox: c * GRID_SPACING,
          oy: r * GRID_SPACING,
          vx: 0, vy: 0,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    }
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -999; mouse.y = -999;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    dots.forEach(d => {
      const dx = mouse.x - d.x, dy = mouse.y - d.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 100;
      if (dist < repelRadius) {
        const force = (1 - dist / repelRadius) * 3;
        d.vx -= (dx / dist) * force;
        d.vy -= (dy / dist) * force;
      }
      d.vx += (d.ox - d.x) * 0.04;
      d.vy += (d.oy - d.y) * 0.04;
      d.vx *= 0.85; d.vy *= 0.85;
      d.x += d.vx; d.y += d.vy;
    });

    // Draw lines between nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[j].x - dots[i].x;
        const dy = dots[j].y - dots[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < GRID_SPACING * 1.5) {
          const alpha = (1 - dist / (GRID_SPACING * 1.5)) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = LINE_COLOR + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
      // Draw dot
      const dd = dots[i];
      const mdist = Math.sqrt((mouse.x - dd.x) ** 2 + (mouse.y - dd.y) ** 2);
      const brightness = Math.max(0.1, 1 - mdist / 250);
      ctx.beginPath();
      ctx.arc(dd.x, dd.y, dd.size, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR + brightness * 0.6 + ')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  resize();
  draw();
})();

// ── SCROLL REVEAL ────────────────────────────────────────
(function initReveal() {
  const targets = document.querySelectorAll(
    '.work-card, .project-card, .pillar-item, .research-card, .cert-item, .et-item, .cl-item, .about-terminal, .about-pillars'
  );
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => io.observe(el));
})();

// ── ACTIVE NAV LINK on SCROLL ────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
})();

// ── CONTRIBUTION SKYLINE VISUALIZATION ─────────────────
(function buildSkyline() {
  const wrap = document.getElementById('skylineViz');
  if (!wrap) return;

  // Synthetic monthly activity data (research + code + shipping)
  const data = [
    { h: 20, type: 'edu' },     // 2022 early
    { h: 25, type: 'edu' },
    { h: 18, type: 'edu' },
    { h: 30, type: 'edu' },
    { h: 22, type: 'edu' },
    { h: 35, type: 'edu' },
    { h: 28, type: 'work' },    // 2023 WhizzyStack
    { h: 55, type: 'work' },
    { h: 62, type: 'work' },
    { h: 45, type: 'edu' },
    { h: 38, type: 'edu' },
    { h: 42, type: 'data' },    // 2023-2024 analytics
    { h: 50, type: 'data' },
    { h: 65, type: 'data' },
    { h: 70, type: 'data' },
    { h: 48, type: 'data' },
    { h: 55, type: 'ml' },      // 2024 NIELIT
    { h: 80, type: 'ml' },
    { h: 90, type: 'ml' },
    { h: 95, type: 'ml' },
    { h: 88, type: 'ml' },
    { h: 75, type: 'research' },// 2025 research paper
    { h: 70, type: 'research' },
    { h: 60, type: 'product' }, // 2025 products
    { h: 85, type: 'product' }, // book
    { h: 95, type: 'product' },
    { h: 100, type: 'current' },// 2026 current
    { h: 100, type: 'current' },
    { h: 100, type: 'current' },
    { h: 100, type: 'current' },
  ];

  const colors = {
    edu:      '#3b82f6',
    work:     '#6366f1',
    data:     '#22c55e',
    ml:       '#f59e0b',
    research: '#a78bfa',
    product:  '#ef4444',
    current:  '#2563eb',
  };

  const labels = {
    edu:      'Education',
    work:     'WhizzyStack',
    data:     'Data Analytics',
    ml:       'NIELIT / ML',
    research: 'Research',
    product:  'Products / Book',
    current:  'Verdiore R&D',
  };

  const maxH = 100;
  const containerH = 80;

  data.forEach(d => {
    const bar = document.createElement('div');
    bar.classList.add('sky-bar');
    const heightPx = (d.h / maxH) * containerH;
    bar.style.height = heightPx + 'px';
    bar.style.background = colors[d.type] || '#3b82f6';
    bar.style.opacity = '0.75';
    bar.title = labels[d.type] || d.type;
    bar.addEventListener('mouseenter', () => { bar.style.opacity = '1'; });
    bar.addEventListener('mouseleave', () => { bar.style.opacity = '0.75'; });
    wrap.appendChild(bar);
  });
})();

// ── ORBIT TOOLTIP ────────────────────────────────────────
(function initOrbitTooltip() {
  const tooltip = document.getElementById('orbitTooltip');
  const nodes   = document.querySelectorAll('.orbit-node, .orbit-node2');
  if (!tooltip) return;

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      tooltip.textContent = node.dataset.label || '';
      tooltip.style.opacity = '1';
    });
    node.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
})();

// ── COUNTER ANIMATION ────────────────────────────────────
(function initCounters() {
  const METRICS = document.querySelectorAll('.wm-num, .pm-val');

  function animateCount(el) {
    const text = el.textContent.trim();
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const target = parseFloat(numMatch[0]);
    const suffix = text.replace(numMatch[0], '');
    const duration = 1200;
    const start = performance.now();
    const startVal = 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * ease;
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  METRICS.forEach(el => io.observe(el));
})();

// ── NAVBAR ACTIVE STYLE ──────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .nav-link.active { color: var(--text); }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 4px; left: 1.1rem; right: 1.1rem;
    height: 1px;
    background: var(--accent);
  }
`;
document.head.appendChild(style);

// ── SMOOTH ANCHOR ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%cKANISHK BHARDWAJ — PORTFOLIO 2026', 'color:#2563eb;font-family:monospace;font-size:14px;font-weight:700;');
console.log('%cAI/ML Engineer · Full-Stack AI Developer · Author', 'color:#64748b;font-family:monospace;font-size:11px;');
