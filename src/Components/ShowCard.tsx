import { FC } from "react";
import { Link } from "react-router-dom";
import { placeholderImage } from "../lib/imageFallback";
import { Show } from "../Models/showType";
import { stripHtml } from "../lib/stripHtml";
import SafeImage from "./SafeImage";

export { placeholderImage } from "../lib/imageFallback";

type P = { Show: Show };

function posterSrc(show: Show): string {
  return show.image?.original || show.image?.medium || "";
}

const ShowCard: FC<P> = ({ Show: show }) => {
  const teaser = stripHtml(show.summary);
  const blurb = teaser.length > 120 ? `${teaser.slice(0, 120)}…` : teaser;
  const rating =
    show.rating?.average != null ? `${show.rating.average}` : null;

  return (
    <Link
      to={`/show/${show.id}`}
      className="poster-card group w-[142px] sm:w-[164px] md:w-[184px]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        <SafeImage
          src={posterSrc(show)}
          fallbackSrc={placeholderImage}
          fallbackVariant="poster"
          alt=""
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-crisp group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-shine opacity-95 transition-opacity duration-400 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.03] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5">
          {rating && (
            <span className="mb-1.5 inline-flex items-center rounded-md border border-amber-400/25 bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-amber-200 backdrop-blur-sm sm:text-[11px]">
              ★ {rating}
            </span>
          )}
          <h2 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-[15px]">
            {show.name}
          </h2>
          {blurb && (
            <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-zinc-300 opacity-0 transition-all duration-300 ease-crisp group-hover:translate-y-0 group-hover:opacity-100 sm:text-xs">
              {blurb}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
