import { createSelector } from "reselect";
import { CastMember, CastShow } from "../../Models/Cast";
import { State } from "../Store";

const stateSelector = (state: State) => state.show;

export const loadingSelector = createSelector(stateSelector, (ShowState) => {
  return ShowState.loading;
});

export const querySelector = createSelector(
  stateSelector,
  (showState) => showState.query
);

export const castMapMySelector = createSelector(stateSelector , (ShowState)=>{
  return ShowState.cast;
})


export const castArrayMapSelector = createSelector(castMapMySelector , (mapCast)=>{
  
  const ArrayMappedCast: { [id: number]: CastMember[] } = Object.keys(
    mapCast
  ).reduce((prev, current) => {
    return {
      ...prev,
      [current]: Object.keys(mapCast[+current]).map(
        (id) => mapCast[+current][+id]
      ),
    };
  }, {});
  return ArrayMappedCast;
});



export const showMapSelector = createSelector(
  stateSelector,
  (showState) => showState.shows
);

export const queryShowMapSelector = createSelector(stateSelector,(state)=>{
  return state.query_shows;
});

export const showSelector = createSelector(
  showMapSelector,
  querySelector,
  queryShowMapSelector ,
  (showMap, query, queryShowMap) => {
    return (
      queryShowMap[query]?.map((id) => showMap[id] ) || []
    );
  }
);

export const castMapSelector = createSelector(stateSelector, (showState) => {
 
  return showState.cast
});

export const castSelector = createSelector(castMapSelector, (castMap) => {
  let data = Object.keys(castMap).map((id) => {
    return castMap[+id];
  });
  return data;
});

export const homeFeedSelector = createSelector(
  stateSelector,
  (s) => s.homeFeed
);

export const discoverShowsSelector = createSelector(
  showMapSelector,
  homeFeedSelector,
  (map, hf) =>
    hf.discoverIds.map((id) => map[id]).filter(Boolean)
);

export const peopleSelector = createSelector(
  stateSelector,
  (s) => s.people
);

export const peopleQuerySelector = createSelector(
  peopleSelector,
  (p) => p.query
);

export const peopleResultsSelector = createSelector(
  peopleSelector,
  (p) => p.results
);

export const peopleLoadingSelector = createSelector(
  peopleSelector,
  (p) => p.loading
);

/** `undefined` = not loaded yet; array = loaded (possibly empty). */
export const episodesForShowSelector = (state: State, showId: number) =>
  state.show.episodesByShowId[showId];

export const episodesLoadingIdSelector = createSelector(
  stateSelector,
  (s) => s.episodesLoadingId
);
