import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/home/home";
import BarCodeScannerComponent from "./pages/barcode/barcode";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMu from "react-native-vector-icons/MaterialCommunityIcons";
import IconIo from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
export function BottomNavigationBarExample() {
  const header = useSelector((state) => state.header);

  const navigate = useNavigation();
  const getTabBarIcon = (route, focused, color, size) => {
    let iconName;
    let IconComponent;

    switch (route.name) {
      case "Home":
        iconName = "home";
        IconComponent = Icon;
        break;
      case "History":
        iconName = "history";
        IconComponent = Icon;
        break;
      case "QR code":
        iconName = "qrcode";
        IconComponent = IconMu;
        break;
      case "Store":
        iconName = "storefront";
        IconComponent = IconIo;
        break;
      case "Settings":
        iconName = "cog";
        IconComponent = Icon;
        break;
      default:
        IconComponent = Icon;
        iconName = "question";
        break;
    }

    return <IconComponent name={iconName} size={size} color={color} />;
  };

  const getHeaderTitle = (tittle) => {
    switch (tittle) {
      case "QR code":
        return header.toString();
      default:
        return tittle;
    }
  };

  const getHeaderLeft = (tittle) => {
    switch (tittle) {
      case "QR code":
        return (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <IconIo
              name="chevron-back-outline"
              size={24}
              style={styles.backword}
            />
          </TouchableOpacity>
        );
      default:
        return undefined;
    }
  };

  const getHeaderRight = (tittle) => {
    switch (tittle) {
      case "QR code":
        return (
          <TouchableOpacity onPress={() => navigate.navigate("Store")}>
            <IconMu name="account-cash" size={26} style={styles.debit} />
          </TouchableOpacity>
        );
      default:
        return undefined;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: "limegreen",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: route.name === "QR code" ? "none" : "flex",
        },

        headerTitle: getHeaderTitle(route.name),
        headerLeft: () => getHeaderLeft(route.name),
        headerRight: () => getHeaderRight(route.name),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={HomeScreen} />
      <Tab.Screen name="QR code" component={BarCodeScannerComponent} />
      <Tab.Screen name="Store" component={SettingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  backword: {
    paddingLeft: 10,
  },
  debit: {
    paddingRight: 15,
  },
});
