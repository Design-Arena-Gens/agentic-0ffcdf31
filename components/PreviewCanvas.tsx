import React from "react";
import type { DesignTokens, SectionConfig } from "@/lib/generator";

type Props = {
  tokens: DesignTokens;
  sections: SectionConfig[];
};

export function PreviewCanvas({ tokens, sections }: Props) {
  return (
    <div className="grid">
      {sections.map((s) => (
        <div className="section card" key={s.id}>
          {s.kind === "hero" && <Hero title={s.title!} subtitle={s.subtitle} tokens={tokens} />}
          {s.kind === "features" && <Features title={s.title!} items={s.items || []} tokens={tokens} />}
          {s.kind === "testimonials" && <Testimonials title={s.title!} items={s.items || []} tokens={tokens} />}
          {s.kind === "pricing" && <Pricing title={s.title!} items={s.items || []} tokens={tokens} />}
          {s.kind === "cta" && <CTA title={s.title!} subtitle={s.subtitle} tokens={tokens} />}
          {s.kind === "footer" && <Footer title={s.title!} tokens={tokens} />}
        </div>
      ))}
    </div>
  );
}

function Hero({ title, subtitle, tokens }: { title: string; subtitle?: string; tokens: DesignTokens }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <span className="chip" style={{ borderColor: `hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}% / 60%)` }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: `linear-gradient(90deg, hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}%), hsl(${tokens.accent.h} ${tokens.accent.s}% ${tokens.accent.l}%))`
          }}
        />
        Vibe preset: {tokens.name}
      </span>
      <h1
        style={{
          fontFamily: `var(${tokens.font.cssVar})`,
          letterSpacing: "-0.02em",
          fontSize: 40,
          margin: 0
        }}
      >
        {title}
      </h1>
      {subtitle && <p style={{ margin: 0, color: "hsl(var(--muted-foreground))" }}>{subtitle}</p>}
      <div className="row" style={{ marginTop: 8 }}>
        <button className="button primary">Get started</button>
        <button className="button">Live demo</button>
      </div>
    </div>
  );
}

function Features({ title, items, tokens }: { title: string; items: Array<{ title: string; description: string }>; tokens: DesignTokens }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", fontFamily: `var(${tokens.font.cssVar})` }}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {items.map((it, i) => (
          <div className="card" key={i} style={{ padding: 16, borderRadius: "var(--radius)" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}% / 20%), hsl(${tokens.secondary.h} ${tokens.secondary.s}% ${tokens.secondary.l}% / 20%))`,
                border: "1px solid hsl(0 0% 90%)"
              }}
            />
            <div style={{ fontWeight: 600, marginTop: 8 }}>{it.title}</div>
            <div style={{ color: "hsl(var(--muted-foreground))", fontSize: 14 }}>{it.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ title, items, tokens }: { title: string; items: Array<{ title: string; description: string }>; tokens: DesignTokens }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", fontFamily: `var(${tokens.font.cssVar})` }}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {items.map((it, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 18 }}>{it.title}</div>
            <div style={{ color: "hsl(var(--muted-foreground))" }}>{it.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pricing({ title, items, tokens }: { title: string; items: Array<{ title: string; description: string }>; tokens: DesignTokens }) {
  const plans = items.length
    ? items
    : [
        { title: "Free", description: "For tinkering" },
        { title: "Pro", description: "For shipping" },
        { title: "Team", description: "For collaboration" }
      ];
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", fontFamily: `var(${tokens.font.cssVar})` }}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {plans.map((p, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{p.title}</div>
            <div style={{ color: "hsl(var(--muted-foreground))" }}>{p.description}</div>
            <button className="button primary" style={{ marginTop: 10 }}>
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTA({ title, subtitle, tokens }: { title: string; subtitle?: string; tokens: DesignTokens }) {
  return (
    <div
      className="card"
      style={{
        padding: 24,
        background: `linear-gradient(135deg, hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}% / 12%), hsl(${tokens.secondary.h} ${tokens.secondary.s}% ${tokens.secondary.l}% / 12%))`,
        border: "1px solid hsl(0 0% 88%)"
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 20 }}>{title}</div>
      {subtitle && <div style={{ color: "hsl(var(--muted-foreground))" }}>{subtitle}</div>}
      <div className="row" style={{ marginTop: 10 }}>
        <button className="button primary">Start now</button>
        <button className="button">Learn more</button>
      </div>
    </div>
  );
}

function Footer({ title, tokens }: { title: string; tokens: DesignTokens }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div className="row">
        <a style={{ color: `hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}%)`, textDecoration: "none" }} href="#">
          Privacy
        </a>
        <a style={{ color: "hsl(var(--muted-foreground))", textDecoration: "none" }} href="#">
          Terms
        </a>
      </div>
    </div>
  );
}

