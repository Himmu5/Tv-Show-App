import { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux/es/exports";
import LoadingSpinner from "../Components/LoadingSpinner";
import NothingToShow from "../Components/NothingToShow";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { queryChangeAction } from "../Redux/Action";
import { loadingSelector, querySelector, showSelector } from "../Redux/Selector/shows";
import { State } from "../Redux/Store";

type P = {} & ReduxProps

const ShowListPage: FC<P> = ({ changeQuery, query, shows, loading }) => {

 

  return (
    <div className="mt-2 ">
      <div className="flex gap-2 justify-center ">
        <SearchBar value={query} onChange={(e) => changeQuery(e.target.value)} />
        {loading && <LoadingSpinner />}
      </div>
      <div className="flex flex-wrap justify-center">
        {
          shows.length == 0 && <NothingToShow />
        }

        {
          shows.map((Show) => {
            return <ShowCard key={Show.id} Show={Show} />
          })
        }

      </div>
    </div>
  );
}

let mapDispatchToProps = {
  changeQuery: queryChangeAction,
}

let mapStateToProps = (state: State) => ({ query: querySelector(state), shows: showSelector(state), loading: loadingSelector(state) })

let connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>
export default connector(ShowListPage);
