"use client";

import React from "react";
import type { DesignTokens, SectionConfig } from "@/lib/generator";

type Props = {
  vibe: string;
  tokens: DesignTokens;
  sections: SectionConfig[];
  onVibeChange: (v: string) => void;
  onTokensChange: (t: DesignTokens) => void;
  onSectionsChange: (s: SectionConfig[]) => void;
  onExport: () => void;
};

export function ControlPanel(props: Props) {
  const { vibe, tokens, sections, onVibeChange, onTokensChange, onSectionsChange, onExport } = props;

  const update = <K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
    onTokensChange({ ...tokens, [key]: value });
  };

  return (
    <div>
      <div className="field">
        <label className="label">Vibe</label>
        <textarea
          className="textarea"
          value={vibe}
          onChange={(e) => onVibeChange(e.target.value)}
          placeholder="e.g. minimal, calm, editorial serif, soft colors"
        />
      </div>

      <div className="field">
        <label className="label">Primary color (hue)</label>
        <input
          className="input"
          type="range"
          min={0}
          max={360}
          value={tokens.primary.h}
          onChange={(e) => update("primary", { ...tokens.primary, h: Number(e.target.value) })}
        />
      </div>

      <div className="row">
        <div className="field" style={{ flex: 1 }}>
          <label className="label">Secondary hue</label>
          <input
            className="input"
            type="range"
            min={0}
            max={360}
            value={tokens.secondary.h}
            onChange={(e) => update("secondary", { ...tokens.secondary, h: Number(e.target.value) })}
          />
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label className="label">Accent hue</label>
          <input
            className="input"
            type="range"
            min={0}
            max={360}
            value={tokens.accent.h}
            onChange={(e) => update("accent", { ...tokens.accent, h: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="row">
        <div className="field" style={{ flex: 1 }}>
          <label className="label">Radius</label>
          <input
            className="input"
            type="range"
            min={4}
            max={28}
            value={tokens.radius}
            onChange={(e) => update("radius", Number(e.target.value) as any)}
          />
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label className="label">Font</label>
          <select
            className="select"
            value={tokens.font.cssVar}
            onChange={(e) =>
              update("font", {
                name:
                  e.target.value === "--font-poppins"
                    ? "Poppins"
                    : e.target.value === "--font-space-grotesk"
                    ? "Space Grotesk"
                    : e.target.value === "--font-playfair"
                    ? "Playfair Display"
                    : e.target.value === "--font-jetbrains"
                    ? "JetBrains Mono"
                    : "Inter",
                cssVar: e.target.value as any,
                cssStack: `var(${e.target.value}), system-ui, sans-serif`
              })
            }
          >
            <option value="--font-inter">Inter</option>
            <option value="--font-poppins">Poppins</option>
            <option value="--font-space-grotesk">Space Grotesk</option>
            <option value="--font-playfair">Playfair Display</option>
            <option value="--font-jetbrains">JetBrains Mono</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label">Sections</label>
        <div className="card" style={{ padding: 10 }}>
          {sections.map((s, idx) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <span className="chip" style={{ minWidth: 90, justifyContent: "center" }}>{s.kind}</span>
              <span style={{ flex: 1, color: "hsl(var(--muted-foreground))" }}>{s.title || s.subtitle || s.kind}</span>
              <button
                className="button ghost"
                onClick={() => {
                  const next = sections.slice();
                  if (idx > 0) [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                  onSectionsChange(next);
                }}
                title="Move up"
              >
                ?
              </button>
              <button
                className="button ghost"
                onClick={() => {
                  const next = sections.slice();
                  if (idx < sections.length - 1) [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                  onSectionsChange(next);
                }}
                title="Move down"
              >
                ?
              </button>
              <button
                className="button"
                onClick={() => onSectionsChange(sections.filter((x) => x.id !== s.id))}
                title="Remove"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="row" style={{ marginTop: 8 }}>
            <button
              className="button"
              onClick={() =>
                onSectionsChange([
                  ...sections,
                  { id: `features-${Date.now()}`, kind: "features", title: "New features", items: [{ title: "Item", description: "Description" }] }
                ])
              }
            >
              + Add features
            </button>
            <button className="button" onClick={onExport}>
              Export code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

