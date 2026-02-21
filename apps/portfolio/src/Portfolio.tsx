import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Badge } from "@neo-brutal/react";
import { colors, shadows, borders } from "@neo-brutal/tokens";
import ProfilePhotoSection from "./ProfilePhotoSection";

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
    title: "Enterprise UI Framework",
    desc: "TypeScript-based component framework with generic and discriminated union patterns. Adopted across 5+ products serving 50k+ customers.",
    tags: ["TypeScript", "React", "Design Systems", "Component Architecture"],
    color: colors.yellowLight,
    badge: "FEATURED",
    metric: "5+ products · 30% faster dev",
  },
  {
    title: "E-Commerce Platform",
    desc: "High-traffic Next.js web platform with SSR/SSG hybrid rendering, optimized state management, and 20% performance gains.",
    tags: ["Next.js", "Redux", "Redux-Saga", "Performance"],
    color: colors.mintLight,
    badge: "PRODUCTION",
    metric: "20% faster load times",
  },
  {
    title: "Research Data Viz",
    desc: "Interactive scientific data visualizations for a biomedical genomics platform. Complex datasets made explorable.",
    tags: ["D3.js", "Plotly.js", "React", "Data Visualization"],
    color: colors.lavenderLight,
    badge: "DATA VIZ",
    metric: "85% test coverage",
  },
  {
    title: "Component Library",
    desc: "Shared component library with Storybook documentation. Single source of truth for UI across multiple teams.",
    tags: ["Storybook", "Material UI", "TypeScript", "a11y"],
    color: colors.coralLight,
    badge: "OPEN SOURCE",
    metric: "WCAG compliant",
  },
];

const SKILLS = [
  {
    group: "Languages",
    color: colors.yellowLight,
    items: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS"],
  },
  {
    group: "Frontend",
    color: colors.mintLight,
    items: ["React", "Next.js", "Tailwind CSS", "Material UI"],
  },
  {
    group: "State & Data",
    color: colors.lavenderLight,
    items: ["Redux", "Redux-Saga", "REST APIs", "GraphQL"],
  },
  {
    group: "Testing",
    color: colors.pinkLight,
    items: ["Jest", "Playwright", "React Testing Library"],
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer II (Frontend)",
    company: "Kaseya",
    period: "2023 – 2025",
    desc: "Architected a TypeScript-based UI framework adopted across 5+ enterprise products serving 50,000+ customers globally. Reduced UI development time by ~30% through reusable component abstractions.",
    color: colors.yellowLight,
  },
  {
    role: "Software Engineer (Frontend)",
    company: "Frontier Communication",
    period: "2021 – 2023",
    desc: "Built high-traffic web platform with Next.js using SSR/SSG strategies. Owned state management architecture and drove 20% rendering efficiency improvements through performance optimization.",
    color: colors.mintLight,
  },
  {
    role: "Software Engineer (Frontend)",
    company: "Hitachi Vantara",
    period: "2019 – 2021",
    desc: "Engineered interactive data visualizations with D3.js and Plotly.js for a biomedical research platform. Maintained 85% test coverage and mentored 2 junior engineers.",
    color: colors.lavenderLight,
  },
];

const NAV_ITEMS = ["Work", "Skills", "Experience", "Contact"] as const;

// Tech stack items for marquee
const TECH_STACK = [
  { type: "react", label: "React" },
  { type: "typescript", label: "TypeScript" },
  { type: "nextjs", label: "Next.js" },
  { type: "javascript", label: "JavaScript" },
  { type: "redux", label: "Redux" },
  { type: "tailwind", label: "Tailwind" },
  { type: "nodejs", label: "Node.js" },
  { type: "graphql", label: "GraphQL" },
  { type: "d3", label: "D3.js" },
  { type: "jest", label: "Jest" },
];

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
    navigator.clipboard.writeText("sanketsangar.11@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render tech icon based on type
  const renderTechIcon = (type: string) => {
    switch (type) {
      case "react":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.5" fill={colors.black} />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke={colors.black} strokeWidth="1.5" fill="none" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke={colors.black} strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke={colors.black} strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
          </svg>
        );
      case "typescript":
        return (
          <div
            style={{
              width: 48,
              height: 48,
              background: colors.black,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Black Han Sans', Impact, sans-serif",
              fontSize: 20,
              color: colors.white,
              letterSpacing: "-0.02em",
            }}
          >
            TS
          </div>
        );
      case "nextjs":
        return (
          <div
            style={{
              width: 48,
              height: 48,
              background: colors.black,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Black Han Sans', Impact, sans-serif",
              fontSize: 16,
              color: colors.white,
              letterSpacing: "0.02em",
            }}
          >
            N
          </div>
        );
      case "javascript":
        return (
          <div
            style={{
              width: 48,
              height: 48,
              background: colors.yellowLight,
              border: BR(),
              borderRadius: 4,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 5,
              fontFamily: "'Black Han Sans', Impact, sans-serif",
              fontSize: 22,
              color: colors.black,
            }}
          >
            JS
          </div>
        );
      case "redux":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="3" stroke={colors.black} strokeWidth="1.5" fill={colors.lavenderLight} />
            <circle cx="6" cy="16" r="3" stroke={colors.black} strokeWidth="1.5" fill={colors.lavenderLight} />
            <circle cx="18" cy="16" r="3" stroke={colors.black} strokeWidth="1.5" fill={colors.lavenderLight} />
            <path d="M12 9V12L8 14" stroke={colors.black} strokeWidth="1.5" />
            <path d="M12 12L16 14" stroke={colors.black} strokeWidth="1.5" />
          </svg>
        );
      case "tailwind":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M6 12C6 9 8 7 12 7C16 7 17 9 17 11C17 13 16 14 14 14C12 14 11 13 11 12C11 11 12 10 14 10" stroke={colors.black} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M7 17C7 14 9 12 13 12C17 12 18 14 18 16C18 18 17 19 15 19C13 19 12 18 12 17C12 16 13 15 15 15" stroke={colors.black} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        );
      case "nodejs":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
              stroke={colors.black}
              strokeWidth="1.5"
              fill={colors.mintLight}
            />
            <path d="M12 8V16" stroke={colors.black} strokeWidth="1.5" />
            <path d="M8 10V14L12 16L16 14V10" stroke={colors.black} strokeWidth="1.5" fill="none" />
          </svg>
        );
      case "graphql":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={colors.black} strokeWidth="1.5" fill={colors.pinkLight} />
            <circle cx="12" cy="2" r="2" fill={colors.black} />
            <circle cx="22" cy="7" r="2" fill={colors.black} />
            <circle cx="22" cy="17" r="2" fill={colors.black} />
            <circle cx="12" cy="22" r="2" fill={colors.black} />
            <circle cx="2" cy="17" r="2" fill={colors.black} />
            <circle cx="2" cy="7" r="2" fill={colors.black} />
          </svg>
        );
      case "d3":
        return (
          <div
            style={{
              width: 48,
              height: 48,
              background: colors.coralLight,
              border: BR(),
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Black Han Sans', Impact, sans-serif",
              fontSize: 18,
              color: colors.black,
            }}
          >
            D3
          </div>
        );
      case "jest":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={colors.black} strokeWidth="1.5" fill={colors.coralLight} />
            <path d="M8 10L12 14L16 10" stroke={colors.black} strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="17" r="1.5" fill={colors.black} />
          </svg>
        );
      default:
        return null;
    }
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
      {/* Keyframe animations */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes cursor-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>

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
          SS<span style={{ color: colors.pink }}>.</span>DEV
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
          {/* Profile */}
          <ProfilePhotoSection />

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
            <span>Senior Software Engineer (Frontend)</span>
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
            I build scalable, high-performance web applications with React and TypeScript. 
            Specialized in frontend architecture, design systems, and performance optimization 
            for enterprise-scale products.
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
                ["7+", "Years exp."],
                ["50k+", "Users served"],
                ["5+", "Enterprise products"],
                ["30%", "Dev time saved"],
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

        {/* ── TECH STACK MARQUEE ───────────────────────────────────── */}
        <section style={{ paddingBottom: 48 }}>
          <div
            style={{
              background: colors.white,
              border: BR(),
              borderRadius: 16,
              boxShadow: SH(4),
              padding: "20px 0",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Fade edges */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 60,
                background: `linear-gradient(to right, ${colors.white}, transparent)`,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 60,
                background: `linear-gradient(to left, ${colors.white}, transparent)`,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {/* Scrolling track */}
            <div
              style={{
                display: "flex",
                gap: 40,
                animation: "marquee 25s linear infinite",
                width: "max-content",
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} style={{ display: "flex", alignItems: "center", gap: 40 }}>
                  {TECH_STACK.map((tech, i) => (
                    <div
                      key={`${setIndex}-${i}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {renderTechIcon(tech.type)}
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          fontWeight: 600,
                          opacity: 0.6,
                        }}
                      >
                        {tech.label}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
                      fontSize: 12,
                      fontWeight: 600,
                      transition: "transform 80ms, box-shadow 80ms",
                      userSelect: "none",
                    }}
                  >
                    <span style={{ flex: 1, textAlign: "left" }}>
                      {copied ? "✓  Copied!" : "sanketsangar.11@gmail.com"}
                    </span>
                    <span style={{ opacity: 0.5 }}>⎘</span>
                  </button>

                  <div style={{ display: "flex", gap: 8 }}>
                    {(
                      [
                        ["GitHub", "⌥", colors.mint, "https://github.com/"],
                        ["Twitter", "𝕏", colors.lavender, "https://twitter.com/"],
                        ["LinkedIn", "in", colors.coral, "https://www.linkedin.com/in/sanket-sangar/"],
                      ] as [string, string, string, string][]
                    ).map(([label, icon, color, url]) => (
                      <button
                        key={label}
                        onClick={() => window.open(url, "_blank")}
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
            SS<span style={{ color: colors.pink }}>.</span>DEV
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