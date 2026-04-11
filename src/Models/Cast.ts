import { Show } from "./showType";

export type Cast = {
  id: string;
  image: { medium: string };
  name: string;
};

export type Image = {
  medium: string;
  original: string;
};

export type Person = {
  id: number;
  name: string;
  gender: string;
  image: Image;
};

/** Person on a show, optionally with the character they play (detail page embed). */
export type CastMember = Person & {
  characterName?: string;
};

export type CastShow = {
  [showId: number]: { [personId: number]: CastMember };
};

export type showCastType = {
  show: Show;
  cast: Person[];
};

/** `GET /shows/:id?embed=cast` response shape (cast rows include character names). */
export type ShowWithEmbeddedCast = {
  id: number;
  _embedded?: {
    cast: Array<{
      person: Person;
      character?: { name?: string };
    }>;
  };
};