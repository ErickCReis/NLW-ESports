import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GameScreen } from "../screens/game";
import { HomeScreen } from "../screens/home";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="game" component={GameScreen} />
    </Navigator>
  );
};
