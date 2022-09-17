import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  game: inferProcedureOutput<AppRouter["game"]["all"]>[number];
};

export const GameBanner: React.FC<Props> = ({ game, className, ...rest }) => {
  return (
    <a href="#" className={`relative rounded-lg ${className}`} {...rest}>
      <img src={game.coverUrl ?? "#"} alt="" className="h-full w-full" />

      <div className="absolute bottom-0 left-0 right-0 w-full bg-game-gradient px-4 pt-16 pb-4">
        <strong className="block font-bold">{game.name}</strong>
        <span className="block text-sm text-zinc-300">
          {game.ads} anúncio{game.ads == 1 ? "" : "s"}
        </span>
      </div>
    </a>
  );
};
