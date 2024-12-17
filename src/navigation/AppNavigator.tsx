import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import SetupScreen from "../screens/SetupScreen";
import GameScreen from "../screens/GameScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1e90ff",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Setup"
          component={SetupScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1e90ff",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1e90ff",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1e90ff",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
