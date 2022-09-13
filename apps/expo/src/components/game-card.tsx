import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

export type GameCardProps = {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
};

type Props = TouchableOpacityProps & {
  data: GameCardProps;
};

export const GameCard: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <TouchableOpacity
      className="w-60 h-80 mr-6 rounded-lg overflow-hidden relative"
      {...rest}
    >
      <ImageBackground className="w-full h-full" source={data.cover}>
        <LinearGradient
          className="w-full h-full flex justify-end p-4"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
        >
          <Text className="text-white text-base font-[bold]">{data.name}</Text>
          <Text className="text-caption-300 text-base font-[regular]">
            {data.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
