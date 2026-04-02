import React, { JSX } from "react";
import { FlatList, ImageBackground, Text, StyleSheet, View } from "react-native";

interface Item {
  id: string;
  title: string;
  image: string;
}

interface Props {
  data: Item[];
}

export default function Carousel({ data }: Props): JSX.Element {
  return (
    <FlatList
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ImageBackground source={{ uri: item.image }} style={styles.card}>
          <View style={styles.overlay} />
          <Text style={styles.title}>{item.title}</Text>
        </ImageBackground>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 180,
    marginRight: 10,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    color: "#fff",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});