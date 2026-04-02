import React, { JSX } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  onPress?: () => void;
}

export default function SuggestionChip({ text, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#FF7A3D",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontSize: 12,
  },
});