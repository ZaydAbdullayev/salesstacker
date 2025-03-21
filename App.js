import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigationBarExample } from "./src/router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Snackbar } from "react-native-paper";
import useModalStore from "./src/context/modale.store";
enableScreens();

export default function App() {
  const { modals, closeModal } = useModalStore()
  const { isOpen, props } = modals.snackbar;
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomNavigationBarExample />
        <Snackbar
          visible={isOpen}
          elevation={5}
          rippleColor={"#0f0"}
          duration={500}
          onDismiss={() => closeModal("snackbar")}
        >
          {props.message}
        </Snackbar>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
