# jdeworks.github.io

Personal site for Jens (jdeworks). Same content, different look every page load.

## Architecture

Single-page static site — no build step, no framework. `index.html` imports ES modules that render a random combination of layout + palette + font + styles on each load.

```
index.html              ← Entry point, imports modules, manages state
favicon.svg             ← JD monogram favicon
src/
  data.js               ← All content: bio variants, projects, timeline, etc.
  helpers.js             ← Shared rendering functions (tagHTML, cardCSS, etc.)
  palettes/palettes.js   ← Color palettes (Tailwind-based with gradient meshes)
  fonts/fonts.js         ← Google Font pairs (heading + body)
  styles/styles.js       ← Style modifier arrays (card, tag, heading variants)
  layouts/
    index.js             ← Layout registry — add new layouts here
    *.js                 ← One file per layout template
```

## Randomization

Each render picks one value from each axis independently:
- **Layout** — structural template (grid, sidebar, hero, etc.)
- **Palette** — color scheme (bg, fg, accent, card, border + gradient mesh)
- **Font** — heading + body font pair from Google Fonts
- **Card style** — flat / raised / outlined / glass
- **Tag style** — pill / square / outline / dot
- **Heading style** — normal / uppercase / italic / underline

Text content also varies: `data.js` has multiple `bios`, `about`, `takes`, and `interests` variants. One of each is picked per render.

## How to extend

### Add a project

Edit `src/data.js` → `projects` array. Each project:
```js
{
  name: "project-name",
  desc: "Short description for most layouts.",
  longDesc: "Longer description for layouts with more room (optional).",
  url: "https://github.com/jdeworks/project-name",  // null for coming-soon
  demo: "https://jdeworks.github.io/project-name/",  // optional
  tags: ["Tag1", "Tag2"],
  soon: false  // set true for unreleased projects (hides links, shows "Coming soon")
}
```

### Add a bio/about/take/interests variant

Edit `src/data.js`. Add a string to the `bios`, `about`, `takes`, or `interests` array. These are randomly picked per render — more variants = more unique combinations.

### Add a timeline entry

Edit `src/data.js` → `timeline` array. Each entry: `{ period: "Label", label: "Description" }`.

### Add a color palette

Edit `src/palettes/palettes.js`. Add an object to the array:
```js
{
  name: "PaletteName",
  bg: "#...",      // main background
  bg2: "#...",     // secondary background (sections, sidebar)
  fg: "#...",      // primary text
  fg2: "#...",     // secondary text
  accent: "#...",  // primary accent (links, highlights)
  accent2: "#...", // secondary accent (gradients, hover)
  card: "#...",    // card/panel background
  border: "#...",  // border color
  gradient: "radial-gradient(...)"  // optional background gradient mesh, or "none"
}
```
Use Tailwind's color wheel for consistency. Dark palettes: bg in #0x-#1x range. Light palettes: bg in #ex-#fx range. For light palettes, bg2/card should be a tinted shade (not pure white).

### Add a font pair

Edit `src/fonts/fonts.js`. Add an object:
```js
{ name: "DisplayName", head: "'Font Name'", body: "'Font Name'", url: "family=Font+Name:wght@400;600;700" }
```
The `url` is appended to `https://fonts.googleapis.com/css2?`.

### Add a layout

1. Create `src/layouts/my-layout.js`:
```js
import { headingStyle, tagHTML, cardCSS, projectLinks, githubIcon } from '../helpers.js';

export const name = "My Layout";

export function render(d, cs, ts, hs) {
  // d = data snapshot with: name, handle, role, github, bio, about, take,
  //     interests, projects[], tech[], timeline[], links[]
  // cs = card style string
  // ts = tag style string
  // hs = heading style string
  return `<div>...</div>`;
}
```

2. Register in `src/layouts/index.js`:
```js
import * as myLayout from './my-layout.js';
// add to LAYOUTS array
```

3. Update the style supports map in `src/layouts/index.js` (`_S` object). If your layout uses all three helpers (`cardCSS`, `tagHTML`, `headingStyle`) with the `cs`/`ts`/`hs` parameters, you can skip this step (defaults to all supported). Otherwise, add an entry marking which axes have no effect:
```js
'My Layout': { card: false, tag: true, heading: true },
```

**Current style support matrix:**

| Layout | Card | Tag | Heading |
|--------|------|-----|---------|
| Centered Hero, Sidebar, Terminal, Bento Grid, Split, Scroll Reveal, Showcase, Stories, Landing | yes | yes | yes |
| Magazine, Playful, DevTool, Editorial, Agency, Stacked, Portfolio, Resume, Narrative | - | yes | yes |
| Chat | - | yes | - |
| Minimalist, Neon, Glass, Starfield, Card Deck, Rundown, Poster, Recipe | - | - | yes |
| Matrix, Retro OS, Newspaper, Blueprint, Arcade, Comic Book, Boarding Pass, Code Editor, Boot Sequence, Broken Page | - | - | - |

Layouts not using an axis will: skip it during random shuffle, and dim/disable the buttons in the picker modal.

**Layout guidelines:**
- Use CSS custom properties: `var(--bg)`, `var(--bg2)`, `var(--fg)`, `var(--fg2)`, `var(--accent)`, `var(--accent2)`, `var(--card)`, `var(--border)`, `var(--font-head)`, `var(--font-body)`
- Use helper functions: `tagHTML(tag, ts)`, `cardCSS(cs)`, `headingStyle(hs, extraCSS)`, `projectLinks(p)`, `githubIcon(size)`
- Handle `p.soon === true` projects (no URL, show "coming soon")
- For scroll animations: use `data-reveal` attribute + CSS classes. The `activateScrollReveals()` hook in index.html sets up IntersectionObserver for all `[data-reveal]` elements. Do NOT use inline `<script>` tags — they won't execute when inserted via innerHTML.
- Make responsive: use CSS media queries (inline `<style>` blocks are fine)
- Each layout should show different subsets of content to maximize variety

### Add a style modifier

Edit `src/styles/styles.js` to add values to `CARD_STYLES`, `TAG_STYLES`, or `HEADING_STYLES`. Then update the rendering in `src/helpers.js` (`cardCSS`, `tagHTML`, `headingStyle` functions).

## Features

- **Shuffle button** (bottom-right): loads a new random combination
- **Combo label** (bottom-left): shows current combination. Double-click to open the **picker** — select each axis independently
- **Query params**: URL auto-updates with the full combination (e.g. `?palette=Teal&font=Grotesk&layout=Terminal`). Shareable and debuggable
- **Scroll reveals**: layouts using `data-reveal` attribute get IntersectionObserver-based fade-in animations automatically

## Design reference

This site's design system draws from [make-it-look-good](https://github.com/jdeworks/make-it-look-good):
- Color palettes follow Tailwind's tonal scale approach
- Layout patterns are adapted from make-it-look-good presets (personal-hero, portfolio, agency-landing, scroll-reveal-landing, devtool-landing, editorial-blog, app-showcase, etc.)
- There's a custom `jdeworks-personal` preset in make-it-look-good's preset library

## Deployment

GitHub Pages serves from the `main` branch root. No build step needed.

```bash
# Develop on dev, merge to main to deploy
git checkout main && git merge dev && git push && git checkout dev
```
