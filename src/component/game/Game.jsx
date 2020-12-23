import React, { useState, useEffect } from 'react';
import { useSocket } from "../socketHook/useSocket";
import Board from './Board';
import gameServices from '../../service/game-service.js';
import './index.css';
import { LOBBY_EVENT, GAME_EVENT } from '../socketHook/EventConstant';
import { useParams } from 'react-router';

const row = 15;

function Game(props) {
    const userInfo = props.userInfo;
    const { lobbyId } = useParams();
    const { socket, isInitialized } = useSocket();
    const [history, setHistory] = useState([]);
    const { winChain, setWinChain } = useState(null);
    const { component, setComponent } = useState(<></>);

    // let winner, winChainProps = null;
    let status = null;

    async function handleClick(i) {


        socket.emit(GAME_EVENT.SEND_MOVE, {
            move: i
        });
    }



    useEffect(() => {
        if (socket) {

            socket.on(GAME_EVENT.GAME_START, ({userFirst,userSecond}) => {
                setComponent(
                    <div className="game">
                        <div className="game-board">
                            <Board
                                squares={history}
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
                console.log("Game start!!!");
            })



            socket.on(GAME_EVENT.SEND_MOVE, ({ newHistory }) => {
                setHistory(newHistory);
                console.log('New history: ', history);

            })

            socket.on(GAME_EVENT.GAME_END, ({ userWin, winChain }) => {
                status = "Winner " + userWin;
                setWinChain(winChain);

            })
        }
    }, [isInitialized])

    return (
        <>
            {component}
        </>
    );

}

export default Game;