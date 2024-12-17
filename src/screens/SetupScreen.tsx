import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";

export default function SetupScreen({ navigation }: any) {
  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [isTotalGame, setIsTotalGame] = useState(true);
  const [number, setNumber] = useState("4");
  const [rounds, setRounds] = useState("10");
  const [winScore, setWinScore] = useState("51");

  // Kiểm tra điều kiện để enable nút Bắt Đầu
  const isStartButtonEnabled = players.length >= parseInt(number);

  const addPlayer = () => {
    if (playerName) {
      setPlayers([...players, playerName]);
      setPlayerName("");
    }
  };

  const handleStartGame = () => {
    navigation.navigate("Game", {
      players,
      isTotalGame,
      rounds: parseInt(rounds) || 10,
      winScore: parseInt(winScore) || 100,
    });
  };

  const handleReset = () => {
    setPlayers([]);
    setNumber("4");
    setRounds("10");
    setWinScore("51");
  };

  let settingName = isTotalGame ? "Cài đặt số ván" : "Cài đặt số điểm";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài Đặt Trò Chơi</Text>

      {/* Thêm người chơi */}
      <View style={styles.row}>
        <TextInput
          style={styles.inputPlayer}
          placeholder="Tên người chơi"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <View style={styles.btnAdd}>
          <Button title="Thêm" onPress={addPlayer} />
        </View>
      </View>

      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <Text style={styles.playerItem}>
            {index + 1}. {item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Cài đặt số người chơi */}
      <View style={styles.setGroup}>
        <Text style={styles.lableSet}>Số người chơi</Text>
        <View style={styles.inputRight}>
          <TextInput
            style={styles.input}
            placeholder="Số người"
            value={number}
            onChangeText={setNumber}
            keyboardType="number-pad"
          />
        </View>
      </View>

      {/* Cài đặt số ván chơi và điểm */}
      <View style={styles.setGroup}>
        <Text style={styles.lableSet}>{settingName}</Text>
        <View style={styles.btnAdd}>
          <Button
            title={isTotalGame ? "Cài Điểm" : "Cài Số Ván"}
            onPress={() => setIsTotalGame(!isTotalGame)}
          />
        </View>
      </View>

      {isTotalGame ? (
        <TextInput
          style={styles.input}
          placeholder="Số ván chơi (mặc định 10)"
          value={rounds}
          onChangeText={setRounds}
          keyboardType="number-pad"
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Điểm chiến thắng (mặc định 100)"
          value={winScore}
          onChangeText={setWinScore}
          keyboardType="number-pad"
        />
      )}

      {/* Nút xác nhận và nút bắt đầu */}
      <View style={styles.setGroup}>
        <View style={styles.btnAdd}>
          <Button title="RESET" onPress={handleReset} color={"red"} />
        </View>
        <View style={styles.btnAdd}>
          <Button
            title="START"
            onPress={handleStartGame}
            disabled={!isStartButtonEnabled} // Chỉ cho phép nhấn khi đủ số lượng người chơi
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputPlayer: {
    flex: 0.6, // Chiếm 60% chiều rộng của hàng
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
  },
  playerItem: {
    fontSize: 18,
    marginVertical: 5,
  },
  btnAdd: {
    flex: 0.4, // Chiếm 30% chiều rộng của hàng
    paddingHorizontal: 4,
  },
  setGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    padding: 4,
  },
  lableSet: {
    fontSize: 16,
    flex: 0.6,
    fontWeight: "bold",
  },
  inputRight: {
    flex: 0.3,
  },
});
