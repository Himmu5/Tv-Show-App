import { FC, memo, useMemo, useState } from "react";
import { Episode } from "../Models/episode";
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
    return (
      <p className="text-sm text-zinc-500">Loading episode list…</p>
    );
  }

  if (episodes.length === 0) {
    return (
      <p className="text-sm text-zinc-500">No episode list available.</p>
    );
  }

  return (
    <div className="space-y-2">
      {seasons.map(([season, eps]) => {
        const isOpen = openSeason === season;
        return (
          <div
            key={season}
            className="overflow-hidden rounded-lg border border-white/10 bg-surface-elevated/60"
          >
            <button
              type="button"
              onClick={() => setOpenSeason(isOpen ? null : season)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/5"
            >
              <span>
                Season {season}
                <span className="ml-2 font-normal text-zinc-500">
                  ({eps.length} episode{eps.length === 1 ? "" : "s"})
                </span>
              </span>
              <span className="text-zinc-500">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <ul className="border-t border-white/10 px-2 py-2">
                {eps.map((ep) => (
                  <li
                    key={ep.id}
                    className="border-b border-white/5 px-2 py-3 last:border-0 sm:flex sm:gap-4"
                  >
                    <div className="shrink-0 text-xs text-zinc-500 sm:w-24">
                      E{ep.number}
                      {ep.airdate && (
                        <span className="mt-0.5 block text-zinc-600">
                          {ep.airdate}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-zinc-200">{ep.name}</p>
                      {ep.summary && (
                        <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                          {stripHtml(ep.summary)}
                        </p>
                      )}
                      {ep.runtime != null && (
                        <p className="mt-1 text-xs text-zinc-600">
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
