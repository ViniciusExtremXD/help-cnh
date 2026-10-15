import type { CSSProperties } from "react";
import { photoSrcSet, photoUrl } from "../../data/photos";

type PhotoProps = {
  id: string;
  alt: string;
  /** height / width; omit to keep the original crop */
  ratio?: number;
  sizes?: string;
  widths?: number[];
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
};

export function Photo({
  id,
  alt,
  ratio,
  sizes = "100vw",
  widths = [480, 768, 1080, 1440, 1920],
  className = "",
  priority = false,
  style,
}: PhotoProps) {
  return (
    <img
      src={photoUrl(id, widths[Math.min(2, widths.length - 1)], ratio)}
      srcSet={photoSrcSet(id, widths, ratio)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // @ts-expect-error fetchpriority is valid HTML but not yet typed in React 18
      fetchpriority={priority ? "high" : undefined}
      className={className}
      style={style}
    />
  );
}
