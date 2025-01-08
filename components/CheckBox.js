import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Color";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
const CheckBox = ({ lable, checked, onPress }) => {
  const rnAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? "rgba(239, 142, 82, 0.1)" : "tranparent",
        { duration: 150 }
      ),
      borderColor: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
      paddingLeft: 16,
      paddingRight: checked ? 10 : 16,
    };
  }, [checked]);

  const textAnimation = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
    };
  }, [checked]);
  return (
    <Animated.View
      style={[styles.container, rnAnimation]}
      onTouchEnd={onPress}
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.label, textAnimation]}>
        {lable}
      </Animated.Text>
      {checked && (
        <Animated.View
          style={styles.iconWrapper}
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={22} color={Colors.tint} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 32,
    color: Colors.black,
  },
  label: {
    fontSize: 16,
  },
  iconWrapper: {
    marginLeft: 8,
  },
});
