import axios from "axios";
import { Cast, Person } from "./Models/Cast";
import { Show } from "./Models/showType";

export async function getShowsApi(query: string) {
  const Response = await axios.get(
    " https://api.tvmaze.com/search/shows?q=" + query
  );
  return Response.data.map((item: any) => item.show);
}

export async function getSingleShow(id: string) {
  const response = await axios.get("https://api.tvmaze.com/shows/" + id);
  return response.data;
}

export async function getShowCast(id: string) {
  const response = await axios.get("https://api.tvmaze.com/shows/" + id + "?embed=cast");
  return response.data;
}

export function getShowswithCast(query: string) {
  return axios
    .get("https://api.tvmaze.com/search/shows?q=" + query)
    .then((res) => {
      let shows = res.data.map((item: any) => {
        return item.show;
      });
      let castPromises = [];

      for (let i = 0; i < shows.length; i++) {
        const castAndShowPromise = axios
          .get("https://api.tvmaze.com/" + "shows/" + shows[i].id + "/cast")
          .then((res) => {
            const cast = res.data.map(
              (item: { person: Person }) => item.person
            );
            return { show: shows[i], cast: cast };
          });
        castPromises.push(castAndShowPromise);
      }

      return Promise.all(castPromises);
    });
}
