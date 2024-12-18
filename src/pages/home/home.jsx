import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconMl from "@expo/vector-icons/MaterialCommunityIcons";
import IconFe from "@expo/vector-icons/Feather";
import { LineChart } from "react-native-chart-kit";
import { Avatar } from "react-native-paper";

const screenWidth = Dimensions.get("window").width - 20;
export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const data = {
    labels: ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan", "Yak"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 65],
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optiona
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {/* <HeaderComponent header={header} /> */}
        <View style={styles.box}>
          <View style={styles.borderBox}>
            <View style={styles.cash}>
              <Ionicons name="wallet" size={24} color="black" />
              <Text>3,000,000</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.rightCircle}></View>
          <View style={styles.leftCircle}></View>
          <View style={styles.borderBox}>
            <View style={styles.chartBox}>
              <LineChart
                data={data}
                width={screenWidth - 20} // Padding için genişliği azaltıyoruz
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </View>
          </View>
        </View>
        <View style={styles.dailyReportContainer}>
          <IconMl size={24} name="fruit-citrus" style={{ paddingLeft: 10 }} />
          <Text style={styles.dailyReportTitle}>Meyvalar</Text>
          <IconFe size={24} name="chevron-right" style={{ paddingTop: 5 }} />
          <View style={styles.dailyReportBox}>
            <Avatar.Icon icon="fruit-cherries" />
            <Avatar.Icon icon="fruit-grapes" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-watermelon" />
          </View>
        </View>
        <View style={styles.dailyReportContainer}>
          <IconMl size={24} name="fruit-citrus" style={{ paddingLeft: 10 }} />
          <Text style={styles.dailyReportTitle}>Meyvalar</Text>
          <IconFe size={24} name="chevron-right" style={{ paddingTop: 5 }} />
          <View style={styles.dailyReportBox}>
            <Avatar.Icon icon="fruit-cherries" />
            <Avatar.Icon icon="fruit-grapes" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-watermelon" />
          </View>
        </View>
        <View style={styles.dailyReportContainer}>
          <IconMl size={24} name="fruit-citrus" style={{ paddingLeft: 10 }} />
          <Text style={styles.dailyReportTitle}>Meyvalar</Text>
          <IconFe size={24} name="chevron-right" style={{ paddingTop: 5 }} />
          <View style={styles.dailyReportBox}>
            <Avatar.Icon icon="fruit-cherries" />
            <Avatar.Icon icon="fruit-grapes" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-watermelon" />
          </View>
        </View>
        <View style={styles.dailyReportContainer}>
          <IconMl size={24} name="fruit-citrus" style={{ paddingLeft: 10 }} />
          <Text style={styles.dailyReportTitle}>Meyvalar</Text>
          <IconFe size={24} name="chevron-right" style={{ paddingTop: 5 }} />
          <View style={styles.dailyReportBox}>
            <Avatar.Icon icon="fruit-cherries" />
            <Avatar.Icon icon="fruit-grapes" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-pineapple" />
            <Avatar.Icon icon="fruit-watermelon" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    // paddingTop: 20,
    // paddingBottom: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 20,
  },
  box: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  borderBox: {
    width: screenWidth - 20,
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 35,
  },
  cash: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  chartBox: {
    paddingTop: 10,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  chart: {
    borderRadius: 16,
  },
  divider: {
    width: screenWidth - 70,
    height: 25,
    backgroundColor: "#f5f5f5",
  },
  rightCircle: {
    position: "absolute",
    top: 69,
    left: 10,
    width: 27,
    height: 27,
    borderRadius: 18,
    backgroundColor: "#fff",
  },
  leftCircle: {
    position: "absolute",
    top: 69,
    right: 10,
    width: 27,
    height: 27,
    borderRadius: 18,
    backgroundColor: "#fff",
  },
  dailyReportContainer: {
    width: screenWidth - 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  dailyReportTitle: {
    flex: 1,
    fontSize: 24,
  },
  dailyReportBox: {
    width: screenWidth - 20,
    height: "auto",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 30,
  },
});
