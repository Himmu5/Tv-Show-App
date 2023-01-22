import React,{FC} from 'react'
type P ={}
const NothingToShow:FC<P>=()=>{
  return <div className='py-20 flex justify-center items-center font-bold text-xl sm:text-2xl '>
    Please Type something to see your favorite Shows
  </div>
}
export default NothingToShow;