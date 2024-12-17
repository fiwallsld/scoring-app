// Hàm tính xếp hạng người chơi dựa trên điểm
export const rankPlayers = (players: string[], scores: number[]) => {
  return players
    .map((player, index) => ({ name: player, score: scores[index] }))
    .sort((a, b) => b.score - a.score);
};
