import React, { JSX, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { supabase } from "../services/supabase";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "../styles/theme";

export default function AuthScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>(""); // ✅ FIXED
  const router = useRouter();

  // 🔐 LOGIN
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful ✅");

      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1000);
    }
  };

  // 🆕 SIGNUP
  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created ✅ Now login");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      
      {/* ✅ TOAST MESSAGE */}
     {message !== "" && (
  <View style={styles.toastCard}>
    <Text style={styles.toastText}>{message}</Text>
  </View>
)}

      <Text style={[FONTS.title, { color: COLORS.primary }]}>
        Welcome Back 👋
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup */}
      <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>
          Don’t have an account? Create one
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    marginTop: 15,
    color: COLORS.primary,
  },
  toastCard: {
  position: "absolute",
  top: 70,
  alignSelf: "center",
  backgroundColor: "#E8FFF3",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: "#4CAF50",
},

toastText: {
  color: "#2E7D32",
  fontWeight: "600",
},
});