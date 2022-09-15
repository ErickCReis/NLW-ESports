import { MagnifyingGlassPlus } from "phosphor-react";

export const CreateAdBanner: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div className="mt-8 self-stretch overflow-hidden rounded-lg bg-nlw-gradient pt-1">
      <div className="flex justify-between rounded-lg bg-[#2A2634] px-8 py-6">
        <div className="">
          <strong className="block text-2xl font-black">
            Não encontrou seu duo?
          </strong>
          <span className="block text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <button
          className="flex items-center gap-3 rounded bg-violet-500 py-3 px-4 hover:bg-violet-600"
          onClick={onClick}
        >
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </button>
      </div>
    </div>
  );
};
