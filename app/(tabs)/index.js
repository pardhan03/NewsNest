import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const index = () => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: safeTop }}>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
