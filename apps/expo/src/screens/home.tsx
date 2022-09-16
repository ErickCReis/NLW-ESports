import { View, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { trpc } from "../utils/trpc";

import { Game, GameCard } from "../components/game-card";
import { Heading } from "../components/heading";
import { AppRoutesParams } from "../routes/app.routes";

import logoImg from "../assets/logo-nlw-esports.png";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppRoutesParams,
  "game"
>;

export const HomeScreen = () => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const { data: games } = trpc.game.all.useQuery();

  const handleOpenGame = (game: Game) => {
    navigate("game", game);
  };

  return (
    <View className="flex-1 items-center">
      <Image source={logoImg} className="mt-20 mb-12 h-[120] w-[214]" />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      ></Heading>

      {games && (
        <FlatList
          data={games}
          className="flex-grow-0"
          keyExtractor={(game) => game.id}
          renderItem={({ item, index }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
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
  );
};
