// import React, { JSX, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { askAI } from "../services/aiService";
// import ChatBubble from "../components/ChatBubble";
// import SuggestionChip from "../components/SuggestionChip";
// import { COLORS, FONTS } from "../styles/theme";
// import { useLocalSearchParams } from "expo-router";

// export default function ChatScreen(): JSX.Element {
//   const { article } = useLocalSearchParams();

//   const parsedArticle = article ? JSON.parse(article as string) : null;

//   const [messages, setMessages] = useState<any[]>([
//     {
//       text: "Hi, I'm Layman! What can I answer for you?",
//       isUser: false,
//     },
//   ]);

//   const [input, setInput] = useState("");

//   // ✅ Suggestions (based on article)
//   const suggestions = [
//     "What is this article about?",
//     "Why is this important?",
//     "Explain in simple words",
//   ];

//   // ✅ Send Message
//   const sendMessage = async (text?: string) => {
//     const question = text || input;
//     if (!question) return;

//     const userMsg = { text: question, isUser: true };
//     setMessages((prev) => [...prev, userMsg]);

//     // ⭐ Send article context to AI
//     const aiReply = await askAI(
//       question,
//       parsedArticle?.description || ""
//     );

//     const botMsg = { text: aiReply, isUser: false };
//     setMessages((prev) => [...prev, botMsg]);

//     setInput("");
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      
//       {/* Header */}
//       <Text style={[FONTS.title, { color: COLORS.primary }]}>
//         Ask Layman 🤖
//       </Text>

//       {/* Chat List */}
//       <FlatList
//         data={messages}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={({ item }) => (
//           <ChatBubble message={item.text} isUser={item.isUser} />
//         )}
//         contentContainerStyle={{ paddingVertical: 10 }}
//       />

//       {/* Suggestions */}
//       <View style={styles.suggestionsRow}>
//         {suggestions.map((item, index) => (
//           <SuggestionChip
//             key={index}
//             text={item}
//             onPress={() => sendMessage(item)}
//           />
//         ))}
//       </View>

//       {/* Input */}
//       <View style={styles.inputRow}>
//         <TextInput
//           value={input}
//           onChangeText={setInput}
//           placeholder="Type your question..."
//           style={styles.input}
//         />

//         <TouchableOpacity style={styles.send} onPress={() => sendMessage()}>
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 15 },

//   suggestionsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginVertical: 10,
//     gap: 8,
//   },

//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 12,
//   },

//   send: {
//     backgroundColor: COLORS.primary,
//     padding: 12,
//     marginLeft: 10,
//     borderRadius: 12,
//   },
// });