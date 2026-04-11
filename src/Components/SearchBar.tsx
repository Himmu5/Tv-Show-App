import { FC, InputHTMLAttributes, useCallback, useId } from "react";
import { BsSearch } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";

type P = {
  /** Shows a compact spinner inside the field (e.g. while results load) */
  busy?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<P> = ({
  className = "",
  busy = false,
  placeholder = "Titles, genres, keywords…",
  value,
  onChange,
  id: idProp,
  "aria-label": ariaLabel = "Search",
  ...props
}) => {
  const uid = useId();
  const fieldId = idProp ?? `search-${uid}`;
  const strValue = typeof value === "string" ? value : "";
  const showClear = strValue.length > 0;

  const clear = useCallback(() => {
    if (!onChange) return;
    onChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [onChange]);

  let rightPad = "pr-4 sm:pr-5";
  if (busy && showClear) rightPad = "pr-[5.25rem] sm:pr-24";
  else if (busy) rightPad = "pr-11 sm:pr-12";
  else if (showClear) rightPad = "pr-11 sm:pr-12";

  return (
    <div className={`group/search relative w-full ${className}`} role="search">
      <label className="sr-only" htmlFor={fieldId}>
        {ariaLabel}
      </label>
      <div
        className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-muted transition-colors duration-200 group-focus-within/search:text-brand-bright sm:left-5"
        aria-hidden
      >
        <BsSearch className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </div>
      <input
        {...props}
        id={fieldId}
        value={value}
        onChange={onChange}
        aria-busy={busy || undefined}
        aria-label={ariaLabel}
        className={`search-input-theme relative w-full rounded-full border border-white/[0.08] bg-surface-card/90 py-2.5 pl-11 text-[15px] font-medium leading-normal text-zinc-100 caret-brand shadow-inner-glow backdrop-blur-xl transition-all duration-300 ease-crisp placeholder:text-muted placeholder:font-normal focus:border-brand/50 focus:bg-surface-elevated/95 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(229,9,20,0.35),0_8px_40px_-12px_rgba(229,9,20,0.2)] focus:outline-none focus:placeholder:text-zinc-500 sm:py-3 sm:pl-[3.25rem] sm:text-base ${rightPad}`}
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
      />
      {showClear && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-1.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-elevated hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:right-2 sm:h-9 sm:w-9"
          aria-label="Clear search"
        >
          <IoCloseCircle className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
        </button>
      )}
      {busy && (
        <span
          className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-brand ${
            showClear ? "right-10 sm:right-11" : "right-3 sm:right-4"
          }`}
          aria-hidden
        >
          <LoadingSpinner className="h-5 w-5" />
        </span>
      )}
    </div>
  );
};

export default SearchBar;
