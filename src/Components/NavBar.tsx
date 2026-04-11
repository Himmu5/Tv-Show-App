import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { peopleQueryChangeAction, queryChangeAction } from "../Redux/Action";
import {
  loadingSelector,
  peopleLoadingSelector,
  peopleQuerySelector,
  querySelector,
} from "../Redux/Selector/shows";
import { State } from "../Redux/Store";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";

type P = ReduxProps;

const NavBar: FC<P> = ({
  query,
  peopleQuery,
  changeQuery,
  changePeopleQuery,
  loading,
  peopleLoading,
}) => {
  const location = useLocation();
  const isPeople = location.pathname.startsWith("/people");
  const searchLoading = isPeople ? peopleLoading : loading;

  return (
    <header className="nav-shell fixed inset-x-0 top-0 z-50 transition-colors duration-300">
      <div className="nav-inner mx-auto flex h-14 items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="shrink-0 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          aria-label="Home"
        >
          <span className="text-brand">TV</span>
          <span className="font-normal opacity-90">flix</span>
        </Link>
        <nav
          className="hidden shrink-0 items-center gap-5 text-sm font-semibold text-zinc-500 sm:flex"
          aria-label="Main"
        >
          <Link
            to="/"
            className={`transition hover:text-white ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          >
            Browse
          </Link>
          <Link
            to="/people"
            className={`transition hover:text-white ${
              isPeople ? "text-white" : ""
            }`}
          >
            People
          </Link>
        </nav>
        <div className="relative min-w-0 flex-1 max-w-xl">
          <SearchBar
            value={isPeople ? peopleQuery : query}
            onChange={(e) =>
              isPeople
                ? changePeopleQuery(e.target.value)
                : changeQuery(e.target.value)
            }
            placeholder={
              isPeople
                ? "Search actors, hosts, directors…"
                : "Titles, genres, keywords…"
            }
            aria-label={isPeople ? "Search people" : "Search shows"}
          />
          {searchLoading && (
            <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 text-brand">
              <LoadingSpinner className="h-5 w-5" />
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state: State) => ({
  query: querySelector(state),
  peopleQuery: peopleQuerySelector(state),
  loading: loadingSelector(state),
  peopleLoading: peopleLoadingSelector(state),
});

const mapDispatchToProps = {
  changeQuery: queryChangeAction,
  changePeopleQuery: peopleQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NavBar);
