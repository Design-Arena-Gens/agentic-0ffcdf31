"use client";

import React, { useMemo, useState } from "react";
import type { DesignTokens, SectionConfig } from "@/lib/generator";
import { toCssVariables } from "@/lib/generator";

type Props = {
  open: boolean;
  onClose: () => void;
  tokens: DesignTokens;
  sections: SectionConfig[];
};

export function CodeModal({ open, onClose, tokens, sections }: Props) {
  const [copied, setCopied] = useState<string>("");

  const cssCode = useMemo(() => toCssVariables(tokens), [tokens]);
  const reactCode = useMemo(() => generateReactPageCode(tokens, sections), [tokens, sections]);

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "hsl(0 0% 0% / 40%)",
        display: "grid",
        placeItems: "center",
        padding: 20,
        zIndex: 100
      }}
      onClick={onClose}
    >
      <div className="card" style={{ width: "min(100%, 980px)", maxHeight: "90vh", overflow: "auto", padding: 16 }} onClick={(e) => e.stopPropagation()}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700 }}>Export code</div>
          <button className="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="field" style={{ marginTop: 10 }}>
          <label className="label">React (Next.js) page</label>
          <textarea className="textarea" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", minHeight: 220 }} value={reactCode} readOnly />
          <div className="row" style={{ marginTop: 6 }}>
            <button
              className="button"
              onClick={async () => {
                await navigator.clipboard.writeText(reactCode);
                setCopied("react");
                setTimeout(() => setCopied(""), 1600);
              }}
            >
              {copied === "react" ? "Copied" : "Copy React"}
            </button>
          </div>
        </div>
        <div className="field">
          <label className="label">CSS variables</label>
          <textarea className="textarea" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", minHeight: 160 }} value={cssCode} readOnly />
          <div className="row" style={{ marginTop: 6 }}>
            <button
              className="button"
              onClick={async () => {
                await navigator.clipboard.writeText(cssCode);
                setCopied("css");
                setTimeout(() => setCopied(""), 1600);
              }}
            >
              {copied === "css" ? "Copied" : "Copy CSS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateReactPageCode(tokens: DesignTokens, sections: SectionConfig[]): string {
  const sectionBlocks = sections
    .map((s) => {
      switch (s.kind) {
        case "hero":
          return `<section style={{padding:'56px 20px'}}>
  <div style={{display:'grid',gap:12}}>
    <span style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 10px',borderRadius:999,border:'1px dashed #ddd'}}>
      <span style={{width:8,height:8,borderRadius:999,background:'hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}%)'}}/>
      ${escapeJs(tokens.name)}
    </span>
    <h1 style={{margin:0,letterSpacing:'-0.02em'}}>${escapeJs(s.title || "")}</h1>
    ${s.subtitle ? `<p style={{margin:0,opacity:.7}}>${escapeJs(s.subtitle)}</p>` : ""}
    <div style={{display:'flex',gap:10,marginTop:8}}>
      <button style={{padding:'10px 14px',borderRadius:10,border:'1px solid transparent',background:'hsl(var(--primary))',color:'hsl(var(--primary-foreground))'}}>Get started</button>
      <button style={{padding:'10px 14px',borderRadius:10,border:'1px solid #e5e5e5',background:'#fff'}}>Live demo</button>
    </div>
  </div>
</section>`;
        case "features":
          return `<section style={{padding:'40px 20px'}}>
  <h3 style={{margin:'0 0 8px'}}>${escapeJs(s.title || "Features")}</h3>
  <div style={{display:'grid',gridTemplateColumns:'repeat(3, minmax(0, 1fr))',gap:12}}>
    ${(s.items || [])
      .map(
        (it) => `<div style={{padding:16,border:'1px solid #eaeaea',borderRadius:'var(--radius)'}}>
      <div style={{width:32,height:32,borderRadius:8,background:'hsl(var(--primary) / 20%)',border:'1px solid #e5e5e5'}} />
      <div style={{fontWeight:600,marginTop:8}}>${escapeJs(it.title)}</div>
      <div style={{opacity:.7}}>${escapeJs(it.description)}</div>
    </div>`
      )
      .join("\n")}
  </div>
</section>`;
        case "testimonials":
          return `<section style={{padding:'40px 20px'}}>
  <h3 style={{margin:'0 0 8px'}}>${escapeJs(s.title || "Testimonials")}</h3>
  <div style={{display:'grid',gridTemplateColumns:'repeat(3, minmax(0, 1fr))',gap:12}}>
    ${(s.items || [])
      .map(
        (it) => `<div style={{padding:16,border:'1px solid #eaeaea',borderRadius:12}}>
      <div style={{fontSize:18}}>${escapeJs(it.title)}</div>
      <div style={{opacity:.7}}>${escapeJs(it.description)}</div>
    </div>`
      )
      .join("\n")}
  </div>
</section>`;
        case "pricing":
          return `<section style={{padding:'40px 20px'}}>
  <h3 style={{margin:'0 0 8px'}}>${escapeJs(s.title || "Pricing")}</h3>
  <div style={{display:'grid',gridTemplateColumns:'repeat(3, minmax(0, 1fr))',gap:12}}>
    ${(s.items || [])
      .map(
        (it) => `<div style={{padding:16,border:'1px solid #eaeaea',borderRadius:12}}>
      <div style={{fontWeight:700,fontSize:18}}>${escapeJs(it.title)}</div>
      <div style={{opacity:.7}}>${escapeJs(it.description)}</div>
      <button style={{padding:'10px 14px',borderRadius:10,border:'1px solid transparent',background:'hsl(var(--primary))',color:'hsl(var(--primary-foreground))',marginTop:10}}>Choose</button>
    </div>`
      )
      .join("\n")}
  </div>
</section>`;
        case "cta":
          return `<section style={{padding:'40px 20px'}}>
  <div style={{padding:24,border:'1px solid #e5e5e5',borderRadius:12,background:'hsl(var(--primary) / 10%)'}}>
    <div style={{fontWeight:700,fontSize:20}}>${escapeJs(s.title || "")}</div>
    ${s.subtitle ? `<div style={{opacity:.7}}>${escapeJs(s.subtitle)}</div>` : ""}
    <div style={{display:'flex',gap:10,marginTop:10}}>
      <button style={{padding:'10px 14px',borderRadius:10,border:'1px solid transparent',background:'hsl(var(--primary))',color:'hsl(var(--primary-foreground))'}}>Start now</button>
      <button style={{padding:'10px 14px',borderRadius:10,border:'1px solid #e5e5e5',background:'#fff'}}>Learn more</button>
    </div>
  </div>
</section>`;
        case "footer":
          return `<footer style={{padding:'30px 20px',display:'flex',justifyContent:'space-between'}}>
  <div style={{fontWeight:600}}>${escapeJs(s.title || "")}</div>
  <div style={{display:'flex',gap:10}}>
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
  </div>
</footer>`;
        default:
          return "";
      }
    })
    .join("\n\n");

  return `export default function LandingPage() {
  return (
    <div style={{fontFamily:'var(${tokens.font.cssVar})'}}>
${indent(sectionBlocks, 6)}
    </div>
  );
}`;
}

function escapeJs(s: string) {
  return s.replace(/`/g, "\\`");
}

function indent(text: string, spaces: number): string {
  return text
    .split("\n")
    .map((line) => " ".repeat(spaces) + line)
    .join("\n");
}

