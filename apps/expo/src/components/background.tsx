import type React from "react";
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import backgroundImg from "../assets/background-galaxy.png";

type Props = {
  children?: React.ReactNode;
};

export const Background: React.FC<Props> = ({ children }) => {
  return (
    <ImageBackground
      className="flex-1 bg-dark-800"
      source={backgroundImg}
      defaultSource={backgroundImg}
    >
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">{children}</SafeAreaView>
    </ImageBackground>
  );
};
