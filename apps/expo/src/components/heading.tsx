import type React from "react";
import { Text, View, ViewProps } from "react-native";

type Props = ViewProps & {
  title: string;
  subtitle: string;
};

export const Heading: React.FC<Props> = ({ title, subtitle, ...rest }) => {
  return (
    <View className={"w-full p-8"} {...rest}>
      <Text className="font-[black] text-2xl text-white">{title}</Text>
      <Text className="font-[regular] text-base text-zinc-400">{subtitle}</Text>
    </View>
  );
};
