import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface RouteParams {
  players: string[];
  scores: number[];
  detailedScores: number[][]; // Mảng điểm chi tiết cho từng ván
}

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, scores, detailedScores } = route.params as RouteParams;

  // Tạo bảng xếp hạng dựa trên điểm tổng
  const rankedPlayers = players
    .map((player, index) => ({
      name: player,
      score: scores[index],
      detailedScores: detailedScores[index],
    }))
    .sort((a, b) => b.score - a.score);

  const handleReset = () => {
    // Hiển thị alert xác nhận trước khi reset game
    Alert.alert(
      "Xác Nhận",
      "Bạn có chắc chắn muốn reset trò chơi?",
      [
        {
          text: "Hủy", // Nút hủy không làm gì
          style: "cancel",
        },
        {
          text: "Xác Nhận", // Nút xác nhận sẽ reset game
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false } // Không cho phép tắt alert khi nhấn ngoài màn hình
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Kết Quả Trò Chơi 🎉</Text>

      {/* Hiển thị bảng xếp hạng tổng quan */}
      <Text style={styles.subTitle}>Xếp Hạng Tổng Quan:</Text>
      <View style={styles.resultsContainer}>
        {rankedPlayers.map((item, index) => (
          <Text key={index} style={styles.result}>
            {index + 1}. {item.name}: {item.score} điểm{" "}
            {index == 0 ? ": Bạn là Nhà Vô Địch" : ""}
          </Text>
        ))}
      </View>

      {/* Hiển thị điểm chi tiết theo bảng */}
      <Text style={styles.subTitle}>Điểm Chi Tiết:</Text>
      <View style={styles.tableContainer}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableCellEnd}>Ván</Text>
          {rankedPlayers.map((player) => (
            <Text key={player.name} style={styles.tableCellEnd}>
              {player.name}
            </Text>
          ))}
        </View>
        <ScrollView style={styles.detailsContainer}>
          {/* Bảng điểm */}
          {detailedScores[0].map((_, roundIndex) => (
            <View key={roundIndex} style={styles.tableRow}>
              <Text style={styles.tableCell}>Ván {roundIndex + 1}</Text>
              {rankedPlayers.map((player) => (
                <Text key={player.name} style={styles.tableCell}>
                  {player.detailedScores[roundIndex]}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
        {/* Hiển thị tổng điểm cuối bảng */}
        <View style={styles.tableRowEnd}>
          <Text style={[styles.tableCellEnd, styles.totalCell]}>Tổng Điểm</Text>
          {rankedPlayers.map((item, index) => (
            <Text key={index} style={styles.tableCellEnd}>
              {item.score}
            </Text>
          ))}
        </View>
      </View>

      {/* Button quay lại màn hình chính */}
      <Button title="Chơi Lại" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10, // Giảm khoảng cách giữa tiêu đề và bảng
    color: "red",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  result: {
    fontSize: 18,
    marginVertical: 5,
  },
  resultsContainer: {
    marginBottom: 10,
  },
  detailsContainer: {
    // flex: 1,
    height: "35%",
    marginBottom: 10,
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    backgroundColor: "#f0f0f0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRowEnd: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#ddd",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    textAlign: "center",
  },

  tableCellEnd: {
    padding: 5,
    flex: 1,
    textAlign: "center",
    color: "red",
  },
  totalCell: {
    fontWeight: "bold",
  },
});
