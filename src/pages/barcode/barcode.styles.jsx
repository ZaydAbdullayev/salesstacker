import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
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
    width: "100%",
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
