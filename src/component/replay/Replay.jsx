import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import CircularProgress from "@material-ui/core/CircularProgress";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ChatLog from "./chat/ChatLog";
import {makeStyles} from '@material-ui/core/styles';
import {fetchGameData} from '../../service/api';
import PlayerInfo from "../lobby/PlayerInfo";
import Game from './Game';
import {useAuth} from '../useAuth';

import {
  Container, Paper, Grid, TextField, Typography, Link, Card,
  CardMedia, CardContent, CardActions, CssBaseline, Button, Box
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Replay() {
  const boardSize = 20;
  const {lobbyId} = useParams();

  const [gameInfo, setGameInfo] = useState(null);
  const {token} = useAuth();

  async function fetchData() {
    let data = await fetchGameData(token, lobbyId);
    let dateFormat = new Date(data.date);
    data.date = dateFormat.toLocaleString("en-US");
    setGameInfo(data);
  }

  useEffect(() => {
      fetchData();
    }
    , []);
  return (gameInfo ? <>
      <Grid item><AccessTimeIcon/> {gameInfo.date}</Grid>
      <Grid container>
        <Grid item md={9}>
          <Grid md={5} align='center' justify='center' spacing={2}>
            <Box fontWeight={700} fontSize='20px'>

              Game history

            </Box>
          </Grid>
          <Game gameData={gameInfo} boardSize={boardSize}/>
        </Grid>
        <Grid item md={3}>
          <Box py={2}>
            Player 1
            <PlayerInfo name={gameInfo.user1.username} id={gameInfo.user1._id} email={gameInfo.user1.email}
                        rating={gameInfo.user1.rating}/>
          </Box>
          <Box py={2}>Player 2
            <PlayerInfo name={gameInfo.user2.username} id={gameInfo.user1._id} email={gameInfo.user2.email}
                        rating={gameInfo.user2.rating}/></Box>
        </Grid>
      </Grid>
      <Grid>
        <ChatLog chats={gameInfo.chat ? gameInfo.chat : []}/>
      </Grid>
    </> : <CircularProgress color="secondary"/>
  )
}
