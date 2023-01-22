import React, { FC, useState } from 'react'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { castArrayMapSelector, castMapMySelector } from '../Redux/Selector/shows'
import { State } from '../Redux/Store'
type P = {

} & ReduxProps

type ownPropsType = { showId: number }

const Avatar: FC<P> = ({ cast }) => {

    const [show, setShow] = useState(false);
    const castM = useSelector(castArrayMapSelector);

    return <div>
        <div className="flex -space-x-4 justify-center">
            {
                cast.map((Person, index) => {
                    return index < 3 && <div key={Math.random()}>
                        <img  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={Person.image?.medium || " "} alt="" />
                    </div>
                })
            }

            {
                show && <div className='flex flex-col gap-3 w-40 h-56 overflow-auto  scrollbar  absolute bg-black bg-opacity-90 text-white p-4 rounded-md -ml-10 mt-10 '>
                    {
                        cast.map((Person) => {
                            return <div key={Person.id} onClick={() => setShow(!show)} className="text-xs flex gap-4 items-center "> <img className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800" src={Person.image?.medium || ""} alt="" /> <p>{Person.name}</p></div>
                        })
                    }
                </div>
            }


            {
                cast.length > 3 && <button className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" onClick={() => setShow(!show)} >+{cast.length - 3}</button>
            }


        </div>

    </div>
}

let mapStateToProps = (state: State, ownProps: ownPropsType) => {
    return { cast: castArrayMapSelector(state)[+ownProps.showId] || [] }
}

let connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>

export default connector(Avatar);