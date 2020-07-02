import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { COLORS, globalStyles } from "../styles/global";
import { DeliveryCard } from "../components/Deliveries/DeliveryCard";
import { useNavigation } from "@react-navigation/native";
import { getDeliveriesFB } from "../firebase/queries";
import { IDelivery } from "../interfaces";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CategoryProps {
  route: any;
}

export const Category: React.FC<CategoryProps> = ({ route }) => {
  const [deliveries, setDeliveries] = React.useState<IDelivery[]>([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    getDeliveriesFB(setDeliveries, route.params.cityID);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.textName}>{route.params.category.name}</Text>
      </View>
      <FlatList
        data={deliveries}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => "deliveries_" + item.id}
        renderItem={({ item }) => (
          <DeliveryCard
            delivery={item}
            onPress={() =>
              navigation.navigate("Delivery", {
                delivery: item,
                categories: route.params.categories,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={globalStyles.hr} />}
      />
      {/* //{" "}
      <View style={styles.container}>
        // <Text>{route.params.name}</Text>
        //{" "} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    //backgroundColor: COLORS.WHITE,
    backgroundColor: "#f8f4f4",
    padding: 20,
  },
  list: {},
  name: {
    marginVertical: 10,
  },
  textName: {
    fontSize: 28,
  },
});
