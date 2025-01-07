import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import BreakingNews from "../../components/BreakingNews";
const index = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { top: safeTop } = useSafeAreaInsets();

  const getBreakingNews = async () => {
    try {
      setIsLoading(true);
      const url = `https://newsdata.io/api/1/news?apikey=pub_${process.env.EXPO_PUBLIC_API_KEY}def&country=in&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(url);
      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error) {
      console.log("Error:", error?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBreakingNews();
  }, []);

  return (
    <View style={{ paddingTop: safeTop }}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <BreakingNews NewsList={breakingNews} />
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
