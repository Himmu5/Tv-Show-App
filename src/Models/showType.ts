export type Show = {
  id: number;
  url: string;
  image?: { medium?: string; original?: string };
  name: string;
  type: string;
  language: string;
  genres: string[];
  rating: { average: number | null };
  summary: string;
  network?: { name: string } | null;
  webChannel?: { name: string } | null;
};
export type NormalizedShow = { [showId: number]: Show };
