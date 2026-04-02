// src/screens/SavedScreen.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { supabase } from "../services/supabase";
import ArticleCard from "../components/ArticleCard";
import InteractiveCard from "../components/InteractiveCard";

const CARD_WIDTH = 140;
const CARD_HEIGHT = 200;

export default function SavedScreen() {
  const [saved, setSaved] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const { data: userData } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("saved_articles")
      .select("*")
      .eq("user_id", userData.user?.id);

    setSaved(data || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Articles</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={saved}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <InteractiveCard
            isActive={activeId === item.id}
            onPress={() => setActiveId(item.id)}
          >
            <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
              <ArticleCard title={item.title} image={item.image_url} gradientBottom />
            </View>
          </InteractiveCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 20 },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});