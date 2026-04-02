// src/screens/WelcomeScreen.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#FF7A3D", "#FF3D6D"]} style={styles.container}>
      
      <View style={styles.center}>
        <Text style={styles.logo}>Layman</Text>

        <Text style={styles.tagline}>
          Learn business, tech & startups{"\n"}in 30 seconds 🚀
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth")}
      >
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", padding: 30 },

  center: { flex: 1, justifyContent: "center" },

  logo: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#fff",
  },

  tagline: {
    fontSize: 18,
    color: "#fff",
    marginTop: 15,
    lineHeight: 26,
  },

  button: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 30,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});