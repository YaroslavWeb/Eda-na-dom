import React from "react";
import "./src/firebase/connection";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import { YellowBox } from "react-native";
import _ from "lodash";

import { StateContext } from "./src/context/StateContext";
import { Home } from "./src/screens/Home";
import { Category } from "./src/screens/Category";
import { Delivery } from "./src/screens/Delivery";
import { COLORS, getFonts } from "./src/styles/global";
import { ICategory, ICity } from "./src/interfaces";
import { getCategoriesFB, getCityFB } from "./src/firebase/queries";

// Clean firebase connection warning
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message: string) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const Stack = createStackNavigator();
export default function App() {
  const [dataLoaded, setDataLoaded] = React.useState<boolean>(false)
  const [categories, setCategories] = React.useState<ICategory[]>([])
  const [city, setCity] = React.useState<ICity>();

  const initialApp = async () => {
    await getFonts()
    await getCategoriesFB(setCategories)
    await getCityFB(setCity, 'IOIbXJyRMWCRBJ64ZzAu')
  }

  if (dataLoaded) {
    return (
      <StateContext.Provider value={{categories, city}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.MAIN,
              },
              headerTitleStyle: { fontFamily: 'yanone-regular', fontSize: 32 },
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Иркутск' }}
            />
            <Stack.Screen
              name="Category"
              component={Category}
              options={({ route }: any) => ({
                title: route.params.category.name,
              })}

            />
            <Stack.Screen
              name="Delivery"
              component={Delivery}
              // options={({ route }: any) => ({
              //   title: route.params.delivery.name,
              // })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StateContext.Provider>

    )
  }
  else {
    return (
      <AppLoading startAsync={initialApp} onFinish={() => { setDataLoaded(true) }} />
    );
  }
}
