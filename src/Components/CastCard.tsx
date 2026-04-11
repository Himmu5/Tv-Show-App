import { memo } from "react";

const CastCard = ({
  avatarLink,
  name,
}: {
  avatarLink: string;
  name: string;
}) => {
  return (
    <div className="w-[7.25rem] shrink-0 sm:w-32">
      <div className="overflow-hidden rounded-xl bg-zinc-950 shadow-card transition duration-300 ease-crisp">
        <img
          className="aspect-[2/3] w-full object-cover transition duration-500 ease-crisp hover:scale-105"
          src={avatarLink}
          alt=""
          loading="lazy"
        />
      </div>
      <p className="mt-2.5 line-clamp-2 text-center text-[11px] font-semibold leading-snug text-zinc-300 sm:text-xs">
        {name}
      </p>
    </div>
  );
};

export default memo(CastCard);
