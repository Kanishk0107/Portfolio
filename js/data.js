/* ═══════════════════════════════════════════════════
   KANISHK BHARDWAJ — DATA STORE (localStorage)
   ═══════════════════════════════════════════════════ */

const STORE_KEY = 'kanishk_portfolio_data';

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
