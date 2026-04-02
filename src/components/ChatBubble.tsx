import React, { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  message: string;
  isUser?: boolean;
}

export default function ChatBubble({ message, isUser }: Props): JSX.Element {
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "75%",
  },
  userContainer: {
    backgroundColor: "#FF7A3D",
    alignSelf: "flex-end",
  },
  botContainer: {
    backgroundColor: "#FFE5D9",
    alignSelf: "flex-start",
  },
  text: {
    color: "#000",
  },
});