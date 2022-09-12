import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Text className="text-5xl font-bold mx-auto pb-2">
          NLW E-Sports
        </Text>
      </View>
    </SafeAreaView>
  );
};
