import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  Linking
} from "react-native";
import moment from "moment";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Rating } from "react-native-ratings";
import "moment/locale/ru";

import { animations } from "../styles/global";
import { COLORS, globalStyles } from "../styles/global";
import { ICategory } from "../interfaces";
import { StateContext } from "../context/StateContext";
import { CaruselBaners } from "../components/Delivery/CaruselBaners";
import { setRating, getDeliveryFB } from "../firebase/queries";

const windowWidth = Dimensions.get("window").width;

moment.locale("ru");

interface DeliveryProps {
  route: any;
}

export const Delivery: React.FC<DeliveryProps> = ({ route }) => {
  const navigation = useNavigation();
  navigation.setOptions({ title: route.params.deliveryName });

  const { categories }: any = React.useContext(StateContext);
  let timeFormat2 = "HH:mm", openingTime, closingTime, nowTime, timeOpen, timeClose;

  const [delivery, setDelivery] = React.useState<any>()
  const [filtredCategories, setFiltredCategories] = React.useState<any>()
  const [userRating, setUserRating] = React.useState<number>(0);
  const [userActivity, setUserActivity] = React.useState<boolean>(true)
  const [popup, setPopup] = React.useState<{ error: boolean, success: boolean }>({ error: false, success: false });
  const [today, setToday] = React.useState(moment().utcOffset(8).format("LT"));

  React.useEffect(() => {
    getDeliveryFB(route.params.deliveryID).then((res: any) => {
      setDelivery(res)
      timeOpen = moment(res.timeOpen, "HH:mm").format("HH:mm");
      timeClose = moment(res.timeClose, "HH:mm").format("HH:mm");
      AsyncStorage.getItem('userActivity', (err, res: any) => {
        if (res) {
          let dataStorage = JSON.parse(res)
          let date = dataStorage.date.split('.')
          let nowDate = moment().add(10, 'days').calendar().split('.')
          if (date[0] !== nowDate[0] || date[1] !== nowDate[1] || date[2] !== nowDate[2]) {
            AsyncStorage.removeItem('userActivity')
            setUserActivity(true)
          }
          else {
            setUserActivity(false)
          }
        }
        else { setUserActivity(true) }
      })
      setFiltredCategories(() => {
        const categoriesDeliv = categories.filter((item: ICategory) => {
          if (res.categories.includes(item.id)) {
            return item;
          }
        });
        return categoriesDeliv
      })
    })

  }, [])

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

  let hoursToOpen = moment
    .utc(+moment.duration(timeOpen) - +moment.duration(today))
    .format("HH ч mm мин");
  let hoursToClose = moment
    .utc(+moment.duration(timeClose) - +moment.duration(today))
    .format("HH ч mm мин");

  const ratingCompleted = (rating: number) => {
    setUserRating(rating);
  };
  const onRate = () => {

    if (userActivity) {
      setPopup((prev) => ({ ...prev, success: true }));
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, success: false }));
      }, 5000);
      setRating(setDelivery, delivery, userRating)
      let dataStorage = { rule: false, date: moment().add(10, 'days').calendar() }
      AsyncStorage.setItem('userActivity', JSON.stringify(dataStorage))
      setUserActivity(false)
    }
    else {
      setPopup((prev) => ({ ...prev, error: true }));
      setTimeout(() => {
        setPopup((prev) => ({ ...prev, error: false }));
      }, 5000);
    }
  };
  const SlideRightToLeftSuccess = {
    from: {
      transform: [{
        translateX: popup.success ? windowWidth : 0
      }]
    },
    to: {
      transform: [{
        translateX: popup.success ? 0 : windowWidth * 0.5
      }]
    }
  }
  const SlideRightToLeftError = {
    from: {
      transform: [{
        translateX: popup.error ? windowWidth : 0
      }]
    },
    to: {
      transform: [{
        translateX: popup.error ? 0 : windowWidth * 0.5
      }]
    }
  }

  return (
    (delivery !== undefined && filtredCategories !== undefined ? (
      <ScrollView>
        <Animatable.View
          style={{ flexDirection: "row", margin: 10 }}
          easing={"ease-out"}
          animation={animations.FadeIn}
          duration={1500}
          delay={800}
        >
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={{ uri: delivery.logo }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                width: windowWidth * 0.6 - 15,
              }}
            >
              {filtredCategories.map((item: ICategory) => (
                <View style={styles.category} key={"category_" + item.id}>
                  <Text
                    style={[globalStyles.textLight, { fontSize: 22, margin: 5 }]}
                  >
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginTop: 10,
                width: windowWidth * 0.6 - 15,
              }}
            >
              <Rating
                readonly
                type="custom"
                ratingImage={require("../../assets/rating.png")}
                ratingColor="#FFBE4C"
                ratingBackgroundColor="#c8c7c8"
                ratingCount={5}
                imageSize={28}
                startingValue={delivery.rating.points}
                fractions={1}
              />
              <Text style={[globalStyles.textRegular, { fontSize: 18 }]}>
                ({delivery.rating.votes})
            </Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
          easing={"ease-out"}
          animation={animations.FadeIn}
          duration={1500}
          delay={800}
        >
          <View style={styles.infoBlock}>
            <View>
              <Text
                style={[
                  globalStyles.textRegular,
                  { fontSize: 20, textAlign: "center" },
                ]}
              >
                {delivery.timeOpen} - {delivery.timeClose}
              </Text>
            </View>
            {isAvailable(timeOpen, timeClose, moment()) ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={[
                    globalStyles.textLight,
                    { fontSize: 18, textAlign: "center" },
                  ]}
                >
                  Закроется через
              </Text>
                <Text
                  style={[
                    globalStyles.textLight,
                    { fontSize: 18, textAlign: "center" },
                  ]}
                >
                  {hoursToClose}
                </Text>
              </View>
            ) : (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Text
                    style={[
                      globalStyles.textLight,
                      { fontSize: 18, textAlign: "center" },
                    ]}
                  >
                    Откроется через
              </Text>
                  <Text
                    style={[
                      globalStyles.textLight,
                      { fontSize: 18, textAlign: "center" },
                    ]}
                  >
                    {hoursToOpen}
                  </Text>
                </View>
              )}
          </View>
          <View style={styles.infoBlock}>
            <View>
              <Text
                style={[
                  globalStyles.textRegular,
                  { fontSize: 20, textAlign: "center" },
                ]}
              >
                {delivery.delivFree} ₽
            </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 18, textAlign: "center" },
                ]}
              >
                Бесплатная
            </Text>
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 18, textAlign: "center" },
                ]}
              >
                доставка от
            </Text>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <View>
              <Text
                style={[
                  globalStyles.textRegular,
                  { fontSize: 20, textAlign: "center" },
                ]}
              >
                {delivery.delivPrice} ₽
            </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 18, textAlign: "center" },
                ]}
              >
                Стоимость
            </Text>
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 18, textAlign: "center" },
                ]}
              >
                доставки
            </Text>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View
          style={{ marginHorizontal: 10, marginBottom: 10 }}
          easing={"ease-out"}
          animation={animations.FadeIn}
          duration={1500}
          delay={800}
        >
          <Text style={[globalStyles.textRegular, { fontSize: 28 }]}>
            Как можно оплатить?
        </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {delivery.payment[0] ? (
              <Feather name="check-circle" size={18} color="orange" />
            ) : (
                <AntDesign name="closecircleo" size={18} color="black" />
              )}
            <View style={{ marginLeft: 5 }}>
              <Text style={[globalStyles.textLight, { fontSize: 18 }]}>
                Онлайн оплата картой
            </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {delivery.payment[1] ? (
              <Feather name="check-circle" size={18} color="orange" />
            ) : (
                <AntDesign name="closecircleo" size={18} color="black" />
              )}
            <View style={{ marginLeft: 5 }}>
              <Text style={[globalStyles.textLight, { fontSize: 18 }]}>
                Картой курьеру
            </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {delivery.payment[2] ? (
              <Feather name="check-circle" size={18} color="orange" />
            ) : (
                <AntDesign name="closecircleo" size={18} color="black" />
              )}
            <View style={{ marginLeft: 5 }}>
              <Text style={[globalStyles.textLight, { fontSize: 18 }]}>
                Наличными курьеру
            </Text>
            </View>
          </View>
        </Animatable.View>

        {delivery.promocode !== '' && (
          <Animatable.View
            style={styles.promoBlock}
            easing={"ease-out"}
            animation={animations.FadeIn}
            duration={1500}
            delay={800}
          >
            <Text style={[globalStyles.textLight, { fontSize: 18 }]}>
              Промокод:
            <Text style={[globalStyles.textRegular, { fontSize: 22 }]}>
                {" "}
                {delivery.promocode}
              </Text>
            </Text>

            <Text style={[globalStyles.textLight, { fontSize: 18 }]}>
              {delivery.promoDesc}
            </Text>
          </Animatable.View>
        )}
        {delivery.baners.length !== 0 && (
          <Animatable.View
            easing={"ease-out"}
            animation={animations.FadeIn}
            duration={1500}
            delay={800}
          >
            <CaruselBaners baners={delivery.baners} />
          </Animatable.View>
        )}
        {(delivery.phoneNumber !== "" || delivery.linkSite !== "" || delivery.linkInst !== "" || delivery.addresses.length !== 0 || delivery.linkAppApple !== "" || delivery.linkAppGoogle !== "") && (
          <Animatable.View
            easing={"ease-out"}
            animation={animations.FadeIn}
            duration={1500}
            delay={800}
          >
            <View style={[globalStyles.hr, { marginVertical: 10 }]} />
            <View style={{ marginHorizontal: 10 }}>
              {delivery.phoneNumber !== "" && (
                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${delivery.phoneNumber}`) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.linkBox}>
                      <Feather name="phone" size={24} color={COLORS.FONT} />
                    </View>
                    <Text style={[globalStyles.textLight, { fontSize: 22 }]}>
                      {delivery.phoneNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {delivery.linkSite !== "" && (
                <TouchableOpacity onPress={() => { Linking.openURL(delivery.linkSite) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.linkBox}>
                      <MaterialCommunityIcons
                        name="web"
                        size={26}
                        color={COLORS.FONT}
                      />
                    </View>
                    <Text style={[globalStyles.textLight, { fontSize: 22 }]}>
                      {delivery.linkSite}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {delivery.linkInst !== "" && (
                <TouchableOpacity onPress={() => { Linking.openURL(delivery.linkInst) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.linkBox}>
                      <AntDesign name="instagram" size={26} color={COLORS.FONT} />
                    </View>
                    <Text style={[globalStyles.textLight, { fontSize: 22 }]}>
                      @{delivery.linkInst.match(/https:\/\/[^/]+\/([^\/]+)\//)[1]}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.linkBox}>
                  <Entypo name="address" size={22} color={COLORS.FONT} />
                </View>
                <View>
                  {delivery.addresses.map((item: string, index: number) => (
                    <Text
                      key={`delivery_address_${index}`}
                      style={[globalStyles.textLight, { fontSize: 22 }]}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
                {delivery.linkAppApple !== "" && (
                  <TouchableOpacity onPress={() => { Linking.openURL(delivery.linkAppApple) }}>
                    <Image source={require('../../assets/appStore.png')} style={{ width: windowWidth * 0.4, height: 50, resizeMode: 'stretch' }} />
                  </TouchableOpacity>
                )}
                {delivery.linkAppGoogle !== "" && (
                  <TouchableOpacity onPress={() => { Linking.openURL(delivery.linkAppGoogle) }}>
                    <Image source={require('../../assets/googlePlay.png')} style={{ width: windowWidth * 0.4, height: 50, resizeMode: 'stretch' }} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animatable.View>
        )}

        <Animatable.View
          easing={"ease-out"}
          animation={animations.FadeIn}
          duration={1500}
          delay={800}
          style={{ marginVertical: 10 }}
        >
          <View style={[globalStyles.hr, { marginBottom: 10 }]} />
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={[
                globalStyles.textRegular,
                { fontSize: 28, marginBottom: 5 },
              ]}
            >
              Как вам доставка?
          </Text>
            <Text
              style={[
                globalStyles.textLight,
                { fontSize: 28, marginBottom: 10, textAlign: "center" },
              ]}
            >
              {userRating}
            </Text>
            <Rating
              type="custom"
              ratingImage={require("../../assets/rating.png")}
              ratingColor="#FFBE4C"
              ratingBackgroundColor="#c8c7c8"
              ratingCount={5}
              imageSize={52}
              startingValue={userRating}
              fractions={1}
              onFinishRating={ratingCompleted}
            />
            <TouchableOpacity
              onPress={onRate}
              style={[styles.btn, globalStyles.bgSuccess]}
            >
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 24, color: "white", textAlign: "center" },
                ]}
              >
                ОЦЕНИТЬ
            </Text>
            </TouchableOpacity>

            <Animatable.View
              style={styles.popup}
              easing={"ease-out"}
              animation={SlideRightToLeftSuccess}
              duration={1000}
            >
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 18, color: "white", textAlign: "center" },
                ]}
              >
                Спасибо за оценку
              </Text>
            </Animatable.View>
            
            <Animatable.View
              style={styles.popupError}
              easing={"ease-out"}
              animation={SlideRightToLeftError}
              duration={1000}
            >
              <Text
                style={[
                  globalStyles.textLight,
                  { fontSize: 18, color: "white", textAlign: "center" },
                ]}
              >
                Оценка выставляется один раз вдень
              </Text>
            </Animatable.View>

            <View style={[globalStyles.hr, { marginVertical: 10 }]} />
          </View>
        </Animatable.View>

      </ScrollView>
    ) : (
        <SafeAreaView style={styles.containerWait}>
          <Image source={require('../../assets/loading.gif')} />
        </SafeAreaView>
      ))

  );
};

const styles = StyleSheet.create({
  containerWait: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: windowWidth * 0.4 - 10,
    height: windowWidth * 0.4 - 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    width: windowWidth * 0.4 - 10,
    height: windowWidth * 0.4 - 10,
    borderRadius: 10,
  },
  category: {
    borderWidth: 1,
    margin: 2,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
  },
  infoBlock: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: windowWidth * 0.33 - 10,
  },

  promoBlock: {
    width: "100%",
    backgroundColor: COLORS.MAIN,
    padding: 15,
    marginBottom: 10,
  },

  linkBox: {
    margin: 5,
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D4D4D4",
    backgroundColor: COLORS.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn: {
    borderRadius: 5,
    width: "98%",
    padding: 5,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  popup: {
    backgroundColor: COLORS.SUCCESS,
    position: "absolute",
    right: -10,
    top: 0,
    width: windowWidth * 0.3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  popupError: {
    backgroundColor: COLORS.DANGER,
    position: "absolute",
    right: -10,
    top: 0,
    width: windowWidth * 0.4,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
