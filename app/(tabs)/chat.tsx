import React, { JSX, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { askAI } from "../../src/services/aiService";
import ChatBubble from "../../src/components/ChatBubble";
import SuggestionChip from "../../src/components/SuggestionChip";
import { COLORS, FONTS } from "../../src/styles/theme";
import { useLocalSearchParams } from "expo-router";

export default function ChatScreen(): JSX.Element {
  const { article } = useLocalSearchParams();
  const parsedArticle = article ? JSON.parse(article as string) : null;

  const [messages, setMessages] = useState<any[]>([
    {
      text: "Hi, I'm Layman! What can I answer for you?",
      isUser: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "What is this article about?",
    "Why is this important?",
    "Explain in simple words",
  ];

  // ✅ SEND MESSAGE
  const sendMessage = async (text?: string) => {
  const question = text || input;
  if (!question) return;

  setTyping(true);

  const userMsg = { text: question, isUser: true };
  setMessages((prev) => [...prev, userMsg]);

  const aiReply = await askAI(
    question,
    parsedArticle?.description || ""
  );

  const botMsg = { text: aiReply, isUser: false };
  setMessages((prev) => [...prev, botMsg]);

  setTyping(false);
  setInput("");
};

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      
      <Text style={[FONTS.title, { color: COLORS.primary }]}>
        Ask Layman 🤖
      </Text>

      {/* Chat */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatBubble message={item.text} isUser={item.isUser} />
        )}
      />

      {/* Typing */}
      {typing && (
        <Text style={{ margin: 10, color: "#888" }}>
          Layman is typing...
        </Text>
      )}

      {/* Suggestions */}
      <View style={styles.suggestionsRow}>
        {suggestions.map((item, index) => (
          <SuggestionChip
            key={index}
            text={item}
            onPress={() => sendMessage(item)}
          />
        ))}
      </View>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.send} onPress={() => sendMessage()}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },

  suggestionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    gap: 8,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },

  send: {
    backgroundColor: COLORS.primary,
    padding: 12,
    marginLeft: 10,
    borderRadius: 12,
  },
});