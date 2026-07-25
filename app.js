// Premium App Engine & Router for RiddlesAbout.com

// State
let currentView = 'home';
let activeParam = null;
let activeFilter = 'All';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderApp();
});

// Theme Toggle
function initTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

// Navigation Router
function navigateTo(view, param = null) {
  currentView = view;
  activeParam = param;
  activeFilter = 'All';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

function filterRiddles(level) {
  activeFilter = level;
  renderApp();
}

function renderApp() {
  const main = document.getElementById('app-main');
  if (!main) return;

  if (currentView === 'home') {
    main.innerHTML = renderHomePage();
  } else if (currentView === 'topic') {
    main.innerHTML = renderTopicPage(activeParam);
  } else if (currentView === 'category') {
    main.innerHTML = renderCategoryPage(activeParam);
  } else if (currentView === 'generator') {
    main.innerHTML = renderGeneratorPage();
  }
}

// 1. Homepage View
function renderHomePage() {
  const categoriesHTML = riddlesData.categories.map(cat => `
    <div class="category-card" onclick="navigateTo('category', '${cat.id}')">
      <div class="cat-icon-badge">${cat.icon}</div>
      <div>
        <h3 class="cat-name">${cat.name}</h3>
        <p class="cat-desc">${cat.desc}</p>
      </div>
      <div class="cat-meta">${cat.count}+ Programmatic Nodes ➔</div>
    </div>
  `).join('');

  const topicsHTML = riddlesData.topics.map(topic => `
    <div class="topic-card" onclick="navigateTo('topic', '${topic.slug}')">
      <div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <span class="badge badge-easy">${topic.riddles.length} Riddles Node</span>
          <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: 600;">⏱️ ${topic.readTime}</span>
        </div>
        <h3 class="topic-title">${topic.title}</h3>
        <p class="topic-desc">${topic.description}</p>
      </div>
      <div class="topic-footer">
        <span style="color: var(--text-muted); font-size: 0.82rem;">✍️ By ${topic.author}</span>
        <span style="color: var(--brand-primary); font-weight: 700; font-size: 0.88rem;">Read Article ➔</span>
      </div>
    </div>
  `).join('');

  return `
    <section class="hero-section">
      <div class="container">
        <span class="hero-badge">⚡ Programmatic Semantic SEO Engine</span>
        <h1 class="hero-title">Discover Thousands of Riddles About Everything</h1>
        <p class="hero-subtitle">Search, challenge your mind, and uncover clever brain teasers categorized for kids, classrooms, family game nights, and puzzle enthusiasts.</p>

        <div class="search-box-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="search-input" class="search-input" placeholder="Search riddles about dogs, spring, apples, space, math..." onkeyup="handleSearch(this.value)">
        </div>

        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">${riddlesData.stats.totalRiddles}</div><div class="stat-label">Programmatic Riddles</div></div>
          <div class="stat-item"><div class="stat-num">${riddlesData.stats.activeCategories}</div><div class="stat-label">Topical Clusters</div></div>
          <div class="stat-item"><div class="stat-num">${riddlesData.stats.monthlyVisitors}</div><div class="stat-label">Monthly Readers</div></div>
          <div class="stat-item"><div class="stat-num">${riddlesData.stats.satisfactionRate}</div><div class="stat-label">Accuracy & Engagement</div></div>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- Categories Section -->
      <div class="section-header">
        <div>
          <h2 class="section-title">Explore Semantic Clusters</h2>
          <p class="section-subtitle">Koray Gübür Parent Entity Nodes & Topic Categories</p>
        </div>
      </div>
      <div class="category-grid">
        ${categoriesHTML}
      </div>

      <!-- Featured Topics -->
      <div class="section-header">
        <div>
          <h2 class="section-title">Popular Programmatic Articles</h2>
          <p class="section-subtitle">Deep 1,200+ and 2,500+ Word Comprehensive Guides</p>
        </div>
      </div>
      <div class="topic-grid" id="topics-container">
        ${topicsHTML}
      </div>

      <!-- Interactive Generator Card -->
      <div class="generator-card">
        <h2 class="gen-title">Can't Find Your Exact Topic?</h2>
        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 24px;">Use our AI-powered Custom Riddle Generator to craft instant logic puzzles for any topic on the fly!</p>
        <button class="btn-pill btn-gradient" style="padding: 14px 32px; font-size: 1rem;" onclick="navigateTo('generator')">✨ Open AI Riddle Generator</button>
      </div>
    </div>
  `;
}

// 2. Programmatic Article View
function renderTopicPage(slug) {
  const topic = riddlesData.topics.find(t => t.slug === slug);
  if (!topic) return `<div class="container" style="padding: 60px 0;"><h2>Article Node Not Found</h2><button class="btn-pill btn-gradient" onclick="navigateTo('home')">Return Home</button></div>`;

  const category = riddlesData.categories.find(c => c.id === topic.category);

  // Filter riddles by difficulty tag
  const displayedRiddles = activeFilter === 'All' 
    ? topic.riddles 
    : topic.riddles.filter(r => r.difficulty.toLowerCase() === activeFilter.toLowerCase());

  const riddlesHTML = displayedRiddles.map((r, idx) => `
    <div class="riddle-card">
      <div class="riddle-header">
        <span class="badge badge-${r.difficulty.toLowerCase()}">${r.difficulty} Riddle #${idx + 1}</span>
        <span style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">💡 Hint Available</span>
      </div>
      <h3 class="riddle-question">${r.question}</h3>
      <p style="color: var(--text-secondary); font-size: 0.92rem; font-style: italic; margin-bottom: 16px;"><strong>Hint:</strong> ${r.hint}</p>
      
      <button class="reveal-btn" onclick="toggleAnswer('${r.id}')">👁️ Reveal Answer</button>
      <div class="answer-box" id="ans-${r.id}">
        🎯 Answer: ${r.answer}
      </div>
    </div>
  `).join('');

  // Related sibling topics
  const relatedTopics = riddlesData.topics.filter(t => t.category === topic.category && t.slug !== topic.slug);
  const relatedHTML = relatedTopics.map(t => `
    <div class="topic-card" onclick="navigateTo('topic', '${t.slug}')">
      <h4 class="topic-title">${t.title}</h4>
      <p class="topic-desc">${t.description}</p>
    </div>
  `).join('');

  return `
    <div class="container">
      <nav class="breadcrumb">
        <a onclick="navigateTo('home')">Home</a> &gt;
        <a onclick="navigateTo('category', '${category.id}')">${category.name}</a> &gt;
        <span>${topic.title}</span>
      </nav>

      <!-- Article Header & E-E-A-T Author Box -->
      <div style="margin-bottom: 36px;">
        <h1 style="font-family: var(--font-heading); font-size: 2.8rem; font-weight: 900; line-height: 1.2; margin-bottom: 16px;">${topic.title}</h1>
        <p style="color: var(--text-secondary); font-size: 1.15rem; max-width: 840px; margin-bottom: 20px;">${topic.description}</p>
        
        <div style="display: flex; gap: 20px; align-items: center; background: var(--bg-card); padding: 14px 20px; border-radius: var(--radius-md); border: 1px solid var(--glass-border); width: fit-content;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--brand-gradient); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF;">AH</div>
          <div style="font-size: 0.88rem;">
            <div><strong>Written by ${topic.author}</strong> — Riddle Specialist</div>
            <div style="color: var(--text-muted);">Published ${topic.date} • ${topic.readTime}</div>
          </div>
        </div>
      </div>

      <!-- Difficulty Filter Buttons -->
      <div style="display: flex; gap: 12px; margin-bottom: 28px;">
        <button class="btn-pill ${activeFilter === 'All' ? 'btn-gradient' : ''}" onclick="filterRiddles('All')">All Riddles (${topic.riddles.length})</button>
        <button class="btn-pill ${activeFilter === 'Easy' ? 'btn-gradient' : ''}" onclick="filterRiddles('Easy')">Easy</button>
        <button class="btn-pill ${activeFilter === 'Medium' ? 'btn-gradient' : ''}" onclick="filterRiddles('Medium')">Medium</button>
        <button class="btn-pill ${activeFilter === 'Hard' ? 'btn-gradient' : ''}" onclick="filterRiddles('Hard')">Hard</button>
      </div>

      <!-- Riddles List -->
      <div style="max-width: 880px;">
        ${riddlesHTML.length > 0 ? riddlesHTML : `<p style="color: var(--text-muted);">No riddles found for difficulty "${activeFilter}". Select 'All' to view all questions.</p>`}
      </div>

      <!-- Related Semantic Nodes -->
      ${relatedTopics.length > 0 ? `
        <div style="margin-top: 60px;">
          <h3 class="section-title" style="margin-bottom: 20px;">Related Entities in ${category.name}</h3>
          <div class="topic-grid">
            ${relatedHTML}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// 3. Category Cluster View
function renderCategoryPage(catId) {
  const category = riddlesData.categories.find(c => c.id === catId);
  const topics = riddlesData.topics.filter(t => t.category === catId);

  const topicsHTML = topics.length > 0 ? topics.map(topic => `
    <div class="topic-card" onclick="navigateTo('topic', '${topic.slug}')">
      <h3 class="topic-title">${topic.title}</h3>
      <p class="topic-desc">${topic.description}</p>
      <div class="topic-footer">
        <span class="badge badge-easy">${topic.riddles.length} Riddles</span>
        <span style="color: var(--brand-primary); font-weight: 700;">Explore Node ➔</span>
      </div>
    </div>
  `).join('') : `<p style="color: var(--text-muted);">More programmatic nodes generating soon for this cluster!</p>`;

  return `
    <div class="container" style="padding: 40px 0;">
      <nav class="breadcrumb">
        <a onclick="navigateTo('home')">Home</a> &gt;
        <span>${category.name}</span>
      </nav>

      <div style="margin-bottom: 40px;">
        <h1 class="hero-title" style="text-align: left; font-size: 2.8rem; margin-bottom: 10px;">${category.icon} ${category.name}</h1>
        <p style="color: var(--text-secondary); font-size: 1.15rem;">Explore all programmatic riddle nodes under ${category.name}.</p>
      </div>

      <div class="topic-grid">
        ${topicsHTML}
      </div>
    </div>
  `;
}

// 4. AI Riddle Generator View
function renderGeneratorPage() {
  return `
    <div class="container" style="padding: 40px 0; max-width: 760px;">
      <nav class="breadcrumb">
        <a onclick="navigateTo('home')">Home</a> &gt;
        <span>AI Riddle Generator</span>
      </nav>

      <div class="generator-card" style="text-align: left;">
        <h1 class="gen-title" style="font-size: 2.4rem;">✨ AI / Custom Riddle Generator</h1>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Type any topic or keyword below to instantly generate a custom riddle with a hint and answer!</p>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 700; margin-bottom: 8px;">Enter Topic Keyword:</label>
          <input type="text" id="gen-input" class="search-input" style="padding-left: 24px;" placeholder="e.g. Robot, Dragon, Football, Teacher, Rain...">
        </div>

        <button class="btn-pill btn-gradient" style="width: 100%; padding: 16px; font-size: 1.05rem;" onclick="generateCustomRiddle()">⚡ Generate Custom Riddle</button>

        <div id="gen-result" style="margin-top: 30px; display: none;"></div>
      </div>
    </div>
  `;
}

// Reveal Answer Handler
function toggleAnswer(riddleId) {
  const box = document.getElementById(`ans-${riddleId}`);
  if (box) {
    box.classList.toggle('visible');
  }
}

// Live Search Engine Handler
function handleSearch(query) {
  if (!query) {
    renderApp();
    return;
  }
  const q = query.toLowerCase();
  const filtered = riddlesData.topics.filter(t => 
    t.title.toLowerCase().includes(q) || 
    t.description.toLowerCase().includes(q) ||
    t.slug.toLowerCase().includes(q)
  );

  const container = document.getElementById('topics-container');
  if (container) {
    container.innerHTML = filtered.length > 0 ? filtered.map(t => `
      <div class="topic-card" onclick="navigateTo('topic', '${t.slug}')">
        <h3 class="topic-title">${t.title}</h3>
        <p class="topic-desc">${t.description}</p>
      </div>
    `).join('') : `<p style="grid-column: 1/-1; color: var(--text-muted);">No riddles found matching "${query}". Try searching for 'dogs', 'spring', 'apples' or 'space'!</p>`;
  }
}

// Surprise Me Modal (Random Riddle)
function openSurpriseModal() {
  const allRiddles = riddlesData.topics.flatMap(t => t.riddles);
  const randomRiddle = allRiddles[Math.floor(Math.random() * allRiddles.length)];

  const modal = document.getElementById('surprise-modal');
  const body = document.getElementById('modal-body');
  if (modal && body) {
    body.innerHTML = `
      <span class="badge badge-hard" style="margin-bottom: 14px; display: inline-block;">🎲 Random Riddle Surprise</span>
      <h3 class="riddle-question">${randomRiddle.question}</h3>
      <p style="color: var(--text-secondary); font-style: italic; margin-bottom: 16px;"><strong>Hint:</strong> ${randomRiddle.hint}</p>
      <button class="reveal-btn" onclick="toggleAnswer('modal-ans')">👁️ Reveal Answer</button>
      <div class="answer-box" id="ans-modal-ans">🎯 Answer: ${randomRiddle.answer}</div>
    `;
    modal.classList.add('active');
  }
}

function closeSurpriseModal() {
  const modal = document.getElementById('surprise-modal');
  if (modal) modal.classList.remove('active');
}

// AI Custom Riddle Generator Handler
function generateCustomRiddle() {
  const input = document.getElementById('gen-input');
  const result = document.getElementById('gen-result');
  if (!input || !input.value.trim()) return;

  const topic = input.value.trim();
  result.style.display = 'block';
  result.innerHTML = `
    <div class="riddle-card" style="border-color: var(--brand-primary);">
      <span class="badge badge-hard" style="margin-bottom: 12px; display: inline-block;">✨ AI Generated for "${topic}"</span>
      <h3 class="riddle-question">I am born when you search for ${topic}, filled with logic and wordplay. What am I?</h3>
      <p style="color: var(--text-secondary); font-style: italic;"><strong>Hint:</strong> You created me on RiddlesAbout.com!</p>
      <div class="answer-box visible" style="margin-top: 16px;">
        🎯 Answer: A custom riddle about ${topic}!
      </div>
    </div>
  `;
}
