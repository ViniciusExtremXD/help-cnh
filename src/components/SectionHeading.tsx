import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

export function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  text,
  align = "center",
  tone = "emerald",
}: {
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  text?: string;
  align?: "center" | "left";
  tone?: "emerald" | "amber";
}) {
  const center = align === "center";
  const toneCls =
    tone === "amber"
      ? "border-amber-400/25 bg-amber-400/[0.08] text-amber-300"
      : "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300";

  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <Reveal
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${toneCls}`}
      >
        <motion.span
          className="inline-flex"
          animate={{ rotate: [0, -14, 14, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6 }}
        >
          <Icon size={14} />
        </motion.span>
        {eyebrow}
      </Reveal>
      <WordReveal
        text={title}
        className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
      />
      {text && (
        <Reveal delay={0.35}>
          <p className={`mt-5 text-base leading-relaxed text-white/60 sm:text-lg ${center ? "mx-auto max-w-2xl" : ""}`}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}
