import type { Transition, Variants } from "framer-motion";

export const spring: Transition = { type: "spring", stiffness: 120, damping: 14, mass: 0.8 };

/** Spring for transforms; blur/opacity tween so the spring overshoot never yields blur(<0). */
export const springReveal = (delay = 0): Transition => ({
  ...spring,
  delay,
  filter: { duration: 0.55, ease: "easeOut", delay },
  opacity: { duration: 0.45, ease: "easeOut", delay },
});

export const viewport = { once: false, amount: 0.2 } as const;

/** Container that cascades its children in a fluid domino effect. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/** Default entrance physics for every element on the page. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: springReveal() },
};

export const riseWithDelay = (delay: number): Variants => ({
  hidden: rise.hidden,
  show: { ...(rise.show as object), transition: springReveal(delay) },
});

/** Card variants: default entrance plus a hover lift that children can react to. */
export const card = (delay = 0): Variants => ({
  ...riseWithDelay(delay),
  hover: { scale: 1.02, transition: { type: "spring", stiffness: 260, damping: 18 } },
});
