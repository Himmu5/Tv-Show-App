import { memo } from "react";

const CastCard = ({
  avatarLink,
  name,
}: {
  avatarLink: string;
  name: string;
}) => {
  return (
    <div className="w-28 shrink-0 sm:w-32">
      <div className="overflow-hidden rounded-md bg-zinc-900 shadow-card ring-1 ring-white/10">
        <img
          className="aspect-[2/3] w-full object-cover"
          src={avatarLink}
          alt=""
          loading="lazy"
        />
      </div>
      <p className="mt-2 line-clamp-2 text-center text-xs font-medium text-zinc-300">
        {name}
      </p>
    </div>
  );
};

export default memo(CastCard);
