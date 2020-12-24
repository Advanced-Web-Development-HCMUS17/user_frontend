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
    const {history, setHistory} = useState([]);
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

            socket.on(GAME_EVENT.GAME_START, ({ userFirst, userSecond, boardSize }) => {
                status = "Next player: " + userFirst;
                setComponent(
                    <div className="game">

                        <div className="game-board">
                            <Board
                                squares={history}
                                isWin={winChain}
                                onClick={(i) => handleClick(i)}
                                row={boardSize}
                            />
                        </div>
                        <div className="game-info">
                            <div>{status}</div>
                        </div>
                    </div>
                );
                console.log("Game start!!!");
            });



            socket.on(GAME_EVENT.SEND_MOVE, ({ newHistory, userTurn }) => {
                status = "Next player: " + userTurn;
                setHistory(newHistory);
                console.log('New history: ', history);

            });

            socket.on(GAME_EVENT.GAME_END, ({ userWin, winChain }) => {
                status = "Winner " + userWin;
                setWinChain(winChain);

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