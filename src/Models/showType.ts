export type Show = {
  id: number;
  url: string;
  image:{ medium ?: string }
  name: string;
  type: string;
  language: string;
  genres: string[];
  rating: { average: number };
  summary: string;
};
export type NormalizedShow = { [showId: number]: Show };
