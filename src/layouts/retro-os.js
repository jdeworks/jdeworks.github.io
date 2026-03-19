// Windows 95/98 retro OS — window chrome, grey backgrounds, classic UI
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Retro OS";

export function render(d, cs, ts, hs) {
  const uid = 'ro' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; padding: 1.5rem;
      background: #008080 !important; color: #000 !important;
      font-family: 'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif !important;
      font-size: 13px;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-win {
      background: #c0c0c0; border: 2px solid;
      border-color: #ffffff #808080 #808080 #ffffff;
      box-shadow: 1px 1px 0 #000;
      margin-bottom: 0.75rem;
    }
    .${uid}-title {
      background: linear-gradient(90deg, #000080, #1084d0);
      color: #fff; font-weight: 700; font-size: 12px;
      padding: 3px 4px; display: flex; align-items: center; justify-content: space-between;
      user-select: none;
    }
    .${uid}-title-btns { display: flex; gap: 2px; }
    .${uid}-title-btn {
      width: 16px; height: 14px; background: #c0c0c0;
      border: 1px solid; border-color: #fff #808080 #808080 #fff;
      font-size: 9px; line-height: 12px; text-align: center;
      cursor: default; color: #000; font-family: 'Marlett', sans-serif;
    }
    .${uid}-body { padding: 8px; }
    .${uid}-btn {
      background: #c0c0c0; border: 2px solid;
      border-color: #fff #808080 #808080 #fff;
      padding: 2px 12px; font-size: 12px; cursor: pointer;
      font-family: inherit; color: #000; text-decoration: none;
      display: inline-block; margin: 2px;
    }
    .${uid}-btn:active { border-color: #808080 #fff #fff #808080; }
    .${uid}-inset {
      border: 2px solid; border-color: #808080 #fff #fff #808080;
      background: #fff; padding: 6px;
    }
    .${uid}-status {
      background: #c0c0c0; border: 2px solid;
      border-color: #808080 #fff #fff #808080;
      padding: 2px 6px; font-size: 11px; color: #000;
    }
    .${uid}-taskbar {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
      background: #c0c0c0; border-top: 2px solid #fff;
      padding: 2px 4px; display: flex; align-items: center; gap: 4px;
      height: 28px;
    }
    .${uid}-start {
      background: #c0c0c0; border: 2px solid;
      border-color: #fff #808080 #808080 #fff;
      padding: 1px 6px; font-size: 11px; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; gap: 4px;
    }
    .${uid}-tray { margin-left: auto; font-size: 11px; padding: 0 8px; }
    .${uid}-link { color: #0000ff; text-decoration: underline; cursor: pointer; }
    .${uid}-link:hover { color: #ff0000; }
    .${uid}-tag {
      display: inline-block; font-size: 11px; padding: 1px 6px;
      background: #c0c0c0; border: 1px solid;
      border-color: #fff #808080 #808080 #fff;
      margin: 1px;
    }
  </style>

  <div class="${uid}-root" style="padding-bottom:2.5rem;">
    <!-- Main window -->
    <div class="${uid}-win" style="max-width:800px;margin:0 auto;">
      <div class="${uid}-title">
        <span>📁 ${d.name} - Profile</span>
        <div class="${uid}-title-btns">
          <span class="${uid}-title-btn">_</span>
          <span class="${uid}-title-btn">□</span>
          <span class="${uid}-title-btn">×</span>
        </div>
      </div>
      <div class="${uid}-body">
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">🌐 GitHub</a>
          ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">🎮 ${l.label}</a>`).join('')}
        </div>
        <div class="${uid}-inset" style="margin-bottom:8px;">
          <p style="margin:0 0 4px;font-weight:700;font-size:14px;">${d.role}</p>
          <p style="margin:0;font-size:12px;line-height:1.6;">${d.bio}</p>
        </div>
        <div class="${uid}-inset" style="margin-bottom:8px;">
          <p style="margin:0;font-size:12px;line-height:1.6;font-style:italic;">${d.take}</p>
        </div>
        <p style="margin:0 0 4px;font-size:11px;color:#808080;">Technologies:</p>
        <div style="margin-bottom:8px;">
          ${d.tech.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Project windows -->
    ${d.projects.map((p, i) => `
      <div class="${uid}-win" style="max-width:800px;margin:0 auto;${i > 0 ? '' : ''}">
        <div class="${uid}-title">
          <span>${p.soon ? '🔒' : '📂'} ${p.name}</span>
          <div class="${uid}-title-btns">
            <span class="${uid}-title-btn">_</span>
            <span class="${uid}-title-btn">□</span>
            <span class="${uid}-title-btn">×</span>
          </div>
        </div>
        <div class="${uid}-body">
          <div class="${uid}-inset" style="margin-bottom:6px;">
            <p style="margin:0;font-size:12px;line-height:1.5;">${p.longDesc || p.desc}</p>
          </div>
          <div style="margin-bottom:6px;">
            ${p.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
          </div>
          ${p.soon
            ? `<span style="font-size:11px;color:#808080;">⏳ Coming soon...</span>`
            : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">📁 Open</a>${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-btn" style="text-decoration:none;color:#000;">▶️ Run</a>` : ''}`}
        </div>
      </div>
    `).join('')}

    <!-- About window -->
    <div class="${uid}-win" style="max-width:800px;margin:0 auto;">
      <div class="${uid}-title">
        <span>ℹ️ About ${d.name}</span>
        <div class="${uid}-title-btns">
          <span class="${uid}-title-btn">×</span>
        </div>
      </div>
      <div class="${uid}-body" style="text-align:center;">
        <p style="font-size:14px;font-weight:700;margin:8px 0 4px;">${d.name}</p>
        <p style="font-size:11px;margin:0 0 8px;color:#808080;">Version 1.0 · ${d.role}</p>
        <div class="${uid}-inset" style="text-align:left;margin-bottom:8px;">
          <p style="font-size:12px;margin:0 0 8px;line-height:1.5;">${d.about}</p>
          <p style="font-size:12px;margin:0;line-height:1.5;font-style:italic;">${d.interests}</p>
        </div>
        <p style="font-size:10px;color:#808080;margin:4px 0 0;">© jdeworks. All rights reserved.</p>
      </div>
    </div>

    <!-- Taskbar -->
    <div class="${uid}-taskbar">
      <div class="${uid}-start">
        <span style="font-size:14px;">🪟</span> Start
      </div>
      <span class="${uid}-status">📁 ${d.name} - Profile</span>
      <span class="${uid}-tray">${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
    </div>
  </div>`;
}
