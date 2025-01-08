import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Colors } from "../../constants/Color";
import moment from "moment";
const NewDetail = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();

  const getNews = async () => {
    try {
      setIsLoading(true);
      const url = `https://newsdata.io/api/1/news?apikey=pub_${process.env.EXPO_PUBLIC_API_KEY}def&id=${id}`;
      const response = await axios.get(url);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error) {
      console.log("Error:", error?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="heart-outline" size={22} />
              </TouchableOpacity>
            );
          },
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.contentContainer}
        >
          <Text style={styles.title}>{news[0]?.title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>
              {moment(news[0]?.pubDate).format("MMMM DD, hh:mm a")}
            </Text>
            <Text style={styles.newsInfo}>{news[0]?.source_name}</Text>
          </View>
          <Image source={{ uri: news[0]?.image_url }} style={styles.newsImg} />
          <Text style={styles.newContent}>{news[0]?.description}</Text>
        </ScrollView>
      )}
    </>
  );
};

export default NewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  newsImg: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkGrey,
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 18,
  },
});
