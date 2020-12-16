import React, {useEffect, useState} from "react";
import {useSocket} from "../socketHook/useSocket";
import {useParams} from "react-router";
import {LOBBY_EVENT, PLAYER_1} from "../socketHook/EventConstant";
import {Button, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PlayerInfo from "./PlayerInfo";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import ChatLayout from "../chat";
import {useAuth} from '../useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Lobby() {
  const {socket, isInitialized} = useSocket();
  const {lobbyId} = useParams();
  const classes = useStyles();
  const {userInfo} = useAuth();
  const [lobbyInfo, setLobbyInfo] = useState({});


  useEffect(() => {
    if (socket) {
      socket.emit(LOBBY_EVENT.JOIN_LOBBY, {roomId: lobbyId});
      socket.on(LOBBY_EVENT.LOBBY_INFO, (lobbyInfo) => {
        setLobbyInfo(lobbyInfo);
      });

      socket.on(LOBBY_EVENT.JOIN_LOBBY, ({user, player}) => {
        if (player === PLAYER_1) {
          setLobbyInfo({...lobbyInfo, player1: user});
        } else {
          setLobbyInfo({...lobbyInfo, player2: user});
        }
      });

      socket.on(LOBBY_EVENT.LEAVE_LOBBY, ({leftPlayer}) => {
        if (leftPlayer === PLAYER_1) {
          setLobbyInfo({...lobbyInfo, player1: null});
        } else {
          setLobbyInfo({...lobbyInfo, player2: null});
        }
      })

    }
  }, [isInitialized]);

  const copyBoardID = () => {
    navigator.clipboard.writeText(`gameBoard_${lobbyInfo.id}`);
    alert('Room ID copied to clipboard successfully');
  }

  return (
    <Grid container spacing={3}><p>{JSON.stringify(lobbyInfo)}</p>
      <Grid item md={6}>
        <Grid container spacing={1}>
          <Grid item md={10}>
            <Paper variant={"outlined"} square>GAME</Paper>
          </Grid>
          <Grid item md={2}>
            <Button onClick={copyBoardID} variant='contained' color='primary'>Share</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <ChatLayout username={userInfo.username}/>
      </Grid>
      <Grid item md={3}>
        <Box m={2}>
          {lobbyInfo ? <Paper variant={"elevation"} square>
              Lobby
              <Typography variant={"h6"}>Player 1</Typography>
              {lobbyInfo.player1 ? <PlayerInfo name={lobbyInfo.player1.username} email={lobbyInfo.player1.email}
                                               rating={lobbyInfo.player1.rating}/> :
                <div className={classes.root}><LinearProgress color="secondary"/>
                  <Typography variant={"inherit"}>Waiting...</Typography></div>}
              <Typography variant={"h6"}>Player 2</Typography>
              {lobbyInfo.player2 ? <PlayerInfo name={lobbyInfo.player2.username} email={lobbyInfo.player2.email}
                                               rating={lobbyInfo.player2.rating}/> :
                <div className={classes.root}><LinearProgress color="secondary"/>
                  <Typography variant={"inherit"}>Waiting...</Typography></div>}
            </Paper>
            : <LinearProgress color="secondary"/>
          }
        </Box>
      </Grid>
    </Grid>
  )
}
