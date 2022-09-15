import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";

import { trpc } from "../utils/trpc";

import { GameBanner } from "../components/GameBanner";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { BannerDialog } from "../components/BannerDialog";

import logoImg from "../assets/logo-nlw-esports.svg";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: games } = trpc.game.all.useQuery();

  return (
    <>
      <Head>
        <title>NLW ESports</title>
      </Head>
      <main className="mx-auto my-20 flex max-w-[1344px] flex-col items-center">
        <Image src={logoImg} alt="Logo NLW ESports" />
        <h1 className="mt-20 text-6xl font-black">
          Seu{" "}
          <span className="bg-nlw-gradient bg-clip-text text-transparent">
            duo
          </span>{" "}
          está aqui.
        </h1>

        <div className="mt-16 grid grid-cols-6 gap-6">
          {games &&
            games.map((game) => <GameBanner key={game.id} game={game} />)}
        </div>

        <CreateAdBanner onClick={() => setIsOpen(true)} />

        <BannerDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </main>
    </>
  );
};

export default Home;
