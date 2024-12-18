import React from "react";
import { View, Button, StyleSheet } from "react-native";

interface OptionsInputProps {
  score: string;
  handleScoreChange: (score: string) => void;
}

export default function OptionsInput({
  score,
  handleScoreChange,
}: OptionsInputProps) {
  const quickScores = ["3", "2", "1"]; // Danh sách điểm số nhanh

  return (
    <View style={styles.optionsContainer}>
      {quickScores.map((value) => (
        <Button
          key={value}
          title={value}
          onPress={() => handleScoreChange(value)} // Gọi hàm cập nhật score
          color={score === value ? "green" : "gray"} // Đổi màu button khi được chọn
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: 10,
  },
});
