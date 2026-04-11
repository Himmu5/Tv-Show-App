import { memo, type CSSProperties } from "react";
import { placeholderImage } from "../lib/imageFallback";
import SafeImage from "./SafeImage";

type CastCardProps = {
  avatarLink: string;
  name: string;
  characterName?: string;
  /** When set (e.g. extra rows after “Show all”), card fades in with stagger. */
  revealStagger?: number;
  /** Split the row evenly (collapsed preview); fixed width when wrapping full cast. */
  fillRow?: boolean;
};

function CastCardInner({
  avatarLink,
  name,
  characterName,
  revealStagger,
  fillRow,
}: CastCardProps) {
  const staggerMs =
    revealStagger != null && revealStagger >= 0 ? revealStagger * 42 : 0;
  const useReveal =
    revealStagger != null && revealStagger >= 0
      ? "motion-safe:animate-cast-reveal"
      : "";

  const motionStyle: CSSProperties | undefined =
    useReveal !== "" ? { animationDelay: `${staggerMs}ms` } : undefined;

  const widthClass = fillRow
    ? "w-full min-w-0"
    : "w-[7.25rem] shrink-0 sm:w-32";

  return (
    <article
      className={`group ${widthClass} ${useReveal}`}
      style={motionStyle}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-950 shadow-card ring-1 ring-white/[0.06] transition duration-300 ease-crisp group-hover:ring-brand/35">
        <SafeImage
          src={avatarLink?.trim() ? avatarLink : ""}
          fallbackSrc={placeholderImage}
          fallbackVariant="person"
          alt={name}
          className="aspect-[2/3] w-full object-cover transition duration-500 ease-crisp group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <p className="mt-2.5 line-clamp-2 text-center text-[11px] font-semibold leading-snug text-zinc-200 sm:text-xs">
        {name}
      </p>
      {characterName ? (
        <p className="mt-1 line-clamp-2 text-center text-[10px] font-medium leading-snug text-zinc-500 sm:text-[11px]">
          <span className="font-normal text-zinc-600">as </span>
          {characterName}
        </p>
      ) : null}
    </article>
  );
}

const CastCard = memo(CastCardInner);
export default CastCard;
