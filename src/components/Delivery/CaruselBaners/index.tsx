import React from "react";
import { StyleSheet, Dimensions, View, Image, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import { COLORS } from "../../../styles/global";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CaruselBanersProps {
  baners: string[];
}
export const CaruselBaners: React.FC<CaruselBanersProps> = ({ baners }) => {
  const [carousel, setCarusel] = React.useState({
    activeIndex: 0,
    carouselItems: baners,
  });

  return (
    <View
      style={{ paddingTop: 10, justifyContent: "center", alignItems: "center" }}
    >
      <Carousel
        layout={"default"}
        loop={true}
        data={carousel.carouselItems}
        sliderWidth={windowWidth * 1}
        autoplay={true}
        autoplayInterval={4000}
        itemWidth={windowWidth * 1 - 20}
        renderItem={({ item, index }) => (
          <Image style={styles.baner} source={{ uri: item }} />
        )}
        onSnapToItem={(index) =>
          setCarusel((prev) => ({ ...prev, activeIndex: index }))
        }
      />
      <View style={styles.bullets}>
        {carousel.carouselItems.map((item, index) => (
          <Text
            key={index}
            style={{
              ...styles.bullet,
              opacity: carousel.activeIndex === index ? 1 : 0.5,
            }}
          ></Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baner: {
    width: windowWidth * 1 - 20,
    height: windowHeight * 0.38 - 15,
    resizeMode: "contain",
    borderRadius: 5,
  },
  bullets: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  bullet: {
    margin: 5,
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: COLORS.MAIN,
  },
});
