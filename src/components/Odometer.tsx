import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DIGITS = Array.from({ length: 30 }, (_, i) => i % 10);

/** Digital odometer: each digit rolls through several turns before landing on its value. */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const chars = value.split("");
  let digitIndex = 0;

  return (
    <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`} aria-label={value}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) {
          return (
            <span key={i} aria-hidden className="inline-block">
              {c}
            </span>
          );
        }
        const d = Number(c);
        const order = digitIndex++;
        // Land on the third copy of the digit (two full spins).
        const target = -((20 + d) / DIGITS.length) * 100;
        return (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
            <motion.span
              className="flex flex-col"
              initial={{ y: "0%" }}
              animate={{ y: inView ? `${target}%` : "0%" }}
              transition={{
                duration: inView ? 1.8 + order * 0.25 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {DIGITS.map((n, k) => (
                <span key={k} className="block h-[1em] leading-none">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
