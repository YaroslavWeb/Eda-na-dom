import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../styles/global";
import { CategoryBox } from "../components/Home/CategoryBox";
import { getCategoriesFB } from "../firebase/queries";
import { ICategory } from "../interfaces";

export default function HomeScreen() {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    getCategoriesFB(setCategories);
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.body}>
        {categories.length !== 0 ? (
          <FlatList
            ListHeaderComponent={() => (
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Выберите категорию:
              </Text>
            )}
            ListHeaderComponentStyle={styles.head}
            contentContainerStyle={styles.content}
            data={categories}
            keyExtractor={(item) => "category_" + item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryBox
                category={item}
                onPress={() => navigation.navigate("Category", item)}
              />
            )}
            horizontal={false}
            numColumns={3}
          />
        ) : (
          <Text>Подождите...</Text>
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE,
  },
  head: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  body: {
    justifyContent: "space-evenly",
    padding: 5,
  },
  content: {},
});
