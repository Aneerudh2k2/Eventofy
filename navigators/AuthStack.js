import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import PivotStack from "./PivotStack";

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => {
  const [isFirstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setFirstLaunch(true);
      } else {
        // change it to false
        setFirstLaunch(true);
      }
    });
  });

  let routeName;
  console.log("First launch: ", isFirstLaunch);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = "SignIn";
  } else {
    routeName = "Pivot";
  }
  console.log("Route name: ", routeName);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={routeName}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Pivot" component={PivotStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
