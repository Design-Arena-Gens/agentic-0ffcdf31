"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { CodeModal } from "@/components/CodeModal";
import { generateDesignTokens, generateSectionsFromVibe, type DesignTokens, type SectionConfig } from "@/lib/generator";

export default function HomePage() {
  const [vibe, setVibe] = useState<string>("modern, playful, neon gradients, glassmorphism, rounded");
  const [tokens, setTokens] = useState<DesignTokens>(() => generateDesignTokens(vibe));
  const [sections, setSections] = useState<SectionConfig[]>(() => generateSectionsFromVibe(vibe));
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("vibe-coder-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      setVibe(parsed.vibe ?? vibe);
      setTokens(parsed.tokens ?? tokens);
      setSections(parsed.sections ?? sections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("vibe-coder-state", JSON.stringify({ vibe, tokens, sections }));
  }, [vibe, tokens, sections]);

  const applyTokensToDocument = useMemo(() => {
    return (t: DesignTokens) => {
      if (typeof document === "undefined") return;
      const root = document.documentElement;
      root.style.setProperty("--background", `${t.background.h} ${t.background.s}% ${t.background.l}%`);
      root.style.setProperty("--foreground", `${t.foreground.h} ${t.foreground.s}% ${t.foreground.l}%`);
      root.style.setProperty("--muted", `${t.muted.h} ${t.muted.s}% ${t.muted.l}%`);
      root.style.setProperty("--muted-foreground", `${t.mutedForeground.h} ${t.mutedForeground.s}% ${t.mutedForeground.l}%`);
      root.style.setProperty("--primary", `${t.primary.h} ${t.primary.s}% ${t.primary.l}%`);
      root.style.setProperty("--primary-foreground", `${t.onPrimary.h} ${t.onPrimary.s}% ${t.onPrimary.l}%`);
      root.style.setProperty("--secondary", `${t.secondary.h} ${t.secondary.s}% ${t.secondary.l}%`);
      root.style.setProperty("--secondary-foreground", `${t.onSecondary.h} ${t.onSecondary.s}% ${t.onSecondary.l}%`);
      root.style.setProperty("--accent", `${t.accent.h} ${t.accent.s}% ${t.accent.l}%`);
      root.style.setProperty("--accent-foreground", `${t.onAccent.h} ${t.onAccent.s}% ${t.onAccent.l}%`);
      root.style.setProperty("--radius", `${t.radius}px`);
      document.body.style.fontFamily = `var(${t.font.cssVar})`;
    };
  }, []);

  useEffect(() => {
    applyTokensToDocument(tokens);
  }, [tokens, applyTokensToDocument]);

  return (
    <div className="app">
      <div className="panel">
        <h2 className="panel-title">Vibe Coder</h2>
        <ControlPanel
          vibe={vibe}
          tokens={tokens}
          sections={sections}
          onVibeChange={(v) => {
            setVibe(v);
            const newTokens = generateDesignTokens(v);
            setTokens(newTokens);
            const nextSections = generateSectionsFromVibe(v);
            setSections(nextSections);
          }}
          onTokensChange={setTokens}
          onSectionsChange={setSections}
          onExport={() => setShowCode(true)}
        />
      </div>
      <div className="preview">
        <div className="toolbar card">
          <span className="chip">
            <span style={{ width: 8, height: 8, borderRadius: 999, background: `hsl(${tokens.primary.h} ${tokens.primary.s}% ${tokens.primary.l}%)` }} />
            {tokens.name}
          </span>
          <div className="row">
            <button className="button ghost" onClick={() => setSections(generateSectionsFromVibe(vibe))}>Regenerate</button>
            <button className="button primary" onClick={() => setShowCode(true)}>Export Code</button>
          </div>
        </div>
        <PreviewCanvas tokens={tokens} sections={sections} />
      </div>
      <CodeModal open={showCode} onClose={() => setShowCode(false)} tokens={tokens} sections={sections} />
    </div>
  );
}

