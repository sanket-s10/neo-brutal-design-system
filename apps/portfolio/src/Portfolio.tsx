import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Badge } from "@neo-brutal/react";
import { colors, shadows, borders } from "@neo-brutal/tokens";

// ── Extra primitives not yet in the lib (local to this app) ────
const SH = (n = 4, c = colors.black) => `${n}px ${n}px 0px ${c}`;
const BR = (c = colors.black, w = "2.5px") => `${w} solid ${c}`;

function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        background: color || colors.yellowLight,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 600,
        border: BR(),
        borderRadius: 6,
        boxShadow: SH(2),
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div
        style={{
          background: colors.black,
          color: colors.yellow,
          fontFamily: "'Black Han Sans', Impact, sans-serif",
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "4px 12px",
          borderRadius: 6,
          boxShadow: SH(2),
        }}
      >
        {text}
      </div>
      <div style={{ flex: 1, height: "2px", background: colors.black }} />
    </div>
  );
}

// Intersection observer hook for scroll-in animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Neo//Brutal DS",
    desc: "Framework-agnostic design system with React adapter. Turborepo monorepo, CSS custom properties, full Storybook docs.",
    tags: ["TypeScript", "React", "Turborepo", "Storybook"],
    color: colors.yellowLight,
    badge: "FEATURED",
    metric: "3 packages · 9 components",
  },
  {
    title: "Pocket Finance",
    desc: "Personal budgeting dashboard with real-time charts, category tracking, and monthly trend analysis.",
    tags: ["React", "Recharts", "Supabase", "Tailwind"],
    color: colors.mintLight,
    badge: "OPEN SOURCE",
    metric: "1.2k GitHub stars",
  },
  {
    title: "TypeForge CLI",
    desc: "Code generation CLI that scaffolds fully typed API clients from OpenAPI specs in seconds.",
    tags: ["Node.js", "TypeScript", "OpenAPI", "CLI"],
    color: colors.lavenderLight,
    badge: "v2.0",
    metric: "40k npm downloads",
  },
  {
    title: "GridMind",
    desc: "AI-powered layout tool that generates responsive CSS grid templates from rough wireframe sketches.",
    tags: ["Next.js", "OpenAI", "Canvas API", "CSS"],
    color: colors.coralLight,
    badge: "IN PROGRESS",
    metric: "Building in public",
  },
];

const SKILLS = [
  {
    group: "Languages",
    color: colors.yellowLight,
    items: ["TypeScript", "JavaScript", "Python", "CSS / Sass"],
  },
  {
    group: "Frameworks",
    color: colors.mintLight,
    items: ["React", "Next.js", "Node.js", "Vite"],
  },
  {
    group: "Tooling",
    color: colors.lavenderLight,
    items: ["Turborepo", "Storybook", "Webpack", "Jest / Vitest"],
  },
  {
    group: "Design",
    color: colors.pinkLight,
    items: ["Figma", "Design Systems", "a11y / WCAG", "CSS-in-JS"],
  },
];

const EXPERIENCE = [
  {
    role: "Senior Frontend Engineer",
    company: "Vercel",
    period: "2022 – Present",
    desc: "Led design system migration from legacy CSS to token-based architecture. Reduced bundle size by 34% and improved Lighthouse scores across all consumer products.",
    color: colors.yellowLight,
  },
  {
    role: "Frontend Engineer",
    company: "Linear",
    period: "2020 – 2022",
    desc: "Built the core issue tracking UI from scratch. Shipped keyboard-first navigation, real-time collaboration, and a custom virtualized list rendering 100k+ items.",
    color: colors.mintLight,
  },
  {
    role: "UI Engineer",
    company: "Stripe",
    period: "2018 – 2020",
    desc: "Owned the Developer Dashboard component library. Established testing conventions and accessibility standards adopted across 6 product teams.",
    color: colors.lavenderLight,
  },
];

const NAV_ITEMS = ["Work", "Skills", "Experience", "Contact"] as const;

// ═════════════════════════════════════════════════════════════════
// PORTFOLIO
// ═════════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState<string>("Work");
  const [scrolled, setScrolled]   = useState(false);
  const [copied, setCopied]       = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("sanket@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        background: colors.yellow,
        fontFamily: "'DM Sans', sans-serif",
        color: colors.black,
      }}
    >
      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? colors.white : colors.yellow,
          borderBottom: scrolled ? BR() : BR("#1A1A1A"),
          boxShadow: scrolled ? SH(3) : "none",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 200ms, box-shadow 200ms, border 200ms",
        }}
      >
        <div
          style={{
            fontFamily: "'Black Han Sans', Impact, sans-serif",
            fontSize: 18,
            letterSpacing: "0.04em",
          }}
        >
          SK<span style={{ color: colors.pink }}>.</span>DEV
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {NAV_ITEMS.map((n) => (
            <button
              key={n}
              onClick={() => setActiveNav(n)}
              style={{
                padding: "6px 14px",
                background: activeNav === n ? colors.black : "transparent",
                color: activeNav === n ? colors.yellow : colors.black,
                border: colors.black,
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: activeNav === n ? SH(2) : "none",
                transform: activeNav === n ? "translate(-1px,-1px)" : "none",
                transition: "all 100ms",
              }}
            >
              {n}
            </button>
          ))}
        </div>

        <Button label="Hire Me" variant="yellow" size="sm" icon="→" />
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{ padding: "60px 0 72px", position: "relative" }}>
          {/* Floating blob */}
          <div
            style={{
              position: "absolute",
              right: -20,
              top: 40,
              width: 120,
              height: 120,
              background: colors.mint,
              border: BR(),
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              boxShadow: SH(6),
              animation: "float 4s ease-in-out infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
            }}
          >
            🧑‍💻
          </div>

          {/* Available badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: colors.pinkLight,
              border: BR(),
              borderRadius: 999,
              padding: "6px 14px",
              boxShadow: SH(2),
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                background: "#22c55e",
                borderRadius: "50%",
                boxShadow: "0 0 0 3px rgba(34,197,94,.3)",
              }}
            />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700 }}>
              Available for work
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Black Han Sans', Impact, sans-serif",
              fontSize: "clamp(42px, 8vw, 80px)",
              lineHeight: 1,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            SANKET
            <br />
            <span
              style={{
                WebkitTextStroke: `3px ${colors.black}`,
                color: "transparent",
                textShadow: `6px 6px 0px ${colors.pink}`,
              }}
            >
              SANGAR
            </span>
          </h1>

          {/* Title tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: colors.black,
              color: colors.yellow,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: 10,
              boxShadow: SH(4, "#1A1A1A"),
              marginBottom: 24,
            }}
          >
            <span>Senior Frontend Engineer</span>
            <span
              style={{
                animation: "cursor-blink 1s infinite",
                borderRight: `2px solid ${colors.yellow}`,
                height: 18,
              }}
            />
          </div>

          <p
            style={{
              maxWidth: 520,
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1.7,
              opacity: 0.75,
              marginBottom: 32,
            }}
          >
            I build design systems and interfaces that are fast, accessible, and impossible to
            forget. Currently obsessed with monorepo architecture and component API design.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button label="View Projects" variant="primary" icon="↓" size="lg" />
            <Button label="Download CV"   variant="secondary" icon="⬇" size="lg" />
            <Button label="GitHub"        variant="ghost" icon="⌥" size="lg" />
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            {(
              [
                ["6+", "Years exp."],
                ["40k", "npm downloads"],
                ["3", "Design systems"],
                ["12", "Open source repos"],
              ] as [string, string][]
            ).map(([n, l]) => (
              <Card key={l} bg={colors.white} radius="sm" padding="14px 20px" shadow="sm">
                <div
                  style={{
                    fontFamily: "'Black Han Sans', Impact, sans-serif",
                    fontSize: 28,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    opacity: 0.55,
                    marginTop: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {l}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <section style={{ paddingBottom: 72 }}>
          <Section><SectionLabel text="Work" /></Section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: 16,
            }}
          >
            {PROJECTS.map((p, i) => (
              <Section key={p.title} delay={i * 80}>
                <Card bg={p.color} radius="lg" padding="24px" shadow="md" style={{ height: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 14,
                    }}
                  >
                    <Badge label={p.badge} color={colors.black} textColor={colors.yellow} />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        opacity: 0.5,
                        fontWeight: 600,
                      }}
                    >
                      {p.metric}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Black Han Sans', Impact, sans-serif",
                      fontSize: 22,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      marginBottom: 10,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.65,
                      opacity: 0.75,
                      marginBottom: 16,
                      fontWeight: 500,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {p.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button label="View Project" variant="primary" size="sm" icon="→" />
                    <Button label="GitHub"       variant="ghost"   size="sm" icon="⌥" />
                  </div>
                </Card>
              </Section>
            ))}
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <section style={{ paddingBottom: 72 }}>
          <Section><SectionLabel text="Skills" /></Section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {SKILLS.map((group, i) => (
              <Section key={group.group} delay={i * 60}>
                <Card bg={colors.white} radius="md" padding="20px" shadow="sm">
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: 0.45,
                      marginBottom: 12,
                    }}
                  >
                    {group.group}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {group.items.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: group.color,
                          border: BR(),
                          borderRadius: 8,
                          padding: "8px 12px",
                          boxShadow: SH(2),
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </Section>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <section style={{ paddingBottom: 72 }}>
          <Section><SectionLabel text="Experience" /></Section>
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div
              style={{
                position: "absolute",
                left: 19,
                top: 0,
                bottom: 0,
                width: "2px",
                background: colors.black,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingLeft: 52 }}>
              {EXPERIENCE.map((e, i) => (
                <Section key={e.company} delay={i * 100}>
                  <div style={{ position: "relative" }}>
                    {/* Timeline dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: -44,
                        top: 18,
                        width: 24,
                        height: 24,
                        background: e.color,
                        border: BR(),
                        borderRadius: "50%",
                        boxShadow: SH(2),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 900,
                      }}
                    >
                      {i + 1}
                    </div>
                    <Card bg={e.color} radius="md" padding="22px" shadow="sm">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 900,
                              fontSize: 17,
                            }}
                          >
                            {e.role}
                          </h3>
                          <div
                            style={{
                              fontFamily: "'Black Han Sans', Impact, sans-serif",
                              fontSize: 14,
                              letterSpacing: "0.04em",
                              marginTop: 2,
                            }}
                          >
                            {e.company}
                          </div>
                        </div>
                        <Badge label={e.period} color={colors.black} textColor={colors.yellow} />
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.75, fontWeight: 500 }}>
                        {e.desc}
                      </p>
                    </Card>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────── */}
        <section style={{ paddingBottom: 40 }}>
          <Section><SectionLabel text="Contact" /></Section>
          <Section delay={100}>
            <Card bg={colors.black} radius="xl" padding="40px" shadow="xl">
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "'Black Han Sans', Impact, sans-serif",
                      fontSize: "clamp(28px, 5vw, 48px)",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: colors.yellow,
                      lineHeight: 1.1,
                      marginBottom: 12,
                    }}
                  >
                    LET'S BUILD
                    <br />
                    SOMETHING.
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,.6)",
                      fontSize: 14,
                      fontWeight: 500,
                      maxWidth: 340,
                      lineHeight: 1.6,
                    }}
                  >
                    Open to full-time roles, contract work, and design system consulting. Always
                    happy to talk craft.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 220 }}>
                  <button
                    onClick={copyEmail}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: colors.yellow,
                      color: colors.black,
                      border: BR(),
                      borderRadius: 12,
                      padding: "14px 20px",
                      cursor: "pointer",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "transform 80ms, box-shadow 80ms",
                      userSelect: "none",
                    }}
                  >
                    <span style={{ flex: 1, textAlign: "left" }}>
                      {copied ? "✓  Copied!" : "sanket@example.com"}
                    </span>
                    <span style={{ opacity: 0.5 }}>⎘</span>
                  </button>

                  <div style={{ display: "flex", gap: 8 }}>
                    {(
                      [
                        ["GitHub",   "⌥", colors.mint],
                        ["Twitter",  "𝕏", colors.lavender],
                        ["LinkedIn", "in", colors.coral],
                      ] as [string, string, string][]
                    ).map(([label, icon, color]) => (
                      <button
                        key={label}
                        style={{
                          flex: 1,
                          padding: "10px 8px",
                          background: color,
                          border: BR(),
                          borderRadius: 10,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          boxShadow: SH(3),
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{icon}</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Section>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: BR(),
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Black Han Sans', Impact, sans-serif",
              fontSize: 16,
              letterSpacing: "0.04em",
            }}
          >
            SK<span style={{ color: colors.pink }}>.</span>DEV
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              opacity: 0.45,
            }}
          >
            Built with{" "}
            <span
              style={{
                background: colors.yellowLight,
                border: BR(),
                borderRadius: 4,
                padding: "1px 6px",
                fontWeight: 700,
                opacity: 1,
              }}
            >
              @neo-brutal/react
            </span>{" "}
            · {new Date().getFullYear()}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Badge label="React 18"      color={colors.mintLight} />
            <Badge label="TypeScript"    color={colors.lavenderLight} />
            <Badge label="Neo//Brutal DS" color={colors.yellowLight} />
          </div>
        </footer>
      </div>
    </div>
  );
}
