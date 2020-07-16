import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Rating } from "react-native-ratings";

import { StateContext } from "../../../context/StateContext";
import { IDelivery, ICategory } from "../../../interfaces";
import { COLORS, globalStyles } from "../../../styles/global";

import { Entypo, SimpleLineIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

interface SecondDeliveryCardProps {
  delivery: IDelivery;
}

export const SecondDeliveryCard: React.FC<SecondDeliveryCardProps> = ({
  delivery,
}) => {
  const { categories }: any = React.useContext(StateContext)

  const categoryDelivery = categories.filter((item: ICategory) => {
    if (delivery.categories.includes(item.id)) { return item }
  })
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: delivery.logo }} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.name, globalStyles.textRegular]}>{delivery.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Rating
              readonly
              type="custom"
              ratingImage={require("../../../../assets/rating2.png")}
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
      </View>

      <View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {categoryDelivery.map((category: ICategory) => (
            <Text key={`category${category.id}_${delivery.id}`} style={[globalStyles.textLight, { fontSize: 18, margin: 5 }]}>{category.name}</Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SimpleLineIcons name="clock" size={24} color={COLORS.MAIN} />
          <Text style={[globalStyles.textLight, { fontSize: 20, marginLeft: 10 }]}>{delivery.timeOpen} - {delivery.timeClose}</Text>
        </View>
        <View style={globalStyles.hr} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {delivery.promocode !== '' && (
            <View style={styles.extraBox}>
              <Text style={[globalStyles.textLight, { color: COLORS.FONT, fontSize: 18 }]}>ПРОМОКОД+</Text>
            </View>
          )}
          {delivery.linkAppApple !== '' && (
            <View style={styles.extraBox}>
              <Ionicons name="ios-appstore" size={24} color={COLORS.FONT} />
            </View>
          )}
          {delivery.linkAppGoogle !== '' && (
            <View style={styles.extraBox}>
              <Entypo name="google-play" size={24} color={COLORS.FONT} />
            </View>
          )}
          {delivery.linkInst !== '' && (
            <View style={styles.extraBox}>
              <AntDesign name="instagram" size={24} color={COLORS.FONT} />
            </View>
          )}
          {delivery.linkSite !== '' && (
            <View style={styles.extraBox}>
              <MaterialCommunityIcons name="web" size={24} color={COLORS.FONT} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    fontSize: 28,
    marginBottom: 7,
    color: COLORS.FONT,
  },
  extraBox: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D4D4D4',
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
  extra: {

  }
});

