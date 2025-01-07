import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../constants/Color";
import newsCategoryList from "../constants/Categories";
const Categories = ({ handleChangeCategory }) => {
  const scrollRef = useRef();
  const itemRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current.scrollTo({ x: x - 20, y: 0, animated: true });
    });
    handleChangeCategory(newsCategoryList[index].slug);
  };

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
            ref={(ele) => (itemRef.current[index] = ele)} //this will store the array of element in the itemRef
            key={index}
            style={[styles.item, activeIndex === index && styles.itemActive]}
            onPress={() => handleSelectCategory(index)}
          >
            <Text
              style={[
                styles.itemText,
                { color: activeIndex === index ? "white" : Colors.darkGrey },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemWrapper: {
    gap: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
});
