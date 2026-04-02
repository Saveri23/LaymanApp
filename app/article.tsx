import { useLocalSearchParams } from "expo-router";
import ArticleDetailScreen from "../src/screens/ArticleDetailScreen";

export default function Article() {
  const { data } = useLocalSearchParams();
  const article = JSON.parse(data as string);

  return <ArticleDetailScreen article={article} />;
}