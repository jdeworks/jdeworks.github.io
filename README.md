# jdeworks

Developer & AI builder. I build dev tools, games, and creative AI experiments — whatever's interesting and pushes what's possible. Mostly web technologies, Python, and C#.

## Projects

### Hosted apps (live, source private)

#### [Infinite Stories](https://infinite-stories.jdeworks.org)
An AI-powered collaborative storytelling platform. Community members grow branching narrative trees together, chapter by chapter. Several story formats, character libraries and a public research library that anyone can read without an account.

#### [You Are a Gift](https://gift.jdeworks.org)
Make someone an animated gift note. Add a photo or a voice line, pick the moment it opens, then share one private link. Recipients need no account and notes expire on their own.

All hosted apps are listed at [jdeworks.org](https://jdeworks.org).

### Active

#### [make-it-look-good](https://github.com/jdeworks/make-it-look-good)
Evidence-based design knowledge base and analyzer for LLMs and developers. 45 design topics, 125 prebuilt templates across 41 elements, a [live preview tool](https://jdeworks.github.io/make-it-look-good/), and a [Design Analyzer](https://jdeworks.github.io/make-it-look-good/analyzer.html) that scores any website against ~70 evidence-based checks across 14 modules. Includes a consultation playbook that turns any LLM into a design consultant.

#### [project-starter-kit](https://github.com/jdeworks/project-starter-kit)
A structured foundation for AI-assisted software projects. 10 project variants (website, API, SaaS, CLI, MCP server, game dev, and more), multi-agent support (Claude Code, OpenCode, Cursor, Windsurf, Copilot, and online agents via bundle.xml), CLI tooling, and starter templates per framework. Full and lean modes for enforcement vs. prototyping.

#### [elemental-surprise](https://github.com/jdeworks/elemental-surprise)
A scalable element combination game — 2,767 elements with 74,000+ recipes spanning nature, technology, mythology, and more. Entirely vibe-coded through conversational AI collaboration, with auto-solve spectator mode and semantic icon matching across 40k+ candidates. [Play it here.](https://jdeworks.github.io/elemental-surprise/)

#### [think-tank](https://github.com/jdeworks/think-tank)
AI-guided project planning tool that turns ideas into structured, comprehensive plans through interactive conversation. BYOK with OpenAI, Claude, or any compatible API — 5 AI personalities, 12-section plans, interactive diagrams (React Flow + Mermaid), voice mode, and full export. Runs entirely in the browser. [Try it here.](https://jdeworks.github.io/think-tank)

#### [noodle-jump](https://github.com/jdeworks/noodle-jump)
A pasta-themed endless jumper built with PixiJS and TypeScript. 13 power-ups, 7 themed zones, 13 characters, 3 boss fights, 35 achievements, and P2P online multiplayer via WebRTC — all on GitHub Pages with no backend. [Play it here.](https://jdeworks.github.io/noodle-jump/)

#### [narratu-poc](https://github.com/jdeworks/narratu-poc)
Proof-of-concept audiobook creator that turns short stories into multi-voice audiobooks entirely in the browser. AI analyzes characters, emotions, and direction, then generates distinct voices with production-grade audio (LUFS normalization, mixing, music/SFX placement). [Live demo.](https://jdeworks.github.io/narratu-poc/)

#### [anvil-poc](https://github.com/jdeworks/anvil-poc)
Public, self-contained demo of anvil — automated research and source-trust analysis. A static React SPA serving real, pre-computed evaluations of a few sources: extracted claims, evidence-backed trust signals, novelty/reproducibility, citations, and cross-context relevance reports. No backend, no keys. [Live demo.](https://jdeworks.github.io/anvil-poc/)

#### [dead-data-cleaner-poc](https://github.com/jdeworks/dead-data-cleaner-poc)
Public showcase for dead-data-cleaner — a tool that scans code and data and surfaces the dead weight: unused symbols, orphaned files, stale docs, duplicated blocks, dangling config. Runs the actual viewer, read-only, on genuine `ddc --json` output (two real scans) with an explorable treemap and per-finding evidence. [Live demo.](https://jdeworks.github.io/dead-data-cleaner-poc/)

#### [scripts](https://github.com/jdeworks/scripts)
A grab-bag of standalone scripts I reach for — including a dependency-compromise scanner that hunts the filesystem for malicious/typosquatted npm and pip packages by version, and a tool that drives Claude Code tasks straight from GitHub issues.

### In progress (private)

- **narratu** — the productized evolution of narratu-poc: fully-voiced, multi-character audiobooks with AI-directed performances and production-grade mixing.
- **anvil** — a Docker-based research analyst. Drop in research papers, get structured, provenance-tracked evaluations you can re-score against your own technical contexts. Evaluate once, re-score many times.
- **dead-data-cleaner** — keeps codebases lean, clean, and understandable. A Rust engine and `ddc` CLI plus a visual dashboard that surface dead and dubious code; deterministic by default, AI-enhanced by choice.
- **overwatcher** — a Tauri + Rust + React desktop app for orchestrating AI coding agents (Claude Code, Codex). Treats context formation, not tokens, as the expensive resource: schedules tasks across provider windows, tracks session lifecycle on a kanban board, and serves a phone UI (via an embedded server + Cloudflare tunnel) so you can answer an agent's question from anywhere.
- **yams** (yet-another-memory-solution) — a self-optimizing memory system for coding agents that independent AI agents build and grade autonomously. A builder and a referee run as git worktrees; the referee scores on a held-out split it never reveals, with a deterministic Go companion and a frozen baseline.

### Archived

- [agent-sandbox](https://github.com/jdeworks/agent-sandbox) — isolated Docker sandbox for AI coding agents (Claude Code, OpenCode, Cursor CLI, Copilot) across 15 language runtimes.
- [get-me-started](https://github.com/jdeworks/get-me-started) — guided complete beginners from zero to a working website setup using AI.
- [make-a-website](https://github.com/jdeworks/make-a-website) — early starter kit for AI-assisted website projects, superseded by [project-starter-kit](https://github.com/jdeworks/project-starter-kit).

## Tech

`Python` `TypeScript` `JavaScript` `C#` `React` `FastAPI` `Docker` `Tailwind CSS` `Azure`

## Links

- [jdeworks.org](https://jdeworks.org) — the hub for all hosted apps.
- [jdeworks.github.io](https://jdeworks.github.io) — personal site: same content, a different look every page load (shuffle layouts, double-click the combo label for the picker, and the Code Editor layout hides a second easter egg).
- [GitHub](https://github.com/jdeworks)
