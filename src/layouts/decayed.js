// Decayed Webpage — broken HTML, missing CSS, unstyled fragments, 404 vibes
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Decayed Page";

export function render(d, cs, ts, hs) {
  const uid = 'dc' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-root {
      min-height: 100vh; font-family: 'Times New Roman', serif;
      background: var(--bg); color: var(--fg); font-size: 15px;
    }
    .${uid}-root * { font-family: inherit; }
    /* Simulated broken CSS — some styles "loaded", some didn't */
    .${uid}-broken-header {
      background: color-mix(in srgb, var(--accent) 8%, var(--bg));
      border-bottom: 3px solid var(--accent);
      padding: 0.75rem 1rem;
      font-family: 'Courier New', monospace; font-size: 0.7rem; color: var(--fg2);
    }
    .${uid}-unstyled-link {
      color: var(--accent); text-decoration: underline; cursor: pointer;
    }
    .${uid}-unstyled-link:visited { color: color-mix(in srgb, var(--accent) 60%, var(--fg2)); }
    .${uid}-broken-img {
      display: inline-block; width: 100%; max-width: 300px; height: 180px;
      border: 1px solid var(--border); background: var(--bg2);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; color: var(--fg2);
    }
    .${uid}-tag-visible {
      color: color-mix(in srgb, var(--accent) 50%, var(--fg2));
      font-family: 'Courier New', monospace; font-size: 0.75rem;
    }
    .${uid}-error {
      background: color-mix(in srgb, var(--accent) 5%, var(--bg));
      border-left: 4px solid var(--accent);
      padding: 0.75rem 1rem; margin: 1rem 0;
      font-family: 'Courier New', monospace; font-size: 0.8rem;
      color: var(--fg2);
    }
    .${uid}-marquee {
      overflow: hidden; white-space: nowrap; padding: 0.5rem 0;
      border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
      color: var(--accent); font-size: 0.85rem; font-weight: 700;
    }
    .${uid}-marquee-inner {
      display: inline-block; animation: ${uid}-scroll 15s linear infinite;
    }
    @keyframes ${uid}-scroll {
      0% { transform: translateX(100vw); }
      100% { transform: translateX(-100%); }
    }
    @media (prefers-reduced-motion: reduce) { .${uid}-marquee-inner { animation: none; } }
    .${uid}-hit-counter {
      display: inline-block; background: var(--fg); color: var(--bg);
      font-family: 'Courier New', monospace; padding: 2px 6px;
      font-size: 0.8rem; letter-spacing: 0.1em;
    }
    .${uid}-hr { border: none; border-top: 1px solid var(--border); margin: 1.5rem 0; }
    .${uid}-blink { animation: ${uid}-blink 1s step-end infinite; }
    @keyframes ${uid}-blink { 50% { opacity: 0; } }
    .${uid}-table {
      width: 100%; border-collapse: collapse; font-size: 0.85rem;
    }
    .${uid}-table td, .${uid}-table th {
      border: 1px solid var(--border); padding: 0.5rem; text-align: left;
    }
    .${uid}-table th {
      background: color-mix(in srgb, var(--accent) 8%, var(--bg));
      font-weight: 700; color: var(--fg);
    }
    .${uid}-guestbook {
      border: 2px inset var(--border); background: var(--bg2);
      padding: 0.75rem; font-size: 0.85rem; color: var(--fg2);
      font-style: italic;
    }
    .${uid}-construction {
      text-align: center; padding: 1rem;
      font-size: 0.8rem; color: var(--accent);
      border: 2px dashed var(--accent); margin: 1rem 0;
    }
  </style>

  <div class="${uid}-root" style="max-width:800px;margin:0 auto;">
    <!-- Broken navigation bar -->
    <div class="${uid}-broken-header">
      <span class="${uid}-tag-visible">&lt;!-- navbar.css failed to load --&gt;</span>
      <div style="margin-top:0.5rem;">
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[Home]</a>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[About]</a>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[Projects]</a>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[Contact]</a>
        <span style="opacity:0.4;"> | Visitor #</span><span class="${uid}-hit-counter">${String(Math.floor(Math.random() * 90000) + 10000)}</span>
      </div>
    </div>

    <div style="padding:1rem;">
      <!-- "Broken" marquee -->
      <div class="${uid}-marquee">
        <span class="${uid}-marquee-inner">
          ★★★ Welcome to ${d.name}'s homepage! ★★★ ${d.role} ★★★ Last updated: a long time ago ★★★ Best viewed in Netscape Navigator ★★★
        </span>
      </div>

      <span class="${uid}-tag-visible">&lt;h1&gt;</span>
      <h1 style="font-size:clamp(1.5rem,5vw,2rem);margin:0.5rem 0;color:var(--fg);font-family:'Times New Roman',serif;">Welcome to ${d.name}'s Personal Homepage!!!</h1>
      <span class="${uid}-tag-visible">&lt;/h1&gt;</span>

      <!-- Broken image -->
      <div style="margin:1rem 0;">
        <div class="${uid}-broken-img">
          <span>&#128444; [image not found: banner.gif]</span>
        </div>
      </div>

      <hr class="${uid}-hr">

      <!-- About section with visible HTML tags -->
      <span class="${uid}-tag-visible">&lt;div class="about"&gt;</span>
      <p style="margin:0.5rem 0;line-height:1.8;color:var(--fg);">${d.bio}</p>
      <span class="${uid}-tag-visible">&lt;/div&gt;</span>

      <!-- Error box -->
      <div class="${uid}-error">
        <strong>&#9888; Warning:</strong> style.css returned 404. Some elements may appear unstyled.<br>
        <span style="opacity:0.6;">Failed to load resource: the server responded with a status of 404 (Not Found)</span>
      </div>

      <p style="margin:1rem 0;line-height:1.8;color:var(--fg);font-style:italic;">"${d.take}"</p>

      <hr class="${uid}-hr">

      <!-- Projects as a table (very early web) -->
      <h2 style="font-size:1.25rem;margin:1rem 0;color:var(--fg);">My Projects <span class="${uid}-blink" style="color:var(--accent);">NEW!</span></h2>
      <table class="${uid}-table">
        <tr>
          <th>Project</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
        ${d.projects.map(p => `
          <tr>
            <td style="color:var(--fg);font-weight:700;">${p.name}</td>
            <td style="color:var(--fg2);">${p.desc}</td>
            <td>${p.soon
              ? `<span style="color:var(--fg2);font-style:italic;">coming soon</span>`
              : `<a href="${p.url}" target="_blank" rel="noopener" class="${uid}-unstyled-link">source</a>${p.demo ? ` | <a href="${p.demo}" target="_blank" rel="noopener" class="${uid}-unstyled-link">demo</a>` : ''}`
            }</td>
          </tr>
        `).join('')}
      </table>

      <!-- Under construction -->
      <div class="${uid}-construction">
        &#128679; THIS SECTION IS UNDER CONSTRUCTION &#128679;<br>
        <span style="font-size:0.7rem;opacity:0.6;">check back soon for more content!</span>
      </div>

      <hr class="${uid}-hr">

      <!-- Tech as an unordered list (unstyled) -->
      <h2 style="font-size:1.1rem;margin:1rem 0 0.5rem;color:var(--fg);">Technologies I Know:</h2>
      <ul style="margin:0;padding-left:2rem;color:var(--fg2);line-height:2;">
        ${d.tech.map(t => `<li>${t}</li>`).join('')}
      </ul>

      <hr class="${uid}-hr">

      <!-- Timeline as definition list -->
      <span class="${uid}-tag-visible">&lt;!-- TODO: style this properly --&gt;</span>
      <h2 style="font-size:1.1rem;margin:1rem 0 0.5rem;color:var(--fg);">My Journey</h2>
      <dl style="margin:0;color:var(--fg2);">
        ${d.timeline.map(t => `
          <dt style="font-weight:700;color:var(--accent);margin-top:0.5rem;">${t.period}</dt>
          <dd style="margin:0 0 0 1.5rem;">${t.label}</dd>
        `).join('')}
      </dl>

      <hr class="${uid}-hr">

      <!-- Guestbook -->
      <h2 style="font-size:1.1rem;margin:1rem 0 0.5rem;color:var(--fg);">Guestbook <span style="font-size:0.75rem;color:var(--fg2);">(1 entry)</span></h2>
      <div class="${uid}-guestbook">
        <p style="margin:0;">"${d.interests}"</p>
        <p style="margin:0.25rem 0 0;font-size:0.75rem;opacity:0.6;">— ${d.name}, webmaster</p>
      </div>

      <hr class="${uid}-hr">

      <!-- Footer -->
      <div style="text-align:center;padding:1rem 0;font-size:0.75rem;color:var(--fg2);">
        <p style="margin:0;">
          <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">${githubIcon(14)} ${d.handle}</a>
          ${d.links.map(l => ` | <a href="${l.url}" target="_blank" rel="noopener" class="${uid}-unstyled-link">${l.label}</a>`).join('')}
        </p>
        <p style="margin:0.5rem 0 0;opacity:0.4;">
          <span class="${uid}-tag-visible">&lt;!-- ${d.about} --&gt;</span>
        </p>
        <p style="margin:0.75rem 0 0;opacity:0.5;">
          &#169; ${new Date().getFullYear()} ${d.name} · Made with &lt;table&gt; and &lt;marquee&gt;<br>
          Best viewed at 800x600 · <span class="${uid}-hit-counter">${String(Math.floor(Math.random() * 90000) + 10000)}</span> visitors since 1999
        </p>
      </div>
    </div>
  </div>`;
}
