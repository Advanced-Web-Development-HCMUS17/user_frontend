import React, { useState, useEffect } from 'react';
import { useSocket } from "../socketHook/useSocket";
import Board from './Board';
import gameServices from '../../service/game-service.js';
import './index.css';
import { LOBBY_EVENT } from '../socketHook/EventConstant';
import { useParams } from 'react-router';

const row = 15;

function Game(props) {
    const userInfo = props.userInfo;
    const { lobbyId } = useParams();
    const { socket, isInitialized } = useSocket();
    const [history, setHistory] = useState([]);

    let winner, newHistory, winChainProps = null;
    let status = 'Next player: X';

    async function handleClick(i) {
        const isMyTurn = await gameServices.isMyTurn(lobbyId, userInfo.username);
        if (isMyTurn === true) {
            let cloneHistory = history.slice(0, history.length);
            for (let k = 0; k < cloneHistory.length; k++) {
                if (cloneHistory[k] === i)
                    return;
            }
            const result = await gameServices.saveGame(lobbyId, userInfo.username, i, row);

            if (result) {
                winner = result.winner;
                winChainProps = result.winChain;
                newHistory = result.newHistory;
            }

            socket.emit(LOBBY_EVENT.SEND_MOVE, {
                newHistory: newHistory, move: i,
                roomId: lobbyId, winChain: winChainProps
            });
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

            socket.on(LOBBY_EVENT.RECEIVE_MOVE, ({ newHistory, winChain }) => {
                winChainProps = winChain;
                setHistory(newHistory);
                console.log('New history: ', history);

            })
        }
    }, [isInitialized])

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history}
                    isWin={winChainProps}
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