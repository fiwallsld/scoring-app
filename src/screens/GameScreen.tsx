import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PlayerInput from "../components/PlayerInput";

interface RouteParams {
  players: string[];
  isTotalGame: boolean;
  rounds: number;
  winScore: number;
}

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, isTotalGame, rounds, winScore } =
    route.params as RouteParams;

  const [isResetInput, setIsResetInput] = useState(false);
  const [scores, setScores] = useState<number[]>(
    new Array(players.length).fill(0)
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [inputScores, setInputScores] = useState<number[]>(
    new Array(players.length).fill(0)
  );
  const [detailedScores, setDetailedScores] = useState<number[][]>(
    new Array(players.length).fill([])
  );
  const [scoreHistory, setScoreHistory] = useState<
    { round: number; scores: number[] }[]
  >([]);

  const [finish, setFinish] = useState(false);

  const updateScore = (index: number, newScore: number) => {
    const updatedScores = [...inputScores];
    updatedScores[index] = newScore;
    setInputScores(updatedScores);
  };

  const addScore = () => {
    if (finish) {
      Alert.alert("Kết Thúc", `Trò chơi đã kết thúc!`, [
        {
          text: "Xem Kết Quả",
          onPress: () =>
            navigation.navigate("Result", {
              players,
              scores,
              detailedScores,
            }),
        },
      ]);
      return;
    }

    // Cập nhật điểm của người chơi
    const updatedScores = [...scores];
    inputScores.forEach((score, index) => {
      updatedScores[index] += score;
    });
    setScores(updatedScores);

    // Lưu lại điểm chi tiết cho từng ván
    const updatedDetailedScores = [...detailedScores];
    inputScores.forEach((score, index) => {
      updatedDetailedScores[index] = [...updatedDetailedScores[index], score];
    });
    setDetailedScores(updatedDetailedScores);

    // Lưu điểm cho ván hiện tại vào lịch sử
    setScoreHistory((prevHistory) => [
      ...prevHistory,
      { round: currentRound, scores: [...updatedScores] },
    ]);

    setIsResetInput(false);

    // Kiểm tra điều kiện kết thúc trò chơi
    const winnerIndex = updatedScores.findIndex((score) => score >= winScore);

    if (winnerIndex !== -1) {
      Alert.alert("Kết Thúc", `${players[winnerIndex]} đã chiến thắng!`, [
        {
          text: "Xem Kết Quả",
          onPress: () =>
            navigation.navigate("Result", {
              players,
              scores: updatedScores,
              detailedScores: updatedDetailedScores,
            }),
        },
      ]);
      setFinish(true); // Đánh dấu trò chơi kết thúc
    } else if (currentRound >= rounds) {
      Alert.alert("Kết Thúc", `Trò chơi đã kết thúc!`, [
        {
          text: "Xem Kết Quả",
          onPress: () =>
            navigation.navigate("Result", {
              players,
              scores: updatedScores,
              detailedScores: updatedDetailedScores,
            }),
        },
      ]);
      setFinish(true); // Đánh dấu trò chơi kết thúc
    } else {
      setFinish(
        currentRound >= rounds ||
          updatedScores.some((score) => score >= winScore)
      );
      setCurrentRound((prev) => prev + 1);
    }
  };

  const viewDetailedScores = () => {
    navigation.navigate("Result", {
      players,
      scores,
      detailedScores,
    });
  };

  return (
    <View style={styles.container}>
      {isTotalGame ? (
        <Text style={styles.title}>
          🎴 Ván Chơi {currentRound} / {rounds} 🎴
        </Text>
      ) : (
        <>
          <Text style={styles.title}>🎲 Số điểm kết thúc {winScore} 🎲</Text>
          <Text style={styles.title}>🎴 Ván Chơi {currentRound} 🎴 🎲</Text>
        </>
      )}

      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <PlayerInput
            playerName={item}
            onChange={(score) => updateScore(index, score)}
            resetInput={isResetInput}
          />
        )}
        keyExtractor={(item) => item} // Sử dụng tên người chơi làm key
      />

      <View style={styles.btnCfm}>
        <Button
          title={finish ? "Đã kết thúc" : "Thêm Điểm"} // Thay đổi tên nút khi kết thúc
          onPress={addScore}
          disabled={finish} // Disable nút nếu trò chơi đã kết thúc
        />
      </View>

      <View style={styles.btnRst}>
        <Button
          title="Reset Input"
          onPress={() => setIsResetInput(true)}
          color={"red"}
        />
      </View>

      <View style={styles.btnViewDetails}>
        <Button title="Xem Bảng Điểm Chi Tiết" onPress={viewDetailedScores} />
      </View>
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  btnCfm: {
    marginTop: 20,
  },
  btnRst: {
    marginTop: 10,
    backgroundColor: "#db6923",
  },
  btnViewDetails: {
    marginTop: 10,
  },
});
