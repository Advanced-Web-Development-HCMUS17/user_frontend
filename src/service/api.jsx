import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchLeaderboard() {
  try {
    const res = await axios.get(`${API_URL}/leaderboard`);
    return res.data;
  } catch (e) {
    return [];
  }
}

export async function fetchHistory(token, pageIndex = 1, pageSize = 9) {

  try {
    const res = await axios.get(`${API_URL}/users/game?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      headers: {
        "Authorization": token
      }
    });
    return res.data;
  } catch (e) {
    return [];
  }
}

export async function fetchGameData(token, gameId) {
  try {
    console.log('gameId: ',gameId);
    const res = await axios.get(`${API_URL}/users/game/${gameId}`, {
      headers:
        { "Authorization": token }
    });
    return res.data;
  } catch (e) {
    return null;
  }
}