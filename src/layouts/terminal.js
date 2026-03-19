import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Terminal";

export function render(d, cs, ts, hs) {
  const prompt = `<span style="color:var(--accent);">~</span><span style="color:var(--fg2);"> $ </span>`;
  return `
  <div style="max-width:820px;margin:0 auto;padding:3rem 1.5rem;min-height:100vh;font-family:var(--font-body);">
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:2rem;">
      <div style="background:var(--border);padding:0.5rem 1rem;display:flex;gap:0.5rem;align-items:center;">
        <span style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></span>
        <span style="width:12px;height:12px;border-radius:50%;background:#eab308;"></span>
        <span style="width:12px;height:12px;border-radius:50%;background:#22c55e;"></span>
        <span style="margin-left:auto;color:var(--fg2);font-size:0.75rem;font-family:monospace;">${d.handle}</span>
      </div>
      <div style="padding:1.5rem;font-family:'JetBrains Mono',monospace;font-size:0.9rem;line-height:2;">
        <p style="margin:0;">${prompt}<span style="color:var(--fg);">whoami</span></p>
        <p style="margin:0;color:var(--fg);">${d.name} — ${d.role}</p>
        <p style="margin:0.75rem 0 0;">${prompt}<span style="color:var(--fg);">cat about.txt</span></p>
        <p style="margin:0;color:var(--fg2);">${d.bio}</p>
        <p style="margin:0.75rem 0 0;">${prompt}<span style="color:var(--fg);">cat philosophy.txt</span></p>
        <p style="margin:0;color:var(--fg2);font-style:italic;">${d.take}</p>
        <p style="margin:0.75rem 0 0;">${prompt}<span style="color:var(--fg);">ls tech/</span></p>
        <p style="margin:0;color:var(--accent);">${d.tech.join("  ")}</p>
        <p style="margin:0.75rem 0 0;">${prompt}<span style="color:var(--fg);">history</span></p>
        ${d.timeline.map((t, i) => `<p style="margin:0;color:var(--fg2);"><span style="color:var(--accent);opacity:0.5;margin-right:0.5rem;">${String(i + 1).padStart(3, ' ')}</span>${t.period} — ${t.label}</p>`).join("")}
      </div>
    </div>
    <h2 style="${headingStyle(hs, 'font-size:1.25rem;margin:0 0 1.25rem;color:var(--fg);')}"><span style="color:var(--accent);font-family:monospace;">ls</span> projects/</h2>
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${d.projects.map(p => `
        <div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:1.5rem;${cardCSS(cs)}">
          <h3 style="font-family:'JetBrains Mono',monospace;font-size:1rem;margin:0;color:var(--accent);">./${p.name}</h3>
          <p style="color:var(--fg2);font-size:0.875rem;line-height:1.6;margin:0.5rem 0 1rem;">${p.desc}</p>
          <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
          <div>${projectLinks(p)}</div>
        </div>
      `).join("")}
    </div>
    <footer style="margin-top:2.5rem;padding-top:1rem;border-top:1px solid var(--border);text-align:center;">
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;font-size:0.85rem;font-family:monospace;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
    </footer>
  </div>`;
}
