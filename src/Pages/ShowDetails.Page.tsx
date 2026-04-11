import { FC, useEffect } from "react";
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
import { placeholderImage } from "../Components/ShowCard";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { stripHtml } from "../lib/stripHtml";

type ShowDetailPageProps = ownProps & ReduxProps;
type ownProps = {} & WithRouterProps;

function backdropSrc(medium?: string, original?: string): string {
  return original || medium || placeholderImage;
}

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

  return (
    <div className="min-h-screen bg-surface pb-20">
      <div className="relative min-h-[72vh] w-full overflow-hidden sm:min-h-[78vh]">
        <img
          src={backdropSrc(img?.medium, img?.original)}
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

        <section className="panel-glass mt-8 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Cast
            </h2>
            <div className="mt-2 h-0.5 w-11 rounded-full bg-gradient-to-r from-brand to-transparent shadow-glow" />
          </div>
          {cast.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Cast isn&apos;t available for this title yet.
            </p>
          ) : (
            <div className="row-scroll -mx-1 px-1 pt-1">
              {cast.map((item) => (
                <CastCard
                  key={item.id}
                  avatarLink={item.image?.medium || placeholderImage}
                  name={item.name || "Unknown"}
                />
              ))}
            </div>
          )}
        </section>

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
