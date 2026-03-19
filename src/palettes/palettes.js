// Color palettes inspired by make-it-look-good's Tailwind color system.
// Each palette uses a primary accent from Tailwind's color wheel with
// a matching neutral and gradient companion (one step away on the wheel).
//
// To add a new palette: add an object to this array.
// Fields: name, bg, bg2, fg, fg2, accent, accent2, card, border, gradient (optional CSS gradient)

export const PALETTES = [
  // ─── Dark palettes (Tailwind-based) ────────────────

  // Sky
  { name: "Sky",       bg: "#0c1929", bg2: "#14243d", fg: "#e0f2fe", fg2: "#7dd3fc", accent: "#38bdf8", accent2: "#0ea5e9", card: "#14243d", border: "#1e3a5f",
    gradient: "radial-gradient(ellipse at 20% 40%, rgba(56,189,248,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(14,165,233,0.06) 0%, transparent 50%)" },

  // Emerald
  { name: "Emerald",   bg: "#022c22", bg2: "#064e3b", fg: "#ecfdf5", fg2: "#6ee7b7", accent: "#34d399", accent2: "#10b981", card: "#064e3b", border: "#065f46",
    gradient: "radial-gradient(ellipse at 30% 50%, rgba(52,211,153,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(16,185,129,0.06) 0%, transparent 50%)" },

  // Orange
  { name: "Orange",    bg: "#1c1917", bg2: "#292524", fg: "#fff7ed", fg2: "#fdba74", accent: "#f97316", accent2: "#ea580c", card: "#292524", border: "#44403c",
    gradient: "radial-gradient(ellipse at 25% 30%, rgba(249,115,22,0.08) 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(234,88,12,0.06) 0%, transparent 50%)" },

  // Indigo
  { name: "Indigo",    bg: "#1e1b4b", bg2: "#312e81", fg: "#eef2ff", fg2: "#a5b4fc", accent: "#818cf8", accent2: "#6366f1", card: "#312e81", border: "#3730a3",
    gradient: "radial-gradient(ellipse at 20% 50%, rgba(129,140,248,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.08) 0%, transparent 50%)" },

  // Rose
  { name: "Rose",      bg: "#1a0a14", bg2: "#2d1526", fg: "#fff1f2", fg2: "#fda4af", accent: "#fb7185", accent2: "#e11d48", card: "#2d1526", border: "#4c1d3e",
    gradient: "radial-gradient(ellipse at 30% 40%, rgba(251,113,133,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(225,29,72,0.06) 0%, transparent 50%)" },

  // Red
  { name: "Red",       bg: "#18181b", bg2: "#27272a", fg: "#fef2f2", fg2: "#fca5a5", accent: "#ef4444", accent2: "#dc2626", card: "#27272a", border: "#3f3f46",
    gradient: "radial-gradient(ellipse at 25% 45%, rgba(239,68,68,0.08) 0%, transparent 55%)" },

  // Cyan
  { name: "Cyan",      bg: "#030712", bg2: "#111827", fg: "#e0f2fe", fg2: "#7dd3fc", accent: "#06b6d4", accent2: "#0891b2", card: "#111827", border: "#1e3a5f",
    gradient: "radial-gradient(ellipse at 40% 30%, rgba(6,182,212,0.1) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(8,145,178,0.06) 0%, transparent 50%)" },

  // Amber
  { name: "Amber",     bg: "#0c0a09", bg2: "#1c1917", fg: "#fef3c7", fg2: "#fcd34d", accent: "#f59e0b", accent2: "#d97706", card: "#1c1917", border: "#44403c",
    gradient: "radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.08) 0%, transparent 55%)" },

  // Violet
  { name: "Violet",    bg: "#0a0a1a", bg2: "#14142b", fg: "#ede9fe", fg2: "#c4b5fd", accent: "#a78bfa", accent2: "#7c3aed", card: "#14142b", border: "#252545",
    gradient: "radial-gradient(ellipse at 20% 50%, rgba(167,139,250,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(124,58,237,0.07) 0%, transparent 50%)" },

  // Teal
  { name: "Teal",      bg: "#0d1f1f", bg2: "#1a3333", fg: "#e6f4f4", fg2: "#5eead4", accent: "#2dd4bf", accent2: "#14b8a6", card: "#1a3333", border: "#2d4a4a",
    gradient: "radial-gradient(ellipse at 35% 45%, rgba(45,212,191,0.08) 0%, transparent 55%)" },

  // Lime
  { name: "Lime",      bg: "#0d1f12", bg2: "#1a3320", fg: "#ecfccb", fg2: "#bef264", accent: "#a3e635", accent2: "#84cc16", card: "#1a3320", border: "#2d4a35",
    gradient: "radial-gradient(ellipse at 25% 50%, rgba(163,230,53,0.07) 0%, transparent 55%)" },

  // Fuchsia
  { name: "Fuchsia",   bg: "#1a0a1f", bg2: "#2d1533", fg: "#fdf4ff", fg2: "#e879f9", accent: "#d946ef", accent2: "#c026d3", card: "#2d1533", border: "#4c1d52",
    gradient: "radial-gradient(ellipse at 30% 40%, rgba(217,70,239,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(192,38,211,0.06) 0%, transparent 50%)" },

  // Slate (monochrome)
  { name: "Slate",     bg: "#020617", bg2: "#0f172a", fg: "#f1f5f9", fg2: "#94a3b8", accent: "#e2e8f0", accent2: "#cbd5e1", card: "#0f172a", border: "#1e293b",
    gradient: "none" },

  // Onyx (pure dark monochrome)
  { name: "Onyx",      bg: "#0a0a0a", bg2: "#171717", fg: "#ededed", fg2: "#888888", accent: "#ffffff", accent2: "#d4d4d4", card: "#171717", border: "#262626",
    gradient: "none" },

  // ─── Light palettes (Tailwind-based) ───────────────
  // bg2 and card use a tinted shade (not pure white) to stay cohesive

  // Cloud (blue)
  { name: "Cloud",     bg: "#f0f5ff", bg2: "#e8eefb", fg: "#0f172a", fg2: "#475569", accent: "#3b82f6", accent2: "#2563eb", card: "#edf2fc", border: "#cbd5e8",
    gradient: "radial-gradient(ellipse at 70% 20%, rgba(59,130,246,0.06) 0%, transparent 50%)" },

  // Mint (green)
  { name: "Mint",      bg: "#f0fdf4", bg2: "#e2f7e8", fg: "#14532d", fg2: "#166534", accent: "#16a34a", accent2: "#15803d", card: "#e6f9ec", border: "#b8d8c2",
    gradient: "radial-gradient(ellipse at 60% 30%, rgba(22,163,74,0.05) 0%, transparent 50%)" },

  // Sand (amber)
  { name: "Sand",      bg: "#fefce8", bg2: "#faf5d6", fg: "#422006", fg2: "#713f12", accent: "#ca8a04", accent2: "#a16207", card: "#fbf7dc", border: "#e5dbb8",
    gradient: "radial-gradient(ellipse at 50% 30%, rgba(202,138,4,0.05) 0%, transparent 50%)" },

  // Blush (fuchsia)
  { name: "Blush",     bg: "#fdf2f8", bg2: "#f9e4f0", fg: "#4a044e", fg2: "#86198f", accent: "#d946ef", accent2: "#a21caf", card: "#fae8f3", border: "#e8c8de",
    gradient: "radial-gradient(ellipse at 40% 30%, rgba(217,70,239,0.04) 0%, transparent 50%)" },

  // Petal (rose)
  { name: "Petal",     bg: "#fff1f2", bg2: "#fce4e6", fg: "#4c0519", fg2: "#9f1239", accent: "#e11d48", accent2: "#be123c", card: "#fde8ea", border: "#f0bfc4",
    gradient: "radial-gradient(ellipse at 60% 25%, rgba(225,29,72,0.04) 0%, transparent 50%)" },

  // Ice (cyan)
  { name: "Ice",       bg: "#f0f9ff", bg2: "#e0f2fc", fg: "#0c4a6e", fg2: "#0369a1", accent: "#0284c7", accent2: "#0369a1", card: "#e4f4fd", border: "#a8d4ef",
    gradient: "radial-gradient(ellipse at 50% 40%, rgba(2,132,199,0.05) 0%, transparent 50%)" },

  // Pearl (violet)
  { name: "Pearl",     bg: "#faf5ff", bg2: "#f0e5fc", fg: "#2e1065", fg2: "#6b21a8", accent: "#a855f7", accent2: "#9333ea", card: "#f2e9fd", border: "#d5bef0",
    gradient: "radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.04) 0%, transparent 50%)" },

  // Cream (warm neutral)
  { name: "Cream",     bg: "#fffbeb", bg2: "#f7f0d8", fg: "#1c1917", fg2: "#78716c", accent: "#d97706", accent2: "#b45309", card: "#faf3de", border: "#e0d5b8",
    gradient: "none" },

  // Stone (cool neutral)
  { name: "Stone",     bg: "#f5f5f4", bg2: "#eaeae8", fg: "#1c1917", fg2: "#57534e", accent: "#78716c", accent2: "#57534e", card: "#edeceb", border: "#d0cfcc",
    gradient: "none" },
];
