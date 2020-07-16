import React from "react";
import { TouchableOpacity, FlatList, SafeAreaView, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

import { FirstDeliveryCard } from "../components/Category/FirstDeliveryCard";
import { SecondDeliveryCard } from "../components/Category/SecondDeliveryCard";
import { ThirdDeliveryCard } from "../components/Category/ThirdDeliveryCard";
import { AnotherDeliveryCard } from "../components/Category/AnotherDeliveryCard";
import { IDelivery } from "../interfaces";
import { getOnDeliveriesByCityCategoryFB } from '../firebase/queries'
import { animations, COLORS } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";

interface CategoryProps {
  route: any;
}

export const Category: React.FC<CategoryProps> = ({ route }) => {
  const navigation = useNavigation();
  const [deliveries, setDeliveries] = React.useState<IDelivery | any>()

  React.useEffect(() => {
    getOnDeliveriesByCityCategoryFB(setDeliveries, 'IOIbXJyRMWCRBJ64ZzAu', route.params.category.id)
  }, [])

  return (
    (deliveries ? (
      <FlatList
        data={deliveries}
        contentContainerStyle={{backgroundColor:COLORS.WHITE, flex:1}}
        keyExtractor={(item) => "deliveries_" + item.id}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <Animatable.View easing={'ease-out'} animation={animations.SlideLeftToRight} duration={1000} delay={500 * index + 800}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Delivery", {
                      deliveryID: item.id,
                      deliveryName: item.name
                    })
                  }
                >
                  <FirstDeliveryCard delivery={item} />
                </TouchableOpacity>
              </Animatable.View>
            );
          }
          else if (index === 1) {
            return (
              <Animatable.View easing={'ease-out'} animation={animations.SlideLeftToRight} duration={1000} delay={500 * index + 800}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Delivery", {
                      deliveryID: item.id,
                      deliveryName: item.name
                    })
                  }
                >
                  <SecondDeliveryCard delivery={item} />
                </TouchableOpacity>
              </Animatable.View>
            )
          }
          else if (index === 2) {
            return (
              <Animatable.View easing={'ease-out'} animation={animations.SlideLeftToRight} duration={1000} delay={500 * index + 800}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Delivery", {
                      deliveryID: item.id,
                      deliveryName: item.name
                    })
                  }
                >
                  <ThirdDeliveryCard delivery={item} />
                </TouchableOpacity>
              </Animatable.View>
            )
          }
          else {
            return (
              <Animatable.View easing={'ease-out'} animation={animations.SlideLeftToRight} duration={1000} delay={500 * index + 800}>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Delivery", {
                      deliveryID: item.id,
                      deliveryName: item.name
                    })
                  }
                >
                  <AnotherDeliveryCard delivery={item} />
                </TouchableOpacity>
              </Animatable.View>
            );
          }
        }}
        showsVerticalScrollIndicator={false}
      // ItemSeparatorComponent={() => <View style={globalStyles.hr} />}
      />
    ) : (
        <SafeAreaView style={styles.containerWait}>
          <Image source={require('../../assets/loading.gif')} />
        </SafeAreaView>
      ))

  );
};


const styles = StyleSheet.create({
  containerWait: {
    flex: 1,
    backgroundColor:COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

});