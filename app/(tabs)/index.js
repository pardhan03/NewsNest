import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
const index = () => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: safeTop }}>
      <Header />
      <SearchBar />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
