import { View, Image, FlatList } from "react-native";

import logoImg from "../assets/logo-nlw-esports.png";
import { GameCard } from "../components/game-card";
import { Heading } from "../components/heading";

import { GAMES } from "../utils/games";

export const HomeScreen = () => {
  return (
    <View className="h-full w-full flex items-center">
      <Image source={logoImg} className="w-[214] h-[120] mt-20 mb-12" />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      ></Heading>

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <GameCard
            data={item}
            className={[
              index == 0 ? "ml-8" : "",
              index == GAMES.length - 1 ? "mr-8" : "",
            ].join(" ")}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
