/* ═══════════════════════════════════════════════════
   KANISHK BHARDWAJ — DATA STORE (localStorage)
   ═══════════════════════════════════════════════════ */

const STORE_KEY = 'kanishk_portfolio_data';

// ─── Resume Link (easy to edit) ───
const RESUME_LINK = 'https://drive.google.com/file/d/1U9wUCEM7hIGQuXnX2yaIxgavmTUqFd34/view';

const defaultData = {
  projects: [
    {
      id: 'p1',
      title: 'Crop Recommendation System',
      description: 'AI-based system to recommend crops based on soil and weather data using machine learning algorithms.',
      link: 'https://crop-recommendation-khaki-beta.vercel.app/',
      img: 'asset/CRM.png',
      featured: true,
      tags: 'AI, Machine Learning, Python'
    },
    {
      id: 'p2',
      title: 'Cheque.io',
      description: 'A modern platform for cheque management and digital verification with real-time processing.',
      link: 'https://cheque-io.vercel.app/',
      img: 'asset/cheque.png',
      featured: true,
      tags: 'React, Fintech, Web App'
    },
    {
      id: 'p4',
      title: 'xourist',
      description: 'Traveling company website platform connecting explorers to destinations with curated experiences.',
      link: 'https://xourist.vercel.app/',
      img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
      featured: true,
      tags: 'Travel, UI/UX, Next.js'
    }
  ],
  timeline: [
    {
      id: 't1',
      type: 'education',
      date: '2024 — Present',
      title: 'M.Tech in Computer Science',
      place: 'Pursuing Advanced Studies',
      description: 'Specializing in Artificial Intelligence and Machine Learning, with research focus on intelligent systems.'
    },
    {
      id: 't2',
      type: 'achievement',
      date: '2024',
      title: 'Published "Vibe To Code"',
      place: 'Amazon Kindle',
      description: 'Authored and published a comprehensive guide on creative coding and modern web development.'
    },
    {
      id: 't3',
      type: 'work',
      date: '2023 — 2024',
      title: 'AI Developer & Researcher',
      place: 'Freelance & Projects',
      description: 'Built AI-powered applications, contributed to open-source projects, and developed production-ready web solutions.'
    },
    {
      id: 't4',
      type: 'education',
      date: '2020 — 2023',
      title: "Bachelor's in Computer Science",
      place: 'University',
      description: 'Strong foundation in computer science fundamentals, data structures, algorithms, and software engineering.'
    },
    {
      id: 't5',
      type: 'research',
      date: '2023',
      title: 'Research in Machine Learning',
      place: 'Academic Research',
      description: 'Conducted research on machine learning applications in agriculture and real-world problem solving.'
    }
  ]
};

// ─── Data Access Functions ───
window.getPortfolioData = function () {
  const data = localStorage.getItem(STORE_KEY);
  if (!data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

window.savePortfolioData = function (data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
};

window.getProjects = function () {
  return window.getPortfolioData().projects;
};

window.getTimeline = function () {
  return window.getPortfolioData().timeline || defaultData.timeline;
};

window.addProject = function (project) {
  const data = window.getPortfolioData();
  data.projects.push({ ...project, id: 'p' + Date.now() });
  window.savePortfolioData(data);
};

window.updateProject = function (id, updatedFields) {
  const data = window.getPortfolioData();
  const index = data.projects.findIndex(p => p.id === id);
  if (index !== -1) {
    data.projects[index] = { ...data.projects[index], ...updatedFields };
    window.savePortfolioData(data);
  }
};

window.deleteProject = function (id) {
  const data = window.getPortfolioData();
  data.projects = data.projects.filter(p => p.id !== id);
  window.savePortfolioData(data);
};

// Force reset to use updated defaults (remove old cached data)
window.resetToDefaults = function () {
  localStorage.setItem(STORE_KEY, JSON.stringify(defaultData));
  return defaultData;
};

// Auto-reset if CRM project still exists in stored data
(function autoMigrate() {
  const data = localStorage.getItem(STORE_KEY);
  if (data) {
    const parsed = JSON.parse(data);
    const hasCRM = parsed.projects.some(p => p.id === 'p3' && p.title === 'CRM System');
    if (hasCRM) {
      window.resetToDefaults();
    }
  }
})();

// ─── Blog Data ───
window.getBlogs = function () {
  return [
    {
      id: 'b1',
      slug: 'vibe-coding-mindset',
      title: 'The Vibe Coding Mindset',
      excerpt: 'How approaching code with creativity and flow transforms the way you build software — and why it matters more than ever.',
      coverImage: 'assets/blog/vibe-coding.png',
      tag: 'Philosophy',
      date: 'March 10, 2026',
      readTime: 5,
      content: `
        <p>Vibe coding isn't about writing sloppy code. It's about entering a state of flow where technical precision and creative intuition work together seamlessly.</p>
        <h2>What is Vibe Coding?</h2>
        <p>The term captures something real: the feeling when you're so in sync with your tools and your problem that the code just flows. Hours pass. The solution emerges naturally.</p>
        <h2>The Technical Foundation</h2>
        <p>To vibe code effectively, you need strong fundamentals. You can't improvise jazz without knowing your scales. The same applies here — deep knowledge of your stack lets you stop thinking about syntax and start thinking about solutions.</p>
        <h2>Creating the Conditions</h2>
        <p>Environment matters. The right music, a clean workspace, minimal interruptions. But more importantly: a clear problem definition. Vague goals kill flow before it starts.</p>
        <blockquote>The best code I've ever written came from sessions where I forgot to check the time.</blockquote>
        <p>That's the goal. Not just shipping features — but building things in a way that feels alive.</p>
      `
    },
    {
      id: 'b2',
      slug: 'ai-in-agriculture',
      title: 'AI in Agriculture: What I Learned Building a Crop Recommendation System',
      excerpt: 'Real lessons from building an ML system that helps farmers choose the right crops based on soil and climate data.',
      coverImage: 'assets/blog/ai-agriculture.png',
      tag: 'AI / ML',
      date: 'February 22, 2026',
      readTime: 7,
      content: `
        <p>When I started building the Crop Recommendation System, I thought the hard part would be the machine learning. I was wrong — the hard part was the data.</p>
        <h2>The Problem</h2>
        <p>Farmers in India make crop decisions based on intuition and tradition. That works until climate patterns shift. ML can help bridge that gap, but only if the model is trustworthy and explainable.</p>
        <h2>The Data Challenge</h2>
        <p>Agricultural datasets are messy. Missing values, inconsistent units, regional variations. I spent more time on data cleaning than model training — which is true of most real ML projects.</p>
        <h2>Model Selection</h2>
        <p>I tested Random Forest, SVM, and a simple neural network. Random Forest won on accuracy and interpretability. Farmers need to understand why a recommendation is made, not just what it is.</p>
        <h2>What I'd Do Differently</h2>
        <p>I'd involve domain experts earlier. The agronomists I consulted late in the project caught several assumptions I'd baked into the feature engineering that were simply wrong.</p>
        <blockquote>Good ML is 20% model, 80% understanding the domain.</blockquote>
      `
    },
    {
      id: 'b3',
      slug: 'building-interactive-web',
      title: 'Building Interactive Web Experiences That Feel Alive',
      excerpt: 'A deep dive into the techniques behind smooth animations, 3D elements, and micro-interactions that make users stop and notice.',
      coverImage: 'assets/blog/interactive-web.png',
      tag: 'Web Dev',
      date: 'January 15, 2026',
      readTime: 6,
      content: `
        <p>The difference between a website and an experience is often just a few hundred lines of thoughtful animation code. Here's what I've learned building interactive UIs.</p>
        <h2>The Physics of Good Animation</h2>
        <p>Real objects don't move linearly. They accelerate, decelerate, overshoot slightly. CSS ease-in-out gets you 70% of the way there. Spring physics gets you the rest.</p>
        <h2>GSAP vs CSS Animations</h2>
        <p>CSS animations are great for simple, repeating effects. For anything complex — scroll-triggered sequences, staggered reveals, interactive responses — GSAP gives you the control you need without the performance cost.</p>
        <h2>3D on the Web</h2>
        <p>Three.js and Spline have made 3D accessible. But 3D for its own sake is noise. Use it when it communicates something that 2D can't — depth, physicality, presence.</p>
        <h2>The 60fps Rule</h2>
        <p>Animate only <code>transform</code> and <code>opacity</code>. Everything else triggers layout or paint, which kills performance. This single rule eliminates most jank.</p>
        <blockquote>Animation should feel inevitable, not decorative.</blockquote>
      `
    }
  ];
};
