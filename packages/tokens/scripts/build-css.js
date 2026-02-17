// scripts/build-css.js
// Runs after tsup to generate the CSS variables file from token source.
// This is what makes @neo-brutal/tokens framework-agnostic —
// any project can import just the CSS without touching JS.

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// We need to require the built CJS output (tsup already ran)
const { generateCSSVariables } = require("../dist/index.js");

const css = [
  "/* ============================================================",
  "   @neo-brutal/tokens — generated CSS custom properties",
  "   DO NOT EDIT — regenerate with: pnpm build",
  "   Import in any project: @import '@neo-brutal/tokens/css'",
  "   ============================================================ */",
  "",
  generateCSSVariables(),
  "",
  "/* ── Google Fonts import (optional, include in your HTML <head>) ──",
  "   <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">",
  "   <link href=\"https://fonts.googleapis.com/css2?family=Black+Han+Sans",
  "         &family=DM+Sans:wght@400;500;600;700",
  "         &family=JetBrains+Mono:wght@400;600&display=swap\" rel=\"stylesheet\">",
  "   ── */",
].join("\n");

const outPath = path.resolve(__dirname, "../dist/tokens.css");
fs.writeFileSync(outPath, css, "utf-8");
console.log("✅  tokens.css written to", outPath);
