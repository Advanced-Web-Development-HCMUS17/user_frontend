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
