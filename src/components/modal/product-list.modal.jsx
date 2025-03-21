import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { products } from "../../hooks/datas";
import { Searchbar } from "react-native-paper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useModalStore from "../../context/modale.store";

export const ModalComponent = () => {
  const [search, setSearch] = useState("");
  const { modals, closeModal } = useModalStore();
  const { isOpen, props } = modals.product_list;
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => closeModal("product_list")}>
          <FontAwesome6 name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
        {/* search */}
        <Searchbar
          style={{ width: "100%", margin: 10, backgroundColor: "#f1f1f1" }}
          label="Search"
          placeholder="Search product"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <FlatList
          data={filteredProducts}
          style={{ width: "100%" }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                props.add({
                  data: item.code,
                  bounds: { origin: { x: 100, y: 100 } },
                });
                closeModal("product_list");
              }}
            >
              <View style={styles.item}>
                <View>
                  <Text>{item.name}</Text>
                </View>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  close: {
    width: 25,
    height: 25,
    marginTop: 15,
  },
  item: {
    flexDirection: "column",
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "#777",
  },
});
