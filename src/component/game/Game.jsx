import React, { useState, useEffect } from 'react';
import { useSocket } from "../socketHook/useSocket";
import Board from './Board';
import gameServices from '../../service/game-service.js';
import { Button, Grid, makeStyles } from '@material-ui/core';
import './index.css';
import { LOBBY_EVENT, GAME_EVENT } from '../socketHook/EventConstant';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));


function Game() {
    const classes = useStyles();
    const { socket, isInitialized } = useSocket();
    //const [history, setHistory] = useState([]);
    //const [winChain, setWinChain] = useState(null);
    const [component, setComponent] = useState();
    // let winner, winChainProps = null;


    function setContent(history, winChain, boardSize, status, move) {
        setComponent(

            <div className="game">

                <div className="game-board">
                    <Board
                        squares={history}
                        isWin={winChain}
                        onClick={(i) => handleClick(i)}
                        row={boardSize}
                        move={move}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        )
    }

    function handleClick(i) {


        socket.emit(GAME_EVENT.SEND_MOVE, {
            move: i
        });
    }

    useEffect(() => {
        if (socket) {

            socket.on(GAME_EVENT.GAME_START, ({ userFirst, userSecond, boardSize }) => {
                const status = "Next player: " + userFirst;

                setContent([], null, boardSize, status, -1);
                console.log("Game start!!!");
            });



            socket.on(GAME_EVENT.SEND_MOVE, ({ newHistory, userTurn, boardSize }) => {
                const status = "Next player: " + userTurn;
                setContent(newHistory, null, boardSize, status, newHistory[newHistory.length - 1]);
                console.log('New history: ', newHistory);


            });

            socket.on(GAME_EVENT.GAME_END, ({ newHistory, userWin, winChain, boardSize }) => {
                const status = userWin !== "Draw" ? "Winner: " + userWin : "GAME DRAW";
                setContent(newHistory, winChain, boardSize, status, newHistory[newHistory.length - 1]);
                console.log("Winner: ", userWin);


            });
        }
    }, [isInitialized])

    return (

        <Grid item md={12}>
            {component}
        </Grid>
    );

}

export default Game;