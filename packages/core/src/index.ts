// ─────────────────────────────────────────────────────────────────
// @neo-brutal/core — src/index.ts
// Pure TypeScript style utilities. No JSX, no framework dependency.
// These functions return plain CSSProperties-compatible objects so
// they work in React, Vue (inline styles), Angular, or vanilla JS.
// ─────────────────────────────────────────────────────────────────

import { colors, borders, shadows, typography, animation } from "@neo-brutal/tokens";
import type { ColorToken, RadiusToken, ShadowToken } from "@neo-brutal/tokens";

// Re-export tokens so consumers only need one import
export * from "@neo-brutal/tokens";

// ── Types ─────────────────────────────────────────────────────────

export interface StyleObject {
  [key: string]: string | number | undefined;
}

export interface NeoBrutalistOptions {
  bg?:          string;
  radius?:      RadiusToken;
  shadow?:      ShadowToken;
  borderColor?: string;
  borderWidth?: "thin" | "base" | "thick";
}

// ── Core style factory ────────────────────────────────────────────

/**
 * Generate the canonical neo-brutalist "card" style.
 * Returns a plain style object usable anywhere inline styles are accepted.
 *
 * @example
 * // React
 * <div style={neoBrutal({ bg: '#A8E6CF', radius: 'lg' })} />
 *
 * // Vue
 * <div :style="neoBrutal({ bg: '#A8E6CF', radius: 'lg' })" />
 */
export function neoBrutal(options: NeoBrutalistOptions = {}): StyleObject {
  const {
    bg          = colors.white,
    radius      = "lg",
    shadow      = "md",
    borderColor = borders.color,
    borderWidth = "base",
  } = options;

  return {
    background:   bg,
    border:       `${borders.width[borderWidth]} solid ${borderColor}`,
    borderRadius: borders.radii[radius],
    boxShadow:    shadows[shadow],
  };
}

/**
 * Generate the pressed/active state style — moves element to sit
 * on its shadow, creating a tactile "click" effect.
 */
export function pressedState(shadow: ShadowToken = "md"): StyleObject {
  const [x, y] = parseShadowOffset(shadows[shadow]);
  return {
    transform: `translate(${x}px, ${y}px)`,
    boxShadow: shadows.none,
  };
}

/**
 * Generate focus ring style (accessible, neo-brutalist flavored).
 */
export function focusRing(color: string = colors.yellow): StyleObject {
  return {
    outline:       `3px solid ${color}`,
    outlineOffset: "2px",
  };
}

/**
 * Button base styles — combine with a color to get a full button.
 */
export function buttonBase(
  bg: string,
  options: { size?: "sm" | "md" | "lg"; shadow?: ShadowToken } = {},
): StyleObject {
  const { size = "md", shadow = "sm" } = options;

  const sizeMap = {
    sm: { padding: "6px 14px",  fontSize: typography.fontSizes.sm,   borderRadius: borders.radii.sm },
    md: { padding: "10px 20px", fontSize: typography.fontSizes.md,   borderRadius: borders.radii.md },
    lg: { padding: "14px 28px", fontSize: typography.fontSizes.base, borderRadius: borders.radii.lg },
  };

  return {
    ...neoBrutal({ bg, shadow }),
    ...sizeMap[size],
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    gap:            "8px",
    fontFamily:     typography.fonts.body,
    fontWeight:     typography.fontWeights.bold,
    cursor:         "pointer",
    userSelect:     "none",
    whiteSpace:     "nowrap",
    transition:     `transform ${animation.durations.instant} ${animation.easings.out},
                     box-shadow ${animation.durations.instant} ${animation.easings.out}`,
  };
}

/**
 * Truncate text to a single line with ellipsis.
 */
export function truncate(): StyleObject {
  return {
    overflow:     "hidden",
    whiteSpace:   "nowrap",
    textOverflow: "ellipsis",
  };
}

/**
 * Visually hidden but accessible to screen readers.
 */
export function srOnly(): StyleObject {
  return {
    position:   "absolute",
    width:      "1px",
    height:     "1px",
    padding:    "0",
    margin:     "-1px",
    overflow:   "hidden",
    clip:       "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border:     "0",
  };
}

// ── CSS class name utilities ──────────────────────────────────────

/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to `clsx` for this design system.
 *
 * @example
 * cx("nb-btn", isActive && "nb-btn--active", className)
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

// ── Semantic color mappings ───────────────────────────────────────

export const semanticColors = {
  // Alert / status
  success: { bg: colors.mint,      border: colors.black, text: colors.black },
  warning: { bg: colors.yellow,    border: colors.black, text: colors.black },
  error:   { bg: colors.pink,      border: colors.black, text: colors.black },
  info:    { bg: colors.blueLight, border: colors.black, text: colors.black },

  // Interaction states
  hover:   { bg: colors.yellowLight },
  focus:   { outline: colors.yellow },
  active:  { bg: colors.yellow },
  disabled:{ bg: colors.gray200, text: colors.gray400, borderColor: colors.gray400 },
} as const;

// ── Internal helpers ──────────────────────────────────────────────

function parseShadowOffset(shadow: string): [number, number] {
  const match = shadow.match(/^(\d+)px\s+(\d+)px/);
  if (!match || !match[1] || !match[2]) return [0, 0];
  return [parseInt(match[1], 10), parseInt(match[2], 10)];
}
