import { View, Image, FlatList } from "react-native";

import { trpc } from "../utils/trpc";

import { GameCard } from "../components/game-card";
import { Heading } from "../components/heading";
import { Background } from "../components/background";

import logoImg from "../assets/logo-nlw-esports.png";

export const HomeScreen = () => {
  const { data: games } = trpc.game.all.useQuery();

  return (
    <Background>
      <View className="flex h-full w-full items-center">
        <Image source={logoImg} className="mt-20 mb-12 h-[120] w-[214]" />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        ></Heading>

        {games && (
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <GameCard
                data={item}
                className={`
                  ${index == 0 ? "ml-8" : ""}
                  ${index == games.length - 1 ? "mr-8" : ""}
                `}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </Background>
  );
};
