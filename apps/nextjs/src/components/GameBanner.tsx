import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";

export const GameBanner: React.FC<{
  game: inferProcedureOutput<AppRouter["game"]["all"]>[number];
}> = ({ game }) => {
  return (
    <a href="#" className="relative overflow-hidden rounded-lg">
      <img src={game.box_art_url} alt="" className="h-full w-full" />

      <div className="absolute bottom-0 left-0 right-0 w-full bg-game-gradient px-4 pt-16 pb-4">
        <strong className="block font-bold">{game.name}</strong>
        <span className="block text-sm text-zinc-300">
          {game.ads} anúncio{game.ads == 1 ? "" : "s"}
        </span>
      </div>
    </a>
  );
};
