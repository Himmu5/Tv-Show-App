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
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black">
        <LoadingSpinner className="h-12 w-12" />
        <p className="text-sm text-zinc-500">Loading show…</p>
      </div>
    );
  }

  const img = show.image;
  const rating =
    show.rating?.average != null ? `${show.rating.average}/10` : "—";
  const synopsis = stripHtml(show.summary);

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="relative min-h-[70vh] w-full overflow-hidden sm:min-h-[75vh]">
        <img
          src={backdropSrc(img?.medium, img?.original)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-hero-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="safe-pad-top relative z-10 px-4 pt-4 sm:px-6 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            <IoChevronBack className="h-5 w-5" aria-hidden />
            Back to browse
          </Link>
        </div>

        <div className="relative z-10 flex min-h-[55vh] flex-col justify-end px-4 pb-12 pt-8 sm:min-h-[60vh] sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {show.genres?.map((item: string) => (
              <GenrePill key={item} name={item} />
            ))}
          </div>
          <div className="mt-4 flex items-start gap-4">
            <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
              {show.name}
            </h1>
            {loading && (
              <LoadingSpinner className="mt-2 h-8 w-8 shrink-0 text-brand" />
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
            <span className="rounded border border-white/20 bg-black/40 px-3 py-1 font-semibold text-green-400 backdrop-blur-sm">
              {rating === "—" ? "No score" : `${rating} average`}
            </span>
            {show.language && (
              <span className="text-zinc-400">{show.language}</span>
            )}
            {show.type && (
              <span className="uppercase tracking-wider text-zinc-500">
                {show.type}
              </span>
            )}
          </div>
          {synopsis && (
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
              {synopsis}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-20 -mt-4 px-4 sm:px-6 lg:px-10">
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
            Episodes
          </h2>
          <EpisodeGuide
            episodes={episodesData ?? []}
            loading={episodesLoading && episodesData === undefined}
          />
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">Cast</h2>
          {cast.length === 0 ? (
            <p className="text-zinc-500">Cast isn’t available for this title yet.</p>
          ) : (
            <div className="row-scroll -mx-1 px-1">
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
