import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

import { COLORS, globalStyles } from "../styles/global";
import { ICategory } from "../interfaces";
import moment, { locale } from "moment";
import "moment/locale/ru";
import { analytics } from "firebase";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface DeliveryProps {
  route: any;
}
export const Delivery: React.FC<DeliveryProps> = ({ route }) => {
  moment.locale("ru");
  const [today, setToday] = React.useState(moment().format("LT"));
  let now = moment();
  //let now = moment(route.params.delivery.timeOpen).diff(moment().toNow());
  let endTime = route.params.delivery.timeOpen;
  let startTime = moment().utcOffset(8).format("HH:mm");
  let hoursToOpen = moment
    .utc(
      moment.duration(endTime, "hours") - moment.duration(startTime, "hours")
    )
    .format("HH ч mm мин");
  console.log(typeof route.params.delivery.timeOpen);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.blockTop}>
          <View style={styles.blockImage}>
            <Image
              style={styles.image}
              source={{ uri: route.params.delivery.logo }}
            />
          </View>
          <View style={styles.blockName}>
            <View style={{}}>
              <Text style={styles.name}>{route.params.delivery.name}</Text>
            </View>

            <View>
              <Text style={styles.rating}>Здесь будет рейтинг</Text>
            </View>

            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {route.params.categories.map((item: ICategory) => (
                <View style={styles.category} key={"category_" + item.id}>
                  <Text style={[globalStyles.textSmall]}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.blockInfo}>
          <View style={styles.openHours}>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <Text style={[globalStyles.textMedium, styles.blockTimeText]}>
                {route.params.delivery.timeOpen}-
                {route.params.delivery.timeClose}
              </Text>
            </View>
            {moment().isBetween(
              route.params.delivery.timeOpen,
              route.params.delivery.timeClose
            ) ? (
              <Text style={{ fontSize: 14 }}>жопа</Text>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 14, //РАЗОБРАТЬСЯ С ПАДДИНГАМИ !!!!!!
                }}
              >
                <Text style={{ fontSize: 14 }}>
                  Откроется через {hoursToOpen}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.openHours}>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <Text style={[globalStyles.textMedium, styles.blockTimeText]}>
                {route.params.delivery.minPrice}
              </Text>
            </View>
            {moment().isBetween(
              route.params.delivery.timeOpen,
              route.params.delivery.timeClose
            ) ? (
              <Text style={{ fontSize: 14 }}>жопа</Text>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 28, //РАЗОБРАТЬСЯ С ПАДДИНГАМИ !!!!!!
                }}
              >
                <Text style={{ fontSize: 14 }}>Бесплатная доставка от</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.blockDeliveryTime}>
          <Text>Время доставки много минут</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#f8f4f4",
    padding: 5,
  },
  name: {
    fontSize: 30,
  },
  blockImage: {
    width: "50%",
  },
  image: {
    height: windowHeight * 0.25,
    width: "100%",
    borderRadius: 10,
  },
  blockTop: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 30,
    marginHorizontal: 8,
  },
  blockName: {
    width: "50%",
    marginHorizontal: 10,
  },
  rating: {
    fontSize: 14,
  },
  openHours: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    width: "45%",
    borderColor: COLORS.BORDER,
    borderWidth: 1,
  },
  category: {
    borderWidth: 1,
    paddingHorizontal: 12,
    margin: 3,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
  },
  blockInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  blockTimeText: {
    fontWeight: "bold",
  },
  blockDeliveryTime: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "92%",
    borderColor: COLORS.BORDER,
    borderWidth: 1,
  },
});
