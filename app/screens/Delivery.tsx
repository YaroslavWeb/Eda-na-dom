import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { COLORS, globalStyles } from "../styles/global";
import { ICategory, IDelivery } from "../interfaces";
import moment, { locale, now } from "moment";
import "moment/locale/ru";
import { AntDesign } from "@expo/vector-icons";
const windowHeight = Dimensions.get("window").height;

interface DeliveryProps {
  route: any;
}
function wait(timeout: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const Delivery: React.FC<DeliveryProps> = ({ route }) => {
  const [delivery, setDelivery] = React.useState<IDelivery>(
    route.params.delivery
  );

  let timeFormat2 = "HH:mm";
  let openingTime;
  let closingTime;
  let nowTime;
  function isAvailable(
    opening: moment.MomentInput,
    closing: moment.MomentInput,
    now: moment.MomentInput
  ) {
    openingTime = moment(opening, timeFormat2).date(1);
    closingTime = moment(closing, timeFormat2).date(1);
    nowTime = moment(now, timeFormat2).date(1);
    if (closingTime.isBefore(openingTime)) {
      closingTime.date(2);
    }
    return nowTime.isBetween(openingTime, closingTime);
  }

  moment.locale("ru");
  const [today, setToday] = React.useState(moment().utcOffset(8).format("LT"));
  const [refreshing, setRefreshing] = React.useState(false);

  let timeOpen = moment(delivery.timeOpen, "HH:mm").format("HH:mm");
  let timeClose = moment(delivery.timeClose, "HH:mm").format("HH:mm");
  let hoursToOpen = moment
    .utc(moment.duration(timeOpen) - moment.duration(today))
    .format("HH ч mm мин");
  let hoursToClose = moment
    .utc(moment.duration(timeClose) - moment.duration(today))
    .format("HH ч mm мин");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setToday(moment().utcOffset(8).format("LT"));

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.blockTop}>
          <View style={styles.blockImage}>
            <Image style={styles.image} source={{ uri: delivery.logo }} />
          </View>
          <View style={styles.blockName}>
            <View style={{}}>
              <Text style={styles.name}>{delivery.name}</Text>
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
                {delivery.timeOpen}-{delivery.timeClose}
              </Text>
            </View>
            {isAvailable(timeOpen, timeClose, moment()) ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>Закроется через</Text>
                <Text style={{ fontSize: 12 }}>{hoursToClose}</Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontSize: 12 }}>Откроется через</Text>
                  <Text style={{ fontSize: 12 }}>{hoursToOpen}</Text>
                </View>
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
                {delivery.delivFree} ₽
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 12 }}>Бесплатная</Text>
              <Text style={{ fontSize: 12 }}>доставка от</Text>
            </View>
          </View>
          <View style={styles.openHours}>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <Text style={[globalStyles.textMedium, styles.blockTimeText]}>
                {delivery.delivPrice} ₽
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 12 }}>Стоимость</Text>
              <Text style={{ fontSize: 12 }}>доставки</Text>
            </View>
          </View>
        </View>
        <View style={styles.blockPayment}>
          <Text style={globalStyles.textMedium}>Как можно оплатить? </Text>
          <View style={styles.typeOfPayment}>
            {delivery.payment[0] ? (
              <Feather name="check-circle" size={18} color="orange" />
            ) : (
              <AntDesign name="closecircleo" size={18} color="black" />
            )}
            <View style={styles.textPayment}>
              <Text>Онлайн оплата картой</Text>
            </View>
          </View>
          <View style={styles.typeOfPayment}>
            {route.params.delivery.payment[1] ? (
              <Feather name="check-circle" size={18} color="orange" />
            ) : (
              <AntDesign name="closecircleo" size={18} color="black" />
            )}
            <View style={styles.textPayment}>
              <Text>Картой курьеру</Text>
            </View>
          </View>
          <View style={styles.typeOfPayment}>
            {route.params.delivery.payment[2] ? (
              <Feather name="check-circle" size={18} color="orange" />
            ) : (
              <AntDesign name="closecircleo" size={18} color="black" />
            )}
            <View style={styles.textPayment}>
              <Text>Наличными курьеру</Text>
            </View>
          </View>
        </View>
        {delivery.promocode && ( ///пофиксить отображение промокода
          <View style={styles.blockPromo}>
            <Text style={[globalStyles.textMedium]}>
              Промокод:
              <Text style={{ fontWeight: "bold" }}>{delivery.promocode}</Text>
            </Text>

            <Text style={[globalStyles.textSmall]}>{delivery.promoDesc}</Text>
          </View>
        )}

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={[globalStyles.textBig, { color: COLORS.MAIN }]}>
            Актуальные акции
          </Text>
          <ScrollView horizontal>
            {delivery.baners.map((item: any, index: number) => (
              <View style={{ width: "100%" }} key={"baner_" + index}>
                <Image style={{ width: "100%" }} source={{ uri: item }}></Image>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.links}>
          <Text>{delivery.linkSite}</Text>
          <Text>{delivery.linkInst}</Text>
          <Text>{delivery.phoneNumber}</Text>
        </View>

        <View style={styles.AppLinks}>
          <View style={{ width: "40%" }}>
            <Image
              style={{
                height: 50,
                width: 150,
                resizeMode: "stretch",
              }}
              source={require("../../assets/Download_on_the_App_Store_Badge_RU.png")}
            ></Image>
          </View>

          <View style={{ width: "40%" }}>
            <Image
              style={{
                height: 50,
                width: 150,
                resizeMode: "stretch",
              }}
              source={require("../../assets/google-play-badge.png")}
            ></Image>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 4,
    width: "30%",
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  category: {
    borderWidth: 1,
    paddingHorizontal: 12,
    margin: 1,
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
  blockPayment: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 30,
    marginHorizontal: 3,
  },
  textPayment: {
    marginLeft: 10,
  },
  typeOfPayment: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  blockPromo: {
    width: "100%",
    backgroundColor: COLORS.MAIN,
    padding: 15,
  },
  links: {
    flexDirection: "column",
  },
  AppLinks: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
