import { motion, type TargetAndTransition, type Transition, type Variants } from "framer-motion";
import { Lock, LockOpen, type LucideIcon } from "lucide-react";
import { viewport } from "../lib/motion";

export type IconKind = "shield" | "alert" | "speed" | "lock" | "radar" | "float";

const NO_GLOW = "drop-shadow(0 0 0px rgba(16,185,129,0))";

/** (A) Elastic pop entrance + card-hover jump with neon glow. */
const shell: Variants = {
  hidden: { scale: 0, rotate: -120, opacity: 0, filter: NO_GLOW },
  show: {
    scale: [null, 1.2, 1],
    rotate: 0,
    opacity: 1,
    filter: NO_GLOW,
    transition: { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] },
  },
  hover: {
    scale: 1.25,
    rotate: 8,
    filter: "drop-shadow(0 0 15px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 320, damping: 12 },
  },
};

/** Theme-specific hover reactions (layered under the shell). */
const themedHover: Record<IconKind, Variants> = {
  shield: { show: { rotate: 0 }, hover: { rotate: [0, -10, 6, 0], transition: { duration: 0.5 } } },
  alert: { show: { scale: 1 }, hover: { scale: [1, 1.15, 1], transition: { duration: 0.4, repeat: Infinity } } },
  speed: {
    show: { rotate: 0, transition: { type: "spring", stiffness: 140, damping: 12 } },
    hover: { rotate: [0, 45, 20, 60], transition: { duration: 0.7, ease: "easeOut" } },
  },
  lock: { show: { y: 0 }, hover: { y: [0, -6, 0], transition: { duration: 0.4 } } },
  radar: { show: { x: 0 }, hover: { x: [0, 3, -3, 0], transition: { duration: 0.5 } } },
  float: { show: { rotate: 0 }, hover: { rotate: [0, -12, 12, 0], transition: { duration: 0.5 } } },
};

/** (B) Continuous themed idle loops. */
const idle: Record<IconKind, { animate: TargetAndTransition; transition: Transition }> = {
  shield: { animate: { scale: [1, 1.07, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  alert: {
    animate: { rotate: [-8, 8, -8], color: ["#F59E0B", "#10B981", "#F59E0B"] },
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
  },
  speed: {
    animate: { x: [0, -0.8, 0.8, -0.6, 0.6, 0], rotate: [0, -3, 3, 0] },
    transition: { duration: 0.45, repeat: Infinity, repeatDelay: 1.4 },
  },
  lock: { animate: { y: [-4, 4, -4] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
  radar: { animate: { x: [-1.5, 1.5, -1.5] }, transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
  float: {
    animate: { y: [-3, 3, -3], rotate: [-4, 4, -4] },
    transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
  },
};

const SIZES = {
  sm: { box: "h-9 w-9 rounded-xl", icon: 18 },
  md: { box: "h-12 w-12 rounded-2xl", icon: 22 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 26 },
} as const;

export function AnimatedIcon({
  icon: Icon,
  kind = "float",
  tone = "emerald",
  size = "md",
  standalone = false,
  className = "",
}: {
  icon: LucideIcon;
  kind?: IconKind;
  tone?: "emerald" | "amber";
  size?: keyof typeof SIZES;
  /** Trigger its own entrance/hover instead of inheriting from a parent card. */
  standalone?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  const toneCls =
    tone === "amber"
      ? "border-amber-400/25 bg-amber-400/10 text-amber-400"
      : "border-emerald-400/25 bg-emerald-400/10 text-emerald-400";
  const own = standalone
    ? { initial: "hidden", whileInView: "show", whileHover: "hover", viewport }
    : {};

  return (
    <motion.div
      variants={shell}
      {...own}
      className={`relative grid shrink-0 place-items-center border ${s.box} ${toneCls} ${className}`}
    >
      {kind === "shield" && <ShockwaveRings />}
      {kind === "radar" && <RadarSweep />}
      {kind === "alert" && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-[inherit]"
          animate={{
            boxShadow: [
              "0 0 18px -4px rgba(245,158,11,.7)",
              "0 0 18px -4px rgba(16,185,129,.7)",
              "0 0 18px -4px rgba(245,158,11,.7)",
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      <motion.div variants={themedHover[kind]} className="relative">
        <motion.div animate={idle[kind].animate} transition={idle[kind].transition}>
          {kind === "lock" ? (
            <span className="relative block">
              <motion.span className="block" variants={{ show: { opacity: 1 }, hover: { opacity: 0 } }}>
                <Lock size={s.icon} strokeWidth={1.8} />
              </motion.span>
              <motion.span
                className="absolute inset-0 block"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 0 }, hover: { opacity: 1 } }}
              >
                <LockOpen size={s.icon} strokeWidth={1.8} />
              </motion.span>
            </span>
          ) : (
            <Icon size={s.icon} strokeWidth={1.8} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ShockwaveRings() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-emerald-400/70"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i }}
        />
      ))}
    </>
  );
}

function RadarSweep() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-1 overflow-hidden rounded-full">
      <span className="absolute inset-0 animate-spin-radar rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.6),transparent_32%,transparent)]" />
      <span className="absolute inset-[22%] rounded-full border border-emerald-400/30" />
    </span>
  );
}
