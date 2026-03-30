// ─── Content Data ────────────────────────────────────────────
// Bio variants and background sections are randomly mixed per render.
// Each layout picks what it needs — short bio, long bio, background items, etc.
// To add variety: just add more strings to any array below.

export const DATA = {
  name: "jdeworks",
  handle: "jdeworks",
  role: "Full-Stack Developer",
  github: "https://github.com/jdeworks",

  // Short bios — one picked at random per render
  bios: [
    "I build tools, games, and things that make development more fun. Currently working mostly with web technologies, Python, and C#.",
    "Developer at heart since day one. I build AI-augmented dev tools, games, and creative software — always looking for ways to make vibe coding actually work.",
    "Full-stack developer with a background that spans software development, teaching, game dev, and leading engineering at an AI startup. I like building things people enjoy using.",
    "Building tools that make AI-assisted development better. I believe vibe coding is here to stay — my job is to help it grow up.",
    "Software developer, tool builder, occasional game maker. I spend most of my time at the intersection of AI and developer experience.",
    "Making vibe-coded software reliable is the problem I care about most. I build the tooling, sandboxes, and design systems that get us there.",
    "I've built enterprise systems, taught at a college, shipped indie games, and led an AI engineering team. Now I make tools for developers who work with AI.",
  ],

  // Extended about — for layouts that have room for more
  about: [
    "Started coding young, studied software development in Germany (MATSE, dual studies), then took the scenic route — software dev, SAP data migration consulting, lecturing at a college, indie game development, and eventually leading engineering at an AI startup that got acquired. Now part of a larger company, still building.",
    "My path through tech has been anything but linear. From writing enterprise migration scripts to teaching students to building tower defense games to leading an AI engineering team — each chapter taught me something different. The common thread: I like making complex things work.",
    "I've worn a lot of hats — developer, consultant, lecturer, game dev, engineering lead. These days I'm focused on the intersection of AI and developer tooling, building the things that make vibe-coded software actually reliable.",
    "Started with dual studies in Germany, bounced through enterprise dev, data migration consulting, and teaching before landing in the AI startup world. The startup got acquired, and now I channel everything into open-source developer tools.",
    "Most developers pick a lane early. I picked all of them — enterprise, consulting, education, games, AI. Turns out that wide background is exactly what you need when you're building tools that have to work for everyone.",
  ],

  // Philosophy / takes — for layouts that feature a quote or stance
  takes: [
    "We're in the early stages of vibe coding. It has real problems today, but give it 2–5 years and nothing will ship without at least partial AI assistance. I'd rather build the tools that make it work than pretend it's not happening.",
    "AI-assisted development isn't optional anymore — you swim with the flow or you drown. But 'vibe coded' shouldn't mean 'untested and fragile.' That's the gap I'm working to close.",
    "The best code I've shipped lately was a collaboration between me and an AI. The worst code I've reviewed lately was also a collaboration between someone and an AI. The difference is tooling, process, and taste.",
    "Vibe coding gets 80% of the way there remarkably fast. The last 20% — the polish, the security, the edge cases — that's where it falls apart. I build the tools that catch what the vibes miss.",
    "Every tool I build starts from the same question: what's the gap between what AI can generate and what's actually safe to ship?",
    "Good developer tools should feel like they're not there. They should catch problems before you know they exist and get out of the way when everything's fine.",
  ],

  // Interests — humanizing details
  interests: [
    "Former theatre actor, current gaming enthusiast, and full-time believer that the best debugging happens at 2 AM.",
    "When I'm not coding, I'm gaming, binge-watching series, or thinking about how to make the next vibe-coded project not fall apart.",
    "Background in theatre and acting, which turns out to be surprisingly useful when presenting technical concepts. Also: games, movies, and an unreasonable number of side projects.",
    "Gaming, series, and too many side projects. The kind of developer who starts a new repo before finishing the last three.",
    "Ask me about tower defense game design, obscure series recommendations, or why every developer should try acting at least once.",
  ],

  projects: [
    {
      name: "make-it-look-good",
      desc: "Evidence-based design knowledge base and analyzer for LLMs and developers. Point your AI assistant at it to get actually good UI/UX output — concrete numbers, real patterns, and copy-paste snippets.",
      longDesc: "45 design topics, 121 prebuilt templates across 38 elements, a live preview tool, and a Design Analyzer that scores any website against ~60 evidence-based checks across 14 modules. Includes a consultation playbook that turns any LLM into a design consultant.",
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
      name: "think-tank",
      desc: "AI-guided project planning tool that transforms ideas into structured, comprehensive plans through interactive conversation.",
      longDesc: "Answer guided questions about architecture, tech stack, hosting, security, and budget. Generates interactive diagrams, structured JSON, and exportable documentation — all running entirely in the browser with no backend required.",
      url: "https://github.com/jdeworks/think-tank",
      demo: "https://jdeworks.github.io/think-tank",
      tags: ["AI", "React", "TypeScript", "Planning"]
    },
    {
      name: "project-starter-kit",
      desc: "A structured foundation for AI-assisted software projects. Quality infrastructure that keeps AI agents producing maintainable code across any project type.",
      longDesc: "10 project variants (website, API, SaaS, CLI, MCP server, game dev, and more), multi-agent support (Claude Code, OpenCode, Cursor, Windsurf, Copilot), CLI tooling, and starter templates per framework. Full and lean modes for enforcement vs. prototyping.",
      url: "https://github.com/jdeworks/project-starter-kit",
      tags: ["DevTools", "AI", "CLI", "Knowledge Base"]
    },
    {
      name: "get-me-started",
      desc: "Guides complete beginners from zero to a working website setup using AI. No coding experience required — just pick your OS and follow along.",
      longDesc: "A setup page that detects your OS and walks you through everything. Works with any AI chatbot (ChatGPT, Claude, Gemini) via a starter prompt. Includes concept explainer guides and connects to the rest of the jdeworks ecosystem.",
      url: "https://github.com/jdeworks/get-me-started",
      demo: "https://jdeworks.github.io/get-me-started/",
      tags: ["Guide", "Beginner", "Web Dev", "AI"]
    },
    {
      name: "noodle-jump",
      desc: "A pasta-themed endless jumper game built with PixiJS and TypeScript. Tilt controls on mobile, keyboard on desktop.",
      longDesc: "10 power-ups, 3 themed zones (Kitchen, Ocean, Space) with parallax backgrounds, progressive difficulty, combo system, and procedural SFX via Web Audio API. A showcase project for the game-dev variant in project-starter-kit.",
      url: "https://github.com/jdeworks/noodle-jump",
      demo: "https://jdeworks.github.io/noodle-jump/",
      tags: ["Game", "TypeScript", "PixiJS", "Vibe Coded"]
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
