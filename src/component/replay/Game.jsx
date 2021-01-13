import React, { useState, useEffect, useContext } from 'react';
import { useSocket } from "../socketHook/useSocket";
import gameServices from '../../service/game-service.js';
import { Button, Grid, makeStyles } from '@material-ui/core';
import '../game/index.css';
import { LOBBY_EVENT, GAME_EVENT } from '../socketHook/EventConstant';
import Board from '../game/Board';
import { ReplayContext } from './useReplay';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));


function Game() {
    const { gameData, setGameData } = useContext(ReplayContext);
    const [index, setIndex] = useState(-1);
    const [component, setComponent] = useState();
    let status = "Next player: " + gameData.userNext;
    const setData = () => {
        setGameData({
            history: gameData.history,
            player1: gameData.player1,
            player2: gameData.player2,
            winner: gameData.winner,
            boardSize: gameData.boardSize,
            userNext: gameData.userNext === gameData.player1.username ? gameData.player2.username : gameData.player1.username
        });
    }
    const setContent = (history, winChain, boardSize, status) => {
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
        )
    }


    function handleClick(i) {

    }

    const handleLeft = () => {
        const history = gameData.history;
        if (index >= 0) {

            const newHistory = history.slice(0, index);
            setData();
            status = "Next player: " + gameData.userNext;
            setIndex(index - 1);
            setContent(newHistory, null, gameData.boardSize, status);
        }
        else return;
    }

    const handleRight = () => {
        if (index < gameData.history.length - 1) {
            const history = gameData.history;

            const newHistory = history.slice(0, index + 2);
            const winSquares = gameServices.calculateWinner(newHistory, newHistory[newHistory.length - 1],
                gameData.boardSize);

            if (winSquares) {
                status = "Winner: " + (gameData.userNext ===
                    gameData.player1.username ? gameData.player2.username : gameData.player1.username);
            }
            else {

                status = "Next player: " + gameData.userNext;
            }
            setIndex(index + 1);
            setData();
            setContent(newHistory, winSquares, gameData.boardSize, status);
        }
        else return;
    }


    useEffect(() => {
        setContent([], null, gameData.boardSize, status);
        setData();
    }, [])

    return (

        <Grid item md={12}>
            {component}
            <Grid m>
                <Button onClick={() => {
                    handleLeft();
                }}>
                    <ArrowBackIcon></ArrowBackIcon>
                </Button>
                <Button onClick={() => {
                    handleRight();
                }}>
                    <ArrowForwardIcon></ArrowForwardIcon>
                </Button>
            </Grid>
        </Grid>


    )
}

export default Game;