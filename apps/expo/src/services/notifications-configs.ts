import * as Notifications from "expo-notifications";

export const startNotificationConfig = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

export const getPushNotificationToken = async () => {
  let { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    const { granted } = await Notifications.requestPermissionsAsync();

    if (!granted) {
      return;
    }
  }

  const pushToken = await Notifications.getExpoPushTokenAsync();
  return pushToken.data;
};
