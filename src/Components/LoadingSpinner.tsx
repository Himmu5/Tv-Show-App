import { FC } from "react";
import { ImSpinner } from "react-icons/im";

type P = {
  className?:string
}

const LoadingSpinner:FC<P> = ({ className }) => {
  return <ImSpinner size={30} className={`animate-spin ${className}`} />;
};

export default LoadingSpinner;
