import { StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";

const dimensions = Dimensions.get("window");

export const getFonts = () =>
  Font.loadAsync({
    "yanone-extraLight": require("../../assets/fonts/YanoneKaffeesatz-ExtraLight.ttf"),
    "yanone-light": require("../../assets/fonts/YanoneKaffeesatz-Light.ttf"),
    "yanone-regular": require("../../assets/fonts/YanoneKaffeesatz-Regular.ttf"),
    "yanone-bold": require("../../assets/fonts/YanoneKaffeesatz-Bold.ttf"),
  });

export const COLORS = {
  MAIN: "#FFBE4D", // #E2A600
  FONT: "#374140",
  BORDER: "#181c1c",
  PRIMARY: "#3E9BFF",
  SUCCESS: "#28A745",
  DANGER: "#DC3545",
  WHITE: "#fff",
};

export const globalStyles = StyleSheet.create({

  textExtraLight: { fontFamily: "yanone-extraLight" },
  textLight: { fontFamily: "yanone-light" },
  textRegular: { fontFamily: "yanone-regular" },
  textBold: { fontFamily: "yanone-bold" },

  bgMain: { backgroundColor: COLORS.MAIN },
  bgPrimary: { backgroundColor: COLORS.PRIMARY },
  bgSuccess: { backgroundColor: COLORS.SUCCESS },
  bgDanger: { backgroundColor: COLORS.DANGER },

  hr: {
    borderBottomColor: "#D4D4D4",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export const animations = {
  SlideBottomToTop: {
    from: {
      transform: [{
        translateY: dimensions.height
      }]
    },
    to: {
      transform: [{
        translateY: 0
      }]
    }
  },
  SlideLeftToRight: {
    from: {
      transform: [{
        translateX: -dimensions.width
      }]
    },
    to: {
      transform: [{
        translateX: 0
      }]
    }
  },
  SlideRightToLeft: {
    from: {
      transform: [{
        translateX: dimensions.width
      }]
    },
    to: {
      transform: [{
        translateX: 0
      }]
    }
  },
  FadeIn: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
}
