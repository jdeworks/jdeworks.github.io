// Chat — content presented as a messaging conversation
import { tagHTML, projectLinks, githubIcon } from '../helpers.js';

export const name = "Chat";

export function render(d, cs, ts, hs) {
  const uid = 'ch' + Math.random().toString(36).slice(2, 6);
  const time = () => {
    const h = 9 + Math.floor(Math.random() * 10);
    const m = Math.floor(Math.random() * 60);
    return `${h}:${String(m).padStart(2, '0')}`;
  };

  function msg(text, fromMe = false, extra = '') {
    const align = fromMe ? 'margin-left:auto;' : '';
    const bg = fromMe ? 'background:var(--accent);color:var(--bg);' : 'background:var(--card);color:var(--fg);';
    const radius = fromMe
      ? 'border-radius:18px 18px 4px 18px;'
      : 'border-radius:18px 18px 18px 4px;';
    return `<div style="max-width:85%;${align}${bg}${radius}padding:0.75rem 1rem;margin-bottom:0.35rem;font-size:0.9rem;line-height:1.6;">
      ${text}${extra}
    </div>`;
  }

  function timestamp(t) {
    return `<p style="text-align:center;font-size:0.65rem;color:var(--fg2);margin:1.5rem 0 0.75rem;opacity:0.6;">${t}</p>`;
  }

  function typing() {
    return `<div style="background:var(--card);border-radius:18px 18px 18px 4px;padding:0.75rem 1.25rem;display:inline-block;margin-bottom:0.35rem;">
      <span style="display:inline-flex;gap:4px;">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--fg2);opacity:0.4;animation:${uid}-typing 1.4s ease-in-out infinite;"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--fg2);opacity:0.4;animation:${uid}-typing 1.4s ease-in-out 0.2s infinite;"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--fg2);opacity:0.4;animation:${uid}-typing 1.4s ease-in-out 0.4s infinite;"></span>
      </span>
    </div>`;
  }

  return `
  <style>
    @keyframes ${uid}-typing {
      0%, 100% { opacity: 0.3; transform: translateY(0); }
      50% { opacity: 0.8; transform: translateY(-3px); }
    }
    @media (prefers-reduced-motion: reduce) {
      @keyframes ${uid}-typing { 0%, 100% { opacity: 0.5; transform: none; } }
    }
  </style>

  <div style="min-height:100vh;background:var(--bg);max-width:640px;margin:0 auto;padding:0;">
    <!-- Chat header -->
    <div style="position:sticky;top:0;z-index:10;background:color-mix(in srgb, var(--bg) 90%, transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0.75rem 1rem;display:flex;align-items:center;gap:0.75rem;">
      <div style="width:36px;height:36px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:var(--bg);font-family:var(--font-head);font-weight:700;font-size:0.9rem;">${d.name[0]}</div>
      <div>
        <p style="font-family:var(--font-head);font-size:0.9rem;font-weight:600;color:var(--fg);margin:0;">${d.name}</p>
        <p style="font-size:0.7rem;color:var(--accent);margin:0;">online</p>
      </div>
      <a href="${d.github}" target="_blank" rel="noopener" style="margin-left:auto;color:var(--fg2);text-decoration:none;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--fg2)'">${githubIcon(18)}</a>
    </div>

    <!-- Messages -->
    <div style="padding:1rem;">
      ${timestamp('Today')}

      ${msg("Hey! Who are you? 👋")}
      ${msg(`${d.role}. ${d.bio}`, true)}

      ${timestamp(time())}

      ${msg("What's your background?")}
      ${msg(d.about, true)}

      ${timestamp(time())}

      ${msg("What do you think about AI and coding?")}
      ${msg(d.take, true)}

      ${timestamp(time())}

      ${msg("What tech do you work with?")}
      ${msg(
        d.tech.map(t => tagHTML(t, ts)).join(' '),
        true
      )}

      ${timestamp(time())}

      ${msg("Show me what you've built!")}

      ${d.projects.map(p =>
        msg(
          `<strong style="color:inherit;">${p.name}</strong><br>
          <span style="opacity:0.85;font-size:0.85rem;">${p.desc}</span><br>
          <span style="margin-top:0.5rem;display:inline-block;">${p.tags.map(t => tagHTML(t, ts)).join(' ')}</span>
          ${!p.soon ? `<br><span style="margin-top:0.5rem;display:inline-block;">${projectLinks(p)}</span>` : '<br><span style="font-size:0.8rem;opacity:0.7;margin-top:0.25rem;display:inline-block;">🔒 Coming soon</span>'}`,
          true
        )
      ).join('')}

      ${timestamp(time())}

      ${msg("Anything outside of code?")}
      ${msg(d.interests, true)}

      ${timestamp(time())}

      ${msg("Where can I find you?")}
      ${msg(
        `${d.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">${l.label}</a>`).join(' · ')} · <a href="${d.github}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">GitHub</a>`,
        true
      )}

      <div style="margin-top:0.5rem;">
        ${typing()}
      </div>
    </div>
  </div>`;
}
