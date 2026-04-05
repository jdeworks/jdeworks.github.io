// Layout registry — lightweight metadata, layouts loaded on demand via dynamic import
// To add a new layout: add an entry to _REGISTRY, then create the layout file

// Each entry: { name (display name), file (filename), mobile (included in mobile rotation) }
const _REGISTRY = [
  { name: 'Centered Hero',  file: 'centered-hero.js',  mobile: true },
  { name: 'Sidebar',        file: 'sidebar.js',        mobile: false },
  { name: 'Terminal',        file: 'terminal.js',       mobile: true },
  { name: 'Magazine',        file: 'magazine.js',       mobile: false },
  { name: 'Bento Grid',     file: 'bento.js',          mobile: false },
  { name: 'Split',           file: 'split.js',          mobile: false },
  { name: 'Minimalist',      file: 'minimalist.js',     mobile: true },
  { name: 'Playful',         file: 'playful.js',        mobile: true },
  { name: 'DevTool',         file: 'devtool.js',        mobile: true },
  { name: 'Editorial',       file: 'editorial.js',      mobile: true },
  { name: 'Agency',          file: 'agency.js',         mobile: true },
  { name: 'Stacked',         file: 'stacked.js',        mobile: true },
  { name: 'Scroll Reveal',   file: 'scroll-reveal.js',  mobile: true },
  { name: 'Showcase',        file: 'showcase.js',       mobile: false },
  { name: 'Portfolio',       file: 'portfolio.js',      mobile: false },
  { name: 'Resume',          file: 'resume.js',         mobile: false },
  { name: 'Narrative',       file: 'narrative.js',      mobile: true },
  { name: 'Landing',         file: 'landing.js',        mobile: true },
  { name: 'Matrix',          file: 'matrix.js',         mobile: true },
  { name: 'Retro OS',        file: 'retro-os.js',       mobile: true },
  { name: 'Newspaper',       file: 'newspaper.js',      mobile: true },
  { name: 'Blueprint',       file: 'blueprint.js',      mobile: true },
  { name: 'Arcade',          file: 'arcade.js',         mobile: true },
  { name: 'Comic Book',      file: 'comic.js',          mobile: true },
  { name: 'Stories',         file: 'stories.js',        mobile: true },
  { name: 'Chat',            file: 'chat.js',           mobile: true },
  { name: 'Neon',            file: 'neon.js',           mobile: true },
  { name: 'Glass',           file: 'glass.js',          mobile: true },
  { name: 'Recipe',          file: 'recipe.js',         mobile: true },
  { name: 'Boarding Pass',   file: 'boarding-pass.js',  mobile: true },
  { name: 'Starfield',       file: 'starfield.js',      mobile: true },
  { name: 'Code Editor',     file: 'file-explorer.js',  mobile: false },
  { name: 'Boot Sequence',   file: 'boot.js',           mobile: true },
  { name: 'Card Deck',       file: 'card-deck.js',      mobile: true },
  { name: 'Rundown',         file: 'rundown.js',        mobile: true },
  { name: 'Poster',          file: 'poster.js',         mobile: true },
  { name: 'Broken Page',     file: 'decayed.js',        mobile: true },
];

// Which style axes actually change the rendered output per layout.
// Omitted layouts default to { card: true, tag: true, heading: true }.
const DEFAULTS = { card: true, tag: true, heading: true };
const _S = {
  'Magazine':      { card: false, tag: true,  heading: true  },
  'Minimalist':    { card: false, tag: false, heading: true  },
  'Playful':       { card: false, tag: true,  heading: true  },
  'DevTool':       { card: false, tag: true,  heading: true  },
  'Editorial':     { card: false, tag: true,  heading: true  },
  'Agency':        { card: false, tag: true,  heading: true  },
  'Stacked':       { card: false, tag: true,  heading: true  },
  'Portfolio':     { card: false, tag: true,  heading: true  },
  'Resume':        { card: false, tag: true,  heading: true  },
  'Narrative':     { card: false, tag: true,  heading: true  },
  'Matrix':        { card: false, tag: false, heading: false },
  'Retro OS':      { card: false, tag: false, heading: false },
  'Newspaper':     { card: false, tag: false, heading: false },
  'Blueprint':     { card: false, tag: false, heading: false },
  'Arcade':        { card: false, tag: false, heading: false },
  'Comic Book':    { card: false, tag: false, heading: false },
  'Chat':          { card: false, tag: true,  heading: false },
  'Neon':          { card: false, tag: false, heading: true  },
  'Glass':         { card: false, tag: false, heading: true  },
  'Recipe':        { card: false, tag: false, heading: true  },
  'Boarding Pass': { card: false, tag: false, heading: false },
  'Starfield':     { card: false, tag: false, heading: true  },
  'Code Editor':   { card: false, tag: false, heading: false },
  'Boot Sequence': { card: false, tag: false, heading: false },
  'Card Deck':     { card: false, tag: false, heading: true  },
  'Rundown':       { card: false, tag: false, heading: true  },
  'Poster':        { card: false, tag: false, heading: true  },
  'Broken Page':   { card: false, tag: false, heading: false },
};

/** Return { card, tag, heading } booleans for a layout name */
export function layoutSupports(name) {
  return _S[name] || DEFAULTS;
}

// ─── Layout name lists (for random pick + picker UI) ────────
export const LAYOUT_NAMES = _REGISTRY.map(r => r.name);
export const MOBILE_LAYOUT_NAMES = _REGISTRY.filter(r => r.mobile).map(r => r.name);

// ─── Dynamic loading ────────────────────────────────────────
const _cache = new Map();

/** Load a single layout by display name. Returns { name, render }. */
export async function loadLayout(name) {
  if (_cache.has(name)) return _cache.get(name);
  const entry = _REGISTRY.find(r => r.name === name);
  if (!entry) throw new Error(`Unknown layout: ${name}`);
  const mod = await import('./' + entry.file);
  const layout = { name: mod.name, render: mod.render };
  _cache.set(name, layout);
  return layout;
}

/** Preload all layouts in the background. */
export function loadAllLayouts() {
  return Promise.all(
    _REGISTRY.filter(r => !_cache.has(r.name)).map(r => loadLayout(r.name))
  );
}
