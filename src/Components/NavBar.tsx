import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { peopleQueryChangeAction, queryChangeAction } from "../Redux/Action";
import {
  loadingSelector,
  peopleLoadingSelector,
  peopleQuerySelector,
  querySelector,
} from "../Redux/Selector/shows";
import { State } from "../Redux/Store";
import SearchBar from "./SearchBar";

type P = ReduxProps;

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3.5 py-2 text-sm font-semibold tracking-tight transition-all duration-250 ease-crisp ${
    isActive
      ? "bg-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/[0.12]"
      : "text-zinc-400 hover:bg-white/[0.07] hover:text-white"
  }`;

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
    <header className="nav-shell fixed inset-x-0 top-0 z-50">
      <div className="nav-inner mx-auto flex h-[3.35rem] max-w-[1600px] items-center gap-2 px-3 sm:h-[3.75rem] sm:gap-4 sm:px-6 lg:gap-6 lg:px-10">
        <Link
          to="/"
          className="group shrink-0 font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_0_24px_rgba(229,9,20,0.25)] transition sm:text-[1.65rem]"
          aria-label="Home"
        >
          <span className="bg-gradient-to-br from-brand-bright to-brand bg-clip-text text-transparent transition group-hover:from-white group-hover:to-zinc-300">
            TV
          </span>
          <span className="text-zinc-200 transition group-hover:text-white">
            flix
          </span>
        </Link>
        <nav
          className="hidden shrink-0 items-center gap-1.5 sm:flex"
          aria-label="Main"
        >
          <NavLink to="/" end className={navClass}>
            Browse
          </NavLink>
          <NavLink to="/people" className={navClass}>
            People
          </NavLink>
        </nav>
        <div className="relative min-w-0 flex-1 lg:flex lg:justify-center">
          <div className="w-full lg:max-w-2xl xl:max-w-3xl">
            <SearchBar
              busy={searchLoading}
              value={isPeople ? peopleQuery : query}
              onChange={(e) =>
                isPeople
                  ? changePeopleQuery(e.target.value)
                  : changeQuery(e.target.value)
              }
              placeholder={
                isPeople
                  ? "Actors, hosts, directors…"
                  : "Search titles, genres, or keywords"
              }
              aria-label={isPeople ? "Search people" : "Search shows"}
            />
          </div>
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
