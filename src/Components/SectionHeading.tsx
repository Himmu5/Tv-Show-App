import { FC, memo, ReactNode } from "react";

type P = {
  title: string;
  aside?: ReactNode;
};

const SectionHeading: FC<P> = ({ title, aside }) => (
  <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex items-stretch gap-3 sm:gap-4">
      <span
        className="hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-brand-bright via-brand to-brand-dim shadow-glow sm:block"
        aria-hidden
      />
      <div>
        <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl md:text-2xl">
          {title}
        </h2>
        <div className="mt-2 h-0.5 max-w-[4.5rem] rounded-full bg-gradient-to-r from-brand to-transparent opacity-80" />
      </div>
    </div>
    {aside != null && (
      <div className="text-xs font-medium tabular-nums text-zinc-500 sm:text-sm">
        {aside}
      </div>
    )}
  </div>
);

export default memo(SectionHeading);
