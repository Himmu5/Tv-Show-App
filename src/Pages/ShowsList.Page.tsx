import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux/es/exports";
import SectionHeading from "../Components/SectionHeading";
import { HomeRailsSkeleton, SearchRailSkeleton } from "../Components/Skeletons";
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
    <div className="min-h-screen bg-surface pb-20">
      <section className="relative min-h-[54vh] w-full overflow-hidden sm:min-h-[60vh]">
        {hasResults && featured ? (
          <>
            <img
              src={heroBackdrop(featured)}
              alt=""
              className="absolute inset-0 h-full w-full scale-105 object-cover object-top opacity-[0.55]"
            />
            <div className="absolute inset-0 bg-hero-vignette" />
            <div className="safe-pad-top relative flex min-h-[54vh] flex-col justify-end px-4 pb-12 pt-24 sm:min-h-[60vh] sm:px-6 lg:px-10">
              <p className="section-label mb-3">Top pick for you</p>
              <h1 className="max-w-4xl text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl md:leading-[0.92]">
                {featured.name}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                {stripHtml(featured.summary) ||
                  "Open the title for synopsis, episodes, and cast."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/show/${featured.id}`} className="btn-primary">
                  More info
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="safe-pad-top relative flex min-h-[54vh] flex-col justify-center px-4 sm:min-h-[60vh] sm:px-6 lg:px-10">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-surface to-surface" />
            <div
              className="absolute inset-0 bg-mesh-landing opacity-90"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <p className="section-label">Unlimited discovery</p>
              <h1 className="mt-4 text-balance font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                Find your next binge
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Search shows, see what&apos;s on TV and streaming today, or
                browse the catalog—data from TVmaze.
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-10">
        {loading && !hasResults && trimmed && (
          <div className="min-h-[36vh] py-6">
            <SearchRailSkeleton />
          </div>
        )}

        {noMatches && (
          <div className="panel-glass px-8 py-16 text-center">
            <p className="text-xl font-bold tracking-tight text-white">
              No matches found
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Try another title, spelling, or a shorter keyword.
            </p>
          </div>
        )}

        {hasResults && (
          <section className="mt-2">
            <SectionHeading
              title={trimmed ? `Results for “${trimmed}”` : "Browse"}
              aside={
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-400">
                  {shows.length} title{shows.length === 1 ? "" : "s"}
                </span>
              }
            />
            <div className="row-scroll -mx-1 px-1">
              {shows.map((s) => (
                <ShowCard key={s.id} Show={s} />
              ))}
            </div>
          </section>
        )}

        {!trimmed && (
          <div className="mt-12 space-y-14 sm:space-y-16">
            {homeFeed.loading && <HomeRailsSkeleton />}

            {homeFeed.error && (
              <div className="panel-glass border-red-500/20 bg-red-950/20 px-5 py-5 text-center text-sm text-red-200/90">
                {homeFeed.error}
              </div>
            )}

            {!homeFeed.loading && !homeFeed.error && (
              <>
                <section>
                  <SectionHeading
                    title="On TV today (US)"
                    aside={scheduleDateLabel()}
                  />
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
                  <SectionHeading
                    title="Streaming on the web today"
                    aside="Global & web channels"
                  />
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
                  <SectionHeading
                    title="Discover"
                    aside="Show index · page 0"
                  />
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

        <div className="mt-20">
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
