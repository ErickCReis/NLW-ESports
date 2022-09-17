import { useCallback, useEffect, useRef } from "react";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

import type { Subscription } from "expo-modules-core";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TRPCProvider } from "./utils/trpc";

import { Loading } from "./components/loading";
import { Background } from "./components/background";
import { Routes } from "./routes";
import {
  getPushNotificationToken,
  startNotificationConfig,
} from "./services/notifications-configs";

startNotificationConfig();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Inter-Regular.ttf"),
    semibold: require("../assets/fonts/Inter-SemiBold.ttf"),
    bold: require("../assets/fonts/Inter-Bold.ttf"),
    black: require("../assets/fonts/Inter-Black.ttf"),
    ionicons: require("../assets/fonts/Ionicons.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();

    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("getNotificationListener", notification);
      });

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("responseNotificationListener", response);
      });

    return () => {
      getNotificationListener.current?.remove();
      responseNotificationListener.current?.remove();
    };
  }, []);

  return (
    <TRPCProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <Background>{fontsLoaded ? <Routes /> : <Loading />}</Background>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

registerRootComponent(App);
