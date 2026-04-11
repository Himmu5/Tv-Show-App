import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { placeholderImage } from "../lib/imageFallback";
import { ScheduleRailItem } from "../Models/schedule";
import SafeImage from "./SafeImage";

type P = { item: ScheduleRailItem };

function poster(s: ScheduleRailItem["show"]): string {
  return s.image?.original || s.image?.medium || "";
}

const ScheduleShowCard: FC<P> = ({ item }) => {
  const { show } = item;
  const meta = [item.channelLabel, item.airtime || item.airdate]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      to={`/show/${item.showId}`}
      className="poster-card group w-[142px] sm:w-[164px] md:w-[184px]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        <SafeImage
          src={poster(show)}
          fallbackSrc={placeholderImage}
          fallbackVariant="poster"
          alt=""
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-crisp group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-shine opacity-95 transition-opacity duration-400 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5">
          <p className="mb-1.5 line-clamp-1 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-400 sm:text-[10px]">
            {meta}
          </p>
          <h2 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-[15px]">
            {show.name}
          </h2>
          <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-snug text-zinc-300 sm:text-xs">
            {item.episodeName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default memo(ScheduleShowCard);
