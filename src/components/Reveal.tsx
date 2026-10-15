import { motion, type HTMLMotionProps } from "framer-motion";
import { rise, riseWithDelay, stagger, viewport } from "../lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** Self-triggering element: enters with the default physics when it reaches the viewport. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      variants={delay ? riseWithDelay(delay) : rise}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Self-triggering container that cascades children using the `rise` variant. */
export function Stagger({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </motion.div>
  );
}

/** Child of <Stagger>: inherits the parent's orchestration. */
export function Item({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={rise} {...rest}>
      {children}
    </motion.div>
  );
}
