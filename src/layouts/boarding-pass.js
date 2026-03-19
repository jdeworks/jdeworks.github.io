// Boarding Pass — airline ticket style, departure/arrival, stamps
import { headingStyle, tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Boarding Pass";

export function render(d, cs, ts, hs) {
  const uid = 'bp2' + Math.random().toString(36).slice(2, 6);
  const first = d.timeline[0];
  const last = d.timeline[d.timeline.length - 1];
  return `
  <style>
    .${uid}-root { min-height: 100vh; background: var(--bg); font-family: var(--font-body); padding: 1.5rem; }
    .${uid}-ticket {
      max-width: 700px; margin: 0 auto 1.5rem; background: var(--card);
      border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
      position: relative;
    }
    .${uid}-ticket::before, .${uid}-ticket::after {
      content: ''; position: absolute; width: 24px; height: 24px;
      background: var(--bg); border-radius: 50%; top: 50%; transform: translateY(-50%);
    }
    .${uid}-ticket::before { left: -12px; }
    .${uid}-ticket::after { right: -12px; }
    .${uid}-top { padding: 1.5rem 2rem; border-bottom: 2px dashed var(--border); }
    .${uid}-bottom { padding: 1.5rem 2rem; }
    .${uid}-route {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; flex-wrap: wrap;
    }
    .${uid}-city { text-align: center; }
    .${uid}-code { font-family: var(--font-head); font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 700; color: var(--fg); }
    .${uid}-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg2); margin-top: 0.25rem; }
    .${uid}-line {
      flex: 1; min-width: 40px; height: 1px; position: relative;
      background: var(--border);
    }
    .${uid}-line::before {
      content: '✈'; position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%); font-size: 1.2rem; color: var(--accent);
      background: var(--card); padding: 0 0.5rem;
    }
    .${uid}-info { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 1.25rem; }
    .${uid}-field {}
    .${uid}-field-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg2); margin: 0 0 0.2rem; }
    .${uid}-field-value { font-size: 0.9rem; color: var(--fg); font-weight: 600; font-family: var(--font-head); }
    .${uid}-stamp {
      display: inline-block; padding: 0.3rem 0.75rem; font-size: 0.7rem;
      border: 2px solid var(--accent); color: var(--accent);
      border-radius: 4px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; transform: rotate(-3deg); margin: 0.2rem;
      font-family: var(--font-head);
    }
    .${uid}-barcode {
      display: flex; gap: 1px; align-items: flex-end; height: 40px;
      margin-top: 1rem; justify-content: center;
    }
    .${uid}-bar { width: 2px; background: var(--fg); opacity: 0.3; }
  </style>

  <div class="${uid}-root">
    <!-- Main boarding pass -->
    <div class="${uid}-ticket">
      <div class="${uid}-top">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
          <span style="font-family:var(--font-head);font-weight:700;color:var(--accent);font-size:1.1rem;">${d.name}</span>
          <span style="font-size:0.7rem;color:var(--fg2);letter-spacing:0.1em;text-transform:uppercase;">Boarding Pass</span>
        </div>
        <div class="${uid}-route">
          <div class="${uid}-city">
            <div class="${uid}-code">${first.period.slice(0,3).toUpperCase()}</div>
            <div class="${uid}-label">${first.period}</div>
          </div>
          <div class="${uid}-line"></div>
          <div class="${uid}-city">
            <div class="${uid}-code">${last.period.slice(0,3).toUpperCase()}</div>
            <div class="${uid}-label">${last.period}</div>
          </div>
        </div>
        <div class="${uid}-info">
          <div class="${uid}-field"><p class="${uid}-field-label">Passenger</p><p class="${uid}-field-value">${d.name}</p></div>
          <div class="${uid}-field"><p class="${uid}-field-label">Class</p><p class="${uid}-field-value">${d.role}</p></div>
          <div class="${uid}-field"><p class="${uid}-field-label">Stops</p><p class="${uid}-field-value">${d.timeline.length}</p></div>
          <div class="${uid}-field"><p class="${uid}-field-label">Gate</p><p class="${uid}-field-value">JS</p></div>
        </div>
      </div>
      <div class="${uid}-bottom">
        <p style="color:var(--fg2);font-size:0.9rem;line-height:1.7;margin:0;">${d.bio}</p>
        <div class="${uid}-barcode">
          ${Array.from({length: 60}, () => `<div class="${uid}-bar" style="height:${15 + Math.random() * 25}px;"></div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Flight route (timeline) -->
    <div class="${uid}-ticket">
      <div class="${uid}-top">
        <p class="${uid}-field-label" style="margin-bottom:1rem;">Flight Route</p>
        ${d.timeline.map((t, i) => `
          <div style="display:flex;gap:1rem;align-items:baseline;padding:0.5rem 0;${i < d.timeline.length - 1 ? 'border-bottom:1px dashed var(--border);' : ''}">
            <span style="font-family:var(--font-head);font-size:0.8rem;font-weight:700;color:var(--accent);min-width:80px;">${t.period}</span>
            <span style="color:var(--fg2);font-size:0.85rem;">${t.label}</span>
          </div>
        `).join('')}
      </div>
      <div class="${uid}-bottom">
        <p style="color:var(--fg);font-size:0.9rem;line-height:1.7;margin:0;font-style:italic;">"${d.take}"</p>
      </div>
    </div>

    <!-- Baggage (projects) -->
    ${d.projects.map(p => `
      <div class="${uid}-ticket">
        <div class="${uid}-top" style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
          <div>
            <p class="${uid}-field-label">Cargo</p>
            <h3 style="font-family:var(--font-head);font-size:1.1rem;margin:0;color:var(--fg);font-weight:700;">${p.name}</h3>
          </div>
          <div>${projectLinks(p)}</div>
        </div>
        <div class="${uid}-bottom">
          <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 0.75rem;">${p.desc}</p>
          <div>${p.tags.map(t => `<span class="${uid}-stamp">${t}</span>`).join('')}</div>
        </div>
      </div>
    `).join('')}

    <!-- Tech stamps + footer -->
    <div class="${uid}-ticket">
      <div class="${uid}-top">
        <p class="${uid}-field-label" style="margin-bottom:0.75rem;">Customs Stamps</p>
        <div style="display:flex;flex-wrap:wrap;gap:0.25rem;">
          ${d.tech.map(t => `<span class="${uid}-stamp">${t}</span>`).join('')}
        </div>
      </div>
      <div class="${uid}-bottom" style="text-align:center;">
        <p style="color:var(--fg2);font-size:0.8rem;margin:0 0 0.75rem;font-style:italic;">${d.interests}</p>
        <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:0.85rem;">${githubIcon(16)} <span style="margin-left:0.35rem;">${d.handle}</span></a>
      </div>
    </div>
  </div>`;
}
