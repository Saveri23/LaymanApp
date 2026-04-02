import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ArticleCard({ title, image, gradientBottom }: any) {
  return (
    <ImageBackground
      source={{ uri: image }}
      style={styles.card}
      imageStyle={{ borderRadius: 12 }}
    >
      {gradientBottom && (
  <LinearGradient
    colors={["transparent", "rgba(0,0,0,0.8)"]}
    style={styles.gradient}
  >
    <Text style={styles.title}>{title}</Text>
    <Text style={{ color: "#ccc", fontSize: 12 }}>
      Watch Now ▶
    </Text>
  </LinearGradient>
)}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  gradient: {
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});