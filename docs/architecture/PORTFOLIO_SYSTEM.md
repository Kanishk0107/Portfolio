# Portfolio System Architecture

Technical reference for the Kanishk Bhardwaj portfolio platform.

## 1. Core Architecture

- **Engine:** Vite 5.x Static Application
- **Markup:** Semantic HTML5 (`index.html`)
- **Styling:** CSS3 Design Tokens & Glassmorphic Variables (`src/css/style.css`)
- **Behavior:** Modular Vanilla ES6+ (`src/js/app.js`)
- **Assets:** Static Public Root (`public/asset/`)

## 2. Interactive Modules

1. **Particle Canvas Grid:** Real-time 2D canvas particle simulation with dynamic mouse repulsion and coordinate mesh connections.
2. **Skyline Visualization:** Interactive 52-week contribution frequency histogram with tooltips and metrics.
3. **Orbit Competencies Matrix:** 3-tier orbital badge constellation with interactive domain inspection and status cards.
4. **Terminal Simulator:** Live mock terminal supporting command parsing (`help`, `projects`, `skills`, `contact`, `clear`).
5. **Scroll Reveal Engine:** IntersectionObserver-based staggered entrance animations.

## 3. SEO & Crawlers

- Structured XML Sitemap: `public/sitemap.xml`
- Search Crawler Directives: `public/robots.txt`
- AI Agent Discovery: `public/llms.txt`
