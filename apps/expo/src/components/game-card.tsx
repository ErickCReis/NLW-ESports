import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";

type Props = TouchableOpacityProps & {
  data: inferProcedureOutput<AppRouter["game"]["all"]>[number];
};

export const GameCard: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <TouchableOpacity
      className="relative mr-6 h-80 w-60 overflow-hidden rounded-lg"
      {...rest}
    >
      <ImageBackground
        className="h-full w-full"
        source={{ uri: data.box_art_url }}
      >
        <LinearGradient
          className="flex h-full w-full justify-end p-4"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
        >
          <Text className="font-[bold] text-base text-white">{data.name}</Text>
          <Text className="font-[regular] text-base text-caption-300">
            {data.ads} anúncio{data.ads == 1 ? "" : "s"}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
