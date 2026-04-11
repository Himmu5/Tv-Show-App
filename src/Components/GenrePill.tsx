import { memo } from "react";

const GenrePill = ({ name }: { name: string }) => {
  return (
    <span className="inline-flex items-center rounded border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-200">
      {name}
    </span>
  );
};

export default memo(GenrePill);
