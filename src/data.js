// ─── Content Data ────────────────────────────────────────────
// Bio variants and background sections are randomly mixed per render.
// Each layout picks what it needs — short bio, long bio, background items, etc.
// To add variety: just add more strings to any array below.

export const DATA = {
  name: "jdeworks",
  handle: "jdeworks",
  role: "Developer & AI Builder",
  github: "https://github.com/jdeworks",

  // Short bios — one picked at random per render
  bios: [
    "I build dev tools, games, and creative AI experiments — whatever's interesting and pushes what's possible. Currently working mostly with web technologies, Python, and C#.",
    "Developer who can't pick a lane. Dev tools one week, a pasta-themed jumper game the next, an AI audiobook creator after that. The common thread is building things with AI and seeing how far it goes.",
    "Full-stack developer with a background that spans software development, teaching, game dev, and leading engineering at an AI startup. These days I build tools, games, and creative software — mostly with AI as a collaborator.",
    "I explore what happens when you build with AI — sometimes that's tooling that makes vibe coding reliable, sometimes it's turning a short story into a multi-voice audiobook, sometimes it's a game about combining elements.",
    "Part developer, part experimenter. I build sandboxes for AI agents, design systems for developers, games for fun, and creative tools that probably shouldn't work but do.",
    "I've built enterprise systems, taught at a college, shipped indie games, and led an AI engineering team. Now I build open-source tools and creative experiments at the intersection of AI and everything else.",
    "Making AI-assisted development actually work is one thing I care about. The other is using AI to build things that are just fun — games, audiobooks, stories. I do both.",
  ],

  // Extended about — for layouts that have room for more
  about: [
    "Started coding young, studied software development in Germany (MATSE, dual studies), then took the scenic route — software dev, SAP data migration consulting, lecturing at a college, indie game development, and eventually leading engineering at an AI startup that got acquired. Now part of a larger company, building open-source tools and creative AI experiments on the side.",
    "My path through tech has been anything but linear. From writing enterprise migration scripts to teaching students to building tower defense games to leading an AI engineering team — each chapter taught me something different. The common thread: I like building things, and I don't much care what category they fall into.",
    "I've worn a lot of hats — developer, consultant, lecturer, game dev, engineering lead. These days I split my time between making AI-assisted development more reliable and using AI to build things that are just creative and fun.",
    "Started with dual studies in Germany, bounced through enterprise dev, data migration consulting, and teaching before landing in the AI startup world. The startup got acquired, and now I channel everything into open-source — dev tools, games, creative experiments, beginner guides.",
    "Most developers pick a lane early. I picked all of them — enterprise, consulting, education, games, AI. That wide background means I can build a Docker sandbox for coding agents one day and an AI audiobook creator the next.",
  ],

  // Philosophy / takes — for layouts that feature a quote or stance
  takes: [
    "The best code I've shipped lately was a collaboration between me and an AI. The worst code I've reviewed lately was also a collaboration between someone and an AI. The difference is tooling, process, and taste.",
    "Vibe coding gets 80% of the way there remarkably fast. The last 20% — the polish, the security, the edge cases — that's where it falls apart. I build the tools that catch what the vibes miss.",
    "AI doesn't just change how we code — it changes what's worth building. An audiobook creator that would've taken a team six months? One person can prototype that in a weekend now. The question isn't whether to use AI, it's what to aim it at.",
    "I think the most interesting use of AI right now isn't chatbots — it's building things that couldn't have existed before. A game with 74,000 recipes. Stories that branch based on who you are. Audiobooks with distinct character voices. That's the stuff I want to make.",
    "Half my projects exist to make AI-assisted development safer and more reliable. The other half exist because AI made them possible in the first place. Both matter.",
    "The barrier to building software is dropping fast. I want to be on both sides of that — making tools for experienced developers, and making guides for people writing their first line of code.",
    "Good developer tools should feel like they're not there. They should catch problems before you know they exist and get out of the way when everything's fine.",
  ],

  // Interests — humanizing details
  interests: [
    "Former theatre actor, current gaming enthusiast, and full-time believer that the best debugging happens at 2 AM.",
    "When I'm not coding, I'm gaming, binge-watching series, or sketching out the next project that probably doesn't need to exist but will be fun to build.",
    "Background in theatre and acting, which turns out to be surprisingly useful when presenting technical concepts. Also: games, movies, and an unreasonable number of side projects.",
    "Gaming, series, and too many side projects. The kind of developer who starts a new repo before finishing the last three.",
    "Ask me about tower defense game design, obscure series recommendations, or why every developer should try acting at least once.",
  ],

  projects: [
    {
      name: "make-it-look-good",
      desc: "Evidence-based design knowledge base and analyzer for LLMs and developers. Point your AI assistant at it to get actually good UI/UX output — concrete numbers, real patterns, and copy-paste snippets.",
      longDesc: "45 design topics, 121 prebuilt templates across 38 elements, a live preview tool, and a Design Analyzer that scores any website against ~60 evidence-based checks across 14 modules. Includes a consultation playbook that turns any LLM into a design consultant.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/make-it-look-good" },
        { label: "Live Demo", url: "https://jdeworks.github.io/make-it-look-good/", tip: "Browse the design knowledge base and preview tool" },
        { label: "Analyzer", url: "https://jdeworks.github.io/make-it-look-good/analyzer.html", tip: "Score any website against ~60 evidence-based design checks" }
      ],
      tags: ["Design", "AI", "Tailwind", "Knowledge Base"]
    },
    {
      name: "agent-sandbox",
      desc: "Isolated Docker sandbox for AI coding agents. Each project runs inside a locked-down container with your choice of agent and only the runtimes you need.",
      longDesc: "Supports Claude Code, OpenCode, Cursor CLI, and GitHub Copilot. 12 language runtimes, profile import/export, config mirroring, and plugin discovery. Runs on Linux, macOS, WSL, and Windows.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/agent-sandbox" }
      ],
      tags: ["Docker", "CLI", "DevTools", "AI Agents"]
    },
    {
      name: "elemental-surprise",
      desc: "A scalable element combination game — 2,767 elements with 74,000+ recipes spanning nature, technology, mythology, and more. Entirely vibe-coded.",
      longDesc: "Built end-to-end through conversational AI collaboration. Features auto-solve spectator mode, semantic icon matching across 24k+ candidates, lazy-loaded recipe buckets, and an honest 'where vibe coding works and doesn't' writeup.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/elemental-surprise" },
        { label: "Live Demo", url: "https://jdeworks.github.io/elemental-surprise/" }
      ],
      tags: ["Game", "React", "TypeScript", "Vibe Coded"]
    },
    {
      name: "think-tank",
      desc: "AI-guided project planning tool that transforms ideas into structured, comprehensive plans through interactive conversation.",
      longDesc: "Answer guided questions about architecture, tech stack, hosting, security, and budget. Generates interactive diagrams, structured JSON, and exportable documentation — all running entirely in the browser with no backend required.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/think-tank" },
        { label: "Live Demo", url: "https://jdeworks.github.io/think-tank" }
      ],
      tags: ["AI", "React", "TypeScript", "Planning"]
    },
    {
      name: "project-starter-kit",
      desc: "A structured foundation for AI-assisted software projects. Quality infrastructure that keeps AI agents producing maintainable code across any project type.",
      longDesc: "10 project variants (website, API, SaaS, CLI, MCP server, game dev, and more), multi-agent support (Claude Code, OpenCode, Cursor, Windsurf, Copilot), CLI tooling, and starter templates per framework. Full and lean modes for enforcement vs. prototyping.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/project-starter-kit" }
      ],
      tags: ["DevTools", "AI", "CLI", "Knowledge Base"]
    },
    {
      name: "get-me-started",
      desc: "Guides complete beginners from zero to a working website setup using AI. No coding experience required — just pick your OS and follow along.",
      longDesc: "A setup page that detects your OS and walks you through everything. Works with any AI chatbot (ChatGPT, Claude, Gemini) via a starter prompt. Includes concept explainer guides and connects to the rest of the jdeworks ecosystem.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/get-me-started" },
        { label: "Live Demo", url: "https://jdeworks.github.io/get-me-started/" }
      ],
      tags: ["Guide", "Beginner", "Web Dev", "AI"]
    },
    {
      name: "noodle-jump",
      desc: "A pasta-themed endless jumper game built with PixiJS and TypeScript. Tilt controls on mobile, keyboard on desktop.",
      longDesc: "10 power-ups, 3 themed zones (Kitchen, Ocean, Space) with parallax backgrounds, progressive difficulty, combo system, and procedural SFX via Web Audio API. A showcase project for the game-dev variant in project-starter-kit.",
      links: [
        { label: "GitHub", url: "https://github.com/jdeworks/noodle-jump" },
        { label: "Play", url: "https://jdeworks.github.io/noodle-jump/" }
      ],
      tags: ["Game", "TypeScript", "PixiJS", "Vibe Coded"]
    },
    {
      name: "infinite-story",
      desc: "An AI-powered creative writing platform that generates branching, personalized narratives. Stories that adapt and grow.",
      tags: ["AI", "Creative Writing", "Python", "Coming Soon"],
      soon: true
    },
    {
      name: "narratu",
      desc: "Proof-of-concept audiobook creator that turns short stories into multi-voice audiobooks entirely in the browser. Paste a story, AI handles the rest.",
      longDesc: "A 95% solution for automated audiobook production. AI analyzes characters, emotions, and speech directions, then generates distinct voices per character with production-grade audio processing — LUFS normalization, peak limiting, and context-aware pacing. Supports ElevenLabs, Hume AI, and Chrome Web Speech via bring-your-own-key. Includes a fully voiced demo of 'The Open Window' by Saki.",
      tags: ["AI", "React", "TypeScript", "Audio", "Coming Soon"],
      soon: true
    }
    // {
    //   name: "security-suite",
    //   desc: "Comprehensive security vulnerability scanner for vibe-coded applications. Multiple scanner types with AI-powered exploit analysis and PDF reports.",
    //   tags: ["Security", "SAST", "DAST", "Docker", "Coming Soon"],
    //   soon: true
    // }
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
    { period: "Now", label: "Part of a larger company post-acquisition, building open-source dev tools and creative AI experiments" },
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
