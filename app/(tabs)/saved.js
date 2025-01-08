import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Stack, Link } from "expo-router";
import { Colors } from "../../constants/Color";
import { useIsFocused } from "@react-navigation/native";

const saved = () => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const handleGetBookmarkNews = async () => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      const res = JSON.parse(token);
      setIsLoading(true);
      if (res) {
        let query_string = res.join(",");
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_${process.env.EXPO_PUBLIC_API_KEY}def&id=${query_string}`
        );
        setBookmarkNews(response.data.results);
        setIsLoading(false);
      } else {
        setBookmarkNews([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    handleGetBookmarkNews();
  }, [isFocused]);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={bookmarkNews}
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

export default saved;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
