import type { ReactNode } from "react";
import { ArrowRight, WhatsappLogo, type Icon as PhosphorIcon } from "@phosphor-icons/react";

type Variant = "primary" | "dark" | "outline" | "outline-light";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-500 text-navy-900 hover:bg-brand-400 shadow-[0_8px_24px_-10px_rgba(10,207,125,0.7)]",
  dark: "bg-navy-900 text-white hover:bg-navy-700",
  outline: "border border-slate-300 bg-white text-navy-900 hover:border-navy-900",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
};

const SIZES = {
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-[15px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  icon = "arrow",
  external,
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZES;
  icon?: "arrow" | "whatsapp" | PhosphorIcon | null;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const cls = `group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const lead =
    icon === "whatsapp" ? (
      <WhatsappLogo size={20} weight="fill" className="transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:scale-110" />
    ) : null;
  const TrailIcon = icon === "arrow" ? ArrowRight : icon === "whatsapp" ? null : icon;
  const trail = TrailIcon ? (
    <TrailIcon size={17} weight="bold" className="transition-transform duration-300 group-hover/btn:translate-x-1" />
  ) : null;

  const content = (
    <>
      {lead}
      <span>{children}</span>
      {trail}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
