import React, {useState} from 'react';
import {useSocket} from "../socketHook/useSocket";
import Board from './Board';
import gameServices from '../../service/game-service.js';
import './index.css';

function Game() {
  const {socket, isInitialized} = useSocket();
  const [history, setHistory] = useState([]);
  const row = 10;
  const [xIsNext, setXIsNext] = useState(true);
  let winChain;
  let status = 'Next player: X';

  function handleClick(i) {
    let newHistory = history;
    for (let k = 0; k < newHistory.length; k++) {
      if (newHistory[k] === i)
        return;
    }
    newHistory.push(i);
    const refactorHistory = gameServices.refactorArray(newHistory, row);
    // winChain = gameServices.calculateWinner(refactorHistory, i, xIsNext, row);
    const result = gameServices.calculateWinner(refactorHistory, row);
    if (result) {
      console.log(result);
      status = `Winner: ${result.winner}`;


      // else if (GameFunc.isDraw(current) === true) {
      //     status = "DRAW";
      // }

      return;
    } else {
      status = "Next player: " + (xIsNext ? 'X' : 'O');
    }
    setHistory(newHistory);
    setXIsNext(!xIsNext);
  }

  // useEffect(() => {
  //     socket.on(LOBBY_EVENT.SEND_MOVE, { move: history[history.length - 1] });
  // }, [isInitialized])

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={gameServices.refactorArray(history, row)}
          isWin={winChain}
          onClick={(i) => handleClick(i)}
          row={row}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );

}

export default Game;