import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎴 Tiến Lên Miền Nam 🎴</Text>
      <Button
        title="Bắt Đầu Trò Chơi"
        onPress={() => navigation.navigate("Setup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
