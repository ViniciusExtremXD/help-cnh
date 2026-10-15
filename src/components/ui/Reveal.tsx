import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const viewport = { once: true, amount: 0.2 } as const;

/** Fades content up once when it enters the viewport. */
export function Reveal({ delay = 0, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: fadeUp.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children that use the `fadeUp` variant. */
export function RevealGroup({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={group} {...rest}>
      {children}
    </motion.div>
  );
}
