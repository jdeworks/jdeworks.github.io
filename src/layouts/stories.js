// Stories — full-screen sections you scroll through, Instagram-stories inspired
// Each section fills the viewport with distinct background colors
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Stories";

export function render(d, cs, ts, hs) {
  const uid = 'st' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-section {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; padding: clamp(2rem,8vw,4rem) clamp(1.5rem,6vw,3rem);
      position: relative;
    }
    .${uid}-s1 { background: var(--bg); }
    .${uid}-s2 { background: var(--bg2); }
    .${uid}-s3 { background: linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%); }
    .${uid}-s4 { background: var(--bg); }
    .${uid}-s5 {
      background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, var(--bg)) 0%, var(--bg) 100%);
    }
    .${uid}-dots {
      position: fixed; top: 1rem; left: 50%; transform: translateX(-50%);
      display: flex; gap: 4px; z-index: 10; padding: 0.5rem;
      background: color-mix(in srgb, var(--bg) 80%, transparent);
      backdrop-filter: blur(8px); border-radius: 9999px;
    }
    .${uid}-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: color-mix(in srgb, var(--fg) 25%, transparent);
      transition: background 0.3s, width 0.3s;
    }
    .${uid}-dot.active {
      background: var(--accent); width: 18px; border-radius: 3px;
    }
    .${uid}-scroll-hint {
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      animation: ${uid}-bounce 2s ease infinite;
      color: var(--fg2); opacity: 0.5;
    }
    @keyframes ${uid}-bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(8px); }
    }
    @media (prefers-reduced-motion: reduce) { .${uid}-scroll-hint { animation: none; } }
    .${uid}-card {
      background: var(--card); border-radius: 16px; padding: 1.25rem;
      ${cardCSS(cs)} margin-bottom: 1rem;
    }
  </style>

  <div id="${uid}-root">
    <!-- Progress dots -->
    <div class="${uid}-dots" id="${uid}-dots">
      <div class="${uid}-dot active" data-section="0"></div>
      <div class="${uid}-dot" data-section="1"></div>
      <div class="${uid}-dot" data-section="2"></div>
      <div class="${uid}-dot" data-section="3"></div>
      <div class="${uid}-dot" data-section="4"></div>
    </div>

    <!-- 1: Hero -->
    <section class="${uid}-section ${uid}-s1" data-story="0">
      <div style="max-width:600px;">
        <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.1em;margin:0 0 1rem;font-family:var(--font-head);">${d.role}</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,8vw,4.5rem);margin:0;color:var(--fg);font-weight:700;line-height:1.05;')}">${d.name}</h1>
        <p style="color:var(--fg2);font-size:clamp(1rem,3vw,1.2rem);margin:1.5rem 0 0;line-height:1.7;">${d.bio}</p>
      </div>
      <div class="${uid}-scroll-hint">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>

    <!-- 2: Philosophy + About -->
    <section class="${uid}-section ${uid}-s2" data-story="1">
      <div style="max-width:600px;">
        <blockquote style="margin:0 0 2rem;padding:0 0 0 1.25rem;border-left:4px solid var(--accent);font-family:var(--font-head);font-size:clamp(1.1rem,3vw,1.4rem);color:var(--fg);line-height:1.5;font-style:italic;">${d.take}</blockquote>
        <p style="color:var(--fg2);font-size:0.95rem;line-height:1.75;">${d.about}</p>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:2rem;">
          ${d.tech.map(t => tagHTML(t, ts)).join("")}
        </div>
      </div>
    </section>

    <!-- 3: Projects (top 3) -->
    <section class="${uid}-section ${uid}-s3" data-story="2">
      <div style="max-width:600px;">
        <h2 style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 1.5rem;color:var(--fg);')}">Projects</h2>
        ${d.projects.slice(0, 3).map(p => `
          <div class="${uid}-card">
            <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.4rem;color:var(--fg);font-weight:600;">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
            <div style="margin-bottom:0.5rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
            <div>${projectLinks(p)}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- 4: More projects + coming soon -->
    <section class="${uid}-section ${uid}-s4" data-story="3">
      <div style="max-width:600px;">
        <h2 style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 1.5rem;color:var(--fg);')}">Coming Up</h2>
        ${d.projects.slice(3).map(p => `
          <div class="${uid}-card">
            <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.4rem;color:var(--fg);font-weight:600;">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
            <div>${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
          </div>
        `).join("")}
        <div style="margin-top:2rem;">
          <h3 style="${headingStyle(hs, 'font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--fg2);margin:0 0 1rem;')}">The journey</h3>
          ${d.timeline.map(t => `
            <div style="display:flex;gap:1rem;padding:0.6rem 0;border-bottom:1px solid var(--border);">
              <span style="font-size:0.75rem;font-weight:600;color:var(--accent);min-width:80px;font-family:var(--font-head);">${t.period}</span>
              <span style="color:var(--fg2);font-size:0.8rem;">${t.label}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- 5: Contact / Footer -->
    <section class="${uid}-section ${uid}-s5" data-story="4">
      <div style="max-width:600px;text-align:center;margin:0 auto;">
        <h2 style="${headingStyle(hs, 'font-size:clamp(1.75rem,5vw,2.5rem);margin:0 0 1rem;color:var(--fg);')}">Let's connect</h2>
        <p style="color:var(--fg2);font-size:0.9rem;margin:0 0 2rem;font-style:italic;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--accent);color:var(--bg);text-decoration:none;font-size:0.9rem;font-weight:600;padding:0.75rem 2rem;border-radius:12px;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">${githubIcon(18)} ${d.handle}</a>
        <div style="margin-top:1.5rem;display:flex;justify-content:center;gap:1rem;">
          ${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${l.label}</a>`).join("")}
        </div>
      </div>
    </section>
  </div>

  <story-dots data-uid="${uid}"></story-dots>`;
}
