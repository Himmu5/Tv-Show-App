import { Show } from "./showType";

export type Cast = {
  id: string;
  image: { medium: string };
  name: string;
};
export type CastShow ={
  [showId:number] : { [id:number] : Cast }
}

export type Person =  {
  id:       number;
  name:     string;
  gender:   string;
  image:    Image;
}
export type Image = {
  medium:   string;
  original: string;
}

export type showCastType = {
  show : Show;
  cast:Person[]
}