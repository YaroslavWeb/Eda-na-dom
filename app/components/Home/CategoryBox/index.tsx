import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ICategory } from "../../../interfaces";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CategoryBoxProps {
  category: ICategory;
}
export const CategoryBox: React.FC<CategoryBoxProps> = ({ category }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Deliveries", category)}
    >
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
    borderColor: "grey",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
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
