export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex select-none items-center gap-2" aria-label="Help Soluções e CNH">
      <span
        className={`font-display font-black uppercase leading-none tracking-tighter text-white ${
          big ? "text-4xl" : "text-[1.55rem]"
        }`}
      >
        HELP
      </span>
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
      </span>
      <span
        className={`text-metal font-display font-medium leading-none tracking-tight ${big ? "text-xl" : "text-[0.95rem]"}`}
      >
        Soluções e CNH
      </span>
    </span>
  );
}
