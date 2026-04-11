import { FC, InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";

type P = {} & InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<P> = ({
  className = "",
  placeholder = "Titles, genres, keywords…",
  ...props
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        {...props}
        className="w-full rounded-md border border-white/15 bg-white/10 py-2.5 pl-4 pr-11 text-sm text-white placeholder:text-zinc-500 shadow-inner outline-none transition focus:border-brand/80 focus:bg-white/15 focus:ring-2 focus:ring-brand/40 sm:text-base"
        type="search"
        placeholder={placeholder}
        autoComplete="off"
      />
      <BsSearch
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
        aria-hidden
      />
    </div>
  );
};

export default SearchBar;
