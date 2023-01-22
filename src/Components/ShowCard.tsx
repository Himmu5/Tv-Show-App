import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { Cast } from "../Models/Cast";
import { Show } from "../Models/showType";
import { castMapMySelector } from "../Redux/Selector/shows";
import { State } from "../Redux/Store";
import Avatar from "./Avatar";

type P = {
  Show:Show
} & ReduxProps


export const placeholderImage = "https://wikitechlibrary.com/ezoimgfmt/i0.wp.com/wikitechlibrary.com/hub/wp-content/uploads/2022/11/entertainment-hub.webp?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2&ssl=1&w=771"


const ShowCard: FC<P> = ({ Show }) => {
  
  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={ Show.image?.medium ||  placeholderImage}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide ">{Show.name}</h2>
          <p dangerouslySetInnerHTML={{__html: Show.summary || ""}} className="scrollbar-w-1 scrollbar-h-6 scrollbar-thumb-gray-400 scrollbar-track-rounded-3xl  scrollbar-thin h-44">
          </p>
        </div>
        

        <Avatar showId={Show.id} />

        <Link
          to={"/show/"+Show.id}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md border-2  border-gray-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}



let connector = connect(null);
type ReduxProps =   ConnectedProps<typeof connector>
export default connector(ShowCard);
