import { AnyAction } from "redux";
import { all, call, put } from "redux-saga/effects";
import {
  dedupeScheduleByShow,
  getShowCast,
  getShowEpisodes,
  getShowswithCast,
  getShowsPage,
  getSingleShow,
  getTvSchedule,
  getWebSchedule,
  scheduleEntryToRailItem,
  searchPeopleApi,
} from "../../apis";
import { Show } from "../../Models/showType";
import { ScheduleRailItem } from "../../Models/schedule";
import {
  castLoadedAction,
  episodesFailureAction,
  episodesSuccessAction,
  homeFeedFailureAction,
  homeFeedSuccessAction,
  peopleSearchSuccessAction,
  showsLoadedAction,
  singleShowLoadedAction,
} from "../Action";

export function* getShows(action: AnyAction): Generator<any, any, any> {
  const shows = yield call(getShowswithCast, action.payload);
  yield put(showsLoadedAction(shows));
}

export function* getSingleShowSaga(
  action: AnyAction
): Generator<any, any, any> {
  const show = yield call(getSingleShow, action.payload);
  yield put(singleShowLoadedAction(show));
}

export function* getCastSaga(action: AnyAction): Generator<any, any, any> {
  let cast = yield call(getShowCast, action.payload);
  yield put(castLoadedAction(cast));
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function* loadHomeFeedSaga(): Generator<any, any, any> {
  try {
    const date = todayISO();
    const [tvRaw, webRaw, discoverShows] = (yield all([
      call(getTvSchedule, "US", date),
      call(getWebSchedule, date),
      call(getShowsPage, 0),
    ])) as [unknown[], unknown[], Show[]];

    const tvItems = dedupeScheduleByShow(
      (tvRaw as Record<string, unknown>[])
        .map((e) => scheduleEntryToRailItem(e))
        .filter((x): x is ScheduleRailItem => x != null)
    );
    const webItems = dedupeScheduleByShow(
      (webRaw as Record<string, unknown>[])
        .map((e) => scheduleEntryToRailItem(e))
        .filter((x): x is ScheduleRailItem => x != null)
    );

    const discoverSlice = discoverShows.slice(0, 48);
    const discoverIds = discoverSlice.map((s) => s.id);
    const merged: Show[] = [...discoverSlice];
    const seen = new Set(merged.map((s) => s.id));
    const pushShow = (s: Show) => {
      if (seen.has(s.id)) return;
      seen.add(s.id);
      merged.push(s);
    };
    tvItems.forEach((r) => pushShow(r.show));
    webItems.forEach((r) => pushShow(r.show));

    yield put(
      homeFeedSuccessAction({
        tvRows: tvItems,
        webRows: webItems,
        discoverIds,
        mergedShows: merged,
      })
    );
  } catch (e) {
    yield put(
      homeFeedFailureAction(
        e instanceof Error ? e.message : "Failed to load home feed"
      )
    );
  }
}

export function* peopleSearchSaga(
  action: AnyAction
): Generator<any, any, any> {
  const q = String(action.payload ?? "").trim();
  if (!q) {
    yield put(peopleSearchSuccessAction([]));
    return;
  }
  try {
    const hits = yield call(searchPeopleApi, q);
    yield put(peopleSearchSuccessAction(hits));
  } catch {
    yield put(peopleSearchSuccessAction([]));
  }
}

export function* episodesSaga(action: AnyAction): Generator<any, any, any> {
  const id = String(action.payload ?? "");
  if (!id) {
    yield put(episodesFailureAction(0));
    return;
  }
  try {
    const episodes = yield call(getShowEpisodes, id);
    yield put(episodesSuccessAction({ showId: +id, episodes }));
  } catch {
    yield put(episodesFailureAction(+id));
  }
}
