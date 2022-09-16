import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/home";
import { GameScreen } from "../screens/game";
import { Game } from "../components/game-card";

export type AppRoutesParams = {
  home: undefined;
  game: Game;
};

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="game" component={GameScreen} />
    </Navigator>
  );
};
