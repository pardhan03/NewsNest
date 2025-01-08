import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "../../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const discover = () => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <SearchBar placeholder="Search" />
      <Text>Discover</Text>
    </View>
  );
};

export default discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
