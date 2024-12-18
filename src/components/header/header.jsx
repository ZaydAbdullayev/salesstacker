import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export function HeaderComponent(props) {
    return (
        <Appbar.Header elevated style={styles.header}>
            {props.back && <Appbar.BackAction onPress={() => navigation.goBack()} />}
            <Appbar.Content title={props.header === 0 ? "Statistics" : <IconIo name="wallet" size={24} color="black" />} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        width: screenWidth,
        backgroundColor: "#f2f2f2",
    }
})