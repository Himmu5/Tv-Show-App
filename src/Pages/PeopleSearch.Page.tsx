import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import LoadingSpinner from "../Components/LoadingSpinner";
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
    <div className="min-h-screen bg-black pb-8">
      <div className="safe-pad-top px-4 pt-8 sm:px-6 lg:px-10">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          People
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Search actors and crew in the TVmaze database. Profile links open on{" "}
          <span className="text-zinc-300">tvmaze.com</span>.
        </p>

        {loading && (
          <div className="mt-12 flex justify-center">
            <LoadingSpinner className="h-10 w-10 text-brand" />
          </div>
        )}

        {noHits && (
          <p className="mt-10 rounded-lg border border-white/10 bg-surface/80 px-6 py-8 text-center text-zinc-400 backdrop-blur-sm">
            No people matched “{trimmed}”. Try another spelling or a shorter name.
          </p>
        )}

        {!trimmed && !loading && (
          <p className="mt-10 text-center text-zinc-500">
            Type in the search bar above to find people.
          </p>
        )}

        {results.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map(({ person, score }) => (
              <li key={person.id}>
                <a
                  href={person.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 rounded-lg border border-white/10 bg-surface-elevated/80 p-4 transition hover:border-white/20 hover:bg-surface-elevated"
                >
                  <img
                    src={person.image?.medium || placeholderImage}
                    alt=""
                    className="h-24 w-16 shrink-0 rounded object-cover object-top"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{person.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Match score {Math.round(score * 100) / 100}
                    </p>
                    <p className="mt-2 text-xs font-medium text-brand">
                      View on TVmaze →
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-16">
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
