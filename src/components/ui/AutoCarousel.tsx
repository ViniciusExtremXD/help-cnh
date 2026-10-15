import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { useInView } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type PerView = { base: number; sm?: number; lg?: number };

function usePerView(pv: PerView) {
  const get = () => {
    if (typeof window === "undefined") return pv.base;
    if (pv.lg && window.matchMedia("(min-width: 1024px)").matches) return pv.lg;
    if (pv.sm && window.matchMedia("(min-width: 640px)").matches) return pv.sm;
    return pv.base;
  };
  const [n, setN] = useState(get);
  useEffect(() => {
    const onResize = () => setN(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pv.base, pv.sm, pv.lg]);
  return n;
}

/**
 * Infinite, auto-advancing carousel. Pauses while hovered (so cards can expand) and while off-screen.
 * Supports arrows, dots and swipe.
 */
export function AutoCarousel<T>({
  items,
  render,
  getKey,
  perView = { base: 1, sm: 2, lg: 3 },
  interval = 4200,
  gap = 24,
  label,
  dark = false,
}: {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  getKey: (item: T) => string;
  perView?: PerView;
  interval?: number;
  gap?: number;
  label: string;
  dark?: boolean;
}) {
  const n = items.length;
  const visible = usePerView(perView);
  const viewport = useRef<HTMLDivElement>(null);
  const inView = useInView(viewport, { amount: 0.3 });
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(n); // start on the middle copy
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const drag = useRef({ x: 0, dx: 0, active: false });

  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    // Horizontal padding (px-3) leaves room for the hover "expand" of edge cards.
    const measure = () => setWidth(el.clientWidth - 24);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  const cardWidth = width > 0 ? (width - gap * (visible - 1)) / visible : 0;
  const step = cardWidth + gap;

  const go = useCallback((delta: number) => {
    setAnimate(true);
    setIndex((i) => i + delta);
  }, []);

  // Autoplay
  useEffect(() => {
    if (hovered || !inView) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, interval);
    return () => window.clearInterval(id);
  }, [hovered, inView, interval, go]);

  // Jump back into the middle copy without animation once a move lands on a clone.
  const onTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return; // ignore card hover transitions bubbling up
    if (index >= 2 * n || index < n) {
      setAnimate(false);
      setIndex((i) => ((i % n) + n) % n + n);
    }
  };
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, dx: 0, active: true };
  };
  const onPointerMove = (e: PointerEvent) => {
    if (drag.current.active) drag.current.dx = e.clientX - drag.current.x;
  };
  const onPointerUp = () => {
    const { dx, active } = drag.current;
    if (!active) return;
    drag.current.active = false;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const active = ((index % n) + n) % n;
  const loop = [0, 1, 2].flatMap((copy) => items.map((item, i) => ({ item, i, copy })));

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={viewport}
        className="-mx-3 -my-5 overflow-hidden px-3 py-5"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (Math.abs(drag.current.dx) > 6) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.dx = 0;
          }
        }}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex"
          onTransitionEnd={onTransitionEnd}
          style={{
            gap,
            transform: `translate3d(${-index * step}px,0,0)`,
            transition: animate ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
        >
          {loop.map(({ item, i, copy }) => (
            <div
              key={`${copy}-${getKey(item)}`}
              className="shrink-0"
              style={{ width: cardWidth || `${100 / visible}%` }}
              aria-hidden={copy !== 1}
              {...(copy !== 1 ? { inert: "" } : {})}
            >
              {render(item, i)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label={`${label}: navegação`}>
          {items.map((item, i) => (
            <button
              key={getKey(item)}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Ir para o item ${i + 1}`}
              onClick={() => go(i - active)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-8 bg-brand-500"
                  : dark
                    ? "w-2 bg-white/25 hover:bg-white/50"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {(["prev", "next"] as const).map((dir) => {
            const Icon = dir === "prev" ? CaretLeft : CaretRight;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir === "prev" ? -1 : 1)}
                aria-label={dir === "prev" ? "Anterior" : "Próximo"}
                className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                  dark
                    ? "border-white/20 text-white hover:border-white hover:bg-white hover:text-navy-900"
                    : "border-slate-300 bg-white text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
                }`}
              >
                <Icon size={18} weight="bold" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
