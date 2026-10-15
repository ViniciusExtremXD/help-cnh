import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";

type TiltCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
  intensity?: number;
  glow?: "emerald" | "amber";
  innerClassName?: string;
};

/**
 * Glass card with 3D perspective tilt, a radial spotlight that follows the cursor
 * and a border glow that lights up near the pointer.
 */
export function TiltCard({
  intensity = 7,
  glow = "emerald",
  className = "",
  innerClassName = "",
  children,
  style,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useMotionValue(-400);
  const sy = useMotionValue(-400);
  const lit = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), { stiffness: 160, damping: 16 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), { stiffness: 160, damping: 16 });
  const litSpring = useSpring(lit, { stiffness: 120, damping: 20 });

  const rgb = glow === "amber" ? "245,158,11" : "16,185,129";
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(${rgb},0.16), transparent 60%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${sx}px ${sy}px, rgba(${rgb},0.9), rgba(255,255,255,0.08) 45%, transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    sx.set(e.clientX - r.left);
    sy.set(e.clientY - r.top);
    lit.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    lit.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100, ...style }}
      className={`group relative rounded-3xl ${className}`}
      {...rest}
    >
      <div
        className={`relative h-full overflow-hidden rounded-[inherit] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${innerClassName}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotlight, opacity: litSpring }}
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
      <motion.div
        aria-hidden
        className="ring-mask pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: border, opacity: litSpring }}
      />
    </motion.div>
  );
}
