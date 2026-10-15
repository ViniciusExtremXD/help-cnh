import logoLight from "../assets/brand/logo-light.webp";
import logoDark from "../assets/brand/logo-dark.webp";

/** Official logo. `onDark` uses the white-lettering version. */
export function Logo({ onDark = false, className = "h-11" }: { onDark?: boolean; className?: string }) {
  return (
    <img
      src={onDark ? logoDark : logoLight}
      alt="Help Soluções em CNH"
      width={488}
      height={200}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
