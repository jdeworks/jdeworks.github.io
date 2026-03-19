// Windows 95/98 retro OS — interactive windows, palette-aware colors
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Retro OS";

export function render(d, cs, ts, hs) {
  const uid = 'ro' + Math.random().toString(36).slice(2, 6);
  // Build window list: profile first, then projects, then about
  const windows = [
    { id: 'profile', icon: '📁', title: `${d.name} - Profile`, content: 'profile' },
    ...d.projects.map((p, i) => ({ id: `proj-${i}`, icon: p.soon ? '🔒' : '📂', title: p.name, content: 'project', data: p })),
    { id: 'about', icon: 'ℹ️', title: `About ${d.name}`, content: 'about' },
  ];

  return `
  <style>
    .${uid}-root {
      min-height: 100vh; padding: 1.5rem 1.5rem 2.5rem;
      background: var(--accent2) !important; color: #000 !important;
      font-family: 'Segoe UI', Tahoma, 'MS Sans Serif', sans-serif !important;
      font-size: 13px;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-win {
      background: #c0c0c0; border: 2px solid;
      border-color: #ffffff #808080 #808080 #ffffff;
      box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
      margin-bottom: 1rem; max-width: 800px; margin-left: auto; margin-right: auto;
      transition: opacity 0.3s, transform 0.3s;
    }
    .${uid}-win.minimized { display: none; }
    .${uid}-win.closing {
      opacity: 0; transform: scale(0.95);
      pointer-events: none;
    }
    .${uid}-title {
      background: linear-gradient(90deg, var(--accent2), var(--accent));
      color: #fff; font-weight: 700; font-size: 12px;
      padding: 3px 6px; display: flex; align-items: center; justify-content: space-between;
      user-select: none;
    }
    .${uid}-title-btns { display: flex; gap: 2px; }
    .${uid}-title-btn {
      width: 16px; height: 14px; background: #c0c0c0;
      border: 1px solid; border-color: #fff #808080 #808080 #fff;
      font-size: 10px; line-height: 13px; text-align: center;
      cursor: pointer; color: #000;
    }
    .${uid}-title-btn:hover { background: #d0d0d0; }
    .${uid}-title-btn:active { border-color: #808080 #fff #fff #808080; background: #b0b0b0; }
    .${uid}-body { padding: 10px; }
    .${uid}-btn {
      background: #c0c0c0; border: 2px solid;
      border-color: #fff #808080 #808080 #fff;
      padding: 3px 14px; font-size: 12px; cursor: pointer;
      font-family: inherit; color: #000; text-decoration: none;
      display: inline-block; margin: 2px;
    }
    .${uid}-btn:active { border-color: #808080 #fff #fff #808080; }
    .${uid}-inset {
      border: 2px solid; border-color: #808080 #fff #fff #808080;
      background: #fff; padding: 8px;
    }
    .${uid}-tag {
      display: inline-block; font-size: 11px; padding: 1px 6px;
      background: #c0c0c0; border: 1px solid;
      border-color: #fff #808080 #808080 #fff;
      margin: 1px;
    }
    .${uid}-taskbar {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
      background: #c0c0c0; border-top: 2px solid #fff;
      padding: 2px 4px; display: flex; align-items: center; gap: 3px;
      height: 30px; overflow-x: auto;
    }
    .${uid}-start {
      background: #c0c0c0; border: 2px solid;
      border-color: #fff #808080 #808080 #fff;
      padding: 1px 8px; font-size: 11px; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; gap: 4px;
      flex-shrink: 0;
    }
    .${uid}-taskbtn {
      background: #c0c0c0; border: 2px solid;
      border-color: #808080 #fff #fff #808080;
      padding: 1px 8px; font-size: 10px; cursor: pointer;
      max-width: 120px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; flex-shrink: 0;
    }
    .${uid}-taskbtn.active {
      border-color: #808080 #fff #fff #808080;
      background: #b0b0b0;
    }
    .${uid}-tray {
      margin-left: auto; font-size: 11px; padding: 0 8px;
      border: 1px solid; border-color: #808080 #fff #fff #808080;
      flex-shrink: 0;
    }
    .${uid}-link { color: #0000ff; text-decoration: underline; cursor: pointer; }
    .${uid}-link:hover { color: #ff0000; }
  </style>

  <div class="${uid}-root" id="${uid}-desktop">
    ${windows.map((w, idx) => `
      <div class="${uid}-win" id="${uid}-${w.id}" data-win="${w.id}" data-title="${w.icon} ${w.title}">
        <div class="${uid}-title">
          <span>${w.icon} ${w.title}</span>
          <div class="${uid}-title-btns">
            <span class="${uid}-title-btn" data-action="minimize" data-target="${w.id}" title="Minimize">_</span>
            <span class="${uid}-title-btn" data-action="close" data-target="${w.id}" title="Close">×</span>
          </div>
        </div>
        <div class="${uid}-body">
          ${w.content === 'profile' ? `
            <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
              <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">🌐 GitHub</a>
              ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">🎮 ${l.label}</a>`).join('')}
            </div>
            <div class="${uid}-inset" style="margin-bottom:10px;">
              <p style="margin:0 0 4px;font-weight:700;font-size:14px;">${d.role}</p>
              <p style="margin:0;font-size:12px;line-height:1.7;">${d.bio}</p>
            </div>
            <div class="${uid}-inset" style="margin-bottom:10px;">
              <p style="margin:0;font-size:12px;line-height:1.7;font-style:italic;">${d.take}</p>
            </div>
            <p style="margin:0 0 4px;font-size:11px;color:#808080;">Technologies:</p>
            <div>${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
          ` : w.content === 'project' ? `
            <div class="${uid}-inset" style="margin-bottom:8px;">
              <p style="margin:0;font-size:12px;line-height:1.6;">${w.data.longDesc || w.data.desc}</p>
            </div>
            <div style="margin-bottom:8px;">
              ${w.data.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
            </div>
            ${w.data.soon
              ? `<span style="font-size:11px;color:#808080;">⏳ Coming soon...</span>`
              : `<a href="${w.data.url}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">📁 Open</a>${w.data.demo ? `<a href="${w.data.demo}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">▶️ Run</a>` : ''}`}
          ` : `
            <div style="text-align:center;">
              <p style="font-size:14px;font-weight:700;margin:8px 0 4px;">${d.name}</p>
              <p style="font-size:11px;margin:0 0 10px;color:#808080;">Version 1.0 · ${d.role}</p>
            </div>
            <div class="${uid}-inset" style="margin-bottom:10px;">
              <p style="font-size:12px;margin:0 0 8px;line-height:1.6;">${d.about}</p>
              <p style="font-size:12px;margin:0;line-height:1.6;font-style:italic;">${d.interests}</p>
            </div>
            <div style="text-align:center;">
              <p style="font-size:10px;color:#808080;margin:4px 0 0;">© jdeworks. All rights reserved.</p>
            </div>
          `}
        </div>
      </div>
    `).join('')}

    <!-- Taskbar -->
    <div class="${uid}-taskbar" id="${uid}-taskbar">
      <div class="${uid}-start" onclick="document.querySelectorAll('.${uid}-win').forEach(w=>{w.classList.remove('minimized','closing');w.style.display=''})">
        <span style="font-size:14px;">🪟</span> Start
      </div>
      ${windows.map(w => `<span class="${uid}-taskbtn active" data-taskbtn="${w.id}">${w.icon} ${w.title}</span>`).join('')}
      <span class="${uid}-tray">${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
    </div>
  </div>

  <script-data data-uid="${uid}"></script-data>`;
}

// Post-render setup is handled by the activateRetroOS hook
