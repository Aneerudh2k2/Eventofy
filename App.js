import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";
import "react-native-gesture-handler";
import AuthStack from "./navigators/AuthStack";

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // const token = (await Notifications.getDevicePushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const sendNotification = async () => {
    let response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[_gVEhAH7tB7tWftUlf-yW_]",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
      }),
    });

    response = await response.json();

    // let receipt = await fetch("https://exp.host/--/api/v2/push/getReceipts", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ids: [response.data[0].id, response.data[1].id],
    //   }),
    // });

    console.log(response);

    // let response = await fetch("https://fcm.googleapis.com/fcm/send", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization:
    //       "key=AAAAlL24ULY:APA91bHnOrxIGPJdsAGILkBjhPnEJ9DeBN4cgtDRHfMGgjOerC7IMj6PmTcXv-sSIFsJQd77cXn0QdabwJpxYZZteBso21YgSeCNJ8AIUPh0jLDUPGPSK-N2hID2xSI-tGEnoLaeaIfr",
    //   },
    //   body: JSON.stringify({
    //     to: "fAXRE80nSrGfhcOifQX49z:APA91bHq5W4qPJFuShXSnumM06ILCDtkDuEOB67VwWyUBny-NzLaUwrU5BQhYNTne5ssefs3165FV2Z2K_fZ3GALo_C3z44oUjnBihKUpQTOu5MJvy8bCn2jfVG7wmoZ4yFrq3BIpmZb",
    //     priority: "normal",
    //     data: {
    //       experienceId: "@aneerudh/Eventofy",
    //       title: "\uD83D\uDCE7 You've got mail",
    //       message: "Hello world! \uD83C\uDF10",
    //     },
    //   }),
    // });
  };

  return <AuthStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3490dc",
    borderWidth: 1,
    alignItems: "center",
  },
});
