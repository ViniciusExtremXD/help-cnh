import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export type IconMotion = "pulse" | "shake" | "swing" | "lift" | "drive" | "pop" | "spin" | "tilt" | "flash";

const SIZES = {
  sm: { box: "h-12 w-12", core: "inset-[9px]", glyph: 20 },
  md: { box: "h-14 w-14", core: "inset-[10px]", glyph: 23 },
  lg: { box: "h-16 w-16", core: "inset-[11px]", glyph: 26 },
} as const;

// Speedometer arc from 135° to 405° (gap at the bottom), like the gauge in the logo.
const ARC = "M12.2 51.8 A28 28 0 1 1 51.8 51.8";
const TICKS = [135, 180, 225, 270, 315, 360, 405].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x1: 32 + 22 * Math.cos(r), y1: 32 + 22 * Math.sin(r), x2: 32 + 24.5 * Math.cos(r), y2: 32 + 24.5 * Math.sin(r) };
});

/** Shared gradient for every badge; render once near the root. */
export function GaugeDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="help-gauge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FF9A1A" />
          <stop offset="0.5" stopColor="#B5D334" />
          <stop offset="1" stopColor="#0ACF7D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Icon inside a mini gauge. On hover of the badge (or any `.group` ancestor) it expands,
 * the gauge sweeps to full and the glyph plays its own motion.
 */
export function IconBadge({
  icon: Icon,
  motion = "pop",
  size = "md",
  dark = false,
  className = "",
}: {
  icon: PhosphorIcon;
  motion?: IconMotion;
  size?: keyof typeof SIZES;
  dark?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <span className={`icon-badge icon-${motion} relative block shrink-0 ${s.box} ${className}`} aria-hidden>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={ARC} fill="none" strokeWidth="3.5" strokeLinecap="round" className={dark ? "stroke-white/15" : "stroke-slate-200"} />
        <path d={ARC} fill="none" strokeWidth="3.5" strokeLinecap="round" stroke="url(#help-gauge)" className="gauge-arc" />
        {TICKS.map((t, i) => (
          <line
            key={i}
            {...t}
            strokeWidth="1.6"
            strokeLinecap="round"
            className={dark ? "stroke-white/30" : "stroke-slate-300"}
          />
        ))}
        <g className="gauge-needle">
          <circle
            cx="32"
            cy="4"
            r="3.4"
            strokeWidth="1.6"
            className={dark ? "fill-white stroke-navy-900" : "fill-navy-900 stroke-white"}
          />
        </g>
      </svg>
      <span
        className={`absolute grid place-items-center rounded-full ${s.core} ${
          dark ? "bg-navy-800 text-white" : "bg-white text-navy-900 shadow-[0_2px_8px_-2px_rgba(9,18,27,0.18)]"
        }`}
      >
        <Icon size={s.glyph} weight="duotone" className="icon-glyph" />
      </span>
    </span>
  );
}
