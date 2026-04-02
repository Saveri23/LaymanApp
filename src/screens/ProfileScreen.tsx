import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../services/supabase";
import { useRouter } from "expo-router"; // 🔑 import router

export default function ProfileScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter(); // 🔑 initialize router

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setEmail(data.user?.email || "");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth"); // 🔑 navigate to login page after logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={{ fontSize: 30 }}>👩‍💻</Text>
      </View>

      <Text style={styles.email}>{email}</Text>

      <Text style={styles.quote}>
        “Great developers simplify complex ideas.”
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// your existing styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#FFE5D9", justifyContent: "center", alignItems: "center" },
  email: { marginTop: 15, fontSize: 16, fontWeight: "bold" },
  quote: { marginTop: 20, fontStyle: "italic", textAlign: "center" },
  button: { marginTop: 30, backgroundColor: "#FF7A3D", padding: 15, borderRadius: 12, width: "100%" },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});