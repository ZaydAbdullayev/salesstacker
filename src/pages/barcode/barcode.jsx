import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { products } from "../../hooks/datas";
import { Audio } from "expo-av";
import Icon from "@expo/vector-icons/Entypo";
import { BlurView } from "expo-blur";
import { CameraView, Camera } from "expo-camera";
import { ModalComponent } from "../../components/modal/product-list.modal";
import { styles } from "./barcode.styles";
import { useNavigation } from "@react-navigation/native";
import useHeaderStore from "../../context/header";
import useModalStore from "../../context/modale.store";
import { DebtModalComponent } from "../../components/modal/debt.modal";

export default function BarCodeScannerComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const [sound, setSound] = useState();
  const [activeProduct, setActiveProduct] = useState(null);
  const [cameraKey, setCameraKey] = useState(0);
  const navigation = useNavigation();
  const scannedLock = useRef(false);
  const { addPrice, finish } = useHeaderStore();
  const { openModal } = useModalStore();

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCameraKey((prevKey) => prevKey + 1); // Kamerayı yeniden başlat
    });
    setScannedData([]);
    finish();
    setActiveProduct(null);

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ data, bounds }) => {
    if (scannedLock.current) return; // Eğer tarama kilidi aktifse işlem yapma
    scannedLock.current = true; // Tarama başladığında kilitle

    if (bounds && bounds.origin) {
      const { x, y } = bounds.origin;
      if (x > 0 && x < 500 && y > 0 && y < 360) {
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
          addPrice(product.price);
        }
        playSound();
        setTimeout(() => {
          scannedLock.current = false;
        }, 2000);
      }
    }
  };

  const changeQuantity = (product, amount) => {
    if (!product) return;
    const priceChange = amount * product.price;
    addPrice(priceChange);
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
    finish();
    setActiveProduct(null);
    openModal("snackbar", { message: "Harid yakunlandi!" });
  };

  const cancelSaling = async () => {
    setScannedData([]);
    finish();
    setActiveProduct(null);
    openModal("snackbar", { message: "Harid bekor qilindi!" });
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
        key={cameraKey}
        onBarcodeScanned={handleBarCodeScanned}
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
        focusable={true}
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
          <TouchableOpacity
            onPress={cancelSaling}
            disabled={scannedData.length === 0}
          >
            <View style={styles.controlItem}>
              <Text>Bekor qilish</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openModal("product_list", { add: handleBarCodeScanned })
            }
          >
            <View style={styles.controlItem}>
              <Text>Qo'lda kiritish</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={finishScanning}
            disabled={scannedData.length === 0}
          >
            <View style={styles.controlItem}>
              <Text>Yakunlash</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
      <ModalComponent />
      <DebtModalComponent />
    </View>
  );
}
