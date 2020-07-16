import React from "react";
import { StyleSheet, Dimensions, View, Image, Text } from "react-native";
import Carousel from "react-native-snap-carousel";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CaruselBanersProps {
  baners: string[];
}
export const CaruselBaners: React.FC<CaruselBanersProps> = ({ baners }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Carousel
        layout={"default"}
        loop={true}
        data={baners}
        sliderWidth={windowWidth * 1 - 40}
        autoplay={true}
        autoplayInterval={4000}
        itemWidth={windowWidth * 1 - 40}
        renderItem={({ item, index }) => (
          <Image style={styles.baner} source={{ uri: item }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  baner: {
    width: windowWidth * 1 - 40,
    height: windowHeight * 0.3,
    resizeMode: "contain",
    borderRadius: 5,
  },
});
