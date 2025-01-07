import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../constants/Color";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "./Pagination";

import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const BreakingNews = ({ NewsList }) => {
  const [data, setData] = useState(NewsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef();

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setPaginationIndex(index % NewsList.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BreakingNews</Text>
      <View style={styles.slideWrapper}></View>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(_, index) => `list_item${index}`}
        renderItem={({ item, index }) => {
          return (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        onEndReached={() => setData([...data, ...NewsList])}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <Pagination
        item={NewsList}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
      />
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {},
});
