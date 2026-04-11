import { FC, memo, useMemo, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Episode } from "../Models/episode";
import { EpisodeListSkeleton } from "./Skeletons";
import { stripHtml } from "../lib/stripHtml";

type P = {
  episodes: Episode[];
  loading: boolean;
};

const EpisodeGuide: FC<P> = ({ episodes, loading }) => {
  const [openSeason, setOpenSeason] = useState<number | null>(null);

  const seasons = useMemo(() => {
    const map = new Map<number, Episode[]>();
    for (const ep of episodes) {
      const list = map.get(ep.season) ?? [];
      list.push(ep);
      map.set(ep.season, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.number - b.number);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [episodes]);

  if (loading) {
    return <EpisodeListSkeleton />;
  }

  if (episodes.length === 0) {
    return (
      <p className="text-sm text-zinc-500">No episode list available.</p>
    );
  }

  return (
    <div className="space-y-2.5">
      {seasons.map(([season, eps]) => {
        const isOpen = openSeason === season;
        return (
          <div
            key={season}
            className="overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950/50 shadow-inner-glow"
          >
            <button
              type="button"
              onClick={() => setOpenSeason(isOpen ? null : season)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition duration-250 ease-crisp hover:bg-white/[0.04]"
            >
              <span className="text-sm font-bold text-white sm:text-base">
                Season {season}
                <span className="ml-2 font-normal text-zinc-500">
                  · {eps.length} episode{eps.length === 1 ? "" : "s"}
                </span>
              </span>
              <IoChevronDown
                className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ease-crisp ${
                  isOpen ? "rotate-180 text-brand-bright" : ""
                }`}
                aria-hidden
              />
            </button>
            {isOpen && (
              <ul className="border-t border-white/[0.06] bg-black/20 px-1 py-2">
                {eps.map((ep) => (
                  <li
                    key={ep.id}
                    className="rounded-lg border-b border-white/[0.04] px-3 py-3.5 last:border-0 sm:flex sm:gap-5"
                  >
                    <div className="mb-2 shrink-0 font-mono text-[11px] text-zinc-500 sm:mb-0 sm:w-28 sm:pt-0.5">
                      <span className="font-bold text-zinc-400">E{ep.number}</span>
                      {ep.airdate && (
                        <span className="mt-1 block text-zinc-600">{ep.airdate}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-zinc-100">{ep.name}</p>
                      {ep.summary && (
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                          {stripHtml(ep.summary)}
                        </p>
                      )}
                      {ep.runtime != null && (
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-zinc-600">
                          {ep.runtime} min
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(EpisodeGuide);
