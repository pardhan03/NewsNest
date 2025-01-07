import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Colors } from "../constants/Color";

const Pagination = ({ item, scrollX, paginationIndex }) => {
  return (
    <View style={styles.container}>
      {item?.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                paginationIndex === index ? Colors.tint : Colors.darkGrey,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#333",
    width: 8,
    height: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
