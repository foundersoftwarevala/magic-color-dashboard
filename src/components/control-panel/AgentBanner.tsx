// @ts-nocheck
/**
 * AYRA agent banner — top hero area copied from the reference smart-dashboard
 * repo: glowing AYRA identity, AI COMMAND CENTER tagline and every agent look
 * from the repo's assets. Static banner — no sliding content.
 */
import { useState } from "react";
import { Activity, Sparkles } from "lucide-react";

import ayraAuto from "@/assets/ayra/ayra-command-cutout.png";
import ayraDefault from "@/assets/ayra/ayra-cyan.jpg";
import ayraCyanSide from "@/assets/ayra/ayra-cyan-side.jpg";
import ayraCyanJacket from "@/assets/ayra/ayra-cyan-jacket.jpg";
import ayraBraids from "@/assets/ayra/ayra-braids.jpg";
import ayraAmberSide from "@/assets/ayra/ayra-amber-side.jpg";
import ayraAmberFront from "@/assets/ayra/ayra-amber-front.jpg";
import ayraAmberProfile from "@/assets/ayra/ayra-amber-profile.jpg";
import ayraViolet from "@/assets/ayra/ayra-violet.jpg";
import ayraHeadset from "@/assets/ayra/ayra-headset.jpg";
import ayraGold from "@/assets/ayra/ayra-gold.jpg";
import ayraBob from "@/assets/ayra/ayra-bob.jpg";
import ayraCrystal from "@/assets/ayra/ayra-crystal.jpg";
import ayraVeil from "@/assets/ayra/ayra-veil.jpg";
import ayraCinematic from "@/assets/ayra/ayra-cinematic.jpg";

interface Look {
  key: string;
  name: string;
  img: string;
  hue: number;
  chroma?: number;
}

/** Auto mode shows the command-cutout, exactly like the repo's default core. */
const AUTO: Look = { key: "auto", name: "Auto", img: ayraAuto, hue: 235, chroma: 0.17 };

/** Every agent look shipped in the reference repo, with its dress glow hue. */
const LOOKS: Look[] = [
  { key: "default", name: "Cyan Classic", img: ayraDefault, hue: 235 },
  { key: "cyanSide", name: "Cyan Profile", img: ayraCyanSide, hue: 230 },
  { key: "cyanJacket", name: "Cyan Jacket", img: ayraCyanJacket, hue: 225 },
  { key: "braids", name: "Cyan Braids", img: ayraBraids, hue: 220 },
  { key: "headset", name: "Headset", img: ayraHeadset, hue: 240 },
  { key: "amberProfile", name: "Amber Glow", img: ayraAmberProfile, hue: 55 },
  { key: "amberFront", name: "Amber Armor", img: ayraAmberFront, hue: 65 },
  { key: "amberSide", name: "Amber Side", img: ayraAmberSide, hue: 60 },
  { key: "gold", name: "Gold Headpiece", img: ayraGold, hue: 85, chroma: 0.14 },
  { key: "bob", name: "Orange Bob", img: ayraBob, hue: 45 },
  { key: "violet", name: "Violet Chrome", img: ayraViolet, hue: 300 },
  { key: "crystal", name: "Purple Crystal", img: ayraCrystal, hue: 310 },
  { key: "veil", name: "Bridal Veil", img: ayraVeil, hue: 215 },
  { key: "cinematic", name: "Cinematic", img: ayraCinematic, hue: 285 },
];

const swatch = (look: Look, kind: "primary" | "accent") => {
  const c = (look.chroma ?? 0.17) * (kind === "accent" ? 0.85 : 1);
  return `oklch(${kind === "accent" ? 0.82 : 0.72} ${c.toFixed(3)} ${look.hue})`;
};

export function AgentBanner() {
  const [selected, setSelected] = useState("auto");
  const look = selected === "auto" ? AUTO : LOOKS.find((l) => l.key === selected) ?? AUTO;
  const isAuto = selected === "auto";
  const accent = swatch(look, "accent");
  const primary = swatch(look, "primary");

  return (
    <section
      aria-label="AYRA agent banner"
      className="relative overflow-hidden rounded-2xl border border-border"
      style={{
        background: "oklch(0.16 0.035 240)",
        backgroundImage:
          "radial-gradient(60% 90% at 78% 20%, color-mix(in oklab, " + accent + " 22%, transparent), transparent), radial-gradient(45% 70% at 8% 85%, color-mix(in oklab, " + primary + " 16%, transparent), transparent)",
      }}
    >
      {/* faint technical grid, like the reference scene floor */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.05 240 / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.05 240 / 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(80% 90% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative grid items-stretch gap-0 md:grid-cols-[minmax(220px,.9fr)_minmax(0,1.1fr)]">
        {/* Identity — mirrors the repo hero-identity column */}
        <div className="flex min-w-0 flex-col justify-center gap-2 p-6 md:p-8">
          <p
            className="font-mono text-4xl font-black leading-none tracking-[0.3em] md:text-5xl"
            style={{ color: primary, textShadow: `0 0 18px color-mix(in oklab, ${accent} 55%, transparent)` }}
          >
            AYRA
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/70 md:text-xs">
            AI COMMAND CENTER
          </p>
          <p aria-live="polite" className="flex items-center gap-1.5 text-xs text-white/60">
            <Activity className="h-3 w-3" style={{ color: accent }} />
            Standing by
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-widest" style={{ color: accent }}>
            <Sparkles className="h-3 w-3" />
            LOOKBOOK · {LOOKS.length} LOOKS
          </span>
          <p className="mt-2 max-w-sm text-xs text-white/55">
            Software Vala ka AI agent — abhi {look.name.toLowerCase()} look mein. Neeche kisi bhi look par tap karke badlein.
          </p>
        </div>

        {/* Featured avatar — cutout in auto, selected photo otherwise */}
        <div className="relative min-h-[280px] overflow-hidden md:min-h-[340px]">
          <img
            key={look.key}
            src={look.img}
            alt={`AYRA — ${look.name}`}
            className={
              isAuto
                ? "absolute inset-0 h-full w-full object-contain object-bottom p-4"
                : "absolute inset-0 h-full w-full object-cover object-top"
            }
            style={isAuto ? { filter: `drop-shadow(0 0 22px color-mix(in oklab, ${accent} 45%, transparent))` } : undefined}
          />
          {/* base shade, like the repo ayra-banner-shade */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, oklch(0.16 0.035 240) 0%, transparent 45%), linear-gradient(90deg, oklch(0.16 0.035 240), transparent 40%)" }}
          />
        </div>
      </div>

      {/* Look strip — every agent look, tap to switch */}
      <div className="relative border-t border-white/10 bg-black/30 px-3 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          <button
            key={AUTO.key}
            onClick={() => setSelected("auto")}
            aria-pressed={isAuto}
            className="shrink-0 rounded-lg px-2.5 py-1 font-mono text-[10px] tracking-widest transition"
            style={{
              border: `1px solid ${isAuto ? accent : "rgba(255,255,255,0.15)"}`,
              color: isAuto ? accent : "rgba(255,255,255,0.65)",
              background: isAuto ? `color-mix(in oklab, ${accent} 18%, transparent)` : "transparent",
            }}
          >
            AUTO
          </button>
          {LOOKS.map((l) => {
            const active = l.key === selected;
            return (
              <button
                key={l.key}
                onClick={() => setSelected(l.key)}
                aria-pressed={active}
                title={l.name}
                className="group relative shrink-0 overflow-hidden rounded-lg transition"
                style={{
                  outline: active ? `2px solid ${swatch(l, "accent")}` : "2px solid transparent",
                  outlineOffset: "1px",
                }}
              >
                <img
                  src={l.img}
                  alt={l.name}
                  className="h-14 w-11 object-cover object-top transition group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1 py-0.5 text-center font-mono text-[7px] uppercase tracking-wider text-white/85">
                  {l.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AgentBanner;
