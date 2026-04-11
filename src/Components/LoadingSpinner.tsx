import { FC } from "react";
import { ImSpinner } from "react-icons/im";

type P = {
  className?: string;
};

const LoadingSpinner: FC<P> = ({ className }) => {
  return (
    <ImSpinner
      className={`animate-spin text-brand ${className ?? "h-8 w-8"}`}
      aria-hidden
    />
  );
};

export default LoadingSpinner;
