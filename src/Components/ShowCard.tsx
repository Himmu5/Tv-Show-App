import { FC } from "react";
import { Link } from "react-router-dom";
import { Show } from "../Models/showType";
import { stripHtml } from "../lib/stripHtml";

export const placeholderImage =
  "https://wikitechlibrary.com/ezoimgfmt/i0.wp.com/wikitechlibrary.com/hub/wp-content/uploads/2022/11/entertainment-hub.webp?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2&ssl=1&w=771";

type P = { Show: Show };

function posterSrc(show: Show): string {
  return show.image?.original || show.image?.medium || placeholderImage;
}

const ShowCard: FC<P> = ({ Show: show }) => {
  const teaser = stripHtml(show.summary);
  const blurb = teaser.length > 120 ? `${teaser.slice(0, 120)}…` : teaser;
  const rating =
    show.rating?.average != null ? `${show.rating.average}/10` : null;

  return (
    <Link
      to={`/show/${show.id}`}
      className="group relative block w-[140px] shrink-0 overflow-hidden rounded-md bg-surface-elevated shadow-card transition duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-card-hover sm:w-[160px] md:w-[180px]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
        <img
          src={posterSrc(show)}
          alt=""
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-shine opacity-90 transition group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
          <h2 className="line-clamp-2 text-sm font-semibold leading-tight text-white drop-shadow-md sm:text-base">
            {show.name}
          </h2>
          {rating && (
            <p className="mt-1 text-xs font-medium text-green-400">{rating}</p>
          )}
          {blurb && (
            <p className="mt-2 line-clamp-3 text-xs leading-snug text-zinc-300 opacity-0 transition duration-200 group-hover:opacity-100">
              {blurb}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
