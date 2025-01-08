import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "../../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Color";
const discover = () => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <SearchBar placeholder="Search" />
      <Text style={styles.title}>Discover</Text>
    </View>
  );
};

export default discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
});
