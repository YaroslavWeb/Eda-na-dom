import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Constants from "expo-constants";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface DeliveriesProps {
  route: any;
}

export const Deliveries: React.FC<DeliveriesProps> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
