/* ═══════════════════════════════════════════════════
   KANISHK BHARDWAJ — MAIN APPLICATION JS
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Global Animations Context for cleanup
  const ctx = gsap.context(() => {});

  // ─────────────────────────────────────────────────
  // 0. ACCESSIBILITY: REDUCED MOTION
  // ─────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─────────────────────────────────────────────────
  // 1. SPLASH SCREEN — OPTIMIZED TIMING
  // ─────────────────────────────────────────────────
  const splash = document.getElementById('splash-screen');
  const splineContainer = document.getElementById('splineContainer');
  
  // Ensure spline viewer starts loading immediately
  if (splineContainer) {
    splineContainer.style.willChange = 'transform, opacity';
  }

  // Hide splash after animation completes
  const splashTimer = setTimeout(() => {
    if (splash) {
      splash.classList.add('hidden');
    }
    if (!prefersReducedMotion) {
      initHeroAnimations();
    } else {
      gsap.set('.hero-badge, .hero-name, .hero-subtitle, .hero-description, .hero-actions, .social-icons-bar', {
        opacity: 1, y: 0
      });
    }
  }, 2200);

  // ─────────────────────────────────────────────────
  // 2. CUSTOM CURSOR — DISABLED (using default cursor)
  // ─────────────────────────────────────────────────
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';

  // ─────────────────────────────────────────────────
  // 3. FLOATING NAVIGATION
  // ─────────────────────────────────────────────────
  const nav = document.getElementById('floatingNav');
  const navPills = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.5) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navPills.forEach(pill => {
      pill.classList.remove('active');
      if (pill.getAttribute('data-section') === current) {
        pill.classList.add('active');
      }
    });
  });

  navPills.forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(pill.getAttribute('data-section'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─────────────────────────────────────────────────
  // 4. HERO ANIMATIONS (via GSAP) — 144Hz OPTIMIZED
  // ─────────────────────────────────────────────────
  function initHeroAnimations() {
    ctx.add(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.8
        }
      });

      tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2
      }, 0)
      .to('.hero-name', {
        opacity: 1,
        y: 0,
        duration: 1
      }, 0.4)
      .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.5)
      .to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.6)
      .to('.hero-actions', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.7)
      .to('.social-icons-bar', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.8);
    });
  }

  // ─────────────────────────────────────────────────
  // 5. SCROLL-TRIGGERED ANIMATIONS — 144Hz OPTIMIZED
  // ─────────────────────────────────────────────────
  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    ctx.add(() => {
      // Section headers
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      });

      // Project cards
      ScrollTrigger.batch('.project-card', {
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });
        },
        start: 'top 85%',
        once: true
      });

      // Timeline items
      ScrollTrigger.batch('.timeline-item', {
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
          });
        },
        start: 'top 85%',
        once: true
      });

      // Blog cards
      ScrollTrigger.batch('.blog-card', {
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });
        },
        start: 'top 85%',
        once: true
      });

      // Book section
      gsap.from('.book-3d-wrapper', {
        scrollTrigger: {
          trigger: '.book-showcase',
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.book-info', {
        scrollTrigger: {
          trigger: '.book-showcase',
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        x: 60,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
      });

      // Contact social bar
      gsap.from('.contact-social-bar', {
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out'
      });
    });
  }

  // ─────────────────────────────────────────────────
  // 6. RENDER PROJECTS (with styled View Project button)
  // ─────────────────────────────────────────────────
  function renderProjects() {
    const projects = window.getProjects();
    const grid = document.getElementById('projectsGrid');

    if (!projects || projects.length === 0) {
      grid.innerHTML = `
        <div style="text-align:center; color: var(--text-muted); grid-column: 1/-1; padding: 4rem 0;">
          <p style="font-size: 1.1rem; max-width: none;">No projects found.</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem; max-width: none;">Add some via the Admin panel!</p>
        </div>`;
      return;
    }

    // Debug: Log projects to verify links
    console.log('Projects loaded:', projects);

    grid.innerHTML = projects.map(p => {
      const tags = p.tags.split(',').map(t =>
        `<span class="tag">${t.trim()}</span>`
      ).join('');

      // Ensure link exists, fallback to # if missing
      const projectLink = p.link && p.link.trim() ? p.link : '#';

      return `
        <article class="project-card">
          <div class="project-card-image-wrapper">
            <img src="${p.img}" alt="${p.title}" class="project-card-image" loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'">
          </div>
          <div class="project-card-body">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="project-tags">${tags}</div>
            <a href="${projectLink}" target="_blank" rel="noopener noreferrer" class="btn-view-project" aria-label="View ${p.title} project">
              <span>View Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>
        </article>`;
    }).join('');
  }



  // ─────────────────────────────────────────────────
  // 7. RENDER TIMELINE
  // ─────────────────────────────────────────────────
  function renderTimeline() {
    const timelineData = window.getTimeline();
    const container = document.getElementById('timeline');

    if (!timelineData || timelineData.length === 0) {
      container.innerHTML = `
        <p style="color: var(--text-muted); text-align: center; padding: 2rem; max-width: none;">
          Timeline entries will appear here.
        </p>`;
      return;
    }

    container.innerHTML = timelineData.map((item, index) => {
      const badgeClass = {
        education: 'badge-education',
        work: 'badge-work',
        research: 'badge-research',
        achievement: 'badge-achievement'
      }[item.type] || 'badge-education';

      const typeLabel = {
        education: '🎓 Education',
        work: '💼 Experience',
        research: '🔬 Research',
        achievement: '🏆 Achievement'
      }[item.type] || item.type;

      // First item gets the live blinking dot
      const liveDot = index === 0 ? `
        <div class="live-dot-wrapper">
          <div class="live-dot">
            <div class="live-dot-inner"></div>
            <div class="live-dot-ping"></div>
          </div>
          <span class="live-label">Current</span>
        </div>` : '';

      return `
        <div class="timeline-item${index === 0 ? ' current' : ''}">
          <span class="timeline-date">${item.date}</span>
          <div class="timeline-card">
            ${liveDot}
            <span class="timeline-type-badge ${badgeClass}">${typeLabel}</span>
            <h3>${item.title}</h3>
            <p class="timeline-place">${item.place}</p>
            <p>${item.description}</p>
          </div>
        </div>`;
    }).join('');
  }

  // ─────────────────────────────────────────────────
  // 8. MAGNETIC EFFECT — 144Hz OPTIMIZED
  // ─────────────────────────────────────────────────
  if (!prefersReducedMotion) {
    const magneticEls = document.querySelectorAll('.btn-glow, .btn-outline, .nav-pill');
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      });
    });
  }

  // ─────────────────────────────────────────────────
  // 9. SPOTLIGHT CURSOR TRACKING — 144Hz OPTIMIZED
  // ─────────────────────────────────────────────────
  const heroSection = document.querySelector('.hero-section');
  const spotlight = document.getElementById('spotlight');
  
  if (heroSection && spotlight && !prefersReducedMotion) {
    let mouseX = 0;
    let mouseY = 0;
    let spotlightX = 0;
    let spotlightY = 0;
    let isInHero = false;
    let ticking = false;

    // Track mouse position within hero section
    heroSection.addEventListener('mousemove', (e) => {
      isInHero = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!ticking) {
        requestAnimationFrame(updateSpotlight);
        ticking = true;
      }
    }, { passive: true });

    // Hide spotlight when leaving hero section
    heroSection.addEventListener('mouseleave', () => {
      isInHero = false;
      spotlight.style.opacity = '0';
    });

    // Show spotlight when entering hero section
    heroSection.addEventListener('mouseenter', () => {
      isInHero = true;
      spotlight.style.opacity = '1';
    });

    function updateSpotlight() {
      if (!isInHero) {
        ticking = false;
        return;
      }

      // Smooth lerp for 144Hz smooth tracking
      spotlightX += (mouseX - spotlightX) * 0.15;
      spotlightY += (mouseY - spotlightY) * 0.15;

      // Position spotlight at cursor (offset by half size for center)
      spotlight.style.transform = `translate(${spotlightX - 250}px, ${spotlightY - 250}px)`;

      // Continue animation if still moving
      if (Math.abs(mouseX - spotlightX) > 1 || Math.abs(mouseY - spotlightY) > 1) {
        requestAnimationFrame(updateSpotlight);
      } else {
        ticking = false;
      }
    }

    // Initial state
    spotlight.style.opacity = '0';
    spotlight.style.transition = 'opacity 0.3s ease';
  }

  // ─────────────────────────────────────────────────
  // 10. SMOOTH PARALLAX ON SPLINE — 144Hz OPTIMIZED
  // ─────────────────────────────────────────────────
  if (splineContainer && !prefersReducedMotion) {
    let ticking = false;
    let currentTranslateY = 0;
    let targetTranslateY = 0;
    let currentOpacity = 1;
    let targetOpacity = 1;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight;
      if (scrolled < heroHeight) {
        const progress = scrolled / heroHeight;
        targetTranslateY = scrolled * 0.15;
        targetOpacity = 1 - progress * 0.5;
      }
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    function updateParallax() {
      // Smooth lerp with reduced iterations
      currentTranslateY += (targetTranslateY - currentTranslateY) * 0.12;
      currentOpacity += (targetOpacity - currentOpacity) * 0.12;
      
      splineContainer.style.transform = `translateY(${currentTranslateY}px)`;
      splineContainer.style.opacity = currentOpacity;

      if (Math.abs(targetTranslateY - currentTranslateY) > 0.5 ||
          Math.abs(targetOpacity - currentOpacity) > 0.01) {
        requestAnimationFrame(updateParallax);
      } else {
        ticking = false;
      }
    }
  }

  // ─────────────────────────────────────────────────
  // 10. SCROLL INDICATOR — HIDE AFTER SMALL SCROLL
  // ─────────────────────────────────────────────────
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    let indicatorHidden = false;
    window.addEventListener('scroll', () => {
      if (!indicatorHidden && window.scrollY > 30) {
        indicatorHidden = true;
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateY(20px)';
        // Remove from DOM after transition
        setTimeout(() => {
          scrollIndicator.style.display = 'none';
        }, 400);
      }
    }, { passive: true });
  }

  // ─────────────────────────────────────────────────
  // 11. BOOK 3D — FULL 360° DRAG ROTATION — 144Hz OPTIMIZED
  // ─────────────────────────────────────────────────
  const book3d = document.getElementById('book3d');
  if (book3d && !prefersReducedMotion) {
    let isDragging = false;
    let startX = 0;
    let baseRotation = -35;
    let dragRotation = 0;

    function startDrag(clientX) {
      isDragging = true;
      startX = clientX;
      const computed = getComputedStyle(book3d).transform;
      if (computed && computed !== 'none') {
        const matrix = new DOMMatrix(computed);
        baseRotation = Math.round(Math.atan2(matrix.m13, matrix.m33) * (180 / Math.PI));
      }
      book3d.style.animation = 'none';
      book3d.style.transition = 'none';
      book3d.style.cursor = 'grabbing';
    }

    function moveDrag(clientX) {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      dragRotation = baseRotation + deltaX * 0.6;
      book3d.style.transform = `rotateY(${dragRotation}deg) rotateX(2deg)`;
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      book3d.style.cursor = 'grab';
      book3d.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        book3d.style.transition = '';
        book3d.style.animation = '';
      }, 800);
    }

    // Mouse events
    book3d.addEventListener('mousedown', (e) => { e.preventDefault(); startDrag(e.clientX); });
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    document.addEventListener('mouseup', endDrag);

    // Touch events
    book3d.addEventListener('touchstart', (e) => { startDrag(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchmove', (e) => { if (isDragging) moveDrag(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend', endDrag);
  }

  // ─────────────────────────────────────────────────
  // 12. RENDER BLOG
  // ─────────────────────────────────────────────────
  function renderBlog() {
    const blogs = window.getBlogs ? window.getBlogs() : [];
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    if (!blogs.length) {
      grid.innerHTML = `<p style="color:var(--text-muted);text-align:center;grid-column:1/-1">No posts yet.</p>`;
      return;
    }

    grid.innerHTML = blogs.map(blog => `
      <article class="glow-card blog-card" data-slug="${blog.slug}" role="button" tabindex="0"
               aria-label="Read: ${blog.title}"
               onclick="openBlog('${blog.slug}')"
               onkeydown="if(event.key==='Enter')openBlog('${blog.slug}')">
        <div class="blog-card-bg">
          <img src="${blog.coverImage}" alt="${blog.title}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'">
        </div>
        <div class="blog-card-overlay"></div>
        <div class="blog-card-content">
          <div class="blog-card-glass">
            <div class="blog-card-tag">${blog.tag}</div>
            <h3 class="blog-card-title">${blog.title}</h3>
            <p class="blog-card-excerpt">${blog.excerpt}</p>
            <div class="blog-card-meta">
              <span class="blog-card-date">${blog.date} · ${blog.readTime} min read</span>
              <span class="blog-card-read">Read →</span>
            </div>
          </div>
        </div>
      </article>`).join('');

    // Glow card mouse tracking
    grid.querySelectorAll('.glow-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  // Open blog reading page
  window.openBlog = function(slug) {
    window.location.href = `blog.html?slug=${slug}`;
  };

  // ─────────────────────────────────────────────────
  // INITIALIZE
  // ─────────────────────────────────────────────────
  renderProjects();
  renderTimeline();
  renderBlog();

  // Set resume link
  const resumeBtn = document.getElementById('resumeIconBtn');
  if (resumeBtn && typeof RESUME_LINK !== 'undefined') {
    resumeBtn.href = RESUME_LINK;
  }

  // Cleanup on window unload
  window.addEventListener('unload', () => {
    clearTimeout(splashTimer);
    ctx.revert();
  });

});
