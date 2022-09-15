import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { AppRoutes } from "./app.routes";

export const Routes = () => {
  return (
    <View className="h-full w-full">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
};
