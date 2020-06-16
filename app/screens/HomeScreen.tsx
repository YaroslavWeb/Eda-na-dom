import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";

import { CategoryBox } from "../components/Home/CategoryBox";
import Constants from "expo-constants";
export default function HomeScreen() {
  const products = [
    {
      id: "1",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда1 ",
    },
    {
      id: "2",
      image: "https://img.icons8.com/ios/2x/tomato.png",
      name: "Еда2 ",
    },
    {
      id: "3",
      image: "https://img.icons8.com/ios/2x/potato.png",
      name: "Еда3 ",
    },
    {
      id: "4",
      image: "https://img.icons8.com/ios/2x/cucumber.png",
      name: "Еда4 ",
    },
    {
      id: "5",
      image: "https://img.icons8.com/ios/2x/potato.png",
      name: "Еда5 ",
    },
    {
      id: "6",
      image: "https://img.icons8.com/ios/2x/cherry.png",
      name: "Еда6 ",
    },
    {
      id: "7",
      image: "https://img.icons8.com/ios/2x/banana.png",
      name: "Еда7 ",
    },
    {
      id: "8",
      image: "https://img.icons8.com/ios/2x/apple.png",
      name: "Еда7 ",
    },
    {
      id: "9",
      image: "https://img.icons8.com/ios/2x/orange.png",
      name: "Еда7 ",
    },
    {
      id: "10",
      image: "https://img.icons8.com/ios/2x/grapes.png",
      name: "Еда7 ",
    },
    {
      id: "11",
      image: "https://img.icons8.com/ios/2x/carrot.png",
      name: "Еда7 ",
    },
    {
      id: "12",
      image: "https://img.icons8.com/ios/2x/bread.png",
      name: "Еда7 ",
    },
    {
      id: "13",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда7 ",
    },
    {
      id: "14",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда7 ",
    },
    {
      id: "15",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда7 ",
    },
    {
      id: "16",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда7 ",
    },
    {
      id: "17",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда7 ",
    },
    {
      id: "18",
      image: "https://img.icons8.com/ios/2x/salad.png",
      name: "Еда7 ",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <FlatList
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Выберите категорию:
            </Text>
          )}
          ListHeaderComponentStyle={styles.head}
          contentContainerStyle={styles.content}
          data={products}
          keyExtractor={(item) => "category_" + item.id}
          renderItem={({ item }) => <CategoryBox category={item} />}
          horizontal={false}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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
