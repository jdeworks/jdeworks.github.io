// ─── Content Data ────────────────────────────────────────────
// Bio variants and background sections are randomly mixed per render.
// Each layout picks what it needs — short bio, long bio, background items, etc.

export const DATA = {
  name: "Jens",
  handle: "jdeworks",
  role: "Full-Stack Developer",
  github: "https://github.com/jdeworks",

  // Short bios — one picked at random per render
  bios: [
    "I build tools, games, and things that make development more fun. Currently working mostly with web technologies, Python, and C#.",
    "Developer at heart since day one. I build AI-augmented dev tools, games, and creative software — always looking for ways to make vibe coding actually work.",
    "Full-stack developer with a background that spans software development, teaching, game dev, and leading engineering at an AI startup. I like building things people enjoy using.",
    "Building tools that make AI-assisted development better. I believe vibe coding is here to stay — my job is to help it grow up.",
  ],

  // Extended about — for layouts that have room for more
  about: [
    "Started coding young, studied software development in Germany (MATSE, dual studies), then took the scenic route — software dev, SAP data migration consulting, lecturing at a college, indie game development, and eventually leading engineering at an AI startup that got acquired. Now part of a larger company, still building.",
    "My path through tech has been anything but linear. From writing enterprise migration scripts to teaching students to building tower defense games to leading an AI engineering team — each chapter taught me something different. The common thread: I like making complex things work.",
    "I've worn a lot of hats — developer, consultant, lecturer, game dev, engineering lead. These days I'm focused on the intersection of AI and developer tooling, building the things that make vibe-coded software actually reliable.",
  ],

  // Philosophy / takes — for layouts that feature a quote or stance
  takes: [
    "We're in the early stages of vibe coding. It has real problems today, but give it 2–5 years and nothing will ship without at least partial AI assistance. I'd rather build the tools that make it work than pretend it's not happening.",
    "AI-assisted development isn't optional anymore — you swim with the flow or you drown. But 'vibe coded' shouldn't mean 'untested and fragile.' That's the gap I'm working to close.",
    "The best code I've shipped lately was a collaboration between me and an AI. The worst code I've reviewed lately was also a collaboration between someone and an AI. The difference is tooling, process, and taste.",
  ],

  // Interests — humanizing details
  interests: [
    "Former theatre actor, current gaming enthusiast, and full-time believer that the best debugging happens at 2 AM.",
    "When I'm not coding, I'm gaming, binge-watching series, or thinking about how to make the next vibe-coded project not fall apart.",
    "Background in theatre and acting, which turns out to be surprisingly useful when presenting technical concepts. Also: games, movies, and an unreasonable number of side projects.",
  ],

  projects: [
    {
      name: "make-it-look-good",
      desc: "Evidence-based design knowledge base for LLMs and developers. Point your AI assistant at it to get actually good UI/UX output — concrete numbers, real patterns, and copy-paste snippets.",
      longDesc: "44 design topics, 38+ HTML+Tailwind presets with multiple personality variants, and a live preview tool. Instead of vague 'make it pretty' results, your LLM gets specific contrast ratios, spacing scales, and production-ready components.",
      url: "https://github.com/jdeworks/make-it-look-good",
      demo: "https://jdeworks.github.io/make-it-look-good/",
      tags: ["Design", "AI", "Tailwind", "Knowledge Base"]
    },
    {
      name: "agent-sandbox",
      desc: "Isolated Docker sandbox for AI coding agents. Each project runs inside a locked-down container with your choice of agent and only the runtimes you need.",
      longDesc: "Supports Claude Code, OpenCode, Cursor CLI, and GitHub Copilot. 12 language runtimes, profile import/export, config mirroring, and plugin discovery. Runs on Linux, macOS, WSL, and Windows.",
      url: "https://github.com/jdeworks/agent-sandbox",
      tags: ["Docker", "CLI", "DevTools", "AI Agents"]
    },
    {
      name: "elemental-surprise",
      desc: "A scalable element combination game — 2,767 elements with 74,000+ recipes spanning nature, technology, mythology, and more. Entirely vibe-coded.",
      longDesc: "Built end-to-end through conversational AI collaboration. Features auto-solve spectator mode, semantic icon matching across 24k+ candidates, lazy-loaded recipe buckets, and an honest 'where vibe coding works and doesn't' writeup.",
      url: "https://github.com/jdeworks/elemental-surprise",
      demo: "https://jdeworks.github.io/elemental-surprise/",
      tags: ["Game", "React", "TypeScript", "Vibe Coded"]
    },
    {
      name: "infinite-story",
      desc: "An AI-powered creative writing platform that generates branching, personalized narratives. Stories that adapt and grow.",
      url: null,
      tags: ["AI", "Creative Writing", "Python", "Coming Soon"],
      soon: true
    },
    {
      name: "security-suite",
      desc: "Comprehensive security vulnerability scanner for vibe-coded applications. Multiple scanner types with AI-powered exploit analysis and PDF reports.",
      url: null,
      tags: ["Security", "SAST", "DAST", "Docker", "Coming Soon"],
      soon: true
    }
  ],

  tech: ["Python", "TypeScript", "JavaScript", "C#", "React", "FastAPI", "Docker", "Tailwind CSS", "Azure"],

  // Background timeline — for layouts that show a journey
  timeline: [
    { period: "Early days", label: "Started coding young, studied MATSE (dual studies) in Germany" },
    { period: "Software Dev", label: "Built enterprise software at a small firm" },
    { period: "Consulting", label: "SAP data migration consulting" },
    { period: "Teaching", label: "Lecturer at a college" },
    { period: "Game Dev", label: "Indie game development" },
    { period: "AI Startup", label: "Engineering lead at an AI startup" },
    { period: "Now", label: "Part of a larger company post-acquisition, building dev tools" },
  ],

  // Links beyond GitHub
  links: [
    { label: "Games", url: "https://icreatemygames.itch.io/wizard-td", icon: "game" },
  ],
};

// ─── Helper: pick random variant ─────────────────────────────
export function pickBio() {
  return DATA.bios[Math.floor(Math.random() * DATA.bios.length)];
}
export function pickAbout() {
  return DATA.about[Math.floor(Math.random() * DATA.about.length)];
}
export function pickTake() {
  return DATA.takes[Math.floor(Math.random() * DATA.takes.length)];
}
export function pickInterests() {
  return DATA.interests[Math.floor(Math.random() * DATA.interests.length)];
}
