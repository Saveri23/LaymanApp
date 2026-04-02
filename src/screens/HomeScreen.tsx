import React, { JSX, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { fetchNews } from "../services/newsApi";
import ArticleCard from "../components/ArticleCard";
import InteractiveCard from "../components/InteractiveCard";
import { COLORS, FONTS } from "../styles/theme";
import { useRouter } from "expo-router";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen(): JSX.Element {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchNews();
    setArticles(data || []);
    setLoading(false);
  };

  const filteredArticles = articles.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 40, height: 40 }}
      />
      <Text style={[FONTS.title, { color: COLORS.primary }]}>
        Layman 🔥
      </Text>

      {/* Search */}
      <TextInput
        placeholder="Search articles..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* Horizontal list */}
      {loading ? (
        <FlatList
          horizontal
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          renderItem={() => (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={styles.shimmer}
            />
          )}
        />
      ) : (
      <FlatList
  horizontal
  showsHorizontalScrollIndicator={false}
  data={filteredArticles}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ paddingHorizontal: 5 }}
  renderItem={({ item }) => (
    <InteractiveCard
      isActive={activeId === item.title}
      onPress={() => {
        setActiveId(item.title); // animation
        router.push({
          pathname: "/article",
          params: { data: JSON.stringify(item) },
        });
      }}
    >
      <ArticleCard
        title={item.title}
        image={item.image_url}
        gradientBottom
      />
    </InteractiveCard>
  )}
/>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },

  shimmer: {
    width: 140,
    height: 200,
    borderRadius: 12,
    marginRight: 15,
  },
});