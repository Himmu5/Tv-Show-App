import { memo } from "react";

const GenrePill = ({ name }: { name: string }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-200 shadow-inner-glow backdrop-blur-sm sm:text-xs sm:tracking-[0.12em]">
      {name}
    </span>
  );
};

export default memo(GenrePill);
