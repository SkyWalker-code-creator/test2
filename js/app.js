// ==========================================
// ЛОКАЛЬНЫЙ ПЛЕЕР (ФОН)
// ==========================================
const AudioPlayer = {
  el: null, isPlaying: false,
  init() {
    this.el = document.getElementById('bgMusic');
    if (!this.el) return;
    const savedVol = localStorage.getItem('musicVolume');
    this.el.volume = savedVol !== null ? parseFloat(savedVol) : 0.5;
  },
  toggle() {
    if (this.isPlaying) { this.el.pause(); this.isPlaying = false; } 
    else { this.el.play().then(() => { this.isPlaying = true; }).catch(e => console.error(e)); }
    this.updateUI();
  },
  updateUI() {
    const btn = document.getElementById('musicToggle');
    if (btn) btn.innerHTML = this.isPlaying ? '⏸ Local Music' : '▶ Local Music';
  }
};

// ==========================================
// ОСНОВНОЙ КОД ПРИЛОЖЕНИЯ
// ==========================================
const App = {
  matrixInterval: null,
  currentTracks: [],
  currentTrackIndex: -1,
  isLooping: false,

  init() {
    this.renderMusicWidget();
    this.initClock();
    this.initTabs();
    this.initPalette();
    this.initSearch();
    this.initTerminal();
    this.initShortcuts();
    this.initParticles();
    this.initThemeSelector();
    this.initConverter();

    AudioPlayer.init();
    if (window.GithubAPI) GithubAPI.init();

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
    if (isInitial || !document.startViewTransition) { this.renderView(viewName); return; }
    document.startViewTransition(() => this.renderView(viewName));
  },

  renderView(viewName) {
    document.getElementById('mainContent').innerHTML = Views[viewName]();
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === viewName));
    document.querySelectorAll('.sb-item').forEach(t => t.classList.toggle('active', t.dataset.nav === viewName));
    const titles = { bio:'SkyWalker.cs', project:'RustShield.md', skills:'skills.json', timeline:'Timeline.txt', setup:'Setup.md', contacts:'contacts.txt', gallery:'Gallery.md', blog:'Blog.md', stats:'Stats.json', changelog:'Changelog.txt', converter:'Converter.js' };
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
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    for(let i=0; i<100; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 2 });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        let dx = mouse.x - p.x, dy = mouse.y - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouse.radius) { let force = (mouse.radius - dist) / mouse.radius; p.x -= dx / dist * force * 5; p.y -= dy / dist * force * 5; }
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(86, 156, 214, 0.6)'; ctx.fill();
      });
      for(let i=0; i<particles.length; i++) {
        for(let j=i+1; j<particles.length; j++) {
          let dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(86, 156, 214, ${1 - dist/120})`; ctx.lineWidth = 0.5; ctx.stroke();
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
      'help': 'Доступно: help, whoami, skills, projects, stats, clear, music, theme, matrix, gallery, blog, changelog, version, date, echo, fortune, converter',
      'whoami': `SkyWalker - ${DATA.bio.title}.`,
      'skills': DATA.skills.languages.map(l => l.name).join(', ') + ' | ' + DATA.skills.frameworks.join(', '),
      'projects': DATA.project.title + ' - ' + CONFIG.projectUrl,
      'stats': `Скачиваний: ${DATA.project.stats.downloads} | Строк кода: ${DATA.project.stats.linesOfCode}`,
      'version': 'SkyWalker Portfolio v3.2.0 (2026)',
      'date': () => new Date().toLocaleString('ru-RU'),
      'fortune': () => ['Не существует идеального анти-чита.', 'Код - это поэзия для машин.', 'Reverse Engineering - искусство видеть невидимое.', 'Без ложных срабатываний. Без лагов.'][Math.floor(Math.random()*4)],
      'clear': () => { document.getElementById('termBody').innerHTML = ''; return ''; },
      'music': () => { this.toggleMusic(); return 'Переключение фоновой музыки...'; },
      'matrix': () => { this.toggleMatrix(); return 'Wake up, Neo...'; },
      'theme': () => { this.openTheme(); return 'Открываю выбор темы...'; },
      'gallery': () => { this.navigate('gallery'); return 'Открываю галерею...'; },
      'blog': () => { this.navigate('blog'); return 'Открываю блог...'; },
      'changelog': () => { this.navigate('changelog'); return 'Открываю историю изменений...'; },
      'converter': () => { this.navigate('converter'); return 'Открываю конвертер...'; }
    };
    let history = []; let histIdx = -1;
    termInput.onkeydown = (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (histIdx < history.length - 1) { histIdx++; termInput.value = history[history.length - 1 - histIdx]; } }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) { histIdx--; termInput.value = history[history.length - 1 - histIdx]; } else { histIdx = -1; termInput.value = ''; } }
      else if (e.key === 'Tab') { e.preventDefault(); const val = termInput.value; const match = Object.keys(cmds).find(c => c.startsWith(val) && val); if (match) termInput.value = match; }
      else if (e.key === 'Enter') {
        const val = termInput.value.trim(); if (!val) return;
        history.push(val); histIdx = -1; termInput.value = '';
        const body = document.getElementById('termBody'); const inputLine = termInput.parentElement;
        const cmdLine = document.createElement('div'); cmdLine.className = 'term-line';
        cmdLine.innerHTML = `<span class="term-prompt">skywalker@dev:~$</span><span>${val}</span>`;
        body.insertBefore(cmdLine, inputLine);
        let res = cmds[val.toLowerCase()];
        if (val.toLowerCase().startsWith('echo ')) res = val.slice(5);
        if (typeof res === 'function') res = res();
        if (res === undefined) res = `bash: ${val}: command not found`;
        if (res) {
          const resLine = document.createElement('div'); resLine.className = 'term-line';
          resLine.style.color = 'var(--text-dim)'; resLine.textContent = res;
          body.insertBefore(resLine, inputLine);
        }
        body.scrollTop = body.scrollHeight;
      }
    };
  },

  toggleTerm() { document.getElementById('terminal').classList.toggle('closed'); if (!document.getElementById('terminal').classList.contains('closed')) document.getElementById('termInput').focus(); },
  toggleZen() { document.body.classList.toggle('zen-mode'); this.notify(document.body.classList.contains('zen-mode') ? 'Zen режим включён' : 'Zen режим выключен', 'success'); },
  toggleMatrix() {
    const canvas = document.getElementById('matrixCanvas'); const ctx = canvas.getContext('2d');
    if (this.matrixInterval) { clearInterval(this.matrixInterval); this.matrixInterval = null; canvas.style.display = 'none'; return; }
    canvas.style.display = 'block'; canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEF'; const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize); const drops = Array(cols).fill(1);
    this.matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(5,5,5,0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4ec9b0'; ctx.font = fontSize + 'px monospace';
      drops.forEach((d, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)]; ctx.fillText(ch, i * fontSize, d * fontSize);
        if (d * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++;
      });
    }, 50);
  },

  initSearch() {
    const input = document.getElementById('searchInput'); const list = document.getElementById('searchList'); if(!input) return;
    const allData = [
      { t: 'Bio.cs', d: 'Profile, Experience, About me', a: () => this.navigate('bio') },
      { t: 'RustShield.md', d: 'Project, Anti-cheat, Architecture', a: () => this.navigate('project') },
      { t: 'skills.json', d: 'Languages, Tools, Concepts', a: () => this.navigate('skills') },
      { t: 'Timeline.txt', d: 'Work history, Career path', a: () => this.navigate('timeline') },
      { t: 'Setup.md', d: 'Installation guide, Build source', a: () => this.navigate('setup') },
      { t: 'contacts.txt', d: 'Telegram, Discord, GitHub', a: () => this.navigate('contacts') },
      { t: 'Gallery.md', d: 'Screenshots, UI concepts', a: () => this.navigate('gallery') },
      { t: 'Blog.md', d: 'Posts, Notes, Articles', a: () => this.navigate('blog') },
      { t: 'Stats.json', d: 'Downloads, Commits, Stars', a: () => this.navigate('stats') },
      { t: 'Changelog.txt', d: 'Versions, Updates', a: () => this.navigate('changelog') },
      { t: 'Converter.js', d: 'Text tools, Base64, Hash', a: () => this.navigate('converter') }
    ];
    function fuzzyMatch(str, query) { let si = 0, qi = 0; while (si < str.length && qi < query.length) { if (str[si].toLowerCase() === query[qi].toLowerCase()) qi++; si++; } return qi === query.length; }
    input.oninput = (e) => {
      const q = e.target.value.toLowerCase().trim(); list.innerHTML = ''; if (!q) return;
      const results = allData.filter(item => fuzzyMatch(item.t + ' ' + item.d, q));
      results.forEach(r => {
        const el = document.createElement('div'); el.className = 'modal-item';
        el.innerHTML = `<span style="color:var(--blue)">◈</span> ${r.t} <span style="font-size:12px; color:var(--text-dim); margin-left:10px;">${r.d}</span>`;
        el.onclick = () => { r.a(); this.closeSearch(); }; list.appendChild(el);
      });
      if(results.length === 0) list.innerHTML = '<div class="modal-item" style="text-align:center; cursor:default;">No results found</div>';
    };
  },

  openSearch() { document.getElementById('searchOverlay').classList.add('open'); document.getElementById('searchInput').focus(); },
  closeSearch() { document.getElementById('searchOverlay').classList.remove('open'); },

  initPalette() {
    const cmds = [
      { n: 'Открыть Bio', a: () => this.navigate('bio') }, { n: 'Открыть Project', a: () => this.navigate('project') },
      { n: 'Открыть Skills', a: () => this.navigate('skills') }, { n: 'Открыть Timeline', a: () => this.navigate('timeline') },
      { n: 'Открыть Setup', a: () => this.navigate('setup') }, { n: 'Открыть Contacts', a: () => this.navigate('contacts') },
      { n: 'Открыть Gallery', a: () => this.navigate('gallery') }, { n: 'Открыть Blog', a: () => this.navigate('blog') },
      { n: 'Открыть Stats', a: () => this.navigate('stats') }, { n: 'Открыть Changelog', a: () => this.navigate('changelog') },
      { n: 'Открыть Converter', a: () => this.navigate('converter') },
      { n: 'Включить/Выключить Музыку', a: () => this.toggleMusic() },
      { n: 'Открыть Терминал', a: () => this.toggleTerm() }, { n: 'Zen Режим', a: () => this.toggleZen() },
      { n: 'Matrix Режим', a: () => this.toggleMatrix() }, { n: 'Выбрать Тему', a: () => this.openTheme() }
    ];
    this.pFiltered = [...cmds]; this.pIndex = 0;
    this.renderPalette = () => {
      const list = document.getElementById('paletteList'); list.innerHTML = '';
      this.pFiltered.forEach((c, i) => {
        const el = document.createElement('div'); el.className = 'modal-item' + (i === this.pIndex ? ' selected' : '');
        el.textContent = c.n; el.onclick = () => { c.a(); this.closePalette(); }; list.appendChild(el);
      });
    };
    const pInput = document.getElementById('paletteInput');
    if(pInput) {
      pInput.oninput = (e) => { const q = e.target.value.toLowerCase(); this.pFiltered = cmds.filter(c => c.n.toLowerCase().includes(q)); this.pIndex = 0; this.renderPalette(); };
      pInput.onkeydown = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.pIndex = (this.pIndex + 1) % this.pFiltered.length; this.renderPalette(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); this.pIndex = (this.pIndex - 1 + this.pFiltered.length) % this.pFiltered.length; this.renderPalette(); }
        if (e.key === 'Enter' && this.pFiltered[this.pIndex]) { this.pFiltered[this.pIndex].a(); this.closePalette(); }
      };
    }
  },

  openPalette() { document.getElementById('paletteOverlay').classList.add('open'); document.getElementById('paletteInput').focus(); this.renderPalette(); },
  closePalette() { document.getElementById('paletteOverlay').classList.remove('open'); },

  initThemeSelector() {
    const themes = [{ id: '', label: '🌑 Default Dark' }, { id: 'theme-light', label: '☀️ Light' }, { id: 'theme-dracula', label: '🧛 Dracula' }];
    const list = document.getElementById('themeList'); if (!list) return; list.innerHTML = '';
    themes.forEach(t => {
      const el = document.createElement('div'); el.className = 'modal-item'; el.textContent = t.label;
      el.onclick = () => {
        document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
        if (t.id) document.body.classList.add(t.id);
        localStorage.setItem('theme', t.id); this.closeTheme(); this.notify('Тема: ' + t.label, 'success');
      };
      list.appendChild(el);
    });
    const saved = localStorage.getItem('theme'); if (saved) document.body.classList.add(saved);
    document.getElementById('btnTheme').onclick = () => this.openTheme();
  },

  openTheme() { document.getElementById('themeOverlay').classList.add('open'); },
  closeTheme() { document.getElementById('themeOverlay').classList.remove('open'); },

  openBlog(index) {
    const post = DATA.blog.posts[index];
    if (!post) return;
    
    document.getElementById('blogModalTitle').textContent = post.title;
    document.getElementById('blogModalDate').textContent = post.date + ' • ' + post.tag;
    
    document.getElementById('blogModalBody').innerHTML = `<div class="code-block">${post.fullText}</div>`;
    
    document.getElementById('blogOverlay').classList.add('open');
  },

  closeBlog() {
    document.getElementById('blogOverlay').classList.remove('open');
  },

  renderMusicWidget() {
    const actions = document.querySelector('.titlebar-actions');
    if(!actions) return;
    
    actions.insertAdjacentHTML('beforeend', `
      <div id="musicWidget" style="display:none; position:absolute; top:56px; right:20px; width:360px; background:rgba(20,20,26,0.98); border:1px solid var(--border); padding:0; border-radius:16px; z-index:200; backdrop-filter:blur(20px); box-shadow:0 20px 50px rgba(0,0,0,0.8); overflow:hidden; flex-direction:column;">
        
        <div style="padding:16px; border-bottom:1px solid var(--border); background:rgba(0,0,0,0.2);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-size:12px; font-family:var(--font-mono); color:var(--text-dim); letter-spacing:1px; font-weight:600;">🌐 WEB RADIO</div>
            <button onclick="App.toggleMusic()" id="musicToggle" style="background:var(--blue); color:#fff; border:none; padding:4px 10px; border-radius:6px; font-size:11px; cursor:pointer;">▶ Local Music</button>
          </div>
          <div style="display:flex; gap:8px;">
            <input type="text" id="webSearchInput" placeholder="Поиск треков..." style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--border); border-radius:8px; padding:8px 12px; color:var(--text); font-size:13px; outline:none;">
            <button onclick="App.searchMusic()" style="background:var(--blue); color:#fff; border:none; padding:8px 14px; border-radius:8px; cursor:pointer;">🔍</button>
          </div>
        </div>

        <div id="webResults" style="max-height:220px; overflow-y:auto; padding:8px;">
          <div style="text-align:center; color:var(--text-dim); font-size:12px; padding:20px 0;">Введите запрос для поиска...</div>
        </div>

        <div style="padding:16px; border-top:1px solid var(--border); background:rgba(0,0,0,0.4);">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <img id="webCover" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='48' height='48' fill='%23569cd6'/></svg>" style="width:48px; height:48px; border-radius:8px; object-fit:cover; background:#222;">
            <div style="flex:1; overflow:hidden;">
              <div style="display:flex; align-items:center; gap:8px;">
                <div id="webTitle" style="font-size:14px; font-weight:bold; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Ничего не играет</div>
                <div id="webEq" class="eq-container" style="height:12px; gap:2px;">
                  <div class="eq-bar" style="width:3px;"></div><div class="eq-bar" style="width:3px;"></div><div class="eq-bar" style="width:3px;"></div><div class="eq-bar" style="width:3px;"></div>
                </div>
              </div>
              <div id="webArtist" style="font-size:12px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">-</div>
            </div>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <button onclick="App.prevTrack()" style="background:none; border:none; color:var(--text); font-size:18px; cursor:pointer;">⏮</button>
              <button onclick="App.toggleWebPlayer()" id="webPlayBtn" style="background:var(--green); color:#fff; border:none; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px;">▶</button>
              <button onclick="App.nextTrack()" style="background:none; border:none; color:var(--text); font-size:18px; cursor:pointer;">⏭</button>
              <button onclick="App.toggleLoop()" id="webLoopBtn" style="background:none; border:none; color:var(--text-dim); font-size:16px; cursor:pointer; margin-left:8px;" title="Повтор трека">🔁</button>
            </div>
            <div id="webTimer" style="font-family:var(--font-mono); font-size:12px; color:var(--text-dim);">0:00 / 0:30</div>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; color:var(--text-dim);">🔈</span>
            <input type="range" id="webVol" min="0" max="1" step="0.01" value="0.5" style="width:100%; accent-color:var(--blue); cursor:pointer;">
          </div>
        </div>
      </div>
    `);
    
    document.getElementById('btnMusic').onclick = (e) => {
      e.stopPropagation();
      const w = document.getElementById('musicWidget');
      w.style.display = w.style.display === 'none' ? 'flex' : 'none';
    };
    document.addEventListener('click', (e) => {
      const w = document.getElementById('musicWidget');
      if (w && w.style.display === 'flex' && !e.target.closest('#musicWidget') && e.target.id !== 'btnMusic') {
        w.style.display = 'none';
      }
    });

    this.webAudio = document.getElementById('webMusic');
    this.webAudio.volume = 0.5;
    
    this.webAudio.onplay = () => { 
      document.getElementById('webPlayBtn').innerHTML = '⏸'; 
      document.getElementById('webPlayBtn').style.background = 'var(--red)'; 
      document.getElementById('webEq').classList.add('active');
    };
    this.webAudio.onpause = () => { 
      document.getElementById('webPlayBtn').innerHTML = '▶'; 
      document.getElementById('webPlayBtn').style.background = 'var(--green)'; 
      document.getElementById('webEq').classList.remove('active');
    };
    this.webAudio.onended = () => { 
      if (this.isLooping) { this.webAudio.currentTime = 0; this.webAudio.play(); } 
      else { this.nextTrack(); }
    };
    this.webAudio.ontimeupdate = () => {
      const cur = Math.floor(this.webAudio.currentTime);
      const dur = Math.floor(this.webAudio.duration) || 30;
      document.getElementById('webTimer').textContent = `${Math.floor(cur/60)}:${String(cur%60).padStart(2,'0')} / ${Math.floor(dur/60)}:${String(dur%60).padStart(2,'0')}`;
    };
    document.getElementById('webVol').oninput = (e) => { this.webAudio.volume = parseFloat(e.target.value); };
    document.getElementById('webSearchInput').onkeydown = (e) => { if (e.key === 'Enter') this.searchMusic(); };
  },

  toggleMusic() { AudioPlayer.toggle(); },
  toggleLoop() {
    this.isLooping = !this.isLooping;
    const btn = document.getElementById('webLoopBtn');
    btn.style.color = this.isLooping ? 'var(--blue)' : 'var(--text-dim)';
    this.notify(this.isLooping ? 'Повтор включен' : 'Повтор выключен', 'info');
  },

  async searchMusic() {
    const query = document.getElementById('webSearchInput').value.trim();
    const resultsDiv = document.getElementById('webResults');
    if (!query) return;
    resultsDiv.innerHTML = '<div style="text-align:center; color:var(--text-dim); font-size:12px; padding:20px 0;">Поиск...</div>';
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=6`);
      const data = await res.json();
      if (data.results.length === 0) {
        resultsDiv.innerHTML = '<div style="text-align:center; color:var(--text-dim); font-size:12px; padding:20px 0;">Ничего не найдено</div>';
        return;
      }
      this.currentTracks = data.results;
      resultsDiv.innerHTML = '';
      data.results.forEach((track, index) => {
        const el = document.createElement('div');
        el.style.cssText = 'display:flex; align-items:center; gap:10px; padding:8px; border-radius:8px; cursor:pointer; transition:0.2s; border-bottom:1px solid rgba(255,255,255,0.05);';
        el.onmouseover = () => el.style.background = 'rgba(255,255,255,0.05)';
        el.onmouseout = () => el.style.background = 'transparent';
        el.innerHTML = `
          <img src="${track.artworkUrl60}" style="width:36px; height:36px; border-radius:4px; object-fit:cover;">
          <div style="flex:1; overflow:hidden;">
            <div style="font-size:13px; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${track.trackName}</div>
            <div style="font-size:11px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${track.artistName}</div>
          </div>
        `;
        el.onclick = () => this.playWebTrack(index);
        resultsDiv.appendChild(el);
      });
    } catch (err) {
      resultsDiv.innerHTML = '<div style="text-align:center; color:var(--red); font-size:12px; padding:20px 0;">Ошибка сети</div>';
    }
  },

  playWebTrack(index) {
    if (index < 0 || index >= this.currentTracks.length) return;
    this.currentTrackIndex = index;
    const track = this.currentTracks[index];
    document.getElementById('webCover').src = track.artworkUrl100 || track.artworkUrl60;
    document.getElementById('webTitle').textContent = track.trackName;
    document.getElementById('webArtist').textContent = track.artistName;
    this.webAudio.src = track.previewUrl;
    this.webAudio.play();
    if (AudioPlayer.isPlaying) AudioPlayer.toggle();
    this.notify(`Играет: ${track.trackName}`, 'success');
  },

  nextTrack() {
    if (this.currentTracks.length > 0) {
      let nextIndex = this.currentTrackIndex + 1;
      if (nextIndex >= this.currentTracks.length) nextIndex = 0;
      this.playWebTrack(nextIndex);
    }
  },

  prevTrack() {
    if (this.currentTracks.length > 0) {
      let prevIndex = this.currentTrackIndex - 1;
      if (prevIndex < 0) prevIndex = this.currentTracks.length - 1;
      this.playWebTrack(prevIndex);
    }
  },

  toggleWebPlayer() {
    if (!this.webAudio.src) { this.notify('Сначала выберите трек!', 'info'); return; }
    if (this.webAudio.paused) this.webAudio.play(); else this.webAudio.pause();
  },

  initConverter() {
    window.AppConverter = {
      b64encode: (str) => btoa(unescape(encodeURIComponent(str))),
      b64decode: (str) => { try { return decodeURIComponent(escape(atob(str))); } catch(e) { return 'Ошибка: неверный Base64'; } },
      rot13: (str) => str.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)),
      reverse: (str) => str.split('').reverse().join(''),
      upper: (str) => str.toUpperCase(),
      lower: (str) => str.toLowerCase()
    };
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
        this.closeTheme();
        this.closeBlog();
        const mw = document.getElementById('musicWidget'); 
        if(mw) mw.style.display = 'none';
      }
    });
  },

  runConverter(action) {
    const input = document.getElementById('convInput'); const output = document.getElementById('convOutput');
    if (!input || !output) return;
    const val = input.value; const c = window.AppConverter;
    if (action === 'clear') { input.value = ''; output.textContent = '-'; return; }
    if (!val) { output.textContent = 'Введите текст'; return; }
    let res = '';
    switch(action) {
      case 'b64encode': res = c.b64encode(val); break;
      case 'b64decode': res = c.b64decode(val); break;
      case 'rot13': res = c.rot13(val); break;
      case 'reverse': res = c.reverse(val); break;
      case 'upper': res = c.upper(val); break;
      case 'lower': res = c.lower(val); break;
    }
    output.textContent = res;
    this.notify('Готово!', 'success');
  }
};

window.onload = () => App.init();