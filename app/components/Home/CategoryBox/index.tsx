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
import { COLORS } from "../../../styles/global";

const windowWidth = Dimensions.get("window").width;

interface CategoryBoxProps {
  category: ICategory;
  onPress: () => void;
}
export const CategoryBox: React.FC<CategoryBoxProps> = ({
  category,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: category.image }} />
        </View>
        <Text style={{ fontSize: 14 }}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  product: {
    width: windowWidth * 0.33 - 25,
    height: windowWidth * 0.33 - 25,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "dashed",
    borderColor: COLORS.BORDER,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: COLORS.MAIN,
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: windowWidth * 0.33 - 75,
    height: windowWidth * 0.33 - 75,
  },
});
