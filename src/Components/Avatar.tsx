import React, { FC, useState } from "react";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { castArrayMapSelector } from "../Redux/Selector/shows";
import { State } from "../Redux/Store";
import { placeholderImage } from "../lib/imageFallback";
import SafeImage from "./SafeImage";

type P = {} & ReduxProps;

type ownPropsType = { showId: number };

const Avatar: FC<P> = ({ cast }) => {
  const [show, setShow] = useState(false);
  useSelector(castArrayMapSelector);

  return (
    <div>
      <div className="flex -space-x-4 justify-center">
        {cast.map((Person, index) => {
          return (
            index < 3 && (
              <div key={Person.id}>
                <SafeImage
                  src={Person.image?.medium || ""}
                  fallbackSrc={placeholderImage}
                  fallbackVariant="person"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-gray-800"
                  alt=""
                />
              </div>
            )
          );
        })}

        {show && (
          <div className="absolute -ml-10 mt-10 flex h-56 w-40 flex-col gap-3 overflow-auto rounded-md bg-black bg-opacity-90 p-4 text-white scrollbar">
            {cast.map((Person) => {
              return (
                <div
                  key={Person.id}
                  onClick={() => setShow(!show)}
                  className="flex cursor-pointer items-center gap-4 text-xs"
                >
                  <SafeImage
                    src={Person.image?.medium || ""}
                    fallbackSrc={placeholderImage}
                    fallbackVariant="person"
                    className="h-7 w-7 rounded-full border-2 border-white object-cover dark:border-gray-800"
                    alt=""
                  />
                  <p>{Person.name}</p>
                </div>
              );
            })}
          </div>
        )}

        {cast.length > 3 && (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800"
            onClick={() => setShow(!show)}
          >
            +{cast.length - 3}
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: ownPropsType) => {
  return {
    cast: castArrayMapSelector(state)[+ownProps.showId] || [],
  };
};

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Avatar);
