const Views = {
  bio: () => `
    <div class="gh-profile scroll-reveal" style="margin-bottom: 40px;">
      <div class="gh-banner" style="background-image: url('banner.gif'); height: 240px; background-size: cover; background-position: center; position: relative;">
         <div style="position:absolute; bottom:10px; right:20px; font-family:var(--font-mono); font-size:12px; color:#fff; background:rgba(0,0,0,0.5); padding:4px 10px; border-radius:6px;">${DATA.bio.status}</div>
      </div>
      <div style="padding: 0 30px; margin-top: -70px; position: relative; z-index: 2; display:flex; align-items:flex-end; gap:20px;">
        <img src="avatar.png" class="gh-avatar" style="width:150px; height:150px; border-radius:50%; border:4px solid var(--bg); background:var(--bg); object-fit:cover; box-shadow:0 10px 30px rgba(0,0,0,0.6);" onerror="this.onerror=null; this.src='https://github.com/identicons/skywalker.png';">
        <div style="margin-bottom: 20px; display:flex; gap:10px;">
           <a href="${CONFIG.projectUrl}" target="_blank" class="sb-btn" style="background:var(--blue); color:#fff; border:none; padding: 10px 24px; font-weight:bold; border-radius:8px; text-decoration:none;">View Project</a>
           <a href="https://github.com/${CONFIG.githubUser}" target="_blank" class="sb-btn" style="background:rgba(255,255,255,0.1); color:#fff; border:none; padding: 10px 24px; font-weight:bold; border-radius:8px; text-decoration:none;">Follow GitHub</a>
        </div>
      </div>
      <div style="padding: 20px 30px 40px;">
        <div class="hero-name" style="font-size: 42px; font-weight: 800; display: flex; align-items: center; gap: 12px; letter-spacing:-1px;">
          ${DATA.bio.name}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-top:4px;">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="var(--blue)"/>
            <path d="M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#fff"/>
          </svg>
        </div>
        <div style="color:var(--text-dim); font-family:var(--font-mono); font-size:16px; margin-top:4px;">${DATA.bio.title} · ${DATA.bio.location}</div>
        <div style="margin: 30px 0 30px; max-width:800px;">
          <p style="font-size: 18px; line-height: 1.8; color: #e2e2e8; font-weight: 300; letter-spacing: 0.2px;">
            Привет! Я <strong style="font-weight: 600; color: #fff;">${DATA.bio.name}</strong>. ${DATA.bio.shortBio}
          </p>
          <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
            ${DATA.bio.tags.map(t => `<span style="background: rgba(86,156,214,0.1); border: 1px solid rgba(86,156,214,0.3); color: var(--blue); padding: 6px 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 13px;">${t}</span>`).join('')}
          </div>
        </div>
        <div style="position: relative; padding-left: 20px; border-left: 2px solid var(--blue); font-style: italic; color: var(--text-dim); font-size: 16px; line-height: 1.8;">
          "${DATA.bio.philosophy}"
        </div>
      </div>
    </div>
    <div class="content-section scroll-reveal">
      <div class="section-header">Опыт работы</div>
      <div style="display:flex; flex-direction:column; gap:15px;">
        ${DATA.experience.map(exp => `
          <div class="card" style="position:relative; overflow:hidden;">
            <div style="position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--blue);"></div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; margin-left:10px;">
              <div>
                <div style="font-weight:bold; font-size:18px; color:var(--text);">${exp.role}</div>
                <div style="color:var(--text-dim); font-size:14px; margin-top:4px;">${exp.company}</div>
              </div>
              <div style="font-family:var(--font-mono); font-size:12px; color:var(--blue); background:rgba(86,156,214,0.1); padding:4px 12px; border-radius:6px; border:1px solid rgba(86,156,214,0.2);">${exp.year}</div>
            </div>
            <div style="color:var(--text-dim); line-height:1.6; font-size:14px; margin-left:10px; margin-bottom:15px;">${exp.desc}</div>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-left:10px;">
              ${exp.skills.map(s => `<span style="background:rgba(255,255,255,0.05); padding:4px 10px; border-radius:4px; font-size:12px; font-family:var(--font-mono); border:1px solid var(--border); color:var(--text);">${s}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,

  project: () => `
    <div class="scroll-reveal content-section">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:30px;">
        <div style="display:flex; align-items:center; gap:20px;">
          <div style="width:64px; height:64px; border-radius:16px; overflow:hidden; box-shadow:0 10px 20px rgba(86,156,214,0.3); border: 2px solid var(--border); background: var(--bg);">
             <img src="avatar.png" alt="Logo" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null; this.src='https://github.com/identicons/skywalker.png';">
          </div>
          <div>
            <div style="font-size:32px; font-weight:800; color:var(--text); letter-spacing:-0.5px;">${DATA.project.title}</div>
            <div style="color:var(--text-dim); font-family:var(--font-mono); font-size:15px; margin-top:4px;">${DATA.project.subtitle}</div>
          </div>
        </div>
        <div style="text-align:right;">
           <div style="font-family:var(--font-mono); font-size:12px; color:var(--green); background:rgba(106,153,85,0.1); padding:6px 12px; border-radius:8px; border:1px solid rgba(106,153,85,0.3); margin-bottom:8px;">${DATA.project.status}</div>
           <div style="font-family:var(--font-mono); font-size:12px; color:var(--text-dim);">${DATA.project.version}</div>
        </div>
      </div>
      <div style="color:var(--text); font-size:16px; line-height:1.8; margin-bottom:40px; max-width:900px;">${DATA.project.desc}</div>
      <div class="grid-3" style="margin-bottom:40px;">
        <div class="card" style="text-align:center;"><div style="font-size:28px; font-weight:800; color:var(--blue);">${DATA.project.stats.downloads}</div><div style="color:var(--text-dim); font-size:13px; font-family:var(--font-mono); margin-top:4px;">DOWNLOADS</div></div>
        <div class="card" style="text-align:center;"><div style="font-size:28px; font-weight:800; color:var(--purple);">${DATA.project.stats.commits}</div><div style="color:var(--text-dim); font-size:13px; font-family:var(--font-mono); margin-top:4px;">COMMITS</div></div>
        <div class="card" style="text-align:center;"><div style="font-size:28px; font-weight:800; color:var(--cyan);">${DATA.project.stats.linesOfCode}</div><div style="color:var(--text-dim); font-size:13px; font-family:var(--font-mono); margin-top:4px;">LINES OF CODE</div></div>
      </div>
      <div class="section-header">Ключевые фичи</div>
      <div class="grid-2" style="margin-bottom:40px;">
        ${DATA.project.features.map(f => `<div class="card" style="display:flex; gap:16px; align-items:flex-start;"><div style="font-size:24px; background:rgba(255,255,255,0.05); padding:12px; border-radius:10px;">${f.icon}</div><div><div style="font-weight:bold; font-size:16px; color:var(--text); margin-bottom:6px;">${f.title}</div><div style="color:var(--text-dim); font-size:14px; line-height:1.5;">${f.desc}</div></div></div>`).join('')}
      </div>
      <div class="section-header">Архитектура приложения</div>
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:40px;">
        ${DATA.project.architecture.map((a, i) => `<div class="card" style="display:flex; align-items:center; gap:20px; border-left:4px solid ${i===0?'var(--blue)':i===1?'var(--purple)':i===2?'var(--cyan)':'var(--orange)'};"><div style="font-family:var(--font-mono); font-size:24px; color:var(--text-dim); font-weight:800;">0${i+1}</div><div style="flex:1;"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><div style="font-weight:bold; font-size:16px;">${a.name}</div><div style="font-family:var(--font-mono); font-size:12px; color:var(--blue); background:rgba(86,156,214,0.1); padding:2px 10px; border-radius:6px;">${a.tech}</div></div><div style="color:var(--text-dim); font-size:14px; line-height:1.5;">${a.desc}</div></div></div>`).join('')}
      </div>
      <div class="grid-2">
        <div>
          <div class="section-header">Roadmap</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${DATA.project.roadmap.map(r => `<div style="display:flex; align-items:center; gap:12px; padding:12px; background:rgba(255,255,255,0.02); border-radius:8px; border:1px solid var(--border);"><div style="width:8px; height:8px; border-radius:50%; background:${r.status==='Done'?'var(--green)':r.status==='Current'?'var(--blue)':'var(--text-dim)'};"></div><div style="font-family:var(--font-mono); font-size:14px; font-weight:bold; width:40px; color:var(--text);">${r.version}</div><div style="flex:1; color:var(--text-dim); font-size:13px;">${r.desc}</div><div style="font-size:11px; font-family:var(--font-mono); color:${r.status==='Done'?'var(--green)':r.status==='Current'?'var(--blue)':'var(--text-dim)'};">${r.status}</div></div>`).join('')}
          </div>
        </div>
        <div>
          <div class="section-header">System Requirements</div>
          <div class="card" style="display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:10px;"><span style="color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">OS</span><span style="font-family:var(--font-mono); font-size:13px;">${DATA.project.requirements.os}</span></div>
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:10px;"><span style="color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">CPU</span><span style="font-family:var(--font-mono); font-size:13px;">${DATA.project.requirements.cpu}</span></div>
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:10px;"><span style="color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">RAM</span><span style="font-family:var(--font-mono); font-size:13px;">${DATA.project.requirements.ram}</span></div>
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:10px;"><span style="color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">DISK</span><span style="font-family:var(--font-mono); font-size:13px;">${DATA.project.requirements.disk}</span></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">RUNTIME</span><span style="font-family:var(--font-mono); font-size:13px;">${DATA.project.requirements.net}</span></div>
          </div>
        </div>
      </div>
    </div>
  `,

  skills: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Языки программирования</div>
      <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:40px;">
        ${DATA.skills.languages.map(l => `
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span style="font-family:var(--font-mono); font-size:14px;">${l.name}</span>
              <span style="font-family:var(--font-mono); font-size:13px; color:var(--text-dim);">${l.level}%</span>
            </div>
            <div style="height:8px; background:rgba(255,255,255,0.05); border-radius:4px; overflow:hidden;">
              <div style="height:100%; width:${l.level}%; background:${l.color}; border-radius:4px; transition:width 1s ease;"></div>
            </div>
          </div>`).join('')}
      </div>
      <div class="grid-2">
        <div>
          <div class="section-header">Frameworks</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:30px;">
            ${DATA.skills.frameworks.map(f => `<span class="card" style="padding:8px 16px; font-family:var(--font-mono); font-size:13px;">${f}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="section-header">Tools</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:30px;">
            ${DATA.skills.tools.map(t => `<span class="card" style="padding:8px 16px; font-family:var(--font-mono); font-size:13px;">${t}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="section-header">Concepts</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${DATA.skills.concepts.map(c => `<span class="card" style="padding:8px 16px; font-family:var(--font-mono); font-size:13px; border-color:rgba(86,156,214,0.3); color:var(--blue);">${c}</span>`).join('')}
      </div>
    </div>
  `,

  timeline: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Timeline</div>
      <div style="position:relative; padding-left:30px;">
        <div style="position:absolute; left:8px; top:0; bottom:0; width:2px; background:var(--border);"></div>
        ${DATA.timeline.map(t => `
          <div style="position:relative; margin-bottom:30px;">
            <div style="position:absolute; left:-26px; top:4px; width:12px; height:12px; border-radius:50%; background:var(--blue); box-shadow:0 0 10px var(--blue);"></div>
            <div style="font-family:var(--font-mono); font-size:13px; color:var(--blue); margin-bottom:4px;">${t.year}</div>
            <div style="font-weight:bold; font-size:17px; margin-bottom:6px;">${t.title}</div>
            <div style="color:var(--text-dim); font-size:14px; line-height:1.6;">${t.desc}</div>
          </div>`).join('')}
      </div>
    </div>
  `,

  setup: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Установка</div>
      <div class="card" style="margin-bottom:30px;">
        <ol style="margin-left:20px; color:var(--text-dim); line-height:2; font-size:15px;">
          ${DATA.setup.install.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>
      <div class="section-header">Сборка из исходников</div>
      <div class="card" style="margin-bottom:30px; font-family:var(--font-mono); font-size:14px; line-height:2; background:rgba(0,0,0,0.3);">
        ${DATA.setup.buildFromSource.map(s => `<div><span style="color:var(--green);">$</span> ${s}</div>`).join('')}
      </div>
      <div class="section-header">Отчёты</div>
      <div class="card" style="color:var(--text-dim); font-size:15px; line-height:1.7;">${DATA.setup.reports}</div>
    </div>
  `,

  contacts: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Contacts</div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${DATA.contacts.map(c => `
          <a href="${c.url}" target="_blank" class="card" style="display:flex; align-items:center; gap:16px; text-decoration:none;">
            <div style="font-size:28px; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:rgba(86,156,214,0.1); border-radius:12px; border:1px solid rgba(86,156,214,0.3);">${c.icon}</div>
            <div>
              <div style="font-weight:bold; font-size:16px; color:var(--text);">${c.label}</div>
              <div style="color:var(--text-dim); font-family:var(--font-mono); font-size:14px; margin-top:2px;">${c.value}</div>
            </div>
          </a>`).join('')}
      </div>
    </div>
  `,

  gallery: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">${DATA.gallery.title}</div>
      <div style="color:var(--text-dim); margin-bottom:20px; font-family:var(--font-mono);">${DATA.gallery.subtitle}</div>
      <div class="grid-2">
        ${DATA.gallery.items.map(it => `
          <div class="card" style="border-left:4px solid ${it.color}; cursor:pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div style="font-weight:bold; font-size:16px;">${it.title}</div>
              <span style="font-family:var(--font-mono); font-size:11px; color:${it.color}; background:${it.color}22; padding:3px 10px; border-radius:6px;">${it.type}</span>
            </div>
            <div style="color:var(--text-dim); font-size:14px; line-height:1.5;">${it.desc}</div>
          </div>`).join('')}
      </div>
    </div>
  `,

  blog: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Blog & Notes</div>
      <div style="color: var(--text-dim); margin-bottom: 20px; font-family: var(--font-mono); font-size: 14px;">Нажми на любую статью, чтобы прочитать рассуждения.</div>
      <div style="display:flex; flex-direction:column; gap:15px;">
        ${DATA.blog.posts.map((p, index) => `
          <div class="card" onclick="App.openBlog(${index})" style="cursor: pointer; transition: 0.2s; border-left: 4px solid transparent; position: relative; overflow: hidden; padding-left: 20px;">
            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--border); transition: 0.2s;" class="blog-line"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <div style="font-weight:bold; font-size:17px; color:var(--text);">${p.title}</div>
              <span style="font-family:var(--font-mono); font-size:11px; color:var(--blue); background:rgba(86,156,214,0.1); padding:2px 8px; border-radius:4px;">${p.tag}</span>
            </div>
            <div style="color:var(--text-dim); font-size:13px; font-family:var(--font-mono); margin-bottom:6px;">${p.date}</div>
            <div style="color:var(--text-dim); font-size:14px; line-height:1.6;">${p.excerpt}</div>
          </div>`).join('')}
      </div>
    </div>
  `,

  stats: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Live Stats</div>
      <div class="grid-3">
        ${DATA.stats.counters.map(c => `
          <div class="card" style="text-align:center;">
            <div style="font-size:32px; font-weight:800; color:${c.color};">${c.value}</div>
            <div style="color:var(--text-dim); font-size:12px; font-family:var(--font-mono); margin-top:6px;">${c.label}</div>
          </div>`).join('')}
      </div>
      <div class="card" style="margin-top:20px; display:flex; justify-content:space-between;">
        <span style="color:var(--text-dim); font-family:var(--font-mono);">Uptime: <b style="color:var(--green)">${DATA.stats.uptime}</b></span>
        <span style="color:var(--text-dim); font-family:var(--font-mono);">Last update: ${DATA.stats.lastUpdate}</span>
      </div>
    </div>
  `,

  changelog: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Changelog</div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${DATA.changelog.map(c => `
          <div class="card" style="border-left:4px solid var(--blue);">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <b style="font-family:var(--font-mono); color:var(--blue);">${c.version}</b>
              <span style="color:var(--text-dim); font-family:var(--font-mono); font-size:12px;">${c.date}</span>
            </div>
            <ul style="margin-left:18px; color:var(--text-dim); font-size:14px; line-height:1.7;">
              ${c.changes.map(ch => `<li>${ch}</li>`).join('')}
            </ul>
          </div>`).join('')}
      </div>
    </div>
  `,

  converter: () => `
    <div class="scroll-reveal content-section">
      <div class="section-header">Text Converter</div>
      <div class="card" style="margin-bottom:20px;">
        <textarea id="convInput" placeholder="Введите текст..." style="width:100%; min-height:120px; background:rgba(0,0,0,0.3); border:1px solid var(--border); border-radius:8px; padding:14px; color:var(--text); font-family:var(--font-mono); font-size:14px; outline:none; resize:vertical;"></textarea>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:14px;">
          <button class="sb-btn" onclick="App.runConverter('b64encode')" style="background:var(--blue); color:#fff; border:none;">Base64 Encode</button>
          <button class="sb-btn" onclick="App.runConverter('b64decode')" style="background:var(--purple); color:#fff; border:none;">Base64 Decode</button>
          <button class="sb-btn" onclick="App.runConverter('rot13')">ROT13</button>
          <button class="sb-btn" onclick="App.runConverter('reverse')">Reverse</button>
          <button class="sb-btn" onclick="App.runConverter('upper')">UPPER</button>
          <button class="sb-btn" onclick="App.runConverter('lower')">lower</button>
          <button class="sb-btn" onclick="App.runConverter('clear')" style="border-color:var(--red); color:var(--red);">Clear</button>
        </div>
      </div>
      <div class="section-header">Результат</div>
      <div class="card" style="font-family:var(--font-mono); font-size:14px; min-height:80px; word-break:break-all; color:var(--text-dim);" id="convOutput">-</div>
    </div>
  `
};