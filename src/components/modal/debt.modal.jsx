import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { debtors as data } from "../../hooks/datas";
import {
  Button,
  Divider,
  Headline,
  Searchbar,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useModalStore from "../../context/modale.store";

export const DebtModalComponent = () => {
  const [search, setSearch] = useState("");
  const { modals, closeModal } = useModalStore();
  const [type, setType] = useState("select");
  const [value, setValue] = useState({});
  const { isOpen, props } = modals.debt;
  const [debtors, setDebtors] = useState(data);
  const filteredDebtors = debtors.filter((debtor) =>
    debtor.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (key, value) => {
    setValue((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    if (type === "new") {
      setDebtors((prev) => [...prev, value]);
      setValue({});
      setType("select");
    } else {
      setDebtors((prev) => {
        const index = prev.findIndex((debtor) => debtor.name === value.name);
        prev[index] = value;
        return prev;
      });
      setValue({});
      setType("select");
    }
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => closeModal("debt")}>
          <FontAwesome6 name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
        <Searchbar
          style={{ width: "100%", margin: 10, backgroundColor: "#f1f1f1" }}
          label="Search"
          placeholder="Search customer"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <SegmentedButtons
          value={type}
          onValueChange={(value) => {
            setType(value);
            setValue({});
          }}
          buttons={[
            {
              value: "select",
              label: "Tanlash",
            },
            {
              value: "new",
              label: "Yangi +",
            },
          ]}
          theme={{
            colors: {
              secondaryContainer: "#000",
              primary: "#f1f1f1",
              onSecondaryContainer: "#fff",
            },
          }}
          style={{ marginBottom: 10, marginTop: 5 }}
        />
        {type === "new" || type === "update" ? (
          <View style={{ width: "100%", gap: 5 }}>
            <Headline style={{ fontSize: 20, marginTop: 15 }}>
              {type === "update"
                ? "Ma'lumotlarni yangilash"
                : "Yangi mijoz qo'shish"}
            </Headline>
            <Divider bold />
            <TextInput
              label="Ismi"
              mode="outlined"
              outlineColor="#f1f1f1"
              activeOutlineColor="#ccc"
              value={value.name}
              onChangeText={(text) => handleChange("name", text)}
              style={styles.input}
            />
            <TextInput
              label="Telefon"
              mode="outlined"
              outlineColor="#f1f1f1"
              activeOutlineColor="#ccc"
              value={value.phone}
              onChangeText={(text) => handleChange("phone", text)}
              style={styles.input}
            />
            <TextInput
              label="Qarz"
              mode="outlined"
              outlineColor="#f1f1f1"
              activeOutlineColor="#ccc"
              value={value.debt?.toString()}
              onChangeText={(text) => handleChange("debt", text)}
              style={styles.input}
            />
            <Button
              mode="contained-tonal"
              style={styles.button}
              textColor="#fff"
              onPress={submit}
            >
              Saqlash
            </Button>
          </View>
        ) : (
          <FlatList
            data={filteredDebtors}
            style={{ width: "100%" }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setType("update");
                  setValue(item);
                }}
              >
                <View style={styles.item}>
                  <View>
                    <Text>{item.name}</Text>
                    <Text style={styles.text}>{item.phone}</Text>
                  </View>
                  <Text style={styles.text}>{item.debt}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "#777",
  },
  input: {
    backgroundColor: "#f1f1f1",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#000",
  },
});
