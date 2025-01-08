import { StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import BreakingNews from "../../components/BreakingNews";
import Categories from "../../components/Categories";
import NewsList from "../../components/NewsList";
import Loading from "../../components/Loading";
const index = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { top: safeTop } = useSafeAreaInsets();

  const getBreakingNews = async () => {
    try {
      setIsLoading(true);
      const url = `https://newsdata.io/api/1/news?apikey=pub_${process.env.EXPO_PUBLIC_API_KEY}def&language=en&image=1&removeduplicate=1&size=5`;
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

  const getNews = async (category = "") => {
    try {
      let categoryString = "";
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }

      const url = `https://newsdata.io/api/1/news?apikey=pub_${process.env.EXPO_PUBLIC_API_KEY}def&language=en&image=1&removeduplicate=1&size=10&${categoryString}`;
      const response = await axios.get(url);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error) {
      console.log("Error:", error?.message);
    }
  };

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const handleChageCategory = (category) => {
    setNews([]);
    getNews(category);
  };

  return (
    <ScrollView style={{ paddingTop: safeTop }}>
      <Header />
      <SearchBar horizontalpadding={true} />
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <BreakingNews NewsList={breakingNews} />
      )}
      <Categories handleChangeCategory={handleChageCategory} />
      <NewsList newsList={news} />
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
