import { useCallback } from "react";
import { View } from "react-native";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { Background } from "./components/background";
import { Loading } from "./components/loading";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Inter-Regular.ttf"),
    semibold: require("../assets/fonts/Inter-SemiBold.ttf"),
    bold: require("../assets/fonts/Inter-Bold.ttf"),
    black: require("../assets/fonts/Inter-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <View onLayout={onLayoutRootView}>
          <Background>{fontsLoaded ? <HomeScreen /> : <Loading />}</Background>
        </View>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

registerRootComponent(App);
