# Neo//Brutal Design System

> A production-grade, framework-agnostic design system with a React adapter —

[![CI](https://github.com/your-username/neo-brutal-ds/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/neo-brutal-ds/actions)

---

## What This Demonstrates

This project is intentionally architected to showcase senior-level front-end skills:

| Skill | Where |
|---|---|
| **Design system architecture** | 3-layer token → core → component model |
| **Monorepo management** | Turborepo + npm workspaces |
| **Framework-agnostic thinking** | `@neo-brutal/tokens` works in any stack |
| **TypeScript craftsmanship** | Strict types, generics, `as const` tokens |
| **Component API design** | `forwardRef`, accessible ARIA, composition |
| **Documentation** | Storybook with autodocs + MDX |
| **CI/CD** | GitHub Actions → auto-deploy Storybook to GitHub Pages |

---

## Architecture

```
neo-brutal-ds/
├── packages/
│   ├── tokens/          @neo-brutal/tokens
│   │   ├── src/
│   │   │   └── index.ts     ← ALL design values live here
│   │   └── dist/
│   │       ├── index.js     ← JS/TS exports
│   │       ├── index.mjs
│   │       ├── index.d.ts
│   │       └── tokens.css   ← generated CSS custom properties
│   │
│   ├── core/            @neo-brutal/core
│   │   ├── src/
│   │   │   └── index.ts     ← Style utilities (no JSX)
│   │   └── dist/
│   │       └── neo-brutal.css  ← base stylesheet + utility classes
│   │
│   └── react/           @neo-brutal/react
│       └── src/
│           ├── components/  ← Button, Card, Badge, TextInput…
│           ├── hooks/       ← usePress, etc.
│           └── index.ts     ← public API barrel
│
├── apps/
│   ├── storybook/       ← docs site (React + Vite + Storybook 8)
│   └── portfolio/       ← demo app (Vite + React)
│
├── turbo.json           ← Turborepo pipeline
├── package.json         ← npm workspaces config
└── tsconfig.base.json   ← shared TS config
```

### The 3-Layer Model

```
┌─────────────────────────────────────────────┐
│  Layer 3: Framework adapters                │
│  @neo-brutal/react  (React 18 + TypeScript) │
│  @neo-brutal/vue    (future)                │
│  @neo-brutal/svelte (future)                │
└──────────────────┬──────────────────────────┘
                   │ depends on
┌──────────────────▼──────────────────────────┐
│  Layer 2: Core                              │
│  @neo-brutal/core                           │
│  Style utilities + base CSS classes         │
│  Works in: any framework or plain HTML      │
└──────────────────┬──────────────────────────┘
                   │ depends on
┌──────────────────▼──────────────────────────┐
│  Layer 1: Tokens                            │
│  @neo-brutal/tokens                         │
│  Colors, typography, spacing, shadows…      │
│  Works in: any JavaScript runtime           │
└─────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 — that's it, no other tools needed

### Install

```bash
git clone https://github.com/your-username/neo-brutal-ds
cd neo-brutal-ds
npm install
```

### Build all packages

```bash
npm run build
```
Turborepo builds packages in the correct order: `tokens` → `core` → `react`

### Run Storybook (Component Documentation)

```bash
npm run storybook
# → http://localhost:6006
```

### Run Portfolio (Demo App)

```bash
npm run portfolio
# → http://localhost:5173
```

### Typecheck everything

```bash
npm run typecheck
```

---

## Using the Packages

### In a React project

```bash
npm install @neo-brutal/react
```

```tsx
import { Button, Card, Badge, Alert } from "@neo-brutal/react";

function NowPlaying() {
  return (
    <Card bg="#FFB3C1" padding="20px" radius="xl">
      <Badge label="NOW PLAYING" color="#A8E6CF" />
      <h2>Being For The Benefit Of Mr. Kite</h2>
      <p>The Beatles</p>
      <Button label="Pause" variant="primary" icon="⏸" />
    </Card>
  );
}
```

### In a non-React project (CSS only)

```bash
npm install @neo-brutal/core
```

```css
/* In your global stylesheet */
@import "@neo-brutal/core/styles";
```

```html
<!-- Use nb-* utility classes -->
<div class="nb-card" style="background: var(--nb-color-mint)">
  <span class="nb-badge">PLAYLIST</span>
  <button class="nb-btn nb-btn--primary">Play</button>
</div>
```

### Tokens only

```bash
npm install @neo-brutal/tokens
```

```ts
import { colors, shadows, borders, typography } from "@neo-brutal/tokens";
// Full TypeScript autocomplete on all token values
```

---

## Design Principles

### 1. Hard offset shadows
```css
box-shadow: 4px 4px 0px #1A1A1A;  /* zero blur — always */
```

### 2. Thick borders
```css
border: 2.5px solid #1A1A1A;  /* on every interactive element */
```

### 3. Press animations
On `mousedown`, elements translate by `(shadowX, shadowY)` and their shadow becomes `none`.
This creates a tactile "sinking into the surface" feel.

### 4. Pastel palette on yellow
Saturated pastels (mint, lavender, coral, pink) on a bright `#F5C518` yellow background.
Black outlines everywhere, like Risograph printing.

### 5. Display type
`Black Han Sans` (uppercase, tight tracking) for headings.
`DM Sans` for body. `JetBrains Mono` for code.

---

## Package Dependency Graph

```
@neo-brutal/portfolio
  └── @neo-brutal/react
        ├── @neo-brutal/core
        │     └── @neo-brutal/tokens
        └── @neo-brutal/tokens

@neo-brutal/storybook
  └── @neo-brutal/react
        ├── @neo-brutal/core
        │     └── @neo-brutal/tokens
        └── @neo-brutal/tokens
```

Turborepo understands this graph and builds packages in the correct order automatically.

---

## Project Structure

- **`packages/tokens`** — Design tokens as TypeScript + CSS variables
- **`packages/core`** — Framework-agnostic utilities + base CSS
- **`packages/react`** — React component library (9 components)
- **`apps/storybook`** — Interactive component documentation
- **`apps/portfolio`** — Demo developer portfolio site built with the system

---

## Components

The React package includes:
- `Button` — 6 variants, 3 sizes, loading state
- `Card` — Configurable container
- `Badge` — Status labels
- `TextInput` — With icon, label, error support
- `Toggle` — Switch component
- `Checkbox` — With indeterminate state
- `Slider` — Range input
- `Alert` — 4 types (info, success, warning, error)
- `Avatar` / `AvatarGroup` — User avatars

---

## Available Scripts

```bash
npm run build            # Build all packages
npm run dev              # Run all packages in watch mode
npm run storybook        # Run Storybook docs (port 6006)
npm run portfolio        # Run portfolio demo (port 5173)
npm run build-storybook  # Build static Storybook
npm run typecheck        # Type-check all packages
npm run clean            # Clean all build artifacts
```

---

## Roadmap

- [ ] Add tests (Vitest + Testing Library)
- [ ] Accessibility audit (axe + manual testing)
- [ ] More components (Select, Modal, Tabs, Tooltip)
- [ ] `@neo-brutal/vue` adapter
- [ ] Figma token sync (Style Dictionary)
- [ ] Dark mode token layer
- [ ] `@neo-brutal/cli` scaffold tool
- [ ] Animation library (Framer Motion presets)
- [ ] Icon set

---

## Contributing

This is a learning project, but contributions are welcome! Please open an issue before starting work on major changes.

---

## License

MIT © Sanket Sangar
