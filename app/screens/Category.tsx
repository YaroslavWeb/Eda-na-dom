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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const cafes = [
  {
    id: "1",
    name: "Papa Johns",
    logo:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/14/31/06/14310649-f0c7-2aac-3539-e783cc5512d0/source/512x512bb.jpg",
    city: "Irkutsk",
    categories: ["1", "2"],
    timeOpen: "09:00",
    timeClose: "21:00",
    minPrice: "350",
    linkSite: "www.cafe.ru",
    linkApp: "cafe.app",
    linkInst: "inst.cafe.com",
    phoneNumber: "8914878784",
    baners: [
      { uri: "https://img.icons8.com/ios/2x/salad.png" },
      { uri: "uri2" },
    ],
  },
  {
    id: "2",
    name: "cafe2",
    logo:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/14/31/06/14310649-f0c7-2aac-3539-e783cc5512d0/source/512x512bb.jpg",
    city: "Irkutsk",
    categories: ["1", "2"],
    timeOpen: "08:00",
    timeClose: "20:00",
    minPrice: "500",
    linkSite: "www.cafe2.ru",
    linkApp: "cafe2.app",
    linkInst: "inst.cafe2.com",
    phoneNumber: "8914878784",
    baners: [
      { uri: "https://img.icons8.com/ios/2x/salad.png" },
      { uri: "uri2" },
    ],
  },
  {
    id: "3",
    name: "cafe3",
    logo:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/14/31/06/14310649-f0c7-2aac-3539-e783cc5512d0/source/512x512bb.jpg",
    city: "Irkutsk",
    categories: ["1", "2"],
    timeOpen: "08:00",
    timeClose: "20:00",
    minPrice: "500",
    linkSite: "www.cafe3.ru",
    linkApp: "cafe2.app",
    linkInst: "inst.cafe3.com",
    phoneNumber: "8914878784",
    baners: [
      { uri: "https://img.icons8.com/ios/2x/salad.png" },
      { uri: "uri2" },
    ],
  },
  {
    id: "4",
    name: "cafe4",
    logo:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/14/31/06/14310649-f0c7-2aac-3539-e783cc5512d0/source/512x512bb.jpg",
    city: "Irkutsk",
    categories: ["1", "2"],
    timeOpen: "08:00",
    timeClose: "20:00",
    minPrice: "500",
    linkSite: "www.cafe2.ru",
    linkApp: "cafe2.app",
    linkInst: "inst.cafe2.com",
    phoneNumber: "8914878784",
    baners: [
      { uri: "https://img.icons8.com/ios/2x/salad.png" },
      { uri: "uri2" },
    ],
  },
];

interface CategoryProps {
  route: any;
}

export const Category: React.FC<CategoryProps> = ({ route }) => {
  const [deliveries, setDeliveries] = useState(cafes);
  const navigation = useNavigation();
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
