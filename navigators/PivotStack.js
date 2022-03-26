import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Event from "../screens/Event";
import EventDetails from "../screens/EventDetails";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

const SignUp = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        gestureEnabled: true,
        keyboardHandlingEnabled: true,
      }}
      initialRouteName={"Event"}
    >
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Event_details" component={EventDetails} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default SignUp;
