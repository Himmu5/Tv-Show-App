import { FC, useEffect, useRef, useState } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { connect, ConnectedProps } from "react-redux/es/exports";
import { State } from "../Redux/Store";
import {
  castArrayMapSelector,
  episodesForShowSelector,
  episodesLoadingIdSelector,
  loadingSelector,
  showMapSelector,
} from "../Redux/Selector/shows";
import EpisodeGuide from "../Components/EpisodeGuide";
import TVmazeCredit from "../Components/TVmazeCredit";
import {
  episodesFetchAction,
  singleShowLoadingAction,
} from "../Redux/Action";
import LoadingSpinner from "../Components/LoadingSpinner";
import { ShowDetailSkeleton } from "../Components/Skeletons";
import SafeImage from "../Components/SafeImage";
import { placeholderImage } from "../lib/imageFallback";
import { IoChevronBack, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { stripHtml } from "../lib/stripHtml";

type ShowDetailPageProps = ownProps & ReduxProps;
type ownProps = {} & WithRouterProps;

function backdropSrc(medium?: string, original?: string): string {
  return original || medium || "";
}

const CAST_PREVIEW_COUNT = 8;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  singleShowLoading,
  loadEpisodes,
  showId,
  show,
  cast,
  loading,
  episodesData,
  episodesLoading,
}) => {
  const [castExpanded, setCastExpanded] = useState(false);
  const castListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setCastExpanded(false);
  }, [showId]);

  useEffect(() => {
    singleShowLoading(showId);
  }, [showId, singleShowLoading]);

  useEffect(() => {
    loadEpisodes(showId);
  }, [showId, loadEpisodes]);

  if (!show) {
    return <ShowDetailSkeleton />;
  }

  const img = show.image;
  const rating =
    show.rating?.average != null ? `${show.rating.average}/10` : "—";
  const synopsis = stripHtml(show.summary);
  const castHasMore = cast.length > CAST_PREVIEW_COUNT;
  const visibleCast = castExpanded
    ? cast
    : cast.slice(0, CAST_PREVIEW_COUNT);
  const hiddenCount = cast.length - CAST_PREVIEW_COUNT;

  const toggleCastExpanded = () => {
    setCastExpanded((prev) => {
      const next = !prev;
      if (!prev && next) {
        requestAnimationFrame(() => {
          castListRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-surface pb-20">
      <div className="relative min-h-[72vh] w-full overflow-hidden sm:min-h-[78vh]">
        <SafeImage
          src={backdropSrc(img?.medium, img?.original)}
          fallbackSrc={placeholderImage}
          fallbackVariant="poster"
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover object-top"
        />
        <div className="absolute inset-0 bg-hero-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/50 to-transparent" />

        <div className="safe-pad-top relative z-10 px-4 pt-5 sm:px-6 lg:px-10">
          <Link to="/" className="btn-ghost">
            <IoChevronBack className="h-5 w-5" aria-hidden />
            Back to browse
          </Link>
        </div>

        <div className="relative z-10 flex min-h-[56vh] flex-col justify-end px-4 pb-14 pt-10 sm:min-h-[62vh] sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {show.genres?.map((item: string) => (
              <GenrePill key={item} name={item} />
            ))}
          </div>
          <div className="mt-5 flex items-start gap-4">
            <h1 className="max-w-4xl text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
              {show.name}
            </h1>
            {loading && (
              <LoadingSpinner className="mt-3 h-8 w-8 shrink-0 text-brand" />
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold tabular-nums text-emerald-300 shadow-inner-glow backdrop-blur-sm sm:text-sm">
              {rating === "—" ? "No score" : `${rating} avg`}
            </span>
            {show.language && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-400">
                {show.language}
              </span>
            )}
            {show.type && (
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {show.type}
              </span>
            )}
          </div>
          {synopsis && (
            <p className="mt-8 max-w-3xl text-pretty text-base leading-relaxed text-zinc-200 sm:text-lg">
              {synopsis}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-10">
        <section className="panel-glass mt-10 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Episodes
            </h2>
            <div className="mt-2 h-0.5 w-11 rounded-full bg-gradient-to-r from-brand to-transparent shadow-glow" />
          </div>
          <EpisodeGuide
            episodes={episodesData ?? []}
            loading={episodesLoading && episodesData === undefined}
          />
        </section>

        <div className="viewport-bleed-x">
          <section
            className="panel-glass mt-8 rounded-none border-x-0 py-6 sm:py-8"
            aria-labelledby="cast-heading"
          >
            <div className="mb-5 px-4 sm:mb-6 sm:px-6 lg:px-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2
                    id="cast-heading"
                    className="text-xl font-extrabold tracking-tight text-white sm:text-2xl"
                  >
                    Cast
                  </h2>
                  <div className="mt-2 h-0.5 w-11 rounded-full bg-gradient-to-r from-brand to-transparent shadow-glow" />
                  {cast.length > 0 && (
                    <p className="mt-3 text-sm text-zinc-500">
                      {castExpanded
                        ? `${cast.length} ${cast.length === 1 ? "person" : "people"}`
                        : castHasMore
                          ? `Showing ${Math.min(CAST_PREVIEW_COUNT, cast.length)} of ${cast.length}`
                          : `${cast.length} ${cast.length === 1 ? "person" : "people"}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {cast.length === 0 ? (
              <p className="px-4 text-sm text-zinc-500 sm:px-6 lg:px-10">
                Cast isn&apos;t available for this title yet.
              </p>
            ) : (
              <>
                <ul
                  id="cast-list"
                  ref={castListRef}
                  className={`list-none pt-1 ${
                    castExpanded
                      ? "flex flex-wrap gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10"
                      : "grid w-full grid-cols-2 gap-2 px-4 sm:grid-cols-5 sm:gap-3 sm:px-6 md:gap-4 lg:px-10"
                  }`}
                  aria-label="Cast"
                >
                  {visibleCast.map((item, index) => (
                    <li
                      key={item.id}
                      className={
                        castExpanded
                          ? "shrink-0 list-none"
                          : "min-w-0 list-none"
                      }
                    >
                      <CastCard
                        fillRow={!castExpanded}
                        characterName={item.characterName}
                        avatarLink={item.image?.medium || ""}
                        name={item.name || "Unknown"}
                        revealStagger={
                          castExpanded && index >= CAST_PREVIEW_COUNT
                            ? index - CAST_PREVIEW_COUNT
                            : undefined
                        }
                      />
                    </li>
                  ))}
                </ul>
                {castHasMore && (
                  <div className="px-4 sm:px-6 lg:px-10">
                    <button
                      type="button"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-100 shadow-inner-glow backdrop-blur-sm transition hover:border-white/18 hover:bg-white/[0.08] sm:w-auto sm:justify-start"
                      aria-expanded={castExpanded}
                      aria-controls="cast-list"
                      onClick={toggleCastExpanded}
                    >
                      {castExpanded ? (
                        <>
                          Show less
                          <IoChevronUp
                            className="h-4 w-4 shrink-0 text-brand"
                            aria-hidden
                          />
                        </>
                      ) : (
                        <>
                          Show all cast
                          <span className="tabular-nums text-zinc-400">
                            ({hiddenCount} more)
                          </span>
                          <IoChevronDown
                            className="h-4 w-4 shrink-0 text-brand"
                            aria-hidden
                          />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        <div className="mt-16">
          <TVmazeCredit />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownState: ownProps) => {
  const id = +ownState.params.showId;
  return {
    show: showMapSelector(state)[id],
    showId: ownState.params.showId,
    cast: castArrayMapSelector(state)[id] || [],
    loading: loadingSelector(state),
    episodesData: episodesForShowSelector(state, id),
    episodesLoading: episodesLoadingIdSelector(state) === id,
  };
};

const mapDispatchToProps = {
  singleShowLoading: singleShowLoadingAction,
  loadEpisodes: episodesFetchAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
