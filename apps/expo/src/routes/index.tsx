import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";

import { AppRoutes } from "./app.routes";

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgba(0,0,0,0)",
  },
};

export const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppRoutes />
    </NavigationContainer>
  );
};
