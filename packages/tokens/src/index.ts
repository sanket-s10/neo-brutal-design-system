// ─────────────────────────────────────────────────────────────────
// @neo-brutal/tokens — src/index.ts
// Single source of truth for all design decisions.
// These values power both the CSS variables and the React components.
// ─────────────────────────────────────────────────────────────────

// ── Colors ───────────────────────────────────────────────────────
export const colors = {
  // Brand accents (from neo-brutalist music UI palette)
  yellow:          "#F5C518",
  yellowLight:     "#FFF3A3",
  pink:            "#FF6B8A",
  pinkLight:       "#FFB3C1",
  mint:            "#A8E6CF",
  mintLight:       "#D4F5E9",
  lavender:        "#C5B4E3",
  lavenderLight:   "#E8DEFF",
  blue:            "#87CEEB",
  blueLight:       "#D0EDFA",
  coral:           "#FF8C6B",
  coralLight:      "#FFD4C2",
  sage:            "#B8D4B8",
  sageLight:       "#E2F0E2",
  orange:          "#FF9500",

  // Neutrals
  black:           "#1A1A1A",
  white:           "#FFFFFF",
  offWhite:        "#FAFAFA",
  gray100:         "#F5F5F5",
  gray200:         "#E0E0E0",
  gray400:         "#9E9E9E",
  gray600:         "#616161",
} as const;

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];

// ── Typography ────────────────────────────────────────────────────
export const typography = {
  fonts: {
    display: "'Black Han Sans', Impact, sans-serif",
    body:    "'DM Sans', 'Manrope', sans-serif",
    mono:    "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSizes: {
    xs:   "10px",
    sm:   "12px",
    md:   "14px",
    base: "16px",
    lg:   "18px",
    xl:   "22px",
    "2xl": "28px",
    "3xl": "36px",
    "4xl": "48px",
  },
  fontWeights: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    900,
  },
  lineHeights: {
    none:    1,
    tight:   1.1,
    snug:    1.3,
    normal:  1.5,
    relaxed: 1.75,
  },
  letterSpacings: {
    tighter: "-0.02em",
    tight:   "-0.01em",
    normal:  "0em",
    wide:    "0.04em",
    wider:   "0.08em",
    widest:  "0.12em",
  },
} as const;

// ── Spacing ───────────────────────────────────────────────────────
export const spacing = {
  0:  "0px",
  1:  "4px",
  2:  "8px",
  3:  "12px",
  4:  "16px",
  5:  "20px",
  6:  "24px",
  8:  "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export type SpacingToken = keyof typeof spacing;

// ── Borders ───────────────────────────────────────────────────────
export const borders = {
  width: {
    thin:   "1.5px",
    base:   "2.5px",
    thick:  "4px",
  },
  color:  "#1A1A1A",
  radii: {
    none:  "0px",
    sm:    "8px",
    md:    "12px",
    lg:    "14px",
    xl:    "20px",
    "2xl": "28px",
    pill:  "999px",
    full:  "50%",
  },
} as const;

export type RadiusToken = keyof typeof borders.radii;

// ── Shadows ───────────────────────────────────────────────────────
// Neo-brutalist shadows = hard offset, zero blur, solid color
export const shadows = {
  none:  "none",
  sm:    "2px 2px 0px #1A1A1A",
  md:    "4px 4px 0px #1A1A1A",
  lg:    "6px 6px 0px #1A1A1A",
  xl:    "8px 8px 0px #1A1A1A",
  inner: "inset 2px 2px 0px rgba(0,0,0,0.15)",
  // Coloured variants
  yellow: "4px 4px 0px #F5C518",
  pink:   "4px 4px 0px #FF6B8A",
  mint:   "4px 4px 0px #A8E6CF",
} as const;

export type ShadowToken = keyof typeof shadows;

// ── Animation ─────────────────────────────────────────────────────
export const animation = {
  durations: {
    instant: "80ms",
    fast:    "120ms",
    normal:  "200ms",
    slow:    "400ms",
    slower:  "700ms",
  },
  easings: {
    linear:  "linear",
    out:     "cubic-bezier(0.0, 0, 0.2, 1)",
    in:      "cubic-bezier(0.4, 0, 1, 1)",
    inOut:   "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
    spring:  "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
} as const;

// ── Breakpoints ───────────────────────────────────────────────────
export const breakpoints = {
  sm:   "480px",
  md:   "768px",
  lg:   "1024px",
  xl:   "1280px",
  "2xl": "1536px",
} as const;

export type BreakpointToken = keyof typeof breakpoints;

// ── Z-Index ───────────────────────────────────────────────────────
export const zIndex = {
  base:     0,
  raised:   10,
  dropdown: 100,
  sticky:   200,
  overlay:  300,
  modal:    400,
  toast:    500,
  tooltip:  600,
} as const;

// ── Token Bundle ──────────────────────────────────────────────────
const tokens = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  animation,
  breakpoints,
  zIndex,
} as const;

export type Tokens = typeof tokens;
export default tokens;

// ── CSS Variable Generator ────────────────────────────────────────
// Used at build time by scripts/build-css.js to generate tokens.css
export function generateCSSVariables(): string {
  const lines: string[] = [":root {"];

  // Colors
  for (const [key, val] of Object.entries(colors)) {
    lines.push(`  --nb-color-${kebab(key)}: ${val};`);
  }

  // Font sizes
  for (const [key, val] of Object.entries(typography.fontSizes)) {
    lines.push(`  --nb-font-size-${key}: ${val};`);
  }

  // Font weights
  for (const [key, val] of Object.entries(typography.fontWeights)) {
    lines.push(`  --nb-font-weight-${kebab(key)}: ${val};`);
  }

  // Spacing
  for (const [key, val] of Object.entries(spacing)) {
    lines.push(`  --nb-space-${key}: ${val};`);
  }

  // Border radius
  for (const [key, val] of Object.entries(borders.radii)) {
    lines.push(`  --nb-radius-${key}: ${val};`);
  }

  // Border width
  for (const [key, val] of Object.entries(borders.width)) {
    lines.push(`  --nb-border-${kebab(key)}: ${val};`);
  }

  // Shadows
  for (const [key, val] of Object.entries(shadows)) {
    lines.push(`  --nb-shadow-${key}: ${val};`);
  }

  // Animation durations
  for (const [key, val] of Object.entries(animation.durations)) {
    lines.push(`  --nb-duration-${key}: ${val};`);
  }

  lines.push("}");
  return lines.join("\n");
}

function kebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
