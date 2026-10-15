import { motion } from "framer-motion";

/** Circular path approximated with keyframes. */
const orbit = (r: number) => ({
  x: [0, r, 0, -r, 0],
  y: [-r, 0, r, 0, -r],
});

const ORBS = [
  { cls: "left-[-10%] top-[-8%] h-[38rem] w-[38rem] bg-emerald-500/25", r: 90, d: 26 },
  { cls: "right-[-12%] top-[30%] h-[34rem] w-[34rem] bg-amber-500/[0.14]", r: 120, d: 32 },
  { cls: "bottom-[-14%] left-[25%] h-[40rem] w-[40rem] bg-teal-500/[0.16]", r: 100, d: 38 },
];

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian">
      {ORBS.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[140px] will-change-transform ${o.cls}`}
          animate={orbit(o.r)}
          transition={{ duration: o.d, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Cyber grid with perspective, flowing toward the viewer */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] [perspective:600px]">
        <div className="absolute inset-x-[-50%] bottom-0 h-[140%] origin-bottom animate-grid-pulse [transform:rotateX(62deg)] mask-radial">
          <div
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.22) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
      </div>

      {/* Fine top grid + vignette */}
      <div
        className="absolute inset-0 opacity-[0.35] mask-radial"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(7,10,18,0.6)_70%)]" />
    </div>
  );
}
