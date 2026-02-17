// scripts/build-css.js
// Generates neo-brutal.css — the complete base stylesheet.
// Any non-React project can just import this CSS and use the
// nb-* utility classes without any JavaScript.

const fs = require("fs");
const path = require("path");

const css = `/* ============================================================
   @neo-brutal/core — neo-brutal.css
   Base stylesheet. Import once in your app entry point.
   DO NOT EDIT — regenerate with: pnpm build
   ============================================================ */

/* Import token CSS variables */
@import "@neo-brutal/tokens/css";

/* ── Reset ─────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Base ──────────────────────────────────────────────── */
body {
  font-family: var(--nb-font-body, 'DM Sans', sans-serif);
  color: var(--nb-color-black);
  background: var(--nb-color-off-white);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ── Scrollbar ─────────────────────────────────────────── */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track {
  background: var(--nb-color-gray-100);
  border: 2px solid var(--nb-color-black);
}
::-webkit-scrollbar-thumb {
  background: var(--nb-color-black);
  border-radius: 4px;
}

/* ── Selection ─────────────────────────────────────────── */
::selection {
  background: var(--nb-color-yellow);
  color: var(--nb-color-black);
}

/* ── Focus ─────────────────────────────────────────────── */
:focus-visible {
  outline: 3px solid var(--nb-color-yellow);
  outline-offset: 2px;
}

/* ── Typography utilities ──────────────────────────────── */
.nb-display {
  font-family: var(--nb-font-display, 'Black Han Sans', Impact, sans-serif);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.1;
}

.nb-body    { font-family: var(--nb-font-body, 'DM Sans', sans-serif); }
.nb-mono    { font-family: var(--nb-font-mono, 'JetBrains Mono', monospace); }
.nb-truncate { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.nb-sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0;
  margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* ── Neo-brutalist card ────────────────────────────────── */
.nb-card {
  background: var(--nb-color-white);
  border: var(--nb-border-base) solid var(--nb-color-black);
  border-radius: var(--nb-radius-lg);
  box-shadow: var(--nb-shadow-md);
}
.nb-card--sm  { border-radius: var(--nb-radius-sm); box-shadow: var(--nb-shadow-sm); }
.nb-card--lg  { border-radius: var(--nb-radius-xl); box-shadow: var(--nb-shadow-lg); }

/* ── Button base ───────────────────────────────────────── */
.nb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: var(--nb-font-body);
  font-size: var(--nb-font-size-md);
  font-weight: 700;
  border: var(--nb-border-base) solid var(--nb-color-black);
  border-radius: var(--nb-radius-md);
  box-shadow: var(--nb-shadow-sm);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  transition:
    transform 80ms cubic-bezier(0.0, 0, 0.2, 1),
    box-shadow 80ms cubic-bezier(0.0, 0, 0.2, 1);
}

.nb-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.nb-btn:disabled,
.nb-btn[aria-disabled="true"] {
  background: var(--nb-color-gray-200) !important;
  color: var(--nb-color-gray-400) !important;
  border-color: var(--nb-color-gray-400) !important;
  box-shadow: none !important;
  cursor: not-allowed;
  transform: none !important;
}

/* Button sizes */
.nb-btn--sm { padding: 6px 14px;  font-size: var(--nb-font-size-sm);   border-radius: var(--nb-radius-sm); }
.nb-btn--lg { padding: 14px 28px; font-size: var(--nb-font-size-base); border-radius: var(--nb-radius-lg); }

/* Button variants */
.nb-btn--primary   { background: var(--nb-color-mint); }
.nb-btn--secondary { background: var(--nb-color-lavender); }
.nb-btn--danger    { background: var(--nb-color-pink); }
.nb-btn--yellow    { background: var(--nb-color-yellow); }
.nb-btn--ghost     { background: transparent; box-shadow: none; }

/* ── Badge ─────────────────────────────────────────────── */
.nb-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-size: var(--nb-font-size-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: var(--nb-border-base) solid var(--nb-color-black);
  border-radius: var(--nb-radius-pill);
  box-shadow: var(--nb-shadow-sm);
  white-space: nowrap;
}

/* ── Input ─────────────────────────────────────────────── */
.nb-input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--nb-color-lavender-light);
  border: var(--nb-border-base) solid var(--nb-color-black);
  border-radius: var(--nb-radius-md);
  box-shadow: var(--nb-shadow-sm);
  font-family: var(--nb-font-body);
  font-size: var(--nb-font-size-md);
  font-weight: 500;
  transition: box-shadow var(--nb-duration-fast) var(--nb-ease-out);
}

.nb-input:focus-within {
  box-shadow: var(--nb-shadow-md);
}

.nb-input input {
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: var(--nb-color-black);
}

/* ── Divider ───────────────────────────────────────────── */
.nb-divider {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nb-divider::before,
.nb-divider::after {
  content: '';
  flex: 1;
  height: 2px;
  background: var(--nb-color-black);
}

/* ── Skeleton loader ───────────────────────────────────── */
.nb-skeleton {
  background: linear-gradient(
    90deg,
    var(--nb-color-gray-200) 25%,
    var(--nb-color-gray-100) 50%,
    var(--nb-color-gray-200) 75%
  );
  background-size: 200% 100%;
  border: 2px solid var(--nb-color-black);
  border-radius: var(--nb-radius-sm);
  animation: nb-shimmer 1.5s infinite;
}

@keyframes nb-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

const outPath = path.resolve(__dirname, "../dist/neo-brutal.css");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, css, "utf-8");
console.log("✅  neo-brutal.css written to", outPath);
