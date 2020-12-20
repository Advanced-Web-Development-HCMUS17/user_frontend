import React, { useState, useEffect } from 'react';
import { useSocket } from "../socketHook/useSocket";
import Board from './Board';
import gameServices from '../../service/game-service.js';
import accountServices from '../../service/account-service.js';
import './index.css';
import { LOBBY_EVENT } from '../socketHook/EventConstant';
import { useParams } from 'react-router';

function Game(props) {
    const userInfo = props.userInfo;
    const { lobbyId } = useParams();
    const { socket, isInitialized } = useSocket();
    const [history, setHistory] = useState([]);
    const row = 10;
    const [xIsNext, setXIsNext] = useState(true);
    let winChain;
    let status = 'Next player: X';

    function handleClick(i) {
        const isMyTurn = await gameServices.isMyTurn(lobbyId, userInfo.username);
        if (isMyTurn === true) {
            let newHistory = history.slice(0, history.length);
            for (let k = 0; k < newHistory.length; k++) {
                if (newHistory[k] === i)
                    return;
            }
            
            socket.emit(LOBBY_EVENT.SEND_MOVE, { move: i, roomId: lobbyId });
        }



        // const refactorHistory = gameServices.refactorArray(newHistory, row);
        // const result = gameServices.calculateWinner(refactorHistory, row);
        // if (result) {
        //     console.log(result);
        //     status = `Winner: ${result.winner}`;


        //     // else if (GameFunc.isDraw(current) === true) {
        //     //     status = "DRAW";
        //     // }

        //     return;
        // } else {
        //     status = "Next player: " + (xIsNext ? 'X' : 'O');
        // }

    }

    useEffect(() => {
        if (socket) {

            socket.on(LOBBY_EVENT.RECEIVE_MOVE, ({ move }) => {

                setHistory(history => [...history, move]);
                console.log('New history: ', history);
                setXIsNext(!xIsNext);
            })
        }
    }, [isInitialized])

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history}
                    //isWin={winChain}
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