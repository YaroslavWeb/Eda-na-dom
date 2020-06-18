import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../styles/global";
import { CategoryBox } from "../components/Home/CategoryBox";
import { getCategoriesFB } from "../firebase/queries";
import { ICategory } from "../interfaces";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    getCategoriesFB(setCategories);
  }, []);

  return (
    <>
      {categories.length !== 0 ? (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.body}>
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
                  onPress={() =>
                    navigation.navigate("Category", {
                      category: item,
                      categories,
                    })
                  }
                />
              )}
              horizontal={false}
              numColumns={3}
            />
          </SafeAreaView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.containerWait}>
          <Text style={styles.wait}>Подождите...</Text>
        </SafeAreaView>
      )}
    </>
  );
};

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
  containerWait: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  wait: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
