import type { NextPage } from "next";
import Image from "next/future/image";
import { MagnifyingGlassPlus } from "phosphor-react";

import logoImg from "../assets/logo-nlw-esports.svg";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: games } = trpc.game.all.useQuery();

  return (
    <main className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Image src={logoImg} alt="Logo NLW ESports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games &&
          games.map(({ id, name, box_art_url, ads }) => (
            <a key={id} href="" className="relative rounded-lg overflow-hidden">
              <img src={box_art_url} alt="" className="w-full h-full" />

              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{name}</strong>
                <span className="text-zinc-300 text-sm block">
                  {ads} anúncios
                </span>
              </div>
            </a>
          ))}
      </div>

      <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between">
          <div className="">
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
