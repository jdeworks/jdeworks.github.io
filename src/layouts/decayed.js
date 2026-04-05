// Broken Page — glitched webpage with scrambled elements, rendering bugs, z-index chaos
import { projectLinks, githubIcon } from '../helpers.js';

export const name = "Broken Page";

export function render(d, cs, ts, hs) {
  const uid = 'dc' + Math.random().toString(36).slice(2, 6);

  // Generate random "glitch" blocks — displaced content fragments
  function glitchBlock(text, i) {
    const styles = [
      `position:absolute;top:${5+Math.random()*80}%;left:${Math.random()*60}%;transform:rotate(${-8+Math.random()*16}deg);opacity:0.15;font-size:${0.6+Math.random()*0.5}rem;color:var(--accent);font-family:'Courier New',monospace;pointer-events:none;z-index:0;max-width:200px;overflow:hidden;white-space:nowrap;`,
      `position:absolute;top:${Math.random()*90}%;right:${Math.random()*30}%;transform:skewX(${-15+Math.random()*30}deg);opacity:0.08;font-size:${0.5+Math.random()*0.4}rem;color:var(--fg);pointer-events:none;z-index:0;`,
      `position:absolute;top:${Math.random()*85}%;left:${Math.random()*70}%;opacity:0.12;font-size:0.65rem;color:var(--accent);font-family:'Courier New',monospace;pointer-events:none;z-index:0;transform:rotate(${90*Math.round(Math.random()*3)}deg);`,
    ];
    return `<div style="${styles[i % styles.length]}">${text}</div>`;
  }

  const glitchTexts = [
    d.name, d.role, '404', 'undefined', 'null', 'NaN',
    '&lt;/div&gt;', 'segfault', 'ERR_CONNECTION', d.tech[0],
    'overflow:hidden', 'z-index:9999', '???', d.tech[2],
    'margin:auto', '{broken}', d.name, 'function()',
  ];

  return `
  <style>
    .${uid}-root {
      min-height: 100vh; font-family: 'Times New Roman', serif;
      background: var(--bg); color: var(--fg); font-size: 15px;
      position: relative; overflow: hidden;
    }
    .${uid}-root * { font-family: inherit; }
    .${uid}-broken-header {
      background: color-mix(in srgb, var(--accent) 8%, var(--bg));
      border-bottom: 3px solid var(--accent);
      padding: 0.75rem 1rem;
      font-family: 'Courier New', monospace; font-size: 0.7rem; color: var(--fg2);
    }
    .${uid}-unstyled-link {
      color: var(--accent); text-decoration: underline; cursor: pointer;
    }
    .${uid}-broken-img {
      width: 100%; max-width: 300px; height: 180px;
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
      font-family: 'Courier New', monospace; font-size: 0.8rem; color: var(--fg2);
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
    @media (prefers-reduced-motion: reduce) {
      .${uid}-marquee-inner { animation: none; }
      .${uid}-glitch-bar { animation: none !important; }
    }
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
      padding: 0.75rem; font-size: 0.85rem; color: var(--fg2); font-style: italic;
    }
    .${uid}-construction {
      text-align: center; padding: 1rem; font-size: 0.8rem; color: var(--accent);
      border: 2px dashed var(--accent); margin: 1rem 0;
    }
    /* Glitch artifacts */
    .${uid}-glitch-bar {
      position: absolute; left: 0; right: 0; height: 2px; pointer-events: none; z-index: 20;
      background: var(--accent); opacity: 0.15;
      animation: ${uid}-glitch-scan 8s linear infinite;
    }
    @keyframes ${uid}-glitch-scan {
      0% { transform: translateY(0); opacity: 0; }
      2% { opacity: 0.2; }
      4% { opacity: 0; }
      48% { opacity: 0; }
      50% { opacity: 0.15; transform: translateY(80vh); }
      52% { opacity: 0; }
      100% { opacity: 0; transform: translateY(100vh); }
    }
    .${uid}-displaced {
      position: relative;
    }
    .${uid}-displaced::before {
      content: attr(data-glitch); position: absolute; left: 2px; top: 1px;
      color: var(--accent); opacity: 0.12; pointer-events: none;
      clip-path: inset(10% 0 80% 0);
    }
    .${uid}-displaced::after {
      content: attr(data-glitch); position: absolute; left: -2px; top: -1px;
      color: var(--accent2); opacity: 0.08; pointer-events: none;
      clip-path: inset(60% 0 10% 0);
    }
    .${uid}-scrambled {
      display: inline-block; position: relative;
      background: linear-gradient(90deg, var(--fg) 0%, var(--fg) 70%, var(--accent) 70%, var(--accent) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .${uid}-overlap {
      position: relative; z-index: 1;
    }
    .${uid}-overlap-ghost {
      position: absolute; top: 0; left: 0; right: 0;
      opacity: 0.06; transform: translate(8px, -4px);
      pointer-events: none; z-index: 0;
      color: var(--accent);
    }
    .${uid}-zfight {
      position: relative;
      box-shadow: -3px 0 0 var(--accent), 3px 0 0 var(--accent2);
      opacity: 0.08; position: absolute; pointer-events: none;
    }
  </style>

  <div class="${uid}-root" style="max-width:800px;margin:0 auto;">
    <!-- Glitch scan line -->
    <div class="${uid}-glitch-bar" style="top:0;animation-delay:0s;"></div>
    <div class="${uid}-glitch-bar" style="top:0;animation-delay:-4s;height:3px;"></div>

    <!-- Random displaced text fragments floating in background -->
    ${glitchTexts.map((t, i) => glitchBlock(t, i)).join('')}

    <!-- Broken navigation bar -->
    <div class="${uid}-broken-header" style="position:relative;z-index:1;">
      <span class="${uid}-tag-visible">&lt;!-- navbar.css failed to load --&gt;</span>
      <div style="margin-top:0.5rem;">
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[Home]</a>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[About]</a>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[Projects]</a>
        <a href="${d.github}" target="_blank" rel="noopener" class="${uid}-unstyled-link">[Contact]</a>
        <span style="opacity:0.4;"> | Visitor #</span><span class="${uid}-hit-counter">${String(Math.floor(Math.random() * 90000) + 10000)}</span>
      </div>
    </div>

    <div style="padding:1rem;position:relative;z-index:1;">
      <!-- "Broken" marquee -->
      <div class="${uid}-marquee">
        <span class="${uid}-marquee-inner">
          ★★★ Welcome to ${d.name}'s homepage! ★★★ ${d.role} ★★★ Last updated: a long time ago ★★★ Best viewed in Netscape Navigator ★★★ <span style="color:var(--fg2);font-weight:400;">[ERROR: marquee overflow]</span> ★★★
        </span>
      </div>

      <span class="${uid}-tag-visible">&lt;h1&gt;</span>
      <div class="${uid}-overlap">
        <h1 class="${uid}-displaced" data-glitch="Welcome to ${d.name}'s Homepage" style="font-size:clamp(1.5rem,5vw,2rem);margin:0.5rem 0;color:var(--fg);font-family:'Times New Roman',serif;">
          Welcome to ${d.name}'s <span class="${uid}-scrambled">Personal</span> Homepage!!!
        </h1>
        <div class="${uid}-overlap-ghost" aria-hidden="true" style="font-size:clamp(1.5rem,5vw,2rem);font-family:'Times New Roman',serif;">Welcome to ${d.name}'s Personal Homepage!!!</div>
      </div>
      <span class="${uid}-tag-visible">&lt;/h1&gt;</span>

      <!-- Broken image -->
      <div style="margin:1rem 0;position:relative;">
        <div class="${uid}-broken-img">
          <span>&#128444; [image not found: banner.gif]</span>
        </div>
        <div style="position:absolute;top:10px;right:-20px;width:80px;height:60px;border:1px dashed var(--accent);opacity:0.1;background:repeating-linear-gradient(45deg,transparent,transparent 5px,var(--accent) 5px,var(--accent) 6px);"></div>
      </div>

      <!-- Console dump that shouldn't be visible -->
      <div class="${uid}-error">
        <strong>&#9888; Warning:</strong> style.css returned 404. Some elements may appear unstyled.<br>
        <span style="opacity:0.6;">Failed to load resource: the server responded with a status of 404 (Not Found)</span><br>
        <span style="opacity:0.4;">Uncaught TypeError: Cannot read properties of null (reading 'classList')</span><br>
        <span style="opacity:0.3;">    at renderPage (app.js:${Math.floor(Math.random()*500)+100}:${Math.floor(Math.random()*40)+1})</span>
      </div>

      <hr class="${uid}-hr">

      <span class="${uid}-tag-visible">&lt;div class="about"&gt;</span>
      <p style="margin:0.5rem 0;line-height:1.8;color:var(--fg);">${d.bio}</p>
      <span class="${uid}-tag-visible">&lt;/div&gt;</span>
      <span class="${uid}-tag-visible" style="opacity:0.3;">&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;</span>

      <p style="margin:1rem 0;line-height:1.8;color:var(--fg);font-style:italic;">"${d.take}"</p>

      <!-- Duplicated section — "rendering bug" -->
      <div style="opacity:0.06;transform:translateY(-20px);pointer-events:none;position:relative;z-index:0;height:0;overflow:visible;">
        <p style="margin:0;line-height:1.8;color:var(--accent);">"${d.take}"</p>
      </div>

      <hr class="${uid}-hr">

      <h2 style="font-size:1.25rem;margin:1rem 0;color:var(--fg);">My Projects <span class="${uid}-blink" style="color:var(--accent);">NEW!</span></h2>

      <!-- Table with a "misaligned" duplicate row -->
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
      <table class="${uid}-table">
        <tr>
          <th>Project</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
        ${d.projects.map((p, i) => `
          <tr style="${i === 2 ? 'position:relative;' : ''}">
            <td style="color:var(--fg);font-weight:700;">${p.name}</td>
            <td style="color:var(--fg2);">${p.desc}</td>
            <td>${p.soon
              ? `<span style="color:var(--fg2);font-style:italic;">coming soon</span>`
              : (p.links || []).map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="${uid}-unstyled-link"${l.tip ? ` title="${l.tip}"` : ''}>${l.label.toLowerCase()}</a>`).join(' | ')
            }</td>
          </tr>
          ${i === 1 ? `<tr style="opacity:0.04;transform:translateX(5px);pointer-events:none;"><td>${p.name}</td><td>${p.desc}</td><td>source</td></tr>` : ''}
        `).join('')}
      </table>
      </div>

      <div class="${uid}-construction">
        &#128679; THIS SECTION IS UNDER CONSTRUCTION &#128679;<br>
        <span style="font-size:0.7rem;opacity:0.6;">check back soon for more content!</span>
      </div>

      <!-- "Accidentally rendered" debug info -->
      <div class="${uid}-error" style="opacity:0.5;font-size:0.7rem;">
        <span style="opacity:0.7;">DEBUG: d.projects.length = ${d.projects.length} | d.tech = [${d.tech.slice(0,3).join(',')},...] | render_time = ${Math.floor(Math.random()*900)+100}ms</span><br>
        <span style="opacity:0.5;">Stack: main.js → layout.render() → innerHTML → <span class="${uid}-blink" style="color:var(--accent);">LOOP DETECTED</span></span>
      </div>

      <hr class="${uid}-hr">

      <h2 style="font-size:1.1rem;margin:1rem 0 0.5rem;color:var(--fg);">Technologies I Know:</h2>
      <ul style="margin:0;padding-left:2rem;color:var(--fg2);line-height:2;">
        ${d.tech.map((t, i) => `<li${i === 4 ? ' style="text-decoration:line-through;opacity:0.4;"' : ''}>${t}${i === 3 ? ' <span style="font-size:0.7rem;color:var(--accent);font-family:monospace;">[duplicate key warning]</span>' : ''}</li>`).join('')}
      </ul>

      <hr class="${uid}-hr">

      <span class="${uid}-tag-visible">&lt;!-- TODO: style this properly --&gt;</span>
      <span class="${uid}-tag-visible" style="opacity:0.3;margin-left:0.5rem;">&lt;!-- TODO: fix z-index --&gt;</span>
      <span class="${uid}-tag-visible" style="opacity:0.2;margin-left:0.5rem;">&lt;!-- FIXME --&gt;</span>
      <h2 style="font-size:1.1rem;margin:1rem 0 0.5rem;color:var(--fg);">My Journey</h2>
      <dl style="margin:0;color:var(--fg2);">
        ${d.timeline.map(t => `
          <dt style="font-weight:700;color:var(--accent);margin-top:0.5rem;">${t.period}</dt>
          <dd style="margin:0 0 0 1.5rem;">${t.label}</dd>
        `).join('')}
      </dl>

      <hr class="${uid}-hr">

      <h2 style="font-size:1.1rem;margin:1rem 0 0.5rem;color:var(--fg);">Guestbook <span style="font-size:0.75rem;color:var(--fg2);">(1 entry)</span></h2>
      <div class="${uid}-guestbook">
        <p style="margin:0;">"${d.interests}"</p>
        <p style="margin:0.25rem 0 0;font-size:0.75rem;opacity:0.6;">— ${d.name}, webmaster</p>
      </div>

      <hr class="${uid}-hr">

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
