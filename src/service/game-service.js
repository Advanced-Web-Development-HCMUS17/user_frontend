import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function refactorArray(history, row) {
  let array = Array(row * row).fill(null);
  for (let i = 0; i < history.length; i++) {
    array[history[i]] = (i % 2 === 0) ? 'X' : 'O';
  }
  return array;
}

async function createGame(roomId, user1, user2) {
  try {
    const res = await axios.post(`${API_URL}/game/create`, {
      roomId,
      user1,
      user2
    });
    if (res.status === 201) {
      return res.data.userFirst;
    }
    else {
      return null;
    }
  }
  catch (err) {
    console.log(err);
  }
}

async function saveGame(roomId, username, move) {
  try {
    const res = await axios.post(`${API_URL}/game/save`, {
      roomId: roomId,
      username: username,
      move: move
    });
    if (res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function isMyTurn(roomId, username) {
  try {
    const res = await axios.post(`${API_URL}/game/isMyTurn`);
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
}

const gameServices = { refactorArray, saveGame, createGame };

export default gameServices;