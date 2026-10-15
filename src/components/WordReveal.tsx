import { motion, type Variants } from "framer-motion";
import { springReveal, viewport } from "../lib/motion";

type Tag = "h1" | "h2" | "h3" | "p";

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: 45, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: springReveal(),
  },
};

/**
 * Cinematic word-by-word reveal. Wrap words in *asterisks* to paint them with the
 * emerald gradient, or in ^carets^ for the amber gradient. Use "|" for a line break.
 */
export function WordReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.06,
  muted,
  lineClassNames = [],
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Index (in words) from which words render muted. */
  muted?: number;
  /** Extra classes per "|"-separated line. */
  lineClassNames?: string[];
}) {
  const Comp = motion[as];
  let index = 0;

  return (
    <Comp
      className={`[perspective:800px] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text.replace(/[*^|]/g, "").replace(/\s+/g, " ").trim()}
    >
      {text.split("|").map((line, li) => (
        <span key={li} className={`block ${lineClassNames[li] ?? ""}`} aria-hidden>
          {line
            .trim()
            .split(/\s+/)
            .map((raw, wi) => {
              const emerald = raw.startsWith("*") || raw.endsWith("*");
              const amber = raw.startsWith("^") || raw.endsWith("^");
              const w = raw.replace(/[*^]/g, "");
              const i = index++;
              const tone = emerald
                ? "text-emerald-grad"
                : amber
                  ? "text-amber-grad"
                  : muted !== undefined && i >= muted
                    ? "text-white/55"
                    : "";
              return (
                <motion.span
                  key={`${li}-${wi}`}
                  variants={word}
                  className={`mr-[0.24em] inline-block origin-bottom will-change-transform ${tone}`}
                >
                  {w}
                </motion.span>
              );
            })}
        </span>
      ))}
    </Comp>
  );
}
