// Premium Blog Engine Router for RiddlesAbout.com

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
    main.innerHTML = renderBlogArticlePage(activeParam);
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
      ${topic.heroImage ? `<img src="${topic.heroImage}" alt="${topic.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 14px;">` : ''}
      <div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <span class="badge badge-easy">${topic.wordCount}+ Words</span>
          <span class="badge badge-hard">${topic.type || 'Pillar Blog Post'}</span>
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
        <span class="hero-badge">⚡ The Universal "Wikipedia of Riddles & Brain Teasers"</span>
        <h1 class="hero-title">Discover Thousands of Riddles About Everything</h1>
        <p class="hero-subtitle">Search, challenge your mind, and explore 1,200+ and 2,500+ word comprehensive blog guides with printable worksheets, hints, and answers.</p>

        <div class="search-box-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="search-input" class="search-input" placeholder="Search blog posts about dogs, spring, apples, space, clocks..." onkeyup="handleSearch(this.value)">
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
          <h2 class="section-title">Explore Semantic Categories</h2>
          <p class="section-subtitle">Koray Gübür Parent Entity Nodes & Topic Clusters</p>
        </div>
      </div>
      <div class="category-grid">
        ${categoriesHTML}
      </div>

      <!-- Featured Blog Posts -->
      <div class="section-header">
        <div>
          <h2 class="section-title">Latest Blog Articles</h2>
          <p class="section-subtitle">Deep 1,200+ and 2,500+ Word Comprehensive Guides</p>
        </div>
      </div>
      <div class="topic-grid" id="topics-container">
        ${topicsHTML}
      </div>

      <!-- Interactive Generator Card -->
      <div class="generator-card" style="margin-top: 60px;">
        <h2 class="gen-title">Can't Find Your Exact Topic?</h2>
        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 24px;">Use our AI-powered Custom Riddle Generator to craft instant logic puzzles for any topic on the fly!</p>
        <button class="btn-pill btn-gradient" style="padding: 14px 32px; font-size: 1rem;" onclick="navigateTo('generator')">✨ Open AI Riddle Generator</button>
      </div>
    </div>
  `;
}

// 2. Full Blog Article Page View (1200+ & 2500+ Words + Images + Worksheets)
function renderBlogArticlePage(slug) {
  const topic = riddlesData.topics.find(t => t.slug === slug);
  if (!topic) return `<div class="container" style="padding: 60px 0;"><h2>Blog Article Not Found</h2><button class="btn-pill btn-gradient" onclick="navigateTo('home')">Return Home</button></div>`;

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
      <p style="color: var(--text-secondary); font-size: 0.95rem; font-style: italic; margin-bottom: 16px;"><strong>Hint:</strong> ${r.hint}</p>
      
      <button class="reveal-btn" onclick="toggleAnswer('${r.id}')">👁️ Reveal Answer</button>
      <div class="answer-box" id="ans-${r.id}">
        🎯 Answer: ${r.answer}
      </div>
    </div>
  `).join('');

  // Visual Assets HTML (Infographics, Worksheets, Tables)
  const visualPackHTML = topic.visualPack ? topic.visualPack.map(item => `
    <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--glass-border); margin-bottom: 30px;">
      <h4 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--text-primary);">${item.title}</h4>
      <img src="${item.url}" alt="${item.alt}" style="width: 100%; border-radius: var(--radius-sm); border: 1px solid var(--glass-border);">
      <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: var(--text-muted); font-size: 0.85rem;">📥 Free HD Printable Card</span>
        <a href="${item.url}" target="_blank" class="btn-pill" style="padding: 6px 16px; font-size: 0.82rem;">Download Full Size ➔</a>
      </div>
    </div>
  `).join('') : '';

  // Article Body Sections (Deep Content)
  const sectionsHTML = topic.articleSections ? topic.articleSections.map(sec => `
    <div style="margin-bottom: 32px;">
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 14px; color: var(--text-primary);">${sec.heading}</h2>
      <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; margin-bottom: 16px;">${sec.content}</p>
    </div>
  `).join('') : '';

  // FAQs HTML
  const faqsHTML = topic.faqs ? topic.faqs.map(faq => `
    <div style="background: var(--bg-card); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--glass-border); margin-bottom: 16px;">
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; color: var(--brand-primary);">❓ ${faq.q}</h4>
      <p style="color: var(--text-secondary); font-size: 0.98rem; line-height: 1.6;">${faq.a}</p>
    </div>
  `).join('') : '';

  // Related Sibling Posts
  const relatedTopics = riddlesData.topics.filter(t => t.category === topic.category && t.slug !== topic.slug);
  const relatedHTML = relatedTopics.map(t => `
    <div class="topic-card" onclick="navigateTo('topic', '${t.slug}')">
      <h4 class="topic-title">${t.title}</h4>
      <p class="topic-desc">${t.description}</p>
    </div>
  `).join('');

  return `
    <div class="container" style="padding: 40px 0;">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb">
        <a onclick="navigateTo('home')">Home</a> &gt;
        <a onclick="navigateTo('category', '${category.id}')">${category.name}</a> &gt;
        <span>${topic.title}</span>
      </nav>

      <!-- Blog Post Title & Header -->
      <div style="margin-bottom: 30px;">
        <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
          <span class="badge badge-hard">${topic.type || 'Pillar Article'}</span>
          <span class="badge badge-easy">${topic.wordCount}+ Words Depth</span>
          <span style="color: var(--text-muted); font-size: 0.88rem; font-weight: 600;">⏱️ ${topic.readTime}</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: 2.6rem; font-weight: 900; line-height: 1.25; margin-bottom: 16px;">${topic.title}</h1>
        
        <!-- Author Box -->
        <div style="display: flex; gap: 16px; align-items: center; background: var(--bg-card); padding: 14px 20px; border-radius: var(--radius-md); border: 1px solid var(--glass-border); width: fit-content;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--brand-gradient); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF;">AH</div>
          <div style="font-size: 0.88rem;">
            <div><strong>Written by ${topic.author}</strong> — Riddle & Pedagogy Specialist</div>
            <div style="color: var(--text-muted);">Published ${topic.date} • Fact Checked & Anti-AI Verified</div>
          </div>
        </div>
      </div>

      <!-- Featured Hero Banner Image -->
      ${topic.heroImage ? `
        <div style="margin-bottom: 36px;">
          <img src="${topic.heroImage}" alt="${topic.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: var(--radius-lg); border: 1px solid var(--glass-border); box-shadow: var(--shadow-glow);">
        </div>
      ` : ''}

      <!-- Koray's First Paragraph Semantic Vector -->
      <div style="background: rgba(99, 102, 241, 0.08); border-left: 4px solid var(--brand-primary); padding: 20px 24px; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 40px;">
        <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--brand-primary); margin-bottom: 8px;">📌 Executive Semantic Summary & Definition Vector</h3>
        <p style="color: var(--text-primary); font-size: 1.1rem; line-height: 1.7; font-weight: 500;">${topic.introVector}</p>
      </div>

      <!-- Main Blog Layout (2 Columns: Content Left, Visuals Right) -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
        <!-- Left Main Content Column -->
        <div>
          <!-- Article Body Sections -->
          ${sectionsHTML}

          <!-- Difficulty Filters for Riddles -->
          <div style="display: flex; gap: 10px; margin: 30px 0 20px; flex-wrap: wrap;">
            <button class="btn-pill ${activeFilter === 'All' ? 'btn-gradient' : ''}" onclick="filterRiddles('All')">All Riddles (${topic.riddles.length})</button>
            <button class="btn-pill ${activeFilter === 'Easy' ? 'btn-gradient' : ''}" onclick="filterRiddles('Easy')">Easy</button>
            <button class="btn-pill ${activeFilter === 'Medium' ? 'btn-gradient' : ''}" onclick="filterRiddles('Medium')">Medium</button>
            <button class="btn-pill ${activeFilter === 'Hard' ? 'btn-gradient' : ''}" onclick="filterRiddles('Hard')">Hard</button>
          </div>

          <!-- Riddles Cards -->
          <div style="margin-bottom: 50px;">
            ${riddlesHTML}
          </div>

          <!-- FAQs Section -->
          ${faqsHTML ? `
            <div style="margin-top: 40px;">
              <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 20px;">Frequently Asked Questions (FAQ)</h2>
              ${faqsHTML}
            </div>
          ` : ''}
        </div>

        <!-- Right Sidebar (Infographics, Printable Cards, Pinterest Pins) -->
        <div>
          <div style="position: sticky; top: 100px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; margin-bottom: 16px;">🖼️ In-Article Visual Cards & Worksheets</h3>
            ${visualPackHTML ? visualPackHTML : '<p style="color: var(--text-muted);">Visual infographic packs generating...</p>'}
          </div>
        </div>
      </div>

      <!-- Related Semantic Blog Posts -->
      ${relatedTopics.length > 0 ? `
        <div style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--glass-border);">
          <h3 class="section-title" style="margin-bottom: 20px;">Related Articles in ${category.name}</h3>
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
      ${topic.heroImage ? `<img src="${topic.heroImage}" alt="${topic.title}" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 14px;">` : ''}
      <h3 class="topic-title">${topic.title}</h3>
      <p class="topic-desc">${topic.description}</p>
      <div class="topic-footer">
        <span class="badge badge-easy">${topic.riddles.length} Riddles</span>
        <span style="color: var(--brand-primary); font-weight: 700;">Read Blog Post ➔</span>
      </div>
    </div>
  `).join('') : `<p style="color: var(--text-muted);">More programmatic blog articles generating soon for this cluster!</p>`;

  return `
    <div class="container" style="padding: 40px 0;">
      <nav class="breadcrumb">
        <a onclick="navigateTo('home')">Home</a> &gt;
        <span>${category.name}</span>
      </nav>

      <div style="margin-bottom: 40px;">
        <h1 class="hero-title" style="text-align: left; font-size: 2.8rem; margin-bottom: 10px;">${category.icon} ${category.name}</h1>
        <p style="color: var(--text-secondary); font-size: 1.15rem;">Explore all programmatic riddle blog guides under ${category.name}.</p>
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
    `).join('') : `<p style="grid-column: 1/-1; color: var(--text-muted);">No blog posts found matching "${query}". Try searching for 'dogs', 'spring', 'apples' or 'space'!</p>`;
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
