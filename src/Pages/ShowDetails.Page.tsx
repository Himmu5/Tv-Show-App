import { FC, useEffect } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { connect, ConnectedProps } from "react-redux/es/exports";
import { State } from "../Redux/Store";
import { castArrayMapSelector, loadingSelector, showMapSelector } from "../Redux/Selector/shows";
import { singleShowLoadingAction } from "../Redux/Action";
import LoadingSpinner from "../Components/LoadingSpinner";
import { placeholderImage } from "../Components/ShowCard";
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { Link } from "react-router-dom";

type ShowDetailPageProps = ownProps & ReduxProps
type ownProps = {} & WithRouterProps

const ShowDetailPage: FC<ShowDetailPageProps> = ({ singleShowLoading, showId, show, cast, loading }) => {

  useEffect(() => {
    singleShowLoading(showId);
  }, [showId])



  if (!show) {
    return <div className="flex justify-center items-center flex-col h-screen " ><LoadingSpinner /></div>
  }

  return (
    <div className="mt-2 flex flex-col">

      <div className="flex gap-2 items-center ">
        <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
        {loading && <LoadingSpinner />}
      </div>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {
          show.genres.map((item: string, index: number) => {
            return <GenrePill key={index} name={item} />
          })
        }


      </div>
      <Link to="/" className="hover:text-gray-400 self-start flex gap-1 items-center font-bold "><IoArrowBackCircleOutline size={30} /> <p>back</p></Link>
      <div className="mt-2 flex">
        <img
          src={show.image?.medium || placeholderImage}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p dangerouslySetInnerHTML={{ __html: show.summary }}>

          </p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: <span className="text-gray-700">{show.rating.average === null ? "null" : show.rating.average}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {
            cast.map((item) => {
              return <CastCard
                key={Math.random()}
                avatarLink={item.image?.medium || placeholderImage}
                name={item.name || "Unknown"}
              />
            })
          }
          {
            cast.length == 0 && <div className="text-2xl my-5 font-bold text-gray-600 ">CAST NOT AVALABLE</div>
          }

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownState: ownProps) => {
  return { show: showMapSelector(state)[+ownState.params.showId], showId: ownState.params.showId, cast: castArrayMapSelector(state)[+ownState.params.showId] || [], loading: loadingSelector(state) }
}

const mapDispatchToProps = {
  singleShowLoading: singleShowLoadingAction
}

let connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>

export default withRouter(connector(ShowDetailPage));
