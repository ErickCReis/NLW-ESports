import type React from "react";
import { Text, View, ViewProps } from "react-native";

type Props = ViewProps & {
  title: string;
  subtitle: string;
};

export const Heading: React.FC<Props> = ({ title, subtitle, ...rest }) => {
  return (
    <View className={"w-full p-8"} {...rest}>
      <Text className="text-white text-2xl font-[black]">{title}</Text>
      <Text className="text-caption-400 text-base font-[regular]">
        {subtitle}
      </Text>
    </View>
  );
};
