import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";

export default function InteractiveCard({ children, onPress }: any) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handleHoverIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.25,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: -20,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHoverOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={onPress} // ✅ navigation works
      onHoverIn={Platform.OS === "web" ? handleHoverIn : undefined} // ✅ hover
      onHoverOut={Platform.OS === "web" ? handleHoverOut : undefined}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }, { translateY }],
            zIndex: 10,
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
});