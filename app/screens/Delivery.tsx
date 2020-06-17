import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Constants from "expo-constants";
import { COLORS, globalStyles } from "../styles/global";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface DeliveryProps {
  route: any;
}
export const Delivery: React.FC<DeliveryProps> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: route.params.logo }}></Image>
      <View>
        <Text style={styles.name}>{route.params.name}</Text>
        <Text style={styles.minPrice}>
          Доставка от {route.params.minPrice}р.
        </Text>
        <View style={styles.openHours}>
          <Text>
            {route.params.timeOpen}-{route.params.timeClose}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    //backgroundColor: COLORS.WHITE,
    backgroundColor: "#f8f4f4",
    padding: 5,
  },
  name: {
    fontSize: 33,
  },
  image: {
    height: windowHeight * 0.25,
    width: "100%",
    borderRadius: 15,
  },
  minPrice: {
    fontSize: 14,
  },
  openHours: {
    flexDirection: "row",
  },
  info: {
    flexDirection: "row",
  },
});
