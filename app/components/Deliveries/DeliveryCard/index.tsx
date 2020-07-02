import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { IDelivery } from "../../../interfaces";
import Constants from "expo-constants";
import { COLORS, globalStyles } from "../../../styles/global";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface DeliveryCardProps {
  delivery: IDelivery;
  onPress: () => void;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({
  delivery,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: delivery.logo }} />
        <View style={styles.text}>
          <Text style={styles.name}>{delivery.name}</Text>
          <Text>
            Минимальный чек для бесплатной доставки: {delivery.delivFree}р.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  main: {
    height: windowHeight * 0.15,
    width: "100%",
    backgroundColor: COLORS.MAIN,
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  text: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    marginBottom: 7,
    color: COLORS.FONT,
  },
  subName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
  },
});
{
  /* <View style={styles.container}>
      <TouchableOpacity style={styles.main}>
        <Text style={[globalStyles.textLarge, styles.name]}>
          {delivery.name}
        </Text>
      </TouchableOpacity>
    </View> */
}
