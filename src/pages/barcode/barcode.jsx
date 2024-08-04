import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { products } from "./src/hooks/datas";
import { Audio } from "expo-av";

export default function BarCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);
  const [sound, setSound] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./src/components/audio/chin-up-554.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const product = products.find((product) => product.code === data);
    if (product) {
      setScannedData((prevScannedData) => {
        const existingProduct = prevScannedData.find(
          (item) => item.code === data
        );
        if (existingProduct) {
          return prevScannedData.map((item) =>
            item.code === data ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevScannedData, { ...product, quantity: 1 }];
        }
      });
    } else {
      setScannedData((prevScannedData) => [
        ...prevScannedData,
        { name: "Unknown Product", code: data, quantity: 1 },
      ]);
    }

    playSound();
    setTimeout(() => {
      setScanned(false);
    }, 2000); // Sesin süresi kadar bekle
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <FlatList
        data={scannedData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Code: {item.code}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Unit: {item.unit}</Text>
            <Text>Group: {item.group}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 50,
  },
  item: {
    fontSize: 16,
    margin: 10,
    backgroundColor: "#f9c2ff",
    padding: 10,
  },
});
