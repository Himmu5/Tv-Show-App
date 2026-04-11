/** Episode list entry from GET /shows/:id/episodes */
export type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string | null;
  airtime: string;
  runtime: number | null;
  summary?: string | null;
};
