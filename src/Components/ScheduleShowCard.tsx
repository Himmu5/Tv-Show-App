import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { ScheduleRailItem } from "../Models/schedule";
import { placeholderImage } from "./ShowCard";

type P = { item: ScheduleRailItem };

function poster(s: ScheduleRailItem["show"]): string {
  return s.image?.original || s.image?.medium || placeholderImage;
}

const ScheduleShowCard: FC<P> = ({ item }) => {
  const { show } = item;
  const meta = [item.channelLabel, item.airtime || item.airdate]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      to={`/show/${item.showId}`}
      className="group relative block w-[140px] shrink-0 overflow-hidden rounded-md bg-surface-elevated shadow-card transition duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-card-hover sm:w-[160px] md:w-[180px]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
        <img
          src={poster(show)}
          alt=""
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-shine opacity-90 transition group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400 sm:text-xs">
            {meta}
          </p>
          <h2 className="line-clamp-2 text-sm font-semibold leading-tight text-white sm:text-base">
            {show.name}
          </h2>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-300 opacity-90">
            {item.episodeName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default memo(ScheduleShowCard);
