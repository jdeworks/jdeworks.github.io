// ─── Shared rendering helpers ────────────────────────────────

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function githubIcon(size = 20) {
  return `<svg style="width:${size}px;height:${size}px;vertical-align:middle;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
}

export function projectLinks(p) {
  if (p.soon) {
    return `<span style="font-size: 0.8rem; color: var(--fg2); font-style: italic;">Coming soon</span>`;
  }
  let links = `<a href="${p.url}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none; font-size: 0.9rem; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">GitHub &rarr;</a>`;
  if (p.demo) {
    links += ` <a href="${p.demo}" target="_blank" rel="noopener" style="color: var(--fg2); text-decoration: none; font-size: 0.9rem; margin-left: 1rem; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Live Demo &rarr;</a>`;
  }
  return links;
}

export function cardCSS(style) {
  switch (style) {
    case "raised": return "box-shadow: 0 4px 20px rgba(0,0,0,0.12);";
    case "outlined": return "border: 1px solid var(--border);";
    case "glass": return "background: color-mix(in srgb, var(--card) 70%, transparent); backdrop-filter: blur(12px); border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);";
    default: return "";
  }
}

export function tagHTML(tag, style) {
  const base = "font-size: 0.75rem; padding: 0.25rem 0.65rem; display: inline-block; margin: 0.15rem;";
  switch (style) {
    case "pill": return `<span style="${base} background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); border-radius: 9999px;">${tag}</span>`;
    case "square": return `<span style="${base} background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); border-radius: 4px;">${tag}</span>`;
    case "outline": return `<span style="${base} border: 1px solid var(--accent); color: var(--accent); border-radius: 9999px;">${tag}</span>`;
    case "dot": return `<span style="${base} color: var(--fg2); border-radius: 4px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--accent);margin-right:0.35rem;vertical-align:middle;"></span>${tag}</span>`;
    default: return `<span style="${base} color: var(--accent);">${tag}</span>`;
  }
}

export function headingStyle(style, extra = "") {
  let s = `font-family: var(--font-head); ${extra}`;
  switch (style) {
    case "uppercase": return s + " text-transform: uppercase; letter-spacing: 0.08em;";
    case "italic": return s + " font-style: italic;";
    case "underline": return s + " text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 6px; text-decoration-thickness: 3px;";
    default: return s;
  }
}
