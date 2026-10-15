import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { viewport } from "../lib/motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Variant = "primary" | "glass" | "outline";

const pop = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.7, filter: "blur(6px)" },
  show: {
    opacity: 1,
    scale: [null, 1.05, 1],
    filter: "blur(0px)",
    transition: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] },
  },
  hover: { scale: 1.05, y: -3, transition: { type: "spring", stiffness: 380, damping: 16 } },
});

const iconNudge: Variants = {
  hover: { x: 6, rotate: [0, -12, 0], transition: { type: "spring", stiffness: 400, damping: 10 } },
};

const glow: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 0.45, scale: 1 },
  hover: { opacity: 0.95, scale: 1.12 },
};

const STYLES: Record<Variant, string> = {
  primary: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-obsidian",
  glass: "bg-white/[0.06] text-white backdrop-blur-xl",
  outline: "bg-obsidian/80 text-white",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  delay = 0,
  size = "lg",
  className = "",
  external,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "whatsapp" | LucideIcon | null;
  delay?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const pad = size === "lg" ? "px-7 py-4 text-[15px]" : size === "md" ? "px-5 py-3 text-sm" : "px-4 py-2 text-[13px]";
  const IconEl =
    icon === "arrow" ? (
      <ArrowRight size={18} strokeWidth={2.2} />
    ) : icon === "whatsapp" ? (
      <WhatsAppIcon size={19} />
    ) : icon ? (
      (() => {
        const I = icon;
        return <I size={18} strokeWidth={2.2} />;
      })()
    ) : null;

  const Tag = href ? motion.a : motion.button;
  const linkProps = href
    ? { href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : { type: type ?? "button" };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative inline-flex ${className}`}
    >
      <Tag
        {...linkProps}
        onClick={onClick}
        variants={pop(delay)}
        initial="hidden"
        whileInView="show"
        whileHover="hover"
        whileTap={{ scale: 0.94 }}
        viewport={viewport}
        className={`group relative inline-flex w-full items-center justify-center rounded-full font-display font-semibold tracking-tight ${
          variant === "primary" ? "animate-glow-pulse" : ""
        }`}
      >
        {/* Neon halo that intensifies on hover */}
        {variant === "primary" && (
          <motion.span
            aria-hidden
            variants={glow}
            className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-emerald-500/60 blur-xl"
          />
        )}
        {/* Border beam: rotating conic light clipped to a 1.5px ring */}
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full ${variant === "primary" ? "beam-white" : "beam-emerald"}`}
        />
        <span
          className={`relative m-[1.5px] inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full ${pad} ${STYLES[variant]} ${
            variant !== "primary" ? "ring-1 ring-inset ring-white/10" : ""
          }`}
        >
          {/* Shimmer sweep every 3s */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
          <span className="relative whitespace-nowrap">{children}</span>
          {IconEl && (
            <motion.span variants={iconNudge} className="relative inline-flex">
              <motion.span
                className="inline-flex"
                animate={icon === "arrow" ? { x: [0, 3, 0] } : { rotate: [0, -10, 10, 0] }}
                transition={{ duration: icon === "arrow" ? 1.4 : 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {IconEl}
              </motion.span>
            </motion.span>
          )}
        </span>
      </Tag>
    </motion.div>
  );
}
