import {
  FC,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FALLBACK_SVG_PERSON,
  FALLBACK_SVG_POSTER,
  placeholderImage,
} from "../lib/imageFallback";

export type SafeImageVariant = "poster" | "person";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
  /** If primary URL fails, try this before the embedded SVG (defaults to shared poster placeholder). */
  fallbackSrc?: string;
  /** Embedded last-resort art: wide poster vs headshot. */
  fallbackVariant?: SafeImageVariant;
};

function buildSrcChain(
  src: string | undefined | null,
  fallbackSrc: string | undefined,
  variant: SafeImageVariant
): string[] {
  const svg = variant === "person" ? FALLBACK_SVG_PERSON : FALLBACK_SVG_POSTER;
  const secondary = (fallbackSrc ?? placeholderImage).trim();
  const primary = (src ?? "").trim();

  const chain: string[] = [];
  if (primary) chain.push(primary);
  if (secondary && secondary !== primary) chain.push(secondary);
  chain.push(svg);
  return chain;
}

/**
 * Drops through primary URL → optional secondary → theme SVG if the image fails to load.
 */
const SafeImage: FC<Props> = ({
  src,
  fallbackSrc,
  fallbackVariant = "poster",
  onError,
  ...imgProps
}) => {
  const chain = useMemo(
    () => buildSrcChain(src, fallbackSrc, fallbackVariant),
    [src, fallbackSrc, fallbackVariant]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [src, fallbackSrc, fallbackVariant]);

  const safeIndex = Math.min(index, chain.length - 1);
  const currentSrc = chain[safeIndex];

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (safeIndex < chain.length - 1) {
        setIndex((i) => i + 1);
      }
      onError?.(e);
    },
    [safeIndex, chain.length, onError]
  );

  return <img {...imgProps} src={currentSrc} onError={handleError} />;
};

export default SafeImage;
