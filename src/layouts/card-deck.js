// Card Deck — stacked cards you can swipe/click through
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Card Deck";

export function render(d, cs, ts, hs) {
  const uid = 'cd' + Math.random().toString(36).slice(2, 6);
  const cards = [
    { type: 'intro', title: d.name, subtitle: d.role, body: d.bio },
    { type: 'quote', body: d.take },
    ...d.projects.map(p => ({ type: 'project', ...p })),
    { type: 'tech', items: d.tech },
    { type: 'about', body: d.about, sub: d.interests },
  ];

  return `
  <style>
    .${uid}-root { min-height: 100vh; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem 1rem; }
    .${uid}-stack {
      position: relative; width: 100%; max-width: 400px; height: 420px;
    }
    .${uid}-card {
      position: absolute; inset: 0; background: var(--card);
      border: 1px solid var(--border); border-radius: 20px;
      padding: 2rem; display: flex; flex-direction: column;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      overflow-y: auto; cursor: pointer;
    }
    .${uid}-card.behind1 { transform: scale(0.95) translateY(12px); opacity: 0.7; z-index: 1; }
    .${uid}-card.behind2 { transform: scale(0.9) translateY(24px); opacity: 0.4; z-index: 0; }
    .${uid}-card.active { z-index: 10; transform: scale(1) translateY(0); opacity: 1; }
    .${uid}-card.dismissed { transform: translateX(120%) rotate(15deg); opacity: 0; z-index: 20; pointer-events: none; }
    .${uid}-counter {
      font-size: 0.7rem; color: var(--fg2); text-align: center;
      margin-top: 1.5rem; font-family: var(--font-head);
    }
    .${uid}-hint {
      font-size: 0.75rem; color: var(--fg2); text-align: center;
      margin-top: 0.75rem; opacity: 0.5;
    }
    .${uid}-tag {
      font-size: 0.75rem; padding: 0.25rem 0.65rem; display: inline-block; margin: 0.15rem;
      background: color-mix(in srgb, var(--accent) 15%, transparent);
      color: var(--accent); border-radius: 9999px;
    }
    .${uid}-nav { display: flex; gap: 0.75rem; margin-top: 1.25rem; justify-content: center; }
    .${uid}-nav-btn {
      width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--border);
      background: var(--card); color: var(--fg2); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; transition: border-color 0.2s, color 0.2s;
    }
    .${uid}-nav-btn:hover { border-color: var(--accent); color: var(--accent); }
  </style>

  <div class="${uid}-root" id="${uid}-root">
    <div class="${uid}-stack" id="${uid}-stack">
      ${cards.map((c, i) => `
        <div class="${uid}-card ${i === 0 ? 'active' : i === 1 ? 'behind1' : i === 2 ? 'behind2' : ''}"
             data-card="${i}" style="${i > 2 ? 'opacity:0;z-index:0;transform:scale(0.85) translateY(36px);' : ''}">
          ${c.type === 'intro' ? `
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
              <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.1em;margin:0 0 0.5rem;font-family:var(--font-head);">${c.subtitle}</p>
              <h2 style="${headingStyle(hs, 'font-size:2rem;margin:0;color:var(--fg);font-weight:700;')}">${c.title}</h2>
              <p style="color:var(--fg2);font-size:0.9rem;margin:1rem 0 0;line-height:1.7;">${c.body}</p>
            </div>
          ` : c.type === 'quote' ? `
            <div style="flex:1;display:flex;align-items:center;">
              <blockquote style="margin:0;padding:0 0 0 1.25rem;border-left:4px solid var(--accent);font-family:var(--font-head);font-size:1.1rem;color:var(--fg);line-height:1.5;font-style:italic;">${c.body}</blockquote>
            </div>
          ` : c.type === 'project' ? `
            <div style="flex:1;display:flex;flex-direction:column;">
              <h3 style="font-family:var(--font-head);font-size:1.2rem;margin:0 0 0.5rem;color:var(--fg);font-weight:600;">${c.name}</h3>
              <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 1rem;flex:1;">${c.longDesc || c.desc}</p>
              <div style="margin-bottom:0.75rem;">${c.tags.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}</div>
              <div>${projectLinks(c)}</div>
            </div>
          ` : c.type === 'tech' ? `
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
              <h3 style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin:0 0 1.5rem;')}">Tech Stack</h3>
              <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
                ${c.items.map(t => `<span class="${uid}-tag">${t}</span>`).join('')}
              </div>
            </div>
          ` : `
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
              <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0 0 1rem;">${c.body}</p>
              <p style="color:var(--fg2);font-size:0.85rem;font-style:italic;margin:0;">${c.sub}</p>
              <div style="margin-top:auto;padding-top:1.5rem;text-align:center;">
                <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:0.85rem;">${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span></a>
              </div>
            </div>
          `}
        </div>
      `).join('')}
    </div>

    <div class="${uid}-nav">
      <button class="${uid}-nav-btn" data-dir="prev" aria-label="Previous card">&#8592;</button>
      <button class="${uid}-nav-btn" data-dir="next" aria-label="Next card">&#8594;</button>
    </div>
    <div class="${uid}-counter"><span id="${uid}-current">1</span> / ${cards.length}</div>
    <div class="${uid}-hint">click card or arrows to navigate</div>
  </div>

  <card-deck data-uid="${uid}" data-count="${cards.length}"></card-deck>`;
}
