import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

import { COLORS, globalStyles, animations } from "../styles/global";
import { CategoryBox } from "../components/Home/CategoryBox";
import { CaruselBaners } from "../components/Home/CaruselBaners";
import { StateContext } from "../context/StateContext";

export const Home = () => {
  const navigation = useNavigation();

  const { categories, city }: any = React.useContext(StateContext)
  return (
    <>
      {categories.length !== 0 && city ? (
        <SafeAreaView style={styles.container}>
            <FlatList
              ListHeaderComponent={() => (
                <Animatable.View easing={'ease-out'} animation={animations.SlideBottomToTop} duration={1000} delay={200}>
                  <CaruselBaners baners={city.baners} />
                  <View style={globalStyles.hr} />
                </Animatable.View>
              )}
              ListHeaderComponentStyle={styles.head}
              contentContainerStyle={styles.content}
              data={categories}
              keyExtractor={(item) => "category_" + item.id}
              showsVerticalScrollIndicator={false}
              // ListFooterComponent={()=>(
              //  <>
              //   <View style={globalStyles.hr}/>
              //   <CaruselBaners baners={city.baners}/>
              // </>
              // )}
              renderItem={({ item, index }) => (
                <Animatable.View easing={'ease-out'} animation={animations.SlideBottomToTop} duration={1500} delay={500 * index + 800}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Category", {
                        category: item,
                        cityID: "IOIbXJyRMWCRBJ64ZzAu",
                      })
                    }
                  >
                    <CategoryBox category={item} />
                  </TouchableOpacity>
                </Animatable.View>
              )}
              horizontal={false}
              numColumns={3}
            />
        </SafeAreaView>
      ) : (
          <SafeAreaView style={styles.containerWait}>
            <Image source={require('../../assets/loading.gif')}/>
          </SafeAreaView>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 5,
    paddingBottom:0
  },
  head: {
    justifyContent: "flex-end",
  },
  content: {
    flex:1
  },
  containerWait: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});
