export type PersonSearchHit = {
  score: number;
  person: {
    id: number;
    url: string;
    name: string;
    image?: { medium?: string; original?: string };
  };
};
