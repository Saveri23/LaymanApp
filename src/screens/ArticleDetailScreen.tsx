// src/screens/ArticleDetailScreen.tsx

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { splitIntoCards } from "../utils/helpers";
import { saveArticle } from "../services/supabase";
import { useRouter } from "expo-router";
import { COLORS } from "../styles/theme";
const position = useState(new Animated.ValueXY())[0];
const { width } = Dimensions.get("window");

export default function ArticleDetailScreen({ article }: any) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;


  const content =
    article?.content === "ONLY AVAILABLE IN PAID PLANS"
      ? article?.description
      : article?.content;

  const cards = splitIntoCards(content || "");

  const position = useRef(new Animated.ValueXY()).current;

 const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: (_, gesture) => {
    position.setValue({ x: gesture.dx, y: gesture.dy });
  },
  onPanResponderRelease: (_, gesture) => {
    if (gesture.dx > 120) {
      Animated.timing(position, {
        toValue: { x: 500, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  },
});

  const handleSave = async () => {
    await saveArticle(article);
    router.push("/(tabs)/saved");
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>{article?.title}</Text>

      {/* Swipe Card */}

<Animated.View
  {...panResponder.panHandlers}
  style={[
    styles.card,
    position.getLayout(),
    { transform: [...position.getTranslateTransform(), { scale }] },
  ]}
  onTouchStart={() => Animated.spring(scale, { toValue: 1.05, useNativeDriver: true }).start()}
  onTouchEnd={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
>
  <Text>{cards}</Text>
</Animated.View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleSave}>
  <Text style={{ color: COLORS.primary }}>🔖 Save</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.aiBtn}
          onPress={() =>
            router.push({
   pathname: "/chat" as any,
  params: { article: JSON.stringify(article) },
            })
          }
        >
          <Text style={styles.btnText}>Ask AI 🤖</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
  backgroundColor: "#fff",
  padding: 25,
  borderRadius: 25,
  marginRight: 15,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 6,
},
  text: {
    fontSize: 16,
    lineHeight: 24,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  saveBtn: {
    backgroundColor: "#FF7A3D",
    padding: 15,
    borderRadius: 12,
  },

  aiBtn: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 12,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});