import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { products } from "../../hooks/datas";
import { Audio } from "expo-av";
import Icon from "@expo/vector-icons/Entypo";
import { BlurView } from "expo-blur";
import { CameraView, Camera } from "expo-camera";
import { acFinish, acHeader } from "../../context/dinamik-header";
import { useDispatch } from "react-redux";
import { ModalComponent } from "../../components/modal/modal";

const width = Dimensions.get("window").width;
export default function BarCodeScannerComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);
  const [sound, setSound] = useState();
  const [activeProduct, setActiveProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../components/audio/chin-up-554.mp3")
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
    const product = products.find((product) => product.code === data) || {
      name: "Unknown Product",
      code: data,
      quantity: 1,
      description: "something",
    };
    const updatedProduct = {
      ...product,
      quantity: (product.quantity || 0) + 1,
    };
    setScannedData((prevScannedData) => {
      const existingIndex = prevScannedData.findIndex(
        (item) => item.code === data
      );
      if (existingIndex !== -1) {
        const updatedScannedData = prevScannedData.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setActiveProduct(existingIndex);
        return updatedScannedData;
      } else {
        setActiveProduct(prevScannedData.length);
        return [...prevScannedData, updatedProduct];
      }
    });
    if (product.price) {
      dispatch(acHeader(product.price));
    }
    playSound();
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  const changeQuantity = (product, amount) => {
    if (!product) return;
    const priceChange = amount * product.price;
    dispatch(acHeader(priceChange));
    setScannedData((prevScannedData) => {
      const existingIndex = prevScannedData.findIndex(
        (item) => item.code === product.code
      );
      if (existingIndex === -1) return prevScannedData;
      const updatedQuantity = prevScannedData[existingIndex].quantity + amount;
      if (updatedQuantity <= 0) {
        if (existingIndex === activeProduct) {
          setActiveProduct(null);
        }
        return prevScannedData.filter((_, index) => index !== existingIndex);
      } else {
        const updatedScannedData = prevScannedData.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: updatedQuantity }
            : item
        );
        if (existingIndex === activeProduct) {
          setActiveProduct(existingIndex);
        }
        return updatedScannedData;
      }
    });
  };

  const finishScanning = async () => {
    setScannedData([]);
    dispatch(acFinish());
    setActiveProduct(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "aztec",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code93",
            "code128",
            "itf",
            "codabar",
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <BlurView style={{ ...styles.box, position: "relative" }}>
        <View style={styles.activeProduct}>
          <View style={styles.flex1}>
            <Text style={{ fontSize: 18 }}>
              {scannedData?.[activeProduct]?.name}
            </Text>
            <Text style={{ color: "#999" }}>
              {scannedData?.[activeProduct]?.description}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {activeProduct !== null && (
                <Icon name="cross" size={14} color={"#333"} />
              )}{" "}
              {scannedData?.[activeProduct]?.quantity}
            </Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              onPress={() => changeQuantity(scannedData?.[activeProduct], -1)}
            >
              <View style={styles.btn}>
                <Icon
                  style={styles.icon}
                  name="minus"
                  size={28}
                  color={"red"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeQuantity(scannedData?.[activeProduct], 1)}
            >
              <View style={styles.btn}>
                <Icon
                  style={styles.icon}
                  name="plus"
                  size={28}
                  color={"limegreen"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={scannedData}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setActiveProduct(index)}>
              <View
                style={
                  activeProduct === index
                    ? { ...styles.item, backgroundColor: "lime" }
                    : styles.item
                }
              >
                <View>
                  <Text>{item.name}</Text>
                </View>
                <View style={styles.text}>
                  <Text>{item.quantity}</Text>
                  <Icon name="cross" size={14} color={"#333"} />
                  <Text>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.controlBox}>
          <TouchableOpacity>
            <View style={styles.controlItem}>
              <Text>Qarzdorlik</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={styles.controlItem}>
              <Text>Qo'lda kiritish</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={finishScanning}>
            <View style={styles.controlItem}>
              <Text>Yakunlash</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
      <ModalComponent open={open} setOpen={setOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    paddingTop: 300,
  },
  box: {
    flex: 1,
    padding: 10,
  },
  flex1: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  activeProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    width: 60,
    height: 60,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  icon: {
    margin: "auto",
  },
  controlBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    width: width,
    padding: 5,
    gap: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  controlItem: {
    width: Math.floor(width / 3 - 13 / 3),
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
});
