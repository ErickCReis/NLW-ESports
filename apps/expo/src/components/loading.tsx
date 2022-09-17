import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

export const Loading = () => {
  return (
    <View className="flex-1">
      <ActivityIndicator
        color={colors.violet["500"]}
        size="large"
        className="m-auto p-4"
      />
    </View>
  );
};
