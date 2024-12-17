import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface PlayerInputProps {
  playerName: string;
  onChange: (score: number) => void;
  resetInput: boolean;
}

export default function PlayerInput({
  playerName,
  onChange,
  resetInput,
}: PlayerInputProps) {
  const [score, setScore] = useState("0");

  const handleScoreChange = (text: string) => {
    setScore(text);
    const parsedScore = parseInt(text, 10);
    if (!isNaN(parsedScore)) {
      onChange(parsedScore);
    }
  };

  useEffect(() => {
    if (resetInput) {
      setScore("0");
    }
  }, [resetInput]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{playerName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập điểm"
        value={score}
        onChangeText={handleScoreChange}
        keyboardType="number-pad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 5,
    width: 80,
    marginRight: 10,
    textAlign: "center",
  },
});
