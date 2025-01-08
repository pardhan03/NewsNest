import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Color";
import CheckBox from "../../components/CheckBox";
import { useNewCategories } from "../../hooks/useNewsCategories";
import { useNewCountries } from "../../hooks/useNewCountries";
import { Link } from "expo-router";
const discover = () => {
  const { top: safeTop } = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const { newCategories, toggleNewCategory } = useNewCategories();
  const { newsCountries, toggleNewCountry } = useNewCountries();

  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <SearchBar placeholder="Search" setSearchQuery={setSearchQuery} />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newCategories.map((news, index) => (
          <CheckBox
            key={index}
            lable={news.title}
            checked={news.selected}
            onPress={() => {
              toggleNewCategory(news.id);
              setCategory(news.slug);
            }}
          />
        ))}
      </View>
      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((country, index) => (
          <CheckBox
            key={index}
            lable={country.name}
            checked={country.selected}
            onPress={() => {
              toggleNewCountry(country.code);
              setCountry(country.code);
            }}
          />
        ))}
      </View>
      <Link
        href={{
          pathname: "/news/search",
          params: { query: searchQuery, category: category, country: country },
        }}
        asChild
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </Link>
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
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  searchBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
