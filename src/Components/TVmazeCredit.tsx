import { FC, memo } from "react";

/** CC BY-SA attribution for TVmaze data */
const TVmazeCredit: FC = () => {
  return (
    <footer className="relative border-t border-white/[0.07] bg-gradient-to-b from-zinc-950/80 to-black px-4 py-10 text-center text-sm text-zinc-500 sm:px-6 lg:px-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent"
        aria-hidden
      />
      <p className="mx-auto max-w-2xl leading-relaxed">
        TV listings and metadata from{" "}
        <a
          href="https://www.tvmaze.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-300 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-brand/60"
        >
          TVmaze
        </a>
        , licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-300 underline decoration-white/15 underline-offset-4 transition hover:text-white hover:decoration-brand/60"
        >
          CC BY-SA 4.0
        </a>
        .
      </p>
    </footer>
  );
};

export default memo(TVmazeCredit);
