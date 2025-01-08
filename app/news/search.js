import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";
import axios from "axios";
const search = () => {
  const { query, category, country } = useLocalSearchParams();

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNews = async () => {
    try {
      let queryString = "";
      let categoryString = "";
      let countryString = "";
      if (query) {
        categoryString = `&q=${queryString}`;
      }
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }

      const url = `https://newsdata.io/api/1/news?apikey=pub_${process.env.EXPO_PUBLIC_API_KEY}def&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
      const response = await axios.get(url);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error) {
      console.log("Error:", error?.message);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(_, index) => index}
            renderItem={({ item, index }) => (
              <Link href={`/news/${item.article_id}`} asChild>
                <TouchableOpacity>
                  <View key={index} style={styles.itemContainer}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.itemImg}
                    />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemCategory}>{item.category}</Text>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <View style={styles.itemSourceInfo}>
                        <Image
                          source={{ uri: item.source_icon }}
                          style={styles.itemSourceImage}
                        />
                        <Text style={styles.itemSourceName}>
                          {item.source_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
  itemSourceInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  itemSourceImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.darkGrey,
  },
});
