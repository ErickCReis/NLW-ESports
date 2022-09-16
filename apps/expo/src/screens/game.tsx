import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { AppRoutesParams } from "../routes/app.routes";

import logoImg from "../assets/logo-nlw-esports.png";
import { Heading } from "../components/heading";
import { DuoCard } from "../components/duo-card";
import { trpc } from "../utils/trpc";

type GameScreenRouteProp = RouteProp<AppRoutesParams, "game">;

export const GameScreen = () => {
  const { params: game } = useRoute<GameScreenRouteProp>();
  const { goBack } = useNavigation();

  const { data: duos } = trpc.game.adsById.useQuery(game.id);

  return (
    <View className="flex h-full w-full items-center">
      <View className="mt-7 flex w-full flex-row items-end justify-between px-8">
        <TouchableOpacity onPress={goBack}>
          <Entypo name="chevron-thin-left" color="#D4D4D8" size={20} />
        </TouchableOpacity>
        <Image source={logoImg} className="h-10 w-20" />
        <View className="w-5" />
      </View>

      <Image
        source={{ uri: game.box_art_url }}
        className="mt-8 h-40 w-80 rounded-lg"
        resizeMode="cover"
      ></Image>

      <Heading title={game.name} subtitle="Conecte-se e comece a jogar!" />

      {duos && (
        <FlatList
          data={duos}
          className={duos.length > 0 ? "w-full flex-grow-0" : "p-8"}
          keyExtractor={(duo) => duo.id}
          renderItem={({ item, index }) => (
            <DuoCard
              data={item}
              onConnect={() => {}}
              style={`
                  ${index == 0 ? "ml-8" : ""}
                  ${index == duos.length - 1 ? "mr-8" : ""}
                `}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text className="text-center text-caption-300">
              Não há anúncios publicados ainda
            </Text>
          )}
        />
      )}
    </View>
  );
};
