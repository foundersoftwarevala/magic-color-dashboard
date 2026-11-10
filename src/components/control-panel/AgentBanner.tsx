// @ts-nocheck
/**
 * AYRA agent banner — top hero area copied from the reference smart-dashboard
 * repo: glowing AYRA identity, AI COMMAND CENTER tagline and every agent look
 * from the repo's assets. Static banner — no sliding content.
 */
import { useState } from "react";
import { Activity, Sparkles } from "lucide-react";

import ayraAutoPassport from "@/assets/ayra/ayra-command-cutout-passport.png";
import ayraDefault from "@/assets/ayra/ayra-cyan-passport.jpg";
import ayraCyanSide from "@/assets/ayra/ayra-cyan-side-passport.jpg";
import ayraCyanJacket from "@/assets/ayra/ayra-cyan-jacket-passport.jpg";
import ayraBraids from "@/assets/ayra/ayra-braids-passport.jpg";
import ayraAmberSide from "@/assets/ayra/ayra-amber-side-passport.jpg";
import ayraAmberFront from "@/assets/ayra/ayra-amber-front-passport.jpg";
import ayraAmberProfile from "@/assets/ayra/ayra-amber-profile-passport.jpg";
import ayraViolet from "@/assets/ayra/ayra-violet-passport.jpg";
import ayraHeadset from "@/assets/ayra/ayra-headset-passport.jpg";
import ayraGold from "@/assets/ayra/ayra-gold-passport.jpg";
import ayraBob from "@/assets/ayra/ayra-bob-passport.jpg";
import ayraCrystal from "@/assets/ayra/ayra-crystal-passport.jpg";
import ayraVeil from "@/assets/ayra/ayra-veil-passport.jpg";
import ayraCinematic from "@/assets/ayra/ayra-cinematic-passport.jpg";
import ayraZinraPrism from "@/assets/ayra/ayra-zinra-prism-uniform.jpg.asset.json";
import ayraZinraVeil from "@/assets/ayra/ayra-zinra-veil-uniform.jpg.asset.json";
import ayraZinraHeadset from "@/assets/ayra/ayra-zinra-headset-uniform.jpg.asset.json";

interface Look {
  key: string;
  name: string;
  /** Passport-style face crop used everywhere in the banner. */
  img: string;
  hue: number;
  chroma?: number;
  imagePosition?: string;
  faceScale?: number;
}

/** Auto mode shows the command-cutout's passport face crop. */
const AUTO: Look = { key: "auto", name: "Auto", img: ayraAutoPassport, hue: 235, chroma: 0.17, imagePosition: "50% 42%", faceScale: 1.02 };

/** Every agent look shipped in the reference repo, with its dress glow hue. */
const LOOKS: Look[] = [
  { key: "default", name: "Cyan Classic", img: ayraDefault, hue: 235, imagePosition: "50% 43%", faceScale: 1 },
  { key: "cyanSide", name: "Cyan Profile", img: ayraCyanSide, hue: 230, imagePosition: "50% 43%", faceScale: 0.94 },
  { key: "cyanJacket", name: "Cyan Jacket", img: ayraCyanJacket, hue: 225, imagePosition: "50% 42%", faceScale: 1.08 },
  { key: "braids", name: "Cyan Braids", img: ayraBraids, hue: 220, imagePosition: "50% 43%", faceScale: 1.04 },
  { key: "headset", name: "Headset", img: ayraHeadset, hue: 240, imagePosition: "50% 42%", faceScale: 0.98 },
  { key: "amberProfile", name: "Amber Glow", img: ayraAmberProfile, hue: 55, imagePosition: "53% 43%", faceScale: 0.92 },
  { key: "amberFront", name: "Amber Armor", img: ayraAmberFront, hue: 65, imagePosition: "50% 52%", faceScale: 1 },
  { key: "amberSide", name: "Amber Side", img: ayraAmberSide, hue: 60, imagePosition: "50% 43%", faceScale: 1.08 },
  { key: "gold", name: "Gold Headpiece", img: ayraGold, hue: 85, chroma: 0.14, imagePosition: "50% 42%", faceScale: 1.1 },
  { key: "bob", name: "Orange Bob", img: ayraBob, hue: 45, imagePosition: "53% 42%", faceScale: 0.98 },
  { key: "violet", name: "Violet Chrome", img: ayraViolet, hue: 300, imagePosition: "51% 43%", faceScale: 1.14 },
  { key: "crystal", name: "Purple Crystal", img: ayraCrystal, hue: 310, imagePosition: "49% 42%", faceScale: 1.1 },
  { key: "veil", name: "Bridal Veil", img: ayraVeil, hue: 215, imagePosition: "50% 42%", faceScale: 1.12 },
  { key: "cinematic", name: "Cinematic", img: ayraCinematic, hue: 285, imagePosition: "50% 40%", faceScale: 0.86 },
  { key: "zinraPrism", name: "Zinra Prism", img: ayraZinraPrism.url, hue: 205, imagePosition: "50% 42%", faceScale: 0.92 },
  { key: "zinraVeil", name: "Zinra Veil", img: ayraZinraVeil.url, hue: 215, imagePosition: "50% 42%", faceScale: 0.92 },
  { key: "zinraHeadset", name: "Zinra Headset", img: ayraZinraHeadset.url, hue: 195, imagePosition: "50% 42%", faceScale: 0.92 },
];

const portraitStyle = (look: Look) => ({
  objectPosition: look.imagePosition ?? "50% 42%",
  transform: `scale(${look.faceScale ?? 1})`,
  transformOrigin: "center center",
});

const swatch = (look: Look, kind: "primary" | "accent") => {
  const c = (look.chroma ?? 0.17) * (kind === "accent" ? 0.85 : 1);
  return `oklch(${kind === "accent" ? 0.82 : 0.72} ${c.toFixed(3)} ${look.hue})`;
};

/** Live electric arcs + sparks around the avatar so the robot feels active. */
function ElectricAura({ color }: { color: string }) {
  const bolts = [
    "M150 20 L138 70 L156 92 L134 150 L150 175 L128 240",
    "M330 40 L346 96 L326 120 L352 180 L330 210 L348 270",
    "M180 300 L210 286 L232 304 L262 288 L290 306",
    "M120 120 L96 140 L112 160 L84 186",
    "M360 130 L384 150 L368 172 L396 196",
  ];
  const sparks = Array.from({ length: 14 }, (_, i) => ({
    x: 90 + ((i * 53) % 320),
    y: 30 + ((i * 89) % 280),
    d: (i * 0.37) % 2.4,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] flex justify-center">
      <style>{`
        @keyframes ayraBolt{0%,100%{opacity:0}4%{opacity:1}7%{opacity:.2}10%{opacity:.95}16%{opacity:0}}
        @keyframes ayraSpark{0%{opacity:0;transform:translate(0,0) scale(.4)}20%{opacity:1;transform:scale(1.2)}100%{opacity:0;transform:translate(6px,-22px) scale(.2)}}
        @keyframes ayraPulse{0%,100%{opacity:.35}50%{opacity:.8}}
        @keyframes ayraScan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
        @media (prefers-reduced-motion: reduce){.ayra-fx *{animation:none!important}}
      `}</style>
      <svg className="ayra-fx h-full w-auto" viewBox="0 0 480 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ayraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse cx="240" cy="170" rx="150" ry="165" fill="none" stroke={color} strokeWidth="1.5"
          style={{ animation: "ayraPulse 2.2s ease-in-out infinite" }} filter="url(#ayraGlow)" />
        {bolts.map((d, i) => (
          <g key={i} style={{ animation: `ayraBolt ${2.6 + i * 0.7}s linear ${i * 0.9}s infinite`, opacity: 0 }} filter="url(#ayraGlow)">
            <path d={d} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="white" strokeWidth="0.9" strokeLinejoin="round" />
          </g>
        ))}
        {sparks.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r="2" fill="white" filter="url(#ayraGlow)"
            style={{ transformBox: "fill-box", animation: `ayraSpark 1.8s ease-out ${s.d}s infinite`, opacity: 0, color }} stroke={color} strokeWidth="1" />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 h-1/4" style={{
        background: `linear-gradient(180deg, transparent, color-mix(in oklab, ${color} 18%, transparent), transparent)`,
        animation: "ayraScan 3.5s linear infinite",
      }} />
    </div>
  );
}

export function AgentBanner() {
  const [selected, setSelected] = useState("auto");
  const look = selected === "auto" ? AUTO : LOOKS.find((l) => l.key === selected) ?? AUTO;
  const isAuto = selected === "auto";
  const accent = swatch(look, "accent");
  const primary = swatch(look, "primary");

  return (
    <section
      aria-label="AYRA agent banner"
      className="ayra-banner @container relative overflow-hidden rounded-2xl border border-border"
      style={{
        background: "oklch(0.16 0.035 240)",
        backgroundImage:
          "radial-gradient(60% 90% at 78% 20%, color-mix(in oklab, " + accent + " 22%, transparent), transparent), radial-gradient(45% 70% at 8% 85%, color-mix(in oklab, " + primary + " 16%, transparent), transparent)",
      }}
    >
      <style>{`
        @container (max-width: 480px) {
          .ayra-banner-content { grid-template-columns: minmax(0, 1fr); }
          .ayra-banner-identity { display: none; }
          .ayra-banner-featured { aspect-ratio: 3 / 4; min-height: 0; }
        }
      `}</style>
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

      <div className="ayra-banner-content relative grid items-stretch gap-0 md:grid-cols-[minmax(220px,.9fr)_minmax(0,1.1fr)]">
        {/* Identity — mirrors the repo hero-identity column */}
        <div className="ayra-banner-identity flex min-w-0 flex-col justify-center gap-2 p-6 md:p-8">
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
            Active · Online
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-widest" style={{ color: accent }}>
            <Sparkles className="h-3 w-3" />
            LOOKBOOK · {LOOKS.length} LOOKS
          </span>
          <p className="mt-2 max-w-sm text-xs text-white/55">
            Software Vala ka AI agent — abhi {look.name.toLowerCase()} look mein. Neeche kisi bhi look par tap karke badlein.
          </p>
        </div>

        {/* Featured avatar — passport-style face photo sized to the space */}
        <div className="ayra-banner-featured relative min-h-[280px] overflow-hidden md:min-h-[340px]">
          <img
            key={look.key}
            src={look.img}
            alt={`AYRA — ${look.name}`}
            className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            style={{
              ...portraitStyle(look),
              ...(isAuto
                ? { filter: `drop-shadow(0 0 22px color-mix(in oklab, ${accent} 45%, transparent))` }
                : { boxShadow: `0 0 34px color-mix(in oklab, ${accent} 30%, transparent)` }),
            }}
          />
          <ElectricAura color={accent} />
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
        <div className="flex touch-pan-x items-center gap-2 overflow-x-auto pb-0.5">
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
                  className="h-14 w-11 object-cover transition group-hover:scale-105"
                  style={{ objectPosition: l.imagePosition ?? "50% 42%" }}
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
