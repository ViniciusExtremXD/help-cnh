import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { RevealGroup, fadeUp } from "./Reveal";

export function SectionTitle({
  kicker,
  title,
  text,
  align = "left",
  dark = false,
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <RevealGroup className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <motion.p variants={fadeUp} className={dark ? "kicker-dark" : "kicker"}>
        <span className={`h-px w-6 ${dark ? "bg-brand-400" : "bg-brand-600"}`} />
        {kicker}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-[2.6rem] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"} ${
            center ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {text}
        </motion.p>
      )}
    </RevealGroup>
  );
}
