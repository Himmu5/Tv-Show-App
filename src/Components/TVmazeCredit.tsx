import { FC, memo } from "react";

/** CC BY-SA attribution for TVmaze API data. https://www.tvmaze.com/api */
const TVmazeCredit: FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80 px-4 py-8 text-center text-sm text-zinc-500 sm:px-6 lg:px-10">
      <p>
        TV listings and metadata from{" "}
        <a
          href="https://www.tvmaze.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 underline decoration-white/20 underline-offset-2 transition hover:text-white"
        >
          TVmaze
        </a>
        {" "}
        (
        <a
          href="https://www.tvmaze.com/api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 underline decoration-white/20 underline-offset-2 transition hover:text-white"
        >
          API
        </a>
        ), licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 underline decoration-white/20 underline-offset-2 transition hover:text-white"
        >
          CC BY-SA 4.0
        </a>
        .
      </p>
    </footer>
  );
};

export default memo(TVmazeCredit);
