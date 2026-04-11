import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { PeopleGridSkeleton } from "../Components/Skeletons";
import TVmazeCredit from "../Components/TVmazeCredit";
import { placeholderImage } from "../Components/ShowCard";
import {
  peopleLoadingSelector,
  peopleQuerySelector,
  peopleResultsSelector,
} from "../Redux/Selector/shows";
import { State } from "../Redux/Store";

type P = ReduxProps;

const PeopleSearchPage: FC<P> = ({ query, results, loading }) => {
  const trimmed = query.trim();
  const noHits = trimmed && !loading && results.length === 0;

  return (
    <div className="min-h-screen bg-surface pb-8">
      <div className="safe-pad-top relative px-4 pt-10 sm:px-6 lg:px-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-mesh-landing opacity-60"
          aria-hidden
        />
        <div className="relative">
          <p className="section-label">Directory</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            People
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-transparent shadow-glow" />
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
            Search actors and crew in the TVmaze database. Opening a card takes
            you to their profile on{" "}
            <span className="font-medium text-zinc-300">tvmaze.com</span>.
          </p>
        </div>

        {loading && <PeopleGridSkeleton />}

        {noHits && (
          <div className="panel-glass mt-12 px-8 py-12 text-center">
            <p className="text-lg font-bold text-white">No people found</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              No matches for &ldquo;{trimmed}&rdquo;. Try another spelling or a
              shorter name.
            </p>
          </div>
        )}

        {!trimmed && !loading && (
          <p className="mt-14 text-center text-sm font-medium text-zinc-500">
            Use the search bar above to find people.
          </p>
        )}

        {results.length > 0 && (
          <ul className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map(({ person, score }) => (
              <li key={person.id}>
                <a
                  href={person.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-surface-card/90 p-4 shadow-card transition-all duration-400 ease-crisp hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="relative shrink-0 overflow-hidden rounded-lg transition duration-400">
                    <img
                      src={person.image?.medium || placeholderImage}
                      alt=""
                      className="h-28 w-[4.5rem] object-cover object-top transition duration-500 group-hover:scale-105 sm:h-32 sm:w-20"
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <p className="font-bold leading-snug text-white transition group-hover:text-brand-bright">
                      {person.name}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium tabular-nums text-zinc-600">
                      Score {Math.round(score * 100) / 100}
                    </p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-brand">
                      TVmaze →
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-20">
        <TVmazeCredit />
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  query: peopleQuerySelector(state),
  results: peopleResultsSelector(state),
  loading: peopleLoadingSelector(state),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PeopleSearchPage);
