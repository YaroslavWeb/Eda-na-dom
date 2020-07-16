import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { ICategory } from "../../../interfaces";
import { COLORS, globalStyles } from "../../../styles/global";

const windowWidth = Dimensions.get("window").width;

interface CategoryBoxProps {
  category: ICategory;
}
export const CategoryBox: React.FC<CategoryBoxProps> = ({
  category,
}) => {
  return (
    <View style={styles.box}>
      <Text style={[{ fontSize: 18, textAlign: 'center' }, globalStyles.textRegular]}>{category.name}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: category.image }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: windowWidth * 0.33 - 25,
    height: windowWidth * 0.33 - 25,
    margin: 12,
    justifyContent: "space-between",
    padding: 10,
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
    alignItems: "center",
  },
  image: {
    width: windowWidth * 0.33 - 75,
    height: windowWidth * 0.33 - 75,
    resizeMode: 'contain'
  },
});
