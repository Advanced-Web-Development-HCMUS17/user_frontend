import React, { useEffect, useState } from "react";
import { useSocket } from "../socketHook/useSocket";
import { useParams } from "react-router";
import { LOBBY_EVENT, PLAYER_1, GAME_EVENT } from "../socketHook/EventConstant";
import { Button, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PlayerInfo from "./PlayerInfo";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Game from "../game/Game";
import ChatLayout from "../chat";
import { useAuth } from '../useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    backgroundColor: `#3F51B5`,
    color: `#ffffff`
  }
}));

export default function Lobby() {
  const { socket, isInitialized } = useSocket();
  const { lobbyId } = useParams();
  const classes = useStyles();
  const { userInfo } = useAuth();
  const [lobbyInfo, setLobbyInfo] = useState({});


  useEffect(() => {



    if (socket) {
      socket.emit(LOBBY_EVENT.JOIN_LOBBY, { roomId: lobbyId });
      socket.on(LOBBY_EVENT.LOBBY_INFO, (lobbyInfo) => {
        setLobbyInfo(lobbyInfo);
      });

      socket.on(LOBBY_EVENT.JOIN_LOBBY, ({ user, player }) => {
        if (player === PLAYER_1) {
          setLobbyInfo({ ...lobbyInfo, player1: user });
        } else {
          setLobbyInfo({ ...lobbyInfo, player2: user });
        }



      });

      socket.on(LOBBY_EVENT.LEAVE_LOBBY, ({ leftPlayer }) => {
        if (leftPlayer === PLAYER_1) {
          setLobbyInfo({ ...lobbyInfo, player1: null });
        } else {
          setLobbyInfo({ ...lobbyInfo, player2: null });
        }
      });


    }
  }, [isInitialized]);


  const copyBoardID = () => {
    navigator.clipboard.writeText(`gameBoard_${lobbyInfo.id}`);
    alert('Room ID copied to clipboard successfully');
  }

  const handleClick = () => {
    if (socket)
    {
      console.log("Test");
      socket.emit(GAME_EVENT.GAME_READY,({}));
    }
  }
  return (
    <Grid container direction='column' spacing={1}>
      <Grid item md={12}>
        <p>{JSON.stringify(lobbyInfo)}</p>
      </Grid>
      <Grid item md={12}>
        <Grid container direction='row' spacing={1}>
          <Grid item md={5}>
            <Grid container direction='column' spacing={1}>
              <Grid item md={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item md={10}>
                    <Paper className={classes.title} elevation={1} square>
                      <Box p={0.5}>GAME</Box>
                    </Paper>
                  </Grid>
                  <Grid item md={2}>
                    <Grid container direction='row' justify='center' alignItems={'center'}>
                      <Grid item>
                        <Button onClick={copyBoardID} variant='contained'
                          style={{ backgroundColor: `#009938`, color: `#ffffff` }}>Share</Button>
                        <Button variant="contained" color="primary" onClick={() => handleClick()} >
                          Ready
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Game userInfo={userInfo} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container direction='row' spacing={2}>
              <Grid item md={12}>
                <Paper className={classes.title} elevation={1} square>
                  <Box p={0.5}>CHAT</Box>
                </Paper>
              </Grid>
              <Grid item md={12}>
                <ChatLayout username={userInfo.username} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Grid container direction='row' spacing={2}>
              <Grid item md={12}>
                <Paper className={classes.title} elevation={1} square>
                  <Box p={0.5}>LOBBY</Box>
                </Paper>
              </Grid>
              <Grid item md={12}>
                {lobbyInfo ?
                  <Grid container direction='row' spacing={1}>
                    <Grid item md={12}>
                      <Paper variant={"elevation"}>
                        <Typography variant={"h6"}>Player 1</Typography>
                        {lobbyInfo.player1 ?
                          <PlayerInfo name={lobbyInfo.player1.username}
                            email={lobbyInfo.player1.email}
                            rating={lobbyInfo.player1.rating} />
                          :
                          <div className={classes.root}>
                            <LinearProgress color="secondary" />
                            <Typography variant={"inherit"}>Waiting for other player...</Typography>
                          </div>}
                      </Paper>
                    </Grid>
                    <Grid item md={12}>
                      <Paper>
                        <Typography variant={"h6"}>Player 2</Typography>
                        {lobbyInfo.player2 ?
                          <PlayerInfo name={lobbyInfo.player2.username}
                            email={lobbyInfo.player2.email}
                            rating={lobbyInfo.player2.rating} />
                          :
                          <div className={classes.root}>
                            <LinearProgress color="secondary" />
                            <Typography variant={"inherit"}>Waiting for other player...</Typography>
                          </div>
                        }
                      </Paper>
                    </Grid>
                  </Grid>
                  :
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Box p={0.5}>Invalid lobby</Box>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}