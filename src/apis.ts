import axios from "axios";
import { Person } from "./Models/Cast";
import { Episode } from "./Models/episode";
import { PersonSearchHit } from "./Models/personSearch";
import { ScheduleRailItem } from "./Models/schedule";
import { Show } from "./Models/showType";

const API = "https://api.tvmaze.com";

const client = axios.create({
  baseURL: API,
  headers: { Accept: "application/json" },
});

export async function getShowsApi(query: string) {
  const Response = await client.get("/search/shows", { params: { q: query } });
  return Response.data.map((item: { show: Show }) => item.show);
}

export async function getSingleShow(id: string) {
  const response = await client.get<Show>(`/shows/${id}`);
  return response.data;
}

export async function getShowCast(id: string) {
  const response = await client.get(`/shows/${id}`, {
    params: { embed: "cast" },
  });
  return response.data;
}

export async function getShowEpisodes(showId: string): Promise<Episode[]> {
  const { data } = await client.get<Episode[]>(`/shows/${showId}/episodes`);
  return data;
}

/** US network / local TV schedule for a calendar day. See https://www.tvmaze.com/api#schedule */
export async function getTvSchedule(
  country: string,
  date: string
): Promise<unknown[]> {
  const { data } = await client.get("/schedule", { params: { country, date } });
  return data;
}

/** Web & global streaming schedule for a day. `country: ""` = local + global web channels. */
export async function getWebSchedule(date: string): Promise<unknown[]> {
  const { data } = await client.get("/schedule/web", {
    params: { date, country: "" },
  });
  return data;
}

/** Paginated show index (max 250 per page). See https://www.tvmaze.com/api#show-index */
export async function getShowsPage(page: number): Promise<Show[]> {
  const { data } = await client.get<Show[]>("/shows", { params: { page } });
  return data;
}

/** People search. See https://www.tvmaze.com/api#people-search */
export async function searchPeopleApi(query: string): Promise<PersonSearchHit[]> {
  if (!query.trim()) return [];
  const { data } = await client.get<PersonSearchHit[]>("/search/people", {
    params: { q: query },
  });
  return data;
}

function extractShowFromScheduleEntry(entry: Record<string, unknown>): Show | null {
  if (entry.show && typeof entry.show === "object") {
    return entry.show as Show;
  }
  const embedded = entry._embedded as { show?: Show } | undefined;
  if (embedded?.show) return embedded.show;
  return null;
}

function channelLabelForShow(show: Show): string {
  if (show.network?.name) return show.network.name;
  if (show.webChannel?.name) return show.webChannel.name;
  return "Streaming";
}

export function scheduleEntryToRailItem(
  entry: Record<string, unknown>
): ScheduleRailItem | null {
  const show = extractShowFromScheduleEntry(entry);
  if (!show?.id) return null;
  return {
    showId: show.id,
    show,
    episodeName: String(entry.name ?? "Episode"),
    airtime: String(entry.airtime ?? ""),
    airdate: String(entry.airdate ?? ""),
    channelLabel: channelLabelForShow(show),
  };
}

export function dedupeScheduleByShow(
  items: ScheduleRailItem[],
  max = 36
): ScheduleRailItem[] {
  const seen = new Set<number>();
  const out: ScheduleRailItem[] = [];
  for (const item of items) {
    if (seen.has(item.showId)) continue;
    seen.add(item.showId);
    out.push(item);
    if (out.length >= max) break;
  }
  return out;
}

export function getShowswithCast(query: string) {
  return client.get("/search/shows", { params: { q: query } }).then((res) => {
    const shows = res.data.map((item: { show: Show }) => item.show);
    const castPromises = [];

    for (let i = 0; i < shows.length; i++) {
      const castAndShowPromise = client
        .get(`/shows/${shows[i].id}/cast`)
        .then((castRes) => {
          const cast = castRes.data.map(
            (item: { person: Person }) => item.person
          );
          return { show: shows[i], cast };
        });
      castPromises.push(castAndShowPromise);
    }

    return Promise.all(castPromises);
  });
}
