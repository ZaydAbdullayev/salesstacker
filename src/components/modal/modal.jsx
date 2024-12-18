import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import arrow from "../../../assets/down-arrow-5.png";

export const ModalComponent = ({ open, setOpen }) => {
  return (
    <Modal visible={open} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => setOpen(false)}>
          <Image source={arrow} style={styles.close} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 130,
    borderRadius: 20,
  },
  close: {
    width: 40,
    height: 15,
    marginTop: 15,
  },
});
