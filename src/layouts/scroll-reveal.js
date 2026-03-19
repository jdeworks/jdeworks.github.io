// Inspired by make-it-look-good: scroll-reveal-landing
// Scroll-driven reveals, parallax, 3D card entrance, gradient hero
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "Scroll Reveal";

export function render(d, cs, ts, hs) {
  const uid = 'sr' + Math.random().toString(36).slice(2, 6);
  return `
  <style>
    .${uid}-reveal {
      opacity: 0; transform: translateY(32px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .${uid}-reveal.visible { opacity: 1; transform: translateY(0); }
    .${uid}-card {
      opacity: 0; transform: translateY(48px) scale(0.92);
      transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
    }
    .${uid}-card.visible { opacity: 1; transform: translateY(0) scale(1); }
  </style>

  <div style="min-height:100vh;overflow:hidden;" id="${uid}-root">
    <!-- Hero with gradient -->
    <section style="min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 1.5rem;text-align:center;position:relative;">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, var(--bg)) 0%, var(--bg) 100%);pointer-events:none;"></div>
      <div style="position:relative;max-width:700px;">
        <p style="color:var(--accent);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 1rem;font-family:var(--font-head);">${d.role}</p>
        <h1 style="${headingStyle(hs, 'font-size:clamp(2.5rem,7vw,4.5rem);margin:0;color:var(--fg);font-weight:700;line-height:1.05;letter-spacing:-0.02em;')}">${d.name}</h1>
        <p style="color:var(--fg2);font-size:clamp(1rem,2vw,1.2rem);margin:1.5rem 0 0;line-height:1.7;">${d.bio}</p>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;margin-top:2rem;">
          ${d.tech.map(t => tagHTML(t, ts)).join("")}
        </div>
      </div>
    </section>

    <!-- About (scroll reveal) -->
    <section style="max-width:800px;margin:0 auto;padding:4rem 1.5rem;">
      <div class="${uid}-reveal" data-reveal>
        <blockquote style="margin:0;padding:0 0 0 1.5rem;border-left:4px solid var(--accent);font-family:var(--font-head);font-size:clamp(1.1rem,2.5vw,1.5rem);color:var(--fg);line-height:1.5;font-style:italic;">${d.take}</blockquote>
      </div>
      <div class="${uid}-reveal" data-reveal style="margin-top:2rem;">
        <p style="color:var(--fg2);font-size:0.95rem;line-height:1.75;">${d.about}</p>
      </div>
    </section>

    <!-- Timeline (scroll reveal staggered) -->
    <section style="max-width:800px;margin:0 auto;padding:2rem 1.5rem 4rem;">
      <h2 class="${uid}-reveal" data-reveal style="${headingStyle(hs, 'font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg2);margin:0 0 2rem;')}">Journey</h2>
      <div style="position:relative;padding-left:2rem;">
        <div style="position:absolute;left:7px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom, var(--accent), var(--accent2), transparent);border-radius:1px;"></div>
        ${d.timeline.map(t => `
          <div class="${uid}-reveal" data-reveal style="margin-bottom:1.5rem;position:relative;">
            <div style="position:absolute;left:-2rem;top:0.35rem;width:16px;height:16px;">
              <div style="width:10px;height:10px;border-radius:50%;background:var(--accent);margin:3px;"></div>
            </div>
            <p style="font-family:var(--font-head);font-size:0.85rem;font-weight:600;color:var(--accent);margin:0;">${t.period}</p>
            <p style="color:var(--fg2);font-size:0.85rem;margin:0.2rem 0 0;line-height:1.5;">${t.label}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Projects (card reveal with stagger) -->
    <section style="max-width:960px;margin:0 auto;padding:2rem 1.5rem 4rem;">
      <h2 class="${uid}-reveal" data-reveal style="${headingStyle(hs, 'font-size:1.5rem;margin:0 0 2rem;color:var(--fg);text-align:center;')}">Projects</h2>
      <div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));">
        ${d.projects.map((p, i) => `
          <div class="${uid}-card" data-reveal style="background:var(--card);border-radius:14px;padding:1.75rem;${cardCSS(cs)};transition-delay:${i * 100}ms;">
            <h3 style="font-family:var(--font-head);font-size:1.05rem;margin:0 0 0.5rem;color:var(--fg);">${p.name}</h3>
            <p style="color:var(--fg2);font-size:0.85rem;line-height:1.6;margin:0 0 1rem;">${p.desc}</p>
            <div style="margin-bottom:0.75rem;">${p.tags.map(t => tagHTML(t, ts)).join("")}</div>
            <div>${projectLinks(p)}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Interests + Footer -->
    <footer class="${uid}-reveal" data-reveal style="max-width:800px;margin:0 auto;padding:2rem 1.5rem 3rem;border-top:1px solid var(--border);text-align:center;">
      <p style="color:var(--fg2);font-size:0.85rem;margin:0 0 1rem;font-style:italic;">${d.interests}</p>
      <a href="${d.github}" target="_blank" rel="noopener" style="color:var(--fg2);text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon()} <span style="vertical-align:middle;margin-left:0.35rem;">${d.handle}</span></a>
    </footer>
  </div>

  <script>
  (function() {
    var root = document.getElementById('${uid}-root');
    if (!root) return;
    var els = root.querySelectorAll('[data-reveal]');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function(el) { observer.observe(el); });
  })();
  </script>`;
}
