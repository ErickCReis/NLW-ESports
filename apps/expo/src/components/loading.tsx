import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return (
    <View className="h-full w-full">
      <ActivityIndicator
        color="#8B5CF6"
        size="large"
        className="m-auto p-4"
      ></ActivityIndicator>
    </View>
  );
};
