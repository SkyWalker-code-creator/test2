const App = {
  init() {
    this.renderMusicWidget(); 
    this.initClock();
    this.initTabs();
    this.initPalette();
    this.initSearch();
    this.initTerminal();
    this.initShortcuts();
    this.initParticles();
    
    if (window.AudioPlayer) AudioPlayer.init();
    
    this.navigate('bio', true);
    setTimeout(() => document.getElementById('bootScreen').classList.add('hidden'), 1000);
  },

  notify(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<div style="display:flex; align-items:center; gap:8px;"><span style="color:var(--${type==='error'?'red':type==='success'?'green':'blue'})">${type==='error'?'✗':type==='success'?'✓':'ⓘ'}</span> ${msg}</div><div class="toast-progress"></div>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  },

  navigate(viewName, isInitial = false) {
    if (!Views[viewName]) return;
    if (isInitial || !document.startViewTransition) {
      this.renderView(viewName);
      return;
    }
    document.startViewTransition(() => this.renderView(viewName));
  },

  renderView(viewName) {
    document.getElementById('mainContent').innerHTML = Views[viewName]();
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === viewName));
    document.querySelectorAll('.sb-item').forEach(t => t.classList.toggle('active', t.dataset.nav === viewName));
    const titles = { bio: 'SkyWalker.cs', project: 'RustShield.md', skills: 'skills.json', timeline: 'Timeline.txt', setup: 'Setup.md', contacts: 'contacts.txt' };
    document.getElementById('tbTitle').textContent = titles[viewName] || 'SkyWalker.cs';
  },

  initParticles() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

    for(let i=0; i<100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2
      });
    }

    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          p.x -= dx / dist * force * 5;
          p.y -= dy / dist * force * 5;
        }
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(86, 156, 214, 0.6)';
        ctx.fill();
      });

      for(let i=0; i<particles.length; i++) {
        for(let j=i+1; j<particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(86, 156, 214, ${1 - dist/120})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  },

  initTerminal() {
    const termInput = document.getElementById('termInput');
    if (!termInput) return;

    const cmds = {
      'help': 'Доступно: help, whoami, skills, projects, clear, music, theme, matrix, stats',
      'whoami': `SkyWalker — ${DATA.bio.title}.`,
      'skills': DATA.skills.languages.map(l => l.name).join(', ') + ' | ' + DATA.skills.frameworks.join(', '),
      'projects': DATA.project.title + ' - ' + CONFIG.projectUrl,
      'stats': `Скачиваний: ${DATA.project.stats.downloads} | Строк кода: ${DATA.project.stats.linesOfCode}`,
      'clear': () => { document.getElementById('termBody').innerHTML = ''; return ''; },
      'music': () => { const b = document.getElementById('musicToggle'); if(b) b.click(); return 'Переключение...'; },
      'matrix': () => { document.body.classList.toggle('matrix-bg'); return 'Wake up, Neo...'; },
      'theme': () => { document.body.classList.toggle('light-mode'); return 'Смена темы...'; }
    };

    let history = [];
    let histIdx = -1;

    termInput.onkeydown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx < history.length - 1) { histIdx++; termInput.value = history[history.length - 1 - histIdx]; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) { histIdx--; termInput.value = history[history.length - 1 - histIdx]; }
        else { histIdx = -1; termInput.value = ''; }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const val = termInput.value;
        const match = Object.keys(cmds).find(c => c.startsWith(val) && val);
        if (match) termInput.value = match;
      } else if (e.key === 'Enter') {
        const val = termInput.value.trim();
        if (!val) return;
        history.push(val); histIdx = -1; termInput.value = '';
        const body = document.getElementById('termBody');
        const inputLine = termInput.parentElement;
        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = `<span class="term-prompt">skywalker@dev:~$</span><span>${val}</span>`;
        body.insertBefore(cmdLine, inputLine);
        let res = cmds[val.toLowerCase()];
        if (typeof res === 'function') res = res();
        if (res === undefined) res = `bash: ${val}: command not found`;
        if (res) {
          const resLine = document.createElement('div');
          resLine.className = 'term-line';
          resLine.style.color = 'var(--text-dim)';
          resLine.textContent = res;
          body.insertBefore(resLine, inputLine);
        }
        body.scrollTop = body.scrollHeight;
      }
    };
  },

  toggleTerm() {
    document.getElementById('terminal').classList.toggle('closed');
    if (!document.getElementById('terminal').classList.contains('closed')) document.getElementById('termInput').focus();
  },

  initSearch() {
    const input = document.getElementById('searchInput');
    const list = document.getElementById('searchList');
    if(!input) return;

    const allData = [
      { t: 'Bio.cs', d: 'Profile, Experience, About me', a: () => this.navigate('bio') },
      { t: 'RustShield.md', d: 'Project, Anti-cheat, Architecture', a: () => this.navigate('project') },
      { t: 'skills.json', d: 'Languages, Tools, Concepts', a: () => this.navigate('skills') },
      { t: 'Timeline.txt', d: 'Work history, Career path', a: () => this.navigate('timeline') },
      { t: 'Setup.md', d: 'Installation guide, Build source', a: () => this.navigate('setup') },
      { t: 'contacts.txt', d: 'Telegram, Discord, GitHub', a: () => this.navigate('contacts') }
    ];

    function fuzzyMatch(str, query) {
      let si = 0, qi = 0;
      while (si < str.length && qi < query.length) {
        if (str[si].toLowerCase() === query[qi].toLowerCase()) qi++;
        si++;
      }
      return qi === query.length;
    }

    input.oninput = (e) => {
      const q = e.target.value.toLowerCase().trim();
      list.innerHTML = '';
      if (!q) return;
      const results = allData.filter(item => fuzzyMatch(item.t + ' ' + item.d, q));
      results.forEach(r => {
        const el = document.createElement('div');
        el.className = 'modal-item';
        el.innerHTML = `<span style="color:var(--blue)">◈</span> ${r.t} <span style="font-size:12px; color:var(--text-dim); margin-left:10px;">${r.d}</span>`;
        el.onclick = () => { r.a(); this.closeSearch(); };
        list.appendChild(el);
      });
      if(results.length === 0) list.innerHTML = '<div class="modal-item" style="text-align:center; cursor:default;">No results found</div>';
    };
  },

  openSearch() { document.getElementById('searchOverlay').classList.add('open'); document.getElementById('searchInput').focus(); },
  closeSearch() { document.getElementById('searchOverlay').classList.remove('open'); },

  initPalette() {
    const cmds = [
      { n: 'Открыть Bio', a: () => this.navigate('bio') },
      { n: 'Открыть Project (RustShield)', a: () => this.navigate('project') },
      { n: 'Открыть Skills', a: () => this.navigate('skills') },
      { n: 'Открыть Timeline', a: () => this.navigate('timeline') },
      { n: 'Открыть Setup', a: () => this.navigate('setup') },
      { n: 'Открыть Contacts', a: () => this.navigate('contacts') },
      { n: 'Включить/Выключить Музыку', a: () => { const b = document.getElementById('musicToggle'); if(b) b.click(); } },
      { n: 'Открыть Терминал', a: () => this.toggleTerm() },
      { n: 'Zen Режим', a: () => document.body.classList.toggle('zen-mode') }
    ];
    this.pFiltered = [...cmds]; this.pIndex = 0;

    this.renderPalette = () => {
      const list = document.getElementById('paletteList');
      list.innerHTML = '';
      this.pFiltered.forEach((c, i) => {
        const el = document.createElement('div');
        el.className = 'modal-item' + (i === this.pIndex ? ' selected' : '');
        el.textContent = c.n;
        el.onclick = () => { c.a(); this.closePalette(); };
        list.appendChild(el);
      });
    };

    const pInput = document.getElementById('paletteInput');
    if(pInput) {
      pInput.oninput = (e) => {
        const q = e.target.value.toLowerCase();
        this.pFiltered = cmds.filter(c => c.n.toLowerCase().includes(q));
        this.renderPalette();
      };
      pInput.onkeydown = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.pIndex = (this.pIndex + 1) % this.pFiltered.length; this.renderPalette(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); this.pIndex = (this.pIndex - 1 + this.pFiltered.length) % this.pFiltered.length; this.renderPalette(); }
        if (e.key === 'Enter' && this.pFiltered[this.pIndex]) { this.pFiltered[this.pIndex].a(); this.closePalette(); }
      };
    }
  },

  openPalette() { document.getElementById('paletteOverlay').classList.add('open'); document.getElementById('paletteInput').focus(); this.renderPalette(); },
  closePalette() { document.getElementById('paletteOverlay').classList.remove('open'); },

  renderMusicWidget() {
    const actions = document.querySelector('.titlebar-actions');
    if(!actions) return;
    actions.insertAdjacentHTML('beforeend', `
      <div id="musicWidget" style="display:none; position:absolute; top:50px; right:20px; background:rgba(25,25,30,0.95); border:1px solid var(--border); padding:16px; border-radius:12px; z-index:100; backdrop-filter:blur(10px); box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        <div style="font-size:12px; margin-bottom:12px; font-family:var(--font-mono); color:var(--text);">🎵 Background Audio</div>
        <div style="display:flex; gap:10px; align-items:center;">
          <button id="musicToggle" style="background:var(--blue); color:#fff; padding:6px 16px; border-radius:6px; font-size:12px; font-weight:bold; transition:0.2s;">Play</button>
          <input type="range" id="musicVol" min="0" max="1" step="0.05" value="0.5" style="width:80px; accent-color:var(--blue);">
        </div>
      </div>
    `);
    document.getElementById('btnMusic').onclick = (e) => {
      e.stopPropagation();
      const w = document.getElementById('musicWidget');
      w.style.display = w.style.display === 'none' ? 'block' : 'none';
    };
    document.addEventListener('click', (e) => {
      const w = document.getElementById('musicWidget');
      if (w && w.style.display === 'block' && !e.target.closest('#musicWidget') && e.target.id !== 'btnMusic') {
        w.style.display = 'none';
      }
    });
  },

  initClock() {
    setInterval(() => {
      const d = new Date();
      document.getElementById('clock').textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    }, 1000);
  },

  initTabs() {
    document.querySelectorAll('.tab').forEach(t => t.onclick = () => this.navigate(t.dataset.tab));
    document.querySelectorAll('.sb-item').forEach(t => t.onclick = () => this.navigate(t.dataset.nav));
  },

  initShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); this.openPalette(); }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') { e.preventDefault(); this.openSearch(); }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') { e.preventDefault(); this.toggleTerm(); }
      if (e.key === 'Escape') { 
        this.closePalette(); 
        this.closeSearch(); 
        const mw = document.getElementById('musicWidget');
        if(mw) mw.style.display = 'none';
      }
    });
  }
};

window.onload = () => App.init();