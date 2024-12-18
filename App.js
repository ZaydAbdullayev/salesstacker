import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigationBarExample } from "./src/router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { store } from "./src/context/store";
import { Provider } from "react-redux";
enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <BottomNavigationBarExample />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
