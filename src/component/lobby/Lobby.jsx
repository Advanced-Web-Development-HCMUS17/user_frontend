import React, {useEffect, useState} from "react";
import {useSocket} from "../socketHook/useSocket";
import {useParams} from "react-router";
import {LOBBY_EVENT, PLAYER_1} from "../socketHook/EventConstant";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PlayerInfo from "./PlayerInfo";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

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


  return (
    <Grid container spacing={3}><p>{JSON.stringify(lobbyInfo)}</p>
      <Grid item md={9}>
        <Paper variant={"outlined"} square>
          GAME
        </Paper>
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
