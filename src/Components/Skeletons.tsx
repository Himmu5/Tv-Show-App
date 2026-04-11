import { FC, memo } from "react";

const posterWidths =
  "w-[142px] shrink-0 sm:w-[164px] md:w-[184px]" as const;

export const PosterCardSkeleton = memo(function PosterCardSkeleton() {
  return (
    <div className={posterWidths} aria-hidden>
      <div className="skeleton aspect-[2/3] w-full rounded-xl shadow-card" />
    </div>
  );
});

type RowProps = { count?: number; label?: string };

export const PosterRowSkeleton: FC<RowProps> = memo(function PosterRowSkeleton({
  count = 10,
  label = "Loading titles",
}) {
  return (
    <div
      className="row-scroll -mx-1 px-1"
      role="status"
      aria-busy="true"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, i) => (
        <PosterCardSkeleton key={i} />
      ))}
    </div>
  );
});

export const SearchRailSkeleton = memo(function SearchRailSkeleton() {
  return (
    <section className="mt-2" role="status" aria-busy="true" aria-label="Searching">
      <span className="sr-only">Searching for shows…</span>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="skeleton h-7 w-56 rounded-lg sm:h-8 sm:w-72" />
        <div className="skeleton h-7 w-24 rounded-full sm:ml-auto" />
      </div>
      <PosterRowSkeleton count={10} label="Loading search results" />
    </section>
  );
});

export const HomeRailsSkeleton = memo(function HomeRailsSkeleton() {
  return (
    <div
      className="space-y-14 sm:space-y-16"
      role="status"
      aria-busy="true"
      aria-label="Loading home feed"
    >
      <span className="sr-only">Loading schedules and discover section…</span>
      {[0, 1, 2].map((i) => (
        <section key={i}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="skeleton h-7 w-52 rounded-lg sm:h-8 sm:w-64" />
            <div className="skeleton h-4 w-36 rounded-md sm:w-44" />
          </div>
          <PosterRowSkeleton count={i === 2 ? 8 : 12} />
        </section>
      ))}
    </div>
  );
});

type EpisodeSkelProps = { embedded?: boolean };

export const EpisodeListSkeleton = memo(function EpisodeListSkeleton({
  embedded = false,
}: EpisodeSkelProps) {
  const rows = Array.from({ length: 5 }, (_, i) => (
    <div
      key={i}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950/40"
    >
      <div className="skeleton h-14 w-full rounded-none" />
    </div>
  ));

  if (embedded) {
    return <div className="space-y-2.5">{rows}</div>;
  }

  return (
    <div
      className="space-y-2.5"
      role="status"
      aria-busy="true"
      aria-label="Loading episodes"
    >
      <span className="sr-only">Loading episode list…</span>
      {rows}
    </div>
  );
});

export const ShowDetailSkeleton = memo(function ShowDetailSkeleton() {
  return (
    <div
      className="min-h-screen bg-surface"
      role="status"
      aria-busy="true"
      aria-label="Loading show"
    >
      <span className="sr-only">Loading show details…</span>
      <div className="relative min-h-[50vh] w-full sm:min-h-[58vh]">
        <div className="skeleton absolute inset-0 min-h-[50vh] rounded-none sm:min-h-[58vh]" />
        <div className="safe-pad-top relative z-10 px-4 pt-5 sm:px-6 lg:px-10">
          <div className="skeleton h-10 w-40 rounded-full" />
        </div>
        <div className="relative z-10 flex min-h-[36vh] flex-col justify-end px-4 pb-12 pt-16 sm:min-h-[42vh] sm:px-6 lg:px-10">
          <div className="mb-3 flex flex-wrap gap-2">
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-6 w-14 rounded-full" />
          </div>
          <div className="skeleton mb-5 h-12 max-w-xl rounded-lg sm:h-14 md:h-16" />
          <div className="mb-6 flex gap-2">
            <div className="skeleton h-8 w-28 rounded-lg" />
            <div className="skeleton h-8 w-24 rounded-full" />
          </div>
          <div className="max-w-3xl space-y-3">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-[80%] rounded" />
          </div>
        </div>
      </div>
      <div className="relative z-20 -mt-6 space-y-6 px-4 sm:px-6 lg:px-10">
        <div className="panel-glass p-6 sm:p-8">
          <div className="skeleton mb-6 h-7 w-32 rounded-lg" />
          <EpisodeListSkeleton embedded />
        </div>
        <div className="panel-glass p-6 sm:p-8">
          <div className="skeleton mb-6 h-7 w-24 rounded-lg" />
          <div className="row-scroll -mx-1 px-1">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="w-[7.25rem] shrink-0 sm:w-32" aria-hidden>
                <div className="skeleton aspect-[2/3] w-full rounded-xl" />
                <div className="skeleton mx-auto mt-2.5 h-3 w-[80%] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const PeopleCardSkeleton = memo(function PeopleCardSkeleton() {
  return (
    <div
      className="flex gap-4 rounded-2xl border border-white/[0.06] bg-surface-card p-4 shadow-card"
      aria-hidden
    >
      <div className="skeleton h-28 w-[4.5rem] shrink-0 rounded-lg sm:h-32 sm:w-20" />
      <div className="min-w-0 flex-1 space-y-2 py-1">
        <div className="skeleton h-4 w-[85%] rounded" />
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton mt-3 h-3 w-20 rounded" />
      </div>
    </div>
  );
});

export const PeopleGridSkeleton = memo(function PeopleGridSkeleton() {
  return (
    <>
      <span className="sr-only">Searching people…</span>
      <ul
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="status"
        aria-busy="true"
        aria-label="Searching people"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i}>
            <PeopleCardSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
});
