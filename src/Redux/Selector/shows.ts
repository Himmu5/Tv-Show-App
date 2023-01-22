import { createSelector } from "reselect";
import { Cast, CastShow, Person } from "../../Models/Cast";
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
  
  const ArrayMappedCast:{ [id:number] : Person[] } = Object.keys(mapCast).reduce((prev , current )=>{
    
    return { ...prev , [current] : Object.keys(mapCast[+current]).map((id)=>mapCast[+current][+id] )  }
  },{})
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
