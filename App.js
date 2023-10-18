import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { StateProvider } from "./src/contexts/StateContext";

import AuthStack from "./src/stacks/AuthStack";

export default () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </StateProvider>
  );
};
