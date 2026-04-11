import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux/es/exports";
import LoadingSpinner from "../Components/LoadingSpinner";
import ScheduleShowCard from "../Components/ScheduleShowCard";
import ShowCard from "../Components/ShowCard";
import TVmazeCredit from "../Components/TVmazeCredit";
import { homeFeedFetchAction } from "../Redux/Action";
import {
  discoverShowsSelector,
  homeFeedSelector,
  loadingSelector,
  querySelector,
  showSelector,
} from "../Redux/Selector/shows";
import { State } from "../Redux/Store";
import { Show } from "../Models/showType";
import { stripHtml } from "../lib/stripHtml";
import { placeholderImage } from "../Components/ShowCard";

type P = {} & ReduxProps;

function heroBackdrop(show: Show | undefined): string {
  if (!show) return "";
  return show.image?.original || show.image?.medium || placeholderImage;
}

function scheduleDateLabel(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const ShowListPage: FC<P> = ({
  query,
  shows,
  loading,
  homeFeed,
  discoverShows,
  fetchHomeFeed,
}) => {
  const trimmed = query.trim();
  const featured = shows[0];
  const hasResults = shows.length > 0;
  const noMatches = trimmed.length > 0 && !loading && !hasResults;

  useEffect(() => {
    if (!trimmed) {
      fetchHomeFeed();
    }
  }, [trimmed, fetchHomeFeed]);

  return (
    <div className="min-h-screen bg-black pb-16">
      <section className="relative min-h-[52vh] w-full overflow-hidden sm:min-h-[58vh]">
        {hasResults && featured ? (
          <>
            <img
              src={heroBackdrop(featured)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top opacity-60"
            />
            <div className="absolute inset-0 bg-hero-vignette" />
            <div className="safe-pad-top relative flex min-h-[52vh] flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[58vh] sm:px-6 lg:px-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Top pick for you
              </p>
              <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
                {featured.name}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                {stripHtml(featured.summary) ||
                  "Open the title for synopsis and cast."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/show/${featured.id}`}
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  More info
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="safe-pad-top relative flex min-h-[52vh] flex-col justify-center px-4 sm:min-h-[58vh] sm:px-6 lg:px-10">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Unlimited discovery
              </p>
              <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                Find your next binge
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                Search shows, browse what&apos;s on TV and streaming today, or
                explore the catalog—powered by the{" "}
                <a
                  href="https://www.tvmaze.com/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 underline decoration-white/20 underline-offset-2 hover:text-white"
                >
                  TVmaze API
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-10">
        {loading && !hasResults && trimmed && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <LoadingSpinner className="h-10 w-10 text-brand" />
          </div>
        )}

        {noMatches && (
          <div className="rounded-lg border border-white/10 bg-surface/80 px-6 py-16 text-center backdrop-blur-sm">
            <p className="text-xl font-semibold text-white">No matches found</p>
            <p className="mt-2 text-zinc-400">
              Try another title, spelling, or broader keyword.
            </p>
          </div>
        )}

        {hasResults && (
          <section className="mt-4">
            <div className="mb-3 flex items-end justify-between gap-4">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {trimmed ? `Results for “${trimmed}”` : "Browse"}
              </h2>
              <span className="text-sm text-zinc-500">
                {shows.length} title{shows.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="row-scroll -mx-1 px-1">
              {shows.map((s) => (
                <ShowCard key={s.id} Show={s} />
              ))}
            </div>
          </section>
        )}

        {!trimmed && (
          <div className="mt-10 space-y-10">
            {homeFeed.loading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner className="h-10 w-10 text-brand" />
              </div>
            )}

            {homeFeed.error && (
              <div className="rounded-lg border border-brand/30 bg-brand/10 px-4 py-4 text-center text-sm text-red-200">
                {homeFeed.error}
              </div>
            )}

            {!homeFeed.loading && !homeFeed.error && (
              <>
                <section>
                  <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      On TV today (US)
                    </h2>
                    <span className="text-xs text-zinc-500 sm:text-sm">
                      {scheduleDateLabel()}
                    </span>
                  </div>
                  {homeFeed.tvRows.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                      No US network airings listed for this date in TVmaze.
                    </p>
                  ) : (
                    <div className="row-scroll -mx-1 px-1">
                      {homeFeed.tvRows.map((item) => (
                        <ScheduleShowCard key={item.showId} item={item} />
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      Streaming on the web today
                    </h2>
                    <span className="text-xs text-zinc-500 sm:text-sm">
                      Global & web channels
                    </span>
                  </div>
                  {homeFeed.webRows.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                      No web-channel episodes for this date.
                    </p>
                  ) : (
                    <div className="row-scroll -mx-1 px-1">
                      {homeFeed.webRows.map((item) => (
                        <ScheduleShowCard
                          key={`${item.showId}-${item.episodeName}-${item.airtime}`}
                          item={item}
                        />
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      Discover
                    </h2>
                    <span className="text-sm text-zinc-500">
                      From the show index (page 0)
                    </span>
                  </div>
                  {discoverShows.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                      Catalog preview unavailable.
                    </p>
                  ) : (
                    <div className="row-scroll -mx-1 px-1">
                      {discoverShows.map((s) => (
                        <ShowCard key={s.id} Show={s} />
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        )}

        <div className="mt-16">
          <TVmazeCredit />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  query: querySelector(state),
  shows: showSelector(state),
  loading: loadingSelector(state),
  homeFeed: homeFeedSelector(state),
  discoverShows: discoverShowsSelector(state),
});

const mapDispatchToProps = {
  fetchHomeFeed: homeFeedFetchAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(ShowListPage);
